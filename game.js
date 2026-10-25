/**
 * VNR202 - Game Engine: Bàn Cờ Chiến Lược 1954 - 1965
 * Sự lãnh đạo của Đảng đối với cách mạng hai miền Nam - Bắc
 * Chủ đề: Chương 2, Phần II, Mục 1 (Giáo trình VNR202 SP24 - Session 15)
 */

// Sound FX Synthesizer (Web Audio API)
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }
  playTone(freq, type = 'sine', duration = 0.2, gain = 0.2) {
    if (this.muted) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      g.gain.setValueAtTime(gain, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(g);
      g.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }
  click() { this.playTone(600, 'sine', 0.08, 0.15); }
  correct() {
    this.playTone(523.25, 'triangle', 0.15, 0.25);
    setTimeout(() => this.playTone(659.25, 'triangle', 0.25, 0.3), 120);
  }
  wrong() {
    this.playTone(220, 'sawtooth', 0.25, 0.25);
    setTimeout(() => this.playTone(180, 'sawtooth', 0.3, 0.3), 150);
  }
  cannon() {
    this.playTone(80, 'sawtooth', 0.5, 0.4);
    this.playTone(60, 'sine', 0.6, 0.5);
  }
  victory() {
    const notes = [440, 554, 659, 880];
    notes.forEach((n, i) => {
      setTimeout(() => this.playTone(n, 'triangle', 0.35, 0.3), i * 180);
    });
  }
  alarm() {
    this.playTone(880, 'sawtooth', 0.12, 0.2);
    setTimeout(() => this.playTone(660, 'sawtooth', 0.12, 0.2), 150);
  }
}
const sfx = new SoundFX();

// Game State Definition
const GameState = {
  activeMode: 'strategy', // 'strategy' | 'tactical'
  year: 1954,
  stageIndex: 0,
  score: 0,
  resources: {
    northPower: 45,   // Tiềm lực miền Bắc (0-100)
    southCombat: 35,  // Khí thế miền Nam (0-100)
    supplyRoute: 20,  // Huyết mạch 559/759 (0-100)
    solidarity: 50    // Chính nghĩa & Mặt trận (0-100)
  },
  tactical: { points: 100,
    health: 100,
    selectedUnit: 'sniper',
    wave: 1,
    waveSpawned: 0,
    maxWaves: 5,
    running: false,
    enemies: [],
    defenders: [],
    particles: [],
    timer: null
  }
};

// Runtime-only values are intentionally kept outside of GameState so a mode
// switch cannot accidentally start a second canvas loop or attach duplicate
// event listeners.
const TacticalRuntime = {
  initialized: false,
  animationFrame: null,
  spawnCooldown: 0,
  intelTimer: null,
  intelQuestion: null
};

const TACTICAL_WAVES = [5, 7, 9, 11, 13];

