+++
title = "[개념정리] dB와 dBm은 뭐가 다를까 — 둘 다 전력인데 기준이 다르다"
date = 2026-07-24T12:00:00
series = "이론/원리"
description = "dB는 상대값, dBm은 절대값. 근데 둘 다 log라 헷갈린다. 핵심은 '둘 다 전력을 보는 것이고 차이는 분모(기준)뿐'. 여기에 전압은 왜 20log인지, S 파라미터는 왜 dB인지까지 잡는다."
tags = ["개념정리", "dBm", "dB", "decibel", "RF", "fundamentals"]
+++

## 들어가며

[앞 글](../why-decibel/)에서 dB는 잡았는데, dBm이 붙으니 다시 헷갈렸다. "dB는 상대값, dBm은 절대값"이라는데 — 둘 다 결국 log 씌운 거잖아? dBm도 1mW 기준으로 치환하는 거니까 상대값 아닌가?

한참 헤매다 도달한 결론을 먼저 박아두고 시작한다.

> **dB든 dBm이든 둘 다 "전력"을 보는 것이다. 차이는 딱 하나 — 분모(기준)다.**

> **참고 도서** — 《RF 기초강의실 (The Basic of RF)》 제1장 「원초적 기초」, Chapter 07 *dB와 dBm은 뭐가 다를까?* (p.35~38).

---

## 1. dB 다시 보기 — 값이 아니라 "전력 비"의 log

dB는 어떤 측정값 *자체*가 아니다. **전력의 비율**을 log로 나타낸 것이다.

$$\text{dB} = 10\log_{10}\frac{P_2}{P_1}$$

여기서 분모 $P_1$ 은 **상황마다 바뀐다.** 증폭기면 입력, S/N이면 잡음… 그때그때 다르다. 그래서 dB는 **"무엇 대비 몇 배"** 를 재는 **상대 눈금**이다. 혼자서는 의미가 없다 — "20dB"만 말하면 *"뭐에 비해 100배?"* 인지 알 수 없다.

> 책은 가격으로 비유한다. 100만원 vs 2000만원 = 20배 = 13dB 차이. 가격을 dB 스케일로 적으면 60dB·73dB. 단위는 '원'이지만 magnitude가 아니라 **비율을 log로** 나타낸 것뿐이다.

---

## 2. dBm — 분모를 1mW로 잠근 dB

dB가 상대값인 건 분모가 떠다니기 때문이다. 그 분모를 **1mW로 딱 못박으면** 어떻게 될까?

$$\text{dBm} = 10\log_{10}\frac{P}{1\text{mW}}$$

분모가 고정이라, 이제 값 하나가 **실제 전력 하나**에 1:1로 대응한다. "20dBm"은 언제나 **정확히 100mW**다. 이게 **절대값**이다.

### 리트머스 시험 — "몇 W냐?"

> **"몇 W냐"고 물었을 때 답할 수 있으면 절대값(dBm), 못 하면 상대값(dB).**

- **+20dB** → 몇 W? **모른다.** "20dB… 뭐 대비?" 되물어야 한다. → 상대
- **+20dBm** → **정확히 100mW.** 바로 나온다. → 절대

