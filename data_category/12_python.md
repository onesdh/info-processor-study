# Python — 기출 기반 요약정리

> 범위: **2020년 1회 ~ 2026년 2회 중 이 영역 24문제**. 구성: A 출제 빈도 → B 개념 요약(🔥기출 위치 표시 + ⬜미출제 보충) → C 기출 키워드 → D 기출 원문.

## A. 출제 빈도 (많이 나온 순)

| 카테고리 | 횟수 | 출제 회차-번호 (최신순) |
|---|:--:|---|
| python(리스트) | 8 | 26-1-08, 26-1-13, 26-1-14, 25-3-09, 24-3-02, 22-3-09, 22-1-07, 20-4-09 |
| python(문자열) | 5 | 26-2-06, 24-2-06, 24-1-12, 23-2-19, 22-2-13 |
| python(딕셔너리·집합) | 4 | 26-2-05, 25-2-17, 23-1-15, 20-2-02 |
| python(연산·자료형) | 4 | 24-3-10, 23-3-14, 21-3-14, 21-2-07 |
| python(함수·클래스) | 3 | 25-1-17, 22-1-06, 21-1-05 |

---

# B. 개념 요약
> **풀이 공식**: ① 인덱스는 0부터, 슬라이스는 **끝 직전까지** ② 리스트 대입·얕은 복사는 **참조 공유** ③ 집합·딕셔너리 연산 메서드 정의 외우기.

## 1. 문자열 [🔥 26년 2회 6번](../2026년%202회/06.md) 외 4회
```text
a = "_THIS_IS_KIM_SPEAKING"   (길이 21, 인덱스 0~20)
a[:4]  = "_THI"    a[6:8] = "IS"    a[18:] = "ING"
```
- `s[i:j]`: i부터 **j 직전**, `s[-1]` 마지막, `s[::-1]` 뒤집기, **`s[::-2]` 뒤에서부터 2칸씩** (`range(10)[::-2]` → 9,7,5,3,1).
- 공백도 한 글자. `"R AND %s" % "STR"` = 포맷. `''.join(리스트)`, `i.split()`(공백 분리), `c not in 'ong'`(문자 단위).
- `a[12:16]` 같은 슬라이스는 **인덱스 표를 먼저** 그린다.

## 2. 리스트·얕은 복사 [🔥 26년 1회 8번](../2026년%201회/08.md) 외 7회
- `b = a`는 **같은 객체**, `a[:]`/`copy()`/`list(a)`는 **얕은 복사**(안쪽 객체 공유).
- **`b[i+1] += b[i]`는 제자리 연장(extend)** → 공유된 안쪽 리스트까지 변함 (기출 2026-1: `m=[[x] for x in a]; b=m[:]` → 길이 합 **10**).
- 리스트 메서드: **append**(통째로 1개) / **extend**(풀어서 추가) / **pop**(꺼내며 삭제, 값 반환) / remove(값 삭제) / **reverse**(뒤집기) / sort.
- 다중 대입 swap `lst[i], lst[-i-1] = lst[-i-1], lst[i]` (절반 `len//2`까지).
- `map(lambda num: num+100, lst)` → `list()`로 변환. `enumerate` → `(인덱스, 항목)`.
- 2차원 리스트 `lol[2][1]`, 중첩 for 출력(`end=''`).

## 3. 딕셔너리·집합 [🔥 26년 2회 5번](../2026년%202회/05.md) 외 3회
| 구분 | 포인트 |
|---|---|
| **dict** | `items()` → (키,값), 컴프리헨션 `{i:i*2 for i in lst}`. **생성 시점 값의 스냅샷** (이후 `lst` 변경은 반영 ✕) |
| **set** | **중복 제거·순서 없음**, `add`(1개) `remove` `update`(여러 개 합집합), **`&` 교집합** |
- 기출: `{한국,중국,일본}` → add(베트남), add(중국, 무시), remove(일본), update(홍콩·한국·태국) → **5개**.
- `dst[2]=7`로 값 변경 시 `dst.values()`만 변하고 먼저 만든 `set(dst.values())`는 그대로.

