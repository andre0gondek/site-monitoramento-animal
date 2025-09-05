document.getElementById("excluirBtn").addEventListener("click", function () {
  const nomeDigitado = document.getElementById("confirmNome").value.trim();
  const nomeReal = localStorage.getItem("nomeFazenda")?.trim() || "";

  if (nomeDigitado.toLowerCase() === nomeReal.toLowerCase() && nomeReal !== "") {
    const confirmar = confirm("Tem certeza que deseja excluir a fazenda e todos os dados?");
    if (confirmar) {
      // Limpa os dados da fazenda
      localStorage.removeItem("nomeFazenda");
      localStorage.removeItem("localizacao");
      localStorage.removeItem("cultivo");

      // Limpa os dados dos animais
      localStorage.removeItem("animais"); // ou qualquer chave que você esteja usando

      // Limpa preferências e notificações, se quiser
      localStorage.removeItem("fuso");
      localStorage.removeItem("idioma");
      localStorage.removeItem("clima");
      localStorage.removeItem("pragas");

      alert("Fazenda e todos os dados foram excluídos com sucesso!");

      // Redireciona para a página inicial
      window.location.href = "index.html";
    }
  } else {
    alert("Nome da fazenda não confere. Verifique e tente novamente.");
  }
});


// Dados simulados da fazenda
let fazenda = {
  nome: localStorage.getItem("nomeFazenda") || "Sítio Bela Vista",
  localizacao: localStorage.getItem("localizacao") || "São Paulo - SP",
  cultivo: localStorage.getItem("cultivo") || "Leite e pastagem"
};

// Exibe os dados na interface
function exibirDados() {
  document.getElementById("nomeFazendaTexto").textContent = fazenda.nome;
  document.getElementById("localizacaoTexto").textContent = fazenda.localizacao;
  document.getElementById("cultivoTexto").textContent = fazenda.cultivo;

  document.getElementById("nomeFazendaInput").value = fazenda.nome;
  document.getElementById("localizacaoInput").value = fazenda.localizacao;
  document.getElementById("cultivoInput").value = fazenda.cultivo;
}

exibirDados();

let editando = false;

document.getElementById("editarBtn").addEventListener("click", function () {
  editando = !editando;

  const modo = editando ? "none" : "inline";
  const modoInput = editando ? "inline-block" : "none";

  document.getElementById("nomeFazendaTexto").style.display = modo;
  document.getElementById("localizacaoTexto").style.display = modo;
  document.getElementById("cultivoTexto").style.display = modo;

  document.getElementById("nomeFazendaInput").style.display = modoInput;
  document.getElementById("localizacaoInput").style.display = modoInput;
  document.getElementById("cultivoInput").style.display = modoInput;

  this.textContent = editando ? "💾 Salvar Informações" : "✏️ Editar Informações";

  if (!editando) {
    // Salva os dados atualizados
    fazenda.nome = document.getElementById("nomeFazendaInput").value;
    fazenda.localizacao = document.getElementById("localizacaoInput").value;
    fazenda.cultivo = document.getElementById("cultivoInput").value;

    localStorage.setItem("nomeFazenda", fazenda.nome);
    localStorage.setItem("localizacao", fazenda.localizacao);
    localStorage.setItem("cultivo", fazenda.cultivo);

    exibirDados();
  }
});
