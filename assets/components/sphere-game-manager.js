console.log('this is the sphere game manager');

// random number generator
// helper for choosing a random location for the sphere
generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * max + min)
}

// choose a random position for each avocado
chooseRandomPosition = () => {

  console.log('random position')
  let positionX = generateRandomNumber(-1, 2);
  let positionY = 1.6
  let positionZ = generateRandomNumber(-1, -3);

  return {'x': positionX, 'y': positionY, 'z': positionZ}
}

createSphere = () => {
  console.log('create sphere');

  const newSphere = document.createElement('a-sphere')

  newSphere.setAttribute("class", "item")
  newSphere.setAttribute('radius', 4)
  newSphere.setAttribute('cursor-listener', ' ')

  let position = chooseRandomPosition()
  console.log(position)
  // let positionStr = position.x.toString() + ' ' + position.y.toString() + ' ' + position.z.toString()
  // console.log(positionStr)
  newSphere.setAttribute('position', position);

  // const sphereObj = {
  //   newSphere: newSphere,
  //   position: position
  // }

  console.log(newSphere)

  return newSphere
}

AFRAME.registerComponent('sphere-game-manager', {
  schema: {
    numberSpheres: { type: 'int' }
  },
  init: function () {
    console.log('Hello, World!');
    // grab the number of squares
    const spheres = this.data['numberSpheres']; // 10
    console.log(spheres);
    // grab the scene
    const sceneElement = document.querySelector('a-scene');
    // create an empty array
    const spheresArray = []

    // loop over the spheres and push each into the empty array
    for (let i = 0; i < spheres; i++) {
      spheresArray.push(createSphere());
    }

    console.log(spheresArray)

    //
    sceneElement.addEventListener('loaded', function(){
      spheresArray.forEach(function(sphere){
        let position = sphere.position;
        let element = sphere.newSphere;
        // sphere.newSphere.setAttribute('position', position);
        // append it to the DOM
        // sphere
        sceneElement.appendChild(sphere).setAttribute('position', "7.5 6 -30");
      })
    })
  }
})

  generateRandomNumber()
  chooseRandomPosition()
  createSphere()

