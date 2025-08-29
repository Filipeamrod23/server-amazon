// CRUD (CREATE)(POST), (READ)(GET), (UPDATE)(PUT), (DELETE)(DELETE)
// FUNÇÕES DO BACKEND: (GET), (POST), (PUT), (DELETE)
// ROTAS, https://example.net (HOME)

const express = require("express");
const cors = require('cors')
const app = express();
const port = 3000;

// banco de dados mocado
const users = [];

app.use(cors())

app.use(express.json());
// localhost:3000
app.get("/usuarios", (req, res) => {
  res.json(users);
});

app.get("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const usuario = users.find((u) => u.id == id);
  if (!usuario) {
    return res.status(404).json({ mensagem: "usuário não foi encontrado" });
  }
  res.json(usuario);
});

app.post('/enviar-dados', (req, res) => {
    const {nome, email} = req.body;
    const novoUsuario = {
        id: users.length + 1,
        nome,
        email
    } 
    // colocar alerta para quando a informação chegar no backend avisar o usuário
    users.push(novoUsuario);


    //200: informação
    // 201: informação criada com sucesso
    console.log("Novo usuário recebido: ", novoUsuario);

    res.status(201).json({
      mensagem: 'Dados recebidos com sucesso'
    })


});

app.put('/usuarios/:id', (req, res)=>{
  const id = parseInt(req.params.id)
  const {nome, email} = req.body;

  const usuario = users.find(u => u.id === id);
  if (!usuario) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' })
    }

    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;

    res.json({
        mensagem: 'Usuário atualizado com sucesso',
        usuario
    });
});

app.delete('/usuarios/:id', (req, res)=>{
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  
  if(index === -1){
    return res.status(404).json({mensagem: "ID do Usuário não consta no sistema"})    
  }
  users.splice(index, 1);

  res.json({mensagem: 'Usuário deletado com sucesso'});
  
});

app.listen(port, () => {
  console.log("porta está sendo escutada no endereço localhost");
});
