// Salon Academy 3D Procedure Labs — guided tool & technique demos (Three.js, no assets).
// Every module maps to a relevant demo: real tools (shears, IR irons, dryers, HF, LED,
// microcurrent, foils, balayage boards, scales, pH bench…) + step-by-step procedure guidance.
(function () {
  let booted = false, spinning = true, stepIdx = 0;
  let registry = [];   // {mat, step}
  let tickers = [];    // fn(t)
  let SCENE = null;    // current SCENES entry
  let rootRef = null;

  // ---------- helpers ----------
  function H_(root) {
    const H = {
      mat(color, step, opts) {
        const m = new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.55, metalness: 0.15 }, opts || {}));
        registry.push({ mat: m, step: step == null ? -1 : step });
        return m;
      },
      label(txt, x, y, z, color, s) {
        const c = document.createElement('canvas'); c.width = 256; c.height = 64;
        const g = c.getContext('2d'); g.font = 'bold 25px sans-serif';
        g.textAlign = 'center'; g.fillStyle = color || '#fff'; g.fillText(txt, 128, 42);
        const t = new THREE.CanvasTexture(c);
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true, depthTest: false }));
        sp.position.set(x, y, z); const k = s || 1; sp.scale.set(1.7 * k, 0.42 * k, 1);
        root.add(sp); return sp;
      },
      box(w, h, d, color, step, x, y, z) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), H.mat(color, step));
        m.position.set(x, y, z); root.add(m); return m;
      },
      cyl(rt, rb, h, color, step, x, y, z, seg) {
        const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 20), H.mat(color, step));
        m.position.set(x, y, z); root.add(m); return m;
      },
      sph(r, color, step, x, y, z) {
        const m = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 14), H.mat(color, step));
        m.position.set(x, y, z); root.add(m); return m;
      },
      tor(r, t, color, step, x, y, z, rx) {
        const m = new THREE.Mesh(new THREE.TorusGeometry(r, t, 10, 32), H.mat(color, step));
        m.position.set(x, y, z); if (rx) m.rotation.x = rx; root.add(m); return m;
      },
      seg(points, color, step) {
        const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),
          new THREE.LineBasicMaterial({ color }));
        root.add(l); return l;
      },
      bottle(bodyC, capC, x, y, z, h, tag, step) {
        const g = new THREE.Group();
        const b = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, h || 0.55, 16), H.mat(bodyC, step));
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 12), H.mat(capC == null ? 0x23272f : capC, step));
        cap.position.y = (h || 0.55) / 2 + 0.08; g.add(b); g.add(cap);
        g.position.set(x, y, z); root.add(g);
        if (tag) H.label(tag, x, y + (h || 0.55) / 2 + 0.38, z, '#fff', 0.72);
        return g;
      },
      head(x, y, z, s, step) {
        const g = new THREE.Group();
        const h = new THREE.Mesh(new THREE.SphereGeometry(0.8, 28, 20), H.mat(0xe6b48c, step));
        h.scale.set(0.85, 1.05, 0.9); g.add(h);
        const n = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 0.7, 14), H.mat(0xdfa87e, step));
        n.position.y = -1.05; g.add(n);
        g.position.set(x, y, z); if (s) g.scale.setScalar(s); root.add(g);
        return g;
      },
      arrow(color, step, len) {
        const g = new THREE.Group(); const L = len || 0.7;
        const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, L, 8), H.mat(color, step));
        const hd = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.24, 10), H.mat(color, step));
        hd.position.y = L / 2 + 0.12; g.add(sh); g.add(hd); root.add(g); return g;
      },
      dots(n, spread, color, size) {
        const pos = new Float32Array(n * 3); const seed = [];
        for (let i = 0; i < n; i++) {
          pos[i * 3] = (Math.random() - 0.5) * spread[0];
          pos[i * 3 + 1] = (Math.random() - 0.5) * spread[1];
          pos[i * 3 + 2] = (Math.random() - 0.5) * spread[2];
          seed.push(Math.random() * 10);
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color, size: size || 0.05, transparent: true, opacity: 0.9 }));
        root.add(pts); return { pts, seed };
      }
    };
    return H;
  }

  function highlight(i) {
    registry.forEach(r => {
      if (r.step === i) { r.mat.emissive.setHex(0x9a7400); r.mat.emissiveIntensity = 0.6; }
      else { r.mat.emissive.setHex(0x000000); r.mat.emissiveIntensity = 0; }
    });
  }

  // ---------- step panel UI ----------
  function sceneKey() {
    const w = document.getElementById('threeWrap');
    if (!w) return null;
    return (w.dataset.course || '') + '-' + (w.dataset.idx || '');
  }
  function populateSteps() {
    const k = sceneKey(); if (!k || !SCENES[k]) return;
    SCENE = SCENES[k];
    const kick = document.getElementById('sceneKicker');
    if (kick) kick.textContent = '🔧 ' + SCENE.t;
    const plate = PLATE_BY_BUILDER[SCENE.b];
    const fig = document.getElementById('plateFig');
    const img = document.getElementById('plateImg');
    const cap = document.getElementById('plateCap');
    if (plate && fig && img) {
      img.onerror = () => { fig.style.display = 'none'; };
      img.src = '/img/plates/' + plate + '.png';
      if (cap) cap.textContent = PLATE_CAP[plate] || '';
    } else if (fig) fig.style.display = 'none';
    showStep(0);
  }
  function showStep(i) {
    if (!SCENE) return;
    stepIdx = Math.max(0, Math.min(SCENE.s.length - 1, i));
    const [t, d] = SCENE.s[stepIdx];
    const T = document.getElementById('stepTitle'), D = document.getElementById('stepDesc');
    if (T) T.textContent = (stepIdx + 1) + '/' + SCENE.s.length + ' · ' + t;
    if (D) D.textContent = d;
    const dots = document.getElementById('stepDots');
    if (dots) {
      dots.innerHTML = '';
      SCENE.s.forEach((_, j) => {
        const b = document.createElement('button');
        b.className = 'sdot' + (j === stepIdx ? ' on' : '');
        b.setAttribute('aria-label', 'step ' + (j + 1));
        b.addEventListener('click', () => showStep(j));
        dots.appendChild(b);
      });
    }
    highlight(stepIdx);
  }

  // ================= BUILDERS =================
  const BUILDERS = {
    // ---- HAIR ----
    station(R, H) {
      // styling chair
      H.cyl(0.42, 0.5, 0.16, 0x8b5cf6, 0, -1.1, -0.55, 0);           // base
      H.cyl(0.07, 0.07, 0.55, 0x9aa0ae, 0, -1.1, -0.2, 0);           // post
      const seat = H.box(0.95, 0.18, 0.9, 0x1f2937, 0, -1.1, 0.15, 0);
      const back = H.box(0.16, 0.9, 0.85, 0x1f2937, 0, -1.55, 0.65, 0);
      H.label('CHAIR + drape', -1.1, 1.45, 0, '#fff', 0.8);
      // basin
      H.tor(0.55, 0.12, 0xd8cfbc, 1, 1.15, 0.35, 0, Math.PI / 2.4);
      H.cyl(0.42, 0.3, 0.5, 0xf3ede0, 1, 1.15, -0.05, 0);
      H.label('BASIN 37-40°C', 1.15, 1.25, 0, '#fff', 0.8);
      // trolley: clean left / dirty right
      H.box(1.7, 0.08, 0.7, 0x0f766e, 2, 0, -0.85, -1.15);
      H.box(0.08, 0.8, 0.7, 0x0f766e, 2, -0.8, -0.45, -1.15);
      H.box(0.08, 0.8, 0.7, 0x0f766e, 2, 0.8, -0.45, -1.15);
      H.bottle(0x2dd4bf, null, -0.45, -0.5, -1.15, 0.5, 'CLEAN', 2);
      H.bottle(0xe11d48, null, 0.45, -0.5, -1.15, 0.5, 'DIRTY', 2);
      H.label('TROLLEY clean | dirty', 0, -1.25, -1.15, '#fff', 0.8);
      // shears: two blades + pivot + finger rings
      const b1 = H.box(1.1, 0.07, 0.12, 0xc9ccd4, 3, 0.4, 1.35, 0.6);
      const b2 = H.box(1.1, 0.07, 0.12, 0xb9bdc8, 3, 0.4, 1.35, 0.6);
      b1.rotation.z = 0.16; b2.rotation.z = -0.16;
      H.sph(0.09, 0xb45309, 3, 0.4, 1.35, 0.6);
      H.tor(0.14, 0.035, 0x8b5cf6, 3, -0.15, 1.18, 0.6, 0);
      H.tor(0.14, 0.035, 0x8b5cf6, 3, -0.15, 1.52, 0.6, 0);
      H.label('SHEARS pivot = control', 0.4, 2.0, 0.6, '#fff', 0.8);
    },

    strandLab(R, H) {
      // giant shaft: medulla core + cortex + cuticle scale rings
      H.cyl(0.16, 0.16, 2.4, 0xf3d9a4, 0, -0.9, 0.2, 0);
      H.cyl(0.34, 0.34, 2.4, 0xd9a066, 0, -0.9, 0.2, 0).material.transparent = true;
      for (let i = 0; i < 7; i++)
        H.tor(0.37, 0.045, 0xb97a3f, 0, -0.9, -0.8 + i * 0.34, 0, Math.PI / 2.15);
      H.label('CUTICLE scales', -0.9, 1.75, 0, '#fff', 0.8);
      H.label('CORTEX strength+colour', -0.9, -1.35, 0, '#fff', 0.8);
      // follicle bulb + sebaceous gland
      H.sph(0.34, 0xf472b6, 1, 0.75, -0.9, 0);
      H.cyl(0.1, 0.14, 0.7, 0xf9a8d4, 1, 0.75, -0.25, 0);
      H.sph(0.18, 0xfde68a, 1, 1.25, -0.35, 0);
      H.label('FOLLICLE + sebum gland', 1.0, 0.35, 0, '#fff', 0.8);
      // porosity float-test beaker
      const glass = H.cyl(0.45, 0.45, 1.0, 0x9fd8e8, 2, -0.1, -0.6, 1.35);
      glass.material.transparent = true; glass.material.opacity = 0.35;
      H.cyl(0.4, 0.4, 0.45, 0x38bdf8, 2, -0.1, -0.85, 1.35);
      H.box(0.5, 0.04, 0.04, 0x78350f, 2, -0.1, -0.35, 1.35);   // floating = low porosity
      H.label('FLOAT TEST sinks=porous', -0.1, 0.25, 1.35, '#fff', 0.8);
      // elasticity strand
      const pts = [];
      for (let i = 0; i <= 12; i++) pts.push(new THREE.Vector3(1.0 + i * 0.09, 0.9 + Math.sin(i * 1.2) * 0.06, 0.9));
      H.seg(pts, 0x2dd4bf, 3);
      H.label('STRETCH 30-50% + return', 1.55, 1.35, 0.9, '#fff', 0.8);
    },

    scalpScope(R, H) {
      // scalp disc
      const disc = H.cyl(1.5, 1.5, 0.18, 0xe6b48c, 0, 0, -0.2, 0, 36);
      // follicle openings grid
      for (let ix = -2; ix <= 2; ix++) for (let iz = -2; iz <= 2; iz++) {
        if ((ix + iz) % 3 === 0)
          H.cyl(0.07, 0.1, 0.12, 0x9a6a45, 0, ix * 0.5, -0.05, iz * 0.5, 10);
        else
          H.sph(0.05, 0x7c4a2d, 0, ix * 0.5, -0.06, iz * 0.5);
      }
      // flakes vs red flag lesions
      H.box(0.22, 0.02, 0.14, 0xffffff, 1, -0.7, -0.08, 0.6);
      H.box(0.18, 0.02, 0.12, 0xffffff, 1, 0.2, -0.08, -0.7);
      const flag1 = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 10), H.mat(0xe11d48, 2));
      flag1.position.set(0.8, 0.15, 0.6); R.add(flag1);
      const flag2 = flag1.clone(); flag2.position.set(-0.3, 0.15, 0.9); R.add(flag2);
      H.label('WHITE flakes = dandruff', -0.7, 0.5, 0.6, '#fff', 0.75);
      H.label('RED flags = refer out', 0.8, 0.65, 0.6, '#fff', 0.75);
      // trichoscope loupe ring + quadrant lines
      H.tor(0.85, 0.06, 0x0f766e, 0, 0, 0.75, 0, 0);
      H.cyl(0.06, 0.06, 0.9, 0x9aa0ae, 0, 1.15, 1.0, 0);
      H.label('TRICHOSCOPE loupe', 0, 1.85, 0, '#fff', 0.8);
      const q1 = H.box(3.0, 0.015, 0.03, 0x0f766e, 3, 0, -0.1, 0);
      const q2 = H.box(0.03, 0.015, 3.0, 0x0f766e, 3, 0, -0.1, 0);
      H.label('4 QUADRANTS + card', 0, -0.85, 1.35, '#fff', 0.8);
    },

    basinService(R, H) {
      // basin + neck rest
      H.tor(0.7, 0.14, 0xf3ede0, 0, 0, 0.1, 0, Math.PI / 2.3);
      H.cyl(0.5, 0.36, 0.6, 0xe9e2d2, 0, 0, -0.35, 0);
      H.box(0.5, 0.14, 0.3, 0x0f766e, 0, 0, 0.42, 0.62);   // neck rest
      H.label('BASIN 37-40°C wrist-tested', 0, 1.15, 0, '#fff', 0.8);
      // water flow particles
      const w = H.dots(60, [0.5, 0.9, 0.5], 0x38bdf8, 0.055);
      w.pts.position.set(0, 0.75, 0.1);
      tickers.push(t => {
        const p = w.pts.geometry.attributes.position;
        for (let i = 0; i < p.count; i++) {
          let y = p.getY(i) - 0.012;
          if (y < -0.45) y = 0.45;
          p.setY(i, y);
        }
        p.needsUpdate = true;
      });
      // shampoo bottles: cleanse 1 + 2
      H.bottle(0xfbbf24, null, -1.15, -0.4, 0.3, 0.6, 'WASH 1 lift oil', 1);
      H.bottle(0x2dd4bf, null, -1.15, -0.4, -0.45, 0.6, 'WASH 2 lather', 1);
      // 5 massage move markers along an arc
      const moves = ['effleurage', 'petrissage', 'friction', 'tapotement', 'finish'];
      moves.forEach((m, i) => {
        const a = (i / 4) * Math.PI - Math.PI / 2;
        H.sph(0.09, [0x8b5cf6, 0xec4899, 0xf59e0b, 0x0f766e, 0x38bdf8][i], 2,
          Math.cos(a) * 0.85, 0.55 + i * 0.02, 0.35 + Math.sin(a) * 0.2);
        if (i < 2) H.label(m, Math.cos(a) * 0.85, 0.85, 0.35, '#fff', 0.55);
      });
      H.label('5-MIN MASSAGE arc', 0.3, 1.0, 0.5, '#fff', 0.75);
      // conditioner + cool rinse
      H.bottle(0xa78bfa, null, 1.2, -0.4, 0.2, 0.6, 'MASK ends-up', 3);
      const cool = H.arrow(0x38bdf8, 3, 0.6); cool.position.set(1.2, 0.6, -0.5); cool.rotation.x = Math.PI;
      H.label('COOL seal rinse', 1.2, 1.2, -0.5, '#fff', 0.75);
    },

    shearSection(R, H) {
      // oversized shear anatomy
      const b1 = H.box(1.7, 0.09, 0.16, 0xd7dae1, 0, -0.5, 0.9, 0.9);
      const b2 = H.box(1.7, 0.09, 0.16, 0xc2c6d0, 0, -0.5, 0.9, 0.9);
      b1.rotation.z = 0.14; b2.rotation.z = -0.14;
      H.sph(0.11, 0xb45309, 0, -0.5, 0.9, 0.9);
      H.label('PIVOT screw', -0.5, 1.3, 0.9, '#fff', 0.75);
      H.tor(0.17, 0.045, 0x8b5cf6, 1, -1.35, 0.62, 0.9, 0);
      H.tor(0.17, 0.045, 0x8b5cf6, 1, -1.35, 1.18, 0.9, 0);
      H.label('THUMB moves · ring still', -1.35, 1.65, 0.9, '#fff', 0.75);
      // sectioned head: 4 quarters + horseshoe
      const g = H.head(1.15, 0.1, -0.6, 0.95, 2);
      const cols = [0x8b5cf6, 0xec4899, 0x0f766e, 0xf59e0b];
      for (let i = 0; i < 4; i++) {
        const a0 = i * Math.PI / 2;
        const wedge = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 0.1, 8, 1, false, a0, Math.PI / 2),
          H.mat(cols[i], 2));
        wedge.position.set(1.15, 1.0, -0.6); R.add(wedge);
      }
      H.tor(0.55, 0.06, 0xe11d48, 2, 1.15, 0.75, -0.6, 0);
      H.label('4/4 + HORSESHOE', 1.15, -1.25, -0.6, '#fff', 0.8);
      // 0° guide line
      const gl = H.box(1.9, 0.05, 0.05, 0x2dd4bf, 3, 1.15, -0.55, -0.6);
      H.label('0° GUIDE cross-check', 1.15, -0.85, -0.6, '#fff', 0.75);
    },

    elevationMap(R, H) {
      H.head(0, 0, 0, 1, 0);
      // 0° fall skirt
      const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.0, 1.2, 20, 1, true),
        H.mat(0x8b5cf6, 0));
      skirt.position.set(0, -0.9, 0); R.add(skirt);
      H.label('0° ONE-LENGTH', -1.5, -0.9, 0, '#fff', 0.75);
      // 45° wedge
      const w45 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 1.1, 1.3, 12, 1, false, 0, 1.1),
        H.mat(0xf59e0b, 1));
      w45.position.set(1.7, -0.3, 0); w45.rotation.z = -0.6; R.add(w45);
      H.label('45° GRADUATION', 1.7, 0.9, 0, '#fff', 0.75);
      // 90° projection
      const w90 = H.cyl(0.09, 0.5, 1.4, 0x0f766e, 2, -1.7, 0.1, 0);
      w90.rotation.z = Math.PI / 2;
      H.label('90° LAYERS', -1.7, 1.0, 0, '#fff', 0.75);
      // face-shape ovals
      const shapes = [['OVAL any', 0x2dd4bf], ['ROUND height', 0xec4899], ['SQUARE soften', 0xf59e0b]];
      shapes.forEach((s, i) => {
        const o = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), H.mat(s[1], 3));
        o.scale.set(i === 1 ? 1.15 : 0.85, i === 2 ? 0.9 : 1.15, 0.5);
        o.position.set(-0.9 + i * 0.9, -1.9, 0.4); R.add(o);
        H.label(s[0], -0.9 + i * 0.9, -2.35, 0.4, '#fff', 0.55);
      });
    },
    heatStyle(R, H) {
      // intelligent dryer: body + nozzle + scalp-sensor dot
      H.cyl(0.28, 0.28, 0.9, 0x1f2937, 0, -1.2, 0.5, 0).rotation.z = Math.PI / 2.4;
      const noz = H.cyl(0.1, 0.26, 0.55, 0x8b5cf6, 0, -0.55, 0.05, 0);
      noz.rotation.z = Math.PI / 2.4;
      H.sph(0.07, 0x2dd4bf, 0, -1.0, 0.75, 0.15);
      H.label('DRYER nozzle DOWN shaft', -1.2, 1.35, 0, '#fff', 0.75);
      H.label('sensor: close = cooler', -1.0, 1.05, 0.35, '#fff', 0.6);
      // airflow particles down-shaft
      const a = H.dots(50, [0.5, 1.2, 0.4], 0x7dd3fc, 0.05);
      a.pts.position.set(-0.1, -0.2, 0);
      tickers.push(() => {
        const p = a.pts.geometry.attributes.position;
        for (let i = 0; i < p.count; i++) {
          let y = p.getY(i) - 0.015;
          if (y < -0.6) y = 0.6;
          p.setY(i, y);
        }
        p.needsUpdate = true;
      });
      // round brush
      H.cyl(0.16, 0.16, 1.0, 0xb45309, 1, 0.6, -0.3, 0);
      for (let i = 0; i < 8; i++) {
        const b = H.box(0.36, 0.03, 0.03, 0x8b5cf6, 1, 0.6, -0.6 + i * 0.09, 0);
      }
      H.label('ROUND BRUSH tension+lift', 0.6, -1.15, 0, '#fff', 0.75);
      // infrared iron: two plates, one glowing
      const pA = H.box(0.5, 0.1, 1.1, 0x23272f, 2, 1.5, 0.35, 0);
      const pB = H.box(0.5, 0.1, 1.1, 0x23272f, 2, 1.5, -0.05, 0);
      const glow = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.03, 1.0),
        new THREE.MeshBasicMaterial({ color: 0xff6b35 }));
      glow.position.set(1.5, 0.16, 0); R.add(glow);
      tickers.push(t => { glow.material.color.setHSL(0.05, 0.9, 0.45 + Math.sin(t * 3) * 0.1); });
      H.label('INFRARED plates ≤185-210°C', 1.5, 0.95, 0, '#fff', 0.75);
      // heat protectant
      H.bottle(0x2dd4bf, 0x23272f, -0.2, -1.35, 1.1, 0.55, 'HEAT SHIELD 230°C', 3);
    },

    updoLab(R, H) {
      // texture prep spray
      H.bottle(0xec4899, null, -1.5, -0.5, 0.5, 0.55, 'TEXTURE prep', 0);
      // 3-strand braid: three twisting tubes
      for (let s = 0; s < 3; s++) {
        const pts = [];
        for (let i = 0; i <= 16; i++) {
          const y = 1.3 - i * 0.14;
          pts.push(new THREE.Vector3(-0.4 + Math.sin(i * 1.05 + s * 2.09) * 0.16, y, 0.3));
        }
        const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, 0.055, 8),
          H.mat([0x8b5cf6, 0xec4899, 0xf59e0b][s], 1));
        R.add(tube);
      }
      H.label('BRAID over/French/Dutch', -0.4, 1.7, 0.3, '#fff', 0.75);
      // bun donut + anchor at occiput
      H.tor(0.42, 0.2, 0x78350f, 2, 1.0, 0.1, -0.2, 0.3);
      H.sph(0.1, 0x2dd4bf, 2, 1.0, 0.1, -0.75);
      H.label('ANCHOR occiput balance', 1.0, 0.85, -0.2, '#fff', 0.75);
      // crossed pins
      const pin1 = H.cyl(0.025, 0.025, 0.7, 0xd7dae1, 3, 1.0, -0.25, 0.1);
      const pin2 = H.cyl(0.025, 0.025, 0.7, 0xd7dae1, 3, 1.0, -0.25, 0.1);
      pin1.rotation.z = 0.5; pin2.rotation.z = -0.5; pin1.rotation.x = 0.3; pin2.rotation.x = -0.3;
      H.label('PINS crossed ripple-in', 1.0, -0.75, 0.1, '#fff', 0.75);
      // finish spray + photo
      H.bottle(0xa78bfa, null, 0.1, -1.2, -0.9, 0.5, 'SHINE 20cm', 3);
      H.box(0.5, 0.35, 0.15, 0x23272f, 3, 1.6, -1.2, -0.9);
      H.cyl(0.1, 0.1, 0.1, 0x0f766e, 3, 1.6, -1.2, -0.78, 12).rotation.x = Math.PI / 2;
      H.label('PHOTO 3 angles', 1.6, -0.7, -0.9, '#fff', 0.7);
    },

    colorWheel(R, H) {
      // 12-swatch wheel
      for (let i = 0; i < 12; i++) {
        const a = i / 12 * Math.PI * 2;
        const sw = H.box(0.34, 0.34, 0.12,
          new THREE.Color().setHSL(i / 12, 0.8, 0.55).getHex(), 0,
          Math.cos(a) * 1.05, Math.sin(a) * 1.05 + 0.3, 0);
        sw.rotation.z = a;
      }
      H.label('WHEEL opposites kill', 0, 1.85, 0, '#fff', 0.8);
      // neutraliser pairs
      H.label('blue↔orange violet↔yellow', 0, -1.0, 0, '#fff', 0.65);
      // level ladder 1-10
      for (let i = 0; i < 10; i++) {
        const c = new THREE.Color().setHSL(0.08, 0.5, 0.04 + i * 0.085);
        H.box(0.3, 0.14, 0.14, c.getHex(), 1, 1.75, -1.2 + i * 0.24, 0);
      }
      H.label('LEVELS 1 black→10 lightest', 1.75, 1.35, 0, '#fff', 0.7);
      // developer bottles by height
      const vols = [['10 deposit', 0.35, 0x2dd4bf], ['20 grey/1-2', 0.5, 0x8b5cf6], ['30 lift 2-3', 0.65, 0xf59e0b], ['40 max risk', 0.8, 0xe11d48]];
      vols.forEach((v, i) => {
        H.bottle(v[2], null, -1.9 + i * 0.5, -1.1, 0.9, v[1], v[0], 2);
      });
      // scale + bowl + tests
      H.box(0.7, 0.08, 0.7, 0x9aa0ae, 3, -0.9, -1.35, -0.9);
      H.cyl(0.3, 0.22, 0.25, 0x6d28d9, 3, -0.9, -1.15, -0.9);
      H.sph(0.12, 0xf472b6, 3, 0.3, -1.25, -0.9);
      H.label('WEIGH 1:1.5 + SKIN 48h + STRAND', -0.3, -0.7, -0.9, '#fff', 0.7);
    },

    retouchMap(R, H) {
      H.head(0, 0.1, 0, 1, 0);
      // regrowth band at roots
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.86, 0.3, 20, 1, true, 0, Math.PI * 2),
        H.mat(0x57534e, 0));
      band.position.set(0, 0.75, 0.1); R.add(band);
      H.label('REGROWTH ~1cm roots ONLY', 0, 1.5, 0.1, '#fff', 0.8);
      // quadrant partings
      const q1 = H.box(0.04, 0.7, 1.7, 0xe11d48, 1, 0, 0.75, 0.1);
      H.label('QUADRANT map', 0, 0.1, 1.35, '#fff', 0.7);
      // grey coverage tubes: N + fashion
      H.bottle(0xe7e5e4, 0x23272f, -1.5, -0.9, 0.4, 0.55, 'N base covers grey', 2);
      H.bottle(0xc2410c, 0x23272f, -0.9, -0.9, 0.4, 0.55, '+ fashion tone', 2);
      // emulsify + record
      H.cyl(0.3, 0.22, 0.22, 0xfbcfe8, 3, 1.3, -0.9, 0.4);
      H.box(0.5, 0.65, 0.06, 0xfffbeb, 3, 1.3, -0.2, -0.9);
      H.label('EMULSIFY 5min + CARD', 1.3, 0.45, -0.5, '#fff', 0.7);
    },

    foilWork(R, H) {
      H.head(0, 0, -0.3, 0.95, 0);
      // bricklay foil packets
      let k = 0;
      for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++) {
        const x = -0.6 + col * 0.4 + (row % 2) * 0.2;
        const f = H.box(0.3, 0.42, 0.04, 0xd7dae1, row, x, 0.5 - row * 0.45, 0.55);
        f.rotation.x = -0.25; k++;
      }
      H.label('BRICK-LAY stagger, seal', 0, 1.35, 0.55, '#fff', 0.8);
      // balayage board paddle + brush
      H.box(0.5, 0.7, 0.06, 0x1f2937, 1, 1.35, -0.1, 0.2);
      const br = H.box(0.34, 0.1, 0.1, 0x8b5cf6, 1, 1.35, 0.1, 0.45);
      H.label('BOARD feathered V sweep', 1.35, 0.75, 0.2, '#fff', 0.7);
      // teasylight comb + elasticity check
      const comb = H.box(0.08, 0.6, 0.08, 0xf59e0b, 2, -1.4, -0.2, 0.3);
      for (let i = 0; i < 5; i++) H.box(0.2, 0.03, 0.03, 0xf59e0b, 2, -1.3, -0.4 + i * 0.1, 0.3);
      H.label('TEASE then foil = foilyage', -1.35, 0.5, 0.3, '#fff', 0.7);
      H.box(0.4, 0.25, 0.25, 0xddd6fe, 3, -1.35, -1.1, 0.3);
      H.label('CHECK 10min + stretch', -1.35, -1.55, 0.3, '#fff', 0.7);
    },

    assessKit(R, H) {
      // ring light + camera
      H.tor(0.55, 0.07, 0xfff7ed, 0, -0.9, 0.5, 0, 0);
      H.cyl(0.06, 0.06, 1.1, 0x9aa0ae, 0, -0.9, -0.5, 0);
      H.box(0.45, 0.3, 0.3, 0x23272f, 0, -0.9, 0.5, -0.45);
      H.cyl(0.12, 0.12, 0.2, 0x0f766e, 0, -0.9, 0.5, -0.2, 14).rotation.x = Math.PI / 2;
      H.label('RING LIGHT same angle', -0.9, 1.4, 0, '#fff', 0.75);
      // before/after frames
      H.box(0.55, 0.7, 0.05, 0x57534e, 0, 0.35, 0.35, -0.2);
      H.box(0.55, 0.7, 0.05, 0x2dd4bf, 0, 1.05, 0.35, -0.2);
      H.label('BEFORE → AFTER consent', 0.7, 1.15, -0.2, '#fff', 0.75);
      // retail trio
      H.bottle(0x38bdf8, null, -0.5, -1.0, 0.5, 0.5, 'shampoo', 1);
      H.bottle(0x8b5cf6, null, 0.05, -1.0, 0.5, 0.5, 'condition', 1);
      H.bottle(0xf59e0b, null, 0.6, -1.0, 0.5, 0.5, 'hero styler', 1);
      H.label('PRESCRIBE 2-3 demo on client', 0.05, -0.35, 0.5, '#fff', 0.75);
      // rebook calendar + rubric
      H.box(0.7, 0.5, 0.06, 0xfffbeb, 2, 1.35, -0.85, -0.6);
      for (let i = 0; i < 6; i++) H.box(0.08, 0.08, 0.02, i < 4 ? 0x0f766e : 0xe7e5e4, 2, 1.15 + (i % 3) * 0.2, -0.75 - Math.floor(i / 3) * 0.18, -0.56);
      H.label('REBOOK 2 times + 48h nudge', 1.35, -0.3, -0.6, '#fff', 0.7);
      H.box(0.6, 0.4, 0.06, 0xf1f5f9, 3, -1.35, -0.9, -0.6);
      H.label('RUBRIC ≥70% pass', -1.35, -0.4, -0.6, '#fff', 0.7);
    },

    // ---- SKIN (part 1) ----
    skinRoom(R, H) {
      // bed + linens + headband
      H.box(2.0, 0.25, 0.9, 0x0f766e, 0, 0, -0.35, 0);
      H.box(2.0, 0.08, 0.9, 0xffffff, 0, 0, -0.18, 0);
      H.box(0.5, 0.16, 0.6, 0xf3ede0, 0, -0.7, -0.05, 0);
      H.tor(0.16, 0.05, 0xec4899, 0, -0.7, 0.08, 0, 0);
      H.cyl(0.08, 0.08, 0.5, 0x9aa0ae, 0, -0.85, -0.7, 0.35);
      H.cyl(0.08, 0.08, 0.5, 0x9aa0ae, 0, 0.85, -0.7, 0.35);
      H.label('BED fresh linen + drape', 0, 0.5, 0, '#fff', 0.8);
      // trolley clean/dirty
      H.box(1.5, 0.07, 0.6, 0x8b5cf6, 1, 0.4, -0.75, -1.2);
      H.bottle(0x2dd4bf, null, 0.0, -0.45, -1.2, 0.45, 'CLEAN', 1);
      H.bottle(0xe11d48, null, 0.85, -0.45, -1.2, 0.45, 'USED', 1);
      H.box(0.4, 0.3, 0.4, 0xfffbeb, 1, -1.5, -0.6, -1.2);
      H.label('SPATULAS single-use', -1.5, -0.15, -1.2, '#fff', 0.7);
      // mag lamp
      H.cyl(0.05, 0.05, 1.0, 0x9aa0ae, 2, 1.5, 0.3, -0.4);
      H.tor(0.3, 0.06, 0xfff7ed, 2, 1.5, 0.9, -0.4, 0.4);
      H.label('MAG LAMP + loupe', 1.5, 1.45, -0.4, '#fff', 0.75);
      // steamer with vapor
      H.cyl(0.22, 0.3, 0.7, 0xe7e5e4, 2, -1.6, -0.4, -0.6);
      const noz = H.cyl(0.08, 0.14, 0.5, 0x9aa0ae, 2, -1.35, 0.05, -0.6);
      noz.rotation.z = -0.9;
      const v = H.dots(30, [0.3, 0.7, 0.3], 0xe0f2fe, 0.05);
      v.pts.position.set(-1.1, 0.45, -0.6);
      tickers.push(() => {
        const p = v.pts.geometry.attributes.position;
        for (let i = 0; i < p.count; i++) {
          let y = p.getY(i) + 0.008;
          if (y > 0.35) y = -0.35;
          p.setY(i, y);
        }
        p.needsUpdate = true;
      });
      H.label('STEAMER fresh water 30cm', -1.35, 1.15, -0.6, '#fff', 0.7);
      // consent form
      H.box(0.5, 0.65, 0.04, 0xfffbeb, 3, 1.5, -0.9, 0.9);
      H.label('CONSENT + allergies first', 1.5, -0.35, 0.9, '#fff', 0.7);
    },

    faceAnalysis(R, H) {
      // face oval
      const f = H.sph(0.9, 0xe6b48c, 0, 0, 0, 0); f.scale.set(0.78, 1.05, 0.55);
      // T-zone overlay
      const t = new THREE.Mesh(new THREE.SphereGeometry(0.55, 18, 12, 0, Math.PI * 2, 0, 1.1),
        H.mat(0xf59e0b, 1));
      t.scale.set(0.7, 0.9, 0.6); t.position.set(0, 0.25, 0.18); t.material.transparent = true; t.material.opacity = 0.55; R.add(t);
      H.label('T-ZONE oily? cheeks?', 0, 1.35, 0.3, '#fff', 0.8);
      // loupe ring over cheek
      H.tor(0.32, 0.045, 0x0f766e, 1, -0.45, -0.1, 0.55, 0);
      H.label('LOUPE pores/flakes', -0.45, -0.65, 0.55, '#fff', 0.7);
      // blot papers
      H.box(0.3, 0.02, 0.2, 0xffffff, 2, 0.55, 0.5, 0.5);
      H.box(0.3, 0.02, 0.2, 0xfef3c7, 2, 0.55, -0.35, 0.5);
      H.label('BLOT T vs cheeks', 0.55, 0.85, 0.5, '#fff', 0.7);
      // Wood's lamp glow
      const lamp = H.cyl(0.12, 0.16, 0.4, 0x312e81, 2, -1.3, 0.3, 0.6);
      const glow = new THREE.PointLight(0x8b5cf6, 1.4, 4); glow.position.set(-1.1, 0.3, 0.6); R.add(glow);
      H.label("WOOD'S LAMP pigment", -1.3, 0.85, 0.6, '#fff', 0.7);
      // multi-mask bowls
      H.cyl(0.2, 0.14, 0.14, 0x84cc16, 3, -0.5, -1.35, 0.3);
      H.cyl(0.2, 0.14, 0.14, 0xf9a8d4, 3, 0.2, -1.35, 0.3);
      H.cyl(0.2, 0.14, 0.14, 0x7dd3fc, 3, 0.9, -1.35, 0.3);
      H.label('MULTI-MASK clay|cream|gel', 0.2, -1.0, 0.3, '#fff', 0.7);
    },
    skinLayers(R, H) {
      const layers = [
        ['CORNEUM bricks', 0xfbbf24, 1.35], ['LIVING epidermis', 0xfb923c, 0.75],
        ['DERMIS collagen', 0xef4444, 0.15], ['FAT cushion', 0xec4899, -0.45]
      ];
      layers.forEach((L, i) => {
        const m = H.cyl(1.35 - i * 0.06, 1.35 - i * 0.06, 0.5, L[1], i, 0, L[2], 0, 30);
        m.material.transparent = true; m.material.opacity = 0.9;
        H.label(L[0], 0, L[2] + 0.45, 0, '#fff', 0.72);
      });
      // barrier film
      const film = H.box(2.2, 0.03, 1.4, 0x7dd3fc, 0, 0, 1.68, 0);
      film.material.transparent = true; film.material.opacity = 0.6;
      H.label('ACID MANTLE pH 4.5-5.5', 0, 1.95, 0, '#fff', 0.7);
      // collagen coils in dermis
      for (let i = 0; i < 5; i++) {
        const pts = [];
        for (let j = 0; j <= 10; j++) pts.push(new THREE.Vector3(-0.8 + j * 0.16, 0.15 + Math.sin(j * 2 + i) * 0.07, -0.5 + i * 0.25));
        H.seg(pts, 0xfca5a5, 2);
      }
      H.label('COLLAGEN springs', 0, -0.35, -0.6, '#fff', 0.7);
      // UV arrow + SPF shield
      const uv = H.arrow(0xf59e0b, 3, 0.9); uv.position.set(1.7, 1.2, 0); uv.rotation.x = Math.PI;
      H.box(0.7, 0.5, 0.05, 0xfffbeb, 3, 1.7, 0.2, 0);
      H.label('UV breaks it · SPF 2 fingers', 1.7, -0.35, 0, '#fff', 0.7);
    },

    exfolBar(R, H) {
      // skin block with pore well
      H.box(2.2, 0.9, 0.9, 0xe6b48c, 0, 0, -0.5, 0);
      H.cyl(0.16, 0.1, 0.5, 0x9a6a45, 0, 0, -0.3, 0.2, 12);
      H.label('PORE well', 0, 0.35, 0.2, '#fff', 0.75);
      // depth columns
      const cols = [
        ['SCRUB surface', 0.35, 0xfbbf24, -0.85], ['ENZYME gentle', 0.55, 0x84cc16, -0.3],
        ['AHA glow', 0.75, 0x8b5cf6, 0.3], ['BHA in-pore', 1.05, 0x0f766e, 0.85]
      ];
      cols.forEach((c, i) => {
        H.box(0.4, c[1], 0.4, c[2], i + 1, c[3], 0.35 + c[1] / 2, 0.55);
        H.label(c[0], c[3], 0.05, 0.55, '#fff', 0.6);
      });
      // timer + seal
      H.tor(0.28, 0.07, 0x23272f, 2, -1.35, -0.6, 0.6, 0);
      H.box(0.05, 0.28, 0.03, 0xe11d48, 2, -1.35, -0.5, 0.66);
      H.label('TIME 10-15 mist if dry', -1.35, -1.15, 0.6, '#fff', 0.7);
      H.bottle(0x38bdf8, null, 1.35, -0.75, 0.6, 0.5, 'SEAL toner-serum-SPF', 3);
    },

    euroSteps(R, H) {
      // 10 station discs in arc
      const names = ['consult', 'cleanse1', 'analyse', 'cleanse2', 'steam', 'extract?', 'massage', 'mask', 'seal', 'SPF+plan'];
      names.forEach((n, i) => {
        const a = (i / 9) * Math.PI;
        const x = Math.cos(a) * 1.7, z = -Math.sin(a) * 1.1 - 0.2;
        H.cyl(0.26, 0.26, 0.1, i === 5 ? 0xf59e0b : 0x0f766e, Math.min(i, 4), x, -0.3, z, 16);
        H.label((i + 1) + ' ' + n, x, 0.05, z, '#fff', 0.5);
      });
      H.label('60-MIN EUROPEAN 10 stations', 0, 1.15, -0.2, '#fff', 0.85);
      // steamer + extraction caution + mask bowl
      H.cyl(0.2, 0.28, 0.6, 0xe7e5e4, 2, -1.9, -0.5, 0.6);
      H.box(0.3, 0.2, 0.05, 0xe11d48, 2, 1.9, -0.4, 0.6);
      H.label('open comedones ONLY', 1.9, 0.0, 0.6, '#fff', 0.65);
      H.cyl(0.3, 0.2, 0.22, 0xf9a8d4, 3, 0, -1.1, 1.0);
      H.label('MASK 12min + seal', 0, -1.55, 1.0, '#fff', 0.7);
    },

    massageFace(R, H) {
      const f = H.sph(0.95, 0xe6b48c, 0, 0, 0, 0); f.scale.set(0.8, 1.05, 0.55);
      // muscle curves
      [[-0.35, 0.3], [0.35, 0.3], [-0.3, -0.25], [0.3, -0.25]].forEach((p, i) => {
        const pts = [];
        for (let j = 0; j <= 8; j++) pts.push(new THREE.Vector3(p[0] + j * 0.05 * (p[0] < 0 ? -1 : 1), p[1] + Math.sin(j) * 0.04, 0.52));
        H.seg(pts, 0xe11d48, 1);
      });
      H.label('MUSCLE fibres up+out', 0, 1.3, 0.3, '#fff', 0.75);
      // stroke arrows up-out
      [[-0.5, -0.3], [0.5, -0.3], [-0.55, 0.35], [0.55, 0.35]].forEach(p => {
        const a = H.arrow(0x2dd4bf, 1, 0.45);
        a.position.set(p[0], p[1], 0.6); a.rotation.z = p[0] < 0 ? 0.7 : -0.7;
      });
      // lymph nodes
      [[-0.62, -0.05], [0.62, -0.05], [-0.3, -0.95], [0.3, -0.95]].forEach(p => {
        H.sph(0.07, 0x8b5cf6, 3, p[0], p[1], 0.45);
      });
      H.label('LYMPH feather-light drains', 0, -1.3, 0.45, '#fff', 0.72);
      // tapotement warning tag
      H.box(0.5, 0.3, 0.04, 0xfffbeb, 2, 1.25, 0.5, 0.3);
      H.label('skip tap on inflamed', 1.25, 0.9, 0.3, '#fff', 0.6);
      // slip medium
      H.bottle(0xfde68a, null, -1.35, -0.9, 0.4, 0.5, 'SLIP cream/oil', 0);
    },

    lesionLib(R, H) {
      const items = [
        ['COMEDONE touch ok', 0x2dd4bf, 0, -1.35], ['PAPULE gentle', 0xf59e0b, 1, -0.45],
        ['PUSTULE refer?', 0xe11d48, 2, 0.45], ['CYST refer GP', 0x7f1d1d, 3, 1.35]
      ];
      items.forEach(it => {
        H.cyl(0.34, 0.4, 0.16, 0xe7e5e4, it[2], it[3], -0.75, 0);
        H.sph(it[2] === 3 ? 0.24 : 0.16, 0xe6b48c, it[2], it[3], -0.5, 0);
        if (it[2] >= 1) H.sph(0.09, 0xe11d48, it[2], it[3], -0.36, 0.08);
        if (it[2] >= 2) H.sph(0.06, 0xfde68a, it[2], it[3], -0.36, 0.14);
        H.label(it[0], it[3], -0.05, 0, '#fff', 0.62);
      });
      H.label('NEVER pick inflamed · ABCDE moles', 0, 0.6, 0, '#fff', 0.8);
      H.box(0.6, 0.4, 0.05, 0xfffbeb, 3, 0, -1.4, 0.4);
      H.label('LOG + photo + refer', 0, -1.0, 0.4, '#fff', 0.7);
    },

    browWax(R, H) {
      // brow arc
      const arc = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.09, 10, 24, Math.PI * 0.8),
        H.mat(0x78350f, 0));
      arc.position.set(0, -0.2, 0); arc.rotation.z = Math.PI * 0.1; R.add(arc);
      // start/arch/end markers
      [['START nose wing', 0x2dd4bf, -0.62, -0.05], ['ARCH iris edge', 0xf59e0b, 0.05, 0.62], ['END nose-outer', 0xec4899, 0.68, -0.1]].forEach(m => {
        H.sph(0.08, m[1], 0, m[2], m[3], 0.1);
        H.label(m[0], m[2], m[3] + 0.35, 0.1, '#fff', 0.62);
      });
      // wax strip + spatula + patch dot
      H.box(0.5, 0.16, 0.03, 0xfde68a, 2, -1.3, 0.2, 0.2);
      H.box(0.08, 0.7, 0.03, 0xd6a05c, 2, -1.3, -0.4, 0.2);
      H.label('THIN against-growth pull', -1.3, 0.65, 0.2, '#fff', 0.7);
      H.sph(0.09, 0xf472b6, 1, 1.3, -0.5, 0.2);
      H.label('PATCH 24h before', 1.3, -0.1, 0.2, '#fff', 0.7);
      // soothe + makeup base
      H.bottle(0x7dd3fc, null, 1.3, 0.35, 0.2, 0.45, 'SOOTHE no heat 24h', 3);
      H.box(0.45, 0.3, 0.12, 0xf9a8d4, 3, 0.3, -1.15, 0.3);
      H.label('BASE jawline match', 0.3, -1.55, 0.3, '#fff', 0.7);
    },

    chemLab(R, H) {
      // hero actives
      H.bottle(0x8b5cf6, null, -1.2, -0.3, 0.2, 0.6, 'NIACINAMIDE 2-5%', 0);
      H.bottle(0xf59e0b, null, -0.4, -0.3, 0.2, 0.6, 'VIT C 10-20% AM', 0);
      H.bottle(0x312e81, null, 0.4, -0.3, 0.2, 0.6, 'RETINOID PM pea', 0);
      H.label('READ INCI % order', -0.4, 0.55, 0.2, '#fff', 0.8);
      // molecule sizes sinking into layers
      [[0.06, 0x8b5cf6, 'acids dive'], [0.12, 0x38bdf8, 'HA sits+seals'], [0.18, 0xfbbf24, 'oils seal']].forEach((m, i) => {
        H.sph(m[0], m[1], 1, 1.2, 0.5 - i * 0.35, 0.2);
        H.label(m[2], 1.2, 0.15 - i * 0.35, 0.2, '#fff', 0.6);
      });
      H.box(1.0, 0.1, 0.5, 0xe6b48c, 1, 1.2, -0.85, 0.2);
      // AM / PM trays + SPF
      H.box(0.9, 0.12, 0.6, 0xfef3c7, 2, -0.9, -1.25, -0.9);
      H.label('AM antioxidant FIRST', -0.9, -0.95, -0.9, '#fff', 0.68);
      H.box(0.45, 0.35, 0.15, 0xfffbeb, 2, 0.1, -1.2, -0.9);
      H.label('SPF 2 fingers LAST', 0.1, -0.8, -0.9, '#fff', 0.68);
      H.box(0.9, 0.12, 0.6, 0x1e1b4b, 3, 0.9, -1.25, 0.9);
      H.label('PM one active / 2wk gaps', 0.9, -0.95, 0.9, '#fff', 0.68);
    },

    deviceSuite(R, H) {
      // HF unit + electrode with violet glow
      H.box(0.7, 0.5, 0.5, 0xe7e5e4, 0, -1.2, -0.6, 0);
      H.cyl(0.04, 0.04, 0.7, 0x9aa0ae, 0, -1.2, 0.0, 0);
      H.sph(0.14, 0xc4b5fd, 0, -1.2, 0.45, 0);
      const gl = new THREE.PointLight(0x8b5cf6, 1.6, 4); gl.position.set(-1.2, 0.45, 0); R.add(gl);
      H.tor(0.3, 0.03, 0x8b5cf6, 0, -1.2, 0.45, 0, 0);
      H.label('HF 5mm gap keep moving', -1.2, 1.05, 0, '#fff', 0.72);
      // LED mask red/blue
      const mask = H.sph(0.55, 0x1f2937, 1, 0.3, 0.1, 0); mask.scale.set(0.85, 1.0, 0.5);
      const red = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 12),
        new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.35 }));
      red.scale.set(0.85, 1.0, 0.5); red.position.set(0.3, 0.1, 0.08); R.add(red);
      tickers.push(t => red.material.color.setHSL((Math.sin(t * 0.8) > 0 ? 0 : 0.62), 0.85, 0.55));
      H.label('LED red firm · blue clarify', 0.3, 1.0, 0, '#fff', 0.72);
      // microcurrent probes + ultrasonic scrubber
      const pr1 = H.cyl(0.06, 0.09, 0.5, 0x0f766e, 2, 1.35, -0.2, 0.3);
      const pr2 = H.cyl(0.06, 0.09, 0.5, 0x0f766e, 2, 1.6, -0.2, 0.3);
      pr1.rotation.z = 0.4; pr2.rotation.z = -0.4;
      H.label('MICROCURRENT up-glide + gel', 1.5, 0.4, 0.3, '#fff', 0.68);
      H.box(0.5, 0.06, 0.14, 0xd7dae1, 2, 1.45, -0.95, 0.3);
      H.label('ULTRASONIC scrubber', 1.45, -1.3, 0.3, '#fff', 0.68);
      // goggles + log
      H.tor(0.16, 0.05, 0x23272f, 3, -0.3, -1.0, 0.6, 0);
      H.tor(0.16, 0.05, 0x23272f, 3, 0.2, -1.0, 0.6, 0);
      H.box(0.7, 0.45, 0.05, 0xfffbeb, 3, -1.2, -1.35, 0.6);
      H.label('GOGGLES + LOG settings', -0.5, -1.55, 0.6, '#fff', 0.68);
      // contraindication tag
      H.box(0.6, 0.35, 0.05, 0xfee2e2, 0, 0.3, -1.35, -0.9);
      H.label('NO pacemaker/epilepsy/preg', 0.3, -0.95, -0.9, '#fff', 0.62);
    },

    protocolArc(R, H) {
      // 6 session bars rising
      for (let i = 0; i < 6; i++) {
        H.box(0.32, 0.3 + i * 0.22, 0.32, i < 2 ? 0xf59e0b : 0x0f766e, 1, -1.25 + i * 0.5, -0.85 + (0.3 + i * 0.22) / 2, 0);
      }
      H.label('COURSE 4-6 weekly, photos', 0, 0.5, 0, '#fff', 0.8);
      // concern pods
      H.sph(0.2, 0xe11d48, 0, -1.5, 0.2, 0.9);
      H.label('ONE goal: acne', -1.5, 0.6, 0.9, '#fff', 0.62);
      H.sph(0.2, 0x8b5cf6, 0, 1.5, 0.2, 0.9);
      H.label('OR pigment OR firm', 1.5, 0.6, 0.9, '#fff', 0.62);
      // home-care trio + luxury booster
      H.bottle(0x38bdf8, null, -0.4, -1.25, 1.0, 0.45, 'cleanse', 2);
      H.bottle(0x8b5cf6, null, 0.15, -1.25, 1.0, 0.45, 'treat', 2);
      H.bottle(0xfde68a, null, 0.7, -1.25, 1.0, 0.45, 'SPF', 2);
      H.label('HOME TRIO max 3', 0.15, -0.75, 1.0, '#fff', 0.68);
      H.bottle(0xd4af37, 0x23272f, 1.35, 0.35, -0.9, 0.55, '24K BOOSTER finish', 3);
      H.label('LUXURY theatre + result', 1.35, 1.05, -0.9, '#fff', 0.68);
    },

    deskLoop(R, H) {
      // desk + calendar + QR + bag
      H.box(1.8, 0.12, 0.8, 0xb45309, 0, 0, -0.5, 0);
      H.box(0.12, 0.9, 0.7, 0x92400e, 0, -0.8, -1.0, 0);
      H.box(0.12, 0.9, 0.7, 0x92400e, 0, 0.8, -1.0, 0);
      H.box(0.6, 0.45, 0.05, 0xfffbeb, 1, -0.45, 0.0, 0);
      for (let i = 0; i < 6; i++) H.box(0.07, 0.07, 0.02, i < 3 ? 0x0f766e : 0xe7e5e4, 1, -0.62 + (i % 3) * 0.17, 0.08 - Math.floor(i / 3) * 0.16, 0.04);
      H.label('REBOOK before coat-on', -0.45, 0.5, 0, '#fff', 0.72);
      H.box(0.4, 0.4, 0.03, 0x1f2937, 2, 0.5, -0.05, 0);
      for (let i = 0; i < 4; i++) H.box(0.06, 0.06, 0.01, 0xffffff, 2, 0.42 + (i % 2) * 0.14, 0.02 - Math.floor(i / 2) * 0.14, 0.03);
      H.label('REVIEW QR at glow', 0.5, 0.42, 0, '#fff', 0.72);
      H.box(0.45, 0.5, 0.3, 0xf9a8d4, 2, 1.15, -0.15, 0);
      H.label('AFTERCARE bag + card', 1.15, 0.4, 0, '#fff', 0.7);
      // rubric + recovery
      H.box(0.6, 0.4, 0.05, 0xf1f5f9, 3, -1.3, -0.3, 0.7);
      H.label('RUBRIC ≥70%', -1.3, 0.1, 0.7, '#fff', 0.7);
      H.box(0.5, 0.3, 0.05, 0xfee2e2, 3, 0.4, -1.3, 0.7);
      H.label('RECOVER free review slot', 0.4, -0.95, 0.7, '#fff', 0.68);
    },
    phBench(R, H) {
      // pH tower 0-14
      for (let i = 0; i < 14; i++) {
        const c = new THREE.Color().setHSL(0.02 + (i / 13) * 0.36, 0.75, 0.55);
        H.box(0.45, 0.2, 0.45, c.getHex(), i < 6 ? 0 : (i < 8 ? 1 : 2), -1.3, -1.4 + i * 0.23, 0);
      }
      H.label('pH 0 acid → 14 alkaline', -1.3, 2.1, 0, '#fff', 0.8);
      H.box(0.7, 0.28, 0.5, 0x2dd4bf, 1, -1.3, -0.4, 0.6);
      H.label('HAIR lives 4.5-5.5', -1.3, 0.0, 0.6, '#fff', 0.7);
      // product pH trio
      H.bottle(0x1f2937, null, 0.1, -0.9, 0.5, 0.6, 'RELAXER pH13 opens', 0);
      H.bottle(0x8b5cf6, null, 0.75, -0.9, 0.5, 0.6, 'TINT pH9-11', 0);
      H.bottle(0x7dd3fc, null, 1.4, -0.9, 0.5, 0.6, 'SEAL pH3-5 closes', 0);
      // gloves + fan ventilation
      H.box(0.4, 0.08, 0.5, 0x38bdf8, 2, 0.1, 0.35, -0.9);
      H.box(0.4, 0.08, 0.5, 0x38bdf8, 2, 0.65, 0.35, -0.9);
      H.label('GLOVES right size', 0.35, 0.7, -0.9, '#fff', 0.7);
      H.cyl(0.3, 0.3, 0.12, 0x9aa0ae, 2, 1.45, 0.3, -0.9, 16).rotation.x = Math.PI / 2;
      const f = H.dots(24, [0.8, 0.4, 0.4], 0xe0f2fe, 0.05);
      f.pts.position.set(0.7, 0.3, -0.9);
      tickers.push(() => {
        const p = f.pts.geometry.attributes.position;
        for (let i = 0; i < p.count; i++) {
          let x = p.getX(i) - 0.01;
          if (x < -0.4) x = 0.4;
          p.setX(i, x);
        }
        p.needsUpdate = true;
      });
      H.label('FAN fumes OUT', 1.45, 0.85, -0.9, '#fff', 0.7);
      // pledge card
      H.box(0.7, 0.4, 0.05, 0xfffbeb, 3, -0.2, 1.35, -0.9);
      H.label('NO TEST = NO CHEMICAL', -0.2, 1.7, -0.9, '#fff', 0.68);
    },

    consultKit(R, H) {
      // history clipboard with red-flag chips
      H.box(0.7, 0.9, 0.06, 0xfffbeb, 0, -1.2, 0.1, 0);
      [['BOX black', 0xe11d48], ['HENNA metal?', 0xe11d48], ['KERATIN?', 0xf59e0b]].forEach((c, i) => {
        H.box(0.5, 0.14, 0.02, c[1], 0, -1.2, 0.35 - i * 0.24, 0.05);
      });
      H.label('HISTORY 2yrs trawl', -1.2, 0.85, 0, '#fff', 0.75);
      // porosity beaker + elasticity strand
      const gl = H.cyl(0.4, 0.4, 0.9, 0x9fd8e8, 1, 0, -0.4, 0.3);
      gl.material.transparent = true; gl.material.opacity = 0.35;
      H.cyl(0.35, 0.35, 0.4, 0x38bdf8, 1, 0, -0.6, 0.3);
      H.box(0.45, 0.04, 0.04, 0x78350f, 1, 0, -0.15, 0.3);
      H.label('FLOAT + STRETCH record', 0, 0.35, 0.3, '#fff', 0.72);
      const pts = [];
      for (let i = 0; i <= 10; i++) pts.push(new THREE.Vector3(0.7 + i * 0.08, 0.3 + Math.sin(i) * 0.05, 0.3));
      H.seg(pts, 0x2dd4bf, 1);
      // skin-test dot + strand foil + consent
      H.sph(0.1, 0xf472b6, 2, -0.2, 0.9, -0.7);
      H.label('SKIN 48h behind ear', -0.2, 1.25, -0.7, '#fff', 0.7);
      H.box(0.4, 0.3, 0.05, 0xd7dae1, 2, 0.8, 0.85, -0.7);
      H.box(0.3, 0.2, 0.02, 0xc2410c, 2, 0.8, 0.85, -0.66);
      H.label('STRAND timer+photo', 0.8, 1.3, -0.7, '#fff', 0.7);
      H.box(0.7, 0.5, 0.05, 0xf1f5f9, 3, 1.3, -0.9, -0.3);
      H.label('CONSENT honest result+price', 1.3, -0.45, -0.3, '#fff', 0.68);
      H.box(0.5, 0.3, 0.05, 0xfee2e2, 3, -1.2, -1.1, -0.3);
      H.label('KIND no-go + alternative', -1.2, -0.7, -0.3, '#fff', 0.68);
    },

    bondLab(R, H) {
      // disulphide ladder: two rails + rungs that "break"
      const railL = H.cyl(0.05, 0.05, 2.2, 0x8b5cf6, 0, -0.4, 0, 0);
      const railR = H.cyl(0.05, 0.05, 2.2, 0x8b5cf6, 0, 0.4, 0, 0);
      for (let i = 0; i < 6; i++) {
        const rung = H.cyl(0.035, 0.035, 0.8, 0xf59e0b, 0, 0, -0.9 + i * 0.36, 0);
        rung.rotation.z = Math.PI / 2;
      }
      H.label('S-S rungs = curl lock', 0, 1.4, 0, '#fff', 0.8);
      // lotion breaks (wavy) vs neutraliser locks (straight)
      H.bottle(0xf472b6, null, -1.4, -0.5, 0.4, 0.55, 'LOTION breaks (thio)', 1);
      const pts = [];
      for (let i = 0; i <= 12; i++) pts.push(new THREE.Vector3(-1.4 + i * 0.1, 0.35 + Math.sin(i * 1.5) * 0.12, 0.4));
      H.seg(pts, 0xf472b6, 1);
      H.bottle(0x7dd3fc, null, 1.4, -0.5, 0.4, 0.55, 'NEUTRALISER locks acid', 3);
      // rod with wrapped hair
      H.cyl(0.14, 0.14, 1.1, 0xe11d48, 2, 0.1, -0.2, -0.9);
      const wrap = [];
      for (let i = 0; i <= 20; i++) {
        const a = i * 0.9;
        wrap.push(new THREE.Vector3(0.1 + Math.cos(a) * 0.17, -0.7 + i * 0.05, -0.9 + Math.sin(a) * 0.17));
      }
      H.seg(wrap, 0x78350f, 2);
      H.box(0.3, 0.2, 0.01, 0xffffff, 2, 0.1, 0.15, -0.7);
      H.label('RODS shape + PAPERS', 0.1, 0.6, -0.9, '#fff', 0.7);
      // K18 + Olaplex vials
      H.bottle(0xffffff, 0x23272f, -0.7, 1.15, -0.9, 0.4, 'K18 4min peptide', 3);
      H.bottle(0x1f2937, 0xffffff, 0.75, 1.15, -0.9, 0.4, 'OLAPLEX No.1-3', 3);
    },

    rodPatterns(R, H) {
      // bricklay rod grid
      for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
        const x = -0.9 + c * 0.45 + (r % 2) * 0.22;
        const rod = H.cyl(0.09, 0.09, 0.5, 0xe11d48, 0, x, 0.3 - r * 0.5, 0.3);
        rod.rotation.x = Math.PI / 2.3;
      }
      H.label('BRICKLAY stagger bases', 0, 1.0, 0.3, '#fff', 0.8);
      // spiral vertical rods
      for (let i = 0; i < 3; i++) {
        H.cyl(0.09, 0.09, 1.3, 0x8b5cf6, 1, 1.3 + i * 0.35, -0.1, -0.4);
      }
      H.label('SPIRAL long hair vertical', 1.6, 0.9, -0.4, '#fff', 0.72);
      // end papers + test curl
      H.box(0.35, 0.25, 0.02, 0xffffff, 2, -1.5, -0.3, 0.3);
      H.label('PAPERS no fish-hooks', -1.5, 0.15, 0.3, '#fff', 0.7);
      H.tor(0.14, 0.05, 0x2dd4bf, 3, -1.5, -1.0, 0.3, 0);
      H.label('TEST CURL S-hold ¾ time', -1.5, -1.4, 0.3, '#fff', 0.7);
      // neutralise 5+5
      H.bottle(0x7dd3fc, null, 1.5, -1.2, 0.5, 0.5, 'NEUTRALISE 5+5', 3);
    },

    relaxMap(R, H) {
      // hair length bar: roots/new-growth/lengths
      H.box(0.5, 2.2, 0.3, 0x3f3f46, 0, 0, 0, 0);
      H.box(0.54, 0.4, 0.34, 0xa8a29e, 0, 0, 0.9, 0);
      H.label('NEW GROWTH only zone', 0, 1.45, 0, '#fff', 0.75);
      // overlap danger band
      H.box(0.6, 0.18, 0.36, 0xe11d48, 1, 0, 0.55, 0);
      H.label('OVERLAP = BREAKAGE', 0, 0.15, 0.5, '#fff', 0.72);
      // barrier cream + virgin vs retouch combs
      H.box(0.4, 0.3, 0.2, 0xfffbeb, 2, -1.2, 0.5, 0.2);
      H.label('BARRIER base scalp', -1.2, 0.95, 0.2, '#fff', 0.7);
      H.box(0.12, 0.8, 0.08, 0x8b5cf6, 2, 1.1, 0.4, 0.2);
      H.label('BACK-OF-COMB smooth', 1.1, 1.0, 0.2, '#fff', 0.7);
      // relaxer types
      H.bottle(0x1f2937, null, -1.2, -1.1, 0.5, 0.55, 'NaOH resistant', 3);
      H.bottle(0x38bdf8, null, -0.4, -1.1, 0.5, 0.55, 'THIO delicate', 3);
      H.bottle(0x2dd4bf, null, 0.4, -1.1, 0.5, 0.55, 'KERATIN frizz-tame', 3);
      // rinse + balance
      H.cyl(0.35, 0.25, 0.3, 0x7dd3fc, 3, 1.3, -1.05, 0.5);
      H.label('RINSE 5+ + protein↔moisture', 1.3, -0.5, 0.5, '#fff', 0.68);
    },

    volBench(R, H) {
      // colour category shelf temp->perm
      const cats = [['TEMP 1 wash', 0xfde68a], ['SEMI 4-8', 0xfbbf24], ['DEMI low-vol', 0xfb923c], ['PERM lift+cover', 0xef4444], ['BLEACH lift only', 0xe7e5e4]];
      cats.forEach((c, i) => {
        H.box(0.42, 0.4, 0.3, c[1], 0, -1.15 + i * 0.58, -0.2, -0.6);
        H.label(c[0], -1.15 + i * 0.58, -0.65, -0.6, '#fff', 0.5);
      });
      // vol ladder with lift bars
      const vols = [['10', 0.3, 0x2dd4bf], ['20', 0.55, 0x8b5cf6], ['30', 0.8, 0xf59e0b], ['40!', 1.05, 0xe11d48]];
      vols.forEach((v, i) => {
        H.bottle(v[2], null, -0.9 + i * 0.55, -1.15, 0.7, 0.5, v[0] + 'vol', 1);
        H.box(0.3, v[1], 0.2, v[2], 1, -0.9 + i * 0.55, -0.4 + v[1] / 2, -0.2);
      });
      H.label('HIGHER vol = more lift + damage', 0, 0.35, 0.2, '#fff', 0.72);
      // grey N + fashion + card
      H.bottle(0xe7e5e4, 0x23272f, 1.35, 0.15, -0.6, 0.5, 'N fills grey', 2);
      H.bottle(0xc2410c, 0x23272f, 1.35, 0.15, 0.1, 0.5, '+ fashion', 2);
      H.box(0.6, 0.45, 0.05, 0xfffbeb, 3, -1.3, 0.7, 0.5);
      H.label('CARD brand+shade+vol+time', -1.3, 1.15, 0.5, '#fff', 0.68);
    },

    liftTunnel(R, H) {
      // undercoat stages arch
      const stages = [[0xe11d48, 'red 1-4'], [0xea580c, 'orange 5-6'], [0xeab308, 'yellow 7-8'], [0xfef9c3, 'pale 9-10 TONE']];
      stages.forEach((s, i) => {
        const a = (i / 3) * Math.PI;
        H.sph(0.3, s[0], i, Math.cos(a) * 1.3, Math.sin(a) * 0.9 - 0.4, 0);
        H.label(s[1], Math.cos(a) * 1.3, Math.sin(a) * 0.9 + 0.15, 0, '#fff', 0.68);
      });
      H.label('LIFT in stages, not one blast', 0, 1.35, 0, '#fff', 0.8);
      // fresh bowl + bond additive + off-scalp foil
      H.cyl(0.35, 0.25, 0.3, 0x6d28d9, 1, -1.4, -1.1, 0.5);
      H.bottle(0xffffff, 0x23272f, -0.7, -1.15, 0.5, 0.45, 'BOND additive', 1);
      H.box(0.45, 0.35, 0.04, 0xd7dae1, 1, 1.35, -1.05, 0.5);
      H.label('OFF-SCALP safer + 20/30vol', 1.0, -0.5, 0.5, '#fff', 0.7);
      // elasticity check + stop sign
      H.tor(0.13, 0.05, 0x2dd4bf, 2, -0.2, -1.2, 0.9, 0);
      H.label('PULL every 15min', -0.2, -1.6, 0.9, '#fff', 0.68);
      const stop = H.box(0.5, 0.5, 0.08, 0xe11d48, 3, 0.9, -1.35, 0.9);
      stop.rotation.z = Math.PI / 4;
      H.label('GUMMY/pain = RINSE NOW', 0.9, -0.85, 0.9, '#fff', 0.68);
    },

    dimensionLab(R, H) {
      H.head(0, 0.1, -0.3, 0.95, 0);
      // weave + slice foils
      for (let i = 0; i < 3; i++) {
        const w = H.box(0.24, 0.4, 0.04, 0xd7dae1, 0, -0.7 + i * 0.35, 0.45, 0.55);
        w.rotation.x = -0.2;
      }
      H.label('WEAVE soft dimension', -0.35, 1.0, 0.55, '#fff', 0.7);
      const sl = H.box(0.4, 0.45, 0.04, 0xc9ccd4, 0, 0.7, 0.3, 0.55);
      sl.rotation.x = -0.2;
      H.label('SLICE bold money-piece', 0.7, 0.85, 0.55, '#fff', 0.7);
      // balayage V
      const v1 = H.box(0.08, 0.8, 0.04, 0xf59e0b, 1, -1.15, -0.5, 0.45);
      const v2 = H.box(0.08, 0.8, 0.04, 0xf59e0b, 1, -0.85, -0.5, 0.45);
      v1.rotation.z = 0.35; v2.rotation.z = -0.35;
      H.label('BALAYAGE feathered V', -1.0, 0.15, 0.45, '#fff', 0.7);
      // filler for going darker + diagnosis card
      H.bottle(0xc2410c, null, 1.35, -0.7, 0.2, 0.5, 'FILL copper first', 2);
      H.box(0.55, 0.4, 0.05, 0xfffbeb, 2, 1.35, 0.15, -0.7);
      H.label('DX bands/brass/porosity', 1.35, 0.6, -0.7, '#fff', 0.68);
      // quote tag
      H.box(0.5, 0.3, 0.05, 0xfef3c7, 3, -0.3, -1.35, 0.4);
      H.label('QUOTE stages + tests', -0.3, -1.0, 0.4, '#fff', 0.7);
    },

    tonerBar(R, H) {
      // base swatches
      H.box(0.5, 0.5, 0.15, 0xeab308, 0, -1.1, 0, 0);
      H.label('YELLOW → violet', -1.1, 0.55, 0, '#fff', 0.7);
      H.box(0.5, 0.5, 0.15, 0xea580c, 0, 0, 0, 0);
      H.label('ORANGE → blue (lift first!)', 0, 0.55, 0, '#fff', 0.7);
      H.box(0.5, 0.5, 0.15, 0xfef9c3, 0, 1.1, 0, 0);
      H.label('PALE 9-10 → ash/pearl', 1.1, 0.55, 0, '#fff', 0.7);
      // toner bottles + timer dial
      H.bottle(0x8b5cf6, null, -0.55, -1.0, 0.3, 0.55, 'VIOLET kills yellow', 1);
      H.bottle(0x2563eb, null, 0.55, -1.0, 0.3, 0.55, 'BLUE kills orange', 1);
      H.tor(0.3, 0.07, 0x23272f, 2, 0, 1.15, -0.6, 0);
      const hand = H.box(0.05, 0.3, 0.03, 0xe11d48, 2, 0, 1.25, -0.54);
      tickers.push(t => { hand.rotation.z = -((t * 0.8) % (Math.PI * 2)); });
      H.label('WATCH 5-20min visual', 0, 1.65, -0.6, '#fff', 0.75);
      // gloss + purple maintenance
      H.bottle(0xf9a8d4, null, -1.35, -1.05, -0.5, 0.5, 'GLOSS demi refresh', 3);
      H.bottle(0x6d28d9, null, 1.35, -1.05, -0.5, 0.5, 'PURPLE 1x/week', 3);
    },

    safetyDrill(R, H) {
      // PPE lineup
      H.box(0.4, 0.08, 0.5, 0x38bdf8, 0, -1.3, 0.2, 0);
      H.box(0.4, 0.08, 0.5, 0x38bdf8, 0, -0.8, 0.2, 0);
      H.label('GLOVES change if torn', -1.05, 0.6, 0, '#fff', 0.72);
      H.box(0.5, 0.6, 0.15, 0xf3ede0, 0, 0.1, 0.1, 0);
      H.label('APRON + barrier cream', 0.1, 0.75, 0, '#fff', 0.72);
      // eyewash + 15-min timer
      H.bottle(0x7dd3fc, 0xffffff, 1.3, -0.2, 0, 0.7, 'EYEWASH irrigate 15+', 1);
      H.tor(0.3, 0.07, 0x23272f, 1, 1.3, 0.85, 0, 0);
      H.box(0.05, 0.3, 0.03, 0xe11d48, 1, 1.3, 0.95, 0.06);
      // spill kit + dust mask + fan
      H.box(0.5, 0.35, 0.35, 0xfef3c7, 2, -1.1, -0.9, 0.3);
      H.label('SPILL kit damp-clean dust', -1.1, -0.4, 0.3, '#fff', 0.7);
      H.box(0.35, 0.2, 0.05, 0xe7e5e4, 2, -0.2, -0.9, 0.3);
      H.label('MASK bleach dust', -0.2, -0.55, 0.3, '#fff', 0.68);
      H.cyl(0.28, 0.28, 0.1, 0x9aa0ae, 2, 0.7, -0.9, 0.3, 16).rotation.x = Math.PI / 2;
      H.label('FAN fresh air, pause', 0.7, -0.45, 0.3, '#fff', 0.68);
      // incident log + follow-up phone
      H.box(0.6, 0.45, 0.05, 0xfffbeb, 3, 1.35, 0.35, -0.7);
      H.label('LOG what/when/action', 1.35, 0.8, -0.7, '#fff', 0.68);
      H.box(0.25, 0.45, 0.08, 0x1f2937, 3, -0.3, 0.9, -0.7);
      H.label('24H check-in call', -0.3, 1.3, -0.7, '#fff', 0.68);
    },

    aftercareKit(R, H) {
      // sulfate-free trio
      H.bottle(0x38bdf8, null, -1.2, -0.4, 0.3, 0.6, 'SULFATE-FREE wash', 0);
      H.bottle(0x8b5cf6, null, -0.55, -0.4, 0.3, 0.6, 'colour-safe cond', 0);
      H.bottle(0xf59e0b, null, 0.1, -0.4, 0.3, 0.6, 'HERO mask/oil', 0);
      H.label('PRESCRIBE 3 demo live', -0.55, 0.35, 0.3, '#fff', 0.75);
      // protein<->moisture balance scale
      H.cyl(0.05, 0.05, 0.9, 0x9aa0ae, 1, 0.9, 0.0, -0.3);
      H.box(0.7, 0.05, 0.05, 0x9aa0ae, 1, 0.9, 0.4, -0.3);
      H.box(0.25, 0.18, 0.12, 0xf59e0b, 1, 0.62, 0.28, -0.3);
      H.label('PROTEIN snaps', 0.62, 0.6, -0.3, '#fff', 0.6);
      H.box(0.25, 0.18, 0.12, 0x38bdf8, 1, 1.18, 0.28, -0.3);
      H.label('MOISTURE gummy', 1.18, 0.6, -0.3, '#fff', 0.6);
      // heat/sun/pool guard + cycle calendar
      H.box(0.4, 0.5, 0.1, 0x1f2937, 2, -1.2, 0.9, -0.7);
      H.label('HAT + UV + pre-wet pool', -1.2, 1.35, -0.7, '#fff', 0.68);
      H.box(0.9, 0.6, 0.06, 0xfffbeb, 2, 0.6, 1.0, -0.7);
      H.label('CYCLES retouch 4-6 · tone 4-6 · trim 6-8', 0.6, 1.5, -0.7, '#fff', 0.62);
      // 48h message
      H.box(0.5, 0.35, 0.08, 0x2dd4bf, 3, 0.2, -1.25, 0.5);
      H.label('"how is colour settling?" 48h', 0.2, -0.85, 0.5, '#fff', 0.68);
    },

    fixBench(R, H) {
      // fault cards
      const faults = [['BANDS', 0x57534e, -1.3], ['BRASS', 0xea580c, -0.45], ['FADE', 0xa8a29e, 0.4], ['FRIZZ/DROP', 0x38bdf8, 1.25]];
      faults.forEach(f => {
        H.box(0.4, 0.5, 0.06, f[1], 0, f[2], 0.5, 0);
        H.label(f[0], f[2], 0.95, 0, '#fff', 0.62);
      });
      // fix path arrows to solutions
      const fixes = [['re-lift blend', -1.3], ['lift+wheel tone', -0.45], ['fill+demi+seal', 0.4], ['protein+trim pause', 1.25]];
      fixes.forEach(f => {
        const a = H.arrow(0x2dd4bf, 1, 0.5); a.position.set(f[1], -0.15, 0); a.rotation.x = Math.PI;
        H.label(f[0], f[1], -0.75, 0, '#fff', 0.6);
      });
      // strand proof + camera + price
      H.box(0.4, 0.3, 0.05, 0xd7dae1, 2, -0.9, -1.25, 0.3);
      H.box(0.45, 0.3, 0.25, 0x23272f, 2, 0, -1.25, 0.3);
      H.label('STRAND proof + staged PHOTOS', -0.45, -0.8, 0.3, '#fff', 0.68);
      H.box(0.5, 0.3, 0.05, 0xfef3c7, 3, 1.0, -1.25, 0.3);
      H.label('PRICE stages never guesses', 1.0, -0.8, 0.3, '#fff', 0.68);
    }
  };

  const SCENES = {
    'hair-0': { b: 'station', t: 'Station setup & tool zones', s: [
      ['Chair + drape', 'Set chair height, sweep floor, neck strip then cape clipped snug — client fully covered before water or hair touches skin.'],
      ['Basin check', 'Wrist-test 37–40°C, medium pressure, neck supported. Modern salon standard: scald-guard mixer taps where fitted.'],
      ['Trolley zones', 'Clean tools left, used right — never cross. Barbicide-style jar for shears/combs, covered dry storage.'],
      ['Shear control point', 'Thumb + ring finger, thumb drives. The pivot is your control point — oil it weekly, close shears whenever you move.']
    ]},
    'hair-1': { b: 'strandLab', t: 'Shaft, follicle & porosity bench', s: [
      ['Cuticle → cortex → medulla', 'Scales protect; cortex holds keratin + melanin (strength and colour); medulla is an intermittent soft core. Chemicals must pass the cuticle first.'],
      ['Follicle + sebum', 'The bulb grows hair; sebaceous glands oil it. Over-washing strips sebum — prescribe by scalp, not habit.'],
      ['Float test', 'Clean strand in water: floats = low porosity (resistant, needs heat/help to absorb); sinks fast = high porosity (soaks colour, fades fast).'],
      ['Elasticity pull', 'Wet strand should stretch 30–50% and spring back. Mushy stretch = internal damage — reach for bond repair (K18/Olaplex-style) before heat or chemicals.']
    ]},
    'hair-2': { b: 'scalpScope', t: 'Trichoscope: scalp analysis', s: [
      ['Scan 4 quadrants', 'Work front-to-nape under a loupe or trichoscope camera — modern salons photograph the scalp to track flakes, density and regrowth over visits.'],
      ['Flakes vs lesions', 'Small dry white flakes = dandruff (exfoliating shampoo). Thick silvery plaques, yellow crusts or circular bald itchy patches = refer out.'],
      ['Red-flag drill', 'Live nits, tinea, open cuts, undiagnosed lumps: no service. Advise treatment, reschedule, note the card.'],
      ['Record + recommend', 'Log texture/density/porosity per zone and prescribe one product — analysis cards are legal protection and rebooking fuel.']
    ]},
    'hair-3': { b: 'basinService', t: 'Basin service & massage demo', s: [
      ['Position + temperature', 'Neck on the rest, cape sealed, 37–40°C wrist-tested. Comfort here decides whether clients rebook.'],
      ['Double cleanse', 'Wash 1 lifts oil and styling (little lather); wash 2 builds lather. Finger pads in zig-zags — never nails.'],
      ['5-minute massage arc', 'Effleurage → petrissage → friction on temples/occiput → tapotement → finishing strokes. Check pressure twice.'],
      ['Condition + cool seal', 'Squeeze water out first, mid-lengths to ends, comb ends-up, cool rinse to lay the cuticle. Match richness to porosity.']
    ]},
    'hair-4': { b: 'shearSection', t: 'Shears & sectioning map', s: [
      ['Anatomy: blades + pivot', 'Convex Japanese-style blades glide; the pivot screw sets tension — too loose and hair bends instead of cutting.'],
      ['Hold that cuts true', 'Thumb + ring finger, pinky on the tang. Only the thumb moves; index and middle guide the section.'],
      ['Map 4 + horseshoe', 'Centre part, ear-to-ear, nape-to-crown, plus horseshoe for control. Subsections ≤1 cm, combed flat, even tension.'],
      ['0° guide + cross-check', 'Cut palm-to-palm off a stationary guide, then comb opposite directions with the head straight and tilted. Detail edges dry.']
    ]},
    'hair-5': { b: 'elevationMap', t: 'Elevation wedges & face shapes', s: [
      ['0° one-length', 'Natural fall, heaviest perimeter — precision bobs and solid lines live here.'],
      ['45° graduation', 'Shorter inside, stacked weight outside — the classic graduated bob. Over-direct to push weight where the face needs it.'],
      ['90° layers', 'Even projection removes weight and adds movement. Point- or slide-cut to blend; check dry, since wet hair sits longer.'],
      ['Face-shape prescription', 'Round needs height + length; square needs softened jaw + side part; heart needs chin weight; long needs width + fringe. Offer two options, let the client choose.']
    ]},
    'hair-6': { b: 'heatStyle', t: 'Heat station: dryer, brush, IR iron', s: [
      ['Protect + rough-dry', 'Heat protectant mandatory (many now shield to 230°C), 80% rough-dry first — thermal tools never touch wet hair.'],
      ['Nozzle-down airflow', 'Point the nozzle down the shaft so the cuticle lies flat = shine. Cool shot locks the hydrogen-bond shape in place.'],
      ['Round-brush tension', 'Section, lift at the root for volume or pull smooth for sleek. Modern ionic dryers with scalp-sensing heat (e.g. AirLight-style) auto-cool near the scalp.'],
      ['Infrared iron pass', 'Far-infrared + titanium/ionic plates heat evenly so one slow pass beats three fast ones: ≤185°C fine/damaged, ≤210°C coarse. Serum ends, spray 20 cm away.']
    ]},
    'hair-7': { b: 'updoLab', t: 'Up-style anchor & pinning', s: [
      ['Prep for grip', 'Clean hair slips — mousse + texture spray and light crown backcombing give pins something to bite.'],
      ['Braid menu', '3-strand over, French feeding sides, Dutch under for 3D pop, fishtail for fine detail. Even tension, sealed ends, gentle pancaking for volume.'],
      ['Anchor at balance', 'Ponytail, cushion or padding centred over the occipital bone — the skull shelf that carries weight without pain.'],
      ['Pin + photograph', 'Rippled pins crossed and hidden, flyaways tamed with a wax stick, trial photos in 3 angles for wedding-day repeatability.']
    ]},
    'hair-8': { b: 'colorWheel', t: 'Wheel, levels, developers + scale', s: [
      ['Opposites neutralise', 'Blue kills orange, violet kills yellow, green kills red — the basis of every toner and colour correction.'],
      ['Read levels 1–10', 'Sort swatches blind: 1 black to 10 lightest blonde. Tone (.1 ash → .6 red) rides on top of level.'],
      ['Pick your volume', '10 deposit/darken, 20 grey + 1–2 lift, 30 for 2–3 lift, 40 max-lift high-risk. Stronger is not better — it is just more damage.'],
      ['Weigh + test', 'Digital gram scales, exact ratios (1:1 / 1:1.5 per brand), labelled bowl, timer on contact — plus 48h skin test and strand test. No test, no colour.']
    ]},
    'hair-9': { b: 'retouchMap', t: 'Regrowth & grey-coverage map', s: [
      ['Map the regrowth', 'Quadrant sections, ~1 cm of new growth. Lengths already coloured need protection, not more tint.'],
      ['Roots only', 'Retouch never drags through lengths — overlap causes banding. Refresh ends with demi/gloss in the last 10 minutes if needed.'],
      ['Grey needs N', 'Resistant grey lacks pigment, so add natural (N) base to fashion shade with 20 vol, fine sections, full time.'],
      ['Emulsify + card', 'Work the last 5 minutes, cool rinse, acidic seal — and record brand, shade, vol, ratio, time and a photo for next visit.']
    ]},
    'hair-10': { b: 'foilWork', t: 'Foils, balayage board, foilyage', s: [
      ['Weave vs slice', 'Fine weave = soft office-friendly dimension; slice = bold money-piece. Saturate edge to edge or the centre stays dark.'],
      ['Bricklay + seal', 'Stagger packets like brickwork so no harsh lines form. Check every 10 minutes with an elasticity pull.'],
      ['Board + sweep', 'A balayage board backs each panel while you feather a V with soft pressure — tease first (teasylights/foilyage) for a seamless blend zone.'],
      ['Tone on level', 'Ash and pearl only land on pale yellow (9–10). Gummy mid-process means rinse now, treat, and rebook — integrity first.']
    ]},
    'hair-11': { b: 'assessKit', t: 'Portfolio, retail & assessment', s: [
      ['Light it right', 'Ring light, same angle and distance every time, signed consent — before/afters must be honest and comparable.'],
      ['Prescribe 2–3', 'Diagnose, demo the products on the client, explain why for their hair. Retail is aftercare, not pressure.'],
      ['Rebook at the desk', 'Offer two times, 48h reminder, aftercare card with the formula. Retention beats acquisition.'],
      ['Pass the rubric', 'Theory ≥70% plus observed full service: consult, basin, cut or colour-assist, finish and home-care pitch.']
    ]},
    'skin-0': { b: 'skinRoom', t: 'Treatment room setup', s: [
      ['Bed + drape', 'Fresh linens every client, headband, blanket, knee roll. Privacy to change, chest covered, hair banded before you touch.'],
      ['Trolley zones', 'Clean left, dirty right; labelled bowls, single-use spatulas — double-dipping is never allowed.'],
      ['Lamp + steamer', 'Mag lamp angled, steamer filled with fresh water and held ~30 cm away. Test heat on your own wrist first.'],
      ['Consent first', 'Health form, allergies, eye-area and pregnancy flags signed before contact. Patch-test new products.']
    ]},
    'skin-1': { b: 'skinLayers', t: 'Layers, barrier & collagen', s: [
      ['Corneum bricks', 'Corneum cells are bricks, lipids are mortar — harsh foam dissolves the mortar and the barrier leaks.'],
      ['Acid mantle 4.5–5.5', 'Slightly acidic film keeps water in and irritants out. Tight and shiny after washing = stripped, go gentler.'],
      ['Dermis factory', 'Collagen and elastin springs plus blood feed the surface. UV, sugar and smoking break the springs — SPF is treatment #1.'],
      ['Feed + protect', 'Water, protein, vitamin C, essential fats, sleep and SPF beat any cream. Recommend lifestyle kindly, never diagnose.']
    ]},
    'skin-2': { b: 'faceAnalysis', t: 'Analysis & zone mapping', s: [
      ['Bare-skin observe', 'Remove makeup, wait 10 minutes, scan under the loupe: pores, flakes, vessels, lesions — T-zone and cheeks separately.'],
      ['Type vs condition', 'Type is genetic (dry/oily/combo/sensitive); condition is changeable (dehydrated, sensitised, acne grades). Treat the condition, respect the type.'],
      ['Blot + Wood’s lamp', 'Tissue maps oil per zone; a Wood’s lamp (where available) flags pigment and dehydration invisible in daylight.'],
      ['Multi-mask plan', 'Different masks per zone on one form — clay on the T, cream on cheeks, gel where sensitive. One goal per course.']
    ]},
    'skin-3': { b: 'exfolBar', t: 'Exfoliation depths bench', s: [
      ['Double-cleanse first', 'Oil/balm dissolves SPF and makeup, then a water-based gel or milk. Dry/sensitive skins want low-foam milky textures.'],
      ['Pick your depth', 'Scrubs stay surface-level; enzymes (papain/bromelain) suit sensitive; AHAs resurface and glow; BHA (salicylic) dives into oily pores.'],
      ['Time it, don’t overdo it', '10–15 minutes, 1–2x weekly. Mist before masks crack-dry; shine plus sting means the barrier is crying for a break.'],
      ['Seal thin to thick', 'Toner, serum, moisturiser, then SPF 30+ by day. Clay absorbs oil, cream nourishes, gel soothes — match the vehicle to the zone.']
    ]},
    'skin-4': { b: 'euroSteps', t: 'European facial: 10 stations', s: [
      ['Consult → analyse', 'Five minutes: history, analysis under the lamp, plan on the form. Product choice follows diagnosis, not habit.'],
      ['Cleanse → steam', 'Double cleanse plus exfoliant, then 5–7 minutes of steam at ~30 cm with eyes covered — skip steam for rosacea.'],
      ['Extract with limits', 'Tissue-wrapped fingers on open comedones only. Bleeding, pain or inflamed lesions = stop and refer the congestion medically.'],
      ['Massage → mask → seal', 'Ten minutes of massage, 12-minute mask, then tone, serum, moisturise and SPF — the 60-minute protocol timed to the minute.']
    ]},
    'skin-5': { b: 'massageFace', t: 'Massage & lymph map', s: [
      ['Direction up + out', 'Work along muscle fibres against gravity with cream/oil slip — support the skin with the other hand, never drag.'],
      ['Five moves, ten minutes', 'Effleurage warms up, petrissage tones, friction releases jaw and temples, tapotement stimulates, vibration calms to a close.'],
      ['Adapt the pressure', 'Skip tapotement on thin, inflamed or post-peel skin. Sensitive and acne skins get shorter, lighter passes.'],
      ['Drain to the nodes', 'Feather-light sweeps toward pre-auricular and submandibular nodes finish the facial — lymph lives just under the surface.']
    ]},
    'skin-6': { b: 'lesionLib', t: 'Lesion library: touch or refer', s: [
      ['Name it', 'Comedone, papule, pustule, cyst — plus dermatitis, rosacea patterns, cold sores, warts and changing moles (ABCDE) all have different lanes.'],
      ['Red = stop', 'Fever, infection, cold sores in the treatment area, impetigo, undiagnosed lumps: no facial. Kind refusal plus a referral protects everyone.'],
      ['Amber = adapt', 'Mild rosacea (no heat), controlled acne (no picking), pregnancy (no retinoids or strong acids) — gentler protocol, documented consent.'],
      ['Log everything', 'Photo, note, referral copy. Grade 3–4 acne and suspicious lesions belong with a GP or dermatologist, not your extraction loop.']
    ]},
    'skin-7': { b: 'browWax', t: 'Brow architecture & waxing', s: [
      ['Map three points', 'Start from nose wing to inner corner, arch via iris edge, end via outer corner — then step back and check symmetry before removing a hair.'],
      ['Patch-test 24h', 'Wax, tint and strip adhesive all get tested. No waxing over broken skin, sunburn, moles, varicose areas or recent retinoid use.'],
      ['Thin, taut, against', 'Cleanse, talc if sweaty, thin even layer with growth; remove against growth with skin held taut, then press to calm.'],
      ['Soothe + aftercare', 'No heat, sweat or fragrance for 24h. Tint patch-tests are mandatory, lash glue goes tacky ~30s, base always matched at the jawline.']
    ]},
    'skin-8': { b: 'chemLab', t: 'Ingredient lab: actives & vehicles', s: [
      ['Read INCI by percent', 'Highest % first. Know your heroes: niacinamide 2–5%, vitamin C 10–20% AM, retinoids pea-size PM, acids 1–2x weekly, ceramides for barrier.'],
      ['Match the vehicle', 'Gel for oily, lotion for combination, cream for dry, oil/balm for night repair. Hyaluronic goes on damp skin, then sealed.'],
      ['Build AM + SPF', 'Cleanser, antioxidant, moisturiser, SPF 30+ in two finger-lengths last. SPF is the only anti-ageing claim that never lies.'],
      ['Rotate PM actives', 'One new active at a time, two weeks apart, logged with photos. Retinoids ramp slowly with next-day SPF — never in pregnancy.']
    ]},
    'skin-9': { b: 'deviceSuite', t: 'Device suite: HF, LED, microcurrent', s: [
      ['High-frequency 3–5 min', 'Argon/violet electrode, ~5 mm spark gap, keep it moving on fairly dry skin. Forbidden with pacemakers, epilepsy, pregnancy or broken skin.'],
      ['LED red vs blue', 'Red (~630 nm) supports firmness and calm; blue (~415 nm) targets acne bacteria. Goggles on, 10–20 minutes, clean skin.'],
      ['Microcurrent glide', 'Low-level current (NuFace/Ziip-style) lifts and sculpts with conductive gel, always stroking upward — consistency beats intensity.'],
      ['Ultrasonic + log', 'Skin scrubbers and oxygen infusion support the manual facial, never replace it. Log device, intensity, time and skin response every session.']
    ]},
    'skin-10': { b: 'protocolArc', t: 'Targeted course arc', s: [
      ['One goal per course', 'Mild acne, pigment or firmness — never all three. HydraFacial-style 7-step logic applies: drain, exfoliate, extract, infuse, light, hydrate.'],
      ['Four to six weekly', 'Skin turns over in ~28 days, so courses run 4–6 sessions with same-light photos. Grades 3–4 acne go to a GP/derm.'],
      ['Home trio', 'Three items max with a written AM/PM. SPF decides pigment outcomes; picking bans decide acne outcomes.'],
      ['Luxury finish', 'Extended massage, double-mask ritual, booster vial, tool finish — charge for theatre plus measurable results, then rebook the next course.']
    ]},
    'skin-11': { b: 'deskLoop', t: 'Retention desk & assessment', s: [
      ['Sell courses, not singles', 'Diagnose, show the 4–6 plan with per-session pricing, honest promise, home-care — rebook before the client stands up.'],
      ['Review at the glow', 'Ask happy clients with a QR code at the brightest moment; before/afters need consent and identical lighting.'],
      ['Recover gracefully', 'Listen, remove the cause, cool and document, offer a free review slot — then log the lesson so it never repeats.'],
      ['Pass the rubric', 'Theory ≥70% plus an observed full European facial with massage, home-care pitch and course plan.']
    ]},
    'chemical-0': { b: 'phBench', t: 'pH bench & PPE drill', s: [
      ['Read the tower', 'Hair and skin live at pH 4.5–5.5. Tints sit ~9–11, relaxers ~12–14, conditioners and neutralisers ~3–5.'],
      ['Alkaline opens, acid seals', 'Ammonia/MEA swells the cuticle so chemicals enter; acidic sealers close it after. Wrong pH means damage, fade or frizz.'],
      ['Gloves + airflow', 'Powder-free gloves in your size, apron, barrier cream, food and candles away from chemicals — and ventilate the mixing zone with a fan.'],
      ['Pledge the tests', 'PPD allergy is lifelong, bleach dust irritates airways. No 48h skin test and strand test = no chemical, no exceptions.']
    ]},
    'chemical-1': { b: 'consultKit', t: 'Chemical consultation kit', s: [
      ['Trawl the history', 'Two years back: box black, henna/metallics, keratin, relaxers. Incompatibilities (henna + bleach, relaxer + bleach) melt hair.'],
      ['Test the fibre', 'Float for porosity, wet-stretch for elasticity, scalp check for breaks. Gummy stretch = treatment and trim plan, not chemicals.'],
      ['Prove with tests', 'Skin test 48h behind the ear, strand test with timer, mix, result and photo. The strand predicts the headline.'],
      ['Consent or kind no', 'Realistic result, maintenance, price and time — signed. Refusals get a safe alternative and a rebook, never a lecture.']
    ]},
    'chemical-2': { b: 'bondLab', t: 'Bonds, rods & repair', s: [
      ['Rungs and rails', 'Disulphide bonds are the rungs, keratin chains the rails. Perm lotion and lightener break rungs; neutraliser and care rebuild them.'],
      ['Break, shape, lock', 'Thio lotion softens, rods dictate the curl, acidic oxidising neutraliser locks it — shortchange the timing and the curl drops.'],
      ['Choose the system', 'Alkaline for resistant hair, acid/exothermic gentler for tinted hair, never perm fragile bleached hair. Papers flat, tension even.'],
      ['Build bonds back', 'Modern backwash heroes: Olaplex-style bond multipliers in the lightener, K18 peptide (4 minutes, no conditioner before) after. Less is more.']
    ]},
    'chemical-3': { b: 'rodPatterns', t: 'Wrapping patterns bench', s: [
      ['Bricklay for natural', 'Staggered bases diffuse section lines; rod diameter plus hair length sets the curl. Over-direct where you want volume.'],
      ['Spiral for length', 'Vertical winding for long hair and defined curls; piggyback/double-rod blends short-to-long zones.'],
      ['Papers + tension', 'Smooth end papers prevent fish-hooks; even tension prevents weak spots. Comfortable scalp, secure rods.'],
      ['Test curl + 5+5', 'Unwind one rod at three-quarter time for the S-hold, rinse rods-in 5+ minutes, neutralise, reapply, then condition — no shampoo for 48h.']
    ]},
    'chemical-4': { b: 'relaxMap', t: 'Relaxer map: virgin vs retouch', s: [
      ['Protect the scalp', 'Barrier/base cream, gloves, ventilation. Virgin application keeps lotion ~1 cm off the scalp until the end.'],
      ['Map new growth only', 'Retouch paints virgin regrowth exclusively — the overlap band is where breakage lives. Smooth with the back of the comb, never scratch.'],
      ['Pick the strength', 'Sodium hydroxide for resistant hair, thio-based for delicate/tinted, keratin/cysteine smoothing to tame frizz rather than bone-straighten.'],
      ['Rinse, neutralise, balance', 'Five-minute rinse, full-time neutralising shampoo, then a protein/moisture rotation with retouch booked 8–12 weeks out.']
    ]},
    'chemical-5': { b: 'volBench', t: 'Categories & developer ladder', s: [
      ['Five categories', 'Temporary coats, semi stains, demi deposits and blends grey, permanent lifts and covers, lighteners lift only and must be toned.'],
      ['Climb the ladder', '10 vol deposits, 20 covers grey and lifts 1–2, 30 lifts 2–3, 40 is maximum lift with maximum risk — patience beats volume.'],
      ['Grey logic', 'Resistant grey needs N base plus fashion tone, 20 vol, fine sections, full development time. Pre-soften per brand where directed.'],
      ['Weigh + card', 'Digital scale, exact ratio, labelled bowl, timer from first contact — and a formula card with photo or the next visit is guesswork.']
    ]},
    'chemical-6': { b: 'liftTunnel', t: 'Lift stages tunnel', s: [
      ['Read the undercoat', 'Red → orange → yellow → pale yellow. Dark bases cross these stages over multiple visits — one-day platinum from box black is breakage.'],
      ['Mix fresh + bond', 'Lightener loses power standing, so mix per application at 20/30 vol with a bond additive, working off-scalp (foils/balayage) first.'],
      ['Check quarterly-hour', 'Elasticity pulls every 15 minutes. Foil heat and scalp heat both accelerate — watch, don’t wander.'],
      ['Stop signs + tone-ready', 'Gummy, smoking or pain means rinse immediately, treat, rebook. Toners only refine pale-yellow (9–10) bases.']
    ]},
    'chemical-7': { b: 'dimensionLab', t: 'Dimensional colour bench', s: [
      ['Weave or slice', 'Weave for soft dimension, slice for bold panels and money-pieces. Saturate fully, seal firmly, stagger the placement.'],
      ['Paint the V', 'Balayage sweeps feathered from mid-lengths on a board; tease before foiling (foilyage/teasylights) for a grow-out with no lines.'],
      ['Diagnose corrective', 'Map bands, brass and porosity, strand-test the plan. Going darker on bleached hair needs a copper/gold fill first or it goes muddy.'],
      ['Quote the stages', 'Corrective is priced by tests plus stages plus maintenance — signed before mixing, photographed throughout.']
    ]},
    'chemical-8': { b: 'tonerBar', t: 'Toning bar & timer', s: [
      ['Match killer to brass', 'Violet cancels yellow, blue cancels orange, green cancels red. Check the wheel before reaching for the bowl.'],
      ['Base must be pale', 'Toner refines, it does not lift — ash over orange goes muddy, not clean. Lift first, tone second.'],
      ['Time it visually', 'Damp even application, 5–20 minutes with checks every 5. Rinse at target, cool, acidic seal, bond care.'],
      ['Maintain weekly', 'Violet/blue shampoo once a week (daily use dulls), sulphate-free washing, heat protection, re-tone booked at 4–6 weeks.']
    ]},
    'chemical-9': { b: 'safetyDrill', t: 'Safety & reaction drill', s: [
      ['PPE every service', 'Fitted gloves changed when torn, apron, barrier cream, eyes protected — know where the rinse station is before you need it.'],
      ['Splash protocol', 'Skin: rinse 15 minutes, remove contaminated clothing. Eyes: irrigate 15+ minutes and seek care. Fumes: fresh air, stop the service.'],
      ['Dust discipline', 'Non-dusty bleach handled gently, mask on, damp-clean spills — never dry-sweep lightener dust into the air you breathe.'],
      ['Log + follow up', 'Every incident gets what, when, action, referral and a 24-hour check-in call. Burn or allergy mid-process means rinse now.']
    ]},
    'chemical-10': { b: 'aftercareKit', t: 'Aftercare & maintenance kit', s: [
      ['Prescribe three', 'Sulphate-free colour-safe shampoo, matching conditioner, one hero (mask, oil or protectant) — demonstrated on the client.'],
      ['Balance the scale', 'Snaps on stretching = protein; gummy stretch = moisture and caution. Rotate treatments by the stretch test, not the calendar.'],
      ['Guard the investment', 'Heat protectant always, hat and UV spray in sun, pre-wet plus cap for pools, silk or satin at night, wide-tooth by day.'],
      ['Book the cycles', 'Retouch 4–6 weeks, toner 4–6, relaxer 8–12 on new growth only, trim 6–8 — booked before leaving, nudged at 48 hours.']
    ]},
    'chemical-11': { b: 'fixBench', t: 'Corrective troubleshooting board', s: [
      ['Diagnose + strand', 'Name the fault (bands, brass, fade, drop/frizz) and its cause, then prove the fix on a strand before touching the head.'],
      ['Stage the plan', 'Re-lift and blend bands without overlap, fill before darkening, tone on level, rebuild strength with protein/moisture plus a trim.'],
      ['Photograph proof', 'Same light, same angles, staged shots with formula cards — the portfolio that sells the next corrective.'],
      ['Price the stages', 'Tests plus stages plus maintenance, never a flat guess. Pass mark: theory ≥70% and an observed chemical service with aftercare pitch.']
    ]}
  };

  // Blender-rendered reference plates (public/img/plates/*.png) per demo scene
  const PLATE_BY_BUILDER = {
    station: 'basin', strandLab: 'chembench', scalpScope: 'facial', basinService: 'basin',
    shearSection: 'shears', elevationMap: 'shears', heatStyle: 'heat', updoLab: 'desk',
    colorWheel: 'colour', retouchMap: 'colour', foilWork: 'colour', assessKit: 'desk',
    skinRoom: 'facial', skinLayers: 'facial', faceAnalysis: 'facial', exfolBar: 'facial',
    euroSteps: 'facial', massageFace: 'facial', lesionLib: 'facial', browWax: 'facial',
    chemLab: 'chembench', deviceSuite: 'devices', protocolArc: 'devices', deskLoop: 'desk',
    phBench: 'chembench', consultKit: 'chembench', bondLab: 'rods', rodPatterns: 'rods',
    relaxMap: 'chembench', volBench: 'colour', liftTunnel: 'colour', dimensionLab: 'colour',
    tonerBar: 'colour', safetyDrill: 'chembench', aftercareKit: 'basin', fixBench: 'desk'
  };
  const PLATE_CAP = {
    shears: 'Reference plate (Blender): cutting shears + sectioning comb',
    heat: 'Reference plate (Blender): dryer + round brush + infrared iron',
    colour: 'Reference plate (Blender): tint bowl + brush + foils + developer + scale',
    basin: 'Reference plate (Blender): basin + backwash bottles + towels',
    facial: 'Reference plate (Blender): steamer + mask bowl + headband',
    devices: 'Reference plate (Blender): high-frequency + LED + microcurrent',
    chembench: 'Reference plate (Blender): beaker + pH strips + gloves + ventilation',
    rods: 'Reference plate (Blender): perm rods + end papers + tail comb',
    desk: 'Reference plate (Blender): ring light + camera + retail shelf'
  };

  // ---------- engine ----------
  window.initThree = function () {
    const wrap = document.getElementById('threeWrap');
    const box = document.getElementById('threeBox');
    if (!wrap || !box) return;
    if (typeof THREE === 'undefined') {
      box.innerHTML = '<p style="padding:20px">3D needs internet for the Three.js CDN — the written steps below still work.</p>';
      return;
    }
    if (booted) return; booted = true;
    const key = sceneKey();
    const entry = SCENES[key];
    if (!entry || !BUILDERS[entry.b]) {
      box.innerHTML = '<p style="padding:20px">Demo unavailable.</p>'; return;
    }
    const W = box.clientWidth || 300, Hh = 340;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101220);
    const cam = new THREE.PerspectiveCamera(50, W / Hh, 0.1, 100);
    cam.position.set(0, 1.0, 5.6);
    const ren = new THREE.WebGLRenderer({ antialias: true });
    ren.setSize(W, Hh); box.appendChild(ren.domElement);
    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const kl = new THREE.DirectionalLight(0xffffff, 1.1); kl.position.set(3, 5, 4); scene.add(kl);
    const p1 = new THREE.PointLight(0xec4899, 1.0, 25); p1.position.set(-3, 2, 2); scene.add(p1);
    const p2 = new THREE.PointLight(0x2dd4bf, 1.0, 25); p2.position.set(3, -1, 2); scene.add(p2);

    const root = new THREE.Group(); scene.add(root); rootRef = root;
    registry = []; tickers = [];
    const H = H_(root);
    BUILDERS[entry.b](root, H);
    highlight(stepIdx);

    let tx = 0, ty = 0.25, px = 0, py = 0.25, down = false, lx = 0, ly = 0, dist = 5.6;
    const el = ren.domElement; el.style.touchAction = 'none';
    el.addEventListener('pointerdown', e => { down = true; lx = e.clientX; ly = e.clientY; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', e => {
      if (!down) return;
      tx += (e.clientX - lx) * 0.008; ty += (e.clientY - ly) * 0.005;
      ty = Math.max(-1.2, Math.min(1.2, ty)); lx = e.clientX; ly = e.clientY;
    });
    el.addEventListener('pointerup', () => down = false);
    el.addEventListener('wheel', e => { e.preventDefault(); dist = Math.max(3, Math.min(10, dist + e.deltaY * 0.005)); }, { passive: false });
    const spin = document.getElementById('spinBtn');
    if (spin) spin.addEventListener('click', function () {
      spinning = !spinning; this.textContent = spinning ? '⏸ Pause spin' : '▶ Auto spin';
    });
    window.addEventListener('resize', () => {
      const w = box.clientWidth; ren.setSize(w, Hh); cam.aspect = w / Hh; cam.updateProjectionMatrix();
    });
    const clock = new THREE.Clock();
    (function anim() {
      requestAnimationFrame(anim);
      const t = clock.getElapsedTime();
      tickers.forEach(f => f(t));
      px += (tx - px) * 0.06; py += (ty - py) * 0.06;
      if (spinning && !down) tx += 0.0035;
      root.rotation.y = px; root.rotation.x = py * 0.45;
      cam.position.z += (dist - cam.position.z) * 0.1;
      cam.lookAt(0, 0, 0);
      ren.render(scene, cam);
    })();
  };

  document.addEventListener('DOMContentLoaded', () => {
    populateSteps();
    const pv = document.getElementById('stepPrev'), nx = document.getElementById('stepNext');
    if (pv) pv.addEventListener('click', () => showStep(stepIdx - 1));
    if (nx) nx.addEventListener('click', () => showStep(stepIdx + 1));
  });
})();
