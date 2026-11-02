# g3final

기말고사 대비 Jekyll 사이트 (GitHub Pages). 과목별로 **이론** / **문제** 메뉴가 있습니다. 중간고사판([deug3middleexam](https://github.com/hamsterganggang/deug3middleexam))과 같은 구조입니다.

## 구조

```
_config.yml              baseurl = /g3final
_data/subjects.yml       과목 목록 (상단 과목 탭, 홈 카드)
_data/ml/quiz.json       머신러닝 문제 (객관식 + 계산 문제, type: qa)
_layouts/                공통 헤더 · 이론 · 문제 레이아웃
_includes/ml/fig/        머신러닝 이론 그림 (SVG)
assets/css, assets/js    스타일 · 문제 엔진(qa.js, blank.js) · 이론 보기 필터(lens.js)
ml/theory.html           머신러닝 이론 9~16장 (강의 대본 기준 ★ 출제 / 출제 예상 / 용어 이해 / 참고) → /ml/theory/
ml/quiz.html             머신러닝 객관식 예상 문제 + 계산 문제 → /ml/quiz/
bigdata/                 빅데이터 (자료 받으면 추가 · 지금은 "준비 중")
scripts/                 강의 대본 원문 (Chapter9~16.txt) · 사이트 빌드에서는 제외
```

## 표시 기준 (머신러닝)

기말은 아직 교수님 시험 문제 정리본이 없어 `scripts/` 강의 대본만 근거로 했습니다.

- ★ 출제: 강의에서 "시험 나올 수 있으니까 · 알아두십시오 · 기억해 두시면 · 이번 장에서 중요한 것은"이라고 직접 말한 것
- 출제 예상: 강의에서 설명·강조했거나 숫자를 짚어 준 예제
- 참고: 이해용 설명·코드
- 교수님이 "몰라도 된다 · 가볍게 · 크게 중요하지 않다"고 한 것은 장 끝 **몰라도 되는 것**에만 적음

## 내용 추가하는 법

1. 이론: `<과목>/theory.html` 본문에 HTML을 넣습니다 (`section > h2`, `.card > h3`가 목차가 됨).
2. 문제: `_data/<과목>/quiz.json`
   - 코드 빈칸: `answers: { "번호": ["정답", ...] }`, `sections: [{ id, title, items: [{ desc, code }] }]` — `code` 안의 `[[n]]`이 빈칸
   - 객관식/계산: `"type": "qa"`, `items: [{ q, choices, answer, a }]` 또는 `[{ q, fields: [{l, v}], steps }]`
3. 빅데이터를 열 때는 `_data/subjects.yml`에서 `ready: true`로 바꾸고 desc를 고칩니다.

## 로컬 실행

```
bundle install
bundle exec jekyll serve
# http://localhost:4000/g3final/
```
