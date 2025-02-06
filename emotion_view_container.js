const EmotionViewContainer = ({ csvData }) => {
    const [activeTab, setActiveTab] = React.useState('intensity'); // 'intensity' 또는 'category'

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
                        name: '감정 강도별 분류'
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

// 감정 범주별 분류 컴포넌트
const EmotionCategoryView = () => {
    return React.createElement('div', { className: 'p-4 max-w-6xl mx-auto' },
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
                                    className: 'font-medium mb-1'
                                }, emotion),
                                React.createElement('p', { 
                                    className: 'text-sm text-gray-600'
                                }, subEmotions)
                            )
                        )
                    )
                )
            )
        )
    );
};

window.EmotionViewContainer = EmotionViewContainer;