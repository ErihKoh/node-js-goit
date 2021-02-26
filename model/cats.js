const db = require('./db')
const { ObjectID } = require('mongodb')

const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection
}

const getAll = async () => {
  const collection = await getCollection(db, 'cats')
  const results = await collection.find({}).toArray()
  return results
}

const getById = async (id) => {
  const collection = await getCollection(db, 'cats')
  const objectId = new ObjectID(id)
  console.log(objectId.getTimestamp())
  const [result] = await collection.find({ _id: objectId }).toArray()
  return result
}

const create = async (body) => {
  const record = {
    ...body,
    ...(body.isVaccinated ? {} : { isVaccinated: false }), // свойство по умолчанию
  }
  const collection = await getCollection(db, 'cats')
  const {
    ops: [result],
  } = await collection.insertOne(record)
  return result
}

const update = async (id, body) => {
  const collection = await getCollection(db, 'cats')
  const objectId = new ObjectID(id)
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: body },
    { returnOriginal: false },
  )
  return result
}

const remove = async (id) => {
  const collection = await getCollection(db, 'cats')
  const objectId = new ObjectID(id)
  const { value: result } = await collection.findOneAndDelete({ _id: objectId })
  return result
}

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
}
