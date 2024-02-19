const nomeCapitulo = document.getElementById("capitulo");
const audio = document.getElementById("audio-capitulo");
const progresso = document.getElementById('barra-progresso');
const botaoPlayPause = document.getElementById("play-pause");
const botaoProximoCapitulo = document.getElementById("proximo");
const botaoCapituloAnterior = document.getElementById("anterior");
const tempo = document.getElementById('tempo');

const quantidadeCapitulos = 10;
let taTocando = false;
let capitulo = 1;

function tocarFaixa() {
  botaoPlayPause.classList.remove("bi-play-circle-fill");
  botaoPlayPause.classList.add("bi-pause-circle-fill");
  audio.src === '' ? audio.src = "books/dom-casmurro/" + capitulo + ".mp3" : null;
  audio.play();
  // progresso.max = 1200;
  taTocando = true;
}

function pausarFaixa() {
  botaoPlayPause.classList.add("bi-play-circle-fill");
  botaoPlayPause.classList.remove("bi-pause-circle-fill");
  audio.pause();
  taTocando = false;
}

function tocarOuPausarFaixa() {
  if (taTocando === true) {
    pausarFaixa();
  } else {
    tocarFaixa();
  }
}

function capituloAnterior() {
  if (capitulo === 1) {
    capitulo = quantidadeCapitulos;
  } else {
    capitulo -= 1;
  }
  audio.src = "books/dom-casmurro/" + capitulo + ".mp3";
  nomeCapitulo.innerText = "Capítulo " + capitulo;
  tocarFaixa();
}

function proximoCapitulo() {
  if (capitulo < quantidadeCapitulos) {
    capitulo += 1;
  } else {
    capitulo = 1;
  }
  audio.src = "books/dom-casmurro/" + capitulo + ".mp3";
  nomeCapitulo.innerText = "Capítulo " + capitulo;
  tocarFaixa();
}

function tempoFormatado(segundos) {
  let minutos = Math.floor(segundos / 60);
  let segundosRestantes = segundos % 60;

  // Formata os minutos para garantir dois dígitos
  let minutosFormatados = minutos.toString().padStart(2, '0');

  // Formata os segundos para garantir dois dígitos
  let segundosFormatados = segundosRestantes.toString().padStart(2, '0');

  
  return `${minutosFormatados}:${segundosFormatados}`;
}


botaoPlayPause.addEventListener("click", tocarOuPausarFaixa);
botaoCapituloAnterior.addEventListener("click", capituloAnterior);
botaoProximoCapitulo.addEventListener("click", proximoCapitulo);
audio.addEventListener("ended", proximoCapitulo);

audio.addEventListener('timeupdate', () => {
  let porcentagem = (audio.currentTime / audio.duration) * 100;
  let tempoTotal = tempoFormatado(audio.duration.toFixed(0));
  let tempoAtual = tempoFormatado(audio.currentTime.toFixed(0))
  progresso.value = porcentagem;
  tempo.innerText = `${tempoAtual} / ${tempoTotal}`;
});

progresso.addEventListener('input', () => { //change
  // audio.currentTime = progresso.value;
  audio.currentTime = (progresso.value / 100) * audio.duration;
});

