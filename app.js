/* ==========================================================
   RoboCalc — app.js
   All product data, price registry, calculation engine & UI
   ========================================================== */

// ──────────────────────────────────────────────
// 1. COMPONENT PRICE REGISTRY  (canonical name → unit price ₹ incl GST)
// ──────────────────────────────────────────────
const PRICES = {
  'Brainometry Kit': 3009,
  'Colour Coder Kit': 531,
  'Code and Go Robot Mouse': 5900,
  'Wiggle Bot': 1593,
  'Motor Machines Kit': 767,
  'Snap Circuit': 1534,
  'Crocodile Cable': 9.44,
  'Micro:bit': 2183,
  'Arduino Uno R3 and Cable': 702.10,
  'Breadboard': 71.98,
  'Jumper Wire M2M': 65,
  'Jumper Wire F2F': 58,
  'Jumper Wire M2F': 48,
  'Led 5x5': 2.36,
  'Buzzer': 14.16,
  'Fire Sensor': 36.58,
  'Servo Motor': 107.38,
  'LDR Module': 33.04,
  'Sound Sensor': 40.12,
  'IR Sensor': 35.40,
  'PIR Sensor': 119.18,
  'Ultrasonic Sensor': 80.24,
  'LCD I2C Module': 155.76,
  'Gear Motor': 48.38,
  'Keypad 4x4': 107.38,
  'RFID Kit': 126.26,
  'HC-05 Bluetooth Module': 320.96,
  'Lithium Battery 3.7V (Pair)': 181.72,
  'Battery Holder': 24.78,
  'Rocker Switch': 9.44,
  'L298N Motor Driver': 140.42,
  '4WD Car Kit': 759.92,
  'ESP8266': 238.36,
  'Moisture Sensor': 47.20,
  'Water Pump': 46.02,
  'Water Pump Pipe': 21.24,
  'Water Level Sensor': 28.32,
  'Red LED': 2.36,
  'Green LED': 2.36,
  'Resistors (220 ohm)': 2,
  'Aluminium Foil': 0,
  'Insulation Tape': 0,
  'DHT11 Humidity Sensor': 0,
  'DC Motor Fan': 0,
  'USB Cable': 0,
  'Relay Module 5V': 0,
  'Solar Panel': 0,
  'Traffic Light Module': 36.58,
};

// ──────────────────────────────────────────────
// 2. PRODUCT DATA
//    Each grade → array of { name (canonical), qty }
//    Duplicates within a grade are already summed.
// ──────────────────────────────────────────────
const GRADES = ['KG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'];

