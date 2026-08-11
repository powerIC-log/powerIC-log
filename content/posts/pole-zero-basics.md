+++
title = "[개념정리] 제어공학 기초 (2) — 극점과 영점, 보드선도를 읽고 그리는 법"
date = 2026-08-11T23:00:00+09:00
series = "이론/원리"
description = "루프이득 다음은 '위상은 왜 밀리는가'다. 극점과 영점이 이득과 위상에 무엇을 하는지, 회로에서 둘을 어떻게 구분하는지, 그리고 왜 이득만으로는 대역폭을 못 늘리는지 정리한다."
tags = ["개념정리", "극점", "영점", "보드선도", "control", "fundamentals"]
+++

## 들어가며

앞 글([제어공학 기초 (1)](../loop-gain-basics/))에서 루프이득과 위상여유까지 정리했다. 남은 질문은 하나였다.

> **"그럼 위상은 왜 밀리는가?"**

그 답이 **극점(pole)** 이고, 그것을 되돌리는 도구가 **영점(zero)** 이다. 이 둘만 잡으면 보드선도를 손으로 그릴 수 있고, 보상기 설계가 무엇을 하는 작업인지도 보인다.

> 이 글은 **앞으로 쓸 것 위주**로 압축했다. 위상 지연의 물리적 유도(캡 전류·적분 관계) 같은 것은 보상기 설계에 쓰이지 않으므로 다루지 않는다. 실무에서 필요한 것은 **규칙 두 줄과 판별법 하나**다.

---

## 1. 극점과 영점 — 두 줄이 전부다

> **극점(pole)** = 그 주파수부터 이득이 **−20dB/dec** 더 가파르게 떨어지고, 위상이 **−90°** 밀리는 지점
> **영점(zero)** = 그 주파수부터 이득이 **+20dB/dec** 덜 떨어지고, 위상이 **+90°** 돌아오는 지점

<svg viewBox="0 0 720 480" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>극점과 영점의 이득·위상 곡선</title>
  <desc>극점은 이득을 -20dB/dec로 꺾고 위상을 -90도로 밀며, 영점은 +20dB/dec로 세우고 위상을 +90도 되돌린다.</desc>
  <text x="30" y="24" font-size="13" font-weight="700" fill="#3b82f6">극점 (pole)</text>
  <text x="30" y="52" font-size="10.5" fill="currentColor" fill-opacity="0.7">이득</text>
  <line x1="70" y1="40" x2="70" y2="150" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="70" y1="150" x2="330" y2="150" stroke="currentColor" stroke-opacity="0.45"/>
  <path d="M70,70 L180,70 L330,130" fill="none" stroke="#3b82f6" stroke-width="2.8"/>
  <text x="238" y="98" font-size="10" fill="#3b82f6">−20dB/dec</text>
  <circle cx="180" cy="70" r="4.5" fill="#e0533d"/>
  <line x1="180" y1="70" x2="180" y2="150" stroke="#e0533d" stroke-dasharray="4 3" stroke-width="1.3"/>
  <text x="180" y="166" text-anchor="middle" font-size="11" font-weight="700" fill="#e0533d">fp</text>
  <text x="30" y="206" font-size="10.5" fill="currentColor" fill-opacity="0.7">위상</text>
  <line x1="70" y1="194" x2="70" y2="300" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="70" y1="300" x2="330" y2="300" stroke="currentColor" stroke-opacity="0.45"/>
  <text x="62" y="214" text-anchor="end" font-size="9.5" fill="currentColor" fill-opacity="0.7">0°</text>
  <text x="62" y="288" text-anchor="end" font-size="9.5" fill="currentColor" fill-opacity="0.7">−90°</text>
  <line x1="70" y1="284" x2="330" y2="284" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="3 3"/>
  <path d="M70,210 L120,211 L180,247 L250,284 L330,284" fill="none" stroke="#f59e0b" stroke-width="2.8"/>
  <circle cx="180" cy="247" r="4.5" fill="#e0533d"/>
  <line x1="180" y1="194" x2="180" y2="300" stroke="#e0533d" stroke-dasharray="4 3" stroke-width="1.3"/>
  <text x="188" y="243" font-size="9.5" fill="#e0533d">fp에서 −45°</text>
  <line x1="366" y1="16" x2="366" y2="440" stroke="currentColor" stroke-opacity="0.25" stroke-dasharray="5 5"/>
  <text x="396" y="24" font-size="13" font-weight="700" fill="#16a34a">영점 (zero)</text>
  <text x="396" y="52" font-size="10.5" fill="currentColor" fill-opacity="0.7">이득</text>
  <line x1="436" y1="40" x2="436" y2="150" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="436" y1="150" x2="696" y2="150" stroke="currentColor" stroke-opacity="0.45"/>
  <path d="M436,130 L546,130 L696,70" fill="none" stroke="#16a34a" stroke-width="2.8"/>
  <text x="600" y="112" font-size="10" fill="#16a34a">+20dB/dec</text>
  <circle cx="546" cy="130" r="4.5" fill="#e0533d"/>
  <line x1="546" y1="70" x2="546" y2="150" stroke="#e0533d" stroke-dasharray="4 3" stroke-width="1.3"/>
  <text x="546" y="166" text-anchor="middle" font-size="11" font-weight="700" fill="#e0533d">fz</text>
  <text x="396" y="206" font-size="10.5" fill="currentColor" fill-opacity="0.7">위상</text>
  <line x1="436" y1="194" x2="436" y2="300" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="436" y1="300" x2="696" y2="300" stroke="currentColor" stroke-opacity="0.45"/>
  <text x="428" y="214" text-anchor="end" font-size="9.5" fill="currentColor" fill-opacity="0.7">+90°</text>
  <text x="428" y="288" text-anchor="end" font-size="9.5" fill="currentColor" fill-opacity="0.7">0°</text>
  <line x1="436" y1="210" x2="696" y2="210" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="3 3"/>
  <path d="M436,284 L486,283 L546,247 L616,210 L696,210" fill="none" stroke="#f59e0b" stroke-width="2.8"/>
  <circle cx="546" cy="247" r="4.5" fill="#e0533d"/>
  <text x="554" y="243" font-size="9.5" fill="#e0533d">fz에서 +45°</text>
  <text x="30" y="410" font-size="12" fill="currentColor">두 곡선은 <tspan font-weight="700">같은 주파수(fp 또는 fz)를 중심으로 함께</tspan> 움직인다 — 하나의 극점/영점이 이득과 위상을 동시에 만든다</text>
  <text x="30" y="434" font-size="11.5" fill="currentColor" fill-opacity="0.7">위상은 그 주파수의 1/10 지점부터 밀리기 시작해, 해당 주파수에서 절반(±45°), 10배 지점에서 ±90°에 도달한다</text>
