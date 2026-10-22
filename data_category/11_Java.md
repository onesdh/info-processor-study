# Java — 기출 기반 요약정리

> 범위: **2020년 1회 ~ 2026년 2회 중 이 영역 56문제**. 구성: A 출제 빈도 → B 개념 요약(🔥기출 위치 표시 + ⬜미출제 보충) → C 기출 키워드 → D 기출 원문.

## A. 출제 빈도 (많이 나온 순)

| 카테고리 | 횟수 | 출제 회차-번호 (최신순) |
|---|:--:|---|
| Java(상속·다형성) | 19 | 26-2-02, 26-2-15, 26-1-07, 25-3-12, 25-2-10, 25-1-13, 25-1-20, 24-3-11, 24-3-19, 24-1-10, 24-1-16, 23-3-01 … |
| Java(제어문·배열·알고리즘) | 16 | 25-1-16, 24-2-17, 23-2-02, 23-1-14, 22-3-19, 22-3-20, 22-2-07, 22-1-11, 21-3-11, 21-1-07, 21-1-17, 20-4-05 … |
| Java(클래스 구조) | 10 | 25-3-08, 25-3-17, 24-2-14, 24-1-01, 23-3-13, 23-1-01, 23-1-17, 21-3-01, 21-2-17, 20-3-15 |
| Java(참조·문자열) | 8 | 26-1-17, 25-2-05, 25-2-15, 24-3-01, 24-2-01, 24-2-20, 23-2-14, 22-1-03 |
| Java(예외 처리) | 3 | 25-2-09, 25-1-05, 24-3-18 |

---

# B. 개념 요약
> **풀이 공식**: ① **선언 타입 vs 실제 객체** 구분 ② 필드/static/메서드를 따로 판단 ③ `+`가 덧셈인지 문자열 연결인지 확인.

## 1. 객체지향 (기출 최다)
### 오버라이딩·오버로딩·바인딩 [🔥 26년 2회 2번](../2026년%202회/02.md) 외 18회
| 대상 | 무엇을 기준으로? |
|---|---|
| **인스턴스 메서드(오버라이딩)** | **실제 객체 타입** (동적 바인딩). 부모 안에서 호출해도 자식 것이 실행 |
| **오버로딩** | **컴파일 시 선언 타입·인자 타입**으로 시그니처 결정. 매개변수가 다르면 **오버라이딩이 아님** |
| **필드(변수)** | **참조 변수의 선언 타입** (필드는 오버라이딩 ✕, **은닉**) |
| **static 메서드·필드** | **선언 타입**, 클래스 소유(은닉). `Static.b`와 `st.b`는 **같은 변수** |
- 기출: `A a=new B(); a.g()` — g()는 A 안에서 `f("a")` 호출 → 컴파일 시 A의 `f(Object)`로 결정 → B에 오버라이딩된 **`f(Object)`="2"** 실행 (B의 `f(String)`은 선택 안 됨).
- `Parent ref=new Child(); ref.x(2)+ref.id()` → 인스턴스는 자식(+3), **static은 부모("P")** → `5P`.
- 제네릭 `T value` → 컴파일 시 **Object**로 보므로 `print(Object)` 선택 (`B0`).
- `super.메서드()`는 **부모 것 지정**, `super(...)`/`this(...)`는 **생성자 첫 줄**.

### 생성자 호출 순서 [🔥 26년 2회 2번](../2026년%202회/02.md) 외 18회
**부모 생성자 → 자식 필드 초기화 → 자식 생성자 본문**. 부모 생성자 안의 `show()` 호출도 **자식 오버라이딩** 메서드가 실행(자식 필드는 아직 초기화 전). `this(500)` 체이닝, 같은 이름 필드는 **각자 따로**(Parent.x=500, Child.x=5000이면 `getX()`(부모 정의)는 **500**).

### 접근 제어자·static·싱글톤 [🔥 25년 3회 8번](../2025년%203회/08.md) 외 9회
- `private` < default < `protected` < `public`. private은 자식 직접 접근 불가(→ getter/setter, 부모 메서드 경유).
- **static 메서드는 인스턴스 변수 사용 불가**(컴파일 에러). `static` = 객체 없이 `클래스.메서드()`.
- **싱글톤**: `get()`이 항상 같은 객체 → 여러 변수로 호출해도 **count 누적**(3번이면 3, 4번이면 4).
- 추상 클래스(`abstract`)·**인터페이스(`implements`)**·`extends`는 클래스 1개만, `implements`는 여러 개.
- **enum**: `values()`(선언 순서 배열), `name()`, `Tri.values()[Tri.A.name().length()]`.
- 업캐스팅 `Parent pa = new Child();` — 호출은 실제 객체 기준.

## 2. 값 전달·문자열 [🔥 26년 1회 17번](../2026년%201회/17.md) 외 7회
- **Java는 항상 값 전달**: 객체(배열) **참조값이 복사** → **내용 수정은 반영**, 참조 변수 재대입(`s="Z"`)은 호출자 영향 ✕. String은 불변.
- 배열 `==`는 **같은 객체인가**(내용 같아도 N), 문자열은 **리터럴 풀**: `"a"=="a"` true, `new String("a")==` false, `equals`는 내용 비교.
- `+` 연산: **왼쪽부터**, 숫자+숫자=덧셈, 문자열이 끼면 연결: `9+2+"2"+"3"`=`1123`. `5 + "P"` → `5P`.
- `split("T")`는 구분자 제거, 인덱스 0부터. `print`=줄바꿈 없음.

## 3. 예외 처리 [🔥 25년 2회 9번](../2025년%202회/09.md) 외 2회
`try → catch(위에서 첫 매칭 1개) → finally(**항상 실행**)`. `5/0` → `ArithmeticException`. 자식 예외(NPE)를 **먼저** catch. 람다 `(x)->{ if(x>2) throw new Exception(); return x*2; }` 예외 시 catch의 return.

## 4. 기타 패턴 [🔥 25년 1회 16번](../2025년%201회/16.md) 외 15회
| 주제 | 포인트 |
|---|---|
| 2차원 배열 | **가변 배열** `{{45,50,75},{89}}` → `arr[0].length=3`, `arr[1].length=1` |
| 반복·continue | `continue`는 나머지 건너뜀(홀수 skip → 짝수합 30) |
| 몫·나머지 | `m/1000`, `(m%1000)/500` … 거스름돈 |
| 진법 변환 | `n%2` 저장, 거꾸로 출력 |
| **스레드** | `Runnable` 구현 클래스를 `new Thread(new Car())` → `start()` |
| **switch** | **break 없으면 fall-through** (i=3, k=1 → -8) |
| 논리 연산 | `(a==2 \| a==c) & !(c>d) & (1==b ^ c!=d)` — `==`가 먼저, **XOR은 다르면 참**, `&`·`\|`는 **단락 없이** 양쪽 평가 |
| 재귀 | 이진 분할 합 `a[mid]+max(L,R)`, 호출 트리로 |

