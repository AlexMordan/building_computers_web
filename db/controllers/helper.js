const db = require('../index');
const allTable = [
    'case_pc',
    'clients',
    'cpu',
    'memory',
    'motherboard',
    'power_supply',
    'product',
    'ssd',
    'users',
    'video_cards'
];
async function upsert(body, table) {
    if (!allTable.includes(table)) {
        return 'Go to HOME =)'
    }
    let columns = '';
    let values = '';
    let update = '';
    Object.keys(body).forEach(item => {
        if (!body[item]) {
            body[item] = null;
            if (item === 'id') {
                delete body[item];
                return;
            }
        }
        columns += item + ', ';
        values += '$' + item + ', ';
        update += item + '= $' + item + ', ';
    });
    try {
        await db.query('INSERT INTO '+ table + ' (' + columns.replace(/,\s*$/, "") +
            ') VALUES(' + values.replace(/,\s*$/, "") + ') ' +
            'ON CONFLICT(id) DO ' +
            'UPDATE SET ' + update.replace(/,\s*$/, " ") + ';'
            ,
            {...body }
        );
        return 'SUCCESS';
    } catch (err) {
        return err;
    }
}

async function getAllData(parametrs, table) {
    if (!allTable.includes(table)) {
        return 'Go to HOME =)'
    }
    let queryStr = 'SELECT * FROM ' + table + ' ORDER BY id ASC';
    try {
        let result = await db.query(queryStr);
        return result;
    } catch (err) {
        return 'Inernal Server Error:' + err;
    }
}

async function deleteRecods(params, table) {
    if (!allTable.includes(table)) {
        return 'Go to HOME =)'
    }

    let queryStr = 'DELETE FROM ' + table + ' WHERE id = $id';
    console.log('query = ', queryStr);
    try {
        let result = await db.query(queryStr, params);
        return result;
    } catch (err) {
        return 'Inernal Server Error:' + err;
    }
}

module.exports = {
    upsert: upsert,
    getAllData: getAllData,
    deleteRecods: deleteRecods
};