const PRODUCTS = {
  'AI Robo Suite': {
    'KG': [
      { name: 'Brainometry Kit', qty: 1 },
      { name: 'Colour Coder Kit', qty: 1 },
      { name: 'Code and Go Robot Mouse', qty: 1 },
    ],
    'Grade 1': [
      { name: 'Snap Circuit', qty: 1 },
      { name: 'Wiggle Bot', qty: 1 },
    ],
    'Grade 2': [
      { name: 'Snap Circuit', qty: 1 },
      { name: 'Motor Machines Kit', qty: 1 },
    ],
    'Grade 3': [
      { name: 'Motor Machines Kit', qty: 1 },
      { name: 'Micro:bit', qty: 1 },
    ],
    'Grade 4': [
      { name: 'Micro:bit', qty: 1 },
      { name: 'Arduino Uno R3 and Cable', qty: 1 },
      { name: 'Breadboard', qty: 1 },
      { name: 'Jumper Wire M2M', qty: 2 },
      { name: 'Jumper Wire F2F', qty: 1 },
      { name: 'Jumper Wire M2F', qty: 1 },
      { name: 'Led 5x5', qty: 1 },
      { name: 'Buzzer', qty: 1 },
    ],
    'Grade 5': [
      { name: 'Micro:bit', qty: 1 },
      { name: 'Arduino Uno R3 and Cable', qty: 1 },
      { name: 'Breadboard', qty: 1 },
      { name: 'Jumper Wire M2M', qty: 2 },
      { name: 'Jumper Wire F2F', qty: 1 },
      { name: 'Jumper Wire M2F', qty: 1 },
      { name: 'Led 5x5', qty: 1 },
      { name: 'Buzzer', qty: 1 },
      { name: 'Fire Sensor', qty: 1 },
    ],
    'Grade 6': [
      { name: 'Arduino Uno R3 and Cable', qty: 1 },
      { name: 'Breadboard', qty: 1 },
      { name: 'Jumper Wire M2M', qty: 2 },
      { name: 'Jumper Wire F2F', qty: 1 },
      { name: 'Jumper Wire M2F', qty: 1 },
      { name: 'Led 5x5', qty: 1 },
      { name: 'Buzzer', qty: 1 },
      { name: 'Ultrasonic Sensor', qty: 1 },
      { name: 'Servo Motor', qty: 1 },
      { name: 'LDR Module', qty: 1 },
      { name: 'Sound Sensor', qty: 1 },
    ],
    'Grade 7': [
      { name: 'Arduino Uno R3 and Cable', qty: 1 },
      { name: 'Breadboard', qty: 1 },
      { name: 'Jumper Wire M2M', qty: 2 },
      { name: 'Jumper Wire F2F', qty: 1 },
      { name: 'Jumper Wire M2F', qty: 1 },
      { name: 'Led 5x5', qty: 1 },
      { name: 'Buzzer', qty: 1 },
      { name: 'IR Sensor', qty: 1 },
      { name: 'PIR Sensor', qty: 1 },
      { name: 'Servo Motor', qty: 1 },
      { name: 'Ultrasonic Sensor', qty: 1 },
      { name: 'LCD I2C Module', qty: 1 },
      { name: 'LDR Module', qty: 2 },
      { name: 'Gear Motor', qty: 1 },
      { name: 'HC-05 Bluetooth Module', qty: 1 },
    ],
    'Grade 8': [
      { name: 'Arduino Uno R3 and Cable', qty: 1 },
      { name: 'Breadboard', qty: 1 },
      { name: 'Jumper Wire M2M', qty: 2 },
      { name: 'Jumper Wire F2F', qty: 1 },
      { name: 'Jumper Wire M2F', qty: 1 },
      { name: 'Led 5x5', qty: 1 },
      { name: 'Buzzer', qty: 1 },
      { name: 'Keypad 4x4', qty: 1 },
      { name: 'LCD I2C Module', qty: 1 },
      { name: 'RFID Kit', qty: 1 },
      { name: 'HC-05 Bluetooth Module', qty: 1 },
      { name: 'Lithium Battery 3.7V (Pair)', qty: 2 },
      { name: 'Battery Holder', qty: 1 },
      { name: 'Rocker Switch', qty: 1 },
      { name: 'L298N Motor Driver', qty: 1 },
      { name: '4WD Car Kit', qty: 1 },
    ],
    'Grade 9': [
      { name: 'Arduino Uno R3 and Cable', qty: 1 },
      { name: 'ESP8266', qty: 2 },
      { name: 'Breadboard', qty: 1 },
      { name: 'Jumper Wire M2M', qty: 2 },
      { name: 'Jumper Wire F2F', qty: 1 },
      { name: 'Jumper Wire M2F', qty: 1 },
      { name: 'Red LED', qty: 1 },
      { name: 'Green LED', qty: 25 },
      { name: 'Buzzer', qty: 1 },
      { name: 'Servo Motor', qty: 2 },
      { name: 'Ultrasonic Sensor', qty: 1 },
      { name: '4WD Car Kit', qty: 1 },
      { name: 'L298N Motor Driver', qty: 1 },
      { name: 'Rocker Switch', qty: 1 },
      { name: 'Battery Holder', qty: 1 },
      { name: 'Lithium Battery 3.7V (Pair)', qty: 2 },
    ],
    'Grade 10': [
      { name: 'Arduino Uno R3 and Cable', qty: 1 },
      { name: 'ESP8266', qty: 2 },
      { name: 'Breadboard', qty: 2 },
      { name: 'Jumper Wire M2M', qty: 2 },
      { name: 'Jumper Wire F2F', qty: 1 },
      { name: 'Jumper Wire M2F', qty: 1 },
      { name: 'Green LED', qty: 25 },
      { name: 'Red LED', qty: 25 },
      { name: 'Buzzer', qty: 1 },
      { name: 'Resistors (220 ohm)', qty: 3 },
      { name: 'Ultrasonic Sensor', qty: 1 },
      { name: 'Water Level Sensor', qty: 1 },
      { name: 'Servo Motor', qty: 1 },
      { name: 'IR Sensor', qty: 2 },
      { name: '4WD Car Kit', qty: 1 },
      { name: 'L298N Motor Driver', qty: 1 },
      { name: 'Rocker Switch', qty: 1 },
      { name: 'Battery Holder', qty: 1 },
      { name: 'Lithium Battery 3.7V (Pair)', qty: 2 },
    ],
  },

  'Project Suite': {
    'KG': [
      { name: 'Brainometry Kit', qty: 1 },
      { name: 'Code and Go Robot Mouse', qty: 1 },
      { name: 'Colour Coder Kit', qty: 1 },
    ],
    'Grade 1': [
      { name: 'Micro:bit', qty: 1 },
      { name: 'Snap Circuit', qty: 1 },
    ],
    'Grade 2': [
      { name: 'Micro:bit', qty: 1 },
      { name: 'Snap Circuit', qty: 1 },
    ],
    'Grade 3': [
      { name: 'Micro:bit', qty: 1 },
      { name: 'Crocodile Cable', qty: 1 },
      { name: 'Buzzer', qty: 1 },
      { name: 'Aluminium Foil', qty: 1 },
    ],
    'Grade 4': [
      { name: 'Arduino Uno R3 and Cable', qty: 1 },
      { name: 'Led 5x5', qty: 10 },
      { name: 'Jumper Wire M2M', qty: 2 },
      { name: 'Jumper Wire F2F', qty: 1 },
      { name: 'Jumper Wire M2F', qty: 1 },
      { name: 'Resistors (220 ohm)', qty: 1 },
      { name: 'Breadboard', qty: 1 },
      { name: 'Micro:bit', qty: 1 },
      { name: 'Crocodile Cable', qty: 1 },
      { name: 'LDR Module', qty: 1 },
    ],
    'Grade 5': [
      { name: 'Arduino Uno R3 and Cable', qty: 1 },
      { name: 'Led 5x5', qty: 10 },
      { name: 'Jumper Wire M2M', qty: 2 },
      { name: 'Jumper Wire F2F', qty: 1 },
      { name: 'Jumper Wire M2F', qty: 1 },
      { name: 'IR Sensor', qty: 1 },
      { name: 'Breadboard', qty: 1 },
      { name: 'Buzzer', qty: 1 },
      { name: 'Resistors (220 ohm)', qty: 1 },
      { name: 'Fire Sensor', qty: 1 },
    ],
    'Grade 6': [
      { name: 'Arduino Uno R3 and Cable', qty: 1 },
      { name: 'L298N Motor Driver', qty: 1 },
      { name: '4WD Car Kit', qty: 1 },
      { name: 'Ultrasonic Sensor', qty: 1 },
      { name: 'Lithium Battery 3.7V (Pair)', qty: 2 },
      { name: 'Battery Holder', qty: 1 },
      { name: 'Jumper Wire M2M', qty: 2 },
      { name: 'Jumper Wire F2F', qty: 1 },
      { name: 'Jumper Wire M2F', qty: 1 },
      { name: 'Rocker Switch', qty: 1 },
      { name: 'Led 5x5', qty: 10 },
      { name: 'Buzzer', qty: 1 },
      { name: 'Breadboard', qty: 1 },
      { name: 'Resistors (220 ohm)', qty: 1 },
      { name: 'Water Level Sensor', qty: 1 },
    ],
    'Grade 7': [
      { name: 'Arduino Uno R3 and Cable', qty: 1 },
      { name: 'Jumper Wire M2M', qty: 2 },
      { name: 'Jumper Wire F2F', qty: 1 },
      { name: 'Jumper Wire M2F', qty: 1 },
      { name: '4WD Car Kit', qty: 1 },
      { name: 'HC-05 Bluetooth Module', qty: 1 },
      { name: 'Lithium Battery 3.7V (Pair)', qty: 2 },
      { name: 'Battery Holder', qty: 1 },
      { name: 'Rocker Switch', qty: 1 },
      { name: 'Led 5x5', qty: 1 },
      { name: 'Resistors (220 ohm)', qty: 1 },
      { name: 'Breadboard', qty: 1 },
      { name: 'LCD I2C Module', qty: 1 },
      { name: 'Servo Motor', qty: 1 },
      { name: 'Ultrasonic Sensor', qty: 1 },
    ],
    'Grade 8': [
      { name: 'Arduino Uno R3 and Cable', qty: 1 },
      { name: 'Servo Motor', qty: 1 },
      { name: 'LDR Module', qty: 2 },
      { name: 'Solar Panel', qty: 1 },
      { name: 'Resistors (220 ohm)', qty: 1 },
      { name: 'IR Sensor', qty: 2 },
      { name: 'L298N Motor Driver', qty: 1 },
      { name: '4WD Car Kit', qty: 1 },
      { name: 'Lithium Battery 3.7V (Pair)', qty: 1 },
      { name: 'Battery Holder', qty: 1 },
      { name: 'Rocker Switch', qty: 1 },
      { name: 'ESP8266', qty: 1 },
      { name: 'USB Cable', qty: 1 },
      { name: 'Relay Module 5V', qty: 1 },
      { name: 'Breadboard', qty: 1 },
      { name: 'Led 5x5', qty: 1 },
      { name: 'Jumper Wire M2M', qty: 2 },
      { name: 'Jumper Wire F2F', qty: 1 },
      { name: 'Jumper Wire M2F', qty: 1 },
      { name: 'Insulation Tape', qty: 1 },
      { name: 'Ultrasonic Sensor', qty: 1 },
    ],
    'Grade 9': [
      { name: 'Arduino Uno R3 and Cable', qty: 1 },
      { name: 'Servo Motor', qty: 2 },
      { name: 'ESP8266', qty: 1 },
      { name: 'USB Cable', qty: 1 },
      { name: 'Ultrasonic Sensor', qty: 2 },
      { name: 'Led 5x5', qty: 1 },
      { name: 'Jumper Wire M2M', qty: 2 },
      { name: 'Jumper Wire F2F', qty: 1 },
      { name: 'Jumper Wire M2F', qty: 1 },
      { name: 'Breadboard', qty: 1 },
      { name: 'HC-05 Bluetooth Module', qty: 1 },
      { name: 'Resistors (220 ohm)', qty: 1 },
      { name: 'Relay Module 5V', qty: 1 },
      { name: 'Moisture Sensor', qty: 1 },
      { name: 'Water Pump', qty: 1 },
      { name: 'Water Pump Pipe', qty: 1 },
      { name: 'Lithium Battery 3.7V (Pair)', qty: 1 },
      { name: 'Battery Holder', qty: 2 },
    ],
    'Grade 10': [
      { name: 'Arduino Uno R3 and Cable', qty: 1 },
      { name: 'ESP8266', qty: 1 },
      { name: 'USB Cable', qty: 1 },
      { name: '4WD Car Kit', qty: 1 },
      { name: 'Led 5x5', qty: 1 },
      { name: 'Jumper Wire M2M', qty: 2 },
      { name: 'Jumper Wire F2F', qty: 1 },
      { name: 'Jumper Wire M2F', qty: 1 },
      { name: 'Moisture Sensor', qty: 1 },
      { name: 'Breadboard', qty: 1 },
      { name: 'DHT11 Humidity Sensor', qty: 1 },
      { name: 'Resistors (220 ohm)', qty: 1 },
      { name: 'Relay Module 5V', qty: 1 },
      { name: 'DC Motor Fan', qty: 1 },
      { name: 'L298N Motor Driver', qty: 1 },
      { name: 'Water Pump', qty: 1 },
      { name: 'Water Pump Pipe', qty: 1 },
      { name: 'Lithium Battery 3.7V (Pair)', qty: 2 },
      { name: 'Battery Holder', qty: 1 },
      { name: 'Rocker Switch', qty: 1 },
    ],
  },
};

