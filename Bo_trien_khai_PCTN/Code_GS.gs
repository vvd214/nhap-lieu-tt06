/**
 * =========================
 * CODE.GS - BẢN CHÚ THÍCH
 * Hệ thống nhập liệu 03 biểu PCTN theo TT 06/2025/TT-TTCP
 * =========================
 *
 * MỤC ĐÍCH
 * - Nhận dữ liệu từ file HTML nhập liệu.
 * - Ghi dữ liệu vào 03 sheet dữ liệu thô:
 *   + 01_PCTN_DATA
 *   + 02_PCTN_RAW
 *   + 03_PCTN_RAW
 * - Đồng bộ trạng thái đơn vị tại sheet DM_DON_VI.
 * - Hỗ trợ lấy lại dữ liệu đơn vị đã nhập để chỉnh sửa.
 *
 * LƯU Ý QUAN TRỌNG
 * - Bản này đã bỏ hoàn toàn:
 *   + PARENT_AREA khỏi Biểu 01
 *   + CONTACT_TITLE khỏi Biểu 01
 * - Số điện thoại luôn được chuẩn hóa và ghi dạng text để giữ số 0 đầu.
 * - File HTML và file Excel phải dùng đúng cùng bộ để tránh lệch cột.
 */

/* =========================================================
 * 1) CẤU HÌNH CHUNG
 * =========================================================
 * Chỉ cần sửa SPREADSHEET_ID nếu đổi file Google Sheet đích.
 * Các tên sheet bên dưới phải khớp đúng với workbook triển khai.
 */
const SPREADSHEET_ID = '1m5OpHYdYqciNDXOx6pVmezOjRnfoop88Od7Ys05qA6A';
const SHEET_DONVI = 'DM_DON_VI';
const SHEET_P01 = '01_PCTN_DATA';
const SHEET_P02 = '02_PCTN_RAW';
const SHEET_P03 = '03_PCTN_RAW';

/**
 * Bật/tắt log kỹ thuật trong Logger của Apps Script.
 * - false: chạy thực tế, ít log.
 * - true : dùng khi cần dò lỗi.
 */
const DEBUG_MODE = false;

/* =========================================================
 * 2) HEADER CHUẨN CỦA CÁC SHEET DỮ LIỆU
 * =========================================================
 * ensureHeaders_() sẽ luôn so hàng tiêu đề thực tế với mảng này.
 * Nếu khác, script sẽ tự ghi lại đúng header ở dòng 3.
 *
 * LƯU Ý:
 * - P01_HEADERS đã bỏ PARENT_AREA và CONTACT_TITLE.
 * - P02, P03 vẫn giữ các cột cần thiết cho dữ liệu chi tiết.
 */
const P01_HEADERS = ["UNIT_CODE", "UNIT_NAME", "UNIT_GROUP", "CONTACT_NAME", "CONTACT_PHONE", "NOTE", "UPDATED_AT", "P01_1", "P01_2", "P01_3", "P01_4", "P01_5", "P01_6", "P01_7", "P01_8", "P01_9", "P01_10", "P01_11", "P01_12", "P01_13", "P01_14", "P01_15", "P01_16", "P01_17", "P01_18", "P01_19", "P01_20", "P01_21", "P01_22", "P01_23", "P01_24", "P01_25", "P01_26", "P01_27", "P01_28", "P01_29", "P01_30", "P01_31", "P01_32", "P01_33", "P01_34", "P01_35", "P01_36", "P01_37", "P01_38", "P01_39", "P01_40", "P01_41", "P01_42", "P01_43", "P01_43_1", "P01_43_2", "P01_44", "P01_45", "P01_46", "P01_47", "P01_48", "P01_49", "P01_50", "P01_51", "P01_52", "P01_52A", "P01_53", "P01_53A", "P01_54", "P01_55", "P01_56", "P01_57", "P01_58", "P01_59", "P01_60", "P01_61", "P01_62", "P01_63", "P01_64", "P01_65", "P01_66", "P01_67", "P01_68", "P01_69", "P01_70", "P01_71", "P01_72", "P01_73", "P01_74", "P01_75", "P01_76", "P01_77", "P01_78", "P01_79", "P01_80", "P01_81", "P01_82", "P01_82_1", "P01_82_2", "P01_82_3", "P01_83", "P01_84", "P01_84_1", "P01_84_2", "P01_84_3", "P01_84_4", "P01_85", "P01_86", "P01_87", "P01_88", "P01_89", "P01_90", "P01_91", "P01_91_1", "P01_91_2", "P01_92", "P01_92_1", "P01_92_2", "P01_93", "P01_94", "P01_95", "P01_96", "P01_97", "P01_98", "P01_99", "P01_100", "P01_101", "P01_102", "P01_103", "P01_104", "P01_105", "P01_106", "P01_107", "P01_108"];
const P02_HEADERS = ["UNIT_CODE", "UNIT_NAME", "UNIT_LEVEL", "UNIT_GROUP", "PARENT_AREA", "CONTACT_NAME", "CONTACT_TITLE", "CONTACT_PHONE", "UPDATED_AT", "STT", "TEN_VU", "TEN_CO_QUAN", "CO_QUAN_THU_LY", "TOM_TAT", "GHI_CHU"];
const P03_HEADERS = ["UNIT_CODE", "UNIT_NAME", "UNIT_LEVEL", "UNIT_GROUP", "PARENT_AREA", "CONTACT_NAME", "CONTACT_TITLE", "CONTACT_PHONE", "UPDATED_AT", "STT", "TEN_SO_NGAY_VB", "CO_QUAN_BAN_HANH", "NOI_DUNG_SO_HO", "DA_KHAC_PHUC", "CHUA_KHAC_PHUC", "NGUYEN_NHAN_CHUA", "GHI_CHU"];

