import * as THREE from "three";
import LegacyVariables from "./LegacyVariables";

const textureLoader = new THREE.TextureLoader();
let variant = window.location.pathname.split("/");
variant = "0" + variant[variant.length - 2];

const LegacyMaterials = {
  textures: {
    CardBC: textureLoader.load(
      LegacyVariables.assetsPath + "/webgl/textures/mrazek2/T_Card_BC.png"
    ),
    CardM: textureLoader.load(
      LegacyVariables.assetsPath + "/webgl/textures/mrazek2/T_Card_M.png"
    ),
    CardN: textureLoader.load(
      LegacyVariables.assetsPath + "/webgl/textures/mrazek2/T_Card_N.png"
    ),
    CardR: textureLoader.load(
      LegacyVariables.assetsPath + "/webgl/textures/mrazek2/T_Card_R.png"
    ),

    FrameBC: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/frames/" +
        variant +
        "/T_Frame_BC_" +
        variant +
        ".png"
    ),
    FrameM: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/frames/" +
        variant +
        "/T_Frame_M_" +
        variant +
        ".png"
    ),
    FrameN: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/frames/" +
        variant +
        "/T_Frame_N_" +
        variant +
        ".png"
    ),
    FrameR: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/frames/" +
        variant +
        "/T_Frame_R_" +
        variant +
        ".png"
    ),

    NameBC: textureLoader.load(
      LegacyVariables.assetsPath + "/webgl/textures/mrazek2/T_Name_BC.png"
    ),
    NameR: textureLoader.load(
      LegacyVariables.assetsPath + "/webgl/textures/mrazek2/T_Name_BC.png"
    ),

    PersonBC: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/mrazek2/T_Person_BC_" +
        variant +
        ".png"
    ),
    PersonM: textureLoader.load(
      LegacyVariables.assetsPath + "/webgl/textures/mrazek2/T_Person_M.png"
    ), //
    PersonR: textureLoader.load(
      LegacyVariables.assetsPath + "/webgl/textures/mrazek2/T_Person_R.png"
    ), //

    SignatureBC: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/mrazek2/T_Signature_BC_" +
        variant +
        ".png"
    ),
    SignatureR: textureLoader.load(
      LegacyVariables.assetsPath + "/webgl/textures/mrazek2/T_Signature_R.png"
    ),

    BackgroundBC: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/mrazek2/T_Background_BC_" +
        variant +
        ".png"
    ),
    BackgroundR: textureLoader.load(
      LegacyVariables.assetsPath + "/webgl/textures/mrazek2/T_Background_R.png"
    ),
  },

  card: new THREE.MeshStandardMaterial({
    map: textureLoader.load(
      LegacyVariables.assetsPath + "/webgl/textures/mrazek2/T_Card_BC.png"
    ),
    metalnessMap: textureLoader.load(
      LegacyVariables.assetsPath + "/webgl/textures/mrazek2/T_Card_M.png"
    ),
    roughnessMap: textureLoader.load(
      LegacyVariables.assetsPath + "/webgl/textures/mrazek2/T_Card_R.png"
    ),
    normalMap: textureLoader.load(
      LegacyVariables.assetsPath + "/webgl/textures/mrazek2/T_Card_N.png"
    ),
    color: 0xffffff,
    roughness: 1.0,
    metalness: 1.5,
  }),

  frame: new THREE.MeshStandardMaterial({
    map: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/frames/" +
        variant +
        "/T_Frame_BC_" +
        variant +
        ".png"
    ),
    metalnessMap: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/frames/" +
        variant +
        "/T_Frame_M_" +
        variant +
        ".png"
    ),
    roughnessMap: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/frames/" +
        variant +
        "/T_Frame_R_" +
        variant +
        ".png"
    ),
    normalMap: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/frames/" +
        variant +
        "/T_Frame_N_" +
        variant +
        ".png"
    ),
    transparent: true,
    color: 0xffffff,
    roughness: 1.0,
    metalness: 1.5,
  }),

  background: new THREE.MeshStandardMaterial({
    map: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/mrazek2/T_Background_BC_" +
        variant +
        ".png"
    ),
    emissiveMap: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/mrazek2/T_Background_BC_" +
        variant +
        ".png"
    ),
    emissive: 0xffffff,
    toneMapped: false,
    envMapIntensity: 0.0,
  }),

  person: new THREE.MeshStandardMaterial({
    map: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/mrazek2/T_Person_BC_" +
        variant +
        ".png"
    ),
    emissiveMap: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/mrazek2/T_Person_BC_" +
        variant +
        ".png"
    ),
    emissive: 0xffffff,
    transparent: true,
    toneMapped: false,
    envMapIntensity: 0.0,
  }),

  name: new THREE.MeshStandardMaterial({
    map: textureLoader.load(
      LegacyVariables.assetsPath + "/webgl/textures/mrazek2/T_Name_BC.png"
    ),
    emissiveMap: textureLoader.load(
      LegacyVariables.assetsPath + "/webgl/textures/mrazek2/T_Name_BC.png"
    ),
    emissive: 0xffffff,
    transparent: true,
    toneMapped: false,
    envMapIntensity: 0.0,
  }),

  signature: new THREE.MeshStandardMaterial({
    map: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/mrazek2/T_Signature_BC_" +
        variant +
        ".png"
    ),
    emissiveMap: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/mrazek2/T_Signature_BC_" +
        variant +
        ".png"
    ),
    emissive: 0xffffff,
    transparent: true,
    toneMapped: false,
    envMapIntensity: 0.0,
    blending: THREE.AdditiveBlending,
  }),

  logo: new THREE.MeshStandardMaterial({
    map: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/logo/T_Background_logo_BC.png"
    ),
    emissiveMap: textureLoader.load(
      LegacyVariables.assetsPath +
        "/webgl/textures/logo/T_Background_logo_BC.png"
    ),
    emissive: 0x444433,
    transparent: true,
    toneMapped: false,
    envMapIntensity: 0.0,
  }),

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
};

export default LegacyMaterials;
