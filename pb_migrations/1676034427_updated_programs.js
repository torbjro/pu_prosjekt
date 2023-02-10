migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("klsw3tvz934oilo")

  // remove
  collection.schema.removeField("3osxabim")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iqyym51r",
    "name": "exercise",
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
  const collection = dao.findCollectionByNameOrId("klsw3tvz934oilo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3osxabim",
    "name": "exercises",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "dq062lb1vvho879",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("iqyym51r")

  return dao.saveCollection(collection)
})
