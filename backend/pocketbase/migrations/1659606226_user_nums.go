package migrations

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	userRequiredRule := "@request.user.id = user"
	m.Register(func(db dbx.Builder) error {
		collection := &models.Collection{
			Name:       "user_nums",
			CreateRule: &userRequiredRule,
			ListRule:   &userRequiredRule,
			ViewRule:   &userRequiredRule,
			UpdateRule: &userRequiredRule,
			DeleteRule: &userRequiredRule,
			Schema: schema.NewSchema(
				&schema.SchemaField{
					Name:     "user",
					Type:     schema.FieldTypeUser,
					Required: true,
					Options: &schema.UserOptions{
						MaxSelect:     1,
						CascadeDelete: true,
					},
				},
				&schema.SchemaField{
					Name:    "num",
					Type:    schema.FieldTypeNumber,
					Options: &schema.NumberOptions{},
				},
				// ... etc.
			),
		}
		return daos.New(db).SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db)

		collection, err := dao.FindCollectionByNameOrId("user_nums")
		if err != nil {
			return err
		}

		return daos.New(db).DeleteCollection(collection)
	})
}
