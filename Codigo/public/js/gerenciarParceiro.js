function criarParceiro() {
    const img = document.getElementById("foto").value
    const nome = document.getElementById("nome").value
    const objetivo = document.getElementById("objetivo").value
    const cnpj = document.getElementById("cnpj").value
    const endereco = document.getElementById("endereco").value
    const telefone = document.getElementById("telefone").value
    const email = document.getElementById("email").value
    const instagram = document.getElementById("instagram").value
    const facebook = document.getElementById("facebook").value
    const site = document.getElementById("site").value
    const nossoTrabalho = document.getElementById("nossoTrabalho").value
    fetch("http://localhost:3000/criarParceiro", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            img, nome, objetivo, cnpj, endereco, telefone, email, instagram, facebook, site, nossoTrabalho
        })
    }).then(function (res) {
        res.json().then(function (data) {
            window.alert(`${data.tipo} - ${data.mensagem}`)
            if (data.s) {
                window.location.assign("homepage.html")
            }

        });
    })
}

function carregarDados(){
    let id=sessionStorage.getItem('id');
    fetch("http://localhost:3000/acharParceiro", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id:id,
        })
    }).then(function (res) {
        res.json().then(function (data) {
            console.log(JSON.stringify(`${data.parceiro.nome}`))

            const nome= document.getElementById("nome")
            nome.innerHTML =`
            <h1 class="nomeParceiro" id="nome">${data.parceiro.nome}</h1>
            
            `
            sessionStorage.setItem('parceiro',JSON.stringify(data.parceiro))
        });
    })

   

}

function alterarMudancas(){
    const parceiro = JSON.parse(sessionStorage.getItem('parceiro'));
    console.log(parceiro)
    let id=parceiro.id

    let img = ""
    if(img ==""){
        //img=parceiro.imagemperfil
    }

    let nome=document.getElementById("nomeAlter").value
    if(nome==""){
        nome=parceiro.nome
    }

    let objetivo = document.getElementById("objetivo").value
    if(objetivo==""){
        objetivo=parceiro.objetivo
    }

    let cnpj = document.getElementById("cnpj").value
    if(cnpj==""){
        cnpj=parceiro.cnpj
    }

    let endereco = document.getElementById("endereco").value
    if(endereco==""){
        endereco=parceiro.endereco
    }

    let telefone = document.getElementById("telefone").value
    if(telefone==""){
        telefone=parceiro.telefone
    }

    let email = document.getElementById("email").value
    if(email==""){
        email=parceiro.email
    }

    let instagram = document.getElementById("instagram").value
    if(instagram==""){
        instagram=parceiro.instagram
    }

    let facebook = document.getElementById("facebook").value
    if(facebook==""){
        facebook=parceiro.facebook
    }

    let site = document.getElementById("site").value
    if(site==""){
        site=parceiro.site
    }

    let trabalho = document.getElementById("trabalho").value
    if(trabalho==""){
        trabalho=parceiro.nossoTrabalho
    }

    fetch("http://localhost:3000/alterarParceiro", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id, nome, img, objetivo, cnpj, endereco, telefone, email, instagram, facebook, site, trabalho
        })
    }).then(function (res) {
        res.json().then(function (data) {
            window.alert(`${data.tipo} - ${data.mensagem}`)
            if (data.s) {
               
            }

        });
    })

}

function alterarInput(){
    var h1 = document.getElementsByTagName('h1')[0];
    var input = document.createElement('input');
    input.type = 'text';
    input.value = '';
    input.id = 'nomeAlter';
    h1.parentNode.replaceChild(input, h1);
}

function deletarParceiro(id){
    
    fetch("http://localhost:3000/DeletarParceiro", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id:Number(id)
        })
    }).then(function (res) {
        res.json().then(function (data) {
            window.location.assign("../public/parceiros.html")
        });
    })

}