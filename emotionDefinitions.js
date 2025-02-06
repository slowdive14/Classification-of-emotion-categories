(function() {
    window.emotionDefinitions = {
        // 핵심감정 (core)
        '기쁨': '마음에 흐뭇하고 즐거운 감정',
        '신남': '기분이 좋아 들떠있는 상태',
        '행복함': '생활에서 충분한 만족과 기쁨을 느끼는 상태',
        '즐거움': '마음에 거슬림이 없이 흐뭇하고 기쁜 감정',
        '들뜸': '마음이 가라앉지 않고 붕 떠있는 듯한 기분',
        
        '슬픔': '마음이 아프고 괴로운 감정',
        '우울함': '기분이 침체되어 있고 활력이 없는 상태',
        '서글픔': '마음이 슬프고 애처로운 감정',
        '허전함': '무언가 채워지지 않은 듯한 공허한 감정',
        '쓸쓸함': '외롭고 적적한 감정',
        
        '분노': '화가 나서 속에서 울화가 치밀어 오르는 감정',
        '화남': '마음에 화가 나는 감정',
        '짜증남': '마음에 꼭 맞지 아니하여 발칵 역정이 나는 감정',
        '답답함': '숨이 막힐 듯이 갑갑한 감정',
        '억울함': '정당한 대우를 받지 못하였다고 여겨지는 감정',
        
        '두려움': '꺼리거나 무서워하는 마음',
        '무서움': '두렵고 겁이 나는 감정',
        '주눅듦': '기가 죽어 기운이 없어지는 상태',
        '긴장됨': '마음을 조이고 정신을 바짝 차린 상태',
        
        '혐오': '싫어하고 미워하는 감정',
        '싫음': '마음에 들지 않아 꺼리는 감정',
        '불쾌함': '마음이 편하지 않고 기분이 나쁜 상태',
        '거북함': '마음이 편하지 않고 껄끄러운 감정',
        '역겨움': '메스껍고 구역질이 날 것 같은 감정',
        
        '놀람': '뜻밖의 일을 당하여 가슴이 철렁하는 감정',
        '당황스러움': '갑작스러운 일을 당하여 어찌할 바를 모르는 상태',
        '어리둥절함': '정신이 얼떨떨하고 갈피를 못 잡는 상태',
        '황당함': '뜻밖의 일에 어이가 없는 감정',
     
        // 성장감정 (growth)
        '자부심': '자신을 긍정적으로 평가하는 마음',
        '뿌듯함': '마음이 흐뭇하고 넉넉한 감정',
        '당당함': '떳떳하고 엄연한 태도나 기상',
        
        '성취감': '목표한 바를 이루었을 때 느끼는 만족감',
        '보람됨': '힘든 일을 하고 난 뒤의 만족스러운 감정',
        '만족감': '마음이 흡족한 상태',
        '가슴이 벅참': '감정이 북받쳐 오르는 상태',
        
        '도전의식': '어려운 일에 맞서보려는 마음가짐',
        '용기': '어려운 일을 겪더라도 해내려는 마음',
        '각오': '어떤 일을 하기 위해 마음을 먹음',
        '결의에 찬': '굳게 마음먹은 상태',
        
        '호기심': '사물을 알고 싶어 하는 마음',
        '궁금함': '무엇인가 알고 싶은 마음',
        '흥미로움': '관심을 끌만한 재미있는 상태',
        '신기함': '특이하고 새로운 것에 대한 감정',
     
        '열정': '어떤 일에 열렬한 마음',
        '불타오름': '열정이 강렬하게 일어나는 상태',
        '의욕넘침': '하고자 하는 마음이 가득한 상태',
        '열중함': '어떤 일에 마음을 쏟아 기울이는 상태',
        '열광하는': '크게 기뻐하고 즐거워하는 상태',
     
        '기대감': '앞으로 올 일에 대한 희망찬 마음',
        '설렘': '가슴이 두근거리는 기분 좋은 상태',
        '희망찬': '앞날에 대한 밝은 기대를 가진 상태',
        '기다려짐': '앞으로 올 일이 기대되는 마음',
     
        // 평온감정 (serenity)
        '편안함': '마음이 평안하고 괴로움이 없는 상태',
        '포근함': '부드럽고 따뜻한 느낌',
        '아늑함': '아담하고 안정된 느낌',
        '안정됨': '마음이 평온하고 고요한 상태',
     
        '만족감': '바라는 대로 되어 흐뭇하고, 지금 이대로 완전하다는 느낌',
        '흡족함': '마음에 흡족한 상태',
        '충분함': '더 바랄 것이 없이 넉넉한 상태',
        '넉넉함': '여유가 있어 풍족한 상태',
     
        '감사함': '고마운 마음',
        '고마움': '베풀어 준 것에 대해 마음에서 우러나오는 느낌',
        '따뜻함': '마음이 포근하고 온화한 느낌',
        '흐뭇함': '마음이 기쁘고 만족스러운 상태',
     
        '평화로움': '마음이 평온하고 고요한 상태',
        '고요함': '조용하고 잠잠한 상태',
        '잔잔함': '물결처럼 잔잔한 마음 상태',
        '담담함': '특별한 감정의 동요가 없는 상태',
     
        '여유로움': '마음에 여유가 있는 상태',
        '느긋함': '조급하지 않고 늘어진 듯한 마음',
        '한가로움': '바쁘지 않고 편안한 상태',
        '홀가분함': '벗어난 듯이 가볍고 편한 마음',
        '태평한': '아무 걱정 없이 평안하고 편안한 상태',
        '근심걱정 없는': '걱정이나 불안한 마음이 전혀 없는 상태',
     
        '안도감': '마음이 편안해지는 느낌',
        '마음이 놓임': '걱정이나 불안이 해소되는 상태',
        '후련함': '답답하거나 괴로운 일이 풀려 시원한 느낌',
        '해소됨': '걱정이나 불안이 풀리는 상태',
     
        // 관계감정 (relational)
        '사랑': '깊은 애정과 관심을 가지는 마음',
        '애정': '사랑하는 마음',
        '다정함': '태도가 따뜻하고 친절한 상태',
        '보듬음': '감싸안고 돌보는 마음',
        '자애': '자식을 사랑하는 마음',
        '연민': '불쌍하고 가련하게 여기는 마음',
     
        '친밀감': '가깝게 느끼는 마음',
        '끈끈함': '서로 굳게 맺어진 듯한 관계',
        '친근함': '가깝고 익숙한 느낌',
        '편함': '거리낌 없이 편안한 상태',
        '정답다': '정이 깊고 친밀한 느낌',
        '푸근함': '마음이 후하고 넉넉한 느낌',
     
        '질투': '소중한 대상을 다른 사람에게 빼앗길까 두려워하는 마음',
        '시기심': '남의 좋은 처지를 부러워하고 원하는 동시에 미워하는 마음',
        '비교하는': '남과 자신을 견주어 보는 마음',
        '열등감': '남보다 못하다고 여기는 감정',
     
        '공감': '다른 사람의 감정이나 의견에 동의하는 것',
        '이해됨': '서로의 마음을 알아주는 상태',
        '동질감': '같은 처지나 입장에 있다고 느끼는 감정',
     
        '미안함': '마음이 편치 않고 죄송한 감정',
        '죄책감': '잘못을 저지른 것 같은 마음',
        '양심의 가책': '마음에 찔림을 느끼는 상태',
        '후회스러움': '지난 일을 뉘우치는 마음',
     
        '고마움': '베풀어 준 것에 대해 마음에서 우러나는 감정',
        '감동적인': '마음에 깊은 느낌을 주는 상태',
        '따뜻한': '마음이 포근하고 온화한 느낌',
     
        '그리움': '보고 싶거나 돌아가고 싶은 마음',
        '보고싶음': '만나고 싶은 마음',
        '애틋함': '긴한 정이 뭉클하게 일어나는 마음',
        '아쉬움': '못 다한 것이 있어 마음에 걸리는 상태',
     
        // 불안감정 (anxiety)
        '초조함': '안절부절 못하고 조바심이 나는 상태',
        '안절부절': '마음이 불안하여 진정하지 못하는 상태',
        '조바심': '일이 늦어지거나 뜻대로 되지 않을 것 같아 초조해하는 마음',
        
        '걱정됨': '앞일에 대해 마음이 편치 않은 상태',
        '속태움': '안타까워하며 속을 끓이는 마음',
        '신경쓰임': '마음에 걸려 신경이 쓰이는 상태',

        '막막함': '앞이 보이지 않는 답답한 심정',
        '답이 안 보임': '해결책을 찾지 못해 답답한 상태',
        '불확실함': '확실하지 않아 불안한 상태',

        '당황스러움': '갑작스러운 상황에 어찌할 바를 모르는 상태',
        '난처함': '처하기 어려운 곤란한 상태',
        '곤란함': '처리하기 어렵고 괴로운 상태',
        '어색함': '편하지 않고 거북한 느낌',

        '혼란스러움': '뒤죽박죽되어 갈피를 잡지 못하는 상태',
        '갈피못잡음': '판단이나 결정을 내리지 못하고 헤매는 상태',
        '복잡함': '이것저것 뒤섞여 정리가 안 되는 상태',
        '어지러움': '정신이 혼미하고 혼란스러운 상태',
        
        '부담감': '마음에 걸리는 부담을 느끼는 상태',
        '어깨가 무거움': '책임감이나 부담이 크게 느껴지는 상태',
        '책임감': '맡은 일에 대해 부담을 느끼는 마음',
        '중압감': '무거운 책임감이나 부담감',
     
        // 복합감정 (complex)
        '설렘불안': '기대와 걱정이 뒤섞인 복잡한 감정',
        '기대반 걱정반': '좋은 일과 걱정되는 일이 함께 있는 상태',
     
        '양가감정': '상반된 감정이 공존하는 상태',
        '갈등되는': '여러 감정이 부딪쳐 혼란스러운 상태',
        '이러지도 저러지도 못하는': '결정을 내리지 못하고 망설이는 상태',
     
        '노스탤지어': '과거에 대한 그리움과 아쉬움이 섞인 감정',
        '그립고 아련한': '지난 일이 그립고 희미하게 떠오르는 상태',
     
        '울분': '분하고 원통한 마음이 북받쳐 오르는 감정',
        '억울하고 분한': '부당함을 느끼고 화가 나는 상태',
        '속상하고 화나는': '마음이 아프고 분노가 섞인 상태',
        '서러우면서 분한': '슬프고 억울한 감정이 섞인 상태',
     
        '자책감': '자신을 책망하는 마음',
        '미안하고 후회스러운': '죄책감과 뉘우침이 섞인 상태',
        '수치스러운': '부끄럽고 창피한 감정',
     
        // 에너지감정 (energy)
        '활기': '생기 있게 움직이는 힘',
        '생기넘침': '생동감이 가득한 상태',
        '힘이남': '기운이 충만한 상태',
        '상쾌함': '몸과 마음이 깨끗하고 시원한 느낌',
     
        '피로': '몸과 마음이 지친 상태',
        '지침': '기운이 빠지고 피곤한 상태',
        '녹초가 됨': '기운이 다 빠져 지친 상태',
        '기진맥진': '기운이 다 빠져 꼼짝할 수 없는 상태',
     
        '무기력': '의욕이나 힘이 없는 상태',
        '축 처짐': '기운이 빠져 힘이 없는 모습',
        '기운빠짐': '힘과 의욕이 없어진 상태',
        '멍함': '정신이 흐릿하고 또렷하지 않은 상태',
        '텅 빈 듯한': '아무것도 남지 않은 것 같은 공허한 상태',
     
        '졸림': '잠이 오는 상태',
        '나른함': '몸이 늘어지고 나른한 상태',
        '눈꺼풀이 무거움': '졸려서 눈을 뜨고 있기 힘든 상태',

        '쳐짐': '기운이 빠져 처진 상태',
        '늘어짐': '힘이 빠져 몸이 늘어진 상태',
        '찌뿌둥함': '몸이 뻐근하고 무거운 느낌',
        '노곤함': '몸이 나른하고 귀찮은 상태',

        '활력': '활발하게 움직일 수 있는 힘',
        '생동감': '생기 있게 살아있는 느낌',
        '싱싱함': '생기가 가득한 상태',
        '약동감': '힘차게 움직이는 느낌',

        // 성찰감정 (reflective)
        '깨달음': '이치나 도리를 깨우쳐 알게 됨',
        '알아차림': '무엇인가를 깨닫고 인식하게 됨',
        '머리가 맑아짐': '생각이 또렷해지고 명료해지는 상태',
        '생각이 트임': '사고가 열리고 이해가 되는 상태',

        '반성': '자신의 잘못이나 부족함을 돌아보는 마음',
        '뉘우침': '잘못한 일을 되돌아보고 후회하는 마음',
        '되돌아보게 됨': '지난 일을 다시 생각해보게 되는 상태',
        '마음이 무거움': '죄책감이나 걱정으로 마음이 답답한 상태',

        '담담함': '특별한 감정의 동요가 없는 평온한 상태',
        '차분해짐': '마음이 가라앉아 안정되는 상태',
        '마음이 가라앉음': '흥분이나 동요가 진정되는 상태',
        '평온해짐': '마음이 편안하고 고요해지는 상태',
        '초연한': '한발 물러서서 바라보는 듯한 태도',

        '받아들임': '현실이나 상황을 수용하는 마음',
        '인정하게 됨': '사실이나 상황을 있는 그대로 받아들이는 상태',
        '마음이 열림': '수용적인 태도로 바뀌는 상태',

        // 신체감정 (physical)
        '쑤시는': '특정 부위가 바늘로 찌르는 것처럼 아픈 느낌',
        '저림': '신경이 눌려 감각이 둔해지는 느낌',
        '뻐근함': '근육이나 관절이 뭉치고 뻣뻣해서 움직이기 둔한 상태',
        '결린': '숨을 쉬거나 움직일 때 당기거나 뻐근하여 아픔이 느껴지는 상태',
        '욱신거림': '박동하듯 주기적으로 아픈 느낌',
    };
})();