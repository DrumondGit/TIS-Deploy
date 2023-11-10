const QRCode  = require('qrcode');
const express = require('express');
const path = require('path');
const cors = require('cors');
//const pool = require('./db/database');

const { Pool, Client, defaults } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '12345',
  port: 5432,
})

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações do servidor
app.use(express.static(path.join(__dirname, 'public'))); // Configura o servidor para servir arquivos estáticos
app.use(express.json()); // Habilita o parsing de JSON nas requisições
app.use(cors()); // Habilita o middleware de CORS para permitir requisições de diferentes origens

// Inicia o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.post("/login", async function (req, res) {
  let usuario = [];
  const text = `SELECT * FROM usuario WHERE email = $1 AND senha = $2`
  const values = [req.body.email, req.body.senha]
  const con = await pool.query(text, values)

  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: err,
    });
  }

  return res.json({
    tipo: "Login realizado com sucesso",
    mensagem: `Bem vindo de volta, ${con.rows[0].nome}`,
    usuario: {
      id: con.rows[0].id,
      nome: con.rows[0].nome,
      temPermissao: con.rows[0].permissao,
      email: con.rows[0].email,
    },
  });

});



app.post("/alterarDados", async function (req, res) {

  const text = `UPDATE usuario
  SET nome=$1, senha=$2 WHERE id=$3;`

  const values = [req.body.nome, req.body.senha, req.body.id]

  const con = await pool.query(text, values)
  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err
    })
  }
  return res.json({
    tipo: "Sucesso",
    mensagem: "Nome e senha alterados",
  })

});


app.post("/dadosDoacao", async function (req, res) {
  let listaCampanhas = [];

  const text = `SELECT doacao.*, campanha.nome AS nome_campanha
  FROM doacao
  JOIN campanha ON doacao.campanha_id = campanha.id
  WHERE doacao.usuario_id = $1;`

  const values = [req.body.id]

  const con = await pool.query(text, values)

  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err
    })
  }

  for (let i = 0; i < con.rows.length; i++) {
    listaCampanhas.push({
      iddoacao: con.rows[i].iddocao,
      valor: con.rows[i].valor,
      data: con.rows[i].data,
      nome_campanha: con.rows[i].nome_campanha,
    })
  }

  return res.json({
    listaCampanhas: listaCampanhas,
  });
});

app.post("/criarParceiro", async function (req, res) {
  let email = "NULL"
  let instagram = "NULL"
  let facebook = "NULL"
  let site = "NULL"
  let nossoTrabalho = "NULL"
  let values;

  if (req.body.email != "") {
    email = req.body.email
  }
  if (req.body.instagram != "") {
    instagram = req.body.instagram
  }
  if (req.body.facebook != "") {
    facebook = req.body.facebook
  }
  if (req.body.site != "") {
    site = req.body.site
  }
  if (req.body.nossoTrabalho != "") {
    nossoTrabalho = req.body.nossoTrabalho
  }

  const text = `INSERT INTO parceiro(imagem_perfil, nome, objetivo, CNPJ, endereco, telefone, email, instagram, facebook, site, nosso_trabalho) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`
  values = [req.body.img, req.body.nome, req.body.objetivo, req.body.cnpj, req.body.endereco, req.body.telefone, email, instagram, facebook, site, nossoTrabalho]
  

  const con = await pool.query(text, values)
  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err
    })
  }
  if (con.rows[0] == null) {
    return res.json({
      tipo: "Erro",
      mensagem: "Não foi possível realizar a criação"
    })
  }

  return res.json({
    tipo: "Sucesso",
    mensagem: "Parceiro criado com sucesso",
    s: "Funcionamento total"
  });
})


app.post("/alterarParceiro", async function (req, res) {


  const text = `UPDATE parceiro
SET imagem_perfil=$1, nome=$2, objetivo=$3, cnpj=$4, endereco=$5, telefone=$6, email=$7, instagram=$8, facebook=$9, site=$10, nosso_trabalho=$11
WHERE id=$12;`
  const values = [req.body.img, req.body.nome, req.body.objetivo, req.body.cnpj, req.body.endereco, req.body.telefone, req.body.email, req.body.instagram, req.body.facebook, req.body.site, req.body.trabalho, req.body.id]

  const con = await pool.query(text, values)
  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err
    })
  }

  return res.json({
    tipo: "Sucesso",
    mensagem: "Parceiro Alterado",
    s: "Funcionamento total"
  });
})

