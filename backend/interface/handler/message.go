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
	GetByChannelID() echo.HandlerFunc
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

type responseGetMessage struct {
	ID        uint   `json:"id"`
	Text      string `json:"text"`
	User      UserInMessagge
	ChannelID uint `json:"channel_id"`
}

type UserInMessagge struct {
	ID         uint   `json:"id"`
	Name       string `json:"name"`
	ProfileURL string `json:"image_url"`
}

type responseGetMessages []responseGetMessage

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

		res := responseGetMessage{
			ID:   foundMessage.ID,
			Text: foundMessage.Text,
			User: UserInMessagge{
				ID:         foundMessage.User.ID,
				Name:       foundMessage.User.Name,
				ProfileURL: foundMessage.User.ProfileURL,
			},
			ChannelID: foundMessage.ChannelID,
		}

		return c.JSON(http.StatusOK, res)
	}
}

// Get messageを取得するときのハンドラー
func (th *messageHandler) GetByChannelID() echo.HandlerFunc {
	return func(c echo.Context) error {
		channelID, err := strconv.ParseUint(c.Param("channelID"), 10, 64)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		foundMessages, err := th.messageUsecase.FindByChannelID(uint(channelID))
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		var res responseGetMessages
		// 不定長のデータ構造をつける。
		for i := 0; i < len(*foundMessages); i++ {
			//fmt.Println(i)
			res = append(res, responseGetMessage{
				ID:   (*foundMessages)[i].ID,
				Text: (*foundMessages)[i].Text,
				User: UserInMessagge{
					ID:         (*foundMessages)[i].User.ID,
					Name:       (*foundMessages)[i].User.Name,
					ProfileURL: (*foundMessages)[i].User.ProfileURL,
				},
				ChannelID: (*foundMessages)[i].ChannelID,
			})
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
