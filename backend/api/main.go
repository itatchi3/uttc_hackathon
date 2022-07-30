package main

import (
	"uttc_backend/config"
	"uttc_backend/infra"
	"uttc_backend/interface/handler"
	"uttc_backend/usecase"

	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/labstack/echo"
)

func main() {
	userRepository := infra.NewUserRepository(config.NewDB())
	userUsecase := usecase.NewUserUsecase(userRepository)
	userHandler := handler.NewUserHandler(userUsecase)
	channelRepository := infra.NewChannelRepository(config.NewDB())
	channelUsecase := usecase.NewChannelUsecase(channelRepository)
	channelHandler := handler.NewChannelHandler(channelUsecase)

	e := echo.New()
	handler.InitRouting(e, userHandler, channelHandler)
	e.Logger.Fatal(e.Start(":8080"))
}
