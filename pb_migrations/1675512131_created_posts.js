migrate((db) => {
  const collection = new Collection({
    "id": "0ts9hoeoqwszohe",
    "created": "2023-02-04 12:02:11.701Z",
    "updated": "2023-02-04 12:02:11.701Z",
    "name": "posts",
    "type": "base",
    "system": false,
    "schema": [
      {
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
  const collection = dao.findCollectionByNameOrId("0ts9hoeoqwszohe");

  return dao.deleteCollection(collection);
})
