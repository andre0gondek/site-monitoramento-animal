function gerarRFID() {
  const prefix = "ID";
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return prefix + random;
}

function gerarRFIDUnico(animais) {
  let rfid;
  do {
    rfid = gerarRFID();
  } while (animais.some(animal => animal.rfid === rfid));
  return rfid;
}

//mostrar foms
function esconderTodosFormularios() {
  document.querySelector(".formCadastro").style.display = "none";
  document.querySelector(".formAtualizar").style.display = "none";
  document.querySelector(".formSaude").style.display = "none";
  document.querySelector(".formExcluir").style.display = "none";
}

function mostrarFormularioCadastro() {
  esconderTodosFormularios();
  document.querySelector(".formCadastro").style.display = "block";
}

function mostrarFormularioAtualizar() {
  esconderTodosFormularios();
  document.querySelector(".formAtualizar").style.display = "block";
}

function mostrarFormularioSaude() {
  esconderTodosFormularios();
  document.querySelector(".formSaude").style.display = "block";
}

function mostrarFormularioExcluir() {
  esconderTodosFormularios();
  document.querySelector(".formExcluir").style.display = "block";
}

//funções crud

//create
function cadastrarAnimal() {
  const animais = JSON.parse(localStorage.getItem("animais")) || [];
  const rfid = gerarRFIDUnico(animais);
  const nome = document.getElementById("nome").value;
  const raca = document.getElementById("raca").value;
  const idade = document.getElementById("idade").value;
  const peso = document.getElementById("peso").value;
  const saude = document.getElementById("saude").value;

  const novoAnimal = { rfid, nome, raca, idade, peso, saude };
  animais.push(novoAnimal);
  localStorage.setItem("animais", JSON.stringify(animais));
  alert(`Animal cadastrado com sucesso! RFID: ${rfid}`);
  document.querySelector(".formCadastro").reset();
}

//update
function atualizarAnimal() {
  const animais = JSON.parse(localStorage.getItem("animais")) || [];
  const rfid = document.getElementById("rfidAtualizar").value;
  const index = animais.findIndex(a => a.rfid === rfid);
  if (index === -1) return alert("Animal não encontrado!");

  animais[index].nome = document.getElementById("nomeAtualizar").value;
  animais[index].raca = document.getElementById("racaAtualizar").value;
  animais[index].idade = document.getElementById("idadeAtualizar").value;
  animais[index].peso = document.getElementById("pesoAtualizar").value;
  animais[index].saude = document.getElementById("saudeAtualizar").value;

  localStorage.setItem("animais", JSON.stringify(animais));
  alert(`Dados do animal ${animais[index].nome} atualizados.`);
  document.querySelector(".formAtualizar").reset();
}

//update saúde
function atualizarSaude() {
  const animais = JSON.parse(localStorage.getItem("animais")) || [];
  const rfid = document.getElementById("rfidSaude").value;
  const novoEstado = document.getElementById("novoSaude").value;
  const index = animais.findIndex(a => a.rfid === rfid);
  if (index === -1) return alert("Animal não encontrado!");

  animais[index].saude = novoEstado;
  localStorage.setItem("animais", JSON.stringify(animais));
  alert(`Saúde do animal ${animais[index].nome} atualizada para "${novoEstado}".`);
  document.querySelector(".formSaude").reset();
}

//delete
function excluirAnimal() {
  const animais = JSON.parse(localStorage.getItem("animais")) || [];
  const rfid = document.getElementById("rfidExcluir").value;
  const index = animais.findIndex(a => a.rfid === rfid);
  if (index === -1) return alert("Animal não encontrado!");

  const nome = animais[index].nome;
  animais.splice(index, 1);
  localStorage.setItem("animais", JSON.stringify(animais));
  alert(`Animal ${nome} com RFID ${rfid} excluído com sucesso.`);
  document.querySelector(".formExcluir").reset();
}
