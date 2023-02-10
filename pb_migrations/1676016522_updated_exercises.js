migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dq062lb1vvho879")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kteg1cvy",
    "name": "user",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dq062lb1vvho879")

  // remove
  collection.schema.removeField("kteg1cvy")

  return dao.saveCollection(collection)
})
