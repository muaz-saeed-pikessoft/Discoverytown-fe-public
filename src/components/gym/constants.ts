import type { AgeGroup, NavSectionItem, ScheduleDay, SpecialProgram } from './types'

export const NAV_SECTIONS: NavSectionItem[] = [
  { id: 'age-groups', label: 'Age Groups' },
  { id: 'classes', label: 'All Classes' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'special', label: 'Special Programs' },
]

export const AGE_GROUPS: AgeGroup[] = [
  {
    id: 'babies',
    label: 'Babies',
    range: '6 – 18 months',
    img: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=900&q=80',
    color: {
      bg: 'var(--dt-teal-light)',
      text: 'var(--dt-teal-dark)',
      border: 'var(--dt-teal)',
      accent: 'var(--dt-teal-dark)',
    },
    focus: 'Sensory exploration, grip strength & spatial awareness',
    classes: [
      {
        name: 'Mini Movers',
        ages: '6 – 18 months',
        img: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&q=80',
        desc: 'A sensory-rich environment where babies crawl, climb over soft foam shapes, and explore textures. Focuses on grip strength and spatial awareness.',
      },
    ],
  },
  {
    id: 'toddlers',
    label: 'Toddlers',
    range: '18 – 36 months',
    img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=80',
    color: { bg: '#FFF8EB', text: '#B45309', border: '#FDE68A', accent: '#D97706' },
    focus: 'Guided bonding, balance & listening skills',
    classes: [
      {
        name: 'Parent & Tot Tumble',
        ages: '18 months – 3 years',
        img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=700&q=80',
        desc: 'Guided bonding time involving assisted rolls, balancing on low beams, and parachute play. Introduces listening skills and turn-taking.',
      },
    ],
  },
  {
    id: 'preschool',
    label: 'Preschool',
    range: '3 – 5 years',
    img: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=900&q=80',
    color: {
      bg: 'var(--dt-primary-light)',
      text: 'var(--dt-primary)',
      border: 'var(--dt-primary)',
      accent: 'var(--dt-primary)',
    },
    focus: 'Coordination, energy, movement & imagination',
    classes: [
      {
        name: 'KinderGym',
        ages: '3 – 5 years',
        img: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=700&q=80',
        desc: 'Introduction to basic gymnastics terminology and shapes (tuck, pike, straddle). Utilizing junior-sized bars, beams, and floor mats.',
      },
      {
        name: "Lil' Ninjas",
        ages: '3 – 5 years',
        img: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=700&q=80',
        desc: 'A high-energy class featuring obstacle courses. Kids learn to jump, land safely, swing, and climb. Focuses on coordination and burning energy.',
      },
      {
        name: 'PeeWee Sports Sampler',
        ages: '3 – 5 years',
        img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80',
        desc: 'Rotates a new sport every 2 weeks — Soccer, T-Ball, Basketball. Focuses on hand-eye coordination and ball-handling basics without competitive pressure.',
      },
      {
        name: 'Interactive Story-Move',
        ages: '3 – 5 years',
        img: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=700&q=80',
        desc: 'Children act out stories through physical movement using projection walls and light-up floor tiles.',
      },
    ],
  },
  {
    id: 'grade-school',
    label: 'Grade School',
    range: '6 – 12 years',
    img: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=900&q=80',
    color: {
      bg: 'var(--dt-primary-light)',
      text: 'var(--dt-primary)',
      border: 'var(--dt-primary)',
      accent: 'var(--dt-primary)',
    },
    focus: 'Technique, discipline, teamwork & confidence building',
    classes: [
      {
        name: 'Bronze Gymnastics',
        ages: '6 – 12 years',
        track: 'Gymnastics',
        img: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=700&q=80',
        desc: 'Mastering the cartwheel, handstand, bridge, and pullover on bars. Focus on form and safety.',
      },
      {
        name: 'Silver Gymnastics',
        ages: '6 – 12 years',
        track: 'Gymnastics',
        img: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=700&q=80',
        desc: 'For students who have mastered basics. Introduces round-offs, back walkovers, and high-beam confidence.',
      },
      {
        name: 'Tumbling for Cheer',
        ages: '6 – 12 years',
        track: 'Gymnastics',
        img: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=700&q=80',
        desc: 'Specifically focuses on floor skills — jumps, round-offs, and back handsprings. Ideal for aspiring cheerleaders.',
      },
      {
        name: 'Warrior Zone',
        ages: '6 – 12 years',
        track: 'Strength & Ninja',
        img: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=700&q=80',
        desc: 'Parkour-style training. Wall runs, vaulting, and grip-strength challenges. Timed obstacle courses to track personal improvement.',
      },
      {
        name: 'Youth Conditioning',
        ages: '6 – 12 years',
        track: 'Strength & Ninja',
        img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80',
        desc: 'Bodyweight strength training (pushups, squats, lunges) mixed with fun relay races. Teaches the importance of warm-ups and cool-downs.',
      },
      {
        name: 'Speed & Agility Clinic',
        ages: '6 – 12 years',
        track: 'Sports & Agility',
        img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=700&q=80',
        desc: 'Drills focused on footwork, ladder drills, and sprint mechanics. Beneficial for kids playing soccer, football, or basketball.',
      },
      {
        name: 'Court Sports Skills',
        ages: '6 – 12 years',
        track: 'Sports & Agility',
        img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=700&q=80',
        desc: 'Focused drills on specific sports mechanics — shooting form, dribbling, passing — rather than full-game scrimmages.',
      },
      {
        name: 'Exer-Gaming',
        ages: '6 – 12 years',
        track: 'Interactive Fitness',
        img: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=700&q=80',
        desc: 'Using technology (interactive climbing walls & light-reaction floors) to gamify fitness. High cardio disguised as a video game.',
      },
    ],
  },
  {
    id: 'teens',
    label: 'Teens',
    range: '13 – 17 years',
    img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=900&q=80',
    color: {
      bg: 'var(--dt-teal-light)',
      text: 'var(--dt-teal-dark)',
      border: 'var(--dt-teal)',
      accent: 'var(--dt-teal-dark)',
    },
    focus: 'Athletic performance, stress relief & functional strength',
    classes: [
      {
        name: 'Teen Cross-Training',
        ages: '13 – 17 years',
        img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=700&q=80',
        desc: 'Introduction to light weights (kettlebells, medicine balls) and high-intensity interval training (HIIT). Great for off-season athletes.',
      },
      {
        name: 'Advanced Tumbling',
        ages: '13 – 17 years',
        img: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=700&q=80',
        desc: 'For teens working on back tucks, aerials, and connecting tumbling passes.',
      },
      {
        name: 'Teen Ninja Warrior',
        ages: '13 – 17 years',
        img: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=700&q=80',
        desc: 'Advanced obstacle training focusing on upper body strength, dynamic jumps, and complex balance challenges.',
      },
      {
        name: 'Varsity Prep',
        ages: '13 – 17 years',
        img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=700&q=80',
        desc: 'Sports-agnostic class focusing on vertical jump, explosive power, and flexibility to prevent injury in high school sports.',
      },
    ],
  },
  {
    id: 'adults',
    label: 'Adults',
    range: '18 – 65 years',
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80',
    color: {
      bg: 'var(--dt-primary-light)',
      text: 'var(--dt-primary)',
      border: 'var(--dt-primary)',
      accent: 'var(--dt-primary)',
    },
    focus: 'Cardiovascular health, mobility & strength',
    note: 'Classes often scheduled concurrently with kid classes — work out while your child does!',
    classes: [
      {
        name: 'Burn & Firm HIIT',
        ages: '18 – 65 years',
        track: 'Cardio & Sweat',
        img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&q=80',
        desc: '45 minutes of high-intensity intervals alternating between cardio bursts and resistance exercises.',
      },
      {
        name: 'Cardio Kickboxing',
        ages: '18 – 65 years',
        track: 'Cardio & Sweat',
        img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&q=80',
        desc: 'Non-contact punching and kicking combinations set to high-tempo music. Excellent for stress relief and core strength.',
      },
      {
        name: 'Spin Cycle',
        ages: '18 – 65 years',
        track: 'Cardio & Sweat',
        img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&q=80',
        desc: 'Indoor cycling focused on endurance and hill climbs.',
      },
      {
        name: 'Power Yoga',
        ages: '18 – 65 years',
        track: 'Strength & Balance',
        img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&q=80',
        desc: 'A vigorous vinyasa flow to build heat, increase flexibility, and improve core stability.',
      },
      {
        name: 'Barre Sculpt',
        ages: '18 – 65 years',
        track: 'Strength & Balance',
        img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&q=80',
        desc: 'Low-impact movements using the ballet barre to target small muscle groups in the glutes, legs, and core.',
      },
      {
        name: 'Adult Gymnastics',
        ages: '18 – 65 years',
        track: 'Strength & Balance',
        img: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=700&q=80',
        desc: "It's never too late! Learn basic tumbling, handstands, and trampoline safety in a judgment-free zone.",
      },
      {
        name: 'Functional Strength',
        ages: '18 – 65 years',
        track: 'Strength & Balance',
        img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=700&q=80',
        desc: 'Kettlebells, dumbbells, and TRX suspension training designed to improve strength for daily life activities.',
      },
    ],
  },
  {
    id: 'seniors',
    label: 'Seniors',
    range: '65+ years',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80',
    color: {
      bg: 'var(--dt-teal-light)',
      text: 'var(--dt-teal-dark)',
      border: 'var(--dt-teal)',
      accent: 'var(--dt-teal-dark)',
    },
    focus: 'Balance, mobility & social connection',
    classes: [
      {
        name: 'Silver Strong',
        ages: '65+ years',
        img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80',
        desc: 'Low-impact cardio and balance training designed for older adults. Safe, encouraging, and social.',
      },
      {
        name: 'Golden Gains',
        ages: '65+ years',
        img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=700&q=80',
        desc: 'Gentle resistance training to maintain bone density and muscle tone. Chair-assisted options available.',
      },
      {
        name: 'Classic Cardio',
        ages: '65+ years',
        img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&q=80',
        desc: 'Steady-state cardio in a low-intensity format — walking programs, light aerobics, and rhythm movement.',
      },
      {
        name: 'Balance & Bone',
        ages: '65+ years',
        img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&q=80',
        desc: 'Focused fall-prevention exercises, proprioception drills, and flexibility work to support healthy aging.',
      },
    ],
  },
]

