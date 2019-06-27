module.exports  = {
    port: process.env.PORT || 3000,
    db: {
        development: {
            username: "postgres",
            password: "pimpjuice",
            database: "online-store",
            host: "localhost",
            dialect: {
                dialect: "postgres"
            }
          },
          production: {
            url: process.env.DATABASE_URL,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            host: process.env.HOST,
            dialect: "postgres"
          }
    }
    
}