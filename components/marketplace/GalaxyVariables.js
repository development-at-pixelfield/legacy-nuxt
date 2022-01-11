// Get URL parameter for star age and apply

const GalaxyVariables = {
  // TODO: Star luminosity, file URLs (model+textures)

  uid: "",
  assetsPath: "/",
  useLocal: false,

  starAges: {
    O: "purple", // purple
    B: "blue", // blue
    F: 0x808080, // white
    G: "yellow", // yellow
    K: "orange", // orange
    M: "red", // red
  },

  currentStar: {
    age: "red",
    luminosity: 1,
    modelPath: "",
  },

  bloomParams: {
    exposure: 1,
    bloomStrength: 2.5,
    bloomThreshold: 0.04,
    bloomRadius: 0,
  },

  setData(data) {
    if (data.age && data.luminosity && data.model_file) {
      GalaxyVariables.currentStar.age =
        GalaxyVariables.starAges[data.age.toUpperCase()];
      GalaxyVariables.currentStar.luminosity = data.luminosity;
      GalaxyVariables.currentStar.modelPath = data.model_file;
      return;
    }
    console.error(
      "API Data does not contain age, luminosity or model_file property."
    );
  },
};

export default GalaxyVariables;
