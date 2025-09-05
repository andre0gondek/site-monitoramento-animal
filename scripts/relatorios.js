let relatorios = JSON.parse(localStorage.getItem("relatorios")) || [];

function salvarRelatorio(e){
    e.preventDefault();
    const novo = {
        nome: document.getElementById("nome").value,
    data: document.getElementById("data").value,
    estado: document.getElementById("estado").value,
    medicacao: document.getElementById("medicacao").value,
    observacoes: document.getElementById("observacoes").value
    };
    relatorios.push(novo);
    localStorage.setItem("relatorios", JSON.stringify(relatorios));
    document.getElementById("formulario").reset();
    document.getElementById("formulario").style.display = "none";
    exibirRelatorios();
}

function exibirRelatorios(lista = relatorios){
    const container = document.getElementById("relatorios");
    container.innerHTML = "";

    lista.forEach((r,i) => {
        const card = document.createElement("div");
        card.className = "card";
        
     //criação dos cards de relatório
     card.innerHTML= `
      <div class="linha"><i class="fa-solid fa-cow"></i> <strong>Nome:</strong> <span>${r.nome}</span></div>
  <div class="linha"><i class="fa-solid fa-calendar-days"></i> <strong>Data:</strong> <span>${r.data}</span></div>
  <div class="linha"><i class="fa-solid fa-heart-pulse"></i> <strong>Estado:</strong> <span>${r.estado}</span></div>
  <div class="linha"><i class="fa-solid fa-pills"></i> <strong>Medicação:</strong> <span>${r.medicacao}</span></div>
  <div class="linha"><i class="fa-solid fa-pencil"></i> <strong>Observações:</strong> <span>${r.observacoes}</span></div>
  <button onclick="excluirRelatorio(${i})"><i class="fa-solid fa-trash"></i> Excluir</button>
     `;
     container.appendChild(card);
});
}

function excluirRelatorio(index){
    relatorios.splice(index, 1);
    localStorage.setItem("relatorios", JSON.stringify(relatorios));
    exibirRelatorios();
}

function mostrarForm(){
    document.getElementById("formulario").style.display = "block";
}

function filtrarRelatorios(){
    const nome = document.getElementById("filtroNome").value.toLowerCase();
    const data = document.getElementById("filtroData").value.toLowerCase();
    const filtrados = relatorios.filter(r =>
        (!nome || r.nome.toLowerCase().includes(nome)) &&
        (!data || r.data === data)
    );
    exibirRelatorios(filtrados);
}

document.getElementById("formulario").addEventListener("submit", salvarRelatorio);
exibirRelatorios();