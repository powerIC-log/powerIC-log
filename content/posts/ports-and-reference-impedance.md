+++
title = "[개념정리] 50Ω과 포트 — S파라미터를 위한 준비물"
date = 2026-07-24T13:00:00
series = "이론/원리"
description = "50Ω은 왜 50이고, 포트는 정확히 뭔가. 둘 다 짧지만 S파라미터의 언어(입사파·출력파·기준 임피던스)를 깔아주는 자리다. 매칭 종단이 왜 필요한지까지 잡는다."
tags = ["개념정리", "S-parameter", "port", "impedance", "RF", "fundamentals"]
+++

## 들어가며

50Ω도 포트도 책에선 한 장짜리다. 따로 깊게 팔 건 없다. 그런데 이 둘은 **S파라미터의 언어를 깔아주는 자리**라, 넘어가기 전에 개념만 정확히 잡아두면 다음이 훨씬 수월하다.

> **참고 도서** — 《RF 기초강의실 (The Basic of RF)》 제1장 「원초적 기초」, Chapter 01 *50옴을 쓰는 이유*, Chapter 03 *Port의 정확한 의미* (p.17, 22).

---

## 1. 왜 50Ω인가 — 사실 별 얘기 없다

동축케이블(공기 유전체) 기준으로:

| 임피던스 | 유리한 점 |
|---|---|
| 약 30~33Ω | **최대 전력 전달** |
| 약 75~77Ω | **최소 손실(감쇠)** |
| **50Ω** | 그 **절충** (기하평균 √(30×77) ≈ 48 → 편의상 50) |

이게 전부다. "왜 하필 50"은 이 절충 하나로 끝난다.

### 진짜 중요한 건 "기준 임피던스"

써먹는 포인트는 "왜 50"이 아니라 이거다:

> **50Ω = RF 세계의 공용 기준 임피던스 (Z₀).**

모든 계측기·커넥터·케이블·S파라미터가 **50Ω 기준으로 통일**돼 있다. 그래서 중요한 건 "모두가 50Ω으로 맞춰져 있다"는 사실이고, 이게 다음과 연결된다:

- **S파라미터** — 애초에 Z₀ = 50Ω 기준으로 정의된다
- **임피던스 매칭** — 최대 전력 전달 + 반사 최소화를 위해 50Ω에 맞추는 것
- **preamp 검증** — 헤드~preamp 배선·종단이 반사를 안 만들게 임피던스를 맞추는 문제

---

## 2. 포트 — 파동이 드나드는 출입구

**Port = 신호(파동)가 드나드는 정해진 출입구.** 물리적으론 커넥터/케이블을 꽂는 자리이고, 각 포트는 기준 임피던스 **50Ω**을 갖는다.

저주파 회로는 **노드 전압·가지 전류**로 생각한다. 반면 RF는 신호가 파동으로 굴러다녀서, **포트에서 들어오는 파·나가는 파**로 생각한다. 이게 사고방식의 핵심 전환이다.

### 한 포트엔 파가 두 개

| 기호 | 이름 | 방향 |
|---|---|---|
| **a** | 입사파 (incident) | 포트로 **들어감** |
| **b** | 출력파 (emerging) | 포트에서 **나옴** |

같은 포트로 되돌아 나오면 "반사", 반대 포트로 넘어가 나오면 "전달" — 둘 다 b다.

---

## 3. 2-port와 S파라미터

대부분의 소자(증폭기·필터·케이블)는 입력(port1)·출력(port2) 두 포트다.

<svg viewBox="0 0 640 180" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>2-port 네트워크 — 각 포트의 입사파 a와 출력파 b</title>
  <desc>port1에 a1이 들어가 b1(반사)과 b2(전달)로 나오고, port2에는 a2가 들어올 수 있다.</desc>
  <rect x="240" y="60" width="160" height="70" rx="10" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.4"/>
  <text x="320" y="100" text-anchor="middle" font-size="13" fill="currentColor">소자 (2-port)</text>
  <text x="120" y="34" text-anchor="middle" font-size="12" fill="currentColor" fill-opacity="0.7">port 1</text>
  <text x="520" y="34" text-anchor="middle" font-size="12" fill="currentColor" fill-opacity="0.7">port 2</text>
  <g stroke-width="2" fill="none">
    <path d="M95 80 L238 80" stroke="#3b82f6" marker-end="url(#ma)"/>
    <path d="M238 112 L95 112" stroke="#e0533d" marker-end="url(#mb)"/>
    <path d="M402 80 L545 80" stroke="#e0533d" marker-end="url(#mb)"/>
    <path d="M545 112 L402 112" stroke="#3b82f6" marker-end="url(#ma)"/>
  </g>
  <g font-size="12" text-anchor="middle">
    <text x="150" y="72" fill="#3b82f6">a₁ 입사</text>
    <text x="150" y="128" fill="#e0533d">b₁ 반사</text>
    <text x="495" y="72" fill="#e0533d">b₂ 전달</text>
    <text x="495" y="128" fill="#3b82f6">a₂ 되돌아옴</text>
  </g>
  <defs>
    <marker id="ma" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#3b82f6"/></marker>
    <marker id="mb" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#e0533d"/></marker>
  </defs>
