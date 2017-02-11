// -----------------------------------------------------------------------------
// @name Development
// -----------------------------------------------------------------------------

'use strict'

const config = require('./config')
  , opn = require('opn')
  , bs = require('browser-sync').create()
  , fs = require('fs')

opn(config.uri) // ouverture d'un onglet pour l'url de production du site

bs.init({
  proxy: config.uri
  , port: 9001
  , open: 'external'
  , reloadDebounce: 2000 // temps mini entre deux réactualisations de page
  //, logLevel: 'debug' // informations essentielles seulement
  //, logFileChanges: false // information sur les fichiers traités (désactivé car verbeux...)
  , notify: false // notifications dans le navigateur
})

bs.watch('**/*'
  , {ignored: [
    'package.json'
    , 'npm-debug.log'
    , 'config.js'
    , 'app.js'
    , 'dev.js'
  ]}
).on('change', bs.reload)

fs.createReadStream('public/scripts/development/main.js').pipe(fs.createWriteStream('public/scripts/main.js'))