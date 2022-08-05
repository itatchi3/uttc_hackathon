package repository

import (
	"uttc_backend/domain/model"
)

// UserRepository User repositoryのinterface
type UserRepository interface {
	Create(User *model.User) (*model.User, error)
	FindByID(id uint) (*model.User, error)
	FindAll() (*[]model.User, error)
	Update(User *model.User) (*model.User, error)
	Delete(User *model.User) error
}
