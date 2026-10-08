# PhotocardMaker

포토카드 메이커의 **GitHub Pages용 웹 버전**입니다.

## 주요 기능

- 누끼 기능 없음 — 원본 사진을 카드 비율에 맞춰 바로 크롭
- 650 × 1004 PNG 생성
- 리본 포토카드 프레임
- 요소 컬러 / 텍스트 컬러 변경
- 이름 / 자간 / 폰트 크기 / X 위치 / 그림자 / 테두리 조정
- 미리보기 드래그 이동 + 마우스 휠 확대/축소
- 중앙 / 얼굴 크기 가이드
- 현재 설정을 브라우저 기본값으로 저장
- 지원 브라우저에서 PNG 저장 폴더 지정 및 기억
- Excel 일괄 생성 → ZIP 다운로드
- Excel 데이터 표 정렬 / 필터 / 더블클릭 완료 표시 / 진행 상태 저장
- Excel 샘플 양식을 웹에서 바로 생성

모든 이미지 렌더링은 사용자 브라우저 안에서 처리되며 사진을 별도 서버에 업로드하지 않습니다.

## GitHub Pages

저장소의 **Settings → Pages**에서 Source를 **Deploy from a branch**로 선택하고,
Branch를 **main / (root)** 로 설정하면 됩니다.

배포 주소:

`https://p0emkite.github.io/PhotocardMaker/`


## 템플릿 엔진

템플릿 메타데이터와 렌더러는 `templates.js`에서 관리합니다. 앱 본체는 템플릿 레지스트리를 읽어 템플릿/폰트 목록과 조건부 입력 필드를 구성합니다.

현재 구조 검증용 템플릿:

- 01. Ribbon Classic
- 03. Polaroid
- 05. Magazine Cover
- 14. Minimal Line
- 22. Student ID — 학교명 입력 지원
- 39. Signature — 사용자 사인 이미지 업로드 지원

새 템플릿은 `TEMPLATE_REGISTRY`에 메타데이터를 등록하고 front/back renderer를 연결하는 방식으로 확장합니다.


## Template QA

템플릿 변경 시 GitHub Actions의 **Template QA**가 자동 실행됩니다.

검사 항목:

- 47개 템플릿 ID / 번호 / 기본 폰트 / 기본 좌표 검증
- 이름 및 앞·뒷면 그룹 로고 기본 좌표 범위 검증
- 템플릿별 extra field / back style 유효성 검증
- 47개 템플릿의 **앞면 + 뒷면 총 94개 렌더러 스모크 테스트**
- 렌더 도중 정의되지 않은 helper 또는 런타임 오류가 발생하면 CI 실패

로컬 정적 QA:

```bash
npm test
```

브라우저 시각 QA:

- GitHub Pages의 `/qa.html`
- 합성 샘플 사진과 로고를 이용해 모든 템플릿의 앞/뒷면을 한 화면에서 비교
- 오류가 발생한 템플릿은 빨간 카드로 표시


## Style Presets

각 템플릿은 브라우저에 여러 개의 이름 있는 스타일 프리셋을 저장할 수 있습니다.

- 저장: 그룹, 요소/텍스트/배경 컬러, 폰트, 글자 크기/자간/위치, 텍스트 효과, 앞/뒷면 로고 크기·위치·효과, 뒷면 스타일 및 템플릿 전용 옵션
- 저장하지 않음: 사진, 이름 텍스트, 사진 크롭/확대, 저장 파일명
- 관리: 새 프리셋 저장, 즉시 적용, 현재 설정으로 덮어쓰기, 이름 변경, 삭제
- 템플릿 찾아보기 카드에는 해당 템플릿에 저장된 프리셋 개수가 표시됩니다.


## Group Manager

웹에서 그룹을 직접 추가·수정·삭제할 수 있습니다.

- 그룹명 및 그룹 로고 업로드
- 대표 요소 / 텍스트 / 배경 컬러 저장
- 그룹 선택 후 ‘대표 컬러 적용’으로 작업 중인 디자인에 한 번에 반영
- 사용자 그룹은 브라우저에 저장되며 템플릿, 스타일 프리셋, Excel 양식/일괄 생성에서 사용
- 업로드 로고는 브라우저 저장 공간을 아끼도록 자동 최적화
- 기본 IVE 그룹은 삭제/이름 변경은 잠기며 로고와 대표 컬러는 수정 가능


### SVG group logos

그룹 관리에서 SVG 로고를 직접 업로드할 수 있습니다.

- SVG는 래스터 이미지로 변환하지 않고 벡터 데이터로 저장
- PNG/JPEG/WebP는 기존처럼 브라우저용 크기로 최적화
- script, foreignObject, 외부 URL 참조 등 불필요하거나 위험한 SVG 요소/속성은 제거
- 저장된 SVG 로고는 앞면, 뒷면, 대각형, 반복 패턴형 로고 렌더링에 동일하게 사용