## 4. 함수·클래스·기타 [🔥 25년 1회 17번](../2025년%201회/17.md) 외 6회
- **기본 매개변수**: `def exam(num1, num2=2)` → `exam(20)` = `a= 20 b= 2`.
- **클래스 변수**(클래스 본문 선언, 객체로도 접근 `g.li`), 트리 클래스(`children` 리스트, 부모 인덱스 `(i-1)//2`, 레벨 0부터).
- `type()` 비교: `'100.0'`=str(길이 5), `100.0`=**float**, `(100,200)`=tuple. **불리언은 `True/False`(대문자)**.
- 비트 시프트 `a >> i` = a ÷ 2ⁱ (매 반복 **a에서 새로 계산**). `input().split()` → 문자열 리스트(계산하려면 `int()`).

## 5. 기초 개념 보강 (추적에 필요한 전제) ⬜
> Python은 문법이 단순한 대신 **내장 자료형의 연산 규칙**이 문제의 핵심. 외부 정리 글의 공통 목차(자료형·연산자·시퀀스·내장 함수·함수·클래스) 기준으로 보충.

### 연산자·자료형
| 항목 | 규칙 |
|---|---|
| 나눗셈 | `/` 항상 실수(`7/2`=3.5), **`//` 몫**(`7//2`=3, `-7//2`=**-4** 내림), `%` 나머지(부호는 **오른쪽**: `-7%3`=2), `**` 거듭제곱 |
| 자료형 | `int`(무한 정밀도), `float`, `str`, `bool`(`True`/`False`), `list`[] 가변, `tuple`() 불변, `dict`{k:v}, `set`{} |
| 형 변환 | `int("12")`, `str(3)`, `float`, `list("ab")`=['a','b'], `int(3.9)`=3. `int("3.5")` 오류 |
| 논리 | `and`/`or`는 **마지막으로 평가한 값을 반환**(`0 or 5`=5, `3 and 4`=4). **거짓: 0, 빈 문자열/리스트, None, False** |
| 비교 | 연쇄 가능 `1 < x < 5`. `==`(값) / `is`(같은 객체). `in`, `not in` |
| 문자열 연산 | `"ab"*3`=`ababab`, `"a"+"b"`, 숫자+문자열은 **TypeError** |

### 시퀀스·내장 함수·메서드
| 항목 | 규칙 |
|---|---|
| 슬라이싱 | `a[start:stop:step]`, 음수 인덱스 뒤에서부터, 범위 초과해도 오류 없음 |
| `range` | `range(5)`=0~4, `range(2,10,3)`=2,5,8, `range(5,0,-1)`=5,4,3,2,1 |
| 내장 함수 | `len`, `sum`, `max`, `min`, `sorted`(새 리스트) vs `list.sort()`(제자리, 반환 None), `abs`, `round`(**은행가 반올림**: `round(2.5)`=2), `zip`, `enumerate`, `map`, `filter`, `reversed`, `ord`/`chr` |
| 문자열 메서드 | `upper`, `lower`, `strip`, `split(구분자)`, `join`, `replace`, `find`(없으면 -1), `index`(없으면 오류), `count`, `startswith`, `format`/f-string |
| 리스트 메서드 | `append`, `extend`, `insert(i,x)`, `pop([i])`, `remove(값)`, `index`, `count`, `sort`, `reverse`, `copy` |
| 컴프리헨션 | `[x*x for x in range(5) if x%2==0]` = [0,4,16]. dict/set도 동일 문법 |
| dict 메서드 | `keys()`, `values()`, `items()`, `get(k, 기본값)`, `pop`, `update`, `del d[k]`. 키가 없을 때 `d[k]`는 **KeyError** |
| set 연산 | `\|` 합집합, `&` 교집합, `-` 차집합, `^` 대칭차집합 |
| 언패킹 | `a, b = b, a`, `first, *rest = [1,2,3]` → rest=[2,3] |

