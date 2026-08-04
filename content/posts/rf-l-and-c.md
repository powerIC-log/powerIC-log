+++
title = "[개념정리] RF 관점에서의 L과 C — 주파수로 소자를 다시 보다"
date = 2026-08-04T10:00:00
series = "이론/원리"
description = "파워에서 L·C는 에너지 저장 소자였다. RF에선 주파수를 고르는 도구다. S21로 보는 주파수 특성부터 스미스차트 위치, 공진과 필터, 그리고 실제 소자의 한계인 SRF와 Q까지."
tags = ["개념정리", "inductor", "capacitor", "SRF", "RF", "fundamentals"]
+++

## 들어가며

파워 컨버터에서 L과 C는 **에너지 저장 소자**다. 벅의 인덕터는 전류를 쌓고, 출력 캡은 리플을 받친다. 그런데 RF 책을 펴니 같은 소자를 완전히 다른 눈으로 본다 — **주파수를 통과시키거나 막는 도구**로.

이 관점 전환이 이번 챕터의 전부다. 정의를 외우는 게 아니라, L과 C가 **주파수에 따라 어떻게 행동하는지**를 잡는다.

> **참고 도서** — 《RF 기초강의실 (The Basic of RF)》 제2장 「RF 회로의 기초」, Chapter 02 *RF관점에서의 L과 C* (p.46~58).

---

## 1. 정의보다 S21 — 주파수 특성으로 보기

책은 L과 C를 사전적 정의 대신 **S21 투과 특성**으로 정의한다. 수동소자이므로 S21이 0dB에 가까울수록 손실 없이 통과된다는 뜻이다.

<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>인덕터와 캐패시터의 S21 주파수 특성</title>
  <desc>인덕터는 주파수가 올라갈수록 S21이 떨어지고, 캐패시터는 반대로 올라간다.</desc>
  <g>
    <text x="170" y="24" text-anchor="middle" font-size="12.5" fill="#3b82f6" font-weight="600">인덕터 — 고주파 억제</text>
    <line x1="60" y1="50" x2="60" y2="200" stroke="currentColor" stroke-opacity="0.35"/>
    <line x1="60" y1="200" x2="300" y2="200" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="52" y="58" text-anchor="end" font-size="10.5" fill="currentColor" fill-opacity="0.6">0dB</text>
    <path d="M60 55 Q 140 60 200 110 T 295 190" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
    <path d="M60 55 Q 110 62 160 130 T 250 195" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-opacity="0.5"/>
    <text x="255" y="150" font-size="10.5" fill="#3b82f6" fill-opacity="0.7">L 클수록↓</text>
    <text x="180" y="222" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity="0.6">freq →</text>
  </g>
  <g transform="translate(340,0)">
    <text x="170" y="24" text-anchor="middle" font-size="12.5" fill="#e0533d" font-weight="600">캐패시터 — 고주파 통과</text>
    <line x1="60" y1="50" x2="60" y2="200" stroke="currentColor" stroke-opacity="0.35"/>
    <line x1="60" y1="200" x2="300" y2="200" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="52" y="58" text-anchor="end" font-size="10.5" fill="currentColor" fill-opacity="0.6">0dB</text>
    <path d="M60 195 Q 120 180 170 100 T 295 55" fill="none" stroke="#e0533d" stroke-width="2.5"/>
    <path d="M60 195 Q 150 190 210 120 T 295 70" fill="none" stroke="#e0533d" stroke-width="1.5" stroke-opacity="0.5"/>
    <text x="150" y="85" font-size="10.5" fill="#e0533d" fill-opacity="0.7">C 클수록↑</text>
    <text x="180" y="222" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity="0.6">freq →</text>
  </g>
</svg>

책의 재정의가 명쾌하다:

> **L (Inductance)** — 주파수가 올라갈수록 얼마나 **고주파의 흐름을 방해하는가**
> **C (Capacitance)** — 주파수가 올라갈수록 얼마나 **고주파의 흐름을 원활하게 하는가**

임피던스로 말하면 L은 $j\omega L$ 이라 주파수와 함께 커지고(막힘), C는 $1/j\omega C$ 라 주파수와 함께 작아진다(통함). **L과 C는 정반대의 특성**이고, 이 반대 성질을 조합해 주파수를 골라내는 게 RF 회로다.

---

## 2. L — 전류의 변화를 막는 관성

