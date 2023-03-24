migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7zl9rcodw2bxsz6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ox6izrps",
    "name": "exercise_ref",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "0lfkou75dmed3y2",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": [
        "title"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7zl9rcodw2bxsz6")

  // remove
  collection.schema.removeField("ox6izrps")

  return dao.saveCollection(collection)
})
