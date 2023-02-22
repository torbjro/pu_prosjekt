migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("klsw3tvz934oilo")

  // remove
  collection.schema.removeField("iqyym51r")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j2m8tums",
    "name": "exercises",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "7zl9rcodw2bxsz6",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("klsw3tvz934oilo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iqyym51r",
    "name": "exercises",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("j2m8tums")

  return dao.saveCollection(collection)
})
