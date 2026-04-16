/**
 * HỆ THỐNG QUẢN LÝ VÀ KHỞI TẠO THƯ MỤC LƯU TRỮ PACA 2025
 * Phiên bản: 3.0 (Bản tổng hợp hoàn chỉnh)
 * Phân hệ 1: Khởi tạo cấu trúc thư mục tự động (Tránh lỗi Timeout).
 * Phân hệ 2: Trích xuất danh sách liên kết ra Google Sheets (Tự động ghi đè).
 */

// =========================================================================
// PHẦN 1: KHAI BÁO CẤU HÌNH VÀ DỮ LIỆU HỆ THỐNG
// =========================================================================

const ROOT_FOLDER_ID = '1dW8ewbsS4qnN5KOVuxR1drCC81uQvAsS';

const UNITS = [
  { "ma": "DV01", "ten": "Văn phòng UBND tỉnh", "folder": "DV01_VanPhong_UBND_tinh" },
  { "ma": "DV02", "ten": "Sở Tài chính", "folder": "DV02_So_Tai_chinh" },
  { "ma": "DV03", "ten": "Sở Nông nghiệp và Môi trường", "folder": "DV03_So_Nong_nghiep_va_Moi_truong" },
  { "ma": "DV04", "ten": "Sở Xây dựng", "folder": "DV04_So_Xay_dung" },
  { "ma": "DV05", "ten": "Sở Tư pháp", "folder": "DV05_So_Tu_phap" },
  { "ma": "DV06", "ten": "Sở Công thương", "folder": "DV06_So_Cong_thuong" },
  { "ma": "DV07", "ten": "Sở Văn hóa, Thể thao và Du lịch", "folder": "DV07_So_Van_hoa_The_thao_va_Du_lich" },
  { "ma": "DV08", "ten": "Sở Giáo dục và Đào tạo", "folder": "DV08_So_Giao_duc_va_Dao_tao" },
  { "ma": "DV09", "ten": "Sở Khoa học và Công nghệ", "folder": "DV09_So_Khoa_hoc_va_Cong_nghe" },
  { "ma": "DV10", "ten": "Sở Y tế", "folder": "DV10_So_Y_te" },
  { "ma": "DV11", "ten": "Sở Nội vụ", "folder": "DV11_So_Noi_vu" },
  { "ma": "DV12", "ten": "Sở Ngoại vụ", "folder": "DV12_So_Ngoai_vu" },
  { "ma": "DV13", "ten": "Thanh tra tỉnh", "folder": "DV13_Thanh_tra_tinh" },
  { "ma": "DV14", "ten": "Sở Dân tộc và Tôn giáo", "folder": "DV14_So_Dan_toc_va_Ton_giao" },
  { "ma": "DV15", "ten": "Ban Quản lý KKTNS và Các KCN", "folder": "DV15_BQL_KKTNS_va_Cac_KCN" },
  { "ma": "DV16", "ten": "Viện quy hoạch kiến trúc Thanh Hóa", "folder": "DV16_Vien_quy_hoach_kien_truc_Thanh_Hoa" }
];