</svg>

**중요한 것은 "추가한다"는 점**이다. 극점이 2개면 −40dB/dec에 −180°가 되고, 극점 하나와 영점 하나가 같은 자리에 있으면 서로 상쇄되어 아무 일도 일어나지 않는다.

> **왜 "−3dB 되는 지점"을 정의로 삼으면 안 되는가:** 단일 극점에서는 맞지만, 곧 다룰 **LC 더블폴**에서는 그 주파수에서 −3dB가 아니라 오히려 **이득이 솟아오를 수도** 있고 위상도 −45°가 아니라 −90°다. **"−20dB/dec와 −90°를 추가하는 지점"** 이라는 정의는 어떤 경우에도 성립한다.

---

### 왜 하필 "극점"과 "영점"이라 부르나

이름이 뜬금없어 보이지만, 알고 나면 **둘을 헷갈릴 일이 없어진다.**

전달함수는 분수 꼴이다.

$$H = \frac{\text{분자}}{\text{분모}}$$

- **분모가 0이 되는 지점** → 분수가 **무한대**로 치솟는다 → 그래프를 그리면 그 자리에 **기둥(pole)** 이 솟은 것처럼 보인다 → **극점**
- **분자가 0이 되는 지점** → 분수가 **0**이 된다 → 값이 **영(zero)** 이 되는 자리 → **영점**

RC 저역통과 $H = 1/(1+sRC)$ 를 보면, $1+sRC = 0$ 즉 $s = -1/RC$ 에서 분모가 0이 된다. 그 크기 $1/RC$ 가 곧 극점 주파수다.

> **주의 — 보드선도에서 그 지점이 무한대로 솟지는 않는다.** 분모가 0이 되는 $s = -1/RC$ 는 **음수**이고, 우리가 측정하는 실제 주파수 축 위의 점이 아니다. 보드선도의 fp에서는 오히려 −3dB로 살짝 내려간다. **"기둥이 솟는다"는 것은 이름의 유래일 뿐**, 실제 측정 곡선에서 보이는 현상이 아니다.

**앞으로 공부할 때 이 이름이 실제로 도움이 되는 지점은 여기다.**

- **극점 = 분모** → 분모가 커지면 전체가 작아진다 → **이득을 깎는 쪽**
- **영점 = 분자** → 분자가 커지면 전체가 커진다 → **이득을 세우는 쪽**

즉 **극점은 내리는 놈, 영점은 올리는 놈**이라는 방향성이 이름 자체에 들어 있다. 위상도 같은 방향이다 — 극점은 −90°, 영점은 +90°. 보상기 설계에서 **"위상이 부족하니 영점을 하나 넣자"** 는 말이 자연스럽게 읽히는 이유다.

한 가지 더 — 전달함수를 인수분해하면 극점과 영점이 그대로 보인다.

