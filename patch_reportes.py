# -*- coding: utf-8 -*-
import io

raw = io.open('Reportes.html', 'rb').read().decode('utf-8')
crlf = '\r\n' in raw
code = raw.replace('\r\n', '\n')

def apply(old, new, label):
    global code
    assert old in code, "NO ENCONTRADA: " + label
    assert code.count(old) == 1, "AMBIGUA (%d): %s" % (code.count(old), label)
    code = code.replace(old, new)
    print("OK:", label)

# ---------- HTML ----------
apply('<div class="grid grid-cols-1 md:grid-cols-3 gap-6">',
      '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">', "grilla 4 col")

TARJETA = '''    <!-- [NUEVO Req-4] Tarjeta 4: Actas de Consultas Presenciales -->
    <div id="cardReporteActas" onclick="ReportesModule.selectReportType('actas')"
      class="cursor-pointer bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-indigo-500 shadow-sm transition-all flex flex-col items-center text-center group">
      <div class="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
        <i class="fas fa-file-signature text-2xl text-rose-600"></i>
      </div>
      <h3 class="text-base font-bold text-slate-800 mb-1">Actas de Consulta</h3>
      <p class="text-xs text-slate-500">Genere e imprima actas de consultas presenciales con pie de firmas.</p>
    </div>

'''
SECCION = '''  <!-- [NUEVO Req-4] SECCION 4: ACTAS DE CONSULTAS PRESENCIALES -->
  <div id="sectionActas" class="hidden bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
    <div class="border-b border-slate-200 pb-3">
      <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2">
        <i class="fas fa-file-signature text-rose-600"></i> Actas de Consultas Presenciales
      </h3>
      <p class="text-xs text-slate-500">Filtre por rango de fechas y genere el acta con seleccion de firmantes.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div><label class="block text-xs font-semibold text-slate-700 mb-1">Desde</label>
        <input type="date" id="actFechaInicio" class="w-full text-sm rounded-lg border-slate-300 p-2 border"></div>
      <div><label class="block text-xs font-semibold text-slate-700 mb-1">Hasta</label>
        <input type="date" id="actFechaFin" class="w-full text-sm rounded-lg border-slate-300 p-2 border"></div>
    </div>
    <div class="flex justify-end">
      <button type="button" onclick="ReportesModule.loadConsultasPresenciales()"
        class="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2">
        <i class="fas fa-search"></i> Buscar Consultas
      </button>
    </div>
    <div id="actasResultContainer" class="hidden space-y-3">
      <h4 class="text-sm font-bold text-slate-700">Consultas Encontradas:</h4>
      <div class="overflow-x-auto border border-slate-200 rounded-lg">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-100 text-slate-700 font-semibold uppercase">
            <tr><th class="p-3">ID</th><th class="p-3">Fecha</th><th class="p-3">Solicitante</th><th class="p-3">Motivo</th><th class="p-3">Atendio</th><th class="p-3 text-center">Accion</th></tr>
          </thead>
          <tbody id="actasTableBody" class="divide-y divide-slate-200"></tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- [NUEVO Req-4] MODAL SELECCION DE FIRMANTES -->
  <div id="firmasModal" class="hidden fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4 max-h-[80vh] overflow-y-auto">
      <h3 class="text-base font-bold text-slate-800"><i class="fas fa-signature text-rose-600 mr-1"></i> Seleccionar Firmantes</h3>
      <p class="text-xs text-slate-500">Acta: <strong id="firmasModalConsultaId" class="font-mono"></strong>. Marque quienes firman y asigne roles.</p>
      <div id="firmasCheckList" class="space-y-2"></div>
      <div class="flex justify-end gap-2 pt-2">
        <button type="button" onclick="ReportesModule.cancelarFirmas()" class="px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50">Cancelar</button>
        <button type="button" onclick="ReportesModule.confirmarFirmas()" class="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-semibold hover:bg-rose-700"><i class="fas fa-print mr-1"></i>Generar e Imprimir</button>
      </div>
    </div>
  </div>

'''