## 5. 기초 개념 보강 (추적에 필요한 전제) ⬜
> 객체지향 외에 Java 코드 문제를 풀 때 쓰이는 기본 문법·API. 외부 정리 글의 공통 목차(자료형·연산자·String·컬렉션·예외·제네릭) 기준 보충.

### 자료형·연산
| 항목 | 규칙 |
|---|---|
| 기본형 8개 | `byte`1 `short`2 `int`4 `long`8 `float`4 `double`8 `char`2(유니코드) `boolean`. 참조형은 클래스·배열·String |
| **정수 나눗셈** | `7/2`=3, `-7%3`=-1(부호는 왼쪽), `7/2.0`=3.5. `int/int`는 항상 정수 |
| 형 변환 | 작은 → 큰 **자동**, 큰 → 작은 **강제 `(int)3.9`=3**. `char c='A'; c+1`은 `int` 66, `(char)(c+1)`='B' |
| 초기값 | 필드 기본값: 정수 0, 실수 0.0, boolean false, 참조 null. **지역 변수는 초기화 필수** |
| 증감·논리 | `i++`/`++i` C와 동일. `&&`/`\|\|` 단락 평가, `&`/`\|`는 양쪽 모두 평가. 삼항 `조건 ? a : b` |
| `==` vs `equals` | 기본형 `==`는 값, **참조형 `==`는 주소**. 문자열 내용 비교는 `equals` |
| 비트·시프트 | `>>` 부호 유지, `>>>` 0 채움, `<<` ×2ⁿ |
| 래퍼 클래스 | `Integer`, `Double`… **오토박싱/언박싱**. `Integer.parseInt("12")`=12, `Integer.valueOf`, `-128~127` 범위는 `Integer` 캐시라 `==` true |

### String · StringBuilder · 배열
| 항목 | 규칙 |
|---|---|
| **String 불변** | 메서드는 **새 문자열 반환**(원본 불변): `s.toUpperCase()`만 호출하고 대입 안 하면 변화 없음 |
| 주요 메서드 | `length()`, `charAt(i)`, `substring(a,b)`(b 직전까지), `indexOf`(없으면 -1), `replace`, `split`, `trim`, `equals`, `compareTo`, `contains`, `concat` |
| `StringBuilder` | 가변: `append`, `insert`, `reverse`, `toString` |
| 배열 | `int[] a = new int[3]` → 0으로 초기화, `a.length`(필드, 괄호 없음), 범위 밖 → `ArrayIndexOutOfBoundsException`. `Arrays.sort`, `Arrays.toString` |
| 향상된 for | `for (int x : arr)` — 값 복사본(기본형은 원본 수정 ✕) |

### 컬렉션·제네릭·기타
| 항목 | 규칙 |
|---|---|
| `List` | `ArrayList` 순서 유지·중복 허용. `add`, `get(i)`, `remove(i/객체)`, `size()` |
| `Set` | 중복 ✕. `HashSet` 순서 없음, `LinkedHashSet` 입력 순서, `TreeSet` 정렬 |
| `Map` | 키→값. `put`, `get`, `containsKey`, `entrySet()`. `HashMap` 순서 불정, `TreeMap` 키 정렬 |
| `Stack`/`Queue` | `push/pop`(LIFO) / `offer(add)/poll`(FIFO) |
| 제네릭 | `List<String>` 컴파일 시 타입 검사. `<T>`는 타입 매개변수 |
| 예외 계층 | `Throwable` → `Exception`(checked) / `RuntimeException`(unchecked: NPE, ArithmeticException, ArrayIndexOutOfBounds, ClassCastException, NumberFormatException). `throw`(던지기) / `throws`(선언) |
| `final` | 변수 재대입 ✕ / 메서드 오버라이딩 ✕ / 클래스 상속 ✕ |
| 초기화 순서 | `static` 블록(클래스 로드 시 1회) → 인스턴스 블록 → 생성자 |
| `Object` 메서드 | `toString()`(기본 `클래스@해시`), `equals`, `hashCode`. `println(객체)`는 `toString()` 호출 |
| `interface` / `abstract` | 인터페이스: 구현 강제, 다중 구현 / 추상 클래스: 일부 구현 가능, 단일 상속. 둘 다 `new` 불가 |
| 출력 | `System.out.println`(줄바꿈 O), `print`(X), `printf("%d %s %.2f%n")` |

---

# C. 기출 키워드 → 정답 (한눈에)

