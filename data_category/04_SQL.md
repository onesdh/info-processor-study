# SQL — 기출 기반 요약정리

> 범위: **2020년 1회 ~ 2026년 2회 중 이 영역 36문제**. 구성: A 출제 빈도 → B 개념 요약(🔥기출 위치 표시 + ⬜미출제 보충) → C 기출 키워드 → D 기출 원문.

## A. 출제 빈도 (많이 나온 순)

| 카테고리 | 횟수 | 출제 회차-번호 (최신순) |
|---|:--:|---|
| SQL | 35 | 26-2-12, 26-2-13, 26-2-14, 26-1-09, 26-1-10, 26-1-18, 25-3-10, 25-3-20, 25-1-07, 24-3-03, 24-2-03, 24-1-13 … |
| DCL | 1 | 21-3-03 |

---

# B. 개념 요약
> 표기: 🔥 = 기출(최신 위치 + 추가 횟수), ⬜ = 아직 안 나온 보충 개념. SQL은 **실행 순서대로 손으로 추적**하는 것이 핵심입니다.

## 1. SQL 분류
| 분류 | 명령 | 기출 |
|---|---|---|
| **DDL** | CREATE, **ALTER**, DROP, TRUNCATE | [🔥 20년 3회 20번](../2020년%203회/20.md) 외 1회 |
| **DML** | **SELECT, INSERT, UPDATE, DELETE** | [🔥 23년 2회 4번](../2023년%202회/04.md) 외 3회 |
| **DCL** | **GRANT / REVOKE**, (COMMIT, ROLLBACK) | [🔥 21년 3회 3번](../2021년%203회/03.md) |
| TCL | COMMIT, ROLLBACK, SAVEPOINT | ⬜ |

### DDL
- **CREATE**: 스키마·도메인·테이블·뷰·인덱스. `CREATE TABLE`: 속성·자료형·`NOT NULL`·**기본키·외래키(ON DELETE/UPDATE 옵션)**·`CHECK`.
  - `CREATE DOMAIN 이름 AS VARCHAR(6) CHECK (VALUE IN (...))` ⬜
  - `CREATE [UNIQUE] INDEX 이름 ON 테이블(열 [ASC|DESC])` [🔥 20년 2회 12번](../2020년%202회/12.md)
  - `CREATE VIEW 이름 AS SELECT ...`
- **ALTER**: `ALTER TABLE 테이블 ADD 열 자료형;` / 속성 변경 / `DROP COLUMN` [🔥 20년 3회 20번](../2020년%203회/20.md)
- **DROP**: **CASCADE**(연관 객체까지 제거) / **RESTRICT**(연관 객체 있으면 거부) [🔥 23년 2회 17번](../2023년%202회/17.md)
- **외래키** `CONSTRAINT 이름 FOREIGN KEY(열) REFERENCES 대상(열) [ON DELETE CASCADE]` [🔥 26년 1회 10번](../2026년%201회/10.md) 외 1회

### DCL
- **GRANT 권한 ON 객체 TO 사용자 [WITH GRANT OPTION]** (받은 권한을 다시 부여 가능) / **REVOKE** (권한 회수, **CASCADE**: 연쇄 회수) [🔥 21년 3회 3번](../2021년%203회/03.md)

### DML
| 명령 | 문법 | 기출 |
|---|---|---|
| **INSERT** | `INSERT INTO 테이블(열…) VALUES (값…);` / `INSERT INTO … SELECT …;` (**문자열은 작은따옴표**) | [🔥 24년 2회 3번](../2024년%202회/03.md) |
| **UPDATE** | `UPDATE 테이블 SET 열=값 WHERE 조건;` | [🔥 21년 2회 5번](../2021년%202회/05.md) |
| **DELETE** | `DELETE FROM 테이블 WHERE 조건;` (**WHERE 없으면 전체**, 구조는 남음 ≠ DROP) | [🔥 23년 1회 13번](../2023년%201회/13.md) 외 1회 |
| **SELECT** | 아래 | |

## 2. SELECT 구조·실행 순서
```sql
SELECT [DISTINCT] 열 FROM 테이블 WHERE 행조건 GROUP BY 그룹열 HAVING 그룹조건 ORDER BY 열 [ASC|DESC];
```
**FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY**. WHERE=행(집계 ✕), **HAVING=그룹(집계 ○)**. ORDER BY 기본 ASC, **DESC=내림차순** [🔥 26년 2회 12번](../2026년%202회/12.md) 외 3회.

