import io, sys

SRC = 'Código.gs.txt'
with io.open(SRC, encoding='utf-8') as f:
    code = f.read()

def apply(old, new, label):
    global code
    if old not in code:
        print('FALLO:', label); sys.exit(1)
    if code.count(old) != 1:
        print('AMBIGUO (%d):' % code.count(old), label); sys.exit(1)
    code = code.replace(old, new)
    print('OK:', label)

# ── P0-6a/b/c/d: teléfono fuera de headerMaps y getCoordinadorById
apply("'CorreoInstitucional': 'correoInstitucional', 'TelefonoContacto': 'telefonoContacto', 'Genero': 'genero'",
      "'CorreoInstitucional': 'correoInstitucional', 'Genero': 'genero'", 'P0-6a USUARIO headerMap')

apply("'CorreoInstitucional': 'correoInstitucional', 'TelefonoContacto': 'telefonoContacto','Genero': 'genero'",
      "'CorreoInstitucional': 'correoInstitucional', 'Genero': 'genero'", 'P0-6b COORDINADOR headerMap')

apply("""    const idxCorreo = headers.indexOf('CorreoInstitucional');
    const idxTel = headers.indexOf('TelefonoContacto');
    const idxGen = headers.indexOf('Genero');""",
"""    const idxCorreo = headers.indexOf('CorreoInstitucional');
    const idxGen = headers.indexOf('Genero');""", 'P0-6c idxTel')

apply("""          correoInstitucional: data[i][idxCorreo] || '',
          telefonoContacto: data[i][idxTel] || '',
          genero: data[i][idxGen] || ''""",
"""          correoInstitucional: data[i][idxCorreo] || '',
          genero: data[i][idxGen] || ''""", 'P0-6d telefono obj')

# ── P0-9a: eliminar getFileForDownload puente
apply("""/**
 * Función puente de descarga
 */
function getFileForDownload(fileUrl) {
  return fileUrl;
}
// ---------------------------------------------------------""",
"""// ---------------------------------------------------------""", 'P0-9a puente')

# ── P0-9b: eliminar getFileForDownload intermedia (por indices, robusta a escapes)
i0 = code.find("// 3. MOTOR DE DESCARGAS")
fn_i = code.find("function getFileForDownload", i0)
# cierre por balanceo de llaves
depth = 0; fn_end = None
k = code.find('{', fn_i)
while k < len(code):
    cch = code[k]
    if cch == '{': depth += 1
    elif cch == '}':
        depth -= 1
        if depth == 0:
            fn_end = k; break
    elif cch in ('"', "'"):
        q = cch; k += 1
        while k < len(code) and code[k] != q:
            if code[k] == '\\': k += 1
            k += 1
    elif cch == '`':
        k += 1
        while k < len(code) and code[k] != '`':
            if code[k] == '\\': k += 1
            k += 1
    elif cch == '/' and k+1 < len(code) and code[k+1] == '/':
        k = code.find('\n', k)
        continue
    k += 1
if i0 == -1 or fn_end is None:
    print('FALLO: P0-9b indices'); sys.exit(1)
after = code.find("function getSheetHeaders")
code = code[:i0] + code[after:]
print('OK: P0-9b intermedia eliminada por indices')

# ── P0-8: eliminar parseAnyDateToYYYYMMDD por indices
p_title = code.find("// AUXILIAR: NORMALIZADOR UNIVERSAL DE FECHAS A YYYY-MM-DD")
if p_title == -1:
    print('FALLO: P0-8 titulo'); sys.exit(1)
p_start = code.rfind('// ------', 0, p_title)
fn_start = code.find("function parseAnyDateToYYYYMMDD", p_title)
# encontrar el cierre de la funcion con balanceo simple de llaves
depth = 0; fn_end = None
j = code.find('{', fn_start)
k = j
while k < len(code):
    if code[k] == '{': depth += 1
    elif code[k] == '}':
        depth -= 1
        if depth == 0:
            fn_end = k
            break
    k += 1
if p_start == -1 or fn_start == -1 or fn_end is None:
    print('FALLO: P0-8 indices'); sys.exit(1)
after = code.find("\n", fn_end)
code = code[:p_start] + code[after+1:]
print('OK: P0-8 parseAnyDateToYYYYMMDD eliminado')

# ── P1-22: caché real en getDropdownData
apply("""function getDropdownData(tipoLista) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('CONFIG');
    if (!sheet) return [];""",
"""function getDropdownData(tipoLista) {
  try {
    // [MEJORA #22] La cache ahora SI se pobla (antes solo se invalidaba)
    const cacheKey = `dropdown_${tipoLista}`;
    const cached = CacheService.getScriptCache().get(cacheKey);
    if (cached) return JSON.parse(cached);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('CONFIG');
    if (!sheet) return [];""", 'P1-22a cache get')

