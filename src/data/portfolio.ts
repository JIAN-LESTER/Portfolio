import type { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
    personal: {
        name: 'Jian Lester Tabarno',
        role: 'Full Stack Web & Mobile Developer',
        tagline:
            'I build functional web, mobile, and AI-powered applications with clean interfaces, reliable backend logic, structured data, and quality-tested features.',
        bio: 'I am a BSIT graduate and full-stack developer who builds reliable web, mobile, and AI-powered applications using Laravel, React, Flutter, and Node.js.',
        location: 'Kibawe, Bukidnon, Philippines',
        availability: 'Open to work',
        email: 'tabarno.jian@gmail.com',
        phone: '+63 9072894778',
        github: 'https://github.com/JIAN-LESTER',
        linkedin: 'https://www.linkedin.com/in/jian-lester-tabarno/',
        facebook: 'https://www.facebook.com/jian.lester.tabarno/',
        website: 'https://jianlester.vercel.app',
        image: '/images/profile-transparent.webp',
        resumeUrl: '/images/Jian_Tabarno_Resume.pdf',
    },

    education: {
        school: 'Central Mindanao University',
        degree: 'Bachelor of Science',
        field: 'Information Technology',
        start: 'Aug 2022',
        end: 'Jul 2026',
        honor: 'Cum Laude',
        description:
            'GPA: 4.31. Coursework and capstone work focused on applied software systems, full-stack development, mobile applications, database design, and real-world system implementation.',
    },

    experience: {
        company: 'Engagis Incorporated',
        role: 'IT Intern / Software Tester',
        start: 'Feb 2026',
        end: 'May 2026',
        location: 'Cagayan de Oro City, Philippines',
        highlights: [
            'Tested 32+ web and mobile application features across multiple development cycles, documented 190+ defects, verified fixes, and supported release QA.',
            'Assisted in debugging 2 web modules and applied front-end improvements that resolved reported usability issues and reduced recurring defects.',
            'Implemented and tested 15+ mobile app features, including user workflows, input validation, media uploads, and functional checks before release.',
        ],
    },

    projects: [
        {
            title: 'OASP Assist',
            status: 'completed',
            startDate: 'July 2025',
            endDate: 'December 2025',
            summary:
                'A Cross-Platform Inquiry Assistant for CMU-OASP using AI-powered data retrieval.',
            image: '/images/projects/oasp-assist-thumbnail.webp',
            imageAlt: 'OASP Assist inquiry dashboard preview',
            description:
                'Developed a cross-platform Flutter inquiry assistant that answers student inquiries using AI-powered data retrieval. Implemented a RAG workflow by converting knowledge-base content into embeddings, storing and searching them in Pinecone, and generating contextual responses through Gemini. Firebase services provide authentication, real-time data, and backend logic.',
            stack: [
                'Flutter',
                'Firebase',
                'Gemini',
                'RAG',
                'Pinecone',
                'Firebase Cloud Functions',
                'TypeScript',
            ],
        },
        {
            title: 'Ticket Hub',
            status: 'completed',
            startDate: 'August 2026',
            endDate: 'October 2026',
            summary:
                'A ticketing platform with in-app voice and video calls for support teams.',
            image: '/images/projects/ticket-hub-thumbnail.webp',
            imageAlt: 'Ticket Hub support workspace preview',
            description:
                'Built a ticket management system for tracking requests, coordinating responses, and resolving support issues. Integrated WebRTC calls so users and support staff can discuss tickets directly in the app.',
            stack: ['Java', 'Spring Boot', 'Next.js', 'WebRTC', 'PostgreSQL', 'Docker'],
        },
        {
            title: 'E-Store',
            status: 'ongoing',
            startDate: 'September 2026',
            endDate: 'Present',
            summary:
                'An online store and ordering platform with rider delivery and a dedicated mobile app.',
            image: '/images/projects/e-store.webp',
            imageAlt: 'Store System commerce and delivery preview',
            description:
                'Developed an e-commerce system that connects product browsing, order placement, and delivery workflows. A dedicated React Native app supports mobile ordering and rider delivery operations.',
            stack: ['Python', 'FastAPI', 'React', 'React Native', 'PostgreSQL'],
        },
        {
            title: 'JobTrackr',
            status: 'ongoing',
            startDate: 'June 2026',
            endDate: 'July 2026',
            summary:
                'A job application tracker with an AI resume analyzer and browser extension.',
            image: '/images/projects/jobtrackr.webp',
            imageAlt: 'JobTrackr application tracking dashboard preview',
            description:
                'Created a personal job tracking system for applications, statuses, notes, and follow-ups, with a browser extension for capturing job details and an AI resume analyzer that compares job descriptions for tailored recommendations.',
            stack: [
                'Laravel',
                'PHP',
                'React',
                'TypeScript',
                'Gemini',
                'PostgreSQL',
            ],
        },
        {
            title: 'EZ Fitness Gym Management',
            status: 'completed',
            startDate: 'October 2025',
            endDate: 'December 2025',
            summary:
                'A QR-enabled operations platform for EZ Fitness Gym in Valencia, Bukidnon.',
            image: '/images/projects/ez-fitness-system-thumbnail.webp',
            imageAlt: 'EZ Fitness Gym Management operations preview',
            description:
                'Built a gym management system with member management, attendance tracking, inventory, point-of-sale, and reporting features. Integrated QR-based member authentication to speed up check-ins and improve attendance accuracy for daily gym operations.',
            stack: ['Laravel', 'PHP', 'Blade', 'JavaScript', 'PostgreSQL'],
        },
        {
            title: 'BukCast',
            status: 'completed',
            startDate: 'September 2025',
            endDate: 'October 2025',
            summary:
                'A real-time weather monitoring system for Bukidnon.',
            image: '/images/projects/bukcast-thumbnail.webp',
            imageAlt: 'BukCast weather monitoring map preview',
            description:
                'Developed a weather dashboard for Bukidnon with an interactive map, real-time weather data, and municipality-specific forecasts using Maps and Weather APIs.',
            stack: ['Laravel', 'PHP', 'Blade', 'JavaScript', 'PostgreSQL'],
        },
        {
            title: 'ApiPoint',
            status: 'upcoming',
            startDate: 'Planned',
            endDate: 'Coming soon',
            summary:
                'A centralized platform for monitoring projects, APIs, uptime, and service health.',
            description:
                'A single operations workspace for registering projects and API endpoints, tracking availability, reviewing incidents, and understanding the health of connected services without switching between separate monitoring tools.',
            stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker'],
        },
        {
            title: 'Hotel Website',
            status: 'upcoming',
            startDate: 'Planned',
            endDate: 'Coming soon',
            summary:
                'A polished hotel website for exploring rooms, amenities, and availability.',
            description:
                'A responsive hospitality experience designed to help guests discover rooms, compare amenities, review essential stay information, and move smoothly toward a booking inquiry.',
            stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        },
        {
            title: 'Gym Website',
            status: 'upcoming',
            startDate: 'Planned',
            endDate: 'Coming soon',
            summary:
                'A modern gym website for programs, coaches, memberships, and visits.',
            description:
                'A focused fitness website that introduces the facility, training programs, coaches, membership options, and clear ways for prospective members to schedule a visit.',
            stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        },
        {
            title: 'Restaurant Website',
            status: 'upcoming',
            startDate: 'Planned',
            endDate: 'Coming soon',
            summary:
                'A restaurant website built around its menu, atmosphere, and reservations.',
            description:
                'A mobile-first dining experience for browsing the menu, learning the restaurant story, checking service details, and making a reservation or order inquiry.',
            stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        },
        {
            title: 'Clothing Website',
            status: 'upcoming',
            startDate: 'Planned',
            endDate: 'Coming soon',
            summary:
                'A fashion storefront for discovering collections and shopping with confidence.',
            description:
                'A responsive clothing storefront with collection-led browsing, clear product details, size and availability information, and a streamlined path from discovery to purchase.',
            stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
        },
    ],

    services: [
        {
            code: 'SOFTWARE',
            title: 'Custom Software Development',
            paragraphs: [
                'Purpose-built systems, dashboards, and business tools shaped around your workflows, users, and long-term goals.',
            ],
            examples: [
                'Inventory and point-of-sale systems',
                'Operations dashboards and internal tools',
                'Role-based workflow and reporting platforms',
            ],
            tools: ['Laravel', 'Spring Boot', 'PostgreSQL', 'Docker'],
            image: '/images/services/custom-software.webp',
            imageAlt: 'Code displayed on a laptop during software development',
        },
        {
            code: 'DESIGN',
            title: 'Web Design',
            paragraphs: [
                'Clear, responsive interfaces that turn your ideas into accessible digital experiences with a distinct visual identity.',
            ],
            examples: [
                'Responsive portfolio and business websites',
                'Dashboard and product interface design',
                'Design systems and accessible UI patterns',
            ],
            tools: ['Figma', 'Canva', 'HTML', 'CSS'],
            image: '/images/services/web-design.webp',
            imageAlt: 'Designer working at a desk with digital design tools',
        },
        {
            code: 'WEB',
            title: 'Web Development',
            paragraphs: [
                'Reliable, maintainable websites and web applications built across the frontend, backend, APIs, and database.',
            ],
            examples: [
                'E-commerce and booking platforms',
                'Real-time dashboards and customer portals',
                'API-powered business applications',
            ],
            tools: ['Vue', 'React', 'Laravel', 'REST APIs'],
            image: '/images/services/web-development.webp',
            imageAlt: 'Web development workspace with code open on a laptop',
        },
        {
            code: 'MOBILE',
            title: 'Mobile Development',
            paragraphs: [
                'Cross-platform mobile experiences designed for intuitive use, dependable performance, and your users on the go.',
            ],
            examples: [
                'Customer ordering applications',
                'Staff and delivery workflow apps',
                'Mobile dashboards with live updates',
            ],
            tools: ['Flutter', 'Dart', 'Firebase', 'Android Studio'],
            image: '/images/services/mobile-development.webp',
            imageAlt: 'Smartphone displaying a collection of mobile applications',
        },
        {
            code: 'AI',
            title: 'AI Development',
            paragraphs: [
                'Practical AI features, assistants, and retrieval workflows that turn your data into useful, focused experiences.',
            ],
            examples: [
                'Document-based question answering',
                'Applicant and resume matching tools',
                'AI-assisted support and search experiences',
            ],
            tools: ['Python', 'FastAPI', 'RAG', 'Pinecone'],
            image: '/images/services/ai-development.webp',
            imageAlt: 'Abstract artificial intelligence technology visualization',
        },
        {
            code: 'SAAS',
            title: 'SaaS Development',
            paragraphs: [
                'Scalable subscription products with secure accounts, structured data, dashboards, and maintainable product foundations.',
            ],
            examples: [
                'Multi-user subscription platforms',
                'Account, role, and permission management',
                'Usage dashboards and product workflows',
            ],
            tools: ['Next.js', 'PostgreSQL', 'Supabase', 'Vercel'],
            image: '/images/services/saas.webp',
            imageAlt: 'Software analytics dashboard displayed on a monitor',
        },
        {
            code: 'PROTOTYPE',
            title: 'Prototyping',
            paragraphs: [
                'Interactive product concepts that make ideas tangible early, clarify decisions, and reduce risk before development.',
            ],
            examples: [
                'Clickable product demonstrations',
                'Core user-flow validation',
                'Early mobile and web interface concepts',
            ],
            tools: ['Figma', 'Canva', 'HTML', 'JavaScript'],
            image: '/images/services/prototyping.webp',
            imageAlt: 'Designer sketching an interface prototype on paper',
        },
        {
            code: 'WIREFRAME',
            title: 'Wireframing',
            paragraphs: [
                'Focused screen blueprints that organize content, journeys, and core interactions before visual polish begins.',
            ],
            examples: [
                'Page and screen layout planning',
                'Navigation and information architecture',
                'User journeys for key product tasks',
            ],
            tools: ['Figma', 'Canva', 'Pen and paper'],
            image: '/images/services/wireframing.webp',
            imageAlt: 'Interface wireframes being drawn on a tablet',
        },
    ],

    skills: [
        {
            title: 'Programming Languages',
            items: [
                { name: 'PHP', logo: 'braces' },
                { name: 'JavaScript', logo: 'javascript' },
                { name: 'TypeScript', logo: 'typescript' },
                { name: 'Java', logo: 'coffee' },
                { name: 'Python', logo: 'python' },
                { name: 'Visual Basic .NET', logo: 'code' },
                { name: 'Dart', logo: 'dart' },
                { name: 'HTML', logo: 'file-type' },
                { name: 'CSS', logo: 'palette' },
            ],
        },
        {
            title: 'Backend',
            items: [
                { name: 'Laravel', logo: 'laravel' },
                { name: 'FastAPI', logo: 'api' },
                { name: 'Node.js', logo: 'code' },
                { name: 'REST API', logo: 'network' },
                { name: 'Spring Boot', logo: 'layers' },
                { name: 'Firebase Cloud Functions', logo: 'cloud' },
            ],
        },
        {
            title: 'Frontend',
            items: [
                { name: 'React', logo: 'react' },
                { name: 'Next.js', logo: 'nextjs' },
                { name: 'Tailwind CSS', logo: 'wind' },
                { name: 'Flutter', logo: 'smartphone' },
                { name: 'Android XML', logo: 'file-type' },
                { name: 'Responsive Design', logo: 'layout-template' },
            ],
        },
        {
            title: 'Databases & ORM',
            items: [
                { name: 'PostgreSQL', logo: 'database' },
                { name: 'MySQL', logo: 'database' },
                { name: 'Firebase', logo: 'cloud' },
                { name: 'Prisma', logo: 'database' },
                { name: 'Supabase', logo: 'database' },
                { name: 'SQL & NoSQL', logo: 'table-2' },
            ],
        },
        {
            title: 'Cloud & DevOps',
            items: [
                { name: 'Git', logo: 'git-branch' },
                { name: 'GitHub', logo: 'github' },
                { name: 'GitHub Actions (CI/CD)', logo: 'github' },
                { name: 'Docker', logo: 'container' },
                { name: 'Vercel', logo: 'triangle' },
                { name: 'Render', logo: 'cloud' },
                { name: 'Firebase', logo: 'flame' },
                { name: 'Powershell', logo: 'file-type' },
            ],
        },
        {
            title: 'AI & Machine Learning',
            items: [
                { name: 'RAG', logo: 'brain' },
                { name: 'Pinecone', logo: 'search' },
                { name: 'Gemini', logo: 'sparkles' },
                { name: 'Embeddings', logo: 'scan-search' },
                { name: 'NLP', logo: 'message-square-text' },
                { name: 'Claude', logo: 'sparkles' },
                { name: 'Codex', logo: 'sparkles' },
            ],
        },
        {
            title: 'Build & Development Tools',
            items: [
                { name: 'Visual Studio Code', logo: 'code' },
                { name: 'Android Studio', logo: 'smartphone' },
                { name: 'Postman', logo: 'send' },
                { name: 'Figma', logo: 'pen-tool' },
                { name: 'Jira', logo: 'folder-open' },
                { name: 'Maven', logo: 'layers' },
                { name: 'Canva', logo: 'layers' },
            ],
        },
    ],
};
