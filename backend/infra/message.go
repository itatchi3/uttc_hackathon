package infra

import (
	"uttc_backend/domain/model"
	"uttc_backend/domain/repository"

	"github.com/jinzhu/gorm"
)

type messageRepository struct {
	Conn *gorm.DB
}

// NewMessageRepository Message repositoryのコンストラクタ
func NewMessageRepository(conn *gorm.DB) repository.MessageRepository {
	return &messageRepository{Conn: conn}
}

// Create messageの保存
func (tr *messageRepository) Create(Message *model.Message) (*model.Message, error) {
	if err := tr.Conn.Create(&Message).Error; err != nil {
		return nil, err
	}

	return Message, nil
}

// FindByID messageをIDで取得
func (tr *messageRepository) FindByID(id uint) (*model.Message, error) {
	Message := &model.Message{Model: gorm.Model{ID: id}}

	if err := tr.Conn.Preload("User").First(&Message).Error; err != nil {
		return nil, err
	}

	return Message, nil
}

// FindByChannelID messageをChannelIDですべて取得
func (tr *messageRepository) FindByChannelID(channelID uint) (*[]model.Message, error) {
	Messages := &[]model.Message{}

	if err := tr.Conn.Where("channel_id = ?", channelID).Preload("User").Find(&Messages).Error; err != nil {
		return nil, err
	}

	return Messages, nil
}

// Update messageの更新
func (tr *messageRepository) Update(Message *model.Message) (*model.Message, error) {
	if err := tr.Conn.Model(&Message).Update(&Message).Error; err != nil {
		return nil, err
	}

	return Message, nil
}

// Delete messageの削除
func (tr *messageRepository) Delete(Message *model.Message) error {
	if err := tr.Conn.Delete(&Message).Error; err != nil {
		return err
	}

	return nil
}
