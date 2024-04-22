let config;
config = {
    server: {
        port: 8080,
        keySecret: "HARD_TO_GUESS",
    },
    mongodb: {
        dbURI: "mongodb://127.0.0.1:27017/newmedialab"
    },
    TMDB_API_KEY: "6d036300db02c259443653efb1e83897"
};

if(process.env.NODE_ENV == "production") {
    config = {
        server: {
            port: 8080,
            keySecret: process.env.TOKEN_SECRET,
        },
        mariadb: {
            host: process.env.CLEARDB_DATABASE_URL,
            port: 3306,
            user: process.env.MARIADB_USER,
            password: process.env.MARIADB_PASSWORD,
            database: process.env.MARIADB_DB,
            connLimit: 5,
        },
        TMDB_API_KEY: "6d036300db02c259443653efb1e83897"
    };
}

module.exports = {
    config,

};