app.post("/DeletarParceiro", async function (req, res) {


  const text = `DELETE FROM parceiro WHERE id=$1;`
  const values = [req.body.id]

  const con = await pool.query(text, values)
  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err
    })
  }

  return res.json({
    tipo: "Sucesso",
    mensagem: "Parceiro Alterado",
  });
})


// CADASTRO DE USUÁRIO
app.post("/cadastro", async function (req, res) {
  console.log("passou aqui")
  let usuario = [];
  const text = `INSERT INTO usuario(nome, senha, email, permissao, imagemperfil) VALUES ($1, $2, $3, $4, $5) RETURNING *`
  const values = [req.body.nome, req.body.senha, req.body.email, 0, null]
  const con = await pool.query(text, values)

  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: err,
    });
  }

  return res.json({
    tipo: "Cadastro realizado com sucesso",
    mensagem: `Cadastro realizado com sucesso, ${con.rows[0].nome}`,
    usuario: {
      id: con.rows[0].id,
      nome: con.rows[0].nome,
      senha: con.rows[0].senha,
      email: con.rows[0].email,
      temPermissao: con.rows[0].temPermissao,
      imagemperfil: con.rows[0].imagemperfil
    },
  });

});

app.get("/listarParceiro", async function (req, res) {

  var arrayParceiros = [];
  const text = `SELECT * FROM parceiro`
  const con = await pool.query(text)

  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err,
    });
  } else {
    for (let i = 0; i < con.rows.length; i++) {
      arrayParceiros.push({
        id: con.rows[i].id,
        nome: con.rows[i].nome,
        imagemperfil: con.rows[i].imagem_perfil,
        objetivo: con.rows[i].objetivo,
        cnpj: con.rows[i].cnpj,
        endereco: con.rows[i].endereco,
        telefone: con.rows[i].telefone,
        email: con.rows[i].email,
        instagram: con.rows[i].instagram,
        facebook: con.rows[i].facebook,
        site: con.rows[i].site,
        nossoTrabalho: con.rows[i].nosso_trabalho
      });
    }
  }

  res.json(arrayParceiros);
});

app.post("/acharParceiro", async function (req, res) {
  const text = `SELECT * FROM parceiro WHERE id=$1`
  const values = [req.body.id]; // Use req.query.id or req.params.id
  const con = await pool.query(text, values);

  return res.json({
    parceiro: {
      id: con.rows[0].id,
      nome: con.rows[0].nome,
      imagemperfil: con.rows[0].imagem_perfil,
      objetivo: con.rows[0].objetivo,
      cnpj: con.rows[0].cnpj,
      endereco: con.rows[0].endereco,
      telefone: con.rows[0].telefone,
      email: con.rows[0].email,
      instagram: con.rows[0].instagram,
      facebook: con.rows[0].facebook,
      site: con.rows[0].site,
      nossoTrabalho: con.rows[0].nosso_trabalho
    }
  });

});


app.post("/criarCampanha", async function (req, res) {

  let text = `INSERT INTO campanha
  (nome, objetivo, finalidade, meta, sitecampanha)
  VALUES($1, $2, $3, $4, $5) RETURNING *`
  let values = [req.body.nome, req.body.objetivo, req.body.finalidade, req.body.meta, req.body.site_campanha]

  let con = await pool.query(text, values)
  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err
    })
  }


  text = `select * from campanha where nome like $1 `
  values = [req.body.nome]
  con = await pool.query(text, values)
  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err
    })
  }

  text = `INSERT INTO parceiro_has_campanha(parceiro_id, campanha_id) VALUES ($1, $2)`
  values = [req.body.parceiro, con.rows[0].id]
  con = await pool.query(text, values)
  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err
    })
  }

  return res.json({
    tipo: "Sucesso",
    mensagem: "Campanha criada com sucesso",
    s: "Funcionamento total"
  });
})


app.post("/alterarCampanha", async function (req, res) {

  const text = `UPDATE campanha SET nome=$1, objetivo=$2, finalidade=$3, meta=$4, sitecampanha=$5 WHERE id=$6;`

  const values = [req.body.nome, req.body.objetivo, req.body.finalidade, Number(req.body.meta), req.body.site, Number(req.body.id)]

  const con = await pool.query(text, values)
  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err
    })
  }
  return res.json({
    tipo: "Sucesso",
    mensagem: "A campanha foi alterada",
  })

});

