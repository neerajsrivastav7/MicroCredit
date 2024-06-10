package database

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"microCreditplus/pkg/comman"
	"strings"
	"sync"

	_ "github.com/lib/pq"
)

type Database struct {
	CombindData comman.SettlementData
	mutex       sync.Mutex
}

const (
	connStr      = "postgres://postgres:root@localhost:5432/postgres?sslmode=disable"
	connStrMicro = "postgres://postgres:root@localhost:5433/microcredit?sslmode=disable"
	dbName       = "microCreditplus"
)

func (pdb *Database) CreateDatabase() {
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Error connecting to the database:", err)
	}
	defer db.Close()

	var exists bool
	err = db.QueryRow("SELECT EXISTS (SELECT 1 FROM pg_catalog.pg_database WHERE datname = $1)", dbName).Scan(&exists)
	if err != nil {
		log.Fatal("Error checking if database exists:", err)
	}

	if exists {
		fmt.Printf("Database '%s' already exists. Skipping creation.\n", dbName)
		return
	}

	_, err = db.Exec(fmt.Sprintf("CREATE DATABASE %s", dbName))
	if err != nil {
		log.Fatal("Error creating database:", err)
	}

	fmt.Printf("Database '%s' created successfully\n", dbName)
}

func (pdb *Database) ConnectToDB() (*sql.DB, error) {
	db, err := sql.Open("postgres", connStrMicro)
	if err != nil {
		return nil, fmt.Errorf("error connecting to the database: %v", err)
	}

	err = db.Ping()
	if err != nil {
		db.Close()
		return nil, fmt.Errorf("error pinging database: %v", err)
	}
	return db, nil
}

func (pdb *Database) createTable(query, tableName string) error {
	pdb.mutex.Lock()
	defer pdb.mutex.Unlock()

	db, err := pdb.ConnectToDB()
	if err != nil {
		return errors.New("not able to connect with the database")
	}
	defer db.Close()

	_, err = db.Exec(query)
	if err != nil {
		log.Fatalf("Error creating %s table: %v", tableName, err)
		return errors.New("not able to create table")
	}

	fmt.Printf("%s Table Created\n", tableName)
	return nil
}

func (pdb *Database) TableUser() error {
	return pdb.createTable(CreateUserTable, "User")
}

func (pdb *Database) TableAmount() error {
	return pdb.createTable(CreateAmountTable, "Amount")
}

func (pdb *Database) TableDetail() error {
	return pdb.createTable(CreateDetailTable, "Detail")
}

func (pdb *Database) insertData(query string, args ...interface{}) error {
	pdb.mutex.Lock()
	defer pdb.mutex.Unlock()

	db, err := pdb.ConnectToDB()
	if err != nil {
		return errors.New("not able to connect with the database")
	}
	defer db.Close()

	_, err = db.Exec(query, args...)
	if err != nil {
		return fmt.Errorf("unable to insert data: %v", err)
	}
	return nil
}

func (pdb *Database) InsertUserInfo(user comman.UserInfo) error {
	return pdb.insertData(InsertUserQuery, user.Name, user.SubName, user.MobileNumber, user.Address, user.ProfessionInformation)
}

func (pdb *Database) InsertAmount(user comman.UserAmount) error {
	return pdb.insertData(InsertAmountQuery, user.Name, user.SubName, user.Amount, user.NoOfDays, user.AmountGivenDate, user.StartDate, user.EndDate)
}

func (pdb *Database) InsertDetails(user comman.UserDetail) error {
	return pdb.insertData(InsertDetailQuery, user.Name, user.SubName, user.SettlementAmount, user.SettlementDate, user.NoOfRemainingDay, user.NoOfMissDay, user.TotalNoOfDays, user.DailyPaidAmount, user.CurrentEndDate)
}

func (pdb *Database) DeleteUser(subName string) error {
	return pdb.insertData(DeleteUserQuery, subName)
}

func (pdb *Database) AddMoneyQuery(noOfDay, remainingAmount int, subName string) error {
	return pdb.insertData(updateQuery, noOfDay, remainingAmount, subName)
}