$$H(s) = K \cdot \frac{(1 + s/\omega_{z1})(1 + s/\omega_{z2})\cdots}{(1 + s/\omega_{p1})(1 + s/\omega_{p2})\cdots}$$

**분자에 있는 항이 영점, 분모에 있는 항이 극점**이다. 데이터시트나 앱노트에서 보상기 전달함수를 만나면 이 형태로 쓰여 있으므로, **분자·분모만 보고 영점과 극점의 개수와 위치를 바로 읽을 수 있다.**

---

## 2. 극점 주파수는 "두 임피던스가 같아지는 곳"

극점이 생기려면 **에너지를 저장하는 소자(C 또는 L) + 저항**이 필요하다. 저장 소자는 채우고 비우는 데 시간이 걸려 빠른 신호를 못 따라가고, 저항은 그 속도를 정한다.

꺾이는 주파수는 **두 임피던스가 같아지는 지점**을 풀면 나온다.

| 조합 | 조건 | 결과 |
|---|---|---|
| **R과 C** | $1/(2\pi f C) = R$ | $f = \dfrac{1}{2\pi RC}$ |
| **R과 L** | $2\pi f L = R$ | $f = \dfrac{R}{2\pi L}$ |

시정수로 쓰면 둘 다 하나의 식이다.

$$f = \frac{1}{2\pi\tau}, \qquad \tau_{RC} = RC, \quad \tau_{LR} = \frac{L}{R}$$

**시정수가 크면(느린 회로) 꺾이는 주파수가 낮다.** "느린 회로일수록 일찍부터 못 따라간다"는 뜻이다.

- $R=1\text{k}\Omega$, $C=100\text{nF}$ → $\tau = 100\mu s$ → $f \approx 1.6\text{kHz}$
- $R=10\Omega$, $L=100\mu H$ → $\tau = 10\mu s$ → $f \approx 16\text{kHz}$

---

## 3. 극점이냐 영점이냐 — 판별법

**소자 종류만으로는 알 수 없다.** 같은 R과 C라도 회로 어디에 놓였느냐에 따라 극점도 되고 영점도 된다. 저장 소자와 저항이 만나면 **시정수 하나**가 생길 뿐이고, 그것이 극점이 될지 영점이 될지는 **위치**가 정한다.

판별 기준은 하나뿐이다.

> ## 주파수를 올렸을 때 **출력이 작아지면 극점**, **커지면(또는 작아지던 게 멈추면) 영점**

여기에 소자 성질만 대입하면 자동으로 결정된다. **C는 주파수가 오르면 통하고(임피던스↓), L은 막는다(임피던스↑).**

|  | **직렬** (신호 경로 위) | **Shunt** (GND로 가는 길) |
|---|---|---|
| **C** | **영점** | **극점** |
| **L** | **극점** | **영점** |

