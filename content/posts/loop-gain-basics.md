+++
title = "[개념정리] 제어공학 기초 (1) — 컨버터 안정도 측정법, Crossover frequency, Phase margin, Gain margin"
date = 2026-08-08T00:30:00+09:00
series = "이론/원리"
description = "제어모드를 공부하다 루프이득에서 막혔다. 왜 저항 하나 끼워서 A/B를 재면 루프이득이 되는지, 주파수마다 왜 결과가 갈리는지, 보드선도에서 fc·PM·GM을 어떻게 읽는지 — 헷갈렸던 지점 위주로 정리한다."
tags = ["개념정리", "루프이득", "안정도", "control", "fundamentals"]
+++

## 들어가며

Voltage mode를 파고들다 **"출력필터가 극점 2개를 더해서 보상이 까다롭다"** 는 문장에서 멈췄다. 그 문장을 이해하려면 그 앞에 **루프이득 · 위상여유 · 크로스오버**가 먼저 있어야 했다.

그동안 실장에서 부하 과도 파형은 수없이 봤지만, 정작 **"루프이득이 뭔데?"** 를 정면으로 답해본 적이 없었다. 이 글은 그걸 바닥부터 짚은 기록이고, 특히 **내가 실제로 막혔던 지점들** 위주로 정리한다.

> 다루는 것: 루프이득의 정의 → 측정법(주입 저항을 왜 거기 두나) → 주파수에 따라 결과가 갈리는 이유 → 보드선도에서 fc·PM·GM 읽기 → 부하 스텝에서 캡과 루프의 역할 분담. 맨 끝에 **퀴즈**를 넣었다.

---

## 1. 루프이득 = 한 바퀴 돌고 온 배율

피드백 루프는 말 그대로 **고리**다. 어느 지점에서 신호를 넣으면, 블록들을 거쳐 **다시 그 지점으로 돌아온다.**

$$T = \frac{\text{돌아온 신호}}{\text{넣은 신호}}$$

- $T = 1000$ → 1000배 커져서 돌아옴
- $T = 1$ → 그대로 돌아옴 (0dB)
- $T = 0.1$ → 10배 작아져서 돌아옴

들어간 것도 전압, 나온 것도 전압이라 **단위 없는 순수한 배율**이다. 그래서 dB로 쓴다.

벅 컨버터라면 이 배율은 블록들의 곱이다.

$$T = \underbrace{G_c}_{\text{보상기}} \times \underbrace{G_{PWM}}_{\text{변조기}} \times \underbrace{G_{power}}_{\text{스위치+LC}} \times \underbrace{\frac{R_2}{R_1+R_2}}_{\text{분압}}$$

그리고 **발진 조건**이 여기서 나온다.

> **위상이 −180°까지 밀렸고(타이밍이 정반대), 그 주파수에서 이득이 아직 1 이상**이면 발진한다.

위상이 뒤집혀도 한 바퀴 돌 때마다 신호가 작아지면(이득 < 1) 저절로 사그라든다. **뒤집힌 채로 줄지 않고 돌아와야** 눈덩이가 된다. 두 조건이 세트인 이유다.

---

## 2. 어떻게 재나 — 루프를 끊고, 플로팅으로 주입

