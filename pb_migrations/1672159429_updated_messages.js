migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2fadj1i1z3vxs65")

  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2fadj1i1z3vxs65")

  collection.createRule = null

  return dao.saveCollection(collection)
})
