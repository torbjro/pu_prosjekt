migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("klsw3tvz934oilo")

  collection.name = "programs"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("klsw3tvz934oilo")

  collection.name = "program"

  return dao.saveCollection(collection)
})