# Insertar tarjeta 4 antes del cierre de la grilla (ancla: parrafo quipux + cierres)
apply('''        Consulte y exporte a Excel los tramites Quipux por facultad.'''.replace('tramites', u'trámites'),
      '''        Consulte y exporte a Excel los tramites Quipux por facultad.'''.replace('tramites', u'trámites'),
      "check texto quipix existe")  # no-op de verificación de línea base

idx_fin_tarjeta3 = code.find(u'Consulte y exporte a Excel los tr\u00e1mites Quipux por facultad.')
assert idx_fin_tarjeta3 != -1
cierre_grilla = code.find('\n  </div>', idx_fin_tarjeta3)
assert cierre_grilla != -1, "no se hallo cierre de grilla"
code = code[:cierre_grilla + 1] + TARJETA + code[cierre_grilla + 1:]
print("OK: tarjeta 4 insertada")

# Insertar seccion actas + modal: despues del cierre de sectionQuipux y antes del </div> final (col 0)
idx_tbody_q = code.find('<tbody id="quipuxTableBody"')
assert idx_tbody_q != -1
i = idx_tbody_q
while True:
    i = code.find('\n  </div>\n', i + 1)
    assert i != -1, "no se hallo cierre de secciones"
    after = code[i + len('\n  </div>\n'):]
    if re.match(r'\n</div>\n', after):
        break
insert_pos = i + len('\n  </div>\n')
code = code[:insert_pos] + '\n' + SECCION + code[insert_pos:]
print("OK: seccion actas + modal insertados")

# ---------- JS ----------
apply("""    const cardExcel = document.getElementById('cardReporteExcel');
    const cardPdf = document.getElementById('cardReportePdf');
    const cardQuipux = document.getElementById('cardReporteQuipux');

    const secExcel = document.getElementById('sectionExcel');
    const secPdf = document.getElementById('sectionPdf');
    const secQuipux = document.getElementById('sectionQuipux');

    [cardExcel, cardPdf, cardQuipux].forEach(c => c.className = "cursor-pointer bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-indigo-500 shadow-sm transition-all flex flex-col items-center text-center group");
    [secExcel, secPdf, secQuipux].forEach(s => s.classList.add('hidden'));""",
"""    const cardExcel = document.getElementById('cardReporteExcel');
    const cardPdf = document.getElementById('cardReportePdf');
    const cardQuipux = document.getElementById('cardReporteQuipux');
    const cardActas = document.getElementById('cardReporteActas'); // [NUEVO Req-4]

    const secExcel = document.getElementById('sectionExcel');
    const secPdf = document.getElementById('sectionPdf');
    const secQuipux = document.getElementById('sectionQuipux');
    const secActas = document.getElementById('sectionActas'); // [NUEVO Req-4]

    [cardExcel, cardPdf, cardQuipux, cardActas].forEach(c => c.className = "cursor-pointer bg-white p-6 rounded-xl border-2 border-slate-200 hover:border-indigo-500 shadow-sm transition-all flex flex-col items-center text-center group");
    [secExcel, secPdf, secQuipux, secActas].forEach(s => s.classList.add('hidden'));""", "reset 4 tarjetas")

apply("""    } else if (type === 'quipux') {
      cardQuipux.className = "cursor-pointer bg-white p-6 rounded-xl border-2 border-sky-500 shadow-md transition-all flex flex-col items-center text-center group ring-2 ring-sky-200";
      secQuipux.classList.remove('hidden');
    }
  }""",
"""    } else if (type === 'quipux') {
      cardQuipux.className = "cursor-pointer bg-white p-6 rounded-xl border-2 border-sky-500 shadow-md transition-all flex flex-col items-center text-center group ring-2 ring-sky-200";
      secQuipux.classList.remove('hidden');
    } else if (type === 'actas') { // [NUEVO Req-4]
      cardActas.className = "cursor-pointer bg-white p-6 rounded-xl border-2 border-rose-500 shadow-md transition-all flex flex-col items-center text-center group ring-2 ring-rose-200";
      secActas.classList.remove('hidden');
    }
  }""", "rama actas")

