async function getParceiros() {
    let dados;
    try {
        const response = await fetch('https://encorajarte.onrender.com/listarParceiro');
        dados = await response.json();
        console.log(dados);
    } catch (error) {
        console.error('Erro:', error);
    }
    return dados;
}

async function onload() {
    try {
        innerHTMLParceiros()
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function innerHTMLParceiros(){

    var cardParceiro = document.querySelector('.cards');
    try {
        let dadosParceiros = await getParceiros();

        for(let i=0; i<dadosParceiros.length; i++){
            cardParceiro.innerHTML += `

            <div class="card_parceiro" ">

                <div class="foto_parceiro" style="background-image: url('${dadosParceiros[i].imagemperfil}');">

                    <div class="botao_doar">
                        <button class="botao">Campanhas</button>
                        <button class="botao" onclick="pegarId(${dadosParceiros[i].id})">Editar</button>
                        <button class="botao" onclick="deletarParceiro(${dadosParceiros[i].id})">Excluir</button>
                    </div>
                </div>

                <div class="info_parceiro">

                    <div class="nome">
                        <h2>${dadosParceiros[i].nome}</h2>
                    </div>
                    <div class="infos">
                        <div class="info">
                            <p class="objetivo">Objetivo:${dadosParceiros[i].objetivo}</p>
                            <p class="nosso_trabalho">Nosso trabalho: ${dadosParceiros[i].nossoTrabalho}</p>
                        </div>
                        <div class="site">
                            <p class="site_do_parceiro">Nosso site: ${dadosParceiros[i].site}</p>
                        </div>
                    </div>
                </div>
            </div>
        `
        }

        

    } catch (error) {
        console.error('Erro:', error);
    }
}

function pegarId(id){
    sessionStorage.setItem('id',id)
    window.location.assign("partnerPage.html")
}