const helper = require('./helper');
const PRODUCT = 'product';
const db = require('../index');

async function upsert(body) {
    return await helper.upsert(body, PRODUCT);
}

async function getAllData(parametrs) {
    try {
        let result = await db.query(`
            SELECT product.id, product.price, product.status, product.count,
                product.cpu_id, product.motherboard_id, product.video_cards_id,
                product.memory_id, product.ssd_id, product.case_id, product.clients_id,
                product.power_supply_id,
                cpu.name as control_cpu,
                caseTable.name as control_case,
                motherboard.name as control_motherboard,
                video_cards.name as control_video,
                memory.name as control_memory,
                ssd.name as control_ssd,
                clients.full_name as control_client,
                power_supply.name as control_power
            FROM product
            LEFT JOIN cpu ON product.cpu_id = cpu.id
            LEFT JOIN motherboard ON product.motherboard_id = motherboard.id
            LEFT JOIN video_cards ON product.video_cards_id = video_cards.id
            LEFT JOIN memory ON product.memory_id = memory.id
            LEFT JOIN ssd ON product.ssd_id = ssd.id
            LEFT JOIN case_pc as caseTable ON product.case_id = caseTable.id
            LEFT JOIN clients ON product.clients_id = clients.id
            LEFT JOIN power_supply ON product.power_supply_id = power_supply.id
            ORDER BY id ASC
        `);
        return result;
    } catch (err) {
        return 'Inernal Server Error:' + err;
    }
}

async function deleteRecods(parametrs) {
    return await helper.deleteRecods(parametrs, PRODUCT);
}

module.exports = {
    upsert: upsert,
    getAllData: getAllData,
    deleteRecods: deleteRecods
}