/* =========================================================
 * 3) ĐIỂM VÀO WEB APP
 * =========================================================
 * doGet:
 * - Kiểm tra web app đang chạy.
 * - Lấy dữ liệu cũ của 1 đơn vị để đổ ngược ra HTML.
 * - Dò thông tin đơn vị khi debug.
 *
 * doPost:
 * - Nhận payload JSON từ HTML.
 * - Chuẩn hóa dữ liệu.
 * - Kiểm tra hợp lệ.
 * - Đối chiếu danh mục đơn vị.
 * - Ghi vào 03 sheet dữ liệu.
 * - Cập nhật DM_DON_VI.
 */
function doGet(e) {
  try {
    const action = e && e.parameter ? trimSafe_(e.parameter.action) : '';

    // Chế độ debug nhanh: kiểm tra nhận diện đơn vị từ DM_DON_VI.
    if (action === 'debugUnit') {
      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const sheetDonVi = getOrCreateSheet_(ss, SHEET_DONVI);
      const unitCode = trimSafe_(e.parameter.unitCode);
      const unitName = trimSafe_(e.parameter.unitName);
      const unitInfo = getUnitInfoSafe_(sheetDonVi, unitCode, unitName);
      return jsonOutput_({
        success: true,
        action: 'debugUnit',
        input: { unitCode: unitCode, unitName: unitName },
        result: unitInfo
      });
    }

    // Chế độ lấy dữ liệu đã nộp của đơn vị để người dùng sửa tiếp.
    if (action === 'getSubmission') {
      const unitCode = trimSafe_(e.parameter.unitCode);
      const unitName = trimSafe_(e.parameter.unitName);
      if (!unitCode && !unitName) throw new Error('Thiếu mã đơn vị hoặc tên đơn vị.');

      const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      const payload = getExistingSubmission_(ss, unitCode, unitName);
      return jsonOutput_(payload);
    }

    // Trạng thái mặc định khi mở web app.
    return jsonOutput_({
      success: true,
      message: 'Apps Script 03 biểu PCTN đang hoạt động.',
      spreadsheetId: SPREADSHEET_ID,
      debugMode: DEBUG_MODE
    });
  } catch (error) {
    debugLog_('doGet.error', { message: getErrorMessage_(error), stack: getErrorStack_(error) });
    return jsonOutput_({
      success: false,
      message: getErrorMessage_(error)
    });
  }
}

function doPost(e) {
  try {
    // 1. Kiểm tra có dữ liệu POST gửi lên hay không.
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('Không nhận được dữ liệu POST.');
    }

    // 2. Parse JSON từ file HTML gửi sang.
    const payload = JSON.parse(e.postData.contents);

    // 3. Chuẩn hóa dữ liệu đầu vào để tránh lệch cột, lệch định dạng.
    normalizePayload_(payload);

    // 4. Kiểm tra dữ liệu bắt buộc.
    validatePayload_(payload);

    debugLog_('doPost.payload.meta', payload.meta);

    // 5. Mở Google Sheet đích và lấy các sheet cần dùng.
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheetDonVi = getOrCreateSheet_(ss, SHEET_DONVI);
    const sheetP01 = getOrCreateSheet_(ss, SHEET_P01);
    const sheetP02 = getOrCreateSheet_(ss, SHEET_P02);
    const sheetP03 = getOrCreateSheet_(ss, SHEET_P03);

    // 6. Cưỡng bức đúng header theo cấu trúc chuẩn.
    ensureHeaders_(sheetP01, P01_HEADERS);
    ensureHeaders_(sheetP02, P02_HEADERS);
    ensureHeaders_(sheetP03, P03_HEADERS);

    // 7. Đối chiếu với danh mục đơn vị.
    const unitInfo = getUnitInfoSafe_(sheetDonVi, payload.meta.unitCode, payload.meta.unitName);
    payload.meta.unitInfo = unitInfo;

    debugLog_('doPost.unit.match', {
      inputUnitCode: payload.meta.unitCode,
      inputUnitName: payload.meta.unitName,
      matched: unitInfo
    });

    // 8. Nếu không nhận diện được đơn vị thì dừng để tránh ghi sai dữ liệu.
    if (!unitInfo.recognized) {
      throw new Error(
        'Hệ thống không nhận diện được tên cơ quan, đơn vị. ' +
        'Mã gửi lên: [' + (payload.meta.unitCode || '') + ']; ' +
        'Tên gửi lên: [' + (payload.meta.unitName || '') + ']. ' +
        'Vui lòng kiểm tra lại danh mục sheet ' + SHEET_DONVI + ' hoặc tên đơn vị trong HTML.'
      );
    }

    // 9. Ghi Biểu 01 theo cơ chế upsert: có thì cập nhật, chưa có thì thêm mới.
    upsertP01_(sheetP01, payload);

    // 10. Ghi Biểu 02 và 03 theo cơ chế replace toàn bộ dòng chi tiết của đơn vị.
    replaceDetailRows_(sheetP02, payload, 'p02', P02_HEADERS);
    replaceDetailRows_(sheetP03, payload, 'p03', P03_HEADERS);

    // 11. Cập nhật trạng thái nộp và đầu mối ở DM_DON_VI.
    updateOrAppendDonViStatus_(sheetDonVi, payload);

    SpreadsheetApp.flush();

    return jsonOutput_({
      success: true,
      message: 'Ghi dữ liệu thành công.',
      recognizedUnit: true,
      unitCode: unitInfo.unitCode || payload.meta.unitCode || '',
      unitName: unitInfo.unitName || payload.meta.unitName || '',
      unitLevel: unitInfo.unitLevel || '',
      unitGroup: unitInfo.unitGroup || '',
      serverTime: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss')
    });
  } catch (error) {
    debugLog_('doPost.error', {
      message: getErrorMessage_(error),
      stack: getErrorStack_(error)
    });
    return jsonOutput_({
      success: false,
      message: getErrorMessage_(error)
    });
  }
}

