export interface SiteNavigationItem {
    label: string;
    path: string;
}

export const siteNavigation: SiteNavigationItem[] = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Services', path: '/services' },
    { label: 'Contact me', path: '/contact' },
];

export function normalizePath(path: string) {
    const normalized = path.replace(/\/+$/, '');

    return normalized || '/';
}
