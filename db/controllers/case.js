const helper = require('./helper');
const CASE_PC = 'case_pc';

async function upsert(body) {
    return await helper.upsert(body, CASE_PC);
}

async function getAllData(parametrs) {
    return await helper.getAllData(parametrs, CASE_PC);
}

async function deleteRecods(parametrs) {
    return await helper.deleteRecods(parametrs, CASE_PC);
}

module.exports = {
    upsert: upsert,
    getAllData: getAllData,
    deleteRecods: deleteRecods
}