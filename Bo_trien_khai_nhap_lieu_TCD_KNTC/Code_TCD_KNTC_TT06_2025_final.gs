/****************************************
 * Code.gs - Đồng bộ 06 biểu TT06/2025 (v7.2)
 * Tối ưu hiệu năng:
 * - Cache Spreadsheet/Sheet/metadata trong 1 lần chạy
 * - Đọc header theo mảng thay vì quét từng ô
 * - Không mở Spreadsheet lặp lại nhiều lần
 * - Không dò cấu trúc 6 sheet bằng hàng nghìn getRange() nữa
 * - POST tự xác thực đơn vị, HTML không cần gọi debugUnit trước khi gửi
 ****************************************/

const SPREADSHEET_ID = '1dqqF8WmFHRKvPuE4P17ro1XLi7WO9MRc3eZg04bVHuc';

const FORM_SHEETS = {
  tcd: 'BC_01_TCD',
  xld: 'BC_02_XLD',
  gqkn: 'BC_03_GQKN',
  gqtc: 'BC_04_GQTC',
  kqth: 'BC_05_KQTH',
  qlkntc: 'BC_06_QLKNTC'
};

const UNIT_SHEET = 'DM_DON_VI';

var __CTX = {
  ss: null,
  sheets: {},
  formMeta: {},
  dmMeta: null,
  rowMaps: {}
};

var __TRACE = null;


function doGet(e) {
  resetContext_();
  startTrace_('doGet');
  try {
    const action = cleanString_((e && e.parameter && e.parameter.action) || 'ping');
    traceStep_('request.action', { action: action });

    if (action === 'getSubmission') {
      const unitCode = cleanString_((e.parameter || {}).unitCode || '');
      if (!unitCode) return jsonResponse_(false, 'Thiếu unitCode.');
      traceStep_('getSubmission.unitCode', { unitCode: unitCode });
      const debug = debugUnitInternal_(unitCode);
      if (!debug.found) return jsonResponse_(false, debug.message, { unitName: debug.unitName || '' });

      const payload = getSubmission_(unitCode);
      traceStep_('getSubmission.payloadReady', { unitCode: unitCode });
      return jsonResponse_(true, 'Đã lấy dữ liệu đơn vị.', {
        unitName: debug.unitName || '',
        payload: payload
      });
    }

    if (action === 'debugUnit') {
      const unitCode = cleanString_((e.parameter || {}).unitCode || '');
      if (!unitCode) return jsonResponse_(false, 'Thiếu unitCode.');
      traceStep_('debugUnit.unitCode', { unitCode: unitCode });
      const debug = debugUnitInternal_(unitCode);
      return jsonResponse_(debug.found, debug.message, {
        unitName: debug.unitName || '',
        found: debug.found,
        dmRow: debug.dmRow || 0
      });
    }

    return jsonResponse_(true, 'Apps Script 06 biểu TCD/KNTC v7.2 đang hoạt động.');
  } catch (err) {
    traceError_(err);
    return jsonResponse_(false, err && err.message ? err.message : String(err));
  }
}

function doPost(e) {
  resetContext_();
  startTrace_('doPost');
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('Không có dữ liệu gửi lên.');
    }
    traceStep_('post.received', { contentLength: String(e.postData.contents || '').length });

    const payload = parseIncomingPayload_(e.postData.contents);
    traceStep_('post.parsed');
    validatePayload_(payload);
    traceStep_('post.validated', { unitCode: cleanString_(payload.meta.unitCode) });

    ensureWorkbookStructure_();
    traceStep_('workbook.structureReady');

    const unitCode = cleanString_(payload.meta.unitCode);
    const debug = debugUnitInternal_(unitCode);
    if (!debug.found) throw new Error(debug.message || 'Không nhận diện được đơn vị.');
    traceStep_('unit.identified', { unitCode: unitCode, dmRow: debug.dmRow || 0, unitName: debug.unitName || '' });

    Object.keys(FORM_SHEETS).forEach(function(formKey) {
      writeFormData_(FORM_SHEETS[formKey], unitCode, payload[formKey] || {});
      traceStep_('write.' + formKey, { sheet: FORM_SHEETS[formKey] });
    });

    updateDmRow_(debug.dmRow, payload.meta, getDmMeta_());
    traceStep_('dm.updated', { row: debug.dmRow || 0 });

    return jsonResponse_(true, 'Ghi dữ liệu thành công.', {
      unitName: debug.unitName || ''
    });
  } catch (err) {
    traceError_(err);
    return jsonResponse_(false, err && err.message ? err.message : String(err));
  }
}

