// ═══════════════════════════════════════════════════════════════
// Shortlist Generator v2 — mock data + app logic
// Standalone prototype. All data below is fabricated demo data.
// ═══════════════════════════════════════════════════════════════

const COHORT_ORDER = ['exact', 'related', 'similar', 'similarRelaxed', 'partial', 'partialRelaxed'];
const COHORT_LABEL = {
  exact: 'Exact',
  related: 'Related',
  similar: 'Similar',
  similarRelaxed: 'Similar (Relaxed)',
  partial: 'Partial Match',
  partialRelaxed: 'Partial Match (Relaxed)',
};
const COHORT_STRENGTH = { exact: 6, related: 5, similar: 4, similarRelaxed: 3, partial: 2, partialRelaxed: 1 };

// ── Students ──────────────────────────────────────────────────
const STUDENTS = {
  priya: {
    id: 'priya',
    name: 'Priya Sharma',
    initials: 'PS',
    courseRequirement: 'MSc Business Analytics',
    country: ['Canada', 'UK', 'Australia'],
    intake: 'Sep 2026',
    duration: '12–24 months',
    workExpMonths: 14,
    careerPreference: 'Business Analyst',
    hasCareerPreference: true,
    flexibleDefaults: { intake: 'Sep 2026', maxTuition: 30000, backlogs: 1, workExp: 14, grade: 72 },
    courseTypePills: [{ label: 'MSc Business Analytics', count: 9 }, { label: 'MSc Management Analytics', count: 3 }],
    cim: {
      id: 'cim-priya', name: 'MSc Financial Analytics', university: 'London School of Economics', country: 'UK',
      qsRank: 45, durationMonths: 12, tuitionFeeUSD: 34500, scholarshipCount: 2, safety: 'Moderate',
      intakeStatus: 'Closing soon', partnered: true,
    },
  },
  arjun: {
    id: 'arjun',
    name: 'Arjun Mehta',
    initials: 'AM',
    courseRequirement: 'MSc Computer Science',
    country: ['Canada', 'UK', 'USA', 'Germany'],
    intake: 'Jan 2027',
    duration: '18–24 months',
    workExpMonths: 0,
    careerPreference: null,
    hasCareerPreference: false,
    flexibleDefaults: { intake: 'Jan 2027', maxTuition: 24000, backlogs: 0, workExp: 0, grade: 68 },
    courseTypePills: [{ label: 'MSc Computer Science', count: 8 }],
    cim: {
      id: 'cim-arjun', name: 'MSc Artificial Intelligence', university: 'Carnegie Mellon University', country: 'USA',
      qsRank: 22, durationMonths: 24, tuitionFeeUSD: 41000, scholarshipCount: 0, safety: 'Moderate',
      intakeStatus: 'Open', partnered: false,
    },
  },
  sana: {
    id: 'sana',
    name: 'Sana Iyer',
    initials: 'SI',
    courseRequirement: 'MSc Robotics Engineering',
    country: ['Switzerland', 'Germany', 'UK', 'Sweden'],
    intake: 'Sep 2026',
    duration: '18–24 months',
    workExpMonths: 8,
    careerPreference: 'UX Designer',
    hasCareerPreference: true,
    flexibleDefaults: { intake: 'Sep 2026', maxTuition: 28000, backlogs: 2, workExp: 8, grade: 65 },
    courseTypePills: [{ label: 'MSc Robotics Engineering', count: 6 }],
    cim: {
      id: 'cim-sana', name: 'MSc Robotics & AI', university: 'Carnegie Mellon University', country: 'USA',
      qsRank: 22, durationMonths: 24, tuitionFeeUSD: 43500, scholarshipCount: 1, safety: 'Ambitious',
      intakeStatus: 'Waitlist', partnered: false,
    },
  },
  karan: {
    id: 'karan',
    name: 'Karan Verma',
    initials: 'KV',
    courseRequirement: 'MSc Quantum Computing',
    country: ['Japan'],
    intake: 'May 2027',
    duration: '24 months',
    workExpMonths: 3,
    careerPreference: null,
    hasCareerPreference: false,
    flexibleDefaults: { intake: 'May 2027', maxTuition: 25000, backlogs: 0, workExp: 3, grade: 60 },
    courseTypePills: [{ label: 'MSc Quantum Computing', count: 0 }],
    cim: {
      id: 'cim-karan', name: 'MSc Data Science', university: 'Stanford University', country: 'USA',
      qsRank: 3, durationMonths: 18, tuitionFeeUSD: 58000, scholarshipCount: 0, safety: 'Ambitious',
      intakeStatus: 'Waitlist', partnered: false,
    },
  },
};

