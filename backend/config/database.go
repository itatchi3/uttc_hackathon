package config

import (
	"fmt"
	"os"
	"uttc_backend/domain/model"

	"github.com/jinzhu/gorm"
)

// NewDB DBと接続する
func NewDB() *gorm.DB {
	mysqlUser := os.Getenv("MYSQL_USER")
	mysqlPwd := os.Getenv("MYSQL_PWD")
	mysqlHost := os.Getenv("MYSQL_HOST")
	mysqlDatabase := os.Getenv("MYSQL_DATABASE")

	connStr := fmt.Sprintf("%s:%s@%s/%s", mysqlUser, mysqlPwd, mysqlHost, mysqlDatabase)
	db, err := gorm.Open("mysql", connStr)

	// db, err := gorm.Open("mysql", "user:password@tcp(hackathon_backend_db)/sample?charset=utf8mb4&parseTime=True&loc=Local")

	if err != nil {
		panic(err)
	}

	db.AutoMigrate(model.User{})
	db.AutoMigrate(model.Channel{})
	db.AutoMigrate(model.Message{})

	return db
}
