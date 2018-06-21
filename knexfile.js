// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '129.213.80.55',
      user: 'root',
      password: 'Password1!',
      database: 'dashboard_db'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host: '129.213.80.55',
      user: 'dashboarddb-mysql-1',
      password: 'Password1!',
      database: 'myapp_test'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

production: {
  client: 'mysql',
  connection: {
    host: '129.213.80.55',
    user: 'dashboarddb-mysql-1',
    password: 'Password1!',
    database: 'myapp_test'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}


};
