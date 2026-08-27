import * as THREE from "three";

export const BackgroundGradientVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const BackgroundGradientFragmentShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec3 uColorBase;
  uniform vec3 uColorAccentA;
  uniform vec3 uColorAccentB;
  varying vec2 vUv;

  // Simple pseudo-noise for organic ambient gradient drift
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vec2 uv = vUv;

    // Subtle drift with time and scroll
    float n = noise(uv * 2.5 + vec2(uTime * 0.05, uScrollProgress * 1.2));
    
    // Radial falloff from dynamic focal center
    vec2 center = vec2(0.5 + sin(uTime * 0.1) * 0.15, 0.6 + cos(uTime * 0.08) * 0.1);
    float dist = distance(uv, center);

    // Section-based dynamic color mixing
    vec3 accent = mix(uColorAccentA, uColorAccentB, smoothstep(0.1, 0.9, n));
    
    // Ambient glow mask
    float glow = smoothstep(0.9, 0.1, dist + n * 0.25) * 0.16;

    vec3 finalColor = mix(uColorBase, accent, glow);
    
    // Sub-pixel dither to prevent 8-bit color banding
    float dither = (hash(gl_FragCoord.xy) - 0.5) / 255.0;
    gl_FragColor = vec4(finalColor + dither, 1.0);
  }
`;

export function createBackgroundMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: BackgroundGradientVertexShader,
    fragmentShader: BackgroundGradientFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uScrollProgress: { value: 0 },
      uColorBase: { value: new THREE.Color("#050505") },
      uColorAccentA: { value: new THREE.Color("#FF9500") },
      uColorAccentB: { value: new THREE.Color("#10B981") },
    },
    depthWrite: false,
    depthTest: false,
  });
}