| 회차-번호 | 카테고리 | 정답 |
|---|---|---|
| [26-2-02](../2026년%202회/02.md) | Java(상속·다형성) | 10a20b |
| [26-2-15](../2026년%202회/15.md) | Java(상속·다형성) | 509 |
| [26-1-07](../2026년%201회/07.md) | Java(상속·다형성) | 2 |
| [25-3-12](../2025년%203회/12.md) | Java(상속·다형성) | super (출력 결과는 100) |
| [25-2-10](../2025년%202회/10.md) | Java(상속·다형성) | 5P |
| [25-1-13](../2025년%201회/13.md) | Java(상속·다형성) | 54 |
| [25-1-20](../2025년%201회/20.md) | Java(상속·다형성) | 4 |
| [24-3-11](../2024년%203회/11.md) | Java(상속·다형성) | 52 |
| [24-3-19](../2024년%203회/19.md) | Java(상속·다형성) | B0 |
| [24-1-10](../2024년%201회/10.md) | Java(상속·다형성) | 6 → 3 → 1 → 7 → 2 (괄호 순서대로) |
| [24-1-16](../2024년%201회/16.md) | Java(상속·다형성) | 9 |
| [23-3-01](../2023년%203회/01.md) | Java(상속·다형성) | BDCDD |
| [23-3-11](../2023년%203회/11.md) | Java(상속·다형성) | 2 |
| [23-1-20](../2023년%201회/20.md) | Java(상속·다형성) | 500 |
| [22-2-17](../2022년%202회/17.md) | Java(상속·다형성) | 61 |
| [21-2-19](../2021년%202회/19.md) | Java(상속·다형성) | 11 |
| [20-4-19](../2020년%204회/19.md) | Java(상속·다형성) | 1 |
| [20-2-05](../2020년%202회/05.md) | Java(상속·다형성) | new |
| [20-2-19](../2020년%202회/19.md) | Java(상속·다형성) | a=10 (원문 정답은 a = 10으로 공백이 있으나, 코드 "a=" + a 기준 출력은 a=10) |
| [25-1-16](../2025년%201회/16.md) | Java(제어문·배열·알고리즘) | 20 |
| [24-2-17](../2024년%202회/17.md) | Java(제어문·배열·알고리즘) | dcba |
| [23-2-02](../2023년%202회/02.md) | Java(제어문·배열·알고리즘) | a: m / 1000 b: (m % 1000) / 500 c: (m % 500) / 100 d: (m % 100) / 10 |
| [23-1-14](../2023년%201회/14.md) | Java(제어문·배열·알고리즘) | (1) idx2 (2) nx |
| [22-3-19](../2022년%203회/19.md) | Java(제어문·배열·알고리즘) | 0123 |
| [22-3-20](../2022년%203회/20.md) | Java(제어문·배열·알고리즘) | 993 |
| [22-2-07](../2022년%202회/07.md) | Java(제어문·배열·알고리즘) | -8 |
| [22-1-11](../2022년%201회/11.md) | Java(제어문·배열·알고리즘) | Car |
| [21-3-11](../2021년%203회/11.md) | Java(제어문·배열·알고리즘) | 7 |
| [21-1-07](../2021년%201회/07.md) | Java(제어문·배열·알고리즘) | 3 1 45 50 89 (println이므로 각각 줄바꿈되어 출력) |
| [21-1-17](../2021년%201회/17.md) | Java(제어문·배열·알고리즘) | 0+1+2+3+4+5=15 (공백 없이 출력됨) |
| [20-4-05](../2020년%204회/05.md) | Java(제어문·배열·알고리즘) | (1) n > 0 (2) n % 2 |
| [20-4-06](../2020년%204회/06.md) | Java(제어문·배열·알고리즘) | (1) 3 (2) 5 → new int[3][5] |
| [20-3-17](../2020년%203회/17.md) | Java(제어문·배열·알고리즘) | 30 |
| [20-1-13](../2020년%201회/13.md) | Java(제어문·배열·알고리즘) | 0 1 2 3 (마지막에 공백 하나가 더 붙는다) |
| [20-1-14](../2020년%201회/14.md) | Java(제어문·배열·알고리즘) | -8 |
| [25-3-08](../2025년%203회/08.md) | Java(클래스 구조) | implements |
| [25-3-17](../2025년%203회/17.md) | Java(클래스 구조) | AB |
| [24-2-14](../2024년%202회/14.md) | Java(클래스 구조) | 25, 20 |
| [24-1-01](../2024년%201회/01.md) | Java(클래스 구조) | 4 |
| [23-3-13](../2023년%203회/13.md) | Java(클래스 구조) | 7 (번 줄) |
| [23-1-01](../2023년%201회/01.md) | Java(클래스 구조) | 10 11 10 20 |
| [23-1-17](../2023년%201회/17.md) | Java(클래스 구조) | Vehicle name: Spark |
| [21-3-01](../2021년%203회/01.md) | Java(클래스 구조) | 3 |
| [21-2-17](../2021년%202회/17.md) | Java(클래스 구조) | static |
| [20-3-15](../2020년%203회/15.md) | Java(클래스 구조) | vehicle name:Spark (원문 정답은 대소문자·공백이 다르게 표기되어 있으나, 코드 기준 출력은 vehicle name: 뒤에 Spark가 이어지는 형… |
| [26-1-17](../2026년%201회/17.md) | Java(참조·문자열) | 1123 |
| [25-2-05](../2025년%202회/05.md) | Java(참조·문자열) | BB |
| [25-2-15](../2025년%202회/15.md) | Java(참조·문자열) | 1a3b3 |
| [24-3-01](../2024년%203회/01.md) | Java(참조·문자열) | OOAAA |
| [24-2-01](../2024년%202회/01.md) | Java(참조·문자열) | NNN |
| [24-2-20](../2024년%202회/20.md) | Java(참조·문자열) | S |
| [23-2-14](../2023년%202회/14.md) | Java(참조·문자열) | true false true true (원문 코드는 '로 작성된 오타 등이 있으나 "Programming" 문자열 기준) |
| [22-1-03](../2022년%201회/03.md) | Java(참조·문자열) | 2000 |
| [25-2-09](../2025년%202회/09.md) | Java(예외 처리) | 19 |
| [25-1-05](../2025년%201회/05.md) | Java(예외 처리) | 출력1출력5 |
| [24-3-18](../2024년%203회/18.md) | Java(예외 처리) | 101 |

---

# D. 기출문제 원문

## Java(상속·다형성) (19회)

### 2026년 2회 02번

[해설 보기](../2026년%202회/02.md)

다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
class A {
    private int a;

    public A(int a) {
        this.a = a;
    }

    void print() {
        System.out.print(a + "a");
    }
}

class B extends A {
    private int b;

    B(int a, int b) {
        super(a);
        this.b = b;
    }

    void print() {
        super.print();
        System.out.print(b + "b");
    }
}

public class Main {
    public static void main(String[] args) {
        B obj = new B(10, 20);
        obj.print();
    }
}
```

<details><summary>정답 보기</summary>

**정답:** 10a20b

</details>

### 2026년 2회 15번

[해설 보기](../2026년%202회/15.md)

다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
class A {
    int a;
    private int b;
    protected int c;

    void set(int aa, int bb, int cc) {
        a = aa;
        b = bb;
        c = cc;
    }

    int hap() { return a + b + c; }
}

class B extends A {
    public int hap() { return a * c; }
}

public class Main {
    public static void main(String[] args) {
        A aaa = new A();
        B bbb = new B();

        aaa.set(1, 5, 3);
        bbb.set(10, 30, 50);

        System.out.print(aaa.hap() + bbb.hap());
    }
}
```

<details><summary>정답 보기</summary>

**정답:** 509

</details>

### 2026년 1회 07번

[해설 보기](../2026년%201회/07.md)

다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
class A {
    String f(Object x) {
        return "1";
    }

    String g() {
        return f("a");
    }
}

class B extends A {
    String f(Object x) {
        return "2";
    }

    String f(String x) {
        return "3";
    }
}

public class Main {
    public static void main(String[] args) {
        A a = new B();
        System.out.println(a.g());
    }
}
```

<details><summary>정답 보기</summary>

**정답:** 2

</details>

### 2025년 3회 12번

[해설 보기](../2025년%203회/12.md)

다음은 Java의 상속과 생성자 호출에 관한 코드이다. 밑줄에 알맞은 단어를 작성하시오.

```
class Rectangle {

    int width, height;

    Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }
}

class Square extends Rectangle {

    Square(int a) {
        ____(a,a);
    }

    int getSquareArea() {
        return width * height;
    }
}

public class Main {
    public static void main(String[] args) {
        Square sq = new Square(10);
        System.out.println(sq.getSquareArea());
    }
}

```

<details><summary>정답 보기</summary>

**정답:** super (출력 결과는 100)

</details>

### 2025년 2회 10번

[해설 보기](../2025년%202회/10.md)

다음은 Java언어의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.

```
public class Main{

    public static class Parent {

        public int x(int i) { return i + 2; }
        public static String id() { return "P";}

    }

    public static class Child extends Parent {

        public int x(int i) { return i + 3; }
        public String x(String s) { return s + "R"; }
        public static String id() { return "C"; }

    }

    public static void main(String[] args) {

        Parent ref = new Child();
        System.out.println(ref.x(2) + ref.id());

    }

}
```

<details><summary>정답 보기</summary>

**정답:** 5P

</details>

### 2025년 1회 13번

[해설 보기](../2025년%201회/13.md)

다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
public class Main {
    public static void main(String[] args) {
        new Child();
        System.out.println(Parent.total);
    }
}


class Parent {
    static int total = 0;
    int v = 1;

    public Parent() {
        total += (++v);
        show();
    }

    public void show() {
        total += total;
    }
}


class Child extends Parent {
    int v = 10;

    public Child() {
        v += 2;
        total += v++;
        show();
    }

    @Override
    public void show() {
        total += total * 2;
    }
}


```

<details><summary>정답 보기</summary>

**정답:** 54

</details>

### 2025년 1회 20번

[해설 보기](../2025년%201회/20.md)

다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
public class Main {
  public static void main(String[] args) {
    System.out.println(calc("5"));
  }

  static int calc(int value) {
    if (value <= 1) return value;
    return calc(value - 1) + calc(value - 2);
  }

  static int calc(String str) {
    int value = Integer.valueOf(str);
    if (value <= 1) return value;
    return calc(value - 1) + calc(value - 3);
  }
}
```

<details><summary>정답 보기</summary>

**정답:** 4

</details>

### 2024년 3회 11번

[해설 보기](../2024년%203회/11.md)

다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
public class Main{
  public static void main(String[] args){
    Base a =  new Derivate();
    Derivate b = new Derivate();

    System.out.print(a.getX() + a.x + b.getX() + b.x);
  }
}


class Base{
  int x = 3;

  int getX(){
     return x * 2;
  }
}

class Derivate extends Base{
  int x = 7;

  int getX(){
     return x * 3;
  }
}
```

<details><summary>정답 보기</summary>

**정답:** 52

</details>

### 2024년 3회 19번

[해설 보기](../2024년%203회/19.md)

다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
class Main {

  public static class Collection<T>{
    T value;

    public Collection(T t){
        value = t;
    }

    public void print(){
       new Printer().print(value);
    }

   class Printer{
      void print(Integer a){
        System.out.print("A" + a);
      }
      void print(Object a){
        System.out.print("B" + a);
      }
      void print(Number a){
        System.out.print("C" + a);
      }
   }
 }

  public static void main(String[] args) {
      new Collection<>(0).print();
  }

}

```

<details><summary>정답 보기</summary>

**정답:** B0

</details>

### 2024년 1회 10번

[해설 보기](../2024년%201회/10.md)

아래 JAVA언어 코드의 실행 순서를 중복 번호없이 작성하시오.

```
class Parent {
    int x, y;

    Parent(int x, int y) { ①
        this.x=x;
        this y=y;
    }

    int getT() { ②
        return x*y;
    }
}



​class Child extend Parent {
    int x;

    Child (int x) { ③
        super(x+1, x);
        this.x=x;
    }

    int getT(int n){ ④
        return super.getT()+n;
    }
}



class Main {
    public static void main(String[] args) { ⑤
        Parent parent = new Child(3); ⑥
        System.out.println(parent.getT()); ⑦
    }
}

```

실행 순서 : 5 → ( ) → ( ) → ( ) → ( ) → ( )

<details><summary>정답 보기</summary>

**정답:** 6 → 3 → 1 → 7 → 2 (괄호 순서대로)

</details>

### 2024년 1회 16번

[해설 보기](../2024년%201회/16.md)

다음 Java 코드를 보고 알맞는 출력 값을 작성하시오.

```
class classOne {
    int a, b;

    public classOne(int a, int b) {
        this.a = a;
        this.b = b;
    }

    public void print() {
        System.out.println(a + b);
    }

}
class classTwo extends classOne {
    int po = 3;

    public classTwo(int i) {
        super(i, i+1);
    }

    public void print() {
        System.out.println(po*po);
    }
}

public class main {
    public static void main(String[] args) {
        classOne one = new classTwo(10);
        one.print();
    }
}
```

<details><summary>정답 보기</summary>

**정답:** 9

</details>

### 2023년 3회 01번

[해설 보기](../2023년%203회/01.md)

다음은 Java 코드이다. 올바른 출력 결과를 작성하시오.

```
public class main{
    public static void main(String[] args) {
        A b = new B();
        b.paint();
        b.draw();
    }
}

class A {
    public void paint() {
        System.out.print("A");
        draw();
    }
    public void draw() {
        System.out.print("B");
        draw();
    }
}

class B extends A {
    public void paint() {
        super.draw();
        System.out.print("C");
        this.draw();
    }
    public void draw() {
        System.out.print("D");
    }
}

```

<details><summary>정답 보기</summary>

**정답:** BDCDD

</details>

### 2023년 3회 11번

[해설 보기](../2023년%203회/11.md)

다음은 Java 코드에 대한 알맞는 출력값을 작성하시오.

```
class Parent {
    int compute(int num) {
        if(num <= 1)
            return num;
        return compute(num-1) + compute(num-2);
    }
}

class Child extends Parent {
    int compute(int num) {
        if(num <= 1)
            return num;
        return compute(num-1) + compute(num-3);
    }
}

public class main {
    public static void main(String args[]) {
        Parent obj = new Child();
        System.out.print(obj.compute(7));
    }
}
```

<details><summary>정답 보기</summary>

**정답:** 2

</details>

### 2023년 1회 20번

[해설 보기](../2023년%201회/20.md)

다음 자바 코드에 대한 출력 값을 작성하시오.

```
class Parent {
    int x = 100;

    Parent() {
        this(500);
    }

    Parent(int x) {
        this.x = x;
    }

    int getX() {
        return x;
    }
}

class Child extends Parent {
    int x = 4000;

    Child() {
        this(5000);
    }

    Child(int x) {
        this.x = x;
    }
}

public class Main {
    public static void main(String[] args) {
        Child obj = new Child();
        System.out.println(obj.getX());
    }
}
```

<details><summary>정답 보기</summary>

**정답:** 500

</details>

### 2022년 2회 17번

[해설 보기](../2022년%202회/17.md)

다음 자바코드에서 알맞는 출력값을 작성하시오.

```





1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21




public class Conv{
public Conv(int a) {
this.a = a;
}
int func() {
int b =1;
for (int i=1; i<a; i++){
b = a * i + b
}
return a +b;
}
int a;
}

public static void main(String[] args){
Conv obj = new Conv(3);
obj.a=5;
int b = obj.func();
system.out.print(obj.a + b);
i
}

Colored by Color Scripter

cs



```

<details><summary>정답 보기</summary>

**정답:** 61

</details>

### 2021년 2회 19번

[해설 보기](../2021년%202회/19.md)

다음은 JAVA 관한 문제이다. 알맞는 출력값을 작성하시오.

```
public class ovr1 {
	public static void main(String[] args){
    	ovr1 a1 = new ovr1();
        ovr2 a2 = new ovr2();
        System.out.println(a1.sun(3,2) + a2.sun(3,2));
    }

    int sun(int x, int y){
    	return x + y;
    }
}

class ovr2 extends ovr1 {

	int sun(int x, int y){
    	return x - y + super.sun(x,y);
    }

}
```

<details><summary>정답 보기</summary>

**정답:** 11

</details>

### 2020년 4회 19번

[해설 보기](../2020년%204회/19.md)

다음은 자바 소스 코드이다. 출력 결과를 쓰시오.

```
class parent{
	public int compute(int num){
    	if(num <=1) return num;
        return compute(num-1) + compute(num-2);
    }
 }

 class Child extends parent {
 	public int compute(int num){
    	if(num<=1) return num;
        	return compute(num-1) + compute(num-3);
        }
   }

  class good{
  	public static void main (String[] args){
    parent obj = new Child();
    System.out.print(obj.compute(4));
   }
 }


```

<details><summary>정답 보기</summary>

**정답:** 1

</details>

### 2020년 2회 05번

[해설 보기](../2020년%202회/05.md)

다음은 자바 코드이다. 다음 밑줄에 들어갈 키워드를 쓰시오.

```
class parent
	public void show(){
    	system.out.println("Parent");
    }
}