</svg>

S파라미터는 결국 **나가는 파(b)를 들어온 파(a)로 연결한 것**이다:

$$b = S \cdot a$$

$$S_{11}=\frac{b_1}{a_1},\quad S_{21}=\frac{b_2}{a_1},\quad S_{12}=\frac{b_1}{a_2},\quad S_{22}=\frac{b_2}{a_2}$$

- **첫 숫자 = 나오는 포트, 둘째 = 들어간 포트.** (S₂₁ = 2로 나옴 ← 1로 들어감)
- 반사(S₁₁, S₂₂) = 자기 포트로 되돌아옴 / 전달(S₂₁, S₁₂) = 반대 포트로 넘어감

---

## 4. 매칭 종단 — S₂₁을 순수하게 재려면

S₂₁ = b₂/a₁ 은 **a₂ = 0일 때만** 성립하는 정의다. 왜 이 조건이 필요할까?

port2에서 나오는 파의 진짜 전체 식은:

$$b_2 = S_{21}\,a_1 + S_{22}\,a_2$$

- 첫 항 $S_{21}a_1$ = port1에서 넘어온 **순수 전달** (원하는 것)
- 둘째 항 $S_{22}a_2$ = **되돌아온 a₂가 다시 반사된 것** (불청객)

### a₂는 어디서 오나 — 반사로 저절로 생긴다

핵심은 **a₂가 "내가 보낸 파"가 아니라, 나간 파 b₂가 종단에서 되튕겨 들어온 것**일 수 있다는 점이다.

$$a_1 \to b_2 \to (\text{port2 종단에서 반사}) \to a_2$$

<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>매칭 종단 vs 미스매칭 — a2가 생기는지</title>
  <desc>50Ω 종단이면 b2가 흡수돼 a2=0, 미스매칭이면 b2가 반사돼 a2가 생긴다.</desc>
  <!-- matched -->
  <text x="60" y="40" font-size="12" fill="#3b82f6">매칭 (50Ω)</text>
  <rect x="60" y="52" width="70" height="40" rx="6" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.4"/>
  <text x="95" y="76" text-anchor="middle" font-size="11" fill="currentColor">port2</text>
  <path d="M135 72 L360 72" stroke="#e0533d" stroke-width="2" fill="none" marker-end="url(#mb2)"/>
  <text x="245" y="64" text-anchor="middle" font-size="11" fill="#e0533d">b₂</text>
  <rect x="365" y="52" width="90" height="40" rx="6" fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-opacity="0.5"/>
  <text x="410" y="70" text-anchor="middle" font-size="11" fill="currentColor">50Ω 흡수</text>
  <text x="410" y="84" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity="0.7">반사 없음</text>
  <text x="500" y="76" font-size="12" fill="#3b82f6">→ a₂ = 0 ✓</text>
  <!-- mismatched -->
  <text x="60" y="140" font-size="12" fill="#e0533d">미스매칭 (≠50Ω)</text>
  <rect x="60" y="152" width="70" height="40" rx="6" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.4"/>
  <text x="95" y="176" text-anchor="middle" font-size="11" fill="currentColor">port2</text>
  <path d="M135 166 L360 166" stroke="#e0533d" stroke-width="2" fill="none" marker-end="url(#mb2)"/>
  <text x="245" y="158" text-anchor="middle" font-size="11" fill="#e0533d">b₂</text>
  <path d="M360 182 L135 182" stroke="#3b82f6" stroke-width="2" fill="none" marker-end="url(#ma2)"/>
  <text x="245" y="197" text-anchor="middle" font-size="11" fill="#3b82f6">a₂ (반사)</text>
  <rect x="365" y="152" width="90" height="40" rx="6" fill="#e0533d" fill-opacity="0.12" stroke="#e0533d" stroke-opacity="0.5"/>
  <text x="410" y="176" text-anchor="middle" font-size="11" fill="currentColor">벽처럼 반사</text>
  <text x="500" y="176" font-size="12" fill="#e0533d">→ a₂ ≠ 0 ✗</text>
  <defs>
    <marker id="mb2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#e0533d"/></marker>
    <marker id="ma2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#3b82f6"/></marker>
  </defs>
