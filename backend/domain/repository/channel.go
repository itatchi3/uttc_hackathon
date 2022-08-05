package repository

import (
	"uttc_backend/domain/model"
)

// ChannelRepository Channel repositoryのinterface
type ChannelRepository interface {
	Create(Channel *model.Channel) (*model.Channel, error)
	FindByID(id uint) (*model.Channel, error)
	Update(Channel *model.Channel) (*model.Channel, error)
	Delete(Channel *model.Channel) error
}
