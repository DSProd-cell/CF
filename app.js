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

// "Relaxed" isn't its own cohort — it's a relaxation modifier on Similar / Partial Match.
// So the tab bar shows 5 base buckets (all, exact, related, similar, partial); when Similar or
// Partial Match is active, an inline toggle reveals its Relaxed sibling on top, without ever
// hiding that data behind a merge. Every one of the original 6 tags is still fully reachable.
const RELAXED_SIBLING = { similar: 'similarRelaxed', partial: 'partialRelaxed' };
const BASE_TAB_ORDER = ['exact', 'related', 'similar', 'partial'];

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
    budgetDefault: 30000,
    flexibleDefaults: { intake: 'Sep 2026', backlogs: 1, workExp: 14, grade: 72, category: 'all' },
    cimList: [
      { id: 'cim-priya-1', name: 'MSc Financial Analytics', university: 'London School of Economics', country: 'UK', qsRank: 45, durationMonths: 12, tuitionFeeUSD: 34500, scholarshipCount: 2, intakeStatus: 'Closing soon', partnered: true },
      { id: 'cim-priya-2', name: 'MSc International Business', university: 'INSEAD', country: 'France', qsRank: 12, durationMonths: 10, tuitionFeeUSD: 52000, scholarshipCount: 1, intakeStatus: 'Waitlist', partnered: false },
      { id: 'cim-priya-3', name: 'MSc Business Analytics', university: 'Imperial College London', country: 'UK', qsRank: 8, durationMonths: 12, tuitionFeeUSD: 39500, scholarshipCount: 0, intakeStatus: 'Open', partnered: false },
      { id: 'cim-priya-4', name: 'MSc Strategic Management', university: 'IE Business School', country: 'Spain', qsRank: 33, durationMonths: 11, tuitionFeeUSD: 41000, scholarshipCount: 1, intakeStatus: 'Open', partnered: true },
      { id: 'cim-priya-5', name: 'MSc Business Analytics', university: 'NUS Business School', country: 'Singapore', qsRank: 19, durationMonths: 17, tuitionFeeUSD: 36000, scholarshipCount: 2, intakeStatus: 'Open', partnered: false },
    ],
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
    budgetDefault: 24000,
    flexibleDefaults: { intake: 'Jan 2027', backlogs: 0, workExp: 0, grade: 68, category: 'all' },
    cimList: [
      { id: 'cim-arjun-1', name: 'MSc Artificial Intelligence', university: 'Carnegie Mellon University', country: 'USA', qsRank: 22, durationMonths: 24, tuitionFeeUSD: 41000, scholarshipCount: 0, intakeStatus: 'Open', partnered: false },
      { id: 'cim-arjun-2', name: 'MSc Computer Science', university: 'Stanford University', country: 'USA', qsRank: 3, durationMonths: 18, tuitionFeeUSD: 58000, scholarshipCount: 0, intakeStatus: 'Waitlist', partnered: false },
      { id: 'cim-arjun-3', name: 'MSc Machine Learning', university: 'University of Cambridge', country: 'UK', qsRank: 2, durationMonths: 12, tuitionFeeUSD: 44000, scholarshipCount: 1, intakeStatus: 'Waitlist', partnered: false },
      { id: 'cim-arjun-4', name: 'MSc Computer Science', university: 'ETH Zurich', country: 'Switzerland', qsRank: 7, durationMonths: 18, tuitionFeeUSD: 16500, scholarshipCount: 0, intakeStatus: 'Open', partnered: false },
      { id: 'cim-arjun-5', name: 'MSc Software Engineering', university: 'Georgia Institute of Technology', country: 'USA', qsRank: 47, durationMonths: 18, tuitionFeeUSD: 29500, scholarshipCount: 1, intakeStatus: 'Open', partnered: true },
    ],
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
    budgetDefault: 28000,
    flexibleDefaults: { intake: 'Sep 2026', backlogs: 2, workExp: 8, grade: 65, category: 'all' },
    cimList: [
      { id: 'cim-sana-1', name: 'MSc Robotics & AI', university: 'Carnegie Mellon University', country: 'USA', qsRank: 22, durationMonths: 24, tuitionFeeUSD: 43500, scholarshipCount: 1, intakeStatus: 'Waitlist', partnered: false },
      { id: 'cim-sana-2', name: 'MSc Robotics', university: 'Massachusetts Institute of Technology', country: 'USA', qsRank: 1, durationMonths: 24, tuitionFeeUSD: 61000, scholarshipCount: 0, intakeStatus: 'Waitlist', partnered: false },
      { id: 'cim-sana-3', name: 'MSc Autonomous Systems', university: 'University of Oxford', country: 'UK', qsRank: 4, durationMonths: 12, tuitionFeeUSD: 40500, scholarshipCount: 0, intakeStatus: 'Open', partnered: false },
      { id: 'cim-sana-4', name: 'MSc Robotics Engineering', university: 'EPFL', country: 'Switzerland', qsRank: 14, durationMonths: 18, tuitionFeeUSD: 14500, scholarshipCount: 1, intakeStatus: 'Open', partnered: false },
      { id: 'cim-sana-5', name: 'MSc Mechatronics', university: 'Stanford University', country: 'USA', qsRank: 3, durationMonths: 18, tuitionFeeUSD: 57000, scholarshipCount: 0, intakeStatus: 'Closing soon', partnered: false },
    ],
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
    budgetDefault: 25000,
    flexibleDefaults: { intake: 'May 2027', backlogs: 0, workExp: 3, grade: 60, category: 'all' },
    cimList: [], // blank student — no CIM entries either, consistent with the empty-state purpose
  },
};