app.post("/viewCampanha", async function (req, res) {
  const text = `SELECT * FROM campanha
  WHERE id = $1;`

  const values = [req.body.id]

  const con = await pool.query(text, values)

  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err
    })
  }
  if (con.rows[0] == null) {
    return res.json({
      tipo: "Erro",
      mensagem: "Não foi possível retornar os dados"
    })
  }

  return res.json({
    nome: con.rows[0].nome,
    objetivo: con.rows[0].objetivo,
    finalidade: con.rows[0].finalidade,
    site: con.rows[0].sitecampanha,
    meta: con.rows[0].meta
  });
});

app.post("/excluirCampanha", async function (req, res) {
  const text = `DELETE FROM campanha
  WHERE id = $1;`

  const values = [req.body.id]

  const con = await pool.query(text, values)

  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err
    })
  }

  return res.json({
    s: "funcionou"
  });
});

app.post("/viewImagensCampanha", async function (req, res) {
  let imagens = [];

  const text = `SELECT * FROM imagem
  WHERE campanha_id = $1;`

  const values = [req.body.id]

  const con = await pool.query(text, values)

  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err
    })
  }

  for (let i = 0; i < con.rows.length; i++) {
    imagens.push({
      id: con.rows[i].id,
      imagem: con.rows[i].imagem,
      principal: con.rows[i].principal
    })
  }

  return res.json({
    imagens
  });
});

app.post("/addImagem", async function (req, res) {
  const text = `INSERT INTO imagem(imagem, campanha_id, principal) VALUES ($1, $2, 0) RETURNING *`
  values = [req.body.img, req.body.id]

  const con = await pool.query(text, values)

  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err
    })
  }

  if (con.rows[0] == null) {
    return res.json({
      tipo: "Erro",
      mensagem: "Não foi possível adicionar a imagem"
    })
  }

  return res.json({
    s: "Funcionamento total"
  });
})

app.post("/deletarImagemCampanha", async function (req, res) {
  const text = `DELETE FROM imagem
  WHERE id = $1;`

  const values = [req.body.id]

  const con = await pool.query(text, values)

  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err
    })
  }

  const text2 = `SELECT * FROM imagem WHERE campanha_id = $1 AND principal = 1;`
  
  const values2 = [req.body.id_campanha]

  const con2 = await pool.query(text2, values2)

  if (con2.err) {
    return res.json({
      tipo: "Erro 2",
      mensagem: con2.err
    })
  }

  if(con2.rowCount == 0) {
    const text3 = `UPDATE imagem SET principal = 1
    WHERE id = (SELECT id FROM imagem WHERE campanha_id = $1 LIMIT 1);`
    
    const values3 = [req.body.id_campanha]

    const con3 = await pool.query(text3, values3)

    if (con3.err) {
      return res.json({
        tipo: "Erro 3",
        mensagem: con3.err
      })
    }
  }

  return res.json({
    s: "funcionou"
  });
});

app.post("/alterarImagemPrincipal", async function (req, res) {

  const text = `UPDATE imagem SET principal = 0
  WHERE campanha_id = $1 AND principal = 1;`

  const values = [req.body.id_campanha]

  const con = await pool.query(text, values)

  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err
    })
  }

  const text2 = `UPDATE imagem SET principal = 1
  WHERE id = $1;`
  
  const values2 = [req.body.id]

  const con2 = await pool.query(text2, values2)

  if (con2.err) {
    return res.json({
      tipo: "Erro 2",
      mensagem: con2.err
    })
  }

  return res.json({
    tipo: "Sucesso",
    mensagem: "Imagem principal alterada",
    s: "funcionou"
  });
});

app.post("/dadosRelatorio", async function (req, res) {
  var x = [];
  var y = [];
  var cores = [];

  const text = `SELECT c.nome as campanha, sum(d.valor) as valor
  FROM campanha c, doacao d, parceiro_has_campanha phc
  where phc.parceiro_id = $1 and d.campanha_id = c.id and c.id = phc.campanha_id
  group by 1, d.campanha_id;`
  const values = [req.body.id]
  const con = await pool.query(text, values)

  if(con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err,
    });
  }

  if(con.rows[0] == null){
    x.push("Não há doações")
    y.push(0)
    cores.push("black")
  }
  
  for (let i = 0; i < con.rows.length; i++) {
    x.push(con.rows[i].campanha)
    y.push(con.rows[i].valor)
    cores.push("black")
  }

  return res.json({
    x,
    y,
    cores
  });
});
//--------------------------------------------------------------------------
app.get("/listarCampanha", async function (req, res) {

  var arrayCampanhas = [];
  const text = `SELECT * FROM campanha`
  const con = await pool.query(text)

  if (con.err) {
    return res.json({
      tipo: "Erro",
      mensagem: con.err,
    });
  } else {
    for (let i = 0; i < con.rows.length; i++) {
      arrayCampanhas.push({
        id: con.rows[i].id,
        nome: con.rows[i].nome,
        objetivo: con.rows[i].objetivo,
        finalidade: con.rows[i].finalidade,
        meta: con.rows[i].meta,
        site: con.rows[i].sitecampanha,
      });
    }
  }

  res.json(arrayCampanhas);
});

