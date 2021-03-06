const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

const PAGE_SIZE = 4

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        // const criteria = {}

        const startIdx = +filterBy.orderPageIdx * PAGE_SIZE

        const collection = await dbService.getCollection('order')
        var orders = await collection.find(criteria).toArray()
        if (filterBy.orderPageIdx || filterBy.orderPageIdx === "0") {
            const newOrders = orders.slice(startIdx, startIdx + PAGE_SIZE)
            return newOrders
        }
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        const order = collection.findOne({ _id: ObjectId(orderId) })
        return order
    } catch (err) {
        logger.error(`while finding order ${orderId}`, err)
        throw err
    }
}

async function remove(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.deleteOne({ _id: ObjectId(orderId) })
        return orderId
    } catch (err) {
        logger.error(`cannot remove order ${orderId}`, err)
        throw err
    }
}

async function add(order) {
    try {
        const collection = await dbService.getCollection('order')
        await collection.insertOne(order)
        return order
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}
async function update(order) {
    try {
        var id = ObjectId(order._id)
        delete order._id
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ _id: id }, { $set: { ...order } })
        return order
    } catch (err) {
        logger.error(`cannot update order ${orderId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    logger.info('_buildCriteria', { filterBy })

    let criteria = {}

    if (filterBy.host !== '' && filterBy.host !== "undefined") {
        criteria = {
            "host._id": filterBy.host
        }
    }

    if (filterBy.booker !== '' && filterBy.booker !== "undefined") {
        criteria = {
            "booker._id": filterBy.booker
        }
    }

    logger.info('_buildCriteria', { criteria })

    return criteria

}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}