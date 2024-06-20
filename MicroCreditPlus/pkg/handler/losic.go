package handler

import (
    "errors"
    "fmt"
    "microCreditplus/pkg/comman"
    "microCreditplus/pkg/database"
    "sync"
    "time"
    "os"
    "microCreditplus/pkg/loghistory"
)

var (
    totalCollection sync.RWMutex
    Collection      map[string]*comman.TodayCollection
)

type Losic struct {
    lc database.Database
}

var LogicLoger = loghistory.New(os.Stdout, loghistory.INFO)

func (l *Losic) LoadNewCollection() {
    totalCollection.Lock()
    defer totalCollection.Unlock()

    newCollection, err := l.lc.TodayCollection()
    if err != nil {
        LogicLoger.Error("Error loading today's collection: %v", err)
        return
    }
    if Collection == nil {
        Collection = make(map[string]*comman.TodayCollection)
    }
    for _, value := range newCollection {
        todayCollection := &comman.TodayCollection{}
        todayCollection.Actual = value.Actual
        todayCollection.Paid = 0
        Collection[value.Name] = todayCollection
    }
    LogicLoger.Info("New collection loaded successfully")
}

func (l *Losic) StartDailyCleanup() {
    go func() {
        for {
            now := time.Now()
            nextCleanup := time.Date(now.Year(), now.Month(), now.Day(), 16, 0, 0, 0, now.Location())
            if now.After(nextCleanup) {
                nextCleanup = nextCleanup.Add(24 * time.Hour)
            }
            durationUntilNextCleanup := nextCleanup.Sub(now)

            LogicLoger.Info("Next cleanup scheduled in %v", durationUntilNextCleanup)
            time.Sleep(durationUntilNextCleanup)

            totalCollection.Lock()
            Collection = make(map[string]*comman.TodayCollection)
            totalCollection.Unlock()
            l.LoadNewCollection()
            LogicLoger.Info("Daily cleanup completed and new collection loaded")
        }
    }()
}

func (l *Losic) Start() {
    l.LoadNewCollection()
    l.StartDailyCleanup()
    LogicLoger.Info("Service started successfully")
}

func (l *Losic) AddInTotalCollection(name string, addedMoney int) error{
    totalCollection.Lock()
    if collection, ok := Collection[name]; ok {
        collection.Paid += addedMoney
        LogicLoger.Info("Added %d to %s's total collection", addedMoney, name)
	totalCollection.Unlock()
    } else {
	totalCollection.Unlock()
        l.LoadNewCollection()
	totalCollection.Lock()
        Collection[name] = &comman.TodayCollection{Paid: addedMoney}
	totalCollection.Unlock()
        LogicLoger.Info("New collection initialized for %s with %d", name, addedMoney)
    }
    return nil
}

func (l *Losic) AddUserLosicHandler(user comman.User) error {
    amoutDetail, userinfo, userDetail, err := comman.DitributeData(user)
    if err != nil {
        LogicLoger.Error("Error distributing user data: %v", err)
        return err
    }

    if err = l.lc.InsertUserInfo(userinfo); err != nil {
        LogicLoger.Error("Error inserting user info: %v", err)
        return err
    }
    if err = l.lc.InsertAmount(amoutDetail); err != nil {
        LogicLoger.Error("Error inserting amount: %v", err)
        return err
    }
    if err = l.lc.InsertDetails(userDetail); err != nil {
        LogicLoger.Error("Error inserting user details: %v", err)
        return err
    }

    LogicLoger.Info("User added successfully: %s", userinfo.Name)
    return nil
}

func (l *Losic) deleteUserHandlerLosic(user comman.DeleteUser) error {
    if user.SubName == "" {
        return fmt.Errorf("SubName is required")
    }
    subName := user.SubName
    err := l.lc.DeleteUser(subName)
    if err != nil {
        LogicLoger.Error("Error deleting user: %v", err)
        return errors.New(err.Error())
    }
    LogicLoger.Info("User deleted successfully: %s", subName)
    return nil
}

func (l *Losic) AddMoneyLosicHandler(addMoney comman.AddMoney) error {
    day := addMoney.Day
    remainingAmount := day * (addMoney.PaidAmount)
    addMoneyError := l.lc.AddMoneyQuery(day, remainingAmount, addMoney.SubName)
    if addMoneyError != nil {
        LogicLoger.Error("Error adding money: %v", addMoneyError)
        return addMoneyError
    }
    go func() {
        _ = l.AddInTotalCollection(addMoney.SubName, addMoney.PaidAmount)
    }()
    LogicLoger.Info("Money added successfully for user: %s", addMoney.SubName)
    return nil
}

