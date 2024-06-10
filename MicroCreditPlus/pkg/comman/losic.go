package comman

import (
	"errors"
	"time"
)

const (
	layout = "2006-01-02"
)

func DitributeData(user User) (UserAmount, UserInfo, UserDetail, error) {
	registerDate, regErr := time.Parse(layout, user.RegisterDay)
	startdate, StartErr := time.Parse(layout, user.StartDate)
	EndDate, EndErr := time.Parse(layout, user.EndDate)
	if regErr != nil || StartErr != nil || EndErr != nil {
		return UserAmount{}, UserInfo{}, UserDetail{}, errors.New("not able to convert the String Date into Date and time")
	}
	amountDetail := UserAmount{
		Name:            user.Name,
		SubName:         user.SubName,
		Amount:          user.GivenAmount,
		NoOfDays:        user.NoOfDays,
		AmountGivenDate: registerDate,
		StartDate:       startdate,
		EndDate:         EndDate,
	}

	UserInfo := UserInfo{
		Name:                  user.Name,
		SubName:               user.SubName,
		MobileNumber:          user.MobileNumber,
		Address:               user.Address,
		ProfessionInformation: user.ProfessionInformation,
	}
	remainingDays := user.NoOfDays
	settlementAmount := remainingDays * (user.DailyGivenAmount)
	currentDate := time.Now().Format("2006-01-02")

	userDetail := UserDetail{
		Name:             user.Name,
		SubName:          user.SubName,
		SettlementAmount: settlementAmount,
		SettlementDate:   currentDate,
		NoOfRemainingDay: user.NoOfDays,
		NoOfMissDay:      0,
		TotalNoOfDays:    user.NoOfDays,
		DailyPaidAmount:   user.DailyGivenAmount,
		CurrentEndDate: EndDate,
	}
	return amountDetail, UserInfo, userDetail, nil
}
