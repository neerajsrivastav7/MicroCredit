package handler

import (
    "errors"
    "fmt"
    "microCreditplus/pkg/comman"
    "microCreditplus/pkg/database"
    "sync"
    "time"
)

// Global variables
var (
    totalCollection sync.RWMutex
    Collection      map[string]*comman.TodayCollection
)

type Losic struct {
    lc database.Database
}

func (l *Losic)LoadNewCollection() {
    totalCollection.Lock()
    defer totalCollection.Unlock()
    newCollection, err := l.lc.TodayCollection()
    if err != nil {
        fmt.Println("There is issue in Loading the Data")
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
}

func (l *Losic)StartDailyCleanup() {
    go func() {
        for {
            now := time.Now()
            nextCleanup := time.Date(now.Year(), now.Month(), now.Day(), 16, 0, 0, 0, now.Location())
            if now.After(nextCleanup) {
                nextCleanup = nextCleanup.Add(24 * time.Hour)
            }
            durationUntilNextCleanup := nextCleanup.Sub(now)

            time.Sleep(durationUntilNextCleanup)

            totalCollection.Lock()
            Collection = make(map[string]*comman.TodayCollection)
            totalCollection.Unlock()
            l.LoadNewCollection()
        }
    }()
}

func (l *Losic) Start() {
    l.LoadNewCollection()
    l.StartDailyCleanup()
}

func AddInTotalCollection(name string, addedMoney int) {
    totalCollection.Lock()
    defer totalCollection.Unlock()
	fmt.Println("+++++++++++++++++++++++++++++++++")
	fmt.Println(name)
    if collection, ok := Collection[name]; ok {
		fmt.Println(name)
        collection.Paid += addedMoney
    }
	fmt.Println(Collection)
}

func (l *Losic) AddUserLosicHandler(user comman.User) error {
    amoutDetail, userinfo, userDetail, err := comman.DitributeData(user)
    if err != nil {
        return err
    }

    if err = l.lc.InsertUserInfo(userinfo); err != nil {
        return err
    }
    if err = l.lc.InsertAmount(amoutDetail); err != nil {
        return err
    }
    if err = l.lc.InsertDetails(userDetail); err != nil {
        return err
    }

    return nil
}

func (l *Losic) deleteUserHandlerLosic(user comman.DeleteUser) error {
    if user.SubName == "" {
        return fmt.Errorf("SubName is required")
    }
    subName := user.SubName
    err := l.lc.DeleteUser(subName)
    if err != nil {
        return errors.New(err.Error())
    }
    return nil
}

func (l *Losic) AddMoneyLosicHandler(addMoney comman.AddMoney) error {
    day := addMoney.Day
    remainingAmount := day * (addMoney.PaidAmount)
    addMoneyError := l.lc.AddMoneyQuery(day, remainingAmount, addMoney.SubName)
    if addMoneyError != nil {
        return addMoneyError
    }
    go func() {
        AddInTotalCollection(addMoney.SubName, addMoney.PaidAmount)
    }()
    return nil
}

func (l *Losic) GetAllUserLogisHandler() ([]comman.SettlementData, error) {
    users, err := l.lc.GetAllData()
    return users, err
}

func (l *Losic) GetAllUserLogisHandlerByName(name string) ([]comman.SubNameDetail, error) {
    users, err := l.lc.GetSubNameDetailByName(name)
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

    return result, nil
}
func (l *Losic) GetDetailHandler() (interface{}, error) {
    details, err := l.lc.GetDetailData()
    if len(details) == 0 {
        details = []comman.UserDetails{
            {
                Name:                 "Dummy",
                TotalGivenAmount:     10600,
                TotalDailyPaidAmount: 200,
                NextPaidDate:         "2024-05-30",
            },
        }
    }
    return details, err
}

func (l *Losic) AddMoneyByNameLosicHandler(addMoney comman.AddMoneyByName) error {
    name := addMoney.Name
    subName := addMoney.SubName
    noofDays := addMoney.NoOfDays
    TotalPaidAmount := addMoney.TotalPaidAmount
    moneyType := addMoney.MType
    fmt.Println(name)
    fmt.Println(subName)
    var err error
	AddInTotalCollection(name, TotalPaidAmount)
    if moneyType == "name" {
        err = l.lc.AddMoneyByName(name, noofDays, TotalPaidAmount)
    } else if moneyType == "subName" {
        err = l.lc.AddMoneyBySubName(subName, noofDays, TotalPaidAmount)
    } else {
        err = errors.New("type of Add money is not Valid")
    }
    return err
}

func (l *Losic) GetDetailLosicHandler(name string) (interface{}, error) {
    detail, err := l.lc.GetDetailByName(name)
    return detail, err
}

func (l *Losic) GetDetailLosicHandlerForSubName(subname string) (interface{}, error) {
    detail, err := l.lc.GetDetailBySubName(subname)
    fmt.Println(detail)
    return detail, err
}

func (l *Losic) DeleteUserHandlerLosic(subName string) error {
    err := l.lc.DeleteUserBySubName(subName)
    return err
}
