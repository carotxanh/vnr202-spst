/**
 * VNR202 Landing Page Application Logic
 * Chương 2 - Phần II - Mục 1: Sự lãnh đạo của Đảng đối với cách mạng hai miền Nam - Bắc (1954 - 1965)
 * Giáo trình VNR202 SP24 - Session 15
 */

// Timeline Milestones Data
const TIMELINE_DATA = [
  {
    id: '1954-geneve',
    date: '07 / 1954',
    title: 'Ký Kết Hiệp Định Genève & Chia Cắt Tạm Thời',
    category: 'all',
    catLabel: 'BỐI CẢNH TOÀN QUỐC',
    badgeClass: 'gold',
    desc: 'Hiệp định Genève được ký kết, chấm dứt 9 năm kháng chiến chống Pháp. Vĩ tuyến 17 (sông Bến Hải) trở thành giới tuyến quân sự tạm thời. Đất nước tạm thời bị chia làm hai miền; dự kiến tổng tuyển cử thống nhất vào tháng 7/1956.',
    slide: 'Slide 3 – 4',
    images: ['image30.png'],
    details: 'Hội nghị Trung ương lần 6 (7/1954) và Lời kêu gọi của Chủ tịch Hồ Chí Minh khẳng định: "Trung - Nam - Bắc đều là bờ cõi của ta, nước ta nhất định thống nhất". Tuy nhiên, đế quốc Mỹ đã can thiệp, hất cẳng Pháp, dựng lên chính quyền tay sai Ngô Đình Diệm để biến miền Nam thành thuộc địa kiểu mới.'
  },
  {
    id: '1954-hanoi',
    date: '10 / 10 / 1954',
    title: 'Giải Phóng Thủ Đô Hà Nội',
    category: 'north',
    catLabel: 'MẶT TRẬN MIỀN BẮC',
    badgeClass: 'cyan',
    desc: 'Đoàn quân chiến thắng tiến về tiếp quản Thủ đô Hà Nội trong niềm hân hoan rợp cờ hoa. Miền Bắc hoàn toàn giải phóng, bắt tay vào công cuộc khôi phục kinh tế bị 9 năm chiến tranh tàn phá nặng nề.',
    slide: 'Slide 4 – 5',
    images: ['image17.png', 'image18.png'],
    details: 'Tháng 9/1954, Bộ Chính trị đề ra nhiệm vụ chủ yếu trước mắt của miền Bắc: Hàn gắn vết thương chiến tranh, phục hồi kinh tế quốc dân, trước hết là phục hồi nông nghiệp để ổn định xã hội và đời sống nhân dân.'
  },
  {
    id: '1956-ruongdat',
    date: '07 / 1956',
    title: 'Hoàn Thành Cải Cách Ruộng Đất ở Miền Bắc',
    category: 'north',
    catLabel: 'MẶT TRẬN MIỀN BẮC',
    badgeClass: 'cyan',
    desc: 'Chế độ chiếm hữu ruộng đất phong kiến ở miền Bắc bị xóa bỏ hoàn toàn. Hơn 9 triệu nông dân trong 2 triệu hộ gia đình được chia hơn 810.000 ha ruộng đất, hiện thực hóa ước mơ "Người cày có ruộng".',
    slide: 'Slide 6',
    images: ['image25.png'],
    details: 'Đến năm 1957, sản lượng và năng suất lương thực của miền Bắc đã đạt và vượt mức năm 1939 (năm cao nhất thời Pháp thuộc). Nông dân phấn khởi thi đua sản xuất, củng cố vững chắc hậu phương xã hội chủ nghĩa.'
  },
  {
    id: '1956-decuong',
    date: '08 / 1956',
    title: 'Đề Cương Đường Lối Cách Mạng Miền Nam (Lê Duẩn)',
    category: 'south',
    catLabel: 'MẶT TRẬN MIỀN NAM',
    badgeClass: 'red',
    desc: 'Đồng chí Lê Duẩn (Bí thư Xứ ủy Nam Bộ) hoàn thành bản dự thảo "Đề cương đường lối cách mạng miền Nam Việt Nam", vạch rõ con đường giải phóng miền Nam là con đường cách mạng bạo lực đánh đổ chế độ Mỹ - Diệm.',
    slide: 'Slide 9',
    images: ['image73.png'],
    details: 'Đề cương khẳng định: Chế độ thống trị của Mỹ - Diệm là chế độ thực dân kiểu mới tàn bạo; nhân dân miền Nam không có con đường nào khác ngoài con đường cách mạng bạo lực quần chúng để tự cứu mình và giành lại độc lập tự do.'
  },
  {
    id: '1958-caitao',
    date: '1958 — 1960',
    title: 'Cải Tạo XHCN & Hợp Tác Hóa Nông Nghiệp',
    category: 'north',
    catLabel: 'MẶT TRẬN MIỀN BẮC',
    badgeClass: 'cyan',
    desc: 'Hội nghị Trung ương 14 (11/1958) và Hội nghị 16 (4/1959) đẩy mạnh hợp tác hóa nông nghiệp theo 3 nguyên tắc: Tự nguyện - Cùng có lợi - Quản lý dân chủ; cải tạo hòa bình đối với tư sản dân tộc bằng công tư hợp doanh.',
    slide: 'Slide 7',
    images: ['image36.png'],
    details: 'Đảng xác định giai cấp tư sản dân tộc là thành viên của Mặt trận Tổ quốc; về kinh tế không tịch thu mà mua lại tư liệu sản xuất, bố trí việc làm cho nhà tư sản trong xí nghiệp, dần cải tạo họ thành người lao động chân chính.'
  },
  {
    id: '1959-luat1059',
    date: '05 / 1959',
    title: 'Mỹ - Diệm Ra Đạo Luật 10/59 Lê Máy Chém Khắp Miền Nam',
    category: 'south',
    catLabel: 'MẶT TRẬN MIỀN NAM',
    badgeClass: 'red',
    desc: 'Ngô Đình Diệm tuyên bố "đặt miền Nam trong tình trạng chiến tranh", ban hành Đạo luật 10/59 thành lập các Tòa án quân sự đặc biệt, lê máy chém đi khắp miền Nam tàn sát đồng bào yêu nước và chiến sĩ cách mạng.',
    slide: 'Slide 8, 10',
    images: ['image48.png', 'image43.png'],
    details: 'Địch dồn dân vào các "khu trù mật", "khu dinh điền", thực hiện chính sách "tố cộng, diệt cộng" dã man, biến miền Nam thành địa ngục trần gian nhằm triệt phá cơ sở cách mạng.'
  },
  {
    id: '1959-tw15',
    date: '01 / 1959',
    title: 'Nghị Quyết Hội Nghị Trung Ương 15: Bước Ngoặt Bạo Lực CM',
    category: 'south',
    catLabel: 'MẶT TRẬN MIỀN NAM',
    badgeClass: 'red',
    desc: 'Nghị quyết Trung ương 15 (mở rộng) xác định phương hướng cơ bản: sử dụng bạo lực cách mạng, kết hợp đấu tranh chính trị với đấu tranh quân sự, khởi nghĩa từng phần tiến tới tổng khởi nghĩa giành chính quyền.',
    slide: 'Slide 10',
    images: ['image44.png'],
    details: 'Nghị quyết 15 đáp ứng đúng nguyện vọng cháy bỏng của nhân dân miền Nam, giải tỏa bế tắc, chuyển cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công mạnh mẽ, mở đường cho bão táp Đồng Khởi bùng nổ.'
  },
  {
    id: '1959-559-759',
    date: '05 / 1959 & 10 / 1961',
    title: 'Khai Sinh Tuyến 559 (Trường Sơn) & Tuyến 759 (Biển Đông)',
    category: 'supply',
    catLabel: 'TUYẾN CHI VIỆN CHIẾN LƯỢC',
    badgeClass: 'gold',
    desc: 'Tháng 5/1959 thành lập Đoàn 559 mở đường mòn Hồ Chí Minh xuyên dải Trường Sơn; tháng 10/1961 thành lập Đoàn 759 (Binh đoàn Tàu Không Số) vận chuyển vũ khí hạng nặng chi viện thần tốc cho tiền tuyến lớn miền Nam.',
    slide: 'Slide 11',
    images: ['image51.png'],
    details: 'Hai tuyến chi viện huyết mạch thể hiện ý chí "Xẻ dọc Trường Sơn đi cứu nước" và "Tất cả vì miền Nam ruột thịt". Đến năm 1965 số quân chi viện tăng gấp 9 lần, vật chất tăng gấp 10 lần so với 1961.'
  },
  {
    id: '1960-dongkhoi',
    date: '17 / 01 / 1960',
    title: 'Bùng Nổ Phong Trào Đồng Khởi Bến Tre',
    category: 'south',
    catLabel: 'MẶT TRẬN MIỀN NAM',
    badgeClass: 'red',
    desc: 'Khởi nghĩa nổ ra đồng loạt tại 3 xã Định Thủy, Phước Hiệp, Bình Khánh (huyện Mỏ Cày, Bến Tre) rồi lan rộng khắp Nam Bộ và Tây Nguyên. "Đội quân tóc dài" làm tan rã từng mảng lớn chính quyền cơ sở của địch.',
    slide: 'Slide 11',
    images: ['image63.png'],
    details: 'Đồng Khởi đánh dấu bước nhảy vọt của cách mạng miền Nam, chuyển từ thế phòng ngự, giữ gìn lực lượng sang thế tiến công liên tục, giáng đòn quyết định vào chủ nghĩa thực dân mới của Mỹ.'
  },
  {
    id: '1960-daihoi3',
    date: '05 — 10 / 09 / 1960',
    title: 'Đại Hội Đảng Lần Thứ III Tại Hà Nội: Đường Lối 2 Miền',
    category: 'north',
    catLabel: 'MẶT TRẬN MIỀN BẮC',
    badgeClass: 'cyan',
    desc: 'Chủ tịch Hồ Chí Minh chỉ rõ: "Đại hội lần này là Đại hội xây dựng chủ nghĩa xã hội ở miền Bắc và đấu tranh hòa bình thống nhất nước nhà". Đảng hoàn chỉnh đường lối thực hiện đồng thời hai chiến lược cách mạng.',
    slide: 'Slide 12 – 14',
    images: ['image58.png'],
    details: 'Nghị quyết Đại hội III xác định: Cách mạng XHCN ở miền Bắc giữ vai trò "quyết định nhất" đối với toàn bộ cách mạng Việt Nam; Cách mạng DTDCND ở miền Nam giữ vai trò "quyết định trực tiếp" đối với sự nghiệp giải phóng miền Nam.'
  },
  {
    id: '1960-mattran',
    date: '20 / 12 / 1960',
    title: 'Thành Lập Mặt Trận Dân Tộc Giải Phóng Miền Nam Việt Nam',
    category: 'south',
    catLabel: 'MẶT TRẬN MIỀN NAM',
    badgeClass: 'red',
    desc: 'Tại căn cứ Tân Lập (Tây Ninh), Mặt trận Dân tộc Giải phóng miền Nam Việt Nam ra đời do Luật sư Nguyễn Hữu Thọ làm Chủ tịch, tập hợp rộng rãi mọi tầng lớp nhân dân yêu nước chống Mỹ - ngụy.',
    slide: 'Slide 11',
    images: ['image57.png'],
    details: 'Mặt trận ban hành Tuyên ngôn và Chương trình hành động 10 điểm, giương cao ngọn cờ độc lập, dân chủ, hòa bình, trung lập, tiến tới hòa bình thống nhất Tổ quốc.'
  },
  {
    id: '1961-kehoach5nam',
    date: '1961 — 1965',
    title: 'Kế Hoạch 5 Năm Lần Thứ Nhất Xây Dựng CNXH Ở Miền Bắc',
    category: 'north',
    catLabel: 'MẶT TRẬN MIỀN BẮC',
    badgeClass: 'cyan',
    desc: 'Miền Bắc bước vào thời kỳ xây dựng cơ sở vật chất - kỹ thuật cho CNXH: xây dựng Khu gang thép Thái Nguyên, Nhà máy Nhiệt điện Uông Bí, Thủy điện Thác Bà, Khu công nghiệp Việt Trì, nâng cao đời sống nhân dân.',
    slide: 'Slide 15',
    images: ['image72.png'],
    details: 'Công nghiệp hóa XHCN được xác định là nhiệm vụ trung tâm trong suốt thời kỳ quá độ. Miền Bắc trở thành căn cứ địa cách mạng cả nước và hậu phương vững chắc chi viện đắc lực cho miền Nam.'
  },
  {
    id: '1963-apbac',
    date: '02 / 01 / 1963',
    title: 'Chiến Thắng Ấp Bắc: Đập Tan "Trực Thăng Vận & Thiết Xa Vận"',
    category: 'south',
    catLabel: 'MẶT TRẬN MIỀN NAM',
    badgeClass: 'red',
    desc: 'Tại xã Tân Phú Trung (Mỹ Tho), lực lượng vũ trang cách mạng kiên cường đánh bại cuộc càn quy mô lớn của 2.000 quân địch có máy bay trực thăng và xe bọc thép M113 yểm trợ, bắn rơi 5 trực thăng, bắn cháy 3 xe M113.',
    slide: 'Slide 16 – 17',
    images: ['image85.png', 'image83.png', 'image78.png'],
    details: 'Chiến thắng Ấp Bắc chứng minh quân và dân ta hoàn toàn có khả năng đánh bại các chiến thuật quân sự tối tân của Mỹ, mở đầu cao trào thi đua "Ấp Bắc giết giặc lập công", làm lung lay 3 trụ cột ngụy quân - ngụy quyền - ấp chiến lược.'
  },
  {
    id: '1965-phasan',
    date: 'Đầu 1965',
    title: 'Chiến Lược "Chiến Tranh Đặc Biệt" Của Mỹ Hoàn Toàn Phá Sản',
    category: 'south',
    catLabel: 'MẶT TRẬN MIỀN NAM',
    badgeClass: 'red',
    desc: 'Với các chiến thắng vang dội Bình Giã (12/1964), An Lão, Ba Gia (5/1965), Đồng Xoài (6/1965), quân dân miền Nam đã đập tan xương sống "ấp chiến lược", làm sụp đổ hoàn toàn chiến lược "Chiến tranh đặc biệt" của đế quốc Mỹ.',
    slide: 'Slide 17',
    images: ['image87.png'],
    details: 'Đến đầu năm 1965, cả 3 trụ cột của Chiến tranh đặc biệt bị sụp đổ. Thất bại thảm hại này buộc Mỹ phải chuyển sang chiến lược "Chiến tranh cục bộ", trực tiếp đưa quân viễn chinh Mỹ vào miền Nam.'
  }
];

