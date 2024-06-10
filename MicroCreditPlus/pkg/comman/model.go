package comman

import (
	"time"
)

type User struct {
	Name                  string `json:"name"`
	SubName               string `json:"subName"`
	MobileNumber          string `json:"mobileNumber"`
	Address               string `json:"address,omitempty"`
	EmailID               string `json:"emailId,omitempty"`
	StartDate             string `json:"startDate,omitempty"`
	EndDate               string `json:"endDate,omitempty"`
	NoOfDays              int    `json:"noOfDays,omitempty"`
	RegisterDay           string `json:"registerDay,omitempty"`
	GivenAmount           int    `json:"givenAmount,omitempty"`
	DailyGivenAmount      int    `json:"dailyGivenAmount,omitempty"`
	ProfessionInformation string `json:"profession,omitempty"`
}

type Login struct {
	UserName string `json:"userName"`
	Password string `json:"Password"`
}

type UserDetail struct {
	DetailID         int
	Name             string
	SubName          string
	SettlementAmount int
	SettlementDate   string
	NoOfRemainingDay int
	NoOfMissDay      int
	TotalNoOfDays    int
	DailyPaidAmount  int
	CurrentEndDate   time.Time
}

type UserAmount struct {
	AmountID        int
	Name            string
	SubName         string
	Amount          int
	NoOfDays        int
	AmountGivenDate time.Time
	StartDate       time.Time
	EndDate         time.Time
}

type UserInfo struct {
	ID                    int
	Name                  string
	SubName               string
	MobileNumber          string
	Address               string
	ProfessionInformation string
}

type DeleteUser struct {
	Name    string `json:"name"`
	SubName string `json:"subName"`
}

type AddMoney struct {
	Name       string `json:"name"`
	SubName    string `json:"subName"`
	PaidAmount int    `json:"paidAmount"`
	Day        int    `json:"day"`
}

type SettlementData struct {
	Name             string
	TotalAmount      int
	SettlementAmount int
	DailyPaidAmount  int
}

type SubNameDetail struct {
	Name             string
	SubName          string
	Amount           float64
	AmountGivenDate  string
	StartDate        string
	EndDate          string
	SettlementAmount float64
	NoOfRemainingDay int
	DailyPaidAmount  float64
}

type TodayCollection struct {
	Name   string `json:"name"`
	Actual int    `json:"actual"`
	Paid   int    `json:"paid"`
}

type UserDetails struct {
	Name                 string `json:"name"`
	TotalGivenAmount     int    `json:"totalGivenAmount"`
	TotalDailyPaidAmount int    `json:"totalDailyPaidAmount"`
	NextPaidDate         string `json:"nextPaidDate"`
}

type AddMoneyByName struct {
	MType           string `json:"mType"`
	Name            string `json:"name"`
	SubName         string `json:"subName"`
	NoOfDays        int    `json:"noOfDays"`
	TotalPaidAmount int    `json:"totalPaidAmount"`
}

type GetDetailByName struct {
	Name             string `json:"name"`
	SubName          string `json:"sub_name"`
	NoOfDays         int    `json:"no_of_days"`
	Amount           int    `json:"amount"`
	StartDate        string `json:"start_date"`
	NoOfRemainingDay int    `json:"no_of_remaining_day"`
	DailyPaidAmount  int    `json:"daily_paid_amount"`
	CurrentEndDate   string `json:"current_end_date"`
	SettlementAmount int    `json:"settlement_amount"`
}

type GetDetailBySubName struct {
	Name             string  `json:"name"`
	SubName          string  `json:"subName"`
	StartDate        string  `json:"startDate"`
	EndDate          string  `json:"endDate"`
	Amount           float64 `json:"amount"`
	SettlementAmount float64 `json:"settlementAmount"`
	NoOfRemainingDay int     `json:"noOfRemainingDay"`
	TotalNoOfDays    int     `json:"totalNoOfDays"`
	DailyPaidAmount  float64 `json:"dailyPaidAmount"`
	CurrentEndDate   string  `json:"currentEndDate"`
}

type TodatActualCollection struct {
	Name  string
	Actual int
}
