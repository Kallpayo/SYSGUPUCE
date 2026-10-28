// ============================================================================
// [NUEVO] BLOQUES DE FUNCIONES ADICIONALES — SYSGUPUCE (v2026-10)
// Pegar TODO este bloque al FINAL de Código.gs en Apps Script.
// Cubre: Req 4 (Actas con firmas + reportería de consultas presenciales),
//        Req 5 (Ciclo de vida / rediseños / reporte de vida del programa),
//        Req 7 (saneamiento de fechas).
// Ninguna función de este bloque reemplaza código existente; son adiciones puras.
// ============================================================================

// ─────────────────────────────────────────────────────────────
// SECCIÓN A: ACTAS CON PIE DE FIRMAS (Reuniones y Consultas Presenciales)
// ─────────────────────────────────────────────────────────────
function _escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function _normalizarFechaActa(rawFecha, tz) {
  if (rawFecha instanceof Date) return Utilities.formatDate(rawFecha, tz, 'yyyy-MM-dd');
  if (!rawFecha) return '';
  const s = String(rawFecha).trim();
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return s.slice(0, 10);
  m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) return `${m[3]}-${String(m[2]).padStart(2, '0')}-${String(m[1]).padStart(2, '0')}`;
  return s;
}

function _formatearHoraActa(h, tz) {
  if (h instanceof Date) return Utilities.formatDate(h, tz, 'HH:mm');
  return h ? String(h) : '';
}

/** Lee la fila de CONSULTA por ID y devuelve un objeto normalizado */
function _obtenerFilaConsulta(consultaID) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetCon = ss.getSheetByName('CONSULTA');
  if (!sheetCon) return null;
  const data = sheetCon.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(consultaID).trim()) {
      const tz = ss.getSpreadsheetTimeZone();
      return {
        consultaID: data[i][0], usuarioID: data[i][1] || '',
        fecha: _normalizarFechaActa(data[i][2], tz),
        horaInicio: _formatearHoraActa(data[i][3], tz),
        horaFin: _formatearHoraActa(data[i][4], tz),
        medio: data[i][5] || '', tipo: data[i][6] || '', tema: data[i][7] || '',
        tipoSolucion: data[i][8] || '', acuerdos: data[i][9] || '',
        funcionario: data[i][10] || '', agendada: data[i][11] || '',
        quipux: data[i][12] || '', facultad: data[i][13] || ''
      };
    }
  }
  return null;
}

/** Participantes de una reunión/consulta (hoja PARTICIPANTES -> nombres de USUARIO) */
function getParticipantesDeConsulta(consultaID) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const shPart = ss.getSheetByName('PARTICIPANTES');
    const shUsu = ss.getSheetByName('USUARIO');
    if (!shPart || !shUsu) return JSON.stringify([]);
    const pVals = shPart.getDataRange().getValues();
    const uVals = shUsu.getDataRange().getValues();
    const uIdx = uVals[0].map(h => String(h).trim()).indexOf('UsuarioID');
    const nIdx = uVals[0].map(h => String(h).trim()).indexOf('NombreCompleto');
    const mapNom = {};
    for (let i = 1; i < uVals.length; i++) mapNom[String(uVals[i][uIdx]).trim()] = String(uVals[i][nIdx] || '');
    const out = [];
    for (let i = 1; i < pVals.length; i++) {
      if (String(pVals[i][1]).trim() === String(consultaID).trim()) {
        const uid = String(pVals[i][2]).trim();
        out.push({ usuarioID: uid, nombre: mapNom[uid] || uid });
      }
    }
    return JSON.stringify(out);
  } catch (e) { logActivity('ERROR', 'getParticipantesDeConsulta: ' + e.message); return JSON.stringify([]); }
}

function _construirPieFirmas(firmantes) {
  if (!firmantes || firmantes.length === 0) return '';
  const celdas = firmantes.map(f => `
      <div class="sig-item">
        <div class="sig-line"></div>
        <div class="sig-name">${_escapeHtml(f.nombre)}</div>
        <div class="sig-role">${_escapeHtml(f.rol || '')}</div>
      </div>`).join('');
  return `
    <div class="signatures-block">
      <div class="title-sec">FIRMAS DE LOS INTERVINIENTES</div>
      <table class="sig-table"><tr><td>${celdas}</td></tr></table>
    </div>`;
}

