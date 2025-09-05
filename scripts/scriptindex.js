document.getElementById("formFazenda").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nomeFazenda").value.trim();

  if (nome.length < 3) {
    alert("Digite um nome válido para a fazenda.");
    return;
  }

  // Salva o nome da fazenda no localStorage
  localStorage.setItem("nomeFazenda", nome);

  // Redireciona para o dashboard
  window.location.href = "dashboard.html";
});
