migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ts9hoeoqwszohe")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c6a1l3xn",
    "name": "caption",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ts9hoeoqwszohe")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c6a1l3xn",
    "name": "treningsplan",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