// Curated Comprehensive Quiz Bank for Session 15
const QUIZ_BANK = [
  {
    q: 'Sau Hiệp định Genève (7/1954), đặc điểm lớn nhất và nét độc đáo của cách mạng Việt Nam là gì?',
    opts: [
      'Một Đảng lãnh đạo đồng thời hai cuộc cách mạng khác nhau ở hai miền có chế độ chính trị - xã hội khác nhau',
      'Cả nước cùng bước ngay vào thời kỳ công nghiệp hóa xã hội chủ nghĩa',
      'Đảng rút toàn bộ lực lượng về miền Bắc để phát triển kinh tế 10 năm',
      'Miền Nam tiến hành cách mạng tư sản dân quyền dưới sự trợ giúp của Liên Hợp Quốc'
    ],
    ans: 0,
    source: 'Session 15 - Slide 4',
    explain: 'Sau tháng 7/1954 đất nước tạm thời bị chia cắt: Miền Bắc giải phóng tiến lên CNXH, Miền Nam tiếp tục cách mạng dân tộc dân chủ nhân dân. Đảng Cộng sản Việt Nam lãnh đạo đồng thời hai nhiệm vụ chiến lược trên cả hai miền.'
  },
  {
    q: 'Trong giai đoạn 1954 - 1957, Đảng đề ra nhiệm vụ trọng tâm trước mắt ở miền Bắc là gì?',
    opts: [
      'Hàn gắn vết thương chiến tranh, phục hồi kinh tế quốc dân, lấy phục hồi nông nghiệp làm trọng tâm',
      'Tập trung xây dựng các nhà máy công nghiệp nặng và đường sắt cao tốc',
      'Phát động tổng khởi nghĩa vũ trang trên quy mô toàn quốc',
      'Tiến hành xóa bỏ kinh tế nhiều thành phần ngay lập tức'
    ],
    ans: 0,
    source: 'Session 15 - Slide 5',
    explain: 'Tháng 9/1954, Bộ Chính trị xác định: Sau 9 năm chiến tranh tàn phá, nhiệm vụ trước mắt là hàn gắn vết thương chiến tranh, phục hồi nông nghiệp để ổn định xã hội và cải thiện đời sống nhân dân.'
  },
  {
    q: 'Đến tháng 7/1956, thắng lợi to lớn nào đã được hoàn thành căn bản ở miền Bắc?',
    opts: [
      'Cải cách ruộng đất, xóa bỏ hoàn toàn chế độ chiếm hữu ruộng đất phong kiến',
      'Xây dựng xong Khu gang thép Thái Nguyên',
      'Hoàn thành hợp tác hóa bậc cao ở 100% thôn xã',
      'Đánh bại hoàn toàn chiến tranh phá hoại bằng không quân của Mỹ'
    ],
    ans: 0,
    source: 'Session 15 - Slide 6',
    explain: 'Tháng 7/1956, chế độ phong kiến chiếm hữu ruộng đất ở miền Bắc bị xóa bỏ triệt để. Hơn 9 triệu nông dân trong 2 triệu hộ gia đình được chia hơn 810.000 ha ruộng đất cày cấy.'
  },
  {
    q: 'Ba nguyên tắc cơ bản trong phong trào hợp tác hóa nông nghiệp ở miền Bắc (1958 - 1960) là gì?',
    opts: [
      'Tự nguyện, cùng có lợi và quản lý dân chủ',
      'Cưỡng bách, tập trung và quản lý nhà nước',
      'Giao khoán sản phẩm, tư nhân hóa và tự hạch toán',
      'Bao cấp toàn bộ, bình quân và cơ giới hóa bắt buộc'
    ],
    ans: 0,
    source: 'Session 15 - Slide 7',
    explain: 'Hội nghị Trung ương 16 (4/1959) xác định ba nguyên tắc hợp tác hóa nông nghiệp: Tự nguyện, cùng có lợi và quản lý dân chủ, lấy thủy lợi hóa và tổ chức lại lao động làm trọng tâm.'
  },
  {
    q: 'Chính sách của Đảng đối với giai cấp tư sản dân tộc trong công cuộc cải tạo XHCN ở miền Bắc là gì?',
    opts: [
      'Cải tạo hòa bình; về chính trị coi họ là thành viên Mặt trận Tổ quốc; về kinh tế thực hiện công tư hợp doanh',
      'Tịch thu toàn bộ tài sản và trục xuất khỏi thành phố',
      'Tước bỏ quyền công dân và xóa bỏ tư hữu ngay lập tức',
      'Để kinh tế tư bản tư doanh phát triển tự do không kiểm soát'
    ],
    ans: 0,
    source: 'Session 15 - Slide 7',
    explain: 'Đảng chủ trương cải tạo hòa bình: không tịch thu mà chuộc lại tư liệu sản xuất thông qua hình thức công tư hợp doanh, sắp xếp việc làm cho nhà tư sản để dần chuyển hóa họ thành người lao động.'
  },
  {
    q: 'Bản "Đề cương đường lối cách mạng miền Nam Việt Nam" (8/1956) do ai khởi thảo?',
    opts: [
      'Đồng chí Lê Duẩn (Bí thư Xứ ủy Nam Bộ)',
      'Đồng chí Trường Chinh',
      'Đồng chí Phạm Văn Đồng',
      'Luật sư Nguyễn Hữu Thọ'
    ],
    ans: 0,
    source: 'Session 15 - Slide 9',
    explain: 'Bản Đề cương nổi tiếng do đồng chí Lê Duẩn soạn thảo tại Bến Tre và Sài Gòn, khẳng định cách mạng miền Nam phải dùng bạo lực cách mạng quần chúng để tự giải phóng.'
  },
  {
    q: 'Tháng 5/1959, chính quyền tay sai Ngô Đình Diệm đã ban hành văn bản tàn bạo nào nhằm khủng bố người yêu nước?',
    opts: [
      'Đạo luật số 10/59 lập Tòa án quân sự đặc biệt, lê máy chém khắp miền Nam',
      'Sắc lệnh tình trạng khẩn cấp toàn quốc',
      'Kế hoạch bình định Staley - Taylor',
      'Luật cải cách điền địa cưỡng bức'
    ],
    ans: 0,
    source: 'Session 15 - Slide 10',
    explain: 'Đạo luật 10/59 cho phép tòa án quân sự đặc biệt tuyên án tử hình hoặc khổ sai chung thân đối với những người bị quy là cộng sản mà không cần qua thủ tục điều tra, xét xử bình thường.'
  },
  {
    q: 'Nghị quyết Hội nghị Trung ương lần thứ 15 (1/1959) đã xác định con đường cơ bản của cách mạng miền Nam là gì?',
    opts: [
      'Khởi nghĩa giành chính quyền về tay nhân dân bằng bạo lực cách mạng, kết hợp đấu tranh chính trị với đấu tranh quân sự',
      'Đấu tranh hòa bình trên bàn đàm phán quốc tế',
      'Chờ đợi miền Bắc hoàn thành xong Kế hoạch 5 năm mới khởi nghĩa',
      'Đưa toàn bộ thanh niên miền Nam ra miền Bắc học tập'
    ],
    ans: 0,
    source: 'Session 15 - Slide 10',
    explain: 'Nghị quyết TW 15 có ý nghĩa lịch sử vô cùng to lớn, cho phép sử dụng bạo lực cách mạng, kết hợp lực lượng chính trị và vũ trang để khởi nghĩa từng phần giành chính quyền.'
  },
  {
    q: 'Phong trào Đồng Khởi (1960) nổ ra đầu tiên và tiêu biểu nhất ở địa phương nào?',
    opts: [
      'Huyện Mỏ Cày, tỉnh Bến Tre (ngày 17/1/1960)',
      'Huyện Củ Chi, Sài Gòn',
      'Huyện Cai Lậy, tỉnh Mỹ Tho',
      'Huyện Vĩnh Linh, tỉnh Quảng Trị'
    ],
    ans: 0,
    source: 'Session 15 - Slide 11',
    explain: 'Ngày 17/1/1960, dưới sự lãnh đạo của Tỉnh ủy Bến Tre, cuộc Đồng Khởi bùng nổ đồng loạt tại 3 xã Định Thủy, Phước Hiệp, Bình Khánh (Mỏ Cày) rồi lan tỏa khắp miền Nam.'
  },
  {
    q: 'Mặt trận Dân tộc Giải phóng miền Nam Việt Nam được thành lập vào ngày tháng năm nào?',
    opts: [
      'Ngày 20/12/1960 (tại căn cứ Tân Lập, Tây Ninh)',
      'Ngày 10/10/1954',
      'Ngày 02/09/1960',
      'Ngày 02/01/1963'
    ],
    ans: 0,
    source: 'Session 15 - Slide 11',
    explain: 'Mặt trận ra đời ngày 20/12/1960 do Luật sư Nguyễn Hữu Thọ làm Chủ tịch, giương cao ngọn cờ đoàn kết toàn dân chống đế quốc Mỹ và chính quyền tay sai.'
  },
  {
    q: 'Đại hội đại biểu toàn quốc lần thứ III của Đảng (9/1960) xác định vai trò của cách mạng miền Bắc là gì?',
    opts: [
      'Giữ vai trò quyết định nhất đối với sự phát triển của toàn bộ cách mạng Việt Nam và sự nghiệp thống nhất nước nhà',
      'Giữ vai trò quyết định trực tiếp đối với việc đánh đổ quân đội Mỹ ở miền Nam',
      'Giữ vai trò hậu cần thứ yếu cho cuộc đấu tranh ngoại giao',
      'Chỉ tập trung phát triển kinh tế nội bộ, không can dự vào miền Nam'
    ],
    ans: 0,
    source: 'Session 15 - Slide 12 – 13',
    explain: 'Đại hội III chỉ rõ: Cách mạng XHCN ở miền Bắc giữ vai trò "quyết định nhất"; Cách mạng DTDCND ở miền Nam giữ vai trò "quyết định trực tiếp".'
  },
  {
    q: 'Đến năm 1965, mức độ chi viện từ hậu phương lớn miền Bắc cho tiền tuyến miền Nam đã tăng như thế nào so với năm 1961?',
    opts: [
      'Quân số tăng gấp 9 lần, khối lượng vật chất tăng gấp 10 lần',
      'Quân số tăng gấp đôi, vật chất tăng gấp 3 lần',
      'Quân số tăng 5 lần, vật chất tăng 5 lần',
      'Quân số không đổi, chỉ chi viện thuốc men và điện đài'
    ],
    ans: 0,
    source: 'Session 15 - Slide 15',
    explain: 'Nhờ Kế hoạch 5 năm lần 1 phát triển kinh tế và các tuyến đường vận tải 559, 759, đến năm 1965 quân số chi viện tăng 9 lần, vật chất tăng 10 lần so với 1961.'
  },
  {
    q: 'Đế quốc Mỹ bắt đầu rải chất độc hóa học Dioxin (chất độc da cam) xuống chiến trường miền Nam vào thời điểm nào?',
    opts: [
      'Ngày 10/08/1961',
      'Ngày 10/10/1954',
      'Ngày 02/01/1963',
      'Ngày 30/04/1975'
    ],
    ans: 0,
    source: 'Session 15 - Slide 16',
    explain: 'Chuyến bay rải chất diệt cỏ khai hoang đầu tiên của không quân Mỹ diễn ra vào ngày 10/8/1961 dọc Quốc lộ 14 (Kon Tum), mở đầu thảm họa da cam tàn khốc.'
  },
  {
    q: 'Ý nghĩa lịch sử nổi bật của Chiến thắng Ấp Bắc (02/01/1963) là gì?',
    opts: [
      'Chứng minh quân dân ta hoàn toàn có khả năng đánh bại chiến thuật "trực thăng vận" và "thiết xa vận" của Mỹ',
      'Buộc quân đội viễn chinh Mỹ phải ký Hiệp định đình chiến ngay trong năm 1963',
      'Giải phóng hoàn toàn toàn bộ vùng đồng bằng sông Cửu Long',
      'Kết thúc hoàn toàn cuộc kháng chiến chống Mỹ cứu nước'
    ],
    ans: 0,
    source: 'Session 15 - Slide 17',
    explain: 'Chiến thắng Ấp Bắc đã bẻ gãy 2 chiến thuật tân kỳ của quân đội Mỹ là trực thăng vận và thiết xa vận (xe bọc thép M113), mở ra phong trào "Thi đua Ấp Bắc, giết giặc lập công".'
  },
  {
    q: 'Đến đầu năm 1965, ba "trụ cột" nào của chiến lược Chiến tranh đặc biệt của Mỹ bị rung chuyển và sụp đổ?',
    opts: [
      'Ngụy quân, ngụy quyền và ấp chiến lược',
      'Không quân B-52, Hạm đội 7 và pháo binh hạng nặng',
      'Căn cứ quân sự Đà Nẵng, sân bay Biên Hòa và Tòa đại sứ Mỹ',
      'Lực lượng lính thủy đánh bộ Mỹ, cố vấn CIA và tòa án quân sự'
    ],
    ans: 0,
    source: 'Session 15 - Slide 17',
    explain: 'Với các chiến thắng Ấp Bắc, Bình Giã, Ba Gia, Đồng Xoài và cao trào phá ấp chiến lược của quần chúng, cả 3 trụ cột (ngụy quân, ngụy quyền, ấp chiến lược) đều bị phá sản.'
  }
];

