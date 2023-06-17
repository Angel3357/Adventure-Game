const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Escuchas un extraño ruido ¿Que haces?',
    options: [
      {
        text: 'Seguirlo',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Ignorarlo',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'Seguiste el ruido y llegaste una casa donde encuentras a un gato que pensaste era uno de tus amigos, ves una torre de reloj a lo lejos ¿Que haces?',
    options: [
      {
        text: 'Ir a explorarla',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Quieres ir a explorarla pero te vas por otro camino que parece mas seguro',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Quieres irte pero recuerdas que no has encontrado a tus amigos asi que vas hacia la torre',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Decidiste explorarar la torre y resulta que tus amigos estaban ahi, ven a una granja a lo lejos ¿Que hacer?',
    options: [
      {
        text: 'Salir del bosque',
        nextText: 4
      },
      {
        text: 'Estan muy cansados asi que deciden volver al campamento y dormir',
        nextText: 5
      },
      {
        text: 'Ir a la granja',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Lograron salir del bosque y ahora vuelven a casa',
    options: [
      {
        text: 'Fin',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: '¿Que crees? Ya esta amaneciendo asi que deciden irse para mejor en casa',
    options: [
      {
        text: 'Fin',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Al llegar a la granja empiezan a explorar la granja esta abandonada',
    options: [
      {
        text: 'Continuan explorando ',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'Se encuentran un espiritu maligno',
    options: [
      {
        text: 'Intentan escapar',
        nextText: 8
      },
      {
        text: 'Empiezan a atacarlo',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Se esconden',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Enfrentarlo',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Sus intentos de escapar son inutiles y el espiritu atrapa sus almas',
    options: [
      {
        text: 'Fin',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'El espiritu puede ser dañado por ataques fisicos, asi que lo atacan y lo vencen',
    options: [
      {
        text: 'Fin',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'El espiritu los encuentra facilmente asi que atrapa sus almas',
    options: [
      {
        text: 'Fin',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Encontraron una pistola que curiosamente le afecta, asi que le disparan y lo matan, ya pueden ir a casa',
    options: [
      {
        text: 'Fin',
        nextText: -1
      }
    ]
  }
]

startGame()