const helper = require('./helper');
const VIDEO_CARDS = 'video_cards';

async function upsert(body) {
    return await helper.upsert(body, VIDEO_CARDS);
}

async function getAllData(parametrs) {
    return await helper.getAllData(parametrs, VIDEO_CARDS);
}

async function deleteRecods(parametrs) {
    return await helper.deleteRecods(parametrs, VIDEO_CARDS);
}

module.exports = {
    upsert: upsert,
    getAllData: getAllData,
    deleteRecods: deleteRecods
}