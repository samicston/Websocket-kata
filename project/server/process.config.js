const path = require('path');
module.exports = {
  "apps": [{
    "name": "web socket",
    "script": `${path.resolve(__dirname)}/app.js`,
    "watch": true,
  }]
};