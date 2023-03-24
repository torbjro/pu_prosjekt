migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("klsw3tvz934oilo")

  // remove
  collection.schema.removeField("2nicnezh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0t3udien",
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
    "id": "2nicnezh",
    "name": "exercise",
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
  collection.schema.removeField("0t3udien")

  return dao.saveCollection(collection)
})
