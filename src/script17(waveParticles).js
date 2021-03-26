import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {color} from "dat.gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/1.png')

/**
 * Particles
 */
// Geometry
// const particlesGeometry = new THREE.SphereBufferGeometry(1, 32,32)
const geometry = new THREE.BufferGeometry();  // empty geometry
const count = 20000; // кол-во частиц

const positionsArray = new Float32Array(count * 3) // empty array
const colorsArray = new Float32Array(count * 3) // empty array

for (let i = 0; i < count * 3; i++) { // заполнение массива x,y,z x,y,z x,y вершин ...
  positionsArray[i] = (Math.random() - 0.5) * 10
  colorsArray[i] = Math.random()
}
geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positionsArray, 3)
)

geometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colorsArray, 3)
)

console.log(geometry.attributes)

//Material
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  color: new THREE.Color('#ff88cc'),
  map: particleTexture,
  transparent: true,
  alphaMap: particleTexture,
  // depthTest: false
  // alphaTest: 0.001
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true
})


// Points particle
const particles = new THREE.Points(geometry,particlesMaterial)
// particles.position.set(2.2,2.1,2.7)
gui.add(particles.position, 'x',-5,5,0.001).name('particles-x')
gui.add(particles.position, 'y',-5,5,0.001).name('particles-y')
gui.add(particles.position, 'z',-5,5,0.001).name('particles-z')
scene.add(particles)

// Cube

// const cube = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(),
//     new THREE.MeshBasicMaterial()
// )
// cube.position.set(0,0,0)
// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>
{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
gui.add(camera.position, 'x',-5,5,0.001).name('camera-x')
gui.add(camera.position, 'y',-5,5,0.001).name('camera-y')
gui.add(camera.position, 'z',-5,5,0.001).name('camera-z')
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
  const elapsedTime = clock.getElapsedTime()

  // update particles

  for(let i = 0; i < count; i++) {
    const i3 = i * 3
    const x = geometry.attributes.position.array[i3]
    geometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
  }

  geometry.attributes.position.needsUpdate = true

  // particles.rotation.y = elapsedTime * 0.02

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()