<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>배치에 따라 극점이 되는 경우와 영점이 되는 경우</title>
  <desc>직렬 C는 영점, shunt C는 극점, 직렬 L은 극점, shunt L은 영점이다.</desc>
  <text x="30" y="24" font-size="12.5" font-weight="700" fill="currentColor">주파수를 올렸을 때 출력이 <tspan fill="#e0533d">작아지면 극점</tspan> · <tspan fill="#16a34a">커지면 영점</tspan></text>
  <text x="40" y="58" font-size="12" font-weight="700" fill="#16a34a">직렬 C → 영점</text>
  <line x1="50" y1="100" x2="110" y2="100" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="110" y1="86" x2="110" y2="114" stroke="currentColor" stroke-opacity="0.6" stroke-width="2.2"/>
  <line x1="120" y1="86" x2="120" y2="114" stroke="currentColor" stroke-opacity="0.6" stroke-width="2.2"/>
  <line x1="120" y1="100" x2="200" y2="100" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <circle cx="180" cy="100" r="3.5" fill="currentColor"/>
  <text x="186" y="92" font-size="9.5" fill="currentColor" fill-opacity="0.7">out</text>
  <text x="42" y="94" font-size="9.5" fill="currentColor" fill-opacity="0.7">in</text>
  <line x1="180" y1="100" x2="180" y2="126" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <rect x="168" y="126" width="24" height="34" rx="3" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="200" y="148" font-size="10" fill="currentColor">R</text>
  <line x1="180" y1="160" x2="180" y2="176" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="170" y1="176" x2="190" y2="176" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="240" y="112" font-size="10.5" fill="currentColor" fill-opacity="0.75">고주파 → C가 통함</text>
  <text x="240" y="128" font-size="10.5" font-weight="700" fill="#16a34a">→ 출력 커짐 = 영점</text>
  <text x="40" y="192" font-size="10.5" fill="currentColor" fill-opacity="0.6">저주파엔 C가 막아서 출력이 작았음</text>
  <text x="400" y="58" font-size="12" font-weight="700" fill="#e0533d">Shunt C → 극점</text>
  <line x1="410" y1="100" x2="450" y2="100" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <rect x="450" y="88" width="34" height="24" rx="3" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="467" y="105" text-anchor="middle" font-size="10" fill="currentColor">R</text>
  <line x1="484" y1="100" x2="560" y2="100" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <circle cx="540" cy="100" r="3.5" fill="currentColor"/>
  <text x="546" y="92" font-size="9.5" fill="currentColor" fill-opacity="0.7">out</text>
  <text x="402" y="94" font-size="9.5" fill="currentColor" fill-opacity="0.7">in</text>
  <line x1="540" y1="100" x2="540" y2="130" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="526" y1="130" x2="554" y2="130" stroke="currentColor" stroke-opacity="0.6" stroke-width="2.2"/>
  <line x1="526" y1="138" x2="554" y2="138" stroke="currentColor" stroke-opacity="0.6" stroke-width="2.2"/>
  <line x1="540" y1="138" x2="540" y2="160" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="530" y1="160" x2="550" y2="160" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="400" y="192" font-size="10.5" fill="currentColor" fill-opacity="0.75">고주파 → C가 통함 = 신호가 GND로 샘</text>
  <text x="400" y="208" font-size="10.5" font-weight="700" fill="#e0533d">→ 출력 작아짐 = 극점</text>
  <line x1="30" y1="232" x2="700" y2="232" stroke="currentColor" stroke-opacity="0.25"/>
  <text x="40" y="266" font-size="12" font-weight="700" fill="#e0533d">직렬 L → 극점</text>
  <line x1="50" y1="308" x2="100" y2="308" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <rect x="100" y="296" width="40" height="24" rx="3" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="120" y="313" text-anchor="middle" font-size="10" fill="currentColor">L</text>
  <line x1="140" y1="308" x2="200" y2="308" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <circle cx="180" cy="308" r="3.5" fill="currentColor"/>
  <text x="186" y="300" font-size="9.5" fill="currentColor" fill-opacity="0.7">out</text>
  <line x1="180" y1="308" x2="180" y2="334" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <rect x="168" y="334" width="24" height="34" rx="3" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="200" y="356" font-size="10" fill="currentColor">R</text>
  <line x1="180" y1="368" x2="180" y2="384" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="170" y1="384" x2="190" y2="384" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="240" y="320" font-size="10.5" fill="currentColor" fill-opacity="0.75">고주파 → L이 막음</text>
  <text x="240" y="336" font-size="10.5" font-weight="700" fill="#e0533d">→ 출력 작아짐 = 극점</text>
  <text x="400" y="266" font-size="12" font-weight="700" fill="#16a34a">Shunt L → 영점</text>
  <line x1="410" y1="308" x2="450" y2="308" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <rect x="450" y="296" width="34" height="24" rx="3" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="467" y="313" text-anchor="middle" font-size="10" fill="currentColor">R</text>
  <line x1="484" y1="308" x2="560" y2="308" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <circle cx="540" cy="308" r="3.5" fill="currentColor"/>
  <text x="546" y="300" font-size="9.5" fill="currentColor" fill-opacity="0.7">out</text>
  <line x1="540" y1="308" x2="540" y2="334" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <rect x="528" y="334" width="24" height="34" rx="3" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="560" y="356" font-size="10" fill="currentColor">L</text>
  <line x1="540" y1="368" x2="540" y2="384" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="530" y1="384" x2="550" y2="384" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="400" y="404" font-size="10.5" fill="currentColor" fill-opacity="0.75">고주파 → L이 막음 = GND로 덜 샘</text>
  <text x="400" y="420" font-size="10.5" font-weight="700" fill="#16a34a">→ 출력 커짐 = 영점</text>
</svg>

### 영점은 "올리는 것"이 아니라 "떨어지던 것을 멈춰 세우는 것"

실무에서 만나는 영점은 이득을 실제로 끌어올리기보다 **떨어지던 기세를 멈추는** 형태가 훨씬 많다. 대표적인 것이 **캡에 직렬로 붙은 저항**이다.

- 캡 임피던스는 주파수가 오를수록 계속 떨어진다 → 이득도 계속 떨어진다
- 그런데 **직렬 저항 R 밑으로는 못 떨어진다** — R이 바닥을 만든다
- 떨어지던 것이 멈춘다 → 기울기가 **−20dB/dec에서 0으로** 바뀐다

**기울기가 −20에서 0으로 바뀐 것이 곧 +20이 더해진 것이고, 그것이 영점이다.** 위상도 함께 −90°에서 0°로 **+90° 회복**된다.

**실제 사례 두 가지:**
- **보상기의 R-C 직렬** — 우리가 의도적으로 배치하는 영점 (type-2에 1개, type-3에 2개)
- **출력캡의 ESR** — 캡에 딸려오는 기생저항이 만드는 공짜 영점, $f_z = 1/(2\pi \cdot ESR \cdot C)$