인덕턴스는 **전류가 흐를 때 그 전류의 변화를 막으려는 성질**이다. 일종의 관성이다.

- 전류가 흐르면 선로 주위에 자기장이 생긴다
- 전류가 변하면 자기장도 따라 변해야 하는데, **한 박자 늦는다**
- 그 늦음이 변화를 방해한다 → DC(변화 없음)는 잘 통과, AC는 방해받음
- 주파수가 높을수록(변화가 빠를수록), L이 클수록(자기장이 많을수록) 더 못 따라간다

### 인덕턴스는 어디서 발생하나

책의 자문자답: **"길이를 가지는 모든 선로에서 발생한다."**

선로만 길면 인덕턴스는 죽죽 늘어난다. 그런데 무작정 길게 만들 수 없으니 **둘둘 감아 coil**로 만든 것이고, 감으면 선로 길이만으로 얻는 것보다 L이 더 커진다 — **mutual inductance(상호유도)** 때문이다.

- 옆 선로와 전류 방향이 **같으면** → 자기장이 더해져 **L 증가**
- 방향이 **다르면** → 자기장이 상쇄돼 **L 감소**

### 패턴으로 만드는 인덕터 3종

공간 제약이 있는 RF에선 선로 패턴으로 L을 구현한다.

| 형태 | 원리 | 장단점 |
|---|---|---|
| **Spiral** | 한 방향 동심원 → mutual inductance가 **더해짐** | 작은 크기로 큰 L ↔ loss 심함, 중앙 인출에 air bridge/다층 필요 |
| **Meander** | 뱀처럼 왕복 → mutual inductance가 **상쇄됨** | air bridge 불필요 ↔ 크기 대비 L이 작음 |
| **Single loop** | 고리 하나 | 성능·모양 모두 아쉬움, filtering 특성으로 가끔 사용 |

---

## 3. C — 변화가 있을 때만 통과시키는 소자

캐패시터는 실제 금속선 입장에선 **끊어져 있는 소자**다. 그런데 어떻게 신호가 통과할까 — 열쇠는 끊어진 도체 사이의 **유전체**다.

- 한쪽에 전극이 형성되면 유전체 내부가 **분극**되고, 건너편 금속판에 반대 전극을 유도한다
- **DC**: 처음 인가된 순간에만 분극이 일어나고 이내 끝난다 → 전달 불가 (그 순간만 잠깐 흐르는 듯하다 끊김)
- **AC**: 분극이 사라지기 전에 극성이 바뀐다 → **변화의 형상이 건너편으로 계속 전달**된다
- 얼마나 빠른 변화까지 잘 전달하느냐를 나타내는 지표가 capacitance

즉 C는 **"전류/전압의 변화가 있을 때만 신호를 통과시키는"** 소자다. L과 정확히 반대다.

---

## 4. 스미스차트에서의 L과 C

복소 임피던스 식을 보면 위치가 바로 읽힌다.

$$Z = R + j\omega L + \frac{1}{j\omega C}$$

- L은 $+j\omega L$ → **허수부 +** → 스미스차트 **위쪽**
- C는 $\frac{1}{j\omega C} = -\frac{j}{\omega C}$ → **허수부 −** → **아래쪽**

그리고 책 그림에서 이상적인 L·C가 **R=1 원 위**를 타는 이유 — 그 그래프는 입출력에 50Ω 포트를 단 pass-through 상태의 S11이다. port1에서 들여다본 임피던스는

$$Z_{in} = \underbrace{50\Omega}_{\text{반대편 종단이 준 실수부}} + \underbrace{j\omega L}_{\text{소자가 보태는 허수부}}$$

이상적인 소자는 저항이 없어 실수부에 아무것도 못 보탠다. 실수부가 50Ω에 고정된 채 허수부만 변하니, **정규화된 R=1 원을 그대로 따라 움직인다.** 원에서 벗어난다면 저항 성분(손실)이 붙었다는 뜻이다.

---

## 5. 공진, 그리고 필터

정반대 특성의 L과 C를 붙이면? **특정 주파수에서 둘이 평형을 이루는 지점**이 생긴다 — 그게 **공진(resonance)** 이고, 특정 주파수만 골라내거나 걸러내는 **주파수 선택 특성**이 나타난다.

필터는 이 L·C의 직/병렬 조합이다. LPF(저역통과 필터)로 보면:

