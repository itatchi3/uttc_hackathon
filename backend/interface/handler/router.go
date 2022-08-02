package handler

import (
	"github.com/labstack/echo"
)

// InitRouting routesの初期化
func InitRouting(e *echo.Echo, userHandler UserHandler, channelHandler ChannelHandler, messageHandler MessageHandler) {

	e.POST("/User", userHandler.Post())
	e.GET("/User/:id", userHandler.Get())
	e.PUT("/User/:id", userHandler.Put())
	e.DELETE("/User/:id", userHandler.Delete())
	e.POST("/Channel", channelHandler.Post())
	e.GET("/Channel/:id", channelHandler.Get())
	e.GET("/Channel", channelHandler.GetAll())
	e.PUT("/Channel/:id", channelHandler.Put())
	e.DELETE("/Channel/:id", channelHandler.Delete())
	e.POST("/Message", messageHandler.Post())
	e.GET("/Message/:id", messageHandler.Get())
	e.PUT("/Message/:id", messageHandler.Put())
	e.DELETE("/Message/:id", messageHandler.Delete())

}
