const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')



const personagens = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'meeseeks',
    'scroopy',
    'summer',
]


const createElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element

}

let firstCarta = ''
let secondCarta = ''

const checkEndGame = () => {
    const disabledCartas = document.querySelectorAll('.disabled-carta')

    if (disabledCartas.length === 20) {
        clearInterval(this.loop)

        setTimeout(() => {

            alert(`Parabéns, ${spanPlayer.innerHTML}! O teu tempo foi : ${timer.innerHTML}`)
        }, 100)


    }
}


const checkCards = () => {
    const firstPersonagem = firstCarta.getAttribute('data-personagem')
    const secondPersonagem = secondCarta.getAttribute('data-personagem')

    if (firstPersonagem === secondPersonagem) {

        firstCarta.firstChild.classList.add('disabled-carta')
        secondCarta.firstChild.classList.add('disabled-carta')
        firstCarta = ''
        secondCarta = ''

        checkEndGame()

    } else {

        setTimeout(() => {

            firstCarta.classList.remove('reveal-carta')
            secondCarta.classList.remove('reveal-carta')
            firstCarta = ''
            secondCarta = ''
        }, 500)

    }

}

const revealCarta = ({ target }) => {
    if (target.parentNode.className.includes('reveal-carta')) {
        return
    }

    if (firstCarta === '') {

        target.parentNode.classList.add('reveal-carta')
        firstCarta = target.parentNode

    } else if (secondCarta === '') {

        target.parentNode.classList.add('reveal-carta')
        secondCarta = target.parentNode

        checkCards()

    }

}

const criarCarta = (personagem) => {

    const carta = createElement('div', 'carta')
    const frente = createElement('div', 'face frente')
    const costas = createElement('div', 'face costas')

    frente.style.backgroundImage = `url('../img/${personagem}.png')`

    carta.appendChild(frente)
    carta.appendChild(costas)

    carta.addEventListener('click', revealCarta)
    carta.setAttribute('data-personagem', personagem)


    return carta
}

const loadGame = () => {

    const duplicarPersonagens = [...personagens, ...personagens]

    const shuffledArray = duplicarPersonagens.sort(() => Math.random() - 0.5)

    shuffledArray.forEach((personagem) => {
        const carta = criarCarta(personagem)
        grid.appendChild(carta)

    })
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML
        timer.innerHTML = currentTime + 1
    }, 1000)
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('jogador')
    startTimer()
    loadGame()
}

