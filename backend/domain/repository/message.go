package repository

import (
	"uttc_backend/domain/model"
)

// MessageRepository Message repositoryのinterface
type MessageRepository interface {
	Create(Message *model.Message) (*model.Message, error)
	FindByID(id uint) (*model.Message, error)
	Update(Message *model.Message) (*model.Message, error)
	Delete(Message *model.Message) error
}