const FOLDER_RULES = [
  { "maTieuChi": "A.1.2", "tenFolder": "A-1-2", "tenTieuChi": "A.1.2. Ban hành kế hoạch PCTN năm 2025" },
  { "maTieuChi": "A.2.1.1", "tenFolder": "A-2-1-1", "tenTieuChi": "A.2.1.1. Ban hành kế hoạch" },
  { "maTieuChi": "A.2.1.2", "tenFolder": "A-2-1-2", "tenTieuChi": "A.2.1.2. Kết quả thực hiện" },
  { "maTieuChi": "A.2.2.1", "tenFolder": "A-2-2-1", "tenTieuChi": "A.2.2.1. Ban hành kế hoạch" },
  { "maTieuChi": "A.2.2.2", "tenFolder": "A-2-2-2", "tenTieuChi": "A.2.2.2. Kết quả thực hiện" },
  { "maTieuChi": "A.2.3", "tenFolder": "A-2-3", "tenTieuChi": "A.2.3. Thực hiện việc kiểm tra và theo dõi thi hành văn bản quy phạm pháp luật về PCTN" },
  { "maTieuChi": "A.2.4", "tenFolder": "A-2-4", "tenTieuChi": "A.2.4. Tiếp công dân theo quy định của Luật tiếp công dân của Chủ tịch UBND cấp tỉnh" },
  { "maTieuChi": "A.2.5", "tenFolder": "A-2-5", "tenTieuChi": "A.2.5. Tiếp công dân theo quy định của Luật tiếp công dân của Người đứng đầu cơ quan chuyên môn thuộc UBND cấp Tỉnh" },
  { "maTieuChi": "A.2.6", "tenFolder": "A-2-6", "tenTieuChi": "A.2.6. Việc chỉ đạo của Chủ tịch UBND cấp tỉnh xử lý tố cáo, kiến nghị, phản ánh của công dân về tham nhũng." },
  { "maTieuChi": "B.1.1.1", "tenFolder": "B-1-1-1", "tenTieuChi": "B.1.1.1. Kết quả thực hiện công khai, minh bạch các thủ tục hành chính" },
  { "maTieuChi": "B.1.1.2", "tenFolder": "B-1-1-2", "tenTieuChi": "B.1.1.2. Kết quả thực hiện công khai, minh bạch quy tắc ứng xử của người có chức vụ quyền hạn" },
  { "maTieuChi": "B.1.1.3", "tenFolder": "B-1-1-3", "tenTieuChi": "B.1.1.3. Kết quả thực hiện công khai, minh bạch tuyển dụng, bổ nhiệm công chức, viên chức" },
  { "maTieuChi": "B.1.1.4", "tenFolder": "B-1-1-4", "tenTieuChi": "B.1.1.4. Kết quả thực hiện công khai, minh bạch về ngân sách Nhà nước" },
  { "maTieuChi": "B.1.1.5", "tenFolder": "B-1-1-5", "tenTieuChi": "B.1.1.5. Kết quả thực hiện công khai, minh bạch về tài sản công" },
  { "maTieuChi": "B.1.2", "tenFolder": "B-1-2", "tenTieuChi": "B.1.2. Kết quả thực hiện cải cách hành chính (PAR 2025)" },
  { "maTieuChi": "B.1.3", "tenFolder": "B-1-3", "tenTieuChi": "B.1.3. Kết quả thực hiện chuyển đổi số cấp tỉnh năm 2025" },
  { "maTieuChi": "B.1.4", "tenFolder": "B-1-4", "tenTieuChi": "B.1.4. Kết quả thực hiện Đề án phát triển thanh toán không dùng tiền mặt" },
  { "maTieuChi": "B.1.5.1", "tenFolder": "B-1-5-1", "tenTieuChi": "B.1.5.1. Việc ban hành văn bản triển khai thực hiện" },
  { "maTieuChi": "B.1.5.2", "tenFolder": "B-1-5-2", "tenTieuChi": "B.1.5.2. Kết quả thực hiện" },
  { "maTieuChi": "B.1.6.1", "tenFolder": "B-1-6-1", "tenTieuChi": "B.1.6.1. Việc ban hành văn bản triển khai thực hiện" },
  { "maTieuChi": "B.1.6.2", "tenFolder": "B-1-6-2", "tenTieuChi": "B.1.6.2. Kết quả thực hiện" },
  { "maTieuChi": "B.1.6.3", "tenFolder": "B-1-6-3", "tenTieuChi": "B.1.6.3. Kết quả giải quyết XĐLI" },
  { "maTieuChi": "B.1.7.1", "tenFolder": "B-1-7-1", "tenTieuChi": "B.1.7.1. Việc ban hành kế hoạch" },
  { "maTieuChi": "B.1.7.2", "tenFolder": "B-1-7-2", "tenTieuChi": "B.1.7.2. Kết quả thực hiện" },
  { "maTieuChi": "B.1.8", "tenFolder": "B-1-8", "tenTieuChi": "B.1.8. Kết quả thực hiện quy tắc ứng xử" },
  { "maTieuChi": "B.1.9.1", "tenFolder": "B-1-9-1", "tenTieuChi": "B.1.9.1. Ban hành kế hoạch kê khai, công khai bản kê khai TSTN." },
  { "maTieuChi": "B.1.9.2", "tenFolder": "B-1-9-2", "tenTieuChi": "B.1.9.2. Kết quả kê khai, công khai bản kê khai TSTN" },
  { "maTieuChi": "C.1.1", "tenFolder": "C-1-1", "tenTieuChi": "C.1.1. Kết quả phát hiện hành vi tham nhũng qua kiểm tra, thanh tra, giám sát" },
  { "maTieuChi": "C.1.2", "tenFolder": "C-1-2", "tenTieuChi": "C.1.2. Kết quả phát hiện hành vi tham nhũng qua phản ánh,tố cáo" },
  { "maTieuChi": "C.2.1.1", "tenFolder": "C-2-1-1", "tenTieuChi": "C.2.1.1. Kết quả xử lý kỷ luật đối với tổ chức do để xảy ra tham nhũng." },
  { "maTieuChi": "C.2.1.2", "tenFolder": "C-2-1-2", "tenTieuChi": "C.2.1.2. Kết quả xử lý kỷ luật hành chính đối với cá nhân có hành vi TN" },
  { "maTieuChi": "C.2.2.1", "tenFolder": "C-2-2-1", "tenTieuChi": "C.2.2.1. Kết quả xử lý qua điều tra" },
  { "maTieuChi": "C.2.2.2", "tenFolder": "C-2-2-2", "tenTieuChi": "C.2.2.2. Kết quả xử lý qua truy tố" },
  { "maTieuChi": "C.2.2.3", "tenFolder": "C-2-2-3", "tenTieuChi": "C.2.2.3. Kết quả xử lý qua xét xử" },
  { "maTieuChi": "C.2.3.1", "tenFolder": "C-2-3-1", "tenTieuChi": "C.2.3.1. Hình thức khiển trách" },
  { "maTieuChi": "C.2.3.2", "tenFolder": "C-2-3-2", "tenTieuChi": "C.2.3.2. Hình thức cảnh cáo" },
  { "maTieuChi": "C.2.3.3", "tenFolder": "C-2-3-3", "tenTieuChi": "C.2.3.3. Hình thức cách chức" },
  { "maTieuChi": "C.3.1", "tenFolder": "C-3-1", "tenTieuChi": "C.3.1. Kết quả xử lý vi phạm trong thực hiện công khai minh bạch trong hoạt động của cơ quan, tổ chức đơn vị" },
  { "maTieuChi": "C.3.2", "tenFolder": "C-3-2", "tenTieuChi": "C.3.2. Kết quả xử lý vi phạm quy định về chế độ, định mức, tiêu chuẩn" },
  { "maTieuChi": "C.3.3", "tenFolder": "C-3-3", "tenTieuChi": "C.3.3. Kết quả xử lý vi phạm quy tắc ứng xử của người có chức vụ, quyền hạn" },
  { "maTieuChi": "C.3.4", "tenFolder": "C-3-4", "tenTieuChi": "C.3.4. Kết quả xử lý vi phạm quy định về xung đột lợi ích" },
  { "maTieuChi": "C.3.5", "tenFolder": "C-3-5", "tenTieuChi": "C.3.5. Kết quả xử lý vi phạm quy định về chuyển đổi vị trí công tác" },
  { "maTieuChi": "C.3.6", "tenFolder": "C-3-6", "tenTieuChi": "C.3.6. Kết quả xử lý vi phạm quy định về báo cáo, xử lý báo cáo về hành vi tham nhũng" },
  { "maTieuChi": "C.3.7", "tenFolder": "C-3-7", "tenTieuChi": "C.3.7. Kết quả xử lý hành vi vi phạm đối với người kê khai TSTN" },
  { "maTieuChi": "C.3.8", "tenFolder": "C-3-8", "tenTieuChi": "C.3.8. Kết quả xử lý hành vi vi phạm khác trong kiểm soát TSTN" },
  { "maTieuChi": "D.1.1", "tenFolder": "D-1-1", "tenTieuChi": "D.1.1. Kết quả thu hồi tiền, tài sản tham nhũng qua công tác kiểm tra, giám sát, thanh tra" },
  { "maTieuChi": "D.1.2", "tenFolder": "D-1-2", "tenTieuChi": "D.1.2. Kết quả thu hồi tiền, tài sản tham nhũng qua công tác giải quyết đơn tố cáo, phản ánh" },
  { "maTieuChi": "D.2.1", "tenFolder": "D-2-1", "tenTieuChi": "D.2.1. Kết quả thu hồi tiền, tài sản tham nhũng qua công tác điều tra, truy tố, xét xử" },
  { "maTieuChi": "D.2.2", "tenFolder": "D-2-2", "tenTieuChi": "D.2.2. Kết quả thu hồi tiền, tài sản tham nhũng qua công tác thi hành án" },
  { "maTieuChi": "ĐT.1", "tenFolder": "ĐT-1", "tenTieuChi": "ĐT.1. Việc chậm nộp báo cáo tự đánh giá công tác PCTN năm 2025" },
  { "maTieuChi": "ĐT.2", "tenFolder": "ĐT-2", "tenTieuChi": "ĐT.2. Tổ chức cấp tỉnh bị kỷ luật do để xảy ra tham nhũng, tiêu cực năm 2025" },
  { "maTieuChi": "ĐT.3", "tenFolder": "ĐT-3", "tenTieuChi": "ĐT.3. Người đứng đầu, cấp phó của người đứng đầu cấp tỉnh bị xử lý do để xảy ra tham nhũng, tiêu cực năm 2025" }
];

