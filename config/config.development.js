module.exports = {
  env: 'development',
  apiPathPrefix: '/api/',
  baseURL: {
    example: 'https://dev-api.example.com',
  },
  clientEnv: {
    // 开发环境下，若不指定端口，客户端请求正常，中间层接口则默认请求 127.0.0.1:80 导致报错
    baseURL: 'http://localhost:3000/',
  },
  // TODO: 修改为正确的测试库地址
  redis: {
    port: 6379,
    host: '127.0.0.1',
    maxRetriesPerRequest: 3,
  },
  mysql: {
    host: 'localhost',
    port: '3306',
    username: 'user',
    password: 'pass',
    database: 'db_test',
  },
}
