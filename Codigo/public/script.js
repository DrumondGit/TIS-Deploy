// const itemForm = document.getElementById('itemForm');
// const itemName = document.getElementById('itemName');
// const itemTable = document.getElementById('itemTable').querySelector('tbody');

// itemForm.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   const name = itemName.value;
//   const response = await fetch('https://primeiro-projeto.onrender.com/items', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ name })
//   });

//   if (response.ok) {
//     itemName.value = '';
//     fetchItems();
//   }
// });

// async function fetchItems() {
//   const response = await fetch('https://primeiro-projeto.onrender.com/items');
//   const items = await response.json();

//   itemTable.innerHTML = '';

//   items.forEach(item => {
//     const row = document.createElement('tr');
//     row.innerHTML = `
//       <td>${item.id}</td>
//       <td>${item.name}</td>
//     `;
//     itemTable.appendChild(row);
//   });
// }

// fetchItems();


function login() {
  const usu_email = document.getElementById("email").value
  const usu_senha = document.getElementById("password").value

  if (usu_email === "" || usu_senha === "") {
      return window.alert("Preencha todos o dados")
  }

  fetch("https://encorajarte.onrender.com/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: usu_email, senha: usu_senha
       })
  }).then(function (res) {
      res.json().then(function (data) {
          window.alert(`${data.tipo} - ${data.mensagem}`)
          if (data.usuario) {
              sessionStorage.setItem('usuario', JSON.stringify(data.usuario))
              window.location.assign("homepage.html")
          }

      });
  })
}

async function cadastrar(event) {
  event.preventDefault()
  var user;

  const nome = document.getElementById("username").value
  const senha = document.getElementById("password").value
  const email = document.getElementById("email").value
  

  if ((nome.trim() === "") || (email.trim() === "") || (senha.trim() === "")) {
      window.alert("Tenha certeza de preencher todos os campos")
  } else {

      const url = `https://encorajarte.onrender.com/cadastro`

      var resp = await fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              nome: nome,
              senha: senha,
              email: email
          }),
      })

      
      var data = await resp.json()
      sessionStorage.setItem('usuario', JSON.stringify(data.usuario))
      window.location.assign("index.html")

      console.log(nome)
      console.log(email)
      console.log(senha)

  }
}

function levarPraHome() {
    window.location.assign("html/homepage.html")
}