// App State
let currentQuizIndex = 0;
let userQuizScore = 0;
let quizAnswered = false;

// Audio Synthesizer / Stream
class BackgroundMusicController {
  constructor() {
    this.playing = false;
    this.audioEl = document.getElementById('bg-audio');
    this.audioBtn = document.getElementById('audio-toggle-btn');
  }

  toggle() {
    if (!this.audioEl) return;
    if (this.playing) {
      this.audioEl.pause();
      this.playing = false;
      if (this.audioBtn) {
        this.audioBtn.classList.remove('playing');
        this.audioBtn.querySelector('.btn-text').textContent = 'BẬT ÂM THANH';
      }
    } else {
      this.audioEl.play().then(() => {
        this.playing = true;
        if (this.audioBtn) {
          this.audioBtn.classList.add('playing');
          this.audioBtn.querySelector('.btn-text').textContent = 'TẮT ÂM THANH';
        }
      }).catch(err => {
        console.log('Audio autoplay prevented by browser policy:', err);
      });
    }
  }
}
const bgMusic = new BackgroundMusicController();

// Timeline Filtering
function initTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  function render(category = 'all') {
    const filtered = category === 'all' 
      ? TIMELINE_DATA 
      : TIMELINE_DATA.filter(item => item.category === category || item.category === 'all');

    container.innerHTML = filtered.map(item => `
      <article class="timeline-node" data-id="${item.id}">
        <div class="timeline-date">
          <strong>${item.date}</strong>
          <span>${item.catLabel}</span>
        </div>
        <div class="timeline-pin"></div>
        <div class="timeline-card">
          <div class="timeline-card-top">
            <span class="badge-tag ${item.badgeClass}">${item.catLabel}</span>
            <span class="slide-ref">${item.slide}</span>
          </div>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          ${item.images && item.images.length > 0 ? `
            <div class="timeline-media-row">
              ${item.images.map(img => `
                <img src="assets/history/${img}" alt="${item.title}" title="Bấm để xem tư liệu phóng to" onclick="openMilestoneModal('${item.id}')" loading="lazy">
              `).join('')}
            </div>
          ` : ''}
          <div class="timeline-card-meta">
            <span style="cursor: pointer; color: var(--gold); font-weight: 700;" onclick="openMilestoneModal('${item.id}')">
              XEM CHI TIẾT LỊCH SỬ & GIÁO TRÌNH →
            </span>
            <span>Nguồn: VNR202 SP24</span>
          </div>
        </div>
      </article>
    `).join('');
  }

  render('all');

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.dataset.filter);
    });
  });
}

