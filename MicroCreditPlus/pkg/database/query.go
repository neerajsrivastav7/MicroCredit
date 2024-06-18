package database

const (
	CreateUserTable = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            subName VARCHAR(255) NOT NULL UNIQUE,
            mobile_number TEXT NOT NULL,
            address TEXT,
            profession_information TEXT
        );`

	CreateAmountTable = `
        CREATE TABLE IF NOT EXISTS amount (
            amount_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            subName VARCHAR(255) NOT NULL UNIQUE,
            amount INT,
            noOfDays INT,
            AmountGivenDate DATE,
            startDate DATE,
            endDate DATE,
            FOREIGN KEY (subName) REFERENCES users(subName) ON DELETE CASCADE
        );`

	CreateDetailTable = `
        CREATE TABLE IF NOT EXISTS detail (
            detail_id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            subName VARCHAR(255) NOT NULL UNIQUE,
            settlementAmount INT,
            settlementDate DATE,
            noOfRemainingDay INT,
            noOfMissDay INT,
	    totalNoOfDays INT,
            DailyPaidAmount INT,
            CurrentEndDate  Date,
            FOREIGN KEY (subName) REFERENCES users(subName) ON DELETE CASCADE
        );`

	InsertUserQuery = `
        INSERT INTO users (name, subName, mobile_number, address, profession_information)
        VALUES ($1, $2, $3, $4, $5)`

	InsertAmountQuery = `
        INSERT INTO amount (name, subName, amount, noOfDays, AmountGivenDate, startDate, endDate)
        VALUES ($1, $2, $3, $4, $5, $6, $7);`

	InsertDetailQuery = `
        INSERT INTO detail (name, subName, settlementAmount, settlementDate, noOfRemainingDay, noOfMissDay,totalNoOfDays, DailyPaidAmount, currentEndDate)
        VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9)`

	DeleteUserQuery = `DELETE FROM users WHERE subName = $1`

	updateQuery = `UPDATE detail SET noOfRemainingDay = noOfRemainingDay-$1, settlementAmount = settlementAmount-$2 WHERE subName = $3;`

	totalAmountQuery = `SELECT name, SUM(amount) AS amount FROM amount GROUP BY name;`

	totalSettleMentAmount = `SELECT name, SUM(settlementAmount) AS settlementAmount, sum(DailyPaidAmount) AS DailyPaidAmount
                                 FROM detail GROUP BY name;`

	detailGetByNameQuery = `SELECT a.name, a.subName,a.amount,a.AmountGivenDate,a.startDate,
                                        a.endDate,
                                        d.settlementAmount,
                                        d.noOfRemainingDay,
                                        d.DailyPaidAmount
                                                FROM 
                                                amount AS a
                                                JOIN 
                                                detail AS d ON a.subname = d.subname
                                                WHERE 
                                                a.name = $1;`
	UserDetailQuery = `SELECT a.name,SUM(a.amount) AS total_amount,SUM(d.DailyPaidAmount) AS total_daily_paid_amount,MIN(a.endDate) AS nearest_end_date
                                                FROM 
                                                amount a
                                                JOIN 
                                                detail d ON a.subName = d.subName
                                                GROUP BY 
                                                 a.name;`

	addMoneyByNameQuery = `UPDATE detail
                                SET 
                                noOfRemainingDay = noOfRemainingDay - $1,
                                settlementAmount = settlementAmount - ($1 * DailyPaidAmount)
                                WHERE 
                                name = $2;`
	addMoneyByName2Query = ` UPDATE detail SET 
                                CurrentEndDate = CURRENT_DATE + INTERVAL '1 day' * noOfRemainingDay
                                WHERE 
                                name = $1;`
	getDetailByName = `SELECT a.name, a.subName, a.noOfDays, a.amount, a.startDate, d.noOfRemainingDay, 
			        d.DailyPaidAmount, 
			        d.CurrentEndDate, 
			        d.settlementAmount
		                FROM 
			        amount a 
		                INNER JOIN 
			        detail d 
		                ON 
			        a.subName = d.subName
		                WHERE 
			        a.name = $1;`
	getDetailBySubNameQuery = `SELECT a.name AS Name,a.subName AS SubName,
                                        a.startDate AS startDate,
                                        a.endDate AS endDate,
                                        a.amount AS amount,
                                        d.settlementAmount AS settlementAmount,
                                        d.noOfRemainingDay AS noOfRemainingDay,
                                        a.noOfDays AS totalNoOfDays,
                                        d.DailyPaidAmount AS DailyPaidAmount,
                                        d.CurrentEndDate AS CurrentEndDate
                                        FROM 
                                                amount a
                                        INNER JOIN 
                                                detail d 
                                        ON 
                                                a.subName = d.subName
                                        WHERE 
                                                a.subName = $1;`
        
        addMoneyBySubNameQuery = `UPDATE detail
                                SET 
                                noOfRemainingDay = noOfRemainingDay - $1,
                                settlementAmount = settlementAmount - ($1 * DailyPaidAmount)
                                WHERE 
                                subName = $2;`
	addMoneyBySubName2Query = ` UPDATE detail SET 
                                CurrentEndDate = CURRENT_DATE + INTERVAL '1 day' * noOfRemainingDay
                                WHERE 
                                subName = $1;`
        deleteQuery = `DELETE FROM users WHERE subName = $1`

        totalDailyCollectionQuery = `SELECT name, SUM(DailyPaidAmount) AS TotalDailyPaidAmount
                                FROM detail
                                GROUP BY name
                                ORDER BY TotalDailyPaidAmount DESC;`

        updateCurrentDateForAllUser = ` UPDATE detail SET 
                                CurrentEndDate = CURRENT_DATE + INTERVAL '1 day' * noOfRemainingDay;`
                                        
)