FUNCIONES_ACTAS = '''
  // ─────────── [NUEVO Req-4] ACTAS DE CONSULTAS PRESENCIALES CON FIRMAS ───────────
  let actaPendiente = null;

  function loadConsultasPresenciales() {
    const f1 = document.getElementById('actFechaInicio').value;
    const f2 = document.getElementById('actFechaFin').value;
    const tbody = document.getElementById('actasTableBody');
    const container = document.getElementById('actasResultContainer');
    toggleLoading(true, 'Buscando consultas presenciales...');
    container.classList.remove('hidden');
    tbody.innerHTML = '';
    google.script.run
      .withSuccessHandler(dataJson => {
        toggleLoading(false);
        const list = typeof dataJson === 'string' ? JSON.parse(dataJson) : (dataJson || []);
        if (!list.length) {
          tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-slate-500">No se encontraron consultas presenciales en el rango.</td></tr>';
          return;
        }
        let html = '';
        list.forEach(c => {
          html += `
            <tr class="hover:bg-slate-50">
              <td class="p-3 font-mono font-bold text-rose-700">${c.consultaID || ''}</td>
              <td class="p-3 text-slate-600">${c.fecha || ''}</td>
              <td class="p-3 text-slate-600">${c.usuarioID || ''}</td>
              <td class="p-3 font-semibold text-slate-800">${(c.tema || 'Sin detalle')}</td>
              <td class="p-3 text-slate-600">${c.funcionario || ''}</td>
              <td class="p-3 text-center">
                <button type="button" onclick="ReportesModule.abrirModalFirmas('${c.consultaID}')"
                  class="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-semibold flex items-center gap-1 mx-auto transition-colors">
                  <i class="fas fa-file-signature"></i> Acta con Firmas
                </button>
              </td>
            </tr>`;
        });
        tbody.innerHTML = html;
      })
      .withFailureHandler(err => { toggleLoading(false); alert('Error: ' + err.message); })
      .getConsultasPresencialesPorRango(f1, f2);
  }

  function abrirModalFirmas(consultaID) {
    actaPendiente = consultaID;
    document.getElementById('firmasModalConsultaId').textContent = consultaID;
    document.getElementById('firmasCheckList').innerHTML = '<div class="text-xs text-slate-500">Cargando participantes...</div>';
    document.getElementById('firmasModal').classList.remove('hidden');
    google.script.run
      .withSuccessHandler(dataJson => {
        const parts = typeof dataJson === 'string' ? JSON.parse(dataJson) : (dataJson || []);
        let html = '';
        if (!parts.length) html = '<p class="text-xs text-slate-500 italic">Sin participantes registrados. Se usara solo al funcionario que atendio.</p>';
        parts.forEach((p, i) => {
          html += `
            <div class="flex items-center gap-2 text-sm">
              <input type="checkbox" id="chkFirma${i}" value="${p.usuarioID}" checked class="rounded border-slate-300">
              <label for="chkFirma${i}" class="flex-1 text-slate-700">${p.nombre}</label>
              <input type="text" id="rolFirma${i}" placeholder="Rol (ej. Coordinador)" class="text-xs border border-slate-300 rounded px-2 py-1 w-40">
            </div>`;
        });
        document.getElementById('firmasCheckList').innerHTML = html;
      })
      .withFailureHandler(err => {
        document.getElementById('firmasCheckList').innerHTML = '<p class="text-xs text-red-600">Error: ' + err.message + '</p>';
      })
      .getParticipantesDeConsulta(consultaID);
  }

  function cancelarFirmas() {
    actaPendiente = null;
    document.getElementById('firmasModal').classList.add('hidden');
  }

  function confirmarFirmas() {
    if (!actaPendiente) return;
    const checks = document.querySelectorAll('#firmasCheckList input[type=checkbox]');
    const firmantes = [];
    checks.forEach(chk => {
      if (chk.checked) {
        const idx = chk.id.replace('chkFirma', '');
        const rolInput = document.getElementById('rolFirma' + idx);
        firmantes.push({ nombre: chk.parentElement.querySelector('label').textContent, rol: rolInput ? rolInput.value : '' });
      }
    });
    document.getElementById('firmasModal').classList.add('hidden');
    generarActaPdf(actaPendiente, JSON.stringify(firmantes));
    actaPendiente = null;
  }

'''

