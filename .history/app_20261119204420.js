import express from 'express';
import embalagemRoutes from './routes/embalagemRoutes.js';
import maquinaRoutes from './routes/maquinaRoutes.js';
import operadorRoutes from './routes/operadorRoutes.js';
import conexao from './database/conexao.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use('/embalagem', embalagemRoutes);
app.use('/maquina', maquinaRoutes);
app.use('/operador', operadorRoutes);

app.use((req, res) => {
    res.status(404).json({ mensagem: 'Rota não encontrada.' });
});

app.use((erro, req, res, next) => {
    console.error('Erro ao processar a requisição:', erro);
    if (res.headersSent) {
        return next(erro);
    }

    const status = Number.isInteger(erro.status) && erro.status >= 400 && erro.status < 500
        ? erro.status
        : 500;
    const mensagem = status === 400 ? 'JSON inválido.' : 'Erro ao processar a requisição.';
    return res.status(status).json({ mensagem });
});

async function iniciarServidor() {
    try {
        const conexaoTeste = await conexao.getConnection();
        conexaoTeste.release();

        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (erro) {
        console.error('Erro ao conectar com o banco de dados:', erro);
        process.exit(1);
    }
}

iniciarServidor();
