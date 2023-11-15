function criarPagamento() {
    let email =  document.getElementById("form-checkout__email").value
    let valor =  document.getElementById("transactionAmount").value
    fetch("https://encorajarte.onrender.com/criarPagamento", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            valor
        })
    }).then(function (res) {
        res.json().then(function (data) {
            document.getElementById("pixCopiaCola").value = data
            console.log(data)
        });
    })
}