<script setup>
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import cakeModel from "@/assets/cakefinal2.glb";

const container = ref(null);
const rotate = ref(true);

onMounted(() => {
  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.set(0, 7, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.physicallyCorrectLights = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  container.value.appendChild(renderer.domElement);

  // lights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight.position.set(5, 10, 7);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.set(2048, 2048);
  directionalLight.shadow.radius = 4;
  scene.add(directionalLight);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 0.3));

  const resize = () => {
    const width = container.value.clientWidth;
    const height = container.value.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  window.addEventListener("resize", resize);
  resize();

  let cake;
  const loader = new GLTFLoader();
  loader.load(
    cakeModel,
    (gltf) => {
      cake = gltf.scene;

      // center โมเดล
      const box = new THREE.Box3().setFromObject(cake);
      const center = box.getCenter(new THREE.Vector3());
      cake.position.sub(center); // ย้ายให้จุดกึ่งกลางอยู่ตรงกลาง scene

      scene.add(cake);

      // ฟังก์ชันทำให้โมเดล responsive
     const fitModelToScreen = () => {
  const box = new THREE.Box3().setFromObject(cake);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);

  // ระยะกล้องให้โมเดลเกือบเต็ม canvas
  let cameraDist = (maxDim / 2) / Math.tan(fov / 2);
  
  // ปรับ multiplier ให้โมเดลใหญ่ขึ้นเกือบเต็ม
  cameraDist *= 1.4; // 1.0 = พอดี, >1 = เล็กลง, <1 =ใหญ่ขึ้น

  // min/max ระยะสัมพันธ์กับขนาดโมเดล
  let minDist = maxDim * 0.7; 

  if (window.innerWidth <= 480) {
  // มือถือ → minDist เล็กกว่าปกติ
  minDist = maxDim * 1.7;
} 
  const maxDist = maxDim * 5;
  cameraDist = Math.min(Math.max(cameraDist, minDist), maxDist);

  // ปรับความสูงกล้องเล็กน้อย
  const yHeight = Math.min(5, cameraDist * 0.35);

  camera.position.set(0, yHeight, cameraDist);
  camera.lookAt(0, 0, 0);

  resize();
};




      fitModelToScreen();
      window.addEventListener("resize", fitModelToScreen);
    },
    undefined,
    (error) => console.error("Error loading model:", error)
  );

  const animate = () => {
    requestAnimationFrame(animate);
    if (cake && rotate.value) cake.rotation.y += 0.01;
    renderer.render(scene, camera);
  };
  animate();
});
</script>

<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50vh;
      width: 100%;
    "
  >
    <div ref="container" style="width: 100%; height: 100%"></div>
  </div>
</template>