const _ESTILO_ACTA = `
  body { font-family: Arial, sans-serif; padding: 25px; color: #1e293b; line-height: 1.4; }
  .header { text-align: center; border-bottom: 2px solid #1e293b; padding-bottom: 10px; margin-bottom: 20px; }
  .header h1 { margin: 0; font-size: 18px; text-transform: uppercase; }
  .header h2 { margin: 4px 0 0 0; font-size: 13px; color: #475569; font-weight: normal; }
  .meta-grid { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
  .meta-grid td { padding: 6px 10px; border: 1px solid #cbd5e1; }
  .meta-grid td.lbl { font-weight: bold; background: #f1f5f9; width: 20%; }
  .title-sec { font-size: 13px; font-weight: bold; margin-top: 15px; margin-bottom: 5px; text-transform: uppercase; }
  .content-box { border: 1px solid #cbd5e1; padding: 10px; font-size: 12px; min-height: 50px; background: #fafafa; white-space: pre-wrap; }
  .signatures-block { margin-top: 45px; page-break-inside: avoid; }
  .sig-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
  .sig-table td { vertical-align: bottom; padding: 0 12px; }
  .sig-item { display: inline-block; text-align: center; font-size: 11px; width: 30%; min-width: 140px; vertical-align: bottom; }
  .sig-line { border-bottom: 1px solid #1e293b; margin: 45px auto 5px auto; width: 90%; }
  .sig-name { font-weight: bold; }
  .sig-role { color: #475569; }
  @media print { body { padding: 10mm; } }`;

