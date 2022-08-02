package infra

import (
	"uttc_backend/domain/model"
	"uttc_backend/domain/repository"

	"github.com/jinzhu/gorm"
)

type channelRepository struct {
	Conn *gorm.DB
}

// NewChannelRepository Channel repositoryのコンストラクタ
func NewChannelRepository(conn *gorm.DB) repository.ChannelRepository {
	return &channelRepository{Conn: conn}
}

// Create channelの保存
func (tr *channelRepository) Create(Channel *model.Channel) (*model.Channel, error) {
	if err := tr.Conn.Create(&Channel).Error; err != nil {
		return nil, err
	}

	return Channel, nil
}

// FindByID channelをIDで取得
func (tr *channelRepository) FindByID(id uint) (*model.Channel, error) {
	Channel := &model.Channel{Model: gorm.Model{ID: id}}

	if err := tr.Conn.First(&Channel).Error; err != nil {
		return nil, err
	}

	return Channel, nil
}

// FindAll channelをすべて取得
func (tr *channelRepository) FindAll() (*[]model.Channel, error) {
	Channels := &[]model.Channel{}

	if err := tr.Conn.Find(&Channels).Error; err != nil {
		return nil, err
	}

	return Channels, nil
}

// Update channelの更新
func (tr *channelRepository) Update(Channel *model.Channel) (*model.Channel, error) {
	if err := tr.Conn.Model(&Channel).Update(&Channel).Error; err != nil {
		return nil, err
	}

	return Channel, nil
}

// Delete channelの削除
func (tr *channelRepository) Delete(Channel *model.Channel) error {
	if err := tr.Conn.Delete(&Channel).Error; err != nil {
		return err
	}

	return nil
}