/* =========================================================
 * 4) HÀM TRẢ JSON CHO HTML
 * ========================================================= */
function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* =========================================================
 * 5) HÀM LẤY SHEET, NẾU CHƯA CÓ THÌ TẠO
 * ========================================================= */
function getOrCreateSheet_(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

/* =========================================================
 * 6) CHUẨN HÓA PAYLOAD TỪ HTML
 * =========================================================
 * Mục tiêu:
 * - Ép đủ cấu trúc meta / p01 / p02 / p03.
 * - Xóa các trường cũ không còn dùng.
 * - Chuẩn hóa số điện thoại.
 *
 * RẤT QUAN TRỌNG:
 * - delete payload.meta.contactTitle
 * - delete payload.meta.unitParent
 * Hai dòng này giúp chặn triệt để việc lệch cột sau khi bỏ
 * CONTACT_TITLE và PARENT_AREA khỏi Biểu 01.
 */
function normalizePayload_(payload) {
  if (!payload.meta) payload.meta = {};
  if (!payload.p01) payload.p01 = {};
  if (!Array.isArray(payload.p02)) payload.p02 = [];
  if (!Array.isArray(payload.p03)) payload.p03 = [];

  payload.meta.unitCode = trimSafe_(payload.meta.unitCode);
  payload.meta.unitName = trimSafe_(payload.meta.unitName);
  payload.meta.contactName = trimSafe_(payload.meta.contactName);
  payload.meta.contactPhone = normalizePhone_(payload.meta.contactPhone);
  payload.meta.note = trimSafe_(payload.meta.note);

  // Loại bỏ các trường cũ không còn sử dụng.
  delete payload.meta.contactTitle;
  delete payload.meta.unitParent;
}

/* =========================================================
 * 7) KIỂM TRA DỮ LIỆU BẮT BUỘC
 * ========================================================= */
function validatePayload_(payload) {
  if (!payload || !payload.meta) throw new Error('Thiếu payload.');
  if (!payload.meta.unitName && !payload.meta.unitCode) throw new Error('Thiếu mã đơn vị hoặc tên đơn vị.');
  if (!payload.meta.contactName) throw new Error('Thiếu người nhập.');
  if (!payload.meta.contactPhone) throw new Error('Thiếu số điện thoại.');

  // Phải có ít nhất dữ liệu ở 1 trong 3 biểu.
  const hasData = Object.keys(payload.p01 || {}).length > 0 || (payload.p02 || []).length > 0 || (payload.p03 || []).length > 0;
  if (!hasData) throw new Error('Chưa có dữ liệu để gửi.');
}

/* =========================================================
 * 8) ĐỒNG BỘ HÀNG HEADER CỦA SHEET
 * =========================================================
 * Mặc định bộ này dùng hàng 3 làm hàng tiêu đề dữ liệu.
 */
function ensureHeaders_(sheet, headers) {
  const targetRow = 3;
  const existing = sheet.getRange(targetRow, 1, 1, headers.length).getValues()[0];
  const mismatch = headers.some(function(h, i) {
    return String(existing[i] || '') !== h;
  });
  if (mismatch) {
    sheet.getRange(targetRow, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(targetRow);
  }
}

/* =========================================================
 * 9) CÁC HÀM LÀM SẠCH CHUỖI
 * ========================================================= */
function trimSafe_(value) {
  return String(value || '').replace(/[ \t\r\n]+/g, ' ').trim();
}

function normalizePhone_(value) {
  return trimSafe_(value).replace(/\s+/g, '');
}

/**
 * Ghi số điện thoại dạng text để giữ số 0 đầu.
 * Ví dụ 0912345678 sẽ được ghi thành '0912345678
 */
function asTextPhone_(value) {
  const phone = normalizePhone_(value);
  return phone ? ("'" + phone) : '';
}

/* =========================================================
 * 10) HÀM CHUẨN HÓA TEXT ĐỂ SO KHỚP KHÔNG DẤU
 * =========================================================
 * Dùng khi:
 * - tìm đơn vị trong DM_DON_VI
 * - so khớp tên đơn vị nhập từ HTML
 */
function normalizeText_(value) {
  return trimSafe_(value)
    .replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴàáạảãâầấậẩẫăằắặẳẵ]/g, function(ch){return mapAccent_(ch);})
    .replace(/[ÈÉẸẺẼÊỀẾỆỂỄèéẹẻẽêềếệểễ]/g, function(ch){return mapAccent_(ch);})
    .replace(/[ÌÍỊỈĨìíịỉĩ]/g, function(ch){return mapAccent_(ch);})
    .replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠòóọỏõôồốộổỗơờớợởỡ]/g, function(ch){return mapAccent_(ch);})
    .replace(/[ÙÚỤỦŨƯỪỨỰỬỮùúụủũưừứựửữ]/g, function(ch){return mapAccent_(ch);})
    .replace(/[ỲÝỴỶỸỳýỵỷỹ]/g, function(ch){return mapAccent_(ch);})
    .replace(/[Đđ]/g, function(ch){return mapAccent_(ch);})
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

