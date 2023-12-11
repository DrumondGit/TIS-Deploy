
function listarParceiro() {
    const c = document.getElementById("parceiro");
    c.innerHTML = "";
    console.log("asd")
    fetch("https://encorajarte.onrender.com/listarParceiro", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then(function (res) {
        res.json().then(function (data) {
            c.innerHTML += `<option value="parceiro">Parceiro</option>`;
            for (let i = 0; i < data.length; i++) {
                c.innerHTML += '<option value="' + data[i].id + '">' + data[i].nome + '</option>';
            }
        })
    })
}


function criarCampanha() {

    const nome = document.getElementById("nome_campanha").value
    const objetivo = document.getElementById("objetivo").value
    const finalidade = document.getElementById("finalidade").value
    const site_campanha = document.getElementById("site_campanha").value
    const meta = document.getElementById("meta").value
    const parceiro = document.getElementById("parceiro").value
    const img = document.getElementById("imagem").value
    fetch("https://encorajarte.onrender.com/criarCampanha", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome, objetivo, finalidade, site_campanha, meta, parceiro, img
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

function alterarCampanha() {
    const id = document.getElementById("nome").getAttribute("name").replace("id_", "")
    const nome = document.getElementById("nome").innerText
    const objetivo = document.getElementById("objetivo").value
    const finalidade = document.getElementById("finalidade").value
    const site = document.getElementById("site").value
    const meta = document.getElementById("meta").value
    fetch("https://encorajarte.onrender.com/alterarCampanha", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id, nome, objetivo, finalidade, site, meta
        })
    }).then(function (res) {
        res.json().then(function (data) {
            window.alert(`${data.tipo} - ${data.mensagem}`)
            if (data.s) {
                window.location.reload()
            }

        });
    })
}

async function viewCampanha() {
    const id = sessionStorage.getItem("campanha_id")
    const res = await fetch("https://encorajarte.onrender.com/viewCampanha", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id
        })
    })

    const data = await res.json()

    if (await data.tipo) {
        window.alert(`${data.tipo} - ${data.mensagem}`)
        window.location.assign("campanhas.html")
    } else {
        document.getElementById("nome").innerHTML = data.nome + '<i class="bi bi-pencil-square ml-1" contenteditable="false" aria-readonly="true"></i>'
        document.getElementById("objetivo").value = data.objetivo
        document.getElementById("finalidade").value = data.finalidade
        document.getElementById("site").value = data.site
        document.getElementById("meta").value = data.meta

        imagensDaCampanha(id)
        sessionStorage.removeItem("campanha_id")
    }
}

function excluirCampanha(id) {
    fetch("https://encorajarte.onrender.com/excluirCampanha", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id
        })
    }).then(function (res) {
        res.json().then(function (data) {
            if (data.s) {
                window.location.reload()
            } else {
                window.alert(`${data.tipo} - ${data.mensagem}`)
            }

        });
    })
}

async function imagensDaCampanha(id) {
    const res = await fetch("https://encorajarte.onrender.com/viewImagensCampanha", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id
        })
    })

    const data = await res.json()

    if (!await data.imagens) {
        window.alert(`${data.tipo} - ${data.mensagem}`)
        window.location.assign("homepage.html")
    } else {
        for (let i = 0; i < data.imagens.length; i++) {
            document.getElementsByClassName("carousel-indicators")[0].innerHTML += (`<li class="indicador" data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`)
            let imagem = data.imagens[i].imagem
            if (imagem == '') {
                imagem = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCPR7FIkoelsiKYUFNcqCJEXCYlh52YzwjPhDsBW1Plw&s'
            }
            document.getElementsByClassName("carousel-inner")[0].innerHTML += (`<div id="${data.imagens[i].id}" class="carousel-item">
            <img class="d-block w-100" src="${imagem}"
                alt="Imagem ${i + 1} da campanha">
        </div>`)
            document.getElementsByClassName("selecao")[0].innerHTML += (`<button class="btn btn-outline-dark" type="button" data-target="#carouselExampleIndicators" data-slide-to="${i}">Imagem ${i + 1}</button>`)
        }

        document.getElementsByClassName("selecao")[0].innerHTML += (`<button class="btn btn-outline-info mb-2" type="button" onclick="inputImagem()">+ Adicionar imagem</button>
        <div id="containNovaImagem" class="row m-0">
        <input type="text" class="form-control col-10 m-0" id="novaImagem" placeholder="url da imagem">
        <button class="btn btn-outline-info col-2 m-0" type="button" onclick="addImagem(${id})">+</button>
        </div>`)

        if (document.getElementsByClassName("indicador").length != 0) {
            document.getElementsByClassName("indicador")[0].classList.add("active")
            document.getElementsByClassName("carousel-item")[0].classList.add("active")
        }
    }
}

