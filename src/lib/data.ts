
import { BookOpen, HeartHandshake, Landmark, Megaphone, Microscope, Scale, Users, Handshake, Mail, MapPin, Phone, Award, BrainCircuit, Leaf, Sprout, Instagram, MessageCircle, Facebook, Twitter, Linkedin, Share2, Youtube } from 'lucide-react';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About Us' },
  { href: '/what-we-do', label: 'What We Do' },
  { href: '/our-activity', label: 'Our Activity' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/contact', label: 'Contact' },
];

export const FOCUS_AREAS = [
  {
    icon: BrainCircuit,
    title: 'Education & Skill Development',
    description: 'Fostering intellectual growth and practical skills through comprehensive educational programs, from scholarships to vocational training, ensuring everyone has the opportunity to learn and grow.',
    slug: 'education-and-skill-development',
    points: [
      'Awarding scholarships and financial aid to deserving students from marginalized backgrounds.',
      'Conducting digital literacy programs for all age groups to bridge the technology gap.',
      'Establishing vocational training centers to equip youth with job-oriented skills.',
      'Providing essential resources and infrastructure support to under-equipped schools.'
    ]
  },
  {
    icon: HeartHandshake,
    title: 'Health & Wellness',
    description: 'Promoting community health through proactive and accessible healthcare solutions, including medical camps, awareness programs, and vital support for maternal and child wellness.',
    slug: 'health-and-wellness',
    points: [
        'Organizing free medical camps and health check-ups in remote and underserved areas.',
        'Running awareness campaigns on preventive healthcare, hygiene, and nutrition.',
        'Supporting maternal and child health through pre-natal and post-natal care services.',
        'Promoting blood and organ donation awareness to save lives.'
    ]
  },
  {
    icon: Users,
    title: 'Women Empowerment',
    description: 'Championing the rights and advancement of women by fostering economic independence, health awareness, and leadership skills to create a more equitable society.',
    slug: 'women-empowerment',
    points: [
        'Facilitating the formation of Self-Help Groups (SHGs) for financial independence.',
        'Providing support and mentorship for women-led small businesses and entrepreneurship.',
        'Conducting workshops on menstrual hygiene and distributing sanitary products.',
        'Advocating for gender equality and working to eliminate gender-based discrimination.'
    ]
  },
  {
    icon: Leaf,
    title: 'Environment & Sustainability',
    description: 'Committing to the preservation of our planet through proactive environmental initiatives, including reforestation, waste reduction, and promoting sustainable practices for a greener future.',
    slug: 'environment-and-sustainability',
    points: [
        'Organizing mass tree plantation drives to combat deforestation and improve air quality.',
        'Implementing community-based waste management and recycling programs.',
        'Promoting water conservation and sanitation projects in water-scarce regions.',
        'Conducting workshops on climate change adaptation and sustainable living practices.'
    ]
  },
  {
    icon: Sprout,
    title: 'Rural Development',
    description: 'Uplifting rural communities by enhancing livelihoods, ensuring access to basic amenities like clean water, and fostering local entrepreneurship to create self-sufficient and thriving villages.',
    slug: 'rural-development',
    points: [
        'Implementing programs for sustainable agriculture and livelihood enhancement.',
        'Ensuring access to clean and safe drinking water through borewells and filtration systems.',
        'Promoting rural entrepreneurship with a focus on local crafts and produce.',
        'Improving rural infrastructure, including roads, community halls, and sanitation facilities.'
    ]
  },
];

