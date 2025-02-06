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
        const tooltipWidth = 300; // 툴팁의 최대 너비
        const tooltipHeight = 80; // 툴팁의 예상 높이
        const margin = 10; // 화면 경계와의 여백
        
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        let x = pos.x;
        let y = pos.y;
        
        // 오른쪽 경계 체크
        if (x + tooltipWidth + margin > viewportWidth) {
            x = pos.x - tooltipWidth - margin;
        }
        
        // 아래쪽 경계 체크
        if (y + tooltipHeight + margin > viewportHeight) {
            y = pos.y - tooltipHeight - margin;
        }
        
        return { x, y };
    };

    const adjustedPosition = adjustPosition(position);

    return React.createElement('div', {
        className: 'fixed z-50 bg-white shadow-lg rounded-lg p-3',
        style: {
            left: `${adjustedPosition.x}px`,
            top: `${adjustedPosition.y}px`,
            maxWidth: '300px',
            border: '1px solid #e2e8f0',
            pointerEvents: 'none' // 툴팁이 마우스 이벤트를 방해하지 않도록
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
        setTooltipState({
            emotion,
            position: {
                x: event.clientX + 15, // 마우스 커서로부터 약간 오른쪽
                y: event.clientY + 5   // 마우스 커서로부터 약간 아래
            }
        });
    };

    const handleMouseMove = (event) => {
        if (tooltipState.emotion) {
            setTooltipState(prev => ({
                ...prev,
                position: {
                    x: event.clientX + 15,
                    y: event.clientY + 5
                }
            }));
        }
    };

    const handleMouseLeave = () => {
        setTooltipState({ emotion: null, position: null });
    };

    return React.createElement('div', { 
        className: 'p-4 max-w-6xl mx-auto relative',
        onMouseMove: handleMouseMove
    },
        React.createElement(EmotionTooltip, {
            emotion: tooltipState.emotion,
            position: tooltipState.position
        }),
        
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' },
            Object.entries(window.emotionCategories).map(([key, category]) =>
                React.createElement('div', {
                    key,
                    className: 'bg-white rounded-lg shadow-md overflow-hidden',
                    style: { borderTop: `4px solid ${category.color}` }
                },
                    React.createElement('div', { className: 'p-5' },
                        // 범주 이름
                        React.createElement('h3', { 
                            className: 'text-xl font-bold mb-4'
                        }, category.name),
                        
                        // 감정 목록
                        Object.entries(category.emotions).map(([emotion, subEmotions]) =>
                            React.createElement('div', { 
                                key: emotion,
                                className: 'mb-3'
                            },
                                React.createElement('h4', { 
                                    className: 'font-medium mb-1 hover:text-blue-600',
                                    onMouseEnter: (e) => handleMouseEnter(emotion, e),
                                    onMouseLeave: handleMouseLeave
                                }, emotion),
                                React.createElement('div', { 
                                    className: 'text-sm text-gray-600'
                                },
                                    subEmotions.split(', ').map((subEmotion, index) =>
                                        React.createElement('span', {
                                            key: subEmotion,
                                            className: 'hover:text-blue-600',
                                            onMouseEnter: (e) => handleMouseEnter(subEmotion.trim(), e),
                                            onMouseLeave: handleMouseLeave
                                        },
                                            subEmotion,
                                            index < subEmotions.split(', ').length - 1 ? ', ' : ''
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