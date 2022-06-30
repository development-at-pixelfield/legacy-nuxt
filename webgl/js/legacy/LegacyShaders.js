const LegacyShaders = {
  bloomVertexShader() {
    return `
            varying vec2 vUv;
    
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }
        `;
  },
  bloomFragmentShader() {
    return `
            uniform sampler2D baseTexture;
            uniform sampler2D bloomTexture;
    
            varying vec2 vUv;
    
            void main() {
                gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
            }
        `;
  },

  particlesVertexShader() {
    return `        
            attribute float scale;            
            varying vec4 vPosition;
    
            void main() {
                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                vPosition = vec4( position, 1.0 );
                gl_PointSize = scale * ( 7.0 / - mvPosition.z );
                gl_Position = projectionMatrix * mvPosition;
            }
        `;
  },
  particlesFragmentShader() {
    return `
            uniform vec3 color;
            varying vec4 vPosition;

			void main() {
				if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
				float dist = distance( vec4(0,0,0,0), vPosition );
				float fragAlpha = (10.0 - dist) * (0.2/dist);
				fragAlpha = clamp(fragAlpha, 0.0, 1.0);
				gl_FragColor = vec4( vec3(fragAlpha*color.r,fragAlpha*color.g,fragAlpha*color.b), 1.0 );
			}
        `;
  },
};

export default LegacyShaders;