// ── Courses (mock pool, tagged per student) ──────────────────
// cohortByCourse / cohortByCareer: cohort tag string or null (not in that source's pool)
const COURSES = {
  priya: [
    { id:'p1', category:'business', careerPath:'Business Analyst', intakeTerm:'Sep 2026', name:'MSc Business Analytics', university:'University of Toronto', country:'Canada', qsRank:21, durationMonths:12, tuitionFeeUSD:29800, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:65, scholarshipCount:3, safety:'Safe', partnered:true, intakeStatus:'Open', cohortByCourse:'exact', cohortByCareer:'exact' },
    { id:'p2', category:'business', careerPath:'Data Analyst', intakeTerm:'Jan 2027', name:'MSc Business Analytics', university:'Warwick Business School', country:'UK', qsRank:64, durationMonths:12, tuitionFeeUSD:33200, backlogsAllowed:0, minWorkExpMonths:0, minGradePercent:70, scholarshipCount:1, safety:'Moderate', partnered:true, intakeStatus:'Open', cohortByCourse:'exact', cohortByCareer:'related' },
    { id:'p3', category:'business', careerPath:'Business Analyst', intakeTerm:'Sep 2026', name:'MSc Management Analytics', university:'HEC Montreal', country:'Canada', qsRank:88, durationMonths:16, tuitionFeeUSD:26500, backlogsAllowed:2, minWorkExpMonths:6, minGradePercent:60, scholarshipCount:0, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'related', cohortByCareer:'exact' },
    { id:'p4', category:'business', intakeTerm:'Sep 2026', name:'MSc Business Analytics', university:'Monash University', country:'Australia', qsRank:42, durationMonths:24, tuitionFeeUSD:31000, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:65, scholarshipCount:0, safety:'Moderate', partnered:false, intakeStatus:'Closing soon', cohortByCourse:'similar', cohortByCareer:null },
    { id:'p5', category:'business', careerPath:'Business Analyst', intakeTerm:'Jan 2027', name:'MSc Data Analytics', university:'University of Melbourne', country:'Australia', qsRank:37, durationMonths:18, tuitionFeeUSD:32500, backlogsAllowed:0, minWorkExpMonths:12, minGradePercent:68, scholarshipCount:2, safety:'Ambitious', partnered:true, intakeStatus:'Open', cohortByCourse:null, cohortByCareer:'exact' },
    { id:'p6', category:'business', intakeTerm:'Sep 2026', name:'MSc Business Analytics (Extended)', university:'Trinity College Dublin', country:'Ireland', qsRank:98, durationMonths:14, tuitionFeeUSD:24800, backlogsAllowed:3, minWorkExpMonths:0, minGradePercent:55, scholarshipCount:1, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'similarRelaxed', cohortByCareer:null },
    { id:'p7', category:'business', careerPath:'Management Consultant', intakeTerm:'Sep 2026', name:'MSc Business Intelligence', university:'Imperial College London', country:'UK', qsRank:8, durationMonths:12, tuitionFeeUSD:38000, backlogsAllowed:0, minWorkExpMonths:18, minGradePercent:75, scholarshipCount:0, safety:'Ambitious', partnered:false, intakeStatus:'Waitlist', cohortByCourse:null, cohortByCareer:'related' },
    { id:'p8', category:'business', intakeTerm:'Sep 2026', name:'MSc Business Analytics', university:'University of Sydney', country:'Australia', qsRank:19, durationMonths:24, tuitionFeeUSD:33800, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:65, scholarshipCount:1, safety:'Moderate', partnered:true, intakeStatus:'Open', cohortByCourse:'partial', cohortByCareer:null },
    { id:'p9', category:'business', careerPath:'Data Analyst', intakeTerm:'Sep 2026', name:'Master of Business Analytics', university:'University of British Columbia', country:'Canada', qsRank:34, durationMonths:12, tuitionFeeUSD:30500, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:68, scholarshipCount:2, safety:'Safe', partnered:true, intakeStatus:'Open', cohortByCourse:'exact', cohortByCareer:'similar' },
    { id:'p10', category:'business', careerPath:'Marketing Analyst', intakeTerm:'Jan 2027', name:'MSc Data Science for Business', university:'ESSEC Business School', country:'France', qsRank:76, durationMonths:16, tuitionFeeUSD:27900, backlogsAllowed:2, minWorkExpMonths:6, minGradePercent:60, scholarshipCount:0, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:null, cohortByCareer:'similarRelaxed' },
    { id:'p11', category:'business', intakeTerm:'Sep 2026', name:'MSc Business Analytics', university:'York University', country:'Canada', qsRank:210, durationMonths:12, tuitionFeeUSD:22500, backlogsAllowed:3, minWorkExpMonths:0, minGradePercent:55, scholarshipCount:1, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'partialRelaxed', cohortByCareer:null },
    { id:'p12', category:'business', careerPath:'Financial Analyst', intakeTerm:'Sep 2026', name:'MSc Analytics & Management', university:'Cambridge Judge Business School', country:'UK', qsRank:5, durationMonths:12, tuitionFeeUSD:42000, backlogsAllowed:0, minWorkExpMonths:24, minGradePercent:80, scholarshipCount:0, safety:'Ambitious', partnered:false, intakeStatus:'Waitlist', cohortByCourse:'related', cohortByCareer:'related' },
    { id:'p13', category:'business', intakeTerm:'Sep 2026', name:'MSc Business Analytics', university:'Rotterdam School of Management', country:'Netherlands', qsRank:60, durationMonths:12, tuitionFeeUSD:26000, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:65, scholarshipCount:1, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'similar', cohortByCareer:null },
    { id:'p14', category:'business', intakeTerm:'Jan 2027', name:'MSc Business Analytics', university:'University of Leeds', country:'UK', qsRank:75, durationMonths:12, tuitionFeeUSD:28500, backlogsAllowed:2, minWorkExpMonths:0, minGradePercent:60, scholarshipCount:0, safety:'Safe', partnered:true, intakeStatus:'Open', cohortByCourse:'similarRelaxed', cohortByCareer:null },
    { id:'p15', category:'business', intakeTerm:'Sep 2026', name:'MSc Business Analytics', university:'Deakin University', country:'Australia', qsRank:250, durationMonths:24, tuitionFeeUSD:27500, backlogsAllowed:2, minWorkExpMonths:0, minGradePercent:55, scholarshipCount:1, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'partial', cohortByCareer:null },
    { id:'p16', category:'business', intakeTerm:'Jan 2027', name:'MSc Business Analytics', university:'University of Alberta', country:'Canada', qsRank:111, durationMonths:16, tuitionFeeUSD:23500, backlogsAllowed:2, minWorkExpMonths:0, minGradePercent:58, scholarshipCount:1, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'partialRelaxed', cohortByCareer:null },
    { id:'p17', category:'business', careerPath:'Marketing Analyst', intakeTerm:'Sep 2026', name:'MSc Marketing Analytics', university:'Bocconi University', country:'Italy', qsRank:150, durationMonths:12, tuitionFeeUSD:31000, backlogsAllowed:0, minWorkExpMonths:12, minGradePercent:70, scholarshipCount:0, safety:'Moderate', partnered:false, intakeStatus:'Waitlist', cohortByCourse:null, cohortByCareer:'similar' },
    { id:'p18', category:'business', careerPath:'Business Analyst', intakeTerm:'Jan 2027', name:'MSc Business Analytics', university:'Copenhagen Business School', country:'Denmark', qsRank:180, durationMonths:12, tuitionFeeUSD:20000, backlogsAllowed:1, minWorkExpMonths:6, minGradePercent:62, scholarshipCount:1, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:null, cohortByCareer:'similarRelaxed' },
    { id:'p19', category:'business', careerPath:'Data Analyst', intakeTerm:'Sep 2026', name:'MSc Data-Driven Business', university:'Erasmus University Rotterdam', country:'Netherlands', qsRank:152, durationMonths:12, tuitionFeeUSD:24000, backlogsAllowed:1, minWorkExpMonths:6, minGradePercent:65, scholarshipCount:0, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:null, cohortByCareer:'partial' },
    { id:'p20', category:'business', careerPath:'Business Analyst', intakeTerm:'Jan 2027', name:'MSc Business Analytics', university:'University of Auckland', country:'New Zealand', qsRank:87, durationMonths:18, tuitionFeeUSD:26500, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:60, scholarshipCount:1, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:null, cohortByCareer:'partialRelaxed' },
    { id:'p21', category:'business', careerPath:'Management Consultant', intakeTerm:'Sep 2026', name:'MSc Business Analytics', university:'University of Bath', country:'UK', qsRank:148, durationMonths:12, tuitionFeeUSD:33000, backlogsAllowed:0, minWorkExpMonths:12, minGradePercent:68, scholarshipCount:0, safety:'Moderate', partnered:false, intakeStatus:'Open', cohortByCourse:null, cohortByCareer:'partial' },
    { id:'p22', category:'business', careerPath:'Marketing Analyst', intakeTerm:'Jan 2027', name:'MSc Marketing & Business Analytics', university:'University of Manchester', country:'UK', qsRank:34, durationMonths:12, tuitionFeeUSD:34500, backlogsAllowed:0, minWorkExpMonths:6, minGradePercent:70, scholarshipCount:1, safety:'Moderate', partnered:true, intakeStatus:'Closing soon', cohortByCourse:null, cohortByCareer:'partialRelaxed' },
  ],
  arjun: [
    { id:'a1', category:'stem', intakeTerm:'Jan 2027', name:'MSc Computer Science', university:'University of Toronto', country:'Canada', qsRank:21, durationMonths:20, tuitionFeeUSD:28500, backlogsAllowed:0, minWorkExpMonths:0, minGradePercent:70, scholarshipCount:2, safety:'Moderate', partnered:true, intakeStatus:'Open', cohortByCourse:'exact', cohortByCareer:null },
    { id:'a2', category:'stem', intakeTerm:'Jan 2027', name:'MSc Computer Science', university:'University of Manchester', country:'UK', qsRank:34, durationMonths:12, tuitionFeeUSD:26800, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:65, scholarshipCount:1, safety:'Safe', partnered:true, intakeStatus:'Open', cohortByCourse:'exact', cohortByCareer:null },
    { id:'a3', category:'stem', intakeTerm:'Sep 2026', name:'MSc Computer Science', university:'Arizona State University', country:'USA', qsRank:213, durationMonths:18, tuitionFeeUSD:24000, backlogsAllowed:2, minWorkExpMonths:0, minGradePercent:55, scholarshipCount:0, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'related', cohortByCareer:null },
    { id:'a4', category:'stem', intakeTerm:'Jan 2027', name:'MSc Computer Science (AI Specialization)', university:'University of Edinburgh', country:'UK', qsRank:22, durationMonths:12, tuitionFeeUSD:33500, backlogsAllowed:0, minWorkExpMonths:0, minGradePercent:72, scholarshipCount:1, safety:'Ambitious', partnered:false, intakeStatus:'Closing soon', cohortByCourse:'related', cohortByCareer:null },
    { id:'a5', category:'stem', intakeTerm:'Jan 2027', name:'MSc Software Engineering', university:'University of Waterloo', country:'Canada', qsRank:112, durationMonths:16, tuitionFeeUSD:27200, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:65, scholarshipCount:0, safety:'Safe', partnered:true, intakeStatus:'Open', cohortByCourse:'similar', cohortByCareer:null },
    { id:'a6', category:'stem', intakeTerm:'Jan 2027', name:'MSc Computer Science', university:'Dublin City University', country:'Ireland', qsRank:401, durationMonths:12, tuitionFeeUSD:19500, backlogsAllowed:3, minWorkExpMonths:0, minGradePercent:55, scholarshipCount:1, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'similarRelaxed', cohortByCareer:null },
    { id:'a7', category:'stem', intakeTerm:'Sep 2026', name:'MSc Computer Science', university:'RWTH Aachen', country:'Germany', qsRank:106, durationMonths:24, tuitionFeeUSD:9500, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:70, scholarshipCount:0, safety:'Moderate', partnered:false, intakeStatus:'Open', cohortByCourse:'partial', cohortByCareer:null },
    { id:'a8', category:'stem', intakeTerm:'Jan 2027', name:'MSc Information Technology', university:'University of Sydney', country:'Australia', qsRank:19, durationMonths:24, tuitionFeeUSD:31500, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:62, scholarshipCount:1, safety:'Moderate', partnered:true, intakeStatus:'Open', cohortByCourse:'partialRelaxed', cohortByCareer:null },
    { id:'a9', category:'stem', intakeTerm:'Jan 2027', name:'MSc Computer Science', university:'University of British Columbia', country:'Canada', qsRank:34, durationMonths:20, tuitionFeeUSD:29500, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:65, scholarshipCount:1, safety:'Moderate', partnered:true, intakeStatus:'Open', cohortByCourse:'similar', cohortByCareer:null },
    { id:'a10', category:'stem', intakeTerm:'Sep 2026', name:'MSc Computer Science', university:'Trinity College Dublin', country:'Ireland', qsRank:81, durationMonths:12, tuitionFeeUSD:21500, backlogsAllowed:2, minWorkExpMonths:0, minGradePercent:58, scholarshipCount:0, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'similarRelaxed', cohortByCareer:null },
    { id:'a11', category:'stem', intakeTerm:'Jan 2027', name:'MSc Computer Science', university:'University of Melbourne', country:'Australia', qsRank:37, durationMonths:24, tuitionFeeUSD:32500, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:65, scholarshipCount:1, safety:'Moderate', partnered:false, intakeStatus:'Open', cohortByCourse:'partial', cohortByCareer:null },
    { id:'a12', category:'stem', intakeTerm:'Sep 2026', name:'MSc Computer Science', university:'Technical University of Berlin', country:'Germany', qsRank:154, durationMonths:24, tuitionFeeUSD:7500, backlogsAllowed:2, minWorkExpMonths:0, minGradePercent:60, scholarshipCount:0, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'partialRelaxed', cohortByCareer:null },
    { id:'a13', category:'stem', intakeTerm:'Jan 2027', name:'MSc Computer Science', university:'University of Illinois Urbana-Champaign', country:'USA', qsRank:65, durationMonths:18, tuitionFeeUSD:30500, backlogsAllowed:0, minWorkExpMonths:0, minGradePercent:72, scholarshipCount:1, safety:'Ambitious', partnered:false, intakeStatus:'Waitlist', cohortByCourse:'exact', cohortByCareer:null },
    { id:'a14', category:'stem', intakeTerm:'Sep 2026', name:'MSc Data Science', university:'University of Glasgow', country:'UK', qsRank:87, durationMonths:12, tuitionFeeUSD:25500, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:62, scholarshipCount:1, safety:'Safe', partnered:true, intakeStatus:'Open', cohortByCourse:'related', cohortByCareer:null },
  ],
  sana: [
    { id:'s1', category:'stem', intakeTerm:'Sep 2026', name:'MSc Robotics Engineering', university:'ETH Zurich', country:'Switzerland', qsRank:7, durationMonths:24, tuitionFeeUSD:15800, backlogsAllowed:0, minWorkExpMonths:0, minGradePercent:78, scholarshipCount:1, safety:'Ambitious', partnered:false, intakeStatus:'Open', cohortByCourse:'exact', cohortByCareer:null },
    { id:'s2', category:'stem', intakeTerm:'Sep 2026', name:'MSc Robotics', university:'Technical University of Munich', country:'Germany', qsRank:37, durationMonths:24, tuitionFeeUSD:8500, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:68, scholarshipCount:0, safety:'Moderate', partnered:false, intakeStatus:'Open', cohortByCourse:'exact', cohortByCareer:null },
    { id:'s3', category:'stem', intakeTerm:'Jan 2027', name:'MSc Robotics and Autonomous Systems', university:'Imperial College London', country:'UK', qsRank:8, durationMonths:12, tuitionFeeUSD:39500, backlogsAllowed:0, minWorkExpMonths:6, minGradePercent:75, scholarshipCount:0, safety:'Ambitious', partnered:false, intakeStatus:'Waitlist', cohortByCourse:'related', cohortByCareer:null },
    { id:'s4', category:'stem', intakeTerm:'Sep 2026', name:'MSc Mechatronics and Robotics', university:'KTH Royal Institute of Technology', country:'Sweden', qsRank:98, durationMonths:24, tuitionFeeUSD:0, backlogsAllowed:2, minWorkExpMonths:0, minGradePercent:60, scholarshipCount:0, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'similar', cohortByCareer:null },
    { id:'s5', category:'stem', intakeTerm:'Sep 2026', name:'MSc Robotics Engineering', university:'University of Melbourne', country:'Australia', qsRank:37, durationMonths:18, tuitionFeeUSD:34500, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:65, scholarshipCount:1, safety:'Moderate', partnered:true, intakeStatus:'Open', cohortByCourse:'similarRelaxed', cohortByCareer:null },
    { id:'s6', category:'stem', intakeTerm:'Sep 2026', name:'MSc Robotics', university:'Georgia Institute of Technology', country:'USA', qsRank:47, durationMonths:20, tuitionFeeUSD:36000, backlogsAllowed:0, minWorkExpMonths:12, minGradePercent:72, scholarshipCount:0, safety:'Ambitious', partnered:false, intakeStatus:'Open', cohortByCourse:'partial', cohortByCareer:null },
    { id:'s7', category:'stem', intakeTerm:'Sep 2026', name:'MSc Robotics', university:'University of Toronto', country:'Canada', qsRank:21, durationMonths:16, tuitionFeeUSD:30500, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:68, scholarshipCount:1, safety:'Moderate', partnered:true, intakeStatus:'Open', cohortByCourse:'related', cohortByCareer:null },
    { id:'s8', category:'stem', intakeTerm:'Jan 2027', name:'MSc Robotics Engineering', university:'National University of Singapore', country:'Singapore', qsRank:8, durationMonths:18, tuitionFeeUSD:25000, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:70, scholarshipCount:1, safety:'Ambitious', partnered:false, intakeStatus:'Open', cohortByCourse:'similar', cohortByCareer:null },
    { id:'s9', category:'stem', intakeTerm:'Sep 2026', name:'MSc Robotics & Automation', university:'TU Delft', country:'Netherlands', qsRank:47, durationMonths:24, tuitionFeeUSD:18500, backlogsAllowed:2, minWorkExpMonths:0, minGradePercent:62, scholarshipCount:0, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'similarRelaxed', cohortByCareer:null },
    { id:'s10', category:'stem', intakeTerm:'Jan 2027', name:'MSc Robotics', university:'University of Manchester', country:'UK', qsRank:34, durationMonths:12, tuitionFeeUSD:33500, backlogsAllowed:0, minWorkExpMonths:6, minGradePercent:72, scholarshipCount:0, safety:'Ambitious', partnered:false, intakeStatus:'Waitlist', cohortByCourse:'partial', cohortByCareer:null },
    { id:'s11', category:'stem', intakeTerm:'Sep 2026', name:'MSc Robotics Engineering', university:'University of Bristol', country:'UK', qsRank:61, durationMonths:18, tuitionFeeUSD:29500, backlogsAllowed:1, minWorkExpMonths:0, minGradePercent:60, scholarshipCount:1, safety:'Safe', partnered:true, intakeStatus:'Open', cohortByCourse:'partialRelaxed', cohortByCareer:null },
    { id:'s12', category:'stem', intakeTerm:'Jan 2027', name:'MSc Robotics', university:'Arizona State University', country:'USA', qsRank:213, durationMonths:20, tuitionFeeUSD:27000, backlogsAllowed:2, minWorkExpMonths:0, minGradePercent:55, scholarshipCount:0, safety:'Safe', partnered:false, intakeStatus:'Open', cohortByCourse:'partialRelaxed', cohortByCareer:null },
    { id:'s13', category:'stem', intakeTerm:'Sep 2026', name:'MSc Robotics Engineering', university:'Carnegie Mellon University', country:'USA', qsRank:22, durationMonths:20, tuitionFeeUSD:42000, backlogsAllowed:0, minWorkExpMonths:12, minGradePercent:78, scholarshipCount:0, safety:'Ambitious', partnered:false, intakeStatus:'Waitlist', cohortByCourse:'exact', cohortByCareer:null },
  ],
  // No matching courses at all — course requirement, career preference, and Both are all blank for this student.
  karan: [],
};