// Campaign Stages & Historical Event Dilemmas (Based on Session 15)
const CAMPAIGN_STAGES = [
  {
    year: '1954 - 1955',
    title: 'Hàn gắn Vết thương & Tiếp quản Thủ đô',
    directive: 'Hội nghị Trung ương lần 7 & 8 (Khóa II) và Nghị quyết Bộ Chính trị 9/1954',
    desc: 'Tháng 7/1954 Hiệp định Genève được ký kết, đất nước tạm chia cắt tại vĩ tuyến 17. Ngày 10/10/1954 ta tiếp quản Thủ đô Hà Nội. Miền Bắc nghèo nàn bị tàn phá; Miền Nam địch dựng Ngô Đình Diệm phá hoại tổng tuyển cử.',
    dilemma: {
      question: 'Trước tình hình miền Bắc bị chiến tranh tàn phá nặng nề, Đảng chủ trương nhiệm vụ trọng tâm trước mắt là gì?',
      options: [
        {
          text: 'Tập trung toàn lực phát triển công nghiệp nặng và vũ khí cơ giới',
          correct: false,
          impact: { northPower: -10, solidarity: -5 },
          feedback: 'Chưa chính xác! Thời điểm 1954 miền Bắc vừa ra khỏi 9 năm kháng chiến, nhân dân còn đói khổ, chưa có cơ sở kỹ thuật để làm ngay công nghiệp nặng.'
        },
        {
          text: 'Hàn gắn vết thương chiến tranh, phục hồi kinh tế quốc dân, lấy phục hồi nông nghiệp làm trọng tâm',
          correct: true,
          impact: { northPower: +20, solidarity: +15 },
          feedback: 'Chính xác! Tháng 9/1954 Bộ Chính trị chủ trương lấy phục hồi nông nghiệp làm trọng tâm để ổn định xã hội và nuôi sống nhân dân sau 9 năm kháng chiến.'
        },
        {
          text: 'Phát động tổng khởi nghĩa vũ trang ngay tại miền Nam trong năm 1954',
          correct: false,
          impact: { southCombat: -15, solidarity: -10 },
          feedback: 'Sai lầm! Năm 1954 lực lượng ta ở miền Nam đang trong giai đoạn tập kết, chuyển hướng sang đấu tranh chính trị đòi thi hành Hiệp định Genève, chưa thể khởi nghĩa vũ trang ngay.'
        }
      ]
    }
  },
  {
    year: '1956 - 1957',
    title: 'Cải cách Ruộng đất & Đề cương Cách mạng Miền Nam',
    directive: 'Xóa bỏ phong kiến miền Bắc & Bản dự thảo lịch sử của đồng chí Lê Duẩn',
    desc: 'Tháng 7/1956 miền Bắc hoàn thành cải cách ruộng đất, nông dân có ruộng. Ở miền Nam, đồng chí Lê Duẩn khởi thảo Đề cương đường lối cách mạng miền Nam, khẳng định con đường cứu nước của nhân dân miền Nam.',
    dilemma: {
      question: 'Bản "Đề cương đường lối cách mạng miền Nam" (8/1956) do Bí thư Xứ ủy Nam Bộ Lê Duẩn dự thảo đã khẳng định chân lý gì?',
      options: [
        {
          text: 'Chỉ có con đường cách mạng bạo lực đánh đổ chính quyền Mỹ - Diệm mới giải phóng được miền Nam',
          correct: true,
          impact: { southCombat: +25, solidarity: +15 },
          feedback: 'Rất chính xác! Đề cương nêu rõ ngoài con đường cách mạng bạo lực nhân dân, không có con đường nào khác để thoát khỏi ách áp bức của Mỹ - Diệm.'
        },
        {
          text: 'Chờ đợi Liên Hợp Quốc can thiệp để tổ chức hiệp thương hòa bình',
          correct: false,
          impact: { southCombat: -20, solidarity: -10 },
          feedback: 'Sai! Đế quốc Mỹ và tay sai Ngô Đình Diệm ngoan cố cự tuyệt tổng tuyển cử, trông chờ hiệp thương đơn thuần sẽ làm tê liệt phong trào cách mạng.'
        },
        {
          text: 'Đưa toàn bộ lực lượng miền Nam tập kết ra Bắc sinh sống',
          correct: false,
          impact: { southCombat: -25, supplyRoute: -10 },
          feedback: 'Sai! Cán bộ, đảng viên trung kiên cần bám đất bám dân, giữ gìn và gây dựng cơ sở quần chúng tại miền Nam.'
        }
      ]
    }
  },
  {
    year: '1958 - 1960',
    title: 'Nghị Quyết 15 & Bão Táp Đồng Khởi Bến Tre',
    directive: 'Hội nghị Trung ương 15 (1/1959) & Phong trào Đồng Khởi (1960)',
    desc: 'Mỹ - Diệm ra Luật 10/59 lê máy chém đi khắp miền Nam. Tháng 1/1959 Hội nghị TW 15 mở đường sử dụng bạo lực cách mạng kết hợp đấu tranh chính trị với quân sự. Ngày 17/1/1960 Đồng Khởi Bến Tre bùng nổ!',
    dilemma: {
      question: 'Nghị quyết Hội nghị Trung ương lần thứ 15 (1/1959) đã đưa ra quyết sách có ý nghĩa bước ngoặt nào?',
      options: [
        {
          text: 'Tiếp tục chủ trương đấu tranh chính trị hòa bình đơn thuần để giữ gìn lực lượng',
          correct: false,
          impact: { southCombat: -25, solidarity: -15 },
          feedback: 'Sai! Trước sự tàn bạo của Luật 10/59, nếu không chuyển sang bạo lực vũ trang thì phong trào sẽ bị tổn thất nặng nề.'
        },
        {
          text: 'Sử dụng bạo lực cách mạng, kết hợp đấu tranh chính trị với đấu tranh quân sự, khởi nghĩa từng phần giành chính quyền',
          correct: true,
          impact: { southCombat: +35, supplyRoute: +25, solidarity: +20 },
          feedback: 'Xuất sắc! Nghị quyết 15 là ngọn đèn soi đường, chuyển cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công, thổi bùng phong trào Đồng Khởi 1960!'
        },
        {
          text: 'Chỉ đạo quân đội miền Bắc vượt vĩ tuyến 17 tiến công quy ước quy mô lớn',
          correct: false,
          impact: { northPower: -20, solidarity: -15 },
          feedback: 'Không phù hợp! Tình hình quốc tế và thế trận lúc này đòi hỏi phát huy sức mạnh khởi nghĩa toàn dân tại chỗ ở miền Nam kết hợp chi viện hậu phương.'
        }
      ]
    }
  },
  {
    year: 'Tháng 9/1960',
    title: 'Đại Hội Đại Biểu Toàn Quốc Lần Thứ III Tại Hà Nội',
    directive: 'Xác định đường lối chung: Một Đảng lãnh đạo hai chiến lược cách mạng',
    desc: 'Hồ Chủ tịch khẳng định: "Đại hội lần này là Đại hội xây dựng CNXH ở miền Bắc và đấu tranh hòa bình thống nhất nước nhà". Đảng xác lập vị trí chiến lược của hai miền.',
    dilemma: {
      question: 'Theo Nghị quyết Đại hội III (1960), vai trò của cách mạng mỗi miền được phân định như thế nào?',
      options: [
        {
          text: 'Miền Bắc giữ vai trò quyết định nhất; Miền Nam giữ vai trò quyết định trực tiếp đối với sự nghiệp giải phóng miền Nam',
          correct: true,
          impact: { northPower: +20, southCombat: +20, solidarity: +25 },
          feedback: 'Hoàn toàn chính xác! Hai chiến lược có vai trò khác nhau nhưng có mối quan hệ khăng khít, cùng hướng về mục tiêu thống nhất Tổ quốc.'
        },
        {
          text: 'Miền Nam quyết định nhất vì trực tiếp đối đầu quân thù; Miền Bắc chỉ là phụ trợ',
          correct: false,
          impact: { northPower: -10, solidarity: -10 },
          feedback: 'Sai! Không có căn cứ địa miền Bắc vững chắc thì cách mạng miền Nam không thể duy trì cuộc kháng chiến lâu dài và ác liệt.'
        },
        {
          text: 'Cả hai miền đều thực hiện cách mạng XHCN cùng một thời điểm',
          correct: false,
          impact: { southCombat: -15, solidarity: -10 },
          feedback: 'Sai! Miền Nam còn dưới ách thống trị của Mỹ - Diệm nên phải tiến hành Cách mạng Dân tộc Dân chủ Nhân dân, chưa thể lên CNXH.'
        }
      ]
    }
  },
  {
    year: '1961 - 1965',
    title: 'Kế Hoạch 5 Năm Lần 1 & Đập Tan "Chiến Tranh Đặc Biệt"',
    directive: 'Chiến thắng Ấp Bắc (2/1/1963) & Phá sản 3 trụ cột của Mỹ - ngụy',
    desc: 'Mỹ triển khai chiến lược "Chiến tranh đặc biệt" với trực thăng vận, thiết xa vận và dồn dân lập ấp chiến lược. Quân dân ta phát động phong trào "Thi đua Ấp Bắc, giết giặc lập công"!',
    dilemma: {
      question: 'Ý nghĩa lịch sử quan trọng nhất của Chiến thắng Ấp Bắc (2/1/1963) là gì?',
      options: [
        {
          text: 'Lần đầu tiên chứng minh quân dân ta hoàn toàn có khả năng đánh bại chiến thuật "trực thăng vận" và "thiết xa vận" của Mỹ',
          correct: true,
          impact: { southCombat: +35, solidarity: +25 },
          feedback: 'Chính xác! Chiến thắng Ấp Bắc đã mở ra cao trào thi đua đánh Mỹ, làm rung chuyển tận gốc chiến lược Chiến tranh đặc biệt!'
        },
        {
          text: 'Khiến đế quốc Mỹ phải rút toàn bộ quân về nước ngay trong năm 1963',
          correct: false,
          impact: { southCombat: -10 },
          feedback: 'Sai! Mỹ tiếp tục leo thang chiến tranh đến năm 1973 mới buộc phải ký Hiệp định Paris.'
        },
        {
          text: 'Hoàn thành việc thu hồi toàn bộ các thành phố lớn tại miền Nam',
          correct: false,
          impact: { southCombat: -10 },
          feedback: 'Sai! Giai đoạn 1963 ta giành quyền làm chủ ở vùng nông thôn đồng bằng và phá vỡ ấp chiến lược, chưa tiến công giải phóng các đô thị lớn.'
        }
      ]
    }
  }
];

