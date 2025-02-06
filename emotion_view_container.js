const EmotionViewContainer = ({ csvData }) => {
    const [activeTab, setActiveTab] = React.useState('intensity');

    return React.createElement('div', { className: 'container mx-auto px-4' },
        // 상단 타이틀
        React.createElement('h1', { 
            className: 'text-2xl font-bold mb-6 mt-4' 
        }, '감정 분류 시스템'),
        
        // 메인 탭 네비게이션
        React.createElement('div', { className: 'border-b border-gray-200 mb-6' },
            React.createElement('nav', { 
                className: 'flex space-x-8 -mb-px', 
                'aria-label': '감정 분류 탭' 
            },
                [
                    {
                        id: 'intensity',
                        name: '감정 강도 및 빈도별 분류'
                    },
                    {
                        id: 'category',
                        name: '감정 범주별 분류'
                    }
                ].map(tab => 
                    React.createElement('button', {
                        key: tab.id,
                        className: `py-4 px-6 border-b-2 font-medium text-base ${
                            activeTab === tab.id
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`,
                        onClick: () => setActiveTab(tab.id)
                    }, tab.name)
                )
            )
        ),

        // 선택된 탭에 따른 컴포넌트 렌더링
        activeTab === 'intensity'
            ? React.createElement(EmotionWordsList, { csvData })
            : React.createElement(EmotionCategoryView)
    );
};

const EmotionTooltip = ({ emotion, position }) => {
    if (!position) return null;
    
    const definition = window.emotionDefinitions[emotion];
    if (!definition) return null;

    // 화면 경계를 벗어나지 않도록 위치 조정
    const adjustPosition = (pos) => {
        const tooltipWidth = 300;
        const tooltipHeight = 80;
        const margin = 10;
        
        // 뷰포트 크기
        const viewportWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
        const viewportHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
        
        let x = pos.x;
        let y = pos.y;
        
        // 모바일에서는 툴팁 너비를 화면 크기에 맞게 조정
        const actualTooltipWidth = Math.min(tooltipWidth, viewportWidth - (2 * margin));
        
        // 왼쪽 경계 체크
        if (x < margin) {
            x = margin;
        }
        
        // 오른쪽 경계 체크
        if (x + actualTooltipWidth + margin > viewportWidth) {
            x = viewportWidth - actualTooltipWidth - margin;
        }
        
        // 아래쪽 경계 체크 - 화면 밖으로 나갈 경우 단어 위에 표시
        if (y + tooltipHeight > viewportHeight + window.scrollY) {
            y = y - tooltipHeight - 30; // 단어 위로 30px 간격
        }
        
        return { x, y, width: actualTooltipWidth };
    };

    const { x, y, width } = adjustPosition(position);

    return React.createElement('div', {
        className: 'fixed z-50 bg-white shadow-lg rounded-lg p-3',
        style: {
            left: `${x}px`,
            top: `${y}px`,
            width: `${width}px`,
            maxWidth: '100vw',
            border: '1px solid #e2e8f0',
            pointerEvents: 'none',
            wordBreak: 'break-word',
            transition: 'all 0.2s ease-in-out'
        }
    },
        React.createElement('div', {
            className: 'text-sm'
        },
            React.createElement('span', {
                className: 'font-medium text-gray-900'
            }, `${emotion}: `),
            React.createElement('span', {
                className: 'text-gray-600'
            }, definition)
        )
    );
};