function resetContext_() {
  __CTX = { ss: null, sheets: {}, formMeta: {}, dmMeta: null, rowMaps: {} };
  __TRACE = null;
}

function startTrace_(entryPoint) {
  __TRACE = {
    entryPoint: entryPoint || '',
    startedAt: new Date(),
    steps: []
  };
  traceStep_('start', { entryPoint: entryPoint || '' });
}

function traceStep_(name, data) {
  if (!__TRACE) return;
  const now = new Date();
  __TRACE.steps.push({
    step: name || '',
    at: Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss.SSS'),
    elapsedMs: now.getTime() - __TRACE.startedAt.getTime(),
    data: data || {}
  });
}

function traceError_(err) {
  traceStep_('error', { message: err && err.message ? err.message : String(err) });
}

function buildTraceSummary_() {
  if (!__TRACE) return { durationMs: 0, trace: [] };
  const endedAt = new Date();
  const durationMs = endedAt.getTime() - __TRACE.startedAt.getTime();
  const trace = __TRACE.steps.map(function(item, idx) {
    const prevElapsed = idx > 0 ? (__TRACE.steps[idx - 1].elapsedMs || 0) : 0;
    return {
      step: item.step,
      at: item.at,
      elapsedMs: item.elapsedMs,
      deltaMs: item.elapsedMs - prevElapsed,
      data: item.data || {}
    };
  });
  return {
    durationMs: durationMs,
    trace: trace
  };
}

function parseIncomingPayload_(contents) {
  try {
    return JSON.parse(contents);
  } catch (err) {
    throw new Error('Payload không hợp lệ.');
  }
}

function validatePayload_(payload) {
  if (!payload || typeof payload !== 'object') throw new Error('Payload không hợp lệ.');
  if (!payload.meta || typeof payload.meta !== 'object') throw new Error('Thiếu meta.');
  if (!cleanString_(payload.meta.unitCode)) throw new Error('Chưa chọn đơn vị.');
  if (!cleanString_(payload.meta.contactName)) throw new Error('Chưa nhập tên người nhập.');
  if (!cleanString_(payload.meta.contactPhone)) throw new Error('Chưa nhập số điện thoại.');
}

function getSubmission_(unitCode) {
  const dmMeta = getDmMeta_();
  const payload = {
    meta: {
      unitCode: unitCode || '',
      unitName: '',
      contactName: '',
      contactPhone: '',
      note: ''
    }
  };

  Object.keys(FORM_SHEETS).forEach(function(formKey) {
    payload[formKey] = {};
    const cfg = getFormMeta_(FORM_SHEETS[formKey]);
    for (var i = 1; i <= cfg.count; i++) payload[formKey][String(i)] = '';
    payload[formKey].note = '';
  });

  const dmRow = findRowByValue_(UNIT_SHEET, dmMeta.dataStartRow, dmMeta.codeCol, unitCode);
  if (!dmRow) return payload;

  const dmSh = getSheet_(UNIT_SHEET);
  const dmRowValues = dmSh.getRange(dmRow, 1, 1, dmSh.getLastColumn()).getDisplayValues()[0];
  payload.meta.unitName = cleanString_(dmRowValues[dmMeta.nameCol - 1]);
  if (dmMeta.contactCol) payload.meta.contactName = cleanString_(dmRowValues[dmMeta.contactCol - 1]);
  if (dmMeta.phoneCol) payload.meta.contactPhone = cleanString_(dmRowValues[dmMeta.phoneCol - 1]);
  if (dmMeta.noteCol) payload.meta.note = cleanString_(dmRowValues[dmMeta.noteCol - 1]);

  Object.keys(FORM_SHEETS).forEach(function(formKey) {
    const sheetName = FORM_SHEETS[formKey];
    const cfg = getFormMeta_(sheetName);
    const row = findRowByValue_(sheetName, cfg.dataStartRow, cfg.unitCodeCol, unitCode, cfg.totalRow - 1);
    if (!row) return;

    const width = cfg.noteCol ? (cfg.noteCol - cfg.dataStartCol + 1) : cfg.count;
    const rowValues = getSheet_(sheetName).getRange(row, cfg.dataStartCol, 1, width).getValues()[0];
    for (var i = 1; i <= cfg.count; i++) {
      payload[formKey][String(i)] = rowValues[i - 1] === '' ? '' : rowValues[i - 1];
    }
    if (cfg.noteCol) payload[formKey].note = cleanString_(rowValues[width - 1]);
  });

  return payload;
}

