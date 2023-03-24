migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dw1wole0xfnd1fu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rlejr6pc",
    "name": "progressPicture",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dw1wole0xfnd1fu")

  // remove
  collection.schema.removeField("rlejr6pc")

  return dao.saveCollection(collection)
})
