migrate((db) => {
  const collection = new Collection({
    "id": "9mgmcksef7e1gz4",
    "created": "2023-03-20 11:45:46.568Z",
    "updated": "2023-03-20 11:45:46.568Z",
    "name": "pr",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "uy821poe",
        "name": "exercise",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "0lfkou75dmed3y2",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "svrlhqb1",
        "name": "value",
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
        "id": "zfqklias",
        "name": "user",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
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
  const collection = dao.findCollectionByNameOrId("9mgmcksef7e1gz4");

  return dao.deleteCollection(collection);
})