// ── App state ─────────────────────────────────────────────────
const state = {
  studentId: 'priya',
  source: 'career',          // 'course' | 'career'
  sourceIsManual: false,
  flexibleMode: 'asked', // 'availability' | 'asked' — defaults to F2F; counsellor opts into "With constraint"
  flexible: { ...STUDENTS.priya.flexibleDefaults },       // applied — drives filtering
  pendingFlexible: { ...STUDENTS.priya.flexibleDefaults }, // draft — bound to the inputs, committed on Apply
  flexPanelOpen: false,      // Flexible fields panel is collapsed by default
  required: requiredDefaults(STUDENTS.priya), // editable — Country / Course / Duration / Budget are still mandatory, just not locked
  cimPanelOpen: false,       // CIM list is collapsed by default
  cimRemovedIds: {},         // studentId -> Set of removed cimList ids
  cohortTab: 'all',
  relaxedIncluded: { similar: false, partial: false }, // independent per bucket, so "All" can reflect either
  countryFilter: null,
  globalSearch: '',          // sidebar "Global Search" — filters course/university/career text live
  sidebarOpen: { country: false, other: false }, // FILTERS accordion — collapsed by default
  courseSearch: '',          // applied — drives filtering
  pendingCourseSearch: '',   // draft — bound to the search input, committed on Apply
  partneredOnly: false,
  scholarshipOnly: false,
  shortlist: new Set(),
};