## 3. 조건·연산
| 문법 | 설명 | 기출 |
|---|---|---|
| **LIKE** | `%` 0개 이상, `_` 1개, (`#` 숫자 1개: 일부 DBMS). `'이%'`=이로 시작, `'%t%'`=t 포함 | [🔥 26년 2회 12번](../2026년%202회/12.md) 외 3회 |
| **IN (a,b)** | `= a OR = b` | [🔥 20년 2회 6번](../2020년%202회/06.md) |
| BETWEEN a AND b | a 이상 b 이하 | ⬜ |
| `<>` | 같지 않음 | ⬜ |
| **AND > OR** 우선순위 | `A AND B OR C` ⇒ `(A AND B) OR C` | [🔥 24년 1회 18번](../2024년%201회/18.md) 외 1회 |
| **NULL** | `IS NULL`/`IS NOT NULL`. NULL 비교는 UNKNOWN → WHERE에서 탈락 | [🔥 25년 3회 20번](../2025년%203회/20.md) 외 1회 |
| **>ALL / >ANY** | **>ALL = 최댓값보다 큼**, >ANY = 최솟값보다 큼 | [🔥 22년 2회 3번](../2022년%202회/03.md) |

## 4. 집계·그룹 [🔥 26년 1회 9번](../2026년%201회/09.md) 외 5회
- **그룹 함수**: COUNT, SUM, AVG, MAX, MIN, **STDDEV(표준편차), VARIANCE(분산)**. **COUNT(\*)** 전체 행 / **COUNT(열)** NULL 제외 / **COUNT(DISTINCT 열)** 중복 제외.
- **집계 함수만 쓰고 GROUP BY 없으면 결과 1행**. `DISTINCT` 중복 제거.
- `GROUP BY 과목이름 HAVING AVG(점수) >= 90` (SELECT에는 그룹 열+집계만, 별칭 `AS`).

## 5. JOIN [🔥 26년 2회 14번](../2026년%202회/14.md) 외 6회
| 종류 | 결과 |
|---|---|
| **INNER** | 양쪽 일치 행만 |
| **LEFT OUTER** | 왼쪽 전체 + 오른쪽 일치(없으면 NULL) |
| **RIGHT OUTER** | **오른쪽 전체** + 왼쪽 일치(없으면 NULL) |
| FULL OUTER | 양쪽 전체 |
| **CROSS** | **카티션 곱**(행 수 곱) |
- `ON a.열=b.열` / `FROM A, B WHERE …` / `OUTER JOIN … WHERE 반대쪽.키 IS NULL` = **한쪽에만 있는 데이터**. 일치 행이 여러 개이면 **행이 늘어남**. 자연 조인(NATURAL JOIN)은 동일 이름 열 자동 결합.

## 6. 서브쿼리·집합 ⬜
- **안쪽부터** 계산, **상관 서브쿼리**는 바깥 행을 하나씩 대입. 단일 행/다중 행(IN·ANY·ALL·EXISTS) 서브쿼리. SELECT·FROM(인라인 뷰)·WHERE 절에서 사용 [🔥 26년 2회 13번](../2026년%202회/13.md) 외 3회.
- **집합 연산**: **UNION**(중복 제거) / UNION ALL / INTERSECT / MINUS(EXCEPT) [🔥 23년 3회 6번](../2023년%203회/06.md).
- 윈도우 함수(RANK, ROW_NUMBER, 누적 합 등) ⬜ (교재 확인 권장).

## 7. 뷰·인덱스·트리거 ⬜
- 뷰=SELECT로 정의한 **가상 테이블**, 인덱스=검색 속도↑(쓰기 비용↑). 트리거=이벤트 시 자동 실행, 프로시저/함수=절차형 SQL(교재 확인).

> 참고 출처: velog choonbok22 #210 (SQL 응용). 조인·서브쿼리·윈도우 함수는 해당 글에 없어 제 지식으로 보충.

---

# C. 기출 키워드 → 정답 (한눈에)