// ── Courses (mock pool, tagged per student) ──────────────────
// cohortByCourse / cohortByCareer: cohort tag string or null (not in that source's pool)
const COURSES = {
  priya: [
    { id:'p1', intakeTerm:'Sep 2026', name:'MSc Business Analytics', university:'University of Toronto', country:'Canada', qsRank:21, durationMonths:12, tuitionFeeUSD:29800, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:65, scholarshipCount:3, safety:'Safe', partnered:true, intakeStatus:'Open', cohortByCourse:'exact', cohortByCareer:'exact' },
    { id:'p2', intakeTerm:'Jan 2027', name:'MSc Business Analytics', university:'Warwick Business School', country:'UK', qsRank:64, durationMonths:12, tuitionFeeUSD:33200, backlogsAllowed:0, minWorkExpMonths:0, minGradePercent:70, scholarshipCount:1, safety:'Moderate', partnered:true, intakeStatus:'Open', cohortByCourse:'exact', cohortByCareer:'related' },
    { id:'p3', intakeTerm:'Sep 2026', name:'MSc Management Analytics', university:'HEC Montreal', country:'Canada', qsRank:88, durationMonths:16, tuitionFeeUSD:26500, backlogsAllowed:2, minWorkExpMonths:6, minGradePercent:60, scholarshipCount:0, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'related', cohortByCareer:'exact' },
    { id:'p4', intakeTerm:'Sep 2026', name:'MSc Business Analytics', university:'Monash University', country:'Australia', qsRank:42, durationMonths:24, tuitionFeeUSD:31000, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:65, scholarshipCount:0, safety:'Moderate', partnered:false, intakeStatus:'Closing soon', cohortByCourse:'similar', cohortByCareer:null },
    { id:'p5', intakeTerm:'Jan 2027', name:'MSc Data Analytics', university:'University of Melbourne', country:'Australia', qsRank:37, durationMonths:18, tuitionFeeUSD:32500, backlogsAllowed:0, minWorkExpMonths:12, minGradePercent:68, scholarshipCount:2, safety:'Ambitious', partnered:true, intakeStatus:'Open', cohortByCourse:null, cohortByCareer:'exact' },
    { id:'p6', intakeTerm:'Sep 2026', name:'MSc Business Analytics (Extended)', university:'Trinity College Dublin', country:'Ireland', qsRank:98, durationMonths:14, tuitionFeeUSD:24800, backlogsAllowed:3, minWorkExpMonths:0, minGradePercent:55, scholarshipCount:1, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'similarRelaxed', cohortByCareer:null },
    { id:'p7', intakeTerm:'Sep 2026', name:'MSc Business Intelligence', university:'Imperial College London', country:'UK', qsRank:8, durationMonths:12, tuitionFeeUSD:38000, backlogsAllowed:0, minWorkExpMonths:18, minGradePercent:75, scholarshipCount:0, safety:'Ambitious', partnered:false, intakeStatus:'Waitlist', cohortByCourse:null, cohortByCareer:'related' },
    { id:'p8', intakeTerm:'Sep 2026', name:'MSc Business Analytics', university:'University of Sydney', country:'Australia', qsRank:19, durationMonths:24, tuitionFeeUSD:33800, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:65, scholarshipCount:1, safety:'Moderate', partnered:true, intakeStatus:'Open', cohortByCourse:'partial', cohortByCareer:null },
    { id:'p9', intakeTerm:'Sep 2026', name:'Master of Business Analytics', university:'University of British Columbia', country:'Canada', qsRank:34, durationMonths:12, tuitionFeeUSD:30500, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:68, scholarshipCount:2, safety:'Safe', partnered:true, intakeStatus:'Open', cohortByCourse:'exact', cohortByCareer:'similar' },
    { id:'p10', intakeTerm:'Jan 2027', name:'MSc Data Science for Business', university:'ESSEC Business School', country:'France', qsRank:76, durationMonths:16, tuitionFeeUSD:27900, backlogsAllowed:2, minWorkExpMonths:6, minGradePercent:60, scholarshipCount:0, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:null, cohortByCareer:'similarRelaxed' },
    { id:'p11', intakeTerm:'Sep 2026', name:'MSc Business Analytics', university:'York University', country:'Canada', qsRank:210, durationMonths:12, tuitionFeeUSD:22500, backlogsAllowed:3, minWorkExpMonths:0, minGradePercent:55, scholarshipCount:1, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'partialRelaxed', cohortByCareer:null },
    { id:'p12', intakeTerm:'Sep 2026', name:'MSc Analytics & Management', university:'Cambridge Judge Business School', country:'UK', qsRank:5, durationMonths:12, tuitionFeeUSD:42000, backlogsAllowed:0, minWorkExpMonths:24, minGradePercent:80, scholarshipCount:0, safety:'Ambitious', partnered:false, intakeStatus:'Waitlist', cohortByCourse:'related', cohortByCareer:'related' },
  ],
  arjun: [
    { id:'a1', intakeTerm:'Jan 2027', name:'MSc Computer Science', university:'University of Toronto', country:'Canada', qsRank:21, durationMonths:20, tuitionFeeUSD:28500, backlogsAllowed:0, minWorkExpMonths:0, minGradePercent:70, scholarshipCount:2, safety:'Moderate', partnered:true, intakeStatus:'Open', cohortByCourse:'exact', cohortByCareer:null },
    { id:'a2', intakeTerm:'Jan 2027', name:'MSc Computer Science', university:'University of Manchester', country:'UK', qsRank:34, durationMonths:12, tuitionFeeUSD:26800, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:65, scholarshipCount:1, safety:'Safe', partnered:true, intakeStatus:'Open', cohortByCourse:'exact', cohortByCareer:null },
    { id:'a3', intakeTerm:'Sep 2026', name:'MSc Computer Science', university:'Arizona State University', country:'USA', qsRank:213, durationMonths:18, tuitionFeeUSD:24000, backlogsAllowed:2, minWorkExpMonths:0, minGradePercent:55, scholarshipCount:0, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'related', cohortByCareer:null },
    { id:'a4', intakeTerm:'Jan 2027', name:'MSc Computer Science (AI Specialization)', university:'University of Edinburgh', country:'UK', qsRank:22, durationMonths:12, tuitionFeeUSD:33500, backlogsAllowed:0, minWorkExpMonths:0, minGradePercent:72, scholarshipCount:1, safety:'Ambitious', partnered:false, intakeStatus:'Closing soon', cohortByCourse:'related', cohortByCareer:null },
    { id:'a5', intakeTerm:'Jan 2027', name:'MSc Software Engineering', university:'University of Waterloo', country:'Canada', qsRank:112, durationMonths:16, tuitionFeeUSD:27200, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:65, scholarshipCount:0, safety:'Safe', partnered:true, intakeStatus:'Open', cohortByCourse:'similar', cohortByCareer:null },
    { id:'a6', intakeTerm:'Jan 2027', name:'MSc Computer Science', university:'Dublin City University', country:'Ireland', qsRank:401, durationMonths:12, tuitionFeeUSD:19500, backlogsAllowed:3, minWorkExpMonths:0, minGradePercent:55, scholarshipCount:1, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'similarRelaxed', cohortByCareer:null },
    { id:'a7', intakeTerm:'Sep 2026', name:'MSc Computer Science', university:'RWTH Aachen', country:'Germany', qsRank:106, durationMonths:24, tuitionFeeUSD:9500, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:70, scholarshipCount:0, safety:'Moderate', partnered:false, intakeStatus:'Open', cohortByCourse:'partial', cohortByCareer:null },
    { id:'a8', intakeTerm:'Jan 2027', name:'MSc Information Technology', university:'University of Sydney', country:'Australia', qsRank:19, durationMonths:24, tuitionFeeUSD:31500, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:62, scholarshipCount:1, safety:'Moderate', partnered:true, intakeStatus:'Open', cohortByCourse:'partialRelaxed', cohortByCareer:null },
  ],
  sana: [
    { id:'s1', intakeTerm:'Sep 2026', name:'MSc Robotics Engineering', university:'ETH Zurich', country:'Switzerland', qsRank:7, durationMonths:24, tuitionFeeUSD:15800, backlogsAllowed:0, minWorkExpMonths:0, minGradePercent:78, scholarshipCount:1, safety:'Ambitious', partnered:false, intakeStatus:'Open', cohortByCourse:'exact', cohortByCareer:null },
    { id:'s2', intakeTerm:'Sep 2026', name:'MSc Robotics', university:'Technical University of Munich', country:'Germany', qsRank:37, durationMonths:24, tuitionFeeUSD:8500, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:68, scholarshipCount:0, safety:'Moderate', partnered:false, intakeStatus:'Open', cohortByCourse:'exact', cohortByCareer:null },
    { id:'s3', intakeTerm:'Jan 2027', name:'MSc Robotics and Autonomous Systems', university:'Imperial College London', country:'UK', qsRank:8, durationMonths:12, tuitionFeeUSD:39500, backlogsAllowed:0, minWorkExpMonths:6, minGradePercent:75, scholarshipCount:0, safety:'Ambitious', partnered:false, intakeStatus:'Waitlist', cohortByCourse:'related', cohortByCareer:null },
    { id:'s4', intakeTerm:'Sep 2026', name:'MSc Mechatronics and Robotics', university:'KTH Royal Institute of Technology', country:'Sweden', qsRank:98, durationMonths:24, tuitionFeeUSD:0, backlogsAllowed:2, minWorkExpMonths:0, minGradePercent:60, scholarshipCount:0, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'similar', cohortByCareer:null },
    { id:'s5', intakeTerm:'Sep 2026', name:'MSc Robotics Engineering', university:'University of Melbourne', country:'Australia', qsRank:37, durationMonths:18, tuitionFeeUSD:34500, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:65, scholarshipCount:1, safety:'Moderate', partnered:true, intakeStatus:'Open', cohortByCourse:'similarRelaxed', cohortByCareer:null },
    { id:'s6', intakeTerm:'Sep 2026', name:'MSc Robotics', university:'Georgia Institute of Technology', country:'USA', qsRank:47, durationMonths:20, tuitionFeeUSD:36000, backlogsAllowed:0, minWorkExpMonths:12, minGradePercent:72, scholarshipCount:0, safety:'Ambitious', partnered:false, intakeStatus:'Open', cohortByCourse:'partial', cohortByCareer:null },
  ],
  // No matching courses at all — course requirement, career preference, and Both are all blank for this student.
  karan: [],
};

