migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ts9hoeoqwszohe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "caqesymy",
    "name": "program",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "klsw3tvz934oilo",
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
  collection.schema.removeField("caqesymy")

  return dao.saveCollection(collection)
})
