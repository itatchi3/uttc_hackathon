package usecase

import (
	"uttc_backend/domain/model"
	"uttc_backend/domain/repository"
)

// UserUsecase User usecaseのinterface
type UserUsecase interface {
	Create(name, email, password, profileURL string) (*model.User, error)
	FindByID(id uint) (*model.User, error)
	Update(id uint, name, email, password, profileURL string) (*model.User, error)
	Delete(id uint) error
}

type userUsecase struct {
	userRepo repository.UserRepository
}

// NewUserUsecase User usecaseのコンストラクタ
func NewUserUsecase(userRepo repository.UserRepository) UserUsecase {
	return &userUsecase{userRepo: userRepo}
}

// Create userを保存するときのユースケース
func (uu *userUsecase) Create(name, email, password, profileURL string) (*model.User, error) {
	User, err := model.NewUser(name, email, password, profileURL)
	if err != nil {
		return nil, err
	}

	createdUser, err := uu.userRepo.Create(User)
	if err != nil {
		return nil, err
	}

	return createdUser, nil
}

// FindByID userをIDで取得するときのユースケース
func (uu *userUsecase) FindByID(id uint) (*model.User, error) {
	foundUser, err := uu.userRepo.FindByID(id)
	if err != nil {
		return nil, err
	}

	return foundUser, nil
}

// Update userを更新するときのユースケース
func (uu *userUsecase) Update(id uint, name, email, password, profileURL string) (*model.User, error) {
	targetUser, err := uu.userRepo.FindByID(id)
	if err != nil {
		return nil, err
	}

	err = targetUser.Set(name, email, password, profileURL)
	if err != nil {
		return nil, err
	}

	updatedUser, err := uu.userRepo.Update(targetUser)
	if err != nil {
		return nil, err
	}

	return updatedUser, nil
}

// Delete userを削除するときのユースケース
func (uu *userUsecase) Delete(id uint) error {
	User, err := uu.userRepo.FindByID(id)
	if err != nil {
		return err
	}

	err = uu.userRepo.Delete(User)
	if err != nil {
		return err
	}

	return nil
}