<svg viewBox="0 0 720 170" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>dBm 사다리 — 1mW를 0dBm으로 고정</title>
  <desc>1µW=-30dBm, 1mW=0dBm, 1W=30dBm. 전력이 10배씩 오르면 dBm은 10씩 더해진다.</desc>
  <line x1="60" y1="82" x2="660" y2="82" stroke="currentColor" stroke-opacity="0.3"/>
  <g text-anchor="middle">
    <text x="60" y="52" font-size="13" fill="currentColor">−30</text><text x="60" y="112" font-size="11" fill="currentColor" fill-opacity="0.6">1µW</text>
    <text x="160" y="52" font-size="13" fill="currentColor">−20</text><text x="160" y="112" font-size="11" fill="currentColor" fill-opacity="0.6">10µW</text>
    <text x="260" y="52" font-size="13" fill="currentColor">−10</text><text x="260" y="112" font-size="11" fill="currentColor" fill-opacity="0.6">100µW</text>
    <text x="360" y="50" font-size="14" font-weight="700" fill="#3b82f6">0</text><text x="360" y="114" font-size="11" font-weight="700" fill="#3b82f6">1mW</text>
    <text x="460" y="52" font-size="13" fill="currentColor">+10</text><text x="460" y="112" font-size="11" fill="currentColor" fill-opacity="0.6">10mW</text>
    <text x="560" y="52" font-size="13" fill="currentColor">+20</text><text x="560" y="112" font-size="11" fill="currentColor" fill-opacity="0.6">100mW</text>
    <text x="660" y="52" font-size="13" fill="currentColor">+30</text><text x="660" y="112" font-size="11" fill="currentColor" fill-opacity="0.6">1W</text>
  </g>
  <g stroke="currentColor" stroke-opacity="0.4">
    <line x1="60" y1="76" x2="60" y2="88"/><line x1="160" y1="76" x2="160" y2="88"/><line x1="260" y1="76" x2="260" y2="88"/>
    <line x1="460" y1="76" x2="460" y2="88"/><line x1="560" y1="76" x2="560" y2="88"/><line x1="660" y1="76" x2="660" y2="88"/>
  </g>
  <circle cx="360" cy="82" r="7" fill="#3b82f6"/>
  <text x="360" y="142" text-anchor="middle" font-size="11" fill="#3b82f6">기준 고정</text>
  <text x="360" y="24" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity="0.6">dBm (절대 전력)</text>
</svg>

전력이 $\times10$ 오를 때마다 dBm은 $+10$. 1mW=0dBm, 10mW=10dBm, 100mW=20dBm, **1W=30dBm**.

### "30dB 보정"이 아니다

흔한 오해: dBm은 30dB를 더해서 1mW를 0으로 만든다? **아니다.** 그냥 분모에 1mW를 넣으면 자동이다.

$$P=1\text{mW}\to 10\log\frac{1\text{mW}}{1\text{mW}}=10\log(1)=0\text{dBm}$$

숫자 30은 **"1W = 30dBm"** 에서 나온다 (1W가 1mW의 1000배 = +30dB). 그리고 기준을 1W로 잡은 게 **dBW**라, $1\text{W}=30\text{dBm}=0\text{dBW}$. 즉 $\text{dBm}=\text{dBW}+30$ — 이 30은 두 기준(1mW vs 1W)의 간격일 뿐이다.

---

## 3. 그래서 둘 다 "전력"이다

이게 이 챕터의 핵심 매듭이다. dB도 dBm도 **전력을 보는 것**이고, 차이는 **분모뿐**이다.

| | 식 | 분모(기준) | 알려주는 것 |
|---|---|---|---|
| **dB** | $10\log\dfrac{P_2}{P_1}$ | 상황마다 바뀜 | 몇 **배** (비율) |
| **dBm** | $10\log\dfrac{P}{1\text{mW}}$ | 1mW로 고정 | 몇 **W** (실제 전력) |

**dBm = 분모를 1mW로 잠근 dB.** 딱 그거다.

---

## 4. 더하기 조합 — dBm+dBm은 왜 안 되나

dB에서 **더하기 = 실제값 곱하기**다 (곱셈→덧셈이 dB의 존재 이유였으니까). 그래서 "단위"로 따지면 깔끔하다.

- **dB** = 배수 (단위 없음)
- **dBm** = 전력

| 연산 | 실제로 하는 것 | 결과 | 말 되나 |
|---|---|---|---|
| dB + dB | 배수 × 배수 | 배수 | ✅ |
| dBm + dB | 전력 × 배수 | 전력 | ✅ (전력을 몇 배) |
| **dBm + dBm** | **전력 × 전력** | **W² (없는 물리량)** | ❌ |

**숫자로:** 100mW 신호 둘(각 20dBm)을 합친다면 —

- **진짜 합(선형):** $100+100=200\text{mW}=23\text{dBm}$
- **dBm을 그냥 더하면:** $20+20=40\text{dBm}=10{,}000\text{mW}=10\text{W}$ ⚠️