apply("""      if (data[i][0] === tipoLista && data[i][1]) {
        resultados.push(data[i][1]);
      }
    }
    return resultados;
  } catch (e) {
    Logger.log('Error en getDropdownData: ' + e.message);""",
"""      if (data[i][0] === tipoLista && data[i][1]) {
        resultados.push(data[i][1]);
      }
    }
    try { CacheService.getScriptCache().put(cacheKey, JSON.stringify(resultados), 300); } catch (ePut) { /* payloads grandes no se cachean */ }
    return resultados;
  } catch (e) {
    Logger.log('Error en getDropdownData: ' + e.message);""", 'P1-22b cache put')

# ── P0-7: calculateSemaforoState tolerante (reemplazo por balanceo de llaves)
s0 = code.find("function calculateSemaforoState(fechaCorreccionEsperada, fechaCorreccionRecibida) {")
if s0 == -1:
    print('FALLO: P0-7 inicio'); sys.exit(1)
depth = 0; end = None
j = code.find('{', s0)
k = j
in_str = None
while k < len(code):
    cch = code[k]
    if in_str:
        if cch == '\\': k += 2; continue
        if cch == in_str: in_str = None
    else:
        if cch in ('"', "'", '`'): in_str = cch
        elif cch == '/' and k+1 < len(code) and code[k+1] == '/':
            k = code.find('\n', k); 
            if k == -1: break
            continue
        elif cch == '/' and k+1 < len(code) and code[k+1] == '*':
            k = code.find('*/', k) + 1
        elif cch == '{': depth += 1
        elif cch == '}':
            depth -= 1
            if depth == 0:
                end = k
                break
    k += 1
if end is None:
    print('FALLO: P0-7 fin'); sys.exit(1)

new_semaforo = """function calculateSemaforoState(fechaCorreccionEsperada, fechaCorreccionRecibida) {
  try {
    // [MEJORA #7] Normalizador tolerante: acepta Date nativo de Sheets, YYYY-MM-DD,
    // DD/MM/YYYY y DD-MM-YYYY (la BDD convive con ambos formatos segun quien escribio la fila)
    const toISO = (v) => {
      if (v == null) return null;
      if (v instanceof Date) return Utilities.formatDate(v, Session.getScriptTimeZone(), 'yyyy-MM-dd');
      const s = String(v).trim();
      if (s === '' || s === '---') return null;
      let m = s.match(/^(\\d{4})-(\\d{1,2})-(\\d{1,2})/);              // YYYY-MM-DD
      if (m) return `${m[1]}-${String(m[2]).padStart(2, '0')}-${String(m[3]).padStart(2, '0')}`;
      m = s.match(/^(\\d{1,2})\\/(\\d{1,2})\\/(\\d{4})/);                // DD/MM/YYYY
      if (m) return `${m[3]}-${String(m[2]).padStart(2, '0')}-${String(m[1]).padStart(2, '0')}`;
      m = s.match(/^(\\d{1,2})-(\\d{1,2})-(\\d{4})/);                  // DD-MM-YYYY
      if (m) return `${m[3]}-${String(m[2]).padStart(2, '0')}-${String(m[1]).padStart(2, '0')}`;
      return null;
    };

    const isoRecibida = toISO(fechaCorreccionRecibida);
    const isoEsperada = toISO(fechaCorreccionEsperada);

    // 1. Evaluar si ya se recibio la correccion
    if (isoRecibida) {
      if (isoEsperada && isoRecibida > isoEsperada) return 'Corregido_Atrasado';
      return 'A_tiempo';
    }

    // 2. Si NO se ha recibido, evaluar contra el reloj (Pendientes)
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaLimite = isoEsperada ? parseDateYYYYMMDD(isoEsperada) : null;

    // [CORREGIDO] Antes una fecha ilegible devolvia 'Plazo_lejano' (verde falso)
    if (!fechaLimite) return 'Sin_fecha';

    fechaLimite.setHours(0, 0, 0, 0);
    const diffTime = fechaLimite.getTime() - hoy.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 'Vencido';
    if (diffDays <= 7) return 'Proximo_a_vencer';

    return 'Plazo_lejano';

  } catch (error) {
    logActivity('ERROR', `Error en calculateSemaforoState: ${error.message}`);
    return 'Sin_fecha';
  }
}"""
code = code[:s0] + new_semaforo + code[end+1:]
print('OK: P0-7 calculateSemaforoState reemplazada')

# ── P0-17: comparacion estricta
apply("""    const rowIndex = allData.findIndex(row => row[idColumnIndex] == dataToSave.programaID);""",
"""    const rowIndex = allData.findIndex(row => String(row[idColumnIndex]).trim() === String(dataToSave.programaID).trim()); // [FIX #17] comparacion estricta""", 'P0-17 == flexible')

