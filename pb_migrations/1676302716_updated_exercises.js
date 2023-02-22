migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7zl9rcodw2bxsz6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "igz3vggo",
    "name": "sets",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ji58maop",
    "name": "reps",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7zl9rcodw2bxsz6")

  // remove
  collection.schema.removeField("igz3vggo")

  // remove
  collection.schema.removeField("ji58maop")

  return dao.saveCollection(collection)
})
