
Basic Site Structure
===================

A simple site structure, with gulp script to: 

* build css from sass
* build javascript from typescript
* dev and prod enviroments

Useful for single page javascript/css destination page. 

# Requirements: 
* node.js (install from)
* gulp (install with npm install -g gulp)

# How to use

* Clone repository 
* npm install

src folder contents: 
* fonts: fonts css definitions
* scss: sass src file
* ts: typescript src file

dist folder contents: 
* fonts: destination fonts css definitions
* maps: map generated from typescripyt
* index.html: single page html 

# Run

gulp build --env [dev | prod]

# Note

If env is set to "prod" javascript and css are minify, but destination file not have .min suffix.
