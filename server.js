const express = require('express');
const app = express();

const PORT = 3000;

const pessoas = [
    { nome: 'Ana Silva', idade: 28, genero: 'feminino' },
    { nome: 'Carlos Souza', idade: 35, genero: 'masculino' },
    { nome: 'Maria Oliveira', idade: 22, genero: 'feminino' },
    { nome: 'João Pereira', idade: 40, genero: 'masculino' },
    { nome: 'Fernanda Costa', idade: 30, genero: 'feminino' },
    { nome: 'Lucas Lima', idade: 25, genero: 'masculino' },
];

app.get('/pessoas', (req, res) => {
    res.json(pessoas);
});

app.get('/pessoas/buscar', (req, res) => {
    const { nome, idade, genero } = req.query;
    let resultado = pessoas;

    if (nome) {
        resultado = resultado.filter(pessoa =>
            pessoa.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }

    if (idade) {
        resultado = resultado.filter(pessoa =>
            pessoa.idade === parseInt(idade)
        );
    }

    if (genero) {
        resultado = resultado.filter(pessoa =>
            pessoa.genero.toLowerCase() === genero.toLowerCase()
        );
    }

    res.json(resultado);
});

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
