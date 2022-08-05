package handler

import (
	"net/http"
	"strconv"

	"uttc_backend/usecase"

	"github.com/labstack/echo"
)

// MessageHandler Message handlerのinterface
type MessageHandler interface {
	Post() echo.HandlerFunc
	Get() echo.HandlerFunc
	Put() echo.HandlerFunc
	Delete() echo.HandlerFunc
}

type messageHandler struct {
	messageUsecase usecase.MessageUsecase
}

// NewMessageHandler Message handlerのコンストラクタ
func NewMessageHandler(messageUsecase usecase.MessageUsecase) MessageHandler {
	return &messageHandler{messageUsecase: messageUsecase}
}

type requestMessage struct {
	Text      string `json:"text"`
	UserID    uint   `json:"user_id"`
	ChannelID uint   `json:"channel_id"`
}

type responseMessage struct {
	ID        uint   `json:"id"`
	Text      string `json:"text"`
	UserID    uint   `json:"user_id"`
	ChannelID uint   `json:"channel_id"`
}

// Post messageを保存するときのハンドラー
func (th *messageHandler) Post() echo.HandlerFunc {
	return func(c echo.Context) error {
		var req requestMessage
		if err := c.Bind(&req); err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		createdMessage, err := th.messageUsecase.Create(req.Text, req.UserID, req.ChannelID)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		res := responseMessage{
			ID:        createdMessage.ID,
			Text:      createdMessage.Text,
			UserID:    createdMessage.UserID,
			ChannelID: createdMessage.ChannelID,
		}

		return c.JSON(http.StatusCreated, res)
	}
}

// Get messageを取得するときのハンドラー
func (th *messageHandler) Get() echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		foundMessage, err := th.messageUsecase.FindByID(uint(id))
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		res := responseMessage{
			ID:        foundMessage.ID,
			Text:      foundMessage.Text,
			UserID:    foundMessage.UserID,
			ChannelID: foundMessage.ChannelID,
		}

		return c.JSON(http.StatusOK, res)
	}
}

// Put messageを更新するときのハンドラー
func (th *messageHandler) Put() echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		var req requestMessage
		if err := c.Bind(&req); err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		updatedMessage, err := th.messageUsecase.Update(req.Text, uint(id), req.UserID, req.ChannelID)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		res := responseMessage{
			ID:        updatedMessage.ID,
			Text:      updatedMessage.Text,
			UserID:    updatedMessage.UserID,
			ChannelID: updatedMessage.ChannelID,
		}

		return c.JSON(http.StatusOK, res)
	}
}

// Delete messageを削除するときのハンドラー
func (th *messageHandler) Delete() echo.HandlerFunc {
	return func(c echo.Context) error {
		id, err := strconv.ParseUint(c.Param("id"), 10, 64)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		err = th.messageUsecase.Delete(uint(id))
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		return c.NoContent(http.StatusNoContent)
	}
}
