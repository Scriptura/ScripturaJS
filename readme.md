# ScripturaJS
> Interface for web apps

__Project in development ...__

* A framework for Node.js
* MVC architecture
* Template engines with Pug.js
* Style sheets generated with Stylus

## Proposition de hiérarchie pour l'instant :

    ./
    ├── app.js
    ├── models/
    │   ├── post.js
    │   └── user.js
    ├── views/
    │   ├── partial/
    │   │   ├── author.pug
    │   │   ├── footer.pug
    │   │   └── head.pug
    │   └── patternLayouts.pug
    ├── controllers/
    ├── config/
    │   ├── dev.js
    │   ├── locales/
    │   │   ├── fr.js
    │   │   └── en.js
    │   └── routes.js
    ├── public/
    │   ├── fonts/
    │   ├── medias/
    │   │   ├── images/
    │   │   └── videos/
    │   ├── scripts/
    │   │   ├── admin.js
    │   │   ├── main.js
    │   │   ├── development/
    │   │   │   ├── admin.js
    │   │   │   └── main.js
    │   │   └── vendors/
    │   │       ├── jQuery.js
    │   │       ├── cycle.js
    │   │       ├── d3.js
    │   │       ├── mediaElement/
    │   │       └── ...
    │   └── styles/
    │       ├── main.css
    │       ├── main.css.map
    │       ├── demo.css
    │       ├── demo.css.map
    │       ├── expanded/
    │       │   ├── main.css
    │       │   └── demo.css
    │       └── development/
    │           ├── main.styl
    │           └── demo.styl
    ├── resources/
    ├── node_modules/
    ├── package.json
    ├── .gitignore
    └── readme.md