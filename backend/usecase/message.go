package usecase

import (
	"uttc_backend/domain/model"
	"uttc_backend/domain/repository"
)

// MessageUsecase Message usecaseのinterface
type MessageUsecase interface {
	Create(text string, userID, channelID uint) (*model.Message, error)
	FindByID(id uint) (*model.Message, error)
	Update(text string, id, userID, channelID uint) (*model.Message, error)
	Delete(id uint) error
}

type messageUsecase struct {
	messageRepo repository.MessageRepository
}

// NewMessageUsecase Message usecaseのコンストラクタ
func NewMessageUsecase(messageRepo repository.MessageRepository) MessageUsecase {
	return &messageUsecase{messageRepo: messageRepo}
}

// Create messageを保存するときのユースケース
func (uu *messageUsecase) Create(text string, userID, channelID uint) (*model.Message, error) {
	Message, err := model.NewMessage(text, userID, channelID)
	if err != nil {
		return nil, err
	}

	createdMessage, err := uu.messageRepo.Create(Message)
	if err != nil {
		return nil, err
	}

	return createdMessage, nil
}

// FindByID messageをIDで取得するときのユースケース
func (uu *messageUsecase) FindByID(id uint) (*model.Message, error) {
	foundMessage, err := uu.messageRepo.FindByID(id)
	if err != nil {
		return nil, err
	}

	return foundMessage, nil
}

// Update messageを更新するときのユースケース
func (uu *messageUsecase) Update(text string, id, userID, channelID uint) (*model.Message, error) {
	targetMessage, err := uu.messageRepo.FindByID(id)
	if err != nil {
		return nil, err
	}

	err = targetMessage.Set(text, userID, channelID)
	if err != nil {
		return nil, err
	}

	updatedMessage, err := uu.messageRepo.Update(targetMessage)
	if err != nil {
		return nil, err
	}

	return updatedMessage, nil
}

// Delete messageを削除するときのユースケース
func (uu *messageUsecase) Delete(id uint) error {
	Message, err := uu.messageRepo.FindByID(id)
	if err != nil {
		return err
	}

	err = uu.messageRepo.Delete(Message)
	if err != nil {
		return err
	}

	return nil
}