/** ACTA DE REUNIÓN (con pie de firmas seleccionables) */
function obtenerHtmlActaReunion(consultaID, firmantesJson) {
  try {
    const r = _obtenerFilaConsulta(consultaID);
    if (!r) return "";
    let firmantes = [];
    try { firmantes = JSON.parse(firmantesJson || '[]'); } catch (e) { firmantes = []; }
    if (firmantes.length === 0 && r.funcionario) firmantes = [{ nombre: r.funcionario, rol: 'Unidad de Posgrado UCE' }];

    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Acta de Reunión ${_escapeHtml(r.consultaID)}</title>
    <style>${_ESTILO_ACTA}</style></head><body>
      <div class="header"><h1>UNIVERSIDAD CENTRAL DEL ECUADOR</h1>
      <h2>DIRECCIÓN DE POSGRADO — ACTA DE REUNIÓN</h2></div>
      <table class="meta-grid">
        <tr><td class="lbl">Código Acta:</td><td><strong>${_escapeHtml(r.consultaID)}</strong></td>
            <td class="lbl">Fecha:</td><td><strong>${_escapeHtml(r.fecha)}</strong></td></tr>
        <tr><td class="lbl">Facultad / Unidad:</td><td>${_escapeHtml(r.facultad)}</td>
            <td class="lbl">Horario:</td><td>${_escapeHtml(r.horaInicio)} - ${_escapeHtml(r.horaFin)}</td></tr>
        <tr><td class="lbl">Medio Atención:</td><td>${_escapeHtml(r.medio)}</td>
            <td class="lbl">Atendido Por:</td><td>${_escapeHtml(r.funcionario)}</td></tr>
      </table>
      <div class="title-sec">1. TEMA / ORDEN DEL DÍA</div>
      <div class="content-box">${_escapeHtml(r.tema)}</div>
      <div class="title-sec">2. ACUERDOS Y COMPROMISOS ALCANZADOS</div>
      <div class="content-box">${_escapeHtml(r.acuerdos || 'Sin acuerdos registrados.')}</div>
      ${_construirPieFirmas(firmantes)}
    </body></html>`;
  } catch (err) { Logger.log("Error en obtenerHtmlActaReunion: " + err.toString()); return ""; }
}

/** ACTA DE CONSULTA PRESENCIAL (nueva reportería — Req 4) */
function obtenerHtmlActaConsulta(consultaID, firmantesJson) {
  try {
    const r = _obtenerFilaConsulta(consultaID);
    if (!r) return "";
    let firmantes = [];
    try { firmantes = JSON.parse(firmantesJson || '[]'); } catch (e) { firmantes = []; }
    if (firmantes.length === 0 && r.funcionario) firmantes = [{ nombre: r.funcionario, rol: 'Unidad de Posgrado UCE' }];

    let solicitante = r.usuarioID || 'No registrado';
    if (r.usuarioID) {
      const shUsu = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('USUARIO');
      if (shUsu) {
        const uv = shUsu.getDataRange().getValues();
        const uIdx = uv[0].map(h => String(h).trim()).indexOf('UsuarioID');
        const nIdx = uv[0].map(h => String(h).trim()).indexOf('NombreCompleto');
        for (let i = 1; i < uv.length; i++) {
          if (String(uv[i][uIdx]).trim() === String(r.usuarioID).trim()) { solicitante = String(uv[i][nIdx] || r.usuarioID); break; }
        }
      }
    }

    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Acta de Consulta ${_escapeHtml(r.consultaID)}</title>
    <style>${_ESTILO_ACTA}</style></head><body>
      <div class="header"><h1>UNIVERSIDAD CENTRAL DEL ECUADOR</h1>
      <h2>DIRECCIÓN DE POSGRADO — ACTA DE CONSULTA / ATENCIÓN</h2></div>
      <table class="meta-grid">
        <tr><td class="lbl">Código:</td><td><strong>${_escapeHtml(r.consultaID)}</strong></td>
            <td class="lbl">Fecha:</td><td><strong>${_escapeHtml(r.fecha)}</strong></td></tr>
        <tr><td class="lbl">Solicitante:</td><td>${_escapeHtml(solicitante)}</td>
            <td class="lbl">Horario:</td><td>${_escapeHtml(r.horaInicio)}${r.horaFin ? ' - ' + _escapeHtml(r.horaFin) : ''}</td></tr>
        <tr><td class="lbl">Medio:</td><td>${_escapeHtml(r.medio)}</td>
            <td class="lbl">Tipo Consulta:</td><td>${_escapeHtml(r.tipo)}</td></tr>
        <tr><td class="lbl">Agendada:</td><td>${_escapeHtml(r.agendada)}</td>
            <td class="lbl">Atendido Por:</td><td>${_escapeHtml(r.funcionario)}</td></tr>
        ${r.quipux ? `<tr><td class="lbl">No. Quipux:</td><td colspan="3">${_escapeHtml(r.quipux)}</td></tr>` : ''}
      </table>
      <div class="title-sec">1. MOTIVO DE LA CONSULTA</div>
      <div class="content-box">${_escapeHtml(r.tema)}</div>
      <div class="title-sec">2. SOLUCIÓN BRINDADA / RESPUESTA</div>
      <div class="content-box">${_escapeHtml(r.acuerdos || 'Sin solución registrada.')}</div>
      ${r.tipoSolucion ? `<div class="title-sec">3. TIPO DE SOLUCIÓN</div><div class="content-box">${_escapeHtml(r.tipoSolucion)}</div>` : ''}
      ${_construirPieFirmas(firmantes)}
    </body></html>`;
  } catch (err) { Logger.log("Error en obtenerHtmlActaConsulta: " + err.toString()); return ""; }
}

/** Listador de consultas presenciales para el módulo de reportes */
function getConsultasPresencialesPorRango(fechaInicio, fechaFin) {
  try {
    const consultas = JSON.parse(getSheetData('CONSULTA'));
    const norm = (s) => {
      if (!s) return '';
      let m = String(s).match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (m) return m[0];
      m = String(s).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
      if (m) return `${m[3]}-${String(m[2]).padStart(2, '0')}-${String(m[1]).padStart(2, '0')}`;
      return '';
    };
    const fi = norm(fechaInicio), ff = norm(fechaFin);
    const resultado = consultas.filter(c => {
      const medio = String(c.medioAtencion || '').toLowerCase();
      const esPresencial = medio.includes('presencial') || medio.includes('visita');
      if (!esPresencial) return false;
      const fc = norm(c.fechaConsulta);
      if (fi && fc && fc < fi) return false;
      if (ff && fc && fc > ff) return false;
      return true;
    }).map(c => ({
      consultaID: c.consultaID, fecha: c.fechaConsulta, hora: c.horaVisita,
      usuarioID: c.usuarioID || '', tipo: c.tipoConsulta || '',
      tema: c.detalleConsulta || 'Sin detalle', funcionario: c.nombreFuncionarioQueAtendio || ''
    }));
    return JSON.stringify(resultado);
  } catch (e) { logActivity('ERROR', 'getConsultasPresencialesPorRango: ' + e.message); return JSON.stringify([]); }
}

