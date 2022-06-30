const LegacyVariables = {
  uid: "",
  assetsPath: "https://storage.googleapis.com/legacy-api-static/webgl/",
  // assetsPath: "~/webgl/assets/webgl/",
  variant: "01",
  useLocal: true,
  showGUI: false,
  canvasContainer: null,

  // Particles
  SEPARATION: 0.3,
  AMOUNTX: 100,
  AMOUNTY: 100,
  particles: 0,
  particleColor: 0xff00ff,
  count: 0,

  // Parallax
  parallaxForce: 1.0,
  parallaxMaxAngle: Math.PI / 2.2,

  // Card meshes
  cardMeshes: [],
  cardMaterials: [],

  // Logo mesh
  logoMesh: null,

  bloomParams: {
    bloomStrength: 3.0,
    bloomThreshold: 0.0,
    bloomRadius: 0.5,
  },

  setData(data) {
    if (!data.webgl) {
      console.error("API Data for WebGL does not contain webgl property.");
      return;
    }
    if (data.webgl.particle_color) {
      LegacyVariables.particleColor = data.webgl.particle_color;
    }
  },
};

export default LegacyVariables;