function mapAccent_(ch) {
  const m = {
    'À':'A','Á':'A','Ạ':'A','Ả':'A','Ã':'A','Â':'A','Ầ':'A','Ấ':'A','Ậ':'A','Ẩ':'A','Ẫ':'A','Ă':'A','Ằ':'A','Ắ':'A','Ặ':'A','Ẳ':'A','Ẵ':'A',
    'à':'a','á':'a','ạ':'a','ả':'a','ã':'a','â':'a','ầ':'a','ấ':'a','ậ':'a','ẩ':'a','ẫ':'a','ă':'a','ằ':'a','ắ':'a','ặ':'a','ẳ':'a','ẵ':'a',
    'È':'E','É':'E','Ẹ':'E','Ẻ':'E','Ẽ':'E','Ê':'E','Ề':'E','Ế':'E','Ệ':'E','Ể':'E','Ễ':'E','è':'e','é':'e','ẹ':'e','ẻ':'e','ẽ':'e','ê':'e','ề':'e','ế':'e','ệ':'e','ể':'e','ễ':'e',
    'Ì':'I','Í':'I','Ị':'I','Ỉ':'I','Ĩ':'I','ì':'i','í':'i','ị':'i','ỉ':'i','ĩ':'i',
    'Ò':'O','Ó':'O','Ọ':'O','Ỏ':'O','Õ':'O','Ô':'O','Ồ':'O','Ố':'O','Ộ':'O','Ổ':'O','Ỗ':'O','Ơ':'O','Ờ':'O','Ớ':'O','Ợ':'O','Ở':'O','Ỡ':'O',
    'ò':'o','ó':'o','ọ':'o','ỏ':'o','õ':'o','ô':'o','ồ':'o','ố':'o','ộ':'o','ổ':'o','ỗ':'o','ơ':'o','ờ':'o','ớ':'o','ợ':'o','ở':'o','ỡ':'o',
    'Ù':'U','Ú':'U','Ụ':'U','Ủ':'U','Ũ':'U','Ư':'U','Ừ':'U','Ứ':'U','Ự':'U','Ử':'U','Ữ':'U','ù':'u','ú':'u','ụ':'u','ủ':'u','ũ':'u','ư':'u','ừ':'u','ứ':'u','ự':'u','ử':'u','ữ':'u',
    'Ỳ':'Y','Ý':'Y','Ỵ':'Y','Ỷ':'Y','Ỹ':'Y','ỳ':'y','ý':'y','ỵ':'y','ỷ':'y','ỹ':'y',
    'Đ':'D','đ':'d'
  };
  return m[ch] || ch;
}

/* =========================================================
 * 11) SUY LUẬN THÔNG TIN ĐƠN VỊ KHI THIẾU
 * =========================================================
 * Chỉ là fallback, không thay thế việc đối chiếu danh mục.
 */
function inferUnitLevel_(unitName) {
  const n = normalizeText_(unitName);
  if (!n) return '';
  if (n.indexOf('phuong ') === 0 || n.indexOf('xa ') === 0 || n.indexOf('thi tran ') === 0) return 'Cấp xã';
  return 'Cấp tỉnh';
}

function inferUnitGroup_(unitName, unitLevel) {
  if (unitLevel === 'Cấp xã') return 'UBND cấp xã';
  return 'Sở, ban, ngành';
}

/* =========================================================
 * 12) DÒ HÀNG HEADER CỦA SHEET DM_DON_VI
 * =========================================================
 * Hỗ trợ các trường hợp tên cột ở hàng 1-10.
 * Script sẽ tự dò cột:
 * - STT
 * - Mã đơn vị
 * - Đơn vị
 * - Cấp đơn vị
 * - Nhóm/khối
 * - Địa bàn/đơn vị chủ quản
 */
