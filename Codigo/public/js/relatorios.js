function listarParceiros() {
    fetch("https://encorajarte.onrender.com/listarParceiro", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(function (res) {
        res.json().then(function (data) {
            if(data) {
                for(let i = 0; i < data.length; i++) {
                    let img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCPR7FIkoelsiKYUFNcqCJEXCYlh52YzwjPhDsBW1Plw&s'
                    if(data[i].imagemperfil != '') {
                        img = data[i].imagemperfil
                    }
                    document.getElementById("listaParceiros"). innerHTML += (`<div class="row w-100 align-items-center parceiro" onclick="visualizarGrafico(${data[i].id})">
                    <img src="${img}" alt="Imagem do parceiro">
                    <h4>${data[i].nome}</h4>
                </div>`)
                }
            }
        });
    })
}

function visualizarGrafico(id) {
    document.getElementById("containGrafico").innerHTML = (`
    <canvas id="grafico"></canvas>`)
    fetch("https://encorajarte.onrender.com/dadosRelatorio", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id
        })
    }).then(function (res) {
        res.json().then(function (data) {
            if(data) {
                const xValues = data.x;
                const yValues = data.y;
                const barColors = data.cores;

                new Chart("grafico", {
                type: "bar",
                data: {
                    labels: xValues,
                    datasets: [{
                        backgroundColor: barColors,
                        data: yValues
                    }]
                },
                options: {
                    legend: {display: false},
                    title: {
                        display: true,
                        text: "Doações"
                    }
                }
                });
            }
        });
    })
    
}

function pesquisar() {
    let input = document.getElementById('pesquisa').value
    input=input.toLowerCase();
    let parceiro = document.getElementsByClassName('parceiro');
      
    for (i = 0; i < parceiro.length; i++) { 
        if (!parceiro[i].textContent.toLowerCase().includes(input)) {
            parceiro[i].style.display="none";
        }
        else {
            parceiro[i].style.display="flex";
        }
    }
}