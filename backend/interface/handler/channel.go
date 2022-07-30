package handler

import (
	"net/http"
	"strconv"

	"uttc_backend/usecase"

	"github.com/labstack/echo"
)

// ChannelHandler Channel handlerのinterface
type ChannelHandler interface {
	Post() echo.HandlerFunc
	Get() echo.HandlerFunc
	Put() echo.HandlerFunc
	Delete() echo.HandlerFunc
}

type channelHandler struct {
	channelUsecase usecase.ChannelUsecase
}

// NewChannelHandler Channel handlerのコンストラクタ
func NewChannelHandler(channelUsecase usecase.ChannelUsecase) ChannelHandler {
	return &channelHandler{channelUsecase: channelUsecase}
}

type requestChannel struct {
	Name string `json:"name"`
}

type responseChannel struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
}

// Post channelを保存するときのハンドラー
func (th *channelHandler) Post() echo.HandlerFunc {
	return func(c echo.Context) error {
		var req requestChannel
		if err := c.Bind(&req); err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		createdChannel, err := th.channelUsecase.Create(req.Name)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		res := responseChannel{
			ID:   createdChannel.ID,
			Name: createdChannel.Name,
		}

		return c.JSON(http.StatusCreated, res)
	}
}

// Get channelを取得するときのハンドラー
func (th *channelHandler) Get() echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		foundChannel, err := th.channelUsecase.FindByID(uint(id))
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		res := responseChannel{
			ID:   foundChannel.ID,
			Name: foundChannel.Name,
		}

		return c.JSON(http.StatusOK, res)
	}
}

// Put channelを更新するときのハンドラー
func (th *channelHandler) Put() echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		var req requestChannel
		if err := c.Bind(&req); err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		updatedChannel, err := th.channelUsecase.Update(uint(id), req.Name)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		res := responseChannel{
			ID:   updatedChannel.ID,
			Name: updatedChannel.Name,
		}

		return c.JSON(http.StatusOK, res)
	}
}

// Delete channelを削除するときのハンドラー
func (th *channelHandler) Delete() echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		err = th.channelUsecase.Delete(uint(id))
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		return c.NoContent(http.StatusNoContent)
	}
}
