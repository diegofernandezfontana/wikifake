const express = require('express');
const app = express();
const morgan = require('morgan');
const routes = require('./routes');
var bodyParser = require('body-parser')
const nunjucks = require('nunjucks');
const models = require('./models');


app.use(express.static(__dirname + '/public/')); //PARA PODER IMPORTAR ESTILOS -> NO ELIMINAR

nunjucks.configure('views', { noCache: true });

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function(){
    models.db.sync({force: true})
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);