func (pdb *Database) GetAllData() ([]comman.SettlementData, error) {
	db, err := pdb.ConnectToDB()
	if err != nil {
		return nil, err
	}
	defer db.Close()

	settlementDataMap := make(map[string]comman.SettlementData)

	// Process totalAmountQuery results
	totalAmountRows, err := db.Query(totalAmountQuery)
	if err != nil {
		return nil, err
	}
	defer totalAmountRows.Close()

	for totalAmountRows.Next() {
		var name string
		var totalAmount int
		if err := totalAmountRows.Scan(&name, &totalAmount); err != nil {
			return nil, err
		}
		settlementDataMap[name] = comman.SettlementData{Name: name, TotalAmount: totalAmount}
	}

	if err := totalAmountRows.Err(); err != nil {
		return nil, err
	}

	// Process totalSettlementAmountQuery results
	totalSettleMentAmountRows, err := db.Query(totalSettleMentAmount)
	if err != nil {
		return nil, err
	}
	defer totalSettleMentAmountRows.Close()

	for totalSettleMentAmountRows.Next() {
		var name string
		var settlementAmount, dailyPaidAmount int
		if err := totalSettleMentAmountRows.Scan(&name, &settlementAmount, &dailyPaidAmount); err != nil {
			return nil, err
		}
		if data, ok := settlementDataMap[name]; ok {
			data.SettlementAmount = settlementAmount
			data.DailyPaidAmount = dailyPaidAmount
			settlementDataMap[name] = data
		} else {
			settlementDataMap[name] = comman.SettlementData{Name: name, SettlementAmount: settlementAmount, DailyPaidAmount: dailyPaidAmount}
		}
	}

	if err := totalSettleMentAmountRows.Err(); err != nil {
		return nil, err
	}

	var combinedData []comman.SettlementData
	for _, data := range settlementDataMap {
		combinedData = append(combinedData, data)
	}
	return combinedData, nil
}