// ─────────────────────────────────────────────────────────────
// SECCIÓN B: CICLO DE VIDA DEL PROGRAMA + REDISEÑOS (Req 5)
// Marco normativo de referencia: Art. 46-49 RUGS (creación/acreditación),
// Res. CES sobre reformulación/rediseño de programas: un programa aprobado
// puede sufrir cambios SUSTANTIVOS (pensum, duración/periodos, mención,
// modalidad -> registro modificado en SNIESE) o NO SUSTANTIVOS (ajustes
// menores). El rediseño NO reinicia la fase propositiva: hereda la
// aprobación original (HCU/CES/SNIESE) y genera una NUEVA VERSIÓN que
// marca cohortes distintas pre/post-cambio.
// ─────────────────────────────────────────────────────────────
const TIPOS_CAMBIO_PROGRAMA = ['REDISEÑO', 'CAMBIO SUSTANTIVO', 'CAMBIO NO SUSTANTIVO', 'ACTUALIZACIÓN NORMATIVA'];
const CAMPOS_NUCLEALES_PROGRAMA = ['facultad', 'coordinadorID', 'nombrePrograma', 'mencion', 'modalidad', 'duracion', 'costoAproximado'];

function _ensureHojaCambios() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('CAMBIOS_PROGRAMA');
  if (!sheet) {
    sheet = ss.insertSheet('CAMBIOS_PROGRAMA');
    sheet.appendRow(['CambioID', 'ProgramaID', 'TipoCambio', 'FechaCambio', 'Descripcion', 'Anterior', 'Nuevo', 'ResolucionCES', 'ResolucionHCU', 'NuevaVersion', 'RegistradoEl']);
    sheet.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#1e293b').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    logActivity('INFO', '_ensureHojaCambios: Hoja CAMBIOS_PROGRAMA creada automáticamente.');
  }
  return sheet;
}

function getHistorialCambiosPrograma(programaID) {
  try {
    const sheet = _ensureHojaCambios();
    const vals = sheet.getDataRange().getValues();
    if (vals.length < 2) return JSON.stringify([]);
    const out = [];
    for (let i = 1; i < vals.length; i++) {
      if (String(vals[i][1]).trim() !== String(programaID).trim()) continue;
      out.push({
        cambioID: vals[i][0], programaID: vals[i][1], tipoCambio: vals[i][2],
        fechaCambio: vals[i][3] instanceof Date ? Utilities.formatDate(vals[i][3], Session.getScriptTimeZone(), 'yyyy-MM-dd') : String(vals[i][3]),
        descripcion: vals[i][4], anterior: vals[i][5], nuevo: vals[i][6],
        resolucionCES: vals[i][7], resolucionHCU: vals[i][8], version: vals[i][9], registradoEl: vals[i][10]
      });
    }
    return JSON.stringify(out);
  } catch (e) { logActivity('ERROR', 'getHistorialCambiosPrograma: ' + e.message); return JSON.stringify([]); }
}

