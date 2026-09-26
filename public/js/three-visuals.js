// Three.js procedural 3D labs — hair / skin / chem. Touch + mouse orbit, no assets.
(function () {
  let inited = false, spinning = true, layerMode = 0, raf;
  window.initThree = function () {
    const wrap = document.getElementById('threeWrap');
    const box = document.getElementById('threeBox');
    if (!wrap || !box || typeof THREE === 'undefined') return;
    if (inited) return; inited = true;
    const theme = wrap.dataset.theme || 'hair';
    const W = box.clientWidth || 300, H = 340;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a14);
    scene.fog = new THREE.Fog(0x0a0a14, 8, 20);
    const cam = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    cam.position.set(0, 1.2, 5.2);
    const ren = new THREE.WebGLRenderer({ antialias: true });
    ren.setSize(W, H); box.appendChild(ren.domElement);
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1); key.position.set(3, 5, 4); scene.add(key);
    const pink = new THREE.PointLight(0xec4899, 1.2, 20); pink.position.set(-3, 2, 2); scene.add(pink);
    const teal = new THREE.PointLight(0x2dd4bf, 1.2, 20); teal.position.set(3, -1, 2); scene.add(teal);

    const root = new THREE.Group(); scene.add(root);
    const label = (txt, x, y, z, color = '#fff') => {
      const c = document.createElement('canvas'); c.width = 256; c.height = 64;
      const g = c.getContext('2d'); g.fillStyle = 'rgba(0,0,0,0)'; g.fillRect(0, 0, 256, 64);
      g.font = 'bold 26px sans-serif'; g.fillStyle = color; g.textAlign = 'center'; g.fillText(txt, 128, 42);
      const t = new THREE.CanvasTexture(c);
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, transparent: true }));
      s.position.set(x, y, z); s.scale.set(1.6, 0.4, 1); root.add(s);
    };

    if (theme === 'hair') {
      const head = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 24), new THREE.MeshStandardMaterial({ color: 0xe8b98a, roughness: .6 }));
      head.scale.set(0.85, 1.05, 0.9); root.add(head);
      label('HEAD', 0, 1.6, 0, '#fbbf24');
      // hair strands
      for (let i = 0; i < 90; i++) {
        const a = (i / 90) * Math.PI * 2;
        const pts = [];
        for (let j = 0; j <= 8; j++) {
          const t = j / 8;
          pts.push(new THREE.Vector3(Math.cos(a) * (0.9 - t * 0.1), 1.0 - t * 1.8 + Math.sin(t * 5 + a) * 0.08, Math.sin(a) * (0.95 - t * 0.1)));
        }
        const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: i % 3 ? 0x8b5cf6 : 0xec4899 }));
        root.add(line);
      }
      // cutting guide plane
      const guide = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.02, 8, 48), new THREE.MeshBasicMaterial({ color: 0x2dd4bf }));
      guide.rotation.x = Math.PI / 2; guide.position.y = 0.1; root.add(guide);
      label('0° GUIDE', 1.5, 0.1, 0, '#2dd4bf');
      // follicle zoom dot
      const fol = new THREE.Mesh(new THREE.CylinderGeometry(.12, .18, .5, 12), new THREE.MeshStandardMaterial({ color: 0xf472b6 }));
      fol.position.set(-1.6, -0.6, 0); root.add(fol); label('FOLLICLE', -1.6, 0, 0, '#f472b6');
    } else if (theme === 'skin') {
      const layers = [
        { c: 0xfbbf24, y: 1.2, n: 'CORNEUM (barrier)' },
        { c: 0xfb923c, y: 0.6, n: 'EPIDERMIS' },
        { c: 0xef4444, y: 0.0, n: 'DERMIS (collagen)' },
        { c: 0xec4899, y: -0.6, n: 'HYPODERMIS (fat)' }
      ];
      layers.forEach((L, i) => {
        const m = new THREE.Mesh(new THREE.CylinderGeometry(1.4 - i * 0.08, 1.4 - i * 0.08, 0.5, 28),
          new THREE.MeshStandardMaterial({ color: L.c, roughness: .5, transparent: true, opacity: .92 }));
        m.position.y = L.y; m.userData.i = i; root.add(m);
        label(L.n, 0, L.y + 0.42, 0, '#fff');
      });
      // vessels in dermis
      for (let i = 0; i < 12; i++) {
        const v = new THREE.Mesh(new THREE.TorusGeometry(.12, .03, 8, 16), new THREE.MeshBasicMaterial({ color: 0x7f1d1d }));
        v.position.set(Math.cos(i) * .7, 0, Math.sin(i) * .7); root.add(v);
      }
    } else {
      // chem: pH tower + colour wheel
      for (let i = 0; i < 14; i++) {
        const h = 0.22;
        const col = new THREE.Color().setHSL(i / 14 * 0.75, 0.8, 0.55);
        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.5, h, 0.5), new THREE.MeshStandardMaterial({ color: col }));
        bar.position.set(-1.2, -1.4 + i * 0.24, 0); bar.userData.i = i; root.add(bar);
      }
      label('pH 0 acid → 14 alkaline', -1.2, 2.2, 0, '#fbbf24');
      label('hair 4.5–5.5', -1.2, -1.8, 0, '#2dd4bf');
      const wheel = new THREE.Group();
      for (let i = 0; i < 12; i++) {
        const s = new THREE.Mesh(new THREE.BoxGeometry(.32, .32, .12),
          new THREE.MeshStandardMaterial({ color: new THREE.Color().setHSL(i / 12, 0.85, 0.55) }));
        const a = i / 12 * Math.PI * 2;
        s.position.set(Math.cos(a) * 1.0, Math.sin(a) * 1.0, 0); s.rotation.z = a;
        wheel.add(s);
      }
      wheel.position.set(1.4, 0.2, 0); root.add(wheel);
      label('COLOUR WHEEL', 1.4, 1.6, 0, '#fff');
      const helix = [];
      for (let i = 0; i <= 40; i++) {
        const t = i / 40, a = t * Math.PI * 4;
        helix.push(new THREE.Vector3(1.4 + Math.cos(a) * .35, -1.4 + t * 1.2, Math.sin(a) * .35));
      }
      root.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(helix), new THREE.LineBasicMaterial({ color: 0xffffff })));
      label('levels 1→10', 1.4, -1.8, 0, '#a78bfa');
    }

    // orbit (mouse + touch)
    let tx = 0, ty = 0.3, px = 0, py = 0.3, down = false, lx = 0, ly = 0, dist = 5.2;
    const el = ren.domElement;
    el.style.touchAction = 'none';
    el.addEventListener('pointerdown', e => { down = true; lx = e.clientX; ly = e.clientY; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', e => { if (!down) return; tx += (e.clientX - lx) * 0.008; ty += (e.clientY - ly) * 0.005; ty = Math.max(-1.2, Math.min(1.2, ty)); lx = e.clientX; ly = e.clientY; });
    el.addEventListener('pointerup', () => down = false);
    el.addEventListener('wheel', e => { e.preventDefault(); dist = Math.max(3, Math.min(9, dist + e.deltaY * 0.005)); }, { passive: false });

    document.getElementById('spinBtn').addEventListener('click', function () {
      spinning = !spinning; this.textContent = spinning ? '⏸ Pause spin' : '▶ Auto spin';
    });
    document.getElementById('layerBtn').addEventListener('click', function () {
      layerMode = (layerMode + 1) % 3;
      root.children.forEach(ch => { if (ch.userData && ch.userData.i !== undefined) ch.visible = layerMode === 0 || (layerMode === 1 ? ch.userData.i < 2 : true); });
      this.textContent = ['🔍 all layers', '🔍 top layers', '🔍 exploded'][layerMode];
      if (layerMode === 2) root.children.forEach(ch => { if (ch.position && ch.userData.i !== undefined) ch.position.y += ch.userData.i * 0.15; });
    });

    window.addEventListener('resize', () => {
      const w = box.clientWidth; ren.setSize(w, H); cam.aspect = w / H; cam.updateProjectionMatrix();
    });

    (function anim() {
      raf = requestAnimationFrame(anim);
      px += (tx - px) * 0.06; py += (ty - py) * 0.06;
      if (spinning && !down) tx += 0.004;
      root.rotation.y = px; root.rotation.x = py * 0.5;
      cam.position.z += (dist - cam.position.z) * 0.1;
      cam.lookAt(0, 0.1, 0);
      ren.render(scene, cam);
    })();
  };
})();
