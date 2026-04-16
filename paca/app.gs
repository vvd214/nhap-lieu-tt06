const SPREADSHEET_ID = '1KIXuy1GhRXPAYHh751KxoW9zp8BXJfN_XzzH2queUB8';
const UNIT_SHEET = 'DM_DON_VI';
const SUMMARY_SHEET = 'PL4_TONG_HOP';
const RAW_SHEET = 'FORM_DATA';
const FILE_UPLOAD_SHEET = 'FILE_UPLOADS';

const UNITS = [
  {
    "ma": "DV01",
    "ten": "Văn phòng UBND tỉnh",
    "folderLink": "https://drive.google.com/drive/folders/17ajEXtQmQz3o1L-wpihgNMxFpjNaqINx"
  },
  {
    "ma": "DV02",
    "ten": "Sở Tài chính",
    "folderLink": "https://drive.google.com/drive/folders/1yAJWQvezgV_VSFBHYpejQ6jRgLc_KXY3"
  },
  {
    "ma": "DV03",
    "ten": "Sở Nông nghiệp và Môi trường",
    "folderLink": "https://drive.google.com/drive/folders/1uWHZEPt_ZB-YDQVFDxuYuJtypvMZa8-5"
  },
  {
    "ma": "DV04",
    "ten": "Sở Xây dựng",
    "folderLink": "https://drive.google.com/drive/folders/1hmgNQuxDlS0SHDLMc5AdCRluTXd-51_4"
  },
  {
    "ma": "DV05",
    "ten": "Sở Tư pháp",
    "folderLink": "https://drive.google.com/drive/folders/1Rr7muf6VszR6r_SMcVmoBLxEY2p2LDcl"
  },
  {
    "ma": "DV06",
    "ten": "Sở Công thương",
    "folderLink": "https://drive.google.com/drive/folders/11GHEp5-37mwXtoCPoRvQRnOChXMzQP__"
  },
  {
    "ma": "DV07",
    "ten": "Sở Văn hóa thể thao và Du lịch",
    "folderLink": "https://drive.google.com/drive/folders/132ogtTwFf14meLaHi9TBL5yXsj3hGB_y"
  },
  {
    "ma": "DV08",
    "ten": "Sở Giáo dục và Đào tạo",
    "folderLink": "https://drive.google.com/drive/folders/1oOFAcEytoF3C6iMp-bSddxx7fDwIf2gl"
  },
  {
    "ma": "DV09",
    "ten": "Sở Khoa học và Công nghệ",
    "folderLink": "https://drive.google.com/drive/folders/1Vv27yUDhx1GGBlZTlWbZ7kBhSnkt_ZLq"
  },
  {
    "ma": "DV10",
    "ten": "Sở Y tế",
    "folderLink": "https://drive.google.com/drive/folders/1ihgIe5IKgLL6URTxO3pnIv2ThED85Flr"
  },
  {
    "ma": "DV11",
    "ten": "Sở Nội vụ",
    "folderLink": "https://drive.google.com/drive/folders/1kr69zE1407im08mgTWZOA8dPilyJElzR"
  },
  {
    "ma": "DV12",
    "ten": "Sở Ngoại vụ",
    "folderLink": "https://drive.google.com/drive/folders/1kI3hIwQH0TWwTWxJgF4Y6u1bbObTcl78"
  },
  {
    "ma": "DV13",
    "ten": "Thanh tra tỉnh",
    "folderLink": "https://drive.google.com/drive/folders/18OjCPet370x2fkSs8vH6ued3T0mHs5n1"
  },
  {
    "ma": "DV14",
    "ten": "Sở Dân tộc và Tôn giáo",
    "folderLink": "https://drive.google.com/drive/folders/1UIpchDcxLfcp_kBhXnbddf67wMHczrHb"
  },
  {
    "ma": "DV15",
    "ten": "Ban Quản lý KKTNS và Các KCN",
    "folderLink": "https://drive.google.com/drive/folders/1Jkocr77NkQuYtqgXeOTmdXFXSF_8e_uE"
  },
  {
    "ma": "DV16",
    "ten": "Viện quy hoạch kiến trúc Thanh Hóa",
    "folderLink": "https://drive.google.com/drive/folders/1jbvUlbx7DkJrzOzz3kBaJXY5gUUksjkn"
  }
];
const CRITERIA_ROWS = [
  {
    "rowId": "R9",
    "ma": "A",
    "text": "A. TIÊU CHÍ ĐÁNH GIÁ VIỆC LÃNH ĐẠO, CHỈ ĐẠO, XÂY DỰNG VÀ HOÀN THIỆN CHÍNH SÁCH, PHÁP LUẬT VỀ PCTN",
    "level": 1,
    "leaf": false
  },
  {
    "rowId": "R10",
    "ma": "A.1",
    "text": "A.1. Đánh giá việc lãnh đạo, chỉ đạo công tác PCTN:",
    "level": 2,
    "leaf": false
  },
  {
    "rowId": "R11",
    "ma": "A.1.1",
    "text": "A.1.1. Triển khai thực hiện các văn bản của các cơ quan ở Trung ương về PCTN trong năm 2025",
    "level": 3,
    "leaf": false
  },
  {
    "rowId": "R12",
    "ma": "A.1.1.1",
    "text": "A.1.1.1. Triển khai thực hiện Chương trình công tác năm 2025 của Ban Chỉ đạo Trung ương về phòng, chống tham nhũng, tiêu cực.",
    "level": 4,
    "leaf": false
  },
  {
    "rowId": "R13",
    "ma": "A.1.1.2",
    "text": "A.1.1.2. Triển khai thực hiện Nghị quyết số 168/NQ-CP ngày 11/10/2023 về Chiến lược quốc gia phòng, chống tham nhũng, tiêu cực đến năm 2030.",
    "level": 4,
    "leaf": false
  },
  {
    "rowId": "R14",
    "ma": "A.1.1.3",
    "text": "A.1.1.3. Triển khai thực hiện Quy định số 132-QĐ/TW ngày 27/10/2023 của Bộ Chính trị về kiểm soát quyền lực và phòng, chống tham nhũng, tiêu cực trong hoạt động điều tra, truy tố, xét xử, thi hành án.",
    "level": 4,
    "leaf": false
  },
  {
    "rowId": "R15",
    "ma": "A.1.1.4",
    "text": "A.1.1.4. Triển khai thực hiện Quy định số 131-QĐ/TW ngày 27/10/2023 của Bộ Chính trị về kiểm soát quyền lực và PCTNTC trong hoạt động kiểm tra, giám sát và thi hành kỷ luật đảng và trong hoạt động thanh tra, kiểm toán.",
    "level": 4,
    "leaf": false
  },
  {
    "rowId": "R16",
    "ma": "A.1.1.5",
    "text": "A.1.1.5. Triển khai thực hiện Quy định số 178-QĐ/TW ngày 27/6/2024 của Bộ Chính trị về kiểm soát quyền lực, PCTNTC trong công tác xây dựng pháp luật.",
    "level": 4,
    "leaf": false
  },
  {
    "rowId": "R17",
    "ma": "A.1.2",
    "text": "A.1.2. Ban hành kế hoạch PCTN năm 2025",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R18",
    "ma": "A.1.3",
    "text": "A.1.3. Nội dung kế hoạch PCTN năm 2025",
    "level": 3,
    "leaf": false
  },
  {
    "rowId": "R19",
    "ma": "A.1.3.1",
    "text": "A.1.3.1. Về thực hiện các chỉ thị, nghị quyết của Trung ương về PCTN",
    "level": 4,
    "leaf": false
  },
  {
    "rowId": "R20",
    "ma": "A.1.3.2",
    "text": "A.1.3.2. Về kiểm tra, rà soát, hệ thống hóa văn bản quy phạm pháp luật về PCTN",
    "level": 4,
    "leaf": false
  },
  {
    "rowId": "R21",
    "ma": "A.1.3.3",
    "text": "A.1.3.3. Về xây dựng và hoàn thiện chính sách, pháp luật về PCTN",
    "level": 4,
    "leaf": false
  },
  {
    "rowId": "R22",
    "ma": "A.1.3.4",
    "text": "A.1.3.4. Về tuyên truyền, phổ biến giáo dục pháp luật về PCTN",
    "level": 4,
    "leaf": false
  },
  {
    "rowId": "R23",
    "ma": "A.1.3.5",
    "text": "A.1.3.5. Về kiểm tra và theo dõi thi hành văn bản quy phạm pháp luật về PCTN",
    "level": 4,
    "leaf": false
  },
  {
    "rowId": "R24",
    "ma": "A.1.3.6",
    "text": "A.1.3.6. Về kiểm tra, đánh giá việc thực hiện kế hoạch PCTN năm 2025",
    "level": 4,
    "leaf": false
  },
  {
    "rowId": "R25",
    "ma": "A.2",
    "text": "A.2. Đánh giá việc UBND tỉnh và các sở, ban, cơ quan, đơn vị thuộc UBND cấp tỉnh thực hiện kế hoạch PCTN của cấp tỉnh",
    "level": 2,
    "leaf": false
  },
  {
    "rowId": "R26",
    "ma": "A.2.1",
    "text": "A.2.1. Thực hiện kiểm tra, rà soát, hệ thống hóa văn bản quy phạm pháp luật về PCTN",
    "level": 3,
    "leaf": false
  },
  {
    "rowId": "R27",
    "ma": "A.2.1.1",
    "text": "A.2.1.1. Ban hành kế hoạch",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R28",
    "ma": "A.2.1.2",
    "text": "A.2.1.2. Kết quả thực hiện",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R29",
    "ma": "A.2.3",
    "text": "A.2.3. Thực hiện công tác tuyên truyền, phổ biến, giáo dục pháp luật về PCTN.",
    "level": 3,
    "leaf": false
  },
  {
    "rowId": "R30",
    "ma": "A.2.2.1",
    "text": "A.2.2.1. Ban hành kế hoạch",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R31",
    "ma": "A.2.2.2",
    "text": "A.2.2.2. Kết quả thực hiện",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R32",
    "ma": "A.2.3",
    "text": "A.2.3. Thực hiện việc kiểm tra và theo dõi thi hành văn bản quy phạm pháp luật về PCTN",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R33",
    "ma": "A.2.4",
    "text": "A.2.4. Tiếp công dân theo quy định của Luật tiếp công dân của Chủ tịch UBND cấp tỉnh",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R34",
    "ma": "A.2.5",
    "text": "A.2.5. Tiếp công dân theo quy định của Luật tiếp công dân của Người đứng đầu cơ quan chuyên môn thuộc UBND cấp Tỉnh",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R35",
    "ma": "A.2.6",
    "text": "A.2.6. Việc chỉ đạo của Chủ tịch UBND cấp tỉnh xử lý tố cáo, kiến nghị, phản ánh của công dân về tham nhũng.",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R36",
    "ma": "B",
    "text": "B. ĐÁNH GIÁ VIỆC THỰC HIỆN CÁC BIỆN PHÁP PHÒNG NGỪA THAM NHŨNG",
    "level": 1,
    "leaf": false
  },
  {
    "rowId": "R37",
    "ma": "B.1",
    "text": "B.1. Công tác phòng ngừa tham nhũng trong cơ quan, tổ chức, đơn vị khu vực Nhà nước",
    "level": 2,
    "leaf": false
  },
  {
    "rowId": "R38",
    "ma": "B.1.1",
    "text": "B.1.1. Kết quả thực hiện công khai, minh bạch theo quy định của Luật PCTN 2018 trong một số lĩnh vực",
    "level": 3,
    "leaf": false
  },
  {
    "rowId": "R39",
    "ma": "B.1.1.1",
    "text": "B.1.1.1. Kết quả thực hiện công khai, minh bạch các thủ tục hành chính",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R40",
    "ma": "B.1.1.2",
    "text": "B.1.1.2. Kết quả thực hiện công khai, minh bạch quy tắc ứng xử của người có chức vụ quyền hạn",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R41",
    "ma": "B.1.1.3",
    "text": "B.1.1.3. Kết quả thực hiện công khai, minh bạch tuyển dụng, bổ nhiệm công chức, viên chức",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R42",
    "ma": "B.1.1.4",
    "text": "B.1.1.4. Kết quả thực hiện công khai, minh bạch về ngân sách Nhà nước",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R43",
    "ma": "B.1.1.5",
    "text": "B.1.1.5. Kết quả thực hiện công khai, minh bạch về tài sản công",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R44",
    "ma": "B.1.2",
    "text": "B.1.2. Kết quả thực hiện cải cách hành chính (PAR 2025)",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R45",
    "ma": "B.1.3",
    "text": "B.1.3. Kết quả thực hiện chuyển đổi số cấp tỉnh năm 2025",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R46",
    "ma": "B.1.4",
    "text": "B.1.4. Kết quả thực hiện Đề án phát triển thanh toán không dùng tiền mặt",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R47",
    "ma": "B.1.5",
    "text": "B.1.5. Kết quả thực hiện định mức, chế độ, tiêu chuẩn",
    "level": 3,
    "leaf": false
  },
  {
    "rowId": "R48",
    "ma": "B.1.5.1",
    "text": "B.1.5.1. Việc ban hành văn bản triển khai thực hiện",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R49",
    "ma": "B.1.5.2",
    "text": "B.1.5.2. Kết quả thực hiện",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R50",
    "ma": "B.1.6",
    "text": "B.1.6. Kết quả kiểm soát xung đột lợi ích (XĐLI)",
    "level": 3,
    "leaf": false
  },
  {
    "rowId": "R51",
    "ma": "B.1.6.1",
    "text": "B.1.6.1. Việc ban hành văn bản triển khai thực hiện",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R52",
    "ma": "B.1.6.2",
    "text": "B.1.6.2. Kết quả thực hiện",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R53",
    "ma": "B.1.6.3",
    "text": "B.1.6.3. Kết quả giải quyết XĐLI",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R54",
    "ma": "B.1.7",
    "text": "B.1.7. Kết quả thực hiện chuyển đổi vị trí công tác của cán bộ, công chức, viên chức",
    "level": 3,
    "leaf": false
  },
  {
    "rowId": "R55",
    "ma": "B.1.7.1",
    "text": "B.1.7.1. Việc ban hành kế hoạch",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R56",
    "ma": "B.1.7.2",
    "text": "B.1.7.2. Kết quả thực hiện",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R57",
    "ma": "B.1.8",
    "text": "B.1.8. Kết quả thực hiện quy tắc ứng xử",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R58",
    "ma": "B.1.9",
    "text": "B.1.9. Kết quả kiểm soát tài sản, thu nhập (TSTN)",
    "level": 3,
    "leaf": false
  },
  {
    "rowId": "R59",
    "ma": "B.1.9.1",
    "text": "B.1.9.1. Ban hành kế hoạch kê khai, công khai bản kê khai TSTN.",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R60",
    "ma": "B.1.9.2",
    "text": "B.1.9.2. Kết quả kê khai, công khai bản kê khai TSTN",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R61",
    "ma": "B.1.9.3",
    "text": "B.1.9.3. Việc ban hành, phê duyệt kế hoạch xác minh TSTN",
    "level": 4,
    "leaf": false
  },
  {
    "rowId": "R62",
    "ma": "B.1.9.4",
    "text": "B.1.9.4. Kết quả xác minh TSTN",
    "level": 4,
    "leaf": false
  },
  {
    "rowId": "R63",
    "ma": "B.1.10",
    "text": "B.1.10. Kết quả thực hiện Chỉ thị 10/CT-TTg của Thủ tướng Chính phủ",
    "level": 3,
    "leaf": false
  },
  {
    "rowId": "R64",
    "ma": "B.1.10.1",
    "text": "B.1.10.1. Kế hoạch triển khai thực hiện Chỉ thị 10/CT-TTg của Thủ tướng Chính phủ",
    "level": 4,
    "leaf": false
  },
  {
    "rowId": "R65",
    "ma": "B.1.10.2",
    "text": "B.1.10.2. Việc tiếp nhận, xử lý kiến nghị, phản ánh….",
    "level": 4,
    "leaf": false
  },
  {
    "rowId": "R66",
    "ma": "B.1.10.3",
    "text": "B.1.10.3. Kết quả xử lý vi phạm Chỉ thị 10/CT-TTg của Thủ tướng Chính phủ",
    "level": 4,
    "leaf": false
  },
  {
    "rowId": "R67",
    "ma": "B.2",
    "text": "B.2. Phòng ngừa tham nhũng trong doanh nghiệp, tổ chức khu vực ngoài Nhà nước",
    "level": 2,
    "leaf": false
  },
  {
    "rowId": "R68",
    "ma": "B.2.1",
    "text": "B.2.1. UBND cấp tỉnh ban hành văn bản hướng dẫn, đôn đốc, yêu cầu báo cáo kết quả thực hiện công tác phòng ngừa tham nhũng đối với doanh nghiệp, tổ chức khu vực ngoài Nhà nước",
    "level": 3,
    "leaf": false
  },
  {
    "rowId": "R69",
    "ma": "B.2.2",
    "text": "B.2.2. Kết quả thực hiện các biện pháp phòng ngừa tham nhũng của doanh nghiệp, tổ chức khu vực ngoài Nhà nước",
    "level": 3,
    "leaf": false
  },
  {
    "rowId": "R70",
    "ma": "C",
    "text": "C. ĐÁNH GIÁ VIỆC PHÁT HIỆN VÀ XỬ LÝ THAM NHŨNG",
    "level": 1,
    "leaf": false
  },
  {
    "rowId": "R71",
    "ma": "C.1",
    "text": "C.1. Việc phát hiện hành vi tham nhũng",
    "level": 2,
    "leaf": false
  },
  {
    "rowId": "R72",
    "ma": "C.1.1",
    "text": "C.1.1. Kết quả phát hiện hành vi tham nhũng qua kiểm tra, thanh tra, giám sát",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R73",
    "ma": "C.1.2",
    "text": "C.1.2. Kết quả phát hiện hành vi tham nhũng qua phản ánh,tố cáo",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R74",
    "ma": "C.1.3",
    "text": "C.1.3. Kết quả phát hiện hành vi tham nhũng qua điều tra, truy tố, xét xử",
    "level": 3,
    "leaf": false
  },
  {
    "rowId": "R75",
    "ma": "C.2",
    "text": "C.2. Việc xử lý tham nhũng",
    "level": 2,
    "leaf": false
  },
  {
    "rowId": "R76",
    "ma": "C.2.1",
    "text": "C.2.1. Kết quả xử lý kỷ luật đối với tổ chức, cá nhân do để xảy ra TN",
    "level": 3,
    "leaf": false
  },
  {
    "rowId": "R77",
    "ma": "C.2.1.1",
    "text": "C.2.1.1. Kết quả xử lý kỷ luật đối với tổ chức do để xảy ra tham nhũng.",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R78",
    "ma": "C.2.1.2",
    "text": "C.2.1.2. Kết quả xử lý kỷ luật hành chính đối với cá nhân có hành vi TN",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R79",
    "ma": "C.2.2",
    "text": "C.2.2. Kết quả xử lý hình sự người có hành vi tham nhũng",
    "level": 3,
    "leaf": false
  },
  {
    "rowId": "R80",
    "ma": "C.2.2.1",
    "text": "C.2.2.1. Kết quả xử lý qua điều tra",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R81",
    "ma": "C.2.2.2",
    "text": "C.2.2.2. Kết quả xử lý qua truy tố",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R82",
    "ma": "C.2.2.3",
    "text": "C.2.2.3. Kết quả xử lý qua xét xử",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R83",
    "ma": "C.2.3",
    "text": "C.2.3. Kết quả xử lý trách nhiệm của người đứng đầu, cấp phó của người đứng đầu cơ quan, tổ chức, đơn vị căn cứ vào mức độ của vụ việc tham nhũng.",
    "level": 3,
    "leaf": false
  },
  {
    "rowId": "R84",
    "ma": "C.2.3.1",
    "text": "C.2.3.1. Hình thức khiển trách",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R85",
    "ma": "C.2.3.2",
    "text": "C.2.3.2. Hình thức cảnh cáo",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R86",
    "ma": "C.2.3.3",
    "text": "C.2.3.3. Hình thức cách chức",
    "level": 4,
    "leaf": true
  },
  {
    "rowId": "R87",
    "ma": "C.3",
    "text": "C.3. Kết quả xử lý hành vi khác vi phạm pháp luật về PCTN",
    "level": 2,
    "leaf": false
  },
  {
    "rowId": "R88",
    "ma": "C.3.1",
    "text": "C.3.1. Kết quả xử lý vi phạm trong thực hiện công khai minh bạch trong hoạt động của cơ quan, tổ chức đơn vị (Điều 81, Nghị định 59/2019/NĐ-CP)",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R89",
    "ma": "C.3.2",
    "text": "C.3.2. Kết quả xử lý vi phạm quy định về chế độ, định mức, tiêu chuẩn (Điều 82, Nghị định 59/2019/NĐ-CP)",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R90",
    "ma": "C.3.3",
    "text": "C.3.3. Kết quả xử lý vi phạm quy tắc ứng xử của người có chức vụ, quyền hạn trong cơ quan, tổ chức, đơn vị (Điều 83, Nghị định 59/2019/NĐ-CP)",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R91",
    "ma": "C.3.4",
    "text": "C.3.4. Kết quả xử lý vi phạm quy định về xung đột lợi ích (Điều 84, Nghị định 59/2019/NĐ-CP)",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R92",
    "ma": "C.3.5",
    "text": "C.3.5. Kết quả xử lý vi phạm quy định về chuyển đổi vị trí công tác (Khoản 2 - Điều 94 Luật PCTN)",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R93",
    "ma": "C.3.6",
    "text": "C.3.6. Kết quả xử lý vi phạm quy định về báo cáo, xử lý báo cáo về hành vi tham nhũng (Điều 85, Nghị định 59/2019/NĐ-CP)",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R94",
    "ma": "C.3.7",
    "text": "C.3.7. Kết quả xử lý hành vi vi phạm đối với người kê khai TSTN (Điều 20, Nghị định 130/2020/NĐ-CP)",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R95",
    "ma": "C.3.8",
    "text": "C.3.8. Kết quả xử lý hành vi vi phạm khác trong kiểm soát TSTN (Điều 21, Nghị định 130/2020/NĐ-CP)",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R96",
    "ma": "D",
    "text": "D. ĐÁNH GIÁ VIỆC THU HỒI TÀI SẢN THAM NHŨNG",
    "level": 1,
    "leaf": false
  },
  {
    "rowId": "R97",
    "ma": "D.1",
    "text": "D.1. Kết quả thu hồi tiền, tài sản tham nhũng qua công tác kiểm tra, giám sát, thanh tra, giải quyết đơn tố cáo, phản ánh",
    "level": 2,
    "leaf": false
  },
  {
    "rowId": "R98",
    "ma": "D.1.1",
    "text": "D.1.1. Kết quả thu hồi tiền, tài sản tham nhũng qua công tác kiểm tra, giám sát, thanh tra",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R99",
    "ma": "D.1.2",
    "text": "D.1.2. Kết quả thu hồi tiền, tài sản tham nhũng qua công tác giải quyết đơn tố cáo, phản ánh",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R100",
    "ma": "D.2",
    "text": "D.2. Kết quả thu hồi tiền, tài sản tham nhũng qua công tác điều tra, truy tố, xét xử, thi hành án",
    "level": 2,
    "leaf": false
  },
  {
    "rowId": "R101",
    "ma": "D.2.1",
    "text": "D.2.1. Kết quả thu hồi tiền, tài sản tham nhũng qua công tác điều tra, truy tố, xét xử",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R102",
    "ma": "D.2.2",
    "text": "D.2.2. Kết quả thu hồi tiền, tài sản tham nhũng qua công tác thi hành án",
    "level": 3,
    "leaf": true
  },
  {
    "rowId": "R103",
    "ma": "Đ",
    "text": "Đ. ĐIỂM TRỪ CÔNG TÁC PCTN NĂM 2025",
    "level": 1,
    "leaf": false
  },
  {
    "rowId": "R104",
    "ma": "ĐT.1",
    "text": "ĐT.1. Việc chậm nộp báo cáo tự đánh giá công tác PCTN năm 2025",
    "level": 2,
    "leaf": true
  },
  {
    "rowId": "R105",
    "ma": "ĐT.2",
    "text": "ĐT.2. Tổ chức cấp tỉnh bị kỷ luật do để xảy ra tham nhũng, tiêu cực năm 2025",
    "level": 2,
    "leaf": true
  },
  {
    "rowId": "R106",
    "ma": "ĐT.3",
    "text": "ĐT.3. Người đứng đầu, cấp phó của người đứng đầu cấp tỉnh bị xử lý do để xảy ra tham nhũng, tiêu cực năm 2025",
    "level": 2,
    "leaf": true
  }
];

