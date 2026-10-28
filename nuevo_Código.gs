const SHEETS_CONFIG = {
 USUARIO: {
 sheetName: 'USUARIO',
 idPrefix: 'USU',
 headerMap: { 'UsuarioID': 'usuarioID', 'NombreCompleto': 'nombreCompleto', 'CorreoInstitucional': 'correoInstitucional', 'Genero': 'genero', 'Cargo': 'cargo', 'Facultad': 'facultad', 'FechaRegistro': 'fechaRegistro', 'UltimaActualizacion': 'ultimaActualizacion' }
 },
 COORDINADOR: {
 sheetName: 'COORDINADOR',
 idPrefix: 'COO',
 headerMap: { 'CoordinadorID': 'coordinadorID', 'NombreCompleto': 'nombreCompleto', 'CorreoInstitucional': 'correoInstitucional', 'Genero': 'genero', 'FechaRegistro': 'fechaRegistro', 'UltimaActualizacion': 'ultimaActualizacion' }
 },
 PROGRAMAPOSGRADO: {
 sheetName: 'PROGRAMAPOSGRADO',
 idPrefix: 'PROG',
 headerMap: { 'ProgramaID': 'programaID', 'Facultad': 'facultad', 'CoordinadorID': 'coordinadorID', 'NombrePrograma': 'nombrePrograma', 'Mencion': 'mencion', 'Modalidad': 'modalidad', 'Duracion': 'duracion', 'CostoAproximado': 'costoAproximado', 'EstadoPropuesta': 'estadoPropuesta', 'ResolucionHCU': 'resolucionHCU', 'FechaAprobacionHCU': 'fechaAprobacionHCU', 'ResolucionCES': 'resolucionCES', 'FechaAprobacionCES': 'fechaAprobacionCES', 'CodigoSNIESE': 'codigoSNIESE', 'VigenciaHasta': 'vigenciaHasta' }
 },
 COHORTE: {
  sheetName: 'COHORTE',
  idPrefix: 'COH',
  headerMap: {
    'CohorteID': 'cohorteID',
    'ProgramaID': 'programaID',
    'EstadoCohorte': 'estadoCohorte',
    'OrdinalCohorte': 'ordinalCohorte',
    'FechaInicioInscripcion': 'fechaInicioInscripcion',
    'FechaFinInscripcion': 'fechaFinInscripcion',
    'ContadorInscripciones': 'contadorInscripciones',
    'PeriodoAcademico': 'periodoAcademico',
    'ResolucionHCU': 'resolucionHCU',
    'Modalidad': 'modalidad',
    'Duracion': 'duracion',
    'FechaInicioMatriculaOrd': 'fechaInicioMatriculaOrd',
    'FechaFinMatriculaOrd': 'fechaFinMatriculaOrd',
    'FechaInicioMatriculaExt': 'fechaInicioMatriculaExt',
    'FechaFinMatriculaExt': 'fechaFinMatriculaExt',
    'ContadorMatriculas': 'contadorMatriculas',
    'FechaInicioClases': 'fechaInicioClases',
    'FechaFinClases': 'fechaFinClases',
    'CoordinadorCohorteID': 'coordinadorCohorteID',
    'MecanismosTitulacion': 'mecanismosTitulacion'
  }
},
EXTENSIONES_FECHAS: {
  sheetName: 'EXTENSIONES_FECHAS',
  idPrefix: 'EXT',
  headerMap: {
    'ExtensionID': 'extensionID',
    'CohorteID': 'cohorteID',
    'TipoExtension': 'tipoExtension',
    'NumeroLlamado': 'numeroLlamado',
    'FechaInicio': 'fechaInicio',
    'FechaFin': 'fechaFin',
    'FechaRegistro': 'fechaRegistro'
  }
},

 CONSULTA: {
    sheetName: 'CONSULTA',
    idPrefix: 'CON',
    headerMap: { 
      'ConsultaID': 'consultaID', 
      'UsuarioID': 'usuarioID', 
      'FechaConsulta': 'fechaConsulta', 
      'HoraVisita': 'horaVisita',
      'HoraFin': 'horaFin',
      'MedioAtencion': 'medioAtencion', 
      'TipoConsulta': 'tipoConsulta', 
      'DetalleConsulta': 'detalleConsulta',
      'TipoSolucion': 'tipoSolucion', 
      'SolucionBrindada': 'solucionBrindada', 
      'NombreFuncionarioQueAtendio': 'nombreFuncionarioQueAtendio', 
      'AgendadaPreviamente': 'agendadaPreviamente',
      'NumeroQuipux': 'numeroQuipux',
      'FacultadReunion': 'facultadReunion'
    }
  },
 OBSERVACIONES: {
 sheetName: 'OBSERVACIONES',
 idPrefix: 'OBS',
 headerMap: { 'ObservacionID': 'observacionID', 'ProgramaID': 'programaID', 'Descripcion': 'descripcion', 'FechaObservacion': 'fechaObservacion', 'FechaCorreccionEsperada': 'fechaCorreccionEsperada', 'FechaCorreccionRecibida': 'fechaCorreccionRecibida' }
 },
 NOTIFICACION: {
 sheetName: 'NOTIFICACION',
 idPrefix: 'NOTIF',
 headerMap: { 'NotificacionID': 'notificacionID', 'ObservacionID': 'observacionID', 'ProgramaID': 'programaID', 'CoordinadorID': 'coordinadorID', 'Tipo': 'tipo', 'Mensaje': 'mensaje', 'FechaEnvio': 'fechaEnvio' }
 },
 CONFIG: {
 sheetName: 'CONFIG',
 headerMap: { 'TipoLista': 'tipoLista', 'ValorItem': 'valorItem', 'FaseOrigen': 'faseOrigen', 'FaseDestino': 'faseDestino' }
 },
 PARTICIPANTES: {
    sheetName: 'PARTICIPANTES',
    idPrefix: 'PAR',
    headerMap: { 'ParticipanteID': 'participanteID', 'ConsultaID': 'consultaID', 'UsuarioID': 'usuarioID', 'Rol': 'rol' }
  },
};


function logActivity(level, message) {
 Logger.log(`[${level}] ${new Date().toISOString()} - ${message}`);
}


function doGet(e) {
  logActivity('INFO', `doGet: Solicitud recibida. Parámetros: ${JSON.stringify(e.parameter)}`);
  try {
    const page = e.parameter.page || 'index';
    const titleMap = {
      'ModificaForm'          : 'Actualizar Programa',
      'ObservacionesForm'     : 'Seguimiento de Programas',
      'ConsultaForm'          : 'Registrar Atención/Consulta',
      'ProgramaPosgradoForm'  : 'Gestionar Programa de Posgrado',
      'UsuarioForm'           : 'Gestionar Usuario',
      'CoordinadorForm'       : 'Gestionar Coordinador',
      'index'                 : 'Gestión Asesorías UP UCE',
      'dashboard'             : 'Dashboard de Gestión',      
      'CohortesHub'           : 'Gestionar Cohortes de Programas',
      'Reportes'              : 'Reportes Administrativos',
      'dashboardProser'       : 'Dashboard Administrativo Proser', 
      'SeleccionAtencion'     : 'Seleccionar Medio de Atención'
    };
    const validPage = titleMap.hasOwnProperty(page) ? page : 'index';
    const template = HtmlService.createTemplateFromFile(validPage);

    if (e.parameter.id) {
      template.id = e.parameter.id;
    }

    const pageToServe = template.evaluate().setTitle(titleMap[validPage]);

    
    return pageToServe.addMetaTag('viewport', 'width=device-width, initial-scale=1.0');

  } catch (error) {
    const pageName = e.parameter.page || 'index';
    logActivity('ERROR', `doGet: Error crítico al cargar '${pageName}.html': ${error.message}, Stack: ${error.stack}`);
    return HtmlService.createHtmlOutput(`<h1>Error al cargar la aplicación.</h1><p>Detalle: ${error.message}</p>`);
  }
}

function getWebAppUrl() {
 return ScriptApp.getService().getUrl();
}

function getSheetData(sheetNameFromConfig) {
  try {
    const config = SHEETS_CONFIG[sheetNameFromConfig];
    if (!config) throw new Error(`Configuración no encontrada para la hoja: ${sheetNameFromConfig}`);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    if (!sheet) throw new Error(`Hoja '${config.sheetName}' no encontrada.`);
    const dataRange = sheet.getDataRange();
    const values = dataRange.getDisplayValues(); 
    if (values.length < 2) return JSON.stringify([]);

    const headers = values[0];
    const data = [];
    const headerToJsKeyMap = new Map();
    for (const [sheetHeader, jsKey] of Object.entries(config.headerMap)) {
      const headerIndex = headers.indexOf(sheetHeader);
      if (headerIndex !== -1) {
        headerToJsKeyMap.set(headerIndex, jsKey);
      } else {
        logActivity('WARN', `getSheetData: Cabecera '${sheetHeader}' no encontrada en la hoja '${config.sheetName}'.`);
      }
    }
    
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      if(row.every(cell => cell === '')) continue;
      const rowObject = {};
      headerToJsKeyMap.forEach((jsKey, headerIndex) => {
        rowObject[jsKey] = row[headerIndex] !== undefined ? row[headerIndex] : '';
      });

      if (sheetNameFromConfig === 'OBSERVACIONES') {
        rowObject.estadoSemaforo = calculateSemaforoState(rowObject.fechaCorreccionEsperada, rowObject.fechaCorreccionRecibida);
      }
      data.push(rowObject);
    }
    return JSON.stringify(data);
  } catch (error) {
    logActivity('ERROR', `getSheetData: Error en '${sheetNameFromConfig} - ${error.message}. Stack: ${error.stack}`);
    // Devuelve un array vacío en caso de error para evitar que la aplicación se rompa por completo.
    return JSON.stringify([]); 
  }
}

/**
 * Retorna el contenido bruto de un archivo HTML (sin wrappers de página completa).
 * @param {string} filename El nombre del archivo HTML (ej. 'UsuarioFormSysgup')
 */
/**
 * Servidor de contenido HTML puro para SPA.
 * Retorna el texto del archivo sin evaluar para inyección en contenedores.
 */
function getTemplateContent(filename) {
  try {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  } catch (e) {
    return `<div class="p-4 bg-red-50 text-red-700 rounded-lg">Error: El módulo <strong>${filename}</strong> no fue encontrado o no se pudo cargar.</div>`;
  }
}

// ---------------------------------------------------------
// REPORTE DE CONSULTAS Y PRODUCTIVIDAD (EXCEL CON RANGO DE FECHAS)
// ---------------------------------------------------------
/**
 * Genera el reporte de productividad creando un Google Sheet temporal en Drive
 * y retoma la URL de exportación nativa a Excel (.xlsx)
 */
function generarReporteExcelProductividad(fechaInicio, fechaFin, funcionario) {
  try {
    logActivity('INFO', `generarReporteExcelProductividad: Inicio=${fechaInicio}, Fin=${fechaFin}, Funcionario=${funcionario}`);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetConsulta = ss.getSheetByName('CONSULTA');
    if (!sheetConsulta) throw new Error("No se encontró la hoja CONSULTA");

    const data = sheetConsulta.getDataRange().getValues();
    if (data.length < 2) return null;

    const headers = data[0].map(h => String(h).trim());
    const idxConsultaID = headers.indexOf('ConsultaID');
    const idxUsuarioID  = headers.indexOf('UsuarioID');
    const idxFecha      = headers.indexOf('FechaConsulta');
    const idxHoraVisita = headers.indexOf('HoraVisita');
    const idxHoraFin    = headers.indexOf('HoraFin');
    const idxMedio      = headers.indexOf('MedioAtencion');
    const idxTipo       = headers.indexOf('TipoConsulta');
    const idxDetalle    = headers.indexOf('DetalleConsulta');
    const idxSolucion   = headers.indexOf('SolucionBrindada');
    const idxFuncionario= headers.indexOf('NombreFuncionarioQueAtendio');
    const idxAgendada   = headers.indexOf('AgendadaPreviamente');
    const idxQuipux     = headers.indexOf('NumeroQuipux');
    const idxFacultad   = headers.indexOf('FacultadReunion');

    const fInicio = fechaInicio ? new Date(fechaInicio + 'T00:00:00') : null;
    const fFin    = fechaFin ? new Date(fechaFin + 'T23:59:59') : null;

    // Crear un nuevo Google Sheet temporal para el reporte
    const titleReport = `Reporte_Productividad_${new Date().getTime()}`;
    const newSpreadsheet = SpreadsheetApp.create(titleReport);
    const reportSheet = newSpreadsheet.getActiveSheet();
    reportSheet.setName('Productividad');

    // Encabezados en la nueva hoja
    const exportHeaders = [
      "ConsultaID", "UsuarioID", "Fecha Consulta", "Hora Inicio", "Hora Fin",
      "Medio Atención", "Tipo Consulta", "Detalle / Asunto", "Solución",
      "Funcionario", "Agendada Previamente", "N° Quipux", "Facultad"
    ];
    reportSheet.appendRow(exportHeaders);

    // Dar estilo a la cabecera
    const headerRange = reportSheet.getRange(1, 1, 1, exportHeaders.length);
    headerRange.setBackground("#4F46E5").setFontColor("#FFFFFF").setFontWeight("bold");

    const rowsToInsert = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const rowFunc = String(row[idxFuncionario] || '').trim();
      const rawFecha = row[idxFecha];
      if (!rawFecha) continue;

      const rowFecha = new Date(rawFecha);

      // Filtro de Funcionario
      if (funcionario !== 'TODOS' && rowFunc !== funcionario) continue;

      // Filtro de Fechas
      if (fInicio && rowFecha < fInicio) continue;
      if (fFin && rowFecha > fFin) continue;

      // Formateo limpio de Fecha (YYYY-MM-DD) y Horas (HH:mm)
      const fechaFormateada = Utilities.formatDate(rowFecha, ss.getSpreadsheetTimeZone(), "yyyy-MM-dd");
      
      let horaInicioStr = row[idxHoraVisita] || '';
      if (horaInicioStr instanceof Date) {
        horaInicioStr = Utilities.formatDate(horaInicioStr, ss.getSpreadsheetTimeZone(), "HH:mm");
      }

      let horaFinStr = row[idxHoraFin] || '';
      if (horaFinStr instanceof Date) {
        horaFinStr = Utilities.formatDate(horaFinStr, ss.getSpreadsheetTimeZone(), "HH:mm");
      }

      rowsToInsert.push([
        row[idxConsultaID] || '',
        row[idxUsuarioID] || '',
        fechaFormateada,
        horaInicioStr,
        horaFinStr,
        row[idxMedio] || '',
        row[idxTipo] || '',
        row[idxDetalle] || '',
        row[idxSolucion] || '',
        rowFunc,
        row[idxAgendada] || 'NO',
        row[idxQuipux] || '',
        row[idxFacultad] || ''
      ]);
    }

    if (rowsToInsert.length > 0) {
      reportSheet.getRange(2, 1, rowsToInsert.length, exportHeaders.length).setValues(rowsToInsert);
      // Aplicar formato de texto plano a columnas de horas para evitar alteración
      reportSheet.getRange(2, 4, rowsToInsert.length, 2).setNumberFormat("@");
    }

    SpreadsheetApp.flush();

    // Obtener la URL de exportación directa en formato XLSX
    const fileId = newSpreadsheet.getId();
    const downloadUrl = `https://docs.google.com/spreadsheets/d/${fileId}/export?format=xlsx`;

    return downloadUrl;

  } catch (e) {
    logActivity('ERROR', `generarReporteExcelProductividad: ${e.message}`);
    return null;
  }
}

// ---------------------------------------------------------
// REPORTE EXCEL DE TRÁMITES QUIPUX POR FACULTAD
// ---------------------------------------------------------
/**
 * Genera el Excel (.xlsx) nativo de Quipux creando un Google Sheet temporal en Drive
 * e idéntico al método de reporte de productividad
 */
function generarReporteQuipuxExcel(facultad) {
  try {
    logActivity('INFO', `generarReporteQuipuxExcel: Facultad=${facultad}`);

    const rawData = getReporteQuipuxByFacultad(facultad);
    const lista = JSON.parse(rawData);

    if (!lista || lista.length === 0) return null;

    // Crear un nuevo Google Sheet temporal en Drive
    const titleReport = `Reporte_Quipux_${new Date().getTime()}`;
    const newSpreadsheet = SpreadsheetApp.create(titleReport);
    const reportSheet = newSpreadsheet.getActiveSheet();
    reportSheet.setName('Quipux');

    // Encabezados en el libro Excel
    const exportHeaders = [
      "Numero Quipux", "Fecha", "Facultad", "Detalle / Motivo", "Atendido Por", "Estado / Solucion"
    ];
    reportSheet.appendRow(exportHeaders);

    // Estilo de la cabecera (Azul Quipux)
    const headerRange = reportSheet.getRange(1, 1, 1, exportHeaders.length);
    headerRange.setBackground("#0284C7").setFontColor("#FFFFFF").setFontWeight("bold");

    const rowsToInsert = [];
    lista.forEach(q => {
      rowsToInsert.push([
        q.numeroQuipux || '',
        q.fecha || '',
        q.facultad || '',
        q.tema || '',
        q.funcionario || '',
        q.respuesta || ''
      ]);
    });

    if (rowsToInsert.length > 0) {
      reportSheet.getRange(2, 1, rowsToInsert.length, exportHeaders.length).setValues(rowsToInsert);
    }

    SpreadsheetApp.flush();

    // Retornar enlace nativo de descarga en formato Excel (.xlsx)
    const fileId = newSpreadsheet.getId();
    return `https://docs.google.com/spreadsheets/d/${fileId}/export?format=xlsx`;

  } catch (e) {
    logActivity('ERROR', `generarReporteQuipuxExcel: ${e.message}`);
    return null;
  }
}



// ---------------------------------------------------------
// BÚSQUEDA DE REUNIONES POR FACULTAD (ACTAS PDF)
// ---------------------------------------------------------
function getReunionesPorFacultad(facultad) {
  try {
    const consultas = JSON.parse(getSheetData('CONSULTA'));
    const facNorm = (facultad || '').trim().toLowerCase();

    const reuniones = consultas.filter(c => {
      const medioNorm = (c.medioAtencion || '').trim().toLowerCase();
      const esReunion = medioNorm.includes('reunion') || medioNorm.includes('reunión');
      const cFacNorm = (c.facultadReunion || '').trim().toLowerCase();
      const coincideFacultad = (facNorm === 'todas' || facNorm === 'todos' || facNorm === '' || cFacNorm === facNorm);
      return esReunion && coincideFacultad;
    });

    const resultado = reuniones.map(r => ({
      id: r.consultaID,
      consultaID: r.consultaID,
      fecha: r.fechaConsulta,
      hora: r.horaVisita,
      tema: r.detalleConsulta || r.temaOrdenDelDia || 'Sin tema especificado',
      funcionario: r.nombreFuncionarioQueAtendio || 'No asignado'
    }));

    return JSON.stringify(resultado);
  } catch (e) {
    return JSON.stringify([]);
  }
}

// ---------------------------------------------------------
// BÚSQUEDA DE TRÁMITES QUIPUX POR FACULTAD
// ---------------------------------------------------------
function getTramitesQuipuxPorFacultad(facultad) {
  try {
    const consultas = JSON.parse(getSheetData('CONSULTA'));
    const facNorm = (facultad || '').trim().toLowerCase();

    const tramites = consultas.filter(c => {
      const medioNorm = (c.medioAtencion || '').trim().toLowerCase();
      const esQuipux = medioNorm === 'quipux';
      const cFacNorm = (c.facultadReunion || '').trim().toLowerCase();
      const coincideFacultad = (facNorm === 'todas' || facNorm === 'todos' || facNorm === '' || cFacNorm === facNorm);
      return esQuipux && coincideFacultad;
    });

    const resultado = tramites.map(t => ({
      consultaID: t.consultaID,
      numeroQuipux: t.numeroQuipux || 'S/N',
      fecha: t.fechaConsulta,
      facultad: t.facultadReunion || 'No especificada',
      detalle: t.detalleConsulta || 'Sin detalle',
      funcionario: t.nombreFuncionarioQueAtendio || 'No asignado',
      solucion: t.solucionBrindada || 'Pendiente'
    }));

    return JSON.stringify(resultado);
  } catch (e) {
    return JSON.stringify([]);
  }
}


// ---------------------------------------------------------
// GENERADOR DE ACTA PDF (DOCUMENTAPP - PERSONALIZABLE)
// ---------------------------------------------------------
/**
 * Retorna las atenciones filtradas por rango de fecha y funcionario en formato JSON
 */
function getDatosProductividadProductividad(fechaInicio, fechaFin, funcionario) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('CONSULTA');
    if (!sheet) return JSON.stringify([]);

    const data = sheet.getDataRange().getValues();
    if (data.length < 2) return JSON.stringify([]);

    const headers = data[0].map(h => String(h).trim());
    const idxConsultaID = headers.indexOf('ConsultaID');
    const idxUsuarioID = headers.indexOf('UsuarioID');
    const idxFecha = headers.indexOf('FechaConsulta');
    const idxHoraVisita = headers.indexOf('HoraVisita');
    const idxHoraFin = headers.indexOf('HoraFin');
    const idxMedio = headers.indexOf('MedioAtencion');
    const idxTipo = headers.indexOf('TipoConsulta');
    const idxDetalle = headers.indexOf('DetalleConsulta');
    const idxSolucion = headers.indexOf('SolucionBrindada');
    const idxFuncionario = headers.indexOf('NombreFuncionarioQueAtendio');
    const idxAgendada = headers.indexOf('AgendadaPreviamente');
    const idxQuipux = headers.indexOf('NumeroQuipux');
    const idxFacultad = headers.indexOf('FacultadReunion');

    const fInicio = fechaInicio ? new Date(fechaInicio) : null;
    const fFin = fechaFin ? new Date(fechaFin) : null;
    if (fFin) fFin.setHours(23, 59, 59, 999);

    const resultados = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const rowFunc = String(row[idxFuncionario] || '').trim();
      const rawFecha = row[idxFecha];
      if (!rawFecha) continue;

      const rowFecha = new Date(rawFecha);

      // Filtro por funcionario
      if (funcionario !== 'TODOS' && rowFunc !== funcionario) continue;

      // Filtro por fechas
      if (fInicio && rowFecha < fInicio) continue;
      if (fFin && rowFecha > fFin) continue;

      resultados.push({
        consultaID: row[idxConsultaID] || '',
        usuarioID: row[idxUsuarioID] || '',
        fechaConsulta: Utilities.formatDate(rowFecha, ss.getSpreadsheetTimeZone(), "yyyy-MM-dd"),
        horaVisita: row[idxHoraVisita] || '',
        horaFin: row[idxHoraFin] || '',
        medioAtencion: row[idxMedio] || '',
        tipoConsulta: row[idxTipo] || '',
        detalleConsulta: row[idxDetalle] || '',
        solucionBrindada: row[idxSolucion] || '',
        nombreFuncionarioQueAtendio: rowFunc,
        agendadaPreviamente: row[idxAgendada] || 'NO',
        numeroQuipux: row[idxQuipux] || '',
        facultadReunion: row[idxFacultad] || ''
      });
    }

    return JSON.stringify(resultados);
  } catch (err) {
    Logger.log("Error en getDatosProductividadProductividad: " + err.toString());
    return JSON.stringify([]);
  }
}

/**
 * Retorna una plantilla HTML imprimible para el Acta de Reunión en PDF
 */
/**
 * Retorna el HTML del Acta de Reunión con fecha en formato simple (YYYY-MM-DD)
 */