| 회차-번호 | 카테고리 | 정답 |
|---|---|---|
| [26-2-12](../2026년%202회/12.md) | SQL | 1. 이%  2. DESC |
| [26-2-13](../2026년%202회/13.md) | SQL | 3 |
| [26-2-14](../2026년%202회/14.md) | SQL | 2 |
| [26-1-09](../2026년%201회/09.md) | SQL | 1. 200 / 2. 3 / 3. 1 |
| [26-1-10](../2026년%201회/10.md) | SQL | ① CONSTRAINT ② FOREIGN ③ TEAM_ID ④ REFERENCES ⑤ TEAM_ID2 |
| [26-1-18](../2026년%201회/18.md) | SQL | 2 |
| [25-3-10](../2025년%203회/10.md) | SQL | 4 |
| [25-3-20](../2025년%203회/20.md) | SQL | 4 |
| [25-1-07](../2025년%201회/07.md) | SQL | 이순신 \| 1000 |
| [24-3-03](../2024년%203회/03.md) | SQL | 1 |
| [24-2-03](../2024년%202회/03.md) | SQL | ① VALUES ② SELECT ③ FROM ④ SET |
| [24-1-13](../2024년%201회/13.md) | SQL | 위 표 (B = a, b) |
| [24-1-18](../2024년%201회/18.md) | SQL | 1 |
| [23-3-06](../2023년%203회/06.md) | SQL | 4, 3, 2, 1 (위에서부터) |
| [23-2-04](../2023년%202회/04.md) | SQL | 위 SQL문 (원문 정답 표기의 INSTER는 INSERT 의 오타) |
| [23-2-17](../2023년%202회/17.md) | SQL | CASCADE (대소문자 무관) |
| [23-1-13](../2023년%201회/13.md) | SQL | DELETE FROM 학생 WHERE 이름 = '민수'; |
| [23-1-16](../2023년%201회/16.md) | SQL | 위 SQL문 |
| [22-3-07](../2022년%203회/07.md) | SQL | (1) 3 (2) 4 |
| [22-3-12](../2022년%203회/12.md) | SQL | 1) 200 2) 3 3) 1 |
| [22-2-03](../2022년%202회/03.md) | SQL | ALL |
| [22-2-04](../2022년%202회/04.md) | SQL | 4 |
| [22-1-04](../2022년%201회/04.md) | SQL | 1. ORDER 2. score 3. DESC |
| [21-3-13](../2021년%203회/13.md) | SQL | 4 |
| [21-2-05](../2021년%202회/05.md) | SQL | 1. UPDATE 2. SET |
| [21-2-06](../2021년%202회/06.md) | SQL | 1. ON 2. 학과 |
| [21-2-10](../2021년%202회/10.md) | SQL | 1. 이% 2. DESC (패턴은 문자열이므로 SQL에서는 작은따옴표로 감싼 '이%'로 쓴다.) |
| [21-1-06](../2021년%201회/06.md) | SQL | 1 |
| [20-4-16](../2020년%204회/16.md) | SQL | SELECT 학과, COUNT(학과) AS '학과별튜플수' FROM 학생 GROUP BY 학과; |
| [20-3-08](../2020년%203회/08.md) | SQL | 위 SQL문 |
| [20-3-09](../2020년%203회/09.md) | SQL | DELETE FROM 학생 WHERE 이름 = '민수'; |
| [20-3-20](../2020년%203회/20.md) | SQL | 1. ALTER 2. ADD |
| [20-2-06](../2020년%202회/06.md) | SQL | SELECT 학번, 이름 FROM 학생 WHERE 학년 IN (3,4); |
| [20-2-12](../2020년%202회/12.md) | SQL | CREATE INDEX IDX_NAME ON 학생(NAME); |
| [20-1-06](../2020년%201회/06.md) | SQL | 1) 200 2) 3 3) 1 |
| [21-3-03](../2021년%203회/03.md) | DCL | GRANT는 데이터베이스 사용자(User)에게 접속 권한, 객체(테이블 등) 생성·조회·수정 권한, DBA 권한 등을 부여하는 DCL 명령어이다. (회수는 REV… |

---

# D. 기출문제 원문

## SQL (35회)

### 2026년 2회 12번

[해설 보기](../2026년%202회/12.md)

다음 &lt;학생&gt; 테이블에서 성이 '이'씨인 학생의 정보를 조회하되, 학번을 기준으로 내림차순 정렬하여 출력하고자 한다. SQL문의 괄호 안에 들어갈 알맞은 내용을 각각 쓰시오.

![원문 문제 그림 1](../2026년%202회/source/정보처리기사_2026_2_Q12_01.png)

<details><summary>정답 보기</summary>

**정답:** 1. 이%  2. DESC

</details>

### 2026년 2회 13번

[해설 보기](../2026년%202회/13.md)

다음 &lt;A&gt;, &lt;B&gt; 테이블과 SQL문을 참고하여, SQL문을 실행했을 때 출력되는 RESULT 값을 구하시오.

![원문 문제 그림 1](../2026년%202회/source/정보처리기사_2026_2_Q13_01.png)

<details><summary>정답 보기</summary>

**정답:** 3

</details>

### 2026년 2회 14번

[해설 보기](../2026년%202회/14.md)

다음 &lt;A&gt;, &lt;B&gt; 테이블과 SQL문을 참고하여, SQL문을 실행했을 때 출력되는 결과값을 구하시오.

![원문 문제 그림 1](../2026년%202회/source/정보처리기사_2026_2_Q14_01.png)

<details><summary>정답 보기</summary>

**정답:** 2

</details>

### 2026년 1회 09번

[해설 보기](../2026년%201회/09.md)

아래 조건을 참고하여 각 SQL 구문을 실행했을 때 반환되는 행(Row)의 수를 쓰시오.  
(단, DEPT 칼럼은 학과명이다.)

테이블 조건

STUDENT 테이블에는 다음 세 학과의 학생 정보가 저장되어 있다.  
컴퓨터과  50명  · 인터넷과  100명  · 사무자동화과  50

SQL 구문

1. SELECT DEPT FROM STUDENT;  
2. SELECT DISTINCT DEPT FROM STUDENT;  
3. SELECT COUNT(DISTINCT DEPT) FROM STUDENT  
&nbsp;&nbsp;&nbsp;&nbsp;WHERE DEPT = '컴퓨터과';

<details><summary>정답 보기</summary>

**정답:** 1. 200 / 2. 3 / 3. 1

</details>

### 2026년 1회 10번

[해설 보기](../2026년%201회/10.md)

아래는 선수(PLAYER) 정보를 관리하는 테이블을 정의하는 SQL 문이다. 팀(TEAM) 테이블의 특정 칼럼을 참조하는 외래키 제약 조건을 추가하려 할 때, 괄호 ①~⑤에 들어갈 적절한 예약어(keyword) 또는 칼럼명을 아래 조건을 참고하여 쓰시오.

조건

외래키 제약 조건의 이름은 TEAM\_TF 로 지정한다.  
PLAYER 테이블의 TEAM\_ID 칼럼이 외래키 역할을 한다.  
TEAM 테이블의 TEAM\_ID2 칼럼을 참조 대상으로 한다.

SQL 문

CREATE TABLE PLAYER (  
&nbsp;&nbsp;PLAYER\_ID  CHAR(7)     NOT NULL,  
&nbsp;&nbsp;PLAYER\_NAME VARCHAR2(20) NOT NULL,  
&nbsp;&nbsp;TEAM\_ID   CHAR(3)     NOT NULL,  
&nbsp;&nbsp;PRIMARY KEY (PLAYER\_ID),  
&nbsp;&nbsp;( 1 ) TEAM\_TF  
&nbsp;&nbsp;( 2 ) KEY ( 3 )  
&nbsp;&nbsp;( 4 ) TEAM ( 5 )  
);

<details><summary>정답 보기</summary>

**정답:** ① CONSTRAINT ② FOREIGN ③ TEAM_ID ④ REFERENCES ⑤ TEAM_ID2

</details>

### 2026년 1회 18번

[해설 보기](../2026년%201회/18.md)

다음은 SQL에 대한 문제이다. 아래 코드를 확인하여 알맞는 출력값을 작성하시오.

![원문 문제 그림 1](../2026년%201회/source/정보처리기사_2026_1_Q18_01.png)

SELECT COUNT(\*)  
FROM employee e  
JOIN dept d ON e.dep\_id = d.dept\_id  
WHERE d.budget &gt; (  
&nbsp;&nbsp;&nbsp;&nbsp;SELECT AVG(budget) FROM dept  
);

<details><summary>정답 보기</summary>

**정답:** 2

</details>

### 2025년 3회 10번

[해설 보기](../2025년%203회/10.md)

다음은 테이블에서 조건값을 실행한 화면이다. 이에 대한 알맞는 결과값을 작성하시오.

![원문 문제 그림 1](../2025년%203회/source/정보처리기사_2025_3_Q10_01.png)

<details><summary>정답 보기</summary>

**정답:** 4

</details>

### 2025년 3회 20번

[해설 보기](../2025년%203회/20.md)

다음은 SQL에 관한 문제이다. 아래 A테이블을 참고하여 쿼리의 결과를 작성하시오.

![원문 문제 그림 1](../2025년%203회/source/정보처리기사_2025_3_Q20_01.png)

[ SQL ]

SELECT count(col2) FROM A WHERE col1 IN (2, 3) OR col2 IN (3, 5)

<details><summary>정답 보기</summary>

**정답:** 4

</details>

### 2025년 1회 07번

[해설 보기](../2025년%201회/07.md)

다음은 SQL 문제이다. 아래 두 테이블을 참고하여 보기에 쿼리 실행 결과를 작성하시오.

![원문 문제 그림 1](../2025년%201회/source/정보처리기사_2025_1_Q07_01.png)

[보기]

SELECT name, incentive FROM emp, sal WHERE emp.id = sal.id and incentives &gt;= 500

<details><summary>정답 보기</summary>

**정답:** 이순신 \| 1000

</details>

### 2024년 3회 03번

[해설 보기](../2024년%203회/03.md)

아래의 employee테이블과 project테이블을 참고하여 보기의 SQL명령어에 알맞는 출력 값을 작성하시오.

![원문 문제 그림 1](../2024년%203회/source/정보처리기사_2024_3_Q03_01.png)

보기

```
SELECT
    count(*)
FROM employee AS e JOIN project AS p ON e.project_id = p.project_id
WHERE p.name IN (
    SELECT name FROM project p WHERE p.project_id IN (
        SELECT project_id FROM employee GROUP BY project_id HAVING count(*) < 2
    )
);
```

<details><summary>정답 보기</summary>

**정답:** 1

</details>

### 2024년 2회 03번

[해설 보기](../2024년%202회/03.md)

다음은 SQL에 관한 문제이다. 아래 SQL 구문의 빈칸을 작성하시오.

테이블

사원 [사원번호(PK), 이름, 나이, 부서]

부서 [사원번호(PK), 이름, 주소, 나이]

신입 사원이 들어와서 사원 테이블에 추가

INSERT INTO 사원 (사원번호, 이름, 주소, 부서)   [      ①     ] (32431, '정실기', '서울', '영업');

위에 신입사원을 검색하면서 부서 테이블에 추가

INSERT INTO 부서 (사원번호, 이름, 나이, 부서)

[    ②     ] 사원번호, 이름, 나이, 23 FROM 사원 WHERE 이름 = '정실기';

전체 사원 테이블 조회

SELECT  \*   [    ③   ]   사원;

퇴사로 인해 부서에 해당하는 값을 '퇴사'로 변경

UPDATE 사원   [      ④     ]   부서  =  '퇴사'  WHERE 사원번호  = 32431;

<details><summary>정답 보기</summary>

**정답:** ① VALUES ② SELECT ③ FROM ④ SET

</details>

### 2024년 1회 13번

[해설 보기](../2024년%201회/13.md)

아래 보기의 SQL 문장과 테이블을 참고하여 출력 값을 표로 작성하시오.

```
SELECT
    B
FROM
    R1
WHERE
    C IN (SELECT C FROM R2 WHERE D="k");
```

보기

![원문 문제 그림 1](../2024년%201회/source/정보처리기사_2024_1_Q13_01.png)

<details><summary>정답 보기</summary>

**정답:** 위 표 (B = a, b)

</details>

### 2024년 1회 18번

[해설 보기](../2024년%201회/18.md)

아래의 SQL 코드와 테이블을 참고하여 결과 값을 작성하시오.

![원문 문제 그림 1](../2024년%201회/source/정보처리기사_2024_1_Q18_01.png)

```
SELECT
    COUNT(*)
FROM
    TABLE
WHERE
    EMPNO > 100
AND
    SAL >= 3000 OR EMPNO = 200
```

<details><summary>정답 보기</summary>

**정답:** 1

</details>

### 2023년 3회 06번

[해설 보기](../2023년%203회/06.md)

다음 빈칸에 들어갈 UNION 연산의 결과값을 작성하시오.

[테이블]

T1

| 3 |
|---|
| 1 |
| 4 |

T2

| 2 |
|---|
| 4 |
| 3 |

[쿼리]

SELECT A FROM  T1

UNION

SELECT A FROM  T2

ORDER BY A DESC;

결과 테이블

|  |
|---|
|  |
|  |
|  |

<details><summary>정답 보기</summary>

**정답:** 4, 3, 2, 1 (위에서부터)

</details>

### 2023년 2회 04번

[해설 보기](../2023년%202회/04.md)

다음은 테이블에 데이터를 삽입하기 위한 과정이다. 보기의 조건식에 맞게 데이터 삽입을 위한 SQL문을 작성하시오.

보기

CREATE TABLE 학생 (  
&nbsp;&nbsp;학번 int,  
&nbsp;&nbsp;이름 varchar(20),  
&nbsp;&nbsp;학년 int,  
&nbsp;&nbsp;전공 varchar(30),  
&nbsp;&nbsp;전화번호varchar(20)  
);

결과값

[학생]

| 학번 | 이름 | 학년 | 전공 | 전화번호 |
|---|---|---|---|---|
| 9830287 | 뉴진스 | 3 | 경영학개론 | 010-1234-1234 |

조건

문자열일 경우 작은따음표  
(작은따음표가 아니라 다른 단어로 명시되었습니다.)

<details><summary>정답 보기</summary>

**정답:** 위 SQL문 (원문 정답 표기의 INSTER는 INSERT 의 오타)

</details>

### 2023년 2회 17번

[해설 보기](../2023년%202회/17.md)

다음 보기의 SQL문에서 괄호안에 알맞는 단어를 작성하시오.

보기

DROP VIEW 학생 (         )

- 학생 테이블을 참조하는 다른 VIEW나 제약 조건까지 모두 삭제되어야 한다.

<details><summary>정답 보기</summary>

**정답:** CASCADE (대소문자 무관)

</details>

### 2023년 1회 13번

[해설 보기](../2023년%201회/13.md)

[학생] 테이블에서 학생 이름이 '민수'인 튜플을 삭제하는 쿼리를 작성하시오.

![원문 문제 그림 1](../2023년%201회/source/정보처리기사_2023_1_Q13_01.png)

조건  
- 컬럼의 값이 문자열일 경우 작은 따움표 ('  ')를 표시하시오.  
- SQL 마지막에 세미콜론(;)은 표기하지 않아도 관계 없습니다.

<details><summary>정답 보기</summary>

**정답:** DELETE FROM 학생 WHERE 이름 = '민수';

</details>

### 2023년 1회 16번

[해설 보기](../2023년%201회/16.md)

다음 성적 테이블에서 과목별 점수의 평균이 90점 이상인 '과목이름', '최소점수', '최대점수' 를 검색하고자 한다. [조건]을 참고하여 적합한 SQL문을 작성하시오.

![원문 문제 그림 1](../2023년%201회/source/정보처리기사_2023_1_Q16_01.png)

조건:  
- where사용하지 말하야 한다.  
- SELECT절에 별칭을 사용하여 작성해야 한다.  
- SQL 구문 마지막에 세미콜론 생락 가능하다.  
- 반드시 GROUP BY와 having을 사용해야 한다.  
- 집계함수를 사용해야 한다.

<details><summary>정답 보기</summary>

**정답:** 위 SQL문

</details>

### 2022년 3회 07번

[해설 보기](../2022년%203회/07.md)

아래 데이터 명령어를 적용할 경우 알맞는 출력값을 작성하시오.

![원문 문제 그림 1](../2022년%203회/source/정보처리기사_2022_3_Q07_01.png)

<details><summary>정답 보기</summary>

**정답:** (1) 3 (2) 4

</details>

### 2022년 3회 12번

[해설 보기](../2022년%203회/12.md)

STUDENT 테이블에서 컴퓨터과 학생 50명, 전기과 학생 100명, 인터넷과 학생 50명의 정보가 저장되어 있을 때, 다음 SQL문의 실행 결과에 따른 튜플의 수는? (단, DEPT 칼럼은 학과명이다.)

1) SELECT DERP FROM STUDENT;