<svg viewBox="0 0 780 470" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>벅 컨버터에서 루프이득 주입 저항의 위치</title>
  <desc>주입 저항은 Vout 노드와 피드백 분압 저항 상단 사이에 직렬로 넣는다.</desc>
  <defs>
    <marker id="lg1" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker>
  </defs>
  <text x="30" y="96" font-size="12" fill="currentColor">Vin</text>
  <line x1="55" y1="90" x2="80" y2="90" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <rect x="80" y="66" width="95" height="48" rx="5" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="127" y="86" text-anchor="middle" font-size="11.5" font-weight="700" fill="currentColor">스위치</text>
  <text x="127" y="103" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity="0.7">+ 드라이버</text>
  <line x1="175" y1="90" x2="205" y2="90" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <rect x="205" y="78" width="60" height="24" rx="4" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="235" y="95" text-anchor="middle" font-size="12" fill="currentColor">L</text>
  <line x1="265" y1="90" x2="440" y2="90" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <circle cx="330" cy="90" r="4" fill="currentColor"/>
  <text x="330" y="72" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Vout</text>
  <line x1="330" y1="90" x2="330" y2="130" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="312" y1="130" x2="348" y2="130" stroke="currentColor" stroke-opacity="0.6" stroke-width="2"/>
  <line x1="312" y1="138" x2="348" y2="138" stroke="currentColor" stroke-opacity="0.6" stroke-width="2"/>
  <line x1="330" y1="138" x2="330" y2="165" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="316" y1="165" x2="344" y2="165" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="358" y="122" font-size="10.5" fill="currentColor" fill-opacity="0.7">Cout</text>
  <line x1="400" y1="90" x2="400" y2="112" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <rect x="388" y="112" width="24" height="40" rx="3" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="400" y1="152" x2="400" y2="165" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="386" y1="165" x2="414" y2="165" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="422" y="136" font-size="10.5" fill="currentColor" fill-opacity="0.7">부하</text>
  <rect x="470" y="76" width="70" height="28" rx="4" fill="none" stroke="#e0533d" stroke-width="2.4"/>
  <text x="505" y="95" text-anchor="middle" font-size="11.5" font-weight="700" fill="#e0533d">R_inj</text>
  <text x="505" y="60" text-anchor="middle" font-size="10.5" fill="#e0533d">10~50Ω</text>
  <line x1="440" y1="90" x2="470" y2="90" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="540" y1="90" x2="640" y2="90" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <circle cx="455" cy="90" r="4.5" fill="#3b82f6"/>
  <text x="452" y="132" text-anchor="middle" font-size="11.5" font-weight="700" fill="#3b82f6">A</text>
  <text x="452" y="147" text-anchor="middle" font-size="9.5" fill="#3b82f6">돌아온 쪽</text>
  <line x1="455" y1="90" x2="455" y2="118" stroke="#3b82f6" stroke-width="1.4" stroke-dasharray="3 3"/>
  <circle cx="556" cy="90" r="4.5" fill="#16a34a"/>
  <text x="560" y="132" text-anchor="middle" font-size="11.5" font-weight="700" fill="#16a34a">B</text>
  <text x="566" y="147" text-anchor="middle" font-size="9.5" fill="#16a34a">넣는 쪽</text>
  <line x1="556" y1="90" x2="556" y2="118" stroke="#16a34a" stroke-width="1.4" stroke-dasharray="3 3"/>
  <circle cx="505" cy="26" r="15" fill="none" stroke="#e0533d" stroke-width="1.8"/>
  <text x="505" y="31" text-anchor="middle" font-size="12" fill="#e0533d">~</text>
  <path d="M490,26 L455,26 L455,76" fill="none" stroke="#e0533d" stroke-width="1.4" stroke-dasharray="4 3"/>
  <path d="M520,26 L556,26 L556,76" fill="none" stroke="#e0533d" stroke-width="1.4" stroke-dasharray="4 3"/>
  <text x="576" y="24" font-size="10.5" fill="#e0533d">주입 트랜스 (플로팅)</text>
  <line x1="640" y1="90" x2="640" y2="120" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <rect x="628" y="120" width="24" height="42" rx="3" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="666" y="146" font-size="11" fill="currentColor">R1</text>
  <line x1="640" y1="162" x2="640" y2="196" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <circle cx="640" cy="185" r="4" fill="currentColor"/>
  <text x="666" y="189" font-size="11" font-weight="700" fill="currentColor">FB</text>
  <rect x="628" y="196" width="24" height="42" rx="3" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="666" y="222" font-size="11" fill="currentColor">R2</text>
  <line x1="640" y1="238" x2="640" y2="258" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="626" y1="258" x2="654" y2="258" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <path d="M530,300 L530,360 L470,330 Z" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="508" y="335" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity="0.7">EA</text>
  <path d="M640,185 L600,185 L600,312 L530,312" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6" marker-end="url(#lg1)"/>
  <text x="542" y="309" font-size="10" fill="currentColor" fill-opacity="0.7">−</text>
  <line x1="596" y1="348" x2="530" y2="348" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6" marker-end="url(#lg1)"/>
  <text x="542" y="358" font-size="10" fill="currentColor" fill-opacity="0.7">+</text>
  <text x="604" y="352" font-size="10.5" fill="currentColor" fill-opacity="0.7">Vref</text>
  <line x1="470" y1="330" x2="430" y2="330" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="450" y="322" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity="0.7">COMP</text>
  <path d="M430,330 L430,400 L300,400" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6" marker-end="url(#lg1)"/>
  <rect x="160" y="378" width="140" height="44" rx="5" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="230" y="396" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">PWM 비교기</text>
  <text x="230" y="412" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity="0.7">+ 톱니파</text>
  <path d="M160,400 L127,400 L127,114" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6" marker-end="url(#lg1)"/>
  <text x="30" y="447" font-size="12.5" font-weight="700" fill="currentColor">넣는 자리: Vout 노드 ↔ 분압 R1 상단 사이에 직렬</text>
  <text x="30" y="464" font-size="11" fill="currentColor" fill-opacity="0.7">T = A / B (둘 다 GND 기준으로 측정)</text>
</svg>

### 헷갈렸던 지점 ① — "A와 B는 같은 노드 아닌가?"

그림만 보면 A와 B가 붙어 있는 한 노드처럼 보인다. 맞다, **자르기 전에는** 한 노드였다.

**끊는 순간 두 개의 다른 노드가 된다.** 왼쪽은 Vout에서 오는 쪽, 오른쪽은 분압으로 들어가는 쪽. 그 틈에 저항과 트랜스를 끼운다. **원래 붙어 있던 자리라서 같아 보이는 게 오히려 정상**이다.

### 헷갈렸던 지점 ② — "GND 기준으로 B에 넣는 건가?"

아니다. 트랜스 2차측은 **떠 있고(floating)**, 강제되는 것은 **딱 하나**뿐이다.

$$B - A = V_{inj}$$

**B가 얼마가 될지, A가 얼마가 될지는 주입원이 안 정한다.** 그건 루프가 정한다. 이 구분이 뒤에서 결정적이다.

<svg viewBox="0 0 780 420" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>플로팅 주입과 GND 기준 직결의 비교</title>
  <desc>왼쪽은 저항 양단에 트랜스로 플로팅 주입, 오른쪽은 신호발생기를 GND 기준으로 분압 상단에 직결한 잘못된 방법.</desc>
  <text x="20" y="26" font-size="13" font-weight="700" fill="#16a34a">① 올바름 — 저항 양단에 플로팅 주입</text>
  <text x="46" y="100" font-size="11" font-weight="700" fill="currentColor">Vout</text>
  <circle cx="80" cy="118" r="4" fill="currentColor"/>
  <line x1="40" y1="118" x2="150" y2="118" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="80" y1="118" x2="80" y2="146" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="64" y1="146" x2="96" y2="146" stroke="currentColor" stroke-opacity="0.6" stroke-width="2"/>
  <line x1="64" y1="154" x2="96" y2="154" stroke="currentColor" stroke-opacity="0.6" stroke-width="2"/>
  <line x1="80" y1="154" x2="80" y2="178" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="68" y1="178" x2="92" y2="178" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="104" y="152" font-size="10" fill="currentColor" fill-opacity="0.7">Cout</text>
  <rect x="150" y="106" width="60" height="24" rx="3" fill="none" stroke="#e0533d" stroke-width="2.2"/>
  <text x="180" y="123" text-anchor="middle" font-size="10.5" font-weight="700" fill="#e0533d">R_inj</text>
  <line x1="210" y1="118" x2="270" y2="118" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <circle cx="250" cy="118" r="4" fill="currentColor"/>
  <text x="262" y="112" font-size="10.5" font-weight="700" fill="currentColor">R1 상단</text>
  <line x1="250" y1="118" x2="250" y2="146" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <rect x="238" y="146" width="24" height="40" rx="3" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="274" y="170" font-size="10.5" fill="currentColor">R1</text>
  <line x1="250" y1="186" x2="250" y2="216" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <circle cx="250" cy="204" r="3.5" fill="currentColor"/>
  <text x="274" y="208" font-size="10.5" font-weight="700" fill="currentColor">FB</text>
  <rect x="238" y="216" width="24" height="40" rx="3" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="274" y="240" font-size="10.5" fill="currentColor">R2</text>
  <line x1="250" y1="256" x2="250" y2="278" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="238" y1="278" x2="262" y2="278" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <circle cx="180" cy="52" r="15" fill="none" stroke="#16a34a" stroke-width="2"/>
  <text x="180" y="57" text-anchor="middle" font-size="12" fill="#16a34a">~</text>
  <path d="M165,52 L150,52 L150,106" fill="none" stroke="#16a34a" stroke-width="1.6"/>
  <path d="M195,52 L210,52 L210,106" fill="none" stroke="#16a34a" stroke-width="1.6"/>
  <text x="20" y="322" font-size="11.5" fill="currentColor">· 신호발생기가 <tspan font-weight="700" fill="#16a34a">GND와 전혀 연결 없음</tspan> (트랜스로 절연)</text>
  <text x="20" y="342" font-size="11.5" fill="currentColor">· 저항이 양쪽을 이어줘 <tspan font-weight="700">DC는 그대로 통과</tspan></text>
  <text x="20" y="362" font-size="11.5" fill="currentColor">· FB는 계속 Vout을 대변 → 컨버터 정상 동작, 위에 <tspan font-weight="700">AC만 얹힘</tspan></text>
  <line x1="392" y1="20" x2="392" y2="400" stroke="currentColor" stroke-opacity="0.3" stroke-dasharray="5 5"/>
  <text x="412" y="26" font-size="13" font-weight="700" fill="#e0533d">② 잘못됨 — GND 기준으로 직결</text>
  <text x="438" y="100" font-size="11" font-weight="700" fill="currentColor">Vout</text>
  <circle cx="472" cy="118" r="4" fill="currentColor"/>
  <line x1="432" y1="118" x2="542" y2="118" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="472" y1="118" x2="472" y2="146" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="456" y1="146" x2="488" y2="146" stroke="currentColor" stroke-opacity="0.6" stroke-width="2"/>
  <line x1="456" y1="154" x2="488" y2="154" stroke="currentColor" stroke-opacity="0.6" stroke-width="2"/>
  <line x1="472" y1="154" x2="472" y2="178" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="460" y1="178" x2="484" y2="178" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <rect x="542" y="106" width="60" height="24" rx="3" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="572" y="123" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">R_inj</text>
  <line x1="602" y1="118" x2="662" y2="118" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <circle cx="642" cy="118" r="4.5" fill="#e0533d"/>
  <text x="654" y="112" font-size="10.5" font-weight="700" fill="#e0533d">R1 상단</text>
  <line x1="642" y1="118" x2="642" y2="146" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <rect x="630" y="146" width="24" height="40" rx="3" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="666" y="170" font-size="10.5" fill="currentColor">R1</text>
  <line x1="642" y1="186" x2="642" y2="216" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <circle cx="642" cy="204" r="3.5" fill="currentColor"/>
  <text x="666" y="208" font-size="10.5" font-weight="700" fill="currentColor">FB</text>
  <rect x="630" y="216" width="24" height="40" rx="3" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="666" y="240" font-size="10.5" fill="currentColor">R2</text>
  <line x1="642" y1="256" x2="642" y2="278" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="630" y1="278" x2="654" y2="278" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <circle cx="700" cy="52" r="15" fill="none" stroke="#e0533d" stroke-width="2"/>
  <text x="700" y="57" text-anchor="middle" font-size="12" fill="#e0533d">~</text>
  <path d="M700,67 L700,90 L642,90 L642,114" fill="none" stroke="#e0533d" stroke-width="1.8"/>
  <path d="M715,52 L740,52 L740,290" fill="none" stroke="#e0533d" stroke-width="1.8"/>
  <line x1="728" y1="290" x2="752" y2="290" stroke="#e0533d" stroke-width="1.8"/>
  <text x="740" y="308" text-anchor="middle" font-size="10" font-weight="700" fill="#e0533d">GND</text>
  <text x="412" y="322" font-size="11.5" fill="currentColor">· 발전기가 R1 상단을 <tspan font-weight="700" fill="#e0533d">GND 기준으로 붙잡음</tspan></text>
  <text x="412" y="342" font-size="11.5" fill="currentColor">· FB가 Vout이 아니라 <tspan font-weight="700">발전기를 대변</tspan> → 루프가 FB를 못 바꿈</text>
  <text x="412" y="362" font-size="11.5" fill="currentColor">· 듀티 폭주 → <tspan font-weight="700" fill="#e0533d">출력이 레일로</tspan> → 측정 불가</text>
  <text x="412" y="386" font-size="11" fill="currentColor" fill-opacity="0.7">(Vout은 오히려 안 흔들림 — 캡·루프가 수 mΩ으로 붙잡고 있어 발전기가 못 흔듦)</text>
</svg>

**흔한 오해:** GND 기준으로 물리면 "출력전압을 강제로 흔드는 것"이라고 생각하기 쉽다. **그렇지 않다.** Vout 노드는 출력캡과 루프가 수 mΩ으로 붙잡고 있어서, 20Ω 저항 너머의 신호발생기가 흔들 수 있는 대상이 아니다.

실제로 벌어지는 일은 **루프의 절단**이다.

1. 발전기가 R1 상단을 GND 기준으로 고정 → **FB가 Vout이 아니라 발전기를 대변**하게 된다
2. 루프는 여전히 FB = Vref를 만들려 듀티를 조절하지만, **FB는 Vout과 무관**하므로 듀티를 아무리 움직여도 FB가 따라오지 않는다
3. 멈출 조건이 없으므로 **듀티가 한쪽 끝까지 폭주** → 출력이 0V 또는 Vin으로 튄다

즉 신호가 **한 바퀴를 못 돌고 반쪽에서 끊긴다.** 루프이득이라는 양 자체가 정의되지 않는다.

**플로팅 주입에서는** 저항이 양쪽을 잇고 있어 **FB가 계속 Vout을 대변**한다. 다만 그 위에 20mV 오프셋이 얹힌 상태로 대변할 뿐이다. 그래서 컨버터는 정상 레귤레이션을 유지하고, 우리는 **그 오프셋에 루프가 어떻게 반응하는지**만 관찰할 수 있다.

### 왜 루프를 닫아둔 채로 재도 T가 나오나

- 루프가 하는 일: $A = T \cdot B$
- 주입원이 만든 관계: $B = A + V_{inj}$

두 식을 풀면

$$A = \frac{T\,V_{inj}}{1-T}, \qquad B = \frac{V_{inj}}{1-T} \;\;\Rightarrow\;\; \boxed{\frac{A}{B} = T}$$

**주입 크기 $V_{inj}$ 도, $(1-T)$ 도 전부 약분되어 사라진다.** 그래서 루프를 닫아둔 채로 순수한 루프이득이 나온다. 이것이 Middlebrook 주입법의 핵심이다.

---

## 3. 주입 저항을 왜 하필 그 자리에 두나

<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>주입 지점의 임피던스 조건</title>
  <desc>주입 전류가 Zs에 전압을 만들면 루프를 거치지 않고 A를 직접 흔들어 측정이 오염된다.</desc>
  <text x="30" y="30" font-size="12.5" font-weight="700" fill="currentColor">주입원이 만드는 직렬 전류 경로</text>
  <rect x="70" y="90" width="80" height="42" rx="4" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <text x="110" y="108" text-anchor="middle" font-size="11.5" font-weight="700" fill="#3b82f6">Zs</text>
  <text x="110" y="124" text-anchor="middle" font-size="9.5" fill="#3b82f6">Vout 쪽</text>
  <text x="110" y="152" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">≈ 수 mΩ</text>
  <circle cx="175" cy="111" r="4.5" fill="#3b82f6"/>
  <text x="175" y="80" text-anchor="middle" font-size="12" font-weight="700" fill="#3b82f6">A</text>
  <line x1="150" y1="111" x2="230" y2="111" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <rect x="230" y="90" width="90" height="42" rx="4" fill="none" stroke="#e0533d" stroke-width="2"/>
  <text x="275" y="108" text-anchor="middle" font-size="11.5" font-weight="700" fill="#e0533d">R_inj + Vinj</text>
  <text x="275" y="124" text-anchor="middle" font-size="9.5" fill="#e0533d">20Ω · 20mV</text>
  <line x1="320" y1="111" x2="400" y2="111" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <circle cx="345" cy="111" r="4.5" fill="#16a34a"/>
  <text x="345" y="80" text-anchor="middle" font-size="12" font-weight="700" fill="#16a34a">B</text>
  <rect x="400" y="90" width="80" height="42" rx="4" fill="none" stroke="#16a34a" stroke-width="2"/>
  <text x="440" y="108" text-anchor="middle" font-size="11.5" font-weight="700" fill="#16a34a">ZL</text>
  <text x="440" y="124" text-anchor="middle" font-size="9.5" fill="#16a34a">분압 쪽</text>
  <text x="440" y="152" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">≈ 수십 kΩ</text>
  <defs>
    <marker id="lg2" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e0533d"/></marker>
  </defs>
  <path d="M110,132 L110,190 L440,190 L440,132" fill="none" stroke="#e0533d" stroke-width="1.6" stroke-dasharray="5 4" marker-end="url(#lg2)"/>
  <text x="275" y="207" text-anchor="middle" font-size="11" fill="#e0533d">주입 전류 i = Vinj / (Zs + R_inj + ZL) ≈ 1µA</text>
  <text x="30" y="243" font-size="12" fill="currentColor">이 전류가 Zs를 지나며 만드는 전압 = <tspan font-weight="700" fill="#e0533d">i × Zs = 10nV</tspan> → 루프를 거치지 않고 A를 직접 미는 성분</text>
  <text x="30" y="266" font-size="12" fill="currentColor">Zs가 작아야 이 성분이 무시되고, A는 <tspan font-weight="700">한 바퀴 돌아온 신호로만</tspan> 움직인다</text>
  <text x="30" y="288" font-size="11.5" fill="currentColor" fill-opacity="0.7">ZL이 커야 주입 전류 자체가 작아 회로 동작을 안 건드린다 (DC 오차 0.1% 이하)</text>
</svg>

주입 지점에서 양쪽을 들여다본 임피던스가 **$Z_s \ll Z_L$** 이어야 한다. 벅에서 Vout 노드와 분압 저항(수십 kΩ) 사이가 이 조건을 1000배 이상으로 만족한다.

### Zs는 주파수대별로 다른 놈이 낮게 유지해준다

보드선도를 그리려면 주입 주파수를 10Hz부터 1MHz까지 스윕하므로, **모든 주파수에서** 이 조건이 성립해야 한다. 그런데 Vout 노드를 붙잡아주는 주역이 주파수대마다 바뀐다.

- **출력 커패시터 (수동)** — 전류를 삼켜 전압 변화를 막는다. 임피던스가 $1/2\pi f C$ 라 **고주파에 강하고 저주파에 약하다**. 100µF면 1MHz에서 0.0016Ω이지만 10Hz에서는 160Ω이다.
- **루프 (능동)** — Vout이 움직이면 감지해 듀티로 되돌린다. 시간이 걸리므로 **느린 변화만 잡을 수 있다**. 닫힌루프 출력 임피던스는 $Z_{out,\text{open}}/(1+T)$ 이므로, T가 큰 저주파에서 강력하다.
- **부하** — Cout과 병렬로 붙어 합성 임피던스를 더 낮춘다. **부하가 무거울수록 조건이 유리**해진다.

둘의 담당 구간이 정확히 반대라서 합치면 전 대역이 덮인다.

| 주파수 | 캡의 힘 | 루프의 힘 | 합쳐진 Zs |
|---|---|---|---|
| 10Hz | 약함 (160Ω) | **강함** (T=1000) | 약 **0.16Ω** |
| fc 부근 | 중간 | 중간 | 작음 |
| 1MHz | **강함** (0.002Ω) | 없음 | **0.002Ω** |

10Hz에서 1µA를 밀어넣는 경우를 따라가 보면: 루프가 없다면 캡 임피던스 160Ω 때문에 160µV가 움직이겠지만, 루프가 이를 감지해 듀티로 되돌리므로 실제 변화는 $160\mu V/(1+1000) \approx 0.16\mu V$ 에 그친다. 어느 주파수에서도 Zs는 수십 kΩ에 한참 못 미친다.

### 헷갈렸던 지점 ③ — "그래도 전류는 흐르잖아?"

맞다. **전류는 흐른다.** 직렬 폐루프니까 1µA가 Zs를 포함해 똑같이 흐른다.

핵심은 **우리가 재는 게 전압**이라는 것이다. 문제는 "전류가 흐르냐"가 아니라 **"그 전류 때문에 A의 전압이 얼마나 오염되냐"** 다.

| A의 전압이 움직이는 경로 | 크기 |
|---|---|
| 루프 한 바퀴 (재려는 것) | 최대 20mV |
| 주입 전류 × Zs (오염) | 10nV |

**200만 배 차이**라 무시된다. 반대로 조건을 어기면($Z_s$=5kΩ) 오염 성분이 16.7mV로 루프 성분과 맞먹어 **뭘 잰 건지 알 수 없게 된다.**

> **실무 메모:** EVB 회로도의 FB 경로에 뜬금없이 박혀 있는 0Ω 또는 20Ω 저항이 이 주입 저항이다. 양산 보드엔 0Ω, 평가용엔 20Ω을 얹는 식이다. 분압이 20kΩ급이면 20Ω은 0.1% 이하 오차라 정상 동작에 영향이 없다.

---

## 4. 주파수마다 결과가 갈리는 이유

<svg viewBox="0 0 740 400" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>주입한 20mV를 A와 B가 나눠 갖는 비율</title>
  <desc>저주파에서는 루프가 B를 붙잡아 A가 다 흔들리고, 고주파에서는 출력캡이 A를 붙잡아 B가 다 흔들린다.</desc>
  <text x="30" y="28" font-size="12.5" font-weight="700" fill="currentColor">주입원은 B−A=20mV라는 차이만 강제한다 — 각각 얼마나 움직일지는 루프가 정한다</text>
  <text x="30" y="72" font-size="12.5" font-weight="700" fill="#3b82f6">저주파 — 루프가 강함 (T = 1000)</text>
  <text x="30" y="90" font-size="10.5" fill="currentColor" fill-opacity="0.7">루프가 감지하는 노드는 B다. 듀티를 조절해 B를 Vref에</text>
  <text x="30" y="105" font-size="10.5" fill="currentColor" fill-opacity="0.7">맞출 시간이 충분하므로 B가 제자리로 돌아온다</text>
  <rect x="330" y="60" width="360" height="30" rx="4" fill="none" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.4"/>
  <rect x="330" y="60" width="352" height="30" rx="4" fill="#3b82f6" fill-opacity="0.35"/>
  <text x="500" y="80" text-anchor="middle" font-size="11.5" font-weight="700" fill="currentColor">A 가 20mV 거의 전부</text>
  <text x="330" y="108" font-size="10.5" fill="currentColor" fill-opacity="0.7">|A| ≈ 20mV, |B| ≈ 20µV → T = 1000</text>
  <text x="30" y="185" font-size="12.5" font-weight="700" fill="currentColor">크로스오버 (T = 1)</text>
  <text x="30" y="203" font-size="10.5" fill="currentColor" fill-opacity="0.7">T=1은 "한 바퀴 돌아도 크기가 그대로"라는 뜻이므로</text>
  <text x="30" y="218" font-size="10.5" fill="currentColor" fill-opacity="0.7">정의상 |A| = |B| 가 되는 주파수</text>
  <rect x="330" y="173" width="360" height="30" rx="4" fill="none" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.4"/>
  <rect x="330" y="173" width="180" height="30" fill="#3b82f6" fill-opacity="0.35"/>
  <rect x="510" y="173" width="180" height="30" fill="#16a34a" fill-opacity="0.35"/>
  <text x="420" y="193" text-anchor="middle" font-size="11.5" font-weight="700" fill="currentColor">A</text>
  <text x="600" y="193" text-anchor="middle" font-size="11.5" font-weight="700" fill="currentColor">B</text>
  <text x="330" y="221" font-size="10.5" fill="currentColor" fill-opacity="0.7">|A| = |B| → T = 1 (0dB) ← 이 주파수가 fc</text>
  <text x="30" y="298" font-size="12.5" font-weight="700" fill="#16a34a">고주파 — 루프가 못 따라감 (T = 0.1)</text>
  <text x="30" y="316" font-size="10.5" fill="currentColor" fill-opacity="0.7">보상기 이득이 바닥이라 듀티가 거의 안 변해 A를 움직일</text>
  <text x="30" y="331" font-size="10.5" fill="currentColor" fill-opacity="0.7">동력이 없고, 캡 임피던스도 낮아 A가 정지한다</text>
  <rect x="330" y="286" width="360" height="30" rx="4" fill="none" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.4"/>
  <rect x="330" y="286" width="36" height="30" fill="#3b82f6" fill-opacity="0.35"/>
  <rect x="366" y="286" width="324" height="30" fill="#16a34a" fill-opacity="0.35"/>
  <text x="345" y="306" text-anchor="middle" font-size="10" fill="currentColor">A</text>
  <text x="528" y="306" text-anchor="middle" font-size="11.5" font-weight="700" fill="currentColor">B 가 20mV 거의 전부</text>
  <text x="330" y="334" font-size="10.5" fill="currentColor" fill-opacity="0.7">|A| ≈ 2mV, |B| ≈ 20mV → T = 0.1</text>
  <text x="30" y="378" font-size="12" fill="currentColor">→ <tspan font-weight="700">누가 20mV를 더 많이 떠안느냐</tspan> 가 곧 루프이득</text>
</svg>

### 헷갈렸던 지점 ④ — "왜 저주파에서 B가 고정되고 A가 흔들리지?"

직관과 반대라서 제일 오래 막혔던 부분이다. **DC로 바꿔서 보면 확실해진다.**

저항을 끼운 순간 중요한 것이 바뀐다. **루프가 감지하는 노드는 A(Vout)가 아니라 B다.** 분압 저항이 B에 붙어 있으니 FB는 B에서 나오고, **A는 저항 하나 건너편의 남**이 된다.

$V_{ref} = 1.0\text{V}$, $R_1 = R_2$ (즉 FB = B의 절반)라 하자. 루프의 목표는 오직 **FB = 1.0V**, 즉 **B = 2.0V**를 만드는 것이다.

| | 주입 전 | DC 20mV 주입 후 |
|---|---|---|
| **B** | 2.000V | **2.000V** (루프가 지킴) |
| **A** | 2.000V | **1.980V** (20mV 밀려남) |

루프는 자기가 보는 B만 정확히 맞췄을 뿐이다. **A가 20mV 틀어진 것은 루프가 신경도 쓰지 않는다** — 감지하는 노드가 아니니까.

인과를 따라가면 이렇다.

1. 주입으로 B가 2.02V로 튄다 (A는 출력캡 때문에 즉시 못 변함)
2. FB = 1.01V > Vref → 에러앰프가 "출력이 높다"고 판단
3. COMP 내려감 → 듀티 줄어듦 → **A가 서서히 내려감**
4. A가 내려가면 B도 같이 내려간다 (둘은 20mV 차이로 묶여 있으므로)
5. **A = 1.98V가 되는 순간 B = 2.00V, 에러 0** → 정지

> **막대 비유:** A와 B는 길이 20mV짜리 막대로 묶인 두 점이다. 루프는 **B만 쳐다보며** "너는 2.0V에 있어야 해"라고 밀고 당긴다. 막대가 통째로 움직이니 A도 끌려다니고, B가 목표에 닿으면 A는 자동으로 1.98V가 된다. **A에게는 선택권이 없다.**

### 고주파에서는 "반응을 못 하는" 게 아니라 "반응이 지극히 작은" 것

흔히 "빠른 신호는 루프가 아예 못 따라간다"고 말하지만, 정확하지 않다. FB가 흔들리면 에러앰프도 반응하고 듀티도 조금은 흔들린다. 다만 그 신호가 Vout까지 오는 동안 **네 단계에서 계속 깎인다.**

1. **보상기의 고주파 이득 감소** (주범) — DC에서 10,000배여도 100kHz에선 0.01배 수준
2. **PWM은 스위칭 주기당 한 번만 듀티를 갱신** — $f_{sw}/2$ 위로는 표현 자체가 불가
3. **출력 LC 필터의 감쇠** — 공진점 위로 −40dB/decade
4. **출력캡이 Vout을 붙잡음** — 고주파일수록 캡 임피던스가 낮음

이 넷의 곱이 곧 그 주파수의 루프이득이다. $T = 0.001$ 이면 A는 20nV 흔들린다 — 0은 아니지만 없는 것이나 마찬가지다. (보드선도가 고주파에서도 −40dB, −60dB로 **이어져 그려지는 이유**가 이것이다.)

### 크로스오버에서 |A| = |B| 인 이유, 그리고 "각각 10mV"가 아닌 이유

$T$ 의 정의가 $A/B$ 이므로, $|T| = 1$ 은 곧 **$|A| = |B|$** 라는 말과 같다. 크로스오버는 *"둘의 크기가 같아지는 주파수"* 로 정의된 지점이다.

주의할 것은 **각각 10mV가 되는 것이 아니라는 점**이다. A와 B는 위상을 가진 벡터(페이저)이고, 강제되는 것은 **벡터 뺄셈** $B - A = 20\text{mV}$ 다.

- **PM = 0°** (A와 B가 정확히 반대 위상) → 크기가 산술적으로 더해져 **각각 10mV**
- **PM = 60°** (둘이 120° 벌어짐) → 벡터로 빼면 **각각 약 11.5mV**

즉 항상 성립하는 것은 **"둘의 크기가 같다"** 이고, 실제 숫자는 위상여유에 따라 달라진다.

### $T=1$ 은 "되는" 것이 아니라 "지나가는" 것

크로스오버를 어떤 사건처럼 오해하기 쉬운데, 그렇지 않다. $T$ 는 저주파에서 크고 주파수가 올라갈수록 **연속적으로 작아진다**. 큰 값에서 작은 값으로 내려오니 **중간에 반드시 1을 통과**할 뿐이고, 그 통과 지점에 fc라는 이름을 붙인 것이다.

물이 30도에서 10도로 식으면 반드시 20도를 지나는 것과 같다. 20도가 특별한 사건이라서가 아니라, 내려오다 보면 통과하는 지점이다.

그렇다면 진짜 질문은 **"$T$ 는 왜 주파수가 올라가면 작아지는가"** 이고, 그 답이 다음 편의 **극점(pole)** 이다.

### $T$ 를 끌어내리는 주범은 둘이다

$T$ 는 네 블록의 곱이지만, 주파수에 따라 실제로 값을 떨어뜨리는 것은 두 개뿐이다.

| 블록 | 주파수 의존성 |
|---|---|
| **보상기** | 적분기 형태라 주파수가 오를수록 이득이 급격히 감소 — **주범** |
| **파워스테이지 (LC 필터)** | 공진점 위로 −40dB/decade 감쇠 |
| PWM 변조기 | 대체로 상수 (톱니파 진폭으로 나누는 것) |
| 피드백 분압 | 완전한 상수 ($R_2/(R_1+R_2)$) |

따라서 fc를 결정하는 것은 실질적으로 **보상기 이득 곡선과 파워스테이지 감쇠 곡선이 만나 0dB를 지나는 지점**이다. 보상기를 설계한다는 것은 **그 만나는 지점을 원하는 주파수에 놓는 작업**이다.

---

## 5. 보드선도 — fc · PM · GM 읽기

주입 주파수를 쭉 스윕하면서 $A/B$ 를 크기(dB)와 위상(°)으로 찍은 것이 **보드선도**다. 네트워크 애널라이저가 하는 일이 문자 그대로 이것이고, SIMPLIS의 POP → AC 해석이 자동으로 해주는 것도 이것이다.

<svg viewBox="0 0 700 560" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>보드선도에서 fc, 위상여유, 이득여유 읽기</title>
  <desc>이득이 0dB를 지나는 fc에서 위상여유를, 위상이 -180도인 주파수에서 이득여유를 읽는다.</desc>
  <text x="40" y="26" font-size="13" font-weight="700" fill="currentColor">루프이득 보드선도 (예시) — fc = 10kHz, PM = 60°, GM = 20dB</text>
  <text x="40" y="52" font-size="11.5" font-weight="700" fill="#3b82f6">이득 |T| (dB)</text>
  <line x1="90" y1="50" x2="90" y2="240" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="90" y1="240" x2="640" y2="240" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="90" y1="140" x2="640" y2="140" stroke="currentColor" stroke-opacity="0.5" stroke-dasharray="5 4"/>
  <text x="84" y="144" text-anchor="end" font-size="11" font-weight="700" fill="currentColor">0dB</text>
  <text x="84" y="84" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">+40</text>
  <text x="84" y="114" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">+20</text>
  <text x="84" y="174" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">−20</text>
  <text x="84" y="204" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">−40</text>
  <path d="M90,80 L227,110 L365,140 L431,170 L502,200 L575,224" fill="none" stroke="#3b82f6" stroke-width="2.6"/>
  <text x="150" y="72" font-size="10" fill="currentColor" fill-opacity="0.7">−20dB/dec</text>
  <text x="455" y="192" font-size="10" fill="currentColor" fill-opacity="0.7">−40dB/dec</text>
  <text x="40" y="302" font-size="11.5" font-weight="700" fill="#f59e0b">위상 (°)</text>
  <line x1="90" y1="300" x2="90" y2="480" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="90" y1="480" x2="640" y2="480" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="90" y1="390" x2="640" y2="390" stroke="#e0533d" stroke-dasharray="5 4" stroke-opacity="0.85"/>
  <text x="84" y="394" text-anchor="end" font-size="11" font-weight="700" fill="#e0533d">−180°</text>
  <text x="84" y="324" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">−90°</text>
  <text x="84" y="464" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">−270°</text>
  <path d="M90,320 L227,323 L300,331 L365,343 L400,362 L431,390 L470,412 L502,429 L575,447" fill="none" stroke="#f59e0b" stroke-width="2.6"/>
  <line x1="365" y1="50" x2="365" y2="480" stroke="#e0533d" stroke-width="1.6" stroke-dasharray="4 3"/>
  <circle cx="365" cy="140" r="5.5" fill="#e0533d"/>
  <circle cx="365" cy="343" r="5.5" fill="#e0533d"/>
  <text x="365" y="42" text-anchor="middle" font-size="12.5" font-weight="700" fill="#e0533d">fc = 10kHz</text>
  <text x="372" y="132" font-size="10" fill="#e0533d">이득이 0dB를 지남</text>
  <line x1="345" y1="343" x2="345" y2="390" stroke="#16a34a" stroke-width="2.4"/>
  <path d="M341,348 L345,341 L349,348 Z" fill="#16a34a"/>
  <path d="M341,385 L345,392 L349,385 Z" fill="#16a34a"/>
  <text x="336" y="372" text-anchor="end" font-size="12" font-weight="700" fill="#16a34a">PM</text>
  <text x="336" y="387" text-anchor="end" font-size="11" font-weight="700" fill="#16a34a">60°</text>
  <text x="374" y="349" font-size="10" fill="currentColor" fill-opacity="0.7">여기 위상 −120°</text>
  <line x1="431" y1="50" x2="431" y2="480" stroke="currentColor" stroke-opacity="0.45" stroke-width="1.4" stroke-dasharray="4 3"/>
  <circle cx="431" cy="170" r="5.5" fill="currentColor" fill-opacity="0.6"/>
  <circle cx="431" cy="390" r="5.5" fill="currentColor" fill-opacity="0.6"/>
  <text x="437" y="404" font-size="10.5" fill="currentColor" fill-opacity="0.7">위상이 −180° 되는 곳 (30kHz)</text>
  <line x1="452" y1="140" x2="452" y2="170" stroke="#16a34a" stroke-width="2.4"/>
  <path d="M448,145 L452,138 L456,145 Z" fill="#16a34a"/>
  <path d="M448,165 L452,172 L456,165 Z" fill="#16a34a"/>
  <text x="460" y="152" font-size="12" font-weight="700" fill="#16a34a">GM</text>
  <text x="460" y="167" font-size="11" font-weight="700" fill="#16a34a">20dB</text>
  <g font-size="10" fill="currentColor" fill-opacity="0.7" text-anchor="middle">
    <text x="90" y="256">100Hz</text><text x="227" y="256">1kHz</text><text x="365" y="256">10kHz</text>
    <text x="502" y="256">100kHz</text><text x="640" y="256">1MHz</text>
    <text x="90" y="496">100Hz</text><text x="227" y="496">1kHz</text><text x="365" y="496">10kHz</text>
    <text x="502" y="496">100kHz</text><text x="640" y="496">1MHz</text>
  </g>
  <text x="40" y="524" font-size="11.5" fill="currentColor"><tspan font-weight="700">읽는 법</tspan> ① 이득이 0dB를 지나는 주파수 = fc  ② 그 주파수의 위상이 −180°에서 떨어진 각도 = PM</text>
  <text x="40" y="544" font-size="11.5" fill="currentColor">③ 위상이 −180°인 주파수를 찾아, 그때 이득이 0dB보다 아래인 양 = GM</text>
</svg>

- **fc (크로스오버)** — 이득이 0dB를 지나는 주파수. **루프의 속도 한계선.** 우리 실험으로 말하면 A와 B가 20mV를 반반씩 나눠 갖는 주파수다.
- **PM (위상여유)** — fc에서 위상이 −180°까지 남은 각도. 목표 **45~60°**
- **GM (이득여유)** — 위상이 −180°인 주파수에서 이득이 0dB보다 아래인 양. 목표 **10dB 이상**

PM과 GM은 **같은 조건을 세로로 보느냐 가로로 보느냐**의 차이다. 안정의 본질은 하나다.

> **위상이 −180°에 닿기 전에 이득이 먼저 1 아래로 떨어졌는가.**

### fc와 PM은 한 몸이다

PM은 각도지만 **fc에서만 잰다.** 그래서 fc를 올리면(대역폭 욕심) 그 주파수까지 위상이 더 밀려 있어 **PM이 줄어든다.** 이것이 보상 설계의 근본 트레이드오프다 — **빠르게(fc↑) vs 안정하게(PM↑)**.

| | 결정하는 것 | 파형에서 보이는 것 |
|---|---|---|
| **PM** | 파형의 **모양** | 오버슈트 비율, 링잉이 몇 번 만에 죽나 |
| **fc** | 시간축 **스케일** | 회복 속도, 링잉 주파수 |

PM 45°에 fc 10kHz와 PM 45°에 fc 100kHz는 **모양이 똑같고**, 뒤엣것이 10배 빠르게 그 과정을 끝낼 뿐이다.

### 이득만 올려서 fc를 높이면 위상여유를 그대로 잃는다

보상기 이득을 키우면 이득 곡선이 **위로 평행이동**한다. 모양은 그대로고 높이만 올라가므로, 0dB 교차점이 자연히 **오른쪽으로 밀려** fc가 커진다.

문제는 **위상 곡선이 전혀 움직이지 않는다는 것**이다. 순수한 이득 변화는 위상에 영향을 주지 않는다.

<svg viewBox="0 0 700 580" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>이득을 올리면 fc는 오른쪽으로 가고 위상여유는 사라진다</title>
  <desc>이득 곡선만 위로 평행이동하고 위상 곡선은 그대로여서, 새 크로스오버에서 위상여유가 없어진다.</desc>
  <text x="40" y="24" font-size="13" font-weight="700" fill="currentColor">보상기 이득만 올리면 — fc는 오른쪽으로, PM은 사라진다</text>
  <text x="40" y="50" font-size="11.5" font-weight="700" fill="#3b82f6">이득 |T| (dB)</text>
  <line x1="90" y1="44" x2="90" y2="240" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="90" y1="240" x2="640" y2="240" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="90" y1="140" x2="640" y2="140" stroke="currentColor" stroke-opacity="0.5" stroke-dasharray="5 4"/>
  <text x="84" y="144" text-anchor="end" font-size="11" font-weight="700" fill="currentColor">0dB</text>
  <text x="84" y="84" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">+40</text>
  <text x="84" y="114" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">+20</text>
  <text x="84" y="174" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">−20</text>
  <path d="M90,80 L227,110 L365,140 L431,170 L502,200 L575,224" fill="none" stroke="#3b82f6" stroke-width="2.6" stroke-opacity="0.45"/>
  <text x="120" y="96" font-size="10" fill="#3b82f6" fill-opacity="0.7">원래</text>
  <path d="M90,50 L227,80 L365,110 L431,140 L502,170 L575,194" fill="none" stroke="#3b82f6" stroke-width="2.8"/>
  <text x="120" y="46" font-size="10.5" font-weight="700" fill="#3b82f6">이득 +20dB</text>
  <defs>
    <marker id="lgup" markerWidth="9" markerHeight="9" refX="3" refY="6" orient="auto"><path d="M3,0 L6,6 L0,6 Z" fill="#3b82f6"/></marker>
  </defs>
  <line x1="270" y1="115" x2="270" y2="92" stroke="#3b82f6" stroke-width="1.6" marker-end="url(#lgup)"/>
  <line x1="470" y1="188" x2="470" y2="165" stroke="#3b82f6" stroke-width="1.6" marker-end="url(#lgup)"/>
  <text x="286" y="108" font-size="10" fill="#3b82f6">곡선 전체가 위로 평행이동</text>
  <circle cx="365" cy="140" r="5" fill="currentColor" fill-opacity="0.6"/>
  <circle cx="431" cy="140" r="5.5" fill="#e0533d"/>
  <line x1="365" y1="44" x2="365" y2="500" stroke="currentColor" stroke-opacity="0.45" stroke-width="1.4" stroke-dasharray="4 3"/>
  <line x1="431" y1="44" x2="431" y2="500" stroke="#e0533d" stroke-width="1.6" stroke-dasharray="4 3"/>
  <text x="352" y="36" text-anchor="end" font-size="10.5" fill="currentColor" fill-opacity="0.7">원래 fc</text>
  <text x="352" y="48" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">10kHz</text>
  <text x="440" y="36" font-size="11" font-weight="700" fill="#e0533d">새 fc</text>
  <text x="440" y="48" font-size="10" fill="#e0533d">30kHz</text>
  <text x="40" y="300" font-size="11.5" font-weight="700" fill="#f59e0b">위상 (°) — <tspan fill="currentColor">전혀 안 움직임</tspan></text>
  <line x1="90" y1="300" x2="90" y2="480" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="90" y1="480" x2="640" y2="480" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="90" y1="390" x2="640" y2="390" stroke="#e0533d" stroke-dasharray="5 4" stroke-opacity="0.85"/>
  <text x="84" y="394" text-anchor="end" font-size="11" font-weight="700" fill="#e0533d">−180°</text>
  <text x="84" y="324" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">−90°</text>
  <text x="84" y="464" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">−270°</text>
  <path d="M90,320 L227,323 L300,331 L365,343 L400,362 L431,390 L470,412 L502,429 L575,447" fill="none" stroke="#f59e0b" stroke-width="2.8"/>
  <circle cx="365" cy="343" r="5" fill="currentColor" fill-opacity="0.6"/>
  <circle cx="431" cy="390" r="5.5" fill="#e0533d"/>
  <line x1="347" y1="343" x2="347" y2="390" stroke="#16a34a" stroke-width="2.4"/>
  <path d="M343,348 L347,341 L351,348 Z" fill="#16a34a"/>
  <path d="M343,385 L347,392 L351,385 Z" fill="#16a34a"/>
  <text x="338" y="360" text-anchor="end" font-size="11.5" font-weight="700" fill="#16a34a">PM 60°</text>
  <text x="338" y="374" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">(원래)</text>
  <text x="444" y="384" font-size="12" font-weight="700" fill="#e0533d">PM = 0°</text>
  <text x="444" y="399" font-size="10" fill="#e0533d">발진 경계</text>
  <g font-size="10" fill="currentColor" fill-opacity="0.7" text-anchor="middle">
    <text x="90" y="256">100Hz</text><text x="227" y="256">1kHz</text><text x="365" y="256">10kHz</text>
    <text x="502" y="256">100kHz</text><text x="640" y="256">1MHz</text>
    <text x="90" y="496">100Hz</text><text x="227" y="496">1kHz</text><text x="365" y="496">10kHz</text>
    <text x="502" y="496">100kHz</text><text x="640" y="496">1MHz</text>
  </g>
  <text x="40" y="528" font-size="12" fill="currentColor">이득 곡선은 <tspan font-weight="700" fill="#3b82f6">위로</tspan> 이동 → 0dB 교차점이 <tspan font-weight="700">오른쪽으로</tspan> 이동 (fc ↑)</text>
  <text x="40" y="550" font-size="12" fill="currentColor">위상 곡선은 <tspan font-weight="700" fill="#f59e0b">그대로</tspan> → 새 fc에서 위상은 이미 −180° → <tspan font-weight="700" fill="#e0533d">PM을 통째로 잃음</tspan></text>
  <text x="40" y="572" font-size="11.5" fill="currentColor" fill-opacity="0.7">→ 빠르면서도 안정하려면 위상 곡선 자체를 끌어올려야 한다 = <tspan font-weight="700">영점(zero)</tspan>의 역할</text>
</svg>

| | 이득 곡선 | 위상 곡선 | 새 fc에서의 위상 | PM |
|---|---|---|---|---|
| 원래 | — | — | −120° | **60°** |
| 이득 +20dB (fc 30kHz) | 위로 이동 | **그대로** | −180° | **0°** |

**공짜 대역폭은 없다.** 이득만 키우면 속도를 얻는 만큼 안정도를 정확히 잃는다. 그래서 보상기 설계의 실제 작업은 **위상 곡선 자체를 끌어올리는 것**이고, 그 도구가 **영점(zero)** 이다. 영점을 fc 근처에 배치하면 위상이 밀려 올라와 **fc를 높이면서도 PM을 지킬 수 있다.**

### PM은 공칭이 아니라 최악 조건에서 확보한다

세라믹 커패시터는 **DC 바이어스가 걸리면 실효 용량이 크게 줄어든다** (표기값의 절반 이하가 되기도 한다). 용량이 줄면 LC 공진점이 올라가고, 그만큼 **fc가 밀려 올라가 PM이 깎인다.** 온도·부품 편차·부하 범위까지 겹치면 공칭 45°가 실제 최악 조건에서 30° 밑으로 내려갈 수 있다.

그래서 실무에서는 **공칭 55~60°** 를 잡아두고 최악 조건에서 45°를 지키는 식으로 설계한다.

---

## 6. 외란이 "어디로" 들어오느냐가 전부다

같은 $T$ 인데도 결과가 정반대로 보이는 경우가 있다. 외란의 진입점이 다르기 때문이다.

| 외란 진입점 | 결과 | T가 클 때 |
|---|---|---|
| **피드백 경로** (주입 실험) | $A/B = T$ | 루프가 **충실히 따라가** 출력에 복사 |
| **출력 노드** (부하 스텝) | 남는 양 $= D/(1+T)$ | 루프가 **저항해서 지움** |

**출력 외란이 얼마나 남는지**는 부귀환의 기본식으로 나온다. 루프가 없다면 $D$ 만큼 흔들릴 상황에서, 실제 흔들림을 $V$ 라 하면 루프가 $T \cdot V$ 만큼 되돌려 놓으므로

$$V = D - T\,V \;\;\Rightarrow\;\; V(1+T) = D \;\;\Rightarrow\;\; \boxed{V = \frac{D}{1+T}}$$

$D = 100\text{mV}$ 기준으로:

| 주파수 | T | 남는 흔들림 |
|---|---|---|
| 100Hz | 1000 | 100mV / 1001 = **0.1mV** |
| fc (10kHz) | 1 | 100mV / 2 = **50mV** |
| 30kHz | 0.1 | 100mV / 1.1 = **91mV** |

이것을 임피던스로 쓰면 앞서 본 출력 임피던스 이야기와 같아진다.

$$Z_{out,\text{closed}} = \frac{Z_{out,\text{open}}}{1+T}$$

**루프가 출력을 뻣뻣하게 만들어주는 힘이 곧 루프이득**이고, 힘이 빠지는 고주파에서는 컨버터가 그냥 "LC + 캡 덩어리"로 돌아간다.

### 그래서 FB 레이아웃이 중요하다

피드백 경로에 낀 오차는 루프가 **명령으로 착각해 출력에 충실히 복사**한다. **이득을 아무리 키워도 해결되지 않는다.**

| 실제 사례 | 결과 |
|---|---|
| 분압 저항 정밀도 (1% vs 0.1%) | DC 오차가 그대로 출력 오차 |
| Vref 노이즈·드리프트 | 출력에 그대로 복사 |
| FB 트레이스에 SW 노드가 커플링 | 그만큼 출력이 흔들림 |
| 에러앰프 입력 오프셋 | 출력 오프셋 |

**FB 트레이스는 짧게, SW 노드·인덕터에서 멀리, 분압 저항은 FB 핀 가까이** — 레이아웃 가이드의 이 규칙들이 전부 여기서 나온다.

> 루프는 **자기가 보는 것을 진실이라 믿는다.** 센싱 경로를 더럽히면 루프가 그 거짓말을 출력에 그대로 구현한다.

---

## 7. 부하 스텝 — 캡과 루프의 역할 분담

<svg viewBox="0 0 760 430" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>부하 스텝에서 출력 커패시터와 루프의 역할 분담</title>
  <desc>초기 급락은 출력 커패시터가, 이후 회복은 루프가 담당한다.</desc>
  <defs>
    <marker id="lg3" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e0533d"/></marker>
    <marker id="lg4" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#3b82f6"/></marker>
  </defs>
  <text x="24" y="26" font-size="12.5" font-weight="700" fill="currentColor">부하가 갑자기 늘면 전류는 어디서 오나</text>
  <text x="24" y="86" font-size="11" fill="currentColor" fill-opacity="0.7">Vin</text>
  <line x1="46" y1="80" x2="66" y2="80" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5"/>
  <rect x="66" y="62" width="56" height="36" rx="4" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5"/>
  <text x="94" y="78" text-anchor="middle" font-size="10" fill="currentColor">스위치</text>
  <text x="94" y="91" text-anchor="middle" font-size="9" fill="currentColor" fill-opacity="0.7">듀티</text>
  <line x1="122" y1="80" x2="144" y2="80" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5"/>
  <rect x="144" y="70" width="44" height="20" rx="3" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5"/>
  <text x="166" y="85" text-anchor="middle" font-size="11" fill="currentColor">L</text>
  <line x1="188" y1="80" x2="256" y2="80" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5"/>
  <circle cx="222" cy="80" r="3.5" fill="currentColor"/>
  <text x="222" y="66" text-anchor="middle" font-size="10.5" font-weight="700" fill="currentColor">Vout</text>
  <line x1="222" y1="80" x2="222" y2="116" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="206" y1="116" x2="238" y2="116" stroke="currentColor" stroke-opacity="0.6" stroke-width="2"/>
  <line x1="206" y1="124" x2="238" y2="124" stroke="currentColor" stroke-opacity="0.6" stroke-width="2"/>
  <line x1="222" y1="124" x2="222" y2="146" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="210" y1="146" x2="234" y2="146" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5"/>
  <text x="246" y="108" font-size="10" fill="currentColor" fill-opacity="0.7">Cout</text>
  <line x1="256" y1="80" x2="256" y2="98" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5"/>
  <rect x="245" y="98" width="22" height="34" rx="3" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="256" y1="132" x2="256" y2="146" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5"/>
  <line x1="244" y1="146" x2="268" y2="146" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5"/>
  <text x="274" y="118" font-size="10" fill="currentColor" fill-opacity="0.7">부하 ↑</text>
  <path d="M222,112 C238,150 244,140 250,132" fill="none" stroke="#e0533d" stroke-width="2" marker-end="url(#lg3)"/>
  <text x="24" y="176" font-size="11.5" font-weight="700" fill="#e0533d">① 즉시 — 캡이 방전해서 공급</text>
  <text x="24" y="192" font-size="10" fill="currentColor" fill-opacity="0.7">인덕터 전류는 못 바뀜 → Vout 급락</text>
  <path d="M188,74 L250,74" fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#lg4)"/>
  <text x="24" y="220" font-size="11.5" font-weight="700" fill="#3b82f6">② 나중 — 루프가 듀티↑ → 인덕터가 공급</text>
  <text x="24" y="236" font-size="10" fill="currentColor" fill-opacity="0.7">FB 감지 → 보상기 → 듀티 → 전류 증가 (시간 걸림)</text>
  <text x="330" y="26" font-size="12.5" font-weight="700" fill="currentColor">그때 Vout 파형</text>
  <text x="330" y="52" font-size="10" fill="currentColor" fill-opacity="0.7">부하 전류</text>
  <path d="M340,86 L420,86 L420,62 L730,62" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.8"/>
  <line x1="340" y1="120" x2="340" y2="300" stroke="currentColor" stroke-opacity="0.4"/>
  <line x1="340" y1="300" x2="740" y2="300" stroke="currentColor" stroke-opacity="0.4"/>
  <text x="740" y="318" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">시간</text>
  <text x="332" y="132" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">Vout</text>
  <line x1="340" y1="190" x2="740" y2="190" stroke="currentColor" stroke-opacity="0.5" stroke-dasharray="4 4"/>
  <text x="746" y="194" font-size="9.5" fill="currentColor" fill-opacity="0.7">목표</text>
  <path d="M340,190 L418,190 L442,252 C470,252 486,205 512,193 C536,182 552,172 572,178 C596,185 606,194 636,190 C670,187 700,190 730,190" fill="none" stroke="#16a34a" stroke-width="2.6"/>
  <line x1="420" y1="120" x2="420" y2="300" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="3 3"/>
  <line x1="442" y1="266" x2="442" y2="290" stroke="#e0533d" stroke-width="1.4"/>
  <text x="404" y="330" font-size="11" font-weight="700" fill="#e0533d">① 급락</text>
  <text x="356" y="346" font-size="10" fill="currentColor" fill-opacity="0.7">= 캡 용량·ESR·ESL이 결정 (루프 무력)</text>
  <path d="M500,258 L500,215" fill="none" stroke="#3b82f6" stroke-width="1.4" marker-end="url(#lg4)"/>
  <text x="512" y="248" font-size="11" font-weight="700" fill="#3b82f6">② 회복 속도 = fc</text>
  <text x="512" y="263" font-size="10" fill="currentColor" fill-opacity="0.7">fc 높을수록 빨리 되돌아옴</text>
  <text x="604" y="148" font-size="11" font-weight="700" fill="currentColor">③ 출렁임 = PM</text>
  <text x="604" y="163" font-size="10" fill="currentColor" fill-opacity="0.7">PM 낮으면 오래 링잉</text>
  <text x="24" y="392" font-size="12" fill="currentColor"><tspan font-weight="700">고주파 성분(급락)</tspan>은 루프이득이 작아 못 막음 → 캡이 감당</text>
  <text x="24" y="414" font-size="12" fill="currentColor"><tspan font-weight="700">저주파 성분(그 이후)</tspan>은 루프이득이 커서 지워짐 → 목표 전압으로 복귀</text>
</svg>

부하 스텝은 **여러 주파수 성분의 합**이다. 날카로운 앞부분(고주파)은 루프이득이 작아 못 막으니 **캡이 감당**하고, 그 뒤 느린 성분은 루프이득이 커서 지워지므로 **결국 목표 전압으로 복귀**한다. 앞서 본 "외란의 90%가 남는다"가 눈에 보이는 형태가 바로 그 **딥**이다.

### 딥의 깊이를 만드는 세 가지

딥은 하나의 원인이 아니라 세 성분이 겹쳐 만들어진다.

1. **ESL × di/dt** — 부하가 튀는 맨 처음 순간의 뾰족한 스파이크 (ns 영역)
2. **ESR × ΔI** — 계단처럼 즉시 생기는 전압 강하
3. **Cout 용량** — 인덕터 전류가 새 부하 수준까지 올라오는 동안 캡이 방전되며 생기는 하강 — **대개 이것이 가장 크다**

**fc도 딥에 2차적인 영향은 준다.** 루프가 느리면 "듀티를 올려라"는 명령이 늦게 걸려 캡이 더 오래 방전되기 때문이다. 다만 루프를 아무리 빠르게 해도 **인덕터 전류 상승률 $(V_{in}-V_{out})/L$ 이라는 물리적 한계**에 부딪혀 거기서 멈춘다. 그 이상은 대역폭을 올려도 딥이 줄지 않는다.

**그래서 파형을 보고 원인을 이렇게 나눈다.**

| 증상 | 원인 | 처방 |
|---|---|---|
| **딥이 깊다** | 고주파는 루프가 못 막음 | **캡 용량↑ / ESR↓**, 필요시 **L↓** (대역폭은 효과 제한적) |
| **회복이 굼뜨다** | fc가 낮음 | **대역폭 확보** (보상기 이득↑) |
| **출렁임이 오래 감** | PM 부족 | **보상기 제로 배치 조정** |

딥이 문제인데 보상기만 만지작거리는 것은 시간 낭비다. 이 구분이 실장검토에서 파형을 읽는 기본 논리다.

---

## Key takeaways

- **루프이득 $T$ = 신호가 한 바퀴 돌고 온 배율.** 발진 조건은 **위상 −180° AND 이득 ≥ 1**.
- 측정은 Vout↔분압 사이에 저항을 끼우고 **트랜스로 플로팅 주입**. 강제되는 것은 **$B-A=V_{inj}$ 차이 하나**뿐이고, A와 B가 그걸 어떻게 나눠 갖는지가 곧 $T = A/B$.
- $V_{inj}$ 가 약분되어 사라지므로 **루프를 닫아둔 채로** 측정할 수 있다.
- 주입 지점은 **$Z_s \ll Z_L$** 인 곳. 전류는 흐르지만 **Zs가 작아 전압을 못 만들어야** A가 오직 루프를 통해서만 움직인다.
- 저항을 끼우면 **루프가 감지하는 노드는 A가 아니라 B**다. 그래서 저주파에서는 **B가 고정되고 A가 밀려난다.**
- 고주파에서 루프는 반응을 "못 하는" 것이 아니라 **반응이 지극히 작은** 것이다.
- **fc** = 이득이 0dB인 주파수(루프의 속도 한계), **PM** = fc에서 −180°까지 남은 각도, **GM** = −180°인 주파수에서 0dB까지의 여유.
- 외란이 **피드백 경로**로 들어오면 루프가 충실히 복사하고, **출력**으로 들어오면 $1/(1+T)$ 로 지운다. FB 레이아웃이 중요한 이유다.
- 부하 스텝의 **딥은 캡**이, **회복은 루프**가 결정한다.

---

## 퀴즈

다음 세션 전에 스스로 확인해보기 위한 문제들이다. 답을 먼저 떠올린 뒤 펼쳐볼 것.

**Q1.** 루프이득을 잴 때 신호발생기를 GND 기준으로 B 노드에 직접 물리면 안 된다. 왜일까?

<details>
<summary>답 보기</summary>

루프가 **진짜로 끊기기** 때문이다. 그러면 컨버터가 피드백을 잃어 출력이 레일로 튀고 DC 동작점이 무너져 측정 자체가 불가능해진다. 트랜스로 **플로팅 주입**하면 저항을 통해 **DC는 계속 이어져** 컨버터가 정상 동작하고, AC 섭동만 얹힌다.
</details>

**Q2.** 주입 저항 자리에서 $Z_s \ll Z_L$ 이어야 하는 이유는? "주입 전류가 안 흐르게 하려고"가 답이 아닌 이유까지 설명해보라.

<details>
<summary>답 보기</summary>

전류는 **흐른다**(직렬 폐루프이므로). 문제는 그 전류가 $Z_s$ 에서 만드는 **전압**이다. $Z_s$ 가 작으면 $i \times Z_s$ 가 10nV 수준이라, A는 **루프를 한 바퀴 돌아온 신호로만** 움직인다. $Z_s$ 가 크면 주입이 루프를 거치지 않고 A를 직접 밀어버려 측정이 오염된다. ($Z_L$ 이 커야 하는 이유는 주입 전류 자체를 작게 만들어 회로 동작을 안 건드리기 위해서다.)
</details>

**Q3.** $V_{ref}=1.0\text{V}$, $R_1=R_2$ 인 벅에 DC 20mV를 주입 저항 양단에 넣었다. A와 B는 각각 몇 V가 되나?

<details>
<summary>답 보기</summary>

**B = 2.000V, A = 1.980V.**

루프의 목표는 FB = 1.0V, 즉 **B = 2.0V**를 만드는 것이다. $B = A + 20\text{mV}$ 이므로 A는 1.98V로 밀려난다. 루프는 자기가 보는 B만 맞출 뿐, **A는 감지 대상이 아니다.**
</details>

**Q4.** 보드선도에서 fc = 10kHz이고 그 지점의 위상이 −135°였다. PM은 몇 도이고, 이 설계를 어떻게 평가하겠나?

<details>
<summary>답 보기</summary>

**PM = 45°.** 안정하긴 하지만 여유가 넉넉하지는 않다. 부하 스텝에서 링잉이 눈에 띄기 시작하는 수준이다. 보통 **45~60°** 를 목표로 하므로 하한선에 걸쳐 있다.
</details>

**Q5.** 부하 스텝 파형에서 **초기 딥이 너무 깊다**. 보상기 대역폭을 올리면 해결될까?

<details>
<summary>답 보기</summary>

**거의 해결되지 않는다.** 초기 딥은 스텝의 **고주파 성분**이 만드는데, 그 주파수에서는 루프이득이 이미 1보다 작아 루프가 무력하다. 그 구간을 지배하는 것은 **출력 커패시터의 용량·ESR·ESL**이다. → 처방은 **캡 보강**. 대역폭(fc)은 딥이 아니라 **회복 속도**를 결정한다.
</details>

---

*다음 글에서는 이 위에 **극점(pole)** 을 올린다 — "그럼 위상은 왜 밀리는가", 그리고 voltage mode의 LC 더블폴이 왜 보상을 까다롭게 만드는가.*