const EXCLUDED_CODES = ["A.1.1.1", "A.1.1.2", "A.1.1.3", "A.1.1.4", "A.1.1.5", "A.1.3.1", "A.1.3.2", "A.1.3.3", "A.1.3.4", "A.1.3.5", "A.1.3.6", "A.2.7", "B.1.10.1", "B.1.10.2", "B.1.10.3", "B.1.9.3", "B.1.9.4", "B.2.1", "B.2.2", "C.1.3"];


// =========================================================================
// PHẦN 2: PHÂN HỆ KHỞI TẠO THƯ MỤC (CHẠY HÀM: createPacaFolders)
// =========================================================================

/**
 * Hàm thực thi chính. Thực hiện tạo thư mục và tự động xử lý chia nhỏ thời gian.
 */
function createPacaFolders() {
  const startTime = Date.now();
  const MAX_EXECUTION_TIME = 4.5 * 60 * 1000; // Ngưỡng an toàn 4.5 phút
  const scriptProperties = PropertiesService.getScriptProperties();
  
  // Phục hồi trạng thái từ lần chạy trước (nếu có)
  let startIndex = parseInt(scriptProperties.getProperty('CURRENT_UNIT_INDEX') || '0', 10);
  let logs = JSON.parse(scriptProperties.getProperty('EXECUTION_LOGS') || '[]');

  const root = DriveApp.getFolderById(ROOT_FOLDER_ID);

  for (let i = startIndex; i < UNITS.length; i++) {
    const unit = UNITS[i];
    const unitFolder = getOrCreateFolder_(root, unit.folder || unit.ten);
    
    // Đọc danh sách thư mục hiện có vào RAM để đối chiếu
    const existingFolders = {};
    const subFolderIterator = unitFolder.getFolders();
    while (subFolderIterator.hasNext()) {
      const folder = subFolderIterator.next();
      existingFolders[folder.getName()] = true;
    }

    let created = 0;
    let existed = 0;

    // Duyệt qua quy tắc thư mục
    FOLDER_RULES.forEach(rule => {
      if (existingFolders[rule.tenFolder]) {
        existed++;
      } else {
        unitFolder.createFolder(rule.tenFolder);
        created++;
      }
    });

    logs.push([unit.ma, unit.ten, unitFolder.getName(), created, existed, new Date().toLocaleString('vi-VN')]);

    // KIỂM TRA THỜI GIAN: Nếu sắp hết giờ, lưu trạng thái và tạo Trigger chạy tiếp
    if (Date.now() - startTime > MAX_EXECUTION_TIME && i < UNITS.length - 1) {
      scriptProperties.setProperty('CURRENT_UNIT_INDEX', (i + 1).toString());
      scriptProperties.setProperty('EXECUTION_LOGS', JSON.stringify(logs));
      
      createAutoTrigger_('createPacaFolders');
      
      Logger.log(`Tạm dừng tại đơn vị ${i+1}/${UNITS.length}. Hệ thống sẽ tự động chạy tiếp sau 1 phút.`);
      return;
    }
  }

  // Hoàn tất toàn bộ đơn vị
  finalizeProcess_(logs);
}

