import { BookOpen, HeartHandshake, Landmark, Megaphone, Microscope, Scale, Users, Handshake, Mail, MapPin, Phone } from 'lucide-react';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About Us' },
  { href: '/initiatives', label: 'What We Do' },
  { href: '/news', label: 'News & Media' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/contact', label: 'Contact' },
];

export const FOCUS_AREAS = [
  {
    icon: BookOpen,
    title: 'Education',
    description: 'Empowering future generations through access to quality education and learning resources.',
    slug: 'community-education-program'
  },
  {
    icon: HeartHandshake,
    title: 'Healthcare',
    description: 'Ensuring accessible and affordable healthcare services for every community member.',
    slug: 'public-health-initiative'
  },
  {
    icon: Users,
    title: 'Community Development',
    description: 'Fostering vibrant, sustainable communities through local empowerment and infrastructure projects.',
    slug: 'urban-renewal-project'
  },
  {
    icon: Landmark,
    title: 'Policy Advocacy',
    description: 'Championing fair and effective policies that address the root causes of social challenges.',
    slug: 'policy-reform-advocacy'
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
    title: 'TrustForward Opens New Literacy Center Downtown',
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
    title: 'TrustForward Announces Strategic Partnership with TechCorp',
    category: 'Success Story',
    date: 'September 30, 2023',
    shortDescription: 'TechCorp will provide technology and volunteers for our Community Education Program, bridging the digital divide.',
    imageUrl: 'news-3'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Maria S.',
    title: 'Program Beneficiary',
    quote: "TrustForward's education program gave me the confidence to go back to school and finish my degree. I'm so grateful for their support.",
    imageUrl: 'testimonial-1'
  },
  {
    id: 2,
    name: 'David L.',
    title: 'Community Leader',
    quote: "I've seen the direct impact of TrustForward's work in our neighborhood. They don't just provide resources; they build relationships and trust.",
    imageUrl: 'testimonial-2'
  },
  {
    id: 3,
    name: 'Dr. Emily Chen',
    title: 'Volunteer Doctor',
    quote: "Volunteering with the Public Health Initiative has been incredibly rewarding. It's an honor to serve my community in such a meaningful way.",
    imageUrl: 'testimonial-3'
  },
];

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Jane Doe',
    title: 'Founder & Executive Director',
    imageUrl: 'team-1'
  },
  {
    id: 2,
    name: 'John Smith',
    title: 'Director of Initiatives',
    imageUrl: 'team-2'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    title: 'Director of Policy',
    imageUrl: 'team-3'
  },
  {
    id: 4,
    name: 'Robert Brown',
    title: 'Community Outreach Coordinator',
    imageUrl: 'team-4'
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
  address: '123 Progress Ave, Unity City, 12345',
  email: 'info@trustforward.org',
  phone: '(123) 456-7890',
  socials: {
    facebook: '#',
    twitter: '#',
    linkedin: '#',
  }
};

export const GET_INVOLVED_OPTIONS = [
    {
        icon: Handshake,
        title: "Volunteer",
        description: "Join our team of passionate volunteers and make a hands-on difference. Find an opportunity that matches your skills and passion.",
        link: "#volunteer-form",
        cta: "Find Opportunities"
    },
    {
        icon: HeartHandshake,
        title: "Donate",
        description: "Your generous contribution fuels our initiatives and helps us reach more people. Every donation, big or small, creates a ripple of change.",
        link: "#",
        cta: "Donate Now"
    },
    {
        icon: Megaphone,
        title: "Spread the Word",
        description: "Be an ambassador for our cause. Share our story on social media, talk to your friends and family, and help us grow our movement.",
        link: "#",
        cta: "Share Our Mission"
    },
    {
        icon: Scale,
        title: "Partnerships",
        description: "We collaborate with corporations, non-profits, and community groups to amplify our impact. Let's work together for a better future.",
        link: "/contact",
        cta: "Become a Partner"
    }
]

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
]
