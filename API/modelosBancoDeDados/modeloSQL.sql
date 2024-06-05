Create database DBA
use  DBA

CREATE TABLE Usuarios (
    id_usuario NUMERIC(7) IDENTITY(1,1) PRIMARY KEY NOT NULL,
    nome_completo VARCHAR(20) NOT NULL,
	nome_acesso VARCHAR(20) NOT NULL,
    senha_acesso VARCHAR(20) NOT NULL,
	nivel_usuario NUMERIC NOT NULL,
	nascimento DATETIME NOT NULL,
	telefone VARCHAR(20) NOT NULL
);


CREATE TABLE Categorias (
    id_categoria NUMERIC(7) IDENTITY(1,1) PRIMARY KEY NOT NULL,
    nome_categoria VARCHAR(20) NOT NULL,
	descricao_categoria VARCHAR(45) NOT NULL,
    imagem_categoria VARCHAR(200) NOT NULL
);


CREATE TABLE Noticias (
    id_noticia NUMERIC(7) IDENTITY(1,1) PRIMARY KEY NOT NULL,
    titulo VARCHAR(45) NOT NULL,
    descricao_noticia VARCHAR(200) NOT NULL,
    url_noticia VARCHAR(200) NOT NULL,
    url_imagem_noticia VARCHAR(200) NOT NULL,
    data_cadastro DATETIME NOT NULL,
    data_expira DATETIME NOT NULL,
    ref_jornalista NUMERIC(7) NOT NULL,
    ref_categoria NUMERIC(7) NOT NULL,
    FOREIGN KEY (ref_jornalista) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (ref_categoria) REFERENCES Categorias(id_categoria)
);


CREATE TABLE Preferencias (
    id_preferencia NUMERIC(7) IDENTITY(1,1) PRIMARY KEY NOT NULL,
    pref_usuario NUMERIC(7) NOT NULL,
    pref_categoria NUMERIC(7) NOT NULL,
    FOREIGN KEY (pref_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (pref_categoria) REFERENCES Categorias(id_categoria)
);


INSERT INTO Usuarios (nome_completo, nome_acesso, senha_acesso, nivel_usuario, nascimento, telefone)
VALUES
('João da Silva', 'joaosilva', 'senha123', 2, '2000-01-01', '49988952148'),
('Maria Oliveira', 'mariaoliveira', 'senha123', 2, '1998-05-15', '49988756321'),
('Jorge Santos', 'jorgesantos', 'senha123', 2, '1985-07-20', '49991254787'),
('Ana Souza', 'anasouza', 'senha123', 2, '1978-09-10', '49985632479'),
('Carlos Pereira', 'carlospereira', 'senha123', 2, '1970-03-25', '49999931591');


INSERT INTO Categorias (nome_categoria, descricao_categoria, imagem_categoria)
VALUES
('Saúde', 'Notícias relacionadas à saúde', 'www.link_da_imagem.com'),
('Tecnologia', 'Últimas novidades em tecnologia', 'www.link_da_imagem.com'),
('Notícias', 'Notícias gerais', 'www.link_da_imagem.com');


INSERT INTO Noticias (titulo, descricao_noticia, url_noticia, url_imagem_noticia, data_cadastro, data_expira, ref_jornalista, ref_categoria)
VALUES
('Benefícios da meditação para a saúde', 'Pesquisadores descobrem que a meditação regular pode reduzir o estresse.', 'https://site_da_noticia.com', 'https://www.link_da_imagem.com', '2024-04-29', '2024-05-29', 1, 1),
('Dieta rica em vegetais previne doenças', 'Pesquisa sugere que dietas ricas em vegetais podem reduzir o risco de doenças cardíacas.', 'https://site_da_noticia.com', 'https://www.link_da_imagem.com', '2024-04-29', '2024-05-29', 2, 1);


INSERT INTO Noticias (titulo, descricao_noticia, url_noticia, url_imagem_noticia, data_cadastro, data_expira, ref_jornalista, ref_categoria)
VALUES
('Empresa anuncia novo smartphone', 'A empresa XYZ lança seu mais recente smartphone.', 'https://exemplo.com/noticia3', 'url_imagem_noticia3.jpg', '2024-04-29', '2024-05-29', 3, 2),
('Startup de tecnologia arrecada investimento', 'A startup ABC recebeu um investimento de milhões para desenvolver novas tecnologias.', 'https://exemplo.com/noticia4', 'url_imagem_noticia4.jpg', '2024-04-29', '2024-05-29', 4, 2);


INSERT INTO Noticias (titulo, descricao_noticia, url_noticia, url_imagem_noticia, data_cadastro, data_expira, ref_jornalista, ref_categoria)
VALUES
('Acidente de trânsito causa congestionamento', 'Acidente envolvendo vários veículos causa congestionamento.', 'https://exemplo.com/noticia5', 'url_imagem_noticia5.jpg', '2024-04-29', '2024-05-29', 5, 3),
('Evento adiado devido ao clima', 'Evento é adiado devido a condições climáticas adversas.', 'https://exemplo.com/noticia6', 'url_imagem_noticia6.jpg', '2024-04-29', '2024-05-29', 1, 3);


INSERT INTO Preferencias (pref_usuario, pref_categoria)
VALUES (1, 1), -- Saúde
       (1, 2); -- Tecnologia


INSERT INTO Preferencias (pref_usuario, pref_categoria)
VALUES (2, 2), -- Tecnologia
       (2, 3); -- Notícias


INSERT INTO Preferencias (pref_usuario, pref_categoria)
VALUES (3, 1), -- Saúde
       (3, 3); -- Notícias


INSERT INTO Preferencias (pref_usuario, pref_categoria)
VALUES (4, 1), -- Saúde
       (4, 2); -- Tecnologia


INSERT INTO Preferencias (pref_usuario, pref_categoria)
VALUES (5, 3); -- Notícias
