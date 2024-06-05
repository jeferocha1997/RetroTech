import { comunicacaoSQLSERVER, sql } from "../database/conexaoBanco.js";

export const criarCategoria = async (req, res) => {
    const { nome_categoria, descricao_categoria, imagem_categoria } = req.body;

    if (
        nome_categoria == null ||
        descricao_categoria == null ||
        imagem_categoria == null
    ) {
        return res
            .status(400)
            .json({ message: "Dados ausentes ou inválidos" });
    }

    try {
        const infoConexaoBanco = await comunicacaoSQLSERVER();
        const resultadoSQL = await infoConexaoBanco
            .request()
            .input("nome_categoria", sql.VarChar(20), nome_categoria)
            .input("descricao_categoria", sql.VarChar(45), descricao_categoria)
            .input("imagem_categoria", sql.VarChar(200), imagem_categoria)
            .query(
                "INSERT INTO Categorias (nome_categoria, descricao_categoria, imagem_categoria) VALUES (@nome_categoria, @descricao_categoria, @imagem_categoria); SELECT SCOPE_IDENTITY() as id"
            );

        res.json({
            nome_categoria,
            descricao_categoria,
            imagem_categoria,
            id: resultadoSQL.recordset[0].id,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const atualizarPreferencia = async (req, res) => {
    try {
        const id_usuario = req.params.id;
        const { novas_preferencias } = req.body;

        const infoConexaoBanco = await comunicacaoSQLSERVER();

        const excluirPreferenciasUsuario = async (id_usuario) => {
            try {
                await infoConexaoBanco.request()
                    .input("id_usuario", sql.Numeric(7), id_usuario)
                    .query("DELETE FROM Preferencias WHERE pref_usuario = @id_usuario");
            } catch (error) {
                throw new Error(`Erro ao excluir preferências do usuário: ${error.message}`);
            }
        };

        const inserirPreferenciasUsuario = async (id_usuario, novas_preferencias) => {
            try {
                for (const id_categoria of novas_preferencias) {
                    await infoConexaoBanco.request()
                        .input("id_usuario", sql.Numeric(7), id_usuario)
                        .input("id_categoria", sql.Numeric(7), id_categoria)
                        .query("INSERT INTO Preferencias (pref_usuario, pref_categoria) VALUES (@id_usuario, @id_categoria)");
                }
            } catch (error) {
                throw new Error(`Erro ao inserir novas preferências do usuário: ${error.message}`);
            }
        };

        // Exclui as preferências antigas e insere as novas
        await excluirPreferenciasUsuario(id_usuario);
        await inserirPreferenciasUsuario(id_usuario, novas_preferencias);

        res.status(200).send("Preferências atualizadas com sucesso.");
    } catch (error) {
        res.status(500).send(error.message);
    }
};


export const buscarCategoria = async (req, res) => {
    try {
        const id_usuario = req.params.id;

        const infoConexaoBanco = await comunicacaoSQLSERVER();
        const resultadoSQL = await infoConexaoBanco
            .request()
            .input("id", sql.Numeric(7), id_usuario)
            .query("SELECT Categorias.* FROM Preferencias JOIN Categorias ON Preferencias.pref_categoria = Categorias.id_categoria WHERE Preferencias.pref_usuario = @id");

        res.json(resultadoSQL.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const todasCategorias = async (req, res) => {
    try {
        const infoConexaoBanco = await comunicacaoSQLSERVER();

        const resultadoSQL = await infoConexaoBanco
            .request()
            .query("SELECT * FROM Categorias");

        res.json(resultadoSQL.recordset);
        console.log("Resultado da consulta SQL:", resultadoSQL.recordset);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const atualizarCategoria = async (req, res) => {
    const { nome_categoria, descricao_categoria, imagem_categoria } = req.body;

    if (
        nome_categoria == null ||
        descricao_categoria == null ||
        imagem_categoria == null
    ) {
        return res
            .status(400)
            .json({ message: "Dados ausentes ou inválidos" });
    }

    try {
        const infoConexaoBanco = await comunicacaoSQLSERVER();
        const resultadoSQL = await infoConexaoBanco
            .request()
            .input("id", req.params.id)
            .input("nome_categoria", sql.VarChar(20), nome_categoria)
            .input("descricao_categoria", sql.VarChar(45), descricao_categoria)
            .input("imagem_categoria", sql.VarChar(200), imagem_categoria)
            .query(
                "UPDATE Categorias SET nome_categoria = @nome_categoria, descricao_categoria = @descricao_categoria, imagem_categoria = @imagem_categoria WHERE id_categoria = @id"
            );

        if (resultadoSQL.rowsAffected[0] === 0) return res.sendStatus(404);

        res.json({
            nome_categoria,
            descricao_categoria,
            imagem_categoria,
            id: req.params.id,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deletarCategoria = async (req, res) => {
    try {
        const infoConexaoBanco = await comunicacaoSQLSERVER();

        const resultadoSQL = await infoConexaoBanco
            .request()
            .input("id", req.params.id)
            .query("DELETE FROM Categorias WHERE id_categoria = @id");

        if (resultadoSQL.rowsAffected[0] === 0) return res.sendStatus(404);

        return res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

