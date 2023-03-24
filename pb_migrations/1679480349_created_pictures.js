migrate((db) => {
  const collection = new Collection({
    "id": "dw1wole0xfnd1fu",
    "created": "2023-03-22 10:19:09.748Z",
    "updated": "2023-03-22 10:19:09.748Z",
    "name": "pictures",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0tgtt8bs",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": [
            "name"
          ]
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
  const collection = dao.findCollectionByNameOrId("dw1wole0xfnd1fu");

  return dao.deleteCollection(collection);
})