2) SELECT DISTINCT DEPT FROM STUDENT;

3) SELECT COUNT(DISTINCT DEPT) FROM STUDENT WHERE DEPT = '인터넷과';

<details><summary>정답 보기</summary>

**정답:** 1) 200 2) 3 3) 1

</details>

### 2022년 2회 03번

[해설 보기](../2022년%202회/03.md)

H회사의 전체 제품 단가 보다 큰 제품 출력을 하고자 한다. 괄호안에 들어갈 알맞는 용어를 작성하시오.

[제품테이블]

![원문 문제 그림 1](../2022년%202회/source/정보처리기사_2022_2_Q03_01.png)

SELECT 제조사, 제품명, 단가  
FROM 제품  
WHERE 단가 &gt; ( ) (SELECT 단가 FROM 제품 WHERE 제조사='H')

<details><summary>정답 보기</summary>

**정답:** ALL

</details>

### 2022년 2회 04번

[해설 보기](../2022년%202회/04.md)

다음 SQL 결과에 알맞는 답을 작성하시오.

[TABLE]

![원문 문제 그림 1](../2022년%202회/source/정보처리기사_2022_2_Q04_01.png)

SELECT count(col2)  
FROM TABLE  
WHERE col1 in(2,3) or col2 in(3,5);

<details><summary>정답 보기</summary>

