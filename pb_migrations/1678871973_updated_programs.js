migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("klsw3tvz934oilo")

  // remove
  collection.schema.removeField("j2m8tums")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2nicnezh",
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
    "id": "j2m8tums",
    "name": "exercises",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "0lfkou75dmed3y2",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // remove
  collection.schema.removeField("2nicnezh")

  return dao.saveCollection(collection)
})