// ── App state ─────────────────────────────────────────────────
const state = {
  studentId: 'priya',
  source: 'career',          // 'course' | 'career' | 'both'
  sourceIsManual: false,
  flexibleMode: 'availability', // 'availability' | 'asked'
  flexible: { ...STUDENTS.priya.flexibleDefaults },       // applied — drives filtering
  pendingFlexible: { ...STUDENTS.priya.flexibleDefaults }, // draft — bound to the inputs, committed on Apply
  cohortTab: 'all',
  countryFilter: null,
  categoryFilter: 'all',
  collegeSearch: '',
  courseSearch: '',
  partneredOnly: false,
  scholarshipOnly: false,
  shortlist: new Set(),
  cimRemoved: {},             // studentId -> bool
};

function currentStudent() { return STUDENTS[state.studentId]; }
function currentCourses() { return COURSES[state.studentId]; }

function computeDefaultSource(student) {
  if (!student.hasCareerPreference) return { source: 'course', reason: `No career preference on file for ${student.name} — defaulted to Course requirement.` };
  if (student.workExpMonths > 0) return { source: 'career', reason: `Defaulted to Career preference — student has ${student.workExpMonths} months work experience on file.` };
  return { source: 'course', reason: `Defaulted to Course requirement — student is a fresher with no work experience on file.` };
}