// ──────────────────────────────────────────────
// 2b. SURPLUS PRIORITY LIST (Extra items to fill budget gap)
// ──────────────────────────────────────────────
const SURPLUS_PRIORITY = [
  { name: 'Micro:bit', reason: 'Expandable controller for more projects' },
  { name: 'Arduino Uno R3 and Cable', reason: 'Core controller spares' },
  { name: 'IR Sensor', reason: 'Common spare for robotics' },
  { name: 'Ultrasonic Sensor', reason: 'Highly useful for distance' },
  { name: 'Servo Motor', reason: 'Frequent replacement needed' },
  { name: 'Led 5x5', reason: 'Consumable/High usage' },
  { name: 'Buzzer', reason: 'Common add-on' },
  { name: 'Jumper Wire M2M', reason: 'Essential connectivity' },
  { name: 'Lithium Battery 3.7V (Pair)', reason: 'Consumable power' },
];

// ──────────────────────────────────────────────
// 3. COMMON LAB TOOLS
// ──────────────────────────────────────────────
const COMMON_TOOLS = [
  { name: 'Screwdriver Kit', price: 74.34 },
  { name: 'Soldering Lead', price: 188.80 },
  { name: 'Multimeter', price: 672.60 },
  { name: 'Soldering Iron', price: 297.36 },
  { name: 'Soldering Paste', price: 12.98 },
  { name: 'Soldering Stand', price: 165.20 },
  { name: 'Glue Gun', price: 206.50 },
  { name: 'Glue Stick', price: 15.34 },
];