10W는 실제로 $100\text{mW}\times100\text{mW}/1\text{mW}$ = **곱셈**에서 나온 헛값이다. 전력을 합치려면 **dB에서 빠져나와** mW로 바꿔 선형으로 더한 뒤 다시 dBm으로 와야 한다. 절대 "dBm + dBm"이 아니다.

---

## 5. 왜 전압은 20log인가 — 전압은 전력의 제곱근이라서

계측기로 재면 전력이 아니라 **전압(V)**이 찍힌다. 그런데 dB는 **전력** 기준이다. 그래서 전압을 전력으로 바꿔야 하고, 그 다리가 $P=V^2/R$ 다.

**dBm(절대)을 전압에서 구하려면** — R이 필요하다:

<svg viewBox="0 0 720 130" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>측정 전압에서 dBm까지의 흐름</title>
  <desc>측정 전압을 V제곱/R로 전력으로 바꾼 뒤 1mW 기준 10log를 취해 dBm을 얻는다.</desc>
  <g font-size="13" text-anchor="middle">
    <rect x="20" y="45" width="120" height="40" rx="8" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.3"/>
    <text x="80" y="70" fill="currentColor">측정 전압 V</text>
    <rect x="200" y="45" width="120" height="40" rx="8" fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-opacity="0.5"/>
    <text x="260" y="70" fill="currentColor">V² / R</text>
    <rect x="380" y="45" width="110" height="40" rx="8" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.3"/>
    <text x="435" y="70" fill="currentColor">전력 P</text>
    <rect x="550" y="45" width="150" height="40" rx="8" fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-opacity="0.5"/>
    <text x="625" y="65" fill="currentColor">10 log(P/1mW)</text>
    <text x="625" y="80" font-size="11" fill="currentColor" fill-opacity="0.7">→ dBm</text>
  </g>
  <g stroke="currentColor" stroke-opacity="0.5" fill="none">
    <path d="M144 65 L196 65" marker-end="url(#a)"/>
    <path d="M324 65 L376 65" marker-end="url(#a)"/>
    <path d="M494 65 L546 65" marker-end="url(#a)"/>
  </g>
  <text x="260" y="32" text-anchor="middle" font-size="11" fill="#3b82f6">R 필요 (50Ω)</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="currentColor"/></marker></defs>
</svg>

**dB(비율)을 전압에서 구하면** — R이 약분돼서 사라진다:

$$\text{dB}=10\log\frac{V_2^2/R}{V_1^2/R}=10\log\frac{V_2^2}{V_1^2}=\boxed{20\log\frac{V_2}{V_1}}$$

$V$가 제곱이라 log 밖으로 나오면서 $10\to20$. 즉 **"20log(전압)"은 "10log(전력)"을 전압으로 다시 쓴 것**뿐이다. 20log라고 전력이 아닌 게 아니라, **진폭(전압)을 전력 dB로 바꾸는 게 20log**다.

> **함정 — 3dB는 전력 2배지 전압 2배가 아니다.**
> - 전력 $\times2$ → **+3dB**
> - 전압 $\times2$ (= 전력 $\times4$) → **+6dB**
> - 전압 $\times\sqrt2$ (≈1.414배) → **+3dB** ← "전압에서의 3dB"
>
> 그래서 10V vs 20V는 3dB가 아니라 **6dB** 차이다. (전압 2배 = 전력 4배)

---

## 6. S 파라미터는 왜 dB인가 (dBm이 아니라)

S 파라미터는 **비(ratio)**다. "넣은 것 대비 나온 것":

- **S21** = port2로 나온 파 / port1에 넣은 파 → 통과(전달), 이득/손실
- **S11** = 반사파 / 입사파 → 매칭

절대 전력(1mW 대비)이 아니라 **"몇 배"**를 보는 거라 → **상대값 → dB.** 1mW랑 비교할 절대 전력 자체가 없으니 dBm은 불가능하다.

### S21은 전압비다 → 그래서 20log

$$S_{21} = \frac{\text{출력 전압파}}{\text{입력 전압파}}\ (\text{전압비}), \qquad |S_{21}|^2 = \text{전력비}$$