**정답:** 4

</details>

### 2022년 1회 04번

[해설 보기](../2022년%201회/04.md)

다음 SQL 결과에 알맞는 쿼리을 작성하시오.

![원문 문제 그림 1](../2022년%201회/source/정보처리기사_2022_1_Q04_01.png)

SELECT name, score FROM 성적 ( 1 ) BY ( 2 ) ( 3 )

<details><summary>정답 보기</summary>

**정답:** 1. ORDER 2. score 3. DESC

</details>

### 2021년 3회 13번

[해설 보기](../2021년%203회/13.md)

다음은, 테이블에서 조건값을 실행한 화면이다. 이에 대한 알맞는 결과값을 작성하시오.

![원문 문제 그림 1](../2021년%203회/source/정보처리기사_2021_3_Q13_01.png)

<details><summary>정답 보기</summary>

**정답:** 4

</details>

### 2021년 2회 05번

[해설 보기](../2021년%202회/05.md)

다음은 테이블을 수정할때의 상황입니다. SQL 보기에서 괄호안에 알맞는 문장을 작성하시오.

(    1   ) 테이블명  (     2    )  컬럼 = 값 WHERE 점수 &gt;= 90;

<details><summary>정답 보기</summary>

**정답:** 1. UPDATE 2. SET

</details>