// Initialize Strategy Map Canvas
function initStrategyCanvas() {
  const canvas = document.getElementById('strategy-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let pulse = 0;
  let convoyProgress = 0;
  let shipProgress = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;

    // Dark Map Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Vietnam S-Shape Approximation Path
    ctx.lineWidth = 32;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // North Zone (Green tint)
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.22)';
    ctx.beginPath();
    ctx.moveTo(w * 0.42, h * 0.12);
    ctx.quadraticCurveTo(w * 0.48, h * 0.22, w * 0.44, h * 0.38);
    ctx.stroke();

    // 17th Parallel Border (Red Dotted Line)
    const lineY = h * 0.43;
    ctx.save();
    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(w * 0.15, lineY);
    ctx.lineTo(w * 0.85, lineY);
    ctx.stroke();
    ctx.restore();

    // Text on 17th Parallel
    ctx.font = 'bold 11px Oswald, sans-serif';
    ctx.fillStyle = '#f87171';
    ctx.fillText('VĨ TUYẾN 17 — SÔNG BẾN HẢI (GIỚI TUYẾN QUÂN SỰ TẠM THỜI 1954)', w * 0.18, lineY - 8);

    // South Zone (Red tint)
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.22)';
    ctx.beginPath();
    ctx.moveTo(w * 0.44, lineY + 10);
    ctx.quadraticCurveTo(w * 0.52, h * 0.65, w * 0.38, h * 0.88);
    ctx.stroke();

    // Strategic Supply Line 559 (Truong Son Road - Land)
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w * 0.40, h * 0.28);
    ctx.quadraticCurveTo(w * 0.33, h * 0.52, w * 0.38, h * 0.78);
    ctx.stroke();
    ctx.restore();

    // Moving Convoys on 559
    convoyProgress = (convoyProgress + 0.003) % 1;
    const convoyX = (1 - convoyProgress) * (w * 0.40) + convoyProgress * (w * 0.38);
    const convoyY = (1 - convoyProgress) * (h * 0.28) + convoyProgress * (h * 0.78);
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(convoyX, convoyY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Strategic Supply Line 759 (Ho Chi Minh Sea Trail)
    ctx.save();
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(w * 0.54, h * 0.22);
    ctx.quadraticCurveTo(w * 0.70, h * 0.55, w * 0.46, h * 0.90);
    ctx.stroke();
    ctx.restore();

    // Moving Ship on 759
    shipProgress = (shipProgress + 0.002) % 1;
    const shipX = (1 - shipProgress) * (w * 0.54) + shipProgress * (w * 0.46) + Math.sin(shipProgress * Math.PI) * 50;
    const shipY = (1 - shipProgress) * (h * 0.22) + shipProgress * (h * 0.90);
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(shipX, shipY, 6, 0, Math.PI * 2);
    ctx.fill();

    // Tactical Landmark Nodes
    pulse = (pulse + 0.04) % (Math.PI * 2);
    const pSize = 4 + Math.sin(pulse) * 2;

    const landmarks = [
      { name: 'HÀ NỘI (TRUNG TÂM ĐẦU NÃO)', x: w * 0.42, y: h * 0.18, color: '#f0c354', type: 'north' },
      { name: 'THÁI NGUYÊN (GANG THÉP)', x: w * 0.45, y: h * 0.12, color: '#22c55e', type: 'north' },
      { name: 'HẢI PHÒNG (BẾN ĐOÀN 759)', x: w * 0.52, y: h * 0.20, color: '#38bdf8', type: 'supply' },
      { name: 'BẾN TRE (ĐỒNG KHỞI 1960)', x: w * 0.38, y: h * 0.82, color: '#ef4444', type: 'south' },
      { name: 'ẤP BẮC (CHIẾN THẮNG 1963)', x: w * 0.36, y: h * 0.77, color: '#fbbf24', type: 'battle' },
      { name: 'TÂY NINH (MẶT TRẬN DTGP)', x: w * 0.35, y: h * 0.71, color: '#f87171', type: 'south' }
    ];

    landmarks.forEach(lm => {
      // Outer glow pulse
      ctx.fillStyle = lm.color + '44';
      ctx.beginPath();
      ctx.arc(lm.x, lm.y, 10 + pSize, 0, Math.PI * 2);
      ctx.fill();

      // Core point
      ctx.fillStyle = lm.color;
      ctx.beginPath();
      ctx.arc(lm.x, lm.y, 5, 0, Math.PI * 2);
      ctx.fill();

      // Label text
      ctx.font = 'bold 11px Oswald, sans-serif';
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#000';
      ctx.shadowBlur = 6;
      ctx.fillText(lm.name, lm.x + 12, lm.y + 4);
      ctx.shadowBlur = 0;
    });

    // Legend
    ctx.fillStyle = 'rgba(15, 25, 20, 0.85)';
    ctx.fillRect(20, h - 90, 240, 75);
    ctx.strokeStyle = 'rgba(240, 195, 84, 0.3)';
    ctx.strokeRect(20, h - 90, 240, 75);

    ctx.font = '10px Oswald, sans-serif';
    ctx.fillStyle = '#f0c354';
    ctx.fillText('KÝ HIỆU THAM MƯU TÁC CHIẾN:', 30, h - 72);

    ctx.fillStyle = '#fbbf24'; ctx.fillText('--- Tuyến Trường Sơn 559', 30, h - 54);
    ctx.fillStyle = '#38bdf8'; ctx.fillText('--- Đoàn Tàu Không Số 759', 30, h - 38);
    ctx.fillStyle = '#ef4444'; ctx.fillText('--- Vĩ tuyến 17 (Giới tuyến quân sự)', 30, h - 22);

    requestAnimationFrame(draw);
  }
  draw();
}

// Render Grand Strategy Stage & Dilemma
function renderStrategyStage() {
  const stage = CAMPAIGN_STAGES[GameState.stageIndex];
  if (!stage) {
    showGrandVictory();
    return;
  }

  // Update Year & Title indicators
  const yearText = document.getElementById('stage-year-text');
  const phaseTitle = document.getElementById('stage-title-text');
  const phaseDirective = document.getElementById('stage-directive-text');
  const phaseDesc = document.getElementById('stage-desc-text');

  if (yearText) yearText.textContent = stage.year;
  if (phaseTitle) phaseTitle.textContent = stage.title;
  if (phaseDirective) phaseDirective.textContent = stage.directive;
  if (phaseDesc) phaseDesc.textContent = stage.desc;

  // Render Dilemma Options
  const dilemmaBox = document.getElementById('dilemma-container');
  if (!dilemmaBox) return;

  dilemmaBox.innerHTML = `
    <div class="event-box">
      <span class="badge">QUYẾT SÁCH LỊCH SỬ • GIAI ĐOẠN ${GameState.stageIndex + 1}/5</span>
      <h4>${stage.dilemma.question}</h4>
      <div class="decision-options">
        ${stage.dilemma.options.map((opt, idx) => `
          <button class="decision-btn" onclick="handleDecisionClick(${idx})">
            <strong>PHƯƠNG ÁN ${String.fromCharCode(65 + idx)}</strong>
            <span>${opt.text}</span>
          </button>
        `).join('')}
      </div>
      <div id="decision-feedback" class="decision-feedback"></div>
    </div>
  `;

  updateResourceGauges();
}

function updateResourceGauges() {
  const clamp = (v) => Math.max(0, Math.min(100, v));
  const res = GameState.resources;

  const setRes = (id, val, textId) => {
    const el = document.getElementById(id);
    const txt = document.getElementById(textId);
    if (el) el.style.width = clamp(val) + '%';
    if (txt) txt.textContent = clamp(val) + '%';
  };

  setRes('res-north', res.northPower, 'val-north');
  setRes('res-south', res.southCombat, 'val-south');
  setRes('res-supply', res.supplyRoute, 'val-supply');
  setRes('res-solidarity', res.solidarity, 'val-solidarity');

  const score = document.getElementById('score-display');
  if (score) score.textContent = `ĐIỂM: ${GameState.score}`;
}

function handleDecisionClick(optIdx) {
  const stage = CAMPAIGN_STAGES[GameState.stageIndex];
  const option = stage.dilemma.options[optIdx];
  const fb = document.getElementById('decision-feedback');
  if (!fb) return;

  // Apply Impact
  if (option.impact) {
    for (let k in option.impact) {
      GameState.resources[k] = (GameState.resources[k] || 50) + option.impact[k];
    }
  }

  if (option.correct) {
    sfx.correct();
    GameState.score += 200;
    fb.className = 'decision-feedback show';
    fb.style.display = 'block';
    fb.innerHTML = `
      <strong>QUYẾT SÁCH ĐÚNG ĐẮN THEO ĐƯỜNG LỐI CỦA ĐẢNG! (+200 Điểm)</strong>
      <p>${option.feedback}</p>
      <button class="game-btn-icon" style="margin-top: 10px; background: #22c55e; color: #111;" onclick="advanceStrategyStage()">
        TIẾP TỤC HÀNH TRÌNH →
      </button>
    `;
  } else {
    sfx.wrong();
    GameState.score = Math.max(0, GameState.score - 50);
    fb.className = 'decision-feedback wrong show';
    fb.style.display = 'block';
    fb.innerHTML = `
      <strong>CHƯA PHÙ HỢP VỚI THỰC TIỄN LỊCH SỬ!</strong>
      <p>${option.feedback}</p>
      <button class="game-btn-icon" style="margin-top: 10px; background: #ef4444; color: #fff;" onclick="advanceStrategyStage()">
        RÚT KINH NGHIỆM VÀ TIẾP TỤC →
      </button>
    `;
  }

  updateResourceGauges();

  // Disable buttons
  const btns = document.querySelectorAll('.decision-btn');
  btns.forEach(b => b.disabled = true);
}

function advanceStrategyStage() {
  sfx.click();
  GameState.stageIndex++;
  if (GameState.stageIndex === 4) {
    // Stage 5 is Ap Bac Battle! Prompt user to enter Tactical Combat mode
    showTacticalPrompt();
  } else if (GameState.stageIndex >= CAMPAIGN_STAGES.length) {
    showGrandVictory();
  } else {
    renderStrategyStage();
  }
}

