import * as THREE from "three";

export class ParticleFlowField {
  public mesh: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;
  private positions: Float32Array;
  private originalPositions: Float32Array;
  private colors: Float32Array;
  private count: number;

  constructor(cols = 40, rows = 40, spacing = 0.35) {
    this.count = cols * rows;
    this.positions = new Float32Array(this.count * 3);
    this.originalPositions = new Float32Array(this.count * 3);
    this.colors = new Float32Array(this.count * 3);

    const baseColor = new THREE.Color("#FF9500");
    const dimColor = new THREE.Color("#4B5563");

    let idx = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i - cols / 2) * spacing;
        const y = (j - rows / 2) * spacing;
        const z = 0;

        this.positions[idx * 3] = x;
        this.positions[idx * 3 + 1] = y;
        this.positions[idx * 3 + 2] = z;

        this.originalPositions[idx * 3] = x;
        this.originalPositions[idx * 3 + 1] = y;
        this.originalPositions[idx * 3 + 2] = z;

        // Subtle color variation across the field
        const mixed = dimColor.clone().lerp(baseColor, (i + j) / (cols + rows));
        this.colors[idx * 3] = mixed.r;
        this.colors[idx * 3 + 1] = mixed.g;
        this.colors[idx * 3 + 2] = mixed.b;

        idx++;
      }
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute("color", new THREE.BufferAttribute(this.colors, 3));

    this.material = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.mesh = new THREE.Points(this.geometry, this.material);
    this.mesh.rotation.x = 0.8;
  }

  public update(time: number, scrollProgress: number, mouseX: number, mouseY: number) {
    const pos = this.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < this.count; i++) {
      const ox = this.originalPositions[i * 3];
      const oy = this.originalPositions[i * 3 + 1];

      // Wave math with scroll acceleration
      const speed = 1.0 + scrollProgress * 2.5;
      const wave = Math.sin(time * speed + (ox + oy) * 1.5) * 0.25;
      const wave2 = Math.cos(time * 0.8 + ox * 2.0) * 0.15;

      pos[i * 3 + 2] = wave + wave2;
    }

    this.geometry.attributes.position.needsUpdate = true;

    // Fluid orientation reacting to scroll and cursor
    this.mesh.rotation.z = time * 0.05 + scrollProgress * 1.2;
    this.mesh.rotation.x = 0.8 + mouseY * 0.2 + scrollProgress * 0.4;
    this.mesh.rotation.y = mouseX * 0.25;
  }

  public setAccentColor(color: THREE.Color) {
    const dim = new THREE.Color("#374151");
    const colors = this.geometry.attributes.color.array as Float32Array;

    for (let i = 0; i < this.count; i++) {
      const ratio = (i % 40) / 40;
      const c = dim.clone().lerp(color, ratio);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    this.geometry.attributes.color.needsUpdate = true;
  }

  public dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
