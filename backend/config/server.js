module.exports = ({ env }) => ({
  host: env("HOST"),
  port: env.int("PORT"),
  url: env("PROD_URL"),
  cron: {
    enabled: env.bool('CRON_ENABLED'),
  },
  admin: {
    url: env("ADMIN_URL"),
    auth: {
      secret: env("ADMIN_JWT_SECRET"),
    },
  },
});
