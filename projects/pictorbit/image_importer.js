(() => {
  // ── Guard: only one instance ──────────────────────────────────────────────
  if (window.__pictorbitUI) {
    window.__pictorbitUI.style.display = 'flex';
    return;
  }

  // ── Inject Google Font ────────────────────────────────────────────────────
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;600&display=swap';
  document.head.appendChild(fontLink);

  // ── Styles ────────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #pictorbit-root * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'DM Sans', sans-serif; }

    #pictorbit-root {
      position: fixed;
      top: 60px;
      right: 24px;
      z-index: 999999;
      display: flex;
      flex-direction: column;
      width: 280px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 0 0 1.5px #00e5ff55, 0 8px 32px #000a, 0 2px 8px #00e5ff22;
      background: #0d1117;
      transition: box-shadow 0.2s;
    }
    #pictorbit-header { user-select: none; -webkit-user-select: none; }
    #pictorbit-root input, #pictorbit-root select {
      user-select: text;
      -webkit-user-select: text;
    }
    #pictorbit-root:hover {
      box-shadow: 0 0 0 1.5px #00e5ffaa, 0 12px 40px #000c, 0 2px 12px #00e5ff33;
    }

    /* ── Header ── */
    #pictorbit-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: linear-gradient(90deg, #00c8e0 0%, #00e5ff 60%, #00b4cc 100%);
      cursor: grab;
      flex-shrink: 0;
    }
    #pictorbit-header:active { cursor: grabbing; }

    #pictorbit-icon {
      font-size: 15px;
      line-height: 1;
    }
    #pictorbit-title {
      font-family: 'Space Mono', monospace;
      font-size: 10px;
      font-weight: 700;
      color: #001820;
      letter-spacing: 0.03em;
      flex: 1;
      line-height: 1.3;
    }
    #pictorbit-version {
      font-family: 'Space Mono', monospace;
      font-size: 9px;
      font-weight: 400;
      color: #003344aa;
      letter-spacing: 0.05em;
      margin-right: 4px;
    }

    /* Toggle collapse */
    #pictorbit-toggle {
      background: none;
      border: none;
      cursor: pointer;
      color: #001820;
      font-size: 13px;
      line-height: 1;
      padding: 2px 4px;
      border-radius: 4px;
      transition: background 0.15s;
      opacity: 0.7;
    }
    #pictorbit-toggle:hover { background: #ffffff30; opacity: 1; }

    /* Close button */
    #pictorbit-close {
      background: #cc0000;
      border: none;
      cursor: pointer;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      line-height: 1;
      padding: 3px 6px;
      border-radius: 5px;
      transition: background 0.15s, transform 0.1s;
      font-family: 'Space Mono', monospace;
    }
    #pictorbit-close:hover { background: #ff1a1a; transform: scale(1.08); }
    #pictorbit-close:active { transform: scale(0.95); }

    /* ── Body ── */
    #pictorbit-body {
      padding: 14px 14px 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow: hidden;
      transition: max-height 0.3s cubic-bezier(.4,0,.2,1), opacity 0.25s;
      max-height: 600px;
      opacity: 1;
    }
    #pictorbit-body.collapsed {
      max-height: 0;
      opacity: 0;
      padding-top: 0;
      padding-bottom: 0;
    }

    /* ── Section label ── */
    .pb-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #00e5ff88;
      margin-bottom: 4px;
      font-family: 'Space Mono', monospace;
    }

    /* ── Drop zone ── */
    #pictorbit-dropzone {
      border: 1.5px dashed #00e5ff55;
      border-radius: 8px;
      padding: 14px 10px;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
      background: #00e5ff08;
    }
    #pictorbit-dropzone:hover, #pictorbit-dropzone.drag-over {
      border-color: #00e5ff;
      background: #00e5ff15;
    }
    #pictorbit-dropzone .dz-icon { font-size: 22px; margin-bottom: 4px; }
    #pictorbit-dropzone .dz-hint {
      font-size: 11px;
      color: #8ab4be;
      line-height: 1.4;
    }
    #pictorbit-dropzone .dz-hint span { color: #00e5ff; font-weight: 600; }

    /* ── File queue ── */
    #pictorbit-queue {
      display: flex;
      flex-direction: column;
      gap: 4px;
      max-height: 90px;
      overflow-y: auto;
    }
    #pictorbit-queue::-webkit-scrollbar { width: 4px; }
    #pictorbit-queue::-webkit-scrollbar-track { background: #ffffff08; border-radius: 2px; }
    #pictorbit-queue::-webkit-scrollbar-thumb { background: #00e5ff44; border-radius: 2px; }

    .pb-queue-item {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #ffffff08;
      border-radius: 6px;
      padding: 5px 8px;
      font-size: 11px;
      color: #c0e8ef;
    }
    .pb-queue-item .qi-idx {
      font-family: 'Space Mono', monospace;
      font-size: 9px;
      color: #00e5ff;
      background: #00e5ff18;
      border-radius: 3px;
      padding: 1px 4px;
      flex-shrink: 0;
    }
    .pb-queue-item .qi-name {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .pb-queue-item .qi-rm {
      background: none;
      border: none;
      cursor: pointer;
      color: #ff4444;
      font-size: 12px;
      line-height: 1;
      padding: 0 2px;
      opacity: 0.6;
      flex-shrink: 0;
    }
    .pb-queue-item .qi-rm:hover { opacity: 1; }

    /* ── Options grid ── */
    .pb-options-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .pb-option {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .pb-option.full { grid-column: 1 / -1; }

    .pb-option input[type=number],
    .pb-option select {
      background: #ffffff0d;
      border: 1px solid #00e5ff33;
      border-radius: 6px;
      color: #c0e8ef;
      font-size: 12px;
      padding: 5px 8px;
      outline: none;
      width: 100%;
      transition: border-color 0.15s;
      font-family: 'DM Sans', sans-serif;
      user-select: text;
      -webkit-user-select: text;
      pointer-events: all;
    }
    .pb-option input[type=number]::-webkit-inner-spin-button {
      -webkit-appearance: inner-spin-button;
      opacity: 0.5;
      cursor: pointer;
    }
    .pb-option input[type=number]:focus,
    .pb-option select:focus { border-color: #00e5ff99; }
    .pb-option select option { background: #0d1117; }

    /* Hint text under inputs */
    .pb-hint {
      font-size: 10px;
      color: #5a8a96;
      line-height: 1.3;
      font-family: 'DM Sans', sans-serif;
    }

    /* ── Status bar ── */
    #pictorbit-status {
      font-size: 11px;
      color: #8ab4be;
      min-height: 16px;
      line-height: 1.4;
      text-align: center;
      font-family: 'Space Mono', monospace;
    }
    #pictorbit-status.ok  { color: #00e5aa; }
    #pictorbit-status.err { color: #ff5555; }
    #pictorbit-status.warn { color: #ffcc44; }

    /* ── Progress bar ── */
    #pb-prog-wrap {
      height: 3px;
      border-radius: 2px;
      background: #ffffff10;
      overflow: hidden;
      display: none;
    }
    #pb-prog-bar {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #00b4cc, #00e5ff);
      border-radius: 2px;
      transition: width 0.2s;
    }

    /* ── Convert button ── */
    #pictorbit-btn {
      border: none;
      border-radius: 8px;
      padding: 10px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      letter-spacing: 0.02em;
      background: linear-gradient(90deg, #00c8e0, #00e5ff);
      color: #001820;
      transition: opacity 0.15s, transform 0.1s, box-shadow 0.15s;
      font-family: 'DM Sans', sans-serif;
    }
    #pictorbit-btn:hover:not(:disabled) {
      box-shadow: 0 0 12px #00e5ff66;
      transform: translateY(-1px);
    }
    #pictorbit-btn:active:not(:disabled) { transform: translateY(0); }
    #pictorbit-btn:disabled { opacity: 0.35; cursor: not-allowed; }

    /* ── Cell info chip ── */
    #pb-cell-info {
      font-size: 10px;
      color: #00e5ff77;
      text-align: center;
      font-family: 'Space Mono', monospace;
    }
  `;
  document.head.appendChild(style);

  // ── Build DOM ─────────────────────────────────────────────────────────────
  const root = document.createElement('div');
  root.id = 'pictorbit-root';
  root.innerHTML = `
    <div id="pictorbit-header">
      <span id="pictorbit-icon">🎨</span>
      <span id="pictorbit-title">PICTORBIT<br>IMAGE IMPORTER</span>
      <span id="pictorbit-version">v2.0</span>
      <button id="pictorbit-toggle" title="Collapse">▲</button>
      <button id="pictorbit-close" title="Close">✕</button>
    </div>

    <div id="pictorbit-body">

      <!-- Drop zone -->
      <div>
        <div class="pb-label">Images</div>
        <div id="pictorbit-dropzone">
          <div class="dz-icon">🖼️</div>
          <div class="dz-hint">Drop images here or <span>click to browse</span><br>Multiple files supported</div>
        </div>
      </div>

      <!-- Queue -->
      <div id="pictorbit-queue-wrap" style="display:none">
        <div class="pb-label">Queue (<span id="pb-queue-count">0</span> / <span id="pb-max-cells">?</span> cells)</div>
        <div id="pictorbit-queue"></div>
      </div>

      <!-- Options -->
      <div>
        <div class="pb-label">Options</div>
        <div class="pb-options-grid">

          <div class="pb-option">
            <div class="pb-label" style="margin-bottom:0">Start Cell</div>
            <input type="number" id="pb-opt-startcell" value="-1" min="-1">
            <span class="pb-hint">-1 = use current selected cell</span>
          </div>

          <div class="pb-option">
            <div class="pb-label" style="margin-bottom:0">Quality</div>
            <input type="number" id="pb-opt-quality" value="32" min="1" max="128">
            <span class="pb-hint">1–128. Lower = more colors</span>
          </div>

          <div class="pb-option full">
            <div class="pb-label" style="margin-bottom:0">Aliasing</div>
            <select id="pb-opt-alias">
              <option value="none">Nearest Neighbor (crisp)</option>
              <option value="low">Bilinear – Low</option>
              <option value="medium" selected>Bilinear – Medium</option>
              <option value="high">Bilinear – High</option>
            </select>
            <span class="pb-hint">Nearest = pixel-art look. Bilinear = smoother scaling</span>
          </div>

        </div>
      </div>

      <!-- Progress -->
      <div id="pb-prog-wrap"><div id="pb-prog-bar"></div></div>

      <!-- Status -->
      <div id="pictorbit-status">No painter detected yet.</div>
      <div id="pb-cell-info"></div>

      <!-- Convert -->
      <button id="pictorbit-btn" disabled>⚡ Convert!</button>

      <!-- Credits -->
      <div style="text-align:center; font-size:9.5px; color:#2a5a66; font-family:'Space Mono',monospace; padding-top:2px; padding-bottom:2px; line-height:1.5;">
        Danidanijr &amp; Claude AI for the UI
      </div>

    </div>
  `;
  document.body.appendChild(root);
  window.__pictorbitUI = root;

  // ── Element refs ──────────────────────────────────────────────────────────
  const header    = root.querySelector('#pictorbit-header');
  const body      = root.querySelector('#pictorbit-body');
  const toggleBtn = root.querySelector('#pictorbit-toggle');
  const closeBtn  = root.querySelector('#pictorbit-close');
  const dropzone  = root.querySelector('#pictorbit-dropzone');
  const queueEl   = root.querySelector('#pictorbit-queue');
  const queueWrap = root.querySelector('#pictorbit-queue-wrap');
  const queueCount= root.querySelector('#pb-queue-count');
  const maxCellsEl= root.querySelector('#pb-max-cells');
  const statusEl  = root.querySelector('#pictorbit-status');
  const cellInfo  = root.querySelector('#pb-cell-info');
  const progWrap  = root.querySelector('#pb-prog-wrap');
  const progBar   = root.querySelector('#pb-prog-bar');
  const convertBtn= root.querySelector('#pictorbit-btn');
  const optStart  = root.querySelector('#pb-opt-startcell');
  const optQuality= root.querySelector('#pb-opt-quality');
  const optAlias  = root.querySelector('#pb-opt-alias');

  // ── State ─────────────────────────────────────────────────────────────────
  let imageQueue  = []; // Array of File objects
  let collapsed   = false;

  // ── Painter status poller ─────────────────────────────────────────────────
  function checkPainter() {
    try {
      const canvas = ig?.game?.painter?.canvas;
      if (canvas !== undefined && canvas !== null) {
        const maxCells = ig.game.painter.maxCells ?? '?';
        maxCellsEl.textContent = maxCells;
        statusEl.textContent = `Painter open · ${maxCells} cell(s)`;
        statusEl.className = 'ok';
        cellInfo.textContent = `ig.game.painter.maxCells = ${maxCells}`;
        updateConvertBtn();
        return;
      }
    } catch(e) {}
    statusEl.textContent = 'Painter not open. Open + CREATE first.';
    statusEl.className = 'warn';
    cellInfo.textContent = '';
    convertBtn.disabled = true;
  }
  setInterval(checkPainter, 1000);
  checkPainter();

  function updateConvertBtn() {
    try {
      const painterOpen = ig?.game?.painter?.canvas != null;
      convertBtn.disabled = !(painterOpen && imageQueue.length > 0);
    } catch(e) {
      convertBtn.disabled = true;
    }
  }

  // ── Collapse / expand ─────────────────────────────────────────────────────
  toggleBtn.addEventListener('click', () => {
    collapsed = !collapsed;
    body.classList.toggle('collapsed', collapsed);
    toggleBtn.textContent = collapsed ? '▼' : '▲';
  });

  // ── Close (destroy) ───────────────────────────────────────────────────────
  closeBtn.addEventListener('click', () => {
    root.remove();
    style.remove();
    fontLink.remove();
    delete window.__pictorbitUI;
  });

  // ── Drag to move ──────────────────────────────────────────────────────────
  let dragging = false, dragOX = 0, dragOY = 0;
  header.addEventListener('mousedown', e => {
    if (e.target === toggleBtn || e.target === closeBtn) return;
    dragging = true;
    const rect = root.getBoundingClientRect();
    dragOX = e.clientX - rect.left;
    dragOY = e.clientY - rect.top;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
  });
  function onDrag(e) {
    if (!dragging) return;
    root.style.right  = 'auto';
    root.style.left   = (e.clientX - dragOX) + 'px';
    root.style.top    = (e.clientY - dragOY) + 'px';
  }
  function stopDrag() {
    dragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
  }

  // ── File input (hidden) ───────────────────────────────────────────────────
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.multiple = true;
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);

  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('drag-over'); });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('drag-over'));
  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.classList.remove('drag-over');
    addFiles([...e.dataTransfer.files]);
  });
  fileInput.addEventListener('change', () => {
    addFiles([...fileInput.files]);
    fileInput.value = '';
  });

  function addFiles(files) {
    files.filter(f => f.type.startsWith('image/')).forEach(f => imageQueue.push(f));
    renderQueue();
    updateConvertBtn();
  }

  function renderQueue() {
    queueEl.innerHTML = '';
    if (imageQueue.length === 0) {
      queueWrap.style.display = 'none';
      return;
    }
    queueWrap.style.display = 'block';
    queueCount.textContent = imageQueue.length;
    imageQueue.forEach((f, i) => {
      const item = document.createElement('div');
      item.className = 'pb-queue-item';
      const startCell = parseInt(optStart.value);
      const cellIdx = startCell === -1 ? `cur+${i}` : (startCell + i);
      item.innerHTML = `
        <span class="qi-idx">cell ${cellIdx}</span>
        <span class="qi-name" title="${f.name}">${f.name}</span>
        <button class="qi-rm" title="Remove">✕</button>
      `;
      item.querySelector('.qi-rm').addEventListener('click', () => {
        imageQueue.splice(i, 1);
        renderQueue();
        updateConvertBtn();
      });
      queueEl.appendChild(item);
    });
  }

  optStart.addEventListener('input', renderQueue);

  // ── Core: load image onto canvas and encode ───────────────────────────────
  function loadImageFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // ── Convert handler ───────────────────────────────────────────────────────
  convertBtn.addEventListener('click', async () => {
    if (imageQueue.length === 0) return;

    const painter  = ig.game.painter;
    const maxCells = painter.maxCells ?? imageQueue.length;    const quality  = Math.max(1, Math.min(128, parseInt(optQuality.value) || 32));
    const aliasMode= optAlias.value;
    let   startCell= parseInt(optStart.value);
    if (isNaN(startCell)) startCell = -1;
    if (startCell === -1)  startCell = painter.selectedCell ?? 0;

    const toProcess = imageQueue.slice(0, maxCells - startCell);
    if (toProcess.length === 0) {
      setStatus('Start cell is beyond painter range!', 'err');
      return;
    }

    convertBtn.disabled  = true;
    progWrap.style.display = 'block';

    // ── Step 1: load all images ──────────────────────────────────────────────
    setStatus('Loading images…');
    const loadedImgs = [];
    for (let i = 0; i < toProcess.length; i++) {
      try {
        loadedImgs.push(await loadImageFile(toProcess[i]));
      } catch (err) {
        setStatus(`Failed to load image ${i+1}: ${err.message}`, 'err');
        progWrap.style.display = 'none';
        convertBtn.disabled = false;
        return;
      }
    }
    setProgress(15);

    // ── Step 2: build ONE merged palette from ALL images ─────────────────────
    // Manyland has a single painter.data.colors shared across all cells.
    // We must quantize colors from every image together so each cell's
    // colors are all represented in the shared palette.
    setStatus('Building shared palette…');
    const pw = painter.data.pixels[0][0].length;
    const ph = painter.data.pixels[0].length;

    const mergedFreqMap = {};

    for (let i = 0; i < loadedImgs.length; i++) {
      const img = loadedImgs[i];
      const iw = img.width, ih = img.height;

      // Render image into temp canvas at painter resolution
      const tmpCanvas = document.createElement('canvas');
      tmpCanvas.width = pw; tmpCanvas.height = ph;
      const tmpCtx = tmpCanvas.getContext('2d');
      if (aliasMode === 'none') {
        tmpCtx.imageSmoothingEnabled = false;
      } else {
        tmpCtx.imageSmoothingEnabled = true;
        tmpCtx.imageSmoothingQuality = aliasMode;
      }
      const scale = Math.min(pw / iw, ph / ih);
      const dw = Math.round(iw * scale), dh = Math.round(ih * scale);
      const dx = Math.round((pw - dw) / 2), dy = Math.round((ph - dh) / 2);
      tmpCtx.drawImage(img, dx, dy, dw, dh);

      const pixels = tmpCtx.getImageData(0, 0, pw, ph).data;
      const isSquare = (iw === ih);

      for (let p = 0; p < pixels.length; p += 4) {
        const r = pixels[p], g = pixels[p+1], b = pixels[p+2], a = pixels[p+3];
        const qr = Math.min(Math.round(r / quality) * quality, 255);
        const qg = Math.min(Math.round(g / quality) * quality, 255);
        const qb = Math.min(Math.round(b / quality) * quality, 255);
        const qa = Math.min(Math.round(a / quality) * quality, 255);
        const key = `${qr},${qg},${qb},${qa}`;
        mergedFreqMap[key] = (mergedFreqMap[key] ?? 0) + 1;
      }

      if (!isSquare) mergedFreqMap['0,0,0,0'] = Infinity;
    }

    // Sort by combined frequency, take top 56
    const sharedSorted = Object.entries(mergedFreqMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 56)
      .map(([k]) => k.split(',').map(Number));

    const sharedPalette = sharedSorted.map(([r, g, b, a]) => ({ r, g, b, alpha: a / 255 }));
    painter.data.colors = sharedPalette;

    setProgress(35);

    // ── Step 3: encode each image against the shared palette ─────────────────
    function distance(c1, c2) {
      return (c1[0]-c2[0])**2 + (c1[1]-c2[1])**2 +
             (c1[2]-c2[2])**2 + (c1[3]-c2[3])**2;
    }
    function closestIdx(rgba) {
      let best = 0, bestDist = Infinity;
      for (let j = 0; j < sharedSorted.length; j++) {
        const d = distance(rgba, sharedSorted[j]);
        if (d < bestDist) { bestDist = d; best = j; }
      }
      return best;
    }

    for (let i = 0; i < loadedImgs.length; i++) {
      const cellIdx = startCell + i;
      setStatus(`Encoding image ${i+1} / ${loadedImgs.length} → cell ${cellIdx}…`);
      setProgress(35 + ((i / loadedImgs.length) * 60));

      const img = loadedImgs[i];
      const iw = img.width, ih = img.height;

      const canvas = document.createElement('canvas');
      canvas.width = pw; canvas.height = ph;
      const ctx = canvas.getContext('2d');
      if (aliasMode === 'none') {
        ctx.imageSmoothingEnabled = false;
      } else {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = aliasMode;
      }
      const scale = Math.min(pw / iw, ph / ih);
      const dw = Math.round(iw * scale), dh = Math.round(ih * scale);
      const dx = Math.round((pw - dw) / 2), dy = Math.round((ph - dh) / 2);
      ctx.drawImage(img, dx, dy, dw, dh);

      const pixels = ctx.getImageData(0, 0, pw, ph).data;
      const cellPixels = Array.from({length: ph}, () => new Array(pw).fill(0));

      for (let p = 0; p < pixels.length; p += 4) {
        const xi = Math.floor(p / 4) % pw;
        const yi = Math.floor(p / 4 / pw);
        cellPixels[xi][yi] = closestIdx([pixels[p], pixels[p+1], pixels[p+2], pixels[p+3]]);
      }

      painter.data.pixels[cellIdx] = cellPixels;
    }

    setProgress(100);
    setStatus(`✓ ${loadedImgs.length} image(s) imported!`, 'ok');

    // Refresh painter canvas
    try { painter.update(); } catch(e) {}

    setTimeout(() => {
      progWrap.style.display = 'none';
      setProgress(0);
      updateConvertBtn();
    }, 1800);
  });

  function setStatus(msg, cls = '') {
    statusEl.textContent = msg;
    statusEl.className = cls;
  }
  function setProgress(pct) {
    progBar.style.width = pct + '%';
  }

})();
