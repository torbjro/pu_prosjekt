migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ts9hoeoqwszohe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uhwviuwj",
    "name": "user",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ts9hoeoqwszohe")

  // remove
  collection.schema.removeField("uhwviuwj")

  return dao.saveCollection(collection)
})
