function carregaDados() {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));

    const info = document.getElementById("sectionDados")
    info.innerHTML += `
    <h2>Seus dados</h2>
    <img src="${usuario.imagemperfil}" alt="Prévia da imagemasd..." id="foto" name="">
    <p>Nome: ${usuario.nome}</p>
    <p>Email: ${usuario.email}</p>`

    fetch("https://encorajarte.onrender.com/dadosDoacao", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: usuario.id })
    }).then(function (res) {
        res.json().then(function (data) {
            const areaCampanhas = document.getElementById("cards")
            if (!data.listaCampanhas.length==0) {
                for (let i = 0; i < data.listaCampanhas.length; i++) {
                    areaCampanhas.innerHTML += `
                    <div class="card">
                        <h1>${data.listaCampanhas[i].nome_campanha}</h1>
                        <p>Valor doado: ${data.listaCampanhas[i].valor} </p>
                        <p>Data: ${data.listaCampanhas[i].data}</p>
                    </div>
                    `
                }
            } 
            if(data.listaCampanhas.length==0) {
                areaCampanhas.innerHTML += `
                <div>
                    <h3>Você não possui nenhuma doação</h1>
                </div>
                `
            }
        });
    })

}

function alterarDados() {
    const usuario = JSON.parse(sessionStorage.getItem('usuario'));
    const id = usuario.id;

    const nome = document.getElementById("nome").value
    const senha = document.getElementById("senha").value

    if (nome === "" || senha === "") {
        return window.alert("Preencha todos o dados")
    }

    fetch("https://encorajarte.onrender.com/alterarDados", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome, senha: senha, id: usuario.id })
    }).then(function (res) {
        res.json().then(function (data) {
            window.alert(`${data.tipo} - ${data.mensagem}`)
        });
    })

    const info = document.getElementById("sectionDados")
    info.innerHTML = `
    <h2>Seus dados</h2>
    <img src="${usuario.imagemperfil}" alt="Prévia da imagemasd..." id="foto" name="">
    <p>Nome: ${nome}</p>
    <p>Email: ${usuario.email}</p>`
}

window.onload = carregaDados();