function switchStudent(id) {
  state.studentId = id;
  const student = STUDENTS[id];
  const def = computeDefaultSource(student);
  state.source = def.source;
  state.sourceIsManual = false;
  state.flexibleMode = 'availability';
  state.flexible = { ...student.flexibleDefaults };
  state.pendingFlexible = { ...student.flexibleDefaults };
  state.cohortTab = 'all';
  state.countryFilter = null;
  state.categoryFilter = 'all';
  state.collegeSearch = '';
  state.courseSearch = '';
  state.partneredOnly = false;
  state.scholarshipOnly = false;
  state.shortlist = new Set();
  if (!(id in state.cimRemoved)) state.cimRemoved[id] = false;
  renderAll();
}

// ── Filtering pipeline ────────────────────────────────────────
function passesFlexible(course) {
  if (state.flexibleMode === 'asked') return true;
  const f = state.flexible;
  return course.tuitionFeeUSD <= f.maxTuition
    && course.backlogsAllowed >= f.backlogs
    && course.minWorkExpMonths <= f.workExp
    && course.minGradePercent <= f.grade
    && course.intakeTerm === f.intake;
}

function passesSecondary(course) {
  if (state.countryFilter && course.country !== state.countryFilter) return false;
  if (state.partneredOnly && !course.partnered) return false;
  if (state.scholarshipOnly && course.scholarshipCount < 1) return false;
  if (state.courseSearch && !(`${course.name} ${course.university}`.toLowerCase().includes(state.courseSearch.toLowerCase()))) return false;
  return true;
}

function badgeFor(course) {
  const inCourse = !!course.cohortByCourse;
  const inCareer = !!course.cohortByCareer;
  if (inCourse && inCareer) return 'Course + career match';
  if (inCourse) return 'Course match';
  return 'Career match';
}

