module.exports.id = 'test-user-migration';

module.exports.up = async (db) => {
    return db.query(`
        INSERT INTO Users
        (login, type, password)
        VALUES ('admin', 'admin', 'admin');
    `);
};

module.exports.down = async (db) => {

};