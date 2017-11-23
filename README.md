# Prerequisite

`Node.js` is required. 
Download from https://nodejs.org/ko/download/ and install.

`PM2` is used to manage production server process.

```
npm install pm2 -g
```

`Express` for web application server, `React` with `Redux` for client side script. 
All source codes are based on ES6. Therefore use `Babel` with `Webpack` to transform source codes. 
`CoreUI` (http://coreui.io/) is used for base template. 

# Directory Structure

```
.
+-- src
|   +-- actions
|       +-- ...
|   +-- components
|       +-- ...
|   +-- constants
|       +-- ...
|   +-- containers
|       +-- ...
|   +-- reducers
|       +-- ...
|   +-- server
|       +-- routes
|           +-- ...
|       +-- main.js
|   +-- index.js
+-- public
|   +-- css
|       +-- ...
|   +-- fonts
|       +-- ...
|   +-- img
|   +-- js
|   +-- index.html
+-- env
|   +-- development.json
|   +-- production.json
+-- build
|   +-- ...
+-- .babelrc
+-- package.json
+-- webpack.config.dev.js
+-- webpack.config.js
```

`src` directory is the base source directory. 
It consists of `actions`, `constants`, `reducers`, `containers`, and `components` directories to reflect `Redux` structure.
In addition, it has `server` directory to keep several configuration files for `Express` server. 

`public` directory is used for server static files such as 'javascript', 'css', 'image' and so on.
`index.html` in `public` directory is used for a main entrance file.

If you build `src` directory, the outputs are saved into `build` directory.
This directory is used to run on production server. 

# Scripts   

First, install all dependencies.

```
npm install
```

To develop, 

```
npm run dev
```

will start a server, listening on connections from `localhost` on port `8081`.

To production build, 

```
npm run build
```

will copy es6 scripts transformed by `Babel` from `src` into `build` directory.
It also copy `bundle.js` file created by `Webpack` to `public/js` directory.

It is recommended to run `clean` before `build`.

```
npm run clean
```

To run on production server,

```
npm run start:prod
```

will listen on connections from `server.domain` on port `8080`.

If you want to run on development server, use `start:dev` instead.