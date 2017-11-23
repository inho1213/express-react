import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import routes from './routes';

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser('SECRETKEY'));
app.use(express.static(path.join(__dirname, '../../public')));

app.use('/api', routes);

app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
})

app.listen(process.env.PORT || 8080);

if (!process.env.NODE_ENV) {
    const config = require('../../webpack.config.dev.js');
    const compiler = webpack(config);
    const server = new WebpackDevServer(compiler, config.devServer);
    
    server.listen(process.env.DEV_PORT || 8081);
}

export default app;