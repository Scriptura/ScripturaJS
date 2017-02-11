// -----------------------------------------------------------------------------
// @name Application
// -----------------------------------------------------------------------------

'use strict'

const config = require('./config')
  //, http = require('http')
  //, path = require('path')
  //, logger = require('morgan')
  //, bodyParser = require('body-parser')
  , moment = require('moment')
  , compression = require('compression')
  , express = require('express')
  , favicon = require('serve-favicon')
  , app = express()
  , mysql = require('mysql')
  , connection = mysql.createConnection(
    {
      host: config.host
      , user: config.user
      , password: config.password
      , database: config.database
      , socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock' // for MAMP only
    }
  )

//app.set('port', config.port)
app.set('views', config.dir + '/views/') // racine pour les vues
app.set('view engine', 'pug') // choix du moteur de template
app.use('/assets', express.static('public')) // gestion des fichiers statiques
app.use(favicon(config.dir + '/public/medias/images/favicon.ico')) // addresse de la favicon
app.use(compression()) // compression deflate et gzip
if (config.dev){
  app.use((req, res, next) => { // notification des requêtes sur le serveur
    console.log('\x1b[36m' + 'A new request received at ' + moment().format() + ' on ' + req.url + '\x1b[0m')
    next()
  })
}

app.get('/', (req, res) => {
  //res.status(200) // 304 par défaut
  let sql = 'SELECT * FROM _number_option WHERE id = \'1\''
  connection.query(sql, (error, results, fields) => {
    let rs = results[0]
      , url = req.url
    if (error) throw error
    res.render('patternLayouts',
      {
        dev: config.dev
        , url: url
        , demo: config.demo
        , siteUri: config.uri
        , title: config.name
        , description: config.description
        , name: config.name
        , content: config.description
      }
    )
  })
})

app.get('/article/:id([0-9]{1,7})', (req, res) => { // @example '/article/1'
  let sql = 'SELECT * FROM _post WHERE id = ?'
    , inserts = req.params.id
  sql = mysql.format(sql, inserts)
  connection.query(sql, (error, results, fields) => {
    let rs = results[0]
      , url = req.url
    if (error) throw error
    if (rs) {
      res.render('article',
        {
          dev: config.dev
          , url: url
          , id: rs.id
          , demo: config.demo
          , siteUri: config.uri
          , title: rs.meta_title
          , metaDescription: rs.meta_description
          , description: rs.description
          , name: rs.name
          , content: rs.content
        }
      )
    } else {
      error404(req, res)
    }
  })
})

app.get('/person/:name([0-9a-zA-Z]{1,20})', (req, res) => { // @example '/person/Lucas'
  let sql = 'SELECT * FROM _person WHERE given_name = ?'
    , inserts = req.params.name
  sql = mysql.format(sql, inserts)
  connection.query(sql, (error, results, fields) => {
    let rs = results[0]
      , url = req.url
    if (error) throw error
    if (rs) {
      res.render('person',
        {
          dev: config.dev
          , url: url
          , id: rs.id
          , demo: config.demo
          , siteUri: config.uri
          , title: rs.given_name
          , description: rs.description
          , givenName : rs.given_name
          , familyName : rs.family_name
          , name: rs.honorific_prefix + ' ' + rs.given_name + ' ' + rs.family_name + ', ' + rs.honorific_suffix
        }
      )
    } else {
      error404(req, res)
    }
  })
})

app.get('*', error404) // récupération des URLs ne correspondant a aucune des routes précédentes

function error404(req, res) {
  res.status(404)
  res.render('patternLayouts',
    {
      dev: config.dev
      , demo: config.demo
      , siteUri: config.uri
      , title: 'Error 404'
      , description: 'Error 404, Page not found'
      , name: 'Error 404'
      , content: 'Page not found'
    }
  )
}

//const server = http.createServer(app)
const server = app.listen(config.port, config.host, logSuccess) // démarrage d'un serveur, raccourci avec express.js

function logSuccess() {
  // for change Node.js console font color:
  // @link http://stackoverflow.com/questions/9781218
  console.log(
    '\x1b[32m' + '\n' +
    '     OxxO' + '\n' +
    '    X oo X' + '\n' +
    '    X >< X      Scriptura' + '\n' +
    '     XXXX~<>' + '\n' +
    '   (..)(..)' + '\n\n' +
    'Server running at port ' + config.uri + '...' + '\x1b[0m'
  )
}
