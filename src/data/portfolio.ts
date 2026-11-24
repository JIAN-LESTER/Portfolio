import type { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
    personal: {
        name: 'Jian Lester Tabarno',
        role: 'Full Stack Web & Mobile Developer',
        tagline:
            'I build functional web, mobile, and AI-powered applications with clean interfaces, reliable backend logic, structured data, and quality-tested features.',
        bio: 'Bachelor of Science in Information Technology fresh graduate with over three years of project-based software development experience across academic, personal, and internship projects. I build full-stack web, mobile, and AI-powered applications using Laravel, React, Flutter, Node.js, and related technologies, with authentication, dashboards, APIs, database integration, and database design. I also apply feature testing, defect documentation, debugging, and fix verification to deliver dependable software.',
        location: 'Kibawe, Bukidnon, Philippines',
        availability: 'Open to work',
        email: 'tabarno.jian@gmail.com',
        phone: '+63 9072894778',
        github: 'https://github.com/JIAN-LESTER',
        linkedin: 'https://www.linkedin.com/in/jian-lester-tabarno/',
        facebook: 'https://www.facebook.com/jian.lester.tabarno/',
        website: 'https://jianlester.vercel.app',
        image: '/images/profile-transparent.png',
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
            tag: 'AI / RAG',
            summary:
                'An inquiry assistant for CMU-OASP using AI-powered data retrieval.',
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
            tag: 'Web / Ticketing',
            summary:
                'A ticketing platform with in-app voice and video calls for support teams.',
            description:
                'Built a ticket management system for tracking requests, coordinating responses, and resolving support issues. Integrated WebRTC calls so users and support staff can discuss tickets directly in the app.',
            stack: ['Java', 'Spring Boot', 'Next.js', 'WebRTC', 'PostgreSQL', 'Docker'],
        },
        {
            title: 'Store System',
            tag: 'Web / Mobile commerce',
            summary:
                'An online store and ordering platform with rider delivery and a dedicated mobile app.',
            description:
                'Developed an e-commerce system that connects product browsing, order placement, and delivery workflows. A dedicated React Native app supports mobile ordering and rider delivery operations.',
            stack: ['Python', 'FastAPI', 'React', 'React Native', 'PostgreSQL'],
        },
        {
            title: 'AI Hire',
            tag: 'AI / Recruitment',
            summary:
                'A recruitment platform with an AI agent supporting the hiring pipeline.',
            description:
                'Created a recruitment workflow where an AI agent helps recruiters review applications, schedule interviews, evaluate interview results, and prepare offers. The platform keeps candidate progress organized from application through offer.',
            stack: ['Next.js', 'Prisma ORM', 'PostgreSQL'],
        },
        {
            title: 'JobTrackr',
            tag: 'Web / Productivity',
            summary:
                'A job application tracker with an AI resume analyzer and browser extension.',
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
            title: 'Gym Management System',
            tag: 'Web / Systems',
            summary:
                'A QR-enabled operations platform for EZ Fitness Gym in Valencia, Bukidnon.',
            description:
                'Built a gym management system with member management, attendance tracking, inventory, point-of-sale, and reporting features. Integrated QR-based member authentication to speed up check-ins and improve attendance accuracy for daily gym operations.',
            stack: ['Laravel', 'PHP', 'Blade', 'JavaScript', 'PostgreSQL'],
        },
        {
            title: 'BukCast',
            tag: 'Web / Real-time data',
            summary:
                'A real-time weather monitoring system for Bukidnon.',
            description:
                'Developed a weather dashboard for Bukidnon with an interactive map, real-time weather data, and municipality-specific forecasts using Maps and Weather APIs.',
            stack: ['Laravel', 'PHP', 'Blade', 'JavaScript', 'PostgreSQL'],
        },
    ],

    services: [
        {
            code: 'SOFTWARE',
            title: 'Custom Software Development',
            paragraphs: [
                'Purpose-built systems, dashboards, and business tools shaped around your workflows, users, and long-term goals.',
            ],
        },
        {
            code: 'DESIGN',
            title: 'Web Design',
            paragraphs: [
                'Clear, responsive interfaces that turn your ideas into accessible digital experiences with a distinct visual identity.',
            ],
        },
        {
            code: 'WEB',
            title: 'Web Development',
            paragraphs: [
                'Reliable, maintainable websites and web applications built across the frontend, backend, APIs, and database.',
            ],
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
                { name: 'NestJS', logo: 'layers' },
                { name: 'Node.js', logo: 'code' },
                { name: 'REST API', logo: 'network' },
                { name: 'Spring Boot', logo: 'layers' },
                { name: 'FastAPI', logo: 'api' },
                { name: 'Firebase Cloud Functions', logo: 'cloud' },
                { name: 'Microservices', logo: 'network' },
                { name: 'JSON', logo: 'braces' },
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
                { name: 'Firebase Firestore', logo: 'cloud' },
                { name: 'Prisma', logo: 'database' },
                { name: 'SQL & NoSQL', logo: 'table-2' },
            ],
        },
        {
            title: 'Application Features & Workflows',
            items: [
                { name: 'Authentication', logo: 'braces' },
                { name: 'Role-Based Access', logo: 'network' },
                { name: 'Dashboards', logo: 'layout-template' },
                { name: 'Reporting', logo: 'table-2' },
                { name: 'Activity Logging', logo: 'table-2' },
                { name: 'CRUD Workflows', logo: 'network' },
                { name: 'File/Media Uploads', logo: 'folder-open' },
                { name: 'Real-Time Data', logo: 'cloud' },
                { name: 'Data Validation', logo: 'braces' },
                { name: 'API Integration', logo: 'api' },
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
            ],
        },
        {
            title: 'Testing & Quality',
            items: [
                { name: 'Unit Testing', logo: 'check' },
                { name: 'Functional Testing', logo: 'check' },
                { name: 'API Testing', logo: 'api' },
                { name: 'Regression Testing', logo: 'network' },
                { name: 'Bug Fixing', logo: 'braces' },
                { name: 'Defect Documentation', logo: 'file-type' },
                { name: 'Fix Verification', logo: 'check' },
            ],
        },
        {
            title: 'Architecture & Design Patterns',
            items: [
                { name: 'OOP', logo: 'braces' },
                { name: 'MVC', logo: 'layers' },
                { name: 'SDLC', logo: 'network' },
                { name: 'Clean Architecture', logo: 'blocks' },
                { name: 'Component-Based Architecture', logo: 'blocks' },
                { name: 'Event-Driven Architecture', logo: 'network' },
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
            ],
        },
    ],
};