function obtenerHtmlActaReunion(consultaID) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetCon = ss.getSheetByName('CONSULTA');
    if (!sheetCon) return "";

    const data = sheetCon.getDataRange().getValues();
    let r = null;

    for (let i = 1; i < data.length; i++) {
      if (String(data[i][0]).trim() === String(consultaID).trim()) {
        const rawFecha = data[i][2];
        let fechaLimpia = '';
        if (rawFecha instanceof Date) {
          fechaLimpia = Utilities.formatDate(rawFecha, ss.getSpreadsheetTimeZone(), "yyyy-MM-dd");
        } else if (rawFecha) {
          fechaLimpia = String(rawFecha).split('T')[0];
        }

        let horaInicio = data[i][3] || '';
        if (horaInicio instanceof Date) horaInicio = Utilities.formatDate(horaInicio, ss.getSpreadsheetTimeZone(), "HH:mm");

        let horaFin = data[i][4] || '';
        if (horaFin instanceof Date) horaFin = Utilities.formatDate(horaFin, ss.getSpreadsheetTimeZone(), "HH:mm");

        r = {
          consultaID: data[i][0],
          fecha: fechaLimpia,
          horaInicio: horaInicio,
          horaFin: horaFin,
          medio: data[i][5] || '',
          tipo: data[i][6] || '',
          tema: data[i][7] || '',
          acuerdos: data[i][9] || '',
          funcionario: data[i][10] || '',
          facultad: data[i][13] || ''
        };
        break;
      }
    }

    if (!r) return "";

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Acta de Reunión ${r.consultaID}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 25px; color: #1e293b; line-height: 1.4; }
          .header { text-align: center; border-bottom: 2px solid #1e293b; padding-bottom: 10px; margin-bottom: 20px; }
          .header h1 { margin: 0; font-size: 18px; text-transform: uppercase; }
          .header h2 { margin: 4px 0 0 0; font-size: 13px; color: #475569; font-weight: normal; }
          .meta-grid { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
          .meta-grid td { padding: 6px 10px; border: 1px solid #cbd5e1; }
          .meta-grid td.lbl { font-weight: bold; background: #f1f5f9; width: 20%; }
          .title-sec { font-size: 13px; font-weight: bold; margin-top: 15px; margin-bottom: 5px; }
          .content-box { border: 1px solid #cbd5e1; padding: 10px; font-size: 12px; min-height: 50px; background: #fafafa; }
          .signatures { margin-top: 40px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>UNIVERSIDAD CENTRAL DEL ECUADOR</h1>
          <h2>DIRECCIÓN DE POSGRADO — ACTA DE REUNIÓN</h2>
        </div>

        <table class="meta-grid">
          <tr>
            <td class="lbl">Código Acta:</td>
            <td><strong>${r.consultaID}</strong></td>
            <td class="lbl">Fecha:</td>
            <td><strong>${r.fecha}</strong></td>
          </tr>
          <tr>
            <td class="lbl">Facultad / Unidad:</td>
            <td>${r.facultad}</td>
            <td class="lbl">Horario:</td>
            <td>${r.horaInicio} - ${r.horaFin}</td>
          </tr>
          <tr>
            <td class="lbl">Medio Atención:</td>
            <td>${r.medio}</td>
            <td class="lbl">Atendido Por:</td>
            <td>${r.funcionario}</td>
          </tr>
        </table>

        <div class="title-sec">1. TEMA / ORDEN DEL DÍA</div>
        <div class="content-box">${r.tema}</div>

        <div class="title-sec">2. ACUERDOS Y COMPROMISOS ALCANZADOS</div>
        <div class="content-box">${r.acuerdos || 'Sin acuerdos registrados.'}</div>

        <div class="signatures">
          <br><br><br>
          ______________________________________<br>
          <strong>${r.funcionario}</strong><br>
          Unidad de Posgrado UCE
        </div>
      </body>
      </html>
    `;
  } catch (err) {
    Logger.log("Error en obtenerHtmlActaReunion: " + err.toString());
    return "";
  }
}

function getSheetHeaders(sheetNameFromConfig) {
  const config = SHEETS_CONFIG[sheetNameFromConfig];
  if (!config) {
    logActivity('ERROR', `getSheetHeaders: Configuración no encontrada para la hoja: ${sheetNameFromConfig}`);
    return [];
  }
  return Object.keys(config.headerMap); // Retorna las cabeceras en el orden definido en headerMap
}

function generateNextId(sheetNameFromConfig, idPrefix) {
  logActivity('INFO', `generateNextId: Solicitando ID para ${sheetNameFromConfig} con prefijo "${idPrefix}".`);

  // LockService serializa el acceso concurrente.
  // Si dos usuarios crean un registro al mismo tiempo, el segundo espera
  // hasta que el primero termine, eliminando la posibilidad de IDs duplicados.
  const lock = LockService.getScriptLock();
  try {
    // Espera hasta 15 segundos para adquirir el lock.
    // Si no puede adquirirlo, lanza una excepción capturada abajo.
    lock.waitLock(15000);
  } catch (lockError) {
    logActivity('ERROR', `generateNextId: No se pudo adquirir el lock de escritura para ${sheetNameFromConfig}. El sistema está ocupado. Detalle: ${lockError.message}`);
    return null;
  }

  try {
    const config = SHEETS_CONFIG[sheetNameFromConfig];
    if (!config) {
      logActivity('ERROR', `generateNextId: Configuración no encontrada para la hoja: ${sheetNameFromConfig}`);
      return null;
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    if (!sheet) {
      logActivity('ERROR', `generateNextId: Hoja '${config.sheetName}' no encontrada.`);
      return null;
    }

    // La primera clave del headerMap es siempre la columna ID de esa entidad.
    const idHeaderName = Object.keys(config.headerMap)[0];
    const headersInSheet = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0];
    const idColumnIndex = headersInSheet.indexOf(idHeaderName);

    if (idColumnIndex === -1) {
      logActivity('ERROR', `generateNextId: Columna de ID '${idHeaderName}' no encontrada en hoja '${config.sheetName}'. Verifique que la cabecera coincida exactamente con la configuración.`);
      return null;
    }

    let maxIdNum = 0;

    if (sheet.getLastRow() > 1) {
      const columnValues = sheet.getRange(2, idColumnIndex + 1, sheet.getLastRow() - 1, 1).getValues();
      for (let i = 0; i < columnValues.length; i++) {
        const id = columnValues[i][0];
        if (id && typeof id === 'string' && id.startsWith(idPrefix)) {
          const numPart = parseInt(id.substring(idPrefix.length), 10);
          if (!isNaN(numPart) && numPart > maxIdNum) {
            maxIdNum = numPart;
          }
        }
      }
    }

    const nextIdNum = maxIdNum + 1;
    const newId = `${idPrefix}${String(nextIdNum).padStart(3, '0')}`;
    logActivity('INFO', `generateNextId: Nuevo ID generado exitosamente: ${newId}`);
    return newId;

  } catch (error) {
    logActivity('ERROR', `generateNextId: Error inesperado al generar ID para ${sheetNameFromConfig}: ${error.message}, Stack: ${error.stack}`);
    return null;

  } finally {
    // CRÍTICO: El bloque finally garantiza que el lock SIEMPRE se libera,
    // incluso si ocurre una excepción. Sin esto, el sistema quedaría bloqueado
    // para todos los usuarios hasta que el lock expire automáticamente (~1 min).
    lock.releaseLock();
    logActivity('INFO', `generateNextId: Lock liberado para ${sheetNameFromConfig}.`);
  }
}

// ---------------------------------------------------------
// OBTENCIÓN DE DROPDOWNS FACULTADES
// ---------------------------------------------------------
/**
 * Obtiene los elementos de la hoja CONFIG según el TipoLista
 * @param {string} tipoLista Nombre del tipo ('Facultades', 'MiembrosUP', etc.)
 * @return {Array} Lista de valores en formato simple
 */
function getDropdownData(tipoLista) {
  try {
    // [MEJORA #22] La cache ahora SI se pobla (antes solo se invalidaba)
    const cacheKey = `dropdown_${tipoLista}`;
    const cached = CacheService.getScriptCache().get(cacheKey);
    if (cached) return JSON.parse(cached);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('CONFIG');
    if (!sheet) return [];

    // Obtener todos los datos de la hoja
    const data = sheet.getDataRange().getValues();
    
    // Suponiendo que Columna A (índice 0) es TipoLista y Columna B (índice 1) es ValorItem
    const resultados = [];
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === tipoLista && data[i][1]) {
        resultados.push(data[i][1]);
      }
    }
    try { CacheService.getScriptCache().put(cacheKey, JSON.stringify(resultados), 300); } catch (ePut) { /* payloads grandes no se cachean */ }
    return resultados;
  } catch (e) {
    Logger.log('Error en getDropdownData: ' + e.message);
    return [];
  }
}



function invalidateConfigCache(listType) {
  try {
    const cache = CacheService.getScriptCache();

    if (listType) {
      const cacheKey = `dropdown_${listType}`;
      cache.remove(cacheKey);
      logActivity('INFO', `invalidateConfigCache: Caché invalidado para lista "${listType}".`);
    } else {
      // Invalida todas las listas conocidas en CONFIG de una sola vez
      const ALL_LIST_TYPES = [
        'Facultades', 'Modalidades', 'TipoVisitante', 'Fases',
        'MensajeNotificacion', 'Transiciones', 'Generos', 'Cargos',
        'TipoConsulta', 'MiembrosUP', 'Agendado', 'Medio', 'Ordinal'
      ];
      const keysToRemove = ALL_LIST_TYPES.map(type => `dropdown_${type}`);
      cache.removeAll(keysToRemove);
      logActivity('INFO', `invalidateConfigCache: Caché completo de CONFIG invalidado (${keysToRemove.length} claves).`);
    }
  } catch (error) {
    logActivity('ERROR', `invalidateConfigCache: Error al invalidar caché: ${error.message}`);
  }
}



function parseDateDDMMYYYY(dateString) {
  if (!dateString) return null;
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Meses son 0-indexados en Date
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    // Verificar si la fecha es válida (ej. 31/02/2023 se convertiría a 02/03/2023)
    if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
      return date;
    }
  }
  return null;
}

function parseDateYYYYMMDD(dateString) {
  if (!dateString) return null;
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Meses son 0-indexados en Date
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
      return date;
    }
  }
  return null;
}

function calculateSemaforoState(fechaCorreccionEsperada, fechaCorreccionRecibida) {
  try {
    // [MEJORA #7] Normalizador tolerante: acepta Date nativo de Sheets, YYYY-MM-DD,
    // DD/MM/YYYY y DD-MM-YYYY (la BDD convive con ambos formatos segun quien escribio la fila)
    const toISO = (v) => {
      if (v == null) return null;
      if (v instanceof Date) return Utilities.formatDate(v, Session.getScriptTimeZone(), 'yyyy-MM-dd');
      const s = String(v).trim();
      if (s === '' || s === '---') return null;
      let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);              // YYYY-MM-DD
      if (m) return `${m[1]}-${String(m[2]).padStart(2, '0')}-${String(m[3]).padStart(2, '0')}`;
      m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);                // DD/MM/YYYY
      if (m) return `${m[3]}-${String(m[2]).padStart(2, '0')}-${String(m[1]).padStart(2, '0')}`;
      m = s.match(/^(\d{1,2})-(\d{1,2})-(\d{4})/);                  // DD-MM-YYYY
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
}

// --- VALIDACIONES DE CAMPOS ---

function validateUsuarioFields(usuarioData) {
  if (!usuarioData.nombreCompleto || usuarioData.nombreCompleto.trim() === '') {
    return 'El campo "Nombre Completo" es obligatorio.';
  }
  if (!usuarioData.correoInstitucional || usuarioData.correoInstitucional.trim() === '') {
    return 'El campo "Correo Institucional" es obligatorio.';
  }
  if (!/\S+@\S+\.\S+/.test(usuarioData.correoInstitucional.trim())) {
      return 'El formato del "Correo Institucional" no es válido.';
  }
    if (!usuarioData.genero || usuarioData.genero.trim() === '') {
    return 'El campo "Género" es obligatorio.';
  }
  if (!usuarioData.cargo || usuarioData.cargo.trim() === '') {
    return 'El campo "Cargo" es obligatorio.';
  }
  if (!usuarioData.facultad || usuarioData.facultad.trim() === '') {
    return 'El campo "Facultad" es obligatorio.';
  }
  // NOTA LOPDP: Se elimina la validación obligatoria del teléfono de contacto
  return null;
}


function validateCoordinadorFields(coordinadorData) {
  if (!coordinadorData.nombreCompleto || coordinadorData.nombreCompleto.trim() === '') {
    return 'El campo "Nombre Completo" es obligatorio.';
  }
  if (!coordinadorData.correoInstitucional || coordinadorData.correoInstitucional.trim() === '') {
    return 'El campo "Correo Institucional" es obligatorio.';
  }
  if (!/\S+@\S+\.\S+/.test(coordinadorData.correoInstitucional.trim())) {
      return 'El formato del "Correo Institucional" no es válido.';
  }
  // NOTA LOPDP: Se elimina la validación obligatoria del teléfono de contacto
  return null;
}


function validateProgramaPosgradoFields(programaData) {
  if (!programaData.facultad || programaData.facultad.trim() === '') {
    return 'El campo "Facultad" es obligatorio.';
  }
  if (!programaData.coordinadorID || programaData.coordinadorID.trim() === '') {
    return 'Debe seleccionar un "Coordinador".';
  }
  if (!programaData.nombrePrograma || programaData.nombrePrograma.trim() === '') {
    return 'El campo "Nombre del Programa" es obligatorio.';
  }
  if (!programaData.modalidad || programaData.modalidad.trim() === '') {
    return 'El campo "Modalidad" es obligatorio.';
  }
  if (!programaData.duracion || programaData.duracion.trim() === '') {
    return 'El campo "Duración" es obligatorio.';
  }
  // CostoAproximado es opcional, no necesita validación de obligatoriedad aquí
  
  if (!programaData.estadoPropuesta || programaData.estadoPropuesta.trim() === '') {
    return 'El campo "Estado de Propuesta" es obligatorio.';
  }

  // Validaciones condicionales si el estado es "Aprobado"
  if (programaData.estadoPropuesta === 'Vigente') {
    if (!programaData.resolucionHCU || programaData.resolucionHCU.trim() === '') {
      return 'El campo "Resolución HCU" es obligatorio cuando el estado es Vigente.';
    }
    if (!programaData.fechaAprobacionHCU || programaData.fechaAprobacionHCU.trim() === '') {
      return 'El campo "Fecha Aprobación HCU" es obligatorio cuando el estado es Vigente.';
    }
    // Validar formato de fecha AprobacionHCU (espera YYYY-MM-DD del input type="date")
    if (programaData.fechaAprobacionHCU && !/^\d{4}-\d{2}-\d{2}$/.test(programaData.fechaAprobacionHCU.trim())) {
        return 'El campo "Fecha Aprobación HCU" debe tener formato AAAA-MM-DD.';
    }
    if (!programaData.resolucionCES || programaData.resolucionCES.trim() === '') {
      return 'El campo "Resolución CES" es obligatorio cuando el estado es Vigente.';
    }
    if (!programaData.fechaAprobacionCES || programaData.fechaAprobacionCES.trim() === '') {
      return 'El campo "Fecha Aprobación CES" es obligatorio cuando el estado es Vigente.';
    }
    // Validar formato de fecha AprobacionCES (espera YYYY-MM-DD del input type="date")
    if (programaData.fechaAprobacionCES && !/^\d{4}-\d{2}-\d{2}$/.test(programaData.fechaAprobacionCES.trim())) {
        return 'El campo "Fecha Aprobación CES" debe tener formato AAAA-MM-DD.';
    }
    if (!programaData.codigoSNIESE || programaData.codigoSNIESE.trim() === '') {
      return 'El campo "Código SNIESE" es obligatorio cuando el estado es Vigente.';
    }
    if (!programaData.vigenciaHasta || programaData.vigenciaHasta.trim() === '') {
      return 'El campo "Vigencia Hasta" es obligatorio cuando el estado es Vigente.';
    }
    // Validar formato de fecha VigenciaHasta (espera YYYY-MM-DD del input type="date")
    if (programaData.vigenciaHasta && !/^\d{4}-\d{2}-\d{2}$/.test(programaData.vigenciaHasta.trim())) {
        return 'El campo "Vigencia Hasta" debe tener formato AAAA-MM-DD.';
    }
  }

  return null;
}

function validateConsultaFields(consultaData) {
  if (!consultaData.usuarioID || consultaData.usuarioID.trim() === '') {
    return 'Debe seleccionar un "Usuario" para la consulta.';
  }
  if (!consultaData.fechaConsulta || consultaData.fechaConsulta.trim() === '') {
    return 'El campo "Fecha de Consulta" es obligatorio.';
  }
  if (!consultaData.horaVisita || consultaData.horaVisita.trim() === '') {
    return 'El campo "Hora de Visita" es obligatorio.';
  }
  if (!consultaData.tipoConsulta || consultaData.tipoConsulta.trim() === '') {
    return 'El campo "Tipo de Consulta" es obligatorio.';
  }
  if (!consultaData.detalleConsulta || consultaData.detalleConsulta.trim() === '') {
    return 'El campo "Detalle de Consulta" es obligatorio.';
  }
  if (!consultaData.solucionBrindada || consultaData.solucionBrindada.trim() === '') {
    return 'El campo "Solución Brindada" es obligatorio.';
  }
  if (!consultaData.nombreFuncionarioQueAtendio || consultaData.nombreFuncionarioQueAtendio.trim() === '') {
    return 'El campo "Funcionario que Atendió" es obligatorio.';
  }
  if (!consultaData.agendadaPreviamente || consultaData.agendadaPreviamente.trim() === '') {
    return 'El campo "¿Agendada Previamente?" es obligatorio.';
  }
  return null;
}


function validateObservacionFields(observacionData) {
  if (!observacionData.programaID || observacionData.programaID.trim() === '') {
    return 'Debe seleccionar un "Programa" para la observación.';
  }
  if (!observacionData.descripcion || observacionData.descripcion.trim() === '') {
    return 'El campo "Descripción" es obligatorio.';
  }
  if (!observacionData.fechaObservacion || observacionData.fechaObservacion.trim() === '') {
    return 'El campo "Fecha de Observación" es obligatorio.';
  }
  // Validar formato de FechaObservacion (espera DD/MM/AAAA)
  if (observacionData.fechaObservacion && !/^\d{2}\/\d{2}\/\d{4}$/.test(observacionData.fechaObservacion.trim())) {
      return 'El campo "Fecha de Observación" debe tener formato DD/MM/AAAA.';
  }

  if (!observacionData.fechaCorreccionEsperada || observacionData.fechaCorreccionEsperada.trim() === '') {
    return 'El campo "Fecha Límite para Corrección" es obligatorio.';
  }
  // La validación ahora espera YYYY-MM-DD para fechaCorreccionEsperada
  if (observacionData.fechaCorreccionEsperada && !/^\d{4}-\d{2}-\d{2}$/.test(observacionData.fechaCorreccionEsperada.trim())) {
      return 'El campo "Fecha Límite para Corrección" debe tener formato AAAA-MM-DD.';
  }

  if (observacionData.fechaCorreccionRecibida && observacionData.fechaCorreccionRecibida.trim() !== '') {
    // La validación ahora espera YYYY-MM-DD para fechaCorreccionRecibida
    if (!/^\d{4}-\d{2}-\d{2}$/.test(observacionData.fechaCorreccionRecibida.trim())) {
        return 'El campo "Fecha de Corrección Recibida" debe tener formato AAAA-MM-DD si se especifica.';
    }
  }
  return null;
}


// --- FUNCIONES CRUD ---

/**USUARIO */

function createUsuario(usuarioData) {
  logActivity('INFO', `createUsuario: Intentando crear nuevo usuario con datos: ${JSON.stringify(usuarioData)}`);
  try {
    const config = SHEETS_CONFIG.USUARIO;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    if (!sheet) {
      logActivity('ERROR', `createUsuario: Hoja '${config.sheetName}' no encontrada.`);
      return { success: false, message: `Error: Hoja '${config.sheetName}' no encontrada.` };
    }

    const validationError = validateUsuarioFields(usuarioData);
    if (validationError) {
      logActivity('ERROR', `createUsuario: Error de validación: ${validationError}`);
      return { success: false, message: validationError };
    }

    const newId = generateNextId('USUARIO', config.idPrefix);
    if (!newId) {
      logActivity('ERROR', 'createUsuario: No se pudo generar un UsuarioID único. Verifique los logs del servidor.');
      return { success: false, message: 'Error: No se pudo generar un ID único para el usuario. Verifique los logs del servidor.' };
    }

    const headers = getSheetHeaders('USUARIO');
    const newRow = [];
    const now = new Date();
    const formattedDate = Utilities.formatDate(now, SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), 'yyyy-MM-dd HH:mm:ss');

    const usuarioToSave = {
      usuarioID: newId,
      nombreCompleto: usuarioData.nombreCompleto.toUpperCase().trim(),
      correoInstitucional: usuarioData.correoInstitucional.toLowerCase().trim(),
      // NOTA LOPDP: Se remueve el almacenamiento de telefonoContacto
      genero: usuarioData.genero.trim(),
      cargo: usuarioData.cargo.trim(),
      facultad: usuarioData.facultad.trim(),
      fechaRegistro: formattedDate,
      ultimaActualizacion: formattedDate
    };

    for (const header of headers) {
      const jsKey = config.headerMap[header];
      newRow.push(usuarioToSave[jsKey]!== undefined ? usuarioToSave[jsKey] : '');
    }

    sheet.appendRow(newRow);
    logActivity('INFO', `createUsuario: Usuario ${newId} creado exitosamente.`);
    return { success: true, message: 'Usuario creado exitosamente.', usuario: JSON.stringify(usuarioToSave) };
  } catch (error) {
    logActivity('ERROR', `createUsuario: Error al crear usuario: ${error.message}, Stack: ${error.stack}`);
    return { success: false, message: `Error al crear usuario: ${error.message}. Por favor, verifique los logs.` };
  }
}

function getUsuarioById(usuarioID) {
  logActivity('INFO', `getUsuarioById: Buscando usuario con ID: ${usuarioID}`);
  try {
    const users = JSON.parse(getSheetData('USUARIO'));
    const foundUser = users.find(u => u.usuarioID === usuarioID);

    if (foundUser) {
      logActivity('INFO', `getUsuarioById: Usuario ${usuarioID} encontrado.`);
      
      return foundUser;
    } else {
      logActivity('INFO', `getUsuarioById: Usuario ${usuarioID} no encontrado.`);
      return null;
    }
  } catch (error) {
    logActivity('ERROR', `getUsuarioById: Error al buscar usuario por ID '${usuarioID}': ${error.message}, Stack: ${error.stack}`);
    return null;
  }
}

function updateUsuario(usuarioData) {
  logActivity('INFO', `updateUsuario: Intentando actualizar usuario con ID: ${usuarioData.usuarioID}`);
  try {
    const config = SHEETS_CONFIG.USUARIO;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    if (!sheet) {
      logActivity('ERROR', `updateUsuario: Hoja '${config.sheetName}' no encontrada.`);
      return { success: false, message: `Error: Hoja '${config.sheetName}' no encontrada.` };
    }

    if (!usuarioData.usuarioID) {
        logActivity('ERROR', 'updateUsuario: UsuarioID es requerido para la actualización.');
        return { success: false, message: 'Error: El ID de usuario es obligatorio para la actualización.' };
    }
    const validationError = validateUsuarioFields(usuarioData);
    if (validationError) {
      logActivity('ERROR', `updateUsuario: Error de validación: ${validationError}`);
      return { success: false, message: validationError };
    }

    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];
    const idColumnIndex = headers.indexOf('UsuarioID');

    if (idColumnIndex === -1) {
      logActivity('ERROR', 'updateUsuario: Columna \'UsuarioID\' no encontrada en la hoja.');
      return { success: false, message: 'Error interno: Columna de ID no encontrada.' };
    }

    let rowIndexToUpdate = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][idColumnIndex] === usuarioData.usuarioID) {
        rowIndexToUpdate = i;
        break;
      }
    }

    if (rowIndexToUpdate === -1) {
      logActivity('WARN', `updateUsuario: Usuario con ID ${usuarioData.usuarioID} no encontrado para actualizar.`);
      return { success: false, message: `Usuario con ID ${usuarioData.usuarioID} no encontrado.` };
    }

    const now = new Date();
    const formattedDate = Utilities.formatDate(now, SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), 'yyyy-MM-dd HH:mm:ss');

    const updatedRow = [];
    const headerMapping = config.headerMap;
    for (const header of headers) {
      const jsKey = headerMapping[header];
      if (jsKey === 'ultimaActualizacion') {
        updatedRow.push(formattedDate);
      } else if (jsKey === 'usuarioID' || jsKey === 'fechaRegistro') {
        updatedRow.push(values[rowIndexToUpdate][headers.indexOf(header)]); 
      } else if (usuarioData.hasOwnProperty(jsKey)) {
        updatedRow.push(usuarioData[jsKey].trim());
      } else {
        updatedRow.push(''); 
      }
    }

    sheet.getRange(rowIndexToUpdate + 1, 1, 1, updatedRow.length).setValues([updatedRow]);
    logActivity('INFO', `updateUsuario: Usuario ${usuarioData.usuarioID} actualizado exitosamente.`);
    return { success: true, message: 'Usuario actualizado exitosamente.' };
  } catch (error) {
    logActivity('ERROR', `updateUsuario: Error al actualizar usuario: ${error.message}, Stack: ${error.stack}`);
    return { success: false, message: `Error al actualizar usuario: ${error.message}. Por favor, verifique los logs.` };
  }
}

function deleteUsuario(usuarioID) {
  logActivity('INFO', `deleteUsuario: Intentando eliminar usuario con ID: ${usuarioID}`);
  try {
    const config = SHEETS_CONFIG.USUARIO;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    if (!sheet) {
      logActivity('ERROR', `deleteUsuario: Hoja '${config.sheetName}' no encontrada.`);
      return { success: false, message: `Error: Hoja '${config.sheetName}' no encontrada.` };
    }

    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];
    const idColumnIndex = headers.indexOf('UsuarioID');

    if (idColumnIndex === -1) {
      logActivity('ERROR', 'deleteUsuario: Columna \'UsuarioID\' no encontrada en la hoja.');
      return { success: false, message: 'Error interno: Columna de ID no encontrada.' };
    }

    let rowIndexToDelete = -1;
    for (let i = 1; i < values.length; i++) { 
      if (values[i][idColumnIndex] === usuarioID) {
        rowIndexToDelete = i;
        break;
      }
    }

    if (rowIndexToDelete === -1) {
      logActivity('WARN', `deleteUsuario: Usuario con ID ${usuarioID} no encontrado para eliminar.`);
      return { success: false, message: `Usuario con ID ${usuarioID} no encontrado.` };
    }

    sheet.deleteRow(rowIndexToDelete + 1); 
    logActivity('INFO', `deleteUsuario: Usuario ${usuarioID} eliminado exitosamente.`);
    return { success: true, message: 'Usuario eliminado exitosamente.' };
  }
  catch (error) {
    logActivity('ERROR', `deleteUsuario: Error al eliminar usuario: ${error.message}, Stack: ${error.stack}`);
    return { success: false, message: `Error al eliminar usuario: ${error.message}. Por favor, verifique los logs.` };
  }
}

function searchUsuarios(query) {
  logActivity('INFO', `searchUsuarios: Búsqueda iniciada con término: "${query}"`);
  try {
    if (!query || query.trim().length < 3) {
      return JSON.stringify([]);
    }

    const queryClean = query.toLowerCase().trim();
    const usuarios = JSON.parse(getSheetData('USUARIO'));

    const resultados = usuarios.filter(u => {
      const id = String(u.usuarioID || '').toLowerCase();
      const nombre = String(u.nombreCompleto || '').toLowerCase();
      const correo = String(u.correoInstitucional || '').toLowerCase();
      return id.includes(queryClean) || nombre.includes(queryClean) || correo.includes(queryClean);
    });

    // Sanitización: Retornar únicamente los campos necesarios sin exponer datos sensibles
    const sanitized = resultados.map(u => ({
      usuarioID: u.usuarioID,
      nombreCompleto: u.nombreCompleto,
      correoInstitucional: u.correoInstitucional,
      cargo: u.cargo,
      facultad: u.facultad
    }));

    return JSON.stringify(sanitized);
  } catch (e) {
    logActivity('ERROR', `searchUsuarios: Error durante la búsqueda: ${e.message}`);
    return JSON.stringify([]);
  }
}

/**COORDINADOR */

function createCoordinador(coordinadorData) {
  logActivity('INFO', `createCoordinador: Intentando crear nuevo coordinador con datos: ${JSON.stringify(coordinadorData)}`);
  try {
    const config = SHEETS_CONFIG.COORDINADOR;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    if (!sheet) {
      logActivity('ERROR', `createCoordinador: Hoja '${config.sheetName}' no encontrada.`);
      return { success: false, message: `Error: Hoja '${config.sheetName}' no encontrada.` };
    }

    const validationError = validateCoordinadorFields(coordinadorData);
    if (validationError) {
      logActivity('ERROR', `createCoordinador: Error de validación: ${validationError}`);
      return { success: false, message: validationError };
    }

    const newId = generateNextId('COORDINADOR', config.idPrefix);
    if (!newId) {
      logActivity('ERROR', 'createCoordinador: No se pudo generar un CoordinadorID único.');
      return { success: false, message: 'Error: No se pudo generar un ID único para el coordinador.' };
    }

    const headers = getSheetHeaders('COORDINADOR');
    const newRow = [];
    const now = new Date();
    const formattedDate = Utilities.formatDate(now, SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), 'yyyy-MM-dd HH:mm:ss');

    const coordinadorToSave = {
      coordinadorID: newId,
      nombreCompleto: coordinadorData.nombreCompleto.toUpperCase().trim(),
      correoInstitucional: coordinadorData.correoInstitucional.toLowerCase().trim(),
      // NOTA LOPDP: Se remueve el almacenamiento de telefonoContacto
      genero: coordinadorData.genero.trim(), 
      fechaRegistro: formattedDate,
      ultimaActualizacion: formattedDate
    };

    for (const header of headers) {
      const jsKey = config.headerMap[header];
      newRow.push(coordinadorToSave[jsKey]!== undefined ? coordinadorToSave[jsKey] : '');
    }

    sheet.appendRow(newRow);
    logActivity('INFO', `createCoordinador: Coordinador ${newId} creado exitosamente.`);
    return { success: true, message: 'Coordinador creado exitosamente.', coordinador: JSON.stringify(coordinadorToSave) };
  } catch (error) {
    logActivity('ERROR', `createCoordinador: Error al crear coordinador: ${error.message}, Stack: ${error.stack}`);
    return { success: false, message: `Error al crear coordinador: ${error.message}. Por favor, verifique los logs.` };
  }
}

/**
 * Obtiene un coordinador por su ID en formato objeto para la SPA
 */
function getCoordinadorById(coordinadorID) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('COORDINADOR');
    if (!sheet) return null;

    const data = sheet.getDataRange().getValues();
    if (data.length < 2) return null;

    const headers = data[0].map(h => String(h).trim());
    const idxID = headers.indexOf('CoordinadorID');
    const idxNombre = headers.indexOf('NombreCompleto');
    const idxCorreo = headers.indexOf('CorreoInstitucional');
    const idxGen = headers.indexOf('Genero');

    for (let i = 1; i < data.length; i++) {
      if (String(data[i][idxID]).trim() === String(coordinadorID).trim()) {
        return {
          coordinadorID: data[i][idxID],
          nombreCompleto: data[i][idxNombre] || '',
          correoInstitucional: data[i][idxCorreo] || '',
          genero: data[i][idxGen] || ''
        };
      }
    }
    return null;
  } catch (e) {
    Logger.log("Error en getCoordinadorById: " + e.message);
    return null;
  }
}

function searchCoordinadores(searchQuery) {
  logActivity('INFO', `searchCoordinadores: Buscando coordinadores con query: "${searchQuery}"`);
  try {
    
    const coordinadores = JSON.parse(getSheetData('COORDINADOR'));

    
    if (!searchQuery || searchQuery.trim().length < 3) {
      logActivity('INFO', 'searchCoordinadores: Query demasiado corto, devolviendo array vacío.');
      return JSON.stringify([]);
    }

    
    const lowerCaseQuery = searchQuery.trim().toLowerCase();
    const filteredCoordinadores = coordinadores.filter(coordinador =>
      (coordinador.nombreCompleto && coordinador.nombreCompleto.toLowerCase().includes(lowerCaseQuery)) ||
      (coordinador.correoInstitucional && coordinador.correoInstitucional.toLowerCase().includes(lowerCaseQuery))
    );
    
    logActivity('INFO', `searchCoordinadores: ${filteredCoordinadores.length} coordinadores encontrados para "${searchQuery}"`);
    
    
    return JSON.stringify(filteredCoordinadores);

  } catch (error) {
    logActivity('ERROR', `searchCoordinadores: Error al buscar coordinadores: ${error.message}, Stack: ${error.stack}`);
    return JSON.stringify([]); // Devuelve un array vacío en caso de error.
  }
}

function updateCoordinador(coordinadorData) {
  logActivity('INFO', `updateCoordinador: Intentando actualizar coordinador con ID: ${coordinadorData.coordinadorID}`);
  try {
    const config = SHEETS_CONFIG.COORDINADOR;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    if (!sheet) {
      logActivity('ERROR', `updateCoordinador: Hoja '${config.sheetName}' no encontrada.`);
      return { success: false, message: `Error: Hoja '${config.sheetName}' no encontrada.` };
    }

    if (!coordinadorData.coordinadorID) {
      return { success: false, message: 'Error: El ID de coordinador es obligatorio para la actualización.' };
    }
    const validationError = validateCoordinadorFields(coordinadorData);
    if (validationError) {
      logActivity('ERROR', `updateCoordinador: Error de validación: ${validationError}`);
      return { success: false, message: validationError };
    }

    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];
    const idColumnIndex = headers.indexOf('CoordinadorID');

    if (idColumnIndex === -1) {
      logActivity('ERROR', 'updateCoordinador: Columna \'CoordinadorID\' no encontrada en la hoja.');
      return { success: false, message: 'Error interno: Columna de ID no encontrada.' };
    }

    let rowIndexToUpdate = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][idColumnIndex] === coordinadorData.coordinadorID) {
        rowIndexToUpdate = i;
        break;
      }
    }

    if (rowIndexToUpdate === -1) {
      logActivity('WARN', `updateCoordinador: Coordinador con ID ${coordinadorData.coordinadorID} no encontrado.`);
      return { success: false, message: `Coordinador con ID ${coordinadorData.coordinadorID} no encontrado.` };
    }

    const now = new Date();
    const formattedDate = Utilities.formatDate(now, SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), 'yyyy-MM-dd HH:mm:ss');

    const updatedRow = [];
    const headerMapping = config.headerMap;
    for (const header of headers) {
      const jsKey = headerMapping[header];
      if (jsKey === 'ultimaActualizacion') {
        updatedRow.push(formattedDate);
      } else if (jsKey === 'coordinadorID' || jsKey === 'fechaRegistro') {
        updatedRow.push(values[rowIndexToUpdate][headers.indexOf(header)]);
      } else if (coordinadorData.hasOwnProperty(jsKey)) {
        updatedRow.push(coordinadorData[jsKey].trim());
      } else {
        updatedRow.push('');
      }
    }

    sheet.getRange(rowIndexToUpdate + 1, 1, 1, updatedRow.length).setValues([updatedRow]);
    logActivity('INFO', `updateCoordinador: Coordinador ${coordinadorData.coordinadorID} actualizado exitosamente.`);
    return { success: true, message: 'Coordinador actualizado exitosamente.' };
  } catch (error) {
    logActivity('ERROR', `updateCoordinador: Error al actualizar coordinador: ${error.message}, Stack: ${error.stack}`);
    return { success: false, message: `Error al actualizar coordinador: ${error.message}. Por favor, verifique los logs.` };
  }
}

function deleteCoordinador(coordinadorID) {
  logActivity('INFO', `deleteCoordinador: Intentando eliminar coordinador con ID: ${coordinadorID}`);
  try {
    const config = SHEETS_CONFIG.COORDINADOR;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    if (!sheet) {
      logActivity('ERROR', `deleteCoordinador: Hoja '${config.sheetName}' no encontrada.`);
      return { success: false, message: `Error: Hoja '${config.sheetName}' no encontrada.` };
    }

    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];
    // --- CORRECCIÓN CLAVE AQUÍ ---
    const idColumnIndex = headers.indexOf('CoordinadorID');

    if (idColumnIndex === -1) {
      logActivity('ERROR', 'deleteCoordinador: Columna \'CoordinadorID\' no encontrada en la hoja.');
      return { success: false, message: 'Error interno: Columna de ID no encontrada.' };
    }

    let rowIndexToDelete = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][idColumnIndex] === coordinadorID) {
        rowIndexToDelete = i;
        break;
      }
    }

    if (rowIndexToDelete === -1) {
      logActivity('WARN', `deleteCoordinador: Coordinador con ID ${coordinadorID} no encontrado para eliminar.`);
      return { success: false, message: `Coordinador con ID ${coordinadorID} no encontrado.` };
    }

    sheet.deleteRow(rowIndexToDelete + 1);
    logActivity('INFO', `deleteCoordinador: Coordinador ${coordinadorID} eliminado exitosamente.`);
    return { success: true, message: 'Coordinador eliminado exitosamente.' };
  } catch (error) {
    logActivity('ERROR', `deleteCoordinador: Error al eliminar coordinador: ${error.message}, Stack: ${error.stack}`);
    return { success: false, message: `Error al eliminar coordinador: ${error.message}. Por favor, verifique los logs.` };
  }
}

/**PROGRAMAS */


function createProgramaPosgrado(programaData) {
  logActivity('INFO', `createProgramaPosgrado: Intentando crear nuevo programa con datos: ${JSON.stringify(programaData)}`);
  try {
    const config = SHEETS_CONFIG.PROGRAMAPOSGRADO;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    if (!sheet) {
      logActivity('ERROR', `createProgramaPosgrado: Hoja '${config.sheetName}' no encontrada.`);
      return { success: false, message: `Error: Hoja '${config.sheetName}' no encontrada.` };
    }

    const validationError = validateProgramaPosgradoFields(programaData);
    if (validationError) {
      logActivity('ERROR', `createProgramaPosgrado: Error de validación: ${validationError}`);
      return { success: false, message: validationError };
    }

    const newId = generateNextId('PROGRAMAPOSGRADO', config.idPrefix);
    if (!newId) {
      logActivity('ERROR', 'createProgramaPosgrado: No se pudo generar un ProgramaID único.');
      return { success: false, message: 'Error: No se pudo generar un ID único para el programa.' };
    }

    const headers = getSheetHeaders('PROGRAMAPOSGRADO');
    const newRow = [];
    

    const programaToSave = {
      programaID: newId,
      facultad: programaData.facultad.trim(),
      coordinadorID: programaData.coordinadorID.trim(),
      nombrePrograma: programaData.nombrePrograma.toUpperCase().trim(),
      mencion: programaData.mencion ? programaData.mencion.toUpperCase().trim() : '', // Opcional
      modalidad: programaData.modalidad.trim(),
      duracion: programaData.duracion.trim(),
      costoAproximado: programaData.costoAproximado ? programaData.costoAproximado.trim() : '', // Opcional
      estadoPropuesta: programaData.estadoPropuesta.trim(),
      resolucionHCU: programaData.resolucionHCU ? programaData.resolucionHCU.trim() : '',
      fechaAprobacionHCU: programaData.fechaAprobacionHCU ? programaData.fechaAprobacionHCU.trim() : '',
      resolucionCES: programaData.resolucionCES ? programaData.resolucionCES.trim() : '',
      fechaAprobacionCES: programaData.fechaAprobacionCES ? programaData.fechaAprobacionCES.trim() : '',
      codigoSNIESE: programaData.codigoSNIESE ? programaData.codigoSNIESE.trim() : '',
      vigenciaHasta: programaData.vigenciaHasta ? programaData.vigenciaHasta.trim() : ''
    };

    for (const header of headers) {
      const jsKey = config.headerMap[header];
      newRow.push(programaToSave[jsKey]);
    }

    sheet.appendRow(newRow);
    logActivity('INFO', `createProgramaPosgrado: Programa ${newId} creado exitosamente.`);
    return { success: true, message: 'Programa creado exitosamente.', programa: JSON.stringify(programaToSave) };
  } catch (error) {
    logActivity('ERROR', `createProgramaPosgrado: Error al crear programa: ${error.message}, Stack: ${error.stack}`);
    return { success: false, message: `Error al crear programa: ${error.message}. Por favor, verifique los logs.` };
  }
}

function getFacultadesUnicas() {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('PROGRAMAPOSGRADO');
  const datos = hoja.getDataRange().getValues();
  const header = datos[0];
  const filas = datos.slice(1);
  const iFacultad = header.indexOf('Facultad');
  const facultades = [...new Set(filas.map(f => f[iFacultad]).filter(f => f))];
  return facultades;
}

function getProgramasByFacultad(facultad) {
    try {
        if (!facultad || facultad.trim() === '') return JSON.stringify([]);
        const todosLosProgramas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));
        const facultadNormalizada = facultad.trim().toLowerCase();
        const programasFiltrados = todosLosProgramas.filter(p => p.facultad && p.facultad.trim().toLowerCase() === facultadNormalizada);
        return JSON.stringify(programasFiltrados);
    } catch (error) {
        logActivity('ERROR', `getProgramasByFacultad: ${error.message}`);
        return JSON.stringify([]);
    }
}


  function obtenerDatosDeProgramaPorID(programaID) {
    logActivity('INFO', `obtenerDatosDeProgramaPorID: Buscando detalles para el ID: "${programaID}"`);
    try {
      if (!programaID || programaID.trim() === '') {
        logActivity('WARN', 'obtenerDatosDeProgramaPorID: Se recibió un ID vacío o inválido.');
        return null; 
      }

      const programas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));
      const programaEncontrado = programas.find(p => p.programaID === programaID);

      if (programaEncontrado) {
        logActivity('INFO', `obtenerDatosDeProgramaPorID: Programa encontrado.`);
        return programaEncontrado; 
      } else {
        logActivity('WARN', `obtenerDatosDeProgramaPorID: No se encontró el programa con ID "${programaID}".`);
        return null;
      }
    } catch (error) {
      logActivity('ERROR', `obtenerDatosDeProgramaPorID: Error crítico: ${error.message}, Stack: ${error.stack}`);
      return null; 
    }
  }

function updateProgramaPosgrado(dataToSave) {
  logActivity('INFO', `updateProgramaPosgrado: Solicitud para ID: ${dataToSave.programaID} con datos: ${JSON.stringify(dataToSave)}`);
  try {
    if (!dataToSave.programaID) return { success: false, message: 'Error: Falta el programaID.' };

    const config = SHEETS_CONFIG.PROGRAMAPOSGRADO;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    if (!sheet) return { success: false, message: `Hoja no encontrada: ${config.sheetName}` };

    const allData = sheet.getDataRange().getValues();
    const headers = allData[0];
    const idSheetHeader = Object.keys(config.headerMap).find(key => config.headerMap[key] === 'programaID');
    if (!idSheetHeader) return { success: false, message: 'Error de configuración: no se encuentra la cabecera para programaID.' };

    const idColumnIndex = headers.indexOf(idSheetHeader);
    const rowIndex = allData.findIndex(row => String(row[idColumnIndex]).trim() === String(dataToSave.programaID).trim()); // [FIX #17] comparacion estricta
    if (rowIndex === -1) return { success: false, message: `Programa con ID ${dataToSave.programaID} no encontrado.` };

    
    for (const jsKey in dataToSave) {
      if (jsKey !== 'programaID') {
        const sheetHeader = Object.keys(config.headerMap).find(key => config.headerMap[key] === jsKey);
        if (sheetHeader) {
          const columnIndex = headers.indexOf(sheetHeader);
          if (columnIndex !== -1) {
            sheet.getRange(rowIndex + 1, columnIndex + 1).setValue(dataToSave[jsKey]);
          }
        }
      }
    }

    
    if (dataToSave.hasOwnProperty('estadoPropuesta') && dataToSave.estadoPropuesta === 'Vigente') {
      const programaID = dataToSave.programaID;
      logActivity('INFO', `El programa ${programaID} ha pasado a estado 'Vigente'. Verificando si necesita una cohorte inicial.`);

      const cohortesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETS_CONFIG.COHORTE.sheetName);
      
      const cohortesExistentes = JSON.parse(getSheetData('COHORTE')).filter(c => c.programaID === programaID);
      
      if (cohortesExistentes.length === 0) {
        logActivity('INFO', `No existen cohortes para ${programaID}. Creando la cohorte inicial 'NO INICIADO'.`);
        
        const cohorteConfig = SHEETS_CONFIG.COHORTE;
        const newCohorteId = generateNextId('COHORTE', cohorteConfig.idPrefix);
        
        const cohorteToSave = {
          cohorteID: newCohorteId,
          programaID: programaID,
          estadoCohorte: 'NO INICIADO'
        };

        const cohorteHeaders = getSheetHeaders('COHORTE');
        const newRow = cohorteHeaders.map(header => {
            const jsKey = cohorteConfig.headerMap[header];
            return cohorteToSave[jsKey] || ''; 
        });

        cohortesSheet.appendRow(newRow);
        logActivity('INFO', `Cohorte inicial ${newCohorteId} creada para el programa ${programaID}.`);
      } else {
        logActivity('INFO', `El programa ${programaID} ya tiene cohortes existentes. No se crea una nueva.`);
      }
    }
    
    return { success: true, message: 'Datos actualizados con éxito.' };
  } catch (e) {
    logActivity('ERROR', `updateProgramaPosgrado: ${e.message}, Stack: ${e.stack}`);
    return { success: false, message: `Error del servidor: ${e.message}` };
  }
}


  function deleteProgramaPosgrado(programaID) {
    logActivity('INFO', `deleteProgramaPosgrado: Intentando eliminar programa con ID: ${programaID}`);
    try {
      const config = SHEETS_CONFIG.PROGRAMAPOSGRADO;
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
      if (!sheet) {
        logActivity('ERROR', `deleteProgramaPosgrado: Hoja '${config.sheetName}' no encontrada.`);
        return { success: false, message: `Error: Hoja '${config.sheetName}' no encontrada.` };
      }

      const dataRange = sheet.getDataRange();
      const values = dataRange.getValues();
      const headers = values[0];
      const idColumnIndex = headers.indexOf('ProgramaID');      // [FIX #21] cabecera real de la hoja
      const snieseColumnIndex = headers.indexOf('CodigoSNIESE'); // [FIX #21] cabecera real de la hoja

      if (idColumnIndex === -1 || snieseColumnIndex === -1) {
        logActivity('ERROR', 'deleteProgramaPosgrado: Columnas de ID o CodigoSNIESE no encontradas.');
        return { success: false, message: 'Error interno: Columnas de ID o CodigoSNIESE no encontradas.' };
      }

      let rowIndexToDelete = -1;
      let hasSNIESE = false;
      for (let i = 1; i < values.length; i++) {
        if (values[i][idColumnIndex] === programaID) {
          rowIndexToDelete = i;
          if (values[i][snieseColumnIndex] && values[i][snieseColumnIndex].toString().trim() !== '') {
            hasSNIESE = true;
          }
          break;
        }
      }

      if (rowIndexToDelete === -1) {
        logActivity('WARN', `deleteProgramaPosgrado: Programa con ID ${programaID} no encontrado.`);
        return { success: false, message: `Programa con ID ${programaID} no encontrado.` };
      }

      if (hasSNIESE) {
        logActivity('WARN', `deleteProgramaPosgrado: Intento de eliminar programa ${programaID} con CodigoSNIESE. Operación bloqueada.`);
        return { success: false, message: `No se puede eliminar el programa ${programaID} porque ya tiene un Código SNIESE.` };
      }

      sheet.deleteRow(rowIndexToDelete + 1);
      logActivity('INFO', `deleteProgramaPosgrado: Programa ${programaID} eliminado exitosamente.`);
      return { success: true, message: 'Programa eliminado exitosamente.' };
    } catch (error) {
        logActivity('ERROR', `deleteProgramaPosgrado: Error al eliminar programa: ${error.message}, Stack: ${error.stack}`);
        return { success: false, message: `Error al eliminar programa: ${error.message}. Por favor, verifique los logs.` };
      }
  }

/** COHORTES */

function searchApprovedProgramas(searchQuery) {
    logActivity('INFO', `Buscando programas VIGENTES con query: "${searchQuery}"`);
    try {
      const todosLosProgramas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));
      const programasAprobados = todosLosProgramas.filter(p => p.estadoPropuesta === 'Vigente');

      if (!searchQuery) {
        return JSON.stringify(programasAprobados);
      }

      const lowerCaseQuery = searchQuery.toLowerCase().trim();
      if (lowerCaseQuery === "") { 
        return JSON.stringify(programasAprobados);
      }
      
      const filteredProgramas = programasAprobados.filter(programa => {
        
        const nombrePrograma = (programa.nombrePrograma || '').toLowerCase().trim();
        const codigoSniese = (programa.codigoSNIESE || '').toLowerCase().trim();

        const nombreCoincide = nombrePrograma.includes(lowerCaseQuery);
        const snieseCoincide = codigoSniese.includes(lowerCaseQuery);
        
        return nombreCoincide || snieseCoincide;
      });

      logActivity('INFO', `${filteredProgramas.length} programas aprobados encontrados.`);
      return JSON.stringify(filteredProgramas);
    } catch (error) {
      logActivity('ERROR', `searchApprovedProgramas: ${error.message}`);
      return JSON.stringify([]);
    }
  }


function searchProgramas(searchQuery) {
  logActivity('INFO', `searchProgramas: Buscando en todos los programas con query: "${searchQuery}"`);
  try {
    const todosLosProgramas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));
    const lowerCaseQuery = (searchQuery || '').toLowerCase().trim();

    if (lowerCaseQuery === '') {
      logActivity('INFO', `searchProgramas: Consulta vacía. Retornando los ${todosLosProgramas.length} programas.`);
      return JSON.stringify(todosLosProgramas);
    }

    const filteredProgramas = todosLosProgramas.filter(programa => {
      const nombreCoincide = (programa.nombrePrograma || '').toLowerCase().trim().includes(lowerCaseQuery);
      const snieseCoincide = (programa.codigoSNIESE || '').toLowerCase().trim().includes(lowerCaseQuery);
      const mencionCoincide = (programa.mencion || '').toLowerCase().trim().includes(lowerCaseQuery);
      return nombreCoincide || snieseCoincide || mencionCoincide;
    });

    logActivity('INFO', `searchProgramas: ${filteredProgramas.length} programas encontrados para "${searchQuery}".`);
    return JSON.stringify(filteredProgramas);

  } catch (error) {
    logActivity('ERROR', `searchProgramas: Error al buscar programas: ${error.message}, Stack: ${error.stack}`);
    return JSON.stringify([]);
  }
}
  function getCohortesByProgramaId(programaID) {
    logActivity('INFO', `Obteniendo cohortes para ProgramaID: ${programaID}`);
    try {
      const todasLasCohortes = JSON.parse(getSheetData('COHORTE'));
      const cohortesFiltradas = todasLasCohortes.filter(c => c.programaID === programaID);
      return JSON.stringify(cohortesFiltradas);
    } catch (error) {
      logActivity('ERROR', `getCohortesByProgramaId: ${error.message}`);
      return JSON.stringify([]);
    }
  }
  function getCohorteById(cohorteID) {
    logActivity('INFO', `Buscando cohorte por ID: ${cohorteID}`);
    try {
      const todasLasCohortes = JSON.parse(getSheetData('COHORTE'));
      const cohorteEncontrada = todasLasCohortes.find(c => c.cohorteID === cohorteID);
      return JSON.stringify(cohorteEncontrada || null);
    } catch (error) {
      logActivity('ERROR', `getCohorteById: ${error.message}`);
      return JSON.stringify(null);
    }
  }
  function createCohorte(cohorteData) {
    logActivity('INFO', `Intentando crear nueva cohorte: ${JSON.stringify(cohorteData)}`);
    try {

      if (!cohorteData.programaID || !cohorteData.ordinalCohorte) {
        throw new Error("Faltan datos esenciales (ProgramaID / Ordinal de Cohorte).");
      }

      const config = SHEETS_CONFIG.COHORTE;
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
      const newId = generateNextId('COHORTE', config.idPrefix);

      const cohorteToSave = {
        cohorteID: newId,
        programaID: cohorteData.programaID,
        estadoCohorte: 'INSCRIPCIONES',
        contadorInscripciones: 1,
        contadorMatriculas: 1,
        ordinalCohorte: cohorteData.ordinalCohorte.trim(),
        periodoAcademico: cohorteData.periodoAcademico.trim(),
        fechaInicioInscripcion: cohorteData.fechaInicioInscripcion,
        fechaFinInscripcion: cohorteData.fechaFinInscripcion
      };
      
      const headers = getSheetHeaders('COHORTE');
      const newRow = headers.map(header => {
        const jsKey = config.headerMap[header];
        return cohorteToSave[jsKey] || ''; 
      });

      sheet.appendRow(newRow);
      logActivity('INFO', `Cohorte ${newId} creada exitosamente.`);
      return { success: true, message: 'Cohorte creada exitosamente.' };
    } catch (error) {
      logActivity('ERROR', `createCohorte: ${error.message}`);
      return { success: false, message: `Error al crear la cohorte: ${error.message}` };
    }
  }
 
 
function deleteCohorte(cohorteID) {
  logActivity('INFO', `Intentando eliminar cohorte ID: ${cohorteID}`);
  try {
    if (!cohorteID) {
      throw new Error("Falta el CohorteID para la eliminación.");
    }
    const config = SHEETS_CONFIG.COHORTE;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];

    const idSheetHeader = Object.keys(config.headerMap).find(key => config.headerMap[key] === 'cohorteID');
    const idColumnIndex = headers.indexOf(idSheetHeader);

    if (idColumnIndex === -1) {
      throw new Error(`Columna de ID '${idSheetHeader}' no encontrada.`);
    }

    let rowIndexToDelete = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][idColumnIndex] === cohorteID) {
        rowIndexToDelete = i;
        break;
      }
    }

    if (rowIndexToDelete === -1) {
      return { success: false, message: `Cohorte con ID ${cohorteID} no encontrada.` };
    }

    sheet.deleteRow(rowIndexToDelete + 1);
    logActivity('INFO', `Cohorte ${cohorteID} eliminada exitosamente.`);
    return { success: true, message: 'Cohorte eliminada exitosamente.' };

  } catch (error) {
    logActivity('ERROR', `deleteCohorte: ${error.message}`);
    return { success: false, message: `Error al eliminar la cohorte: ${error.message}` };
  }
}
  
function updateCohorte(cohorteData) {
  logActivity('INFO', `Intentando actualizar cohorte ID: ${cohorteData.cohorteID}`);
  try {
    if (!cohorteData.cohorteID) {
      throw new Error("Falta el CohorteID para la actualización.");
    }

    const config = SHEETS_CONFIG.COHORTE;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];

    const idSheetHeader = Object.keys(config.headerMap).find(key => config.headerMap[key] === 'cohorteID');
    const idColumnIndex = headers.indexOf(idSheetHeader);

    if (idColumnIndex === -1) {
      throw new Error(`Columna de ID '${idSheetHeader}' no encontrada en la hoja COHORTE.`);
    }

    let rowIndexToUpdate = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][idColumnIndex] === cohorteData.cohorteID) {
        rowIndexToUpdate = i;
        break;
      }
    }

    if (rowIndexToUpdate === -1) {
      return { success: false, message: `Cohorte con ID ${cohorteData.cohorteID} no encontrada.` };
    }

    // Crear una copia de los datos actuales
    const updatedRow = [...values[rowIndexToUpdate]];
    
    // Actualizar solo los campos proporcionados en cohorteData
    for (const jsKey in cohorteData) {
      if (jsKey !== 'cohorteID') {
        const sheetHeader = Object.keys(config.headerMap).find(key => config.headerMap[key] === jsKey);
        if (sheetHeader) {
          const columnIndex = headers.indexOf(sheetHeader);
          if (columnIndex !== -1) {
            updatedRow[columnIndex] = cohorteData[jsKey];
          }
        }
      }
    }
    
    // Escribir la fila actualizada
    sheet.getRange(rowIndexToUpdate + 1, 1, 1, updatedRow.length).setValues([updatedRow]);
    
    logActivity('INFO', `Cohorte ${cohorteData.cohorteID} actualizada exitosamente.`);
    return { success: true, message: 'Cohorte actualizada exitosamente.' };

  } catch (error) {
    logActivity('ERROR', `updateCohorte: ${error.message}`);
    return { success: false, message: `Error al actualizar la cohorte: ${error.message}` };
  }
}
 
function incrementarLlamado(cohorteID, tipoDeLlamado) {
  logActivity('INFO', `incrementarLlamado: Incrementando '${tipoDeLlamado}' para cohorte ID: ${cohorteID}`);
  try {
    if (tipoDeLlamado !== 'ContadorInscripciones' && tipoDeLlamado !== 'ContadorMatriculas') {
      throw new Error("Tipo de llamado no válido. Use 'ContadorInscripciones' o 'ContadorMatriculas'.");
    }

    const config = SHEETS_CONFIG.COHORTE;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];
    const idColumnIndex       = headers.indexOf('CohorteID');
    const contadorColumnIndex = headers.indexOf(tipoDeLlamado);

    if (idColumnIndex === -1 || contadorColumnIndex === -1) {
      throw new Error(`Columna de ID o '${tipoDeLlamado}' no encontrada en la hoja COHORTE.`);
    }

    let rowIndexToUpdate = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][idColumnIndex] === cohorteID) {
        rowIndexToUpdate = i;
        break;
      }
    }

    if (rowIndexToUpdate === -1) {
      return { success: false, nuevoValor: null, message: `Cohorte con ID ${cohorteID} no encontrada.` };
    }

    const valorActual = parseInt(values[rowIndexToUpdate][contadorColumnIndex], 10) || 0;
    const nuevoValor  = valorActual + 1;
    sheet.getRange(rowIndexToUpdate + 1, contadorColumnIndex + 1).setValue(nuevoValor);

    logActivity('INFO', `incrementarLlamado: Contador de ${tipoDeLlamado} para ${cohorteID} actualizado a ${nuevoValor}.`);

    // CORRECCIÓN P2-04: Se añade 'nuevoValor' como campo de datos estructurado.
    // La función que consume este resultado ya no necesita extraerlo con regex del mensaje.
    return {
      success: true,
      nuevoValor: nuevoValor,
      message: `Llamado registrado. El contador ahora es ${nuevoValor}.`
    };

  } catch (error) {
    logActivity('ERROR', `incrementarLlamado: ${error.message}`);
    return { success: false, nuevoValor: null, message: `Error al registrar el llamado: ${error.message}` };
  }
}
function updateEstadoCohorte(cohorteID, nuevoEstado) {
  logActivity('INFO', `Actualizando estado a '${nuevoEstado}' para cohorte ID: ${cohorteID}`);
  try {
    const ESTADOS_VALIDOS = ['INSCRIPCIONES', 'MATRICULACIÓN', 'EN CLASES', 'TITULACIÓN', 'FINALIZADA'];
    if (!cohorteID || !nuevoEstado || !ESTADOS_VALIDOS.includes(nuevoEstado)) {
      throw new Error("Datos de entrada no válidos para actualizar el estado.");
    }
    
    const config = SHEETS_CONFIG.COHORTE;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];

    const idColumnIndex = headers.indexOf('CohorteID');
    const estadoColumnIndex = headers.indexOf('EstadoCohorte');

    if (idColumnIndex === -1 || estadoColumnIndex === -1) {
      throw new Error("Columna de ID o EstadoCohorte no encontrada.");
    }

    let rowIndexToUpdate = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][idColumnIndex] === cohorteID) {
        rowIndexToUpdate = i;
        break;
      }
    }

    if (rowIndexToUpdate === -1) {
      return { success: false, message: `Cohorte con ID ${cohorteID} no encontrada.` };
    }

    sheet.getRange(rowIndexToUpdate + 1, estadoColumnIndex + 1).setValue(nuevoEstado);

    logActivity('INFO', `Estado de cohorte ${cohorteID} actualizado a ${nuevoEstado}.`);
    return { success: true, message: `Fase actualizada a "${nuevoEstado}" con éxito.` };

  } catch (error) {
    logActivity('ERROR', `updateEstadoCohorte: ${error.message}`);
    return { success: false, message: `Error al actualizar la fase: ${error.message}` };
  }
}
/**
 * Obtiene los detalles completos de una cohorte, enriquecidos con los datos
 * del programa padre y su historial de extensiones de fechas.
 *
 * CORRECCIÓN P3-02: Refactorizado de 3 lecturas independientes de hoja a una
 * sola llamada a getAllDataForDashboard que carga las 3 hojas necesarias en
 * un único ciclo de lectura, reduciendo las llamadas a la Sheets API en un 66%.
 *
 * @param {string} cohorteID - El ID de la cohorte a consultar.
 * @returns {string} JSON del objeto de detalles combinados, o JSON null si no se encuentra.
 */
function getCohorteDetails(cohorteID) {
  logActivity('INFO', `getCohorteDetails: Obteniendo detalles combinados para Cohorte ID: ${cohorteID}`);
  try {
    if (!cohorteID) {
      throw new Error('Se requiere un CohorteID válido.');
    }

    // ── LECTURA ÚNICA: las 3 hojas necesarias en una sola operación ───────────
    const allData    = getAllDataForDashboard(['COHORTE', 'PROGRAMAPOSGRADO', 'EXTENSIONES_FECHAS']);
    const cohortes   = allData['COHORTE']           || [];
    const programas  = allData['PROGRAMAPOSGRADO']  || [];
    const extensiones = allData['EXTENSIONES_FECHAS'] || [];

    // ── BÚSQUEDA EN MEMORIA (sin más lecturas de hoja) ────────────────────────
    const cohorte = cohortes.find(c => c.cohorteID === cohorteID);
    if (!cohorte) {
      throw new Error(`No se encontró la cohorte con ID ${cohorteID}.`);
    }

    const programa = programas.find(p => p.programaID === cohorte.programaID);
    if (!programa) {
      throw new Error(`No se encontró el programa padre con ID "${cohorte.programaID}" para la cohorte ${cohorteID}.`);
    }

    // Filtrar extensiones de esta cohorte específica directamente en memoria
    const extensionesDeEstaCohorte = extensiones.filter(e => e.cohorteID === cohorteID);

    // ── ENRIQUECER CON DATOS DEL PROGRAMA PADRE ───────────────────────────────
    // Los campos de cohorte tienen prioridad; los del programa son el fallback.
    const detallesCombinados = {
      ...cohorte,
      nombrePrograma       : programa.nombrePrograma,
      facultad             : programa.facultad,
      codigoSNIESE         : programa.codigoSNIESE,
      modalidad            : cohorte.modalidad            || programa.modalidad,
      duracion             : cohorte.duracion             || programa.duracion,
      costoAproximado      : cohorte.costoAproximado      || programa.costoAproximado,
      resolucionHCU_programa: programa.resolucionHCU,
      extensiones          : extensionesDeEstaCohorte
    };

    logActivity('INFO', `getCohorteDetails: Detalles combinados generados para ${cohorteID}. Extensiones encontradas: ${extensionesDeEstaCohorte.length}.`);
    return JSON.stringify(detallesCombinados);

  } catch (error) {
    logActivity('ERROR', `getCohorteDetails: ${error.message}`);
    return JSON.stringify(null);
  }
}
/**CONSULTORIA */


/**
 * Registra consultas y reuniones respetando el esquema relacional
 * de las hojas CONSULTA y PARTICIPANTES.
 */
function createConsultaAdministrativa(payload) {
  const lock = LockService.getScriptLock();
  try {
    // Bloqueo de concurrencia (espera hasta 10 seg) para evitar duplicación de IDs
    lock.waitLock(10000);

    if (!payload) {
      return { success: false, message: "No se recibieron datos para registrar." };
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetConsulta = ss.getSheetByName('CONSULTA');
    const sheetParticipantes = ss.getSheetByName('PARTICIPANTES');

    if (!sheetConsulta || !sheetParticipantes) {
      return { success: false, message: "Error: No se encontraron las hojas 'CONSULTA' o 'PARTICIPANTES'." };
    }

    const medio = String(payload.medioAtencion || '').trim().toLowerCase();
    const esReunion = (medio === 'reunion' || medio === 'reunión');

    // ── 1. VALIDACIONES ────────────────────────────────────────────────────────
    let participantesIds = payload.participantes || [];
    if (typeof participantesIds === 'string') {
      try { participantesIds = JSON.parse(participantesIds); } catch(e) { participantesIds = []; }
    }

    if (esReunion && (!Array.isArray(participantesIds) || participantesIds.length === 0)) {
      return { success: false, message: "Error: Debe agregar al menos un participante para la reunión." };
    }

    if (!esReunion && (!payload.usuarioID || String(payload.usuarioID).trim() === '')) {
      return { success: false, message: "Error: Debe seleccionar un Usuario Principal para este registro." };
    }

    // ── 2. GENERACIÓN ÚNICA DE ConsultaID ──────────────────────────────────────
    // [FIX #3] Se unifica con generateNextId (escanea el maximo real, no el numero de fila;
    // el esquema anterior reutilizaba IDs tras cada borrado y colisionaba). Ya existe LockService arriba.
    const consultaID = generateNextId('CONSULTA', 'CON');
    if (!consultaID) {
      return { success: false, message: 'Error: No se pudo generar un ConsultaID unico.' };
    }

    // ── 3. MAPEO EXACTO A LA HOJA "CONSULTA" (14 COLUMNAS) ──────────────────────
    // Estructura: [ConsultaID, UsuarioID, FechaConsulta, HoraVisita, HoraFin, MedioAtencion, 
    //              TipoConsulta, DetalleConsulta, TipoSolucion, SolucionBrindada, 
    //              NombreFuncionarioQueAtendio, AgendadaPreviamente, NumeroQuipux, FacultadReunion]
    
    const rowConsulta = [
      consultaID,                                                // 1. ConsultaID
      esReunion ? '' : (payload.usuarioID || ''),                // 2. UsuarioID (Vacio si es Reunion)
      payload.fechaConsulta || '',                               // 3. FechaConsulta
      payload.horaVisita || '',                                  // 4. HoraVisita
      payload.horaFin || '',                                     // 5. HoraFin
      payload.medioAtencion || '',                               // 6. MedioAtencion
      payload.tipoConsulta || '',                                // 7. TipoConsulta
      payload.temaOrdenDelDia || payload.detalleConsulta || '',  // 8. DetalleConsulta
      payload.tipoSolucion || '',                                // 9. TipoSolucion
      payload.acuerdosCompromisos || payload.solucionBrindada || '', // 10. SolucionBrindada
      payload.nombreFuncionarioQueAtendio || '',                 // 11. NombreFuncionarioQueAtendio
      payload.agendadaPreviamente || 'NO',                       // 12. AgendadaPreviamente
      payload.numeroQuipux || '',                                // 13. NumeroQuipux
      payload.facultadReunion || ''                              // 14. FacultadReunion
    ];

    sheetConsulta.appendRow(rowConsulta);

    // ── 4. INSERCIÓN EN LA HOJA "PARTICIPANTES" (SI ES REUNIÓN) ───────────────
    // Estructura: [ParticipanteID, ConsultaID, UsuarioID, Rol]
    if (esReunion && Array.isArray(participantesIds) && participantesIds.length > 0) {
      const rowsParticipantes = [];
      let lastPartRow = sheetParticipantes.getLastRow();

      participantesIds.forEach((usrId, index) => {
        lastPartRow++;
        const participanteID = `PAR${String(lastPartRow).padStart(3, '0')}`;
        rowsParticipantes.push([
          participanteID,   // 1. ParticipanteID
          consultaID,       // 2. ConsultaID (Clave Foránea)
          usrId,            // 3. UsuarioID
          'Asistente'       // 4. Rol
        ]);
      });

      if (rowsParticipantes.length > 0) {
        sheetParticipantes.getRange(
          sheetParticipantes.getLastRow() + 1, 
          1, 
          rowsParticipantes.length, 
          4
        ).setValues(rowsParticipantes);
      }
    }

    logActivity('INFO', `Consulta guardada con éxito. ID: ${consultaID}`);
    return { success: true, message: `Registro exitoso con ID: ${consultaID}` };

  } catch (error) {
    logActivity('ERROR', `Error en createConsultaAdministrativa: ${error.message}`);
    return { success: false, message: `Error en BDD: ${error.message}` };
  } finally {
    lock.releaseLock();
  }
}

function getConsultaById(consultaID) {
    logActivity('INFO', `getConsultaById: Buscando consulta con ID: ${consultaID}`);
    try {
      const consultas = JSON.parse(getSheetData('CONSULTA'));
      const foundConsulta = consultas.find(c => c.consultaID === consultaID);
      if (foundConsulta) {
        logActivity('INFO', `getConsultaById: Consulta ${consultaID} encontrada.`);
        return JSON.stringify(foundConsulta);
      } else {
        logActivity('INFO', `getConsultaById: Consulta ${consultaID} no encontrada.`);
        return JSON.stringify(null);
      }
    } catch (error) {
      logActivity('ERROR', `getConsultaById: Error al buscar consulta por ID '${consultaID}': ${error.message}, Stack: ${error.stack}`);
      return JSON.stringify(null);
    }
}

function updateConsulta(consultaData) {
  logActivity('INFO', `updateConsulta: Intentando actualizar consulta con ID: ${consultaData.consultaID}`);
  try {
    const config = SHEETS_CONFIG.CONSULTA;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    if (!sheet) {
      logActivity('ERROR', `updateConsulta: Hoja '${config.sheetName}' no encontrada.`);
      return { success: false, message: `Error: Hoja '${config.sheetName}' no encontrada.` };
    }

    if (!consultaData.consultaID) {
      return { success: false, message: 'Error: El ID de consulta es obligatorio para la actualización.' };
    }
    const validationError = validateConsultaFields(consultaData);
    if (validationError) {
      logActivity('ERROR', `updateConsulta: Error de validación: ${validationError}`);
      return { success: false, message: validationError };
    }

    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];
    const idColumnIndex = headers.indexOf('consultaID');

    if (idColumnIndex === -1) {
      logActivity('ERROR', 'updateConsulta: Columna \'consultaID\' no encontrada en la hoja.');
      return { success: false, message: 'Error interno: Columna de ID no encontrada.' };
    }

    let rowIndexToUpdate = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][idColumnIndex] === consultaData.consultaID) {
        rowIndexToUpdate = i;
        break;
      }
    }

    if (rowIndexToUpdate === -1) {
      logActivity('WARN', `updateConsulta: Consulta con ID ${consultaData.consultaID} no encontrada.`);
      return { success: false, message: `Consulta con ID ${consultaData.consultaID} no encontrada.` };
    }

    const updatedRow = [];
    const headerMapping = config.headerMap;
    for (const header of headers) {
      const jsKey = headerMapping[header];
      if (jsKey === 'consultaID') {
        updatedRow.push(values[rowIndexToUpdate][headers.indexOf(header)]);
      } else if (consultaData.hasOwnProperty(jsKey)) {
        updatedRow.push(consultaData[jsKey].trim());
      } else {
        updatedRow.push(values[rowIndexToUpdate][headers.indexOf(header)] || '');
      }
    }

    sheet.getRange(rowIndexToUpdate + 1, 1, 1, updatedRow.length).setValues([updatedRow]);
    logActivity('INFO', `updateConsulta: Consulta ${consultaData.consultaID} actualizada exitosamente.`);
    return { success: true, message: 'Consulta actualizada exitosamente.' };
  } catch (error) {
    logActivity('ERROR', `updateConsulta: Error al actualizar consulta: ${error.message}, Stack: ${error.stack}`);
    return { success: false, message: `Error al actualizar consulta: ${error.message}. Por favor, verifique los logs.` };
  }
}

function deleteConsulta(consultaID) {
  logActivity('INFO', `deleteConsulta: Intentando eliminar consulta con ID: ${consultaID}`);
  try {
    const config = SHEETS_CONFIG.CONSULTA;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    if (!sheet) {
      logActivity('ERROR', `deleteConsulta: Hoja '${config.sheetName}' no encontrada.`);
      return { success: false, message: `Error: Hoja '${config.sheetName}' no encontrada.` };
    }

    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];
    const idColumnIndex = headers.indexOf('consultaID');

    if (idColumnIndex === -1) {
      logActivity('ERROR', 'deleteConsulta: Columna \'consultaID\' no encontrada en la hoja.');
      return { success: false, message: 'Error interno: Columna de ID no encontrada.' };
    }

    let rowIndexToDelete = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][idColumnIndex] === consultaID) {
        rowIndexToDelete = i;
        break;
      }
    }

    if (rowIndexToDelete === -1) {
      logActivity('WARN', `deleteConsulta: Consulta con ID ${consultaID} no encontrada.`);
      return { success: false, message: `Consulta con ID ${consultaID} no encontrada.` };
    }

    sheet.deleteRow(rowIndexToDelete + 1);
    logActivity('INFO', `deleteConsulta: Consulta ${consultaID} eliminada exitosamente.`);
    return { success: true, message: 'Consulta eliminada exitosamente.' };
  } catch (error) {
    logActivity('ERROR', `deleteConsulta: Error al eliminar consulta: ${error.message}, Stack: ${error.stack}`);
    return { success: false, message: `Error al eliminar consulta: ${error.message}. Por favor, verifique los logs.` };
  }
}

/**OBSERVACIONES  */


function createObservacion(observacionData) {
  logActivity('INFO', `createObservacion: Intentando crear nueva observación con datos: ${JSON.stringify(observacionData)}`);
  try {
    const config = SHEETS_CONFIG.OBSERVACIONES;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    if (!sheet) {
      logActivity('ERROR', `createObservacion: Hoja '${config.sheetName}' no encontrada.`);
      return { success: false, message: `Error: Hoja '${config.sheetName}' no encontrada.` };
    }

    const validationError = validateObservacionFields(observacionData);
    if (validationError) {
      logActivity('ERROR', `createObservacion: Error de validación: ${validationError}`);
      return { success: false, message: validationError };
    }

    const newId = generateNextId('OBSERVACIONES', config.idPrefix);
    if (!newId) {
      logActivity('ERROR', 'createObservacion: No se pudo generar un ObservacionID único.');
      return { success: false, message: 'Error: No se pudo generar un ID único para la observación.' };
    }

    const headers = getSheetHeaders('OBSERVACIONES');
    const newRow = [];
    const observacionToSave = {
      observacionID: newId,
      programaID: observacionData.programaID.trim(),
      descripcion: observacionData.descripcion.trim(),
      fechaObservacion: observacionData.fechaObservacion.trim(), // DD/MM/AAAA del cliente
      fechaCorreccionEsperada: observacionData.fechaCorreccionEsperada.trim(), // YYYY-MM-DD del cliente
      fechaCorreccionRecibida: observacionData.fechaCorreccionRecibida ? observacionData.fechaCorreccionRecibida.trim() : '' 
    };

    for (const header of headers) {
      const jsKey = config.headerMap[header];
      if (jsKey !== 'estadoSemaforo') {
          newRow.push(observacionToSave[jsKey]);
      }
    }

    sheet.appendRow(newRow);
    logActivity('INFO', `createObservacion: Observación ${newId} creada exitosamente.`);
    return { success: true, message: 'Observación creada exitosamente.', observacion: JSON.stringify(observacionToSave) };
  } catch (error) {
    logActivity('ERROR', `createObservacion: Error al crear observación: ${error.message}, Stack: ${error.stack}`);
    return { success: false, message: `Error al crear observación: ${error.message}. Por favor, verifique los logs.` };
  }
}

function getObservacionById(observacionID) {
  logActivity('INFO', `getObservacionById: Buscando observación con ID: ${observacionID}`);
  try {
    const observaciones = JSON.parse(getSheetData('OBSERVACIONES'));
    const foundObservacion = observaciones.find(o => o.observacionID === observacionID);
    if (foundObservacion) {
      logActivity('INFO', `getObservacionById: Observación ${observacionID} encontrada.`);
      return JSON.stringify(foundObservacion);
    } else {
      logActivity('INFO', `getObservacionById: Observación ${observacionID} no encontrada.`);
      return JSON.stringify(null);
    }
  } catch (error) {
    logActivity('ERROR', `getObservacionById: Error al buscar observación por ID '${observacionID}': ${error.message}, Stack: ${error.stack}`);
    return JSON.stringify(null);
  }
}


function getObservacionesByProgramaId(programaID) {
  logActivity('INFO', `getObservacionesByProgramaId: Buscando observaciones para ProgramaID: ${programaID}`);
  try {
    const allObservaciones = JSON.parse(getSheetData('OBSERVACIONES'));
    const filteredObservaciones = allObservaciones.filter(obs => obs.programaID === programaID);
    logActivity('INFO', `getObservacionesByProgramaId: ${filteredObservaciones.length} observaciones encontradas para programa ${programaID}.`);
    return JSON.stringify(filteredObservaciones);
  } catch (error) {
    logActivity('ERROR', `getObservacionesByProgramaId: Error al obtener observaciones por ProgramaID '${programaID}': ${error.message}, Stack: ${error.stack}`);
    return JSON.stringify([]);
  }
}

function updateObservacion(observacionData) {
  logActivity('DEBUG', `Datos recibidos en updateObservacion: ${JSON.stringify(observacionData)}`);
  logActivity('INFO', `Intentando actualizar observación con ID: ${observacionData.observacionID}`);
  try {
    const config = SHEETS_CONFIG.OBSERVACIONES;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    if (!sheet) {
      logActivity('ERROR', `Hoja '${config.sheetName}' no encontrada.`);
      return { success: false, message: `Error: Hoja '${config.sheetName}' no encontrada.` };
    }


    if (!observacionData.observacionID) {
      logActivity('ERROR', 'El objeto recibido no contenía la propiedad "observacionID".');
      return { success: false, message: 'Error: Falta el ID de observación para la actualización.' };
    }
    const validationError = validateObservacionFields(observacionData);
    if (validationError) {
      logActivity('ERROR', `Error de validación: ${validationError}`);
      return { success: false, message: validationError };
    }

    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];
    
    const idSheetHeader = Object.keys(config.headerMap).find(key => config.headerMap[key] === 'observacionID');
    if (!idSheetHeader) {
        logActivity('ERROR', 'No se encontró la cabecera para "observacionID" en SHEETS_CONFIG.');
        return { success: false, message: 'Error de configuración. Avise al administrador.' };
    }
    const idColumnIndex = headers.indexOf(idSheetHeader);

    if (idColumnIndex === -1) {
      logActivity('ERROR', `Columna '${idSheetHeader}' no encontrada en la hoja.`);
      return { success: false, message: 'Error interno: Columna de ID no encontrada.' };
    }

    let rowIndexToUpdate = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][idColumnIndex] === observacionData.observacionID) {
        rowIndexToUpdate = i;
        break;
      }
    }

    if (rowIndexToUpdate === -1) {
      logActivity('WARN', `Observación con ID ${observacionData.observacionID} no encontrada.`);
      return { success: false, message: `Observación con ID ${observacionData.observacionID} no encontrada.` };
    }

    const updatedRow = [];
    const headerMapping = config.headerMap;
    for (const header of headers) {
      const jsKey = headerMapping[header];
      if (jsKey === 'observacionID') {
        updatedRow.push(values[rowIndexToUpdate][headers.indexOf(header)]);
      } else if (jsKey === 'estadoSemaforo') {
          // No añadir al row de la hoja
      }
      else if (observacionData.hasOwnProperty(jsKey)) {
        updatedRow.push(observacionData[jsKey].trim());
      } else {
        updatedRow.push(values[rowIndexToUpdate][headers.indexOf(header)] || '');
      }
    }

    sheet.getRange(rowIndexToUpdate + 1, 1, 1, updatedRow.length).setValues([updatedRow]);
    logActivity('INFO', `Observación ${observacionData.observacionID} actualizada exitosamente.`);
    return { success: true, message: 'Observación actualizada exitosamente.' };
  } catch (error) {
    logActivity('ERROR', `Error al actualizar observación: ${error.message}, Stack: ${error.stack}`);
    return { success: false, message: `Error al actualizar observación: ${error.message}. Por favor, verifique los logs.` };
  }
}

function deleteObservacion(observacionID) {
  logActivity('INFO', `deleteObservacion: Intentando eliminar observación con ID: ${observacionID}`);
  try {
    const config = SHEETS_CONFIG.OBSERVACIONES;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    if (!sheet) {
      logActivity('ERROR', `deleteObservacion: Hoja '${config.sheetName}' no encontrada.`);
      return { success: false, message: `Error: Hoja '${config.sheetName}' no encontrada.` };
    }
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0];
    const idSheetHeader = Object.keys(config.headerMap).find(key => config.headerMap[key] === 'observacionID');
    if (!idSheetHeader) {
        logActivity('ERROR', 'deleteObservacion: No se encontró la cabecera para "observacionID" en SHEETS_CONFIG.');
        return { success: false, message: 'Error de configuración. Avise al administrador.' };
    }
    const idColumnIndex = headers.indexOf(idSheetHeader);

    if (idColumnIndex === -1) {
      logActivity('ERROR', `deleteObservacion: Columna '${idSheetHeader}' no encontrada en la hoja.`);
      return { success: false, message: 'Error interno: Columna de ID no encontrada.' };
    }

    let rowIndexToDelete = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][idColumnIndex] === observacionID) {
        rowIndexToDelete = i;
        break;
      }
    }

    if (rowIndexToDelete === -1) {
      logActivity('WARN', `deleteObservacion: Observación con ID ${observacionID} no encontrada.`);
      return { success: false, message: `Observación con ID ${observacionID} no encontrada.` };
    }

    sheet.deleteRow(rowIndexToDelete + 1);
    logActivity('INFO', `deleteObservacion: Observación ${observacionID} eliminada exitosamente.`);
    return { success: true, message: 'Observación eliminada exitosamente.' };
  } catch (error) {
    logActivity('ERROR', `deleteObservacion: Error al eliminar observación: ${error.message}, Stack: ${error.stack}`);
    return { success: false, message: `Error al eliminar observación: ${error.message}. Por favor, verifique los logs.` };
  }
}

function createNotificacion(notificacionData) {
  logActivity('INFO', `createNotificacion: Intentando crear nueva notificación con datos: ${JSON.stringify(notificacionData)}`);
  try {
    const config = SHEETS_CONFIG.NOTIFICACION;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    if (!sheet) {
      logActivity('ERROR', `createNotificacion: Hoja '${config.sheetName}' no encontrada.`);
      return { success: false, message: `Error: Hoja '${config.sheetName}' no encontrada.` };
    }

   if (!notificacionData.programaID || !notificacionData.coordinadorID || !notificacionData.mensaje) {
        return { success: false, message: 'programaID, coordinadorID y Mensaje son obligatorios para la notificación.' };
    }

    const newId = generateNextId('NOTIFICACION', config.idPrefix);
    if (!newId) {
      logActivity('ERROR', 'createNotificacion: No se pudo generar un NotificacionID único.');
      return { success: false, message: 'Error: No se pudo generar un ID único para la notificación.' };
    }

    const headers = getSheetHeaders('NOTIFICACION');
    const newRow = [];
    const now = new Date();
    const formattedDate = Utilities.formatDate(now, SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), 'yyyy-MM-dd HH:mm:ss');

    const notificacionToSave = {
      notificacionID: newId,
      observacionID: notificacionData.observacionID || '', 
      programaID: notificacionData.programaID.trim(),
      coordinadorID: notificacionData.coordinadorID.trim(),
      tipo: notificacionData.tipo || '', 
      mensaje: notificacionData.mensaje.trim(),
      fechaEnvio: formattedDate
    };

    for (const header of headers) {
      const jsKey = config.headerMap[header];
      newRow.push(notificacionToSave[jsKey]);
    }

    sheet.appendRow(newRow);
    logActivity('INFO', `createNotificacion: Notificación ${newId} creada exitosamente.`);
    return { success: true, message: 'Notificación creada exitosamente.', notificacion: JSON.stringify(notificacionToSave) };
  } catch (error) {
    logActivity('ERROR', `createNotificacion: Error al crear notificación: ${error.message}, Stack: ${error.stack}`);
    return { success: false, message: `Error al crear notificación: ${error.message}. Por favor, verifique los logs.` };
  }
}

/** FUNCIONES PARA TRIGGERS DE NOTIFICACIONES */
/** Para activar el "Reloj" que ejecute esto automáticamente:

En el editor de GAS, ve al reloj en el menú lateral izquierdo (Activadores / Triggers).

Haz clic en el botón azul "Añadir activador".

Configura así:

Función a ejecutar: checkAndSendSemaforoNotifications

Fuente del evento: Según tiempo (Time-driven)

Tipo de activador: Temporizador por días (Day timer)

Hora del día: Escoge una hora lógica (ej: 8am a 9am). */

function checkAndSendSemaforoNotifications() {
  logActivity('INFO', 'checkAndSendSemaforoNotifications: Iniciando Motor Optimizado.');
  
  // 1. LECTURA ÚNICA (Evita el colapso de rendimiento)
  const allProgramas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));
  const allObservaciones = JSON.parse(getSheetData('OBSERVACIONES'));
  const allCoordinadores = JSON.parse(getSheetData('COORDINADOR')); 
  const allNotificaciones = JSON.parse(getSheetData('NOTIFICACION')); // Leemos aquí UNA vez
  
  // 2. MAPEOS PARA ACCESO RÁPIDO
  const coordinadoresMap = allCoordinadores.reduce((acc, coord) => {
    acc[coord.coordinadorID] = coord;
    return acc;
  }, {});

  const programasMap = allProgramas.reduce((acc, prog) => {
    acc[prog.programaID] = prog;
    return acc;
  }, {});

  // 3. AGRUPADOR DE ALERTAS (Para evitar spam)
  // Estructura: { "COO-001": [ {obs1}, {obs2} ], "COO-002": [ {obs3} ] }
  const alertasPorCoordinador = {};
  
  // Definimos qué es "reciente" (ej: 3 días)
  const diasRecientes = 3;
  const ahora = new Date();
  const umbralTiempo = ahora.getTime() - (diasRecientes * 24 * 60 * 60 * 1000);

  // 4. EVALUAR OBSERVACIONES EN MEMORIA
  const activeObservations = allObservaciones.filter(obs => obs.estadoSemaforo === 'Proximo_a_vencer' || obs.estadoSemaforo === 'Vencido');
  
  for (const obs of activeObservations) {
    const programa = programasMap[obs.programaID];
    if (!programa) continue;

    const notificationType = obs.estadoSemaforo === 'Vencido' ? 'Alerta_Vencido' : 'Recordatorio_Proximo_a_vencer';
    
    // BARRERA ANTI-SPAM (Búsqueda ultra rápida en memoria)
    const fueNotificadoRecientemente = allNotificaciones.some(notif => {
       if (notif.observacionID === obs.observacionID && notif.tipo === notificationType) {
          const fechaEnvio = new Date(notif.fechaEnvio).getTime();
          return fechaEnvio >= umbralTiempo;
       }
       return false;
    });

    if (!fueNotificadoRecientemente) {
       // Si amerita correo, lo agrupamos en la "bandeja" de su coordinador
       const coordID = programa.coordinadorID;
       if (!alertasPorCoordinador[coordID]) {
         alertasPorCoordinador[coordID] = [];
       }
       
       alertasPorCoordinador[coordID].push({
         observacionID: obs.observacionID,
         programaID: programa.programaID,
         nombrePrograma: programa.nombrePrograma,
         fechaLimite: obs.fechaCorreccionEsperada,
         tipoSemaforo: obs.estadoSemaforo,
         tipoNotificacion: notificationType
       });
    }
  }

  // 5. ENVIAR CORREOS CONSOLIDADOS Y REGISTRAR AUDITORÍA
  let correosEnviados = 0;
  let notificacionesRegistradas = 0;

  for (const coordID in alertasPorCoordinador) {
    const coordinador = coordinadoresMap[coordID];
    const alertas = alertasPorCoordinador[coordID];
    
    if (coordinador && coordinador.correoInstitucional) {
      
      // Armar el cuerpo del correo consolidado (HTML)
      let cuerpoCorreo = `<h3>Notificación de Seguimiento de Programas de Posgrado</h3>`;
      cuerpoCorreo += `<p>Estimado/a ${coordinador.nombreCompleto},</p>`;
      cuerpoCorreo += `<p>El sistema GESTIONUP ha detectado las siguientes observaciones que requieren su atención:</p><ul>`;
      
      for (const alerta of alertas) {
         const urgencia = alerta.tipoSemaforo === 'Vencido' ? '🔴 <b>VENCIDO</b>' : '🟡 <b>Próximo a Vencer</b>';
         cuerpoCorreo += `<li>${urgencia} - <b>${alerta.nombrePrograma}</b> (Límite: ${alerta.fechaLimite})</li>`;
         
         notificacionesRegistradas++;
      
      cuerpoCorreo += `</ul><p>Por favor, ingrese al sistema para regularizar estos procesos.</p>`;

      // Enviar el correo masivo
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
      }
    }
  }

  logActivity('INFO', `Semaforo Finalizado. ${correosEnviados} correos enviados. ${notificacionesRegistradas} registros creados.`);
}

// Puedes borrar por completo la antigua función wasNotificationSentRecently, ya no la necesitamos.

/** DASHBOARD */

/**
 * Obtiene y procesa datos de múltiples hojas de cálculo de manera optimizada para minimizar llamadas a la API.
 * @param {Array<string>} sheetKeys - Un array de claves de SHEETS_CONFIG.
 * @returns {Object} Un objeto con los datos de cada hoja, ej: { PROGRAMAS: [...], CONSULTAS: [...] }.
 */
function getAllDataForDashboard(sheetKeys) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const allData = {};

    sheetKeys.forEach(sheetKey => {
      const config = SHEETS_CONFIG[sheetKey];
      if (!config) {
        logActivity('WARN', `getAllDataForDashboard: Configuración no encontrada para la hoja: ${sheetKey}`);
        allData[sheetKey] = [];
        return; // Continúa con la siguiente clave
      }
      const sheet = ss.getSheetByName(config.sheetName);
      if (!sheet) {
        logActivity('WARN', `getAllDataForDashboard: Hoja '${config.sheetName}' no encontrada.`);
        allData[sheetKey] = [];
        return; // Continúa con la siguiente clave
      }

      const dataRange = sheet.getDataRange();
      const values = dataRange.getDisplayValues();

      if (values.length < 2) {
        allData[sheetKey] = [];
        return; // Continúa con la siguiente clave
      }

      const headers = values[0];
      const data = [];
      const headerToJsKeyMap = new Map();
      for (const [sheetHeader, jsKey] of Object.entries(config.headerMap)) {
        const headerIndex = headers.indexOf(sheetHeader);
        if (headerIndex !== -1) {
          headerToJsKeyMap.set(headerIndex, jsKey);
        } else {
          logActivity('WARN', `getAllDataForDashboard: Cabecera '${sheetHeader}' no encontrada en la hoja '${config.sheetName}'.`);
        }
      }

      for (let i = 1; i < values.length; i++) {
        const row = values[i];
        if (row.every(cell => cell === '')) continue;
        const rowObject = {};
        headerToJsKeyMap.forEach((jsKey, headerIndex) => {
          rowObject[jsKey] = row[headerIndex] !== undefined ? row[headerIndex] : '';
        });

        if (sheetKey === 'OBSERVACIONES') {
          rowObject.estadoSemaforo = calculateSemaforoState(rowObject.fechaCorreccionEsperada, rowObject.fechaCorreccionRecibida);
        }
        data.push(rowObject);
      }
      allData[sheetKey] = data;
    });
    return allData;
  } catch (error) {
    logActivity('ERROR', `getAllDataForDashboard: Error general - ${error.message}, Stack: ${error.stack}`);
    // En caso de un error grave, devuelve objetos vacíos para evitar que el resto de la aplicación falle.
    const emptyData = {};
    sheetKeys.forEach(key => emptyData[key] = []);
    return emptyData;
  }
}

/**
* Calcula los KPIs globales leyendo la BDD y formateando los costos numéricos
*/
function getKPIsGlobales(programas, consultas, observaciones, cohortes, extensiones) {
  try {
    // ── 1. PROGRAMAS Y COSTOS ──────────────────────────────────────────────
    const totalProgramas = programas.length;
    const totalProgramasVigentes = programas.filter(p => p.estadoPropuesta === 'Vigente').length;
    const totalProgramasEnRevision = programas.filter(p => p.estadoPropuesta !== 'Vigente').length;

    const tasaExitoProgramas = totalProgramas > 0
      ? ((totalProgramasVigentes / totalProgramas) * 100).toFixed(1)
      : '0.0';

    // Limpieza y cálculo de Costo Promedio (soporta textos como "2500", "\$3,500", etc.)
    const costosNumericos = programas
      .map(p => p.costoAproximado)
      .filter(costo => costo !== undefined && costo !== null && String(costo).trim() !== '')
      .map(costo => parseFloat(String(costo).replace(/[^0-9.-]+/g, "")))
      .filter(costo => !isNaN(costo));

    const costoPromedio = costosNumericos.length > 0
      ? (costosNumericos.reduce((sum, val) => sum + val, 0) / costosNumericos.length).toFixed(2)
      : "0.00";

    // ── 2. COHORTES ────────────────────────────────────────────────────────
    const ESTADOS_ACTIVOS = ['INSCRIPCIONES', 'MATRICULACIÓN', 'EN CLASES', 'TITULACIÓN', 'INSCRIPCION_DESIERTA', 'MATRICULA_DESIERTA'];
    const totalCohortesActivas = cohortes.filter(c => ESTADOS_ACTIVOS.includes(c.estadoCohorte)).length;
    const cohortesFinalizadas = cohortes.filter(c => c.estadoCohorte === 'FINALIZADA').length;
    const enClases = cohortes.filter(c => c.estadoCohorte === 'EN CLASES').length;

    // ── 3. CONSULTAS ───────────────────────────────────────────────────────
    const totalConsultas = consultas.length;
    const totalConsultasAgendadas = consultas.filter(c =>
      c.agendadaPreviamente && c.agendadaPreviamente.toString().trim().toLowerCase() === 'si'
    ).length;

    let promedioDuracionConsultas = 0;
    try {
      const conHoras = consultas.filter(c => c.horaVisita && c.horaFin && c.horaVisita.includes(':') && c.horaFin.includes(':'));
      if (conHoras.length > 0) {
        const totalMin = conHoras.reduce((sum, c) => {
          const [h1, m1] = c.horaVisita.split(':').map(Number);
          const [h2, m2] = c.horaFin.split(':').map(Number);
          const diff = (h2 * 60 + m2) - (h1 * 60 + m1);
          return sum + (diff > 0 ? diff : 0);
        }, 0);
        promedioDuracionConsultas = Math.round(totalMin / conHoras.length);
      }
    } catch(e) { promedioDuracionConsultas = 0; }

    // ── 4. OBSERVACIONES Y SEMÁFORO ────────────────────────────────────────
    const totalObsVencidas = observaciones.filter(o => o.estadoSemaforo === 'Vencido').length;
    const totalObsPendientes = observaciones.filter(o => !o.fechaCorreccionRecibida || o.fechaCorreccionRecibida.trim() === '').length;
    const porcentajeRiesgo = observaciones.length > 0
      ? ((totalObsVencidas / observaciones.length) * 100).toFixed(1)
      : '0.0';

    let facultadCritica = 'N/A';
    try {
      const mapFac = programas.reduce((m, p) => { m[p.programaID] = p.facultad; return m; }, {});
      const facCount = {};
      observaciones.filter(o => o.estadoSemaforo === 'Vencido').forEach(o => {
        const f = mapFac[o.programaID] || 'Sin Facultad';
        facCount[f] = (facCount[f] || 0) + 1;
      });
      let max = 0;
      for (const [f, n] of Object.entries(facCount)) {
        if (n > max) { max = n; facultadCritica = `${f} (${n})`; }
      }
    } catch(e) {}

    let promedioDiasCorreccion = 0;
    try { promedioDiasCorreccion = calcularPromedioDiasCorreccion(observaciones); } catch(e) {}

    let promedioTiempoAprobacion = 0;
    try { promedioTiempoAprobacion = calcularPromedioTiempoAprobacion(programas); } catch(e) {}

    return {
      totalProgramas,
      totalProgramasVigentes,
      totalProgramasEnRevision,
      tasaExitoProgramas,
      costoPromedio,
      promedioTiempoAprobacion,
      totalCohortesActivas,
      cohortesFinalizadas,
      enClases,
      totalConsultas,
      totalConsultasAgendadas,
      promedioDuracionConsultas,
      totalObsVencidas,
      totalObsPendientes,
      porcentajeRiesgo,
      facultadCritica,
      promedioDiasCorreccion,
      totalObservacionesVencidas: totalObsVencidas,
      totalObservacionesPendientes: totalObsPendientes,
      promedioDuracionConsulta: promedioDuracionConsultas
    };

  } catch (error) {
    logActivity('ERROR', `getKPIsGlobales: Error general: ${error.message}`);
    return {
      totalProgramas: 0, totalProgramasVigentes: 0, totalProgramasEnRevision: 0,
      tasaExitoProgramas: '0.0', costoPromedio: '0.00', promedioTiempoAprobacion: 0,
      totalCohortesActivas: 0, cohortesFinalizadas: 0, enClases: 0,
      totalConsultas: 0, totalConsultasAgendadas: 0, promedioDuracionConsultas: 0,
      totalObsVencidas: 0, totalObsPendientes: 0, porcentajeRiesgo: '0.0',
      facultadCritica: 'N/A', promedioDiasCorreccion: 0,
      totalObservacionesVencidas: 0, totalObservacionesPendientes: 0,
      promedioDuracionConsulta: 0
    };
  }
}

/**
 * Calcula KPIs fijos para la vista de Programas de Posgrado.
 * @returns {Object} Un objeto con el total de programas vigentes y el costo promedio.
 */
function getKPIsProgramasPosgrado() {
  try {
    logActivity('INFO', 'getKPIsProgramasPosgrado: Obteniendo KPIs fijos de Programas de Posgrado.');
    const programas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));

    if (!programas || programas.length === 0) {
      return { totalVigentes: 0, costoPromedio: 0 };
    }

    // 1. Total de Programas Vigentes
    const programasVigentes = programas.filter(p => p.estadoPropuesta === 'Vigente');
    const totalVigentes = programasVigentes.length;

    // 2. Media del costo
    const costosNumericos = programas
      .map(p => p.costoAproximado)
      .filter(costo => costo && costo.trim() !== '') // Filtrar celdas vacías
      .map(costo => {
        // Limpiar la cadena de texto para convertirla a número
        const costoLimpio = costo.toString().replace(/[^0-9.-]+/g, "");
        return parseFloat(costoLimpio);
      })
      .filter(costo => !isNaN(costo)); // Filtrar valores que no se pudieron convertir a número

    const costoPromedio = costosNumericos.length > 0
      ? (costosNumericos.reduce((sum, current) => sum + current, 0) / costosNumericos.length).toFixed(2)
      : 0;

    logActivity('INFO', `getKPIsProgramasPosgrado: KPIs calculados. Vigentes: ${totalVigentes}, Costo Promedio: ${costoPromedio}`);
    return { totalVigentes: totalVigentes, costoPromedio: costoPromedio };

  } catch (error) {
    logActivity('ERROR', `getKPIsProgramasPosgrado: ${error.message}`);
    return { totalVigentes: 0, costoPromedio: 0 };
  }
}

function getKPIsObservacionesV2() {
  try {
    logActivity('INFO', 'getKPIsObservacionesV2: Obteniendo KPIs avanzados de Observaciones.');
    const observaciones = JSON.parse(getSheetData('OBSERVACIONES'));
    const programas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));

    if (!observaciones || !programas) {
      logActivity('ERROR', 'getKPIsObservacionesV2: No se pudieron obtener los datos de OBSERVACIONES o PROGRAMAPOSGRADO.');
      return { totalPendientes: 0, totalVencidas: 0, porcentajeRiesgo: 0, facultadCritica: 'N/A' };
    }

    // Crear un mapa de programas para obtener la facultad de cada observación
    const programasMap = programas.reduce((map, prog) => {
      map[prog.programaID] = prog.facultad;
      return map;
    }, {});

    const vencidasPorFacultad = {};

    const totalVencidas = observaciones.filter(obs => {
      if (obs.estadoSemaforo === 'Vencido') {
        const facultad = programasMap[obs.programaID] || 'Sin Facultad';
        vencidasPorFacultad[facultad] = (vencidasPorFacultad[facultad] || 0) + 1;
        return true;
      }
      return false;
    }).length;

    const totalPendientes = observaciones.filter(obs => !obs.fechaCorreccionRecibida).length;

    const totalObservaciones = observaciones.length;
    const porcentajeRiesgo = totalObservaciones > 0 ? ((totalVencidas / totalObservaciones) * 100).toFixed(1) : 0;

    // Encontrar la facultad con más observaciones vencidas
    let facultadCritica = 'N/A';
    let maxVencidas = 0;
    for (const [facultad, count] of Object.entries(vencidasPorFacultad)) {
      if (count > maxVencidas) {
        maxVencidas = count;
        facultadCritica = `${facultad} (${count})`;
      }
    }

    logActivity('INFO', `getKPIsObservacionesV2: KPIs calculados. Vencidas: ${totalVencidas}, Riesgo: ${porcentajeRiesgo}%, Crítica: ${facultadCritica}`);
    return { totalPendientes, totalVencidas, porcentajeRiesgo, facultadCritica };

  } catch (error) {
    logActivity('ERROR', `getKPIsObservacionesV2: ${error.message}`);
    return { totalPendientes: 0, totalVencidas: 0, porcentajeRiesgo: 0, facultadCritica: 'N/A' };
  }
}

/**
 * Calcula KPIs estratégicos para la vista de Visión General.
 * @returns {Object} Un objeto con los KPIs de salud y eficiencia del portafolio.
 */
function getKPIsVisionGeneral() {
  try {
    logActivity('INFO', 'getKPIsVisionGeneral: Obteniendo KPIs estratégicos de Visión General.');
    const programas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));
    Logger.log(`DEBUG getKPIsVisionGeneral: Total de programas leídos: ${programas.length}`);
    Logger.log(`DEBUG getKPIsVisionGeneral: Muestra del primer programa: ${JSON.stringify(programas[0])}`);
    if (!programas || programas.length === 0) {
      return { totalVigentes: 0, totalEnRevision: 0, tasaExito: 0 };
    }

    const totalVigentes = programas.filter(p => p.estadoPropuesta === 'Vigente').length;
    const totalEnRevision = programas.filter(p => p.estadoPropuesta !== 'Vigente').length;
    const totalProgramas = programas.length;

    const tasaExito = totalProgramas > 0 ? ((totalVigentes / totalProgramas) * 100).toFixed(1) : 0;

    logActivity('INFO', `getKPIsVisionGeneral: Vigentes: ${totalVigentes}, En Revisión: ${totalEnRevision}, Tasa Éxito: ${tasaExito}%`);
    return { totalVigentes, totalEnRevision, tasaExito };

  } catch (error) {
    logActivity('ERROR', `getKPIsVisionGeneral: ${error.message}`);
    return { totalVigentes: 0, totalEnRevision: 0, tasaExito: 0 };
  }
}

/**
* Despachador principal para el Dashboard con KPIs y filtros dinámicos por facultad
*/
function getDashboardData(filtros) {
  try {
    filtros = filtros || {};
    logActivity('INFO', `getDashboardData: Iniciando con filtros: ${JSON.stringify(filtros)}`);

    const requiredSheets = ['PROGRAMAPOSGRADO', 'CONSULTA', 'OBSERVACIONES', 'COHORTE', 'EXTENSIONES_FECHAS', 'CONFIG', 'USUARIO'];
    const allData = getAllDataForDashboard(requiredSheets);

    const programas = allData['PROGRAMAPOSGRADO'] || [];
    const consultas = allData['CONSULTA'] || [];
    const observaciones = allData['OBSERVACIONES'] || [];
    const cohortes = allData['COHORTE'] || [];
    const extensiones = allData['EXTENSIONES_FECHAS'] || [];
    const usuarios = allData['USUARIO'] || [];

    const usuarioMap = usuarios.reduce((m, u) => { m[u.usuarioID] = u; return m; }, {});
    const programaMap = programas.reduce((m, p) => { m[p.programaID] = p; return m; }, {});
    const cohorteMap = cohortes.reduce((m, c) => { m[c.cohorteID] = c; return m; }, {});

    let programasFiltrados = programas;
    let cohortesFiltradas = cohortes;
    let consultasFiltradas = consultas;
    let extensionesFiltradas = extensiones;

    // ── 1. FILTRADO POR FACULTAD ──────────────────────────────────────────────
    if (filtros.facultad && filtros.facultad.trim() !== '') {
      const facNorm = filtros.facultad.trim().toLowerCase();

      programasFiltrados = programasFiltrados.filter(p => p.facultad && p.facultad.trim().toLowerCase().includes(facNorm));

      cohortesFiltradas = cohortesFiltradas.filter(c => {
        const prog = programaMap[c.programaID];
        return prog && prog.facultad && prog.facultad.trim().toLowerCase().includes(facNorm);
      });

      consultasFiltradas = consultasFiltradas.filter(c => {
        const facReunion = c.facultadReunion ? c.facultadReunion.trim().toLowerCase() : '';
        const usr = usuarioMap[c.usuarioID];
        const facUsr = (usr && usr.facultad) ? usr.facultad.trim().toLowerCase() : '';
        return facReunion.includes(facNorm) || facUsr.includes(facNorm);
      });

      extensionesFiltradas = extensionesFiltradas.filter(e => {
        const coh = cohorteMap[e.cohorteID];
        if (!coh) return false;
        const prog = programaMap[coh.programaID];
        return prog && prog.facultad && prog.facultad.trim().toLowerCase().includes(facNorm);
      });
    }

    // ── 2. FILTRADO POR PERIODO ACADÉMICO ──────────────────────────────────────
    if (filtros.periodo && filtros.periodo.trim() !== '') {
      const perNorm = filtros.periodo.trim().toLowerCase();

      cohortesFiltradas = cohortesFiltradas.filter(c =>
        c.periodoAcademico && c.periodoAcademico.trim().toLowerCase() === perNorm
      );

      const programaIDsEnPeriodo = new Set(cohortesFiltradas.map(c => c.programaID));
      programasFiltrados = programasFiltrados.filter(p => programaIDsEnPeriodo.has(p.programaID));
    }

    // ── 3. FILTRADO POR FASE DE COHORTE ────────────────────────────────────────
    if (filtros.estadoCohorte && filtros.estadoCohorte.trim() !== '') {
      const estadoNorm = filtros.estadoCohorte.trim().toLowerCase();
      cohortesFiltradas = cohortesFiltradas.filter(c =>
        c.estadoCohorte && c.estadoCohorte.trim().toLowerCase() === estadoNorm
      );
    }

    // ── 4. FILTRADO POR OBSERVACIONES Y SEMÁFORO ────────────────────────────────
    const programasFiltradosIds = new Set(programasFiltrados.map(p => p.programaID));
    let observacionesFiltradas = observaciones.filter(o => programasFiltradosIds.has(o.programaID));

    if (filtros.semaforo && filtros.semaforo.trim() !== '') {
      const semNorm = filtros.semaforo.trim().toLowerCase();
      observacionesFiltradas = observacionesFiltradas.filter(o => {
        const estado = o.estadoSemaforo ? o.estadoSemaforo.trim().toLowerCase() : '';
        return estado === semNorm;
      });
    }

    // ── 5. KPIS Y RECALCULOS DINÁMICOS POR FACULTAD ────────────────────────────
    const kpisGlobales = getKPIsGlobales(programasFiltrados, consultasFiltradas, observacionesFiltradas, cohortesFiltradas, extensionesFiltradas);
    kpisGlobales.totalUsuarios = usuarios.length;

    // Conteo exacto de programas vigentes para el subconjunto filtrado
    kpisGlobales.totalVigentesExacto = programasFiltrados.filter(p => p.estadoPropuesta === 'Vigente').length;

    // Costo promedio numérico sobre subconjunto
    const costosFiltrados = programasFiltrados
      .map(p => p.costoAproximado)
      .filter(costo => costo !== undefined && costo !== null && String(costo).trim() !== '')
      .map(costo => parseFloat(String(costo).replace(/[^0-9.-]+/g, "")))
      .filter(costo => !isNaN(costo));

    kpisGlobales.costoPromedio = costosFiltrados.length > 0
      ? (costosFiltrados.reduce((sum, val) => sum + val, 0) / costosFiltrados.length).toFixed(2)
      : "0.00";

    // ── 6. LISTAS Y TABLAS ──────────────────────────────────────────────────────
    const facultades = [...new Set(programas.map(p => p.facultad).filter(Boolean))].sort();
    const estados = [...new Set(programas.map(p => p.estadoPropuesta).filter(Boolean))].sort();
    const periodosUnicos = [...new Set(cohortes.map(c => c.periodoAcademico).filter(Boolean))].sort();

    const charts = {
      consultasPorMedio: prepararDatosParaGrafico(consultasFiltradas, 'medioAtencion'),
      programasPorEstado: prepararDatosParaGrafico(programasFiltrados, 'estadoPropuesta'),
      programasPorFacultad: prepararDatosParaGrafico(programasFiltrados, 'facultad'),
      programasPorModalidad: prepararDatosParaGrafico(programasFiltrados, 'modalidad'),
      cohortesPorFase: prepararDatosParaGrafico(cohortesFiltradas, 'estadoCohorte'),
      tiempoPromedioPorFaseReal: calcularTiempoPromedioPorFaseReal(cohortesFiltradas),
      extensionesPorMes: prepararExtensionesPorMes(extensionesFiltradas),
    };

    const tables = {
      programasConObs: prepararProgramasConObservaciones(observacionesFiltradas, programas),
      cohortePorEstado: prepararCohortePorEstado(cohortesFiltradas, programasFiltrados, filtros.estadoCohorte),
      cohortesPorPrograma: prepararCohortesPorPrograma(cohortesFiltradas, programasFiltrados),
      extensionesRecientes: prepararExtensionesRecientes(extensionesFiltradas, cohortesFiltradas, programasFiltrados),
    };

    return {
      error: null,
      filters: { facultades, estados, periodosUnicos },
      kpis: kpisGlobales,
      charts,
      tables,
    };
  } catch (error) {
    logActivity('ERROR', `getDashboardData: Error general - ${error.message}`);
    return { error: error.message };
  }
}



// --- FUNCIONES BASE ---

function getFacultades() {
  // CORRECCIÓN P1-03: Se corrigió la auto-referencia (c.tipoLista || c.tipoLista) que
  // no hacía nada. Ahora el filtro es genuinamente case-insensitive.
  try {
    const rawData = getSheetData('CONFIG');
    const data = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

    const facultades = [
      ...new Set(
        data
          .filter(c => c.tipoLista && c.tipoLista.toLowerCase().trim() === 'facultades')
          .map(c => c.valorItem ? c.valorItem.trim() : '')
          .filter(v => v !== '')
      )
    ].sort();

    logActivity('INFO', `getFacultades: ${facultades.length} facultades recuperadas.`);
    return facultades;

  } catch (error) {
    logActivity('ERROR', `getFacultades: ${error.message}`);
    return [];
  }
}

function getDashboardDataV2(filtros) {
  try {
    const data = getAllDataForDashboard(['PROGRAMAPOSGRADO', 'OBSERVACIONES', 'CONFIG']);
    let programas = data.PROGRAMAPOSGRADO || [];
    
    // 1. Filtrar por Facultad
    if (filtros && filtros.facultad && filtros.facultad !== "") {
      programas = programas.filter(p => p.facultad === filtros.facultad);
    }
    
    // 2. Diccionario de Nombres (ProgramaID -> NombrePrograma)
    const progMap = new Map();
    programas.forEach(p => {
      progMap.set(p.programaID, p.nombrePrograma);
    });
    
    // 3. Obtener Observaciones de los programas filtrados
    const progIds = new Set(programas.map(p => p.programaID));
    const obs = (data.OBSERVACIONES || []).filter(o => progIds.has(o.programaID));
    
    // 4. Procesar Semáforo en vivo
    const hoy = new Date();
    const obsProcesadas = obs.map(o => {
      const fechaEsp = new Date(o.fechaCorreccionEsperada);
      const estaRecibida = o.fechaCorreccionRecibida && o.fechaCorreccionRecibida.toString().trim() !== "";
      
      let estado = 'al-dia';
      if (!estaRecibida && fechaEsp < hoy) {
        estado = 'vencida';
      }
      
      return {
        programaID: o.programaID,
        nombre: progMap.get(o.programaID) || "Programa no encontrado",
        descripcion: o.descripcion || "Sin descripción",
        estado: estado
      };
    });

    // 5. Empaquetar y enviar al Frontend
    return {
      success: true,
      data: {
        contexto: (filtros && filtros.facultad) ? filtros.facultad : "Todas las Facultades",
        kpis: {
          totalVigentes: programas.filter(p => p.estadoPropuesta === 'Vigente').length,
          totalPendientes: obsProcesadas.filter(o => o.estado !== 'vencida').length,
          totalVencidas: obsProcesadas.filter(o => o.estado === 'vencida').length
        },
        tables: {
          programasConObs: obsProcesadas
        }
      }
    };
  } catch (e) {
    Logger.log("Error crítico en getDashboardDataV2: " + e.toString());
    return { success: false, message: e.toString() };
  }
}

// --- FUNCIONES AUXILIARES PARA getDashboardData ---

function prepararDatosParaGrafico(data, key) {
  if (!data || data.length === 0) return [['Elemento', 'Cantidad']];
  const counts = {};
  data.forEach(item => {
    if (item[key]) {
      counts[item[key]] = (counts[item[key]] || 0) + 1;
    }
  });
  return [['Elemento', 'Cantidad'], ...Object.entries(counts).sort((a, b) => b[1] - a[1])];
} 

function agruparYContar(data, key, labelKey, labelValue) {
  const counts = {};
  data.forEach(item => {
    const val = item[key] || 'Sin Dato';
    counts[val] = (counts[val] || 0) + 1;
  });
  const result = [[labelKey, labelValue]];
  for (const [key, value] of Object.entries(counts)) {
    result.push([key, value]);
  }
  return result;
}

function calcularPromedioDuracion(consultas) {
  if (!consultas || consultas.length === 0) return 0;
  const consultasConDuracion = consultas.filter(c => c.horaVisita && c.horaFin);
  if (consultasConDuracion.length === 0) return 0;

  const totalDuracion = consultasConDuracion.reduce((sum, c) => {
    const [h1, m1] = c.horaVisita.split(':').map(Number);
    const [h2, m2] = c.horaFin.split(':').map(Number);
    return sum + (h2 * 60 + m2) - (h1 * 60 + m1);
  }, 0);

  return Math.round(totalDuracion / consultasConDuracion.length);
}

function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
}

function calcularPromedioDiasCorreccion(observaciones) {
  if (!observaciones || observaciones.length === 0) return 0;
  const observacionesCorregidas = observaciones.filter(o => o.fechaCorreccionRecibida);
  if (observacionesCorregidas.length === 0) return 0;

  const totalDias = observacionesCorregidas.reduce((sum, o) => {
    const fechaEsperada = parseDateYYYYMMDD(o.fechaCorreccionEsperada);
    const fechaRecibida = parseDateYYYYMMDD(o.fechaCorreccionRecibida);
    if (fechaEsperada && fechaRecibida) {
      return sum + Math.ceil((fechaRecibida - fechaEsperada) / (1000 * 60 * 60 * 24));
    }
    return sum;
  }, 0);

  return Math.round(totalDias / observacionesCorregidas.length);
}


/**
 * Calcula el promedio de días que tarda un programa en ser aprobado por ambas instancias (HCU y CES).
 * @param {Array<Object>} programas - El array de todos los programas.
 * @returns {number} El promedio de días entre las aprobaciones, o 0 si no hay datos.
 */
function calcularPromedioTiempoAprobacion(programas) {
  try {
    logActivity('INFO', 'calcularPromedioTiempoAprobacion: Iniciando cálculo de promedio de tiempo de aprobación.');
    
    const programasAprobados = programas.filter(p => 
      p.estadoPropuesta === 'Vigente' && 
      p.fechaAprobacionHCU && 
      p.fechaAprobacionCES && 
      p.fechaAprobacionHCU.trim() !== '' && 
      p.fechaAprobacionCES.trim() !== ''
    );

    if (programasAprobados.length === 0) {
      logActivity('INFO', 'calcularPromedioTiempoAprobacion: No hay programas con ambas fechas de aprobación.');
      return 0;
    }

    const totalDias = programasAprobados.reduce((sum, programa) => {
      const fechaHCU = parseDateDDMMYYYY(programa.fechaAprobacionHCU);
      const fechaCES = parseDateDDMMYYYY(programa.fechaAprobacionCES);
      
      if (fechaHCU && fechaCES && fechaCES >= fechaHCU) {
        return sum + (fechaCES - fechaHCU) / (1000 * 60 * 60 * 24);
      }
      return sum;
    }, 0);

    const promedio = Math.round(totalDias / programasAprobados.length);
    logActivity('INFO', `calcularPromedioTiempoAprobacion: Promedio calculado: ${promedio} días.`);
    return promedio;

  } catch (error) {
    logActivity('ERROR', `calcularPromedioTiempoAprobacion: ${error.message}`);
    return 0;
  }
}

/**
 * Calcula el costo promedio de los programas para una facultad específica.
 * @param {string} facultad - El nombre de la facultad para filtrar.
 * @returns {number} El costo promedio formateado a 2 decimales.
 */
function getKPIsCostoPorFacultad(facultad) {
  try {
    if (!facultad || facultad.trim() === '') return 0;
    
    logActivity('INFO', `getKPIsCostoPorFacultad: Obteniendo costo para facultad: ${facultad}`);  
    const programas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));
    
    if (!programas || programas.length === 0) return 0;

    const costosNumericos = programasFiltrados
  .map(p => p.costoAproximado)
  .filter(costo => costo && String(costo).trim() !== '')
  .map(costo => parseFloat(String(costo).replace(/[^0-9.-]+/g, "")))
  .filter(costo => !isNaN(costo));

    const costoPromedioCalculado = costosNumericos.length > 0
      ? (costosNumericos.reduce((sum, val) => sum + val, 0) / costosNumericos.length).toFixed(2)
      : "0.00";

    
    logActivity('INFO', `getKPIsCostoPorFacultad: Costo promedio para ${facultad}: ${costoPromedio}`);
    return costoPromedio;

  } catch (error) {
    logActivity('ERROR', `getKPIsCostoPorFacultad: ${error.message}`);
    return 0;
  }
}

/**
 * Calcula KPIs estratégicos incluyendo Costo Promedio y Eficiencia Temporal
 */
function getKPIsDashboardEstratégico(programas) {
  if (!programas || programas.length === 0) return { costoPromedio: 0, eficienciaUOP: 0 };

  // 1. KPI: Costo Promedio de Maestrías [1, 3]
  const costos = programas
    .map(p => parseFloat(String(p.costoAproximado).replace(/[^0-9.-]+/g, "")))
    .filter(c => !isNaN(c) && c > 0);
  
  const costoPromedio = costos.length > 0 
    ? (costos.reduce((a, b) => a + b, 0) / costos.length).toFixed(2) 
    : 0;

  // 2. Métrica de Éxito: Tiempo UOP -> HCU (Meta 120 días) [2, 4]
  // Asumimos que 'fechaRegistro' es la presentación en UOP y 'fechaAprobacionHCU' es la meta.
  const programasConHito = programas.filter(p => p.fechaAprobacionHCU && p.fechaRegistro);
  let diasTotales = 0;
  let cumplidores = 0;

  programasConHito.forEach(p => {
    const inicio = new Date(p.fechaRegistro);
    const fin = parseDateYYYYMMDD(p.fechaAprobacionHCU) || parseDateDDMMYYYY(p.fechaAprobacionHCU);
    if (inicio && fin && fin >= inicio) {
      const dif = (fin - inicio) / (1000 * 60 * 60 * 24);
      diasTotales += dif;
      if (dif <= 120) cumplidores++; // Métrica solicitada
    }
  });

  const promedioDiasUOP = programasConHito.length > 0 ? Math.round(diasTotales / programasConHito.length) : 0;
  const tasaEficienciaUOP = programasConHito.length > 0 ? ((cumplidores / programasConHito.length) * 100).toFixed(1) : 0;

  return {
    costoPromedio,
    promedioDiasUOP,
    tasaEficienciaUOP,
    totalProgramas: programas.length
  };
}
/**
 * Prepara la lista completa de observaciones con semáforo calculado,
 * enriquecida con datos del programa para el dashboard.
 * PARCHE FINAL: Devuelve la estructura exacta que espera el frontend:
 * { nombre, programaID, descripcion, estado, fechaLimite, facultad }
 *
 * @param {Array} observaciones - Array de objetos OBSERVACIONES.
 * @param {Array} programas - Array de objetos PROGRAMAPOSGRADO.
 * @returns {Array} Array de objetos listos para renderizar en el dashboard.
 */

function prepararProgramasConObservaciones(observaciones, programas) {
  try {
    if (!observaciones || !programas) return [];

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // Mapa de programas para búsqueda O(1)
    const programasMap = programas.reduce((map, p) => {
      map[p.programaID] = p;
      return map;
    }, {});

    const resultado = observaciones.map(obs => {
      const programa = programasMap[obs.programaID];
      if (!programa) return null;

      // ── CÁLCULO DE SEMÁFORO EN SERVIDOR ─────────────────────────────────
      const estaRecibida = obs.fechaCorreccionRecibida &&
                           obs.fechaCorreccionRecibida.toString().trim() !== '';
      let estado = 'Plazo_lejano';

      if (estaRecibida) {
        // Determinar si llegó a tiempo o tarde
        const fechaLimite = parseDateYYYYMMDD(obs.fechaCorreccionEsperada);
        const fechaRecibida = parseDateYYYYMMDD(obs.fechaCorreccionRecibida);
        estado = (fechaLimite && fechaRecibida && fechaRecibida <= fechaLimite)
          ? 'A_tiempo'
          : 'Corregido_Atrasado';
      } else {
        // Pendiente — calcular urgencia por fecha límite
        const fechaLimite = parseDateYYYYMMDD(obs.fechaCorreccionEsperada);
        if (fechaLimite) {
          const diasRestantes = Math.ceil((fechaLimite - hoy) / (1000 * 60 * 60 * 24));
          if (diasRestantes < 0) {
            estado = 'Vencido';
          } else if (diasRestantes <= 7) {
            estado = 'Proximo_a_vencer';
          }
        }
      }

      return {
        programaID   : obs.programaID,
        observacionID: obs.observacionID,
        nombre       : programa.nombrePrograma || 'Sin nombre',
        facultad     : programa.facultad || 'Sin facultad',
        descripcion  : obs.descripcion || 'Sin descripción',
        fechaLimite  : obs.fechaCorreccionEsperada || '',
        fechaRecibida: obs.fechaCorreccionRecibida || '',
        estado,
      };
    }).filter(Boolean);

    // Ordenar: Vencido → Proximo_a_vencer → Plazo_lejano → A_tiempo → Corregido_Atrasado
    const ordenEstado = {
      'Vencido': 0, 'Proximo_a_vencer': 1, 'Plazo_lejano': 2,
      'A_tiempo': 3, 'Corregido_Atrasado': 4
    };
    resultado.sort((a, b) => (ordenEstado[a.estado] ?? 9) - (ordenEstado[b.estado] ?? 9));

    logActivity('INFO', `prepararProgramasConObservaciones: ${resultado.length} observaciones procesadas con semáforo.`);
    return resultado;

  } catch (error) {
    logActivity('ERROR', `prepararProgramasConObservaciones: ${error.message}`);
    return [];
  }
}

function prepararCohortesPorPrograma(cohortesFiltradas, programas) {
    if (!cohortesFiltradas || !programas) return [];
    const resultado = {};
    cohortesFiltradas.forEach(c => {
        if (!resultado[c.programaID]) {
            const programa = programas.find(p => p.programaID === c.programaID);
            resultado[c.programaID] = { id: c.programaID, nombre: programa?.nombrePrograma || 'N/A', facultad: programa?.facultad || 'N/A', total: 0, estados: {} };
        }
        resultado[c.programaID].total++;
        resultado[c.programaID].estados[c.estadoCohorte] = (resultado[c.programaID].estados[c.estadoCohorte] || 0) + 1;
    });
    return Object.values(resultado).sort((a, b) => b.total - a.total);
}

function prepararCohortePorEstado(cohortes, programas, estadoFiltro) {
  try {
    let progs = programas;
    if (estadoFiltro) {
      const idsConEstado = new Set(
        cohortes.filter(c => c.estadoCohorte === estadoFiltro).map(c => c.programaID)
      );
      progs = progs.filter(p => idsConEstado.has(p.programaID));
    }

    return progs.map(p => {
      let costoFormateado = "N/A";
      if (p.costoAproximado !== undefined && p.costoAproximado !== null && String(p.costoAproximado).trim() !== '') {
        const num = parseFloat(String(p.costoAproximado).replace(/[^0-9.-]+/g, ""));
        if (!isNaN(num)) {
          costoFormateado = `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
      }

      return {
        programaID: p.programaID,
        facultad: p.facultad || 'N/A',
        nombrePrograma: p.nombrePrograma || 'N/A',
        mencion: (p.mencion && p.mencion.trim() !== '') ? p.mencion : 'Sin mención',
        codigoSNIESE: p.codigoSNIESE || 'N/A',
        costoAproximado: costoFormateado,
        estadoPropuesta: p.estadoPropuesta || 'N/A',
        resolucionCES: p.resolucionCES || 'N/A'
      };
    });
  } catch (e) {
    logActivity('ERROR', `prepararCohortePorEstado: ${e.message}`);
    return [];
  }
}


function getTablasObservaciones() {
  try {
    logActivity('INFO', 'getTablasObservaciones: Obteniendo datos para tablas de Observaciones.');
    const observaciones = JSON.parse(getSheetData('OBSERVACIONES'));
    const programas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));

    if (!observaciones || !programas) {
      logActivity('ERROR', 'getTablasObservaciones: No se pudieron obtener los datos de OBSERVACIONES o PROGRAMAPOSGRADO.');
      return { riesgoCritico: [], proximasAVencer: [] };
    }

    const programasMap = programas.reduce((map, prog) => {
      map[prog.programaID] = { nombrePrograma: prog.nombrePrograma, facultad: prog.facultad };
      return map;
    }, {});

    // --- 1. Preparar tabla de Riesgo Crítico ---
    const vencidasPorPrograma = {};
    observaciones.forEach(obs => {
      if (obs.estadoSemaforo === 'Vencido') {
        const programaId = obs.programaID;
        vencidasPorPrograma[programaId] = (vencidasPorPrograma[programaId] || 0) + 1;
      }
    });

    const riesgoCritico = Object.entries(vencidasPorPrograma).map(([programaId, count]) => {
      const programaInfo = programasMap[programaId] || { nombrePrograma: 'N/A', facultad: 'N/A' };
      return {
        nombrePrograma: programaInfo.nombrePrograma,
        facultad: programaInfo.facultad,
        totalVencidas: count
      };
    }).sort((a, b) => b.totalVencidas - a.totalVencidas); // Ordenar de mayor a menor

    // --- 2. Preparar tabla de Próximas a Vencer ---
    const proximasAVencer = observaciones
      .filter(obs => obs.estadoSemaforo === 'Proximo_a_vencer')
      .map(obs => {
        const programaInfo = programasMap[obs.programaID] || { nombrePrograma: 'N/A' };
        return {
          nombrePrograma: programaInfo.nombrePrograma,
          descripcion: obs.descripcion,
          fechaLimite: obs.fechaCorreccionEsperada
        };
      }).sort((a, b) => new Date(a.fechaLimite) - new Date(b.fechaLimite)); // Ordenar por fecha más cercana

    logActivity(`INFO: Datos de tablas de Observaciones listos. Riesgo Crítico: ${riesgoCritico.length}, Próximas a Vencer: ${proximasAVencer.length}.`);
    return { riesgoCritico, proximasAVencer };

  } catch (error) {
    logActivity(`ERROR: Error general en getTablasObservaciones: ${error.message}`);
    return { riesgoCritico: [], proximasAVencer: [] };
  }
}