function findHeaderRowAndMap_(sheet) {
  if (!sheet) return null;
  const maxRow = Math.min(sheet.getLastRow(), 10);
  const maxCol = Math.max(sheet.getLastColumn(), 6);
  if (maxRow < 1 || maxCol < 1) return null;

  for (let r = 1; r <= maxRow; r++) {
    const vals = sheet.getRange(r, 1, 1, maxCol).getValues()[0].map(function(v) { return trimSafe_(v); });
    const norm = vals.map(function(v) { return normalizeText_(v); });

    const idxCode = norm.findIndex(function(v) { return v === normalizeText_('Mã đơn vị'); });
    const idxName = norm.findIndex(function(v) { return v === normalizeText_('Đơn vị'); });
    const idxLevel = norm.findIndex(function(v) { return v === normalizeText_('Cấp đơn vị'); });
    const idxGroup = norm.findIndex(function(v) { return v === normalizeText_('Nhóm/khối'); });
    const idxParent = norm.findIndex(function(v) { return v === normalizeText_('Địa bàn/đơn vị chủ quản'); });
    const idxStt = norm.findIndex(function(v) { return v === normalizeText_('STT'); });

    if (idxCode >= 0 && idxName >= 0) {
      return {
        headerRow: r,
        dataStartRow: r + 1,
        colStt: idxStt >= 0 ? idxStt + 1 : 0,
        colCode: idxCode + 1,
        colName: idxName + 1,
        colLevel: idxLevel >= 0 ? idxLevel + 1 : 0,
        colGroup: idxGroup >= 0 ? idxGroup + 1 : 0,
        colParent: idxParent >= 0 ? idxParent + 1 : 0
      };
    }
  }

  return null;
}

/* =========================================================
 * 13) NHẬN DIỆN ĐƠN VỊ TỪ DM_DON_VI
 * =========================================================
 * Cơ chế:
 * - Ưu tiên khớp theo mã đơn vị.
 * - Sau đó khớp chính xác tên đơn vị.
 * - Cuối cùng thử khớp gần đúng.
 */
function getUnitInfoSafe_(sheet, unitCode, unitName) {
  const fallbackLevel = inferUnitLevel_(unitName);
  const fallback = {
    recognized: false,
    stt: '',
    unitCode: trimSafe_(unitCode),
    unitName: trimSafe_(unitName),
    unitLevel: fallbackLevel,
    unitGroup: inferUnitGroup_(unitName, fallbackLevel),
    parentArea: fallbackLevel === 'Cấp xã' ? '' : 'Tỉnh Thanh Hóa'
  };

  if (!sheet) return fallback;

  const map = findHeaderRowAndMap_(sheet);
  debugLog_('DM_DON_VI.headerMap', map);
  if (!map) return fallback;

  const lastRow = sheet.getLastRow();
  if (lastRow < map.dataStartRow) return fallback;

  const width = sheet.getLastColumn();
  const data = sheet.getRange(map.dataStartRow, 1, lastRow - map.dataStartRow + 1, width).getValues();
  const codeNorm = normalizeText_(unitCode);
  const nameNorm = normalizeText_(unitName);

  let found = null;

  if (codeNorm) {
    found = data.find(function(row) {
      return normalizeText_(row[map.colCode - 1]) === codeNorm;
    });
  }

  if (!found && nameNorm) {
    found = data.find(function(row) {
      return normalizeText_(row[map.colName - 1]) === nameNorm;
    });
  }

  if (!found && nameNorm) {
    found = data.find(function(row) {
      const n = normalizeText_(row[map.colName - 1]);
      return n && (n === nameNorm || n.indexOf(nameNorm) >= 0 || nameNorm.indexOf(n) >= 0);
    });
  }

  if (!found) return fallback;

  return {
    recognized: true,
    stt: map.colStt ? trimSafe_(found[map.colStt - 1]) : '',
    unitCode: trimSafe_(found[map.colCode - 1]) || fallback.unitCode,
    unitName: trimSafe_(found[map.colName - 1]) || fallback.unitName,
    unitLevel: map.colLevel ? trimSafe_(found[map.colLevel - 1]) : fallback.unitLevel,
    unitGroup: map.colGroup ? trimSafe_(found[map.colGroup - 1]) : fallback.unitGroup,
    parentArea: map.colParent ? trimSafe_(found[map.colParent - 1]) : fallback.parentArea
  };
}

/* =========================================================
 * 14) TẠO DÒNG DỮ LIỆU BIỂU 01
 * =========================================================
 * Lưu ý:
 * - Chỉ dùng các cột đúng theo P01_HEADERS.
 * - CONTACT_PHONE ghi dạng text.
 * - Không còn PARENT_AREA / CONTACT_TITLE ở Biểu 01.
 */
function buildP01Row_(payload) {
  const unitInfo = payload.meta.unitInfo || {};
  const rowMap = {
    UNIT_CODE: unitInfo.unitCode || payload.meta.unitCode || '',
    UNIT_NAME: unitInfo.unitName || payload.meta.unitName || '',
    UNIT_GROUP: unitInfo.unitGroup || payload.meta.unitGroup || '',
    CONTACT_NAME: payload.meta.contactName || '',
    CONTACT_PHONE: asTextPhone_(payload.meta.contactPhone),
    NOTE: payload.meta.note || '',
    UPDATED_AT: new Date()
  };

  Object.keys(payload.p01 || {}).forEach(function(key) {
    rowMap[key] = payload.p01[key];
  });

  return P01_HEADERS.map(function(h) {
    return typeof rowMap[h] === 'undefined' ? '' : rowMap[h];
  });
}