class Child extends Parent{
	public void show(){
    	system.out.println("Child");
    }
}

public class good{
	public static void main(String[] args){
    	Parent pa = ____  Child();
        pa.show();
    }
}
```

<details><summary>정답 보기</summary>

**정답:** new

</details>

### 2020년 2회 19번

[해설 보기](../2020년%202회/19.md)

다음은 자바 코드이다. 출력 결과를 쓰시오.

```
class A{
	private int a;
    public A(int a){
    	this.a = a;
    }
    public void display(){
    	system.out.println("a=" + a);
    }
}

class B extends A {
	public B(int a){
    	super(a);
        super.display();
    }
}


public class good {
	public static void main(String[] args){
    	B obj = new B(10);
    }
}

```

<details><summary>정답 보기</summary>

**정답:** a=10 (원문 정답은 a = 10으로 공백이 있으나, 코드 "a=" + a 기준 출력은 a=10)

</details>

## Java(제어문·배열·알고리즘) (16회)

### 2025년 1회 16번

[해설 보기](../2025년%201회/16.md)

다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
public class Main {

    public static void main(String[] args) {
        int[] data = {3, 5, 8, 12, 17};
        System.out.println(func(data, 0, data.length - 1));
    }

    static int func(int[] a, int st, int end) {
        if (st >= end) return 0;
        int mid = (st + end) / 2;
        return a[mid] + Math.max(func(a, st, mid), func(a, mid + 1, end));
    }

}
```

