const EmotionWordsList = ({ csvData }) => {
    const [emotionGroups, setEmotionGroups] = React.useState({});
    const [selectedCategory, setSelectedCategory] = React.useState('all');
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
                const result = Papa.parse(csvData, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true
                });

                const grouped = {};
                result.data.forEach(row => {
                    if (!grouped[row['감정범주']]) {
                        grouped[row['감정범주']] = [];
                    }
                    grouped[row['감정범주']].push(row);
                });

                setEmotionGroups(grouped);
                setSelectedCategory('슬픔');
                setIsLoading(false);
            } catch (error) {
                console.error('Error parsing data:', error);
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
                    .sort((a, b) => emotionGroups[b].length - emotionGroups[a].length)
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
