const express = require('express');
const handler = require('serve-handler');

const app = express();
const port = process.env.PORT || 3333;

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
}

app.use((request, response) => {
  return handler(request, response, {
    public: 'www/',
  });
});

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
