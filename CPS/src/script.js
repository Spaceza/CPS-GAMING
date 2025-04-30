let cliques = 0;
let tempo = 0;
let tempoMaximo = 10;  // Tempo padrão (10 segundos)
let intervalo;
let jogoIniciado = false;
let ranking = [];

// Função para iniciar o jogo
function iniciarJogo() {
  // Desativa o botão "Iniciar"
  document.getElementById("botao_iniciar_jogo").disabled = true;

  // Reseta os contadores e variáveis
  cliques = 0;
  tempo = 0;
  jogoIniciado = true;

  // Pega o valor selecionado no <select> e ajusta o tempo máximo
  const modoSelecionado = document.getElementById("modo").value;
  tempoMaximo = parseInt(modoSelecionado);

  // Mostra a contagem regressiva
  let contagem = 3; // A contagem começa em 3 segundos
  const contagemElement = document.getElementById("contagem-regressiva");
  
  // Exibe a contagem regressiva
  contagemElement.style.display = "block"; // Torna a contagem visível
  contagemElement.textContent = contagem;

  // Desabilita a área de jogo durante a contagem regressiva
  document.getElementById("area-jogo").style.pointerEvents = "none";

  // Exibe a contagem regressiva e diminui a cada segundo
  const contagemInterval = setInterval(() => {
    contagem--;
    contagemElement.textContent = contagem;

    if (contagem <= 0) {
      clearInterval(contagemInterval); // Limpa o intervalo da contagem
      contagemElement.style.display = 'none'; // Esconde a contagem

      // Habilita a área de jogo para poder clicar
      document.getElementById("area-jogo").style.pointerEvents = "auto";

      iniciarTemporizador(); // Inicia o tempo do jogo
    }
  }, 1000); // A cada 1 segundo
}

// Função para iniciar o temporizador
function iniciarTemporizador() {
  const startTime = Date.now(); // Marca o início do jogo

  intervalo = setInterval(() => {
    if (!jogoIniciado) {
      clearInterval(intervalo); // Para o temporizador se o jogo foi reiniciado
      return;
    }

    // Calcula o tempo decorrido em milissegundos
    const elapsedTime = Date.now() - startTime;
    tempo = elapsedTime / 1000; // Converte para segundos

    // Atualiza o tempo no HTML com 2 casas decimais
    document.getElementById("tempo").textContent = tempo.toFixed(2);

    atualizarCPS(); // Atualiza o CPS

    // Verifica se o tempo máximo foi atingido
    if (tempo >= tempoMaximo) {
      clearInterval(intervalo); // Para o temporizador
      jogoIniciado = false;

      const nome = document.getElementById("nome").value || "Jogador";
      const cpsFinal = parseFloat(document.getElementById("cps").textContent);
      let mensagemFinal = "";

      if (cpsFinal <= 2) {
        mensagemFinal = "Tá mais lento que uma tartaruga dormindo! 🐢";
      } else if (cpsFinal <= 4) {
        mensagemFinal = "Nada mal, mas dá pra melhorar... 😐";
      } else if (cpsFinal <= 6) {
        mensagemFinal = "Bom trabalho! Você é decente! 👍";
      } else if (cpsFinal < 8) {
        mensagemFinal = "Ótimo! Você é um jogador acima da média! 🌟";
      } else if (cpsFinal < 10) {
        mensagemFinal = "Incrível! Você é um jogador bom! 🔥";
      } else if (cpsFinal < 12) {
        mensagemFinal = "Impressionante! Você é um jogador muito bom! 💪";
      } else if (cpsFinal < 15) {
        mensagemFinal = "Uau! Você é um jogador excelente! 🏆";
      } else if (cpsFinal < 20) {
        mensagemFinal = "Você é um jogador profissional! 🥇";
      } else if (cpsFinal < 25) {
        mensagemFinal = "Você é um verdadeiro mestre! 👑";
      } else if (cpsFinal < 30) {
        mensagemFinal = "Você é um deus dos cliques! 😇⚡";
      } else if (cpsFinal < 35) {
        mensagemFinal = "Você é um verdadeiro monstro! 💀";
      }  else {
        mensagemFinal = "...O que você é? 😨";
      }

      // Exibe a mensagem de resultado no HTML
      const resultadoElement = document.getElementById("resultado");
      resultadoElement.style.display = "block";
      resultadoElement.textContent = `FIM DE JOGO, ${nome}! CPS: ${cpsFinal}. ${mensagemFinal}`;

      // Habilita o botão "Salvar"
      document.getElementById("botao_salvar").disabled = false;
    }
  }, 10); // Atualiza a cada 10ms
}

