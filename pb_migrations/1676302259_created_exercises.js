migrate((db) => {
  const collection = new Collection({
    "id": "7zl9rcodw2bxsz6",
    "created": "2023-02-13 15:30:59.481Z",
    "updated": "2023-02-13 15:30:59.481Z",
    "name": "exercises",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "r2z5f8wq",
        "name": "exercise",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
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
      },
      {
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
      },
      {
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
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("7zl9rcodw2bxsz6");

  return dao.deleteCollection(collection);
})
