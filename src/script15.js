import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {RectAreaLightHelper} from "three/examples/jsm/helpers/RectAreaLightHelper";

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg')
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg')

/**
 * Base
 */
// Debug
const gui = new dat.GUI({autoPlace: true})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */

// Ambient Light

const ambientLight = new THREE.AmbientLight(0xffffff, 0.33)
  gui.add(ambientLight, 'intensity', 0, 1, 0.01).name('ambient intens')
scene.add(ambientLight)

// Directional Light

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(0, 0, 0)
directionalLight.lookAt(new THREE.Vector3())
  gui.add(directionalLight, 'intensity', 0, 1, 0.001).name('dirLight intens')
  gui.add(directionalLight.position, 'x', -5, 5, 0.001).name('dirLight x')
  gui.add(directionalLight.position, 'y', -5, 5, 0.001).name('dirLight y')

  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 1024
  directionalLight.shadow.mapSize.height = 1024

  directionalLight.shadow.camera.top = 2
  directionalLight.shadow.camera.right= 2
  directionalLight.shadow.camera.bottom = -2
  directionalLight.shadow.camera.left = -2
  directionalLight.shadow.camera.near = 10
  directionalLight.shadow.camera.far = 6
  directionalLight.shadow.radius = 10


  const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
  gui.add(directionalLightCameraHelper, 'visible').name('dirLightCameraHelper')
  scene.add(directionalLightCameraHelper)


  scene.add(directionalLight)

// Spot Light
const spotLight = new THREE.SpotLight(0xffffff, 0.4, 10, Math.PI * 0.3)
  spotLight.castShadow = true
  spotLight.shadow.mapSize.width = 1024
  spotLight.shadow.mapSize.height = 1024
  spotLight.shadow.camera.fov = 30
  spotLight.shadow.camera.near = 1
  spotLight.shadow.camera.far = 6
  spotLight.position.set(2,2, 0)

  const spotLightLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)

  // scene.add(spotLightLightCameraHelper)

// scene.add(spotLight)
// scene.add(spotLight.target)

// Point Light
const pointLight = new THREE.PointLight(0xffffff, 0.3)
  pointLight.castShadow = true
  pointLight.shadow.mapSize.width = 1024
  pointLight.shadow.mapSize.height = 1024
  pointLight.shadow.camera.near = 0.1
  pointLight.shadow.camera.far = 5

  pointLight.position.set(0,0,1.5)

  const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
  // scene.add(pointLightCameraHelper)
// scene.add(pointLight)

// const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
// scene.add(hemisphereLight)
//
// const pointLight = new THREE.PointLight(0xff9000, 0.5, 10)
//   pointLight.position.set(1, -0.5, 0)
// scene.add(pointLight)
//
// const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 2)
//   rectAreaLight.position.set(-1.5, 0, 1.5)
//   rectAreaLight.lookAt(new THREE.Vector3())
// scene.add(rectAreaLight)
//
// const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.1, 1)
//   spotLight.position.set(0, 2, 3)
// scene.add(spotLight)






// Helpers
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
// scene.add(hemisphereLightHelper)
//
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
// scene.add(pointLightHelper)
//
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
// scene.add(directionalLightHelper)
//
// const spotLightHelper = new THREE.SpotLightHelper(spotLight)
// scene.add(spotLightHelper)
//
// const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
// scene.add(rectAreaLightHelper)

window.requestAnimationFrame(() => {
  // rectAreaLightHelper.position.copy(rectAreaLight.position)
  // rectAreaLightHelper.quaternion.copy(rectAreaLight.quaternion)
  // rectAreaLightHelper.position.x = rectAreaLight.position.x
  // rectAreaLightHelper.position.y = rectAreaLight.position.y
  // rectAreaLightHelper.position.z = rectAreaLight.position.z
  // rectAreaLightHelper.update()
})

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
  material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 32, 32),
    material
)
sphere.castShadow = true
sphere.position.set(0,0.5,0)

const cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.75, 0.75, 0.75),
    material
)
cube.castShadow = true

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 32, 64),
    material
)
torus.castShadow = true
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(5, 5),
    material
)
plane.receiveShadow = true
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5

const sphereShadow = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1.5,1.5),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      alphaMap: simpleShadow
    })
)

sphereShadow.rotation.x = - Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01
console.log(sphereShadow.position)


// const group = new THREE.Group()
// gui.add(group.position, 'x' -5, 5, 0.001).name('groupPos x') // why error
// gui.add(group.position, 'y' -5, 5, 0.001).name('groupPos y')
// gui.add(group.position, 'z' -5, 5, 0.001).name('groupPos z')
//   group.add(sphere, cube, torus)

scene.add(sphere, plane, sphereShadow)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
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
  camera.position.x = 1
  camera.position.y = 1
  camera.position.z = 2
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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects

  // Update the sphere
  sphere.position.x = Math.cos(elapsedTime) * 1.5
  sphere.position.z = Math.sin(elapsedTime) * 1.5
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))
  // cube.rotation.y = 0.1 * elapsedTime
  // torus.rotation.y = 0.1 * elapsedTime

  // sphere.rotation.x = 0.15 * elapsedTime
  // cube.rotation.x = 0.15 * elapsedTime
  // torus.rotation.x = 0.15 * elapsedTime


  // Update Shadow
  sphereShadow.position.x = sphere.position.x
  sphereShadow.position.z = sphere.position.z
  sphereShadow.material.opacity = (1 - Math.abs(sphere.position.y)) * 0.3
  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()