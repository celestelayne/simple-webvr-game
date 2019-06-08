console.log('this is the game manager')

// random number generator
// helper for choosing a random location for the avocado
generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * max + min)
}

// choose a random position for each avocado
chooseRandomPosition = () => {

  console.log('random position')
  let positionX = generateRandomNumber(-10, 10);
  let positionY = 1.6
  let positionZ = generateRandomNumber(-15, -30);

  return {'x': positionX, 'y': positionY, 'z': positionZ}
}

// create a new avocado
createAvocado = () => {
  console.log('create avocado')

  // const scene = document.querySelector('a-scene')

  const newAvocado = document.createElement('a-entity')

  // scene.appendChild(newAvocado)

  newAvocado.setAttribute("class", "item")
  // newAvocado.setAttribute('cursor-listener', ' ')
  newAvocado.setAttribute("gltf-model", "#apple")

  console.log(newAvocado)

  let position = chooseRandomPosition()
  console.log(position)
  let positionStr = position.x.toString() + ' ' + position.y.toString() + ' ' + position.z.toString()
  newAvocado.setAttribute('position', position);

  return newAvocado
}

createAvocado()

AFRAME.registerComponent('game-manager', {
  schema: {
    numberOfAvocado: { type: 'int' }
  },
  init: function(){

    console.log('Hello, World!');

    const numAvocado = this.data['numberOfAvocado']
    const sceneElement = document.querySelector('a-scene')
    const avocadoArray = []

    for (let i = 0; i < avocadoArray; i++) {
      avocadoArray.push(createAvocado());
    }

    sceneElement.addEventListener('loaded', function(){
      avocadoArray.forEach(function(avo){
        console.log(avo)
        sceneElement.appendChild(avo)
      })
    })
  }
})

const playGame = () => {
  generateRandomNumber()
  chooseRandomPosition()
}

playGame()