// Milestone Details Modal
window.openMilestoneModal = function(id) {
  const item = TIMELINE_DATA.find(t => t.id === id);
  if (!item) return;

  const modal = document.getElementById('milestone-modal');
  const body = document.getElementById('modal-body-content');
  if (!modal || !body) return;

  body.innerHTML = `
    <span class="badge-tag ${item.badgeClass}" style="margin-bottom: 12px;">${item.catLabel} • ${item.date}</span>
    <h2 style="font-size: 26px; color: #fff; margin-bottom: 14px;">${item.title}</h2>
    <div style="font-style: italic; color: var(--gold); margin-bottom: 18px; font-size: 14px;">
      Trích giáo trình VNR202 SP24 — ${item.slide}
    </div>
    <p style="font-size: 15px; color: var(--ink); line-height: 1.8; margin-bottom: 20px;">
      ${item.desc}
    </p>
    <div style="background: rgba(0,0,0,0.3); padding: 18px; border-radius: 8px; border-left: 3px solid var(--gold); margin-bottom: 20px;">
      <h4 style="font-size: 14px; color: var(--gold); margin-bottom: 8px;">PHÂN TÍCH Ý NGHĨA LỊCH SỬ:</h4>
      <p style="font-size: 14px; color: var(--ink-muted); line-height: 1.7; margin: 0;">
        ${item.details}
      </p>
    </div>
    ${item.images && item.images.length > 0 ? `
      <div style="display: flex; gap: 14px; flex-wrap: wrap; margin-top: 20px;">
        ${item.images.map(img => `
          <img src="assets/history/${img}" alt="Tư liệu giáo trình" style="max-height: 200px; border-radius: 6px; border: 1px solid var(--line);">
        `).join('')}
      </div>
    ` : ''}
  `;

  modal.classList.add('open');
};