var __CTX = {
  ss: null,
  sheets: {},
  dmMeta: null,
  summaryMeta: null
};

var __TRACE = null;

function doGet(e) {
  resetContext_();
  startTrace_('doGet');
  try {
    const action = cleanString_((e && e.parameter && e.parameter.action) || 'ping');
    traceStep_('request.action', { action: action });

    ensureWorkbookStructure_();
    traceStep_('workbook.structureReady');

    if (action === 'getSubmission') {
      const unitCode = cleanString_((e.parameter || {}).unitCode || '');
      if (!unitCode) return jsonResponse_(false, 'Thiếu unitCode.');
      const debug = debugUnitInternal_(unitCode);
      if (!debug.found) return jsonResponse_(false, debug.message, { unitName: debug.unitName || '' });
      const payload = getSubmission_(unitCode);
      return jsonResponse_(true, 'Đã lấy dữ liệu đơn vị.', {
        unitName: debug.unitName || '',
        payload: payload
      });
    }

    if (action === 'debugUnit') {
      const unitCode = cleanString_((e.parameter || {}).unitCode || '');
      if (!unitCode) return jsonResponse_(false, 'Thiếu unitCode.');
      const debug = debugUnitInternal_(unitCode);
      return jsonResponse_(debug.found, debug.message, {
        unitName: debug.unitName || '',
        found: debug.found,
        dmRow: debug.dmRow || 0
      });
    }

    return jsonResponse_(true, 'Apps Script PACA Phụ lục 4 đang hoạt động.', {
      spreadsheetId: SPREADSHEET_ID
    });
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
    const action = cleanString_(payload.action || 'saveSubmission');
    traceStep_('post.action', { action: action });

    ensureWorkbookStructure_();
    traceStep_('workbook.structureReady');

    if (action === 'uploadEvidence') {
      validateUploadPayload_(payload);
      const unitCodeUpload = cleanString_(payload.meta.unitCode);
      const debugUpload = debugUnitInternal_(unitCodeUpload);
      if (!debugUpload.found) throw new Error(debugUpload.message || 'Không nhận diện được đơn vị.');
      traceStep_('unit.identified', { unitCode: unitCodeUpload, dmRow: debugUpload.dmRow || 0, unitName: debugUpload.unitName || '' });

      const uploadResult = uploadEvidence_(payload, debugUpload);
      traceStep_('evidence.uploaded', uploadResult);

      if (debugUpload.dmRow) {
        updateDmRow_(debugUpload.dmRow, payload.meta);
        traceStep_('dm.updated', { row: debugUpload.dmRow || 0 });
      }

      return jsonResponse_(true, 'Tải file minh chứng thành công.', uploadResult);
    }

    if (action === 'deleteEvidence') {
      validateDeleteEvidencePayload_(payload);
      const unitCodeDelete = cleanString_(payload.meta.unitCode);
      const debugDelete = debugUnitInternal_(unitCodeDelete);
      if (!debugDelete.found) throw new Error(debugDelete.message || 'Không nhận diện được đơn vị.');
      traceStep_('unit.identified', { unitCode: unitCodeDelete, unitName: debugDelete.unitName || '' });

      const deleteResult = deleteEvidence_(payload, debugDelete);
      traceStep_('evidence.deleted', deleteResult);

      return jsonResponse_(true, deleteResult.message || 'Đã xóa file và đưa vào thùng rác Google Drive.', deleteResult);
    }

    validatePayload_(payload);
    traceStep_('post.validated', { unitCode: cleanString_(payload.meta.unitCode) });

    const unitCode = cleanString_(payload.meta.unitCode);
    const debug = debugUnitInternal_(unitCode);
    if (!debug.found) throw new Error(debug.message || 'Không nhận diện được đơn vị.');
    traceStep_('unit.identified', { unitCode: unitCode, dmRow: debug.dmRow || 0, unitName: debug.unitName || '' });

    const result = writeSubmission_(payload);
    traceStep_('submission.written', result);

    updateDmRow_(debug.dmRow, payload.meta);
    traceStep_('dm.updated', { row: debug.dmRow || 0 });

    return jsonResponse_(true, 'Ghi dữ liệu thành công.', {
      unitName: debug.unitName || '',
      savedCount: result.savedCount || 0
    });
  } catch (err) {
    traceError_(err);
    return jsonResponse_(false, err && err.message ? err.message : String(err));
  }
}


