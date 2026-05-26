// ======= CURSOR =======
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx - 6 + 'px'; cursor.style.top = my - 6 + 'px'; });
function animRing() { rx += (mx - rx - 18) * 0.15; ry += (my - ry - 18) * 0.15; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing); }
animRing();
document.querySelectorAll('a,button,.module-card,.skill-pill').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2)'; ring.style.transform = 'scale(1.5)'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; ring.style.transform = 'scale(1)'; });
});

// ======= NAV =======
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 20);
});
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// ======= PAGE NAVIGATION =======
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navEl = document.getElementById('nav-' + id);
  if (navEl) navEl.classList.add('active');
  window.scrollTo(0, 0);
  document.getElementById('navLinks').classList.remove('open');
  // Trigger skill bars if on home
  if (id === 'home') animateCounters();
}

// ======= TABS =======
function switchTab(btn, panelId) {
  const tabNav = btn.parentElement;
  const contentArea = tabNav.nextElementSibling;
  tabNav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  contentArea.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.add('active');
}

// ======= COUNTERS =======
function animateCounters() {
  const targets = [5, 12, 8, 6];
  const ids = ['count1','count2','count3','count4'];
  const firstEl = document.getElementById(ids[0]);
  if (!firstEl) return;
  ids.forEach((id, i) => {
    let n = 0;
    const el = document.getElementById(id);
    if (!el) return;
    const interval = setInterval(() => {
      n++;
      el.textContent = n;
      if (n >= targets[i]) clearInterval(interval);
    }, 60);
  });
}
animateCounters();

// ======= SCROLL TO MODULES =======
function scrollToModules() {
  const elem = document.getElementById('modulesAnchor');
  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
}

// ======= ACCORDION =======
function toggleAccordion(header) {
  const body = header.nextElementSibling;
  const icon = header.querySelector('i');
  const isOpen = body.style.display === 'block';
  // Close all
  document.querySelectorAll('.accordion-body').forEach(b => b.style.display = 'none');
  document.querySelectorAll('.accordion-header i').forEach(i => i.style.transform = '');
  if (!isOpen) {
    body.style.display = 'block';
    icon.style.transform = 'rotate(180deg)';
  }
}

// ======= COPY CODE =======
function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre');
  navigator.clipboard.writeText(pre.innerText).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy', 2000);
  });
}

// ======= CSS FLEX DEMO =======
function setFlex(val) {
  document.getElementById('flexDemo').style.justifyContent = val;
  document.getElementById('flexLabel').textContent = val;
}

// ======= CSS COLOR DEMO =======
function updateColor() {
  const r = document.getElementById('rSlider').value;
  const g = document.getElementById('gSlider').value;
  const b = document.getElementById('bSlider').value;
  document.getElementById('rVal').textContent = r;
  document.getElementById('gVal').textContent = g;
  document.getElementById('bVal').textContent = b;
  const preview = document.getElementById('colorPreview');
  const bg = `rgb(${r},${g},${b})`;
  preview.style.background = bg;
  preview.textContent = bg;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  preview.style.color = brightness > 128 ? '#111' : '#fff';
}

// ======= DOM DEMO =======
const domOrigText = 'Click a button to change me!';
function domChange(type, val) {
  const el = document.getElementById('domTarget');
  if (!el) return;
  if (type === 'color') el.style.color = val;
  else if (type === 'text') el.textContent = val;
  else if (type === 'size') el.style.fontSize = val;
  else if (type === 'reset') { el.style.color = ''; el.textContent = domOrigText; el.style.fontSize = ''; }
}

// ======= CALCULATOR =======
let calcCurrent = '', calcPrev = '', calcOp = null, calcNewNum = false;

function calcDisplay() {
  const display = document.getElementById('calcDisplay');
  if (!display) return;
  if (calcPrev && calcOp && calcCurrent) {
    display.textContent = `${calcPrev} ${calcOp} ${calcCurrent}`;
  } else if (calcCurrent) {
    display.textContent = calcCurrent;
  } else if (calcPrev) {
    display.textContent = calcPrev;
  } else {
    display.textContent = '0';
  }
}
function calcNum(n) {
  if (calcNewNum) { calcCurrent = ''; calcNewNum = false; }
  if (calcCurrent.length >= 12) return;
  calcCurrent = calcCurrent === '0' ? n : calcCurrent + n;
  calcDisplay();
}
function calcDot() {
  if (calcNewNum) { calcCurrent = '0'; calcNewNum = false; }
  if (!calcCurrent.includes('.')) calcCurrent += '.';
  calcDisplay();
}
function calcOper(op) {
  if (calcCurrent === '' && calcPrev === '') return;
  if (calcCurrent !== '' && calcPrev !== '') calcEquals();
  calcPrev = calcCurrent || calcPrev;
  calcOp = op;
  calcNewNum = true;
  calcDisplay();
}
function calcEquals() {
  if (calcOp === null || calcPrev === '' || calcCurrent === '') return;
  const a = parseFloat(calcPrev), b = parseFloat(calcCurrent);
  let result;
  if (calcOp === '+') result = a + b;
  else if (calcOp === '−') result = a - b;
  else if (calcOp === '×') result = a * b;
  else if (calcOp === '÷') result = b !== 0 ? a / b : 'Error';
  calcCurrent = String(parseFloat(result?.toFixed(10)));
  calcPrev = '';
  calcOp = null;
  calcNewNum = true;
  calcDisplay();
}
function calcClear() { calcCurrent = ''; calcPrev = ''; calcOp = null; calcNewNum = false; calcDisplay(); }
function calcToggleSign() { if (calcCurrent) { calcCurrent = calcCurrent.startsWith('-') ? calcCurrent.slice(1) : '-' + calcCurrent; calcDisplay(); } }
function calcPercent() { if (calcCurrent) { calcCurrent = String(parseFloat(calcCurrent) / 100); calcDisplay(); } }

// ======= TODO =======
let todos = [];
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todoCount');

// Pre-populate
['Learn HTML5 semantics', 'Style with CSS Flexbox', 'Build a JS calculator'].forEach(t => {
  todos.push({ id: Date.now() + Math.random(), text: t, done: false });
});
if (todoList) renderTodos();

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;
  todos.push({ id: Date.now(), text, done: false });
  todoInput.value = '';
  renderTodos();
}
function toggleTodo(id) {
  todos = todos.map(t => t.id === id ? {...t, done: !t.done} : t);
  renderTodos();
}
function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  renderTodos();
}
function clearDone() {
  todos = todos.filter(t => !t.done);
  renderTodos();
}
function renderTodos() {
  if (!todoList) return;
  todoList.innerHTML = todos.map(t => `
    <li class="todo-item ${t.done ? 'done' : ''}">
      <div class="todo-check ${t.done ? 'checked' : ''}" onclick="toggleTodo(${t.id})">
        ${t.done ? '✓' : ''}
      </div>
      <span>${t.text}</span>
      <span class="todo-del" onclick="deleteTodo(${t.id})">✕</span>
    </li>
  `).join('');
  const remaining = todos.filter(t => !t.done).length;
  if (todoCount) todoCount.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} remaining`;
}
