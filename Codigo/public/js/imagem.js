function previewFile(id) { //Como parametro você passa o id da imagem de preview
    var preview = document.getElementById(id);
    var file    = document.getElementById(id+"-input").files[0]; //Coloca o id do input type="file" como o id do preview dele + "-input" pra poder reutilizar esse codigo
    var reader = new FileReader(); //Traduz o arquivo pra src
    var blober = new FileReader(); //Traduz o arquivo pra BLOB: Jeito que vai pro bd

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    blober.onloadend = function () {
        preview.name = blober.result; //Na hora de mandar pro banco de dados a imagem em forma de blob vai estar no "name" da imagem de preview
    }

    if (file) {
        if(file.type.match('image.*')){
            reader.readAsDataURL(file);
            blober.readAsBinaryString(file);
        } else {
            window.alert("O arquivo inserido não é uma imagem.");
        }
    } else {
        preview.src = "";
    }
}

function alterarImagemPrincipal() {
    const id_campanha = document.getElementById("nome").getAttribute("name").replace("id_","")
    let id = document.getElementsByClassName("carousel-item")
    if(id.length == 0) {
        window.alert("Você precisa ter uma armazenada para realizar essa ação.")
        return 0
    } else {
        for(let i = 0; i < id.length; i++) {
            if(id[i].classList.contains("active")) {
                id = id[i].id
                break
            }
        }
    }
    fetch("https://encorajarte.onrender.com/alterarImagemPrincipal", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id, id_campanha
        })
    }).then(function (res) {
        res.json().then(function (data) {
            if(data.tipo) {
                window.alert(`${data.tipo} - ${data.mensagem}`)
            }

        });
    })
}

function deletarImagemCampanha() {
    const id_campanha = document.getElementById("nome").getAttribute("name").replace("id_","")
    let id = document.getElementsByClassName("carousel-item")
    if(id.length == 0) {
        window.alert("Você precisa ter uma armazenada para realizar essa ação.")
        return 0
    } else {
        for(let i = 0; i < id.length; i++) {
            if(id[i].classList.contains("active")) {
                id = id[i].id
                break
            }
        }
    }
    fetch("https://encorajarte.onrender.com/deletarImagemCampanha", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id, id_campanha
        })
    }).then(function (res) {
        res.json().then(function (data) {
            if(data.tipo) {
                window.alert(`${data.tipo} - ${data.mensagem}`)
            } else {
                sessionStorage.setItem("campanha_id",id_campanha)
                window.location.reload()
            }

        });
    })
}