# ── P0-21: cabeceras correctas deleteProgramaPosgrado
apply("""      const idColumnIndex = headers.indexOf('programaID');
      const snieseColumnIndex = headers.indexOf('codigoSNIESE');""",
"""      const idColumnIndex = headers.indexOf('ProgramaID');      // [FIX #21] cabecera real de la hoja
      const snieseColumnIndex = headers.indexOf('CodigoSNIESE'); // [FIX #21] cabecera real de la hoja""", 'P0-21 delete headers')

# ── P0-3: ConsultaID unico via generateNextId
apply("""    const lastRow = sheetConsulta.getLastRow();
    const timestamp = new Date().getTime().toString().slice(-5);
    const consultaID = `CON${String(lastRow).padStart(3, '0')}`;""",
"""    // [FIX #3] Se unifica con generateNextId (escanea el maximo real, no el numero de fila;
    // el esquema anterior reutilizaba IDs tras cada borrado y colisionaba). Ya existe LockService arriba.
    const consultaID = generateNextId('CONSULTA', 'CON');
    if (!consultaID) {
      return { success: false, message: 'Error: No se pudo generar un ConsultaID unico.' };
    }""", 'P0-3 ConsultaID')

# ── P1-14: motor de notificaciones — localizar por anclas robustas (sin depender de espacios exactos)
a_old = code.find("// Registrar silenciosamente")
if a_old == -1:
    print('FALLO: P1-14 ancla A'); sys.exit(1)
a_end = code.find("notificacionesRegistradas++;\n      }", a_old)
if a_end == -1:
    print('FALLO: P1-14 ancla A-end'); sys.exit(1)
a_end += len("notificacionesRegistradas++;\n      }")
# reemplazar el bloque createNotificacion... por solo el contador
code = code[:a_old] + "notificacionesRegistradas++;" + code[a_end:]
print('OK: P1-14a quita createNotificacion del bucle')

old_send = """      // Enviar el correo masivo
      try {
        MailApp.sendEmail({
          to: coordinador.correoInstitucional,
          subject: `Alertas de Seguimiento: Tiene ${alertas.length} programa(s) pendientes de acción`,
          htmlBody: cuerpoCorreo
        });
        correosEnviados++;
        logActivity('INFO', `Correo consolidado enviado a ${coordinador.correoInstitucional} con ${alertas.length} alertas.`);
      } catch (e) {
        logActivity('ERROR', `Fallo al enviar correo a ${coordinador.correoInstitucional}: ${e.message}`);
      }"""
new_send = """      // Enviar el correo masivo
      // [FIX #14] El registro de auditoria se hace SOLO si el correo se envio con exito
      // (antes se registraba aunque fallara, y el anti-spam de 3 dias bloqueaba el reintento).
      // Ademas se escribe por append directo en lote, evitando N lecturas completas de la hoja.
      try {
        MailApp.sendEmail({
          to: coordinador.correoInstitucional,
          subject: `Alertas de Seguimiento: Tiene ${alertas.length} programa(s) pendientes de acción`,
          htmlBody: cuerpoCorreo
        });
        correosEnviados++;

        const sheetNotif = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('NOTIFICACION');
        const nowStr = Utilities.formatDate(new Date(), SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), 'yyyy-MM-dd HH:mm:ss');
        const filasNotif = [];
        for (const alerta of alertas) {
          const nid = generateNextId('NOTIFICACION', 'NOTIF');
          if (!nid) continue;
          filasNotif.push([
            nid,
            alerta.observacionID,
            alerta.programaID,
            coordID,
            alerta.tipoNotificacion,
            `Notificación consolidada enviada por programa ${alerta.nombrePrograma}. Límite: ${alerta.fechaLimite}`,
            nowStr
          ]);
          notificacionesRegistradas++;
        }
        if (filasNotif.length > 0) {
          sheetNotif.getRange(sheetNotif.getLastRow() + 1, 1, filasNotif.length, filasNotif[0].length).setValues(filasNotif);
        }

        logActivity('INFO', `Correo consolidado enviado a ${coordinador.correoInstitucional} con ${alertas.length} alertas.`);
      } catch (e) {
        logActivity('ERROR', `Fallo al enviar correo a ${coordinador.correoInstitucional}: ${e.message}. No se registran notificaciones (se reintentara).`);
      }"""
apply(old_send, new_send, 'P1-14b registro post-envio batch')

with io.open('nuevo_Código.gs', 'w', encoding='utf-8') as f:
    f.write(code)
print('TOTAL OK -> nuevo_Codigo.gs')