/**
 * Ghi kết quả cuối cùng ra bảng tính độc lập và dọn dẹp hệ thống.
 */
function finalizeProcess_(logs) {
  const rootFolder = DriveApp.getFolderById(ROOT_FOLDER_ID);
  const LOG_FILE_NAME = 'PACA_2025_LOG_TAO_THU_MUC';
  let ss;

  // Kiểm tra file nhật ký trong thư mục gốc
  const existingFiles = rootFolder.getFilesByName(LOG_FILE_NAME);
  if (existingFiles.hasNext()) {
    ss = SpreadsheetApp.open(existingFiles.next());
  } else {
    // Tạo file mới nếu chưa tồn tại
    ss = SpreadsheetApp.create(LOG_FILE_NAME);
    const file = DriveApp.getFileById(ss.getId());
    file.moveTo(rootFolder);
  }

  // Thiết lập trang tính (Sheet)
  let sh = ss.getSheetByName('LOG_TAO_THU_MUC');
  if (!sh) {
    sh = ss.insertSheet('LOG_TAO_THU_MUC');
  } else {
    sh.clear(); // Làm sạch dữ liệu cũ
  }

  const defaultSheet = ss.getSheetByName('Trang tính 1') || ss.getSheetByName('Sheet1');
  if (defaultSheet && ss.getSheets().length > 1) ss.deleteSheet(defaultSheet);

  // Ghi dữ liệu nhật ký
  const headers = ['MÃ ĐƠN VỊ', 'TÊN ĐƠN VỊ', 'TÊN THƯ MỤC', 'SỐ THƯ MỤC TẠO MỚI', 'SỐ THƯ MỤC ĐÃ CÓ', 'THỜI GIAN'];
  sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  if (logs && logs.length > 0) {
    sh.getRange(2, 1, logs.length, headers.length).setValues(logs);
  }

  sh.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#f3f3f3');
  sh.autoResizeColumns(1, headers.length);
  sh.setFrozenRows(1);

  // Dọn dẹp Properties và Trigger
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.deleteProperty('CURRENT_UNIT_INDEX');
  scriptProperties.deleteProperty('EXECUTION_LOGS');

  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => {
    if (t.getHandlerFunction() === 'createPacaFolders') ScriptApp.deleteTrigger(t);
  });

  Logger.log(">>> TIẾN TRÌNH KHỞI TẠO THƯ MỤC HOÀN TẤT.");
  Logger.log(">>> File Nhật ký: " + ss.getUrl());
}