function mergedCohort(course) {
  const a = course.cohortByCourse, b = course.cohortByCareer;
  if (a && b) return COHORT_STRENGTH[a] >= COHORT_STRENGTH[b] ? a : b;
  return a || b;
}

function getSourcePool() {
  const all = currentCourses();
  if (state.source === 'course') return all.filter(c => c.cohortByCourse).map(c => ({ ...c, _cohort: c.cohortByCourse, _badge: 'Course match' }));
  if (state.source === 'career') return all.filter(c => c.cohortByCareer).map(c => ({ ...c, _cohort: c.cohortByCareer, _badge: 'Career match' }));
  // both — only courses that match BOTH course requirement AND career preference
  return all.filter(c => c.cohortByCourse && c.cohortByCareer).map(c => ({ ...c, _cohort: mergedCohort(c), _badge: 'Course + career match' }));
}

function cohortCounts(pool) {
  const counts = { all: pool.length };
  COHORT_ORDER.forEach(k => counts[k] = 0);
  pool.forEach(c => { counts[c._cohort] = (counts[c._cohort] || 0) + 1; });
  return counts;
}

function getVisibleResults() {
  let pool = getSourcePool();
  pool = pool.filter(passesFlexible).filter(passesSecondary);
  if (state.cohortTab !== 'all') pool = pool.filter(c => c._cohort === state.cohortTab);
  return pool;
}

// ── Rendering ─────────────────────────────────────────────────
function el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }

function fmtUSD(n) { return n === 0 ? 'Fully funded' : `$${n.toLocaleString('en-US')}`; }

function safetyClasses(s) {
  if (s === 'Safe') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (s === 'Moderate') return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-rose-50 text-rose-700 border-rose-200';
}

function intakeClasses(s) {
  if (s === 'Open') return 'bg-emerald-50 text-emerald-700';
  if (s === 'Closing soon') return 'bg-amber-50 text-amber-700';
  return 'bg-slate-100 text-slate-600';
}

function renderStudentHeader() {
  const s = currentStudent();
  document.getElementById('studentSwitcher').value = s.id;
  const wrap = document.getElementById('studentMeta');
  wrap.innerHTML = `
    <div class="w-11 h-11 rounded-full bg-accent/10 text-accent font-semibold flex items-center justify-center text-sm shrink-0">${s.initials}</div>
    <div class="min-w-0">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="font-semibold text-text-main">${s.name}</span>
        <span class="text-xs text-text-muted">•</span>
        <span class="text-xs text-text-muted">${s.workExpMonths > 0 ? `${s.workExpMonths} mo work exp` : 'Fresher'}</span>
        ${s.hasCareerPreference ? `<span class="text-xs text-text-muted">•</span><span class="text-xs text-text-muted">Career pref: <b class="text-text-main font-medium">${s.careerPreference}</b></span>` : `<span class="text-xs text-text-muted">•</span><span class="text-xs text-text-muted italic">No career preference on file</span>`}
      </div>
      <div class="text-xs text-text-muted mt-0.5">Requesting: ${s.courseRequirement}</div>
    </div>`;
}

function renderCourseTypePills() {
  const s = currentStudent();
  const wrap = document.getElementById('courseTypePills');
  wrap.innerHTML = s.courseTypePills.map((p, i) => `
    <button class="pill ${i === 0 ? 'pill-active' : ''}" type="button">${p.label} <span class="opacity-60">(${p.count})</span></button>
  `).join('');
}

function renderAlwaysRequired() {
  const s = currentStudent();
  const wrap = document.getElementById('alwaysRequired');
  const items = [
    { label: 'Country', value: s.country.join(', ') },
    { label: 'Course', value: s.courseRequirement },
    { label: 'Duration', value: s.duration },
  ];
  wrap.innerHTML = items.map(i => `
    <div class="locked-field">
      <div class="locked-field-label">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-3 h-3"><rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
        ${i.label}
      </div>
      <div class="locked-field-value">${i.value}</div>
    </div>
  `).join('');
}

function renderFlexible() {
  const f = state.pendingFlexible;
  document.getElementById('flexSwitch').checked = state.flexibleMode === 'asked';
  document.getElementById('intakeFlex').value = f.intake;
  document.getElementById('maxTuition').value = f.maxTuition;
  document.getElementById('backlogs').value = f.backlogs;
  document.getElementById('workExp').value = f.workExp;
  document.getElementById('grade').value = f.grade;
  const disabled = state.flexibleMode === 'asked';
  ['intakeFlex', 'maxTuition', 'backlogs', 'workExp', 'grade'].forEach(id => {
    document.getElementById(id).disabled = disabled;
  });
  document.querySelectorAll('.flex-field').forEach(elm => elm.classList.toggle('opacity-40', disabled));
  renderApplyState();
}

