package model

import (
	"errors"

	"github.com/jinzhu/gorm"
)

// Channel channelの構造体
type Channel struct {
	gorm.Model

	Name     string
	Messages []Message
}

// NewChannel channelのコンストラクタ
func NewChannel(name string) (*Channel, error) {
	if name == "" {
		return nil, errors.New("nameを入力してください")
	}

	channel := &Channel{
		Name: name,
	}

	return channel, nil
}

// Set channelのセッター
func (t *Channel) Set(name string) error {
	if name == "" {
		return errors.New("nameを入力してください")
	}

	t.Name = name

	return nil
}