/* =========================================================
 * 15) TẠO DÒNG CHI TIẾT CHO BIỂU 02 / 03
 * =========================================================
 * Ở Biểu 02 và 03 vẫn giữ unitLevel, unitGroup, parentArea,
 * contactTitle nếu HTML sau này có bổ sung. Tuy nhiên hiện tại
 * contactTitle từ HTML đã bị loại bỏ ở bước normalizePayload_.
 */
function buildDetailRow_(payload, rec, headers) {
  const unitInfo = payload.meta.unitInfo || {};
  const rowObj = {
    UNIT_CODE: unitInfo.unitCode || payload.meta.unitCode || '',
    UNIT_NAME: unitInfo.unitName || payload.meta.unitName || '',
    UNIT_LEVEL: unitInfo.unitLevel || '',
    UNIT_GROUP: unitInfo.unitGroup || '',
    PARENT_AREA: unitInfo.parentArea || '',
    CONTACT_NAME: payload.meta.contactName || '',
    CONTACT_TITLE: payload.meta.contactTitle || '',
    CONTACT_PHONE: asTextPhone_(payload.meta.contactPhone),
    UPDATED_AT: new Date()
  };

  headers.forEach(function(h) {
    if (!(h in rowObj)) rowObj[h] = '';
  });

  Object.keys(rec || {}).forEach(function(k) {
    if (headers.indexOf(k) >= 0) rowObj[k] = rec[k];
  });

  return headers.map(function(h) { return rowObj[h]; });
}

/* =========================================================
 * 16) SO KHỚP DÒNG THEO ĐƠN VỊ
 * ========================================================= */
function rowMatchesUnit_(rowUnitCode, rowUnitName, unitCode, unitName) {
  const inputCode = normalizeText_(unitCode);
  const inputName = normalizeText_(unitName);
  const dataCode = normalizeText_(rowUnitCode);
  const dataName = normalizeText_(rowUnitName);

  if (inputCode && dataCode && inputCode === dataCode) return true;
  if (inputName && dataName && inputName === dataName) return true;
  return false;
}

/* =========================================================
 * 17) TÌM DÒNG ĐƠN VỊ TRONG SHEET BIỂU 01
 * ========================================================= */
function findRowByUnit_(sheet, unitCode, unitName) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 4) return 0;
  const data = sheet.getRange(4, 1, lastRow - 3, 2).getValues();
  for (let i = 0; i < data.length; i++) {
    if (rowMatchesUnit_(data[i][0], data[i][1], unitCode, unitName)) {
      return i + 4;
    }
  }
  return 0;
}

/* =========================================================
 * 18) GHI / CẬP NHẬT BIỂU 01
 * ========================================================= */
function upsertP01_(sheet, payload) {
  const unitInfo = payload.meta.unitInfo || {};
  const row = buildP01Row_(payload);
  const targetRow = findRowByUnit_(sheet, unitInfo.unitCode || payload.meta.unitCode, unitInfo.unitName || payload.meta.unitName);
  if (targetRow > 0) {
    sheet.getRange(targetRow, 1, 1, P01_HEADERS.length).setValues([row]);
  } else {
    const newRow = Math.max(sheet.getLastRow() + 1, 4);
    sheet.getRange(newRow, 1, 1, P01_HEADERS.length).setValues([row]);
  }
}

/* =========================================================
 * 19) XÓA TOÀN BỘ DÒNG CHI TIẾT CŨ CỦA 1 ĐƠN VỊ
 * =========================================================
 * Dùng trước khi ghi lại Biểu 02/03 để tránh dữ liệu cũ còn sót.
 */
function deleteDetailRows_(sheet, unitCode, unitName) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 4) return;
  const data = sheet.getRange(4, 1, lastRow - 3, 2).getValues();
  const rowsToDelete = [];
  for (let i = 0; i < data.length; i++) {
    if (rowMatchesUnit_(data[i][0], data[i][1], unitCode, unitName)) {
      rowsToDelete.push(i + 4);
    }
  }
  rowsToDelete.reverse().forEach(function(r) { sheet.deleteRow(r); });
}

/* =========================================================
 * 20) GHI LẠI BIỂU 02 / 03 THEO CƠ CHẾ REPLACE
 * =========================================================
 * Quy trình:
 * - Xóa toàn bộ bản ghi cũ của đơn vị.
 * - Ghi lại toàn bộ bản ghi mới từ payload.
 */
function replaceDetailRows_(sheet, payload, payloadKey, headers) {
  const unitInfo = payload.meta.unitInfo || {};
  deleteDetailRows_(sheet, unitInfo.unitCode || payload.meta.unitCode, unitInfo.unitName || payload.meta.unitName);
  const records = payload[payloadKey] || [];
  if (!records.length) return;
  const rows = records.map(function(rec) {
    return buildDetailRow_(payload, rec, headers);
  });
  const startRow = Math.max(sheet.getLastRow() + 1, 4);
  sheet.getRange(startRow, 1, rows.length, headers.length).setValues(rows);
}

