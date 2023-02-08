migrate((db) => {
  const collection = new Collection({
    "id": "klsw3tvz934oilo",
    "created": "2023-02-06 14:20:14.339Z",
    "updated": "2023-02-06 14:20:14.339Z",
    "name": "program",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "3osxabim",
        "name": "exercises",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "dq062lb1vvho879",
          "cascadeDelete": false,
          "maxSelect": 1,
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
  const collection = dao.findCollectionByNameOrId("klsw3tvz934oilo");

  return dao.deleteCollection(collection);
})
