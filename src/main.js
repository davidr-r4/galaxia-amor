import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()

scene.background = new THREE.Color(0x000000)

// CAMARA
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
)

camera.position.z = 45

// RENDER
const renderer = new THREE.WebGLRenderer({
  antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)

renderer.setPixelRatio(window.devicePixelRatio)

document.body.appendChild(renderer.domElement)

// CONTROLES
const controls = new OrbitControls(
  camera,
  renderer.domElement
)

controls.enableDamping = true
controls.enableZoom = true
controls.enablePan = true

controls.autoRotate = true
controls.autoRotateSpeed = 0.4

// ESTRELLAS FONDO

const starsGeometry =
  new THREE.BufferGeometry()

const starsCount = 20000

const starsPositions =
  new Float32Array(starsCount * 3)

for(let i = 0; i < starsCount * 3; i++){

  starsPositions[i] =
    (Math.random() - 0.5) * 600
}

starsGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(
    starsPositions,
    3
  )
)

const starsMaterial =
  new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05
  })

const stars =
  new THREE.Points(
    starsGeometry,
    starsMaterial
  )

scene.add(stars)

// GALAXIA DE PALABRAS

const loveWords = [

'Te amo ❤️',
'Hermosa ✨',
'Mi niña 💖',
'Preciosa 🌌',
'Mi universo 💫',
'Bella ❤️',
'Perfecta ✨',
'Mi vida 💕',
'Contigo 🌠',
'Eterna ❤️',
'Mi corazón 💖',
'Linda ✨',
'Amor 🌌',
'Mi todo 💫',
'Cariño ❤️',
'Reina 👑',
'Princesa 💖',
'Angel ✨',
'Mi cielo 🌠',
'Bonita 💕',
'Te pienso ❤️',
'Mi galaxia 🌌',
'Perfecta para mí 💖',
'Siempre tú ✨',
'Mi felicidad 💫'

]

const galaxyGroup = new THREE.Group()

for(let i = 0; i < 500; i++){

  const word =
    loveWords[
      Math.floor(
        Math.random() * loveWords.length
      )
    ]

  const canvas =
    document.createElement('canvas')

  const ctx =
    canvas.getContext('2d')

  canvas.width = 1024
  canvas.height = 512

  const colors = [

    '#ff77ff',
    '#ff99cc',
    '#ffffff',
    '#ff66aa',
    '#ffb3ff',
    '#ffd6ff'

  ]

  ctx.fillStyle =
    colors[
      Math.floor(
        Math.random() * colors.length
      )
    ]

  ctx.font = 'bold 52px Arial'

  ctx.textAlign = 'center'

  ctx.shadowColor = 'white'
  ctx.shadowBlur = 30

  ctx.fillText(word, 512, 256)

  const texture =
    new THREE.CanvasTexture(canvas)

  const material =
    new THREE.SpriteMaterial({

      map: texture,
      transparent: true,
      depthWrite: false

    })

  const sprite =
    new THREE.Sprite(material)

  // FORMACION ESPIRAL

  const radius =
    Math.random() * 45

  const branches = 6

  const branchAngle =
    (i % branches) /
    branches *
    Math.PI * 2

  const spin =
    radius * 0.9

  const angle =
    branchAngle + spin

  sprite.position.x =
    Math.cos(angle) * radius

  sprite.position.z =
    Math.sin(angle) * radius

  sprite.position.y =
    (Math.random() - 0.5) * 10

  const scale =
    Math.random() * 2 + 1

  sprite.scale.set(

    scale * 4,
    scale * 1.5,
    1

  )

  galaxyGroup.add(sprite)
}

scene.add(galaxyGroup)

// TEXTO CENTRAL

const centerCanvas =
  document.createElement('canvas')

const centerCtx =
  centerCanvas.getContext('2d')

centerCanvas.width = 2048
centerCanvas.height = 1024

centerCtx.fillStyle = 'white'

centerCtx.font =
  'bold 120px Arial'

centerCtx.textAlign = 'center'

centerCtx.shadowColor = '#ff99ff'
centerCtx.shadowBlur = 40