function authorizeDriveAccess_() {
  return {
    rootFolderId: DriveApp.getRootFolder().getId(),
    email: Session.getActiveUser().getEmail() || ''
  };
}

function resetContext_() {
  __CTX = { ss: null, sheets: {}, dmMeta: null, summaryMeta: null };
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
  return {
    durationMs: endedAt.getTime() - __TRACE.startedAt.getTime(),
    trace: __TRACE.steps
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

function validateDeleteEvidencePayload_(payload) {
  if (!payload || !payload.meta || !cleanString_(payload.meta.unitCode)) {
    throw new Error('Thiếu thông tin đơn vị để xóa file.');
  }
  if (!cleanString_(payload.fileId)) {
    throw new Error('Thiếu mã file cần xóa.');
  }
  if (!payload.item || !cleanString_(payload.item.rowId)) {
    throw new Error('Thiếu thông tin tiêu chí của file cần xóa.');
  }
}

function validateUploadPayload_(payload) {
  if (!payload || typeof payload !== 'object') throw new Error('Payload không hợp lệ.');
  if (!payload.meta || typeof payload.meta !== 'object') throw new Error('Thiếu meta.');
  if (!cleanString_(payload.meta.unitCode)) throw new Error('Chưa chọn đơn vị.');
  if (!payload.item || typeof payload.item !== 'object') throw new Error('Thiếu thông tin tiêu chí.');
  if (!cleanString_(payload.item.rowId)) throw new Error('Thiếu rowId tiêu chí.');
  if (!cleanString_(payload.item.maTieuChi)) throw new Error('Thiếu mã tiêu chí.');
  if (!cleanString_(payload.fileName)) throw new Error('Thiếu tên file.');
  if (!cleanString_(payload.base64Data)) throw new Error('Thiếu dữ liệu file.');
  const mimeType = cleanString_(payload.mimeType || 'application/pdf').toLowerCase();
  if (mimeType && mimeType !== 'application/pdf') throw new Error('Chỉ cho phép file PDF.');
  if (!/\.pdf$/i.test(cleanString_(payload.fileName))) throw new Error('Chỉ cho phép file PDF.');
}

function getSubmission_(unitCode) {
  const unit = UNITS.find(u => u.ma === unitCode) || {};
  const payload = {
    meta: {
      unitCode: unitCode || '',
      unitName: unit.ten || '',
      contactName: '',
      contactPhone: '',
      email: '',
      folderLink: unit.folderLink || ''
    },
    items: CRITERIA_ROWS.filter(x => x.leaf).map(x => ({
      rowId: x.rowId,
      maTieuChi: x.ma,
      tenTieuChi: x.text,
      capTieuChi: x.level,
      coNhapLieu: true,
      soLieuMinhChung: '',
      uploadedFiles: []
    }))
  };

  const dmMeta = getDmMeta_();
  const dmRow = findRowByValue_(UNIT_SHEET, dmMeta.dataStartRow, dmMeta.codeCol, unitCode);
  if (dmRow) {
    const rowValues = getSheet_(UNIT_SHEET).getRange(dmRow, 1, 1, getSheet_(UNIT_SHEET).getLastColumn()).getDisplayValues()[0];
    if (dmMeta.contactCol) payload.meta.contactName = cleanString_(rowValues[dmMeta.contactCol - 1]);
    if (dmMeta.phoneCol) payload.meta.contactPhone = cleanString_(rowValues[dmMeta.phoneCol - 1]);
    if (dmMeta.emailCol) payload.meta.email = cleanString_(rowValues[dmMeta.emailCol - 1]);
  }

  const rawSheet = getSheet_(RAW_SHEET);
  const lastRow = rawSheet.getLastRow();
  if (lastRow < 2) return payload;

  const values = rawSheet.getRange(2, 1, lastRow - 1, 13).getValues().filter(r => cleanString_(r[1]) === unitCode);
  if (!values.length) return payload;

  values.sort(function(a, b) {
    return new Date(a[0]).getTime() - new Date(b[0]).getTime();
  });

  const latestMeta = values[values.length - 1];
  payload.meta.contactName = cleanString_(latestMeta[3] || payload.meta.contactName);
  payload.meta.contactPhone = cleanString_(latestMeta[4] || payload.meta.contactPhone);
  payload.meta.email = cleanString_(latestMeta[5] || payload.meta.email);

  const itemMap = {};
  values.forEach(function(r) {
    itemMap[cleanString_(r[6])] = cleanString_(r[11]);
  });

  payload.items.forEach(function(item) {
    item.soLieuMinhChung = itemMap[item.rowId] || '';
  });

  const uploadMap = getUploadMapByUnit_(unitCode);
  payload.items.forEach(function(item) {
    item.uploadedFiles = uploadMap[item.rowId] || [];
  });
  return payload;
}

function writeSubmission_(payload) {
  const rawSheet = getSheet_(RAW_SHEET);
  const summaryMeta = getSummaryMeta_();
  const now = new Date();
  const unitName = cleanString_(payload.meta.unitName);
  const unitCol = summaryMeta.unitCols[unitName];
  if (!unitCol) throw new Error('Không tìm thấy cột đơn vị trong PL4_TONG_HOP: ' + unitName);

  // Xóa dữ liệu cũ ở cột tổng hợp của đơn vị
  if (summaryMeta.lastRow > 1) {
    getSheet_(SUMMARY_SHEET).getRange(2, unitCol, summaryMeta.lastRow - 1, 1).clearContent();
  }

  const rowsToAppend = [];
  let savedCount = 0;
  (payload.items || []).forEach(function(item) {
    if (item.coNhapLieu !== true) return;
    const value = cleanString_(item.soLieuMinhChung || '');
    rowsToAppend.push([
      now,
      cleanString_(payload.meta.unitCode),
      cleanString_(payload.meta.unitName),
      cleanString_(payload.meta.contactName),
      cleanString_(payload.meta.contactPhone),
      cleanString_(payload.meta.email),
      cleanString_(item.rowId),
      cleanString_(item.maTieuChi),
      cleanString_(item.tenTieuChi),
      item.capTieuChi || '',
      true,
      value,
      'Đã gửi'
    ]);

    const summaryRow = summaryMeta.rowMap[cleanString_(item.rowId)];
    if (summaryRow && value) {
      getSheet_(SUMMARY_SHEET).getRange(summaryRow, unitCol).setValue(value);
      savedCount++;
    }
  });

  if (rowsToAppend.length) {
    rawSheet.getRange(rawSheet.getLastRow() + 1, 1, rowsToAppend.length, rowsToAppend[0].length).setValues(rowsToAppend);
  }

  return {
    savedCount: savedCount,
    totalRows: rowsToAppend.length
  };
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
  ensureHeaders_(UNIT_SHEET, ['MA_DON_VI', 'TEN_DON_VI']);
  ensureHeaders_(SUMMARY_SHEET, ['ROW_ID', 'MA_TIEU_CHI', 'NOI_DUNG_TIEU_CHI', 'CAP_TIEU_CHI', 'CO_NHAP_LIEU']);
  ensureHeaders_(RAW_SHEET, ['TIMESTAMP', 'MA_DON_VI', 'TEN_DON_VI', 'NGUOI_NHAP', 'DIEN_THOAI', 'EMAIL', 'ROW_ID', 'MA_TIEU_CHI', 'NOI_DUNG_TIEU_CHI', 'CAP_TIEU_CHI', 'CO_NHAP_LIEU', 'SO_LIEU_MINH_CHUNG', 'TRANG_THAI_GUI']);
  ensureSheetWithHeaders_(FILE_UPLOAD_SHEET, ['TIMESTAMP', 'MA_DON_VI', 'TEN_DON_VI', 'ROW_ID', 'MA_TIEU_CHI', 'TEN_TIEU_CHI', 'FILE_NAME', 'FILE_URL', 'FILE_ID', 'MIME_TYPE', 'FILE_SIZE', 'FOLDER_NAME', 'FOLDER_URL', 'NGUOI_NHAP', 'DIEN_THOAI', 'EMAIL', 'TRANG_THAI']);
}

function ensureHeaders_(sheetName, requiredHeaders) {
  const sh = getSheet_(sheetName);
  if (!sh) throw new Error('Không tìm thấy sheet ' + sheetName);
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getDisplayValues()[0].map(cleanString_);
  requiredHeaders.forEach(function(h) {
    if (headers.indexOf(cleanString_(h)) < 0) {
      throw new Error('Sheet ' + sheetName + ' thiếu cột bắt buộc: ' + h);
    }
  });
}

function getDmMeta_() {
  if (__CTX.dmMeta) return __CTX.dmMeta;
  const sh = getSheet_(UNIT_SHEET);
  const headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getDisplayValues()[0].map(cleanString_);
  __CTX.dmMeta = {
    dataStartRow: 2,
    codeCol: indexOfHeader_(headers, 'MA_DON_VI'),
    nameCol: indexOfHeader_(headers, 'TEN_DON_VI'),
    contactCol: indexOfHeader_(headers, 'NGUOI_NHAP'),
    phoneCol: indexOfHeader_(headers, 'DIEN_THOAI'),
    emailCol: indexOfHeader_(headers, 'EMAIL'),
    statusCol: indexOfHeader_(headers, 'TRANG_THAI_GUI'),
    updatedAtCol: indexOfHeader_(headers, 'THOI_GIAN_CAP_NHAT')
  };
  return __CTX.dmMeta;
}

function getSummaryMeta_() {
  if (__CTX.summaryMeta) return __CTX.summaryMeta;
  const sh = getSheet_(SUMMARY_SHEET);
  const lastCol = sh.getLastColumn();
  const lastRow = sh.getLastRow();
  const headers = sh.getRange(1, 1, 1, lastCol).getDisplayValues()[0].map(cleanString_);
  const unitCols = {};
  for (var c = 6; c <= lastCol; c++) {
    unitCols[cleanString_(headers[c - 1])] = c;
  }
  const rowIds = lastRow > 1 ? sh.getRange(2, 1, lastRow - 1, 1).getDisplayValues().flat().map(cleanString_) : [];
  const rowMap = {};
  rowIds.forEach(function(id, idx) {
    if (id) rowMap[id] = idx + 2;
  });
  __CTX.summaryMeta = {
    lastRow: lastRow,
    lastCol: lastCol,
    unitCols: unitCols,
    rowMap: rowMap
  };
  return __CTX.summaryMeta;
}

function updateDmRow_(row, meta) {
  const sh = getSheet_(UNIT_SHEET);
  const dmMeta = getDmMeta_();
  const lastCol = sh.getLastColumn();
  const rowValues = sh.getRange(row, 1, 1, lastCol).getValues()[0];

  if (dmMeta.contactCol) rowValues[dmMeta.contactCol - 1] = cleanString_(meta.contactName || '');
  if (dmMeta.phoneCol) rowValues[dmMeta.phoneCol - 1] = cleanString_(meta.contactPhone || '');
  if (dmMeta.emailCol) rowValues[dmMeta.emailCol - 1] = cleanString_(meta.email || '');
  if (dmMeta.statusCol) rowValues[dmMeta.statusCol - 1] = 'Đã nộp';
  if (dmMeta.updatedAtCol) rowValues[dmMeta.updatedAtCol - 1] = nowText_();

  sh.getRange(row, 1, 1, lastCol).setValues([rowValues]);
  if (dmMeta.phoneCol) sh.getRange(row, dmMeta.phoneCol).setNumberFormat('@');
}


function ensureSheetWithHeaders_(sheetName, headers) {
  if (!__CTX.ss) __CTX.ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sh = __CTX.ss.getSheetByName(sheetName);
  if (!sh) {
    sh = __CTX.ss.insertSheet(sheetName);
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    sh.setFrozenRows(1);
    __CTX.sheets[sheetName] = sh;
    return sh;
  }
  const lastCol = Math.max(sh.getLastColumn(), headers.length);
  const currentHeaders = lastCol ? sh.getRange(1, 1, 1, lastCol).getDisplayValues()[0].map(cleanString_) : [];
  headers.forEach(function(h, idx) {
    const expectedCol = idx + 1;
    if (!currentHeaders[idx]) sh.getRange(1, expectedCol).setValue(h);
  });
  const finalHeaders = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), headers.length)).getDisplayValues()[0].map(cleanString_);
  headers.forEach(function(h) {
    if (finalHeaders.indexOf(cleanString_(h)) < 0) {
      throw new Error('Sheet ' + sheetName + ' thiếu cột bắt buộc: ' + h);
    }
  });
  __CTX.sheets[sheetName] = sh;
  return sh;
}