/* =========================================================
 * 21) CẬP NHẬT DM_DON_VI SAU KHI ĐƠN VỊ GỬI
 * =========================================================
 * Theo yêu cầu mới:
 * - Cột E: Đầu mối
 * - Cột F: Điện thoại (ghi text để giữ số 0 đầu)
 * - Cột G: Trạng thái nộp = Đã nộp
 * - Cột H: Cập nhật gần nhất
 */
function updateOrAppendDonViStatus_(sheet, payload) {
  if (!sheet) return;
  const unitInfo = payload.meta.unitInfo || {};
  const code = unitInfo.unitCode || payload.meta.unitCode || '';
  const name = unitInfo.unitName || payload.meta.unitName || '';
  const level = unitInfo.unitLevel || inferUnitLevel_(name);
  const group = unitInfo.unitGroup || inferUnitGroup_(name, level);
  const phoneText = asTextPhone_(payload.meta.contactPhone);

  const map = findHeaderRowAndMap_(sheet);
  const lastRow = sheet.getLastRow();
  let foundRow = 0;

  if (map && lastRow >= map.dataStartRow) {
    const width = sheet.getLastColumn();
    const data = sheet.getRange(map.dataStartRow, 1, lastRow - map.dataStartRow + 1, width).getValues();
    const codeNorm = normalizeText_(code);
    const nameNorm = normalizeText_(name);
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const rowCode = map.colCode ? normalizeText_(row[map.colCode - 1]) : '';
      const rowName = map.colName ? normalizeText_(row[map.colName - 1]) : '';
      if ((codeNorm && rowCode === codeNorm) || (nameNorm && rowName === nameNorm)) {
        foundRow = i + map.dataStartRow;
        break;
      }
    }
  }

  if (!foundRow) {
    foundRow = Math.max(lastRow + 1, 4);
    const stt = foundRow - 3;
    sheet.getRange(foundRow, 1, 1, 8).setValues([[stt, code, group, name, payload.meta.contactName || '', phoneText, 'Đã nộp', new Date()]]);
  } else {
    if (!trimSafe_(sheet.getRange(foundRow, 2).getValue()) && code) sheet.getRange(foundRow, 2).setValue(code);
    if (!trimSafe_(sheet.getRange(foundRow, 3).getValue()) && group) sheet.getRange(foundRow, 3).setValue(group);
    if (!trimSafe_(sheet.getRange(foundRow, 4).getValue()) && name) sheet.getRange(foundRow, 4).setValue(name);
    sheet.getRange(foundRow, 5).setValue(payload.meta.contactName || '');
    sheet.getRange(foundRow, 6).setValue(phoneText);
    sheet.getRange(foundRow, 7).setValue('Đã nộp');
    sheet.getRange(foundRow, 8).setValue(new Date());
  }
}

/* =========================================================
 * 22) LẤY DỮ LIỆU ĐÃ NỘP ĐỂ ĐƠN VỊ CHỈNH SỬA
 * =========================================================
 * Trả về:
 * - meta
 * - p01
 * - p02
 * - p03
 */
