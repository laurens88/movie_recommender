let config;
// config = {
//     server: {
//         port: 8080,
//         keySecret: "HARD_TO_GUESS"
//     }
// }
if (process.env.NODE_ENV == "test" || process.env.NODE_ENV == "development") {
    config = {
        server: {
            port: 8080,
            keySecret: "HARD_TO_GUESS",
        }
    };
} else if (process.env.NODE_ENV == "production") {
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
    };
} else {
    // console.log(err);
    console.log("Failed to read config.");
    process.exit(1);
}

module.exports = {
    config,
};