function inputImagem() {
    document.getElementById("containNovaImagem").style.display = 'flex'
}

function addImagem(id) {
    const img = document.getElementById("novaImagem").value
    if (img != "") {
        fetch("https://encorajarte.onrender.com/addImagem", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id, img
            })
        }).then(function (res) {
            res.json().then(function (data) {
                if (data.s) {
                    sessionStorage.setItem("campanha_id", id)
                    window.location.reload()
                }
            });
        })
    }
}

function pesquisarCampanha() {
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

function fazerPix() {

    fetch("https://encorajarte.onrender.com/fazerPix", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chave: 14033603670,
            valor: 1.00
        })
    }).then(function (res) {
        res.json().then(function (data) {
            // Defina a imagem do QR Code como o src de um elemento de imagem
            document.getElementById("fazerPix").src = data.qrCodeImage;
        });
    })

}

function puxarCampanha() {
    const id = Number(sessionStorage.getItem("id"))
linksPagamento(id)
    fetch("https://encorajarte.onrender.com/ReadCampanha", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id
        })
    }).then(function (res) {
        res.json().then(function (data) {

            if (data.dados) {
                console.log(`${data.dados[0].objetivo}`)
            } else {
                window.alert(`${data.tipo} - ${data.mensagem}`)
            }
            console.log(data.dados)
            console.log(data.dados[0].objetivo)

            // document.getElementById("id_imagens").innerHTML += (`<img src="https://s2-techtudo.glbimg.com/SSAPhiaAy_zLTOu3Tr3ZKu2H5vg=/0x0:1024x609/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/c/u/15eppqSmeTdHkoAKM0Uw/dall-e-2.jpg" alt="Prévia da imagemasd..." id="foto" name="">`)


            const imagens = document.getElementById("id_imagens");

            // imagens.innerHTML += (`

            // <div class="carousel-item">
            //             <img class="d-block w-100" src=" https://s2-techtudo.glbimg.com/SSAPhiaAy_zLTOu3Tr3ZKu2H5vg=/0x0:1024x609/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/c/u/15eppqSmeTdHkoAKM0Uw/dall-e-2.jpg" alt="Second slide">
            //         </div>


            // `) 

            console.log(data.dados[0].valores_imagem)
            if(data.dados[0].valores_imagem==null){
                imagens.innerHTML += (`
                <div class="carousel-item active">
                <img src="https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif" alt="Prévia da imagem..." id="foto${0}" name="">
                </div>
                `)
            }else{
                imagens.innerHTML += (`
                <div class="carousel-item active">
                <img src="${data.dados[0].valores_imagem}" alt="Prévia da imagem..." id="foto${0}" name="">
                </div>
                `)

            if (data.dados.length > 1) {
                for (let i = 1; i < data.dados.length; i++) {
                    imagens.innerHTML += (`
                <div class="carousel-item">
                <img src="${data.dados[i].valores_imagem}" alt="Prévia da imagemas..." id="foto${i}" name="">
                </div>
                `)
                }
            } }





            document.getElementById("titulo_campanha").innerHTML += (`${data.dados[0].campanha_nome}`)
            document.getElementById("objetivo_campanha").innerHTML += (`${data.dados[0].objetivo}`)
            document.getElementById("nosso_trabalho_campanha").innerHTML += (`${data.dados[0].finalidade}`)
            document.getElementById("fundos_campanha").innerHTML += (`${data.dados[0].objetivo}`)
            document.getElementById("objetivo_parceiro").innerHTML += (`${data.dados[0].objetivo_parceiro}`)
            document.getElementById("sobre_nos_parceiro").innerHTML += (`${data.dados[0].objetivo}`)
            document.getElementById("site_parceiro").innerHTML += (`${data.dados[0].site}`)
            document.getElementById("titulo_parceiro").innerHTML += (`${data.dados[0].parceiro_nome}`)



        });
    })

    fetch("https://encorajarte.onrender.com/ReadComentario", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id
        })
    }).then(function (res) {
        res.json().then(function (data) {
            const campo=document.getElementById("comentarios")
            if (data.dados) {
                campo.innerHTML =''
                for(let i = 0; i<data.dados.length; i++) {
                    campo.innerHTML += (`
                <div class="caixa_comentario">
                    <p class="nome_usuario"><b>${data.dados[i].nome_usuario}</b></p>
                    <div class="img_cmt">
                        <img class="img_perfil" src="${data.dados[i].imagem}">
                        <p class="comentario">${data.dados[i].texto}</p>
                    </div>
                </div>

                    `)
                }
                campo.innerHTML += `                <div id="comentar">
                <textarea type="text" id="comentario"></textarea>
                <button onclick="comentar()">Enviar</button>
            </div>
                `
            } else {
                campo.innerHTML +=`
                <div id="">
                <h2>Seja o primeiro a comentar!</h2>
                
            </div>
                <div id="comentar">
                <textarea type="text" id="comentario"></textarea>
                <button onclick="comentar()">Enviar</button>
            </div>
                `
            }

        });
    })

}