// ──────────────────────────────────────────────
// 4. STATE
// ──────────────────────────────────────────────
let selectedProduct = null;
let currentStep = 1;

// ──────────────────────────────────────────────
// 5. DOM REFERENCES
// ──────────────────────────────────────────────
const $ = id => document.getElementById(id);
const steps = [null, $('step1'), $('step2'), $('step3'), $('step4')];
const dots = document.querySelectorAll('.dot');
const bars = [$('bar1'), $('bar2'), $('bar3')];

// ──────────────────────────────────────────────
// 6. NAVIGATION
// ──────────────────────────────────────────────
function goToStep(n) {
  steps[currentStep].classList.remove('active');
  currentStep = n;
  steps[currentStep].classList.add('active');

  dots.forEach((d, i) => {
    const s = i + 1;
    d.classList.toggle('active', s === currentStep);
    d.classList.toggle('done', s < currentStep);
  });
  bars.forEach((b, i) => {
    b.style.width = (i + 1 < currentStep) ? '100%' : '0';
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ──────────────────────────────────────────────
// 7. STEP 1 — PRODUCT SELECTION
// ──────────────────────────────────────────────
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.product-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedProduct = card.dataset.product;
    setTimeout(() => goToStep(2), 300);
  });
});

// ──────────────────────────────────────────────
// 8. STEP 2 — CONFIGURATION  (back / next)
// ──────────────────────────────────────────────
$('btn-back-2').addEventListener('click', () => goToStep(1));
$('btn-next-2').addEventListener('click', () => {
  const ds = parseInt($('divisionStrength').value);
  const gs = parseInt($('groupSize').value);
  if (!ds || ds < 1) return alert('Please enter a valid Division Strength');
  if (!gs || gs < 1) return alert('Please enter a valid Group Size');
  buildGradeInputs();
  goToStep(3);
});