export const SCHEDULE_DAYS: ScheduleDay[] = [
  {
    day: 'Mon – Thu',
    label: 'Weekday Grind',
    desc: 'Routine, consistency, and maximizing the after-school/after-work rush.',
    color: 'var(--dt-primary)',
    slots: [
      {
        time: '5:30 – 6:30 AM',
        studios: [
          { studio: 'All Studios', label: 'HIIT Bootcamp or Spin', tag: 'Adults', tagColor: 'var(--dt-primary)' },
        ],
      },
      {
        time: '9:00 – 10:00 AM',
        simultaneous: true,
        studios: [
          {
            studio: 'Studio A',
            label: 'Silver Strong — Low-impact cardio & balance',
            tag: 'Seniors',
            tagColor: 'var(--dt-teal-dark)',
          },
          {
            studio: 'Studio B',
            label: 'Tiny Titans — Motor skills, tumbling & games',
            tag: 'Toddlers 2–4',
            tagColor: '#D97706',
          },
          {
            studio: 'Studio C',
            label: 'Parent Power Hour — Circuit training',
            tag: 'Parents',
            tagColor: 'var(--dt-primary)',
          },
        ],
      },
      {
        time: '10:30 – 11:15 AM',
        studios: [
          {
            studio: 'Studio A',
            label: 'Baby & Me Yoga / Stroller Fit',
            tag: 'Babies 6–18mo',
            tagColor: 'var(--dt-teal-dark)',
          },
        ],
      },
      {
        time: '12:00 – 12:45 PM',
        studios: [
          {
            studio: 'All Studios',
            label: '45-min Tabata / Abs — Lunch Express',
            tag: 'Adults',
            tagColor: 'var(--dt-primary)',
          },
        ],
      },
      {
        time: '3:45 – 4:30 PM',
        studios: [
          {
            studio: 'Studio A',
            label: 'Ninja Warrior Jr. — Obstacle courses & agility',
            tag: 'Ages 5–9',
            tagColor: 'var(--dt-primary)',
          },
        ],
      },
      {
        time: '4:45 – 5:45 PM',
        simultaneous: true,
        studios: [
          {
            studio: 'Studio A',
            label: 'Youth Athletic Conditioning — Speed & team games',
            tag: 'Kids 8–12',
            tagColor: 'var(--dt-primary)',
          },
          {
            studio: 'Studio B',
            label: 'Varsity Lift — Intro to weightlifting & strength',
            tag: 'Teens',
            tagColor: 'var(--dt-teal-dark)',
          },
          {
            studio: 'Studio C',
            label: 'After-Burn — High-intensity interval training',
            tag: 'Adults',
            tagColor: 'var(--dt-primary)',
          },
        ],
      },
      {
        time: '6:00 – 7:00 PM',
        studios: [
          { studio: 'Studio A', label: 'Adult Zumba / Dance Cardio', tag: 'Adults', tagColor: 'var(--dt-primary)' },
          { studio: 'Studio B', label: 'Teen Yoga / Mobility', tag: 'Teens', tagColor: 'var(--dt-teal-dark)' },
        ],
      },
    ],
  },
  {
    day: 'Friday',
    label: 'Fun Day',
    desc: 'Social connection and fun over strict training. End the week on a high.',
    color: 'var(--dt-teal-dark)',
    slots: [
      {
        time: '9:00 – 11:15 AM',
        studios: [
          {
            studio: 'All Studios',
            label: 'Same as Mon–Thu morning blocks',
            tag: 'All Ages',
            tagColor: 'var(--dt-teal-dark)',
          },
        ],
      },
      {
        time: '4:00 PM',
        studios: [{ studio: 'Gym Floor', label: 'Open Gym / Free Play', tag: 'Kids', tagColor: 'var(--dt-primary)' }],
      },
      {
        time: '5:30 – 6:30 PM',
        studios: [
          {
            studio: 'Main Floor',
            label: 'Family Fitness Fri-YAY — Partner relays, balloon volleyball, tag games',
            tag: 'Families',
            tagColor: 'var(--dt-primary)',
          },
        ],
      },
    ],
  },
  {
    day: 'Saturday',
    label: 'Family Prime Time',
    desc: 'Longer classes and family-first scheduling.',
    color: '#D97706',
    slots: [
      {
        time: '8:30 – 9:30 AM',
        studios: [
          {
            studio: 'All Studios',
            label: 'Weekend Warriors — 60-min Spin or Outdoor Run Club',
            tag: 'Adults',
            tagColor: 'var(--dt-primary)',
          },
        ],
      },
      {
        time: '9:30 – 10:15 AM',
        studios: [
          {
            studio: 'Studio A',
            label: 'Music & Movement — Bubbles, songs & light tumbling',
            tag: 'Babies & Toddlers',
            tagColor: '#D97706',
          },
        ],
      },
      {
        time: '10:00 – 11:30 AM',
        simultaneous: true,
        studios: [
          {
            studio: 'Studio A',
            label: 'Game Day — Soccer, dodgeball & active team sports',
            tag: 'Kids 6+',
            tagColor: 'var(--dt-primary)',
          },
          {
            studio: 'Studio B',
            label: 'Yoga Flow — Recover from the work week',
            tag: 'Adults',
            tagColor: 'var(--dt-primary)',
          },
        ],
      },
      {
        time: '12:00 PM',
        studios: [{ studio: '–', label: 'Gym closes or transitions to Birthday Parties', tag: '', tagColor: '#AAA' }],
      },
    ],
  },
  {
    day: 'Sunday',
    label: 'Rest or Workshops',
    desc: 'Closed for rest, or optional workshops only.',
    color: 'var(--dt-dark)',
    slots: [
      {
        time: 'Option A',
        studios: [{ studio: '–', label: 'Closed — Rest day for staff & members', tag: '', tagColor: '#AAA' }],
      },
      {
        time: 'Option B',
        studios: [
          {
            studio: 'Studio A',
            label: 'Specialty Workshops — e.g. "Intro to Lifting for Teens" seminar',
            tag: 'Workshops',
            tagColor: 'var(--dt-teal-dark)',
          },
        ],
      },
    ],
  },
]

