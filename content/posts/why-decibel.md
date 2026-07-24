+++
title = "[개념정리] dB는 왜 쓸까 — 로그로 신호를 보는 이유"
date = 2026-07-25
series = "이론/원리"
description = "이득도 감쇠도 dB로 쓰는데, 정작 왜 로그로 보는지는 넘어갔다. dB의 정의부터 '왜 로그인가'까지, 전력 기준(10log)으로 정리한다."
tags = ["개념정리", "dB", "decibel", "RF", "fundamentals"]
+++

## 들어가며

파워 IC를 하는 동안 dB는 그냥 익숙한 단위였다. 이득 몇 dB, 감쇠 몇 dB — 계산은 하는데 정작 "왜" 로그로 쓰는지는 넘어갔다.

HDD preamp를 보려고 RF 책을 펴니 첫 장부터 dB, dBm, S 파라미터가 전부 dB로 쓰여 있다. 뒤가 안 읽혀서 이번엔 "왜 dB인가"부터 잡고 간다. 따로 정리해두는 개념정리다.

> **이 글은 전부 10log 기준이다.** dB는 원래 전력(power) 기준이라 $\text{dB} = 10\log_{10}(\text{전력비})$ 가 기본이다. 전압/전류가 주어지면 **제곱해서 전력으로 바꾼 뒤** 10log를 취한다. (전압을 바로 넣는 20log는 다음 글에서 다룬다.)

---

## 1. dB의 정의 — 로그값이 곧 지수다

dB 값은 "어떤 수를 10의 몇 제곱으로 나타냈을 때, 그 <span class="pt">지수 × 10</span>"이다. 그런데 이 "10의 몇 제곱이냐"가 결국 $\log_{10}$ 값이다. 로그의 정의 자체가 *"10을 몇 번 곱해야 이 수가 되나"* 니까.

$$\log_{10}1000 = 3 \quad(10^3 = 1000), \qquad \log_{10}100 = 2, \qquad \log_{10}10 = 1$$

<svg viewBox="0 0 620 200" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>10의 거듭제곱과 로그값(지수)의 대응</title>
  <desc>값은 ×10씩 곱해지지만 로그값(지수)은 1, 2, 3으로 더해진다.</desc>
  <line x1="40" y1="150" x2="580" y2="150" stroke="currentColor" stroke-opacity="0.25"/>
  <g text-anchor="middle">
    <text x="120" y="66" font-size="20" fill="currentColor">10¹</text>
    <text x="120" y="90" font-size="12" fill="currentColor" fill-opacity="0.6">= 10</text>
    <text x="310" y="66" font-size="20" fill="currentColor">10²</text>
    <text x="310" y="90" font-size="12" fill="currentColor" fill-opacity="0.6">= 100</text>
    <text x="500" y="66" font-size="20" fill="currentColor">10³</text>
    <text x="500" y="90" font-size="12" fill="currentColor" fill-opacity="0.6">= 1000</text>
    <circle cx="120" cy="150" r="16" fill="#3b82f6"/>
    <circle cx="310" cy="150" r="16" fill="#3b82f6"/>
    <circle cx="500" cy="150" r="16" fill="#3b82f6"/>
    <text x="120" y="155" font-size="14" font-weight="700" fill="#fff">1</text>
    <text x="310" y="155" font-size="14" font-weight="700" fill="#fff">2</text>
    <text x="500" y="155" font-size="14" font-weight="700" fill="#fff">3</text>
    <text x="120" y="184" font-size="11" fill="currentColor" fill-opacity="0.55">log값 = 지수</text>
    <text x="310" y="184" font-size="11" fill="currentColor" fill-opacity="0.55">log값 = 지수</text>
    <text x="500" y="184" font-size="11" fill="currentColor" fill-opacity="0.55">log값 = 지수</text>
  </g>
  <g fill="none" stroke="#3b82f6" stroke-width="1.6">
    <path d="M160 116 q 55 -30 130 0" marker-end="url(#ar1)"/>
    <path d="M350 116 q 55 -30 130 0" marker-end="url(#ar1)"/>
  </g>
  <text x="215" y="104" font-size="12" text-anchor="middle" fill="#3b82f6">×10</text>
  <text x="405" y="104" font-size="12" text-anchor="middle" fill="#3b82f6">×10</text>
  <defs>
    <marker id="ar1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#3b82f6"/></marker>
  </defs>
</svg>

값은 $\times 10$ 씩 **곱해지는데** 로그값(지수)은 $1, 2, 3$ — 그냥 **더해진다**. 그래서 "지수 × 10"이나 "10·log"나 완전히 같은 말이다.

> **한 줄 정리:** 로그를 취한 결과가 곧 "10의 몇 제곱이냐" 그 지수다. 로그와 지수는 서로 반대 연산이지만, 로그가 내놓는 *값* 자체는 지수다.

