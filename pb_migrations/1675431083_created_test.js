migrate((db) => {
  const collection = new Collection({
    "id": "j1njv5qpe1pejsu",
    "created": "2023-02-03 13:31:23.699Z",
    "updated": "2023-02-03 13:31:23.699Z",
    "name": "test",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "j0c946pt",
        "name": "number",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("j1njv5qpe1pejsu");

  return dao.deleteCollection(collection);
})
