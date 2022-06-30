<template>
  <div id="canvasContainer"></div>
</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import * as TWEEN from "@tweenjs/tween.js";
import Stats from "~/webgl/js/legacy/stats.js";

// Internal modules
import LegacyShaders from "~/webgl/js/legacy/LegacyShaders.js";
import LegacyVariables from "~/webgl/js/legacy/LegacyVariables.js";
import LegacyMaterials from "~/webgl/js/legacy/LegacyMaterials.js";
export default {
  name: "WebGl",
  props: {
    nft: {
      type: Object,
      default: () => {},
    },
    canInteract: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scene: null,
      loader: null,
      textureLoader: null,
      camera: null,
      canvas: null,
      renderer: null,
      bloomPass: null,
      finalComposer: null,
      bloomComposer: null,
      controls: null,
      renderScene: null,
      stats: null,
    };
  },
  watch: {
    canInteract(val) {
      const container = document.getElementById("canvasContainer");
      if (!val) {
        container.style.overflow = "hidden";
        container.style.pointerEvents = "all";
      } else {
        container.style.overflow = "auto";
        container.style.pointerEvents = "none";
      }
    },
  },
  mounted() {
    // Scene and loaders setup
    this.scene = new THREE.Scene();

    const dracoLoader = new DRACOLoader().setDecoderPath(
      LegacyVariables.assetsPath
    );
    this.loader = new GLTFLoader();
    this.loader.setDRACOLoader(dracoLoader);

    this.textureLoader = new THREE.TextureLoader();

    LegacyMaterials.logo = new THREE.MeshStandardMaterial({
      map: this.textureLoader.load(
        "../../../textures/logo/T_Background_logo_BC.png"
      ),
      emissiveMap: this.textureLoader.load(
        "../../../textures/logo/T_Background_logo_BC.png"
      ),
      emissive: 0x444433,
      transparent: true,
      toneMapped: false,
      envMapIntensity: 0.0,
    });

    const hdrLoader = new RGBELoader();

    // Scene background
    hdrLoader.load("../../../hdri/snow.hdr", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.environment = texture;
    });

    this.renderer = new THREE.WebGLRenderer({ antialias: false });
    this.canvas = this.renderer.domElement;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.5;
    LegacyVariables.canvasContainer =
      document.getElementById("canvasContainer");
    LegacyVariables.canvasContainer.appendChild(this.canvas);

    this.camera = new THREE.PerspectiveCamera(
      45,
      this.canvas.clientWidth / this.canvas.clientHeight,
      1,
      10000
    );
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.03;
    this.controls.maxPolarAngle = (Math.PI * 1.1) / 2;
    this.controls.minDistance = 7.2;
    this.controls.maxDistance = 20;
    this.controls.enablePan = false;
    this.controls.update();

    this.camera.position.set(0, 0, 15);
    this.scene.add(this.camera);

    // PostProcess and Render Pass
    this.renderScene = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.canvas.clientWidth, this.canvas.clientHeight),
      1.5,
      0.4,
      0.85
    );
    this.bloomPass.threshold = LegacyVariables.bloomParams.bloomThreshold;
    this.bloomPass.strength = LegacyVariables.bloomParams.bloomStrength;
    this.bloomPass.radius = LegacyVariables.bloomParams.bloomRadius;

    this.bloomComposer = new EffectComposer(this.renderer);
    this.bloomComposer.renderToScreen = false;
    this.bloomComposer.addPass(this.renderScene);
    this.bloomComposer.addPass(this.bloomPass);
    const finalPass = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: this.bloomComposer.renderTarget2.texture },
        },
        vertexShader: LegacyShaders.bloomVertexShader(),
        fragmentShader: LegacyShaders.bloomFragmentShader(),
        defines: {},
      }),
      "baseTexture"
    );
    finalPass.needsSwap = true;

    this.finalComposer = new EffectComposer(this.renderer);
    this.finalComposer.addPass(this.renderScene);
    this.finalComposer.addPass(finalPass);

    // Lights
    const backLight = new THREE.DirectionalLight(0xeeeeee, 0.05);
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.005);
    backLight.position.set(0, 0, -10);
    frontLight.position.set(0, 1, 10);
    this.scene.add(backLight);
    this.scene.add(frontLight);

    // Fetch API JSON
    let url;
    if (LegacyVariables.useLocal) {
      url =
        "https://api-legacy.bypixelfield.com/api/nfts/39822427-08d0-4981-8346-53d90634ee9a/";
    } else {
      const href = location.href;
      const urlParts = new URL(href).pathname.split("/");
      const urlLastSegment = urlParts.pop() || urlParts.pop();
      url =
        "https://api-legacy.bypixelfield.com/api/nfts/" + urlLastSegment + "/";
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        LegacyVariables.setData(data);
        LegacyMaterials.loadTexturesFromApi(data);
        this.setupParticles(this.scene);

        // Models
        this.loader.load(
          "../../../models/Card.glb",
          (gltf) => {
            gltf.scene.traverse((child) => {
              if (child.isMesh) {
                switch (child.name) {
                  case "Card_1": {
                    child.material = LegacyMaterials.card;
                    break;
                  }
                  case "Card_2": {
                    child.material = LegacyMaterials.background;
                    break;
                  }
                  case "Person": {
                    child.material = LegacyMaterials.person;
                    break;
                  }
                  case "Signature": {
                    child.material = LegacyMaterials.signature;
                    break;
                  }
                  case "Name": {
                    child.material = LegacyMaterials.name;
                    break;
                  }
                  case "Frame": {
                    child.material = LegacyMaterials.frame;
                    break;
                  }
                  default: {
                    child.material = LegacyMaterials.card;
                  }
                }
                LegacyVariables.cardMeshes.push(child);
                LegacyVariables.cardMaterials.push(child.material);
              }
            });
            gltf.scene.scale.set(45, 45, 45); // Scale the model up
            this.scene.add(gltf.scene);
          },
          undefined,
          function (error) {
            console.error(error);
          }
        );
      });

    // Background Logo
    this.loader.load(
      "../../../models/Logo.glb",
      (gltf) => {
        LegacyMaterials.flipLogoTextures();

        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            switch (child.name) {
              default: {
                child.material = LegacyMaterials.logo;
                LegacyVariables.logoMesh = child;
              }
            }
          }
        });

        gltf.scene.scale.set(45, 45, 45); // Scale the model up
        gltf.scene.position.set(0, 1, -30);
        this.scene.add(gltf.scene);

        // Animate the logo
        const tweenData = {
          opacity: 1.0,
        };

        new TWEEN.Tween(tweenData)
          .to(
            {
              opacity: 0.6,
            },
            2000
          )
          .easing(TWEEN.Easing.Linear.None)
          .repeat(Infinity)
          .yoyo(true)
          .onUpdate(function () {
            LegacyVariables.logoMesh.material.opacity = tweenData.opacity;
          })
          .start();
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    // Particles under card

    // GUI
    this.stats;
    if (LegacyVariables.showGUI) {
      const gui = new GUI();
      // FPS
      this.stats = new Stats();
      document.body.appendChild(this.stats.dom);
    }

    this.initCanvas();
  },
  methods: {
    resizeCanvas() {
      const { renderer, bloomComposer, canvas, finalComposer, camera } = this;
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      bloomComposer.setSize(canvas.clientWidth, canvas.clientHeight);
      finalComposer.setSize(canvas.clientWidth, canvas.clientHeight);

      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    },
    setupParticles() {
      const numParticles = LegacyVariables.AMOUNTX * LegacyVariables.AMOUNTY;
      const positions = new Float32Array(numParticles * 3);
      const scales = new Float32Array(numParticles);

      let i = 0;
      let j = 0;

      for (let ix = 0; ix < LegacyVariables.AMOUNTX; ix++) {
        for (let iy = 0; iy < LegacyVariables.AMOUNTY; iy++) {
          positions[i] =
            ix * LegacyVariables.SEPARATION -
            (LegacyVariables.AMOUNTX * LegacyVariables.SEPARATION) / 2; // x
          positions[i + 1] = 0; // y
          positions[i + 2] =
            iy * LegacyVariables.SEPARATION -
            (LegacyVariables.AMOUNTY * LegacyVariables.SEPARATION) / 2; // z

          scales[j] = 1;

          i += 3;
          j++;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: new THREE.Color(LegacyVariables.particleColor) },
        },
        vertexShader: LegacyShaders.particlesVertexShader(),
        fragmentShader: LegacyShaders.particlesFragmentShader(),
      });

      LegacyVariables.particles = new THREE.Points(geometry, material);
      LegacyVariables.particles.rotation.set(0, Math.PI / 4, 0);
      LegacyVariables.particles.position.set(0, -3.5, 0);
      this.scene.add(LegacyVariables.particles);
    },

    initCanvas() {
      const {
        renderer,
        bloomComposer,
        finalComposer,
        camera,
        controls,
        canvas,
      } = this;

      const containerWidth = LegacyVariables.canvasContainer.clientWidth;
      const containerHeight = LegacyVariables.canvasContainer.clientHeight;

      renderer.setSize(containerWidth, 133, false);
      bloomComposer.setSize(containerWidth, containerHeight);
      finalComposer.setSize(containerWidth, containerHeight);

      camera.aspect = containerWidth / containerHeight;
      camera.updateProjectionMatrix();

      window.addEventListener("resize", this.resizeCanvas());

      // Toggle orbit controls on event
      document.addEventListener("webglToggle", () => {
        if (controls.enabled) {
          controls.enabled = false;
          canvas.style.touchAction = "auto";
        } else {
          controls.enabled = true;
          canvas.style.touchAction = "none";
        }
      });

      setTimeout(() => {
        // this.resizeCanvas();
        this.animate(); // start animation loop
      }, 100);
    },
    animate() {
      const { stats, bloomComposer, controls, finalComposer } = this;
      stats ? stats.begin() : null;
      controls.update();

      if (LegacyVariables.particles) this.updateParticles();
      this.updateParallax();
      TWEEN.update();

      // Do not render some materials in bloom PP
      for (let i = 0; i < LegacyVariables.cardMeshes.length; i++) {
        LegacyVariables.cardMeshes[i].material = LegacyMaterials.dark;
      }
      bloomComposer.render();
      for (let i = 0; i < LegacyVariables.cardMeshes.length; i++) {
        LegacyVariables.cardMeshes[i].material =
          LegacyVariables.cardMaterials[i];
      }

      finalComposer.render();

      stats ? stats.end() : null;
      requestAnimationFrame(this.animate);
    },

    // Update particles position
    updateParticles() {
      const positions =
        LegacyVariables.particles.geometry.attributes.position.array;
      const scales = LegacyVariables.particles.geometry.attributes.scale.array;

      let i = 0;
      let j = 0;
      for (let ix = 0; ix < LegacyVariables.AMOUNTX; ix++) {
        for (let iy = 0; iy < LegacyVariables.AMOUNTY; iy++) {
          positions[i + 1] =
            Math.sin((ix + LegacyVariables.count) * 0.3) * 0.1 +
            Math.sin((iy + LegacyVariables.count) * 0.3) * 0.1;
          scales[j] =
            (Math.sin((ix + LegacyVariables.count) * 0.3) + 1.8) * 2 +
            (Math.sin((iy + LegacyVariables.count) * 0.3) + 1.8) * 2;
          i += 3;
          j++;
        }
      }

      LegacyVariables.particles.geometry.attributes.position.needsUpdate = true;
      LegacyVariables.particles.geometry.attributes.scale.needsUpdate = true;
      LegacyVariables.count += 0.05;
    },

    // Update the card layers position (parallax effect)
    updateParallax() {
      const { controls } = this;
      const moveX =
        ((controls.getPolarAngle() - Math.PI / 2) *
          LegacyVariables.parallaxForce) /
        LegacyVariables.parallaxMaxAngle;
      const moveY =
        (controls.getAzimuthalAngle() * LegacyVariables.parallaxForce) /
        LegacyVariables.parallaxMaxAngle;

      const movement = {
        y: -Math.min(Math.max(moveX, -1.0), 1.0),
        x: -Math.min(Math.max(moveY, -1.0), 1.0),
      };

      try {
        LegacyMaterials.background.map.offset.x = movement.x * 0.1;
        LegacyMaterials.background.map.offset.y = movement.y * 0.1;
        LegacyMaterials.background.emissiveMap.offset.x = movement.x * 0.1;
        LegacyMaterials.background.emissiveMap.offset.y = movement.y * 0.1;
        LegacyMaterials.background.needsUpdate = true;

        LegacyMaterials.name.map.offset.x = movement.x * 0.07;
        LegacyMaterials.name.map.offset.y = movement.y * 0.07;
        LegacyMaterials.name.emissiveMap.offset.x = movement.x * 0.07;
        LegacyMaterials.name.emissiveMap.offset.y = movement.y * 0.07;
        LegacyMaterials.name.needsUpdate = true;

        LegacyMaterials.person.map.offset.x = movement.x * 0.03;
        LegacyMaterials.person.map.offset.y = movement.y * 0.03;
        LegacyMaterials.person.emissiveMap.offset.x = movement.x * 0.03;
        LegacyMaterials.person.emissiveMap.offset.y = movement.y * 0.03;
        LegacyMaterials.person.needsUpdate = true;

        LegacyMaterials.signature.map.offset.x = movement.x * 0.005;
        LegacyMaterials.signature.map.offset.y = movement.y * 0.005;
        LegacyMaterials.signature.emissiveMap.offset.x = movement.x * 0.005;
        LegacyMaterials.signature.emissiveMap.offset.y = movement.y * 0.005;
        LegacyMaterials.signature.needsUpdate = true;
      } catch (e) {
        // Assets not yet loaded, just wait a little bit more
      }
    },
  },
};
</script>

<style lang="scss" scoped>
canvas {
  height: 100%;
}
#canvasContainer {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 530px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
