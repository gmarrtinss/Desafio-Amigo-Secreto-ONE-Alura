// 1. Criar um array para armazenar os nomes
const amigos = [];

// Variável para controlar o modo atual (sorteio ou combinação)
let modo = 'sorteio';

// 2. Função para adicionar um nome à lista de amigos
function adicionarAmigo() {
    const nomeInput = document.getElementById('amigo');
    const nome = nomeInput.value.trim();

    if (nome === '') {
        alert("Por favor, insira um nome.");
    } else {
        amigos.push(nome);
        nomeInput.value = ''; // Limpar o campo de entrada

        // Atualizar a lista visual com o novo nome
        atualizarListaAmigos();

        alert(nome + " foi adicionado à lista de amigos!");
    }
}

// Função para atualizar a lista de amigos exibida na tela
function atualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = ''; // Limpa a lista antes de adicionar os novos itens

    amigos.forEach(amigo => {
        const listItem = document.createElement('li');
        listItem.textContent = amigo;
        listaAmigos.appendChild(listItem);
    });
}

// 3. Função para sortear um amigo aleatório (Modo Sorteio Simples)
function sortearAmigo() {
    if (amigos.length === 0) {
        alert("A lista de amigos está vazia!");
    } else {
        const indiceAleatorio = Math.floor(Math.random() * amigos.length);
        const amigoSorteado = amigos[indiceAleatorio];

        // Mostrar o resultado na lista de resultados
        const resultado = document.getElementById('resultado');
        resultado.innerHTML = `<li>O amigo sorteado é: <strong>${amigoSorteado}</strong></li>`;
    }
}

// 4. Função para combinar amigos (Modo Combinação) com embaralhamento para evitar combinações fixas
function combinarPresentes() {
    if (amigos.length < 2) {
        alert("É necessário pelo menos 2 amigos para realizar a combinação.");
    } else {
        let amigosEmbaralhados = [...amigos];

        // Embaralhar a lista para garantir combinações diferentes
        for (let i = amigosEmbaralhados.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [amigosEmbaralhados[i], amigosEmbaralhados[j]] = [amigosEmbaralhados[j], amigosEmbaralhados[i]];
        }

        let combinacoes = [];
        for (let i = 0; i < amigosEmbaralhados.length; i++) {
            const presenteador = amigosEmbaralhados[i];
            const presenteado = amigosEmbaralhados[(i + 1) % amigosEmbaralhados.length]; // Circular
            combinacoes.push(`${presenteador} presenteia ${presenteado}`);
        }

        // Mostrar as combinações na tela
        const resultado = document.getElementById('resultado');
        resultado.innerHTML = ''; // Limpar o resultado anterior
        combinacoes.forEach(combinacao => {
            const listItem = document.createElement('li');
            listItem.textContent = combinacao;
            resultado.appendChild(listItem);
        });
    }
}

// 5. Função para alternar entre os modos de Sorteio e Combinação
function alternarModo() {
    const resultado = document.getElementById('resultado');
    const botaoModo = document.getElementById('botaoModo');

    if (modo === 'sorteio') {
        modo = 'combinacao';
        botaoModo.textContent = 'Mudar para Sorteio';
        resultado.innerHTML = ''; // Limpar resultado anterior
    } else {
        modo = 'sorteio';
        botaoModo.textContent = 'Mudar para Combinação';
        resultado.innerHTML = ''; // Limpar resultado anterior
    }
}

// 6. Função para realizar o sorteio ou a combinação dependendo do modo atual
function realizarAcao() {
    if (modo === 'sorteio') {
        sortearAmigo();
    } else if (modo === 'combinacao') {
        combinarPresentes();
    }
}