# Insertar funciones nuevas justo antes de "// 3. GENERAR / IMPRIMIR ACTA"
apply("""  // 3. GENERAR / IMPRIMIR ACTA REUNIÓN EN PDF""".replace('REUNIÓN', u'REUNIÓN'),
      FUNCIONES_ACTAS + """  // 3. GENERAR / IMPRIMIR ACTA REUNIÓN EN PDF""".replace('REUNIÓN', u'REUNIÓN'),
      "funciones actas insertadas")

# Reemplazar generarActaPdf para soportar firmantes (versión actual sin indentación estándar)
old_garpdf = """  function generarActaPdf(consultaID) {
  toggleLoading(true, 'Cargando Acta...');"""
new_garpdf = """  function generarActaPdf(consultaID, firmantesJson) {
  toggleLoading(true, 'Cargando Acta...');"""
apply(old_garpdf, new_garpdf, "firma generarActaPdf")

apply("""    .obtenerHtmlActaReunion(consultaID);
}""",
"""    .obtenerHtmlActaReunion(consultaID, firmantesJson || '[]');
}

  // [CORREGIDO P0-5] antes this.generarActaPdf(...) fallaba si se llamaba desde aqui; ahora ruta directa
  function generarActaConsultaPdf(consultaID, firmantesJson) {
    toggleLoading(true, 'Cargando Acta de Consulta...');
    google.script.run
      .withSuccessHandler(function(htmlActa) {
        toggleLoading(false);
        if (htmlActa) {
          const win = window.open('', '_blank');
          win.document.write(htmlActa);
          win.document.close();
          setTimeout(() => { win.focus(); win.print(); }, 300);
        } else { alert('No se pudo cargar la informacion del acta.'); }
      })
      .withFailureHandler(function(err) { toggleLoading(false); alert('Error al obtener el acta: ' + err.message); })
      .obtenerHtmlActaConsulta(consultaID, firmantesJson || '[]');
  }""", "nueva funcion acta consulta")

# En confirmarFirmas usar acta de CONSULTA (esta sección es de consultas presenciales)
apply("""    document.getElementById('firmasModal').classList.add('hidden');
    generarActaPdf(actaPendiente, JSON.stringify(firmantes));
    actaPendiente = null;""",
"""    document.getElementById('firmasModal').classList.add('hidden');
    generarActaConsultaPdf(actaPendiente, JSON.stringify(firmantes));
    actaPendiente = null;""", "confirmarFirmas -> acta consulta")

# Exportar nuevas funciones en el return del módulo
apply("""    selectReportType,
    exportarExcel,
    loadReunionesByFacultad,
    loadTramitesQuipux,
    exportarQuipuxExcel,
    generarActaPdf""",
"""    selectReportType,
    exportarExcel,
    loadReunionesByFacultad,
    loadTramitesQuipux,
    exportarQuipuxExcel,
    generarActaPdf,
    // [NUEVO Req-4]
    loadConsultasPresenciales,
    abrirModalFirmas,
    cancelarFirmas,
    confirmarFirmas""", "return exportado")

out = code.replace('\n', '\r\n') if crlf else code
io.open('nuevo_Reportes.html', 'wb').write(out.encode('utf-8'))
print("\nESCRITO nuevo_Reportes.html (CRLF=%s, %d chars)" % (crlf, len(out)))
