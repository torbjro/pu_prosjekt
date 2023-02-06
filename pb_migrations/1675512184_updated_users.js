migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0xhux2it",
    "name": "posts",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "0ts9hoeoqwszohe",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("0xhux2it")

  return dao.saveCollection(collection)
})
