package handler

import (
	"github.com/labstack/echo"
)

// InitRouting routesの初期化
func InitRouting(e *echo.Echo, userHandler UserHandler) {

	e.POST("/User", userHandler.Post())
	e.GET("/User/:id", userHandler.Get())
	e.PUT("/User/:id", userHandler.Put())
	e.DELETE("/User/:id", userHandler.Delete())

}
