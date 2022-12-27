migrate((db) => {
  const collection = new Collection({
    "id": "2fadj1i1z3vxs65",
    "created": "2022-12-27 16:01:00.278Z",
    "updated": "2022-12-27 16:01:00.278Z",
    "name": "messages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "iutvdofl",
        "name": "text",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": 420,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "abbrdpyj",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false
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
  const collection = dao.findCollectionByNameOrId("2fadj1i1z3vxs65");

  return dao.deleteCollection(collection);
})