// ──────────────────────────────────────────────
// 9. STEP 3 — GRADE INPUTS
// ──────────────────────────────────────────────
function buildGradeInputs() {
  const container = $('grade-inputs');
  container.innerHTML = '';
  GRADES.forEach(g => {
    const div = document.createElement('div');
    div.className = 'grade-input-item';
    div.innerHTML = `<label>${g}</label><input type="number" min="0" value="0" data-grade="${g}" class="grade-student-input" />`;
    container.appendChild(div);
  });
}
$('btn-back-3').addEventListener('click', () => goToStep(2));
$('btn-calc').addEventListener('click', calculate);

// ──────────────────────────────────────────────
// 10. CALCULATION ENGINE
// ──────────────────────────────────────────────
function calculate() {
  // 1. Gather student counts & total students
  let totalStudents = 0;
  const studentMap = {};
  document.querySelectorAll('.grade-student-input').forEach(inp => {
    const val = parseInt(inp.value) || 0;
    studentMap[inp.dataset.grade] = val;
    totalStudents += val;
  });

  // 2. Setup budget cap (INR 200 per student)
  const budgetCap = totalStudents * 200;

  // 3. Active grades (students > 0) that exist in the selected product
  const productData = PRODUCTS[selectedProduct];
  const activeGrades = GRADES.filter(g => studentMap[g] > 0 && productData[g]);

  if (activeGrades.length === 0) return alert('Please enter students for at least one grade.');

  // 4. Divisions per grade & Total Divisions
  const divisionStrength = parseInt($('divisionStrength').value) || 30;
  const groupSize = parseInt($('groupSize').value) || 5;

  const divMap = {};
  let totalDivisions = 0;
  activeGrades.forEach(g => {
    divMap[g] = Math.ceil(studentMap[g] / divisionStrength);
    totalDivisions += divMap[g];
  });

  // 5. Initial Sets Calculation
  const baseSets = Math.ceil(divisionStrength / groupSize) * totalDivisions;

  // 6. Bonus Sets (1 extra per 10 divisions)
  let additionalSets = Math.floor(totalDivisions / 10);

  // 7. Calculate "Price per Set" (sum of components in one kit)
  const maxQtyMap = {};                       // name → qty in one kit (max across active grades)
  const componentOrder = [];
  activeGrades.forEach(g => {
    (productData[g] || []).forEach(({ name, qty }) => {
      if (!(name in maxQtyMap)) {
        maxQtyMap[name] = 0;
        componentOrder.push(name);
      }
      if (qty > maxQtyMap[name]) maxQtyMap[name] = qty;
    });
  });

  let oneSetPrice = 0;
  componentOrder.forEach(name => {
    oneSetPrice += maxQtyMap[name] * (PRICES[name] ?? 0);
  });

  // 8. Common tools (1 set per <10 divisions, 2 sets for 10+)
  const toolSets = totalDivisions < 10 ? 1 : 2;
  let toolsSubtotal = 0;
  COMMON_TOOLS.forEach(t => {
    toolsSubtotal += toolSets * t.price;
  });

  // 9. Budget Enforcement
  let finalBaseSets = baseSets;
  let finalAdditionalSets = additionalSets;
  let subtotalNoBonus = (finalBaseSets * oneSetPrice) + toolsSubtotal;

  // Check if we can even afford base sets + tools
  if (subtotalNoBonus > budgetCap) {
    // Drop bonus entirely
    finalAdditionalSets = 0;
    // Lower base sets to fit budget
    finalBaseSets = Math.floor((budgetCap - toolsSubtotal) / oneSetPrice);
    if (finalBaseSets < 0) finalBaseSets = 0;
  } else {
    // We can afford base sets, check if we can afford all bonus sets
    let subtotalWithBonus = subtotalNoBonus + (finalAdditionalSets * oneSetPrice);
    if (subtotalWithBonus > budgetCap) {
      // Reduce bonus sets to fit budget
      finalAdditionalSets = Math.floor((budgetCap - subtotalNoBonus) / oneSetPrice);
      if (finalAdditionalSets < 0) finalAdditionalSets = 0;
    }
  }

  // 10. Prepare Line Items for Rendering
  const buildRows = (numSets) => {
    if (numSets <= 0) return [];
    return componentOrder.map(name => {
      const perSetQty = maxQtyMap[name];
      const totalQty = perSetQty * numSets;
      const price = PRICES[name] ?? 0;
      const lineTotal = totalQty * price;
      return { name, perSetQty, totalQty, price, lineTotal };
    });
  };

  const baseRows = buildRows(finalBaseSets);
  const additionalRows = buildRows(finalAdditionalSets);

  const baseSubtotal = baseRows.reduce((sum, r) => sum + r.lineTotal, 0);
  const additionalSubtotal = additionalRows.reduce((sum, r) => sum + r.lineTotal, 0);

  const toolRows = COMMON_TOOLS.map(t => {
    const qty = toolSets;
    const total = qty * t.price;
    return { name: t.name, qty, price: t.price, total };
  });

  const grandTotalNoSurplus = baseSubtotal + additionalSubtotal + toolsSubtotal;

  // 11. Surplus Allocation (Fill remaining budget cap)
  const surplus = budgetCap - grandTotalNoSurplus;
  let remainingSurplus = surplus;
  const surplusRows = [];

  if (remainingSurplus > 2 && surplus > 0) { // Small buffer
    // Distribute surplus across priority items
    let iterations = 0;
    while (remainingSurplus > 2 && iterations < 50) { // Safety break
      let addedAny = false;
      for (const item of SURPLUS_PRIORITY) {
        const price = PRICES[item.name] || 0;
        if (price > 0 && price <= remainingSurplus) {
          let row = surplusRows.find(r => r.name === item.name);
          if (!row) {
            row = { name: item.name, totalQty: 0, price: price, lineTotal: 0, reason: item.reason };
            surplusRows.push(row);
          }
          row.totalQty += 1;
          row.lineTotal += price;
          remainingSurplus -= price;
          addedAny = true;
          if (remainingSurplus < 2) break;
        }
      }
      if (!addedAny) break;
      iterations++;
    }
  }

  const surplusSubtotal = surplusRows.reduce((sum, r) => sum + r.lineTotal, 0);
  const grandTotal = grandTotalNoSurplus + surplusSubtotal;

  // 12. Render
  renderResults({
    productName: selectedProduct,
    totalStudents,
    budgetCap,
    totalDivisions,
    finalBaseSets,
    finalAdditionalSets,
    oneSetPrice,
    activeGrades,
    studentMap,
    divMap,
    baseRows,
    baseSubtotal,
    additionalRows,
    additionalSubtotal,
    surplusRows,
    surplusSubtotal,
    toolSets,
    toolRows,
    toolsSubtotal,
    grandTotal,
  });

  goToStep(4);
}

