package usecase

import (
	"uttc_backend/domain/model"
	"uttc_backend/domain/repository"
)

// ChannelUsecase Channel usecaseのinterface
type ChannelUsecase interface {
	Create(name string) (*model.Channel, error)
	FindByID(id uint) (*model.Channel, error)
	FindAll() (*[]model.Channel, error)
	Update(id uint, name string) (*model.Channel, error)
	Delete(id uint) error
}

type channelUsecase struct {
	channelRepo repository.ChannelRepository
}

// NewChannelUsecase Channel usecaseのコンストラクタ
func NewChannelUsecase(channelRepo repository.ChannelRepository) ChannelUsecase {
	return &channelUsecase{channelRepo: channelRepo}
}

// Create channelを保存するときのユースケース
func (uu *channelUsecase) Create(name string) (*model.Channel, error) {
	Channel, err := model.NewChannel(name)
	if err != nil {
		return nil, err
	}

	createdChannel, err := uu.channelRepo.Create(Channel)
	if err != nil {
		return nil, err
	}

	return createdChannel, nil
}

// FindByID channelをIDで取得するときのユースケース
func (uu *channelUsecase) FindByID(id uint) (*model.Channel, error) {
	foundChannel, err := uu.channelRepo.FindByID(id)
	if err != nil {
		return nil, err
	}

	return foundChannel, nil
}

// FindAll channelをすべて取得するときのユースケース
func (uu *channelUsecase) FindAll() (*[]model.Channel, error) {
	foundChannels, err := uu.channelRepo.FindAll()
	if err != nil {
		return nil, err
	}

	return foundChannels, nil
}

// Update channelを更新するときのユースケース
func (uu *channelUsecase) Update(id uint, name string) (*model.Channel, error) {
	targetChannel, err := uu.channelRepo.FindByID(id)
	if err != nil {
		return nil, err
	}

	err = targetChannel.Set(name)
	if err != nil {
		return nil, err
	}

	updatedChannel, err := uu.channelRepo.Update(targetChannel)
	if err != nil {
		return nil, err
	}

	return updatedChannel, nil
}

// Delete channelを削除するときのユースケース
func (uu *channelUsecase) Delete(id uint) error {
	Channel, err := uu.channelRepo.FindByID(id)
	if err != nil {
		return err
	}

	err = uu.channelRepo.Delete(Channel)
	if err != nil {
		return err
	}

	return nil
}