export const INITIATIVES = [
  {
    id: 1,
    title: 'Community Education Program',
    slug: 'community-education-program',
    category: 'Education',
    shortDescription: 'Providing educational resources and support to underserved communities.',
    longDescription: 'The Community Education Program aims to bridge educational gaps by providing free tutoring, workshops, and access to digital learning tools for children and adults in low-income neighborhoods. We believe education is the key to unlocking potential and creating a brighter future.',
    goals: [
      'Improve literacy rates by 20% in target communities.',
      'Provide 1,000+ hours of free tutoring annually.',
      'Equip 5 community centers with computer labs.',
    ],
    impact: 'Over 500 children have improved their reading levels, and 200 adults have gained new digital skills for better employment opportunities.',
    imageUrl: 'initiative-education',
    howToHelp: 'Volunteer as a tutor, donate to our resource fund, or help organize a book drive.'
  },
  {
    id: 2,
    title: 'Public Health Initiative',
    slug: 'public-health-initiative',
    category: 'Healthcare',
    shortDescription: 'Promoting wellness and preventative care in vulnerable populations.',
    longDescription: 'Our Public Health Initiative focuses on preventative care through free health screenings, vaccination drives, and wellness education campaigns. We partner with local clinics to bring essential health services directly to the people who need them most.',
    goals: [
      'Conduct 5,000 free health screenings annually.',
      'Administer 10,000 vaccinations for preventable diseases.',
      'Reach 50,000 people through our health awareness campaigns.',
    ],
    impact: 'We have identified and provided early-stage treatment for hundreds of individuals and significantly increased vaccination rates in several at-risk areas.',
    imageUrl: 'initiative-healthcare',
    howToHelp: 'Medical professionals can volunteer at our clinics, or you can help by distributing information and supporting our campaign logistics.'
  },
  {
    id: 3,
    title: 'Urban Renewal Project',
    slug: 'urban-renewal-project',
    category: 'Community Development',
    shortDescription: 'Revitalizing neighborhoods through community-led projects.',
    longDescription: 'The Urban Renewal Project empowers residents to transform their own neighborhoods. We provide funding and support for community gardens, park restorations, public art installations, and small business facade improvements, fostering pride and economic growth.',
    goals: [
      'Support 15 community-led renewal projects each year.',
      'Create 20,000 square feet of new green space.',
      'Engage 1,000+ community volunteers in renewal activities.',
    ],
    impact: 'Ten neighborhoods have seen a measurable increase in safety, property values, and community engagement. Three new community gardens now provide fresh produce to residents.',
    imageUrl: 'initiative-community',
    howToHelp: 'Join a local cleanup day, contribute to a project fund, or share your skills in gardening, construction, or art.'
  },
  {
    id: 4,
    title: 'Policy Reform Advocacy',
    slug: 'policy-reform-advocacy',
    category: 'Policy Advocacy',
    shortDescription: 'Working towards a more just and equitable society through systemic change.',
    longDescription: 'Our Policy Reform Advocacy team works with lawmakers, experts, and community leaders to research, draft, and champion legislation that addresses systemic inequality. We focus on areas like housing, criminal justice reform, and environmental protection.',
    goals: [
      'Influence at least 3 pieces of key legislation per year.',
      'Publish 5 in-depth policy reports based on our research.',
      'Mobilize 10,000 citizens to contact their representatives on key issues.',
    ],
    impact: 'Our advocacy was instrumental in passing the new Fair Housing Act and contributed to significant amendments in the Clean Air & Water Bill.',
    imageUrl: 'initiative-policy',
    howToHelp: 'Sign our petitions, join our letter-writing campaigns, or help us research and analyze policy issues.'
  }
];

export const NEWS_ARTICLES = [
  {
    id: 1,
    slug: 'new-literacy-center-opens',
    title: 'Vikhyat Foundation Opens New Literacy Center Downtown',
    category: 'Press Release',
    date: 'October 26, 2023',
    shortDescription: 'Our new center will serve over 200 children and adults weekly, offering free classes and resources.',
    imageUrl: 'news-1'
  },
  {
    id: 2,
    slug: 'annual-gala-a-success',
    title: 'Annual "Forward Together" Gala Raises Record Funds for Healthcare',
    category: 'Event',
    date: 'October 15, 2023',
    shortDescription: 'Thanks to our generous supporters, we raised over $500,000 to expand our Public Health Initiative.',
    imageUrl: 'news-2'
  },
  {
    id: 3,
    slug: 'partnership-with-tech-corp',
    title: 'Vikhyat Foundation Announces Strategic Partnership with TechCorp',
    category: 'Success Story',
    date: 'September 30, 2023',
    shortDescription: 'TechCorp will provide technology and volunteers for our Community Education Program, bridging the digital divide.',
    imageUrl: 'news-3'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Mr. Sachin Sukhadev Khandekar',
    title: 'Politian',
    quote: "The Vikhyat Foundation is a social organization that is currently working towards the comprehensive development and rehabilitation of people in remote and ultra-remote areas. My warmest wishes for this work of the renowned foundation and its future endeavors.",
    imageUrl: 'testimonial-1'
  },
  {
    id: 2,
    name: 'Mr. Lokesh Ulhas Patil',
    title: 'Politician',
    quote: 'The need of the hour today is IT Skills along with education. I wish the “Vikhayt Foundation” to all the best for this initiative of going to the localities and educating the college students there about the importance of IT Skills and also providing them with training.',
    imageUrl: 'testimonial-2'
  },
  {
    id: 3,
    name: 'Dr. Pradnya G. Bengale',
    title: 'Well Wisher',
    quote: 'The Vikhyat Foundation is doing work that befits the phrase "Human service is true wealth". Today, it is very important to create public awareness among the people about health problems and their solutions. Thank you, Vikhyat Foundation',
    imageUrl: 'testimonial-3'
  },
  {
    id: 4,
    name: 'Sangeeta Sawant',
    title: 'Lawyer',
    quote: 'The government has created many schemes for the benefit of the people. I appreciate the fact that some of these schemes are being brought to the people through the “Vikhyat Foundation”. Best wishes for the future.',
    imageUrl: 'testimonial-4'
  },
  {
    id: 5,
    name: 'Anushka G. Ghag',
    title: 'Business Women',
    quote: 'The “Vikhyat Foundation” is undertaking many initiatives under the concept of "Skill Development", which is benefiting the younger generation. The aim of creating a skilled new generation is truly commendable.',
    imageUrl: 'testimonial-5'
  },
  {
    id: 6,
    name: 'Shivani Thorat',
    title: 'Actress',
    quote: 'I thank the "Vikhyat Foundation" for its important work of preserving cultural heritage along with social service and organizing to various programs to promote talent.',
    imageUrl: 'testimonial-6'
  },
];

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Mrs. Suman Vinod Morye',
    title: 'Founder & Chairperson',
    imageUrl: 'chairperson-photo'
  }
];