// ──────────────────────────────────────────────
// 11. RENDER RESULTS
// ──────────────────────────────────────────────
function fmt(n) {
  return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function renderResults(r) {
  // Product label
  $('results-product-name').textContent = r.productName;

  // Summary cards
  const setsDisplay = r.finalAdditionalSets > 0
    ? `${r.finalBaseSets} + ${r.finalAdditionalSets}`
    : `${r.finalBaseSets}`;

  $('summary-cards').innerHTML = `
    <div class="summary-card"><span class="sc-label">Total Students</span><span class="sc-value">${r.totalStudents}</span></div>
    <div class="summary-card"><span class="sc-label">Total Divisions</span><span class="sc-value">${r.totalDivisions}</span></div>
  `;

  // Division table
  const dtBody = $('division-table').querySelector('tbody');
  dtBody.innerHTML = r.activeGrades.map(g => `
    <tr><td>${g}</td><td>${r.studentMap[g]}</td><td>${r.divMap[g]}</td></tr>
  `).join('');

  // Base Component table
  const ctBody = $('component-table').querySelector('tbody');
  ctBody.innerHTML = r.baseRows.map(c => {
    const cls = c.price === 0 ? ' class="missing-price"' : '';
    return `<tr>
      <td>${c.name}</td>
      <td>${c.totalQty}</td>
      <td${cls}>${c.price === 0 ? '⚠ ₹0' : fmt(c.price)}</td>
      <td>${fmt(c.lineTotal)}</td>
    </tr>`;
  }).join('') + `<tr style="font-weight:700;background:var(--surface2)">
      <td colspan="3">Base Kits Subtotal (${r.finalBaseSets} sets)</td><td>${fmt(r.baseSubtotal)}</td>
    </tr>`;

  // Additional Component table
  const addSection = $('additional-component-section');
  if (r.finalAdditionalSets > 0) {
    addSection.style.display = 'block';
    const atBody = $('additional-component-table').querySelector('tbody');
    atBody.innerHTML = r.additionalRows.map(c => {
      const cls = c.price === 0 ? ' class="missing-price"' : '';
      return `<tr>
        <td>${c.name}</td>
        <td>${c.totalQty}</td>
        <td${cls}>${c.price === 0 ? '⚠ ₹0' : fmt(c.price)}</td>
        <td>${fmt(c.lineTotal)}</td>
      </tr>`;
    }).join('') + `<tr style="font-weight:700;background:var(--surface2)">
        <td colspan="3">Additional Kits Subtotal (${r.finalAdditionalSets} sets)</td><td>${fmt(r.additionalSubtotal)}</td>
      </tr>`;
  } else {
    addSection.style.display = 'none';
  }

  // Surplus / Spare Components table
  const surplusSection = $('surplus-component-section');
  if (r.surplusRows && r.surplusRows.length > 0) {
    surplusSection.style.display = 'block';
    const stBody = $('surplus-component-table').querySelector('tbody');
    stBody.innerHTML = r.surplusRows.map(c => {
      return `<tr>
        <td>${c.name}<br/><small style="color:var(--text-dim)">${c.reason}</small></td>
        <td>${c.totalQty}</td>
        <td>${fmt(c.price)}</td>
        <td>${fmt(c.lineTotal)}</td>
      </tr>`;
    }).join('') + `<tr style="font-weight:700;background:var(--surface2)">
        <td colspan="3">Surplus Allocation Subtotal</td><td>${fmt(r.surplusSubtotal)}</td>
      </tr>`;
  } else {
    surplusSection.style.display = 'none';
  }

  // Tools
  $('tool-note').textContent = `${r.toolSets} set(s) of common tools (total divisions ${r.totalDivisions})`;
  const ttBody = $('tools-table').querySelector('tbody');
  ttBody.innerHTML = r.toolRows.map(t => `
    <tr><td>${t.name}</td><td>${t.qty}</td><td>${fmt(t.price)}</td><td>${fmt(t.total)}</td></tr>
  `).join('') + `<tr style="font-weight:700;background:var(--surface2)">
      <td colspan="3">Tools Subtotal</td><td>${fmt(r.toolsSubtotal)}</td>
    </tr>`;

  // Grand total & Budget
  $('grand-total-value').textContent = fmt(r.grandTotal);
  $('budget-cap-value').textContent = fmt(r.budgetCap);

  const capInfo = $('budget-cap-info');
  if (r.grandTotal >= r.budgetCap * 0.95) {
    capInfo.classList.add('budget-warning');
  } else {
    capInfo.classList.remove('budget-warning');
  }
}

// ──────────────────────────────────────────────
// 12. STEP 4 BUTTONS
// ──────────────────────────────────────────────
$('btn-back-4').addEventListener('click', () => {
  selectedProduct = null;
  document.querySelectorAll('.product-card').forEach(c => c.classList.remove('selected'));
  goToStep(1);
});
$('btn-print').addEventListener('click', () => {
  document.body.classList.remove('print-inventory-only');
  window.print();
});
$('btn-print-inventory').addEventListener('click', () => {
  document.body.classList.add('print-inventory-only');
  window.print();
});
