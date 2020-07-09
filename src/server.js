const express = require('express');

const app = express();

app.use(express.json())

var restaurantes = [];

app.get('/restaurantes', (request, response) => {
    response.json(restaurantes);
})


app.post('/restaurante', (request, response) => {
    var restaurante = request.body;
    
    restaurantes.push(restaurante);

    response.json(restaurante.nome);
})


app.post('/restaurantes', (request, response) => {
    var restaurantesBody = request.body;

    restaurantes.push(... restaurantesBody);

    response.json(restaurantes);
})

app.put('/restaurante/:nome', (request, response) => {
    var nome = request.params.nome;
    var novoNome = request.body.nome;

    var index = restaurantes.findIndex((restaurante) => restaurante.nome == nome);

    if(index == -1) {
       response.status(404).json({erro: 'esse recurso não existe'}) 
    }else {
        restaurantes[index].nome = novoNome;
        response.status(200).json({message: 'Tudo certo', restaurantes: restaurantes})
    }


})

app.delete('/restaurante/:nome', (request, response) => {
    var nome = request.params.nome;

    var index = restaurantes.findIndex((restaurante) => restaurante.nome == nome);

    restaurantes.splice(index,1);

    response.status(200).json({message: 'Tudo certo', restaurantes: restaurantes})
})


app.listen(3000, () => {
    console.log('Servidor Rodando na porta 3000');
});