### 함수·클래스·예외
| 항목 | 규칙 |
|---|---|
| 함수 | 반환 없으면 `None`. 기본 매개변수는 **정의 시 1회 평가**(`def f(a=[])` 공유 주의). 키워드 인자 `f(b=2)`, `*args`(튜플), `**kwargs`(dict) |
| 스코프 | 함수 안에서 대입하면 지역 변수, 전역 수정은 `global`. 가변 객체(list)는 함수에서 변경하면 **호출자에도 반영** |
| `lambda` | `lambda x: x+1` 이름 없는 한 줄 함수. `map/filter/sorted(key=…)`와 함께 |
| 클래스 | `__init__`(생성자), 첫 인자 `self`, **클래스 변수**(공유) vs 인스턴스 변수(`self.x`). 상속 `class B(A)`, `super().__init__()`, 메서드 오버라이딩, `__str__`(print 시 호출) |
| 예외 | `try / except 예외 / else / finally`. `ZeroDivisionError`, `ValueError`, `IndexError`, `KeyError`, `TypeError`. `raise` |
| `import` | `import math` → `math.sqrt(16)`=4.0, `math.pow`, `math.floor/ceil` |
| 출력 | `print(a, b, sep='-', end='')` (기본 sep 공백, end 줄바꿈) |

---

# C. 기출 키워드 → 정답 (한눈에)

| 회차-번호 | 카테고리 | 정답 |
|---|---|---|
| [26-1-08](../2026년%201회/08.md) | python(리스트) | veDamuH |
| [26-1-13](../2026년%201회/13.md) | python(리스트) | 9A7A5A3A1A |
| [26-1-14](../2026년%201회/14.md) | python(리스트) | 10 |
| [25-3-09](../2025년%203회/09.md) | python(리스트) | ① 15, ② 5, ③ 10, ④ 3, ⑤ 18, ⑥ 5, ⑦ 9, ⑧ 2 |
| [24-3-02](../2024년%203회/02.md) | python(리스트) | 3 |
| [22-3-09](../2022년%203회/09.md) | python(리스트) | [101, 102, 103, 104, 105] |
| [22-1-07](../2022년%201회/07.md) | python(리스트) | 1. extend 2. pop 3. reverse |
| [20-4-09](../2020년%204회/09.md) | python(리스트) | [1, 2, 3] 7 123 45 6789 |
| [26-2-06](../2026년%202회/06.md) | python(문자열) | _THIISING (맨 앞의 밑줄 _을 빠뜨리지 말 것. 문서에서는 마크다운 때문에 \_THIISING로 표기됨) |
| [24-2-06](../2024년%202회/06.md) | python(문자열) | ab3ca3 |
| [24-1-12](../2024년%201회/12.md) | python(문자열) | Seynaau |
| [23-2-19](../2023년%202회/19.md) | python(문자열) | engneing |
| [22-2-13](../2022년%202회/13.md) | python(문자열) | REMEMBER AND STR |
| [26-2-05](../2026년%202회/05.md) | python(딕셔너리·집합) | CNNLRPYT |
| [25-2-17](../2025년%202회/17.md) | python(딕셔너리·집합) | 2 |
| [23-1-15](../2023년%201회/15.md) | python(딕셔너리·집합) | {'한국', '중국', '베트남', '홍콩', '태국'} (순서 무관) |
| [20-2-02](../2020년%202회/02.md) | python(딕셔너리·집합) | {'중국','한국','베트남','홍콩','태국'} (순서 무관) |
| [24-3-10](../2024년%203회/10.md) | python(연산·자료형) | 45 |
| [23-3-14](../2023년%203회/14.md) | python(연산·자료형) | split |
| [21-3-14](../2021년%203회/14.md) | python(연산·자료형) | False (첫 글자 대문자!) |
| [21-2-07](../2021년%202회/07.md) | python(연산·자료형) | 26 |
| [25-1-17](../2025년%201회/17.md) | python(함수·클래스) | 13 |
| [22-1-06](../2022년%201회/06.md) | python(함수·클래스) | a= 20 b= 2 |
| [21-1-05](../2021년%201회/05.md) | python(함수·클래스) | skiddp |

