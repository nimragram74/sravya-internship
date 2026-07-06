// The full 8-week "AI Product Builder Internship" curriculum, structured for the app.
// Each week has 7 days. Each day carries what to LEARN (with the exact links) and
// what to DO (a lab with a "Done when" check) — mirroring the original workbook.

export const meta = {
  title: 'The AI Product Builder Internship',
  subtitle:
    'An 8-week, step-by-step path that turns 2nd-year CSE subjects into a real, deployed, AI-powered web app — one hour a day.',
  cohort: 'MGIT · B.Tech CSE · Semester III',
  pace: '1 hr / weekday · 2 hrs / weekend day (~9 hrs/week · ~72 hrs total)',
  totalDays: 56,
}

// Ground rules — learn with AI, don't hide behind it.
export const groundRules = [
  { title: 'Write your answer first', text: 'Before asking AI, jot down what YOU think. Then compare. The gap is the lesson.' },
  { title: "Never ship code you can't explain", text: "If you can't explain a line the AI wrote, ask 'explain this line' until you can." },
  { title: "Type it, don't paste it", text: 'Re-type AI code by hand at least once a week — understanding lives in your fingers too.' },
  { title: 'Cross-check facts', text: 'For any rule, syntax, or security tip, verify with a second source. AI can be confidently wrong.' },
  { title: "Do the 'done when' check", text: "A day isn't finished until the lab's 'Done when' box is true. No half-days." },
  { title: 'One commit a day', text: 'Push something to GitHub every single day. Small and working beats big and broken.' },
]

// Semester III subjects → internship weeks.
export const syllabusMap = [
  { code: 'CS303PC', subject: 'Object Oriented Programming through Java (+ Lab)', where: 'Weeks 1–2 — full Java + OOP, hands-on daily' },
  { code: 'CS304PC', subject: 'Software Engineering (+ Lab)', where: 'Week 3 — SDLC, requirements, UML, Git, JUnit' },
  { code: 'CS305PC', subject: 'Database Management Systems (+ Lab)', where: 'Week 4 — ER design, SQL (SQLBolt), normalization' },
  { code: 'CS354SD', subject: 'Node JS / React JS / Django', where: 'Weeks 5–7 — backend API + React frontend, connected' },
  { code: 'MS301HS', subject: 'Innovation & Entrepreneurship', where: 'Weeks 3 & 8 — pick the product, then pitch it' },
  { code: 'CS301PC', subject: 'Discrete Mathematics', where: 'Woven in — logic (1.4), relations (4.7)' },
  { code: 'CS302PC', subject: 'Computer Organization & Architecture', where: 'Woven in — what runs your code (1.1, 8.4)' },
  { code: 'VA301BS', subject: 'Environmental Science', where: 'Optional theme — a green / social product idea' },
]

// One-time tool setup.
export const tools = [
  { name: 'Claude & ChatGPT', role: 'AI tutor + second opinion', steps: ["Go to claude.ai and chatgpt.com and create free accounts (use the same email you'll use for GitHub).", "Bookmark both. That's it — no install."] },
  { name: 'Java (JDK 21)', role: 'Run Java programs', steps: ['Download Eclipse Temurin JDK 21 (LTS) from Adoptium for your OS.', "Run the installer; tick 'Add to PATH' and 'Set JAVA_HOME'.", 'Verify: run  java -version  → it should print 21.'] },
  { name: 'IntelliJ IDEA Community', role: 'Write & run Java', steps: ['Download IntelliJ IDEA — the free Community Edition (not Ultimate).', 'Install with default options.', 'First launch → New Project → Java → it should auto-detect JDK 21.'] },
  { name: 'Git + GitHub', role: 'Save code & portfolio', steps: ['Install Git from git-scm.com; verify  git --version.', 'Set identity: git config --global user.name / user.email.', 'Create a github.com account; apply for the free Student Developer Pack.'] },
  { name: 'Node.js (LTS)', role: 'Backend + React', steps: ['Download the LTS version from nodejs.org and install.', 'Verify:  node -v  and  npm -v  both print a version.', 'npm comes bundled — no separate install.'] },
  { name: 'VS Code or Cursor', role: 'Editor for JS/React', steps: ['Install VS Code (free) OR Cursor (AI-native, free tier).', "Add 'Thunder Client' to test APIs — or install Postman.", 'IntelliJ for Java; VS Code/Cursor for the web parts.'] },
  { name: 'Supabase', role: 'Postgres, no install', steps: ['Sign up at supabase.com (free tier); create a New Project.', 'Open the SQL Editor to run SQL; the Table Editor shows data.', 'Connection string: Project Settings → Database.'] },
  { name: 'n8n · Vercel · Render', role: 'Automation + deploy (Weeks 6 & 8)', steps: ['n8n: run  npx n8n  locally, or use the free Cloud trial.', 'Make free accounts on vercel.com + render.com; connect GitHub in Week 8.', "No setup needed until those weeks — just know they're free."] },
]

// Copy-paste prompt starters.
export const promptLibrary = [
  { when: 'Learn a concept', prompt: 'Explain <topic> to a 2nd-year student simply, with one analogy, then give me a 3-question quiz.' },
  { when: 'Debug', prompt: "Here's my code and the exact error. Don't fix it — explain what's wrong and why, then tell me how I'd fix it." },
  { when: 'Review my code', prompt: 'Review this for correctness, clarity, and security. List issues but let me fix them. Readability /10?' },
  { when: 'Sharpen the product', prompt: "Here's my idea + user stories. Be a tough PM: what's unclear, missing, or should be cut for v1?" },
  { when: "Explain AI's own code", prompt: 'You wrote this — explain it line by line as if teaching me, and name one thing that could break.' },
  { when: 'Plan the day', prompt: 'I want to build <feature> in about an hour. Give me the smallest ordered steps and where to start.' },
]