<svg viewBox="0 0 680 250" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>LPF에서 직렬 L과 병렬 C의 역할</title>
  <desc>직렬 인덕터가 고주파를 차단하고, 새어온 고주파는 병렬 캐패시터를 통해 접지로 빠진다.</desc>
  <line x1="40" y1="100" x2="200" y2="100" stroke="currentColor" stroke-width="1.8"/>
  <path d="M200 100 A 12 12 0 0 1 224 100 A 12 12 0 0 1 248 100 A 12 12 0 0 1 272 100 A 12 12 0 0 1 296 100" fill="none" stroke="currentColor" stroke-width="1.8"/>
  <text x="248" y="72" text-anchor="middle" font-size="12.5" font-weight="600" fill="#3b82f6">직렬 L</text>
  <line x1="296" y1="100" x2="560" y2="100" stroke="currentColor" stroke-width="1.8"/>
  <line x1="440" y1="100" x2="440" y2="140" stroke="currentColor" stroke-width="1.8"/>
  <line x1="420" y1="140" x2="460" y2="140" stroke="currentColor" stroke-width="2.2"/>
  <line x1="420" y1="152" x2="460" y2="152" stroke="currentColor" stroke-width="2.2"/>
  <line x1="440" y1="152" x2="440" y2="186" stroke="currentColor" stroke-width="1.8"/>
  <line x1="424" y1="186" x2="456" y2="186" stroke="currentColor" stroke-width="1.6"/>
  <line x1="430" y1="193" x2="450" y2="193" stroke="currentColor" stroke-width="1.4"/>
  <line x1="436" y1="200" x2="444" y2="200" stroke="currentColor" stroke-width="1.2"/>
  <text x="500" y="146" font-size="12.5" font-weight="600" fill="#e0533d">병렬 C</text>
  <text x="70" y="88" font-size="11.5" fill="currentColor" fill-opacity="0.75">① 저주파는 통과</text>
  <text x="70" y="128" font-size="11.5" fill="#3b82f6">② 고주파는 L에서 차단</text>
  <text x="330" y="176" font-size="11.5" fill="#e0533d">③ 새어온 고주파는 C를 타고 접지로</text>
  <text x="575" y="104" font-size="11.5" fill="currentColor" fill-opacity="0.75">→ 저주파만 출력</text>
</svg>

- **직렬 L**: 저주파는 통과시키고 고주파는 잘 못 통과하게 막는다
- **병렬 C**: 그나마 통과한 고주파 성분은 C로 가고 싶어 해서 **접지로 흘러 죽는다**
- 결국 출력엔 저주파만 남는다. HPF는 L과 C의 위치를 정반대로 바꾸면 된다

한 가지 명심할 점 — filter는 꼭 lumped 소자로만 만드는 게 아니라, **inductance/capacitance를 유발할 수 있는 구조라면 무엇이든** 조합해 만들 수 있다.

---

## 6. SRF — 실제 소자의 배신

여기까지는 전부 ideal한 경우다. 실제 소자에는 **SRF(Self Resonating Frequency, 자기공진주파수)** 가 있다.

<svg viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>실제 인덕터의 S21 — SRF에서 역할이 뒤바뀐다</title>
  <desc>SRF 이전은 인덕터로, 이후는 캐패시터로 동작하는 V자형 S21 곡선.</desc>
  <line x1="60" y1="40" x2="60" y2="190" stroke="currentColor" stroke-opacity="0.35"/>
  <line x1="60" y1="190" x2="620" y2="190" stroke="currentColor" stroke-opacity="0.35"/>
  <text x="52" y="50" text-anchor="end" font-size="10.5" fill="currentColor" fill-opacity="0.6">0dB</text>
  <path d="M60 50 Q 180 60 300 120 L 340 168 L 380 120 Q 480 62 615 52" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <line x1="340" y1="168" x2="340" y2="205" stroke="#e0533d" stroke-width="1.5" stroke-dasharray="3 3"/>
  <text x="340" y="222" text-anchor="middle" font-size="12" font-weight="600" fill="#e0533d">SRF</text>
  <text x="180" y="105" text-anchor="middle" font-size="11.5" fill="currentColor" fill-opacity="0.75">Inductive 영역</text>
  <text x="180" y="122" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.55">주파수↑ 차단↑ = L로 동작</text>
  <text x="500" y="105" text-anchor="middle" font-size="11.5" fill="currentColor" fill-opacity="0.75">Capacitive 영역</text>
  <text x="500" y="122" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.55">주파수↑ 통과↑ = C로 동작</text>