/**
 * Obtiene una lista de años únicos de la columna PeriodoAcademico en la hoja COHORTE.
 * @returns {Array<number>} Un array de años ordenados de mayor a menor.
 */
function getAniosDisponiblesParaCohortes() {
  try {
    const cohortes = JSON.parse(getSheetData('COHORTE'));
    const aniosSet = new Set();
    cohortes.forEach(c => {
        if (c.periodoAcademico) {
            const years = c.periodoAcademico.split('-');
            years.forEach(year => {
                const parsedYear = parseInt(year.trim(), 10);
                if (!isNaN(parsedYear)) {
                    aniosSet.add(parsedYear);
                }
            });
        }
    });
    return Array.from(aniosSet).sort((a, b) => b - a);
  } catch (error) {
    logActivity('ERROR', `getAniosDisponiblesParaCohortes: ${error.message}`);
    return []; // Devuelve un array vacío en caso de error
  }
}

/**
 * Busca cohortes filtrando por un rango de años de inicio y/o fin.
 * @param {string} anioInicio - El año de inicio para filtrar (opcional).
 * @param {string} anioFin - El año de fin para filtrar (opcional).
 * @returns {Array<Object>} Un array de objetos de cohorte enriquecidos con datos del programa.
 */
function buscarCohortesPorRangoAnios(anioInicio, anioFin) {
  try {
    logActivity(`INFO: Iniciando búsqueda de cohortes por rango. Inicio: ${anioInicio}, Fin: ${anioFin}`);
    
    const cohortes = JSON.parse(getSheetData('COHORTE'));
    const programas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));

    if (!cohortes || !programas) {
      logActivity('ERROR: No se pudieron obtener los datos de COHORTE o PROGRAMAPOSGRADO en buscarCohortesPorRangoAnios.');
      return [];
    }

    const programasMap = programas.reduce((map, prog) => {
      map[prog.programaID] = { nombrePrograma: prog.nombrePrograma, facultad: prog.facultad };
      return map;
    }, {});

    let cohortesFiltradas = cohortes;

    // Filtrar por año de inicio si se proporciona
    if (anioInicio) {
      cohortesFiltradas = cohortesFiltradas.filter(c => {
        if (!c.periodoAcademico || typeof c.periodoAcademico !== 'string') return false;
        const anioDeCohorte = c.periodoAcademico.split('-')[0];
        return anioDeCohorte === anioInicio;
      });
    }

    // Filtrar por año de fin si se proporciona
    if (anioFin) {
      cohortesFiltradas = cohortesFiltradas.filter(c => {
        if (!c.periodoAcademico || typeof c.periodoAcademico !== 'string') return false;
        const partes = c.periodoAcademico.split('-');
        const anioDeCohorte = partes.length > 1 ? partes[1] : partes[0];
        return anioDeCohorte === anioFin;
      });
    }

    const cohortesEnriquecidas = cohortesFiltradas.map(c => {
      const programaInfo = programasMap[c.programaID] || { nombrePrograma: 'N/A', facultad: 'N/A' };
      return { ...c, ...programaInfo };
    });

    logActivity(`INFO: Búsqueda por rango finalizada. Se encontraron ${cohortesEnriquecidas.length} cohortes.`);
    return cohortesEnriquecidas;

  } catch (error) {
    logActivity(`ERROR: Error general en buscarCohortesPorRangoAnios: ${error.message}\nStack: ${error.stack}`);
    return [];
  }
}


