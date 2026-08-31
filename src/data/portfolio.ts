import type { PortfolioData } from '@/types/portfolio';

export const portfolioData: PortfolioData = {
    personal: {
        name: 'Jian Lester Tabarno',
        role: 'Software Engineer | Full Stack Web & Mobile Developer',
        tagline:
            'I build functional web, mobile, and AI-powered applications with clean interfaces, reliable backend logic, structured data, and quality-tested features.',
        bio: 'Bachelor of Science in Information Technology fresh graduate with over three years of project-based software development experience across academic, personal, and internship projects. I build full-stack web, mobile, and AI-powered applications using Laravel, React, Flutter, Node.js, and related technologies, with authentication, dashboards, APIs, database integration, and database design. I also apply feature testing, defect documentation, debugging, and fix verification to deliver dependable software.',
        location: 'Singapore',
        availability: 'Open to work',
        email: 'tabarno.jian@gmail.com',
        phone: '+65 8931 4707',
        github: 'https://github.com/JIAN-LESTER',
        linkedin: 'https://www.linkedin.com/in/jian-lester-tabarno/',
        facebook: 'https://www.facebook.com/jian.lester.tabarno/',
        website: 'https://jianlester.vercel.app',
        image: '/images/profile.jpg',
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
            code: 'WEB',
            title: 'Full-Stack Web Development',
            paragraphs: [
                'I build full-stack web applications with responsive interfaces, reliable backend logic, APIs, and structured databases. This includes dashboards, management systems, tracking platforms, admin panels, and business tools.',
                'I connect each layer around real user workflows so the result is functional, organized, and easy to use across different screen sizes.',
            ],
        },
        {
            code: 'MOBILE',
            title: 'Mobile App Development',
            paragraphs: [
                'I develop cross-platform and native mobile applications with practical features, smooth navigation, and clean UI design using Flutter and Android development tools.',
                'Mobile features can include authentication, real-time data, media uploads, forms, dashboards, validation, and API integrations for business, student, and internal systems.',
            ],
        },
        {
            code: 'AI',
            title: 'AI-Powered Features',
            paragraphs: [
                'I develop AI-powered application features using generative AI and retrieval-augmented generation. These features can answer inquiries, analyze documents, compare resumes with job descriptions, and improve user support.',
                'I focus on grounding useful AI behavior in application data through embeddings, vector search, backend logic, and clear user workflows.',
            ],
        },
        {
            code: 'QA',
            title: 'Software Testing & QA',
            paragraphs: [
                'I test web and mobile features across development cycles, covering functional workflows, input validation, media uploads, API behavior, and regression checks before release.',
                'I document defects clearly, verify fixes, assist with debugging, and help reduce recurring issues so software is more stable and dependable for its users.',
            ],
        },
        {
            code: 'DESIGN',
            title: 'Interface & System Design',
            paragraphs: [
                'I plan clean, modern interfaces and the system structure behind them, including wireframes, responsive layouts, user roles, modules, workflows, and component-based design.',
                'This creates a clear path from an idea to a maintainable application that is easy to navigate and aligned with its purpose.',
            ],
        },
        {
            code: 'DATA',
            title: 'Database & API Integration',
            paragraphs: [
                'I design structured databases and integrate APIs for web, mobile, and full-stack applications. This includes tables, collections, relationships, data validation, authentication, and real-time data flows.',
                'I work with SQL and NoSQL systems to keep application data organized, reliable, and ready for features such as dashboards, reporting, tracking, and management workflows.',
            ],
        },
        {
            code: 'SYS',
            title: 'System Architecture',
            paragraphs: [
                'I plan the overall structure of software systems, including modules, user roles, features, workflows, data flow, and architecture patterns such as MVC, clean architecture, and event-driven design.',
                'Good system planning keeps applications clear, scalable, testable, and easier to maintain as more features are added.',
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