</svg>

**특정 주파수를 넘으면 소자의 역할이 반대로 뒤집힌다.** 인덕터가 캐패시터로, 캐패시터가 인덕터로 동작해 버리는 황당한 상황이다. 역할이 깨지는 그 주파수가 공진점 같아서 Self Resonating Frequency라 부른다.

**왜 생기나 — 기생 성분 때문이다.** spiral inductor를 보면 선로 길이에 의한 정상적인 L 성분과 함께, **금속 간격에 의한 기생 capacitance**가 공존한다. 주파수가 올라가면 어느 지점부터 기생 성분이 이겨버린다. 캐패시터도 마찬가지로 기생 inductance를 갖는다.

실무 포인트:

- 모든 L·C는 **SRF보다 충분히 낮은 주파수에서만** 사용해야 한다 (특히 인덕터가 더 위험)
- **소자 값이 커질수록 물리 구조도 커져 기생 성분이 커지고 → SRF는 점점 낮아진다** (쓸 수 있는 주파수 영역이 좁아진다)
- 일반 lumped 소자의 SRF는 수 GHz 대밖에 안 돼서, 아주 높은 주파수에선 lumped element를 못 쓰고 **microstrip 같은 분산소자**로 L·C를 구현하게 된다

---

## 7. Q — 소자의 품질

$$Q = \frac{X\ (\text{Reactance})}{R\ (\text{Resistance})} = \frac{\text{임피던스 허수부 (L, C)}}{\text{임피던스 실수부 (저항)}}$$

의미는 **소자의 loss가 얼마인가**다.

- **허수부(X)** = L·C 같은 **무손실 저장 성분.** 전기장/자기장 형태로 에너지를 모았다가 되돌려준다
- **실수부(R)** = 저항에 의한 **손실.** 에너지를 열로 태워 없앤다

이상적으로는 저항이 없어야 하지만 만들다 보면 기생저항이 생겨 열손실이 발생한다. 그래서 **Q가 클수록 loss가 적은 좋은 소자**다 (물론 비싸다). Q는 주파수에 따라, 소자 값에 따라 다르다.

스미스차트로 보면 — Q가 떨어진다(R 증가) = 실수부가 커진다 = **R=1 정합원에서 벗어나 멀어진다.** 그리고 인덕터가 어느 주파수를 넘어 아래쪽 capacitance 영역으로 내려가 버리는 그 지점이 바로 SRF다.

> **역할 구분:** SRF는 소자의 **이용 범위**를 알려주는 지표, Q는 소자의 **품질**을 평가하는 지표.

---

## 8. RF 회로에서 L과 C의 다섯 가지 용도

간단한 amp 회로에서 L·C가 실제로 쓰이는 자리들이다.

| 용도 | 소자 | 역할 |
|---|---|---|
| **Impedance Matching** | L, C | Tr의 입출력 임피던스를 50Ω 포트와 정합 |
| **DC Block** | C | 바이어스용 직류가 다른 곳으로 새지 않게 입출력단에서 차단 |
| **RF Choke** | L | DC 전원선으로 RF 교류가 유입되지 않게 차단 (L은 DC 통과·AC 차단) |
| **Bypass** | C | 전원단 병렬 C로 새어나온 교류를 접지로 흘려 발진 방지 |
| **Degeneration** | L, C | Tr 접지 쪽에 달아 gain을 희생하고 안정도·선형성 확보 |

> Degeneration은 파워 쪽에서도 익숙한 개념이다 — 이미터/소스에 소자를 달아 이득을 깎는 대신 안정성을 얻는 그 트레이드오프다.

### 마지막으로 — L과 C는 "소자"가 아니라 "성분"이다

책이 끝에 강조하는 것: 고의로 만들지 않아도 **긴 선로에선 inductance가, 근접한 두 금속선 사이에선 capacitance(커플링)가 저절로 발생한다.** inductor/capacitor 소자는 그 성분을 고의로 강화해둔 물건일 뿐이다. 이 기생 성분들은 주파수가 높을수록 민감해지고, 그래서 RF 설계가 까다로워지며 microstrip 같은 분산회로가 필요해진 것이다.