### 2021년 2회 06번

[해설 보기](../2021년%202회/06.md)

다음 SQL 보기에서 JOIN할 경우 괄호안에 알맞는 문장을 작성하시오.

SELECT .... FROM 학생정보 a JOIN 학과정보 b (   1   ) a.학과 = b.(   2   )

<details><summary>정답 보기</summary>

**정답:** 1. ON 2. 학과

</details>

### 2021년 2회 10번

[해설 보기](../2021년%202회/10.md)

SQL문에서 괄호안에 알맞은 답안을 작성하시오. (실제 시험에는 결과 이미지가 있습니다.)

('이름'이란 컬럼에 '이'로 시작하는 문자열을 '내림차순'하는 쿼리 결과 내용입니다.)

SELECT .... FROM ... WHERE '이름' LIKE (   1   )  ORDER BY  '컬럼명'  (    2    )

<details><summary>정답 보기</summary>

**정답:** 1. 이% 2. DESC (패턴은 문자열이므로 SQL에서는 작은따옴표로 감싼 '이%'로 쓴다.)

</details>

### 2021년 1회 06번

[해설 보기](../2021년%201회/06.md)

다음 SQL 실행 결과를 숫자만 쓰시오.

| EMPNO | SAL |
|---|---|
| 100 | 1000 |
| 200 | 3000 |
| 300 | 1500 |

