module.exports = {
  env: 'production',
  apiPathPrefix: '/api/',
  baseURL: {
    example: 'https://api.example.com',
  },
  clientEnv: {
    baseURL: '/',
  },
  // TODO: 修改为正确的生产库地址
  redis: {
    port: 6379,
    host: '1749174914.redis.rds.aliyuncs.com',
    password: 'XXXXXX',
    db: 0,
    maxRetriesPerRequest: 3,
  },
  mysql: {
    host: 'readonly.mysql.example.com',
    port: '3306',
    username: 'user',
    password: 'pass',
    database: 'db_test',
  },
}