/**
 * PARCHE 3: Blindado contra fechaRegistro vacía o con formato inesperado.
 * Utilities.formatDate lanza excepción con fechas inválidas, lo que
 * colapsaba silenciosamente toda getDashboardData.
 */
function prepararExtensionesRecientes(extensiones, cohortes, programas) {
  if (!extensiones || !cohortes || !programas) return [];

  // Mapa de cohortes y programas para búsqueda O(1)
  const cohortesMap = cohortes.reduce((m, c) => { m[c.cohorteID] = c; return m; }, {});
  const programasMap = programas.reduce((m, p) => { m[p.programaID] = p; return m; }, {});

  // Ordenar de más reciente a más antiguo con protección de fecha inválida
  const sorted = [...extensiones].sort((a, b) => {
    const da = a.fechaRegistro ? new Date(a.fechaRegistro) : new Date(0);
    const db = b.fechaRegistro ? new Date(b.fechaRegistro) : new Date(0);
    return db - da;
  });

  return sorted
    .slice(0, 15)
    .map(e => {
      try {
        const cohorte = cohortesMap[e.cohorteID];
        if (!cohorte) return null;
        const programa = programasMap[cohorte.programaID];
        if (!programa) return null;

        // Formateo seguro de fecha — sin Utilities.formatDate que lanza excepciones
        let registroStr = '';
        if (e.fechaRegistro && e.fechaRegistro.toString().trim() !== '') {
          const d = new Date(e.fechaRegistro);
          if (!isNaN(d.getTime())) {
            registroStr = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
          }
        }

        return {
          cohorteID   : e.cohorteID,
          nombrePrograma: programa.nombrePrograma,
          tipoExtension : e.tipoExtension,
          numeroLlamado : e.numeroLlamado,
          fechaInicio   : e.fechaInicio  || '',
          fechaFin      : e.fechaFin     || '',
          fechaRegistro : registroStr,
          // Aliases para el historial legacy
          programa      : programa.nombrePrograma,
          cohorte       : cohorte.ordinalCohorte,
          tipo          : e.tipoExtension,
          fechas        : `${e.fechaInicio || ''} a ${e.fechaFin || ''}`,
          registro      : registroStr,
        };
      } catch(err) {
        logActivity('WARN', `prepararExtensionesRecientes: Error en extensión ${e.extensionID}: ${err.message}`);
        return null;
      }
    })
    .filter(Boolean);
}