S21 자체는 **전압(진폭)비**, 그걸 제곱한 $|S_{21}|^2$ 이 **전력비**. 그래서 dB(전력)로는:

$$S_{21}(\text{dB}) = 10\log|S_{21}|^2 = 20\log|S_{21}|$$

전압과 똑같은 이유로 20log다. ($S_{21}$ 첨자는 "**2←1**", port1에 넣어 port2로 나오는 것. port2는 매칭 종단한 상태에서 잰다.)

| $\lvert S_{21}\rvert$ | 의미 |
|---|---|
| $>1$ (예: +10dB) | 증폭 |
| $=1$ (0dB) | 그대로 통과 |
| $<1$ (예: −6dB) | 손실/감쇠 |

---

## 암산 치트시트

**dBm (절대 전력):**

| 전력 | dBm |
|---|---|
| 1µW | −30 |
| 1mW | 0 |
| 10mW | 10 |
| 100mW | 20 |
| 1W | 30 |

**비율 (dB):**

| 배수 | 전력(10log) | 전압(20log) |
|---|---|---|
| ×2 | +3 | +6 |
| ×√2 | +1.5 | +3 |
| ×10 | +10 | +20 |
| ×½ | −3 | −6 |

---

## Key takeaways

- **dB도 dBm도 "전력"을 본다.** 차이는 분모뿐 — dB는 분모($P_1$)가 상황마다 바뀌고(상대), dBm은 1mW로 고정(절대).
- **리트머스:** "몇 W?"에 답되면 dBm(절대), 안 되면 dB(상대).
- **dBm은 "+30 보정"이 아니라 "1mW로 나눗셈".** 1W=30dBm은 1W가 1mW의 1000배라서.
- **조합:** dB+dB=dB, dBm+dB=dBm, **dBm+dBm=❌**(전력끼리 곱 = W²). 전력 합은 선형으로.
- **전압은 20log** — dB는 전력이고 $P\propto V^2$ 라 제곱해서 넣기 때문. $20\log V = 10\log V^2$. **3dB=전력2배**, 전압2배는 6dB.
- **S 파라미터는 dB** (비율이라 dBm 불가). $S_{21}$은 전압비 → $20\log|S_{21}|$.

---

## 셀프 퀴즈

1. dB와 dBm의 근본 차이를 한 문장으로? (공통점 포함)
2. "+17dBm"은 절대값인가 상대값인가? 어떻게 판단하나?
3. 20dBm 신호 두 개를 합치면 40dBm(=10W)인가? 아니면 얼마인가?
4. 오실로스코프로 10mV, 20mV를 읽었다. 둘은 몇 dB 차이인가? 3dB? 6dB?
5. $S_{21}$은 전압비인가 전력비인가? 그래서 dB 변환은 10log인가 20log인가?
6. (심화) 50Ω에서 10mV(rms)는 몇 dBm인가?

<details>
<summary>답 보기</summary>

1. **둘 다 전력을 log로 보는 것**이고, 차이는 분모(기준). dB는 분모가 상황마다 바뀌는 상대값(몇 배), dBm은 분모가 1mW로 고정된 절대값(몇 W).
2. **절대값.** "몇 W?"에 답되면(17dBm ≈ 50mW) 절대값. dBm은 기준(1mW)이 이름에 박혀 있어 실제 전력이 나온다.
3. **아니다.** 40dBm=10W는 전력끼리 곱한 헛값. 진짜 합은 선형으로 $100+100=200\text{mW}=\mathbf{23\text{dBm}}$.
4. **6dB.** 전압이라 20log(20/10)=20log2=6dB. (전압 2배 = 전력 4배 → 6dB. 3dB는 전력 2배일 때.)
5. **전압비.** $|S_{21}|^2$이 전력비라서, dB로는 $20\log|S_{21}|$ (20log).
6. $P=\dfrac{(0.01)^2}{50}=2\times10^{-6}\text{W}=0.002\text{mW}$, $10\log(0.002)\approx\mathbf{-27\text{dBm}}$.

</details>

*이전 글 — [dB는 왜 쓸까](../why-decibel/). 다음은 S 파라미터를 제대로 파볼 차례.*