function showTacticalPrompt() {
  const dilemmaBox = document.getElementById('dilemma-container');
  if (!dilemmaBox) return;

  dilemmaBox.innerHTML = `
    <div class="event-box" style="border-color: #f0c354; background: rgba(240, 195, 84, 0.1);">
      <span class="badge" style="background: #ef4444; color: #fff;">BÁO ĐỘNG CHIẾN DỊCH: TRẬN ẤP BẮC (2/1/1963)</span>
      <h4>Địch mở cuộc càn quét quy mô lớn với chiến thuật "Trực thăng vận" & "Thiết xa vận"!</h4>
      <p>Mỹ - ngụy huy động trực thăng vũ trang UH-1 và xe bọc thép M113 đổ bộ vào xã Tân Phú Trung, Cai Lậy, Mỹ Tho. Bộ Chỉ huy cần bạn trực tiếp chỉ huy phòng tuyến!</p>
      <button class="cta-btn" style="width: 100%; justify-content: center;" onclick="switchGameMode('tactical')">
        TIẾN VÀO TRẬN ĐỊA ẤP BẮC NGAY ⚔
      </button>
    </div>
  `;
}

function showGrandVictory() {
  sfx.victory();
  const modal = document.getElementById('game-result-modal');
  if (!modal) return;

  let rank = 'CHIẾN SĨ THI ĐUA NẮM VỮNG ĐƯỜNG LỐI ĐẢNG';
  if (GameState.score >= 800) rank = 'TƯ LỆNH CHIẾN DỊCH XUẤT SẮC - HUÂN CHƯƠNG KHÁNG CHIẾN HẠNG NHẤT';
  else if (GameState.score >= 500) rank = 'CHÍNH ỦY MẶT TRẬN TÀI BA';

  modal.innerHTML = `
    <div class="result-card">
      <div class="result-icon">★ ★ ★ ★ ★</div>
      <h2>HOÀN THÀNH TOÀN DIỆN CHIẾN LƯỢC 1954 - 1965</h2>
      <div class="result-rank">${rank}</div>
      <div class="result-summary">
        <p><strong>Tổng điểm Chỉ huy:</strong> ${GameState.score} Điểm</p>
        <p><strong>Hậu phương Miền Bắc:</strong> Đạt ${GameState.resources.northPower}%, hoàn thành Kế hoạch 5 năm lần thứ nhất, chi viện quân sự tăng gấp 9 lần, vật chất tăng 10 lần cho miền Nam.</p>
        <p><strong>Tiền tuyến Miền Nam:</strong> Đạt ${GameState.resources.southCombat}%, phá vỡ hàng ngàn ấp chiến lược, đập tan chiến lược "Chiến tranh đặc biệt" của Mỹ!</p>
        <p><strong>Tuyến 559 & 759:</strong> Đạt ${GameState.resources.supplyRoute}%, giữ vững cầu nối huyết mạch chi viện Bắc - Nam.</p>
      </div>
      <div class="result-actions">
        <button class="btn btn-gold" onclick="restartGame()">CHỈ HUY LẠI TỪ ĐẦU</button>
        <a href="index.html" class="btn btn-ghost">VỀ TRANG CHỦ GIÁO TRÌNH</a>
      </div>
    </div>
  `;
  modal.className = 'game-result-modal open';
}

function restartGame() {
  GameState.stageIndex = 0;
  GameState.score = 0;
  GameState.resources = { northPower: 45, southCombat: 35, supplyRoute: 20, solidarity: 50 };
  GameState.tactical = { points: 100, health: 100, selectedUnit: 'sniper', wave: 1, waveSpawned: 0, maxWaves: 5, running: false, enemies: [], defenders: [], particles: [], timer: null };
  TacticalRuntime.spawnCooldown = 0;
  const modal = document.getElementById('game-result-modal');
  if (modal) modal.className = 'game-result-modal';
  switchGameMode('strategy');
  renderStrategyStage();
}

// MODE 2: TACTICAL DEFENSE (TRẬN ĐỊA ẤP BẮC) ENGINE
const UNIT_TYPES = {
  sniper: { name: 'Tổ Bắn Tỉa', cost: 30, icon: '🎯', range: 140, damage: 18, rate: 45, targets: ['m113'], desc: 'Bắn tỉa xạ thủ xe M113' },
  mg: { name: 'Đại đội Trung liên', cost: 45, icon: '💥', range: 120, damage: 25, rate: 30, targets: ['heli'], desc: 'Bắn hạ trực thăng UH-1' },
  mine: { name: 'Tổ Mìn / B40', cost: 40, icon: '💣', range: 80, damage: 55, rate: 70, targets: ['m113'], desc: 'Chặn xe bọc thép thiết xa' },
  hairArmy: { name: 'Đội Quân Tóc Dài', cost: 35, icon: '🌾', range: 100, damage: 5, slow: 0.6, rate: 50, targets: ['heli', 'm113'], desc: 'Đấu tranh chính trị, chặn bước tiến địch' }
};