window.closeMilestoneModal = function() {
  const modal = document.getElementById('milestone-modal');
  if (modal) modal.classList.remove('open');
};

// Quiz Engine
function initQuizEngine() {
  renderQuizQuestion();

  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentQuizIndex = (currentQuizIndex + 1) % QUIZ_BANK.length;
      quizAnswered = false;
      renderQuizQuestion();
    });
  }
}

function renderQuizQuestion() {
  const qObj = QUIZ_BANK[currentQuizIndex];
  if (!qObj) return;

  const counter = document.getElementById('quiz-counter-text');
  const source = document.getElementById('quiz-source-text');
  const qText = document.getElementById('quiz-q-text');
  const optContainer = document.getElementById('quiz-options-container');
  const feedback = document.getElementById('quiz-feedback-box');
  const nextBtn = document.getElementById('quiz-next-btn');

  if (counter) counter.textContent = `CÂU HỎI ${currentQuizIndex + 1} / ${QUIZ_BANK.length}`;
  if (source) source.textContent = qObj.source;
  if (qText) qText.textContent = qObj.q;

  if (feedback) {
    feedback.className = 'quiz-feedback';
    feedback.style.display = 'none';
  }
  if (nextBtn) nextBtn.style.display = 'none';

  if (optContainer) {
    optContainer.innerHTML = qObj.opts.map((opt, i) => `
      <button class="opt-btn" onclick="handleQuizAnswer(${i})">
        <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
        <span>${opt}</span>
      </button>
    `).join('');
  }
}

window.handleQuizAnswer = function(chosenIdx) {
  if (quizAnswered) return;
  quizAnswered = true;

  const qObj = QUIZ_BANK[currentQuizIndex];
  const isCorrect = chosenIdx === qObj.ans;
  const optBtns = document.querySelectorAll('.opt-btn');
  const feedback = document.getElementById('quiz-feedback-box');
  const nextBtn = document.getElementById('quiz-next-btn');

  optBtns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === qObj.ans) btn.classList.add('correct');
    else if (i === chosenIdx) btn.classList.add('wrong');
  });

  if (feedback) {
    feedback.style.display = 'block';
    if (isCorrect) {
      userQuizScore++;
      feedback.className = 'quiz-feedback good show';
      feedback.innerHTML = `
        <strong>CHÍNH XÁC! (+10 ĐIỂM)</strong>
        <p>${qObj.explain}</p>
      `;
    } else {
      feedback.className = 'quiz-feedback bad show';
      feedback.innerHTML = `
        <strong>CHƯA CHÍNH XÁC!</strong>
        <p>${qObj.explain}</p>
      `;
    }
  }

  if (nextBtn) nextBtn.style.display = 'inline-flex';
};

// Mobile Nav Toggle
function initMobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('mobile-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
      });
    });
  }
}

// Window Onload Initialization
window.addEventListener('DOMContentLoaded', () => {
  initTimeline();
  initQuizEngine();
  initMobileNav();

  const audioBtn = document.getElementById('audio-toggle-btn');
  if (audioBtn) {
    // Audio handled by toggleWebsiteMusic
  }

  // Close modal when clicking outside
  const modal = document.getElementById('milestone-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'milestone-modal') {
        closeMilestoneModal();
      }
    });
  }
});

