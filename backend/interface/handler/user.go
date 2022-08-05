package handler

import (
	"net/http"
	"strconv"

	"uttc_backend/usecase"

	"github.com/labstack/echo"
)

// UserHandler User handlerのinterface
type UserHandler interface {
	Post() echo.HandlerFunc
	Get() echo.HandlerFunc
	GetAll() echo.HandlerFunc
	Put() echo.HandlerFunc
	Delete() echo.HandlerFunc
}

type userHandler struct {
	userUsecase usecase.UserUsecase
}

// NewUserHandler User handlerのコンストラクタ
func NewUserHandler(userUsecase usecase.UserUsecase) UserHandler {
	return &userHandler{userUsecase: userUsecase}
}

type requestUser struct {
	Name       string `json:"name"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	ProfileURL string `json:"profile_url"`
}

type responseUser struct {
	ID         uint   `json:"id"`
	Name       string `json:"name"`
	ProfileURL string `json:"profile_url"`
}

type responseUsers []responseUser

// Post userを保存するときのハンドラー
func (th *userHandler) Post() echo.HandlerFunc {
	return func(c echo.Context) error {
		var req requestUser
		if err := c.Bind(&req); err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		createdUser, err := th.userUsecase.Create(req.Name, req.Email, req.Password, req.ProfileURL)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		res := responseUser{
			ID:         createdUser.ID,
			Name:       createdUser.Name,
			ProfileURL: createdUser.ProfileURL,
		}

		return c.JSON(http.StatusCreated, res)
	}
}

// Get userを取得するときのハンドラー
func (th *userHandler) Get() echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		foundUser, err := th.userUsecase.FindByID(uint(id))
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		res := responseUser{
			ID:         foundUser.ID,
			Name:       foundUser.Name,
			ProfileURL: foundUser.ProfileURL,
		}

		return c.JSON(http.StatusOK, res)
	}
}

// Get userをすべて取得するときのハンドラー
func (th *userHandler) GetAll() echo.HandlerFunc {
	return func(c echo.Context) error {
		foundUsers, err := th.userUsecase.FindAll()
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		var res responseUsers
		// 不定長のデータ構造をつける。
		for i := 0; i < len(*foundUsers); i++ {
			//fmt.Println(i)
			res = append(res, responseUser{
				ID:         (*foundUsers)[i].ID,
				Name:       (*foundUsers)[i].Name,
				ProfileURL: (*foundUsers)[i].ProfileURL,
			})
		}

		return c.JSON(http.StatusOK, res)
	}
}

// Put userを更新するときのハンドラー
func (th *userHandler) Put() echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		var req requestUser
		if err := c.Bind(&req); err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		updatedUser, err := th.userUsecase.Update(uint(id), req.Name, req.Email, req.Password, req.ProfileURL)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		res := responseUser{
			ID:         updatedUser.ID,
			Name:       updatedUser.Name,
			ProfileURL: updatedUser.ProfileURL,
		}

		return c.JSON(http.StatusOK, res)
	}
}

// Delete userを削除するときのハンドラー
func (th *userHandler) Delete() echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		err = th.userUsecase.Delete(uint(id))
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		return c.NoContent(http.StatusNoContent)
	}
}