---

# D. 기출문제 원문

## python(리스트) (8회)

### 2026년 1회 08번

[해설 보기](../2026년%201회/08.md)

아래 파이썬 코드가 있다. 입력값으로 HumanDev를 주었을 때 출력되는 결과를 쓰시오.

```
i = input()
x = []

for word in i.split():
    x.append(word)

y = ''.join(x)
z = ''.join(c for c in y[::-1] if c not in 'ong')

print(z)
```

<details><summary>정답 보기</summary>

**정답:** veDamuH

</details>

### 2026년 1회 13번

[해설 보기](../2026년%201회/13.md)

다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
lst = list(range(10))
for c in lst[::-2]:
    print(c, end='A')
print()
```

<details><summary>정답 보기</summary>

**정답:** 9A7A5A3A1A

</details>

### 2026년 1회 14번

[해설 보기](../2026년%201회/14.md)

아래 파이썬 코드를 실행했을 때 출력되는 값을 쓰시오.

```
def f(a):
    m = [[x] for x in a]
    b = m[:]
    for i in range(len(b) - 1):
        b[i+1] += b[i]
    return sum(len(x) for x in m)

print(f([1, 2, 3, 4]))
```

<details><summary>정답 보기</summary>

**정답:** 10

</details>

### 2025년 3회 09번

[해설 보기](../2025년%203회/09.md)

다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 출력값에 알맞는 값을 작성하시오.

```
data = [
    [3, 5, 2, 4, 1],
    [4, 5, 1],
    [4, 4, 1, 5, 4],
    [4, 5]
]

result = {}

for index, lis in enumerate(data):
    list_sum = sum(lis)
    list_len = len(lis)

    result[index] = (list_sum, list_len)

print(result)

```

[ 출력값 ]

{0: (①, ②), 1: (③, ④), 2: (⑤, ⑥), 3: (⑦, ⑧)}

<details><summary>정답 보기</summary>

**정답:** ① 15, ② 5, ③ 10, ④ 3, ⑤ 18, ⑥ 5, ⑦ 9, ⑧ 2

</details>

### 2024년 3회 02번

[해설 보기](../2024년%203회/02.md)

다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
def func(lst):
  for i in range(len(lst) //2):
    lst[i], lst[-i-1] = lst[-i-1], lst[i]

lst = [1,2,3,4,5,6]
func(lst)
print(sum(lst[::2]) - sum(lst[1::2]))
```

<details><summary>정답 보기</summary>

**정답:** 3

</details>

### 2022년 3회 09번

[해설 보기](../2022년%203회/09.md)

다음 파이썬 코드에 대한 출력값을 작성하시오.

```





1
2
3
4




TestList = [1,2,3,4,5]
TestList = list(map(lambda num : num + 100, TestList)))

print(TestList)

Colored by Color Scripter

cs



```

<details><summary>정답 보기</summary>

**정답:** [101, 102, 103, 104, 105]

</details>

### 2022년 1회 07번

[해설 보기](../2022년%201회/07.md)

다음 설명과 관련된 답을 보기에서 골라 작성하시오.  
(실제 기출문제에서는 답의 보기가 주어집니다.(오답 중, remove, sort 등..))

1. 요소를 확장해준다는 의미를 가지고 있으며, 모든 항목을 하나의 요소로 추가  
2. 리스트 내부 요소를 꺼내주는 함수로써, 그 요소는 리스트 안에서 삭제하고 그 값을 반환  
3. 리스트 내부의 요소의 순서는 뒤집는 역할

<details><summary>정답 보기</summary>

**정답:** 1. extend 2. pop 3. reverse

</details>

### 2020년 4회 09번

[해설 보기](../2020년%204회/09.md)

다음은 파이썬 소스 코드이다. 출력 결과를 쓰시오.