function initTacticalDefense() {
  const canvas = document.getElementById('tactical-canvas');
  if (!canvas) return;
  if (TacticalRuntime.initialized) {
    GameState.tactical.running = true;
    TacticalRuntime.start?.();
    return;
  }
  TacticalRuntime.initialized = true;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Deck click
  window.selectDeckUnit = function(type) {
    sfx.click();
    GameState.tactical.selectedUnit = type;
    document.querySelectorAll('.deck-card').forEach(c => {
      c.classList.toggle('selected', c.dataset.unit === type);
    });
  };

  // Canvas click to place defender
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Must place in player trench zone (left half of canvas)
    if (x > canvas.width * 0.58) {
      sfx.alarm();
      return;
    }

    const unitKey = GameState.tactical.selectedUnit;
    const unitConfig = UNIT_TYPES[unitKey];
    if (GameState.tactical.points >= unitConfig.cost) {
      GameState.tactical.points -= unitConfig.cost;
      sfx.cannon();
      GameState.tactical.defenders.push({
        x, y,
        type: unitKey,
        range: unitConfig.range,
        damage: unitConfig.damage,
        rate: unitConfig.rate,
        cooldown: 0,
        icon: unitConfig.icon,
        duration: 180, // 3 giây (180 frames ở 60fps)
        maxDuration: 180
      });
      updateTacticalHUD();
    } else {
      sfx.wrong();
    }
  });

  // Enemy Spawner: each historical wave must be defeated before the next one.
  function spawnEnemies() {
    const tactical = GameState.tactical;
    const currentWaveSize = TACTICAL_WAVES[tactical.wave - 1];
    if (!currentWaveSize || tactical.waveSpawned >= currentWaveSize) return;

    TacticalRuntime.spawnCooldown++;
    if (TacticalRuntime.spawnCooldown > 80) {
      TacticalRuntime.spawnCooldown = 0;
      tactical.waveSpawned++;
      const isHeli = Math.random() < 0.45;
      tactical.enemies.push({
        x: canvas.width + 20,
        y: isHeli ? 60 + Math.random() * 120 : canvas.height * 0.45 + Math.random() * (canvas.height * 0.4),
        type: isHeli ? 'heli' : 'm113',
        hp: isHeli ? 60 : 130,
        maxHp: isHeli ? 60 : 130,
        speed: isHeli ? 1.6 : 0.85,
        icon: isHeli ? '🚁' : '🚜',
        slowTimer: 0
      });
    }
  }

  function resolveWaveIfReady() {
    const tactical = GameState.tactical;
    const currentWaveSize = TACTICAL_WAVES[tactical.wave - 1];
    if (!currentWaveSize || tactical.waveSpawned < currentWaveSize || tactical.enemies.length) return;

    if (tactical.wave >= TACTICAL_WAVES.length) {
      tactical.running = false;
      showTacticalVictory();
      return;
    }

    tactical.wave++;
    tactical.waveSpawned = 0;
    TacticalRuntime.spawnCooldown = 0;
    tactical.points = Math.min(250, tactical.points + 40);
    sfx.correct();
    updateTacticalHUD();
  }

  // Tactical Game Loop
  function tacticalLoop() {
    if (GameState.activeMode !== 'tactical' || !GameState.tactical.running) {
      TacticalRuntime.animationFrame = null;
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;

    // Draw Ấp Bắc Environment: Rice fields, irrigation canals, bamboo thickets
    ctx.fillStyle = '#0f1a13';
    ctx.fillRect(0, 0, w, h);

    // Defense Trenches (Left Area)
    ctx.fillStyle = '#16281e';
    ctx.fillRect(0, 0, w * 0.58, h);

    // Trench dividing canal (Kênh rạch Cai Lậy)
    ctx.fillStyle = '#143026';
    ctx.fillRect(w * 0.56, 0, w * 0.04, h);

    // Water ripples
    ctx.strokeStyle = '#225540';
    ctx.lineWidth = 1.5;
    for (let r = 0; r < h; r += 35) {
      ctx.beginPath();
      ctx.moveTo(w * 0.56, r);
      ctx.lineTo(w * 0.60, r + 10);
      ctx.stroke();
    }

    // Trench line marker
    ctx.strokeStyle = 'rgba(240, 195, 84, 0.3)';
    ctx.setLineDash([6, 6]);
    ctx.strokeRect(w * 0.05, h * 0.1, w * 0.50, h * 0.8);
    ctx.setLineDash([]);

    ctx.font = '11px Oswald, sans-serif';
    ctx.fillStyle = 'rgba(240, 195, 84, 0.5)';
    ctx.fillText('TRẬN ĐỊA PHÒNG THỦ ẤP BẮC — "MỘT TẤC KHÔNG ĐI, MỘT LY KHÔNG RỜI"', w * 0.07, h * 0.08);

    // Draw Defenders (3s Lifespan Countdown)
    for (let i = GameState.tactical.defenders.length - 1; i >= 0; i--) {
      const d = GameState.tactical.defenders[i];
      d.duration = (d.duration !== undefined ? d.duration : 180) - 1;

      // Expire after 3 seconds (180 frames)
      if (d.duration <= 0) {
        GameState.tactical.defenders.splice(i, 1);
        continue;
      }

      // Range indicator ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.range, 0, Math.PI * 2);
      ctx.stroke();

      // 3-Second Lifespan Countdown Ring
      const lifePct = Math.max(0, d.duration / 180);
      ctx.strokeStyle = lifePct > 0.35 ? '#f0c354' : '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(d.x, d.y, 20, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * lifePct));
      ctx.stroke();

      // Unit Icon
      ctx.font = '22px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(d.icon, d.x, d.y);

      // Attack Logic
      d.cooldown = Math.max(0, d.cooldown - 1);
      if (d.cooldown === 0) {
        // Find closest enemy in range
        for (let e of GameState.tactical.enemies) {
          const dist = Math.hypot(e.x - d.x, e.y - d.y);
          if (dist <= d.range && UNIT_TYPES[d.type].targets.includes(e.type)) {
            d.cooldown = d.rate;
            e.hp -= d.damage;
            if (UNIT_TYPES[d.type].slow) e.slowTimer = 80;
            sfx.playTone(300 + Math.random() * 200, 'square', 0.05, 0.1);

            // Muzzle beam
            ctx.strokeStyle = '#f0c354';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(e.x, e.y);
            ctx.stroke();
            break;
          }
        }
      }
    }

    // Spawn & Update Enemies
    spawnEnemies();
    for (let i = GameState.tactical.enemies.length - 1; i >= 0; i--) {
      const e = GameState.tactical.enemies[i];
      if (e.slowTimer > 0) e.slowTimer--;
      e.x -= e.speed * (e.slowTimer > 0 ? 0.42 : 1);

      // Draw Enemy
      ctx.font = e.type === 'heli' ? '28px sans-serif' : '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(e.icon, e.x, e.y);

      // HP Bar
      const hpPercent = Math.max(0, e.hp / e.maxHp);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(e.x - 15, e.y - 20, 30, 4);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(e.x - 15, e.y - 20, 30 * hpPercent, 4);

      // If dead
      if (e.hp <= 0) {
        GameState.tactical.points += 25;
        GameState.score += 40;
        sfx.cannon();
        GameState.tactical.enemies.splice(i, 1);
        updateTacticalHUD();
        continue;
      }

      // If enemy breaches defense trench line
      if (e.x < 30) {
        GameState.tactical.health -= 15;
        sfx.alarm();
        GameState.tactical.enemies.splice(i, 1);
        updateTacticalHUD();

        if (GameState.tactical.health <= 0) {
          GameState.tactical.running = false;
          showTacticalDefeat();
          break;
        }
      }
    }

    resolveWaveIfReady();

    // Points trickle: đúng 1 điểm mỗi 1 giây (60 frames)
    GameState.tactical.secondTick = (GameState.tactical.secondTick || 0) + 1;
    if (GameState.tactical.secondTick >= 60) {
      GameState.tactical.secondTick = 0;
      GameState.tactical.points = Math.min(250, GameState.tactical.points + 1);
      updateTacticalHUD();
    }

    TacticalRuntime.animationFrame = requestAnimationFrame(tacticalLoop);
  }

  TacticalRuntime.start = () => {
    if (!TacticalRuntime.animationFrame && GameState.tactical.running) tacticalLoop();
  };
  GameState.tactical.running = true;
  TacticalRuntime.start();
}

function updateTacticalHUD() {
  const hpEl = document.getElementById('tactical-hp');
  const ptsEl = document.getElementById('tactical-points');
  const scoreEl = document.getElementById('tactical-score');
  const waveEl = document.getElementById('tactical-wave');

  if (hpEl) hpEl.textContent = GameState.tactical.health + ' / 100';
  if (ptsEl) ptsEl.textContent = GameState.tactical.points;
  if (scoreEl) scoreEl.textContent = GameState.score;
  if (waveEl) waveEl.textContent = `${Math.min(GameState.tactical.wave, TACTICAL_WAVES.length)} / ${TACTICAL_WAVES.length}`;
  updateResourceGauges();
}

function showTacticalDefeat() {
  const modal = document.getElementById('game-result-modal');
  if (!modal) return;
  modal.innerHTML = `
    <div class="result-card">
      <div class="result-icon">⚠</div>
      <h2>PHÒNG TUYẾN CẦN CỦNG CỐ</h2>
      <div class="result-rank">HÃY BỐ TRÍ LỰC LƯỢNG PHÙ HỢP VỚI TỪNG MỤC TIÊU</div>
      <div class="result-summary"><p>Trung liên hiệu quả với trực thăng; tổ mìn/B40 và bắn tỉa hiệu quả với xe M113. Bạn có thể bố trí lại trận địa để tiếp tục.</p></div>
      <div class="result-actions"><button class="btn btn-gold" onclick="restartTacticalBattle()">CỦNG CỐ & CHƠI LẠI</button><button class="btn btn-ghost" onclick="closeGameResult(); switchGameMode('strategy')">VỀ SA BÀN</button></div>
    </div>
  `;
  modal.className = 'game-result-modal open';
}

function showTacticalVictory() {
  sfx.victory();
  const modal = document.getElementById('game-result-modal');
  if (!modal) return;

  modal.innerHTML = `
    <div class="result-card">
      <div class="result-icon">★ ★ ★</div>
      <h2>GIỮ VỮNG PHÒNG TUYẾN ẤP BẮC</h2>
      <div class="result-rank">ĐÃ ĐẬP TAN TRỰC THĂNG VẬN & THIẾT XA VẬN</div>
      <div class="result-summary">
        <p>Bạn đã hoàn thành ${TACTICAL_WAVES.length} đợt tiến công và bảo vệ được trận địa.</p>
        <p><strong>Điểm chiến dịch hiện tại:</strong> ${GameState.score} điểm.</p>
      </div>
      <div class="result-actions">
        <button class="btn btn-gold" onclick="restartTacticalBattle()">CHƠI LẠI TRẬN ẤP BẮC</button>
        <button class="btn btn-ghost" onclick="closeGameResult(); switchGameMode('strategy')">VỀ SA BÀN CHIẾN LƯỢC</button>
      </div>
    </div>
  `;
  modal.className = 'game-result-modal open';
}

window.closeGameResult = function() {
  const modal = document.getElementById('game-result-modal');
  if (modal) modal.className = 'game-result-modal';
};

