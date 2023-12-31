
INSERT INTO usuario
(id, nome, senha, email, permissao, imagemperfil)
VALUES(nextval('usuario_id_seq'::regclass), 'Luiz', 12345, 'Luiz@gmail', 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0mo1-1RPPCSd54lH3fcOeOWM1wRHxEZ3C1A&usqp=CAU'),
(nextval('usuario_id_seq'::regclass), 'Gustavo', 12345, 'Gustavo@gmail', 0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0mo1-1RPPCSd54lH3fcOeOWM1wRHxEZ3C1A&usqp=CAU'),
(nextval('usuario_id_seq'::regclass), 'Amanda', 12345, 'Amanda@gmail', 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0mo1-1RPPCSd54lH3fcOeOWM1wRHxEZ3C1A&usqp=CAU');

INSERT INTO campanha
(id, nome, objetivo, finalidade, meta, sitecampanha)
VALUES(nextval('campanha_id_seq'::regclass), 'Dança Urbana', 'A', 'A', 2000, 'A'),
(nextval('campanha_id_seq'::regclass), 'Festival de Jazz', 'B', 'B', 4000, 'B'),
(nextval('campanha_id_seq'::regclass), 'Arrecadação para museu municipal', 'C', 'C', 100, 'C'),
(nextval('campanha_id_seq'::regclass), 'Ateliê Uelinte ', 'D', 'D', 66000, 'D'),
(nextval('campanha_id_seq'::regclass), 'Ballet Nacional da Rússia', 'E', 'E', 10, 'E');

INSERT INTO doacao
(iddoacao, valor, "data", usuario_id, campanha_id)
VALUES(nextval('doacao_iddoacao_seq'::regclass), 20, now(), 2, 1),
(nextval('doacao_iddoacao_seq'::regclass), 50, now(), 2, 2),
(nextval('doacao_iddoacao_seq'::regclass), 120, now(), 2, 3),
(nextval('doacao_iddoacao_seq'::regclass), 45, now(), 2, 4),
(nextval('doacao_iddoacao_seq'::regclass), 1, now(), 2, 5);

INSERT INTO parceiro (imagem_perfil, nome, objetivo, CNPJ, endereco, telefone, email, instagram, facebook, site, nosso_trabalho) 
VALUES 
('../assets/img/parceiro1.png', 'Parceiro 1', 'Objetivo 1', 'CNPJ 1', 'Endereço 1', 'Telefone 1', 'Email 1', 'Instagram 1', 'Facebook 1', 'Site 1', 'Nosso trabalho 1'),
('../assets/img/parceiro1.png', 'Parceiro 2', 'Objetivo 2', 'CNPJ 2', 'Endereço 2', 'Telefone 2', 'Email 2', 'Instagram 2', 'Facebook 2', 'Site 2', 'Nosso trabalho 2'),
('../assets/img/parceiro1.png', 'Parceiro 3', 'Objetivo 3', 'CNPJ 3', 'Endereço 3', 'Telefone 3', 'Email 3', 'Instagram 3', 'Facebook 3', 'Site 3', 'Nosso trabalho 3'),
('../assets/img/parceiro1.png', 'Parceiro 4', 'Objetivo 4', 'CNPJ 4', 'Endereço 4', 'Telefone 4', 'Email 4', 'Instagram 4', 'Facebook 4', 'Site 4', 'Nosso trabalho 4'),
('../assets/img/parceiro1.png', 'Parceiro 5', 'Objetivo 5', 'CNPJ 5', 'Endereço 5', 'Telefone 5', 'Email 5', 'Instagram 5', 'Facebook 5', 'Site 5', 'Nosso trabalho 5');

INSERT INTO comentario
(idcomentario, texto, "data", usuario_id, campanha_id)
VALUES(nextval('comentario_idcomentario_seq'::regclass), 'Muito boa camapnha', now(), 1, 1),
(nextval('comentario_idcomentario_seq'::regclass), 'Muito boa camapnha', now(), 2, 1),
(nextval('comentario_idcomentario_seq'::regclass), 'Muito boa camapnha', now(), 3, 1),
(nextval('comentario_idcomentario_seq'::regclass), 'Muito boa camapnha', now(), 1, 2),
(nextval('comentario_idcomentario_seq'::regclass), 'Muito boa camapnha', now(), 2, 2),
(nextval('comentario_idcomentario_seq'::regclass), 'Muito boa camapnha', now(), 3, 2),
(nextval('comentario_idcomentario_seq'::regclass), 'Muito boa camapnha', now(), 1, 3),
(nextval('comentario_idcomentario_seq'::regclass), 'Muito boa camapnha', now(), 2, 3),
(nextval('comentario_idcomentario_seq'::regclass), 'Muito boa camapnha', now(), 3, 3);

INSERT INTO parceiro_has_campanha (parceiro_id, campanha_id)
VALUES 
  (nextval('parceiro_has_campanha_parceiro_id_seq'::regclass), nextval('parceiro_has_campanha_campanha_id_seq'::regclass)),
  (nextval('parceiro_has_campanha_parceiro_id_seq'::regclass), nextval('parceiro_has_campanha_campanha_id_seq'::regclass)),
  (nextval('parceiro_has_campanha_parceiro_id_seq'::regclass), nextval('parceiro_has_campanha_campanha_id_seq'::regclass)),
  (nextval('parceiro_has_campanha_parceiro_id_seq'::regclass), nextval('parceiro_has_campanha_campanha_id_seq'::regclass));

  INSERT INTO postgres.imagem
(id, imagem, campanha_id, principal)
VALUES(nextval('imagem_id_seq'::regclass), 'https://i.pinimg.com/originals/cd/bc/f0/cdbcf077b62246123f74fcc919587b0b.jpg', 1, 0),
(nextval('imagem_id_seq'::regclass), 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-XvvMFfz2sf5o2MNsvg8TYgY3YeL0YgJmmA&usqp=CAU', 1, 0),
(nextval('imagem_id_seq'::regclass), 'https://www.imgacademy.com/sites/default/files/2016-performance-about.jpg', 1, 0),
(nextval('imagem_id_seq'::regclass), 'https://i.pinimg.com/originals/cd/bc/f0/cdbcf077b62246123f74fcc919587b0b.jpg', 2, 0),
(nextval('imagem_id_seq'::regclass), 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-XvvMFfz2sf5o2MNsvg8TYgY3YeL0YgJmmA&usqp=CAU', 2, 0),
(nextval('imagem_id_seq'::regclass), 'https://www.imgacademy.com/sites/default/files/2016-performance-about.jpg', 2, 0),
(nextval('imagem_id_seq'::regclass), 'https://i.pinimg.com/originals/cd/bc/f0/cdbcf077b62246123f74fcc919587b0b.jpg', 4, 0),
(nextval('imagem_id_seq'::regclass), 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-XvvMFfz2sf5o2MNsvg8TYgY3YeL0YgJmmA&usqp=CAU', 4, 0),
(nextval('imagem_id_seq'::regclass), 'https://www.imgacademy.com/sites/default/files/2016-performance-about.jpg', 4, 0),
(nextval('imagem_id_seq'::regclass), 'https://i.pinimg.com/originals/cd/bc/f0/cdbcf077b62246123f74fcc919587b0b.jpg', 3, 0),
(nextval('imagem_id_seq'::regclass), 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-XvvMFfz2sf5o2MNsvg8TYgY3YeL0YgJmmA&usqp=CAU', 3, 0),
(nextval('imagem_id_seq'::regclass), 'https://www.imgacademy.com/sites/default/files/2016-performance-about.jpg', 3, 0);