/** Registro auditable de rediseño/cambio sobre programa VIGENTE. No toca la fase regulatoria. */
function registrarCambioPrograma(payload) {
  try {
    if (!payload || !payload.programaID) return { success: false, message: 'Falta ProgramaID.' };
    if (!TIPOS_CAMBIO_PROGRAMA.includes(String(payload.tipoCambio))) return { success: false, message: 'Tipo de cambio inválido. Use: ' + TIPOS_CAMBIO_PROGRAMA.join(', ') };
    if (!payload.descripcion || String(payload.descripcion).trim() === '') return { success: false, message: 'La descripción del cambio es obligatoria (auditable).' };

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const programas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));
      const prog = programas.find(p => String(p.programaID).trim() === String(payload.programaID).trim());
      if (!prog) return { success: false, message: `Programa ${payload.programaID} no encontrado.` };
      if (prog.estadoPropuesta !== 'Vigente') return { success: false, message: 'Solo los programas VIGENTES admiten rediseños/cambios. Mientras está en fase previa use "Modificar".' };

      const historial = JSON.parse(getHistorialCambiosPrograma(prog.programaID));
      const nuevaVersion = 'V' + (historial.length + 2); // Original=V1, primer rediseño=V2

      const sheet = _ensureHojaCambios();
      const cambioID = generateNextId('CAMBIOS_PROGRAMA', 'CAM') || ('CAM' + String(sheet.getLastRow()).padStart(3, '0'));
      const nowStr = Utilities.formatDate(new Date(), SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), 'yyyy-MM-dd HH:mm:ss');
      sheet.appendRow([cambioID, prog.programaID, payload.tipoCambio, payload.fechaCambio || nowStr.slice(0, 10),
        String(payload.descripcion).trim(), payload.anterior || '', payload.nuevo || '',
        payload.resolucionCES || '', payload.resolucionHCU || '', nuevaVersion, nowStr]);

      invalidateConfigCache();
      logActivity('INFO', `registrarCambioPrograma: ${cambioID} (${payload.tipoCambio}) registrado para ${prog.programaID} como ${nuevaVersion}.`);
      return { success: true, message: `Cambio registrado: ${cambioID} — versión ${nuevaVersion}.`, cambioID: cambioID, version: nuevaVersion };
    } finally { lock.releaseLock(); }
  } catch (e) {
    logActivity('ERROR', 'registrarCambioPrograma: ' + e.message);
    return { success: false, message: 'Error al registrar cambio: ' + e.message };
  }
}

/** Regla de bloqueo para el frontend: Vigente congela nucleales, permite complementario + rediseño */
function getPermisosEdicionPrograma(programaID) {
  try {
    const programas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));
    const prog = programas.find(p => String(p.programaID).trim() === String(programaID).trim());
    if (!prog) return JSON.stringify({ existe: false });
    const vigente = prog.estadoPropuesta === 'Vigente';
    return JSON.stringify({
      existe: true, vigente: vigente,
      puedeEditarNucleales: !vigente,
      puedeEditarComplementario: true,
      puedeRegistrarCambio: vigente,
      historialCount: JSON.parse(getHistorialCambiosPrograma(prog.programaID)).length
    });
  } catch (e) { return JSON.stringify({ existe: false, error: e.message }); }
}