// 감정 범주별 분류 컴포넌트
const EmotionCategoryView = () => {
    const [tooltipState, setTooltipState] = React.useState({ emotion: null, position: null });

    const handleMouseEnter = (emotion, event) => {
        const rect = event.target.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        setTooltipState({
            emotion,
            position: {
                x: rect.left,
                y: rect.top + scrollY + rect.height + 5 // 단어의 실제 높이를 고려하여 아래에 표시
            }
        });
    };

    const handleMouseMove = (event) => {
        // 마우스 이동 시에는 위치를 업데이트하지 않음
    };

    const handleMouseLeave = () => {
        setTooltipState({ emotion: null, position: null });
    };

    // 스크롤 이벤트 핸들러 추가
    React.useEffect(() => {
        const handleScroll = () => {
            if (tooltipState.emotion) {
                const elements = document.querySelectorAll('h4, span');
                for (const element of elements) {
                    if (element.textContent.trim() === tooltipState.emotion) {
                        const rect = element.getBoundingClientRect();
                        const scrollY = window.scrollY || window.pageYOffset;
                        setTooltipState(prev => ({
                            ...prev,
                            position: {
                                x: rect.left,
                                y: rect.top + scrollY + rect.height + 5
                            }
                        }));
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [tooltipState.emotion]);

    return React.createElement('div', { 
        className: 'p-4 max-w-7xl mx-auto relative',
        onMouseMove: handleMouseMove
    },
        React.createElement(EmotionTooltip, {
            emotion: tooltipState.emotion,
            position: tooltipState.position
        }),
        
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' },
            Object.entries(window.emotionCategories).map(([key, category]) =>
                React.createElement('div', {
                    key,
                    className: 'bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 hover:shadow-xl hover:-translate-y-1',
                    style: { 
                        borderTop: `6px solid ${category.color}`,
                        background: `linear-gradient(to bottom, ${category.color}10, white)`
                    }
                },
                    React.createElement('div', { className: 'p-6' },
                        // 범주 이름
                        React.createElement('div', { className: 'flex items-center mb-5' },
                            React.createElement('h3', { 
                                className: 'text-2xl font-bold text-gray-800',
                                style: { color: category.color }
                            }, category.name)
                        ),
                        
                        // 감정 목록
                        React.createElement('div', { className: 'space-y-4' },
                            Object.entries(category.emotions).map(([emotion, subEmotions]) =>
                                React.createElement('div', { 
                                    key: emotion,
                                    className: 'pb-3 border-b border-gray-100 last:border-0'
                                },
                                    React.createElement('h4', { 
                                        className: 'text-lg font-semibold mb-2 hover:text-blue-600 transition-colors cursor-pointer',
                                        onMouseEnter: (e) => handleMouseEnter(emotion, e),
                                        onMouseLeave: handleMouseLeave
                                    }, emotion),
                                    React.createElement('div', { 
                                        className: 'flex flex-wrap gap-2'
                                    },
                                        subEmotions.split(', ').map((subEmotion, index) =>
                                            React.createElement('span', {
                                                key: subEmotion,
                                                className: 'inline-block px-3 py-1 rounded-full bg-gray-50 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors cursor-pointer',
                                                onMouseEnter: (e) => handleMouseEnter(subEmotion.trim(), e),
                                                onMouseLeave: handleMouseLeave
                                            }, subEmotion.trim())
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    );
};

// 감정 강도별 분류 컴포넌트
const EmotionWordsList = ({ csvData }) => {
    const [emotionGroups, setEmotionGroups] = React.useState({});
    const [selectedCategory, setSelectedCategory] = React.useState('슬픔');
    const [sortBy, setSortBy] = React.useState('감정정도M'); 
    const [isLoading, setIsLoading] = React.useState(true);

    const categoryColors = {
        '기쁨': 'bg-yellow-100',
        '슬픔': 'bg-blue-100',
        '분노': 'bg-red-100',
        '공포': 'bg-purple-100',
        '혐오': 'bg-green-100',
        '놀람': 'bg-orange-100',
        '흥미': 'bg-cyan-100',
        '지루함': 'bg-gray-100',
        '통증': 'bg-rose-100',
        '중성': 'bg-slate-100',
        '기타': 'bg-zinc-100'
    };

    React.useEffect(() => {
        const loadData = () => {
            try {
                if (!csvData) {
                    console.error('CSV 데이터가 없습니다.');
                    return;
                }

                const result = Papa.parse(csvData, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true
                });

                const grouped = {};
                result.data.forEach(row => {
                    if (!row['감정범주']) return;
                    
                    if (!grouped[row['감정범주']]) {
                        grouped[row['감정범주']] = [];
                    }
                    grouped[row['감정범주']].push(row);
                });

                setEmotionGroups(grouped);
                setIsLoading(false);
            } catch (error) {
                console.error('데이터 파싱 중 오류:', error);
                setIsLoading(false);
            }
        };

        if (csvData) {
            loadData();
        }
    }, [csvData]);

    if (isLoading) {
        return React.createElement('div', { className: 'p-4' }, '데이터 로딩 중...');
    }

    function getSortedWords() {
        if (!emotionGroups[selectedCategory]) return [];
        return [...emotionGroups[selectedCategory]].sort((a, b) => b[sortBy] - a[sortBy]);
    }

    function getIntensityColor(intensity) {
        if (intensity >= 8.5) return 'bg-red-500';
        if (intensity >= 7.5) return 'bg-orange-500';
        if (intensity >= 6.5) return 'bg-yellow-500';
        return 'bg-green-500';
    }

    return React.createElement('div', { className: 'p-4 max-w-6xl mx-auto' },
        React.createElement('div', { className: 'mb-6' },
            React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, '감정 단어 분류'),
            React.createElement('div', { className: 'flex flex-wrap gap-2 mb-4' },
                Object.keys(emotionGroups)
                    .sort((a, b) => {
                        if (a === '슬픔') return -1;
                        if (b === '슬픔') return 1;
                        return emotionGroups[b].length - emotionGroups[a].length;
                    })
                    .map(category =>
                        React.createElement('button', {
                            key: category,
                            className: selectedCategory === category
                                ? 'px-4 py-2 rounded-lg font-medium bg-blue-600 text-white shadow-lg'
                                : 'px-4 py-2 rounded-lg font-medium bg-gray-100 hover:bg-gray-200',
                            onClick: () => setSelectedCategory(category)
                        }, `${category} (${emotionGroups[category]?.length})`)
                    )
            ),
            React.createElement('div', { className: 'mb-4 flex items-center gap-4' },
                React.createElement('span', { className: 'font-medium' }, '정렬 기준:'),
                React.createElement('div', { className: 'flex gap-2' },
                    React.createElement('button', {
                        className: sortBy === '감정정도M'
                            ? 'px-3 py-1 rounded bg-blue-600 text-white'
                            : 'px-3 py-1 rounded bg-gray-100 hover:bg-gray-200',
                        onClick: () => setSortBy('감정정도M')
                    }, '감정 강도'),
                    React.createElement('button', {
                        className: sortBy === '빈도'
                            ? 'px-3 py-1 rounded bg-blue-600 text-white'
                            : 'px-3 py-1 rounded bg-gray-100 hover:bg-gray-200',
                        onClick: () => setSortBy('빈도')
                    }, '빈도')
                )
            )
        ),
        selectedCategory && emotionGroups[selectedCategory] && (
            React.createElement('div', null,
                React.createElement('div', { className: 'flex items-center mb-3' },
                    React.createElement('h3', { className: 'text-xl font-semibold' }, selectedCategory + ' 범주 단어 목록'),
                    React.createElement('span', { className: 'text-gray-500 text-base ml-2' },
                        '(' + (sortBy === '감정정도M' ? '감정 강도' : '빈도') + ' 순 정렬)'
                    )
                ),
                React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3' },
                    getSortedWords().map((word, index) =>
                        React.createElement('div', {
                            key: index,
                            className: 'p-4 rounded-lg shadow hover:shadow-md transition-shadow ' + (categoryColors[selectedCategory] || 'bg-gray-100')
                        },
                            React.createElement('div', { className: 'flex justify-between items-start' },
                                React.createElement('span', { className: 'text-lg font-medium' }, word['단어']),
                                React.createElement('div', { className: 'flex flex-col items-end gap-1' },
                                    React.createElement('div', {
                                        className: 'px-2 py-1 rounded text-white text-sm ' + getIntensityColor(word['감정정도M'])
                                    }, '강도: ' + word['감정정도M'].toFixed(2)),
                                    React.createElement('div', { className: 'text-sm text-gray-600' }, '빈도: ' + word['빈도'].toFixed(1))
                                )
                            )
                        )
                    )
                )
            )
        )
    );
};

window.EmotionViewContainer = EmotionViewContainer;
window.EmotionWordsList = EmotionWordsList;