function getExistingSubmission_(ss, unitCode, unitName) {
  const sheetDonVi = getOrCreateSheet_(ss, SHEET_DONVI);
  const unitInfo = getUnitInfoSafe_(sheetDonVi, unitCode, unitName);
  const finalUnitCode = trimSafe_(unitInfo.unitCode || unitCode);
  const finalUnitName = trimSafe_(unitInfo.unitName || unitName);

  const result = {
    success: true,
    found: false,
    recognizedUnit: !!unitInfo.recognized,
    payload: {
      meta: {
        unitCode: finalUnitCode,
        unitName: finalUnitName,
        unitLevel: unitInfo.unitLevel || '',
        unitGroup: unitInfo.unitGroup || '',
        contactName: '',
        contactPhone: '',
        note: '',
      },
      p01: {},
      p02: [],
      p03: []
    },
    updatedAt: ''
  };

  const sheetP01 = getOrCreateSheet_(ss, SHEET_P01);
  const sheetP02 = getOrCreateSheet_(ss, SHEET_P02);
  const sheetP03 = getOrCreateSheet_(ss, SHEET_P03);

  const p01Data = readSheetObjects_(sheetP01, 3);
  const p01Row = p01Data.find(function(r) {
    return rowMatchesUnit_(r.UNIT_CODE, r.UNIT_NAME, finalUnitCode || unitCode, finalUnitName || unitName);
  });

  if (p01Row) {
    result.found = true;
    result.payload.meta.contactName = trimSafe_(p01Row.CONTACT_NAME);
    result.payload.meta.contactPhone = normalizePhone_(p01Row.CONTACT_PHONE);
    result.payload.meta.note = trimSafe_(p01Row.NOTE);
    result.updatedAt = formatDateTimeSafe_(p01Row.UPDATED_AT);

    P01_HEADERS.forEach(function(h) {
      if (['UNIT_CODE','UNIT_NAME','UNIT_GROUP','CONTACT_NAME','CONTACT_PHONE','NOTE','UPDATED_AT'].indexOf(h) >= 0) return;
      if (p01Row[h] !== '' && p01Row[h] !== null && typeof p01Row[h] !== 'undefined') {
        result.payload.p01[h] = p01Row[h];
      }
    });
  }

  const p02Data = readSheetObjects_(sheetP02, 3).filter(function(r) {
    return rowMatchesUnit_(r.UNIT_CODE, r.UNIT_NAME, finalUnitCode || unitCode, finalUnitName || unitName);
  });
  if (p02Data.length) {
    result.found = true;
    result.payload.p02 = p02Data.map(function(r) {
      return {
        STT: r.STT || '',
        TEN_VU: r.TEN_VU || '',
        TEN_CO_QUAN: r.TEN_CO_QUAN || '',
        CO_QUAN_THU_LY: r.CO_QUAN_THU_LY || '',
        TOM_TAT: r.TOM_TAT || '',
        GHI_CHU: r.GHI_CHU || ''
      };
    });
    if (!result.updatedAt) result.updatedAt = formatDateTimeSafe_(p02Data[0].UPDATED_AT);
  }

  const p03Data = readSheetObjects_(sheetP03, 3).filter(function(r) {
    return rowMatchesUnit_(r.UNIT_CODE, r.UNIT_NAME, finalUnitCode || unitCode, finalUnitName || unitName);
  });
  if (p03Data.length) {
    result.found = true;
    result.payload.p03 = p03Data.map(function(r) {
      return {
        STT: r.STT || '',
        TEN_SO_NGAY_VB: r.TEN_SO_NGAY_VB || '',
        CO_QUAN_BAN_HANH: r.CO_QUAN_BAN_HANH || '',
        NOI_DUNG_SO_HO: r.NOI_DUNG_SO_HO || '',
        DA_KHAC_PHUC: r.DA_KHAC_PHUC || '',
        CHUA_KHAC_PHUC: r.CHUA_KHAC_PHUC || '',
        NGUYEN_NHAN_CHUA: r.NGUYEN_NHAN_CHUA || '',
        GHI_CHU: r.GHI_CHU || ''
      };
    });
    if (!result.updatedAt) result.updatedAt = formatDateTimeSafe_(p03Data[0].UPDATED_AT);
  }

  // Để HTML luôn có sẵn ít nhất 1 dòng rỗng khi chưa có dữ liệu.
  if (!result.payload.p02.length) result.payload.p02 = [{}];
  if (!result.payload.p03.length) result.payload.p03 = [{}];

  return result;
}

/* =========================================================
 * 23) ĐỌC 1 SHEET THÀNH DANH SÁCH OBJECT
 * ========================================================= */
function readSheetObjects_(sheet, headerRow) {
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow <= headerRow || lastCol === 0) return [];
  const headers = sheet.getRange(headerRow, 1, 1, lastCol).getValues()[0];
  const values = sheet.getRange(headerRow + 1, 1, lastRow - headerRow, lastCol).getValues();
  return values
    .filter(function(row) {
      return row.some(function(cell) { return String(cell || '').trim() !== ''; });
    })
    .map(function(row) {
      const obj = {};
      headers.forEach(function(h, i) { obj[h] = row[i]; });
      return obj;
    });
}

/* =========================================================
 * 24) ĐỊNH DẠNG THỜI GIAN TRẢ VỀ CHO HTML
 * ========================================================= */
function formatDateTimeSafe_(value) {
  if (!value) return '';
  try {
    if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
      return Utilities.formatDate(value, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
    }
  } catch (e) {}
  return String(value);
}

/* =========================================================
 * 25) NHÓM HÀM LOG / XỬ LÝ LỖI
 * ========================================================= */
function debugLog_(label, data) {
  if (!DEBUG_MODE) return;
  try {
    Logger.log(label + ' :: ' + JSON.stringify(data));
  } catch (e) {
    Logger.log(label + ' :: [unserializable]');
  }
}

function getErrorMessage_(error) {
  return error && error.message ? error.message : String(error);
}

function getErrorStack_(error) {
  return error && error.stack ? String(error.stack) : '';
}

/* =========================================================
 * 26) GHI CHÚ TRIỂN KHAI CHO CÁN BỘ KỸ THUẬT
 * =========================================================
 * Cách dùng:
 * 1. Mở Google Sheet đích.
 * 2. Extensions -> Apps Script.
 * 3. Xóa code cũ trong Code.gs.
 * 4. Dán toàn bộ file này vào.
 * 5. Lưu lại.
 * 6. Deploy -> New deployment -> Web app.
 * 7. Execute as: Me.
 * 8. Who has access: Anyone with the link.
 * 9. Lấy URL web app, dán vào file HTML nhập liệu.
 *
 * Khi cập nhật code:
 * - Chỉ cần dán đè toàn bộ file và Redeploy version mới.
 *
 * Khi kiểm tra lỗi:
 * - Đổi DEBUG_MODE = true.
 * - Vào Executions / Logs để xem log.
 */
