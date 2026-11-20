export type DisciplineCategory =
  | 'Aerospace & Aviation'
  | 'Electrical & Wireless'
  | 'Computing & Web'
  | 'Artificial Intelligence'
  | 'OUR ALUMNI';

export type LayoutVariant =
  | 'monograph-left'
  | 'editorial-right'
  | 'folio-split'
  | 'archival-plate';

export interface PersonalityProfile {
  id: string;
  slideNumber: number;
  name: string;
  birthYear: number;
  lifespan: string;
  born?: string;
  education?: string;
  field: string;
  achievements: string;
  recognitionLabel?: 'Recognition' | 'Special recognition' | string;
  recognition?: string;
  died?: string;
  image: string;
  discipline: DisciplineCategory;
  layout: LayoutVariant;
  isLandscapeImage?: boolean;
  customDetails?: Array<{ label: string; value: string }>;
}

export type SlideEntry =
  | {
      id: 'cover';
      slideNumber: 1;
      kind: 'cover';
      title: string;
      subtitle: string;
    }
  | {
      id: string;
      slideNumber: number;
      kind: 'personality';
      title: string;
      subtitle: string;
      profile: PersonalityProfile;
    }
  | {
      id: 'overview';
      slideNumber: number;
      kind: 'overview';
      title: string;
      subtitle: string;
    }
  | {
      id: 'closing';
      slideNumber: number;
      kind: 'closing';
      title: string;
      subtitle: string;
    };