function writeFormData_(sheetName, unitCode, formData) {
  const sh = getSheet_(sheetName);
  const cfg = getFormMeta_(sheetName);
  const row = findRowByValue_(sheetName, cfg.dataStartRow, cfg.unitCodeCol, unitCode, cfg.totalRow - 1);
  if (!row) throw new Error('Không tìm thấy đơn vị ' + unitCode + ' trong sheet ' + sheetName);

  const values = [];
  for (var i = 1; i <= cfg.count; i++) values.push(normalizeNumber_(formData[String(i)]));
  sh.getRange(row, cfg.dataStartCol, 1, cfg.count).setValues([values]);
  if (cfg.noteCol) sh.getRange(row, cfg.noteCol).setValue(cleanString_(formData.note || ''));
}

function updateDmRow_(row, meta, dmMeta) {
  const sh = getSheet_(UNIT_SHEET);
  const lastCol = sh.getLastColumn();
  const rowValues = sh.getRange(row, 1, 1, lastCol).getValues()[0];

  if (dmMeta.contactCol) rowValues[dmMeta.contactCol - 1] = cleanString_(meta.contactName || '');
  if (dmMeta.phoneCol) rowValues[dmMeta.phoneCol - 1] = cleanString_(meta.contactPhone || '');
  if (dmMeta.statusCol) rowValues[dmMeta.statusCol - 1] = 'Đã nộp';
  if (dmMeta.updatedAtCol) rowValues[dmMeta.updatedAtCol - 1] = nowText_();
  if (dmMeta.noteCol) rowValues[dmMeta.noteCol - 1] = cleanString_(meta.note || '');

  sh.getRange(row, 1, 1, lastCol).setValues([rowValues]);
  if (dmMeta.phoneCol) sh.getRange(row, dmMeta.phoneCol).setNumberFormat('@');
}

function debugUnitInternal_(unitCode) {
  const dmMeta = getDmMeta_();
  const dmRow = findRowByValue_(UNIT_SHEET, dmMeta.dataStartRow, dmMeta.codeCol, unitCode);
  if (!dmRow) {
    return {
      found: false,
      unitName: '',
      dmRow: 0,
      message: 'Không nhận diện được đơn vị. Không tìm thấy mã đơn vị trong DM_DON_VI: ' + unitCode
    };
  }
  const unitName = cleanString_(getSheet_(UNIT_SHEET).getRange(dmRow, dmMeta.nameCol).getDisplayValue());
  return {
    found: true,
    unitName: unitName,
    dmRow: dmRow,
    message: 'Đã nhận diện đơn vị.'
  };
}

function ensureWorkbookStructure_() {
  getDmMeta_();
  Object.keys(FORM_SHEETS).forEach(function(formKey) {
    ensureHeaders_(FORM_SHEETS[formKey]);
  });
}

function ensureHeaders_(sheetName) {
  const cfg = getFormMeta_(sheetName);
  if (!cfg.count || cfg.count < 1) {
    throw new Error('Cấu trúc sheet ' + sheetName + ' không hợp lệ: không xác định được cột dữ liệu.');
  }
  return cfg;
}

