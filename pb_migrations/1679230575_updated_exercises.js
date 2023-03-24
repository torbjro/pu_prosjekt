migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7zl9rcodw2bxsz6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lwpwiwgd",
    "name": "exercise2",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "0lfkou75dmed3y2",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7zl9rcodw2bxsz6")

  // remove
  collection.schema.removeField("lwpwiwgd")

  return dao.saveCollection(collection)
})
