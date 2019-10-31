const helper = require('./helper');
const POWER_SUPPLY = 'power_supply';

async function upsert(body) {
    return await helper.upsert(body, POWER_SUPPLY);
}

async function getAllData(parametrs) {
    return await helper.getAllData(parametrs, POWER_SUPPLY);
}

async function deleteRecods(parametrs) {
    return await helper.deleteRecods(parametrs, POWER_SUPPLY);
}

module.exports = {
    upsert: upsert,
    getAllData: getAllData,
    deleteRecods: deleteRecods
}