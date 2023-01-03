module.exports = {
  local: {
    connectionString: 'postgresql://postgres:docker@127.0.0.1:5432/sdc',
    port: 8000,
  },
  pro: {
    connectionString: process.env.connectionString,
    port: process.env.PORT,
  },
};
