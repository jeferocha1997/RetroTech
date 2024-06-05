import { comunicacaoSQLSERVER, sql } from "../database/conexaoBanco.js";
import jwt from 'jsonwebtoken';

const segredoToken = 'Senh4';

export const criarUsuario = async (req, res) => {
    const {
        nome_completo,
        nome_acesso,
        senha_acesso,
        nivel_usuario,
        nascimento,
        telefone
    } = req.body;

    if (
        !nome_completo ||
        !nome_acesso ||
        !senha_acesso ||
        !nivel_usuario ||
        !nascimento ||
        !telefone
    ) {
        return res.status(400).json({ message: "Erro na requisição: Dados ausentes ou inválidos" });
    }

    try {
        const infoConexaoBanco = await comunicacaoSQLSERVER();
        const resultadoSQL = await infoConexaoBanco
            .request()
            .input("nome_completo", sql.VarChar, nome_completo)
            .input("nome_acesso", sql.VarChar, nome_acesso)
            .input("senha_acesso", sql.VarChar, senha_acesso)
            .input("nivel_usuario", sql.Int, nivel_usuario)
            .input("nascimento", sql.DateTime, nascimento)
            .input("telefone", sql.VarChar, telefone)
            .query(
                "INSERT INTO Usuarios (nome_completo, nome_acesso, senha_acesso, nivel_usuario, nascimento, telefone) VALUES (@nome_completo, @nome_acesso, @senha_acesso, @nivel_usuario, @nascimento, @telefone); SELECT SCOPE_IDENTITY() as id"
            );

        const infoIdUsuario = resultadoSQL.recordset[0].id;
        const infoIdCategorias = await infoConexaoBanco.request().query("SELECT id_categoria FROM Categorias");

        for (let i = 0; i < infoIdCategorias.recordset.length; i++) {
            await infoConexaoBanco
                .request()
                .input("id_usuario", sql.Int, infoIdUsuario)
                .input("id_categoria", sql.Int, infoIdCategorias.recordset[i].id_categoria)
                .query(
                    "INSERT INTO Preferencias (pref_usuario, pref_categoria) VALUES (@id_usuario, @id_categoria)"
                );
        }

        res.json({
            id: infoIdUsuario
        });
    } catch (error) {
        res.status(500).json({ message: "Erro na requisição: Falha com o Banco de dados ou Servidor" });
    }
};

export const buscarUsuario = async (req, res) => {
    const {
        nome_acesso,
        senha_acesso
    } = req.body;

    try {
        const infoConexaoBanco = await comunicacaoSQLSERVER();
        const resultadoSQL = await infoConexaoBanco.request()
            .input("nome_acesso", sql.VarChar, nome_acesso)
            .input("senha_acesso", sql.VarChar, senha_acesso)
            .query("SELECT * FROM Usuarios WHERE nome_acesso = @nome_acesso AND senha_acesso = @senha_acesso");

        if (resultadoSQL.recordset.length > 0) {

            const infoIdUsuario = resultadoSQL.recordset[0].id;
            const token = jwt.sign({
                id: infoIdUsuario,
                nivel_usuario: resultadoSQL.recordset[0].nivel_usuario // Corrigi para pegar o nível de usuário do resultado do SQL
            }, segredoToken, { expiresIn: '1h' });

            return res.json({ auth: true, token });
        } else {
            return res.status(401).json({ auth: false, message: "Nome de usuário ou senha inválidos" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro na requisição: Falha com o Banco de dados ou Servidor" });
    }
};

export const atualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const {
        nome_completo,
        nome_acesso,
        senha_acesso,
        nivel_usuario,
        nascimento,
        telefone
    } = req.body;

    if (
        !nome_completo ||
        !nome_acesso ||
        !senha_acesso ||
        !nivel_usuario ||
        !nascimento ||
        !telefone
    ) {
        return res.status(400).json({ message: "Erro na requisição: Dados ausentes ou inválidos" });
    }

    try {
        const infoConexaoBanco = await comunicacaoSQLSERVER();
        const resultadoSQL = await infoConexaoBanco
            .request()
            .input("id_usuario", sql.Int, id)
            .input("nome_completo", sql.VarChar, nome_completo)
            .input("nome_acesso", sql.VarChar, nome_acesso)
            .input("senha_acesso", sql.VarChar, senha_acesso)
            .input("nivel_usuario", sql.Int, nivel_usuario)
            .input("nascimento", sql.DateTime, nascimento)
            .input("telefone", sql.VarChar, telefone)
            .query(
                "UPDATE Usuarios SET nome_completo = @nome_completo, nome_acesso = @nome_acesso, senha_acesso = @senha_acesso, nivel_usuario = @nivel_usuario, nascimento = @nascimento, telefone = @telefone WHERE id_usuario = @id_usuario"
            );

        if (resultadoSQL.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Nenhuma alteração foi realizada" });
        }

        res.json({
            nome_completo,
            nome_acesso,
            senha_acesso,
            nivel_usuario,
            nascimento,
            telefone,
            id_usuario: id // Corrigi para pegar o ID da requisição
        });
    } catch (error) {
        res.status(500).json({ message: "Erro na requisição: Falha com o Banco de dados ou Servidor" });
    }
};

export const deletarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const infoConexaoBanco = await comunicacaoSQLSERVER();

        const resultadoSQL = await infoConexaoBanco
            .request()
            .input("id_usuario", sql.Int, id)
            .query("DELETE FROM Usuarios WHERE id_usuario = @id_usuario");

        if (resultadoSQL.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Falha ao deletar usuário" });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Erro na requisição: Falha com o Banco de dados ou Servidor" });
    }
};
