migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2fadj1i1z3vxs65")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2fadj1i1z3vxs65")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