두 번째가 실무에서 중요하다. **ESR이 큰 캡(전해·POSCAP)은 낮은 주파수에 영점을 만들어 위상을 도와주지만, 저ESR 세라믹은 그 영점이 아주 높은 곳으로 도망가 도움이 되지 않는다.** "세라믹으로 바꿨더니 불안정해졌다"는 현상의 정체가 이것이다.

---

## 4. 점근선과 실제 곡선 — 같은 fp를 다르게 말한 것

"fp에서 꺾이기 시작한다"와 "fp에서 −3dB, −45°다"는 모순처럼 들리지만, **서로 다른 것을 가리키고 있을 뿐**이다.

<svg viewBox="0 0 700 560" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>점근선과 실제 곡선의 차이</title>
  <desc>점근선은 fp에서 각지게 꺾이고 실제 곡선은 부드럽게 휘어 fp에서 3dB 아래를 지난다.</desc>
  <text x="30" y="24" font-size="13" font-weight="700" fill="currentColor">점선 = 점근선(직선 근사) · 실선 = 실제 곡선</text>
  <text x="30" y="52" font-size="11.5" font-weight="700" fill="#3b82f6">이득</text>
  <line x1="90" y1="60" x2="90" y2="255" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="90" y1="255" x2="660" y2="255" stroke="currentColor" stroke-opacity="0.45"/>
  <path d="M90,90 L300,90 L640,238" fill="none" stroke="currentColor" stroke-opacity="0.55" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="120" y="82" font-size="10" fill="currentColor" fill-opacity="0.7">점근선 — fp에서 딱 꺾임</text>
  <path d="M90,90 L200,91 L250,93 L300,99 L350,112 L400,130 L500,174 L640,238" fill="none" stroke="#3b82f6" stroke-width="2.8"/>
  <text x="392" y="112" font-size="10.5" font-weight="700" fill="#3b82f6">실제 곡선 — 부드럽게 휘어짐</text>
  <line x1="300" y1="60" x2="300" y2="470" stroke="#e0533d" stroke-width="1.6" stroke-dasharray="4 3"/>
  <text x="300" y="52" text-anchor="middle" font-size="12" font-weight="700" fill="#e0533d">fp</text>
  <line x1="284" y1="90" x2="284" y2="99" stroke="#16a34a" stroke-width="2.4"/>
  <text x="278" y="88" text-anchor="end" font-size="10.5" font-weight="700" fill="#16a34a">3dB 차이</text>
  <circle cx="300" cy="90" r="4" fill="currentColor" fill-opacity="0.6"/>
  <circle cx="300" cy="99" r="4.5" fill="#3b82f6"/>
  <text x="310" y="104" font-size="10" fill="#3b82f6">실제로는 여기 (−3dB)</text>
  <text x="30" y="300" font-size="11.5" font-weight="700" fill="#f59e0b">위상</text>
  <line x1="90" y1="290" x2="90" y2="470" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="90" y1="470" x2="660" y2="470" stroke="currentColor" stroke-opacity="0.45"/>
  <text x="82" y="314" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">0°</text>
  <text x="82" y="364" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">−45°</text>
  <text x="82" y="414" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">−90°</text>
  <line x1="90" y1="360" x2="660" y2="360" stroke="currentColor" stroke-opacity="0.3" stroke-dasharray="3 3"/>
  <line x1="90" y1="410" x2="660" y2="410" stroke="currentColor" stroke-opacity="0.3" stroke-dasharray="3 3"/>
  <path d="M90,310 L150,311 L180,316 L220,330 L260,345 L300,360 L340,375 L380,388 L420,400 L470,407 L560,410 L640,410" fill="none" stroke="#f59e0b" stroke-width="2.8"/>
  <circle cx="300" cy="360" r="5" fill="#e0533d"/>
  <text x="310" y="356" font-size="10.5" font-weight="700" fill="#e0533d">fp에서 이미 −45°</text>
  <line x1="162" y1="290" x2="162" y2="470" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="3 3"/>
  <text x="158" y="304" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">fp/10</text>
  <text x="120" y="330" font-size="9.5" fill="currentColor" fill-opacity="0.7">여기부터</text>
  <text x="120" y="342" font-size="9.5" fill="currentColor" fill-opacity="0.7">밀리기 시작</text>
  <line x1="437" y1="290" x2="437" y2="470" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="3 3"/>
  <text x="443" y="304" font-size="10" fill="currentColor" fill-opacity="0.7">fp×10 → −90° 도달</text>
  <text x="30" y="506" font-size="12" fill="currentColor"><tspan font-weight="700">fp는 주파수 축 위의 점 하나</tspan></text>
  <text x="30" y="528" font-size="12" fill="currentColor">"꺾이기 시작한다"는 <tspan font-weight="700">점근선</tspan> 얘기 · "−3dB, −45°"는 <tspan font-weight="700">실제 곡선</tspan>이 그 점에서 갖는 값</text>