/** REPORTE DE VIDA DEL PROGRAMA (HTML imprimible) */
function generarHtmlVidaPrograma(programaID) {
  try {
    const programas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));
    const prog = programas.find(p => String(p.programaID).trim() === String(programaID).trim());
    if (!prog) return '<h2 style="font-family:Arial">Programa no encontrado.</h2>';

    const obs = JSON.parse(getSheetData('OBSERVACIONES')).filter(o => String(o.programaID).trim() === String(prog.programaID).trim());
    const cohortes = JSON.parse(getSheetData('COHORTE')).filter(c => String(c.programaID).trim() === String(prog.programaID).trim());
    const cambios = JSON.parse(getHistorialCambiosPrograma(prog.programaID));

    const fila = (celdas, th) => `<tr>${celdas.map(c => `<${th ? 'th' : 'td'} style="border:1px solid #cbd5e1;padding:5px 8px;font-size:11px;text-align:left;">${_escapeHtml(c)}</${th ? 'th' : 'td'}>`).join('')}</tr>`;
    const tabla = (heads, rows) => rows.length === 0
      ? '<p style="font-size:11px;color:#64748b;font-style:italic;">Sin registros.</p>'
      : `<table style="width:100%;border-collapse:collapse;margin:8px 0;">${fila(heads, true)}${rows.map(r => fila(r)).join('')}</table>`;

    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Vida del Programa ${_escapeHtml(prog.programaID)}</title>
    <style>body{font-family:Arial;padding:25px;color:#1e293b;} h1{font-size:17px;text-transform:uppercase;border-bottom:2px solid #1e293b;padding-bottom:8px;} h2.sec{font-size:13px;margin-top:22px;text-transform:uppercase;}</style></head><body>
      <h1>Historia de Vida del Programa de Posgrado</h1>
      <h2 style="font-size:14px;margin:4px 0;">${_escapeHtml(prog.nombrePrograma)}</h2>
      ${tabla(['Campo', 'Valor'], [
        ['ProgramaID', prog.programaID], ['Facultad', prog.facultad], ['Estado', prog.estadoPropuesta],
        ['Modalidad', prog.modalidad], ['Duración', prog.duracion], ['Mención', prog.mencion || '—'],
        ['Resolución HCU', prog.resolucionHCU || '—'], ['Fecha Aprob. HCU', prog.fechaAprobacionHCU || '—'],
        ['Resolución CES', prog.resolucionCES || '—'], ['Fecha Aprob. CES', prog.fechaAprobacionCES || '—'],
        ['Código SNIESE', prog.codigoSNIESE || '—'], ['Vigencia Hasta', prog.vigenciaHasta || '—']
      ])}
      <h2 class="sec">1. Observaciones Regulatorias (${obs.length})</h2>
      ${tabla(['ID', 'Fecha Obs.', 'Límite Corrección', 'Recibida', 'Semáforo', 'Descripción'],
        obs.map(o => [o.observacionID, o.fechaObservacion, o.fechaCorreccionEsperada, o.fechaCorreccionRecibida || '—', o.estadoSemaforo || '', o.descripcion]))}
      <h2 class="sec">2. Rediseños y Cambios Registrados (${cambios.length})</h2>
      ${tabla(['ID', 'Tipo', 'Fecha', 'Versión', 'Descripción', 'Anterior', 'Nuevo', 'Resol. CES'],
        cambios.map(c => [c.cambioID, c.tipoCambio, c.fechaCambio, c.version, c.descripcion, c.anterior || '—', c.nuevo || '—', c.resolucionCES || '—']))}
      <h2 class="sec">3. Cohortes (${cohortes.length})</h2>
      ${tabla(['ID', 'Ordinal', 'Periodo', 'Estado', 'Inscripciones', 'Matrículas'],
        cohortes.map(c => [c.cohorteID, c.ordinalCohorte, c.periodoAcademico, c.estadoCohorte, c.contadorInscripciones, c.contadorMatriculas]))}
      <p style="font-size:10px;color:#64748b;margin-top:25px;">Documento generado por SYSGUPUCE el ${Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd')} — Registro interno de la Unidad de Posgrado (no oficial / espejo del SIIU).</p>
    </body></html>`;
  } catch (e) { return '<h2 style="font-family:Arial">Error generando reporte: ' + _escapeHtml(e.message) + '</h2>'; }
}

// ─────────────────────────────────────────────────────────────
// SECCIÓN C: SANEAMIENTO ÚNICO DE FECHAS (Req 7)
// Ejecutar UNA sola vez manualmente desde el editor de Apps Script.
// ─────────────────────────────────────────────────────────────
function sanearFechasObservaciones() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('OBSERVACIONES');
    if (!sheet) return 'Hoja OBSERVACIONES no encontrada';
    const vals = sheet.getDataRange().getValues();
    const heads = vals[0].map(h => String(h).trim());
    const cols = ['FechaObservacion', 'FechaCorreccionEsperada', 'FechaCorreccionRecibida'].map(c => heads.indexOf(c));
    const tz = ss.getSpreadsheetTimeZone();
    let corregidas = 0;
    for (let i = 1; i < vals.length; i++) {
      cols.forEach(ci => {
        if (ci === -1) return;
        const v = vals[i][ci];
        if (v instanceof Date) {
          const iso = Utilities.formatDate(v, tz, 'yyyy-MM-dd');
          sheet.getRange(i + 1, ci + 1).setValue(iso).setNumberFormat('@');
          corregidas++;
        }
      });
    }
    Logger.log(`sanearFechasObservaciones: ${corregidas} celdas normalizadas.`);
    return `${corregidas} celdas normalizadas a YYYY-MM-DD.`;
  } catch (e) { return 'Error: ' + e.message; }
}
