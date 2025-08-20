export default function verificarAutenticacao(req, res, prox) {
    if (req.session?.autenticado) {
        prox();
    } else {
        res.redirect('/login.html');
    }
}
