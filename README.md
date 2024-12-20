# Emotion Categories

감정 단어를 분류하고 표시하는 React 컴포넌트입니다.

## 설치

```bash
npm install emotion-categories
```

## 기능

- 감정 범주별 단어 분류
- 감정 강도에 따른 정렬
- 시각적 표현 (색상 코드)
- 반응형 디자인

## 사용 방법

1. 프로젝트에 컴포넌트를 추가합니다:
```javascript
import EmotionWordsList from 'emotion-categories';
```

2. CSV 데이터를 준비합니다. CSV 파일은 다음 형식을 따라야 합니다:
```csv
감정범주,단어,감정정도M
기쁨,행복하다,8.5
슬픔,우울하다,7.2
...
```

3. 컴포넌트를 렌더링합니다:
```javascript
// CSV 데이터를 문자열로 가져옵니다
const csvData = `감정범주,단어,감정정도M
기쁨,행복하다,8.5
슬픔,우울하다,7.2`;

function App() {
  return <EmotionWordsList csvData={csvData} />;
}
```

## Props

| Prop 이름 | 타입 | 필수 여부 | 설명 |
|-----------|------|-----------|------|
| csvData | string | 필수 | CSV 형식의 감정 단어 데이터 |

## 의존성

- React (>= 16.8.0)
- Papa Parse (CSV 파싱)
- Tailwind CSS (스타일링)

## 라이선스

MIT
