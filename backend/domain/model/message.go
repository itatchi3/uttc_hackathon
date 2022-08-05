package model

import (
	"errors"

	"github.com/jinzhu/gorm"
)

// Message messageの構造体
type Message struct {
	gorm.Model

	Text      string
	UserID    uint
	User      User
	ChannelID uint
}

// NewMessage messageのコンストラクタ
func NewMessage(text string, userID, channelID uint) (*Message, error) {
	if text == "" {
		return nil, errors.New("textを入力してください")
	}

	if userID == 0 {
		return nil, errors.New("userIDが必要です")
	}

	if channelID == 0 {
		return nil, errors.New("channelIDが必要です")
	}

	message := &Message{
		Text:      text,
		UserID:    userID,
		ChannelID: channelID,
	}

	return message, nil
}

// Set messageのセッター
func (t *Message) Set(text string, userID, channelID uint) error {
	if text == "" {
		return errors.New("nameを入力してください")
	}

	if userID == 0 {
		return errors.New("userIDが必要です")
	}

	if channelID == 0 {
		return errors.New("channelIDが必要です")
	}

	t.Text = text
	t.UserID = userID
	t.ChannelID = channelID

	return nil
}
