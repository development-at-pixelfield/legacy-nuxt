import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

const LegacyMaterials = {
  card: new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1.0,
    metalness: 1.5,
  }),

  frame: new THREE.MeshStandardMaterial({
    transparent: true,
    color: 0xffffff,
    roughness: 1.0,
    metalness: 1.5,
  }),

  background: new THREE.MeshStandardMaterial({
    emissive: 0xffffff,
    toneMapped: false,
    envMapIntensity: 0.0,
  }),

  person: new THREE.MeshStandardMaterial({
    emissive: 0xffffff,
    transparent: true,
    toneMapped: false,
    envMapIntensity: 0.0,
  }),

  name: new THREE.MeshStandardMaterial({
    emissive: 0xffffff,
    transparent: true,
    toneMapped: false,
    envMapIntensity: 0.0,
  }),

  signature: new THREE.MeshStandardMaterial({
    emissive: 0xffffff,
    transparent: true,
    toneMapped: false,
    envMapIntensity: 0.0,
    blending: THREE.AdditiveBlending,
  }),

  logo: null,

  dark: new THREE.MeshBasicMaterial({ color: 0x000000, transparent: false }),

  flipCardTextures() {
    LegacyMaterials.card.map.flipY = false;
    LegacyMaterials.card.metalnessMap.flipY = false;
    LegacyMaterials.card.roughnessMap.flipY = false;
    LegacyMaterials.card.normalMap.flipY = false;

    LegacyMaterials.frame.map.flipY = false;
    LegacyMaterials.frame.metalnessMap.flipY = false;
    LegacyMaterials.frame.roughnessMap.flipY = false;
    LegacyMaterials.frame.normalMap.flipY = false;

    LegacyMaterials.background.map.flipY = false;
    LegacyMaterials.background.emissiveMap.flipY = false;

    LegacyMaterials.person.map.flipY = false;
    LegacyMaterials.person.emissiveMap.flipY = false;

    LegacyMaterials.name.map.flipY = false;
    LegacyMaterials.name.emissiveMap.flipY = false;

    LegacyMaterials.signature.map.flipY = false;
    LegacyMaterials.signature.emissiveMap.flipY = false;
  },

  flipLogoTextures() {
    LegacyMaterials.logo.map.flipY = false;
    LegacyMaterials.logo.emissiveMap.flipY = false;
  },

  loadTexturesFromApi(data) {
    if (!data.webgl) {
      console.error("API Data for WebGL does not contain webgl property.");
      return;
    }

    // Card
    LegacyMaterials.card.map = textureLoader.load(data.webgl.card_base_color);
    LegacyMaterials.card.metalnessMap = textureLoader.load(
      data.webgl.card_metallic
    );
    LegacyMaterials.card.roughnessMap = textureLoader.load(
      data.webgl.card_roughness
    );
    LegacyMaterials.card.normalMap = textureLoader.load(data.webgl.card_normal);

    // Frame
    LegacyMaterials.frame.map = textureLoader.load(data.webgl.frame_base_color);
    LegacyMaterials.frame.metalnessMap = textureLoader.load(
      data.webgl.frame_metallic
    );
    LegacyMaterials.frame.roughnessMap = textureLoader.load(
      data.webgl.frame_roughness
    );
    LegacyMaterials.frame.normalMap = textureLoader.load(
      data.webgl.frame_normal
    );

    // Background
    LegacyMaterials.background.map = textureLoader.load(
      data.webgl.background_base_color
    );
    LegacyMaterials.background.emissiveMap = textureLoader.load(
      data.webgl.background_base_color
    );
    // LegacyMaterials.background.roughnessMap = data.webgl.background_roughness;

    // Person
    LegacyMaterials.person.map = textureLoader.load(
      data.webgl.person_base_color
    );
    LegacyMaterials.person.emissiveMap = textureLoader.load(
      data.webgl.person_base_color
    );
    // LegacyMaterials.person.metalnessMap = data.webgl.person_metallic;

    // Name
    LegacyMaterials.name.map = textureLoader.load(data.webgl.name_base_color);
    LegacyMaterials.name.emissiveMap = textureLoader.load(
      data.webgl.name_base_color
    );
    // LegacyMaterials.name.roughnessMap = data.webgl.name_roughness;

    // Signature
    LegacyMaterials.signature.map = textureLoader.load(
      data.webgl.signature_base_color
    );
    LegacyMaterials.signature.emissiveMap = textureLoader.load(
      data.webgl.signature_base_color
    );
    // LegacyMaterials.signature.roughnessMap = data.webgl.signature_roughness;

    LegacyMaterials.flipCardTextures();
  },
};

export default LegacyMaterials;
