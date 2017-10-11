uniform sampler2D texture;
uniform float time;

varying vec2 vUv;

void main()
{
  gl_FragColor = texture2D(texture, vUv);
}