function prepararExtensionesPorMes(extensiones) {
    if (!extensiones || extensiones.length === 0) return [['Mes', 'Cantidad']];
    const counts = {};
    extensiones.forEach(item => {
        if (item.fechaRegistro) {
            const mes = new Date(item.fechaRegistro).toLocaleString('default', { month: 'long', year: 'numeric' });
            counts[mes] = (counts[mes] || 0) + 1;
        }
    });
    return [['Mes', 'Cantidad'], ...Object.entries(counts)];
}

function calcularPromedioExtensiones(cohortes, extensiones) {
    if (!cohortes || cohortes.length === 0) return 0;
    const cohortesIds = new Set(cohortes.map(c => c.cohorteID));
    const extensionesFiltradas = extensiones.filter(e => cohortesIds.has(e.cohorteID));
    return cohortesIds.size > 0 ? (extensionesFiltradas.length / cohortesIds.size).toFixed(1) : 0;
}

/**
 * Calcula el tiempo promedio en días que las cohortes pasan en cada fase (Inscripción, Matriculación, Clases).
 * @param {Array<Object>} cohortes - Un array de objetos de cohortes.
 * @returns {Array<Array>} Un array en formato de Google Charts [['Fase', 'Días Promedio'], ...].
 */
function calcularTiempoPromedioPorFaseReal(cohortes) {
  if (!cohortes || cohortes.length === 0) {
    return [['Fase', 'Días Promedio']];
  }

  const fases = {
    'Inscripción': { diasTotales: 0, contador: 0 },
    'Matriculación': { diasTotales: 0, contador: 0 },
    'Clases': { diasTotales: 0, contador: 0 }
  };

  cohortes.forEach(cohorte => {
    // Fase de Inscripción
    if (cohorte.fechaInicioInscripcion && cohorte.fechaFinInscripcion) {
      const inicio = parseDateYYYYMMDD(cohorte.fechaInicioInscripcion);
      const fin = parseDateYYYYMMDD(cohorte.fechaFinInscripcion);
      if (inicio && fin && fin >= inicio) {
        fases['Inscripción'].diasTotales += (fin - inicio) / (1000 * 60 * 60 * 24);
        fases['Inscripción'].contador++;
      }
    }

    // Fase de Matriculación (usando fechas ordinarias como principal)
    if (cohorte.fechaInicioMatriculaOrd && cohorte.fechaFinMatriculaOrd) {
      const inicio = parseDateYYYYMMDD(cohorte.fechaInicioMatriculaOrd);
      const fin = parseDateYYYYMMDD(cohorte.fechaFinMatriculaOrd);
      if (inicio && fin && fin >= inicio) {
        fases['Matriculación'].diasTotales += (fin - inicio) / (1000 * 60 * 60 * 24);
        fases['Matriculación'].contador++;
      }
    }

    // Fase de Clases
    if (cohorte.fechaInicioClases && cohorte.fechaFinClases) {
      const inicio = parseDateYYYYMMDD(cohorte.fechaInicioClases);
      const fin = parseDateYYYYMMDD(cohorte.fechaFinClases);
      if (inicio && fin && fin >= inicio) {
        fases['Clases'].diasTotales += (fin - inicio) / (1000 * 60 * 60 * 24);
        fases['Clases'].contador++;
      }
    }
  });

  const resultado = [['Fase', 'Días Promedio']];
  for (const fase in fases) {
    if (fases[fase].contador > 0) {
      const promedio = Math.round(fases[fase].diasTotales / fases[fase].contador);
      resultado.push([fase, promedio]);
    }
  }
  
  // Si no se pudo calcular ninguna fase, devolver un valor por defecto para evitar errores en el frontend
  if (resultado.length === 1) {
      resultado.push(['Sin Datos', 0]);
  }

  return resultado;
}


