import type { CoreGroup, EnrichmentGroup, HeroPill, NavSectionItem, TestPrepGroup, TierItem, WhyItem } from './types'

export const NAV_SECTIONS: NavSectionItem[] = [
  { id: 'core-academic', label: 'Core Academic' },
  { id: 'test-prep', label: 'Test Preparation' },
  { id: 'enrichment', label: 'Enrichment & Skills' },
]

export const HERO_PILLS: HeroPill[] = [
  { label: '📚 K-12 Academic', bg: 'var(--dt-coral-soft)', text: 'var(--dt-coral)', border: '#FFD0D0' },
  { label: '📝 Test Prep', bg: '#FFFBEB', text: '#D97706', border: '#FDE68A' },
  { label: '💻 Technology', bg: '#F0F4FF', text: '#4C6EF5', border: '#C5D0FF' },
  { label: '🌟 Enrichment', bg: 'var(--dt-mint-soft)', text: '#0CA678', border: '#96F2D7' },
]

export const WHY_ITEMS: WhyItem[] = [
  {
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&q=80',
    title: 'Personalized Instruction',
    desc: "Small groups and 1-on-1 sessions tailored to each student's pace and learning style.",
  },
  {
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&q=80',
    title: 'Proven Results',
    desc: 'Structured curriculum aligned with school standards and standardized test formats.',
  },
  {
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&q=80',
    title: 'All Levels Welcome',
    desc: 'From struggling learners to advanced students seeking an extra challenge.',
  },
  {
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500&q=80',
    title: 'One Stop for the Family',
    desc: 'While kids learn, parents can work out in the gym or relax in the cafe.',
  },
]

export const TIERS: TierItem[] = [
  {
    num: '1',
    name: 'The Essentials',
    tag: 'High Volume · Core Revenue',
    desc: 'K-12 academic tutoring across all core subjects. Consistent monthly enrollment for families who need reliable academic support.',
    color: 'var(--dt-coral)',
    bg: 'var(--dt-coral-soft)',
    border: '#FFD0D0',
  },
  {
    num: '2',
    name: 'The High-Ticket',
    tag: 'Premium · Test Prep',
    desc: 'SAT/ACT, college essay writing, private school admissions, and graduate test preparation. Higher price point, high parental urgency.',
    color: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
  },
  {
    num: '3',
    name: 'The Niche & Specialty',
    tag: 'Differentiation · Loyalty',
    desc: 'Enrichment programs - coding, robotics, financial literacy, creative writing - that set us apart and build deep family loyalty.',
    color: '#7950F2',
    bg: '#F3F0FF',
    border: '#D0BFFF',
  },
]

export const CORE_GROUPS: CoreGroup[] = [
  {
    id: 'elementary',
    label: 'Elementary',
    range: 'K - 5',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
    color: { bg: 'var(--dt-coral-soft)', text: 'var(--dt-coral)', border: '#FFD0D0', accent: 'var(--dt-coral)' },
    desc: 'Building the foundational skills that every subject depends on - reading, writing, and numbers.',
    subjects: [
      {
        name: 'Early Literacy',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80',
        desc: 'Phonics, decoding, and sight words using Orton-Gillingham methods. Designed for early readers and struggling decoders.',
      },
      {
        name: 'Elementary Math Foundations',
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
        desc: 'Number sense, addition/subtraction, and multiplication tables. Building the arithmetic confidence every student needs.',
      },
      {
        name: 'Handwriting',
        image: 'https://images.unsplash.com/photo-1549488344-c7da79ec15e0?w=400&q=80',
        desc: 'Cursive and print legibility - a surprisingly high-demand skill that boosts confidence and classroom performance.',
      },
      {
        name: 'Homework Club',
        image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&q=80',
        desc: 'Drop-in group hours for supervised homework completion. A productive after-school routine for busy families.',
      },
    ],
  },
  {
    id: 'middle',
    label: 'Middle School',
    range: 'Grades 6 - 8',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
    color: { bg: '#F0F4FF', text: '#4C6EF5', border: '#C5D0FF', accent: '#4C6EF5' },
    desc: 'Bridging the gap between elementary foundations and high school rigor - where study habits are formed.',
    subjects: [
      {
        name: 'Pre-Algebra & Algebra I',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80',
        desc: 'The most-requested subject for this age group. Variables, equations, and the logic that unlocks all future math.',
      },
      {
        name: 'Essay Writing Workshop',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?w=400&q=80',
        desc: 'Moving from sentences to structured 5-paragraph essays. Teaches argument, evidence, and voice.',
      },
      {
        name: 'General Science',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80',
        desc: 'Earth science and introductions to biology and chemistry. Curiosity-first, curriculum-aligned.',
      },
      {
        name: 'Executive Functioning',
        image: 'https://images.unsplash.com/photo-1506784951264-b8162e0868f7?w=400&q=80',
        desc: 'Organization, planner usage, and study skills for students with ADHD or disorganization challenges. Life-changing for struggling learners.',
      },
    ],
  },
  {
    id: 'highschool',
    label: 'High School',
    range: 'Grades 9 - 12',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
    color: { bg: '#F3F0FF', text: '#7950F2', border: '#D0BFFF', accent: '#7950F2' },
    desc: 'AP-level support, deep subject mastery, and the academic preparation that opens doors to college.',
    subjects: [
      {
        name: 'STEM Track',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80',
        desc: 'Geometry, Algebra II, Pre-Calc, Calculus (AB/BC), Biology, Chemistry, Physics. From foundations to AP.',
      },
      {
        name: 'Humanities Track',
        image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&q=80',
        desc: 'U.S. History, World History, Government, AP English Language/Literature. Analysis, essays, and critical thinking.',
      },
      {
        name: 'Foreign Language',
        image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80',
        desc: 'Spanish, French, and Mandarin - focusing on grammar, conversation, and speaking confidence.',
      },
    ],
  },
]