</svg>

**실무에서는 점근선으로 그린다.** 손으로 빠르게 스케치할 수 있고, 3dB 차이는 설계 판단을 바꾸지 않는다. 정밀한 값은 시뮬레이션이 그려준다.

**위상에서 특히 주의할 것** — 위상은 **fp에 도달하기 훨씬 전부터 밀리기 시작한다.** 대략 **fp/10에서 시작해 fp에서 −45°, fp×10에서 −90°** 에 도달한다. 그래서 **극점이 fc보다 한참 아래에 있어도 fc에서의 위상여유를 이미 갉아먹고 있다.**

---

## 5. 적분기 — 극점이 0Hz에 있는 경우

에러앰프(보상기)의 핵심 부품이므로 따로 볼 가치가 있다.

전류원이 캡을 구동하듯 **저항 없이** 캡만 있으면, 꺾이는 지점이 **0Hz까지 밀려나** 평평한 구간이 아예 사라진다. 이것을 **적분기** 또는 "원점의 극점"이라 부른다.

<svg viewBox="0 0 740 470" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>RC 극점과 적분기 비교</title>
  <desc>RC는 fp에서 꺾이지만 적분기는 꺾임 없이 처음부터 -20dB/dec로 내려가고 위상은 -90도 고정이다.</desc>
  <text x="30" y="26" font-size="13" font-weight="700" fill="#3b82f6">① RC (저항 있음)</text>
  <text x="30" y="44" font-size="10.5" fill="currentColor" fill-opacity="0.7">fp에서 꺾인다</text>
  <text x="30" y="70" font-size="11" font-weight="700" fill="currentColor">이득</text>
  <line x1="60" y1="76" x2="60" y2="180" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="60" y1="180" x2="330" y2="180" stroke="currentColor" stroke-opacity="0.45"/>
  <path d="M60,100 L170,100 L330,160" fill="none" stroke="#3b82f6" stroke-width="2.8"/>
  <text x="72" y="94" font-size="10" fill="currentColor" fill-opacity="0.7">평평</text>
  <text x="238" y="128" font-size="10" fill="#3b82f6">−20dB/dec</text>
  <circle cx="170" cy="100" r="5" fill="#e0533d"/>
  <line x1="170" y1="100" x2="170" y2="180" stroke="#e0533d" stroke-dasharray="4 3" stroke-width="1.4"/>
  <text x="170" y="196" text-anchor="middle" font-size="11" font-weight="700" fill="#e0533d">fp</text>
  <text x="30" y="238" font-size="11" font-weight="700" fill="currentColor">위상</text>
  <line x1="60" y1="244" x2="60" y2="348" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="60" y1="348" x2="330" y2="348" stroke="currentColor" stroke-opacity="0.45"/>
  <text x="52" y="264" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">0°</text>
  <text x="52" y="334" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">−90°</text>
  <line x1="60" y1="330" x2="330" y2="330" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="3 3"/>
  <path d="M60,260 L110,260 L170,295 L240,330 L330,330" fill="none" stroke="#3b82f6" stroke-width="2.8"/>
  <circle cx="170" cy="295" r="4.5" fill="#e0533d"/>
  <text x="178" y="291" font-size="10" fill="#e0533d">fp에서 −45°</text>
  <text x="30" y="400" font-size="11.5" fill="currentColor">저주파: 캡 임피던스 &gt; R → 평평</text>
  <text x="30" y="420" font-size="11.5" fill="currentColor">고주파: 캡 임피던스 &lt; R → 떨어짐</text>
  <text x="30" y="444" font-size="11.5" font-weight="700" fill="#e0533d">→ 둘이 같아지는 곳(fp)에서 꺾인다</text>
  <line x1="370" y1="16" x2="370" y2="460" stroke="currentColor" stroke-opacity="0.25" stroke-dasharray="5 5"/>
  <text x="400" y="26" font-size="13" font-weight="700" fill="#16a34a">② 적분기 (저항 없음)</text>
  <text x="400" y="44" font-size="10.5" fill="currentColor" fill-opacity="0.7">꺾이는 곳이 없다</text>
  <text x="400" y="70" font-size="11" font-weight="700" fill="currentColor">이득</text>
  <line x1="430" y1="76" x2="430" y2="180" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="430" y1="180" x2="700" y2="180" stroke="currentColor" stroke-opacity="0.45"/>
  <path d="M430,86 L700,172" fill="none" stroke="#16a34a" stroke-width="2.8"/>
  <text x="520" y="112" font-size="10" fill="#16a34a">−20dB/dec (계속)</text>
  <text x="436" y="80" font-size="9.5" fill="#16a34a">DC에서 무한대</text>
  <text x="400" y="238" font-size="11" font-weight="700" fill="currentColor">위상</text>
  <line x1="430" y1="244" x2="430" y2="348" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="430" y1="348" x2="700" y2="348" stroke="currentColor" stroke-opacity="0.45"/>
  <text x="422" y="264" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">0°</text>
  <text x="422" y="334" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">−90°</text>
  <line x1="430" y1="330" x2="700" y2="330" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="3 3"/>
  <path d="M430,330 L700,330" fill="none" stroke="#16a34a" stroke-width="3.2"/>
  <text x="510" y="318" font-size="10.5" font-weight="700" fill="#16a34a">−90° 고정 (변화 없음)</text>
  <text x="400" y="400" font-size="11.5" fill="currentColor">캡만 있으면 V = I / (2πfC)</text>
  <text x="400" y="420" font-size="11.5" fill="currentColor">→ 주파수 10배마다 1/10로 계속 감소</text>
  <text x="400" y="444" font-size="11.5" font-weight="700" fill="#16a34a">→ 비교할 R이 없어 꺾일 곳이 없다</text>
