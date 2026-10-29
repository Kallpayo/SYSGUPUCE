# -*- coding: utf-8 -*-
import io

raw = io.open('ProgramaPosgradoForm.html', 'rb').read().decode('utf-8')
crlf = '\r\n' in raw
code = raw.replace('\r\n', '\n')

def apply(old, new, label):
    global code
    assert old in code, "NO ENCONTRADA: " + label
    assert code.count(old) == 1, "AMBIGUA (%d): %s" % (code.count(old), label)
    code = code.replace(old, new)
    print("OK:", label)

# ---------- 1. BARRA DE CICLO DE VIDA + MODAL DE CAMBIO (HTML) ----------
BLOQUE_HTML = '''
    <!-- [NUEVO Req-5] BARRA DE ACCIONES SEGUN CICLO DE VIDA (visible solo si Vigente) -->
    <div id="progLifecycleBar" class="hidden flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
      <span class="text-xs font-bold text-slate-500 uppercase"><i class="fas fa-lock mr-1"></i>Programa VIGENTE:</span>
      <button type="button" id="btnRegistrarCambio"
        class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors">
        <i class="fas fa-code-branch"></i> Registrar Rediseño / Cambio
      </button>
      <button type="button" id="btnVerVidaPrograma"
        class="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors">
        <i class="fas fa-history"></i> Reporte de Vida del Programa
      </button>
    </div>

    <!-- BOTÓN DE GUARDADO -->'''
apply('''    <!-- BOTÓN DE GUARDADO -->''', BLOQUE_HTML, "barra lifecycle insertada")

MODAL_CAMBIO = '''<!-- [NUEVO Req-5] MODAL DE REGISTRO DE REDISEÑO/CAMBIO -->
<div id="cambioModal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 hidden">
  <div class="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
    <h3 class="text-lg font-bold text-slate-800"><i class="fas fa-code-branch text-amber-500"></i> Registrar Cambio sobre Programa Vigente</h3>
    <p class="text-xs text-slate-500">Este registro NO reinicia la fase regulatoria (RUGS Art. 46-49 / reformulación CES). Hereda la aprobación original y genera una nueva versión del programa. Las cohortes abiertas antes del cambio pertenecen a la versión anterior.</p>
    <div><label class="block text-xs font-semibold text-slate-700 mb-1">Tipo de Cambio *</label>
      <select id="cmbTipo" class="w-full text-sm rounded-lg border border-slate-300 p-2 bg-white">
        <option value="REDISEÑO">Rediseño</option>
        <option value="CAMBIO SUSTANTIVO">Cambio Sustantivo (pensum / duración / mención / modalidad)</option>
        <option value="CAMBIO NO SUSTANTIVO">Cambio No Sustantivo (ajuste menor)</option>
        <option value="ACTUALIZACIÓN NORMATIVA">Actualización Normativa</option>
      </select></div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div><label class="block text-xs font-semibold text-slate-700 mb-1">Fecha del Cambio</label>
        <input type="date" id="cmbFecha" class="w-full text-sm rounded-lg border border-slate-300 p-2"></div>
      <div><label class="block text-xs font-semibold text-slate-700 mb-1">Resolución CES (si aplica)</label>
        <input type="text" id="cmbResCES" class="w-full text-sm rounded-lg border border-slate-300 p-2"></div>
    </div>
    <div><label class="block text-xs font-semibold text-slate-700 mb-1">Descripción del cambio *</label>
      <textarea id="cmbDesc" rows="3" class="w-full text-sm rounded-lg border border-slate-300 p-2" placeholder="Ej.: Reducción de 4 a 3 periodos académicos; modificación de pensum..."></textarea></div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div><label class="block text-xs font-semibold text-slate-700 mb-1">Estado Anterior</label>
        <input type="text" id="cmbAnterior" class="w-full text-sm rounded-lg border border-slate-300 p-2"></div>
      <div><label class="block text-xs font-semibold text-slate-700 mb-1">Estado Nuevo</label>
        <input type="text" id="cmbNuevo" class="w-full text-sm rounded-lg border border-slate-300 p-2"></div>
    </div>
    <div id="cmbFeedback" class="hidden p-3 rounded-lg text-xs font-medium"></div>
    <div class="flex justify-end gap-2">
      <button type="button" id="cmbCancel" class="px-4 py-2 text-sm border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50">Cancelar</button>
      <button type="button" id="cmbSave" class="px-5 py-2 text-sm bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold">Registrar Cambio</button>
    </div>
  </div>
</div>

<!-- MODAL DE NOTIFICACIÓN SPA CORREGIDO CON TAILWIND -->'''
apply('''<!-- MODAL DE NOTIFICACIÓN SPA CORREGIDO CON TAILWIND -->''', MODAL_CAMBIO, "modal cambio insertado")

