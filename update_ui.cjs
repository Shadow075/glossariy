const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

// 1. Add Code-Numbers Tab button
const tabSearch = `<button 
                                            onClick={() => { setActiveTab('study'); setShowStats(false); }}
                                            className={\`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all \${activeTab === 'study' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}\`}
                                        >
                                            <Icon name="award" size={16} />
                                            Тренажер
                                        </button>`;

const tabReplace = `<button 
                                            onClick={() => { setActiveTab('study'); setShowStats(false); }}
                                            className={\`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all \${activeTab === 'study' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}\`}
                                        >
                                            <Icon name="award" size={16} />
                                            Тренажер
                                        </button>
                                        <button 
                                            onClick={() => { setActiveTab('codes'); setShowStats(false); }}
                                            className={\`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all \${activeTab === 'codes' ? 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}\`}
                                        >
                                            <Icon name="alert-triangle" size={16} />
                                            Код-цифры
                                        </button>`;

html = html.replace(tabSearch, tabReplace);

// 2. Add Code-Numbers component block
// We need to find where activeTab === 'study' block ends
const studyEndSearch = `                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </main>`;

const codeBlockStr = `                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                        
                        {activeTab === 'codes' && (
                            <div className="animate-fadeIn pb-24">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-black text-slate-800 dark:text-white font-display mb-2 flex items-center gap-2">
                                        <Icon name="alert-triangle" className="text-rose-500" /> 
                                        Запрещенные цифровые комбинации
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                        Список числовых кодов, акронимов и аббревиатур, используемых экстремистскими группировками.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {codeNumbers.map((c, i) => (
                                        <div key={i} className="bg-white dark:bg-slate-850 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-500/50 transition-colors flex flex-col h-full">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="text-3xl font-black text-rose-600 dark:text-rose-400 font-display tracking-tighter bg-rose-50 dark:bg-rose-950/30 px-3 py-1 rounded-xl">
                                                    {c.code}
                                                </div>
                                                <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                                                    {c.category}
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                                                {c.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </main>`;

html = html.replace(studyEndSearch, codeBlockStr);

// Fix total count display (where it says "400")
html = html.replace(/<div className="text-3xl font-black text-slate-900 dark:text-white font-display tracking-tight leading-none mb-1">400<\/div>/, '<div className="text-3xl font-black text-slate-900 dark:text-white font-display tracking-tight leading-none mb-1">{terms.length}</div>');

fs.writeFileSync('index.html', html);
console.log('UI successfully updated in index.html');
