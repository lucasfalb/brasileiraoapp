const proxRodada = document.querySelector('#nextRodada')
const prevRodada = document.querySelector('#prevRodada')
const rodadaAtual = document.querySelector('#rodadaAtual')

async function getRodadaAtual() {
  const url = "https://orbi.news/statics/ajax/campeonato-brasileirao.json"
  const response = await fetch(url)
  const data = await response.json();
  return data.rodada_atual.rodada
}

async function jogosSemana() {
  const url = `https://orbi.news/statics/ajax/rodada${await getRodadaAtual()}.json`
  const response = await fetch(url)
  const data = await response.json();
  const jogosSemanais = document.querySelector('.nextMatches .splide__list')
  data.partidas.map((item) => {
    jogosSemanais.innerHTML += `
    <li class="splide__slide">
    <div class="info">
      <h3>${item.data_realizacao}</h3>
      <div class="brasoes">
        <img src="${item.time_mandante.escudo}" alt="time">
        <img src="${item.time_visitante.escudo}" alt="time">
      </div>
      <div class="times">
        <h2>${item.time_mandante.nome_popular}</h2>
        <span>vs</span>
        <h2>${item.time_visitante.nome_popular}</h2>
      </div>
      <span>${item.estadio.nome_popular}</span>
    </div>
  </li>`
  });
  for (var x of document.querySelectorAll(".splide.nextMatchesSlide")) {
    var splide = new Splide(x, {
      autoWidth: true,
    });
    splide.mount();
    x.style.display = "inherit";
  }
}
jogosSemana()
async function getPartidas() {
  const url = `https://orbi.news/statics/ajax/rodada${await getRodadaAtual()}.json`
  const response = await fetch(url)
  const data = await response.json();
  const listaDasPartidas = document.querySelector('.brasileiraoCarrossel .splide__track .splide__list')
  rodadaAtual.setAttribute('data-rodada', data.rodada)
  proxRodada.setAttribute('data-rodada', data.proxima_rodada.rodada)
  prevRodada.setAttribute('data-rodada', data.rodada_anterior.rodada)
  data.partidas.map((item) => {
    listaDasPartidas.innerHTML += `
    <li class="splide__slide">
      <h3>
        <span>${item.data_realizacao}</span>
        ${item.hora_realizacao}
        ${item.estadio.nome_popular == null ? `` : `<span>${item.estadio.nome_popular }</span>`}
      </h3>
      <div class="ob-partidaInfo">
        <div class="ob-time">
          <span>${item.time_mandante.sigla}</span>
          <img src="${item.time_mandante.escudo}" alt="${item.time_mandante.sigla}">
        </div>
        <div class="ob-placar">
          <h4>X</h4>
        </div>
        <div class="ob-time">
          <img src="${item.time_visitante.escudo}" alt="${item.time_mandante.sigla}">
          <span>${item.time_visitante.sigla}</span>
        </div>
      </div>

    </li>`
  });
  for (var x of document.querySelectorAll(".splide.brasileiraoCarrossel")) {
    var splide = new Splide(x, {
      type: "fade",
      perPage: 1,
      autoplay: !0,
      interval: 1e4
    });
    splide.mount(), x.style.display = "inherit"
  }
 
}
getPartidas()

async function atualizarRodada(e){
  const rodada = document.querySelector(`#${e.id}`).getAttribute('data-rodada')
  const url = `https://orbi.news/statics/ajax/rodada${rodada}.json`
  const response = await fetch(url)
  const data = await response.json();
  rodadaAtual.setAttribute('data-rodada', data.rodada)
  proxRodada.setAttribute('data-rodada', data.proxima_rodada.rodada)
  if(!data.proxima_rodada){proxRodada.style.display = 'none'}
  prevRodada.setAttribute('data-rodada', data.rodada_anterior.rodada)
  if(!data.rodada_anterior){prevRodada.style.display = 'none'}
  rodadaAtual.innerHTML = `Rodada ${data.rodada}`
  const carrossel = document.querySelector('.brasileiraoCarrossel')
  carrossel.innerHTML = `
  <section class="splide brasileiraoCarrossel" aria-label="Campeonato Brasileirão">
    <div class="splide__track">
      <ul class="splide__list">
      </ul>
    </div>
  </section>`
  const listaDasPartidas = document.querySelector('.brasileiraoCarrossel .splide__track .splide__list')
  data.partidas.map((item) => {
    listaDasPartidas.innerHTML += `
    <li class="splide__slide">
      <h3>
        <span>${item.data_realizacao}</span>
        ${item.hora_realizacao}
        ${item.estadio.nome_popular == null ? `` : `<span>${item.estadio.nome_popular}</span>`}
      </h3>
      <div class="ob-partidaInfo">
        <div class="ob-time">
          <span>${item.time_mandante.sigla}</span>
          <img src="${item.time_mandante.escudo}" alt="${item.time_mandante.sigla}">
        </div>
        <div class="ob-placar">
        ${item.placar_mandante == null ? `<span>_</span>` : `<span>${item.placar_mandante}</span>`}
        <h4>X</h4>
        ${item.placar_visitante == null ? `<span>_</span>` : `<span>${item.placar_visitante}</span>`}
        </div>
        <div class="ob-time">
          <img src="${item.time_visitante.escudo}" alt="${item.time_mandante.sigla}">
          <span>${item.time_visitante.sigla}</span>
        </div>
      </div>
    </li>`
  });
  for (var x of document.querySelectorAll(".splide.brasileiraoCarrossel")) {
    var splide = new Splide(x, {
      type: "fade",
      perPage: 1,
      autoplay: !0,
      interval: 1e4
    });
    splide.mount(), x.style.display = "inherit"
  }
 
}