## Working Canvas Size

포토카드 설정의 ‘출력 크기’에서 작업을 시작할 캔버스 크기를 선택합니다.

- 650 × 1004
- 1300 × 2008
- 1950 × 3012
- 선택 즉시 미리보기 캔버스의 실제 픽셀 크기가 변경되며 이후 작업도 그 해상도에서 진행
- 개별 저장, 앞·뒷면 ZIP, Excel 일괄 생성 모두 현재 작업 크기를 그대로 사용
- 템플릿 좌표는 650×1004 논리 좌표를 유지하므로 기존 템플릿/프리셋 호환성 유지
- 선택 시 별도 `_GUIDE.png` 파일에 55×85mm 외곽 재단선과 약 3mm 안전영역을 표시
- 실제 완성 PNG에는 인쇄 가이드가 들어가지 않음


## GitHub logo storage

Custom group logos can optionally be committed directly to this repository from the deployed app.

- Target repository: `p0emkite/PhotocardMaker`
- Branch: `main`
- Logo directory: `assets/logos/custom/`
- Required fine-grained token permission: repository access only to PhotocardMaker, `Contents: Read and write`
- The token is stored only in browser `sessionStorage`; it is not written to source code, local group data, or the repository
- SVG logos are uploaded as sanitized SVG; bitmap logos are uploaded in their optimized WebP/PNG form
- Group metadata and representative colors remain local browser data
- If GitHub upload is enabled but no token is connected, group save is blocked rather than silently falling back to browser-only logo storage


## Template Pack 42–48

1차 신규 프레임 7종:

- 42. Candy Pop — 롤리팝, 포장 캔디, 별사탕 계열의 달콤한 프레임
- 43. Teddy Bear — 브라운/크림, 스티치, 테디베어 중심의 포근한 프레임
- 44. Rising Star — 초신성, 무대 조명, 광채와 스파클 중심의 대형 신인 컨셉
- 45. Japan Traditional — 부채, 금테, 세이카이하 패턴을 활용한 일본 전통풍
- 46. Fireworks — 여름 밤의 다색 불꽃과 빛망울을 강조한 불꽃놀이 프레임
- 47. Gyaru — 핑크/블랙, 스티커, 하트, 번개, 키치 장식을 활용한 갸루 컨셉
- 48. City Pop — 네온, 석양, 밤 도시 스카이라인, 레트로 그리드의 시티팝 컨셉

모든 템플릿은 앞/뒷면 세트이며 기존 그룹 로고, 컬러, 프리셋, 작업 캔버스 해상도 기능과 연동됩니다.


## 49. 마틸다 / Mathilda

- Design ID: `MATHILDA_V1` · registry ID: `mathilda` · 고정 Canvas 렌더러
- 650×1004: 사진 영역 (30, 82, 590, 754), 이름 패치 (158, 865, 334, 78), 이름 중심 (325, 905).
- 카키 트윌/스티치 프레임, 네 모서리 리벳, 왼쪽 하단 화분, 오른쪽 하단 검정 원형 선글라스.
- 뒷면: 선글라스, 로고 패치, 화분과 항공점퍼 모티프. 기본 로고 중심 (325, 446).
- 기본 이름 폰트 Oswald, 36px, 자간 4. 얼굴과 단발머리 영역에는 장식을 겹치지 않음.
- 고정 모티프 색상: 카키/검정/테라코타. 요소 컬러는 구분선, 텍스트 컬러는 이름에 적용. 배경 컬러는 기존 컨트롤로 변경 가능.
- Asset Lock: 외부 이미지 없이 결정론적 벡터 도형 사용. 미리보기·PNG·일괄 생성은 같은 렌더러 사용.


## 이름 배치 및 Candy Pop 개선 (2026-10-08)

현재 등록된 전체 47개 템플릿의 이름 영역을 검토했습니다. 이름은 폰트의 em-box 대신 실제 글자 외곽 경계로 중심 정렬하며, 네임플레이트 높이와 폭 안에 맞춥니다. 템플릿별 좌표·여백·레이싱 회전값은 `templates.js`의 `NAME_AREAS`, 공통 렌더러는 `name-text.js`에서 관리합니다.

Candy Pop은 네 변 전체에 불투명 파스텔 배경 띠를 추가했습니다. 이름 초기화는 현재 템플릿의 좌표를 복원합니다. 저장된 예전 기본 좌표는 자동 보정하지만, 직접 조정한 위치는 유지합니다.

전체 검토표: [NAME_LAYOUT_AUDIT.md](NAME_LAYOUT_AUDIT.md)
