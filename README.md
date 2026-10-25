# VNR202 — SỰ LÃNH ĐẠO CỦA ĐẢNG ĐỐI VỚI CÁCH MẠNG HAI MIỀN NAM - BẮC (1954 - 1965)

> **Chương 2:** Đảng lãnh đạo hai cuộc kháng chiến, hoàn thành giải phóng dân tộc, thống nhất đất nước (1945 - 1975)  
> **Phần II:** Lãnh đạo xây dựng chủ nghĩa xã hội ở miền Bắc và kháng chiến chống đế quốc Mỹ xâm lược, giải phóng miền Nam, thống nhất đất nước (1954 - 1975)  
> **Mục 1:** Sự lãnh đạo của Đảng đối với cách mạng hai miền Nam - Bắc (1954 - 1965)  
> **Căn cứ tài liệu:** Bộ bài giảng chuẩn môn học VNR202 SP24 (Đại học FPT) — **Session 15** (gồm 18 slides bài giảng, 60 ảnh tư liệu lịch sử và link Canva gốc).

---

## 🌟 GIỚI THIỆU TỔNG QUAN DỰ ÁN

Trang web landing page và không gian học tập tương tác lịch sử được xây dựng theo tiêu chuẩn hiện đại, kế thừa phong cách trang trọng, hào hùng của website mẫu `https://vnr202-hanh-trinh.vercel.app/` với gam màu xanh quân sự đậm (`#0d1612`, `#14211a`), đỏ cờ cách mạng (`#c93b2b`) và ánh kim vàng rực rỡ (`#f0c354`), phông chữ `Oswald` và `Be Vietnam Pro`.

Website bao gồm:
1. **Trang đích (Landing Page) Toàn diện (`index.html`)**:
   - **Hero Section**: Tiêu đề sử thi, trích dẫn Lời kêu gọi ngày 22/7/1954 của Hồ Chủ tịch, thẻ so sánh hai nhiệm vụ chiến lược, bộ đếm thống kê 11 năm lịch sử.
   - **Nhật ký Hành trình & 5 Huy hiệu Khám phá**: Thanh tiến độ học tập tự động cập nhật và lưu trữ vào `localStorage`.
   - **Phần 01 - Bối cảnh Lịch sử Bản lề (1954 - 1965)**: Ba dòng thác cách mạng thế giới, âm mưu thực dân mới của Mỹ, tình thế hai miền và đặc điểm lịch sử độc nhất vô nhị.
   - **Phần 02 - Đường lối Chiến lược 2 Miền (Đại hội III - 9/1960)**: Ma trận so sánh trực quan vai trò *quyết định nhất* (miền Bắc) và vai trò *quyết định trực tiếp* (miền Nam) cùng mối quan hệ biện chứng.
   - **Tủ sách Văn kiện Lịch sử Đảng**: Tra cứu 5 nghị quyết và đề cương then chốt (Nghị quyết 9/1954, Đề cương Lê Duẩn 1956, Nghị quyết TW 15 năm 1959, Nghị quyết Đại hội III năm 1960, Kế hoạch 5 năm 1961-1965).
   - **Phần 03 - Niên biểu Tương tác 2 Miền (14 sự kiện)**: Bộ lọc mặt trận (Miền Bắc, Miền Nam, Tuyến 559/759), cửa sổ đọc chi tiết kèm hình ảnh tư liệu gốc trích từ giáo trình.
   - **Thử thách Mini-game trên Trang đích**:
     * *Thử thách Niên biểu*: Sắp xếp chuỗi 6 sự kiện lịch sử theo trình tự thời gian.
     * *Thử thách Hồ Sơ Mật*: Ghép đôi 6 cặp năm tháng - sự kiện lịch sử (Memory match cards).
   - **Phần 04 - Trò chơi Chiến lược Lịch sử**: Giới thiệu hệ thống trò chơi mới hoàn toàn.
   - **Phần 05 - Ngân hàng Ôn tập Trắc nghiệm (15 câu hỏi bám sát Session 15)**: Đầy đủ giải thích chi tiết, nguồn slide đối chiếu và đường link mở trực tiếp Slide gốc trên Canva.
   - **Phần 06 - Thước phim Tư liệu**: Các video YouTube quý giá về Đồng Khởi Bến Tre 1960, Trận địa Ấp Bắc 1963 và Đoàn Tàu Không Số 759 trên Biển Đông.

---

## 🎮 HỆ THỐNG TRÒ CHƠI HOÀN TOÀN MỚI (`game.html`)

Khác biệt hoàn toàn với trò chơi bắn súng 3D góc nhìn thứ nhất của trang web mẫu (vốn là game FPS chạy bắn lính Pháp ở thung lũng Mường Thanh Điện Biên Phủ), trò chơi **"BÀN CỜ CHIẾN LƯỢC 1954 - 1965"** được thiết kế dưới dạng **Mô Phỏng Chỉ Huy Chiến Lược (Grand Strategy Command) kết hợp Tác Chiến Phòng Tuyến (Tactical RTS Defense) và Hải Trình Bí Mật**:

### 1. Chế độ 1: Sa Bàn Chiến Lược Toàn Cảnh (Grand Strategy Simulation)
- Sa bàn Canvas động hiển thị bản đồ Việt Nam, Vĩ tuyến 17 (giới tuyến quân sự sông Bến Hải), các cứ điểm cách mạng (Hà Nội, Thái Nguyên, Bến Tre, Cai Lậy / Ấp Bắc, Tây Ninh).
- Quản lý 4 chỉ số sinh tồn của cách mạng:
  * **Hậu phương Miền Bắc (Lương thực & Công nghiệp)**
  * **Tiền tuyến Miền Nam (Du kích & Vùng giải phóng)**
  * **Tuyến Huyết Mạch 559 & 759 (Đường Trường Sơn & Đường biển)**
  * **Chính Nghĩa & Mặt Trận DTGP (Đoàn kết quốc tế)**