centerCtx.fillText(
  'Britney ❤️',
  1024,
  512
)

const centerTexture =
  new THREE.CanvasTexture(centerCanvas)

const centerMaterial =
  new THREE.SpriteMaterial({

    map: centerTexture,
    transparent: true

  })

const centerSprite =
  new THREE.Sprite(centerMaterial)

centerSprite.scale.set(
  25,
  12,
  1
)

scene.add(centerSprite)
// PLANETAS

const planets = []

const planetColors = [

  0xff66cc,
  0x66ccff,
  0xffcc66,
  0x99ff99,
  0xcc99ff

]

for(let i = 0; i < 5; i++){

  const geometry =
    new THREE.SphereGeometry(
      Math.random() * 1.5 + 0.8,
      32,
      32
    )

  const material =
    new THREE.MeshBasicMaterial({

      color:
        planetColors[i]

    })

  const planet =
    new THREE.Mesh(
      geometry,
      material
    )

  const distance =
    18 + i * 6

  planet.userData = {

    angle:
      Math.random() * Math.PI * 2,

    distance,

    speed:
      0.002 + Math.random() * 0.003

  }

  scene.add(planet)

  planets.push(planet)
}

// CORAZONES

const heartsGroup =
  new THREE.Group()

for(let i = 0; i < 120; i++){

  const canvas =
    document.createElement('canvas')

  const ctx =
    canvas.getContext('2d')

  canvas.width = 128
  canvas.height = 128

  ctx.font = '60px Arial'
  ctx.textAlign = 'center'

  ctx.fillText(
    '❤️',
    64,
    64
  )

  const texture =
    new THREE.CanvasTexture(canvas)

  const material =
    new THREE.SpriteMaterial({

      map: texture,
      transparent: true

    })

  const heart =
    new THREE.Sprite(material)

  heart.position.set(

    (Math.random() - 0.5) * 80,

    (Math.random() - 0.5) * 40,

    (Math.random() - 0.5) * 80

  )

  const scale =
    Math.random() * 1.2 + 0.4

  heart.scale.set(
    scale,
    scale,
    1
  )

  heartsGroup.add(heart)
}

scene.add(heartsGroup)

// ESTRELLAS FUGACES

const shootingStars = []

for(let i = 0; i < 8; i++){

  const geometry =
    new THREE.BufferGeometry()

  const positions =
    new Float32Array([0,0,0])

  geometry.setAttribute(

    'position',

    new THREE.BufferAttribute(
      positions,
      3
    )
  )

  const material =
    new THREE.PointsMaterial({

      color: 0xffffff,
      size: 0.25

    })

  const star =
    new THREE.Points(
      geometry,
      material
    )

  star.position.set(

    (Math.random() - 0.5) * 150,

    Math.random() * 60,

    (Math.random() - 0.5) * 150

  )

  star.userData = {

    speed:
      0.5 + Math.random()

  }

  scene.add(star)

  shootingStars.push(star)
}

// ANIMACION

function animate(){

  requestAnimationFrame(animate)

  galaxyGroup.rotation.y += 0.0015

  stars.rotation.y += 0.0002
  // ANIMACION PLANETAS

planets.forEach((planet) => {

  planet.userData.angle +=
    planet.userData.speed

  planet.position.x =

    Math.cos(
      planet.userData.angle
    ) *

    planet.userData.distance

  planet.position.z =

    Math.sin(
      planet.userData.angle
    ) *

    planet.userData.distance
})

// CORAZONES MOVIMIENTO

heartsGroup.rotation.y += 0.0008

// ESTRELLAS FUGACES

shootingStars.forEach((star) => {

  star.position.x +=
    star.userData.speed

  star.position.y -=
    star.userData.speed * 0.3

  if(star.position.x > 100){

    star.position.x = -100

    star.position.y =
      Math.random() * 60
  }
})

  controls.update()

  renderer.render(scene, camera)
}

animate()

// RESPONSIVE

window.addEventListener(
  'resize',
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight

    camera.updateProjectionMatrix()

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    )
  }
)