function getFormMeta_(sheetName) {
  if (__CTX.formMeta[sheetName]) return __CTX.formMeta[sheetName];

  const sh = getSheet_(sheetName);
  if (!sh) throw new Error('Không tìm thấy sheet ' + sheetName);

  const lastRow = sh.getLastRow();
  const lastCol = sh.getLastColumn();
  const headerScanRows = Math.min(12, lastRow);
  const headerScanCols = Math.min(lastCol, 80);
  const headerVals = sh.getRange(1, 1, headerScanRows, headerScanCols).getDisplayValues();

  let unitCodeCol = 2;
  let noteCol = 0;
  let msRow = 0;
  let totalRow = 0;

  for (var r = 0; r < headerVals.length; r++) {
    for (var c = 0; c < headerVals[r].length; c++) {
      const v = cleanString_(headerVals[r][c]);
      if (v === 'Mã đơn vị') unitCodeCol = c + 1;
      if (v === 'Ghi chú') noteCol = c + 1;
      if (v === 'MS') msRow = r + 1;
    }
  }

  const col3Values = lastRow > 0 ? sh.getRange(1, 3, lastRow, 1).getDisplayValues() : [];
  for (var i = 0; i < col3Values.length; i++) {
    const v3 = cleanString_(col3Values[i][0]);
    if (v3 === 'MS') msRow = i + 1;
    if (v3 === 'TỔNG CỘNG') totalRow = i + 1;
  }

  if (!msRow) throw new Error('Không xác định được dòng MS của sheet ' + sheetName);
  if (!totalRow) throw new Error('Không xác định được dòng TỔNG CỘNG của sheet ' + sheetName);
  if (!noteCol) noteCol = lastCol;

  const dataStartCol = unitCodeCol + 2;
  let count = 0;
  if (noteCol > dataStartCol) {
    const msValues = sh.getRange(msRow, dataStartCol, 1, noteCol - dataStartCol).getDisplayValues()[0];
    for (var cc = 0; cc < msValues.length; cc++) {
      if (cleanString_(msValues[cc]) !== '') count++;
    }
  }

  __CTX.formMeta[sheetName] = {
    unitCodeCol: unitCodeCol,
    dataStartCol: dataStartCol,
    noteCol: noteCol,
    msRow: msRow,
    dataStartRow: msRow + 1,
    totalRow: totalRow,
    count: count
  };
  return __CTX.formMeta[sheetName];
}

function getDmMeta_() {
  if (__CTX.dmMeta) return __CTX.dmMeta;

  const sh = getSheet_(UNIT_SHEET);
  if (!sh) throw new Error('Không tìm thấy sheet ' + UNIT_SHEET);

  const headerRow = 2;
  const headers = sh.getRange(headerRow, 1, 1, sh.getLastColumn()).getDisplayValues()[0].map(cleanString_);
  const idx = function(name) {
    const p = headers.indexOf(name);
    return p >= 0 ? p + 1 : 0;
  };

  __CTX.dmMeta = {
    dataStartRow: headerRow + 1,
    sttCol: idx('STT'),
    codeCol: idx('Mã đơn vị') || 2,
    nameCol: idx('Đơn vị') || 3,
    contactCol: idx('Đầu mối'),
    phoneCol: idx('Điện thoại'),
    statusCol: idx('Trạng thái nộp'),
    updatedAtCol: idx('Cập nhật gần nhất'),
    noteCol: idx('Ghi chú') || (headers.length >= 8 ? 8 : 0)
  };
  return __CTX.dmMeta;
}

function findRowByValue_(sheetName, startRow, col, target, endRow) {
  const map = getRowMap_(sheetName, startRow, col, endRow);
  const row = map[cleanString_(target)];
  return row || 0;
}

function getRowMap_(sheetName, startRow, col, endRow) {
  const key = [sheetName, startRow, col, endRow || ''].join('|');
  if (__CTX.rowMaps[key]) return __CTX.rowMaps[key];

  const sh = getSheet_(sheetName);
  const lastRow = endRow || sh.getLastRow();
  const map = {};
  if (lastRow >= startRow) {
    const values = sh.getRange(startRow, col, lastRow - startRow + 1, 1).getDisplayValues();
    for (var i = 0; i < values.length; i++) {
      const k = cleanString_(values[i][0]);
      if (k) map[k] = startRow + i;
    }
  }
  __CTX.rowMaps[key] = map;
  return map;
}

function getSpreadsheet_() {
  if (!__CTX.ss) __CTX.ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  return __CTX.ss;
}

function getSheet_(sheetName) {
  if (!__CTX.sheets[sheetName]) {
    __CTX.sheets[sheetName] = getSpreadsheet_().getSheetByName(sheetName);
  }
  return __CTX.sheets[sheetName];
}

function normalizeNumber_(v) {
  if (v === '' || v === null || typeof v === 'undefined') return '';
  if (typeof v === 'number') return v;

  let s = String(v).trim();
  if (!s) return '';
  s = s.replace(/\s+/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.');
  const n = Number(s);
  return isNaN(n) ? '' : n;
}

function cleanString_(v) {
  return String(v == null ? '' : v).trim();
}

function nowText_() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
}

function jsonResponse_(success, message, extra) {
  const traceInfo = buildTraceSummary_();
  const payload = Object.assign({
    success: !!success,
    message: message || '',
    spreadsheetId: SPREADSHEET_ID,
    serverTime: nowText_(),
    unitName: '',
    durationMs: traceInfo.durationMs,
    trace: traceInfo.trace
  }, extra || {});
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
