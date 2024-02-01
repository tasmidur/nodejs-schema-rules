export interface DatabaseConfig {
  defaultDatabase: string
  databases: {
    postgres?: {
      host: string
      port: number
      user: string
      password: string
      database: string
    }
    mysql?: {
      host: string
      port: number
      user: string
      password: string
      database: string
    }
    sqlite?: {
      database: string
    }
  }
  skipColumns?: string[]
}

export const validateConfig = (config: DatabaseConfig) => {
  // Validate defaultDatabase
  if (!config.defaultDatabase) {
    throw new Error('Default database not specified in the configuration.')
  }

  // Validate databases
  const { databases } = config
  if (!databases || typeof databases !== 'object') {
    throw new Error(
      'Invalid or missing "databases" property in the configuration.',
    )
  }

  // Validate at least one database is provided
  if (!databases.postgres && !databases.mysql && !databases.sqlite) {
    throw new Error(
      'At least one database configuration (postgres, mysql, or sqlite) must be provided in schema.config.js file in your working directory',
    )
  }

  // Validate postgres configuration
  if (databases?.postgres) {
    const { host, port, user, password, database } = databases.postgres

    if (!host || !port || !user || !password || !database) {
      throw new Error(
        'Incomplete PostgreSQL configuration. All properties (host, port, user, password, database) are required.',
      )
    }
  }

  // Validate mysql configuration
  if (databases?.mysql) {
    const { host, port, user, password, database } = databases?.mysql

    if (!host || !port || !user || !password || !database) {
      throw new Error(
        'Incomplete MySQL configuration. All properties (host, port, user, password, database) are required.',
      )
    }
  }

  // Validate sqlite configuration
  if (databases?.sqlite) {
    const { database } = databases.sqlite

    if (!database) {
      throw new Error(
        'Incomplete SQLite configuration. The "database" property is required.',
      )
    }
  }

  // Validate skipColumns
  if (config?.skipColumns && !Array.isArray(config.skipColumns)) {
    throw new Error('Invalid "skipColumns" property. It should be an array.')
  }

  return config
}