---

## Key takeaways

- RF에서 L·C는 에너지 저장 소자가 아니라 **주파수를 통과/차단하는 도구**다. L은 고주파를 막고($j\omega L$), C는 고주파를 통과시킨다($1/j\omega C$). 정반대 특성.
- **L = 전류 변화를 막는 관성.** 길이를 가진 모든 선로에서 발생하고, coil로 감으면 mutual inductance로 L이 커진다 (같은 방향 전류 = 더해짐).
- **C = 변화가 있을 때만 통과.** 유전체 분극이 변화를 건너편으로 전달한다. DC는 첫 순간만 → 차단.
- 스미스차트에서 **L은 위(+j), C는 아래(−j).** 이상적 소자는 실수부를 못 보태 R=1 원을 그대로 탄다.
- **LPF = 직렬 L(고주파 차단) + 병렬 C(새어온 고주파를 접지로).** 반대 특성의 조합이 공진·필터가 된다.
- **SRF** — 기생 성분 때문에 특정 주파수를 넘으면 L↔C 역할이 뒤집힌다. SRF 아래에서만 사용, 소자 값이 클수록 SRF는 낮아진다.
- **Q = X/R = 무손실 저장/손실.** 클수록 좋은 소자. SRF는 이용 범위, Q는 품질.
- 용도 5가지: **매칭, DC block, RF choke, bypass, degeneration.** 그리고 L·C는 소자이기 전에 어디서나 발생하는 **성분**이다.

---

## 셀프 퀴즈

1. 인덕터와 캐패시터는 각각 어떤 주파수를 잘 통과시키나? 임피던스 식으로 이유를 설명하라.
2. 인덕턴스는 어디에서 발생하나? 인덕터(coil)로 감으면 L이 선로 길이 이상으로 커지는 이유는?
3. Spiral inductor가 작은 크기로 큰 L을 만들 수 있는 이유와 단점 두 가지는?
4. 스미스차트에서 L은 위쪽, C는 아래쪽에 나타나는 이유는?
5. LPF에서 직렬 L과 병렬 C는 각각 무슨 역할을 하나?
6. SRF란 무엇이고 왜 생기나? 소자 값이 커지면 SRF는 어떻게 되나?
7. Q의 정의와 의미는? SRF와 Q의 역할 차이는?
8. RF 회로에서 L·C의 용도 5가지를 나열하라.

<details>
<summary>답 보기</summary>

1. **L은 저주파, C는 고주파를 잘 통과.** $Z_L = j\omega L$ 은 주파수와 함께 커져 고주파를 막고, $Z_C = 1/j\omega C$ 는 주파수와 함께 작아져 고주파를 통과시킨다.
2. **길이를 가지는 모든 선로에서.** coil로 감으면 인접 선로의 전류 방향이 같아 자기장이 더해지는 **mutual inductance** 덕에 L이 추가로 커진다.
3. 한 방향 동심원이라 mutual inductance가 같은 방향으로 더해져 작은 크기로 큰 L. 단점: **loss가 심하다**, 중앙부 인출에 **air bridge/다층 선로가 필요**하다.
4. $Z=R+j\omega L+1/j\omega C$ 에서 L은 허수부 +, C는 허수부 −이기 때문. 위쪽 = +j, 아래쪽 = −j.
5. 직렬 L이 고주파를 차단해 저주파만 통과시키고, 그나마 새어온 고주파는 병렬 C를 타고 **접지로 흘러 죽는다.**
6. 특정 주파수를 넘으면 **L↔C 역할이 뒤바뀌는 지점.** 소자의 기생 성분(L엔 기생 C, C엔 기생 L) 때문. 소자 값이 클수록 구조가 커져 기생도 커지므로 **SRF는 낮아진다** (사용 가능 대역이 좁아진다).
7. $Q = X/R$ = 무손실 저장 성분 대비 손실(저항) 성분. 클수록 loss가 적은 좋은 소자. **SRF는 이용 범위 지표, Q는 품질 지표.**
8. **Impedance Matching(L,C) · DC Block(C) · RF Choke(L) · Bypass(C) · Degeneration(L,C).**

</details>

*이전 — [RF에서 S 파라미터를 쓰는 이유](../why-s-parameters/). 다음 — [임피던스 매칭을 하는 이유](../why-impedance-matching/).*
