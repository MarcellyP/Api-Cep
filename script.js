//aula origamid
/*const inputCep = document.querySelector('cep');
const btnCep = document.getElementById('input-buttom');
const resultadoCep = document.querySelector('.resultadoCep') 

btnCep.addEventListener('click', handleClick);

function handleClick(event) {
  event.preventDefault();
  console.log(event);  
}

function buscaCep(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
  .then(response => response.text())
  .then(body => {
    resultadoCep.innerHTML = body;
  })
}

*/
const limparFormulario = () =>{
  document.getElementById('endereco').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
}


const preencherFormulario = (endereco) =>{
  document.getElementById('endereco').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
  document.getElementById('estado').value = endereco.uf;
}


const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 

const pesquisarCep = async() => {
  limparFormulario();
  
  const cep = document.getElementById('cep').value.replace("-","");
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  if (cepValido(cep)){
      const dados = await fetch(url); //await faz a execução de uma função async pausar, para esperar pelo retorno da Promise , e resume a execução da função async quando o valor da Promise é resolvido
      const endereco = await dados.json();
      if (endereco.hasOwnProperty('erro')){
          document.getElementById('endereco').value = 'CEP não encontrado!';
      }else {
          preencherFormulario(endereco);
      }
  }else{
      document.getElementById('endereco').value = 'CEP incorreto!';
  }
   
}

document.getElementById('cep')
      .addEventListener('focusout',pesquisarCep);