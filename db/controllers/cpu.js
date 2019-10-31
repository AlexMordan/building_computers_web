const helper = require('./helper');
const CPU = 'cpu';

async function upsert(body) {
    return await helper.upsert(body, CPU);
}

async function getAllData(parametrs) {
    return await helper.getAllData(parametrs, CPU);
}

async function deleteRecods(parametrs) {
    return await helper.deleteRecods(parametrs, CPU);
}

module.exports = {
    upsert: upsert,
    getAllData: getAllData,
    deleteRecods: deleteRecods
}