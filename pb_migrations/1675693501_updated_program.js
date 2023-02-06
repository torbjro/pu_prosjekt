migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("klsw3tvz934oilo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q4gqteoi",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("klsw3tvz934oilo")

  // remove
  collection.schema.removeField("q4gqteoi")

  return dao.saveCollection(collection)
})
