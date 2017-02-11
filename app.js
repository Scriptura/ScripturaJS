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
    if (error) throw error
    res.render('patternLayouts',
      {
        dev: config.dev
        , demo: true
        , siteUri: config.uri
        , title: 'Scriptura.js'
        , description: 'Interface for web apps'
        , name: 'Scriptura.js'
        , content: 'Interface for web apps'
      }
    )
  })
})

app.get('/article/:id([0-9]{1,7})', (req, res) => { // @example `http://192.168.0.13:9001/article/1`
  let sql = 'SELECT name, meta_title, meta_description, content FROM _post WHERE id = ?'
    , inserts = req.params.id
  sql = mysql.format(sql, inserts)
  connection.query(sql, (error, results, fields) => {
    let rs = results[0]
    if (error) throw error
    if (rs) { // si résultat retourné
      res.render('patternLayouts',
        {
          dev: config.dev
          , currentArticle: rs.id
          , demo: true
          , siteUri: config.uri
          , title: rs.meta_title // @old req.params.id
          , description: rs.meta_description
          , name: rs.name // @old req.params.name
          , content: rs.content
        }
      )
    } else {
      error404(req, res)
    }
  })
})

app.get('/person/:name([0-9a-zA-Z]{1,20})', (req, res) => { // @example `http://192.168.0.13:9001/person/Lucas`
  let sql = 'SELECT given_name, family_name, honorific_prefix, honorific_suffix FROM _person WHERE given_name = ?'
    , inserts = req.params.name
  sql = mysql.format(sql, inserts)
  connection.query(sql, (error, results, fields) => {
    let rs = results[0]
    if (error) throw error
    if (rs) { // si résultat retourné
      res.render('patternLayouts',
        {
          dev: config.dev
          , currentUser: rs.id
          , demo: true
          , siteUri: config.uri
          , title: rs.given_name // @old req.params.id
          , description: rs.family_name
          , name: rs.honorific_prefix + ' ' + rs.given_name + ' ' + rs.family_name + ', ' + rs.honorific_suffix // @old req.params.name
          , content: rs.given_name
        }
      )
    } else {
      error404(req, res)
    }
  })
})

app.get('*', error404) // si l'URL ne correspond a aucune des routes précédentes

function error404(req, res) {
  res.status(404)
  res.render('patternLayouts',
    {
      dev: config.dev
      , demo: true
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
  // @link http://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
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