func (pdb *Database) GetSubNameDetailByName(name string) ([]comman.SubNameDetail, error) {
	db, err := pdb.ConnectToDB()
	if err != nil {
		return nil, err
	}
	defer db.Close()

	rows, err := db.Query(detailGetByNameQuery, name)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var result []comman.SubNameDetail
	for rows.Next() {
		var res comman.SubNameDetail
		if err := rows.Scan(&res.Name, &res.SubName, &res.Amount, &res.AmountGivenDate, &res.StartDate, &res.EndDate, &res.SettlementAmount, &res.NoOfRemainingDay, &res.DailyPaidAmount); err != nil {
			return nil, err
		}
		result = append(result, res)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return result, nil
}

func (pdb *Database) GetDetailData() ([]comman.UserDetails, error) {
	db, err := pdb.ConnectToDB()
	if err != nil {
		return nil, err
	}
	defer db.Close()

	rows, err := db.Query(UserDetailQuery)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var details []comman.UserDetails
	for rows.Next() {
		var detail comman.UserDetails
		var nextPaidDate sql.NullString

		if err := rows.Scan(&detail.Name, &detail.TotalGivenAmount, &detail.TotalDailyPaidAmount, &nextPaidDate); err != nil {
			return nil, err
		}

		if nextPaidDate.Valid {
			detail.NextPaidDate = strings.Split(nextPaidDate.String, "T")[0]
		} else {
			detail.NextPaidDate = ""
		}

		details = append(details, detail)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return details, nil
}


func (pdb *Database) AddMoneyBySubName(name string, noofDays, TotalPaidAmount int) error {
	db, err := pdb.ConnectToDB()
	if err != nil {
		return err
	}
	defer db.Close()
	fmt.Println(name)
	_, err = db.Exec(addMoneyBySubNameQuery, noofDays, name)
	if err != nil {
		return err
	}

	_, err = db.Exec(addMoneyBySubName2Query, name)
	if err != nil {
		return fmt.Errorf("error executing the update query: %v", err)
	}

	return nil
}

func (pdb *Database) AddMoneyByName(name string, noofDays, TotalPaidAmount int) error {
	db, err := pdb.ConnectToDB()
	if err != nil {
		return err
	}
	defer db.Close()
	fmt.Println(name)
	_, err = db.Exec(addMoneyByNameQuery, noofDays, name)
	if err != nil {
		return err
	}

	_, err = db.Exec(addMoneyByName2Query, name)
	if err != nil {
		return fmt.Errorf("error executing the update query: %v", err)
	}

	return nil
}

func (pdb *Database) GetDetailByName(name string) ([]comman.GetDetailByName,error) {
	db, err := pdb.ConnectToDB()
	if err != nil {
		return []comman.GetDetailByName{},err
	}
	defer db.Close()
	rows, err := db.Query(getDetailByName, name)
	if err != nil {
		return []comman.GetDetailByName{},err
	}
	defer rows.Close()
	var results []comman.GetDetailByName

	// Iterate over the rows
	for rows.Next() {
		var result comman.GetDetailByName
		err := rows.Scan(
			&result.Name, 
			&result.SubName, 
			&result.NoOfDays, 
			&result.Amount, 
			&result.StartDate, 
			&result.NoOfRemainingDay, 
			&result.DailyPaidAmount, 
			&result.CurrentEndDate, 
			&result.SettlementAmount,
		)
		result.StartDate = strings.Split(result.StartDate, "T")[0]
		result.CurrentEndDate = strings.Split(result.CurrentEndDate, "T")[0]
		if err != nil {
			return []comman.GetDetailByName{},err
		}
		results = append(results, result)
	}

	// Check for errors from iterating over rows.
	if err = rows.Err(); err != nil {
		return []comman.GetDetailByName{},err
	}
	return results, nil
	// Marshal the results to JSON
}

func (pdb *Database) GetDetailBySubName(subName string) ([]comman.GetDetailBySubName, error) {
	db, err := pdb.ConnectToDB()
	if err != nil {
		return []comman.GetDetailBySubName{}, err
	}
	defer db.Close()
	rows, err := db.Query(getDetailBySubNameQuery, subName)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var results []comman.GetDetailBySubName

	// Iterate over the rows
	for rows.Next() {
		var result comman.GetDetailBySubName
		err := rows.Scan(
			&result.Name,
			&result.SubName,
			&result.StartDate,
			&result.EndDate,
			&result.Amount,
			&result.SettlementAmount,
			&result.NoOfRemainingDay,
			&result.TotalNoOfDays,
			&result.DailyPaidAmount,
			&result.CurrentEndDate,
		)
		if err != nil {
			return []comman.GetDetailBySubName{}, err
		}

		// Format the dates to exclude time part
		result.StartDate = strings.Split(result.StartDate, "T")[0]
		result.CurrentEndDate = strings.Split(result.CurrentEndDate, "T")[0]
		result.EndDate = strings.Split(result.CurrentEndDate, "T")[0]

		results = append(results, result)
	}

	// Check for errors from iterating over rows.
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return results, nil
}

func (pdb *Database) DeleteUserBySubName(subName string) error {
	db, err := pdb.ConnectToDB()
	if err != nil {
		return err
	}
	defer db.Close()

	// Prepare the SQL delete statement
	deleteQuery := `DELETE FROM users WHERE subName = $1`

	// Execute the delete statement
	_, err = db.Exec(deleteQuery, subName)
	if err != nil {
		return err
	}

	return nil
}

func (pdb *Database) TodayCollection() ([]comman.TodatActualCollection, error) {
	db, err := pdb.ConnectToDB()
	if err != nil {
		return []comman.TodatActualCollection{}, err
	}
	defer db.Close()

	rows, err := db.Query(totalDailyCollectionQuery)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var results []comman.TodatActualCollection
	for rows.Next() {
		var collection comman.TodatActualCollection
		if err := rows.Scan(&collection.Name, &collection.Actual); err != nil {
			return nil, err
		}
		results = append(results, collection)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	fmt.Println(results)
	return results, nil
}