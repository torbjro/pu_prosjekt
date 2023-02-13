migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7zl9rcodw2bxsz6")

  // remove
  collection.schema.removeField("nqgfi96i")

  // remove
  collection.schema.removeField("odofribe")

  // remove
  collection.schema.removeField("eksmaxve")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7zl9rcodw2bxsz6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nqgfi96i",
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
    "id": "odofribe",
    "name": "reps",
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
    "id": "eksmaxve",
    "name": "program",
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
})
