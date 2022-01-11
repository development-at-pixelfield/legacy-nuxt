<template>
  <div id="container"></div>
</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
// Internal modules
import GalaxyShaders from "./GalaxyShaders.js";
import GalaxyVariables from "./GalaxyVariables.js";
import GalaxyMaterials from "./GalaxyMaterials.js";
export default {
  name: "WebGl",
  props: {
    nft: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      container: null,
      stats: null,
      params: {
        projection: "normal",
        autoRotate: true,
        reflectivity: 1,
        background: false,
        exposure: 0.3,
        gemColor: "White",
      },
      camera: null,
      scene: null,
      renderer: null,
      gemBackMaterial: null,
      gemFrontMaterial: null,
      objects: [],
      finalPass: null,
      goldMesh: null,
      finalComposer: null,
      bloomComposer: null,
    };
  },
  mounted() {
    this.init();
    this.animate();
    window.addEventListener("resize", this.onWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onWindowResize);
  },
  methods: {
    init() {
      const scene = new THREE.Scene();
      let goldMesh = null;
      const dracoLoader = new DRACOLoader().setDecoderPath(
        GalaxyVariables.assetsPath
      );
      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      const hdrLoader = new RGBELoader();
      hdrLoader.load("../../../HDRI_Nebula.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
      });

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(1.0);
      this.renderer.setSize(window.innerWidth - 17, 530);
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.toneMappingExposure = 1;
      const div = document.getElementById("container");
      div.appendChild(this.renderer.domElement);

      this.camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / 443,
        1,
        1000
      );
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.03;
      controls.update();

      this.camera.position.set(0, 0, 30);
      scene.add(this.camera);

      // PostProcess and Render Pass
      const renderScene = new RenderPass(scene, this.camera);
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5,
        0.4,
        0.85
      );
      bloomPass.threshold = GalaxyVariables.bloomParams.bloomThreshold;
      bloomPass.strength = GalaxyVariables.bloomParams.bloomStrength;
      bloomPass.radius = GalaxyVariables.bloomParams.bloomRadius;

      this.bloomComposer = new EffectComposer(this.renderer);
      this.bloomComposer.renderToScreen = false;
      this.bloomComposer.addPass(renderScene);
      this.bloomComposer.addPass(bloomPass);
      this.finalPass = new ShaderPass(
        new THREE.ShaderMaterial({
          uniforms: {
            baseTexture: { value: null },
            bloomTexture: { value: this.bloomComposer.renderTarget2.texture },
          },
          vertexShader: GalaxyShaders.bloomVertexShader(),
          fragmentShader: GalaxyShaders.bloomFragmentShader(),
          defines: {},
        }),
        "baseTexture"
      );
      this.finalPass.needsSwap = true;

      this.finalComposer = new EffectComposer(this.renderer);
      this.finalComposer.addPass(renderScene);
      this.finalComposer.addPass(this.finalPass);

      const dirLight = new THREE.DirectionalLight("white", 1.0);
      const dirLight2 = new THREE.DirectionalLight("white", 1.0);
      const dirLight3 = new THREE.DirectionalLight("white", 1.0);
      const dirLight4 = new THREE.DirectionalLight("white", 1.0);
      const dirLight5 = new THREE.DirectionalLight("white", 1.0);
      dirLight2.position.set(0, 0, 10);
      dirLight3.position.set(12, 0, 8);
      dirLight4.position.set(-12, 0, 8);
      dirLight4.position.set(-12, 0, 8);
      dirLight5.position.set(0, 0, -5);
      scene.add(dirLight);
      scene.add(dirLight2);
      scene.add(dirLight3);
      scene.add(dirLight4);
      scene.add(dirLight5);

      GalaxyVariables.setData(this.nft);
      loader.load(
        GalaxyVariables.currentStar.modelPath,
        function (gltf) {
          gltf.scene.rotation.set(0, 0, 0);
          gltf.scene.traverse(function (child) {
            if (child.isMesh) {
              // If the mesh is bear, assign the diamond/crystal material to it
              switch (child.name) {
                case "DMD_bear": {
                  child.material = GalaxyMaterials.diamond;
                  break;
                }
                case "GLD_honey": {
                  GalaxyMaterials.gold = child.material;
                  goldMesh = child;
                  break;
                }
                default: {
                  child.material = GalaxyMaterials.diamond;
                }
              }
            }
          });

          gltf.scene.scale.set(45, 45, 45); // Scale the model up
          scene.add(gltf.scene);
          hdrLoader.load("../../../HDRI_Diamond.hdr", function (texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            GalaxyMaterials.diamond.envMap = texture;
            GalaxyMaterials.diamond.needsUpdate = true;
          });
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );

      this.goldMesh = goldMesh;
    },

    onWindowResize() {
      console.log("8888888");
      const div = document.getElementById("header-img");
      const width = div.clientWidth;
      const height = 530;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      // if (window.innerWidth < 600) {
      //   return this.renderer.setSize(300, 300);
      // }

      this.renderer.setSize(width, height);
    },

    animate() {
      if (this.goldMesh) this.goldMesh.material = GalaxyMaterials.dark;
      this.bloomComposer.render();
      if (this.goldMesh) this.goldMesh.material = GalaxyMaterials.gold;
      this.finalComposer.render();
      requestAnimationFrame(this.animate);
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  position: absolute;
  top: 0;
}
</style>