// Historical Party Documents Archive Data
const PARTY_DOCUMENTS = [
  {
    id: 'doc-9-1954',
    tag: 'NGHỊ QUYẾT BỘ CHÍNH TRỊ (9/1954)',
    title: 'Nhiệm Vụ Chủ Yếu Trước Mắt Của Cách Mạng Hai Miền',
    summary: 'Ban hành tại Đại Từ (Thái Nguyên) ngay sau khi hòa bình lập lại ở miền Bắc.',
    content: 'Sau 9 năm kháng chiến chống Pháp trường kỳ, miền Bắc được giải phóng nhưng nền kinh tế bị tàn phá nặng nề. Bộ Chính trị xác định nhiệm vụ trước mắt là hàn gắn vết thương chiến tranh, phục hồi kinh tế quốc dân, lấy phục hồi nông nghiệp làm trọng tâm để ổn định xã hội. Tại miền Nam, Đảng chủ trương chuyển phương thức công tác từ quân sự sang đấu tranh chính trị đòi đối phương thi hành nghiêm chỉnh Hiệp định Genève.',
    significance: 'Định hình bước chuyển chiến lược đầu tiên sau Hiệp định Genève, bảo vệ thành quả kháng chiến chống Pháp và tạo bàn đạp củng cố miền Bắc.'
  },
  {
    id: 'doc-decuong-1956',
    tag: 'ĐỀ CƯƠNG ĐƯỜNG LỐI (8/1956)',
    title: 'Đề Cương Cách Mạng Miền Nam Việt Nam (Đ/c Lê Duẩn)',
    summary: 'Khởi thảo bởi Bí thư Xứ ủy Nam Bộ Lê Duẩn tại căn cứ Bến Tre và Sài Gòn.',
    content: 'Bản Đề cương phân tích sâu sắc tính chất thực dân mới của đế quốc Mỹ và chính quyền tay sai Ngô Đình Diệm. Đồng chí Lê Duẩn khẳng định chế độ thống trị của Mỹ - Diệm dựa trên súng đạn và máy chém, do đó nhân dân miền Nam không có con đường nào khác ngoài con đường cách mạng bạo lực quần chúng để tự giải phóng, đánh đổ chính quyền tay sai.',
    significance: 'Là viên gạch nền tảng lý luận trực tiếp dẫn tới sự ra đời của Nghị quyết Trung ương 15 lịch sử năm 1959.'
  },
  {
    id: 'doc-tw15-1959',
    tag: 'NGHỊ QUYẾT BAN CHẤP HÀNH TRUNG ƯƠNG 15 (1/1959)',
    title: 'Nghị Quyết Về Đường Lối Cách Mạng Miền Nam',
    summary: 'Quyết sách có ý nghĩa bước ngoặt lịch sử mở đường cho phong trào Đồng Khởi.',
    content: 'Hội nghị Trung ương lần thứ 15 (mở rộng) xác định nhiệm vụ cơ bản là giải phóng miền Nam khỏi ách thống trị của đế quốc và phong kiến. Con đường phát triển cơ bản là sử dụng bạo lực cách mạng, dựa vào lực lượng chính trị của quần chúng kết hợp với lực lượng vũ trang nhân dân, kết hợp đấu tranh chính trị với đấu tranh quân sự, khởi nghĩa từng phần tiến tới tổng khởi nghĩa giành chính quyền.',
    significance: 'Giải tỏa bế tắc cho phong trào cách mạng miền Nam sau những năm bị kìm kẹp bởi Luật 10/59, chuyển cách mạng miền Nam từ thế phòng ngự giữ gìn lực lượng sang thế tiến công liên tục.'
  },
  {
    id: 'doc-daihoi3-1960',
    tag: 'NGHỊ QUYẾT ĐẠI HỘI ĐẠI BIỂU TOÀN QUỐC LẦN III (9/1960)',
    title: 'Đường Lối Chung Của Cách Mạng Cả Nước Thời Kỳ Mới',
    summary: 'Đại hội đầu tiên tổ chức tại Thủ đô Hà Nội sau khi miền Bắc được giải phóng.',
    content: 'Đại hội thông qua đường lối chiến lược chung: Thực hiện đồng thời hai chiến lược cách mạng ở hai miền. Cách mạng XHCN ở miền Bắc giữ vai trò quyết định nhất đối với toàn bộ cách mạng Việt Nam; Cách mạng DTDCND ở miền Nam giữ vai trò quyết định trực tiếp đối với sự nghiệp giải phóng miền Nam thống nhất Tổ quốc. Cả hai chiến lược có quan hệ máu thịt hữu cơ cùng hướng về mục tiêu hòa bình thống nhất đất nước.',
    significance: 'Hoàn chỉnh đường lối lãnh đạo cách mạng của Đảng trong thời kỳ đất nước tạm thời bị chia cắt làm hai miền.'
  },
  {
    id: 'doc-kehoach-1961',
    tag: 'KẾ HOẠCH NHÀ NƯỚC 5 NĂM LẦN THỨ NHẤT (1961 — 1965)',
    title: 'Xây Dựng Cơ Sở Vật Chất - Kỹ Thuật Cho CNXH',
    summary: 'Đề ra phương hướng công nghiệp hóa XHCN là nhiệm vụ trung tâm của thời kỳ quá độ.',
    content: 'Kế hoạch đặt mục tiêu: Xây dựng bước đầu cơ sở vật chất - kỹ thuật cho CNXH; hoàn thiện quan hệ sản xuất mới; cải thiện đời sống nhân dân; củng cố quốc phòng an ninh làm hậu thuẫn vững chắc cho miền Nam. Hàng loạt công trình công nghiệp đầu đàn ra đời: Gang thép Thái Nguyên, Nhiệt điện Uông Bí, Thủy điện Thác Bà, Dệt Nam Định.',
    significance: 'Tạo nên sức mạnh vật chất to lớn: đến năm 1965 miền Bắc đã tăng chi viện quân sự gấp 9 lần, khối lượng vật chất gấp 10 lần so với năm 1961 cho tiền tuyến miền Nam!'
  }
];

// Document Modal Opener
window.openDocumentModal = function(docId) {
  const doc = PARTY_DOCUMENTS.find(d => d.id === docId);
  if (!doc) return;

  const modal = document.getElementById('milestone-modal');
  const body = document.getElementById('modal-body-content');
  if (!modal || !body) return;

  body.innerHTML = `
    <span class="badge-tag gold" style="margin-bottom: 12px;">${doc.tag}</span>
    <h2 style="font-size: 26px; color: #fff; margin-bottom: 12px;">${doc.title}</h2>
    <div style="color: var(--muted); font-size: 13.5px; font-style: italic; margin-bottom: 20px;">
      ${doc.summary}
    </div>
    <div style="background: rgba(0,0,0,0.3); padding: 18px; border-radius: 8px; border-left: 3px solid var(--gold); margin-bottom: 20px;">
      <h4 style="font-size: 14px; color: var(--gold); margin-bottom: 8px;">NỘI DUNG VĂN KIỆN CỐT LÕI:</h4>
      <p style="font-size: 14px; color: var(--ink); line-height: 1.8; margin: 0;">
        ${doc.content}
      </p>
    </div>
    <div style="background: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.3); padding: 16px; border-radius: 8px;">
      <h4 style="font-size: 14px; color: #34d399; margin-bottom: 6px;">Ý NGHĨA LỊCH SỬ ĐỐI VỚI KHÁNG CHIẾN:</h4>
      <p style="font-size: 13.5px; color: #d1fae5; line-height: 1.7; margin: 0;">
        ${doc.significance}
      </p>
    </div>
  `;
  modal.classList.add('open');
};

