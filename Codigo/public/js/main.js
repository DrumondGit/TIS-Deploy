function estaLogado(precisaPermissao) {
    var ssUsusario = sessionStorage.getItem("usuario")
    if (!ssUsusario) {
        window.alert("Realize o login para continuar")
        return window.location.assign("../public/homepage.html")
    }
    var usuario = JSON.parse(ssUsusario)
    if (precisaPermissao == 1) {
        if (usuario.temPermissao == 0) {
            window.alert("Acesso negado")
            return window.location.assign("../public/homepage.html")
        }
    }
}