export const SPECIAL_PROGRAMS: SpecialProgram[] = [
  {
    name: 'Prenatal Fitness',
    desc: 'Safe, guided movement classes for expecting mothers. Focus on core stability, pelvic floor health, breathing techniques, and low-impact cardio.',
    badge: 'Pregnant Moms',
    badgeColor: 'var(--dt-teal-dark)',
    badgeBg: 'var(--dt-teal-light)',
    border: 'var(--dt-teal)',
    img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=900&q=80',
  },
  {
    name: 'Postnatal Recovery',
    desc: 'Gentle return-to-movement classes for nursing mothers. Baby-welcome environment with focus on recovery, core rehabilitation, and energy restoration.',
    badge: 'Nursing Moms',
    badgeColor: '#B45309',
    badgeBg: '#FFF8EB',
    border: '#FDE68A',
    img: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=900&q=80',
  },
  {
    name: 'Special Needs Classes',
    desc: 'Inclusive, adaptive fitness sessions for children and adults with varying physical, sensory, and cognitive needs. All instructors are sensitivity-trained.',
    badge: 'Adaptive Fitness',
    badgeColor: 'var(--dt-primary)',
    badgeBg: 'var(--dt-primary-light)',
    border: 'var(--dt-primary)',
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80',
  },
  {
    name: 'Eye Click – Projected Activities',
    desc: 'Interactive projected games and activities that blend movement with technology. Reaction walls, light-up tiles, and immersive movement experiences.',
    badge: 'Tech-Enhanced',
    badgeColor: 'var(--dt-primary)',
    badgeBg: 'var(--dt-primary-light)',
    border: 'var(--dt-primary)',
    img: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=900&q=80',
  },
  {
    name: 'Family Fitness Fri-YAY',
    desc: 'A weekly Friday evening class where parents and kids work out together — partner relays, balloon volleyball, tag games, and fun challenges for all ages.',
    badge: 'Every Friday',
    badgeColor: 'var(--dt-teal-dark)',
    badgeBg: 'var(--dt-teal-light)',
    border: 'var(--dt-teal)',
    img: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=900&q=80',
  },
  {
    name: 'Youth Workshops',
    desc: 'Sunday specialty workshops — "Intro to Lifting for Teens," sport-specific clinics, injury-prevention seminars, and more. Check the schedule for upcoming topics.',
    badge: 'Sundays',
    badgeColor: 'var(--dt-primary)',
    badgeBg: 'var(--dt-primary-light)',
    border: 'var(--dt-primary)',
    img: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=900&q=80',
  },
]