// Interactive Challenge 1: Timeline Ordering Game
const CHRONO_CHALLENGE = [
  { year: 1954, label: 'Tháng 7/1954: Ký kết Hiệp định Genève (Vĩ tuyến 17 tạm thời)' },
  { year: 1956, label: 'Tháng 7/1956: Hoàn thành Cải cách ruộng đất ở miền Bắc' },
  { year: 1959, label: 'Tháng 1/1959: Nghị quyết Hội nghị Trung ương 15 (Bạo lực cách mạng)' },
  { year: 1960, label: 'Ngày 17/1/1960: Bùng nổ Phong trào Đồng Khởi Bến Tre' },
  { year: 1960.5, label: 'Tháng 9/1960: Đại hội Đảng lần thứ III tại Hà Nội' },
  { year: 1963, label: 'Ngày 2/1/1963: Chiến thắng Ấp Bắc đập tan Trực thăng vận & Thiết xa vận' }
];
let currentChronoOrder = [...CHRONO_CHALLENGE];

window.openTimelineChallenge = function() {
  const modal = document.getElementById('milestone-modal');
  const body = document.getElementById('modal-body-content');
  if (!modal || !body) return;

  // Shuffle initially
  currentChronoOrder = [...CHRONO_CHALLENGE].sort(() => Math.random() - 0.5);
  renderChronoGame();
  modal.classList.add('open');
};

function renderChronoGame(message = '') {
  const body = document.getElementById('modal-body-content');
  if (!body) return;

  body.innerHTML = `
    <span class="badge-tag gold">THỬ THÁCH NIÊN BIỂU LỊCH SỬ</span>
    <h2 style="font-size: 24px; color: #fff; margin-bottom: 8px;">SẮP XẾP ĐÚNG THỨ TỰ THỜI GIAN (1954 — 1965)</h2>
    <p style="font-size: 13.5px; color: var(--muted); margin-bottom: 16px;">
      Sử dụng các mũi tên ↑ ↓ để di chuyển các sự kiện về đúng trình tự lịch sử từ trước đến sau.
    </p>

    <ol class="timeline-list-game">
      ${currentChronoOrder.map((item, i) => `
        <li class="timeline-game-item">
          <span class="order">${i + 1}</span>
          <div>
            <strong>${item.label}</strong>
            <small>Mốc thời gian đang chờ bạn xếp đúng vị trí</small>
          </div>
          <div class="moves">
            <button onclick="moveChronoItem(${i}, -1)" ${i === 0 ? 'disabled' : ''} aria-label="Lên">↑</button>
            <button onclick="moveChronoItem(${i}, 1)" ${i === currentChronoOrder.length - 1 ? 'disabled' : ''} aria-label="Xuống">↓</button>
          </div>
        </li>
      `).join('')}
    </ol>

    ${message ? `
      <div style="padding: 14px; border-radius: 6px; margin: 16px 0; font-size: 13.5px; line-height: 1.6; background: ${message.includes('CHÍNH XÁC') ? 'rgba(34, 197, 94, 0.2); border: 1px solid #22c55e; color: #a7f3d0;' : 'rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #fca5a5;'}">
        ${message}
      </div>
    ` : ''}

    <div style="display: flex; gap: 12px; margin-top: 20px;">
      <button class="btn btn-gold" style="font-size: 12px; padding: 10px 20px;" onclick="checkChronoOrder()">
        KIỂM TRA KẾT QUẢ
      </button>
      <button class="btn btn-ghost" style="font-size: 12px; padding: 10px 20px;" onclick="openTimelineChallenge()">
        XÁO TRỘN LẠI
      </button>
    </div>
  `;
}

window.moveChronoItem = function(index, dir) {
  const target = index + dir;
  if (target < 0 || target >= currentChronoOrder.length) return;
  const temp = currentChronoOrder[index];
  currentChronoOrder[index] = currentChronoOrder[target];
  currentChronoOrder[target] = temp;
  renderChronoGame();
};

window.checkChronoOrder = function() {
  const isCorrect = currentChronoOrder.every((item, i) => item.year === CHRONO_CHALLENGE[i].year);
  if (isCorrect) {
    unlockBadge('star');
    renderChronoGame('★ CHÍNH XÁC HOÀN TOÀN! Bạn đã ghi nhớ xuất sắc chuỗi niên biểu lịch sử từ Hiệp định Genève (1954) đến Chiến thắng Ấp Bắc (1963)! (+100 Điểm Lịch Sử)');
  } else {
    renderChronoGame('Chưa chính xác! Gợi ý: Hiệp định Genève (1954) → Cải cách ruộng đất (1956) → Nghị quyết 15 (1959) → Đồng khởi Bến Tre (1960) → Đại hội III (1960) → Chiến thắng Ấp Bắc (1963).');
  }
};

// Interactive Challenge 2: Memory Match Game ("Hồ Sơ Mật 1954 - 1965")
const MATCH_PAIRS = [
  { id: 1, year: '10/10/1954', event: 'Giải phóng Thủ đô Hà Nội' },
  { id: 2, year: '01/1959', event: 'Nghị quyết Trung ương 15 (Bạo lực cách mạng)' },
  { id: 3, year: '05/1959', event: 'Khai sinh Đoàn 559 (Đường Trường Sơn)' },
  { id: 4, year: '17/01/1960', event: 'Bùng nổ Phong trào Đồng Khởi Bến Tre' },
  { id: 5, year: '09/1960', event: 'Đại hội đại biểu toàn quốc lần thứ III tại Hà Nội' },
  { id: 6, year: '02/01/1963', event: 'Chiến thắng vang dội Ấp Bắc (Mỹ Tho)' }
];
let matchCards = [];
let firstSelectedCard = null;
let matchLock = false;
let matchedCount = 0;

window.openMatchChallenge = function() {
  const modal = document.getElementById('milestone-modal');
  const body = document.getElementById('modal-body-content');
  if (!modal || !body) return;

  // Generate cards
  matchedCount = 0;
  firstSelectedCard = null;
  matchLock = false;
  matchCards = [];

  MATCH_PAIRS.forEach(p => {
    matchCards.push({ id: `y-${p.id}`, pairId: p.id, text: p.year, type: 'year', matched: false });
    matchCards.push({ id: `e-${p.id}`, pairId: p.id, text: p.event, type: 'event', matched: false });
  });

  matchCards.sort(() => Math.random() - 0.5);
  renderMatchGame();
  modal.classList.add('open');
};

function renderMatchGame(status = '') {
  const body = document.getElementById('modal-body-content');
  if (!body) return;

  body.innerHTML = `
    <span class="badge-tag gold">THỬ THÁCH HỒ SƠ MẬT</span>
    <h2 style="font-size: 24px; color: #fff; margin-bottom: 8px;">GHÉP ĐÔI NĂM THÁNG VÀ SỰ KIỆN LỊCH SỬ</h2>
    <p style="font-size: 13.5px; color: var(--muted); margin-bottom: 16px;">
      Chọn một thẻ mốc thời gian và một thẻ sự kiện tương ứng để giải mã cặp hồ sơ. Đã mở: <strong>${matchedCount}/6</strong> cặp.
    </p>

    <div class="match-game-grid">
      ${matchCards.map(c => `
        <button class="match-game-card ${c.matched ? 'matched' : ''} ${firstSelectedCard === c.id ? 'selected' : ''}" 
                data-card="${c.id}" 
                onclick="pickMatchCard('${c.id}')" 
                ${c.matched ? 'disabled' : ''}>
          ${c.text}
        </button>
      `).join('')}
    </div>

    ${status ? `
      <div style="padding: 12px; border-radius: 6px; font-size: 13.5px; margin-top: 14px; background: rgba(240, 195, 84, 0.15); border: 1px solid var(--gold); color: var(--gold);">
        ${status}
      </div>
    ` : ''}

    <div style="margin-top: 20px;">
      <button class="btn btn-ghost" style="font-size: 12px; padding: 10px 20px;" onclick="openMatchChallenge()">
        XÁO TRỘN LẠI BÀI
      </button>
    </div>
  `;
}

