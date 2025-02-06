// 감정 카테고리 정의
(function() {
    window.emotionCategories = {
        core: {
            name: '핵심감정',
            color: '#FFD700', // 골드
            emotions: {
                '기쁨': '신남, 행복함, 즐거움, 들뜸',
                '슬픔': '우울함, 서글픔, 허전함, 쓸쓸함',
                '분노': '화남, 짜증남, 답답함, 억울함',
                '두려움': '무서움, 주눅듦, 긴장됨',
                '혐오': '싫음, 불쾌함, 거북함, 역겨움',
                '놀람': '당황스러움, 어리둥절함, 황당함'
            }
        },
        growth: {
            name: '성장감정',
            color: '#00A0DC', // 하늘색
            emotions: {
                '자부심': '뿌듯함, 당당함',
                '성취감': '보람됨, 만족감, 가슴이 벅참',
                '도전의식': '용기, 각오, 결의에 찬',
                '호기심': '궁금함, 흥미로움, 신기함',
                '열정': '불타오름, 의욕넘침, 열중함, 열광하는',
                '기대감': '설렘, 희망찬, 기다려짐'
            }
        },
        serenity: {
            name: '평온감정',
            color: '#FFE5B4', // 연한 살구색
            emotions: {
                '편안함': '포근함, 아늑함, 안정됨',
                '만족감': '흡족함, 충분함, 넉넉함',
                '감사함': '고마움, 따뜻함, 흐뭇함',
                '평화로움': '고요함, 잔잔함, 담담함',
                '여유로움': '느긋함, 한가로움, 홀가분함, 태평한, 근심걱정 없는',
                '안도감': '마음이 놓임, 후련함, 해소됨'
            }
        },
        relational: {
            name: '관계감정',
            color: '#8B4513', // 갈색
            emotions: {
                '사랑': '애정, 다정함, 보듬음, 자애, 연민',
                '친밀감': '끈끈함, 친근함, 편함, 정답다, 푸근함',
                '콤플렉스': '질투, 시기심, 비교하는, 열등감',
                '공감': '이해됨, 동질감, 연민',
                '미안함': '죄책감, 양심의 가책, 후회스러움',
                '고마움': '감동적인, 따뜻한',
                '그리움': '보고싶음, 애틋함, 아쉬움'
            }
        },
        anxiety: {
            name: '불안감정',
            color: '#0066CC', // 진한 파랑
            emotions: {
                '초조함': '안절부절, 조바심',
                '걱정됨': '속태움, 신경쓰임',
                '막막함': '답이 안 보임, 불확실함',
                '당황스러움': '난처함, 곤란함, 어색함',
                '혼란스러움': '갈피못잡음, 복잡함, 어지러움',
                '부담감': '어깨가 무거움, 책임감, 중압감'
            }
        },
        complex: {
            name: '복합감정',
            color: '#4B0082', // 진한 남색
            emotions: {
                '설렘불안': '기대반 걱정반',
                '양가감정': '갈등되는, 이러지도 저러지도 못하는',
                '노스탤지어': '그립고 아련한',
                '울분': '서러우면서 분한',
                '자책감': '미안하고 후회스러운, 수치스러운'
            }
        },
        energy: {
            name: '에너지감정',
            color: '#FFB800', // 밝은 노랑
            emotions: {
                '활기': '생기넘침, 힘이남, 상쾌함',
                '피로': '지침, 녹초가 됨, 기진맥진',
                '무기력': '축 처짐, 기운빠짐, 멍함, 텅 빈 듯한',
                '졸림': '나른함, 눈꺼풀이 무거움',
                '처짐': '늘어짐, 찌뿌둥함, 노곤함',
                '활력': '생동감, 싱싱함, 약동감'
            }
        },
        reflective: {
            name: '성찰감정',
            color: '#FFA500', // 주황
            emotions: {
                '깨달음': '알아차림, 머리가 맑아짐, 생각이 트임',
                '반성': '뉘우침, 되돌아보게 됨, 마음이 무거움',
                '담담함': '차분해짐, 마음이 가라앉음, 평온해짐, 초연한',
                '받아들임': '인정하게 됨, 마음이 열림'
            }
        },
        physical: {
            name: '신체감정',
            color: '#FF6B6B', // 연한 빨강
            emotions: {
                '통증': '쑤시는, 저림, 뻐근함, 결린, 욱신거림'
            }
        }
    };
})();