function getUploadMapByUnit_(unitCode) {
  const sh = ensureSheetWithHeaders_(FILE_UPLOAD_SHEET, ['TIMESTAMP', 'MA_DON_VI', 'TEN_DON_VI', 'ROW_ID', 'MA_TIEU_CHI', 'TEN_TIEU_CHI', 'FILE_NAME', 'FILE_URL', 'FILE_ID', 'MIME_TYPE', 'FILE_SIZE', 'FOLDER_NAME', 'FOLDER_URL', 'NGUOI_NHAP', 'DIEN_THOAI', 'EMAIL', 'TRANG_THAI']);
  const lastRow = sh.getLastRow();
  const out = {};
  if (lastRow < 2) return out;
  const values = sh.getRange(2, 1, lastRow - 1, 17).getValues();
  values.forEach(function(r) {
    if (cleanString_(r[1]) !== cleanString_(unitCode)) return;
    if (cleanString_(r[16]) && cleanString_(r[16]) !== 'ACTIVE') return;
    const rowId = cleanString_(r[3]);
    if (!rowId) return;
    if (!out[rowId]) out[rowId] = [];
    out[rowId].push({
      timestampText: r[0] ? Utilities.formatDate(new Date(r[0]), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss') : '',
      fileName: cleanString_(r[6]),
      fileUrl: cleanString_(r[7]),
      fileId: cleanString_(r[8]),
      mimeType: cleanString_(r[9]),
      fileSize: r[10] || '',
      folderName: cleanString_(r[11]),
      folderUrl: cleanString_(r[12])
    });
  });
  return out;
}

function deleteEvidence_(payload, debug) {
  const fileId = cleanString_(payload.fileId);
  const unitCode = cleanString_(payload.meta.unitCode);
  const rowId = cleanString_(payload.item.rowId);
  const uploadSheet = ensureSheetWithHeaders_(FILE_UPLOAD_SHEET, ['TIMESTAMP', 'MA_DON_VI', 'TEN_DON_VI', 'ROW_ID', 'MA_TIEU_CHI', 'TEN_TIEU_CHI', 'FILE_NAME', 'FILE_URL', 'FILE_ID', 'MIME_TYPE', 'FILE_SIZE', 'FOLDER_NAME', 'FOLDER_URL', 'NGUOI_NHAP', 'DIEN_THOAI', 'EMAIL', 'TRANG_THAI']);

  let fileName = cleanString_(payload.fileName);
  let driveDeleted = false;
  let driveMessage = '';
  try {
    const file = DriveApp.getFileById(fileId);
    fileName = fileName || file.getName();
    file.setTrashed(true);
    driveDeleted = true;
    driveMessage = 'Đã đưa file vào Thùng rác Google Drive.';
  } catch (err) {
    const msg = err && err.message ? String(err.message) : String(err || '');
    if (/not found|không tìm thấy|No item with the given ID could be found/i.test(msg)) {
      driveMessage = 'Không còn tìm thấy file trên Google Drive; tiếp tục xóa log theo fileId.';
    } else {
      throw new Error('Không thể xóa file trên Google Drive: ' + msg);
    }
  }

  let deletedLogCount = 0;
  const lastRow = uploadSheet.getLastRow();
  if (lastRow >= 2) {
    const values = uploadSheet.getRange(2, 1, lastRow - 1, 17).getValues();
    for (var i = values.length - 1; i >= 0; i--) {
      const r = values[i];
      const rowUnitCode = cleanString_(r[1]);
      const rowRowId = cleanString_(r[3]);
      const rowFileId = cleanString_(r[8]);
      if (rowFileId === fileId && (!unitCode || rowUnitCode === unitCode) && (!rowId || rowRowId === rowId)) {
        uploadSheet.deleteRow(i + 2);
        deletedLogCount++;
      }
    }
  }

  return {
    fileId: fileId,
    fileName: fileName || '',
    unitCode: unitCode,
    unitName: cleanString_(debug.unitName || payload.meta.unitName),
    rowId: rowId,
    driveDeleted: driveDeleted,
    deletedLogCount: deletedLogCount,
    message: (driveMessage || 'Đã xử lý xóa file.') + ' Đã xóa ' + deletedLogCount + ' dòng log trong FILE_UPLOADS.'
  };
}

function uploadEvidence_(payload, debug) {
  const unit = UNITS.find(function(u) { return cleanString_(u.ma) === cleanString_(payload.meta.unitCode); }) || {};
  const rootFolderId = extractDriveId_(cleanString_(payload.meta.folderLink) || cleanString_(unit.folderLink));
  if (!rootFolderId) throw new Error('Không xác định được thư mục Drive gốc của đơn vị.');

  const criterionFolderName = buildCriterionFolderName_(payload.item.maTieuChi);
  const rootFolder = DriveApp.getFolderById(rootFolderId);
  const targetFolder = findFolderByNameDeep_(rootFolder, criterionFolderName, 10);
  if (!targetFolder) {
    throw new Error('Không tìm thấy thư mục tiêu chí ' + criterionFolderName + ' trong Drive của đơn vị.');
  }

  const bytes = Utilities.base64Decode(payload.base64Data);
  const originalName = cleanString_(payload.fileName);
  const finalName = buildStoredFileName_(cleanString_(payload.meta.unitCode), criterionFolderName, originalName);
  const blob = Utilities.newBlob(bytes, 'application/pdf', finalName);
  const file = targetFolder.createFile(blob);

  const uploadSheet = ensureSheetWithHeaders_(FILE_UPLOAD_SHEET, ['TIMESTAMP', 'MA_DON_VI', 'TEN_DON_VI', 'ROW_ID', 'MA_TIEU_CHI', 'TEN_TIEU_CHI', 'FILE_NAME', 'FILE_URL', 'FILE_ID', 'MIME_TYPE', 'FILE_SIZE', 'FOLDER_NAME', 'FOLDER_URL', 'NGUOI_NHAP', 'DIEN_THOAI', 'EMAIL', 'TRANG_THAI']);
  uploadSheet.appendRow([
    new Date(),
    cleanString_(payload.meta.unitCode),
    cleanString_(debug.unitName || payload.meta.unitName),
    cleanString_(payload.item.rowId),
    cleanString_(payload.item.maTieuChi),
    cleanString_(payload.item.tenTieuChi),
    file.getName(),
    file.getUrl(),
    file.getId(),
    file.getMimeType(),
    Number(payload.fileSize || bytes.length || 0),
    targetFolder.getName(),
    targetFolder.getUrl(),
    cleanString_(payload.meta.contactName),
    cleanString_(payload.meta.contactPhone),
    cleanString_(payload.meta.email),
    'ACTIVE'
  ]);

  return {
    unitName: cleanString_(debug.unitName || payload.meta.unitName),
    fileId: file.getId(),
    fileName: file.getName(),
    fileUrl: file.getUrl(),
    folderName: targetFolder.getName(),
    folderUrl: targetFolder.getUrl(),
    rowId: cleanString_(payload.item.rowId),
    maTieuChi: cleanString_(payload.item.maTieuChi)
  };
}

function buildCriterionFolderName_(maTieuChi) {
  return cleanString_(maTieuChi).replace(/\./g, '-');
}

function extractDriveId_(value) {
  const s = cleanString_(value);
  if (!s) return '';
  const m1 = s.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (m1 && m1[1]) return m1[1];
  const m2 = s.match(/[-\w]{25,}/);
  return m2 ? m2[0] : '';
}

function findFolderByNameDeep_(folder, targetName, maxDepth) {
  if (!folder || !targetName) return null;
  if (cleanString_(folder.getName()) === cleanString_(targetName)) return folder;
  if (maxDepth <= 0) return null;
  const children = folder.getFolders();
  while (children.hasNext()) {
    const child = children.next();
    if (cleanString_(child.getName()) === cleanString_(targetName)) return child;
    const nested = findFolderByNameDeep_(child, targetName, maxDepth - 1);
    if (nested) return nested;
  }
  return null;
}

function buildStoredFileName_(unitCode, criterionFolderName, originalName) {
  const ts = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd_HHmmss');
  const cleanOriginal = cleanString_(originalName).replace(/[^0-9A-Za-zÀ-ỹ._ -]/g, '_');
  const base = cleanOriginal.replace(/\.pdf$/i, '') || 'minh_chung';
  return [cleanString_(unitCode), cleanString_(criterionFolderName), ts, base].join('_') + '.pdf';
}

function getSheet_(sheetName) {
  if (__CTX.sheets[sheetName]) return __CTX.sheets[sheetName];
  if (!__CTX.ss) __CTX.ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sh = __CTX.ss.getSheetByName(sheetName);
  if (!sh) throw new Error('Không tìm thấy sheet ' + sheetName);
  __CTX.sheets[sheetName] = sh;
  return sh;
}

function findRowByValue_(sheetName, startRow, col, value) {
  const sh = getSheet_(sheetName);
  const lastRow = sh.getLastRow();
  if (lastRow < startRow) return 0;
  const values = sh.getRange(startRow, col, lastRow - startRow + 1, 1).getDisplayValues().flat().map(cleanString_);
  const idx = values.indexOf(cleanString_(value));
  return idx >= 0 ? startRow + idx : 0;
}

function indexOfHeader_(headers, headerName) {
  const idx = headers.indexOf(cleanString_(headerName));
  return idx >= 0 ? idx + 1 : 0;
}

function cleanString_(v) {
  return String(v == null ? '' : v).trim();
}

function nowText_() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');
}

function jsonResponse_(success, message, extra) {
  const out = {
    success: !!success,
    message: message || '',
    spreadsheetId: SPREADSHEET_ID,
    serverTime: nowText_()
  };
  const trace = buildTraceSummary_();
  out.durationMs = trace.durationMs || 0;
  if (extra && typeof extra === 'object') {
    Object.keys(extra).forEach(function(k) {
      out[k] = extra[k];
    });
  }
  return ContentService
    .createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}