export const TEST_PREP_GROUPS: TestPrepGroup[] = [
  {
    label: 'College Entrance',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80',
    color: { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A', accent: '#D97706' },
    tests: [
      {
        name: 'SAT / ACT Bootcamp',
        image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&q=80',
        desc: '6-8 week intensive courses covering strategies, section breakdowns, and full-length practice tests.',
        badge: 'High Demand',
      },
      {
        name: 'College Essay Writing',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?w=400&q=80',
        desc: 'August/September bootcamps to draft and polish personal statements. One-on-one feedback included.',
        badge: 'Seasonal',
      },
    ],
  },
  {
    label: 'Private School Admissions',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
    color: { bg: 'var(--dt-mint-soft)', text: '#0CA678', border: '#96F2D7', accent: '#0CA678' },
    tests: [
      {
        name: 'ISEE / SSAT',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
        desc: 'For elementary and middle school students applying to private high schools. Strategy, vocabulary, and math prep.',
      },
      {
        name: 'HSPT / COOP',
        image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&q=80',
        desc: 'Catholic high school entrance exam preparation. Covers verbal skills, quantitative reasoning, and reading.',
      },
    ],
  },
  {
    label: 'Adult & Graduate',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
    color: { bg: '#F0F4FF', text: '#4C6EF5', border: '#C5D0FF', accent: '#4C6EF5' },
    tests: [
      {
        name: 'GRE / GMAT',
        image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400&q=80',
        desc: 'Comprehensive prep for adults applying to graduate or business school programs.',
      },
      {
        name: 'GED / HiSET',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80',
        desc: 'High school equivalency preparation. Flexible scheduling for working adults.',
      },
      {
        name: 'ASVAB',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
        desc: 'Targeted preparation for students entering military service.',
      },
    ],
  },
]

export const ENRICHMENT_GROUPS: EnrichmentGroup[] = [
  {
    label: 'Technology & Logic',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&q=80',
    color: { bg: '#F0F4FF', text: '#4C6EF5', border: '#C5D0FF', accent: '#4C6EF5' },
    courses: [
      {
        name: 'Coding for Kids',
        image: 'https://images.unsplash.com/photo-1534644107580-3a4dbd494a95?w=400&q=80',
        desc: 'Python, Java, or Scratch (visual coding). From "Hello World" to building small games and apps.',
      },
      {
        name: 'Robotics Club',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80',
        desc: 'LEGO Mindstorms or VEX robotics. Design, build, and program robots in a collaborative team environment.',
      },
      {
        name: 'Chess Club',
        image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&q=80',
        desc: 'Teaches logic, patience, and strategic thinking. Proven to improve math scores and focus.',
      },
    ],
  },
  {
    label: 'Life Skills',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
    color: { bg: 'var(--dt-mint-soft)', text: '#0CA678', border: '#96F2D7', accent: '#0CA678' },
    courses: [
      {
        name: 'Financial Literacy',
        image: 'https://images.unsplash.com/photo-1533421821268-87e4242d5fec?w=400&q=80',
        desc: 'Budgeting, understanding credit, and basic investing for teens. Real-world skills no classroom teaches.',
      },
      {
        name: 'Public Speaking & Debate',
        image: 'https://images.unsplash.com/photo-1560523159-4a9692d222f9?w=400&q=80',
        desc: 'Building confidence, argumentation skills, and presentation polish. Invaluable for any career path.',
      },
    ],
  },
  {
    label: 'Arts & Creative',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    color: { bg: 'var(--dt-coral-soft)', text: 'var(--dt-coral)', border: '#FFD0D0', accent: 'var(--dt-coral)' },
    courses: [
      {
        name: 'Creative Writing',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?w=400&q=80',
        desc: 'Fiction, poetry, and screenwriting groups. Find your voice and tell your story.',
      },
      {
        name: 'Digital Art & Graphic Design',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80',
        desc: 'Introduction to Adobe Photoshop and Canva. Create posters, logos, and digital illustrations.',
      },
    ],
  },
]