```
lol = [[1,2,3],[4,5],[6,7,8,9]]
print(lol[0])
print(lol[2][1])
	for sub in lol:
   	for item in sub:
        	print(item, end = '')
      	print()
```

<details><summary>정답 보기</summary>

**정답:** [1, 2, 3] 7 123 45 6789

</details>

## python(문자열) (5회)

### 2026년 2회 06번

[해설 보기](../2026년%202회/06.md)

다음은 파이썬 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
a = "_THIS_IS_KIM_SPEAKING"
b = a[:4]
c = a[6:8]
d = a[18:]
e = b + c + d
print(e)
```

<details><summary>정답 보기</summary>

**정답:** _THIISING (맨 앞의 밑줄 _을 빠뜨리지 말 것. 문서에서는 마크다운 때문에 \_THIISING로 표기됨)

</details>

### 2024년 2회 06번

[해설 보기](../2024년%202회/06.md)

다음은 Python에 대한 문제이다. 아래 코드를 읽고 알맞는 출력 값을 작성하시오.

```
def fnCalculation(x,y):
    result = 0;
    for i in range(len(x)):
     temp = x[i:i+len(y)]
     if temp == y:
       result += 1;
    return result

a = "abdcabcabca"
p1 = "ab";
p2 = "ca";

out = f"ab{fnCalculation(a,p1)}ca{fnCalculation(a,p2)}"
print(out)
```

<details><summary>정답 보기</summary>

**정답:** ab3ca3

</details>

### 2024년 1회 12번

[해설 보기](../2024년%201회/12.md)

다음 파이썬 코드에 대한 알맞는 출력 값을 작성하시오.

```
a = ["Seoul", "Kyeonggi", "Incheon", "Daejun", "Daegu", "Pusan"]
str = "S"

for i in a:
    str = str + i[1]

print(str)
```

<details><summary>정답 보기</summary>

**정답:** Seynaau

</details>

### 2023년 2회 19번

[해설 보기](../2023년%202회/19.md)

다음 파이썬 코드에서 알맞는 출력값을 작성하시오.

```





1
2
3
4
5
6




a = "engineer information processing"
b = a[:3]
c = a[4:6]
d = a[28:]
e=b+c+d
print(e)


cs



```

<details><summary>정답 보기</summary>

**정답:** engneing

</details>

### 2022년 2회 13번

[해설 보기](../2022년%202회/13.md)

다음은 파이썬 코드이다. 알맞는 출력값을 작성하시오.

```





1
2
3
4




a = "REMEMBER NOVEMBER"
b = a[:3] + a[12:16];
c = "R AND %s" % "STR";
print(b+c);


cs



```

<details><summary>정답 보기</summary>

**정답:** REMEMBER AND STR

</details>

## python(딕셔너리·집합) (4회)

### 2026년 2회 05번

[해설 보기](../2026년%202회/05.md)

다음은 파이썬 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
class LocationDict:
    locations = {
        "NYC": "New York",
        "LON": "London",
        "PAR": "Paris",
        "TKY": "Tokyo"
    }

tmpdict = LocationDict()
str01 = ""
for key, location in tmpdict.locations.items():
    keyk = key[-1]
    locationk = location[0]
    str01 += keyk + locationk

print(str01, end="")
```

<details><summary>정답 보기</summary>

**정답:** CNNLRPYT

</details>

### 2025년 2회 17번

[해설 보기](../2025년%202회/17.md)

다음은 Pyhon언어의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.

```
lst = [1,2,3]
dst = {i : i* 2 for i in lst}
s = set(dst.values())
lst[0] = 99
dst[2]=7
s.add(99)
print(len(s & set(dst.values())))
```

<details><summary>정답 보기</summary>

**정답:** 2

</details>

### 2023년 1회 15번

[해설 보기](../2023년%201회/15.md)

다음 파이썬 코드의 알맞는 출력값을 작성하시오.