window.restartTacticalBattle = function() {
  const tactical = GameState.tactical;
  tactical.points = 120;
  tactical.health = 100;
  tactical.wave = 1;
  tactical.waveSpawned = 0;
  tactical.enemies = [];
  tactical.defenders = [];
  tactical.running = true;
  TacticalRuntime.spawnCooldown = 0;
  closeGameResult();
  updateTacticalHUD();
  if (GameState.activeMode !== 'tactical') switchGameMode('tactical');
  else TacticalRuntime.start?.();
};

// Emergency In-Battle Intel Quiz (Kích hoạt hỏa lực chi viện)
const TACTICAL_INTELS = [
  {
    q: 'Chiến thuật quân sự "tân kỳ" nào của Mỹ đã bị quân và dân ta đánh bại hoàn toàn tại trận Ấp Bắc?',
    opts: ['Trực thăng vận và Thiết xa vận (xe bọc thép M113)', 'Chiến tranh hạt nhân chiến lược', 'Đặc nhiệm SEAL đổ bộ bờ biển'],
    ans: 0
  },
  {
    q: 'Khẩu hiệu nổi tiếng nào được nhân dân miền Nam nêu cao trong cao trào phá ấp chiến lược sau trận Ấp Bắc?',
    opts: ['Một tấc không đi, một ly không rời', 'Tất cả cho tiền tuyến', 'Quyết tử để Tổ quốc quyết sinh'],
    ans: 0
  },
  {
    q: 'Ba vùng chiến lược mà quân dân ta triển khai thế trận tiến công địch ở miền Nam gồm những vùng nào?',
    opts: ['Rừng núi, nông thôn đồng bằng và đô thị', 'Hải đảo, biên giới và duyên hải', 'Thành thị, đồn điền cao su và sân bay'],
    ans: 0
  }
];

window.triggerTacticalIntel = function() {
  if (TacticalRuntime.intelTimer) return;
  sfx.alarm();
  const qObj = TACTICAL_INTELS[Math.floor(Math.random() * TACTICAL_INTELS.length)];
  const prompt = document.getElementById('intel-prompt');
  if (!prompt) return;

  TacticalRuntime.intelQuestion = qObj;
  let secondsLeft = 15;

  prompt.innerHTML = `
    <div class="intel-top">
      <span>ĐIỆN BÁO KHẨN TỪ BỘ CHỈ HUY MIỀN</span>
      <span class="timer" id="intel-countdown">${secondsLeft}s</span>
    </div>
    <h3>${qObj.q}</h3>
    <div class="intel-options">
      ${qObj.opts.map((opt, i) => `
        <button class="intel-opt" onclick="resolveIntel(${i}, ${qObj.ans})">${opt}</button>
      `).join('')}
    </div>
  `;
  prompt.className = 'intel-prompt open';
  TacticalRuntime.intelTimer = window.setInterval(() => {
    secondsLeft--;
    const timer = document.getElementById('intel-countdown');
    if (timer) timer.textContent = `${secondsLeft}s`;
    if (secondsLeft <= 0) resolveIntel(null, qObj.ans, true);
  }, 1000);
};

window.resolveIntel = function(chosen, correct, timedOut = false) {
  if (!TacticalRuntime.intelTimer) return;
  window.clearInterval(TacticalRuntime.intelTimer);
  TacticalRuntime.intelTimer = null;
  const prompt = document.getElementById('intel-prompt');

  if (chosen === correct) {
    sfx.victory();
    GameState.tactical.points += 60;
    GameState.score += 150;
    // Wipe half of enemies on screen with artillery barrage!
    GameState.tactical.enemies.forEach(e => e.hp -= 80);
    if (prompt) {
      prompt.innerHTML = '<div class="intel-result good"><strong>GIẢI MÃ CHÍNH XÁC!</strong><p>Pháo binh chi viện bắn cấp tập, gây thiệt hại nặng nề cho địch. +60 điểm tiếp tế.</p></div>';
      window.setTimeout(() => { if (prompt) prompt.className = 'intel-prompt'; }, 1800);
    }
  } else {
    sfx.wrong();
    if (prompt) {
      prompt.innerHTML = `<div class="intel-result bad"><strong>${timedOut ? 'ĐIỆN BÁO ĐÃ HẾT HẠN!' : 'ĐIỆN BÁO CHƯA KHỚP LỆNH!'}</strong><p>Địch tiếp tục càn quét; hãy củng cố trận địa và thử lại.</p></div>`;
      window.setTimeout(() => { if (prompt) prompt.className = 'intel-prompt'; }, 1800);
    }
  }
  updateTacticalHUD();
};

// Mode Switcher
window.switchGameMode = function(mode) {
  sfx.click();
  GameState.activeMode = mode;

  document.querySelectorAll('.game-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.mode === mode);
  });

  const stratView = document.getElementById('strategy-view');
  const tactView = document.getElementById('tactical-view');

  if (stratView) stratView.style.display = mode === 'strategy' ? 'grid' : 'none';
  if (tactView) {
    tactView.style.display = mode === 'tactical' ? 'flex' : 'none';
    if (mode === 'tactical') {
      initTacticalDefense();
      updateTacticalHUD();
    }
  }
};

// Initialize Everything on Window Load
window.addEventListener('DOMContentLoaded', () => {
  initStrategyCanvas();
  renderStrategyStage();

  // Mode tab listeners
  document.querySelectorAll('.game-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      switchGameMode(tab.dataset.mode);
    });
  });

  // (Unified audio handler configured below)
});

// MODE 3: OCEAN STEALTH RUNNER (ĐOÀN TÀU KHÔNG SỐ 759 — BIỂN ĐÔNG)
GameState.supply = {
  distance: 4500, // Hải lý dài hơn để chơi lâu
  maxDistance: 4500,
  stealth: 100,
  cargo: 35,
  shipX: 0.5,
  shipTargetX: 0.5,
  shipSpeed: 4.5, // Tốc độ trôi nhanh gấp đôi
  bankAngle: 0,
  smokeTime: 0,
  obstacles: [],
  keysDown: {},
  steerHoldDir: 0,
  gameOver: false,
  initialized: false
};

let supplyLoopId = null;

function showSeaNotification(text, type = 'info') {
  const container = document.getElementById('sea-notification-toast');
  if (container) {
    container.textContent = text;
    container.className = `sea-toast show ${type}`;
    clearTimeout(container._timer);
    container._timer = setTimeout(() => {
      container.className = 'sea-toast';
    }, 2800);
  }
}

function showSeaGameOver(title, desc) {
  GameState.supply.gameOver = true;
  sfx.wrong();
  const modal = document.getElementById('game-result-modal');
  if (!modal) return;

  modal.innerHTML = `
    <div class="result-card" style="border-color: #ef4444; box-shadow: 0 0 35px rgba(239, 68, 68, 0.45);">
      <div class="result-icon" style="color: #ef4444;">⚠</div>
      <h2 style="color: #fca5a5;">${title}</h2>
      <div class="result-rank" style="color: #f87171;">HẢI TRÌNH BỊ GIÁN ĐOẠN</div>
      <div class="result-summary" style="border-color: rgba(239, 68, 68, 0.3);">
        <p>${desc}</p>
        <p style="margin-top: 10px; color: var(--gold);">
          <strong>Hải trình còn lại:</strong> ${Math.round(GameState.supply.distance)} Hải lý • 
          <strong>Vũ khí:</strong> ${GameState.supply.cargo} Tấn
        </p>
      </div>
      <div class="result-actions">
        <button class="btn btn-gold" onclick="restartSupplyMission()">THỬ LẠI HẢI TRÌNH ⚓</button>
        <button class="btn btn-ghost" onclick="switchGameMode('strategy')">VỀ SA BÀN CHIẾN LƯỢC</button>
      </div>
    </div>
  `;
  modal.className = 'game-result-modal open';
}

