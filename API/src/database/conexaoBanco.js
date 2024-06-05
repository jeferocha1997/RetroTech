import sql from 'mssql';

const dbConfig = {
    user: 'sa',
        password: '**Senh4**',
    server: 'localhost',
    database: 'DBA',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

export const comunicacaoSQLSERVER = async () => {
    try {
        const infoConexaoBanco = await sql.connect(dbConfig);
        return infoConexaoBanco;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error;
    }
};

export { sql };