function renderApplyState() {
  const disabled = state.flexibleMode === 'asked';
  const dirty = !disabled && JSON.stringify(state.pendingFlexible) !== JSON.stringify(state.flexible);
  const baseNote = disabled
    ? "Set to 'Student to join F2F' — results will ignore intake, fee, backlog, work exp and grade cutoffs."
    : "Set to 'With constraint' — results are constrained by intake, fee, backlog, work exp and grade cutoffs below.";
  const note = document.getElementById('flexNote');
  note.innerHTML = baseNote + (dirty ? ' <b class="text-accent-dark">Unapplied changes — click Apply.</b>' : '');
  const btn = document.getElementById('applyFlexBtn');
  btn.classList.toggle('apply-btn-dirty', dirty);
  btn.disabled = disabled;
}

function renderCIM() {
  const s = currentStudent();
  const cim = s.cim;
  const removed = !!state.cimRemoved[s.id];
  const wrap = document.getElementById('cimRow');
  if (removed) {
    wrap.innerHTML = `
      <div class="flex items-center justify-between py-3 px-4 text-sm text-text-muted">
        <span>Course in Mind removed from this student's shortlist.</span>
        <button id="cimRestoreBtn" class="text-accent font-medium hover:underline cursor-pointer">Add back</button>
      </div>`;
    document.getElementById('cimRestoreBtn').onclick = () => { state.cimRemoved[s.id] = false; state.shortlist.add(cim.id); renderAll(); };
    return;
  }
  wrap.innerHTML = `
    <div class="flex items-center gap-3 py-3 px-4 flex-wrap">
      <span class="cim-tag">Course in Mind</span>
      <div class="min-w-0 flex-1">
        <div class="font-medium text-text-main text-sm truncate">${cim.name}</div>
        <div class="text-xs text-text-muted truncate">${cim.university} · ${cim.country}</div>
      </div>
      <span class="text-xs px-2 py-1 rounded-md ${intakeClasses(cim.intakeStatus)}">${cim.intakeStatus}</span>
      <span class="text-xs text-text-muted whitespace-nowrap">Auto-added to shortlist</span>
      <button id="cimRemoveBtn" class="text-text-muted hover:text-rose-600 cursor-pointer p-1" title="Remove from shortlist">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>`;
  document.getElementById('cimRemoveBtn').onclick = () => { state.cimRemoved[s.id] = true; state.shortlist.delete(cim.id); renderAll(); };
}

function renderSourceSelector() {
  const s = currentStudent();
  document.querySelectorAll('#sourceSelector button').forEach(b => b.classList.toggle('seg-active', b.dataset.source === state.source));
  const caption = document.getElementById('sourceCaption');
  if (state.sourceIsManual) {
    caption.textContent = `Manually set to ${state.source === 'course' ? 'Course requirement' : state.source === 'career' ? 'Career preference' : 'Both'}.`;
  } else {
    caption.textContent = computeDefaultSource(s).reason;
  }
}

function renderCohortTabs() {
  const pool = getSourcePool().filter(passesFlexible).filter(passesSecondary);
  const counts = cohortCounts(pool);
  const wrap = document.getElementById('cohortTabs');
  const tabs = [['all', 'All'], ...COHORT_ORDER.map(k => [k, COHORT_LABEL[k]])];
  wrap.innerHTML = tabs.map(([key, label]) => `
    <button class="cohort-tab ${state.cohortTab === key ? 'cohort-tab-active' : ''}" data-cohort="${key}" type="button">
      ${label} <span class="opacity-60">(${counts[key] || 0})</span>
    </button>
  `).join('');
  wrap.querySelectorAll('button').forEach(b => b.onclick = () => { state.cohortTab = b.dataset.cohort; renderAll(); });
}

function renderSidebar() {
  const s = currentStudent();
  const countries = [...new Set(currentCourses().map(c => c.country))];
  const wrap = document.getElementById('countryPills');
  wrap.innerHTML = `<button class="pill ${!state.countryFilter ? 'pill-active' : ''}" data-country="">All countries</button>` +
    countries.map(c => `<button class="pill ${state.countryFilter === c ? 'pill-active' : ''}" data-country="${c}">${c}</button>`).join('');
  wrap.querySelectorAll('button').forEach(b => b.onclick = () => { state.countryFilter = b.dataset.country || null; renderAll(); });

  const collegeWrap = document.getElementById('collegeList');
  const uniNames = [...new Set(currentCourses().map(c => c.university))].filter(u => u.toLowerCase().includes(state.collegeSearch.toLowerCase()));
  collegeWrap.innerHTML = uniNames.map(u => `<div class="college-item">${u}</div>`).join('') || `<div class="text-xs text-text-muted px-2 py-2">No colleges match.</div>`;
}

