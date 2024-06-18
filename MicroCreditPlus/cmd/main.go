
package main


import (
    "fmt"
    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    "microCreditplus/pkg/database"
    "microCreditplus/pkg/handler"
    "time"
    "os"
    "microCreditplus/pkg/loghistory"
    "github.com/spf13/viper"
)

type restAPI struct {
    hn handler.Handler
    db database.Database
    l  handler.Losic
}

func init() {
    var r restAPI
    log := loghistory.New(os.Stdout, loghistory.INFO)
    for {
        db, err := r.db.ConnectToDB()
        if err == nil {
            log.Info( "DataBase connection Estabilish", err)
            break
        }
        log.Error("Error while creatting database connection", db)
        fmt.Println("Failed to connect to database. Retrying in 5 seconds...", err)
        time.Sleep(5 * time.Second)
    }
    userError := r.db.TableUser()
    amountError := r.db.TableAmount()
    detailError := r.db.TableDetail()
    if userError != nil {
        log.Error("Error while Creating The User Table", userError.Error())
    }
    if amountError != nil {
        log.Error("Error while Creating The User Table", amountError.Error())
    }
    if detailError != nil {
        log.Error("Error while Creating The User Table", detailError.Error())
    }
    log.Info("cleaning the daily Collection detail to store new current date collection")
    r.l.StartDailyCleanup()
    log.Info("Loading the detail after running cleaning process")
    r.l.LoadNewCollection()
    log.Info("Running the task to update current End Date based on current date")
    scheduleDailyTask(&r)
}

func main() {
    viper.SetConfigName("config")
    viper.SetConfigType("json") 
    viper.AddConfigPath(".")
    viper.AutomaticEnv()
    if err := viper.ReadInConfig(); err != nil {
        fmt.Printf("Error reading config file, %s", err)
    }
    HostPort:= viper.GetString("Port")
    FrontEndHost := viper.GetString("FrontEndHost")
    FrontEndPort := viper.GetString("FrontEndPORT")
    var restHandler restAPI
    router := gin.Default()

    // Configure CORS middleware
    router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://"+FrontEndHost+":"+FrontEndPort}, 
        AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge: 12 * time.Hour,
    }))

    usergroup := router.Group("/microcreditUser")
    usergroup.POST("/adduser", restHandler.hn.AddUser)
    usergroup.DELETE("/user/delete", restHandler.hn.DeleteUser)
    usergroup.POST("/user/login", restHandler.hn.LoginUser)
    usergroup.PATCH("/user/add/money/subname", restHandler.hn.AddMoney)
    usergroup.PATCH("/user/add/money/name", restHandler.hn.AddMoneyByName)
    usergroup.GET("/user/", restHandler.hn.GetAllUser)
    usergroup.GET("/user", restHandler.hn.GetAllUser)
    usergroup.GET("/user/:name", restHandler.hn.GetUserByName)
    usergroup.GET("/user/details", restHandler.hn.GetDetails)
    usergroup.GET("/today/collections", restHandler.hn.TodayCollection)
    usergroup.GET("/user/name/:name", restHandler.hn.GetDetailByName)
    usergroup.GET("/user/subName/:subName", restHandler.hn.GetDetailBySubName)
    usergroup.DELETE("/user/subName/:subName",restHandler.hn.DeleteUserBySubName)
    router.Run(":"+HostPort)
}

func scheduleDailyTask(r *restAPI) {
    logHistory := loghistory.New(os.Stdout, loghistory.INFO)
    go func() {
        now := time.Now()
        logHistory.Info("Current Date", now)
        tomorrow := now.AddDate(0, 0, 1)
        next := time.Date(tomorrow.Year(), tomorrow.Month(), tomorrow.Day(), 0, 1, 0, 0, now.Location())
        duration := next.Sub(now)
        timer := time.NewTimer(duration)
        <-timer.C
        logHistory.Info("Running r.db.Start() at 12:01 AM")
        r.db.UpdateCurrentEndDate()
        scheduleDailyTask(r)
    }()
}