```
a = {'한국', '중국', '일본'}
a.add('베트남')
a.add('중국')
a.remove('일본')
a.update({'홍콩', '한국', '태국'})
print(a)
```

<details><summary>정답 보기</summary>

**정답:** {'한국', '중국', '베트남', '홍콩', '태국'} (순서 무관)

</details>

### 2020년 2회 02번

[해설 보기](../2020년%202회/02.md)

다음은 파이썬 코드이다. 출력 결과를 쓰시오.

```
a={'일본','중국','한국'}
a.add('베트남')
a.add('중국')
a.remove('일본')
a.update(['홍콩','한국','태국'])
print(a)
```

<details><summary>정답 보기</summary>

**정답:** {'중국','한국','베트남','홍콩','태국'} (순서 무관)

</details>

## python(연산·자료형) (4회)

### 2024년 3회 10번

[해설 보기](../2024년%203회/10.md)

다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
def func(value):
    if type(value) == type(100):
        return 100
    elif type(value) == type(""):
        return len(value)
    else:
        return 20


a = '100.0'
b = 100.0
c = (100, 200)

print(func(a) + func(b) + func(c))

```

<details><summary>정답 보기</summary>

**정답:** 45

</details>

### 2023년 3회 14번

[해설 보기](../2023년%203회/14.md)

다음은 파이썬에 대한 문제이다. 밑줄친 부분에 알맞는 답을 작성하시오.

```
print("파이썬 입출력에 대한 문제입니다.")

num1, num2 = input()._____()
num1 = int(num1)
num2 = int(num2)
print(num1,num2)

num3 = num1 + num2
print(num1 + " + "  + num2 + " = " + num3)
```

특이사항

입력값은 2와 3이다.

출력화면

파이썬 입력출에 대한 문제입니다.  
2 3  
2 + 3 = 5

<details><summary>정답 보기</summary>

**정답:** split

</details>

### 2021년 3회 14번

[해설 보기](../2021년%203회/14.md)

다음 파이썬 코드이다. 알맞는 출력값을 쓰시오.

```
a,b = 100, 200
print(a==b)
```

<details><summary>정답 보기</summary>

**정답:** False (첫 글자 대문자!)

</details>

### 2021년 2회 07번

[해설 보기](../2021년%202회/07.md)

파이썬 비트 연산자 코드 결과

```
a = 100
result = 0
for i in range(1,3);
   result = a >> i
   result = result + 1
pirnt(result)
```

<details><summary>정답 보기</summary>

**정답:** 26

</details>

## python(함수·클래스) (3회)

### 2025년 1회 17번

[해설 보기](../2025년%201회/17.md)

다음은 파이썬에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
class Node:
    def __init__(self, value):
        self.value = value
        self.children = []

def tree(li):
    nodes = [Node(i) for i in li]
    for i in range(1, len(li)):
        nodes[(i - 1) // 2].children.append(nodes[i])
    return nodes[0]

def calc(node, level=0):
    if node is None:
        return 0
    return (node.value if level % 2 == 1 else 0) + sum(calc(n, level + 1) for n in node.children)

li = [3, 5, 8, 12, 15, 18, 21]

root = tree(li)

print(calc(root))
```

<details><summary>정답 보기</summary>

**정답:** 13

</details>

### 2022년 1회 06번

[해설 보기](../2022년%201회/06.md)

다음은 파이썬 코드에서 출력되는 a와 b의 값을 작성하시오.

```
def exam(num1, num2=2):
  print('a=', num1, 'b=', num2)
exam(20)
```

<details><summary>정답 보기</summary>

**정답:** a= 20 b= 2

</details>

### 2021년 1회 05번

[해설 보기](../2021년%201회/05.md)

다음은 파이썬 코드이다. 출력 결과를 쓰시오.

```
class good :
	li = ["seoul", "kyeonggi","inchon","daejeon","daegu","pusan"]

g = good()
str01 = ''
for i in g.li:
	str01 = str01 + i[0]

print(str01)
```

<details><summary>정답 보기</summary>

**정답:** skiddp

</details>
