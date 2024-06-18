package handler

import (
	"github.com/gin-gonic/gin"
	"microCreditplus/pkg/comman"
	"net/http"
	"strings"
	"sync"
	"os"
	"microCreditplus/pkg/loghistory"
)

type Handler struct {
	lock sync.Mutex
	l    Losic
}

var log = loghistory.New(os.Stdout, loghistory.INFO)

func (h *Handler) AddUser(c *gin.Context) {
	var user comman.User
	if err := c.BindJSON(&user); err != nil {
		log.Error("Failed to bind user JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Info("Received Data To Add User: %+v", user)
	err := h.l.AddUserLosicHandler(user)
	if err != nil {
		log.Error("Some issue While Adding The User: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Info("User Added with name: %s", user.Name)
	c.JSON(http.StatusCreated, "User Created")
}

func (h *Handler) DeleteUser(c *gin.Context) {
	var user comman.DeleteUser
	if err := c.BindJSON(&user); err != nil {
		log.Error("Failed to bind delete user JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Info("Received Data To Delete User: %+v", user)
	err := h.l.deleteUserHandlerLosic(user)
	if err != nil {
		log.Error("Some issue While Deleting The User: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Info("User Deleted with ID: %+v", user)
	c.JSON(http.StatusCreated, "User deleted")
}

func (h *Handler) AddMoney(c *gin.Context) {
	var addMoney comman.AddMoney
	if err := c.BindJSON(&addMoney); err != nil {
		log.Error("Failed to bind add money JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Info("Received Data To Add Money for user: %s", addMoney.Name)
	err := h.l.AddMoneyLosicHandler(addMoney)
	if err != nil {
		log.Error("Some issue While Adding Money: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Info("Money Added for user ID: %s", addMoney.Name)
	c.JSON(http.StatusCreated, "Money Added")
}

func (h *Handler) GetAllUser(c *gin.Context) {
	log.Info("Fetching All Users")
	users, err := h.l.GetAllUserLogisHandler()
	if err != nil {
		log.Error("Some issue While Fetching All Users: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Info("Fetched All Users")
	c.JSON(http.StatusOK, users)
}

func (h *Handler) GetUserByName(c *gin.Context) {
	name := c.Param("name")
	log.Info("Fetching User By Name: %s", name)
	users, err := h.l.GetAllUserLogisHandlerByName(name)
	if err != nil {
		log.Error("Some issue While Fetching User By Name: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Info("Fetched User By Name: %s", name)
	c.JSON(http.StatusOK, users)
}

func (h *Handler) TodayCollection(c *gin.Context) {
	log.Info("Fetching Today's Collection")
	todayCollections, err := h.l.TodayCollectionLosicHandler()
	if err != nil {
		log.Error("Some issue While Fetching Today's Collection: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Info("Fetched Today's Collection")
	c.JSON(http.StatusOK, todayCollections)
}

func (h *Handler) LoginUser(c *gin.Context) {
	UserLogin := comman.Login{}
	if err := c.BindJSON(&UserLogin); err != nil {
		log.Error("Failed to bind login JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	UserLogin.UserName = strings.ToUpper(strings.TrimSpace(UserLogin.UserName))
	log.Info("Attempting to Login User: %s", UserLogin.UserName)
	if UserLogin.UserName == "MANISH" && UserLogin.Password == "Man@123" {
		log.Info("Login Successful for User: %s", UserLogin.UserName)
		c.JSON(http.StatusOK, "Login Successfully")
	} else {
		log.Error("Wrong Credential for User: %s", UserLogin.UserName)
		c.JSON(http.StatusBadRequest, "Wrong Credential")
		return
	}
}

func (h *Handler) GetDetails(c *gin.Context) {
	log.Info("Fetching Details")
	details, err := h.l.GetDetailHandler()
	if err != nil {
		log.Error("Some issue While Fetching Details: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Info("Fetched Details")
	c.JSON(http.StatusOK, details)
}

func (h *Handler) AddMoneyByName(c *gin.Context) {
	addMoneyByName := comman.AddMoneyByName{}
	if err := c.BindJSON(&addMoneyByName); err != nil {
		log.Error("Failed to bind add money by name JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Info("Received Data To Add Money By Name: %+v", addMoneyByName)
	err := h.l.AddMoneyByNameLosicHandler(addMoneyByName)
	if err != nil {
		log.Error("Some issue While Adding Money By Name: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Info("Money Added for user: %s", addMoneyByName.Name)
	c.JSON(http.StatusCreated, "Money Added")
}

func (h *Handler) GetDetailByName(c *gin.Context) {
	name := c.Param("name")
	log.Info("Fetching Detail By Name: %s", name)
	detailByName, err := h.l.GetDetailLosicHandler(name)
	if err != nil {
		log.Error("Some issue While Fetching Detail By Name: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Info("Fetched Detail By Name: %s", name)
	c.JSON(http.StatusOK, detailByName)
}

func (h *Handler) GetDetailBySubName(c *gin.Context) {
	subName := c.Param("subName")
	log.Info("Fetching Detail By SubName: %s", subName)
	detailByName, err := h.l.GetDetailLosicHandlerForSubName(subName)
	if err != nil {
		log.Error("Some issue While Fetching Detail By SubName: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Info("Fetched Detail By SubName: %s", subName)
	c.JSON(http.StatusOK, detailByName)
}

func (h *Handler) DeleteUserBySubName(c *gin.Context) {
	subName := c.Param("subName")
	log.Info("Deleting User By SubName: %s", subName)
	err := h.l.DeleteUserHandlerLosic(subName)
	if err != nil {
		log.Error("Some issue While Deleting User By SubName: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	log.Info("User Deleted By SubName: %s", subName)
	c.JSON(http.StatusOK, gin.H{"Status": "User Deleted"})
}
