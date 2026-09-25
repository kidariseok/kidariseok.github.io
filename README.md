# JINSEOK OH · Portfolio

> **Connector**: Connecting people, technology, and ideas

성균관대학교 컴퓨터교육과 오진석의 활동 포트폴리오입니다.
대외활동 20건, 자격증 7개, 교내 장학 3건을 한곳에 모아, 무엇을 기획하고 이끌었는지 근거와 함께 보여 줍니다.

**사이트:** https://kidariseok.github.io

<br>

## 이 사이트로 볼 수 있는 것

| 섹션 | 내용 |
|---|---|
| 첫 화면 | 이름과 한 줄 소개, 관심 분야, 주요 숫자 4개 (해커톤 90명 주최 · IELTS 8.0 · 봉사 212시간+ · 대외활동 20건) |
| 대표 활동 | RE:ALThon 주최, Google Developer Student Clubs, 멋쟁이사자처럼 4호선톤, KT&G 해외봉사단 |
| 소개 | 기술을 사람과 아이디어에 연결하는 사람이라는 이야기와 기본 정보 |
| 기록 요약 | 숫자 카드 8개. 봉사시간 카드를 누르면 1365 확인서 기준 전체 봉사 내역이 열립니다 |
| 대외활동 | 20건 전체 목록과 활동마다의 상세 기록, 현장 사진 |
| 자격증 · 장학 | 분야별 자격증 7개, 교내 장학 3건 |

<br>

## 특징

- **한국어 / 영어 전환** - 오른쪽 위 KO · EN 버튼으로 모든 글이 바뀌고, 고른 언어를 기억합니다.
- **두 가지 방식으로 활동 보기**
  - 분야별: Technology · People · Leadership · Global · Explore 다섯 분야로 나눠 보기 (분야마다 색이 다름)
  - 활동별: 공모전 · 대외활동 · 봉사활동 · 교내동아리 · 교내활동 · 강의로 나눠 보기
- **활동마다 상세 페이지** - 주소가 `#a/활동이름` 형태라 특정 활동을 바로 공유할 수 있고, 이전·다음 활동으로 넘겨 볼 수 있습니다.
- **어느 화면에서나** - 컴퓨터와 휴대폰 화면에 맞춰 배치가 바뀌고, 기기 설정에 따라 어두운 화면도 지원합니다.
- **접근성** - 키보드로도 모든 버튼과 카드를 쓸 수 있고, '동작 줄이기' 설정을 켜면 움직이는 효과가 멈춥니다.

<br>

## 디자인

- 흰색과 검정 바탕에, 포인트 색은 파란색 `#1c6fe0` 한 가지만 씁니다.
- 메뉴, 첫 화면 숫자 상자처럼 화면 위에 떠 있는 부분에만 유리 효과(Apple Liquid Glass를 웹에서 흉내 낸 것)를 씁니다.
- 글꼴: Archivo (영문 제목) · Noto Sans KR (본문) · Playfair Display 기울임체 (캐치프레이즈)

<br>

## 구조

```
index.html        화면 구조 · 디자인 · 기능이 한 파일에 들어 있습니다
content/
  ko.js           한국어 글자
  en.js           영어 글자
  common.js       날짜 · 사진 · 숫자 · 분야처럼 언어와 상관없는 값
img/              활동 사진과 일러스트
```

- 프레임워크나 설치 과정 없이 HTML, CSS, 순수 JavaScript로만 만들었습니다.
- 글과 데이터는 `content/` 폴더에 따로 두어서, 코드를 몰라도 글자 파일만 고치면 사이트 내용이 바뀝니다.
- GitHub Pages로 배포합니다. `main` 브랜치에 올리면 1~2분 뒤 사이트에 반영됩니다.

<br>

## 내용 고치기

| 하고 싶은 일 | 고칠 곳 |
|---|---|
| 한국어 · 영어 문장 바꾸기 | `content/ko.js`, `content/en.js` |
| 활동 추가 | `content/common.js`의 `activities`에 한 줄, `ko.js`·`en.js`의 `activities`에 제목과 본문 |
| 대표 활동 바꾸기 | `content/common.js`의 `featured` |
| 첫 화면 숫자 바꾸기 | `content/common.js`의 `heroStats` |
| 활동의 분야 옮기기 | `content/common.js`에서 해당 활동의 `axis` |

<br>

## 만든 과정

디자인과 기능은 [Claude Code](https://claude.com/claude-code)와 함께 만들었습니다.
시안을 여러 개 비교해 방향을 고른 뒤, 페이지에 직접 댓글을 달아 고칠 곳을 알려 주는 방식으로 다듬었습니다.

<br>

## Contact

- Email: kidariseok@gmail.com
- Blog: https://blog.naver.com/kidariseok
