const helper = require('./helper');
const MEMORY = 'memory';

async function upsert(body) {
    return await helper.upsert(body, MEMORY);
}

async function getAllData(parametrs) {
    return await helper.getAllData(parametrs, MEMORY);
}

async function deleteRecods(parametrs) {
    return await helper.deleteRecods(parametrs, MEMORY);
}

module.exports = {
    upsert: upsert,
    getAllData: getAllData,
    deleteRecods: deleteRecods
}