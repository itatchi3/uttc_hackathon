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

	e := echo.New()
	handler.InitRouting(e, userHandler)
	e.Logger.Fatal(e.Start(":8080"))
}