function getDetailsById(programaId) {
  try {
    logActivity('INFO', `getDetailsById: Buscando detalles para el ID: ${programaId}`);
    const programas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));
    const programa = programas.find(p => p.programaID === programaId);

    if (!programa) {
      logActivity('WARN', `getDetailsById: Programa con ID ${programaId} no encontrado.`);
      return null;
    }

    let coordinadorNombre = 'No asignado'; // Valor por defecto
    if (programa.coordinadorID && programa.coordinadorID.trim() !== '') {
      const coordinador = getCoordinadorById(programa.coordinadorID);
      if (coordinador) {
        coordinadorNombre = coordinador.nombreCompleto;
      }
    }
    
    // Devuelve el objeto con todos los datos, manejando los que puedan faltar
    const detalles = {
      ...programa,
      coordinador: coordinadorNombre
    };

    logActivity('INFO', `getDetailsById: Detalles para ${programaId} encontrados.`);
    return detalles;

  } catch (error) {
    logActivity('ERROR', `getDetailsById: Error al buscar detalles por ID '${programaId}': ${error.message}, Stack: ${error.stack}`);
    return null;
  }
}

function searchUniversal(searchTerm) {
  try {
    logActivity('INFO', `searchUniversal: Buscando término: "${searchTerm}"`);
    const programas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));
    const lowerCaseTerm = searchTerm.toLowerCase();

    const resultados = programas.filter(p =>
      (p.nombrePrograma && p.nombrePrograma.toLowerCase().includes(lowerCaseTerm)) ||
      (p.codigoSNIESE && p.codigoSNIESE.toLowerCase().includes(lowerCaseTerm))
    );

    logActivity('INFO', `searchUniversal: Se encontraron ${resultados.length} programas.`);
    return { programas: resultados };
  } catch (error) {
    logActivity('ERROR', `searchUniversal: Error en la búsqueda: ${error.message}`);
    return { programas: [] };
  }
}

