async function getCampanhas() {
    let dados;
    try {
        const response = await fetch('https://encorajarte.onrender.com/listarCampanha');
        dados = await response.json();
        console.log(dados);
    } catch (error) {
        console.error('Erro:', error);
    }
    return dados;
}

async function onload() {
    try {
        await innerHTMLCampanhas()
        displayAdmin()
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function innerHTMLCampanhas(){

    var cardCampanha = document.querySelector('.cards');
    try {
        let dadosCampanhas = await getCampanhas();

        for(let i=0; i<dadosCampanhas.length; i++){
            cardCampanha.innerHTML += `

        <div class="card_parceiro">

            <div class="foto_parceiro" style="background-image: url('/Codigo/assets/img/cardcampanha3.avif');">

                <div class="botao_doar">
                    <button class="botao" onclick="pegarId(${dadosCampanhas[i].id})">Doar</button>
                    <button class="botao botaoEditar" onclick="irParaCampanha(${dadosCampanhas[i].id})">Editar</button>
                    <button class="botao botaoExcluir" onclick="excluirCampanha(${dadosCampanhas[i].id})">Excluir</button>
                </div>
            </div>

            <div class="info_parceiro">

                <div class="nome">
                    <h2>${dadosCampanhas[i].nome}</h2>
                </div>
                <div class="infos">
                    <div class="info">
                        <p class="objetivo">Objetivo da campanha: ${dadosCampanhas[i].objetivo}</p>
                        <p class="nosso_trabalho">Nosso trabalho: ${dadosCampanhas[i].finalidade}</p>
                    </div>
                    <div class="site">
                        <p class="site_do_parceiro">Nosso site: ${dadosCampanhas[i].site}</p>
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
    window.location.assign("campanha.html")
}

function irParaCampanha(id) {
    sessionStorage.setItem("campanha_id", id)
    window.location.assign("dadosDaCampanha.html")
}

async function displayAdmin(){
    var dados = JSON.parse(sessionStorage.getItem('usuario'))
    var botao = document.querySelector('.botao')
    var editar = document.querySelectorAll('.botaoEditar')
    var excluir = document.querySelectorAll('.botaoExcluir')

    if(dados != null){
        if(dados.temPermissao == 1){
            botao.style.display = 'block'
            editar.forEach(editor => editor.style.display = 'block');
            excluir.forEach(excluidor => excluidor.style.display = 'block');
        } else if(dados.temPermissao == 0) {
            botao.style.display = 'none'
            editar.forEach(editor => editor.style.display = 'none');
            excluir.forEach(excluidor => excluidor.style.display = 'none');
        } 
    }else {
        botao.style.display = 'none'
        editar.forEach(editor => editor.style.display = 'none');
        excluir.forEach(excluidor => excluidor.style.display = 'none');
    }
}