import * as THREE from "three";

export const InfiniteMirrorVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const InfiniteMirrorFragmentShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform vec3 uColorBase;
  uniform vec3 uColorAccent;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Horizon split: Upper area is deep dark void for perfect typography contrast
    // Lower area (below horizon 0.58) projects infinite perspective ground plane
    float horizonY = 0.58 + uMouse.y * 0.05;
    
    vec3 finalColor = uColorBase;
    
    // Ambient radial aura around center
    vec2 center = vec2(0.5 + uMouse.x * 0.05, horizonY);
    float radialDist = distance(uv, center);
    float glow = smoothstep(0.85, 0.0, radialDist) * 0.18;
    finalColor += uColorAccent * glow;

    if (uv.y < horizonY) {
      // Perspective projection onto ground plane
      float perspectiveDepth = 1.0 / max(0.015, (horizonY - uv.y) * 4.0);
      
      // X coordinate skewed by mouse cursor and perspective
      float groundX = (uv.x - 0.5 - uMouse.x * 0.08) * perspectiveDepth * 3.5;
      
      // Y coordinate moving infinitely with scroll and subtle time drift
      float groundZ = perspectiveDepth * 2.5 + uScroll * 12.0 + uTime * 0.15;
      
      vec2 gridUv = vec2(groundX, groundZ);
      
      // Draw crisp anti-aliased grid lines
      vec2 grid = abs(fract(gridUv - 0.5) - 0.5) / fwidth(gridUv);
      float line = min(grid.x, grid.y);
      float gridStrength = 1.0 - min(line, 1.0);
      
      // Linear depth fog fading into horizon and fading at bottom screen edge
      float depthFog = smoothstep(0.0, 0.45, horizonY - uv.y) * smoothstep(0.0, 0.15, uv.y);
      
      // Floor reflection sheen (mirror effect)
      vec3 mirrorColor = mix(uColorAccent, vec3(1.0), 0.25);
      finalColor += mirrorColor * gridStrength * depthFog * 0.35;
      
      // Ambient floor reflection gradient
      float floorSheen = pow(1.0 - uv.y / horizonY, 2.0) * 0.08;
      finalColor += uColorAccent * floorSheen;
    }

    // Subtle horizon laser accent line
    float horizonLine = smoothstep(0.006, 0.0, abs(uv.y - horizonY));
    finalColor += uColorAccent * horizonLine * 0.35;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function createInfiniteMirrorMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: InfiniteMirrorVertexShader,
    fragmentShader: InfiniteMirrorFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorBase: { value: new THREE.Color("#050505") },
      uColorAccent: { value: new THREE.Color("#FF9500") },
    },
    depthWrite: false,
    depthTest: false,
  });
}