func (l *Losic) GetAllUserLogisHandler() ([]comman.SettlementData, error) {
    users, err := l.lc.GetAllData()
    if err != nil {
        LogicLoger.Error("Error getting all user data: %v", err)
    }
    return users, err
}

func (l *Losic) GetAllUserLogisHandlerByName(name string) ([]comman.SubNameDetail, error) {
    users, err := l.lc.GetSubNameDetailByName(name)
    if err != nil {
        LogicLoger.Error("Error getting user data by name: %v", err)
    }
    return users, err
}

func (l *Losic) TodayCollectionLosicHandler() (interface{}, error) {
    totalCollection.RLock()
    defer totalCollection.RUnlock()
    if Collection == nil {
        Collection = make(map[string]*comman.TodayCollection)
    }

    var result []comman.TodayCollection
    for name, col := range Collection {
        col.Name = name
        result = append(result, *col)
    }

    LogicLoger.Info("Today's collection retrieved successfully")
    return result, nil
}

func (l *Losic) GetDetailHandler() (interface{}, error) {
    details, err := l.lc.GetDetailData()
    if err != nil {
        LogicLoger.Error("Error getting detail data: %v", err)
    }
    if len(details) == 0 {
        details = []comman.UserDetails{
            {
                Name:                 "Dummy",
                TotalGivenAmount:     10600,
                TotalDailyPaidAmount: 200,
                NextPaidDate:         "2024-05-30",
            },
        }
        LogicLoger.Info("No details found, returning dummy data")
    }
    return details, err
}

func (l *Losic) AddMoneyByNameLosicHandler(addMoney comman.AddMoneyByName) error {
    name := addMoney.Name
    subName := addMoney.SubName
    noOfDays := addMoney.NoOfDays
    totalPaidAmount := addMoney.TotalPaidAmount
    moneyType := addMoney.MType

    // Validate input data
    if name == "" && subName == "" {
        err := errors.New("name or subName must be provided")
        LogicLoger.Error("Invalid input data: %v", err)
        return err
    }
    if totalPaidAmount <= 0 {
        err := errors.New("totalPaidAmount must be greater than zero")
        LogicLoger.Error("Invalid totalPaidAmount: %v", err)
        return err
    }
    if moneyType != "name" && moneyType != "subName" {
        err := errors.New("type of Add money is not valid")
        LogicLoger.Error("Invalid money type provided: %s", moneyType)
        return err
    }

    // Log input data
    LogicLoger.Info("Adding money with details: Name=%s, SubName=%s, NoOfDays=%d, TotalPaidAmount=%f, MType=%s",
        name, subName, noOfDays, totalPaidAmount, moneyType)

    // Add to total collection

    // Add money by name or subName
    var err error
    if moneyType == "name" {
        err = l.lc.AddMoneyByName(name, noOfDays, totalPaidAmount)
    } else if moneyType == "subName" {
        err = l.lc.AddMoneyBySubName(subName, noOfDays, totalPaidAmount)
    }
    
    if err != nil {
        LogicLoger.Error("Error adding money by name or subName: %v", err)
        return err
    }

    LogicLoger.Info("Successfully added money for %s", name)
    return nil
}


func (l *Losic) GetDetailLosicHandler(name string) (interface{}, error) {
    detail, err := l.lc.GetDetailByName(name)
    if err != nil {
        LogicLoger.Error("Error getting detail by name: %v", err)
    }
    return detail, err
}

func (l *Losic) GetDetailLosicHandlerForSubName(subname string) (interface{}, error) {
    detail, err := l.lc.GetDetailBySubName(subname)
    if err != nil {
        LogicLoger.Error("Error getting detail for subName: %v", err)
    }
    fmt.Println(detail)
    return detail, err
}

func (l *Losic) DeleteUserHandlerLosic(subName string) error {
    err := l.lc.DeleteUserBySubName(subName)
    if err != nil {
        LogicLoger.Error("Error deleting user by subName: %v", err)
    } else {
        LogicLoger.Info("User deleted successfully by subName: %s", subName)
    }
    return err
}