- Chơi qua 5 giai đoạn niên biểu (1954 -> 1965). Mỗi giai đoạn đưa ra tình huống lịch sử thực tế từ giáo trình (ví dụ: cách mạng miền Nam đối phó với Luật 10/59 như thế nào? Nghị quyết TW 15 quyết sách ra sao? Vai trò Đại hội III?). Người chơi chọn quyết sách để tích lũy điểm chiến lược và nâng cao tiềm lực đất nước.

### 2. Chế độ 2: Phòng Tuyến Ấp Bắc 1963 (Tactical RTS Defense)
- Mô phỏng trận đánh lịch sử Ấp Bắc (02/01/1963) tại Cai Lậy, Mỹ Tho.
- Quân địch triển khai: Trực thăng vũ trang Bell UH-1 ("Trực thăng vận"), Xe bọc thép lội nước M113 ("Thiết xa vận"), lính dù càn quét.
- Người chơi điều phối các lực lượng quân giải phóng trong chiến hào:
  * *Tổ Bắn Tỉa*: Bắn hạ xạ thủ trên nóc xe bọc thép M113.
  * *Đại Đội Trung Liên*: Đón đánh máy bay trực thăng đổ bộ.
  * *Tổ Mìn / B40*: Chặn đứng đà tiến công cơ giới của thiết giáp.
  * *Đội Quân Tóc Dài*: Biểu tình chính trị làm chậm 70% tốc độ tiến quân của địch!
- **Điện Báo Khẩn Tri Thức Lịch Sử**: Trả lời các câu hỏi khẩn từ Bộ Chỉ huy dưới làn đạn để kích hoạt pháo cối bắn chi viện toàn trận địa!

### 3. Chế độ 3: Hải Trình Tàu Không Số 759 (Ocean Stealth Runner)
- Điều khiển con tàu gỗ ngụy trang chở 35 tấn vũ khí hạng nặng xuất phát từ bến K15 Đồ Sơn (Hải Phòng) vượt biển Đông.
- Né tránh tàu khu trục tuần tiễu Hải quân Mỹ thuộc Hạm đội 7, máy bay trinh sát và bão biển Đông.
- Sử dụng màn khói ngụy trang hoặc bẻ lái thông minh để cập bến an toàn tại Vũng Rô (Phú Yên) hoặc Cà Mau!

---

## 🚀 HƯỚNG DẪN CHẠY DỰ ÁN TRÊN MÁY CỤC BỘ

Dự án được xây dựng bằng công nghệ thuần (HTML5, Modular CSS, Vanilla JavaScript, HTML5 Canvas, Web Audio API), không cần cài đặt thêm thư viện cồng kềnh, hoạt động mượt mà trên mọi trình duyệt:

```bash
# Di chuyển vào thư mục dự án
cd c:\FALL26\vnr202-spst

# Khởi chạy máy chủ HTTP nội bộ với Python
python -m http.server 8080
```

Mở trình duyệt và truy cập:
- **Trang chủ học tập:** `http://localhost:8080/index.html` (hoặc `http://localhost:8080/`)
- **Trò chơi Chiến lược:** `http://localhost:8080/game.html`

---

## 📂 DANH MỤC TỆP TIN DỰ ÁN

```
c:\FALL26\vnr202-spst\
├── index.html          # Trang đích landing page hoàn chỉnh môn VNR202
├── styles.css          # Hệ thống CSS hiện đại, biến màu sắc, card, modal
├── media.css           # Tối ưu hóa hiển thị responsive trên máy tính bảng & mobile
├── app.js              # Logic trang đích, trắc nghiệm 15 câu, niên biểu, mini-game
├── game.html           # Giao diện trò chơi Chiến lược 1954 - 1965
├── game.css            # CSS chuyên biệt cho sa bàn chiến thuật và Canvas HUD
├── game.js             # Engine game: Sa bàn chiến lược, Trận Ấp Bắc, Tàu Không Số
├── README.md           # Tài liệu hướng dẫn và thuyết minh dự án
└── assets\
    ├── vietnam-flag.svg    # Quốc kỳ Việt Nam dạng vector sắc nét
    ├── history-hero.png    # Ảnh nền sử thi anh hùng cách mạng
    └── history\            # 60 hình ảnh tư liệu gốc trích xuất từ Session 15 PPT
        ├── image30.png     # Hiệp định Genève và vĩ tuyến 17
        ├── image18.png     # Tiếp quản Thủ đô 10/10/1954
        ├── image25.png     # Cải cách ruộng đất
        ├── image48.png     # Đạo luật 10/59 và máy chém
        ├── image63.png     # Bão táp Đồng Khởi Bến Tre 1960
        ├── image58.png     # Đại hội đại biểu toàn quốc lần thứ III (9/1960)
        ├── image72.png     # Kế hoạch 5 năm lần thứ nhất miền Bắc
        ├── image85.png     # Chiến thắng Ấp Bắc 1963 bẻ gãy trực thăng vận
        └── ...
```

---

*Học phần VNR202 — Lịch sử Đảng Cộng sản Việt Nam • Cập nhật SP24 • FPT University*
