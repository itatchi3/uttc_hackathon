package model

import (
	"errors"

	"github.com/jinzhu/gorm"
)

// User userの構造体
type User struct {
	gorm.Model

	Name       string
	Email      string
	Password   string
	ProfileURL string
	Messages   []Message
}

// NewUser userのコンストラクタ
func NewUser(name, email, password, profileURL string) (*User, error) {
	if name == "" {
		return nil, errors.New("nameを入力してください")
	}

	if email == "" {
		return nil, errors.New("emailを入力してください")
	}

	if password == "" {
		return nil, errors.New("passwordを入力してください")
	}

	user := &User{
		Name:       name,
		Email:      email,
		Password:   password,
		ProfileURL: profileURL,
	}

	return user, nil
}

// Set userのセッター
func (t *User) Set(name, email, password, profileURL string) error {
	if name == "" {
		return errors.New("nameを入力してください")
	}

	if email == "" {
		return errors.New("emailを入力してください")
	}

	if password == "" {
		return errors.New("passwordを入力してください")
	}

	t.Name = name
	t.Email = email
	t.Password = password
	t.ProfileURL = profileURL

	return nil
}
