const EmotionHierarchyView = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('core');

    // emotionCategories에서 카테고리 정보 가져오기
    const categories = Object.entries(window.emotionCategories).map(([key, value]) => ({
        id: key,
        ...value
    }));

    // 선택된 카테고리의 감정들을 가져오는 함수
    const getEmotionsForCategory = (categoryId) => {
        const category = window.emotionCategories[categoryId];
        if (!category) return [];

        return Object.entries(category.emotions).map(([mainEmotion, subEmotions]) => ({
            main: mainEmotion,
            sub: subEmotions.split(', '),
            definition: window.emotionDefinitions[mainEmotion] || '',
            color: category.color
        }));
    };

    return React.createElement('div', { className: 'p-4 max-w-7xl mx-auto' },
        // 카테고리 탭
        React.createElement('div', { className: 'mb-6 border-b border-gray-200' },
            React.createElement('div', { className: 'flex flex-wrap -mb-px' },
                categories.map(category => 
                    React.createElement('button', {
                        key: category.id,
                        className: `inline-flex items-center px-4 py-2 border-b-2 font-medium text-sm
                            ${selectedCategory === category.id 
                                ? `border-blue-500 text-blue-600` 
                                : `border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300`}`,
                        onClick: () => setSelectedCategory(category.id)
                    },
                        React.createElement('span', {
                            className: 'w-3 h-3 rounded-full mr-2',
                            style: { backgroundColor: category.color }
                        }),
                        category.name
                    )
                )
            )
        ),

        // 선택된 카테고리의 감정 목록
        React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' },
            getEmotionsForCategory(selectedCategory).map((emotion, index) =>
                React.createElement('div', {
                    key: index,
                    className: 'bg-white rounded-lg shadow-md overflow-hidden',
                    style: { borderTop: `4px solid ${emotion.color}` }
                },
                    React.createElement('div', { className: 'p-5' },
                        // 주요 감정
                        React.createElement('h3', { 
                            className: 'text-xl font-bold mb-2'
                        }, emotion.main),
                        
                        // 감정 정의
                        React.createElement('p', { 
                            className: 'text-gray-600 text-sm mb-4' 
                        }, emotion.definition),
                        
                        // 하위 감정들
                        React.createElement('div', { className: 'space-y-2' },
                            React.createElement('h4', { 
                                className: 'text-sm font-medium text-gray-500' 
                            }, '관련 감정'),
                            React.createElement('div', { 
                                className: 'flex flex-wrap gap-2' 
                            },
                                emotion.sub.map((subEmotion, subIndex) =>
                                    React.createElement('span', {
                                        key: subIndex,
                                        className: 'inline-block px-3 py-1 rounded-full text-sm bg-gray-100',
                                        title: window.emotionDefinitions[subEmotion] || ''
                                    }, subEmotion)
                                )
                            )
                        )
                    )
                )
            )
        )
    );
};

window.EmotionHierarchyView = EmotionHierarchyView; 