// Product-idea starters (pick one in Week 3).
export const productIdeas = [
  { theme: 'Green / social', ideas: 'Food-waste sharing board · campus carpool matcher · e-waste / recycling finder · sustainable-habits tracker · student second-hand marketplace' },
  { theme: 'Campus & community', ideas: 'Lost-and-found board · study-group / skill-swap matcher · club-events hub · peer notes exchange · hostel maintenance requests' },
  { theme: 'Personal productivity', ideas: 'Smart to-do / task manager · habit tracker · roommate expense splitter · study-time logger' },
  { theme: 'Small business', ideas: 'Booking / appointment system · inventory tracker · menu-and-order app for a local shop · feedback collector' },
]

// Helper to keep the data below terse. L = a learn step, optionally with a link.
const L = (text, linkLabel, link) => ({ text, linkLabel, link })

export const weeks = [
  {
    num: 1,
    code: 'CS303PC — Java setup & basics',
    title: 'Object Oriented Programming through Java',
    goal: 'Set up every tool, learn to use AI honestly, and get comfortable writing and running basic Java.',
    days: [
      {
        id: '1.1', dow: 'Mon', mins: 60, focus: 'Meet your AI tutors + the rules for using them well',
        learn: [
          L('Create free accounts on Claude and ChatGPT.', 'claude.ai', 'https://claude.ai'),
          L("Read IBM's 'What are large language models' — just the first two sections.", 'IBM: what are LLMs', 'https://www.ibm.com/topics/large-language-models'),
          L('Read the 6 Ground Rules and write each in your own words.'),
        ],
        lab: { title: 'AI face-off log', steps: ["Ask BOTH AIs: (a) 'What is polymorphism in Java?' (b) 'Java or Python for a beginner?' (c) 'Write Java code to check if a number is prime.'", 'Paste all answers into a file day1-notes.md.', 'Under each, write one line: where did the two AIs agree or differ?'], doneWhen: "day1-notes.md contains all 3 questions, both AIs' answers, and your comparison notes." },
        tools: ['Claude', 'ChatGPT'],
      },
      {
        id: '1.2', dow: 'Tue', mins: 60, focus: 'Install Java + run your first program',
        learn: [
          L('Install the JDK (Temurin 21).', 'Adoptium (Temurin JDK 21)', 'https://adoptium.net/temurin/releases/'),
          L('Install IntelliJ IDEA Community Edition.', 'IntelliJ IDEA Community', 'https://www.jetbrains.com/idea/download/'),
          L('Verify in a terminal: run  java -version  and confirm it says 21.'),
        ],
        lab: { title: 'Hello, Java', steps: ['In IntelliJ create a new Java project.', 'Make a class Hello with a main method that prints your name and today\'s date.', 'Click the green ▶ to run it.'], doneWhen: 'The Run window shows your name and date with no errors.' },
        tools: ['IntelliJ', 'JDK'],
      },
      {
        id: '1.3', dow: 'Wed', mins: 60, focus: 'Variables, types & printing',
        learn: [
          L('W3Schools Java — Syntax, Comments, Variables, Data Types, Type Casting. RUN each example.', 'W3Schools Java', 'https://www.w3schools.com/java/'),
          L("Re-type (don't copy) 3 of the examples yourself in IntelliJ."),
        ],
        lab: { title: 'About-me in code', steps: ['Declare: String name, int age, double height, boolean isStudent, char grade — with real values.', 'Print one full sentence that uses all 5 variables (join with +).', 'Add a one-line comment above each variable.'], doneWhen: 'Program prints a sentence built from all 5 variables.' },
        tools: ['IntelliJ'],
      },
      {
        id: '1.4', dow: 'Thu', mins: 60, focus: 'Decisions — operators & conditionals (+ discrete-math logic)',
        learn: [
          L('W3Schools Java — Operators, Booleans, If...Else, Switch. Run each example.', 'W3Schools Java', 'https://www.w3schools.com/java/'),
          L('Discrete-math tie-in: match truth tables for AND / OR / NOT to && || ! in Java.'),
        ],
        lab: { title: 'Grade classifier', steps: ['Hard-code a score 0–100.', 'Use if / else-if: A (>=90), B (>=75), C (>=50), Fail (<50).', "Print 'Pass' or 'Fail' using one boolean expression.", 'Rewrite the grade decision using a switch on the grade letter.'], doneWhen: 'For any score, the grade, pass/fail, and switch version all print correctly.' },
        tools: ['IntelliJ'],
      },
      {
        id: '1.5', dow: 'Fri', mins: 60, focus: 'Repetition — loops',
        learn: [
          L('W3Schools Java — For Loop, While Loop, Break/Continue. Re-type the nested-loop one.', 'W3Schools Java', 'https://www.w3schools.com/java/'),
        ],
        lab: { title: 'Loops workout', steps: ['Print 1 to 100 and their total sum with a for-loop.', 'Print a multiplication table (1–10) for a chosen number.', "On CodingBat → Warmup-2, solve any 3 problems (aim for green 'All Correct')."], doneWhen: 'Both console tasks run, and 3 CodingBat problems pass.' },
        tools: ['IntelliJ', 'CodingBat'],
      },
      {
        id: '1.6', dow: 'Sat', mins: 120, focus: 'Arrays & methods (your first reusable code)',
        learn: [
          L('W3Schools Java — Arrays, Methods, Method Parameters, Method Overloading.', 'W3Schools Java', 'https://www.w3schools.com/java/'),
          L('On CodingBat → Array-1, solve any 4 problems.', 'CodingBat Java', 'https://codingbat.com/java'),
        ],
        lab: { title: 'Array stats toolkit', steps: ['Create an int array of 10 numbers.', 'Write three methods: max(arr), min(arr), average(arr).', 'Call all three and print the results.', 'Add an OVERLOADED average(a, b, c) that averages 3 ints.'], doneWhen: 'All three methods return correct values and the overloaded average works.' },
        tools: ['IntelliJ', 'CodingBat', 'Claude'],
      },
      {
        id: '1.7', dow: 'Sun', mins: 120, focus: 'Ship it — first project + Git',
        learn: [
          L('Install Git; set your name/email; verify  git --version.', 'Git downloads', 'https://git-scm.com/downloads'),
          L('Create a GitHub account and apply for the Student Pack.', 'GitHub Student Pack', 'https://education.github.com/pack'),
          L('Learn 4 commands: git init, git add ., git commit -m, git push (steps 1–4).', 'GitHub Hello-World guide', 'https://docs.github.com/en/get-started/quickstart/hello-world'),
        ],
        lab: { title: 'Number-guessing game + first push', steps: ["Build a console game: random 1–100; read guesses with Scanner; print 'higher/lower' until correct; count attempts.", 'Create a GitHub repo named  ai-product-internship.', 'Put your code in a  week-1  folder with a short README.', 'git add / commit / push.'], doneWhen: 'The game runs, and the week-1 folder is visible on github.com.' },
        tools: ['IntelliJ', 'Git', 'GitHub'],
      },
    ],
  },
  {
    num: 2,
    code: 'CS303PC — Object-oriented programming',
    title: 'Object Oriented Programming through Java',
    goal: 'Master the heart of the OOPJ syllabus: classes, encapsulation, inheritance, polymorphism, interfaces — one concept per day, built by hand.',
    days: [
      {
        id: '2.1', dow: 'Mon', mins: 60, focus: 'Classes & objects',
        learn: [
          L('W3Schools Java — OOP intro, Classes and Objects, Class Attributes, Class Methods.', 'W3Schools Java', 'https://www.w3schools.com/java/'),
          L("Programiz 'Java Class and Objects' — read and run the example.", 'Programiz Java', 'https://www.programiz.com/java-programming'),
        ],
        lab: { title: 'Student class', steps: ['Create class Student with fields: name, rollNo, marks.', 'Add a method displayInfo() that prints them.', 'In main, create 2 Student objects and display both.'], doneWhen: "Two students' details print correctly." },
        tools: ['IntelliJ'],
      },
      {
        id: '2.2', dow: 'Tue', mins: 60, focus: 'Constructors & encapsulation',
        learn: [
          L('W3Schools Java — Constructors, Modifiers, Encapsulation. Run examples.', 'W3Schools Java', 'https://www.w3schools.com/java/'),
          L('Rule to apply: make fields private, expose getters/setters.'),
        ],
        lab: { title: 'BankAccount (safe)', steps: ['Class BankAccount with PRIVATE balance and owner.', 'Constructor sets owner + opening balance.', 'deposit(amt) and withdraw(amt) — reject negative amounts and overdrafts.', 'Add a getBalance() getter.'], doneWhen: 'Deposits/withdrawals update the balance; invalid operations are refused.' },
        tools: ['IntelliJ'],
      },
      {
        id: '2.3', dow: 'Wed', mins: 60, focus: "Many objects + the 'this' keyword",
        learn: [
          L("W3Schools Java — 'this' Keyword; revisit Arrays for arrays of objects.", 'W3Schools Java', 'https://www.w3schools.com/java/'),
        ],
        lab: { title: 'Mini bank', steps: ['Create an array (or ArrayList) of 3 BankAccount objects.', 'Loop through and deposit a different amount into each.', "Print every account's balance."], doneWhen: 'Three accounts are created, updated in a loop, and printed.' },
        tools: ['IntelliJ'],
      },
      {
        id: '2.4', dow: 'Thu', mins: 60, focus: 'Inheritance',
        learn: [
          L('W3Schools Java — Inheritance and the super keyword. Run the example.', 'W3Schools Java', 'https://www.w3schools.com/java/'),
        ],
        lab: { title: 'SavingsAccount', steps: ['Create SavingsAccount extends BankAccount.', 'Add interestRate and a method addInterest() that increases the balance.', 'Call super(...) in the constructor.', 'Test it in main.'], doneWhen: 'SavingsAccount inherits deposit/withdraw AND adds interest correctly.' },
        tools: ['IntelliJ'],
      },
      {
        id: '2.5', dow: 'Fri', mins: 60, focus: 'Polymorphism',
        learn: [
          L('W3Schools Java — Polymorphism and Method Overriding.', 'W3Schools Java', 'https://www.w3schools.com/java/'),
          L('Note: overriding (same signature, subclass) vs overloading (same name, different params).'),
        ],
        lab: { title: 'Speak up (polymorphism)', steps: ["Add method accountType() to BankAccount returning 'Generic'.", 'Override it in SavingsAccount and a new CurrentAccount.', 'Put all objects in a BankAccount[] and loop calling accountType().'], doneWhen: 'One loop, one method call, different outputs per subclass.' },
        tools: ['IntelliJ'],
      },
      {
        id: '2.6', dow: 'Sat', mins: 120, focus: 'Abstraction & interfaces',
        learn: [
          L('W3Schools Java — Abstract Classes and Interfaces. Run the examples.', 'W3Schools Java', 'https://www.w3schools.com/java/'),
        ],
        lab: { title: 'Shapes (interface)', steps: ['Interface Shape with methods area() and perimeter().', 'Circle and Rectangle implement Shape.', "Store them in a Shape[] and print each shape's area and perimeter.", 'Ask Claude to review your interface design — then improve one thing.'], doneWhen: 'Both shapes compute area + perimeter through the interface.' },
        tools: ['IntelliJ', 'Claude'],
      },
      {
        id: '2.7', dow: 'Sun', mins: 120, focus: 'OOP mini-project',
        learn: [
          L('Plan first: on paper, list your classes, their fields, and methods.'),
          L("Paste the plan to Claude and ask 'is this a good OO design? what would you change?'"),
        ],
        lab: { title: 'Library Management (console)', steps: ['Classes: Book (title, author, isAvailable), Member (name, id), Library (addBook, issueBook, returnBook, listBooks).', 'Menu-driven main: add / issue / return / list books.', 'Use encapsulation + at least one inheritance OR interface.', 'Write a README and push to a week-2 folder.'], doneWhen: 'The menu app performs all operations and is pushed to GitHub.' },
        tools: ['IntelliJ', 'GitHub', 'Claude'],
      },
    ],
  },
  {
    num: 3,
    code: 'CS304PC + MS301HS — Software engineering & the product',
    title: 'Software Engineering + Innovation & Entrepreneurship',
    goal: 'Learn how real software is planned — and choose the product she\'ll build across Weeks 4–8.',
    days: [
      {
        id: '3.1', dow: 'Mon', mins: 60, focus: 'SDLC + find a real problem',
        learn: [
          L("GfG 'Software Development Life Cycle (SDLC)' — read the phases.", 'GfG: SDLC', 'https://www.geeksforgeeks.org/software-development-life-cycle-sdlc/'),
          L("Atlassian 'Agile' — read the opening 'What is Agile?' section.", 'Atlassian: Agile', 'https://www.atlassian.com/agile'),
        ],
        lab: { title: 'Find the problem', steps: ['In idea.md, list 5 real problems you or people around you face (bonus: 1 green/social).', 'Pick ONE.', 'Write: who has this problem, and your one-line solution.'], doneWhen: 'idea.md has 5 problems, one chosen, and a one-line solution.' },
        tools: ['Claude', 'ChatGPT'],
      },
      {
        id: '3.2', dow: 'Tue', mins: 60, focus: 'User stories',
        learn: [
          L("Atlassian 'User stories' — read the format and the examples.", 'Atlassian: user stories', 'https://www.atlassian.com/agile/project-management/user-stories'),
        ],
        lab: { title: 'Write user stories', steps: ["Write 8 user stories: 'As a __, I want __, so that __.'", "Ask Claude 'what user needs am I missing?'", 'Add 2 more stories based on the feedback.'], doneWhen: 'requirements.md holds 10 well-formed user stories.' },
        tools: ['Claude'],
      },
      {
        id: '3.3', dow: 'Wed', mins: 60, focus: 'Requirements & MVP scope',
        learn: [
          L("GfG 'SRS' — read functional vs non-functional requirements.", 'GfG: SRS', 'https://www.geeksforgeeks.org/software-requirement-specification-srs-format/'),
          L("GfG 'MVP' — read what a minimum viable product is.", 'GfG: MVP', 'https://www.geeksforgeeks.org/minimum-viable-product-mvp/'),
        ],
        lab: { title: 'Scope the MVP', steps: ['From your stories, write a functional and non-functional requirements list.', 'Tag each story must-have or nice-to-have.', "Circle the 3–5 must-haves — that's your MVP."], doneWhen: 'A clear MVP (3–5 must-have features) is written down.' },
        tools: ['Claude'],
      },
      {
        id: '3.4', dow: 'Thu', mins: 60, focus: 'UML — use-case diagram',
        learn: [
          L("GfG 'Use Case Diagram' — read the symbols (actor, use case, system boundary).", 'GfG: use-case diagram', 'https://www.geeksforgeeks.org/use-case-diagram/'),
          L('Open draw.io in the browser (no install).', 'draw.io', 'https://app.diagrams.net/'),
        ],
        lab: { title: 'Use-case diagram', steps: ['List your actors (e.g. User, Admin).', 'Draw a use-case diagram for your MVP in draw.io.', 'Export as PNG into your repo.'], doneWhen: 'A use-case diagram PNG showing actors and main use cases.' },
        tools: ['draw.io'],
      },
      {
        id: '3.5', dow: 'Fri', mins: 60, focus: 'UML — class diagram + architecture',
        learn: [
          L("GfG 'Class Diagram' — read classes, attributes, and relationships.", 'GfG: class diagram', 'https://www.geeksforgeeks.org/class-diagram-unified-modeling-language-uml/'),
        ],
        lab: { title: 'Design the system', steps: ["Draw a class diagram for your product's main entities (fields + relationships).", 'Sketch the architecture: Frontend (React) → Backend (API) → Database.', 'Export both images to the repo.'], doneWhen: 'Class diagram + architecture sketch are saved.' },
        tools: ['draw.io'],
      },
      {
        id: '3.6', dow: 'Sat', mins: 120, focus: 'Professional Git workflow + kanban',
        learn: [
          L("Atlassian 'Using branches' — read create / switch / merge.", 'Atlassian: using branches', 'https://www.atlassian.com/git/tutorials/using-branches'),
          L('GitHub Projects quickstart — read how to create a board.', 'GitHub Projects docs', 'https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/quickstart-for-projects'),
        ],
        lab: { title: 'Pro workflow', steps: ['Make your product folder a clean repo with a README.', 'Create a GitHub Project board: To do / Doing / Done.', 'Add your user stories as cards.', 'Practice: branch, edit README, commit, open a Pull Request, merge it.'], doneWhen: 'A kanban board holds your backlog and one PR is merged.' },
        tools: ['Git', 'GitHub'],
      },
      {
        id: '3.7', dow: 'Sun', mins: 120, focus: 'Testing (JUnit) + consolidate the plan',
        learn: [
          L("JUnit 5 'Writing Tests' — read @Test and assertEquals.", 'JUnit 5: writing tests', 'https://junit.org/junit5/docs/current/user-guide/#writing-tests'),
          L('In IntelliJ, add JUnit 5 to your Week-2 project (Show Context Actions → add JUnit).'),
        ],
        lab: { title: 'Test + package the plan', steps: ['Write 3 JUnit tests for BankAccount: deposit increases balance; withdraw rejects overdraft; getBalance correct.', 'Make one test fail on purpose, then fix the code.', 'Assemble a week-3 folder: idea, requirements, UML, plan. Push.'], doneWhen: '3 tests pass and the product-plan folder is on GitHub.' },
        tools: ['IntelliJ', 'GitHub'],
      },
    ],
  },
  {
    num: 4,
    code: 'CS305PC — Databases & SQL',
    title: 'Database Management Systems',
    goal: "Turn the DBMS syllabus into your product's database: design it, query it, normalize it, seed it.",
    days: [
      {
        id: '4.1', dow: 'Mon', mins: 60, focus: 'Relational model + ER design',
        learn: [
          L("GfG 'Introduction of ER Model' — entity, attribute, relationship, primary/foreign key.", 'GfG: ER model', 'https://www.geeksforgeeks.org/introduction-of-er-model/'),
          L('Open dbdiagram.io.', 'dbdiagram.io', 'https://dbdiagram.io/'),
        ],
        lab: { title: 'ER diagram', steps: ['List your product\'s entities (e.g. User, Task).', 'In dbdiagram.io define each table with columns + primary and foreign keys.', 'Export the diagram to the repo.'], doneWhen: 'An ER diagram with 3–5 tables and defined keys.' },
        tools: ['dbdiagram.io'],
      },
      {
        id: '4.2', dow: 'Tue', mins: 60, focus: 'Create the database',
        learn: [
          L('Sign up at Supabase and create a project (free).', 'Supabase', 'https://supabase.com/'),
          L("Supabase 'Tables' quickstart — read creating a table.", 'Supabase: tables', 'https://supabase.com/docs/guides/database/tables'),
        ],
        lab: { title: 'Create tables', steps: ['Write CREATE TABLE statements for your entities.', 'Run them in the Supabase SQL Editor.', 'Confirm the tables show up in the Table Editor.'], doneWhen: "Your product's tables exist in Supabase." },
        tools: ['Supabase'],
      },
      {
        id: '4.3', dow: 'Wed', mins: 60, focus: 'SELECT / WHERE / ORDER BY',
        learn: [
          L('SQLBolt — complete Lessons 1 to 6 (get every exercise to green).', 'SQLBolt', 'https://sqlbolt.com/'),
        ],
        lab: { title: 'Query your data', steps: ['Insert 5 rows with INSERT INTO.', 'Write 5 queries: all rows; WHERE; ORDER BY; LIMIT; AND/OR.', 'Save them in queries.sql.'], doneWhen: '5 working queries saved in queries.sql.' },
        tools: ['Supabase'],
      },
      {
        id: '4.4', dow: 'Thu', mins: 60, focus: 'JOINs',
        learn: [
          L('SQLBolt — complete Lessons 6 to 9 (multi-table JOINs).', 'SQLBolt', 'https://sqlbolt.com/'),
        ],
        lab: { title: 'Join tables', steps: ['Ensure two related tables have data (Users + Tasks linked by a foreign key).', "Write 3 JOIN queries answering product questions (e.g. 'all tasks of user X')."], doneWhen: '3 JOIN queries return correct combined rows.' },
        tools: ['Supabase'],
      },
      {
        id: '4.5', dow: 'Fri', mins: 60, focus: 'Aggregation',
        learn: [
          L('SQLBolt — complete Lessons 10 to 12 (aggregates, GROUP BY, HAVING).', 'SQLBolt', 'https://sqlbolt.com/'),
        ],
        lab: { title: 'Summarize', steps: ['Write a COUNT query.', 'Write a GROUP BY (e.g. tasks per user).', 'Add a HAVING filter and one AVG or SUM query.'], doneWhen: '3 aggregate queries work correctly.' },
        tools: ['Supabase'],
      },
      {
        id: '4.6', dow: 'Sat', mins: 120, focus: 'Normalization + full DML',
        learn: [
          L('SQLBolt — Lessons 13 to 18 (INSERT / UPDATE / DELETE / CREATE / ALTER / DROP).', 'SQLBolt', 'https://sqlbolt.com/'),
          L("GfG 'Normal Forms in DBMS' — read 1NF, 2NF, 3NF.", 'GfG: normal forms', 'https://www.geeksforgeeks.org/normal-forms-in-dbms/'),
        ],
        lab: { title: 'Clean + seed', steps: ['Check your schema against 3NF; split any table mixing unrelated data.', 'Write a seed.sql that inserts ~10 rows across tables.', 'Practice one UPDATE and one DELETE.'], doneWhen: 'Schema is in 3NF and seed.sql populates the database.' },
        tools: ['Supabase'],
      },
      {
        id: '4.7', dow: 'Sun', mins: 120, focus: 'Data layer shipped',
        learn: [
          L("Discrete-math tie-in: GfG 'Relations' — a table IS a relation.", 'GfG: relations', 'https://www.geeksforgeeks.org/relations-and-their-types/'),
        ],
        lab: { title: 'Package the database', steps: ['Finalize schema.sql, seed.sql, and queries.sql (10 useful queries).', 'Write a README explaining the schema.', 'Push a week-4 folder.'], doneWhen: 'schema + seed + 10 queries + README are on GitHub.' },
        tools: ['GitHub'],
      },
    ],
  },
  {
    num: 5,
    code: 'CS354SD — Web basics, Node & connecting the DB',
    title: 'Node JS / React JS / Django',
    goal: 'Understand how the web works and build a backend API that reads and writes your real database.',
    days: [
      {
        id: '5.1', dow: 'Mon', mins: 60, focus: 'Install Node + how the web works',
        learn: [
          L('Install Node.js LTS; verify  node -v  and  npm -v.', 'Node.js (LTS)', 'https://nodejs.org/'),
          L("MDN 'How the Web Works' — client/server + request/response.", 'MDN: how the web works', 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works'),
        ],
        lab: { title: 'First Node run', steps: ['Create a folder  backend  and run  npm init -y.', "Create index.js that prints 'Server ready'.", 'Run  node index.js.'], doneWhen: 'Node prints your message from index.js.' },
        tools: ['Node.js'],
      },
      {
        id: '5.2', dow: 'Tue', mins: 60, focus: 'First Express server',
        learn: [
          L('Install Express:  npm install express.'),
          L("Express 'Hello World' — read and re-type the minimal server.", 'Express: hello world', 'https://expressjs.com/en/starter/hello-world.html'),
        ],
        lab: { title: 'Hello API', steps: ['Start a server on port 3000.', "Add GET /hello returning 'Hello from my API'.", 'Run it and open http://localhost:3000/hello.'], doneWhen: 'The browser shows your message from the endpoint.' },
        tools: ['Node.js'],
      },
      {
        id: '5.3', dow: 'Wed', mins: 60, focus: 'REST + JSON routes',
        learn: [
          L("restfulapi.net — read 'What is REST' (resources + HTTP verbs), first two sections.", 'restfulapi.net', 'https://restfulapi.net/'),
          L('Install Thunder Client (VS Code) or the Postman app.', 'Thunder Client', 'https://www.thunderclient.com/'),
        ],
        lab: { title: 'Tasks API (in memory)', steps: ['Keep an array  tasks = [].  Add  app.use(express.json()).', 'GET /tasks returns the array as JSON.', 'POST /tasks adds a task from the request body.', 'Test both in Thunder Client.'], doneWhen: 'You can add tasks via POST and see them via GET.' },
        tools: ['Thunder Client'],
      },
      {
        id: '5.4', dow: 'Thu', mins: 60, focus: 'Connect Node to Postgres',
        learn: [
          L('Install pg:  npm install pg.'),
          L("node-postgres docs — read the Pool 'Connecting' example.", 'node-postgres docs', 'https://node-postgres.com/'),
          L('Get your Supabase connection string (Project Settings → Database).'),
        ],
        lab: { title: 'DB handshake', steps: ['Create db.js with a pg Pool using your Supabase string — put it in a  .env  file (never in code).', 'Write a query that SELECTs from a table.', 'Run it and print the rows.'], doneWhen: 'Node prints real rows from your Supabase database.' },
        tools: ['Node.js', 'Supabase'],
      },
      {
        id: '5.5', dow: 'Fri', mins: 60, focus: 'CRUD from code (safely)',
        learn: [
          L("node-postgres 'Queries' — PARAMETERIZED queries ($1, $2) and why they stop SQL injection.", 'node-postgres docs', 'https://node-postgres.com/'),
        ],
        lab: { title: 'Data-access functions', steps: ['Write getAllTasks(), createTask(title), deleteTask(id) using parameterized queries.', 'Call each and print the results.'], doneWhen: 'All three functions read/write the real database correctly.' },
        tools: ['Node.js'],
      },
      {
        id: '5.6', dow: 'Sat', mins: 120, focus: 'Wire the API to the database',
        learn: [
          L("Combine yesterday's functions with your Express routes."),
        ],
        lab: { title: 'Real API', steps: ['GET /tasks → getAllTasks().', 'POST /tasks → createTask().', 'DELETE /tasks/:id → deleteTask().', 'Test the full cycle in Thunder Client and confirm in the Supabase Table Editor.'], doneWhen: 'The API creates/reads/deletes rows in the real database.' },
        tools: ['Node.js', 'Thunder Client'],
      },
      {
        id: '5.7', dow: 'Sun', mins: 120, focus: 'Backend v1 shipped',
        learn: [
          L('Ask Claude to review one route for bugs and security — apply one improvement.'),
        ],
        lab: { title: 'Tidy & push', steps: ['Split code into folders (routes/, db/).', 'Add a .gitignore that excludes node_modules and .env.', 'Write a README listing your endpoints. Push a week-5 folder.'], doneWhen: 'A tidy, DB-connected API is on GitHub with NO secrets committed.' },
        tools: ['GitHub', 'Claude'],
      },
    ],
  },
  {
    num: 6,
    code: 'CS354SD — Full backend, auth & automation',
    title: 'Node JS / React JS / Django',
    goal: 'Complete the backend: full CRUD, error handling, login, and one AI-powered automation with n8n.',
    days: [
      {
        id: '6.1', dow: 'Mon', mins: 60, focus: 'Complete the CRUD',
        learn: [
          L('Recall REST → CRUD mapping: GET=read, POST=create, PUT=update, DELETE=delete.'),
        ],
        lab: { title: 'Finish the API', steps: ['Add PUT /tasks/:id (update a task).', 'Add GET /tasks/:id (fetch one).', 'Test all 5 endpoints in Thunder Client.'], doneWhen: 'All CRUD endpoints work against the real database.' },
        tools: ['Thunder Client'],
      },
      {
        id: '6.2', dow: 'Tue', mins: 60, focus: 'Errors & validation',
        learn: [
          L("Express 'Error handling' docs — read basic error middleware.", 'Express: error handling', 'https://expressjs.com/en/guide/error-handling.html'),
          L('Status codes: 200 ok, 201 created, 400 bad input, 404 not found, 500 server error.'),
        ],
        lab: { title: 'Make it robust', steps: ["Return 404 when an id doesn't exist.", 'Return 400 if title is empty on POST.', 'Wrap DB calls in try/catch and return 500 on failure.'], doneWhen: 'Bad requests get correct status codes and messages.' },
        tools: ['Node.js'],
      },
      {
        id: '6.3', dow: 'Wed', mins: 60, focus: 'Auth — hashing + signup/login',
        learn: [
          L('Install bcrypt:  npm install bcrypt.'),
          L("npm bcrypt 'Usage' — read hash() and compare().", 'npm bcrypt', 'https://www.npmjs.com/package/bcrypt'),
          L('Add a  users  table (email, password_hash) in Supabase.'),
        ],
        lab: { title: 'Signup / login', steps: ['POST /signup: hash the password with bcrypt, store the user.', 'POST /login: look up the user, compare the password, return success/failure.', 'Test both in Thunder Client.'], doneWhen: 'Passwords are stored hashed and login verifies correctly.' },
        tools: ['Node.js', 'Supabase'],
      },
      {
        id: '6.4', dow: 'Thu', mins: 60, focus: 'Protect a route',
        learn: [
          L("jwt.io 'Introduction' — read the first section on what a token is.", 'jwt.io: introduction', 'https://jwt.io/introduction'),
        ],
        lab: { title: 'Members only', steps: ['On successful login, issue a token (or set a simple session flag).', 'Make GET /tasks require it.', 'Test: blocked without the token, allowed with it.'], doneWhen: 'The protected route rejects unauthenticated requests.' },
        tools: ['Node.js'],
      },
      {
        id: '6.5', dow: 'Fri', mins: 60, focus: 'Set up n8n',
        learn: [
          L('Run n8n locally:  npx n8n  (opens localhost:5678) — or use the Cloud trial.', 'n8n', 'https://n8n.io/'),
          L('n8n quickstart — read trigger + node basics.', 'n8n quickstart', 'https://docs.n8n.io/try-it-out/quickstart/'),
        ],
        lab: { title: 'First workflow', steps: ['Create a workflow with a Manual (or Schedule) trigger.', 'Add a node that sets some sample data.', 'Execute the workflow and view the output.'], doneWhen: 'A workflow runs and shows output in n8n.' },
        tools: ['n8n'],
      },
      {
        id: '6.6', dow: 'Sat', mins: 120, focus: 'n8n + AI: your first smart feature',
        learn: [
          L('n8n AI docs — read how to add an AI/LLM node.', 'n8n AI docs', 'https://docs.n8n.io/advanced-ai/'),
          L('Get an API key (Anthropic or OpenAI) for the AI node.'),
        ],
        lab: { title: 'AI summarizer', steps: ['Build: trigger → HTTP Request to your GET /tasks → AI node summarizes → output (email / Telegram / file).', "Run it and read the AI's summary."], doneWhen: 'n8n produces an AI-written summary of your live data.' },
        tools: ['n8n', 'Claude'],
      },
      {
        id: '6.7', dow: 'Sun', mins: 120, focus: 'Backend done + documented',
        learn: [
          L('Skim how APIs are documented — list every endpoint with its input/output.'),
        ],
        lab: { title: 'Backend wrap', steps: ['Write API_DOCS.md: each endpoint, method, input, and output.', 'Export your n8n workflow as JSON into the repo.', 'Push a week-6 folder.'], doneWhen: 'Complete backend + API docs + n8n export are on GitHub.' },
        tools: ['GitHub'],
      },
    ],
  },
  {
    num: 7,
    code: 'CS354SD — React frontend, connected',
    title: 'Node JS / React JS / Django',
    goal: 'Build the React frontend and connect it to your backend so the whole app works end to end.',
    days: [
      {
        id: '7.1', dow: 'Mon', mins: 60, focus: 'Set up React',
        learn: [
          L('Create the app: npm create vite@latest frontend -- --template react, then cd frontend, npm install, npm run dev.', 'Vite', 'https://vitejs.dev/guide/'),
          L("react.dev Quick Start — read 'Creating and nesting components'.", 'react.dev: Quick Start', 'https://react.dev/learn'),
        ],
        lab: { title: 'First edit', steps: ['Open the running app in the browser.', "Edit App.jsx to show your product's name and a heading.", 'Watch it hot-reload.'], doneWhen: 'Your app runs and shows your custom heading.' },
        tools: ['Node.js', 'React'],
      },
      {
        id: '7.2', dow: 'Tue', mins: 60, focus: 'Components & props',
        learn: [
          L("react.dev Quick Start — 'Writing markup with JSX', 'Displaying data', 'Passing props'.", 'react.dev: Quick Start', 'https://react.dev/learn'),
        ],
        lab: { title: 'TaskCard component', steps: ['Create a TaskCard component that takes a  title  prop.', 'Render 3 TaskCards with different titles from App.'], doneWhen: 'Three cards render with different prop values.' },
        tools: ['React'],
      },
      {
        id: '7.3', dow: 'Wed', mins: 60, focus: 'State & events',
        learn: [
          L("react.dev Quick Start — 'Responding to events' and 'Updating the screen' (useState).", 'react.dev: Quick Start', 'https://react.dev/learn'),
        ],
        lab: { title: 'Interactive UI', steps: ['Add a counter with a + button using useState.', 'Add a text input that updates state as you type and shows it live below.'], doneWhen: 'The counter increments and typed text appears instantly.' },
        tools: ['React'],
      },
      {
        id: '7.4', dow: 'Thu', mins: 60, focus: 'Lists & forms',
        learn: [
          L("react.dev — read 'Rendering lists' (map + key).", 'react.dev: Quick Start', 'https://react.dev/learn'),
        ],
        lab: { title: 'Local task list', steps: ['Keep tasks in state (an array).', "A form input + 'Add' button appends a task.", 'Render the list with .map().'], doneWhen: 'You can add tasks and the list grows (local only for now).' },
        tools: ['React'],
      },
      {
        id: '7.5', dow: 'Fri', mins: 60, focus: 'Fetch live data from your API',
        learn: [
          L('Install axios:  npm install axios  (or use fetch).', 'axios', 'https://axios-http.com/docs/intro'),
          L('Enable CORS on your backend:  npm install cors  then  app.use(cors()).', 'npm cors', 'https://www.npmjs.com/package/cors'),
        ],
        lab: { title: 'Live data', steps: ['On load (useEffect), GET your backend /tasks and display them.', "Show 'Loading…' first, then the list; show an error message if it fails."], doneWhen: 'The UI displays real tasks from your database.' },
        tools: ['React', 'Node.js'],
      },
      {
        id: '7.6', dow: 'Sat', mins: 120, focus: 'Full CRUD in the UI',
        learn: [
          L('Optional: try v0.dev — describe a task-list UI, generate it, then read every line before keeping it.', 'v0.dev', 'https://v0.dev'),
        ],
        lab: { title: "It's a real app", steps: ['Add-task form → POST to your API → refresh the list.', 'Delete button → DELETE → refresh the list.', 'Confirm the changes in the Supabase Table Editor.'], doneWhen: 'Create, read, and delete all work end-to-end through the UI.' },
        tools: ['React', 'v0.dev', 'Supabase'],
      },
      {
        id: '7.7', dow: 'Sun', mins: 120, focus: 'Polish + push',
        learn: [
          L("MDN 'Responsive design' — read media-query basics.", 'MDN: responsive design', 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design'),
          L('Ask Claude for a quick UX review (describe your screens) and apply the best tip.'),
        ],
        lab: { title: 'Make it shine', steps: ['Make the layout responsive (works at phone width).', "Add an empty state ('No tasks yet') and an error state.", 'Write a README with screenshots. Push a week-7 folder.'], doneWhen: 'A polished, responsive full-stack app is on GitHub with screenshots.' },
        tools: ['React', 'GitHub', 'Claude'],
      },
    ],
  },
  {
    num: 8,
    code: 'Capstone + MS301HS — Ship & pitch',
    title: 'Capstone + Innovation & Entrepreneurship',
    goal: 'Take the app live on the internet, add a real AI feature, document it, and pitch it like a founder.',
    days: [
      {
        id: '8.1', dow: 'Mon', mins: 60, focus: 'Bug bash',
        learn: [
          L("Chrome DevTools — 'Open DevTools' + Console basics (to read errors).", 'Chrome DevTools basics', 'https://developer.chrome.com/docs/devtools/open'),
        ],
        lab: { title: 'Test everything', steps: ['Write a test checklist: signup, login, add, view, delete.', 'Run each item; fix whatever breaks.', 'Commit your fixes.'], doneWhen: 'Every item on the checklist passes.' },
        tools: ['Chrome DevTools'],
      },
      {
        id: '8.2', dow: 'Tue', mins: 60, focus: "Add the AI feature (the 'wow')",
        learn: [
          L("Anthropic 'Get started' — read how to make your first API call; keep the key in .env.", 'Anthropic API: get started', 'https://docs.anthropic.com/en/docs/get-started'),
        ],
        lab: { title: 'Add intelligence', steps: ['Add a backend endpoint that calls the AI API — e.g. /summary summarizes tasks, or a smart search.', 'Add a button in the UI to trigger it and show the result.'], doneWhen: 'One real AI feature works inside your product.' },
        tools: ['Claude', 'Node.js'],
      },
      {
        id: '8.3', dow: 'Wed', mins: 60, focus: 'Deploy the backend',
        learn: [
          L('Your DB is already live (Supabase).'),
          L("Render 'Deploy a Node/Express app' — read the quickstart; add env vars in Render.", 'Render: deploy Node', 'https://render.com/docs/deploy-node-express-app'),
        ],
        lab: { title: 'Backend live', steps: ['Push the backend to GitHub.', 'Create a Render Web Service from the repo.', 'Add the environment variables.', 'Open the live API URL and confirm it responds.'], doneWhen: 'Your API is live on a public URL.' },
        tools: ['Render', 'Supabase'],
      },
      {
        id: '8.4', dow: 'Thu', mins: 60, focus: 'Deploy the frontend — go live',
        learn: [
          L("Vercel 'Deploy' — read importing a GitHub repo.", 'Vercel: deploy', 'https://vercel.com/docs/deployments/overview'),
          L('COA tie-in: your code now runs on cloud servers, not your laptop — same CPU/memory ideas, at scale.'),
        ],
        lab: { title: 'Ship to the world', steps: ["Point the frontend's API base URL to your live Render backend.", 'Deploy the frontend on Vercel from GitHub.', 'Open the live site on your phone and complete a full user journey.'], doneWhen: 'A public, working web app anyone can visit.' },
        tools: ['Vercel'],
      },
      {
        id: '8.5', dow: 'Fri', mins: 60, focus: 'Docs + clean repo',
        learn: [
          L("makeareadme.com — read the 'Suggestions for a good README' list.", 'makeareadme.com', 'https://www.makeareadme.com/'),
        ],
        lab: { title: 'Portfolio-ready', steps: ['Write a full README: what it does, the live link, screenshots, tech stack, how to run.', 'Remove dead code and any secrets.', 'Add a repo description and topics.'], doneWhen: 'A clean public repo a recruiter could understand in 2 minutes.' },
        tools: ['GitHub'],
      },
      {
        id: '8.6', dow: 'Sat', mins: 120, focus: 'The pitch (Innovation & Entrepreneurship)',
        learn: [
          L("Strategyzer 'Business Model Canvas' — read the 9 blocks.", 'Strategyzer: BMC', 'https://www.strategyzer.com/library/the-business-model-canvas'),
          L("YC 'How to design a better pitch deck' — read the recommended slide order.", 'YC: pitch deck', 'https://www.ycombinator.com/library/4T-how-to-design-a-better-pitch-deck'),
        ],
        lab: { title: 'Founder mode', steps: ['Fill a 1-page Business Model Canvas for your product.', "Build a 6–8 slide deck: problem, solution, live demo, who it helps, tech, what's next.", '(Or record a crisp 2-minute demo video.)'], doneWhen: 'A pitch deck (or demo video) + a filled canvas.' },
        tools: ['Claude', 'ChatGPT'],
      },
      {
        id: '8.7', dow: 'Sun', mins: 120, focus: 'Demo day, reflection & certificate',
        learn: [
          L('LinkedIn help — read how to add work to your Featured section.', 'LinkedIn: add featured', 'https://www.linkedin.com/help/linkedin/answer/a522623'),
        ],
        lab: { title: 'Graduate', steps: ['Do a full live demo to your mentor (app + pitch).', 'Write a half-page reflection: what I built, what I learned, what\'s next.', 'Add the project to LinkedIn/your resume with the live link.', 'Sign the certificate.'], doneWhen: 'Live demo delivered, project published, certificate signed.' },
        tools: ['GitHub', 'Claude'],
      },
    ],
  },
]

// Flat list of every day, in order — handy for "next up", streaks, and counts.
export const allDays = weeks.flatMap((w) =>
  w.days.map((d) => ({ ...d, week: w.num, weekTitle: w.title }))
)
