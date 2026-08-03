const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update tailwind config to define custom slate and other color tokens
const oldConfigSegment = `colors: {
                        slate: {
                            950: '#070a13',
                            900: '#0f172a',
                            850: '#182238',
                            800: '#1e293b',
                            750: '#2c3b54',
                            700: '#334155',
                        }
                    }`;

const newConfigSegment = `colors: {
                        slate: {
                            950: '#070a13',
                            900: '#0f172a',
                            850: '#182238',
                            800: '#1e293b',
                            750: '#2c3b54',
                            755: '#334155',
                            700: '#334155',
                            455: '#94a3b8',
                            450: '#94a3b8',
                            350: '#cbd5e1',
                            250: '#e2e8f0',
                            150: '#f1f5f9',
                        },
                        rose: {
                            450: '#f43f5e',
                            350: '#fb7185',
                        },
                        emerald: {
                            350: '#34d399',
                        },
                        amber: {
                            250: '#fcd34d',
                        },
                        indigo: {
                            850: '#1e1b4b',
                        }
                    }`;

if (html.includes(oldConfigSegment)) {
    html = html.replace(oldConfigSegment, newConfigSegment);
    console.log('Updated tailwind config with custom color definitions.');
} else {
    console.log('Config segment not found directly, proceeding with text replacements.');
}

// 2. Class replacements for dark mode contrast and non-existent Tailwind classes
html = html.replace(/indigo-850/g, 'indigo-900');
html = html.replace(/border-slate-150/g, 'border-slate-200');
html = html.replace(/border-slate-250/g, 'border-slate-200');
html = html.replace(/border-amber-250/g, 'border-amber-300');
html = html.replace(/border-emerald-350/g, 'border-emerald-400');
html = html.replace(/border-rose-350/g, 'border-rose-400');
html = html.replace(/dark:hover:text-rose-450/g, 'dark:hover:text-rose-400');

// Modal text color fixes for high contrast in dark mode
html = html.replace(/dark:text-slate-150/g, 'dark:text-slate-100');
html = html.replace(/dark:text-slate-250/g, 'dark:text-slate-100');
html = html.replace(/dark:text-slate-350/g, 'dark:text-slate-200');
html = html.replace(/dark:text-slate-450/g, 'dark:text-slate-300');
html = html.replace(/dark:text-slate-755/g, 'dark:text-slate-600');
html = html.replace(/text-slate-450/g, 'text-slate-400 dark:text-slate-400');
html = html.replace(/text-slate-455/g, 'text-slate-400 dark:text-slate-400');
html = html.replace(/text-rose-350/g, 'text-rose-300');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html with dark mode contrast fixes.');
