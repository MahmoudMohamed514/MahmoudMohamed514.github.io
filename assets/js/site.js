/* SYNKRO main page script: language, navigation, reveal, the Odoo flow viewer,
   the scope builder and the inquiry form. No dependencies. */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var APPS = {"sales": {"ar": "المبيعات وCRM", "en": "Sales & CRM", "icon": "sales.png", "topic": {"ar": "مراحل البيع، وقوائم الأسعار، والخصومات ومسار الاعتماد", "en": "Sales stages, price lists, discounts and approvals"}}, "inventory": {"ar": "المخزون", "en": "Inventory", "icon": "inventory.png", "topic": {"ar": "المستودعات والمواقع، والتتبّع بالدفعات أو الأرقام التسلسلية", "en": "Warehouses, locations, lot and serial tracking"}}, "purchase": {"ar": "المشتريات", "en": "Purchase", "icon": "purchase.png", "topic": {"ar": "الموردون، ومسار اعتماد الشراء، وقواعد إعادة التوريد", "en": "Vendors, purchase approvals, replenishment rules"}}, "accounting": {"ar": "المحاسبة", "en": "Accounting", "icon": "accounting.png", "topic": {"ar": "دليل الحسابات، والضرائب، والفوترة الإلكترونية (ZATCA)، والتسويات البنكية", "en": "Chart of accounts, taxes, ZATCA e-invoicing, bank reconciliation"}}, "manufacturing": {"ar": "التصنيع", "en": "Manufacturing", "icon": "manufacturing.png", "topic": {"ar": "قوائم المواد، ومراحل الإنتاج، وحساب تكلفة المنتج", "en": "Bills of materials, production stages, product costing"}}, "pos": {"ar": "نقاط البيع", "en": "Point of Sale", "icon": "pos.png", "topic": {"ar": "الفروع والأجهزة، وطرق الدفع، وإقفال الجلسات", "en": "Stores and devices, payment methods, session closing"}}, "project": {"ar": "المشروعات", "en": "Project", "icon": "project.png", "topic": {"ar": "المراحل والمهام، وساعات العمل، وطريقة الفوترة", "en": "Stages and tasks, timesheets, billing method"}}, "services": {"ar": "الخدمات والصيانة", "en": "Services & Maintenance", "icon": "services.png", "topic": {"ar": "طلبات الصيانة والزيارات، وقطع الغيار، وجدولة الفنيين", "en": "Maintenance requests and visits, spare parts, technician scheduling"}}, "reporting": {"ar": "التقارير والتحليلات", "en": "Reporting & Analytics", "icon": "reporting.png", "topic": {"ar": "المؤشرات المطلوبة، ومصدر كل رقم، ودورية التحديث", "en": "The measures you need, where each number comes from, refresh cadence"}}};
  var APP_ORDER = Object.keys(APPS);

  // Connections Odoo makes between two apps (from -> to), shown in the scope builder.
  var LINKS = [
    { a: 'sales', b: 'inventory', ar: ['أمر البيع', 'أمر التسليم'], en: ['Sales order', 'Delivery order'] },
    { a: 'sales', b: 'accounting', ar: ['أمر البيع', 'فاتورة العميل'], en: ['Sales order', 'Customer invoice'] },
    { a: 'purchase', b: 'inventory', ar: ['أمر الشراء', 'الاستلام في المستودع'], en: ['Purchase order', 'Warehouse receipt'] },
    { a: 'inventory', b: 'purchase', ar: ['حدّ إعادة الطلب', 'طلب عرض سعر من المورّد'], en: ['Reorder minimum', 'Request for quotation'] },
    { a: 'purchase', b: 'accounting', ar: ['أمر الشراء', 'فاتورة المورّد'], en: ['Purchase order', 'Vendor bill'] },
    { a: 'inventory', b: 'accounting', ar: ['حركة المخزون', 'تقييم المخزون في الحسابات'], en: ['Stock moves', 'Inventory valuation'] },
    { a: 'sales', b: 'manufacturing', ar: ['أمر البيع', 'أمر تصنيع عند الطلب'], en: ['Sales order', 'Make-to-order production'] },
    { a: 'manufacturing', b: 'inventory', ar: ['أمر التصنيع', 'استهلاك المكوّنات وإضافة المنتج'], en: ['Manufacturing order', 'Components out, product in'] },
    { a: 'manufacturing', b: 'purchase', ar: ['نقص المكوّنات', 'أمر شراء'], en: ['Missing components', 'Purchase order'] },
    { a: 'manufacturing', b: 'accounting', ar: ['أمر التصنيع', 'تكلفة المنتج'], en: ['Manufacturing order', 'Product cost'] },
    { a: 'pos', b: 'inventory', ar: ['مبيعات الفرع', 'تحديث رصيد المخزون'], en: ['Store sales', 'Stock level update'] },
    { a: 'pos', b: 'accounting', ar: ['إقفال جلسة البيع', 'قيود اليومية'], en: ['Session closing', 'Journal entries'] },
    { a: 'sales', b: 'project', ar: ['أمر بيع لخدمة', 'مشروع ومهام'], en: ['Service sales order', 'Project and tasks'] },
    { a: 'project', b: 'accounting', ar: ['ساعات العمل المعتمدة', 'فاتورة العميل'], en: ['Approved timesheets', 'Customer invoice'] },
    { a: 'services', b: 'project', ar: ['طلب صيانة', 'مهمة لفريق الخدمة'], en: ['Maintenance request', 'Task for the service team'] },
    { a: 'services', b: 'inventory', ar: ['زيارة صيانة', 'قطع غيار من المخزون'], en: ['Service visit', 'Spare parts from stock'] },
    { a: 'services', b: 'accounting', ar: ['زيارة منجزة', 'فاتورة'], en: ['Completed visit', 'Invoice'] }
  ];

  var T = {
    menuOpen: { ar: 'فتح القائمة', en: 'Open menu' },
    menuClose: { ar: 'إغلاق القائمة', en: 'Close menu' },
    title: { ar: 'SYNKRO | تنفيذ Odoo ERP للشركات في السعودية', en: 'SYNKRO | Odoo ERP implementation in Saudi Arabia' },
    desc: { ar: 'SYNKRO تنفّذ Odoo ERP وتخصّصه وتدعمه للشركات في السعودية: المبيعات والمخزون والمشتريات والمحاسبة والتصنيع في نظام واحد مترابط.', en: 'SYNKRO implements, tailors and supports Odoo ERP for companies in Saudi Arabia: sales, inventory, purchasing, accounting and manufacturing in one connected system.' },
    oneMore: { ar: 'أضف تطبيقًا آخر لترى ما يترابط معه.', en: 'Add another app to see what connects to it.' },
    noLink: { ar: 'لا يوجد ربط مباشر شائع بين هذه التطبيقات؛ سنناقش طريقة ربطها في جلسة الاكتشاف.', en: 'There is no common direct link between these apps; we will work out how to connect them in discovery.' },
    reportingLink: { ar: ['بيانات التطبيقات المختارة', 'لوحات مؤشرات وتقارير'], en: ['Data from your selected apps', 'Dashboards and reports'] },
    noApps: { ar: 'لم تختر تطبيقات بعد.', en: 'No apps selected yet.' },
    chooseApps: { ar: 'اختر من القائمة', en: 'Choose from the list' },
    editApps: { ar: 'تعديل', en: 'Edit' },
    errRequired: { ar: 'هذا الحقل مطلوب.', en: 'This field is required.' },
    errEmail: { ar: 'اكتب بريدًا إلكترونيًا صحيحًا، مثل name@company.com.', en: 'Enter a valid email, like name@company.com.' },
    errService: { ar: 'اختر الخدمة الأقرب لاحتياجك.', en: 'Choose the service closest to your need.' },
    sentMail: { ar: 'فُتح تطبيق البريد برسالة جاهزة. أرسلها من هناك ليصلنا طلبك.', en: 'Your email app opened with a ready message. Send it from there and we will receive your inquiry.' },
    sentWa: { ar: 'فُتح واتساب برسالة جاهزة. أرسلها من هناك ليصلنا طلبك.', en: 'WhatsApp opened with a ready message. Send it from there and we will receive your inquiry.' },
    notConfigured: { ar: 'لم يُرسَل الطلب: قناة استقبال الطلبات غير مفعّلة في هذه النسخة من الموقع بعد. يمكنك نسخ نص الطلب.', en: 'Not sent: no receiving channel is set up on this version of the site yet. You can copy the inquiry text.' },
    copied: { ar: 'نُسخ نص الطلب.', en: 'Inquiry text copied.' },
    subject: { ar: 'طلب استشارة Odoo', en: 'Odoo consultation request' }
  };

  var lang = 'ar';
  try { lang = new URLSearchParams(location.search).get('lang') || localStorage.getItem('synkro-lang') || 'ar'; } catch (e) {}
  if (lang !== 'en') lang = 'ar';
  var tr = function (o) { return o[lang]; };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- Language ---------- */
  var langBtn = document.getElementById('langToggle');
  function setLanguage(next) {
    lang = next === 'en' ? 'en' : 'ar';
    try { localStorage.setItem('synkro-lang', lang); } catch (e) {}
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-ar]').forEach(function (el) { var v = el.getAttribute('data-' + lang); if (v !== null) el.textContent = v; });
    document.querySelectorAll('[data-ar-placeholder]').forEach(function (el) { el.placeholder = el.getAttribute('data-' + lang + '-placeholder'); });
    document.querySelectorAll('[data-ar-aria]').forEach(function (el) { el.setAttribute('aria-label', el.getAttribute('data-' + lang + '-aria')); });
    document.querySelectorAll('[data-ar-alt]').forEach(function (el) { el.alt = el.getAttribute('data-' + lang + '-alt'); });
    document.querySelectorAll('a[href^="details.html"]').forEach(function (a) {
      var href = a.getAttribute('href').replace(/([?&])lang=(ar|en)/, '').replace(/[?&]$/, '');
      a.setAttribute('href', href + (href.indexOf('?') > -1 ? '&' : '?') + 'lang=' + lang);
    });
    splitWords(document.getElementById('hero-title'));
    document.title = tr(T.title);
    var meta = document.querySelector('meta[name="description"]'); if (meta) meta.content = tr(T.desc);
    langBtn.textContent = lang === 'ar' ? 'English' : 'العربية';
    langBtn.lang = lang === 'ar' ? 'en' : 'ar';
    syncMenuLabel();
    renderScope();
    renderStatus();
  }

  // Hero headline words, wrapped so they can rise one after another (whole words only: Arabic letters must stay joined).
  function splitWords(el) {
    if (!el) return;
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(function (w, i) { return '<span class="w" style="--wi:' + i + '"><span>' + esc(w) + '</span></span>'; }).join(' ');
  }

  /* ---------- Navigation ---------- */
  var header = document.getElementById('siteHeader');
  var menuBtn = document.getElementById('menuToggle');
  var navLinks = document.getElementById('navLinks');
  function syncMenuLabel() {
    var open = navLinks.classList.contains('is-open');
    menuBtn.setAttribute('aria-label', tr(open ? T.menuClose : T.menuOpen));
    menuBtn.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
  }
  function setMenu(open) {
    navLinks.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    syncMenuLabel();
  }
  menuBtn.addEventListener('click', function () { setMenu(!navLinks.classList.contains('is-open')); });
  navLinks.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && navLinks.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); } });
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  if ('IntersectionObserver' in window) {
    var navMap = {};
    navLinks.querySelectorAll('a[href^="#"]').forEach(function (a) { navMap[a.getAttribute('href').slice(1)] = a; });
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var link = navMap[en.target.id]; if (!link) return;
        if (en.isIntersecting) { Object.keys(navMap).forEach(function (k) { navMap[k].removeAttribute('aria-current'); }); link.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(navMap).forEach(function (id) { var s = document.getElementById(id); if (s) navIO.observe(s); });
  }

  /* ---------- Smooth in-page jumps (only for clicks, so scripted scrolling stays instant) ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    var id = a.getAttribute('href').slice(1); var target = id && document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    if (history.pushState) history.pushState(null, '', '#' + id);
  });

  /* ---------- Hero chips light their app in the 3D orbit ---------- */
  document.querySelectorAll('.hero-apps a').forEach(function (a) {
    var id = (a.getAttribute('href').match(/item=([a-z]+)/) || [])[1];
    var on = function () { window.dispatchEvent(new CustomEvent('synkro:app-focus', { detail: { id: id } })); };
    var off = function () { window.dispatchEvent(new CustomEvent('synkro:app-focus', { detail: { id: null } })); };
    a.addEventListener('pointerenter', on); a.addEventListener('focus', on);
    a.addEventListener('pointerleave', off); a.addEventListener('blur', off);
  });

  /* ---------- Reveal: heading, then text, then media, staggered once ---------- */
  document.querySelectorAll('[data-reveal]').forEach(function (block) {
    Array.prototype.forEach.call(block.children, function (child, i) { child.style.setProperty('--i', i); });
  });
  document.querySelectorAll('.phase').forEach(function (p, i) {
    p.style.setProperty('--p', i);
    p.querySelectorAll('.phase-out li').forEach(function (li, k) { li.style.setProperty('--k', k); });
  });
  // A position sweep instead of per-element observers: anything at or above 92% of the
  // viewport is revealed, so jumping down the page never leaves content hidden above.
  var pending = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  var sweepQueued = false;
  function sweep() {
    sweepQueued = false;
    var limit = window.innerHeight * 0.92;
    pending = pending.filter(function (el) {
      if (reduced || el.getBoundingClientRect().top < limit) { el.classList.add('in'); return false; }
      return true;
    });
    if (!pending.length) { window.removeEventListener('scroll', queueSweep); window.removeEventListener('resize', queueSweep); }
  }
  function queueSweep() { if (!sweepQueued) { sweepQueued = true; requestAnimationFrame(sweep); } }
  window.addEventListener('scroll', queueSweep, { passive: true });
  window.addEventListener('resize', queueSweep, { passive: true });
  sweep();

  /* ---------- Flow viewer: the screen follows the step being read ---------- */
  var steps = Array.prototype.slice.call(document.querySelectorAll('.chain-step'));
  var views = document.querySelectorAll('.viewer-stack img');
  var caps = document.querySelectorAll('.viewer-cap [data-cap]');
  function activate(i) {
    steps.forEach(function (s, n) { s.classList.toggle('is-active', n === i); });
    views.forEach(function (v) { var n = Number(v.getAttribute('data-view')); v.classList.toggle('is-on', n === i); v.classList.toggle('is-past', n < i); });
    caps.forEach(function (c) { c.classList.toggle('is-on', Number(c.getAttribute('data-cap')) === i); });
  }
  if (steps.length) {
    activate(0);
    if ('IntersectionObserver' in window) {
      var stepIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) activate(Number(en.target.getAttribute('data-step'))); });
      }, { rootMargin: '-42% 0px -42% 0px' });
      steps.forEach(function (s) { stepIO.observe(s); });
    }
  }

  var viewer = document.querySelector('.chain-viewer'), frame = document.querySelector('.viewer-frame');
  if (viewer && frame && !reduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    viewer.addEventListener('pointermove', function (e) {
      var r = viewer.getBoundingClientRect();
      frame.style.setProperty('--ry', (((e.clientX - r.left) / r.width - 0.5) * 9).toFixed(2) + 'deg');
      frame.style.setProperty('--rx', ((0.5 - (e.clientY - r.top) / r.height) * 7).toFixed(2) + 'deg');
    });
    viewer.addEventListener('pointerleave', function () { frame.style.setProperty('--rx', '0deg'); frame.style.setProperty('--ry', '0deg'); });
  }

  /* ---------- Scope builder ---------- */
  var boxes = Array.prototype.slice.call(document.querySelectorAll('.picks input[name="apps"]'));
  var elEmpty = document.querySelector('[data-scope-empty]');
  var elFilled = document.querySelector('[data-scope-filled]');
  var elCount = document.querySelector('[data-scope-count]');
  var elLinks = document.querySelector('[data-scope-links]');
  var elTopics = document.querySelector('[data-scope-topics]');
  var elSummary = document.querySelector('[data-apps-summary]');
  var ARROW = '<svg class="icon icon-fwd" aria-hidden="true"><use href="#i-fwd"/></svg>';
  function selected() { return boxes.filter(function (b) { return b.checked; }).map(function (b) { return b.value; }); }
  function countText(n) {
    if (lang === 'en') return n === 1 ? '1 app selected.' : n + ' apps selected.';
    if (n === 1) return 'اخترت تطبيقًا واحدًا.';
    if (n === 2) return 'اخترت تطبيقين.';
    return 'اخترت ' + n + ' تطبيقات.';
  }
  // The graph: nine apps on a ring around the SYNKRO mark; links between picked apps draw themselves.
  var graphHost = document.querySelector('[data-scope-graph]'), graph = null, edgeLayer = null, drawn = {};
  var GX = 170, GY = 118, GR = 92, POS = {};
  if (graphHost) {
    APP_ORDER.forEach(function (id, i) { var a = -Math.PI / 2 + i * 2 * Math.PI / APP_ORDER.length; POS[id] = [GX + Math.cos(a) * GR, GY + Math.sin(a) * GR]; });
    var svg = '<svg viewBox="0 0 340 236" xmlns="http://www.w3.org/2000/svg"><g class="edges"></g>' +
      '<image class="hub" href="assets/img/synkro-mark.svg" x="' + (GX - 12) + '" y="' + (GY - 23) + '" width="24" height="46"/>' +
      APP_ORDER.map(function (id) { var p = POS[id]; return '<g class="node" data-node="' + id + '" transform="translate(' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ')"><g class="node-in"><circle r="22"/><image href="odoo-modules/' + APPS[id].icon + '" x="-14" y="-14" width="28" height="28"/></g></g>'; }).join('') + '</svg>';
    graphHost.innerHTML = svg; graph = graphHost.firstChild; edgeLayer = graph.querySelector('.edges');
  }
  function curve(a, b) { var p = POS[a], q = POS[b]; var mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2; var cx = mx + (GX - mx) * 0.55, cy = my + (GY - my) * 0.55; return 'M' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ' Q' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ' ' + q[0].toFixed(1) + ' ' + q[1].toFixed(1); }
  function renderGraph(sel) {
    if (!graph) return;
    graph.querySelectorAll('.node').forEach(function (n) { n.classList.toggle('is-on', sel.indexOf(n.getAttribute('data-node')) > -1); });
    var want = {};
    LINKS.forEach(function (l) { if (sel.indexOf(l.a) > -1 && sel.indexOf(l.b) > -1) want[l.a + '>' + l.b] = curve(l.a, l.b); });
    if (sel.indexOf('reporting') > -1) sel.forEach(function (id) { if (id !== 'reporting') want[id + '>reporting'] = curve(id, 'reporting'); });
    Object.keys(drawn).forEach(function (k) { if (!want[k]) { edgeLayer.removeChild(drawn[k]); delete drawn[k]; } });
    Object.keys(want).forEach(function (k) {
      if (drawn[k]) return;
      var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.innerHTML = '<path class="edge" pathLength="1" d="' + want[k] + '"/>' + (reduced ? '' : '<circle class="flow-dot" r="3"><animateMotion dur="2.6s" begin="0.9s" repeatCount="indefinite" path="' + want[k] + '"/></circle>');
      edgeLayer.appendChild(g); drawn[k] = g;
    });
    graph.parentNode.classList.toggle('has-links', Object.keys(want).length > 0);
  }
  function renderScope() {
    if (!boxes.length) return;
    var sel = selected();
    renderGraph(sel);
    boxes.forEach(function (b) { b.closest('.pick').classList.toggle('is-checked', b.checked); });
    elEmpty.hidden = sel.length > 0;
    elFilled.hidden = sel.length === 0;
    if (sel.length) {
      elCount.textContent = countText(sel.length);
      var rows = LINKS.filter(function (l) { return sel.indexOf(l.a) > -1 && sel.indexOf(l.b) > -1; }).map(function (l) { return l[lang]; });
      if (sel.indexOf('reporting') > -1 && sel.length > 1) rows.push(T.reportingLink[lang]);
      var html;
      if (sel.length === 1) html = '<li>' + esc(tr(T.oneMore)) + '</li>';
      else if (!rows.length) html = '<li>' + esc(tr(T.noLink)) + '</li>';
      else html = rows.map(function (r) { return '<li><span>' + esc(r[0]) + '</span>' + ARROW + '<span>' + esc(r[1]) + '</span></li>'; }).join('');
      elLinks.innerHTML = html;
      elTopics.innerHTML = sel.map(function (id) { var a = APPS[id]; return '<li><b>' + esc(a[lang]) + ':</b> ' + esc(a.topic[lang]) + '</li>'; }).join('');
    }
    if (elSummary) {
      elSummary.innerHTML = sel.length
        ? sel.map(function (id) { var a = APPS[id]; return '<span class="chip"><img src="odoo-modules/' + a.icon + '" width="22" height="22" alt="">' + esc(a[lang]) + '</span>'; }).join('') + ' <a class="text-link" href="#scope">' + esc(tr(T.editApps)) + '</a>'
        : '<span>' + esc(tr(T.noApps)) + '</span> <a class="text-link" href="#scope">' + esc(tr(T.chooseApps)) + '</a>';
    }
  }
  boxes.forEach(function (b) { b.addEventListener('change', renderScope); });
  document.querySelectorAll('[data-preset]').forEach(function (link) {
    link.addEventListener('click', function () {
      var ids = link.getAttribute('data-preset').split(',');
      boxes.forEach(function (b) { b.checked = ids.indexOf(b.value) > -1; });
      renderScope();
    });
  });
  var scopeCta = document.querySelector('[data-scope-cta]');
  if (scopeCta) scopeCta.addEventListener('click', function () {
    setTimeout(function () { var n = document.getElementById('name'); if (n) n.focus({ preventScroll: true }); }, reduced ? 0 : 600);
  });

  /* ---------- Inquiry form ---------- */
  var form = document.getElementById('leadForm');
  var statusBox = document.getElementById('formStatus');
  var statusText = statusBox.querySelector('[data-status-text]');
  var copyBtn = statusBox.querySelector('[data-copy-inquiry]');
  var statusKey = null, inquiryText = '';
  function renderStatus() {
    if (!statusKey) { statusBox.hidden = true; return; }
    statusBox.hidden = false;
    statusText.textContent = tr(T[statusKey]);
    statusBox.setAttribute('data-tone', statusKey === 'notConfigured' ? 'warn' : 'ok');
    copyBtn.hidden = statusKey !== 'notConfigured' && statusKey !== 'copied';
  }
  function setError(id, msgKey) {
    var input = document.getElementById(id), err = form.querySelector('[data-error-for="' + id + '"]');
    if (!input || !err) return;
    if (msgKey) { input.setAttribute('aria-invalid', 'true'); err.textContent = tr(T[msgKey]); err.hidden = false; }
    else { input.removeAttribute('aria-invalid'); err.hidden = true; err.textContent = ''; }
  }
  function validate() {
    var bad = [];
    var name = form.elements.name.value.trim(), email = form.elements.email.value.trim(), service = form.elements.service.value;
    setError('name', name ? null : 'errRequired'); if (!name) bad.push('name');
    var okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    setError('email', email ? (okEmail ? null : 'errEmail') : 'errRequired'); if (!okEmail) bad.push('email');
    setError('service', service ? null : 'errService'); if (!service) bad.push('service');
    return bad;
  }
  ['name', 'email', 'service'].forEach(function (id) {
    var el = document.getElementById(id);
    el.addEventListener(id === 'service' ? 'change' : 'blur', function () { if (el.getAttribute('aria-invalid') === 'true' || el.value) validate(); });
  });
  function optionText(select) { var o = select.options[select.selectedIndex]; return o ? o.textContent : ''; }
  function buildInquiry() {
    var f = form.elements, ar = lang === 'ar';
    var apps = selected().map(function (id) { return APPS[id][lang]; }).join(ar ? '، ' : ', ');
    return [
      (ar ? 'الاسم: ' : 'Name: ') + f.name.value.trim(),
      (ar ? 'الشركة: ' : 'Company: ') + (f.company.value.trim() || '-'),
      (ar ? 'البريد: ' : 'Email: ') + f.email.value.trim(),
      (ar ? 'الجوال: ' : 'Phone: ') + (f.phone.value.trim() || '-'),
      (ar ? 'الخدمة: ' : 'Service: ') + optionText(f.service),
      (ar ? 'التطبيقات: ' : 'Apps: ') + (apps || '-'),
      (ar ? 'طريقة التواصل المفضلة: ' : 'Preferred contact: ') + optionText(f.contactMethod),
      (ar ? 'تفاصيل: ' : 'Details: ') + (f.message.value.trim() || '-')
    ].join('\n');
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = validate();
    if (bad.length) { document.getElementById(bad[0]).focus(); return; }
    inquiryText = buildInquiry();
    var cfg = window.SYNKRO_CONFIG || {};
    var email = String(cfg.leadsEmail || '').trim();
    var wa = String(cfg.whatsapp || '').replace(/\D/g, '');
    var wantsWa = form.elements.contactMethod.value === 'whatsapp';
    var subject = tr(T.subject) + ' | ' + (form.elements.company.value.trim() || form.elements.name.value.trim());
    if (wa && (wantsWa || !email)) {
      window.open('https://wa.me/' + wa + '?text=' + encodeURIComponent(subject + '\n\n' + inquiryText), '_blank', 'noopener');
      statusKey = 'sentWa';
    } else if (email) {
      window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(inquiryText);
      statusKey = 'sentMail';
    } else {
      statusKey = 'notConfigured';
      if (window.console) console.info('[SYNKRO] Set window.SYNKRO_CONFIG.leadsEmail or .whatsapp in the page <head> to receive inquiries.');
    }
    renderStatus();
  });
  copyBtn.addEventListener('click', function () {
    var done = function () { statusKey = 'copied'; renderStatus(); };
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(inquiryText).then(done, fallback); } else { fallback(); }
    function fallback() {
      var ta = document.createElement('textarea'); ta.value = inquiryText; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (err) {} document.body.removeChild(ta); done();
    }
  });

  langBtn.addEventListener('click', function () { setLanguage(lang === 'ar' ? 'en' : 'ar'); });
  setLanguage(lang);
  window.__synkroReady = true;
})();