export const GALLERY_IMAGES = [
  { id: 1, imageUrl: 'gallery-1', imageHint: 'volunteers planting' },
  { id: 2, imageUrl: 'gallery-2', imageHint: 'charity run' },
  { id: 3, imageUrl: 'gallery-3', imageHint: 'town hall' },
  { id: 4, imageUrl: 'gallery-4', imageHint: 'community fair' },
  { id: 5, imageUrl: 'gallery-5', imageHint: 'hands sprout' },
  { id: 6, imageUrl: 'gallery-6', imageHint: 'team photo' },
];

export const CONTACT_INFO = {
  address: 'Govind building, station road, thane west 400601',
  email: 'vikhyatfoundation@gmail.com',
  phone: '+919619578549',
  socials: {
    facebook: 'https://www.facebook.com/profile.php?id=61583891132823',
    instagram: 'https://www.instagram.com/vikhyat_foundation/',
    youtube: 'https://youtube.com/@vikhyatfoundation?si=Zi2wVSugmQaEK5OB',
    whatsapp: 'https://wa.me/919619578549'
  }
};

export const GET_INVOLVED_OPTIONS = [
    {
        icon: Handshake,
        title: "Volunteer",
        description: "Join our team of passionate volunteers and make a hands-on difference. Find an opportunity that matches your skills and passion.",
        link: "#get-involved-form",
        cta: "Find Opportunities"
    },
    {
        icon: HeartHandshake,
        title: "Donate",
        description: "Your generous contribution fuels our initiatives and helps us reach more people. Every donation, big or small, creates a ripple of change.",
        link: "#donate-section",
        cta: "Donate Now"
    },
    {
        icon: Share2,
        title: "Spread the Word",
        description: "Be an ambassador for our cause. Share our story on social media, talk to your friends and family, and help us grow our movement.",
        link: "#",
        cta: "Share Our Mission"
    },
    {
        icon: Scale,
        title: "Partnerships",
        description: "We collaborate with corporations, non-profits, and community groups to amplify our impact. Let's work together for a better future.",
        link: "#get-involved-form",
        cta: "Become a Partner"
    },
];

export const CONTACT_METHODS = [
    {
        icon: MapPin,
        title: "Our Office",
        value: CONTACT_INFO.address,
    },
    {
        icon: Mail,
        title: "Email Us",
        value: CONTACT_INFO.email,
    },
    {
        icon: Phone,
        title: "Call Us",
        value: CONTACT_INFO.phone,
    }
];

export const SOCIAL_LINKS = [
  { icon: Facebook, href: CONTACT_INFO.socials.facebook, label: 'Facebook' },
  { icon: Instagram, href: CONTACT_INFO.socials.instagram, label: 'Instagram' },
  { icon: Youtube, href: CONTACT_INFO.socials.youtube, label: 'YouTube' },
  { icon: MessageCircle, href: CONTACT_INFO.socials.whatsapp, label: 'WhatsApp'},
];

export const SHARE_PLATFORMS = [
    { name: 'Facebook', icon: Facebook },
    { name: 'Twitter', icon: Twitter },
    { name: 'LinkedIn', icon: Linkedin },
    { name: 'WhatsApp', icon: MessageCircle },
];
