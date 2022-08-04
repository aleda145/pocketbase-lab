package main

import (
	"fmt"
	"log"
	"net/http"

	_ "github.com/aleda145/pocketbase-example/pocketbase/migrations"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	fmt.Println("Initalizating pocketbase")
	app := pocketbase.New()

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		// serves static files from the provided public dir (if exists)
		subFs := echo.MustSubFS(e.Router.Filesystem, "pb_public")
		e.Router.GET("/*", apis.StaticDirectoryHandler(subFs, false))

		return nil
	})
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.AddRoute(echo.Route{
			Method: http.MethodGet,
			Path:   "/api/hello",
			Handler: func(c echo.Context) error {
				return c.String(200, "Hello world!")
			},
			// Middlewares: []echo.MiddlewareFunc{
			// 	apis.RequireAdminOrUserAuth(),
			// },
		})

		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
