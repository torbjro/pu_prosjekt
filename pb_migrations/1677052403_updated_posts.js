migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ts9hoeoqwszohe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "h3f8obl8",
    "name": "public",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ts9hoeoqwszohe")

  // remove
  collection.schema.removeField("h3f8obl8")

  return dao.saveCollection(collection)
})
