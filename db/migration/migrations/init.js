module.exports.id = 'init';

module.exports.up = async (db) => {

    return db.query(`
        CREATE user admin with encrypted password \'admin\';
        grant all privileges on database building_pc to admin;

        CREATE user manager with encrypted password 'manager4';
        GRANT INSERT, UPDATE, SELECT ON ALL TABLES IN SCHEMA public TO manager;

        CREATE TABLE _migrations (
            name text primary key,
            date timestamp
        );

        CREATE TABLE IF NOT EXISTS Clients
        (
            id SERIAL PRIMARY KEY,
            full_name VARCHAR,
            email VARCHAR,
            phone VARCHAR,
            description Text,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS CPU
        (
            id SERIAL PRIMARY KEY,
            name VARCHAR UNIQUE NOT NULL,
            manufacturer VARCHAR,
            year INTEGER,
            processor_number VARCHAR,
            lithography VARCHAR,
            of_cores INTEGER,
            of_threads INTEGER,
            processor_base_frequency INTEGER,
            max_turbo_frequency INTEGER,
            cache VARCHAR,
            tdp INTEGER,
            max_memory_size INTEGER,
            memory_types VARCHAR,
            processor_graphics VARCHAR,
            sockets_supported VARCHAR,
            dimensions VARCHAR,
            description TEXT,
            price Numeric,
            status VARCHAR,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS Motherboard
        (
            id SERIAL PRIMARY KEY,
            manufacturer VARCHAR,
            name VARCHAR UNIQUE NOT NULL,
            year INTEGER,
            sockets_supported VARCHAR,
            dimensions VARCHAR,
            description TEXT,
            price Numeric,
            status VARCHAR,
            chipset VARCHAR,
            memory_types VARCHAR,
            form_factor VARCHAR,
            specifications TEXT,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS Video_cards
        (
            id SERIAL PRIMARY KEY,
            manufacturer VARCHAR,
            name VARCHAR UNIQUE NOT NULL,
            year INTEGER,
            dimensions VARCHAR,
            size_memory INTEGER,
            description TEXT,
            status VARCHAR,
            memory_types VARCHAR,
            price NUMERIC,
            frequency INTEGER,
            specifications TEXT,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS Memory
        (
            id SERIAL PRIMARY KEY,
            manufacturer VARCHAR,
            name VARCHAR UNIQUE NOT NULL,
            year INTEGER,
            dimensions VARCHAR,
            size_memory INTEGER,
            description TEXT,
            status VARCHAR,
            memory_types VARCHAR,
            form_factor VARCHAR,
            price NUMERIC,
            frequency INTEGER,
            specifications TEXT,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS SSD
        (
            id SERIAL PRIMARY KEY,
            manufacturer VARCHAR,
            name VARCHAR UNIQUE NOT NULL,
            year INTEGER,
            dimensions VARCHAR,
            size_memory INTEGER,
            bufer VARCHAR,
            max_speed_write INTEGER,
            max_speed_read INTEGER,
            description TEXT,
            status VARCHAR,
            form_factor VARCHAR,
            price NUMERIC,
            specifications TEXT,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS Case_PC
        (
            id SERIAL PRIMARY KEY,
            manufacturer VARCHAR,
            name VARCHAR UNIQUE NOT NULL,
            year INTEGER,
            dimensions VARCHAR,
            description TEXT,
            status VARCHAR,
            form_factor VARCHAR,
            price NUMERIC,
            specifications TEXT,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS Power_supply
        (
            id SERIAL PRIMARY KEY,
            manufacturer VARCHAR,
            name VARCHAR UNIQUE NOT NULL,
            year INTEGER,
            dimensions VARCHAR,
            description TEXT,
            status VARCHAR,
            form_factor VARCHAR,
            price NUMERIC,
            Power INTEGER,
            Efficiency INTEGER,
            specifications TEXT,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS Product
        (
            id SERIAL PRIMARY KEY,
            price NUMERIC,
            status VARCHAR,
            count INTEGER,
            cpu_id INT references CPU(id) ON DELETE CASCADE,
            motherboard_id INT references Motherboard(id) ON DELETE CASCADE,
            video_cards_id INT references Video_cards(id) ON DELETE CASCADE,
            memory_id INT references Memory(id) ON DELETE CASCADE,
            ssd_id INT references SSD(id) ON DELETE CASCADE,
            case_id INT references Case_PC(id) ON DELETE CASCADE,
            clients_id INT references Clients(id) ON DELETE CASCADE,
            power_supply_id INT references Power_supply(id) ON DELETE CASCADE,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS Users
        (
            id SERIAL PRIMARY KEY,
            login VARCHAR,
            password VARCHAR,
            type VARCHAR,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

    `);
};

module.exports.down = async (db) => {

};