// Função para salvar o resultado no ranking
function salvarResultado() {
  const nome = document.getElementById("nome").value || "Jogador";
  const cpsFinal = parseFloat(document.getElementById("cps").textContent);
  const modoSelecionado = document.getElementById("modo").value;


  // Determina o modo de jogo com base no valor selecionado e adiciona o emoji
  let modoTexto = "";
  if (modoSelecionado === "15") {
    modoTexto = "🐢 Fácil";
  } else if (modoSelecionado === "10") {
    modoTexto = "⚖️ Normal";
  } else if (modoSelecionado === "5") {
    modoTexto = "🔥 Difícil";
  } else if (modoSelecionado === "3") {
    modoTexto = "💀 Insano";
  } else if (modoSelecionado === "1") {
    modoTexto = "☠️ Impossível";
  }

  // Adiciona o resultado ao ranking
  ranking.push({ nome, cps: cpsFinal, modo: modoTexto});

  // Ordena o ranking por CPS (maior para menor)
  ranking.sort((a, b) => b.cps - a.cps);

  // Atualiza o ranking na página
  const listaRanking = document.getElementById("lista-ranking");
  listaRanking.innerHTML = ""; // Limpa a lista atual
  ranking.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "text-success list-group-item bg-dark text-light";
    li.textContent = `${index + 1}. ${item.nome} - CPS: ${item.cps}, Modo: ${item.modo}`;
    listaRanking.appendChild(li);
  });

  // Limpa o campo de nome para permitir a entrada de um novo nome
  document.getElementById("nome").value = "";

  // Desativa o botão "Salvar" após salvar
  document.getElementById("botao_salvar").disabled = true;
}

// Função para registrar os cliques
function registrarClique() {
  if (!jogoIniciado) return;
  cliques++;
  document.getElementById("cliques").textContent = cliques;
  atualizarCPS();
}

// Função para atualizar o CPS
function atualizarCPS() {
  let cps = tempo > 0 ? (cliques / tempo).toFixed(2) : 0;
  document.getElementById("cps").textContent = cps;
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  // Para qualquer temporizador ativo
  clearInterval(intervalo);

  // Para a contagem regressiva, se estiver ativa
  const contagemElement = document.getElementById("contagem-regressiva");
  contagemElement.style.display = "none"; // Esconde a contagem regressiva

  // Esconde a mensagem de resultado
  const resultadoElement = document.getElementById("resultado");
  resultadoElement.style.display = "none";

  // Zera os valores dos contadores e do jogo
  cliques = 0;
  tempo = 0;
  jogoIniciado = false;

  // Reseta os contadores no HTML para 0
  document.getElementById("cliques").textContent = "0";
  document.getElementById("cps").textContent = "0";
  document.getElementById("tempo").textContent = "0";

  // Desabilita a área de jogo até o novo início
  document.getElementById("area-jogo").style.pointerEvents = "none";

  // Reativa o botão "Iniciar"
  document.getElementById("botao_iniciar_jogo").disabled = false;

  // Atualiza o tempo máximo de acordo com o modo selecionado ao reiniciar
  const modoSelecionado = document.getElementById("modo").value;
  tempoMaximo = parseInt(modoSelecionado);
}