function getFixedFilterValues(filterType) {
  try {
    logActivity('INFO', `getFixedFilterValues: Obteniendo valores fijos para: ${filterType}`);
    const configSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('CONFIG');
    if (!configSheet) {
      logActivity('ERROR', "Hoja 'CONFIG' no encontrada en getFixedFilterValues.");
      return JSON.stringify([]);
    }
    
    const values = configSheet.getDataRange().getDisplayValues();
    if (values.length < 2) {
      logActivity('ERROR', "Hoja CONFIG vacía o sin cabeceras en getFixedFilterValues.");
      return JSON.stringify([]);
    }
    
    const tipoListaColIndex = values[0].indexOf('TipoLista');
    const valorItemColIndex = values[0].indexOf('ValorItem');
    
    if (tipoListaColIndex === -1 || valorItemColIndex === -1) {
      logActivity('ERROR', "Columnas 'TipoLista' o 'ValorItem' no encontradas en CONFIG.");
      return JSON.stringify([]);
    }
    
    const filterItems = values
      .slice(1)
      .filter(row => row[tipoListaColIndex] === filterType)
      .map(row => row[valorItemColIndex]);
    
    const uniqueItems = [...new Set(filterItems.filter(item => item && typeof item === 'string' && item.trim() !== ''))];
    
    logActivity('INFO', `getFixedFilterValues: Se encontraron ${uniqueItems.length} valores fijos para ${filterType}`);
    return JSON.stringify(uniqueItems);
  } catch (error) {
    logActivity('ERROR', `getFixedFilterValues: Error para '${filterType}': ${error.message}`);
    return JSON.stringify([]);
  }
}


/** REPORTERIA */

/**  REPORTE HISTORIALES DE EXTENSIONES (SECCION GESTION DE COHORTES-BOTON VER HISTORIAL-EXPORTAR HISTORIAL) */

