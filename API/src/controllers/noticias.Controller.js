import { comunicacaoSQLSERVER, sql } from "../database/conexaoBanco.js";
import jwt from 'jsonwebtoken';
const segredo = 'Senh4';

export const criarNoticia = async (req, res) => {
    const { titulo, descricao_noticia, url_noticia, url_imagem_noticia, data_cadastro, data_expira, ref_jornalista, ref_categoria } = req.body;

    if (
        titulo == null ||
        descricao_noticia == null ||
        url_noticia == null ||
        url_imagem_noticia == null ||
        data_cadastro == null ||
        data_expira == null ||
        ref_jornalista == null ||
        ref_categoria == null
    ) {
        return res
            .status(400)
            .json({ message: "Dados ausentes ou inválidos" });
    }

    try {
        const infoConexaoBanco = await comunicacaoSQLSERVER(); // Supondo que `comunicacaoSQLSERVER()` seja a função de comunicação com o SQL Server
        const resultadoSQL = await infoConexaoBanco
            .request()
            .input("titulo", sql.VarChar(45), titulo)
            .input("descricao_noticia", sql.VarChar(200), descricao_noticia)
            .input("url_noticia", sql.VarChar(200), url_noticia)
            .input("url_imagem_noticia", sql.VarChar(200), url_imagem_noticia)
            .input("data_cadastro", sql.DateTime, data_cadastro)
            .input("data_expira", sql.DateTime, data_expira)
            .input("ref_jornalista", sql.Numeric(7), ref_jornalista)
            .input("ref_categoria", sql.Numeric(7), ref_categoria)
            .query(
                "INSERT INTO Noticias (titulo, descricao_noticia, url_noticia, url_imagem_noticia, data_cadastro, data_expira, ref_jornalista, ref_categoria) VALUES (@titulo, @descricao_noticia, @url_noticia, @url_imagem_noticia, @data_cadastro, @data_expira, @ref_jornalista, @ref_categoria); SELECT SCOPE_IDENTITY() as id"
            );

        res.json({
            titulo,
            descricao_noticia,
            url_noticia,
            url_imagem_noticia,
            data_cadastro,
            data_expira,
            ref_jornalista,
            ref_categoria,
            id: resultadoSQL.recordset[0].id,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
export const buscarNoticias = async (req, res) => {
    try {
        const infoConexaoBanco = await comunicacaoSQLSERVER();
        const resultadoSQL = await infoConexaoBanco.request().query("SELECT * FROM Noticias");
        res.json(resultadoSQL.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const buscarNoticiasPorIdUsuario = async (req, res) => {
    try {
        const id_usuario = req.params.id;

        const infoConexaoBanco = await comunicacaoSQLSERVER();

        const resultadoNoticias = await infoConexaoBanco
            .request()
            .input("id_usuario", sql.Numeric(7), id_usuario)
            .query(`
                SELECT Noticias.* 
                FROM Noticias 
                JOIN Preferencias ON Noticias.ref_categoria = Preferencias.pref_categoria
                WHERE Preferencias.pref_usuario = @id_usuario
            `);

        res.json(resultadoNoticias.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const atualizarNoticiaPorId = async (req, res) => {
    const id_noticia = req.params.id;
    const { titulo, descricao_noticia, url_noticia, url_imagem_noticia, data_cadastro, data_expira, ref_jornalista, ref_categoria } = req.body;

    if (
        id_noticia == null ||
        titulo == null ||
        descricao_noticia == null ||
        url_noticia == null ||
        url_imagem_noticia == null ||
        data_cadastro == null ||
        data_expira == null ||
        ref_jornalista == null ||
        ref_categoria == null
    ) {
        return res
            .status(400)
            .json({ message: "Dados ausentes ou inválidos" });
    }

    try {
        const infoConexaoBanco = await comunicacaoSQLSERVER();
        const resultadoSQL = await infoConexaoBanco
            .request()
            .input("id_noticia", sql.Numeric(7), id_noticia)
            .input("titulo", sql.VarChar(45), titulo)
            .input("descricao_noticia", sql.VarChar(200), descricao_noticia)
            .input("url_noticia", sql.VarChar(200), url_noticia)
            .input("url_imagem_noticia", sql.VarChar(200), url_imagem_noticia)
            .input("data_cadastro", sql.DateTime, data_cadastro)
            .input("data_expira", sql.DateTime, data_expira)
            .input("ref_jornalista", sql.Numeric(7), ref_jornalista)
            .input("ref_categoria", sql.Numeric(7), ref_categoria)
            .query(
                "UPDATE Noticias SET titulo = @titulo, descricao_noticia = @descricao_noticia, url_noticia = @url_noticia, url_imagem_noticia = @url_imagem_noticia, data_cadastro = @data_cadastro, data_expira = @data_expira, ref_jornalista = @ref_jornalista, ref_categoria = @ref_categoria WHERE id_noticia = @id_noticia"
            );

        res.json({
            id_noticia,
            titulo,
            descricao_noticia,
            url_noticia,
            url_imagem_noticia,
            data_cadastro,
            data_expira,
            ref_jornalista,
            ref_categoria,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
export const deletarNoticiasPorId = async (req, res) => {
    try {
        const infoConexaoBanco = await comunicacaoSQLSERVER();

        const resultadoSQL = await infoConexaoBanco
            .request()
            .input("id", sql.Numeric(7), req.params.id)
            .query("DELETE FROM Noticias WHERE id_noticia = @id");

        if (resultadoSQL.rowsAffected[0] === 0) return res.sendStatus(404);

        return res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
