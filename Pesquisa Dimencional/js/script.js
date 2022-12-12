//=====================================================================================
const image = document.querySelector('.img-person')
const nome = document.querySelector('#nome');
const numero = document.querySelector('#id');  
const status = document.querySelector('#status');
const raça = document.querySelector('#raça');
const genero = document.querySelector('#genero');
const origem = document.querySelector('#origem');

const pesquisaBar = document.querySelector('.pesquisa-bar');
const buscar = document.querySelector('.pesquisa-texto')
const btPrev = document.querySelector('#bt-1');
const btNext = document.querySelector('#bt-2');
//=====================================================================================
let passar = 1;
//=====================================================================================
const fetchCiencia = async (person) => {
  const APIResponse = await fetch(`https://rickandmortyapi.com/api/character/${person}`);
  
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}
//=====================================================================================
const carregar = async (person) => {

  nome.innerHTML = 'Carregando...';
  numero.innerHTML = 'Vazio';

  const data = await fetchCiencia(person);

  if (data) {
    image.style.display = 'block';
    nome.innerHTML = data.name;
    numero.innerHTML = data.id;
    status.innerHTML = data.status;
    raça.innerHTML = data.species;
    genero.innerHTML = data.gender;
    origem.innerHTML = data.origin.name;
    image.src = data['image'];
    buscar.value = '';
    passar = data.id;
  }else {
    image.style.display = 'block';
    nome.innerHTML = 'Sem registro!';
    numero.innerHTML = '';
  }
}
pesquisaBar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    carregar(buscar.value.toLowerCase());
});
btPrev.addEventListener('click', () => {
    if(passar > 1){
        passar -= 1;
        carregar(passar);
    }
});
btNext.addEventListener('click', () => {
    if(passar == passar){
        passar += 1;
        carregar(passar);
    }
});

carregar(passar);


