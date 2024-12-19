// Declaração das variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Captura os botões pelos ids e adiciona um evento de clique
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Função que zera os valores das variáveis controladoras
function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// Função jogar novamente
function jogarNovamente() {
  jogar = true;
  let divis = document.getElementsByTagName("div");
  for (let i = 0; i < divis.length; i++) {
    if (divis[i].id == "1" || divis[i].id == "2" || divis[i].id == "3" || divis[i].id == "4") {
      divis[i].className = "inicial";
      // Remove imagens anteriores, se houver
      const imagem = divis[i].querySelector('img');
      if (imagem) {
        imagem.remove();
      }
    }
  }
}

// Função que atualiza o placar
function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById("resposta").innerHTML = `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

// Função executada quando o jogador acertou
function acertou(obj) {
  obj.className = "acertou";
  const img = new Image(100);
  img.id = "imagem";
  img.src = "acertou.png"; // imagem de acerto
  obj.appendChild(img);
}

// Função executada quando o jogador errou
function errou(obj) {
  obj.className = "errou";
  const img = new Image(100);
  img.id = "imagemErro";
  img.src = "errou.png"; // imagem de erro (X vermelho)
  obj.appendChild(img);
}

// Função que sorteia um número aleatório entre 1 e 4 e verifica se o jogador acertou
function verifica(obj) {
  if (jogar) {
    jogar = false;
    tentativas++;
    if (tentativas == 3) {
      btnJogarNovamente.className = 'invisivel';
      btnReiniciar.className = 'visivel';
    }

    // Sorteia um número entre 1 e 4
    let sorteado = Math.floor(Math.random() * 4) + 1;

    if (obj.id == sorteado) {
      acertou(obj);
      acertos++;
    } else {
      errou(obj);  // Se errou, chama a função errou
      const objSorteado = document.getElementById(sorteado);
      acertou(objSorteado); // Mostra onde está o smile
    }

    atualizaPlacar(acertos, tentativas);
  } else {
    alert('Clique em "Jogar novamente"');
  }
}

// Adiciona eventos aos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);
