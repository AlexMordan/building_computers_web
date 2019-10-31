const helper = require('./helper');
const SSD = 'ssd';

async function upsert(body) {
    return await helper.upsert(body, SSD);
}

async function getAllData(parametrs) {
    return await helper.getAllData(parametrs, SSD);
}

async function deleteRecods(parametrs) {
    return await helper.deleteRecods(parametrs, SSD);
}

module.exports = {
    upsert: upsert,
    getAllData: getAllData,
    deleteRecods: deleteRecods
}