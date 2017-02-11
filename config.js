// -----------------------------------------------------------------------------
// @name Configuration
// -----------------------------------------------------------------------------

// @documentation codes HTTP
// @params `200` : requête traitée avec succès, `304` : document non modifié depuis la dernière requête
// @link https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
// @documentation nodejs :
// @link https://nodejs.org/en/docs/
// @link http://devdocs.io/node/
// @link https://www.grafikart.fr/formations/nodejs/http
// @link https://www.airpair.com/javascript/node-js-tutorial
// @link https://www.airpair.com/node.js/posts/top-10-mistakes-node-developers-make
// @documentation expressjs :
// @link https://www.grafikart.fr/formations/nodejs/express
// @link https://www.tutorialspoint.com/expressjs/ +++
// @documentation Hiérarchie d'un projet :
// @link https://www.terlici.com/2014/08/25/best-practices-express-structure.html
// @documentation nodemon :
// "start": "nodemon app.js --ignore dev.js"
// @documentation Moment.js
// @link https://momentjs.com/docs/
// @documentation certificat SSL auto-signé
// @link http://www.akadia.com/services/ssh_test_certificate.html
// @link https://github.com/terlici/base-express
// @documentation socketPath
// @link https://github.com/mysqljs/mysql#connection-options

'use strict'

exports.dev = true
exports.scheme = 'http://'
exports.host = '127.0.0.1'
exports.port = 9000 // ou `process.env.port || 9000`
exports.dir = __dirname
exports.uri = exports.scheme + exports.host + ':' + exports.port
exports.user = 'root'
exports.password = 'root'
exports.database = 'test'
