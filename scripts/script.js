document.addEventListener("DOMContentLoaded", function () {
  const animais = JSON.parse(localStorage.getItem("animais")) || [];

  const nomeFazenda = localStorage.getItem("nomeFazenda") || "Sítio Bela Vista";
  document.getElementById("tituloFazenda").textContent = nomeFazenda;

  // Atualiza os indicadores
  document.getElementById("total").textContent = `Total de animais cadastrados: ${animais.length}`;
  document.getElementById("saudaveis").textContent = `Animais Saudáveis: ${animais.filter(a => a.saude === "Saudável").length}`;
  document.getElementById("analise").textContent = `Animais em análise: ${animais.filter(a => a.saude === "Em análise").length}`;
  document.getElementById("doentes").textContent = `Animais Doentes: ${animais.filter(a => a.saude === "Doente").length}`;

  // Exibe os cards dos animais
  const container = document.getElementById("cardsAnimais");

  if (animais.length === 0) {
    container.innerHTML += `<p>Nenhum animal cadastrado ainda.</p>`;
    return;
  }

  animais.forEach(animal => {
    const card = document.createElement("a");
    card.classList.add("cardAnimal");
    card.href = `animal.html?rfid=${animal.rfid}`;

    // Gera temperatura simulada com base na saúde
    let temperatura;
    switch (animal.saude.toLowerCase()) {
      case 'doente':
        temperatura = (38.8 + Math.random() * 0.7).toFixed(1); // 38.8°C a 39.5°C
        break;
      case 'em análise':
        temperatura = (38.3 + Math.random() * 0.5).toFixed(1); // 38.3°C a 38.8°C
        break;
      case 'em tratamento':
        temperatura = (38.5 + Math.random() * 0.4).toFixed(1); // 38.5°C a 38.9°C
        break;
      default:
        temperatura = (37.8 + Math.random() * 0.4).toFixed(1); // 37.8°C a 38.2°C
    }

    // Atualiza o objeto animal com a nova temperatura (opcional)
    animal.temperatura = temperatura;

    // Criação do card
    card.innerHTML = `
      <h3>Nome: ${animal.nome}</h3>
      <p><strong>RFID:</strong> ${animal.rfid}</p>
      <p><strong>Raça:</strong> ${animal.raca}</p>
      <p><strong>Idade:</strong> ${animal.idade} anos</p>
      <p><strong>Peso:</strong> ${animal.peso} kg</p>
      <p><strong>Temperatura:</strong> ${temperatura}°C</p>
      <p><strong>Status:</strong> 
        <span class="status-saude ${getClasseSaude(animal.saude)}">${animal.saude}</span>
      </p>
    `;
    container.appendChild(card);
  });

  // Se quiser salvar a temperatura no localStorage:
  localStorage.setItem("animais", JSON.stringify(animais));
});

// Função que aplica a cor na classe de saúde
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

// Gráfico de linha
const ctx = document.getElementById('graficoLinha').getContext('2d');

const graficoLinha = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['01/09', '02/09', '03/09', '04/09', '05/09', '06/09', '07/09'],
    datasets: [{
      label: 'Animais Saudáveis',
      data: [12, 14, 13, 15, 16, 17, 18],
      borderColor: '#2e7d32',
      backgroundColor: 'rgba(46,125,50,0.1)',
      tension: 0.3,
      fill: true
    },
    {
      label: 'Animais em Análise',
      data: [3, 2, 4, 3, 2, 1, 2],
      borderColor: '#fbc02d',
      backgroundColor: 'rgba(251,192,45,0.1)',
      tension: 0.3,
      fill: true
    },
    {
      label: 'Animais Doentes',
      data: [1, 2, 1, 2, 3, 2, 1],
      borderColor: '#d32f2f',
      backgroundColor: 'rgba(211,47,47,0.1)',
      tension: 0.3,
      fill: true
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantidade de Animais'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Data'
        }
      }
    }
  }
});