</svg>

$f_p = 1/(2\pi RC)$ 에서 **R을 키울수록 꺾임이 왼쪽으로 밀린다.** R이 무한대면 꺾임이 0Hz에 놓이고, 평평한 구간이 사라진 것이 적분기다.

**왜 중요한가** — 에러앰프는 적분기다. 덕분에 **DC 이득이 매우 커서 정상상태 오차가 0에 가깝지만**(출력이 기준전압과 거의 같아지는 이유), 대신 **위상을 처음부터 −90° 깔고 시작한다.** 앞 글에서 "루프이득을 끌어내리는 주범은 보상기"라고 한 것이 이 적분기다.

---

## 6. 설계 관점 — 두 손잡이의 성격이 다르다

|  | fc(크로스오버) | 위상 |
|---|---|---|
| **이득(gain)** | 바꿈 (곡선 평행이동) | **안 바꿈** |
| **극점 · 영점** | 바꿈 (기울기 변경) | 바꿈 |

**이득은 위상을 건드리지 않는다.** 위상을 만드는 것은 극점과 영점뿐이고, 이득을 K배 하는 것은 주파수와 무관한 상수배이기 때문이다.

이 성질 때문에 실제 설계 순서가 정해진다.

1. **극점·영점으로 모양을 먼저 잡는다** — fc 근처에서 위상을 얼마나 확보할지 결정 (거친 조정)
2. **마지막에 이득으로 fc만 미세조정한다** — 위상은 안 건드리니 앞서 확보한 위상이 그대로 유지됨 (미세 조정)

순서를 반대로 하면 헛수고가 된다. 이득으로 fc를 맞춰놓아도 나중에 영점을 옮기면 fc가 다시 틀어지기 때문이다.

> **앞 글의 결론과 이어진다:** 이득만 올리면 이득 곡선은 위로 평행이동해 fc가 오른쪽으로 가지만 **위상 곡선은 그대로**여서 위상여유를 그대로 잃는다. **빠르면서도 안정하려면 위상 곡선 자체를 끌어올려야 하고, 그 도구가 영점이다.**

한 가지 실전 주의 — 이론상 "이득만 바꾸면 위상 불변"이지만, **실제 회로에서는 저항 하나를 바꾸면 이득과 영점이 함께 움직이는 경우가 많다.** 보상기의 $f_z = 1/(2\pi RC)$ 에서 그 R이 이득도 결정하기 때문이다. 시뮬레이션에서 "이득만 올렸는데 위상도 변했다" 싶으면 대개 이것이다.

---

## Key takeaways

- **극점** = 이득 **−20dB/dec**, 위상 **−90°** 추가 / **영점** = **+20dB/dec**, **+90°** 추가. 이 두 줄이 전부다.
- 이름의 유래: **극점은 분모(0이 되면 무한대로 솟음), 영점은 분자(0이 되면 값이 0)**. 그래서 **극점은 내리는 놈, 영점은 올리는 놈**이다. 전달함수의 분자·분모만 봐도 개수와 위치를 읽을 수 있다.
- 정의는 **"기울기와 위상을 얼마나 추가하는가"** 로 잡는다. "−3dB 지점"으로 잡으면 LC 더블폴에서 깨진다.
- 꺾이는 주파수는 **두 임피던스가 같아지는 곳**: $f=1/(2\pi RC)$ 또는 $R/(2\pi L)$, 통합하면 $f = 1/(2\pi\tau)$.
- 저장 소자 + 저항 = **시정수 하나**. 그것이 극점이 될지 영점이 될지는 **회로상의 위치**가 정한다.
- 판별법: **주파수를 올렸을 때 출력이 작아지면 극점, 커지면(또는 작아지던 것이 멈추면) 영점.**
- **직렬 C = 영점, shunt C = 극점, 직렬 L = 극점, shunt L = 영점.**
- 영점은 흔히 **"떨어지던 기세를 멈춰 세우는" 형태**로 나타난다 (보상기 R-C 직렬, 출력캡 ESR).
- 위상은 **fp/10부터 밀리기 시작해 fp×10에서 −90°** 에 도달한다 — 멀리 있는 극점도 fc의 위상여유를 갉아먹는다.
- **적분기 = 극점이 0Hz.** DC 이득을 벌어주는 대신 위상 −90°를 깔고 시작한다.
- **이득은 fc만, 극점·영점은 fc와 위상 둘 다** 움직인다 → 모양 먼저, 이득은 마지막에.

