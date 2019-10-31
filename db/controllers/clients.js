const helper = require('./helper');
const CLIENTS = 'clients';

async function upsert(body) {
    return await helper.upsert(body, CLIENTS);
}

async function getAllData(parametrs) {
    return await helper.getAllData(parametrs, CLIENTS);
}

async function deleteRecods(parametrs) {
    return await helper.deleteRecods(parametrs, CLIENTS);
}

module.exports = {
    upsert: upsert,
    getAllData: getAllData,
    deleteRecods: deleteRecods
}