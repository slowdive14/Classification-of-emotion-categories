const EmotionViewContainer = ({ csvData }) => {
    const [activeTab, setActiveTab] = React.useState('list'); // 'list' 또는 'hierarchy'

    return React.createElement('div', { className: 'container mx-auto px-4' },
        // 상단 타이틀 추가
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
                        id: 'list',
                        name: '감정 강도별 분류'
                    },
                    {
                        id: 'hierarchy',
                        name: '감정 계층 구조'
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
        activeTab === 'list'
            ? React.createElement(EmotionWordsList, { csvData })
            : React.createElement(EmotionHierarchyView)
    );
};

window.EmotionViewContainer = EmotionViewContainer;