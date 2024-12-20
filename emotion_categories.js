import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const EmotionWordsList = ({ csvData }) => {
  const [emotionGroups, setEmotionGroups] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('감정정도M'); // 정렬 기준 상태 추가
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
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
        setSelectedCategory(Object.keys(grouped)[0]);
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

  // 정렬된 데이터 가져오기
  const getSortedWords = () => {
    if (!emotionGroups[selectedCategory]) return [];
    return [...emotionGroups[selectedCategory]].sort((a, b) => b[sortBy] - a[sortBy]);
  };

  const getIntensityColor = (intensity) => {
    if (intensity >= 8.5) return 'bg-red-500';
    if (intensity >= 7.5) return 'bg-orange-500';
    if (intensity >= 6.5) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (isLoading) {
    return <div className="p-4">데이터 로딩 중...</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">감정 단어 분류</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(emotionGroups).sort().map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category} ({emotionGroups[category]?.length})
            </button>
          ))}
        </div>
        
        {/* 정렬 기준 선택 */}
        <div className="mb-4 flex items-center gap-4">
          <span className="font-medium">정렬 기준:</span>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded ${
                sortBy === '감정정도M' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setSortBy('감정정도M')}
            >
              감정 강도
            </button>
            <button
              className={`px-3 py-1 rounded ${
                sortBy === '빈도' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setSortBy('빈도')}
            >
              빈도
            </button>
          </div>
        </div>
      </div>

      {selectedCategory && emotionGroups[selectedCategory] && (
        <div>
          <h3 className="text-xl font-semibold mb-3">
            {selectedCategory} 범주 단어 목록 
            <span className="text-gray-500 text-base ml-2">
              ({sortBy === '감정정도M' ? '감정강도' : '빈도'} 순 정렬)
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getSortedWords().map((word, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-lg shadow hover:shadow-md transition-shadow ${categoryColors[selectedCategory]}`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-lg font-medium">{word['단어']}</span>
                  <div className="flex flex-col items-end gap-1">
                    <div className={`px-2 py-1 rounded text-white text-sm ${getIntensityColor(word['감정정도M'])}`}>
                      강도: {word['감정정도M'].toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      빈도: {word['빈도'].toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionWordsList;
