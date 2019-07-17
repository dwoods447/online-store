module.exports  = {
    port: process.env.PORT || 3000,
    db: {
        development: {
            username: "online-store",
            password: "online-store",
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
    },
    auth: {
      jwtSecret: process.env.JWT_SECRET || 'TheCatHad9Lives'
    }
    
}