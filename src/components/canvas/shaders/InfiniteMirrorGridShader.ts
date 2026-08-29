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
  uniform float uIsDark;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Horizon line position modulated slightly by mouse
    float horizonY = 0.56 + uMouse.y * 0.04;
    vec3 finalColor = uColorBase;
    
    // Ambient radial lighting aura focused behind the Hero area
    vec2 lightCenter = vec2(0.5 + uMouse.x * 0.05, 0.65);
    float radialDist = distance(uv, lightCenter);
    float glowStrength = uIsDark > 0.5 ? 0.22 : 0.15;
    float glow = smoothstep(0.9, 0.0, radialDist) * glowStrength;
    
    if (uIsDark > 0.5) {
      finalColor += uColorAccent * glow;
    } else {
      finalColor = mix(finalColor, uColorAccent, glow * 0.55);
    }

    // ── Upper Hemisphere: Subtle Technical Sky Reticle Grid ──
    if (uv.y >= horizonY) {
      vec2 skyCoord = (uv - vec2(0.5, horizonY)) * vec2(28.0, 20.0);
      vec2 skyGrid = abs(fract(skyCoord - 0.5) - 0.5) / fwidth(skyCoord);
      float skyLine = min(skyGrid.x, skyGrid.y);
      float skyGridStrength = 1.0 - min(skyLine, 1.0);
      
      float skyFade = smoothstep(horizonY, 0.95, uv.y) * smoothstep(1.0, 0.7, uv.y);
      
      if (uIsDark > 0.5) {
        finalColor += uColorAccent * skyGridStrength * skyFade * 0.12;
      } else {
        vec3 skyLineColor = mix(vec3(0.3, 0.35, 0.4), uColorAccent, 0.3);
        finalColor = mix(finalColor, skyLineColor, skyGridStrength * skyFade * 0.18);
      }
    }

    // ── Lower Hemisphere: Infinite 3D Perspective Ground Plane ──
    if (uv.y < horizonY) {
      float perspectiveDepth = 1.0 / max(0.012, (horizonY - uv.y) * 4.2);
      float groundX = (uv.x - 0.5 - uMouse.x * 0.08) * perspectiveDepth * 3.6;
      float groundZ = perspectiveDepth * 2.8 + uScroll * 12.0 + uTime * 0.2;
      
      vec2 gridUv = vec2(groundX, groundZ);
      vec2 grid = abs(fract(gridUv - 0.5) - 0.5) / fwidth(gridUv);
      float line = min(grid.x, grid.y);
      float gridStrength = 1.0 - min(line, 1.0);
      
      float depthFog = smoothstep(0.0, 0.50, horizonY - uv.y) * smoothstep(0.0, 0.15, uv.y);
      
      if (uIsDark > 0.5) {
        vec3 mirrorColor = mix(uColorAccent, vec3(1.0), 0.25);
        finalColor += mirrorColor * gridStrength * depthFog * 0.30;
        float floorSheen = pow(1.0 - uv.y / horizonY, 2.0) * 0.06;
        finalColor += uColorAccent * floorSheen;
      } else {
        // Refined, subtle architectural grid for Day mode (non-distracting)
        vec3 gridLineColor = mix(vec3(0.32, 0.36, 0.42), uColorAccent, 0.30);
        finalColor = mix(finalColor, gridLineColor, gridStrength * depthFog * 0.20);
        float floorSheen = pow(1.0 - uv.y / horizonY, 2.0) * 0.04;
        finalColor = mix(finalColor, uColorAccent, floorSheen);
      }
    }

    // ── Subtle Horizon Dividing Line (Center-Feathered for Focus) ──
    // Peripheral fade: Horizon line fades out in the center column to avoid cutting through text
    float centerFade = smoothstep(0.12, 0.55, abs(uv.x - 0.5));
    float horizonHairline = smoothstep(0.003, 0.0, abs(uv.y - horizonY)) * centerFade;
    float horizonSoftGlow = smoothstep(0.06, 0.0, abs(uv.y - horizonY)) * 0.05;

    if (uIsDark > 0.5) {
      finalColor += uColorAccent * (horizonHairline * 0.22 + horizonSoftGlow);
    } else {
      finalColor = mix(finalColor, uColorAccent, horizonHairline * 0.15 + horizonSoftGlow * 0.6);
    }

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
      uColorBase: { value: new THREE.Color("#F8F9FA") },
      uColorAccent: { value: new THREE.Color("#1E4B8F") },
      uIsDark: { value: 0.0 },
    },
    depthWrite: false,
    depthTest: false,
  });
}
