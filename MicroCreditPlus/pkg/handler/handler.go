package handler

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"microCreditplus/pkg/comman"
	"net/http"
	"strings"
	"sync"
)

type Handler struct {
	lock sync.Mutex
	l    Losic
}

func (h *Handler) AddUser(c *gin.Context) {
	var user comman.User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := h.l.AddUserLosicHandler(user)
	if err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return
	}

	c.JSON(http.StatusCreated, "User Created")
}

func (h *Handler) DeleteUser(c *gin.Context) {
	var user comman.DeleteUser
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := h.l.deleteUserHandlerLosic(user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, "User deleted")
}

func (h *Handler) AddMoney(c *gin.Context) {
	var addMoney comman.AddMoney
	if err := c.BindJSON(&addMoney); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.l.AddMoneyLosicHandler(addMoney)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, "Money Added")
}

func (h *Handler) GetAllUser(c *gin.Context) {
	users, err := h.l.GetAllUserLogisHandler()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, users)
}

func (h *Handler) GetUserByName(c *gin.Context) {
	name := c.Param("name")
	users, err := h.l.GetAllUserLogisHandlerByName(name)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, users)
}

func (h *Handler) TodayCollection(c *gin.Context) {
	todayCollections, err := h.l.TodayCollectionLosicHandler()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, todayCollections)
}

func (h *Handler) LoginUser(c *gin.Context) {
	UserLogin := comman.Login{}
	if err := c.BindJSON(&UserLogin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	UserLogin.UserName = strings.ToUpper(strings.TrimSpace(UserLogin.UserName))
	if UserLogin.UserName == "MANISH" && UserLogin.Password == "Man@123" {
		c.JSON(http.StatusOK, "Login Successfully")
	} else {

		c.JSON(http.StatusBadRequest, "wrong Credential")
		return
	}
}

func (h *Handler) GetDetails(c *gin.Context) {
	details, err := h.l.GetDetailHandler()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, details)
}

func (h *Handler) AddMoneyByName(c *gin.Context) {
	addMoneyByName := comman.AddMoneyByName{}
	if err := c.BindJSON(&addMoneyByName); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := h.l.AddMoneyByNameLosicHandler(addMoneyByName)
	fmt.Println(err)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, "Money Added")
}

func (h *Handler) GetDetailByName(c *gin.Context) {
	name := c.Param("name")
	fmt.Println(name)
	detailByName, err := h.l.GetDetailLosicHandler(name)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fmt.Println(detailByName)
	c.JSON(http.StatusOK, detailByName)
}

func (h *Handler) GetDetailBySubName(c *gin.Context) {
	subName := c.Param("subName")
	fmt.Println(subName)
	detailByName, err := h.l.GetDetailLosicHandlerForSubName(subName)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fmt.Println(detailByName)
	c.JSON(http.StatusOK, detailByName)
}

func (h *Handler) DeleteUSerBySubName(c *gin.Context) {
	subName := c.Param("subName")
	fmt.Println(subName)
	err := h.l.DeleteUserHandlerLosic(subName)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"Staus": "User Deleted"})
}