app.post("/fazerPix", function (req, res) {
  let pixKey = 14033603670;
  let valor = 1.00;
  let text = `version: '01', key: ${pixKey}, name: 'Pedro Ramos Vidigal', city: 'Belo Horizonte', message: 'Sua mensagem', value: ${valor}`;

  QRCode.toDataURL(text, function (err, url) {
    if (err) throw err
    res.json({qrCodeImage: url});
  })
})

app.post("/ReadCampanha", async function (req, res) {
  var dados=[];
  const text = `  
  SELECT campanha.nome AS campanha_nome,
         campanha.objetivo AS objetivo,
         campanha.finalidade as finalidade,
         campanha.meta as meta,
         campanha.sitecampanha as site_campanha,
         imagem AS valores_imagem, 
         parceiro.id AS parceiro_id, 
         parceiro.nome as parceiro_nome,
         parceiro.objetivo as objetivo_parceiro,
         parceiro.site as site
  FROM campanha
  LEFT JOIN imagem ON campanha.id = imagem.campanha_id
  INNER JOIN parceiro_has_campanha ON campanha.id = parceiro_has_campanha.campanha_id
  INNER JOIN parceiro ON parceiro_has_campanha.parceiro_id = parceiro.id
  WHERE campanha.id = $1;
  `;

  const values = [req.body.id];
  const con = await pool.query(text, values);

    if (con.rows[0] == null) {
      return res.json({
        tipo: "Erro",
        mensagem: "Não foi possível retornar os dados"
      });
    }
    if (con.err) {
      return res.json({
        tipo: "Erro",
        mensagem: err.message
      });
    }else{
      for (let i = 0; i < con.rows.length; i++) {
        dados.push({ 
          campanha_nome: con.rows[i].campanha_nome,
          objetivo: con.rows[i].objetivo,
          finalidade: con.rows[i].finalidade,
          meta: con.rows[i].meta,
          site_campanha: con.rows[i].site_campanha,
          valores_imagem: con.rows[i].valores_imagem,
          parceiro_nome: con.rows[i].parceiro_nome,
          objetivo_parceiro: con.rows[i].objetivo_parceiro,
          site: con.rows[i].site,
        });
      }
    }
    return res.json({dados});
})

app.post("/ReadComentario", async function (req, res) {
  var dados=[];
  const text = `
  SELECT comentario.*, usuario.nome AS nome_usuario
  FROM comentario
  LEFT JOIN usuario ON comentario.usuario_id = usuario.id
  WHERE comentario.campanha_id = $1;
  `;

  const values = [req.body.id];
  const con = await pool.query(text, values);

    if (con.rows[0] == null) {
      return res.json({
        tipo: "Erro",
        mensagem: "Não foi possível retornar os dados"
      });
    }
    if (con.err) {
      return res.json({
        tipo: "Erro",
        mensagem: err.message
      });
    }else{
      for (let i = 0; i < con.rows.length; i++) {
        dados.push({ 
          idcomentario: con.rows[i].idcomentario,
          texto: con.rows[i].texto,
          data: con.rows[i].data,
          nome_usuario: con.rows[i].nome_usuario,
        });
      }
    }
    return res.json({dados});
})

app.post("/AddComentario", async function (req, res) {
  const text = `INSERT INTO comentario
  (idcomentario, texto, "data", usuario_id, campanha_id)
  VALUES(default,$1,now(),$2,$3);
  `;

  const values = [req.body.comentario, req.body.userId, req.body.id];
  const con = await pool.query(text, values);

    if (con.err) {
      return res.json({
        tipo: "Erro",
        mensagem: err.message
      });}

    return res.json({
      tipo: "Sucesso",
      mensagem: "Comentário adicionado!"
      });
})