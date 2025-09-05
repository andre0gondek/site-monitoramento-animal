//aguarda o carregamento do DOM antes de rodar o script
document.addEventListener("DOMContentLoaded", function () {
  //lógica para identificar o RFID e exibir o animal desejado
  const params = new URLSearchParams(window.location.search);
  const rfid = params.get("rfid");

  //puxa o localStorage e o animal pelo RFID
  const animais = JSON.parse(localStorage.getItem("animais")) || [];
  const animal = animais.find(a => a.rfid === rfid);

  const container = document.getElementById("dadosAnimal");

  //caso o animal não exista, redireciona para a pagina inicial
  if (!animal) {
    alert("Este animal foi excluído ou não existe.");
    window.location.href = "index.html";
    return;
  }

  //gerador de temperatura fictícia para os animais baseado na saude deles
  let temperatura;
  switch (animal.saude.toLowerCase()) {
    case 'doente':
      temperatura = (38.8 + Math.random() * 0.7).toFixed(1);
      break;
    case 'em análise':
      temperatura = (38.3 + Math.random() * 0.5).toFixed(1);
      break;
    case 'em tratamento':
      temperatura = (38.5 + Math.random() * 0.4).toFixed(1);
      break;
    default:
      temperatura = (37.8 + Math.random() * 0.4).toFixed(1);
  }

  //criador da ficha do animal baseado no card que o usuário clicou 
  container.innerHTML = `
    <section class="ficha-card">
      <h2><i class="fas fa-cow icon"></i> ${animal.nome}</h2>
      <ul class="ficha-dados">
        <li><strong>RFID:</strong> ${animal.rfid}</li>
        <li><strong>Raça:</strong> ${animal.raca}</li>
        <li><strong>Idade:</strong> ${animal.idade} anos</li>
        <li><strong>Peso:</strong> ${animal.peso} kg</li>
      </ul>
      <div class="ficha-destaques">
        <div class="temperatura-box">
          <i class="fas fa-temperature-high icon"></i>
          <p><strong>Temperatura:</strong> <span id="temperatura">${temperatura}°C</span></p>
        </div>
        <div class="status-box">
          <i class="fas fa-heartbeat icon"></i>
          <p><strong>Status:</strong> 
            <span class="status-saude ${getClasseSaude(animal.saude)}">${animal.saude}</span>
          </p>
        </div>
      </div>
    </section>
  `;

  //atualizador de temperatura 
  function atualizarTemperatura(saude) {
    setInterval(() => {
      const tempSpan = document.getElementById("temperatura");
      if (!tempSpan) return;

      //gera a temperatura com base na saúde do animal
      let novaTemp;
      switch (saude.toLowerCase()) {
        case 'doente':
          novaTemp = (38.8 + Math.random() * 0.7).toFixed(1);
          break;
        case 'em análise':
          novaTemp = (38.3 + Math.random() * 0.5).toFixed(1);
          break;
        case 'em tratamento':
          novaTemp = (38.5 + Math.random() * 0.4).toFixed(1);
          break;
        default:
          novaTemp = (37.8 + Math.random() * 0.4).toFixed(1);
      }

      //atualiza o texto na página
      tempSpan.textContent = `${novaTemp}°C`;

      //alerta para caso da temperatura estar alta
      const tempValor = parseFloat(novaTemp);
      if (tempValor >= 39) {
        tempSpan.classList.add("temp-alerta");
      } else {
        tempSpan.classList.remove("temp-alerta");
      }

      //consonle log para debug
      console.log("Temperatura atualizada:", novaTemp);
    }, 700);
  }

  //atualização automática da temperatura
  atualizarTemperatura(animal.saude);
});

// Retorna a classe CSS correspondente ao estado de saúde
function getClasseSaude(status) {
  switch (status.toLowerCase()) {
    case 'saudável':
      return 'saudavel';
    case 'em análise':
      return 'analise';
    case 'doente':
      return 'doente';
    case 'em tratamento':
      return 'tratamento';
    default:
      return '';
  }
}