SELECT COUNT(\*) FROM 급여

WHERE EMPNO &gt; 100 AND SAL &gt;= 3000 OR EMPNO = 200;

<details><summary>정답 보기</summary>

**정답:** 1

</details>

### 2020년 4회 16번

[해설 보기](../2020년%204회/16.md)

다음 조건을 만족하면서 학과별로 튜플 수가 얼마인지 구하는 SQL문을 작성하시오.

- 대소문자를 구분하지 않는다.

- WHERE 구문을 사용하지 않는다.

- GROUP BY 를 사용한다.

- 세미콜론(;)은 생략 가능하다.

- 별칭(AS)을 사용해야 한다. (별칭 사용 시 별칭은 작은 따옴표를 써야 함)

- 집계 함수를 사용해야 한다.

[학생]

| 학과 | 학생 |
|---|---|
| 전기 | 이순신 |
| 컴퓨터 | 안중근 |
| 컴퓨터 | 윤봉길 |
| 전자 | 이봉창 |
| 전자 | 강우규 |

[결과]

| 학과 | 학과별튜플수 |
|---|---|
| 전기 | 1 |
| 컴퓨터 | 2 |
| 전자 | 2 |

<details><summary>정답 보기</summary>

**정답:** SELECT 학과, COUNT(학과) AS '학과별튜플수' FROM 학생 GROUP BY 학과;

</details>

### 2020년 3회 08번

[해설 보기](../2020년%203회/08.md)

다음 조건을 만족하면서, 과목별 점수의 평균이 90이 상인 과목이름, 최소점수, 최대점수를 구하는 SQL문을 작성하시오.

- 대소문자를 구분하지 않는다.

- WHERE 구분을 사용하지 않는다.

- GROUP BY, HAVING구문을 반드시 사용한다.

