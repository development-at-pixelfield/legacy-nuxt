import * as THREE from "three";
import GalaxyVariables from "./GalaxyVariables";

// const textureLoader = new THREE.TextureLoader();

const GalaxyMaterials = {
  diamond: new THREE.MeshPhysicalMaterial({
    color: GalaxyVariables.currentStar.age,
    emissive: 0x000000,
    roughness: 0.1,
    transmission: 1.0,
    thickness: 0.3,
    reflectivity: 0.15,
    specularIntensity: 0.8,
    metalness: 0.3,
    clearcoat: 0.5,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
    ior: 1.145,
  }),

  // TODO: Textures must be loaded based on parameter - name of mesh/material.
  gold: null,
  dark: new THREE.MeshBasicMaterial({ color: 0x000000 }),
};

export default GalaxyMaterials;
