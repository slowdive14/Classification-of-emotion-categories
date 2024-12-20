import re

def clean_text(text):
    # 공백 문자 처리
    text = text.replace('\t', ' ')
    # 연속된 공백을 하나로
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extract_numbers(text):
    # 숫자와 점이 있는 부분을 찾기
    numbers = []
    # 정수부 하나와 소수부 두 자리를 찾는 패턴
    pattern = r'(\d)\s*\.\s*(\d\s*\d)'
    matches = list(re.finditer(pattern, text))
    
    for match in matches:
        # 정수부와 소수부를 결합 (공백 제거)
        integer_part = match.group(1)
        decimal_part = ''.join(match.group(2).split())
        num_str = f"{integer_part}.{decimal_part}"
        try:
            num = float(num_str)
            numbers.append(num)
        except ValueError:
            continue
    
    return numbers

def process_line(line):
    # 빈 줄 처리
    if not line.strip():
        return []
    
    # 기본 텍스트 정리
    line = clean_text(line)
    
    # 결과 저장
    results = []
    
    # 한글 단어 패턴 (띄어쓰기와 *를 포함)
    word_pattern = r'[가-힣]+(?:\s+[가-힣]+)*\*?'
    
    # 단어 찾기
    words = []
    for match in re.finditer(word_pattern, line):
        # 단어의 * 표시 확인
        word_with_star = match.group().strip()
        has_star = word_with_star.endswith('*')
        
        # 공백 제거 (단, * 표시는 유지)
        word = ''.join(word_with_star.replace('*', '').split())
        if has_star:
            word += '*'
            
        if word:
            words.append(word)
    
    # 각 단어 다음의 숫자들 추출
    for i, word in enumerate(words):
        # 현재 단어의 위치 찾기 (별표 제외하고 검색)
        search_word = word.replace('*', '').replace('', ' ').strip()
        word_start = line.find(search_word)
        if word_start == -1:
            continue
        
        # 다음 단어의 시작 위치 찾기
        next_word_start = len(line)
        if i + 1 < len(words):
            next_search_word = words[i + 1].replace('*', '').replace('', ' ').strip()
            next_word_start = line.find(next_search_word)
        
        # 단어 다음부터 다음 단어 전까지의 텍스트에서 숫자 추출
        number_text = line[word_start:next_word_start]
        numbers = extract_numbers(number_text)
        
        if len(numbers) == 4:
            results.append((word, numbers))
    
    return results

def process_file(input_path, output_path):
    # 헤더 추가
    header = "단어\t원형성\t친숙성\t쾌-불쾌\t활성화"
    formatted_lines = [header]
    
    try:
        # UTF-8로 시도
        with open(input_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        # UTF-8로 실패하면 CP949로 시도
        with open(input_path, 'r', encoding='cp949') as f:
            content = f.read()
    
    # 줄 단위로 처리
    for line in content.split('\n'):
        results = process_line(line)
        for word, numbers in results:
            # TSV 형식으로 출력
            formatted_line = f"{word}\t{numbers[0]:.2f}\t{numbers[1]:.2f}\t{numbers[2]:.2f}\t{numbers[3]:.2f}"
            formatted_lines.append(formatted_line)
    
    # 결과를 파일에 쓰기
    output_path = output_path.replace('.txt', '.tsv')  # 확장자를 .tsv로 변경
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(formatted_lines))

# 파일 처리 실행
input_file = 'c:/Users/space/Downloads/새 폴더/reformatted_data.txt'
output_file = 'c:/Users/space/Downloads/새 폴더/formatted_result.txt'
process_file(input_file, output_file)