- 세미콜론(;)은 생략 가능하다.

- 별칭(AS)을 사용해야 한다.

[성적]

| 과목코드 | 과목이름 | 학점 | 점수 |
|---|---|---|---|
| 1000 | 컴퓨터과학 | A+ | 95 |
| 2000 | 운영체제 | B+ | 85 |
| 1000 | 컴퓨터과학 | B+ | 85 |
| 2000 | 운영체제 | B | 80 |

[결과]

| 과목이름 | 최소점수 | 최대점수 |
|---|---|---|
| 컴퓨터과학 | 85 | 95 |

<details><summary>정답 보기</summary>

**정답:** 위 SQL문

</details>

### 2020년 3회 09번

[해설 보기](../2020년%203회/09.md)

학생 테이블에서 이름이 민수인 튜플을 삭제하는 SQL문을 작성하시오

[학생]

| 학번 | 이름 | 점수 | 과목이름 |
|---|---|---|---|
| 1000 | 김정미 | 90 | 알고리즘 |
| 2000 | 강은미 | 95 | 데이터베이스 |
| 3000 | 홍길동 | 90 | 전산수학 |
| 4000 | 민수 | 95 | 운영체제 |

<details><summary>정답 보기</summary>

**정답:** DELETE FROM 학생 WHERE 이름 = '민수';

</details>

### 2020년 3회 20번

[해설 보기](../2020년%203회/20.md)

학생 테이블에 주소 속성을 추가하는 SQL문을 작성하시오.

(    1.   ) TABLE 학생   (   2.  ) 주소 VARCHAR(20);

<details><summary>정답 보기</summary>

**정답:** 1. ALTER 2. ADD

</details>

### 2020년 2회 06번

[해설 보기](../2020년%202회/06.md)

학생 테이블은 학번, 이름, 학년, 수강과목, 점수, 연락처를 속성으로 가진다. 아래 조건을 만족하는 SQL문을 작성하시오.

1) 학생 테이블에서 3,4학년인 학번, 이름을 조회한다.

2) IN 연산자 사용해야 한다.

[학생]

| 학번 | 이름 | 학년 | 수강과목 | 점수 | 연락처 |
|---|---|---|---|---|---|
| 1000 | 김이름 | 1 | 수학 | 90 | 010-1111-2222 |
| 2000 | 장이름 | 2 | 과학 | 95 | 010-2222-2222 |
| 3000 | 허이름 | 3 | 미술 | 90 | 010-3333-3333 |
| 4000 | 조이름 | 4 | 음악 | 95 | 010-4444-4444 |

<details><summary>정답 보기</summary>

**정답:** SELECT 학번, 이름 FROM 학생 WHERE 학년 IN (3,4);

</details>

### 2020년 2회 12번

[해설 보기](../2020년%202회/12.md)

학생 테이블의 name속성에 IDX\_NAME 이름으로 인덱스 생성하는 SQL문을 작성하시오.

| STID | NAME | SCORE | DEPTID |
|---|---|---|---|
| 1000 | 김이름 | 90 | 1 |
| 2000 | 허이름 | 95 | 2 |
| 3000 | 조이름 | 90 | 3 |
| 4000 | 장이름 | 95 | 4 |

<details><summary>정답 보기</summary>

**정답:** CREATE INDEX IDX_NAME ON 학생(NAME);

</details>

### 2020년 1회 06번

[해설 보기](../2020년%201회/06.md)

STUDENT 테이블에서 컴퓨터과 학생 50명, 인터넷과 학생 100명, 사무자동화과 학생 50명의 정보가 저장되어 있을 때, 다음 SQL문의 실행 결과에 따른 튜플의 수는? (단, DEPT 칼럼은 학과명이다.)

1) SELECT DERP FROM STUDENT;

2) SELECT DISTINCT DEPT FROM STUDENT;

3) SELECT COUNT(DISTINCT DEPT) FROM STUDENT WHERE DEPT = '컴퓨터과';

<details><summary>정답 보기</summary>

**정답:** 1) 200 2) 3 3) 1

</details>

## DCL (1회)

### 2021년 3회 03번

[해설 보기](../2021년%203회/03.md)

Grant의 기능에 대해 간략하게 약술하시오.

<details><summary>정답 보기</summary>

**정답:** GRANT는 데이터베이스 사용자(User)에게 접속 권한, 객체(테이블 등) 생성·조회·수정 권한, DBA 권한 등을 부여하는 DCL 명령어이다. (회수는 REV…

</details>