function generarReporteHistorial(details, ordinalCohorte) {
  try {
    logActivity('INFO', 'Iniciando la generación de reporte de historial para cohorte: ' + ordinalCohorte);
    
    const NOMBRE_CARPETA_REPORTES = "Reportes de Historial de Cohortes";
    let carpeta = DriveApp.getFoldersByName(NOMBRE_CARPETA_REPORTES);
    let carpetaDestino;

    if (carpeta.hasNext()) {
      carpetaDestino = carpeta.next();
    } else {
      carpetaDestino = DriveApp.createFolder(NOMBRE_CARPETA_REPORTES);
      logActivity('INFO', `Carpeta de reportes '${NOMBRE_CARPETA_REPORTES}' creada.`);
    }
    
    // Filtrar extensiones por tipo
    const extensionesInscripcion = details.extensiones ? details.extensiones.filter(e => e.tipoExtension === 'INSCRIPCION') : [];
    const extensionesMatriculacion = details.extensiones ? details.extensiones.filter(e => e.tipoExtension === 'MATRICULACION') : [];
    
    // Definir el pie de firma (puedes modificar estos datos aquí)
    const nombreFirma = "María Fernanda Recalde Rodríguez";
    const cargoFirma = "COORDINADORA GENERAL DE POSGRADOS";
    
    // Crear contenido HTML para el PDF
    let htmlBody = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #333; border-bottom: 2px solid #333; padding-bottom: 10px;">Historial de Cohorte: ${ordinalCohorte}</h1>
        <p style="color: #666; font-size: 12px;">Generado el: ${new Date().toLocaleString()}</p>
        <hr style="margin: 20px 0;">
        
        <h2 style="color: #333; font-size: 18px; margin-top: 20px;">Información del Programa</h2>
        <table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 12px; margin-bottom: 20px;">
          <tr><td style="font-weight: bold; width: 30%; background-color: #f5f5f5;">Facultad:</td><td>${details.facultad || 'N/A'}</td></tr>
          <tr><td style="font-weight: bold; background-color: #f5f5f5;">Nombre del Programa:</td><td>${details.nombrePrograma || 'N/A'}</td></tr>
          <tr><td style="font-weight: bold; background-color: #f5f5f5;">Mención:</td><td>${details.mencion || 'Sin mención'}</td></tr>
          <tr><td style="font-weight: bold; background-color: #f5f5f5;">Cohorte:</td><td>${ordinalCohorte}</td></tr>
          <tr><td style="font-weight: bold; background-color: #f5f5f5;">Coordinador:</td><td>${details.coordinadorCohorteID || 'N/A'}</td></tr>
        </table>
        
        <h2 style="color: #333; font-size: 18px; margin-top: 20px;">Fase de Inscripción</h2>
        <table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 12px; margin-bottom: 20px;">
          <tr><td style="font-weight: bold; width: 30%; background-color: #f5f5f5;">Fechas Originales:</td><td>${details.fechaInicioInscripcion || 'N/A'} a ${details.fechaFinInscripcion || 'N/A'}</td></tr>
          <tr><td style="font-weight: bold; background-color: #f5f5f5;">Total Llamados:</td><td>${details.contadorInscripciones || 1}</td></tr>
    `;
    
    // Agregar extensiones de inscripción si existen
    if (extensionesInscripcion.length > 0) {
      htmlBody += `
        <tr><td colspan="2" style="background-color: #e8e8e8; text-align: center; font-weight: bold; padding: 8px;">Extensiones de Inscripción</td></tr>
      `;
      
      extensionesInscripcion.forEach(ext => {
        htmlBody += `
          <tr><td style="font-weight: bold; background-color: #f5f5f5;">Llamado ${ext.numeroLlamado}:</td><td>${ext.fechaInicio} a ${ext.fechaFin} <span style="color: #666; font-size: 10px;">(Registrado: ${ext.fechaRegistro})</span></td></tr>
        `;
      });
    }
    
    htmlBody += `
      </table>
      
      <h2 style="color: #333; font-size: 18px; margin-top: 20px;">Fase de Matriculación</h2>
      <table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 12px; margin-bottom: 20px;">
        <tr><td style="font-weight: bold; width: 30%; background-color: #f5f5f5;">Resolución HCU:</td><td>${details.resolucionHCU || 'N/A'}</td></tr>
        <tr><td style="font-weight: bold; background-color: #f5f5f5;">Fechas Matrícula Ordinaria:</td><td>${details.fechaInicioMatriculaOrd || 'N/A'} a ${details.fechaFinMatriculaOrd || 'N/A'}</td></tr>
        <tr><td style="font-weight: bold; background-color: #f5f5f5;">Total Llamados:</td><td>${details.contadorMatriculas || 1}</td></tr>
    `;
    
    // Agregar extensiones de matriculación si existen
    if (extensionesMatriculacion.length > 0) {
      htmlBody += `
        <tr><td colspan="2" style="background-color: #e8e8e8; text-align: center; font-weight: bold; padding: 8px;">Extensiones de Matriculación</td></tr>
      `;
      
      extensionesMatriculacion.forEach(ext => {
        htmlBody += `
          <tr><td style="font-weight: bold; background-color: #f5f5f5;">Llamado ${ext.numeroLlamado}:</td><td>${ext.fechaInicio} a ${ext.fechaFin} <span style="color: #666; font-size: 10px;">(Registrado: ${ext.fechaRegistro})</span></td></tr>
        `;
      });
    }
    
    // Mostrar fechas de matrícula extraordinaria si existen
    if (details.fechaInicioMatriculaExt || details.fechaFinMatriculaExt) {
      htmlBody += `
        <tr><td style="font-weight: bold; background-color: #f5f5f5;">Matrícula Extraordinaria:</td><td>${details.fechaInicioMatriculaExt || 'N/A'} a ${details.fechaFinMatriculaExt || 'N/A'}</td></tr>
      `;
    }
    
    htmlBody += `
      </table>
      
      <h2 style="color: #333; font-size: 18px; margin-top: 20px;">Fase Académica y Titulación</h2>
      <table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 12px; margin-bottom: 20px;">
        <tr><td style="font-weight: bold; width: 30%; background-color: #f5f5f5;">Inicio de Clases:</td><td>${details.fechaInicioClases || 'N/A'}</td></tr>
        <tr><td style="font-weight: bold; background-color: #f5f5f5;">Fin de Clases:</td><td>${details.fechaFinClases || 'N/A'}</td></tr>
        <tr><td style="font-weight: bold; background-color: #f5f5f5;">Mecanismos de Titulación:</td><td>${details.mecanismosTitulacion || 'N/A'}</td></tr>
      </table>
      
      <!-- Pie de firma -->
      <div style="margin-top: 60px; text-align: center;">
        <table style="width: 100%; max-width: 400px; margin: 0 auto; border-collapse: collapse;">
          <tr>
            <td style="border-top: 1px solid #333; padding-top: 5px; text-align: center; font-size: 12px; font-weight: bold;">
              ${nombreFirma}
            </td>
          </tr>
          <tr>
            <td style="text-align: center; font-size: 11px; color: #666; padding-top: 2px;">
              ${cargoFirma}
            </td>
          </tr>
        </table>
      </div>
      
      </div>
    `;
    
    // Generar el PDF
    const blob = Utilities.newBlob(htmlBody, MimeType.HTML).getAs(MimeType.PDF);
    const nombreArchivo = `Historial_Cohorte_${ordinalCohorte}_${Utilities.formatDate(new Date(), "GMT-5", "yyyy-MM-dd_HH-mm")}.pdf`;
    const archivoPDF = carpetaDestino.createFile(blob).setName(nombreArchivo);
    
    logActivity('INFO', `Reporte PDF de historial generado exitosamente: ${archivoPDF.getName()}`);
    
    return { 
      success: true, 
      message: "Reporte PDF de historial generado con éxito.", 
      fileUrl: archivoPDF.getUrl() 
    };
    
  } catch (error) {
    logActivity('ERROR', `Error al generar el reporte PDF de historial: ${error.message}, Stack: ${error.stack}`);
    return { success: false, message: `Error del servidor: ${error.message}`, fileUrl: null };
  }
}

/** REPORTE DE LAS CONSULTAS REALIZADAS A LA UP, SECCION REGISTRAR CONSULTA-BOTON REPORTE UP-boton confirmar */

function generarReporteConsultasPDF() {
  try {
    logActivity('INFO', 'Iniciando la generación de reporte de consultas en PDF.');

    const NOMBRE_CARPETA_REPORTES = "Reportes de Asesorías";
    let carpeta = DriveApp.getFoldersByName(NOMBRE_CARPETA_REPORTES);
    let carpetaDestino;

    if (carpeta.hasNext()) {
      carpetaDestino = carpeta.next();
    } else {

      carpetaDestino = DriveApp.createFolder(NOMBRE_CARPETA_REPORTES);
      logActivity('INFO', `Carpeta de reportes '${NOMBRE_CARPETA_REPORTES}' creada.`);
    }


    const consultas = JSON.parse(getSheetData('CONSULTA'));
    if (consultas.length === 0) {
      return { success: false, message: "No hay consultas para generar un reporte.", fileUrl: null };
    }
    

    const usuarios = JSON.parse(getSheetData('USUARIO'));
    const usuariosMap = usuarios.reduce((map, user) => {
      map[user.usuarioID] = user.nombreCompleto;
      return map;
    }, {});

    consultas.forEach(consulta => {
      consulta.nombreUsuario = usuariosMap[consulta.usuarioID] || 'Usuario no encontrado';
    });
    let htmlBody = `
      <h1>Reporte de Consultas y Atenciones</h1>
      <p>Generado el: ${new Date().toLocaleString()}</p>
      <hr>
      <table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 10px;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th>ID</th>
            <th>Fecha</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
            <th>Usuario</th>
            <th>Modalidad de Atención</th>
            <th>Funcionario</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    consultas.forEach(c => {
      htmlBody += `
          <tr>
            <td>${c.consultaID}</td>
            <td>${c.fechaConsulta}</td>
            <td>${c.horaVisita}</td>
            <td>${c.horaFin || ''}</td>
            <td>${c.nombreUsuario}</td>
            <td>${c.medioAtencion || ''}</td>
            <td>${c.nombreFuncionarioQueAtendio}</td>
          </tr>
      `;
    });

    htmlBody += '</tbody></table>';

    // --- 4. Generar el PDF y Guardarlo ---
    const blob = Utilities.newBlob(htmlBody, MimeType.HTML).getAs(MimeType.PDF);
    const nombreArchivo = `Reporte_Consultas_${Utilities.formatDate(new Date(), "GMT-5", "yyyy-MM-dd_HH-mm")}.pdf`;
    const archivoPDF = carpetaDestino.createFile(blob).setName(nombreArchivo);

    logActivity('INFO', `Reporte PDF generado exitosamente: ${archivoPDF.getName()}`);

    return { 
      success: true, 
      message: "Reporte PDF generado con éxito.", 
      fileUrl: archivoPDF.getUrl() 
    };

  } catch (error) {
    logActivity('ERROR', `Error al generar el reporte PDF: ${error.message}, Stack: ${error.stack}`);
    return { success: false, message: `Error del servidor: ${error.message}`, fileUrl: null };
  }
}

function getFileForDownload(fileUrl) {
  try {
    const fileId = fileUrl.match(/[-\w]{25,}/)[0];
    const file = DriveApp.getFileById(fileId);
    
    let blob;
    let fileName = file.getName();
    const mimeType = file.getMimeType();

    // ¿Es un Google Sheet? Entonces forzamos la exportación a Excel (.xlsx)
    if (mimeType === MimeType.GOOGLE_SHEETS) {
      logActivity('INFO', `getFileForDownload: Convirtiendo Google Sheet a Excel. ID: ${fileId}`);
      
      const url = "https://docs.google.com/spreadsheets/d/" + fileId + "/export?format=xlsx";
      const token = ScriptApp.getOAuthToken(); // Pedimos permiso temporal
      
      const response = UrlFetchApp.fetch(url, {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      
      blob = response.getBlob();
      fileName += ".xlsx"; // Le aseguramos la extensión correcta al nombre
      
    } else {
      // Si ya es un PDF u otro formato, lo procesamos normal
      logActivity('INFO', `getFileForDownload: Procesando archivo nativo. ID: ${fileId}`);
      blob = file.getBlob();
    }

    return {
      fileName: fileName,
      mimeType: blob.getContentType(),
      data: Utilities.base64Encode(blob.getBytes()),
      success: true
    };
    
  } catch (error) {
    logActivity('ERROR', `getFileForDownload: ${error.message}`);
    return { success: false, error: error.message };
  }
}



/** Genera un reporte profesional de Observaciones y lo prepara para descarga desde el DASHBOARD, */


function generarReporteObservacionesExcel() {
  logActivity('INFO', 'Iniciando generación de reporte Excel de Observaciones.');
  try {
    // 1. Gestión de Carpeta (Mantenemos el orden en Drive)
    const NOMBRE_CARPETA = "Reportes Dashboard";
    let carpetas = DriveApp.getFoldersByName(NOMBRE_CARPETA);
    let carpetaDestino = carpetas.hasNext() ? carpetas.next() : DriveApp.createFolder(NOMBRE_CARPETA);

    // 2. Extracción y Cruce de Datos (Join)
    const observaciones = JSON.parse(getSheetData('OBSERVACIONES'));
    const programas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));
    
    if (observaciones.length === 0) {
      return { success: false, message: "No hay observaciones para exportar." };
    }

    // Mapa de programas para búsqueda ultra-rápida (Evita bucles anidados lentos)
    const programasMap = programas.reduce((map, prog) => {
      map[prog.programaID] = { nombre: prog.nombrePrograma, facultad: prog.facultad };
      return map;
    }, {});

    // 3. Creación del Archivo
    const nombreArchivo = `Reporte_Observaciones_${Utilities.formatDate(new Date(), "GMT-5", "yyyy-MM-dd_HH-mm")}`;
    const nuevaHoja = SpreadsheetApp.create(nombreArchivo);
    const hoja = nuevaHoja.getActiveSheet();

    // 4. Transformación y Carga (Formato de Cabeceras y Filas)
    const headers = ["ID Observación", "Facultad", "Programa", "Descripción", "Fecha Obs.", "Límite Corrección", "Fecha Recibida", "Estado (Semáforo)"];
    
    const datosProcesados = observaciones.map(obs => {
      const progInfo = programasMap[obs.programaID] || { nombre: 'Programa Eliminado/No Encontrado', facultad: 'N/A' };
      return [
        obs.observacionID,
        progInfo.facultad,
        progInfo.nombre,
        obs.descripcion,
        obs.fechaObservacion,
        obs.fechaCorreccionEsperada,
        obs.fechaCorreccionRecibida || 'Pendiente',
        obs.estadoSemaforo ? obs.estadoSemaforo.replace(/_/g, ' ') : 'N/A' // Limpiamos el texto del semáforo
      ];
    });

    const outputData = [headers, ...datosProcesados];
    hoja.getRange(1, 1, outputData.length, headers.length).setValues(outputData);

    // 5. Estética Profesional
    hoja.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3f4f6");
    hoja.setFrozenRows(1);
    hoja.autoResizeColumns(1, headers.length);

    // 6. Mover archivo a la carpeta correcta
    const archivo = DriveApp.getFileById(nuevaHoja.getId());
    carpetaDestino.addFile(archivo);
    DriveApp.getRootFolder().removeFile(archivo);

    logActivity('INFO', `Reporte Excel de Observaciones generado con éxito: ${archivo.getName()}`);
    
    // Retornamos la URL para que el HTML dispare la descarga Base64
    return { success: true, fileUrl: archivo.getUrl(), message: "Reporte generado." };

  } catch (error) {
    logActivity('ERROR', `generarReporteObservacionesExcel: ${error.message}`);
    return { success: false, message: `Error del servidor: ${error.message}` };
  }
}

/** Genera un reporte profesional de Cohortes y lo prepara para descarga */

function generarReporteCohortesExcel() {
  logActivity('INFO', 'Iniciando generación de reporte Excel de Cohortes.');
  try {
    const NOMBRE_CARPETA = "Reportes Dashboard";
    let carpetas = DriveApp.getFoldersByName(NOMBRE_CARPETA);
    let carpetaDestino = carpetas.hasNext() ? carpetas.next() : DriveApp.createFolder(NOMBRE_CARPETA);

    const cohortes = JSON.parse(getSheetData('COHORTE'));
    const programas = JSON.parse(getSheetData('PROGRAMAPOSGRADO'));
    
    if (cohortes.length === 0) {
      return { success: false, message: "No hay cohortes para exportar." };
    }

    const programasMap = programas.reduce((map, prog) => {
      map[prog.programaID] = { nombre: prog.nombrePrograma, facultad: prog.facultad, mencion: prog.mencion };
      return map;
    }, {});

    const nombreArchivo = `Reporte_Cohortes_${Utilities.formatDate(new Date(), "GMT-5", "yyyy-MM-dd_HH-mm")}`;
    const nuevaHoja = SpreadsheetApp.create(nombreArchivo);
    const hoja = nuevaHoja.getActiveSheet();

    const headers = ["Facultad", "Programa", "Mención", "Cohorte (Ordinal)", "Periodo", "Estado Actual", "Llamados Insc.", "Llamados Matr.", "Inicio Clases"];
    
    const datosProcesados = cohortes.map(c => {
      const progInfo = programasMap[c.programaID] || { nombre: 'N/A', facultad: 'N/A', mencion: '' };
      return [
        progInfo.facultad,
        progInfo.nombre,
        progInfo.mencion || 'Sin Mención',
        c.ordinalCohorte,
        c.periodoAcademico,
        c.estadoCohorte,
        c.contadorInscripciones || 1,
        c.contadorMatriculas || 1,
        c.fechaInicioClases || 'No definida'
      ];
    });

    const outputData = [headers, ...datosProcesados];
    hoja.getRange(1, 1, outputData.length, headers.length).setValues(outputData);

    // Estética
    hoja.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#eef2ff");
    hoja.setFrozenRows(1);
    hoja.autoResizeColumns(1, headers.length);

    const archivo = DriveApp.getFileById(nuevaHoja.getId());
    carpetaDestino.addFile(archivo);
    DriveApp.getRootFolder().removeFile(archivo);

    logActivity('INFO', `Reporte Excel de Cohortes generado con éxito: ${archivo.getName()}`);
    return { success: true, fileUrl: archivo.getUrl(), message: "Reporte generado." };

  } catch (error) {
    logActivity('ERROR', `generarReporteCohortesExcel: ${error.message}`);
    return { success: false, message: `Error del servidor: ${error.message}` };
  }
}

/**
 * Obtiene el listado de trámites Quipux filtrados por Facultad 
 */
function getReporteQuipuxByFacultad(facultad) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('CONSULTA');
    if (!sheet) return JSON.stringify([]);

    const data = sheet.getDataRange().getValues();
    if (data.length < 2) return JSON.stringify([]);

    const headers = data[0].map(h => String(h).trim());
    const idxMedio      = headers.indexOf('MedioAtencion');
    const idxQuipux     = headers.indexOf('NumeroQuipux');
    const idxFacultad   = headers.indexOf('FacultadReunion');
    const idxFecha      = headers.indexOf('FechaConsulta');
    const idxDetalle    = headers.indexOf('DetalleConsulta');
    const idxSolucion   = headers.indexOf('SolucionBrindada');
    const idxTipoSol    = headers.indexOf('TipoSolucion');
    const idxFuncionario= headers.indexOf('NombreFuncionarioQueAtendio');

    const resultados = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const medio = String(row[idxMedio] || '').toLowerCase();
      const numQuipux = String(row[idxQuipux] || '').trim();
      const rowFacultad = String(row[idxFacultad] || '').trim();

      // Filtrar registros que sean medio Quipux o tengan un Número Quipux
      if (medio === 'quipux' || numQuipux !== '') {
        if (facultad === 'TODAS' || facultad === '' || rowFacultad === facultad) {
          
          let fechaStr = row[idxFecha] || '';
          if (fechaStr instanceof Date) {
            fechaStr = Utilities.formatDate(fechaStr, ss.getSpreadsheetTimeZone(), "yyyy-MM-dd");
          }

          // Rescate de Detalle/Motivo (si DetalleConsulta está vacío toma TemaOrdenDelDia)
          const detalleMotivo = row[idxDetalle] || row[headers.indexOf('TemaOrdenDelDia')] || '';

          // Rescate de Estado/Solución
          const estadoSolucion = row[idxSolucion] || row[idxTipoSol] || row[headers.indexOf('AcuerdosCompromisos')] || '';

          resultados.push({
            numeroQuipux: numQuipux,
            fecha: fechaStr,
            facultad: rowFacultad,
            tema: detalleMotivo,
            funcionario: row[idxFuncionario] || '',
            respuesta: estadoSolucion
          });
        }
      }
    }

    return JSON.stringify(resultados);
  } catch (err) {
    Logger.log("Error en getReporteQuipuxByFacultad: " + err.toString());
    return JSON.stringify([]);
  }
}


/** FIN DE REPORTERIAS */

/** FUNCIONES PARA EXTENSIONES DE INSCRIPCIONES Y MATRICULAS */

function createExtension(extensionData) {
  logActivity('INFO', `Intentando crear nueva extensión: ${JSON.stringify(extensionData)}`);
  try {
    const config = SHEETS_CONFIG.EXTENSIONES_FECHAS;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(config.sheetName);
    if (!sheet) {
      logActivity('ERROR', `createExtension: Hoja '${config.sheetName}' no encontrada.`);
      return { success: false, message: `Error: Hoja '${config.sheetName}' no encontrada.` };
    }

    const newId = generateNextId('EXTENSIONES_FECHAS', config.idPrefix);
    if (!newId) {
      logActivity('ERROR', 'createExtension: No se pudo generar un ExtensionID único.');
      return { success: false, message: 'Error: No se pudo generar un ID único para la extensión.' };
    }

    const headers = getSheetHeaders('EXTENSIONES_FECHAS');
    const newRow = [];
    const now = new Date();
    const formattedDate = Utilities.formatDate(now, SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), 'yyyy-MM-dd HH:mm:ss');

    const extensionToSave = {
      extensionID: newId,
      cohorteID: extensionData.cohorteID,
      tipoExtension: extensionData.tipoExtension,
      numeroLlamado: extensionData.numeroLlamado,
      fechaInicio: extensionData.fechaInicio,
      fechaFin: extensionData.fechaFin,
      fechaRegistro: formattedDate
    };

    for (const header of headers) {
      const jsKey = config.headerMap[header];
      newRow.push(extensionToSave[jsKey]);
    }

    sheet.appendRow(newRow);
    logActivity('INFO', `Extensión ${newId} creada exitosamente.`);
    return { success: true, message: 'Extensión registrada exitosamente.', extension: JSON.stringify(extensionToSave) };
  } catch (error) {
    logActivity('ERROR', `createExtension: ${error.message}`);
    return { success: false, message: `Error al registrar la extensión: ${error.message}` };
  }
}

function getExtensionesByCohorte(cohorteID) {
  logActivity('INFO', `Obteniendo extensiones para CohorteID: ${cohorteID}`);
  try {
    const todasLasExtensiones = JSON.parse(getSheetData('EXTENSIONES_FECHAS'));
    const extensionesFiltradas = todasLasExtensiones.filter(e => e.cohorteID === cohorteID);
    return JSON.stringify(extensionesFiltradas);
  } catch (error) {
    logActivity('ERROR', `getExtensionesByCohorte: ${error.message}`);
    return JSON.stringify([]);
  }
}

function incrementarLlamadoConExtension(cohorteID, tipoDeLlamado, fechaInicio, fechaFin) {
  logActivity('INFO', `incrementarLlamadoConExtension: Registrando '${tipoDeLlamado}' con fechas para cohorte ID: ${cohorteID}`);
  try {
    // Paso 1: Incrementar el contador en la hoja COHORTE
    const resultadoContador = incrementarLlamado(cohorteID, tipoDeLlamado);
    if (!resultadoContador.success) {
      return resultadoContador;
    }

    // Paso 2: Registrar la extensión de fecha en la hoja EXTENSIONES_FECHAS
    // CORRECCIÓN P2-04: Se usa resultadoContador.nuevoValor (dato estructurado)
    // en lugar de parseInt(resultadoContador.message.match(/\d+/)[0], 10) (regex frágil).
    const extensionData = {
      cohorteID     : cohorteID,
      tipoExtension : tipoDeLlamado === 'ContadorInscripciones' ? 'INSCRIPCION' : 'MATRICULACION',
      numeroLlamado : resultadoContador.nuevoValor,
      fechaInicio   : fechaInicio,
      fechaFin      : fechaFin
    };

    return createExtension(extensionData);

  } catch (error) {
    logActivity('ERROR', `incrementarLlamadoConExtension: ${error.message}`);
    return { success: false, message: `Error al registrar el llamado con extensión: ${error.message}` };
  }
}

function getTransicionesPosibles(faseOrigen) {
  try {
    const configSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('CONFIG');
    if (!configSheet) throw new Error("Hoja 'CONFIG' no encontrada.");
    const values = configSheet.getDataRange().getDisplayValues();
    if (values.length < 2) return JSON.stringify([]);
    const headers = values[0];
    const tipoListaCol = headers.indexOf('TipoLista');
    const faseOrigenCol = headers.indexOf('FaseOrigen');
    const faseDestinoCol = headers.indexOf('FaseDestino');

    if (tipoListaCol === -1 || faseOrigenCol === -1 || faseDestinoCol === -1) {
      throw new Error("Columnas 'TipoLista', 'FaseOrigen' o 'FaseDestino' no encontradas en la hoja CONFIG.");
    }
    const transiciones = values
      .slice(1)
      .filter(row => 
        row[tipoListaCol] === 'Transiciones' && row[faseOrigenCol] === faseOrigen
      )
      .map(row => 
        row[faseDestinoCol]
      );
      
    logActivity('INFO', `Transiciones posibles desde '${faseOrigen}': ${JSON.stringify(transiciones)}`);
    return JSON.stringify(transiciones);

  } catch (error) {
    logActivity('ERROR', `getTransicionesPosibles: Error para '${faseOrigen}': ${error.message}`);
    return JSON.stringify([]);
  }
}

/**TRIGGERS DE CORREOS */


function testEnviarUnCorreo() {
  const MI_CORREO_DE_PRUEBA = 'lvromero@uce.edu.ec'; // <-- IMPORTANTE: Pon tu correo aquí también.
  const ID_COORDINADOR_PRUEBA = 'COO-TEST';
  const ID_PROGRAMA_PRUEBA = 'PROG-TEST';

  // 1. Simular los datos que la función principal obtendría
  const coordinadorPrueba = {
    coordinadorID: ID_COORDINADOR_PRUEBA,
    nombreCompleto: "Lorena Veronica Romero Tacuri",
    correoInstitucional: MI_CORREO_DE_PRUEBA
  };

  const programaPrueba = {
    programaID: ID_PROGRAMA_PRUEBA,
    nombrePrograma: "Programa de Prueba para Notificaciones",
    coordinadorID: ID_COORDINADOR_PRUEBA
  };

  const observacionPrueba = {
    observacionID: "OBS-TEST",
    fechaCorreccionEsperada: "2025-09-04" // Una fecha pasada
  };

  // 2. Construir el mensaje de la notificación (lógica copiada de la función principal)
  const notificationMessage = `ALERTA CRÍTICA: La observación para el programa "${programaPrueba.nombrePrograma}" (ID: ${observacionPrueba.observacionID}) ha excedido su plazo límite (${observacionPrueba.fechaCorreccionEsperada}).`;
  const notificationType = 'Alerta_Vencido';

  // 3. Registrar la notificación en la hoja (buena práctica)
  createNotificacion({
      observacionID: observacionPrueba.observacionID,
      programaID: programaPrueba.programaID,
      coordinadorID: coordinadorPrueba.coordinadorID,
      tipo: notificationType,
      mensaje: notificationMessage
  });

  // 4. Enviar el correo de prueba
  try {
    MailApp.sendEmail({
      to: coordinadorPrueba.correoInstitucional,
      subject: `[PRUEBA] Notificación de Seguimiento: ${programaPrueba.nombrePrograma}`,
      body: notificationMessage
    });
    Logger.log(`Correo de prueba enviado exitosamente a: ${coordinadorPrueba.correoInstitucional}`);
  } catch(e) {
    Logger.log(`Error al enviar el correo de prueba: ${e.message}`);
  }
}

/**
 * FUNCIÓN DE ARRANQUE: Ejecutar manualmente UNA VEZ para despertar los permisos.
 * No borres esta función.
 */
function autorizarPermisosAvanzados() {
  // Estas líneas no hacen nada crítico, solo obligan a Google a pedirte los permisos 
  // de conexión externa (UrlFetchApp) y generación de Tokens.
  var token = ScriptApp.getOAuthToken();
  var test = UrlFetchApp.fetch("https://www.google.com");
  Logger.log("¡Permisos avanzados concedidos con éxito!");
}