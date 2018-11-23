# WP React Theme

Single-page application theme for Wordpress made by:
* React
* Redux

************
## Usage:

`src/index` - entry point application

`index.php` - entry point wordpress theme

`function.php` - contains API for apllication:
* get menu
* get produc
* get products by category
* get subcategories
* get cyrilic category name
* get page content

* callme handler
* courier form handler

and other Wordpress settings

### Scripts

`npm run watch` - for development

`npm run build` - get production build

************
### Directories structure:
    src/
        components/
        actions/
        api/
        reducers/
        index.js  - entry point application
    functions.php - contains API for apllication
    index.php     - entry point wordpress theme
    ...