---

## 2. dB는 절대값이 아니라 상대값이다

dB는 혼자서는 의미가 없다. "20dB"라고만 하면 *"뭐에 비해 100배?"* 인지 기준이 없어 반쪽짜리다. 항상 **"무엇 대비 몇 배"** 를 말하는 단위다.

$$\text{dB} = 10\log_{10}\!\left(\frac{P_2}{P_1}\right)$$

증폭기 이득이면 $P_1$은 입력, $P_2$는 출력. S/N비면 신호와 잡음. 언제나 두 값의 비교다. 그래서 dB 자체는 "얼마다"가 아니라 "몇 배다"를 재는 상대 눈금이다.

> 이 "기준이 빠졌다"는 점이 다음 글로 이어진다. 그 기준을 딱 하나로 고정한 게 **dBm**($1\text{mW}$ 기준)이다.

---

## 3. 왜 로그로 보나 ① — 우리 감각이 원래 로그다

제일 안 와닿았던 부분. 책에 이런 예가 나온다.

> 10V로 우는 스피커를 **2배 크게** 들리게 하려면 20V가 아니라 **100V**를 걸어야 한다.

처음엔 "이게 뭔 소리야" 싶었는데, 표로 보면 잡힌다.

| 자극 (전압) | 느끼는 소리 크기 |
|---|---|
| $10 = 10^1$ | 1 |
| $100 = 10^2$ | 2 |
| $1000 = 10^3$ | 3 |

자극은 $\times 10$ 씩 **곱해지는데** 느끼는 크기는 $+1$ 씩 **더해진다**. 즉 느끼는 크기 $=$ 자극의 지수 $= \log(\text{자극})$ 이다. 그래서 2배로 느끼려면 자극을 2배가 아니라 **제곱**($10 \to 100$)해야 한다. 20V(그냥 2배)는 지수가 $1 \to 1.3$ 밖에 안 올라 소리가 찔끔 커질 뿐이다.

<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>선형 축에서는 곡선, 로그 축에서는 직선</title>
  <desc>자극 대비 감각은 선형 축에서 곡선이지만, 자극을 로그 축에 놓으면 직선이 된다.</desc>
  <g>
    <text x="170" y="24" text-anchor="middle" font-size="12" fill="currentColor" fill-opacity="0.7">선형 축 → 곡선</text>
    <line x1="50" y1="60" x2="50" y2="190" stroke="currentColor" stroke-opacity="0.35"/>
    <line x1="50" y1="190" x2="300" y2="190" stroke="currentColor" stroke-opacity="0.35"/>
    <path d="M50 186 Q 160 182 210 130 T 295 66" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
    <text x="175" y="214" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity="0.6">자극(전압) →</text>
    <text x="34" y="128" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity="0.6" transform="rotate(-90 34 128)">감각 →</text>
  </g>
  <g transform="translate(340,0)">
    <text x="170" y="24" text-anchor="middle" font-size="12" fill="#3b82f6">로그 축 → 직선</text>
    <line x1="50" y1="60" x2="50" y2="190" stroke="currentColor" stroke-opacity="0.35"/>
    <line x1="50" y1="190" x2="300" y2="190" stroke="currentColor" stroke-opacity="0.35"/>
    <line x1="50" y1="186" x2="295" y2="70" stroke="#3b82f6" stroke-width="2.5"/>
    <circle cx="50" cy="186" r="4" fill="#3b82f6"/>
    <circle cx="172" cy="128" r="4" fill="#3b82f6"/>
    <circle cx="295" cy="70" r="4" fill="#3b82f6"/>
    <text x="50" y="210" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.6">10V</text>
    <text x="172" y="210" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.6">100V</text>
    <text x="295" y="210" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.6">1000V</text>
  </g>
</svg>

자극을 log 축에 놓으면 휘어진 곡선이 **직선**으로 펴진다. 소리를 dB로 재는 건 "편해서"가 아니라 **귀가 원래 로그로 느끼니까** 눈금을 거기 맞춘 것이다.

> **한 줄 직관:** 지진(리히터), 산성도(pH), 음악의 옥타브도 전부 로그다. 세상의 많은 양이 덧셈이 아니라 곱셈으로 벌어지고, 우리도 그걸 곱셈으로 인식한다. 그래서 로그 눈금이 그 대상의 본모습을 제대로 보여준다.

---

## 4. 왜 로그로 보나 ② — 곱셈이 덧셈이 된다

증폭기 다루는 사람한텐 이게 제일 큰 이유다. 신호가 여러 단을 지나면 이득이 **곱**으로 쌓인다. 로그로 적어두면 그냥 **더하면** 전체 이득이고, 손실(감쇠)은 빼면 된다.

