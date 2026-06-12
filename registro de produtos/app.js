'use strict'

// Captura os elementos do HTML pelo ID
const categoria = document.getElementById('categoria')
const tipoCafe = document.getElementById('tipoCafe')
const tipo = document.getElementById('tipo')
const containerPrecos = document.getElementById('containerPrecos')

const inputImagem = document.getElementById('preview-input')
const previewImg = document.getElementById('preview-image')

/*
    Cria um campo de preço dinamicamente.

    Parâmetros:
    - categoriaSelecionada: nome da categoria escolhida
    - tipoSelecionado: tipo escolhido pelo usuário

    Retorna:
    - um elemento input configurado
*/
function criarInputPreco(categoriaSelecionada, tipoSelecionado) {

    // Cria um novo elemento input
    const input = document.createElement('input')

    // Define o tipo do campo
    input.type = 'text'

    // Aplica a classe CSS para estilização
    input.className = 'input-padrao'

    // Cria o placeholder com o nome da categoria e do tipo selecionado
    input.placeholder = `Preço ${categoriaSelecionada} ${tipoSelecionado}`

    // Retorna o input criado
    return input
}

/*
    Cria os campos de preço de acordo
    com os tipos selecionados.
*/
function criarCamposPreco() {

    // Remove todos os inputs existentes
    containerPrecos.replaceChildren()

    // Acessa todas as opções do select, pega a opção selecionada
    const categoriaSelecionada =
        categoria.options[categoria.selectedIndex].text

    /*
        Busca todos os checkboxes marcados
        dentro da área de tipos.
    */
    const tiposSelecionados =
        document.querySelectorAll('#tipo input:checked')

    // Converte NodeList em Array e cria inputs de preço
    const inputs = [...tiposSelecionados].map(tipo => {
        return criarInputPreco(categoriaSelecionada, tipo.value)
    })

    // Adiciona os novos inputs no container
    containerPrecos.replaceChildren(...inputs)
}

/*
    Mostra ou esconde a área de tipos
    conforme a categoria escolhida.
*/
function mostrarTipo() {

    // Verifica se existe uma categoria selecionada
    if (categoria.value) {

        // Exibe a área dos tipos
        tipoCafe.style.display = 'block'

    } else {

        // Oculta a área dos tipos
        tipoCafe.style.display = 'none'

        /*
            Desmarca todos os checkboxes
            da área de tipos.
        */
        document.querySelectorAll('#tipo input')
            .forEach(input => input.checked = false)

        // Remove todos os campos de preço
        containerPrecos.replaceChildren()
    }
}

/*
    Mostra preview da imagem selecionada
*/
function previewImagem({ target }) {

    const file = target.files[0]
    if (!file) return

    // Cria URL temporária da imagem
    const url = URL.createObjectURL(file)

    // Exibe preview
    previewImg.src = url
    previewImg.style.display = 'block'

    /*
        Esconde img inicial do upload
    */
    document.querySelector('.placeholder-icon').style.display = 'none'
}

/*
    EVENTOS
*/

// Mostra tipos quando muda categoria
categoria.addEventListener('change', mostrarTipo)

// Cria inputs de preço quando muda checkbox
tipo.addEventListener('change', criarCamposPreco)

// Preview da imagem
inputImagem.addEventListener('change', previewImagem)