export const PERSONALITIES: PersonalityProfile[] = [
  {
    id: 'sundar-pichai',
    slideNumber: 2,
    name: 'Sundar Pichai',
    birthYear: 1972,
    lifespan: '1972 – Present',
    born: '10 June 1972, Madurai, Tamil Nadu, India.',
    education:
      'Metallurgical Engineering, IIT Kharagpur; MS from Stanford University; MBA from the Wharton School, University of Pennsylvania.',
    field: 'Computer Technology and Software Engineering.',
    achievements:
      'Led the development of Google Chrome and ChromeOS, oversaw Android, and became CEO of Google (2015) and Alphabet Inc. (2019).',
    recognitionLabel: 'Recognition',
    recognition:
      'Padma Bhushan (2022); one of the most prominent technology leaders in the world.',
    image: '/assets/aistudio/image_a1a601b2.png',
    discipline: 'Computing & Web',
    layout: 'editorial-right',
  },
  {
    id: 'abdul-kalam',
    slideNumber: 3,
    name: 'Dr. A. P. J. Abdul Kalam',
    birthYear: 1931,
    lifespan: '1931 – 2015',
    born: '15 October 1931, Rameswaram, Tamil Nadu, India.',
    education: 'Aerospace Engineering, Madras Institute of Technology.',
    field: 'Aerospace and Missile Technology.',
    achievements:
      "Played a major role in India's SLV-III satellite launch vehicle and missile development programmes.",
    recognitionLabel: 'Special recognition',
    recognition: 'Known as the Missile Man of India; 11th President of India.',
    died: '27 July 2015.',
    image: '/assets/portraits/01_abdul_kalam.jpg',
    discipline: 'Aerospace & Aviation',
    layout: 'monograph-left',
  },
  {
    id: 'narayana-murthy',
    slideNumber: 4,
    name: 'N. R. Narayana Murthy',
    birthYear: 1946,
    lifespan: '1946 – Present',
    born: '20 August 1946, Karnataka, India.',
    education:
      "Electrical Engineering, National Institute of Engineering, Mysore; Master's in Technology from IIT Kanpur.",
    field: 'Information Technology.',
    achievements:
      'Co-founded Infosys in 1981 and helped establish India as a global IT services destination.',
    recognitionLabel: 'Recognition',
    recognition: 'Padma Shri and Padma Vibhushan.',
    image: '/assets/portraits/02_narayana_murthy.jpg',
    discipline: 'Computing & Web',
    layout: 'editorial-right',
  },
  {
    id: 'nikola-tesla',
    slideNumber: 5,
    name: 'Nikola Tesla',
    birthYear: 1856,
    lifespan: '1856 – 1943',
    born: '10 July 1856, Smiljan, Austrian Empire (now Croatia).',
    education: 'Studied engineering at the Austrian Polytechnic in Graz.',
    field: 'Electrical Engineering.',
    achievements:
      'Developed important AC electrical power technologies, including the induction motor.',
    recognitionLabel: 'Recognition',
    recognition: 'One of the most influential electrical inventors in history.',
    died: '7 January 1943.',
    image: '/assets/aistudio/image_357f6a81.png',
    discipline: 'Electrical & Wireless',
    layout: 'monograph-left',
  },
  {
    id: 'thomas-edison',
    slideNumber: 6,
    name: 'Thomas Alva Edison',
    birthYear: 1847,
    lifespan: '1847 – 1931',
    born: '11 February 1847, Ohio, USA.',
    education: 'Mostly self-educated.',
    field: 'Electrical Technology and Invention.',
    achievements:
      'Developed practical incandescent lighting systems, the phonograph and motion-picture technologies.',
    recognitionLabel: 'Recognition',
    recognition: 'Held over 1,000 US patents.',
    died: '18 October 1931.',
    image: '/assets/portraits/04_thomas_edison.jpg',
    discipline: 'Electrical & Wireless',
    layout: 'archival-plate',
  },
  {
    id: 'satish-dhawan',
    slideNumber: 7,
    name: 'Satish Dhawan',
    birthYear: 1920,
    lifespan: '1920 – 2002',
    born: '25 September 1920, Srinagar, India.',
    education:
      'Engineering, Mathematics and Aeronautical Engineering; studied at the University of Minnesota and Caltech.',
    field: 'Aerospace Engineering.',
    achievements:
      "Led ISRO as its chairman and strengthened India's satellite and launch vehicle programmes.",
    recognitionLabel: 'Special recognition',
    recognition: "Known as a pioneer of India's space programme.",
    died: '3 January 2002.',
    image: '/assets/portraits/05_satish_dhawan.jpg',
    discipline: 'Aerospace & Aviation',
    layout: 'monograph-left',
  },
  {
    id: 'alan-turing',
    slideNumber: 8,
    name: 'Alan Turing',
    birthYear: 1912,
    lifespan: '1912 – 1954',
    born: '23 June 1912, London, England.',
    education: 'Mathematics, University of Cambridge.',
    field: 'Computer Science and Mathematics.',
    achievements:
      'Developed the concept of the Turing machine and made major contributions to codebreaking during World War II.',
    recognitionLabel: 'Recognition',
    recognition: 'Widely regarded as one of the fathers of modern computer science.',
    died: '7 June 1954.',
    image: '/assets/portraits/06_alan_turing.jpg',
    discipline: 'Computing & Web',
    layout: 'editorial-right',
  },
  {
    id: 'tim-berners-lee',
    slideNumber: 9,
    name: 'Tim Berners-Lee',
    birthYear: 1955,
    lifespan: '1955 – Present',
    born: '8 June 1955, London, England.',
    education: 'Physics, University of Oxford.',
    field: 'Computer Science and Internet Technology.',
    achievements: 'Invented the World Wide Web in 1989.',
    recognitionLabel: 'Recognition',
    recognition: 'Received the Turing Award in 2016.',
    image: '/assets/portraits/07_tim_berners_lee.jpg',
    discipline: 'Computing & Web',
    layout: 'archival-plate',
  },
  {
    id: 'steve-jobs',
    slideNumber: 10,
    name: 'Steve Jobs',
    birthYear: 1955,
    lifespan: '1955 – 2011',
    born: '24 February 1955, San Francisco, USA.',
    education: 'Attended Reed College but did not graduate.',
    field: 'Computer Technology and Product Design.',
    achievements:
      'Co-founded Apple and helped popularise the Macintosh, iPod, iPhone and iPad.',
    recognitionLabel: 'Recognition',
    recognition: 'One of the most influential technology entrepreneurs.',
    died: '5 October 2011.',
    image: '/assets/portraits/08_steve_jobs.jpg',
    discipline: 'Computing & Web',
    layout: 'monograph-left',
  },
  {
    id: 'jensen-huang',
    slideNumber: 11,
    name: 'Jensen Huang',
    birthYear: 1963,
    lifespan: '1963 – Present',
    born: '17 February 1963, Taiwan.',
    education:
      "Electrical Engineering, Oregon State University; Master's from Stanford University.",
    field: 'Computer Engineering and Artificial Intelligence.',
    achievements:
      'Co-founded NVIDIA in 1993 and helped advance GPU computing and AI technology.',
    recognitionLabel: 'Recognition',
    recognition: 'One of the leading figures in modern computing.',
    image: '/assets/portraits/09_jensen_huang.jpg',
    discipline: 'Artificial Intelligence',
    layout: 'editorial-right',
  },
  {
    id: 'fei-fei-li',
    slideNumber: 12,
    name: 'Fei-Fei Li',
    birthYear: 1976,
    lifespan: '1976 – Present',
    born: '1976, Beijing, China.',
    education:
      'Physics, Princeton University; PhD in Electrical Engineering, California Institute of Technology.',
    field: 'Artificial Intelligence and Computer Vision.',
    achievements:
      'Led the development of ImageNet, a major dataset that helped advance image recognition research.',
    recognitionLabel: 'Recognition',
    recognition: 'A leading AI researcher and professor at Stanford University.',
    image: '/assets/portraits/10_feifei_li.jpg',
    discipline: 'Artificial Intelligence',
    layout: 'archival-plate',
  },
  {
    id: 'demis-hassabis',
    slideNumber: 13,
    name: 'Demis Hassabis',
    birthYear: 1976,
    lifespan: '1976 – Present',
    born: '27 July 1976, London, England.',
    education:
      'Computer Science, University of Cambridge; PhD in Cognitive Neuroscience, University College London.',
    field: 'Artificial Intelligence.',
    achievements:
      'Co-founded DeepMind and contributed to AI systems such as AlphaGo and AlphaFold.',
    recognitionLabel: 'Recognition',
    recognition:
      'Nobel Prize in Chemistry (2024), jointly awarded for protein structure prediction work.',
    image: '/assets/portraits/11_demis_hassabis.jpg',
    discipline: 'Artificial Intelligence',
    layout: 'monograph-left',
  },
  {
    id: 'wright-brothers',
    slideNumber: 14,
    name: 'Wright Brothers – Orville and Wilbur Wright',
    birthYear: 1867,
    lifespan: 'Wilbur 1867 · Orville 1871',
    born: 'Wilbur – 16 April 1867; Orville – 19 August 1871, USA.',
    education: 'High-school education; largely self-taught in aviation engineering.',
    field: 'Aeronautical Engineering.',
    achievements:
      'Built and flew the first successful powered, controlled and sustained aeroplane flight in 1903.',
    recognitionLabel: 'Recognition',
    recognition: 'Pioneers of modern aviation.',
    image: '/assets/portraits/12_wright_brothers.jpg',
    discipline: 'Aerospace & Aviation',
    layout: 'folio-split',
    isLandscapeImage: true,
  },
  {
    id: 'katherine-johnson',
    slideNumber: 15,
    name: 'Katherine Johnson',
    birthYear: 1918,
    lifespan: '1918 – 2020',
    born: '26 August 1918, West Virginia, USA.',
    education: 'Mathematics, West Virginia State College.',
    field: 'Aerospace Mathematics.',
    achievements:
      "Performed critical flight trajectory calculations for NASA's early human spaceflight missions.",
    recognitionLabel: 'Recognition',
    recognition: 'Presidential Medal of Freedom (2015).',
    died: '24 February 2020.',
    image: '/assets/portraits/13_katherine_johnson.jpg',
    discipline: 'Aerospace & Aviation',
    layout: 'editorial-right',
  },
  {
    id: 'hedy-lamarr',
    slideNumber: 16,
    name: 'Hedy Lamarr',
    birthYear: 1914,
    lifespan: '1914 – 2000',
    born: '9 November 1914, Vienna, Austria.',
    education: 'No formal engineering degree.',
    field: 'Wireless Communication Technology.',
    achievements:
      'Co-invented a frequency-hopping communication system with George Antheil.',
    recognitionLabel: 'Recognition',
    recognition:
      'Her invention contributed to the history of spread-spectrum communication.',
    died: '19 January 2000.',
    image: '/assets/portraits/14_hedy_lamarr.jpg',
    discipline: 'Electrical & Wireless',
    layout: 'archival-plate',
  },
  {
    id: 'gk-aakhash',
    slideNumber: 17,
    name: 'G.K. Aakhash',
    birthYear: 2007,
    lifespan: 'Academic Year 2025–2026',
    born: 'Kanniyakumari District, Tamil Nadu, India.',
    education: 'Kanniyakumari District Govt. Model School.',
    field: 'IIIT DHARWAD (JoSAA) · Computer Science & Engineering',
    achievements: 'Cracked JEE Mains',
    recognitionLabel: 'Special recognition',
    recognition:
      'Admitted to Indian Institute of Information Technology (IIIT) Dharwad through JoSAA; Distinguished Alumnus of Kanniyakumari District Govt. Model School.',
    image: '/assets/portraits/gk_aakhash.jpg',
    discipline: 'OUR ALUMNI',
    layout: 'editorial-right',
    customDetails: [
      { label: 'School', value: 'Kanniyakumari District Govt. Model School' },
      { label: 'Institute', value: 'IIIT DHARWAD (via JoSAA)' },
      { label: 'Academic Year', value: '2025–2026' },
      { label: 'Achievements', value: 'Cracked JEE Mains' },
      {
        label: 'Special recognition',
        value:
          'Selected for Indian Institute of Information Technology (IIIT) Dharwad via JoSAA Seat Allocation; Proud Alumnus of Kanniyakumari District Govt. Model School.',
      },
    ],
  },
];

export const SLIDES: SlideEntry[] = [
  {
    id: 'cover',
    slideNumber: 1,
    kind: 'cover',
    title: 'Engineering and Technology',
    subtitle: 'Famous Personalities',
  },
  ...PERSONALITIES.map((profile) => ({
    id: profile.id,
    slideNumber: profile.slideNumber,
    kind: 'personality' as const,
    title: profile.name,
    subtitle:
      profile.discipline === 'OUR ALUMNI'
        ? 'OUR ALUMNI · Kanniyakumari District Govt. Model School'
        : profile.field.replace(/\.$/, ''),
    profile,
  })),
  {
    id: 'overview',
    slideNumber: PERSONALITIES.length + 2,
    kind: 'overview',
    title: 'Chronology & Disciplines',
    subtitle: `${PERSONALITIES.length} pioneers and alumni across engineering and technology`,
  },
  {
    id: 'closing',
    slideNumber: PERSONALITIES.length + 3,
    kind: 'closing',
    title: 'Thank You',
    subtitle: 'Engineering and Technology — Famous Personalities & Our Alumni',
  },
];
