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
    fetch("https://encorajarte.onrender.com/criarParceiro", {
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
    fetch("https://encorajarte.onrender.com/acharParceiro", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id:id,
        })
    }).then(function (res) {
        res.json().then(function (data) {
            console.log(JSON.stringify(`${data.parceiro.objetivo}`))
            document.getElementById("nome").innerHTML = data.parceiro.nome + '<i class="bi bi-pencil-square ml-1" contenteditable="false" aria-readonly="true"></i>'
            document.getElementById("objetivo").value = data.parceiro.objetivo
            document.getElementById("trabalho").value = data.parceiro.nossoTrabalho
            document.getElementById("site").value = data.parceiro.site
            document.getElementById("instagram").value = data.parceiro.instagram
            document.getElementById("facebook").value = data.parceiro.facebook
            document.getElementById("cnpj").value = data.parceiro.cnpj
            document.getElementById("endereco").value = data.parceiro.endereco
            document.getElementById("telefone").value = data.parceiro.telefone
            document.getElementById("email").value = data.parceiro.email
            document.getElementById("imgPreview").innerHTML += (`<img src="${data.parceiro.imagemperfil}" alt="Prévia da imagemasd..." id="foto" name="">`)



            sessionStorage.setItem('parceiro',JSON.stringify(data.parceiro))
        });
    })

   

}

function previewFile(){
    let img = document.getElementById("urlImg").value
    console.log(img)
    document.getElementById("imgPreview").innerHTML = (`<img src="${img}" alt="Prévia da imagem..." id="foto" name="">`)
}

function alterarMudancas(){
    const parceiro = JSON.parse(sessionStorage.getItem('parceiro'));
    console.log(parceiro)
    let id=parceiro.id

    let img = document.getElementById("urlImg").value
    if(img ==""){
        img=parceiro.imagemperfil
    }

    const nome = document.getElementById("nome").innerText
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

    fetch("https://encorajarte.onrender.com/alterarParceiro", {
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
    
    fetch("https://encorajarte.onrender.com/DeletarParceiro", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id:Number(id)
        })
    }).then(function (res) {
        res.json().then(function (data) {
            window.location.assign("../html/parceiros.html")
        });
    })

}


function pesquisarParceiro() {
    const pesquisa = document.getElementById("pesquisa").value


    let elementos = document.querySelectorAll('.card_parceiro');
    for (let i = 0; i < elementos.length; i++) {
        if (!elementos[i].textContent.toLowerCase().includes(pesquisa.toLowerCase())) {
            elementos[i].classList.add('oculto');
        } else {
            elementos[i].classList.remove('oculto');
        }
    }

}