<details><summary>정답 보기</summary>

**정답:** 20

</details>

### 2024년 2회 17번

[해설 보기](../2024년%202회/17.md)

다음은 Java에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력 값을 작성하시오.

```
class Main {
    public static void main(String[] args) {
        String str = "abacabcd";
        boolean[] seen = new boolean[256];
        System.out.print(calculFn(str, str.length()-1, seen));
    }

    public static String calculFn(String str, int index, boolean[] seen) {
        if(index < 0) return "";
        char c = str.charAt(index);
        String result = calculFn(str, index-1, seen);
        if(!seen[c]) {
            seen[c] = true;
            return c + result;
        }
        return result;
    }
}
```

<details><summary>정답 보기</summary>

**정답:** dcba

</details>

### 2023년 2회 02번

[해설 보기](../2023년%202회/02.md)

다음은 JAVA 코드 문제이다. 가지고 있는 돈이 총 4620원일 경우 1000원, 500원, 100원, 10원의 지폐 및 동전을 이용하여 보기의 조건에 맞춰 최소한의 코드를 통해 괄호안을 작성하시오.

보기

아래 주어진 항목들을 갖고 괄호안의 코드를 작성

변수 : m  
연산자 : / , %  
괄호 : [ , ] , ( , )  
정수 : 1000, 500, 100, 10

```





1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16




public class Problem{
    public static void main(String[] args){
 m = 4620;

 a = (              );
 b = (              );
 c = (              );
 d = (              );

 System.out.println(a); //천원짜리     4장 출력
 System.out.println(b); //오백원짜리  1개 출력
 System.out.println(c); //백원짜리     1개 출력
 System.out.println(d); //십원짜리     2개 출력
    }
}


Colored by Color Scripter

cs



```

<details><summary>정답 보기</summary>

**정답:** a: m / 1000 b: (m % 1000) / 500 c: (m % 500) / 100 d: (m % 100) / 10

</details>

### 2023년 1회 14번

[해설 보기](../2023년%201회/14.md)

다음 코드에서 괄호안에 알맞는 값을 변수명으로 작성하시오.

(코드가 해깔려 시험문제와 동일하지 않지만 패턴이 비슷하다는 점만 참고해주세요.)

```
public class Sort {

    public static void swap(int[] arr, int idx1, int idx2){
        int temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[( 1 )] = temp;
    }

    public static void Usort(int[] array, int length){
        for (int i = 0; i < length; i++) {
            for (int j = 0; j < length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    swap(array, j, j + 1);
                }
            }
        }
    }

    public static void main(String[] args) {
        int[] item = new int[] { 5, 3, 8, 1, 2, 7 };
        int nx = 6;
        Usort(item, ( 2 ));

        for (int data : item) {
            System.out.print(data + " ");
        }
    }

}
```

출력 값 : 1 2 3 5 7 8

<details><summary>정답 보기</summary>

**정답:** (1) idx2 (2) nx

</details>

### 2022년 3회 19번

[해설 보기](../2022년%203회/19.md)

다음 자바 코드에 대한 출력 값을 작성하시오.

