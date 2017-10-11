uniform sampler2D texture;
uniform float time;

varying vec2 vUv;

void main()
{
  vUv = uv;

  float ny = position.y + sin((position.x + time) * 60.0) * 6.0;
  float nz = position.z + sin((position.x + time) * 60.0) * 6.0;
  vec4 mvPosition = modelViewMatrix * vec4(position.x, ny, nz, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
