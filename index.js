import express from 'express';
import session from 'express-session';
import verificarAutenticacao from './seguranca/autenticar.js';

const app = express();
const porta = 3000;
const host = '0.0.0.0';

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 's3gr3d0',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 15 }
}));

app.post('/login', (req, res) => {
    console.log("Dados recebidos:", req.body); 
    const { usuario, senha } = req.body;

    if (usuario === 'admin' && senha === 'admin') {
        req.session.autenticado = true;
        console.log("Autenticado com sucesso");
        res.redirect('/menu.html');
    } else {
        console.log("Falha na autenticação");
        res.redirect('/login.html?erro=1');
    }
});

app.get('/logar', (req, res) => {
    req.session.destroy();
    res.redirect('/login.html');
});

app.use(express.static('publico'));

app.use(verificarAutenticacao, express.static('privado'));


app.listen(porta, host, () => {
    console.log(`Servidor em execução em http://${host}:${porta}`);
});
