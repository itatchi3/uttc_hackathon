package infra

import (
	"uttc_backend/domain/model"
	"uttc_backend/domain/repository"

	"github.com/jinzhu/gorm"
)

type userRepository struct {
	Conn *gorm.DB
}

// NewUserRepository User repositoryのコンストラクタ
func NewUserRepository(conn *gorm.DB) repository.UserRepository {
	return &userRepository{Conn: conn}
}

// Create userの保存
func (tr *userRepository) Create(User *model.User) (*model.User, error) {
	if err := tr.Conn.Create(&User).Error; err != nil {
		return nil, err
	}

	return User, nil
}

// FindByID userをIDで取得
func (tr *userRepository) FindByID(id uint) (*model.User, error) {
	User := &model.User{Model: gorm.Model{ID: id}}

	if err := tr.Conn.First(&User).Error; err != nil {
		return nil, err
	}

	return User, nil
}

// Update userの更新
func (tr *userRepository) Update(User *model.User) (*model.User, error) {
	if err := tr.Conn.Model(&User).Update(&User).Error; err != nil {
		return nil, err
	}

	return User, nil
}

// Delete userの削除
func (tr *userRepository) Delete(User *model.User) error {
	if err := tr.Conn.Delete(&User).Error; err != nil {
		return err
	}

	return nil
}