function currentStudent() { return STUDENTS[state.studentId]; }
function currentCourses() { return COURSES[state.studentId]; }
function requiredDefaults(student) { return { country: student.country.join(', '), course: student.courseRequirement, duration: student.duration, budget: student.budgetDefault }; }

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
  state.flexibleMode = 'asked';
  state.flexible = { ...student.flexibleDefaults };
  state.pendingFlexible = { ...student.flexibleDefaults };
  state.flexPanelOpen = false;
  state.required = requiredDefaults(student);
  state.cimPanelOpen = false;
  if (!(id in state.cimRemovedIds)) state.cimRemovedIds[id] = new Set();
  state.cohortTab = 'all';
  state.relaxedIncluded = { similar: false, partial: false };
  state.countryFilter = null;
  state.globalSearch = '';
  state.sidebarOpen = { country: false, other: false };
  state.courseSearch = '';
  state.pendingCourseSearch = '';
  state.partneredOnly = false;
  state.scholarshipOnly = false;
  state.shortlist = new Set();
  renderAll();
}

// ── Filtering pipeline ────────────────────────────────────────
// Budget is now an Always-required field: it always constrains the search, regardless of the
// Flexible-fields With-constraint/F2F toggle.
function passesBudget(course) {
  return course.tuitionFeeUSD <= state.required.budget;
}