책에 나온 송신기 예제가 이걸 잘 보여준다. 원래 신호 $1\text{mW}$ 에서 시작해 증폭과 손실을 거친다.

| 단 | 배수 | dB (10log) |
|---|---|---|
| 원래 신호 | $1\text{mW}$ | $0\text{ dBm}$ |
| 신호 증폭 | $\times 20$ | $+13$ |
| 혼합기 손실 | $\times 0.5$ | $-3$ |
| 신호 증폭 | $\times 100$ | $+20$ |
| 안테나 효율 | $\times 0.25$ | $-6$ |
| **합** | **$\times 250$** | **$24\text{ dBm}$** |

$$0\text{ dBm} + 13 - 3 + 20 - 6 = \boxed{24\text{ dBm}}$$

배수 그대로 하면 $20 \times 0.5 \times 100 \times 0.25 = 250$ 배, 그리고 $10\log 250 \approx 24\text{ dB}$. **곱셈 한 방이든 dB 덧셈이든 같은 답이다.** ($250 = 2.5 \times 100$ 이라 $10\log2.5 + 20 = 4 + 20 = 24$ 로도 나온다.)

preamp도 read circuit → postamp로 단이 이어진다. 각 단 이득을 dB로 적어두면 더하기만 하면 전체가 나온다. 단이 10개, 20개로 늘수록 이 편함이 커진다.

---

## 5. 그밖의 이점 — 범위 압축 · 비율 · Bode

**넓은 범위가 작은 숫자로 압축된다.** read preamp 신호는 헤드에서 오는 수십~수백 $\mu\text{V}$ 짜리 미세 신호부터 출력단의 수백 $\text{mV}$~$\text{V}$ 까지, 자릿수가 몇 개씩 차이난다. 선형 숫자로 한 그래프에 그리면 작은 신호는 축 바닥에 붙어 보이지도 않는다. 로그로 보면 이 범위가 **몇십 dB 안**에 다 들어와 큰 신호와 작은 신호를 한 축에서 같이 본다.

**비율을 상수로 다룬다.** 궁금한 건 "얼마나 더"가 아니라 "몇 배"다. 전력 $1\text{mW}\to2\text{mW}$ 나 $100\text{mW}\to200\text{mW}$ 나 똑같은 2배인데, 선형으로 보면 $+1$과 $+100$으로 달라 보이고 dB로 보면 둘 다 $+3\text{dB}$로 같다. 그래서 "전력 2배 $=+3\text{dB}$", "10배 $=+10\text{dB}$"처럼 고정 상수로 외워두고 암산한다.

**곡선이 직선이 된다.** 파워에서 본 <span class="pt">Bode plot</span>이 이것. 주파수(log 축)에 이득(dB)을 그리면 극점에서의 rolloff가 일정한 기울기의 직선으로 떨어진다. 직선이니까 phase margin이나 대역폭을 눈으로 읽는다. 곡선이면 못 읽는다.

---

## 6. 암산 치트시트 (10log)

계산기 없이 웬만한 건 이걸로 튀어나온다.

| 비율 | dB | 구하는 법 |
|---|---|---|
| 2배 | $+3$ | $10\log2$ |
| 10배 | $+10$ | $10\log10$ |
| 5배 | $+7$ | $10 - 3$ ($10\div2$) |
| 2.5배 | $+4$ | $10 - 6$ ($10\div4$) |
| 100배 | $+20$ | $10\log10^2$ |
| 1000배 | $+30$ | $10\log10^3$ |
| 0.5배 (손실) | $-3$ | 1보다 작아 음수 |
| 1배 (기준) | $0$ | — |

> $\log2 \approx 0.3$ 하나만 알면 나머지는 대부분 덧셈·뺄셈으로 나온다.

---

## Key takeaways

- **dB $= 10\log(\text{전력비})$.** 로그값 = "10의 몇 제곱이냐" 그 지수. 곱셈을 지수(덧셈)로 바꿔 보는 것.
- **dB는 상대값.** 항상 "무엇 대비 몇 배" — 기준이 있어야 값이 정해진다. 기준을 고정하면 dBm.
- **로그로 보는 이유:** ① 감각·자연이 원래 로그다 ② 곱셈이 덧셈이 된다 ③ 넓은 범위 압축 ④ 비율을 상수로 ⑤ 곡선이 직선(Bode).
- **전압이면 제곱 먼저.** $\text{dB}=10\log(\text{전력비})$ 하나만 쓰고, 전압/전류비는 제곱해서 전력비로 바꾼 뒤 넣는다.
- **암산 뼈대:** 2배 $=3\text{dB}$, 10배 $=10\text{dB}$. $\log2\approx0.3$ 하나로 대부분 조합된다.

*다음 글 — dB와 dBm은 뭐가 다를까? (상대값 dB에 기준을 고정하면 절대 전력이 된다.)*