window.pickMatchCard = function(id) {
  if (matchLock) return;
  const card = matchCards.find(c => c.id === id);
  if (!card || card.matched) return;

  if (!firstSelectedCard) {
    firstSelectedCard = id;
    renderMatchGame();
    return;
  }

  if (firstSelectedCard === id) {
    firstSelectedCard = null;
    renderMatchGame();
    return;
  }

  const firstCard = matchCards.find(c => c.id === firstSelectedCard);
  if (firstCard.pairId === card.pairId && firstCard.type !== card.type) {
    // Matched!
    card.matched = true;
    firstCard.matched = true;
    firstSelectedCard = null;
    matchedCount++;

    if (matchedCount === 6) {
      unlockBadge('sword');
      renderMatchGame('★ TUYỆT VỜI! Bạn đã giải mã thành công toàn bộ 6 cặp Hồ Sơ Mật thời kỳ 1954 - 1965!');
    } else {
      renderMatchGame(`Chính xác! Đã mở thành công ${matchedCount}/6 cặp hồ sơ.`);
    }
  } else {
    // Mismatched
    matchLock = true;
    const oldId = firstSelectedCard;
    firstSelectedCard = null;
    renderMatchGame('Hai thẻ này chưa khớp sự kiện! Hãy ghi nhớ và thử lại.');

    const el1 = document.querySelector(`[data-card="${id}"]`);
    const el2 = document.querySelector(`[data-card="${oldId}"]`);
    if (el1) el1.classList.add('wrong');
    if (el2) el2.classList.add('wrong');

    setTimeout(() => {
      matchLock = false;
      renderMatchGame();
    }, 900);
  }
};

// Learning Progress & Badge Management
function getSavedProgress() {
  try {
    return JSON.parse(localStorage.getItem('vnr202-progress')) || {
      milestonesRead: [],
      badges: ['flag'] // Flag is unlocked by default
    };
  } catch (e) {
    return { milestonesRead: [], badges: ['flag'] };
  }
}

function saveProgressData(p) {
  try {
    localStorage.setItem('vnr202-progress', JSON.stringify(p));
  } catch (e) {}
}

function unlockBadge(badgeKey) {
  const p = getSavedProgress();
  if (!p.badges.includes(badgeKey)) {
    p.badges.push(badgeKey);
    saveProgressData(p);
  }
  updateProgressUI();
}

function updateProgressUI() {
  const p = getSavedProgress();
  const fill = document.getElementById('progress-fill');
  const countText = document.getElementById('progress-count-text');

  // Total items to discover: 14 milestones + 5 docs + quizzes = ~25 points
  const totalDiscovered = p.milestonesRead.length + (p.badges.length * 2);
  const percent = Math.min(100, Math.round((totalDiscovered / 22) * 100));

  if (fill) fill.style.width = percent + '%';
  if (countText) countText.textContent = `Tiến độ khám phá: ${percent}% • Đã mở ${p.badges.length}/5 Huy hiệu lịch sử`;

  // Update badge icons
  p.badges.forEach(b => {
    const el = document.getElementById(`badge-${b}`);
    if (el) el.classList.add('unlocked');
  });
}

// Hook into Milestone Opening to track progress
const origOpenModal = window.openMilestoneModal;
window.openMilestoneModal = function(id) {
  const p = getSavedProgress();
  if (!p.milestonesRead.includes(id)) {
    p.milestonesRead.push(id);
    saveProgressData(p);
    if (p.milestonesRead.length >= 5) unlockBadge('shield');
    if (p.milestonesRead.length >= 10) unlockBadge('anchor');
    updateProgressUI();
  }
  origOpenModal(id);
};

window.addEventListener('DOMContentLoaded', () => {
  updateProgressUI();
});


// Video Modal Player
window.openVideoModal = function(videoId, title) {
  const modal = document.getElementById('video-lightbox-modal');
  const iframe = document.getElementById('video-modal-iframe');
  const titleEl = document.getElementById('video-modal-title');
  const ytLink = document.getElementById('video-modal-ytlink');

  if (!modal || !iframe) return;

  if (titleEl) titleEl.textContent = title || 'Thước Phim Tư Liệu Lịch Sử';
  iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  if (ytLink) ytLink.href = `https://www.youtube.com/watch?v=${videoId}`;

  modal.classList.add('open');
};

window.closeVideoModal = function() {
  const modal = document.getElementById('video-lightbox-modal');
  const iframe = document.getElementById('video-modal-iframe');
  if (modal) modal.classList.remove('open');
  if (iframe) iframe.src = '';
};

// Close modal when clicking backdrop
document.addEventListener('DOMContentLoaded', () => {
  const videoModal = document.getElementById('video-lightbox-modal');
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target.id === 'video-lightbox-modal') {
        closeVideoModal();
      }
    });
  }
});
// Clean Native Audio Player for assets/audio/background-theme.mp3 with Auto-Play
document.addEventListener('DOMContentLoaded', () => {
  const audioEl = document.getElementById('bg-audio');
  const topBtn = document.getElementById('audio-toggle-btn');
  if (!audioEl || !topBtn) return;

  audioEl.volume = 0.65;

  function setPlayingUI(playing) {
    const txt = topBtn.querySelector('.btn-text');
    if (playing) {
      topBtn.classList.add('playing');
      if (txt) txt.textContent = 'TẮT ÂM THANH';
    } else {
      topBtn.classList.remove('playing');
      if (txt) txt.textContent = 'BẬT ÂM THANH';
    }
  }

  // Attempt autoplay immediately upon opening web
  function attemptLandingAutoPlay() {
    const playPromise = audioEl.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setPlayingUI(true);
      }).catch(() => {
        // Unlock on user's first scroll/click/key/touch anywhere on the landing page
        const unlockAudio = () => {
          audioEl.play().then(() => {
            setPlayingUI(true);
          }).catch(() => {});
          ['click', 'touchstart', 'keydown', 'scroll', 'pointerdown'].forEach(evt => {
            window.removeEventListener(evt, unlockAudio);
          });
        };
        ['click', 'touchstart', 'keydown', 'scroll', 'pointerdown'].forEach(evt => {
          window.addEventListener(evt, unlockAudio, { once: true, passive: true });
        });
      });
    }
  }

  attemptLandingAutoPlay();

  topBtn.addEventListener('click', () => {
    if (audioEl.paused) {
      audioEl.play().then(() => {
        setPlayingUI(true);
      }).catch(err => {
        console.warn('Playback prevented:', err);
      });
    } else {
      audioEl.pause();
      setPlayingUI(false);
    }
  });

  audioEl.addEventListener('ended', () => {
    setPlayingUI(false);
  });
});