---

## 퀴즈

**Q1.** 누군가 "극점이 뭐냐"고 물었다. 한 문장으로 답한다면?

<details>
<summary>답 보기</summary>

**"그 주파수부터 이득이 −20dB/dec 더 가파르게 떨어지고 위상이 −90° 더 밀리는 지점"** 이다.

"−3dB가 되는 주파수"라고 답하면 단일 극점에서만 맞다. LC 더블폴에서는 그 주파수의 이득이 −3dB가 아니라 오히려 솟아오를 수 있고 위상도 −90°다.
</details>

**Q2.** 저항과 커패시터가 만나면 항상 극점이 생기는가?

<details>
<summary>답 보기</summary>

**아니다.** 생기는 것은 **시정수 하나**이고, 그것이 극점이 될지 영점이 될지는 **회로상의 위치**가 정한다.

- **C가 GND로 가는 길에 있으면(shunt)** → 고주파에서 신호를 GND로 빼돌림 → 출력 감소 → **극점**
- **C가 신호 경로에 직렬로 있으면** → 고주파에서 통과시킴 → 출력 증가 → **영점**
</details>

**Q3.** $R=1\text{k}\Omega$, $C=100\text{nF}$ 인 RC 저역통과의 꺾임 주파수는?

<details>
<summary>답 보기</summary>

$\tau = RC = 100\mu s$ → $f = 1/(2\pi\tau) \approx$ **1.6kHz**

(캡 임피던스가 R과 같아지는 주파수를 푼 것과 같다.)
</details>

**Q4.** 출력캡을 ESR이 큰 전해 캡에서 저ESR 세라믹으로 바꿨더니 루프가 불안정해졌다. 왜일까?

<details>
<summary>답 보기</summary>

**ESR 영점이 사라졌기 때문이다.**

캡에 직렬로 붙은 ESR은 $f_z = 1/(2\pi \cdot ESR \cdot C)$ 에 영점을 만들어 **위상을 +90° 되돌려주고 있었다.** ESR이 작아지면 그 영점이 훨씬 높은 주파수로 이동해 crossover 근처에서 도움을 주지 못한다. 결과적으로 위상여유가 깎여 불안정해진다.
</details>

**Q5.** 보상기 이득만 올려서 fc를 높였다. 위상여유는 어떻게 되고, 왜 그런가?

<details>
<summary>답 보기</summary>

**위상여유가 줄어든다** (많이 올리면 0이 되어 발진 경계까지 간다).

이득 변경은 **주파수와 무관한 상수배**라 이득 곡선을 위로 평행이동시킬 뿐 **위상 곡선을 전혀 움직이지 못한다.** 그런데 새 fc는 더 높은 주파수이고, 그 지점의 위상은 이미 더 많이 밀려 있다. 그래서 "속도를 얻은 만큼 안정도를 잃는" 결과가 된다.

빠르면서도 안정하려면 **영점을 배치해 위상 곡선 자체를 끌어올려야** 한다.
</details>

**Q6.** 전달함수를 봤더니 분자에 항이 하나, 분모에 항이 둘 있었다. 극점과 영점은 각각 몇 개이고, 고주파에서 이득 기울기는 얼마인가?

<details>
<summary>답 보기</summary>

**영점 1개, 극점 2개.** (분자 = 영점, 분모 = 극점)

기울기는 극점 2개가 −40dB/dec, 영점 1개가 +20dB/dec를 더하므로 최종적으로 **−20dB/dec**. 위상도 마찬가지로 −180° + 90° = **−90°** 로 수렴한다.

이것이 실제로 벅 파워스테이지의 모습이다 — **LC 더블폴 2개 + ESR 영점 1개.**
</details>

---

*다음 글에서는 이 규칙들을 실제 벅 컨버터 파워스테이지에 적용한다 — **LC 더블폴**이 만드는 −40dB/dec와 −180°, ESR 영점, 그리고 voltage mode에서 **type-3 보상**이 왜 영점을 두 개나 쓰는지.*