function passesFlexible(course) {
  if (state.flexibleMode === 'asked') return true;
  const f = state.flexible;
  return course.backlogsAllowed >= f.backlogs
    && course.minWorkExpMonths <= f.workExp
    && course.minGradePercent <= f.grade
    && course.intakeTerm === f.intake
    && (f.category === 'all' || course.category === f.category);
}

function passesSecondary(course) {
  if (state.countryFilter && course.country !== state.countryFilter) return false;
  if (state.partneredOnly && !course.partnered) return false;
  if (state.scholarshipOnly && course.scholarshipCount < 1) return false;
  if (state.courseSearch && !(`${course.name} ${course.university}`.toLowerCase().includes(state.courseSearch.toLowerCase()))) return false;
  if (state.globalSearch && !(`${course.name} ${course.university} ${course.country} ${course.careerPath || ''}`.toLowerCase().includes(state.globalSearch.toLowerCase()))) return false;
  return true;
}

function getSourcePool() {
  const all = currentCourses();
  if (state.source === 'course') return all.filter(c => c.cohortByCourse).map(c => ({ ...c, _cohort: c.cohortByCourse }));
  return all.filter(c => c.cohortByCareer).map(c => ({ ...c, _cohort: c.cohortByCareer }));
}

function getFilteredPool() {
  return getSourcePool().filter(passesBudget).filter(passesFlexible).filter(passesSecondary);
}

// A relaxed-tagged course (similarRelaxed / partialRelaxed) only counts toward "All" and its base
// bucket once that bucket's own "include relaxed" toggle is on — point 10: turning relaxed on for
// a bucket increases that bucket's count AND the "All" total above it, rather than staying static.
function effectiveBucket(course) {
  if (course._cohort === 'similarRelaxed') return state.relaxedIncluded.similar ? 'similar' : null;
  if (course._cohort === 'partialRelaxed') return state.relaxedIncluded.partial ? 'partial' : null;
  return course._cohort;
}

function cohortCounts(pool) {
  const counts = { all: 0, exact: 0, related: 0, similar: 0, partial: 0 };
  pool.forEach(c => {
    const b = effectiveBucket(c);
    if (!b) return;
    counts.all++;
    counts[b] = (counts[b] || 0) + 1;
  });
  return counts;
}

// Career preference mode swaps the Exact/Related/Similar/Partial vocabulary (which describes
// structural closeness to a course ask) for a simpler Good/High Match split, since "Related" or
// "Similar" don't read naturally for a career fit. High Match = strong cohortByCareer strength.
const CAREER_HIGH_MATCH_THRESHOLD = 70;
function careerMatchPercent(course) { return Math.round(COHORT_STRENGTH[course.cohortByCareer] / 6 * 100); }

function getVisibleResults() {
  const pool = getFilteredPool();
  if (state.source === 'career') {
    if (state.cohortTab === 'all') return pool;
    return pool.filter(c => (careerMatchPercent(c) >= CAREER_HIGH_MATCH_THRESHOLD) === (state.cohortTab === 'high'));
  }
  if (state.cohortTab === 'all') return pool.filter(c => effectiveBucket(c) !== null);
  return pool.filter(c => effectiveBucket(c) === state.cohortTab);
}

// ── Rendering ─────────────────────────────────────────────────
function el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }

function fmtUSD(n) { return n === 0 ? 'Fully funded' : `$${n.toLocaleString('en-US')}`; }

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
        <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold ${s.workExpMonths > 0 ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600'}">${s.workExpMonths > 0 ? 'Experienced' : 'Fresher'}</span>
        <span class="text-xs text-text-muted">${s.workExpMonths > 0 ? `${s.workExpMonths} mo work exp` : 'No work experience on file'}</span>
        ${s.hasCareerPreference ? `<span class="text-xs text-text-muted">•</span><span class="text-xs text-text-muted">Career pref: <b class="text-text-main font-medium">${s.careerPreference}</b></span>` : `<span class="text-xs text-text-muted">•</span><span class="text-xs text-text-muted italic">No career preference on file</span>`}
        <span class="text-xs text-text-muted">•</span>
        <span class="text-xs text-text-muted">Country: <b class="text-text-main font-medium">${s.country.join(', ')}</b></span>
      </div>
      <div class="text-xs text-text-muted mt-0.5">Requesting: ${s.courseRequirement}</div>
    </div>`;
}

function groupCounts(courses, key) {
  const map = new Map();
  courses.forEach(c => { const k = c[key]; if (!k) return; map.set(k, (map.get(k) || 0) + 1); });
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

// Career-path groups also carry a fabricated match % (there's no real scoring model behind this
// mock data — it's derived from how strong each course's own cohort match is, averaged per path,
// so it's at least grounded in the underlying data rather than arbitrary).
function careerPathGroups(courses) {
  const map = new Map();
  courses.forEach(c => {
    if (!c.careerPath || !c.cohortByCareer) return;
    if (!map.has(c.careerPath)) map.set(c.careerPath, []);
    map.get(c.careerPath).push(c);
  });
  return [...map.entries()]
    .map(([path, list]) => ({ path, count: list.length }))
    .sort((a, b) => b.count - a.count);
}

function pillsRowHtml(label, bodyHtml) {
  return `
    <div>
      <div class="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-1">${label}</div>
      ${bodyHtml}
    </div>`;
}

// Pills are source-aware: "Course requirement" groups by course name, "Career preference" groups
// by the career domain each matched course actually leads to. Display-only for now — not wired
// as a click filter, matching how this row behaved before.
function renderCourseTypePills() {
  const courses = currentCourses();
  const wrap = document.getElementById('courseTypePills');
  if (state.source === 'course') {
    const courseEntries = groupCounts(courses.filter(c => c.cohortByCourse), 'name');
    const body = courseEntries.length === 0
      ? `<div class="text-xs text-text-muted italic">No course-requirement matches for this student.</div>`
      : `<div class="flex items-center gap-2 flex-wrap">${courseEntries.map(([name, count], i) => `
          <span class="pill ${i === 0 ? 'pill-active' : ''}">${name} <span class="opacity-60">(${count})</span></span>
        `).join('')}</div>`;
    wrap.innerHTML = pillsRowHtml('Course type', body);
    return;
  }
  const careerEntries = careerPathGroups(courses.filter(c => c.cohortByCareer));
  const body = careerEntries.length === 0
    ? `<div class="text-xs text-text-muted italic">No career-preference matches to group by domain.</div>`
    : `<div class="flex items-center gap-2 flex-wrap">${careerEntries.map((e, i) => `
        <span class="pill career-pill ${i === 0 ? 'pill-active' : ''}">${e.path} <span class="opacity-60">(${e.count})</span></span>
      `).join('')}</div>`;
  wrap.innerHTML = pillsRowHtml('Career path', body);
}

// Always-required fields still always constrain the search (no Match/F2F-style toggle to turn
// them off) — but they're editable inputs, not read-only locked chips.
function renderAlwaysRequired() {
  const fields = [
    { key: 'country', label: 'Country', type: 'text' },
    { key: 'course', label: 'Course', type: 'text' },
    { key: 'duration', label: 'Duration', type: 'text' },
    { key: 'budget', label: 'Budget (max, $)', type: 'number' },
  ];
  const wrap = document.getElementById('alwaysRequired');
  wrap.innerHTML = fields.map(f => `
    <div class="required-field">
      <label class="text-xs font-medium text-text-muted block mb-1">${f.label} <span class="text-accent-dark">*</span></label>
      <input id="required_${f.key}" type="${f.type}" class="w-full text-sm border border-border rounded-lg px-2.5 py-2 ${f.type === 'number' ? 'font-mono' : ''}" />
    </div>
  `).join('');
  fields.forEach(f => {
    const input = document.getElementById(`required_${f.key}`);
    input.value = state.required[f.key];
    input.oninput = (e) => {
      state.required[f.key] = f.type === 'number' ? (Number(e.target.value) || 0) : e.target.value;
      if (f.key === 'budget') { renderResults(); renderCohortTabs(); }
    };
  });
}

function renderFlexible() {
  const f = state.pendingFlexible;
  document.getElementById('flexSwitch').checked = state.flexibleMode === 'asked';
  document.getElementById('intakeFlex').value = f.intake;
  document.getElementById('backlogs').value = f.backlogs;
  document.getElementById('workExp').value = f.workExp;
  document.getElementById('grade').value = f.grade;
  document.getElementById('categoryFlex').value = f.category;
  const disabled = state.flexibleMode === 'asked';
  ['intakeFlex', 'backlogs', 'workExp', 'grade', 'categoryFlex'].forEach(id => {
    document.getElementById(id).disabled = disabled;
  });
  document.querySelectorAll('#flexPanelBody .flex-field').forEach(elm => elm.classList.toggle('opacity-40', disabled));

  document.getElementById('flexPanelBody').classList.toggle('hidden', !state.flexPanelOpen);
  document.getElementById('flexPanelChevron').classList.toggle('rotate-90', state.flexPanelOpen);
  document.getElementById('flexPanelSummary').textContent = state.flexPanelOpen ? '' : `(${disabled ? 'Student to join F2F' : 'With constraint'})`;

  renderApplyState();
}

function renderApplyState() {
  const disabled = state.flexibleMode === 'asked';
  const dirty = !disabled && JSON.stringify(state.pendingFlexible) !== JSON.stringify(state.flexible);
  const baseNote = disabled
    ? "Set to 'Student to join F2F' — results will ignore intake, backlog, work exp, grade and category cutoffs. Budget still always applies."
    : "Set to 'With constraint' — results are constrained by intake, backlog, work exp, grade and category below. Budget still always applies.";
  const note = document.getElementById('flexNote');
  note.innerHTML = baseNote + (dirty ? ' <b class="text-accent-dark">Unapplied changes — click Apply.</b>' : '');
  const btn = document.getElementById('applyFlexBtn');
  btn.classList.toggle('apply-btn-dirty', dirty);
  btn.disabled = disabled;
}

// CIM holds up to 5 pinned courses/colleges, all added to the shortlist by default. The list is
// collapsed by default — the header shows a live count, and a button expands it to review or
// remove individual entries (with an "Add back" undo, not a permanent delete).
function renderCIM() {
  const s = currentStudent();
  const removedIds = state.cimRemovedIds[s.id] || new Set();
  const activeCount = s.cimList.filter(c => !removedIds.has(c.id)).length;
  const wrap = document.getElementById('cimRow');

  const headerHtml = `
    <button id="cimPanelHeader" type="button" class="w-full flex items-center justify-between gap-3 p-4 cursor-pointer flex-wrap">
      <span class="flex items-center gap-2 flex-wrap">
        <span class="cim-tag">Course in Mind</span>
        <span class="text-sm font-medium text-text-main">${s.cimList.length === 0 ? 'No entries for this student' : `${activeCount} of ${s.cimList.length} added to shortlist by default`}</span>
      </span>
      ${s.cimList.length > 0 ? `<span class="text-xs text-accent-dark font-semibold">${state.cimPanelOpen ? 'Hide list' : 'View list'}</span>` : ''}
    </button>`;

  const bodyHtml = s.cimList.length === 0 ? '' : `
    <div id="cimPanelBody" class="${state.cimPanelOpen ? '' : 'hidden'} px-4 pb-4 space-y-2">
      ${s.cimList.map(cim => {
        const isRemoved = removedIds.has(cim.id);
        return `
        <div class="flex items-center gap-3 border border-border rounded-lg p-2.5 ${isRemoved ? 'opacity-50' : ''}">
          <div class="min-w-0 flex-1">
            <div class="font-medium text-text-main text-sm truncate ${isRemoved ? 'line-through' : ''}">${cim.name}</div>
            <div class="text-xs text-text-muted truncate">${cim.university} · ${cim.country}</div>
          </div>
          <span class="text-xs px-2 py-1 rounded-md ${intakeClasses(cim.intakeStatus)} shrink-0">${cim.intakeStatus}</span>
          ${isRemoved
            ? `<button class="cim-restore text-accent font-medium text-xs hover:underline cursor-pointer shrink-0" data-cim-id="${cim.id}">Add back</button>`
            : `<button class="cim-remove text-text-muted hover:text-rose-600 cursor-pointer p-1 shrink-0" data-cim-id="${cim.id}" title="Remove from shortlist"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M6 6l12 12M18 6L6 18"/></svg></button>`}
        </div>`;
      }).join('')}
    </div>`;

  wrap.innerHTML = headerHtml + bodyHtml;

  if (s.cimList.length > 0) {
    document.getElementById('cimPanelHeader').onclick = () => { state.cimPanelOpen = !state.cimPanelOpen; renderCIM(); };
    wrap.querySelectorAll('.cim-remove, .cim-restore').forEach(b => {
      b.onclick = (e) => {
        e.stopPropagation();
        const id = b.dataset.cimId;
        if (!state.cimRemovedIds[s.id]) state.cimRemovedIds[s.id] = new Set();
        if (b.classList.contains('cim-remove')) state.cimRemovedIds[s.id].add(id);
        else state.cimRemovedIds[s.id].delete(id);
        renderAll();
      };
    });
  }
}

const SOURCE_LABELS = { course: 'Course requirement', career: 'Career preference' };

function sourceOrder(student) {
  // Fresher: course requirement first. Experienced: career preference first.
  return student.workExpMonths > 0 ? ['career', 'course'] : ['course', 'career'];
}

function renderSourceSelector() {
  const s = currentStudent();
  const wrap = document.getElementById('sourceSelector');
  wrap.innerHTML = sourceOrder(s).map(key => `
    <button class="seg-btn ${state.source === key ? 'seg-active' : ''}" data-source="${key}" type="button">${SOURCE_LABELS[key]}</button>
  `).join('');
  wrap.querySelectorAll('button').forEach(b => {
    b.onclick = () => {
      state.source = b.dataset.source;
      state.sourceIsManual = true;
      state.cohortTab = 'all'; // tab vocabulary differs between career (Good/High Match) and course/both (Exact/Related/...)
      renderAll();
    };
  });
  const caption = document.getElementById('sourceCaption');
  if (state.sourceIsManual) {
    caption.textContent = `Manually set to ${SOURCE_LABELS[state.source]}.`;
  } else {
    caption.textContent = computeDefaultSource(s).reason;
  }
}

function renderCohortTabs() {
  const rawPool = getFilteredPool();
  const wrap = document.getElementById('cohortTabs');
  const relaxedWrap = document.getElementById('relaxedToggleWrap');

  if (state.source === 'career') {
    // Career mode: Good Match / High Match instead of Exact/Related/Similar/Partial — that
    // vocabulary describes structural closeness to a course ask, which doesn't map cleanly to
    // career fit. No "relaxed" concept here, so that toggle row stays hidden.
    let high = 0, good = 0;
    rawPool.forEach(c => { if (careerMatchPercent(c) >= CAREER_HIGH_MATCH_THRESHOLD) high++; else good++; });
    const tabs = [['all', 'All', rawPool.length], ['good', 'Good Match', good], ['high', 'High Match', high]];
    wrap.innerHTML = tabs.map(([key, label, count]) => `
      <button class="cohort-tab ${state.cohortTab === key ? 'cohort-tab-active' : ''}" data-cohort="${key}" type="button">
        ${label} <span class="opacity-60">(${count})</span>
      </button>
    `).join('');
    wrap.querySelectorAll('button').forEach(b => b.onclick = () => { state.cohortTab = b.dataset.cohort; renderAll(); });
    relaxedWrap.classList.add('hidden');
    relaxedWrap.innerHTML = '';
    return;
  }

  // Course requirement / Both: unchanged Exact/Related/Similar/Partial Match tabs.
  const counts = cohortCounts(rawPool);
  const tabs = [['all', 'All', counts.all], ...BASE_TAB_ORDER.map(k => [k, COHORT_LABEL[k], counts[k]])];
  wrap.innerHTML = tabs.map(([key, label, count]) => `
    <button class="cohort-tab ${state.cohortTab === key ? 'cohort-tab-active' : ''}" data-cohort="${key}" type="button">
      ${label} <span class="opacity-60">(${count})</span>
    </button>
  `).join('');
  wrap.querySelectorAll('button').forEach(b => b.onclick = () => { state.cohortTab = b.dataset.cohort; renderAll(); });

  // Inline "Relaxed" modifier — only relevant when Similar or Partial Match is the active tab.
  // Each bucket has its own independent relaxed flag, so turning it on here also grows "All" above.
  const sibling = RELAXED_SIBLING[state.cohortTab];
  if (sibling) {
    const extra = rawPool.filter(c => c._cohort === sibling).length;
    const bucketKey = state.cohortTab; // 'similar' | 'partial'
    relaxedWrap.classList.remove('hidden');
    relaxedWrap.innerHTML = `
      <label class="inline-flex items-center gap-2 text-xs text-text-muted cursor-pointer select-none">
        <input type="checkbox" id="relaxedToggle" class="pretty w-3.5 h-3.5 cursor-pointer" ${state.relaxedIncluded[bucketKey] ? 'checked' : ''} />
        Include relaxed criteria (${COHORT_LABEL[sibling]})${extra > 0 ? ` — <span class="text-accent-dark font-medium">${extra} additional course${extra === 1 ? '' : 's'} available</span>` : ' — <span class="opacity-60">no additional courses available</span>'}
      </label>`;
    document.getElementById('relaxedToggle').onchange = (e) => { state.relaxedIncluded[bucketKey] = e.target.checked; renderAll(); };
  } else {
    relaxedWrap.classList.add('hidden');
    relaxedWrap.innerHTML = '';
  }
}

function accordionSection(key, title, countLabel, bodyHtml) {
  const open = state.sidebarOpen[key];
  return `
    <div class="border-b border-border last:border-b-0 py-1">
      <button class="filter-accordion-header" data-filter-key="${key}" type="button">
        <span>${title}${countLabel != null ? ` <span class="opacity-60 font-normal">(${countLabel})</span>` : ''}</span>
        <svg class="filter-chevron ${open ? 'rotate-180' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg>
      </button>
      <div class="${open ? '' : 'hidden'} pb-3 pt-1">${bodyHtml}</div>
    </div>`;
}

function renderSidebar() {
  const countries = [...new Set(currentCourses().map(c => c.country))];

  const countryBody = `
    <div class="flex flex-wrap gap-1.5">
      <button class="pill ${!state.countryFilter ? 'pill-active' : ''}" data-country="">All countries</button>
      ${countries.map(c => `<button class="pill ${state.countryFilter === c ? 'pill-active' : ''}" data-country="${c}">${c}</button>`).join('')}
    </div>`;

  const otherBody = `
    <label class="flex items-center gap-2 text-sm cursor-pointer mb-2">
      <input type="checkbox" id="partneredOnly" class="pretty w-4 h-4 cursor-pointer" ${state.partneredOnly ? 'checked' : ''} />
      Free Service Courses
    </label>
    <label class="flex items-center gap-2 text-sm cursor-pointer">
      <input type="checkbox" id="scholarshipOnly" class="pretty w-4 h-4 cursor-pointer" ${state.scholarshipOnly ? 'checked' : ''} />
      With Scholarships
    </label>`;

  const wrap = document.getElementById('filterAccordion');
  wrap.innerHTML = [
    accordionSection('country', 'Country', null, countryBody),
    accordionSection('other', 'Other preferences', null, otherBody),
  ].join('');

  wrap.querySelectorAll('.filter-accordion-header').forEach(b => {
    b.onclick = () => { const k = b.dataset.filterKey; state.sidebarOpen[k] = !state.sidebarOpen[k]; renderSidebar(); };
  });
  wrap.querySelectorAll('[data-country]').forEach(b => b.onclick = () => { state.countryFilter = b.dataset.country || null; renderAll(); });

  const partneredCb = document.getElementById('partneredOnly');
  if (partneredCb) partneredCb.onchange = (e) => { state.partneredOnly = e.target.checked; renderAll(); };
  const scholarshipCb = document.getElementById('scholarshipOnly');
  if (scholarshipCb) scholarshipCb.onchange = (e) => { state.scholarshipOnly = e.target.checked; renderAll(); };

  // Global Search lives outside the accordion (static in HTML) so it never gets torn down and
  // rebuilt mid-keystroke — that would steal focus/cursor position every time.
  const globalSearchInput = document.getElementById('globalSearch');
  if (globalSearchInput) {
    globalSearchInput.value = state.globalSearch;
    globalSearchInput.oninput = (e) => { state.globalSearch = e.target.value; renderResults(); renderCohortTabs(); };
  }
}

function cohortBadgeLabel(course) {
  if (state.source === 'career') {
    const pct = careerMatchPercent(course);
    return pct >= CAREER_HIGH_MATCH_THRESHOLD ? `High Match (${pct}%)` : `Good Match (${pct}%)`;
  }
  return COHORT_LABEL[course._cohort];
}

// Deterministic placeholder logo (no real brand assets available in this prototype) — same
// university always gets the same letter + color, so it reads as a stable identity, not noise.
const LOGO_COLORS = ['#4338CA', '#0369A1', '#B45309', '#15803D', '#BE185D', '#5B21B6', '#0F766E', '#9D174D'];
function universityLogoHtml(university) {
  let hash = 0;
  for (let i = 0; i < university.length; i++) hash = (hash * 31 + university.charCodeAt(i)) >>> 0;
  const color = LOGO_COLORS[hash % LOGO_COLORS.length];
  return `<div class="uni-logo" style="background:${color}">${university.charAt(0).toUpperCase()}</div>`;
}

function courseCard(course) {
  const inShortlist = state.shortlist.has(course.id);
  const outcomeHtml = (state.source === 'career' && course.careerPath) ? `<div class="outcome-tag">→ ${course.careerPath}</div>` : '';
  return `
    <div class="course-card-sm ${inShortlist ? 'course-card-selected' : ''}" data-id="${course.id}">
      <div class="flex items-start justify-between gap-2">
        <div class="flex items-center gap-1 flex-wrap min-w-0">
          <span class="cohort-badge">${cohortBadgeLabel(course)}</span>
        </div>
        <label class="course-check shrink-0">
          <input type="checkbox" data-id="${course.id}" ${inShortlist ? 'checked' : ''} />
          <span></span>
        </label>
      </div>
      <div class="flex items-center gap-1.5 mt-1.5 min-w-0">
        ${universityLogoHtml(course.university)}
        <div class="min-w-0">
          <div class="font-semibold text-[13px] text-text-main leading-snug truncate" title="${course.name}">${course.name}</div>
          <div class="text-[11px] text-text-muted truncate">${course.university} · ${course.country}</div>
        </div>
      </div>
      ${outcomeHtml}
      <div class="flex items-center justify-between mt-1.5 gap-1">
        <span class="px-1.5 py-0.5 rounded text-[10px] font-medium ${intakeClasses(course.intakeStatus)}">${course.intakeStatus}</span>
        <span class="px-1.5 py-0.5 rounded text-[10px] font-medium ${course.partnered ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600'}">${course.partnered ? 'Free Service' : 'Paid Service'}</span>
        <span class="text-[10px] text-text-muted font-mono ml-auto">QS #${course.qsRank}</span>
      </div>
      <div class="flex items-center justify-between mt-1 text-[11px] font-mono">
        <span class="text-text-main font-semibold">${fmtUSD(course.tuitionFeeUSD)}</span>
        <span class="text-text-muted">${course.durationMonths} mo${course.scholarshipCount > 0 ? ` · ${course.scholarshipCount} scholarship${course.scholarshipCount === 1 ? '' : 's'}` : ''}</span>
      </div>
    </div>`;
}

function emptyStateHtml() {
  if (state.flexibleMode === 'asked') {
    return emptyBlock("No exact matches found. Try 'With constraint' instead.");
  }
  if (state.source === 'career' && !currentStudent().hasCareerPreference) {
    return emptyBlock("No courses match this student's career preference with current filters. Try 'Course requirement', or adjust filters.");
  }
  if (state.source === 'career') {
    const rawCareerPool = currentCourses().filter(c => c.cohortByCareer);
    if (rawCareerPool.length === 0) {
      return emptyBlock("No courses match this student's career preference with current filters. Try 'Course requirement', or adjust filters.");
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
  const removedIds = state.cimRemovedIds[s.id] || new Set();
  const cimActiveCount = s.cimList.filter(c => !removedIds.has(c.id)).length;
  document.getElementById('bookmarkCount').textContent = state.shortlist.size + cimActiveCount;
}

function renderDrawer() {
  const s = currentStudent();
  const removedIds = state.cimRemovedIds[s.id] || new Set();
  const activeCim = s.cimList.filter(c => !removedIds.has(c.id));
  const shortlistedCourses = currentCourses().filter(c => state.shortlist.has(c.id));
  const wrap = document.getElementById('drawerList');
  const rows = [];
  activeCim.forEach(cim => {
    rows.push(`
      <div class="drawer-item">
        <div class="min-w-0">
          <span class="cim-tag mb-1 inline-block">CIM</span>
          <div class="font-medium text-sm text-text-main truncate">${cim.name}</div>
          <div class="text-xs text-text-muted truncate">${cim.university}</div>
        </div>
        <button class="text-text-muted hover:text-rose-600 cursor-pointer p-1 shrink-0" data-remove="cim:${cim.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>`);
  });
  shortlistedCourses.forEach(c => {
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
      if (id.startsWith('cim:')) {
        if (!state.cimRemovedIds[s.id]) state.cimRemovedIds[s.id] = new Set();
        state.cimRemovedIds[s.id].add(id.slice(4));
      } else {
        state.shortlist.delete(id);
      }
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

  document.getElementById('flexPanelHeader').addEventListener('click', () => {
    state.flexPanelOpen = !state.flexPanelOpen;
    renderFlexible();
  });

  document.getElementById('flexSwitch').addEventListener('change', (e) => {
    state.flexibleMode = e.target.checked ? 'asked' : 'availability';
    renderAll();
  });

  ['backlogs', 'workExp', 'grade'].forEach(id => {
    document.getElementById(id).addEventListener('input', (e) => {
      state.pendingFlexible[id] = Number(e.target.value) || 0;
      renderApplyState();
    });
  });

  document.getElementById('intakeFlex').addEventListener('change', (e) => {
    state.pendingFlexible.intake = e.target.value;
    renderApplyState();
  });

  document.getElementById('categoryFlex').addEventListener('change', (e) => {
    state.pendingFlexible.category = e.target.value;
    renderApplyState();
  });

  document.getElementById('applyFlexBtn').addEventListener('click', () => {
    state.flexible = { ...state.pendingFlexible };
    renderResults();
    renderCohortTabs();
    renderApplyState();
  });

  // Course/university search is Apply-gated too, kept as its own separate box from the sidebar
  // college search per the "keep them separate" decision.
  document.getElementById('courseSearch').addEventListener('input', (e) => {
    state.pendingCourseSearch = e.target.value;
    const dirty = state.pendingCourseSearch !== state.courseSearch;
    document.getElementById('applySearchBtn').classList.toggle('apply-btn-dirty', dirty);
  });
  document.getElementById('applySearchBtn').addEventListener('click', () => {
    state.courseSearch = state.pendingCourseSearch;
    document.getElementById('applySearchBtn').classList.remove('apply-btn-dirty');
    renderResults();
    renderCohortTabs();
  });

  document.getElementById('viewBookmarksBtn').addEventListener('click', () => document.getElementById('drawer').classList.add('drawer-open'));
  document.getElementById('drawerCloseBtn').addEventListener('click', () => document.getElementById('drawer').classList.remove('drawer-open'));
  document.getElementById('drawerBackdrop').addEventListener('click', () => document.getElementById('drawer').classList.remove('drawer-open'));
  document.getElementById('sendShortlistBtn').addEventListener('click', () => {
    const toast = document.getElementById('toast');
    toast.classList.add('toast-show');
    setTimeout(() => toast.classList.remove('toast-show'), 2600);
  });

  renderAll();
});
