const express = require('express');
const app = express();

const PORT = 3000;

const pessoas = [
    { id: 1, nome: 'Ana Silva', idade: 28, genero: 'feminino' },
    { id: 2, nome: 'Carlos Souza', idade: 35, genero: 'masculino' },
    { id: 3, nome: 'Maria Oliveira', idade: 22, genero: 'feminino' },
    { id: 4, nome: 'João Pereira', idade: 40, genero: 'masculino' },
    { id: 5, nome: 'Fernanda Costa', idade: 30, genero: 'feminino' },
    { id: 6, nome: 'Lucas Lima', idade: 25, genero: 'masculino' },
];

pessoas.push({ id: 7, nome: 'Alberto Castro', idade: 18, genero: 'masculino' });

app.use(express.json());

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
            pessoa.idade == parseInt(idade)
        );
    }

    if (genero) {
        resultado = resultado.filter(pessoa =>
            pessoa.genero.toLowerCase() === genero.toLowerCase()
        );
    }

    res.json(resultado);
});

app.post('/pessoa', (req, res) => {
    const { nome, idade, genero } = req.body;
    const novaPessoa = {
        id: pessoas.length + 1,
        nome,
        idade: parseInt(idade),
        genero
    };
    pessoas.push(novaPessoa);
    res.json({ mensagem: 'Cadastrado com sucesso', pessoa: novaPessoa });
});

app.patch('/pessoa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, idade, genero } = req.body;
    const pessoa = pessoas.find(p => p.id === id);

    if (!pessoa) {
        return res.status(404).json({ mensagem: 'Pessoa não encontrada' });
    }

    if (nome) pessoa.nome = nome;
    if (idade) pessoa.idade = parseInt(idade);
    if (genero) pessoa.genero = genero;

    res.json({ mensagem: 'Pessoa atualizada', pessoa });
});

app.delete('/pessoa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = pessoas.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: 'Pessoa não encontrada' });
    }

    pessoas.splice(index, 1);
    res.json({ mensagem: 'Pessoa deletada com sucesso' });
});

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
