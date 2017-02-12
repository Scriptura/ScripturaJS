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
  let sql = 'SELECT * FROM _post WHERE id = \'1\''
  connection.query(sql, (error, results, fields) => {
    let url = req.url
    if (error) throw error
    res.render('patternLayouts',
      {
        dev: config.dev
        , url: url
        , demo: config.demo
        , siteUri: config.uri
        , metaTitle: config.name
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
    let url = req.url
    if (error) throw error
    if (results[0]) {
      res.render('article',
        {
          dev: config.dev
          , url: url
          , demo: config.demo
          , siteUri: config.uri
          , id: results[0].id
          , name: results[0].name
          , content: results[0].content
          , dateCreated: results[0].date_created
          , dateModified: results[0].date_modified
          , datePublished: results[0].date_published
          , type: results[0].type
          , slug: results[0].slug
          , metaTitle: results[0].meta_title
          , metaDescription: results[0].meta_description
          , description: results[0].description
          , excerpt: results[0].excerpt
          , authorId: results[0].author_id
          , contributorsId: results[0].contributors_id
          , status: results[0].status
          , commentsStatus: results[0].comments_status
          , commentsCount: results[0].comments_count
          , keywordsId: results[0].keywords_id
          , mediasId: results[0].medias_id
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
    let url = req.url
    if (error) throw error
    if (results[0]) {
      res.render('person',
        {
          dev: config.dev
          , url: url
          , demo: config.demo
          , siteUri: config.uri
          , name: results[0].honorific_prefix + ' ' + results[0].given_name + ' ' + results[0].family_name + ', ' + results[0].honorific_suffix
          , id: results[0].id
          , metaTitle: results[0].given_name
          , givenName: results[0].given_name
          , familyName: results[0].family_name
          , additionalName: results[0].additional_name
          , honorificPrefix: results[0].honorific_prefix
          , honorificSuffix: results[0].honorific_suffix
          , birthDate: results[0].birth_date
          , birthPlaceId: results[0].birth_place_id
          , deathDate: results[0].death_date
          , deathPlaceId: results[0].death_place_id
          , nationality: results[0].nationality
          , placeId: results[0].place_id
          , telephone: results[0].telephone
          , telephone2: results[0].telephone2
          , email: results[0].email
          , fax: results[0].fax
          //, url: results[0].url
          , occupation: results[0].occupation
          , bias: results[0].bias
          , hobby: results[0].hobby
          , organizationId: results[0].organization_id
          , awward: results[0].awward
          , mediasId: results[0].medias_id
          , signature: results[0].signature
          , description: results[0].description
        }
      )
    } else {
      error404(req, res)
    }
  })
})

app.get('*', error404) // récupération des URLs ne correspondant a aucun des chemins de routage précédents

function error404(req, res) {
  res.status(404)
  res.render('404',
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
