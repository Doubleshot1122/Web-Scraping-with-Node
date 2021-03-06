'use strict';

const app = require('express')();
const morgan = require('morgan');
const port = process.env.PORT || 8000;

app.use(morgan('dev'));

app.use('/api/scraper', require('./routes/scraper'));

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