</svg>

- **port2를 50Ω으로 종단** → b₂가 싹 흡수 → 반사 없음 → **a₂ = 0**
- **미스매칭** → b₂의 일부가 벽처럼 반사돼 되돌아옴 → **a₂ ≠ 0**

그래서 매칭 종단을 하면 둘째 항이 사라져 $b_2 = S_{21}a_1$, 즉 $S_{21}=b_2/a_1$ 이 깨끗하게 나온다.

> **한 줄 직관:** b₂를 port2로 굴려 보낸 공이라 치면 — **모래밭(50Ω)**이면 파묻혀 안 돌아오고(a₂=0), **벽(미스매칭)**이면 튕겨 돌아온다(a₂≠0). 순수한 전달만 재려고 모래밭을 깔아두는 게 매칭 종단이다.

---

## Key takeaways

- **50Ω** = 30Ω(전력)과 77Ω(저손실)의 절충. 근데 진짜 요점은 **공용 기준 임피던스(Z₀)** — 모두가 50Ω으로 통일돼 있다는 것.
- **Port** = 파동이 드나드는 50Ω 기준의 출입구. 각 포트엔 **입사파 a**(들어감)·**출력파 b**(나옴)가 있다.
- **S파라미터 = b를 a로 이은 것.** 첨자는 "나오는 포트 ← 들어간 포트" (S₂₁ = b₂/a₁).
- **매칭 종단**: port2를 50Ω으로 막아 b₂ 반사를 없애 **a₂=0**을 만드는 것. 안 그러면 $b_2=S_{21}a_1+S_{22}a_2$ 라 측정이 오염된다.
- **a₂는 저절로 생길 수 있다** — a₁ → b₂ → (미스매칭 반사) → a₂. 그 고리를 끊는 게 매칭 종단.

---

## 셀프 퀴즈

1. 50Ω은 어떤 두 값의 절충인가? 각각 뭐에 유리한가?
2. "왜 50이냐"보다 실무에서 더 중요한 50Ω의 의미는?
3. 한 포트의 두 파 a, b는 각각 무엇이고 방향은?
4. S₂₁을 a, b로 쓰면? 첨자 "21"에서 2와 1은 각각 뭘 뜻하나?
5. "port2를 매칭 종단한다"를 파(wave)로 말하면? 왜 그렇게 하나?
6. S₂₁을 잴 때 a₂는 어디서 생길 수 있나? (a₁과 무슨 관계?)

<details>
<summary>답 보기</summary>

1. 약 30Ω(최대 전력 전달)과 약 77Ω(최소 손실)의 절충 → 50Ω.
2. **공용 기준 임피던스(Z₀).** 모든 장비·케이블·S파라미터가 50Ω 기준으로 통일돼 있어, 매칭·S파라미터의 전제가 된다.
3. **a = 입사파(포트로 들어감), b = 출력파(포트에서 나옴).** 같은 포트로 나오면 반사, 반대 포트면 전달.
4. $S_{21}=b_2/a_1$. 앞 숫자 **2 = 나오는 포트**, 뒤 숫자 **1 = 들어간 포트**. (1로 들어가 2로 나옴)
5. **port2를 50Ω으로 종단해 b₂ 반사를 없애 a₂=0으로 만드는 것.** S₂₁은 순수 전달(b₂/a₁)만 보고 싶은데, a₂≠0이면 $b_2=S_{21}a_1+S_{22}a_2$로 오염되기 때문.
6. **b₂가 port2 종단에서 반사돼 되돌아온 것으로 생긴다** ($a_1\to b_2\to$ 반사 $\to a_2$). 즉 a₁이 만든 b₂가 미스매칭 종단에서 튕겨 a₂가 된다. 매칭 종단이면 흡수돼 a₂=0.

</details>

*이전 — [dB와 dBm은 뭐가 다를까](../db-vs-dbm/). 다음 — S 파라미터 본편(S11·S21·반사·매칭).*
