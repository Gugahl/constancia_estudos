// script.js

// Seleciona os elementos do DOM
const aumentarButton = document.getElementById('aumentar');
const resetButton = document.getElementById('reset');
const numeroDisplay = document.getElementById('numero');
const mensagemDisplay = document.getElementById('mensagem');

// Função para carregar o número salvo no localStorage
function carregarNumero() {
    let numeroSalvo = localStorage.getItem('numero');
    let ultimaData = localStorage.getItem('ultimaData');

    if (numeroSalvo !== null) {
        numeroDisplay.textContent = numeroSalvo;
    }

    // Verifica se o número precisa ser resetado
    if (ultimaData !== null) {
        let dataAtual = new Date().toLocaleDateString();
        if (dataAtual !== ultimaData) {
            resetNumero();
        }
    }
}

// Função para salvar o número e a data no localStorage
function salvarNumero(numero) {
    localStorage.setItem('numero', numero);
    localStorage.setItem('ultimaData', new Date().toLocaleDateString());
}

// Função para exibir uma mensagem de parabéns
function parabenizarUsuario() {
    mensagemDisplay.textContent = 'Parabéns por mais um dia de constância!';
    setTimeout(() => {
        mensagemDisplay.textContent = '';
    }, 3000); // Remove a mensagem após 3 segundos
}

// Função para verificar se o botão pode ser pressionado
function podePressionarBotao() {
    let agora = new Date();
    let horas = agora.getHours();
    let minutos = agora.getMinutes();
    
    // Verifica se a hora está entre 4:30 e 5:50
    if ((horas === 4 && minutos >= 30) || (horas === 5 && minutos <= 50)) {
        return true;
    } else {
        mensagemDisplay.textContent = 'Você só pode pressionar o botão entre 4:30 e 5:50!';
        setTimeout(() => {
            mensagemDisplay.textContent = '';
        }, 3000); // Remove a mensagem após 3 segundos
        return false;
    }
}

// Função para incrementar o número
function aumentarNumero() {
    if (podePressionarBotao()) {
        let numeroAtual = parseInt(numeroDisplay.textContent);
        numeroAtual += 1;
        numeroDisplay.textContent = numeroAtual;
        salvarNumero(numeroAtual);
        parabenizarUsuario();
    }
}

// Função para resetar o número
function resetNumero() {
    numeroDisplay.textContent = 0;
    salvarNumero(0);
    mensagemDisplay.textContent = ''; // Limpa a mensagem ao resetar
}

// Adiciona os eventos de clique aos botões
aumentarButton.addEventListener('click', aumentarNumero);
resetButton.addEventListener('click', resetNumero);

// Carrega o número salvo ao carregar a página
window.addEventListener('load', carregarNumero);
