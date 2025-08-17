/*let titulo = document.querySelector("h1"); // Seleciona o primeiro elemento h1
titulo.innerHTML = "Jogo do Número Secreto"; // Altera o conteúdo do elemento h1
// querySelectorAll() selecioan todos os elementos

/*let paragrafo = document.querySelector("p");
paragrafo.innerHTML = "Escolha um número entre 1 e 1000000";*/

//fazer acima ou resumir a chamada das tags abaixo

let listaDeNumerosSorteados = []; //array [] lista de elementos
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;//altera o texto na tela
    /*responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2}); //rate: velocidade fala
    API de fala usa o caso acima com chave do site, ou abaixo usando o próprio navegador*/
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto')
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10')
}

exibirMensagemInicial();

 
function verificarChute() { //função sem parâmetros/retorno
    let chute = document.querySelector('input').value;//pega o valor, não o campo inteiro

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let qtdTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', qtdTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');//ou .disabled = false;
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparChute();
    }
}

//ctrl+L limpa o console console.clear();


function gerarNumeroAleatorio() { //função com retorno sem parâmetro
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadDeElementosNaLista = listaDeNumerosSorteados.length; //length qtd de elementos
    if (quantidadDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); //push: adiciona item ao final da lista, .pop remove
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparChute() {
           chute = document.querySelector('input');
           chute.value = '';
        }

        function reiniciarJogo() {
            numeroSecreto = gerarNumeroAleatorio();
            limparChute();
            tentativas = 1;
            exibirMensagemInicial();
            document.getElementById('reiniciar').setAttribute('disabled', true);//ou .disabled = true;
        }