function showSeaVictory(title, desc) {
  GameState.supply.gameOver = true;
  sfx.victory();
  const modal = document.getElementById('game-result-modal');
  if (!modal) return;

  modal.innerHTML = `
    <div class="result-card">
      <div class="result-icon">★ ★ ★ ★ ★</div>
      <h2>${title}</h2>
      <div class="result-rank">ANH HÙNG ĐOÀN TÀU KHÔNG SỐ 759</div>
      <div class="result-summary">
        <p>${desc}</p>
        <p style="margin-top: 10px; color: #34d399;">
          <strong>Vũ khí cập bến:</strong> ${GameState.supply.cargo} Tấn súng đạn hạng nặng • 
          <strong>Điểm thưởng:</strong> +500 Điểm!
        </p>
      </div>
      <div class="result-actions">
        <button class="btn btn-gold" onclick="restartSupplyMission()">CHƠI LẠI HẢI TRÌNH ⚓</button>
        <button class="btn btn-ghost" onclick="switchGameMode('strategy')">VỀ SA BÀN CHIẾN LƯỢC</button>
      </div>
    </div>
  `;
  modal.className = 'game-result-modal open';
}

window.restartSupplyMission = function() {
  const modal = document.getElementById('game-result-modal');
  if (modal) modal.className = 'game-result-modal';
  GameState.supply.distance = 4500;
  GameState.supply.stealth = 100;
  GameState.supply.cargo = 35;
  GameState.supply.shipX = 0.5;
  GameState.supply.shipTargetX = 0.5;
  GameState.supply.smokeTime = 0;
  GameState.supply.obstacles = [];
  GameState.supply.gameOver = false;
  initSupplyOcean();
};