function courseCard(course) {
  const inShortlist = state.shortlist.has(course.id);
  const badgeHtml = state.source === 'both' ? `<span class="source-badge">${course._badge}</span>` : '';
  return `
    <div class="course-card ${inShortlist ? 'course-card-selected' : ''}" data-id="${course.id}">
      <div class="flex items-start justify-between gap-2 mb-2">
        <div class="flex items-center gap-1.5 flex-wrap">
          <span class="cohort-badge">${COHORT_LABEL[course._cohort]}</span>
          ${badgeHtml}
        </div>
        <label class="course-check">
          <input type="checkbox" data-id="${course.id}" ${inShortlist ? 'checked' : ''} />
          <span></span>
        </label>
      </div>
      <div class="font-semibold text-sm text-text-main leading-snug">${course.name}</div>
      <div class="text-xs text-text-muted mt-0.5">${course.university} · ${course.country}</div>
      <div class="flex items-center gap-2 mt-2 flex-wrap">
        <span class="px-2 py-0.5 rounded-md text-[11px] font-medium border ${safetyClasses(course.safety)}">${course.safety}</span>
        <span class="px-2 py-0.5 rounded-md text-[11px] font-medium ${intakeClasses(course.intakeStatus)}">${course.intakeStatus}</span>
        ${course.partnered ? '<span class="px-2 py-0.5 rounded-md text-[11px] font-medium bg-indigo-50 text-indigo-700">Partnered</span>' : ''}
      </div>
      <div class="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-3 text-xs text-text-muted font-mono">
        <div>QS Rank <b class="text-text-main font-semibold">#${course.qsRank}</b></div>
        <div>Duration <b class="text-text-main font-semibold">${course.durationMonths} mo</b></div>
        <div>Tuition <b class="text-text-main font-semibold">${fmtUSD(course.tuitionFeeUSD)}</b></div>
        <div>Scholarships <b class="text-text-main font-semibold">${course.scholarshipCount}</b></div>
      </div>
    </div>`;
}

function emptyStateHtml() {
  if (state.flexibleMode === 'asked') {
    return emptyBlock("No exact matches found. Try 'With constraint' instead.");
  }
  if (state.source === 'both') {
    const rawBothPool = currentCourses().filter(c => c.cohortByCourse && c.cohortByCareer);
    if (rawBothPool.length === 0) {
      return emptyBlock("No courses match both this student's course requirement and career preference with current filters. Try 'Course requirement' or 'Career preference' individually, or adjust filters.");
    }
  }
  if (state.source === 'career' && !currentStudent().hasCareerPreference) {
    return emptyBlock("No courses match this student's career preference with current filters. Try 'Course requirement' or 'Both', or adjust filters.");
  }
  if (state.source === 'career') {
    const rawCareerPool = currentCourses().filter(c => c.cohortByCareer);
    if (rawCareerPool.length === 0) {
      return emptyBlock("No courses match this student's career preference with current filters. Try 'Course requirement' or 'Both', or adjust filters.");
    }
  }
  return emptyBlock('No results found.');
}

function emptyBlock(message) {
  return `
    <div class="col-span-full flex flex-col items-center justify-center text-center py-16 px-6">
      <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" class="w-6 h-6 text-slate-400"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
      </div>
      <div class="text-sm text-text-muted max-w-sm">${message}</div>
    </div>`;
}

function renderResults() {
  const results = getVisibleResults();
  const grid = document.getElementById('resultsGrid');
  if (results.length === 0) {
    grid.innerHTML = emptyStateHtml();
  } else {
    grid.innerHTML = results.map(courseCard).join('');
  }
  grid.querySelectorAll('input[type=checkbox]').forEach(cb => {
    cb.onchange = () => {
      if (cb.checked) state.shortlist.add(cb.dataset.id); else state.shortlist.delete(cb.dataset.id);
      renderShortlistCount();
      renderResults();
      renderDrawer();
    };
  });
  grid.querySelectorAll('.course-card').forEach(card => {
    card.onclick = (e) => {
      if (e.target.closest('.course-check')) return;
      const cb = card.querySelector('input[type=checkbox]');
      cb.checked = !cb.checked;
      cb.dispatchEvent(new Event('change'));
    };
  });
}

