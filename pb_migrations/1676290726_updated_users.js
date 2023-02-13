migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u3ettdfs",
    "name": "programs",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "klsw3tvz934oilo",
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
  collection.schema.removeField("u3ettdfs")

  return dao.saveCollection(collection)
})