function initSupplyOcean() {
  const canvas = document.getElementById('supply-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resize();

  if (!GameState.supply.initialized) {
    GameState.supply.initialized = true;
    window.addEventListener('resize', resize);

    // Continuous Keyboard Steering
    window.addEventListener('keydown', (e) => {
      if (GameState.activeMode !== 'supply') return;
      GameState.supply.keysDown[e.code] = true;
      if (e.code === 'Space') {
        e.preventDefault();
        triggerSeaSmoke();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (GameState.activeMode !== 'supply') return;
      GameState.supply.keysDown[e.code] = false;
    });

    // Mouse / Touch Drag Steering
    const handlePointer = (e) => {
      if (GameState.activeMode !== 'supply' || GameState.supply.gameOver) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const targetRatio = (clientX - rect.left) / canvas.width;
      GameState.supply.shipTargetX = Math.max(0.08, Math.min(0.92, targetRatio));
    };

    canvas.addEventListener('mousemove', (e) => {
      if (e.buttons === 1) handlePointer(e);
    });
    canvas.addEventListener('mousedown', handlePointer);
    canvas.addEventListener('touchmove', handlePointer, { passive: true });
    canvas.addEventListener('touchstart', handlePointer, { passive: true });
  }

  // Reset parameters
  GameState.supply.gameOver = false;
  GameState.supply.obstacles = [];

  // Spawn initial rocks and items
  for (let i = 0; i < 5; i++) {
    GameState.supply.obstacles.push({
      x: (0.1 + Math.random() * 0.8) * canvas.width,
      y: (i / 5) * canvas.height,
      type: Math.random() < 0.5 ? 'crate' : 'island',
      speed: 3.6
    });
  }

  let oceanOffset = 0;
  let spawnTimer = 0;

  if (supplyLoopId) {
    cancelAnimationFrame(supplyLoopId);
    supplyLoopId = null;
  }

  function supplyLoop() {
    if (GameState.activeMode !== 'supply' || GameState.supply.gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;
    const s = GameState.supply;

    // Handle Continuous Keyboard Input
    if (s.keysDown['ArrowLeft'] || s.keysDown['KeyA']) {
      s.shipTargetX = Math.max(0.08, s.shipTargetX - 0.024);
    }
    if (s.keysDown['ArrowRight'] || s.keysDown['KeyD']) {
      s.shipTargetX = Math.min(0.92, s.shipTargetX + 0.024);
    }
    if (s.steerHoldDir !== 0) {
      s.shipTargetX = Math.max(0.08, Math.min(0.92, s.shipTargetX + s.steerHoldDir * 0.024));
    }

    // Engine speed (Tốc độ trôi gấp đôi)
    let currentSpeed = s.shipSpeed;
    if (s.keysDown['ArrowUp'] || s.keysDown['KeyW']) currentSpeed = 6.2;
    if (s.keysDown['ArrowDown'] || s.keysDown['KeyS']) currentSpeed = 2.8;

    // Ocean Gradient
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
    oceanGrad.addColorStop(0, '#030a12');
    oceanGrad.addColorStop(0.5, '#061726');
    oceanGrad.addColorStop(1, '#082136');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, w, h);

    // Fast Moving Waves Pattern (Tốc độ sóng gấp đôi)
    oceanOffset = (oceanOffset + currentSpeed * 1.8) % 60;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
    ctx.lineWidth = 2;
    for (let y = oceanOffset; y < h; y += 45) {
      ctx.beginPath();
      for (let x = 0; x < w; x += 40) {
        ctx.lineTo(x, y + Math.sin((x + oceanOffset * 4) * 0.04) * 8);
      }
      ctx.stroke();
    }

    // Update Distance Progress
    if (s.distance > 0) {
      s.distance = Math.max(0, s.distance - (currentSpeed * 0.55));
      const distEl = document.getElementById('supply-distance');
      if (distEl) distEl.textContent = Math.round(s.distance) + ' HẢI LÝ';
    } else {
      // Reached Destination!
      showSeaVictory(
        'HẢI TRÌNH 4500 HẢI LÝ TOÀN THẮNG!',
        `Tàu không số đã cập bến an toàn, tiếp tế thành công ${s.cargo} tấn vũ khí hạng nặng cho quân dân miền Nam!`
      );
      return;
    }

    // Smooth Ship Motion & Dynamic Banking Angle
    const dx = s.shipTargetX - s.shipX;
    s.shipX += dx * 0.14;
    s.bankAngle = dx * 1.8;
    const shipPixelX = s.shipX * w;
    const shipPixelY = h * 0.78;

    // Draw Ship Foam Wake (Vệt sóng sau lái)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.beginPath();
    ctx.moveTo(shipPixelX - 8, shipPixelY + 28);
    ctx.lineTo(shipPixelX - 24, shipPixelY + 70);
    ctx.lineTo(shipPixelX + 24, shipPixelY + 70);
    ctx.lineTo(shipPixelX + 8, shipPixelY + 28);
    ctx.fill();

    // Twin propeller water spray
    ctx.fillStyle = 'rgba(125, 211, 252, 0.4)';
    ctx.beginPath();
    ctx.arc(shipPixelX - 6, shipPixelY + 38, 7 + Math.random() * 5, 0, Math.PI * 2);
    ctx.arc(shipPixelX + 6, shipPixelY + 38, 7 + Math.random() * 5, 0, Math.PI * 2);
    ctx.fill();

    // Draw Player Ship (Tàu Không Số gỗ ngụy trang)
    ctx.save();
    ctx.translate(shipPixelX, shipPixelY);
    ctx.rotate(s.bankAngle);

    // Wooden Hull
    ctx.fillStyle = '#854d0e';
    ctx.beginPath();
    ctx.moveTo(0, -34);
    ctx.quadraticCurveTo(17, -14, 17, 26);
    ctx.lineTo(-17, 26);
    ctx.quadraticCurveTo(-17, -14, 0, -34);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Deck planks
    ctx.fillStyle = '#a16207';
    ctx.fillRect(-12, -8, 24, 30);

    // Cargo Crates on Deck
    ctx.fillStyle = '#451a03';
    ctx.fillRect(-8, 2, 7, 7);
    ctx.fillRect(2, 2, 7, 7);
    ctx.fillRect(-4, 11, 8, 8);

    // Wheelhouse / Cabin
    ctx.fillStyle = '#292524';
    ctx.fillRect(-8, -16, 16, 13);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(-6, -14, 12, 3);

    // Flag
    ctx.fillStyle = '#da251d';
    ctx.fillRect(0, -30, 13, 9);
    ctx.fillStyle = '#ffeb00';
    ctx.fillRect(5, -27, 3, 3);

    ctx.restore();

    // Smoke effect when active
    if (s.smokeTime > 0) {
      s.smokeTime--;
      for (let sm = 0; sm < 6; sm++) {
        ctx.fillStyle = `rgba(180, 210, 225, ${Math.random() * 0.45})`;
        ctx.beginPath();
        ctx.arc(
          shipPixelX + (Math.random() - 0.5) * 85,
          shipPixelY + (Math.random() - 0.5) * 85,
          26 + Math.random() * 30,
          0, Math.PI * 2
        );
        ctx.fill();
      }
    }

    // Spawn Obstacles (spawn nhanh hơn: 45 frames)
    spawnTimer++;
    if (spawnTimer > 45) {
      spawnTimer = 0;
      const rand = Math.random();
      let type = 'enemy';
      if (rand < 0.38) type = 'island';
      else if (rand < 0.65) type = 'crate';

      s.obstacles.push({
        x: (0.12 + Math.random() * 0.76) * w,
        y: -70,
        type: type,
        speed: type === 'enemy' ? 4.8 : 3.8, // Tốc độ trôi gấp đôi!
        radarAngle: Math.random() * Math.PI * 2
      });
    }

    // Update & Draw Obstacles
    for (let i = s.obstacles.length - 1; i >= 0; i--) {
      const ob = s.obstacles[i];
      ob.y += ob.speed;

      if (ob.type === 'enemy') {
        // Draw US Navy Destroyer
        ctx.save();
        ctx.translate(ob.x, ob.y);

        // Hull
        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.moveTo(0, 38);
        ctx.lineTo(19, 0);
        ctx.lineTo(19, -38);
        ctx.lineTo(-19, -38);
        ctx.lineTo(-19, 0);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Bridge & Red Beacon
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(-10, -20, 20, 24);
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(0, -7, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Rotating Searchlight Beam
        ob.radarAngle = (ob.radarAngle + 0.038) % (Math.PI * 2);
        const sweepSpread = Math.sin(ob.radarAngle) * 0.58;
        const beamCenterAngle = Math.PI / 2 + sweepSpread;

        const coneRadius = 175;
        const halfConeArc = 0.30;

        ctx.fillStyle = s.smokeTime > 0 ? 'rgba(56, 189, 248, 0.05)' : 'rgba(239, 68, 68, 0.28)';
        ctx.beginPath();
        ctx.moveTo(0, 20);
        ctx.arc(0, 20, coneRadius, beamCenterAngle - halfConeArc, beamCenterAngle + halfConeArc);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        // BỊ QUÉT TRÚNG RADAR SẼ THUA NGAY (NẾU KHÔNG THẢ KHÓI)
        const relX = shipPixelX - ob.x;
        const relY = shipPixelY - (ob.y + 20);
        const dist = Math.hypot(relX, relY);

        if (dist < 175 && s.smokeTime <= 0) {
          const angleToShip = Math.atan2(relY, relX);
          let angleDiff = Math.abs(angleToShip - (Math.PI / 2 + sweepSpread));
          while (angleDiff > Math.PI) angleDiff = Math.abs(angleDiff - Math.PI * 2);

          // Ship is illuminated by radar searchlight!
          if (angleDiff < 0.30) {
            showSeaGameOver(
              'BỊ PHÁT HIỆN: CHIẾN HẠM MỸ BAO VÂY!',
              'Tàu tuần tiễu Hạm đội 7 của địch đã chiếu trúng thân tàu và nã pháo bao vây. Hãy thả màn khói ngụy trang kịp thời ở lượt sau!'
            );
            return;
          }
        }
      } else if (ob.type === 'island') {
        // HẺM ĐÁ NGẦM / ĐẢO ĐÁ SAN HÔ
        ctx.save();
        ctx.translate(ob.x, ob.y);
        ctx.fillStyle = '#22382e';
        ctx.beginPath();
        ctx.ellipse(0, 0, 36, 22, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = 'bold 11px Oswald, sans-serif';
        ctx.fillStyle = '#f87171';
        ctx.textAlign = 'center';
        ctx.fillText('HẺM ĐÁ ⚠', 0, 4);
        ctx.restore();

        // VA VÀO HẺM ĐÁ SẼ THUA NGAY
        const distToIsland = Math.hypot(shipPixelX - ob.x, shipPixelY - ob.y);
        if (distToIsland < 44) {
          showSeaGameOver(
            'ĐẮM TÀU: VA PHẢI HẺM ĐÁ NGẦM!',
            'Con tàu không số đã đâm sầm vào hẻm đá ngầm san hô Biển Đông và vỡ nát vỏ tàu! Hải trình 759 bị đứt gãy.'
          );
          return;
        }
      } else if (ob.type === 'crate') {
        // Weapon crate floating
        ctx.save();
        ctx.translate(ob.x, ob.y);
        ctx.font = '26px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('📦', 0, 0);

        ctx.strokeStyle = 'rgba(240, 195, 84, 0.4)';
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Collect crate
        const dist = Math.hypot(ob.x - shipPixelX, ob.y - shipPixelY);
        if (dist < 40) {
          s.cargo += 5;
          GameState.score += 50;
          sfx.correct();
          s.obstacles.splice(i, 1);
          const cargoEl = document.getElementById('supply-cargo');
          if (cargoEl) cargoEl.textContent = s.cargo + ' TẤN';
          showSeaNotification('TIẾP NHẬN +5 TẤN VŨ KHÍ TỪ ĐOÀN 759!', 'success');
          continue;
        }
      }

      // Remove offscreen
      if (ob.y > h + 80) {
        s.obstacles.splice(i, 1);
      }
    }

    supplyLoopId = requestAnimationFrame(supplyLoop);
  }

  supplyLoop();
}

window.steerShip = function(dir) {
  sfx.click();
  const s = GameState.supply;
  s.shipTargetX = Math.max(0.08, Math.min(0.92, s.shipTargetX + dir * 0.12));
};

window.steerHold = function(dir) {
  GameState.supply.steerHoldDir = dir;
};

window.triggerSeaSmoke = function() {
  sfx.cannon();
  GameState.supply.smokeTime = 220; // 3.6s khói dày
  showSeaNotification('💨 ĐÃ THẢ MÀN KHÓI NGỤY TRANG! Radar địch bị vô hiệu hóa.', 'info');
};

// Mode Switcher
window.switchGameMode = function(mode) {
  sfx.click();
  GameState.activeMode = mode;

  document.querySelectorAll('.game-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.mode === mode);
  });

  const stratView = document.getElementById('strategy-view');
  const tactView = document.getElementById('tactical-view');
  const supView = document.getElementById('supply-view');

  if (stratView) stratView.style.display = mode === 'strategy' ? 'grid' : 'none';
  if (tactView) {
    tactView.style.display = mode === 'tactical' ? 'flex' : 'none';
    if (mode === 'tactical') {
      initTacticalDefense();
      updateTacticalHUD();
    }
  }
  if (supView) {
    supView.style.display = mode === 'supply' ? 'flex' : 'none';
    if (mode === 'supply') {
      initSupplyOcean();
    }
  }
};

// Autoplay Audio in game.html across all modes
document.addEventListener('DOMContentLoaded', () => {
  const audioEl = document.getElementById('bg-audio');
  const soundBtn = document.getElementById('sound-toggle');
  if (!audioEl) return;

  audioEl.volume = 0.6;

  function updateAudioButton(isPlaying) {
    if (soundBtn) {
      soundBtn.innerHTML = isPlaying ? '🔊 ÂM THANH: BẬT' : '🔇 ÂM THANH: TẮT';
    }
  }

  // Attempt autoplay immediately
  function attemptAutoPlay() {
    const playPromise = audioEl.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        sfx.muted = false;
        updateAudioButton(true);
      }).catch(() => {
        // Unlock on first interaction (click, touch, key, pointer, scroll)
        const unlockAudio = () => {
          audioEl.play().then(() => {
            sfx.muted = false;
            updateAudioButton(true);
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

  attemptAutoPlay();

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      sfx.muted = !sfx.muted;
      if (sfx.muted) {
        audioEl.pause();
        updateAudioButton(false);
      } else {
        audioEl.play().catch(() => {});
        updateAudioButton(true);
      }
    });
  }
});