```





1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22




public class Main {
  static int[] MakeArray(){

  int[] tempArr = new int[4];

  for(int i=0; i<tempArr.Length;i++){
    tempArr[i] = i;
  }

  return tempArr;
  }

  public static void main(String[] args){

  int[] intArr;
  intArr = MakeArray();

  for(int i=0; i < intArr.Length; i++)
  System.out.print(intArr[i]);

  }
}

Colored by Color Scripter

cs



```

<details><summary>정답 보기</summary>

**정답:** 0123

</details>

### 2022년 3회 20번

[해설 보기](../2022년%203회/20.md)

다음 자바 코드에 대한 출력 값을 작성하시오.

```





1
2
3
4
5
6
7
8
9
10
11




public class Exam {
  public static void main(String[] args){

  int a = 0;
  for(int i=1; i<999; i++){
    if(i%3==0 && i%2!=0)
      a = i;
    }
    System.out.print(a);
  }
}

Colored by Color Scripter

cs



```

<details><summary>정답 보기</summary>

**정답:** 993

</details>

### 2022년 2회 07번

[해설 보기](../2022년%202회/07.md)

다음 자바 코드에 알맞는 출력값을 작성하시오.

```





1
2
3
4
5
6
7
8
9
10
11
12
13
14
15




public static void main(String args[]){

  int i = 3; int k = 1;
  switch(i) {
    case 1: k += 1;
    case 2: k++;
    case 3: k = 0;
    case 4: k += 3;
    case 5: k -= 10;
    default: k--;
  }
  System.out.print(k);

}


Colored by Color Scripter

cs



```

<details><summary>정답 보기</summary>

**정답:** -8

</details>

### 2022년 1회 11번

[해설 보기](../2022년%201회/11.md)

다음 Java 코드 중에서 밑줄에 들어갈 알맞는 코드를 작성하시오.

```
class Car implements Runnable{
  int a;

  public void run(){
     system.out.println("message")
  }
}

public class Main{
  public static void main(String args[]){
    Thread t1 = new Thread(new ___());
    t1.start();
  }
}


```

<details><summary>정답 보기</summary>

**정답:** Car

</details>

### 2021년 3회 11번

[해설 보기](../2021년%203회/11.md)

다음 Java 코드에 대한 알맞는 출력값을 쓰시오.

```
public class testco {
 public static void main(String[] args) {
  int a = 3, b = 4, c = 3, d = 5;
  if((a == 2 | a == c) & !(c > d) & (1 == b ^ c != d)) {
   a = b + c;
    if(7 == b ^ c != a) {
     System.out.println(a);
    } else {
    System.out.println(b);
    }
  } else {
    a = c + d;
    if(7 == c ^ d != a) {
    System.out.println(a);
    } else {
    System.out.println(d);
    }
  }
 }
}

```

<details><summary>정답 보기</summary>

**정답:** 7

</details>

### 2021년 1회 07번

[해설 보기](../2021년%201회/07.md)

다음 Java 프로그램 결과를 쓰시오.

```
public class good{
	public static void main(String[] args){
    	int[][]arr = new int[][]{{45,50,75},{89}};
        System.out.println(arr[0].length);
        System.out.println(arr[1].length);
        System.out.println(arr[0][0]);
        System.out.println(arr[0][1]);
        System.out.println(arr[1][0]);
```

<details><summary>정답 보기</summary>

**정답:** 3 1 45 50 89 (println이므로 각각 줄바꿈되어 출력)

</details>

### 2021년 1회 17번

[해설 보기](../2021년%201회/17.md)

다음은 Java 프로그램이다. 실행 결과를 쓰시오.

```
public class good {
	public static void main(String[] args){
    int i, j;
    for(j=0, i=0; i<=5; i++){
    j+=i;
    System.out.print(i);
    if(i==5){
    System.out.print("=");
    System.out.print(j);
   }else{
   	System.out.print("+");
	}
   }
  }
 }

```

<details><summary>정답 보기</summary>

**정답:** 0+1+2+3+4+5=15 (공백 없이 출력됨)

</details>

### 2020년 4회 05번

[해설 보기](../2020년%204회/05.md)

다음은 n이 10일 때, 10을 2진수로 변환하는 자바 소스 코드이다. 1,2에 알맞는 값을 적으시오.

[출력결과] : 00001010

```
class good {
	public static void main (String[] args) {
    	int[]a = new int[8];
        int i=0; int n=10;
        while (  1.  ) {
        	a[i++] = (  2.  );
            n /= 2;
        }
        for(i=7; i>=0; i--){
         System.out.print(a[i]);
        }
     }
  }
```

<details><summary>정답 보기</summary>

**정답:** (1) n > 0 (2) n % 2

</details>

### 2020년 4회 06번

[해설 보기](../2020년%204회/06.md)

다음은 자바 소스 코드이다. 출력 결과를 보고 , 1,2에 알맞는 값을 적으시오.

[출력 결과]

1 4 7 10 13

2 5 8 11 14

3 6 9 12 15

```
public class good {
	public static void main(String[] args) {
    	int[][]a = new int[(1.)][(2.)];
        for(int i = 0; i <3; i++){
        for(int j=0; j < 5; j++){
        a[i][j] = j*3+(i+1);
        	System.out.print(a[i][j]+"");
         }
         System.out.println();
       }
     }
   }
```

<details><summary>정답 보기</summary>

**정답:** (1) 3 (2) 5 → new int[3][5]

</details>

### 2020년 3회 17번

[해설 보기](../2020년%203회/17.md)

다음은 자바 코드이다. 출력 결과를 쓰시오.

```
public class good {
	public static void main(String[] args){
    int i=0;
    int sum=0;
    while (i<10){
    	i++;
        if(i%2 ==1)
        	continue;
        sum += i;
     }
     System.out.println(sum);
   }
}
```

<details><summary>정답 보기</summary>

**정답:** 30

</details>

### 2020년 1회 13번

[해설 보기](../2020년%201회/13.md)

다음은 자바 소스코드이다. 출력 결과를 쓰시오.

```
public class good {
	public static void main(String[] args){
    	int i;
        int[] a = {0,1,2,3};
        for(i=0; i<4; i++){
        	System.out.print(a[i] + " ");
        }
     }
 }
```

<details><summary>정답 보기</summary>

**정답:** 0 1 2 3 (마지막에 공백 하나가 더 붙는다)

</details>

### 2020년 1회 14번

[해설 보기](../2020년%201회/14.md)

다음은 자바 소스코드이다. 출력 결과를 쓰시오.

```
public class good {
	public static void main(String[] args){
    	int i = 3;
        int k = 1;
        swich (i) {
        case 0;
        case 1;
        case 2;
        case 3 k = 0;
        case 4 k += 3;
        case 5 k -= 10;
        default: k--;
        }
        system.out.print(k);
     }
}

```

<details><summary>정답 보기</summary>

**정답:** -8

</details>

