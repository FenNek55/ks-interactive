export const vertexShader = `
  attribute float scale;
  void main() {

    vec4 mvPosition = modelViewMatrix * vec4( position, 2.0 );

    gl_PointSize = scale * ( 400.0 / - mvPosition.z );

    gl_Position = projectionMatrix * mvPosition;
  }
`

export const fragmentShader = `
  uniform vec3 color;

  void main() {
    if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.440 ) discard;
    gl_FragColor = vec4( color, 1.0 );
  }
`