function renderShortlistCount() {
  const s = currentStudent();
  const cimIncluded = !state.cimRemoved[s.id];
  const count = state.shortlist.size + (cimIncluded && !state.shortlist.has(s.cim.id) ? 1 : 0);
  document.getElementById('bookmarkCount').textContent = count;
}

function renderDrawer() {
  const s = currentStudent();
  const cimIncluded = !state.cimRemoved[s.id];
  const all = currentCourses().filter(c => state.shortlist.has(c.id));
  const wrap = document.getElementById('drawerList');
  const rows = [];
  if (cimIncluded) {
    rows.push(`
      <div class="drawer-item">
        <div class="min-w-0">
          <span class="cim-tag mb-1 inline-block">CIM</span>
          <div class="font-medium text-sm text-text-main truncate">${s.cim.name}</div>
          <div class="text-xs text-text-muted truncate">${s.cim.university}</div>
        </div>
        <button class="text-text-muted hover:text-rose-600 cursor-pointer p-1 shrink-0" data-remove="cim"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>`);
  }
  all.forEach(c => {
    rows.push(`
      <div class="drawer-item">
        <div class="min-w-0">
          <div class="font-medium text-sm text-text-main truncate">${c.name}</div>
          <div class="text-xs text-text-muted truncate">${c.university} · ${c.country}</div>
        </div>
        <button class="text-text-muted hover:text-rose-600 cursor-pointer p-1 shrink-0" data-remove="${c.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>`);
  });
  wrap.innerHTML = rows.join('') || `<div class="text-sm text-text-muted text-center py-10">No courses in shortlist yet.</div>`;
  wrap.querySelectorAll('[data-remove]').forEach(b => {
    b.onclick = () => {
      const id = b.dataset.remove;
      if (id === 'cim') { state.cimRemoved[s.id] = true; } else { state.shortlist.delete(id); }
      renderAll();
    };
  });
}

function renderAll() {
  renderStudentHeader();
  renderCourseTypePills();
  renderAlwaysRequired();
  renderFlexible();
  renderCIM();
  renderSourceSelector();
  renderSidebar();
  renderCohortTabs();
  renderResults();
  renderShortlistCount();
  renderDrawer();
}

// ── Wiring ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('studentSwitcher').addEventListener('change', (e) => switchStudent(e.target.value));

  document.getElementById('flexSwitch').addEventListener('change', (e) => {
    state.flexibleMode = e.target.checked ? 'asked' : 'availability';
    renderAll();
  });

  ['maxTuition', 'backlogs', 'workExp', 'grade'].forEach(id => {
    document.getElementById(id).addEventListener('input', (e) => {
      state.pendingFlexible[id] = Number(e.target.value) || 0;
      renderApplyState();
    });
  });

  document.getElementById('intakeFlex').addEventListener('change', (e) => {
    state.pendingFlexible.intake = e.target.value;
    renderApplyState();
  });

  document.getElementById('applyFlexBtn').addEventListener('click', () => {
    state.flexible = { ...state.pendingFlexible };
    renderResults();
    renderCohortTabs();
    renderApplyState();
  });

  document.querySelectorAll('#sourceSelector button').forEach(b => {
    b.addEventListener('click', () => {
      state.source = b.dataset.source;
      state.sourceIsManual = true;
      renderAll();
    });
  });

  document.getElementById('categoryFilter').addEventListener('change', (e) => { state.categoryFilter = e.target.value; renderAll(); });
  document.getElementById('collegeSearch').addEventListener('input', (e) => { state.collegeSearch = e.target.value; renderSidebar(); });
  document.getElementById('courseSearch').addEventListener('input', (e) => { state.courseSearch = e.target.value; renderResults(); renderCohortTabs(); });
  document.getElementById('partneredOnly').addEventListener('change', (e) => { state.partneredOnly = e.target.checked; renderAll(); });
  document.getElementById('scholarshipOnly').addEventListener('change', (e) => { state.scholarshipOnly = e.target.checked; renderAll(); });

  document.getElementById('viewBookmarksBtn').addEventListener('click', () => document.getElementById('drawer').classList.add('drawer-open'));
  document.getElementById('drawerCloseBtn').addEventListener('click', () => document.getElementById('drawer').classList.remove('drawer-open'));
  document.getElementById('drawerBackdrop').addEventListener('click', () => document.getElementById('drawer').classList.remove('drawer-open'));
  document.getElementById('sendShortlistBtn').addEventListener('click', () => {
    const toast = document.getElementById('toast');
    toast.classList.add('toast-show');
    setTimeout(() => toast.classList.remove('toast-show'), 2600);
  });

  // init: seed CIM into shortlist for default student
  state.shortlist.add(STUDENTS.priya.cim.id);
  renderAll();
});