## Java(클래스 구조) (10회)

### 2025년 3회 08번

[해설 보기](../2025년%203회/08.md)

아래 코드는 Machine 이라는 인터페이스를 정의하고 WashingMachine 클래스에서 해당 인터페이스를 사용하고자 한다. 빈칸에 들어갈 올바른 키워드를 작성하시오.

```
interface Machine {
    void run();
}

class WashingMachine (____빈칸____) Machine {
    private String name;

    public WashingMachine() {
        this.name = "LG Washer";
    }

    public void run() {
        System.out.println("Washing machine running");
    }
}

public class Main {
    public static void main(String[] args) {
        WashingMachine wm = new WashingMachine();
        wm.run();
    }
}
```

<details><summary>정답 보기</summary>

**정답:** implements

</details>

### 2025년 3회 17번

[해설 보기](../2025년%203회/17.md)

다음은 Java에 대한 코드이다. 알맞는 출력값을 작성하시오.

```
enum Tri {
    A("A"), B("AB"), C("ABC");

    private String code;

    Tri(String code) {
        this.code = code;
    }

    public String code() {
        return code;
    }
}

public class Main {
    public static void main(String[] args) {
        Tri t = Tri.values()[Tri.A.name().length()];
        System.out.print(t.code());
    }
}

```

<details><summary>정답 보기</summary>

**정답:** AB

</details>

### 2024년 2회 14번

[해설 보기](../2024년%202회/14.md)

다음은 Java 언어에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
class Main {
    public static void main(String[] args) {
        int a[] = {1, 2, 3, 4, 5, 6, 7, 8, 9};
        ODDNumber OE = new ODDNumber();
        System.out.print(OE.sum(a, true) + ", " + OE.sum(a, false));
    }
}

interface Number {
    int sum(int[] a, boolean odd);
}

class ODDNumber implements Number {
    public int sum(int[] a, boolean odd) {
        int result = 0;
        for(int i=0; i < a.length; i++){
            if((odd && a[i] % 2 != 0) || (!odd && a[i] % 2 == 0))
                result += a[i];
        }
        return result;
    }
}
```

<details><summary>정답 보기</summary>

**정답:** 25, 20

</details>

### 2024년 1회 01번

[해설 보기](../2024년%201회/01.md)

다음 Java 코드에서 알맞는 출력 값을 작성하시오.

```
class Connection {

    private static Connection _inst = null;
    private int count = 0;

    static public Connection get() {
        if(_inst == null) {
            _inst = new Connection();
            return _inst;
        }
        return _inst;
    }

    public void count() {
         count++;
    }

    public int getCount() {
         return count;
    }
}


public class main {

    public static void main(String[] args) {

        Connection conn1 = Connection.get();
        conn1.count();

        Connection conn2 = Connection.get();
        conn2.count();

        Connection conn3 = Connection.get();
        conn3.count();

        conn1.count();
        System.out.print(conn1.getCount());
    }

}
```

<details><summary>정답 보기</summary>

**정답:** 4

</details>

### 2023년 3회 13번

[해설 보기](../2023년%203회/13.md)

다음 자바 코드를 실행할 경우 에러가 발생이 된다. 에러가 발생하는 라인명을 작성하시오.

```
class Person {
    private String name;
    public Person(String val) {
        name = val;
    }
    public static String get() {
    return name;
    }
    public void print() {
        System.out.println(name);
    }
}
public class main {
    public static void main(String[] args) {
        Person obj = new Person("Kim");
        obj.print();
    }
}
```

<details><summary>정답 보기</summary>

**정답:** 7 (번 줄)

</details>

### 2023년 1회 01번

[해설 보기](../2023년%201회/01.md)

아래 자바 코드에서 출력되는 값을 작성하시오.

```
class Static{

    public int a = 20;
    static int b = 0;

}

public class Main{
    public static void main(String[] args) {

        int a;
        a = 10;
        Static.b = a;

        Static st = new Static();

        System.out.println(Static.b++);
        System.out.println(st.b);
        System.out.println(a);
        System.out.print(st.a);
    }
}

```

<details><summary>정답 보기</summary>

**정답:** 10 11 10 20

</details>

### 2023년 1회 17번

[해설 보기](../2023년%201회/17.md)

다음 JAVA 코드에서 알맞는 출력 값을 작성하시오.

```
abstact class Vehicle {

    String name;
    abstract public String getName(String val);

    public String getName() {
            return "Vehicle name: " + name;
    }
}



class Car extends Vehicle {

    public Car(String val) {
            name=super.name=val;
    }

    public String getName(String val) {
            return "Car name:" + val;
    }

    public String getName(byte val[]) {
            return "Car name:" + val;
    }
}


public class Main {

    public static void main(String[] args) {

    Vehicle obj = new Car("Spark");
    System.out.println(obj.getName());

    }
}
```

<details><summary>정답 보기</summary>

**정답:** Vehicle name: Spark

</details>

### 2021년 3회 01번

[해설 보기](../2021년%203회/01.md)

다음 Java 코드에 대한 알맞는 출력값을 쓰시오.

```
class Connection {
  private static Connection _inst = null;
  private int count = 0;
    static public Connection get() {
      if(_inst == null) {
      _inst = new Connection();
      return _inst;
      }
    return _inst;
    }
  public void count() { count ++; }
  public int getCount() { return count; }
}

public class testcon {
  public static void main(String[] args) {
    Connection conn1 = Connection.get();
    conn1.count();
    Connection conn2 = Connection.get();
    conn2.count();
    Connection conn3 = Connection.get();
    conn3.count();

    System.out.print(conn1.getCount());
  }
}

```

<details><summary>정답 보기</summary>

**정답:** 3

</details>

### 2021년 2회 17번

[해설 보기](../2021년%202회/17.md)

클래스 내에서 객체 생성 없이 사용할 수 있는 메소드로써 출력 결과를 작성하시오.

```
public class Test {
   public static void main(String[] args){
      system.out.print(Test.check(1));
   }

   (    )  String check (int num) {
      return (num >= 0) ? "positive" : "negative";
   }
}

[출력결과]
positive
```

<details><summary>정답 보기</summary>

**정답:** static

</details>

### 2020년 3회 15번

[해설 보기](../2020년%203회/15.md)

다음은 자바 코드이다. 출력 결과를 쓰시오.

```
abstract class vehicle{
	private String name;
    abstract public String getName(String val);
    public String getName(){
    	return "vehicle name:" + name;
    }
	public void setName(String val){
    	name = val;
    }
}

class Car extends Vehicle{
	public Car(String val){
    	setName(val);
   }
public String getName(String val){
	return "Car name : " + val;
   }
public String getName(byte val[]){
	return "Car name : " + val;
   }
}

