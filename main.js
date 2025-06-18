import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

// Setup básico
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Iluminación
scene.add(new THREE.AmbientLight(0xffffff, 0.3));

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 5, 5);
scene.add(pointLight);

// Animación de cámara
let angle = 0;
function animateCamera() {
  angle += 0.005;
  camera.position.x = Math.sin(angle) * 5;
  camera.position.z = Math.cos(angle) * 5;
  camera.lookAt(0, 0, 0);
}

// Cargar y aplicar escena
async function loadSceneFromJSON() {
  try {
    const res = await fetch("scene.json");
    const json = await res.json();

    // Eliminar todos los objetos excepto luces
    scene.children = scene.children.filter((obj) => !obj.isMesh);

    for (const obj of json.objects) {
      let geometry;
      switch (obj.type) {
        case "sphere":
          geometry = new THREE.SphereGeometry(obj.size || 1, 32, 32);
          break;
        case "cube":
          geometry = new THREE.BoxGeometry(obj.size, obj.size, obj.size);
          break;
        case "cone":
          geometry = new THREE.ConeGeometry(obj.size, obj.size * 2, 32);
          break;
        default:
          continue;
      }

      const materialType = obj.material || "standard";
      let material;

      if (materialType === "basic") {
        material = new THREE.MeshBasicMaterial({ color: obj.color });
      } else if (materialType === "physical") {
        material = new THREE.MeshPhysicalMaterial({
          color: obj.color,
          roughness: obj.roughness ?? 0.5,
          metalness: obj.metalness ?? 0.5,
          reflectivity: 1,
          clearcoat: 0.3,
        });
      } else {
        material = new THREE.MeshStandardMaterial({
          color: obj.color,
          roughness: obj.roughness ?? 0.5,
          metalness: obj.metalness ?? 0.5,
        });
      }

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...obj.position);
      scene.add(mesh);
    }
  } catch (err) {
    console.error("Error cargando escena:", err);
  }
}

// Loop de render
function animate() {
  requestAnimationFrame(animate);
  animateCamera();
  renderer.render(scene, camera);
}
animate();

// Cargar cada 3 segundos
loadSceneFromJSON();
setInterval(loadSceneFromJSON, 3000);