/**
 * Hàm hỗ trợ: Lấy thư mục cũ hoặc tạo mới
 */
function getOrCreateFolder_(parentFolder, folderName) {
  const it = parentFolder.getFoldersByName(folderName);
  return it.hasNext() ? it.next() : parentFolder.createFolder(folderName);
}

/**
 * Hàm hỗ trợ: Tạo trigger tự động chạy lại sau 1 phút
 */
function createAutoTrigger_(functionName) {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => {
    if (t.getHandlerFunction() === functionName) ScriptApp.deleteTrigger(t);
  });

  ScriptApp.newTrigger(functionName)
    .timeBased()
    .after(60 * 1000)
    .create();
}


// =========================================================================
// PHẦN 3: PHÂN HỆ TRÍCH XUẤT LIÊN KẾT (CHẠY HÀM: exportUnitFolderLinksToSheet)
// =========================================================================

/**
 * Trích xuất danh sách liên kết ra Sheets. Tự động ghi đè tệp cũ nếu đã tồn tại.
 */
function exportUnitFolderLinksToSheet() {
  const SHEET_FILE_NAME = 'PACA_2025_Thanh_Hoa_Danh_sach_link_thu_muc_don_vi';
  const rootFolder = DriveApp.getFolderById(ROOT_FOLDER_ID);

  let ss;
  const existingFiles = rootFolder.getFilesByName(SHEET_FILE_NAME);
  
  if (existingFiles.hasNext()) {
    const file = existingFiles.next();
    ss = SpreadsheetApp.open(file);
    Logger.log('>>> Phát hiện tệp cũ. Đang tiến hành ghi đè dữ liệu...');
  } else {
    ss = SpreadsheetApp.create(SHEET_FILE_NAME);
    const newFile = DriveApp.getFileById(ss.getId());
    newFile.moveTo(rootFolder);
    Logger.log('>>> Chưa có tệp báo cáo. Đang tiến hành tạo mới...');
  }

  let sheet = ss.getSheetByName('Danh_sach_link');
  if (!sheet) {
    sheet = ss.insertSheet('Danh_sach_link');
  } else {
    sheet.clear(); 
  }

  const defaultSheet1 = ss.getSheetByName('Trang tính 1');
  const defaultSheet2 = ss.getSheetByName('Sheet1');
  if (defaultSheet1 && ss.getSheets().length > 1) ss.deleteSheet(defaultSheet1);
  if (defaultSheet2 && ss.getSheets().length > 1) ss.deleteSheet(defaultSheet2);

  const headers = [
    'STT',
    'Mã đơn vị',
    'Tên đơn vị',
    'Tên thư mục quy định',
    'Link truy cập',
    'Trạng thái'
  ];

  const existingFolders = {};
  const subFolders = rootFolder.getFolders();
  while (subFolders.hasNext()) {
    const folder = subFolders.next();
    existingFolders[folder.getName()] = folder;
  }

  const rows = UNITS.map(function(unit, index) {
    const unitFolder = existingFolders[unit.folder];
    return [
      index + 1,
      unit.ma,
      unit.ten,
      unit.folder,
      unitFolder ? unitFolder.getUrl() : '',
      unitFolder ? 'Đã khởi tạo' : 'Chưa tìm thấy'
    ];
  });

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);

  sheet.getRange(1, 1, 1 + rows.length, headers.length).setBorder(true, true, true, true, true, true);
  
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#d9ead3'); 
  
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);

  Logger.log('>>> BÁO CÁO LIÊN KẾT HOÀN TẤT.');
  Logger.log('>>> File Liên kết: ' + ss.getUrl());
}