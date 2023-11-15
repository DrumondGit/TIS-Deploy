-- DROP DATABASE encorajarte;

CREATE TABLE usuario (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(45) NOT NULL,
  senha VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  permissao SMALLINT NOT NULL DEFAULT 0,
  imagemPerfil TEXT NULL
);

CREATE TABLE parceiro (
  id SERIAL PRIMARY KEY,
  imagem_perfil TEXT NOT NULL,
  nome VARCHAR(45) NOT NULL,
  objetivo VARCHAR(500) NOT NULL,
  CNPJ VARCHAR(45) NOT NULL UNIQUE,
  endereco VARCHAR(100) NOT NULL,
  telefone VARCHAR(15) NOT NULL,
  email VARCHAR(45) NULL,
  instagram VARCHAR(45) NULL,
  facebook VARCHAR(45) NULL,
  site VARCHAR(45) NULL,
  nosso_trabalho VARCHAR(500) NULL
);

CREATE TABLE campanha (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(45) NOT NULL,
  objetivo VARCHAR(300) NOT NULL,
  finalidade VARCHAR(300) NOT NULL,
  meta DECIMAL NOT NULL,
  siteCampanha VARCHAR(45) null,
  chavePix VARCHAR(20) NULL
);

CREATE TABLE imagem (
  id SERIAL PRIMARY KEY,
  imagem TEXT NOT NULL,
  campanha_id SERIAL REFERENCES campanha(id) ON DELETE CASCADE,
  principal SMALLINT NULL DEFAULT 0
);

CREATE TABLE parceiro_has_campanha (
  parceiro_id SERIAL REFERENCES parceiro(id) ON DELETE CASCADE,
  campanha_id SERIAL REFERENCES campanha(id) ON DELETE CASCADE,
  PRIMARY KEY (parceiro_id,campanha_id)
);

CREATE TABLE doacao (
  idDoacao SERIAL PRIMARY KEY,
  valor DECIMAL NOT NULL,
  data DATE NOT NULL DEFAULT now(),
  usuario_id SERIAL REFERENCES usuario(id) ON DELETE CASCADE,
  campanha_id SERIAL REFERENCES campanha(id) ON DELETE CASCADE
);

CREATE TABLE comentario (
  idComentario SERIAL PRIMARY KEY,
  texto VARCHAR(250) NOT NULL,
  data DATE NOT NULL DEFAULT now(),
  usuario_id SERIAL REFERENCES usuario(id) ON DELETE CASCADE,
  campanha_id SERIAL REFERENCES campanha(id) ON DELETE CASCADE
);