# ---------- 2. JS: reglas de ciclo de vida ----------
REGLAS_JS = '''
  // ─────────── [NUEVO Req-5] REGLAS DE CICLO DE VIDA DEL PROGRAMA ───────────
  // Vigente => campos nucleales congelados (disabled: no viajan en FormData y
  // updateProgramaPosgrado itera solo las claves recibidas => quedan intactos).
  // Complementario (resoluciones/fechas/SNIESE/vigencia) sigue editable.
  function aplicarReglasCicloDeVida(p) {
    const vigente = p.estadoPropuesta === 'Vigente';
    const bar = document.getElementById('progLifecycleBar');
    if (bar) bar.classList.toggle('hidden', !vigente);

    const nucleales = ['progFacultad', 'progNombre', 'progMencion', 'progModalidad', 'progDuracion', 'progCosto'];
    nucleales.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.disabled = vigente;
      if (vigente) {
        el.classList.add('bg-slate-100', 'text-slate-500');
        el.title = 'Campo congelado por aprobación. Use "Registrar Rediseño / Cambio".';
      } else {
        el.classList.remove('bg-slate-100', 'text-slate-500');
        el.title = '';
      }
    });

    // Responsable academico: sin cambio en caliente desde este form si Vigente
    const clearBtn = document.getElementById('progClearCoordBtn');
    const editBtn = document.getElementById('progEditCoordBtn');
    const searchBox = document.getElementById('progCoordSearchContainer');
    if (clearBtn) clearBtn.style.display = vigente ? 'none' : '';
    if (editBtn) editBtn.style.display = vigente ? 'none' : '';
    if (searchBox && vigente) searchBox.style.display = 'none';
    else if (searchBox) searchBox.style.display = '';
  }

  // Modal de rediseño/cambio
  const btnCambio = document.getElementById('btnRegistrarCambio');
  const modalCambio = document.getElementById('cambioModal');
  if (btnCambio && modalCambio) {
    btnCambio.onclick = () => {
      modalCambio.classList.remove('hidden');
      document.getElementById('cmbFecha').value = new Date().toISOString().slice(0, 10);
      const fb = document.getElementById('cmbFeedback');
      fb.classList.add('hidden');
    };
    document.getElementById('cmbCancel').onclick = () => modalCambio.classList.add('hidden');
    document.getElementById('cmbSave').onclick = () => {
      const fb = document.getElementById('cmbFeedback');
      const payload = {
        programaID: document.getElementById('progProgramaID').value,
        tipoCambio: document.getElementById('cmbTipo').value,
        fechaCambio: document.getElementById('cmbFecha').value,
        resolucionCES: document.getElementById('cmbResCES').value.trim(),
        descripcion: document.getElementById('cmbDesc').value.trim(),
        anterior: document.getElementById('cmbAnterior').value.trim(),
        nuevo: document.getElementById('cmbNuevo').value.trim()
      };
      if (!payload.programaID) {
        fb.textContent = 'Debe cargar un programa guardado antes de registrar cambios.';
        fb.className = 'p-3 rounded-lg text-xs font-medium bg-red-50 text-red-700';
        fb.classList.remove('hidden');
        return;
      }
      if (!payload.descripcion) {
        fb.textContent = 'La descripción del cambio es obligatoria (registro auditable).';
        fb.className = 'p-3 rounded-lg text-xs font-medium bg-red-50 text-red-700';
        fb.classList.remove('hidden');
        return;
      }
      const saveBtn = document.getElementById('cmbSave');
      saveBtn.disabled = true;
      google.script.run
        .withSuccessHandler(res => {
          saveBtn.disabled = false;
          fb.textContent = res.message;
          fb.className = 'p-3 rounded-lg text-xs font-medium ' + (res.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700');
          fb.classList.remove('hidden');
          if (res.success) setTimeout(() => {
            modalCambio.classList.add('hidden');
            document.getElementById('cmbDesc').value = '';
          }, 1600);
        })
        .withFailureHandler(err => {
          saveBtn.disabled = false;
          fb.textContent = 'Error: ' + err.message;
          fb.className = 'p-3 rounded-lg text-xs font-medium bg-red-50 text-red-700';
          fb.classList.remove('hidden');
        })
        .registrarCambioPrograma(payload);
    };
  }

  // Reporte de vida del programa
  const btnVida = document.getElementById('btnVerVidaPrograma');
  if (btnVida) {
    btnVida.onclick = () => {
      const pid = document.getElementById('progProgramaID').value;
      if (!pid) { showNotify('El programa debe estar guardado para generar su reporte de vida.'); return; }
      toggleLoading(true);
      google.script.run
        .withSuccessHandler(html => {
          toggleLoading(false);
          const win = window.open('', '_blank');
          win.document.write(html);
          win.document.close();
        })
        .withFailureHandler(err => {
          toggleLoading(false);
          showNotify('Error al generar reporte de vida: ' + err.message);
        })
        .generarHtmlVidaPrograma(pid);
    };
  }

'''
apply('''  function loadDataForEdit(id) {''', REGLAS_JS + '''  function loadDataForEdit(id) {''', "funciones ciclo de vida agregadas")

# Llamar a aplicarReglasCicloDeVida al cargar un programa existente
apply('''          if (p.coordinadorID) selectCoordinator({ coordinadorID: p.coordinadorID, nombreCompleto: 'Cargando...' });
        }
        toggleLoading(false);''',
'''          if (p.coordinadorID) selectCoordinator({ coordinadorID: p.coordinadorID, nombreCompleto: 'Cargando...' });
          aplicarReglasCicloDeVida(p); // [NUEVO Req-5]
        }
        toggleLoading(false);''', "hook en loadDataForEdit")

out = code.replace('\n', '\r\n') if crlf else code
io.open('nuevo_ProgramaPosgradoForm.html', 'wb').write(out.encode('utf-8'))
print("\nESCRITO nuevo_ProgramaPosgradoForm.html (CRLF=%s, %d chars)" % (crlf, len(out)))
