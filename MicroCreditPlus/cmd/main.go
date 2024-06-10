
package main


import (
    "fmt"
    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
    "microCreditplus/pkg/database"
    "microCreditplus/pkg/handler"
    "time"
)

type restAPI struct {
    hn handler.Handler
    db database.Database
    l  handler.Losic
}

func init() {
    var r restAPI
    for {
        _, err := r.db.ConnectToDB()
        if err == nil {
            break
        }
        fmt.Println("Failed to connect to database. Retrying in 5 seconds...", err)
        time.Sleep(5 * time.Second)
    }
    userError := r.db.TableUser()
    amountError := r.db.TableAmount()
    detailError := r.db.TableDetail()
    if userError != nil {
        fmt.Println(userError.Error())
    }
    if amountError != nil {
        fmt.Println(amountError.Error())
    }
    if detailError != nil {
        fmt.Println(detailError.Error())
    }
    r.l.StartDailyCleanup()
    r.l.LoadNewCollection()
}

func main() {
    var restHandler restAPI
    router := gin.Default()

    // Configure CORS middleware
    router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:5173"}, // replace with your frontend URL
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
    usergroup.DELETE("/user/subName/:subName",restHandler.hn.DeleteUSerBySubName)
    router.Run(":8080")
}