function comentar() {
    const id = Number(sessionStorage.getItem("id"))
    const user = JSON.parse(sessionStorage.getItem('usuario'));
    const comentario=document.getElementById("comentario").value


    if (comentario == '') {
        window.alert("Comentario invalido")
        window.reload;
    } else {
        fetch("https://encorajarte.onrender.com/AddComentario", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                comentario, userId: user.id, id
            })
        }).then(function (res) {
            res.json().then(function (data) {
                window.alert(`${data.tipo} - ${data.mensagem}`)
            });
        })
    }
}

async function linksPagamento(id) {
    const res = await fetch("https://encorajarte.onrender.com/viewCampanha", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id
        })
    })

    const data = await res.json()

    if(data.link10 == null) {
        document.getElementById("link10reais").setAttribute("onclick", "semLinkPagamento()")
        document.getElementById("link10reais").setAttribute("href", "#")
        document.getElementById("link10reais").setAttribute("target", "_self")
    } else {
        document.getElementById("link10reais").setAttribute("href", data.link10)
        document.getElementById("link10reais").setAttribute("target", "_blank")
    }

    if(data.link20 == null) {
        document.getElementById("link20reais").setAttribute("onclick", "semLinkPagamento()")
        document.getElementById("link20reais").setAttribute("href", "#")
        document.getElementById("link20reais").setAttribute("target", "_self")
    } else {
        document.getElementById("link20reais").setAttribute("href", data.link20)
        document.getElementById("link20reais").setAttribute("target", "_blank")
    }

    if(data.link50 == null) {
        document.getElementById("link50reais").setAttribute("onclick", "semLinkPagamento()")
        document.getElementById("link50reais").setAttribute("href", "#")
        document.getElementById("link50reais").setAttribute("target", "_self")
    } else {
        document.getElementById("link50reais").setAttribute("href", data.link50)
        document.getElementById("link50reais").setAttribute("target", "_blank")
    }
}

function semLinkPagamento() {
    window.alert("Essa campanha ainda não tem um link de pagamento definido.\nDê uma olhada nos outros parceiros do nosso site!!")
}