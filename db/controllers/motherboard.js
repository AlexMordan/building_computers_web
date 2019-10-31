const helper = require('./helper');
const MOTHERBOARD = 'motherboard';

async function upsert(body) {
    return await helper.upsert(body, MOTHERBOARD);
}

async function getAllData(parametrs) {
    return await helper.getAllData(parametrs, MOTHERBOARD);
}

async function deleteRecods(parametrs) {
    return await helper.deleteRecods(parametrs, MOTHERBOARD);
}

module.exports = {
    upsert: upsert,
    getAllData: getAllData,
    deleteRecods: deleteRecods
}