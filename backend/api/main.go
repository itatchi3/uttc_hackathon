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
	taskRepository := infra.NewTaskRepository(config.NewDB())
	taskUsecase := usecase.NewTaskUsecase(taskRepository)
	taskHandler := handler.NewTaskHandler(taskUsecase)

	e := echo.New()
	handler.InitRouting(e, taskHandler)
	e.Logger.Fatal(e.Start(":8080"))
}