public class good {
	public Static void main(String[] args){
    Vehicle obj = new Car("Spark");
    System.out.print(obj.getName());
    }
}

```

<details><summary>정답 보기</summary>

**정답:** vehicle name:Spark (원문 정답은 대소문자·공백이 다르게 표기되어 있으나, 코드 기준 출력은 vehicle name: 뒤에 Spark가 이어지는 형…

</details>

## Java(참조·문자열) (8회)

### 2026년 1회 17번

[해설 보기](../2026년%201회/17.md)

다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
public class Main {
    public static void main(String[] args) {
        int x1 = 9;
        int x2 = 2;
        String x3 = "3";
        System.out.println(x1 + x2 + "2" + x3);
    }
}
```

<details><summary>정답 보기</summary>

**정답:** 1123

</details>

### 2025년 2회 05번

[해설 보기](../2025년%202회/05.md)

다음은 Java의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.

```
public class Main {
    public static void change(String[] data, String s){
        data[0] = s;
        s = "Z";
    }

    public static void main(String[] args) {
        String data[] = { "A" };
        String s = "B";

        change(data, s);
        System.out.print(data[0] + s);
    }
}
```

<details><summary>정답 보기</summary>

**정답:** BB

</details>

### 2025년 2회 15번

[해설 보기](../2025년%202회/15.md)

다음은 Java언어의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.

```
public class Main{
    public static class BO {
        public int v;
        public BO(int v) {
            this.v = v;
        }
    }
    public static void main(String[] args) {
        BO a = new BO(1);
        BO b = new BO(2);
        BO c = new BO(3);
        BO[] arr = {a, b, c};
        BO t = arr[0];
        arr[0] = arr[2];
        arr[2] = t;
        arr[1].v = arr[0].v;
        System.out.println(a.v + "a" + b.v + "b" + c.v);
    }
}

```

<details><summary>정답 보기</summary>

**정답:** 1a3b3

</details>

### 2024년 3회 01번

[해설 보기](../2024년%203회/01.md)

다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
public class Main{
  static String[] s = new String[3];

  static void func(String[]s, int size){
    for(int i=1; i<size; i++){
      if(s[i-1].equals(s[i])){
        System.out.print("O");
      }else{
        System.out.print("N");
      }
    }
      for (String m : s){
        System.out.print(m);
      }
    }


  public static void main(String[] args){
    s[0] = "A";
    s[1] = "A";
    s[2] = new String("A");

    func(s, 3);
  }
}
```

<details><summary>정답 보기</summary>

**정답:** OOAAA

</details>

### 2024년 2회 01번

[해설 보기](../2024년%202회/01.md)

다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
class Main {
    public static void main(String[] args) {
        int[] a = new int[]{1, 2, 3, 4};
        int[] b = new int[]{1, 2, 3, 4};
        int[] c = new int[]{1, 2, 3};

        check(a, b);
        check(a, c);
        check(b, c);
    }

    public static void check(int[] a, int[] b) {
        if (a==b) {
            System.out.print("O");
        }else{
            System.out.print("N");
        }

    }
}
```

<details><summary>정답 보기</summary>

**정답:** NNN

</details>

### 2024년 2회 20번

[해설 보기](../2024년%202회/20.md)

다음은 Java에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력 값을 작성하시오.

```
class Main {
    public static void main(String[] args) {
        String str = "ITISTESTSTRING";
        String[] result = str.split("T");
        System.out.print(result[3]);
    }
}
```

<details><summary>정답 보기</summary>

**정답:** S

</details>

### 2023년 2회 14번

[해설 보기](../2023년%202회/14.md)

다음은 자바에 대한 문제이다. 알맞은 출력값을 작성하시오.

```





1
2
3
4
5
6
7
8
9
10
11
12
13
14




public class Main{
    public static void main(String[] args) {

        String str1 = 'Programming';
        String str2 = 'Programming';
        String str3 = new String('Programming');

        println(str1==str2)
        println(str1==str3)
        println(str1.equals(str3))
        print(str2.equals(str3))
    }
}


Colored by Color Scripter

cs



```

<details><summary>정답 보기</summary>

**정답:** true false true true (원문 코드는 '로 작성된 오타 등이 있으나 "Programming" 문자열 기준)

</details>

### 2022년 1회 03번

[해설 보기](../2022년%201회/03.md)

다음 자바 문법에 알맞는 출력 결과를 작성하시오.

```
class A {
  int a;
  int b;
}

  public class Main {

  static void func1(A m){
   m.a *= 10;
  }

  static void func2(A m){
    m.a += m.b;
  }

  public static void main(String args[]){

  A m = new A();

  m.a = 100;
  func1(m);
  m.b = m.a;
  func2(m);

  System.out.printf("%d", m.a);

  }
}

```

<details><summary>정답 보기</summary>

**정답:** 2000

</details>

## Java(예외 처리) (3회)

### 2025년 2회 09번

[해설 보기](../2025년%202회/09.md)

다음은 Java언어의 문제이다. 아래 코드를 보고 알맞는 출력값을 작성하시오.

```
public class Main {

    static interface F {
        int apply(int x) throws Exception;
    }

    public static int run(F f) {
        try {
            return f.apply(3);
        } catch (Exception e) {
            return 7;
        }
    }

    public static void main(String[] args) {

        F f = (x) -> {
            if (x > 2) {
                throw new Exception();
            }
            return x * 2;
        };

        System.out.print(run(f) + run((int n) -> n + 9));
    }

}
```

<details><summary>정답 보기</summary>

**정답:** 19

</details>

### 2025년 1회 05번

[해설 보기](../2025년%201회/05.md)

다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
public class Main {

  public static void main(String[] args) {

    int a=5,b=0;

    try{
      System.out.print(a/b);
    }catch(ArithmeticException e){
      System.out.print("출력1");
    }catch(ArrayIndexOutOfBoundsException e) {
      System.out.print("출력2");
    }catch(NumberFormatException e) {
      System.out.print("출력3");
    }catch(Exception e){
      System.out.print("출력4");
    }finally{
      System.out.print("출력5");
    }
  }
}
```

<details><summary>정답 보기</summary>

**정답:** 출력1출력5

</details>

### 2024년 3회 18번

[해설 보기](../2024년%203회/18.md)

다음은 Java 코드에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

```
public class ExceptionHandling {
  public static void main(String[] args) {
      int sum = 0;
      try {
          func();
      } catch (NullPointerException e) {
          sum = sum + 1;
      } catch (Exception e) {
          sum = sum + 10;
      } finally {
          sum = sum + 100;
      }
      System.out.print(sum);
  }

  static void func() throws Exception {
      throw new NullPointerException();
  }
}
```

<details><summary>정답 보기</summary>

**정답:** 101

</details>
