+++
title = "[개념정리] PMOS(p채널) 동작영역 — NMOS와 무엇이 다른가"
date = 2026-07-15T05:00:00+09:00
series = "이론/원리"
description = "PMOS는 NMOS의 극성을 뒤집은 짝이다. 캐리어·소스 위치·켜는 조건·전류 방향이 어떻게 반대인지부터 잡고, 세 동작영역과 high-side 스위치·PMOS LDO 쓰임을 정리한다."
tags = ["개념정리", "MOSFET", "PMOS", "device", "fundamentals"]
+++

## 들어가며

앞의 [MOSFET(n채널) 동작영역](../mosfet-operating-regions/)을 봤다면, PMOS는 거의 다 온 셈이다. **PMOS는 NMOS의 극성을 통째로 뒤집은 짝**이다 — 캐리어가 전자 대신 정공(홀), 전압 부호가 전부 반대. pinch-off·채널전하·"saturation에서 왜 일정한가" 같은 **메커니즘은 NMOS와 완전히 동일**하다.

그래서 이 글은 *"NMOS와 무엇이 다른가"* 에 초점을 둔다. PMOS를 알아야 하는 이유는 명확하다 — **high-side 스위치**와 **PMOS LDO의 pass 소자**가 전부 PMOS다.

---

## 1. 한눈에 — NMOS vs PMOS 기본 동작 차이

| 항목 | NMOS (n채널) | PMOS (p채널) |
|------|-------------|-------------|
| 캐리어 | **전자** (음전하) | **정공(홀)** (양전하) |
| 몸통 / 소스·드레인 | p-body, **n+** S/D | n-body, **p+** S/D |
| 소스 위치 (관습) | 회로의 **낮은 쪽** (GND) | 회로의 **높은 쪽** (Vdd) |
| 문턱전압 $V_{th}$ 부호 | **양(+)** | **음(−)** |
| 켜는 조건 | $V_{GS} > V_{th}$ → 게이트를 소스보다 **높게** | $V_{GS} < V_{th}$ → 게이트를 소스보다 **낮게** |
| 전류 방향 (관습) | 드레인 → 소스 (D가 높음) | 소스 → 드레인 (S가 높음) |
| 이동도 | 전자 빠름 | 홀 느림 → 같은 크기면 $R_{DS(on)}$ **2~3배** |
| 주 용도 | low-side 스위치, 파워 스위치 | **high-side 스위치**, **PMOS LDO** pass |

**핵심 한 줄:** PMOS는 소스가 **위(Vdd)** 에 있고, 게이트를 소스보다 **낮춰야** 켜진다. 나머지는 NMOS를 거울에 비춘 것.

---

## 2. 구조 — 극성만 뒤집혔다

<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>NMOS vs PMOS 단면 비교</title>
  <desc>NMOS는 p-body에 n+ 소스/드레인, 전자 채널. PMOS는 n-body에 p+ 소스/드레인, 홀 채널. 극성이 반대.</desc>
  <!-- NMOS -->
  <text x="30" y="24" font-size="13" font-weight="700" fill="currentColor">NMOS — 전자 채널</text>
  <rect x="40" y="40" width="180" height="12" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-opacity="0.6"/>
  <text x="130" y="36" font-size="10" text-anchor="middle" fill="currentColor">Gate</text>
  <line x1="40" y1="54" x2="220" y2="54" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="3 2"/>
  <rect x="20" y="58" width="220" height="70" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.4"/>
  <text x="130" y="120" font-size="10" text-anchor="middle" fill="currentColor" fill-opacity="0.6">p-body</text>
  <rect x="20" y="58" width="48" height="42" fill="#3b82f6" fill-opacity="0.28" stroke="#3b82f6" stroke-opacity="0.6"/>
  <rect x="192" y="58" width="48" height="42" fill="#3b82f6" fill-opacity="0.28" stroke="#3b82f6" stroke-opacity="0.6"/>
  <text x="44" y="83" font-size="10" text-anchor="middle" fill="currentColor">S (n+)</text>
  <text x="216" y="83" font-size="10" text-anchor="middle" fill="currentColor">D (n+)</text>
  <text x="130" y="83" font-size="11" text-anchor="middle" fill="#3b82f6">전자 e⁻ →</text>
  <text x="30" y="160" font-size="11" fill="currentColor">소스 = 낮은 쪽 · 게이트를 소스보다 <tspan font-weight="700">↑</tspan> 올려 ON</text>
  <text x="30" y="178" font-size="11" fill="currentColor">V_GS &gt; V_th  (V_th 양수)</text>
  <!-- PMOS -->
  <text x="360" y="24" font-size="13" font-weight="700" fill="currentColor">PMOS — 홀 채널</text>
  <rect x="370" y="40" width="180" height="12" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-opacity="0.6"/>
  <text x="460" y="36" font-size="10" text-anchor="middle" fill="currentColor">Gate</text>
  <line x1="370" y1="54" x2="550" y2="54" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="3 2"/>
  <rect x="350" y="58" width="220" height="70" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.4"/>
  <text x="460" y="120" font-size="10" text-anchor="middle" fill="currentColor" fill-opacity="0.6">n-body</text>
  <rect x="350" y="58" width="48" height="42" fill="#e0533d" fill-opacity="0.26" stroke="#e0533d" stroke-opacity="0.6"/>
  <rect x="522" y="58" width="48" height="42" fill="#e0533d" fill-opacity="0.26" stroke="#e0533d" stroke-opacity="0.6"/>
  <text x="374" y="83" font-size="10" text-anchor="middle" fill="currentColor">S (p+)</text>
  <text x="546" y="83" font-size="10" text-anchor="middle" fill="currentColor">D (p+)</text>
  <text x="460" y="83" font-size="11" text-anchor="middle" fill="#e0533d">← 홀 h⁺</text>
  <text x="360" y="160" font-size="11" fill="currentColor">소스 = 높은 쪽 · 게이트를 소스보다 <tspan font-weight="700">↓</tspan> 내려 ON</text>
  <text x="360" y="178" font-size="11" fill="currentColor">V_GS &lt; V_th  (V_th 음수)</text>
  <!-- note -->
  <text x="30" y="215" font-size="11" fill="currentColor" fill-opacity="0.8">기호: 소스 화살표 방향이 반대 (NMOS 안쪽 ↔ PMOS 바깥쪽), PMOS는 게이트에 버블(◦)로도 표기.</text>
</svg>

n형과 p형만 서로 바뀌었을 뿐, 구조는 대칭이다. NMOS가 p-body에 n+ 소스/드레인이면, PMOS는 n-body에 p+ 소스/드레인이다.

---

## 3. 켜는 법 — 소스 기준으로 보기

PMOS는 소스가 **높은 쪽**(예: Vdd)에 붙어 있다. 게이트를 소스보다 $|V_{th}|$ 이상 **낮추면** 소스 밑에 홀 채널이 생긴다.

- 오버드라이브: $V_{OV} = V_{SG} - |V_{th}| = |V_{GS}| - |V_{th}|$
- 예 ($V_S = 5\text{V}$, $V_{th} = -1\text{V}$):
  - $V_G = 5\text{V}$ → $V_{SG}=0$ → **off** (cutoff)
  - $V_G = 2\text{V}$ → $V_{SG}=3\text{V}$ → $V_{OV}=2\text{V}$ → **on**
  - 게이트를 GND(0V)까지 당기면 → $V_{SG}=5\text{V}$ → **완전 ON**

> **직관:** NMOS는 게이트를 소스 위로 *올려서* 켜고, PMOS는 게이트를 소스 밑으로 *내려서* 켠다. high-side에서 소스가 Vdd라면, 게이트를 GND로 당기기만 하면 켜지니 편하다.

---

## 4. 세 동작영역 (크기 기준)

부호가 헷갈리면 **크기(절댓값)로 보면** NMOS와 똑같은 표가 된다. ($V_{OV}=|V_{GS}|-|V_{th}|$)

| 영역 | 조건 (크기 기준) | 동작 |
|------|----------------|------|
| **Cutoff** | $\lvert V_{GS}\rvert < \lvert V_{th}\rvert$ | 채널 없음, $I_D\approx0$ (OFF) |
| **Triode** | $\lvert V_{GS}\rvert>\lvert V_{th}\rvert$, $\;\lvert V_{DS}\rvert < V_{OV}$ | 전압제어 저항 ($R_{DS(on)}$) |
| **Saturation** | $\lvert V_{GS}\rvert>\lvert V_{th}\rvert$, $\;\lvert V_{DS}\rvert \ge V_{OV}$ | 전압제어 전류원 |

pinch-off, 채널 전하, "saturation에서 왜 전류가 일정한가"(직렬저항+전압분배) 같은 **원리는 NMOS 글과 100% 동일**하다 — 전자를 홀로, 부호를 반대로 읽으면 된다. 자세한 메커니즘은 [NMOS 글](../mosfet-operating-regions/)을 참고.

---

## 5. 전압–전류 곡선과 영역별 전류 흐름

세로축은 전류 크기 $I_D$, 가로축은 $V_{SD}$(소스가 드레인보다 높은 정도)다. NMOS와 곡선 모양은 같고, 축이 **소스 기준(양수)** 으로 바뀐 것뿐이다.

<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>PMOS 출력특성 I_D vs V_SD</title>
  <desc>V_SD를 올리면 triode(ohmic)에서 전류가 오르다 V_OV에서 꺾여 saturation에서 평평.</desc>
  <line x1="60" y1="280" x2="580" y2="280" stroke="currentColor" stroke-opacity="0.7"/>
  <line x1="60" y1="280" x2="60" y2="30" stroke="currentColor" stroke-opacity="0.7"/>
  <text x="575" y="300" font-size="12" text-anchor="end" fill="currentColor">V_SD</text>
  <text x="52" y="40" font-size="12" text-anchor="end" fill="currentColor">I_D</text>
  <path d="M60,280 Q210,150 350,90 L560,90" fill="none" stroke="#e0533d" stroke-width="2.2"/>
  <line x1="350" y1="90" x2="350" y2="280" stroke="#e0533d" stroke-opacity="0.4" stroke-dasharray="4 3"/>
  <text x="350" y="296" font-size="10.5" text-anchor="middle" fill="#e0533d">V_OV (큰 V_SG)</text>
  <path d="M60,280 Q150,210 220,185 L560,185" fill="none" stroke="#f59e0b" stroke-width="2.2"/>
  <line x1="220" y1="185" x2="220" y2="280" stroke="#f59e0b" stroke-opacity="0.4" stroke-dasharray="4 3"/>
  <text x="220" y="296" font-size="10.5" text-anchor="middle" fill="#f59e0b">V_OV (작은 V_SG)</text>
  <text x="120" y="120" font-size="12" fill="currentColor" fill-opacity="0.8">triode</text>
  <text x="120" y="136" font-size="9.5" fill="currentColor" fill-opacity="0.55">(ohmic, 오름)</text>
  <text x="450" y="70" font-size="12" fill="currentColor" fill-opacity="0.8">saturation</text>
  <text x="450" y="86" font-size="9.5" fill="currentColor" fill-opacity="0.55">(전류원, 평평)</text>
  <text x="465" y="175" font-size="11" fill="#e0533d">I_D,sat = ½·k·V_OV²</text>
</svg>

이제 영역별로 **어디에 전압이 걸리고 홀(정공)이 어떻게 흐르는지** 보자.

<svg viewBox="0 0 640 470" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>PMOS 영역별 바이어스와 홀 전류 흐름</title>
  <desc>Cutoff/Triode/Saturation 각각에서 S·G·D 전압과 홀(정공) 전류 경로.</desc>
  <defs>
    <marker id="ph" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e0533d"/></marker>
  </defs>
  <g transform="translate(0,20)">
    <text x="10" y="12" font-size="12.5" font-weight="700" fill="currentColor">① Cutoff — 게이트가 소스만큼 높음(V_SG=0) → 채널 없음</text>
    <text x="255" y="26" font-size="10" text-anchor="middle" fill="currentColor">Gate</text>
    <rect x="175" y="28" width="160" height="11" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-opacity="0.6"/>
    <line x1="175" y1="41" x2="335" y2="41" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="3 2"/>
    <rect x="155" y="44" width="200" height="50" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.4"/>
    <text x="255" y="88" font-size="9" text-anchor="middle" fill="currentColor" fill-opacity="0.55">n-body</text>
    <rect x="155" y="44" width="42" height="40" fill="#e0533d" fill-opacity="0.22" stroke="#e0533d" stroke-opacity="0.55"/>
    <rect x="313" y="44" width="42" height="40" fill="#e0533d" fill-opacity="0.22" stroke="#e0533d" stroke-opacity="0.55"/>
    <text x="176" y="67" font-size="10" text-anchor="middle" fill="currentColor">S</text>
    <text x="334" y="67" font-size="10" text-anchor="middle" fill="currentColor">D</text>
    <text x="390" y="46" font-size="11" fill="currentColor">S=5V · G=5V · D=0V</text>
    <text x="390" y="65" font-size="11" fill="#e0533d">V_SG = 0 → 채널 없음</text>
    <text x="390" y="84" font-size="11" fill="currentColor">I_D = 0 (OFF)</text>
  </g>
  <g transform="translate(0,170)">
    <text x="10" y="12" font-size="12.5" font-weight="700" fill="currentColor">② Triode(ohmic) — V_SG 큼 · V_SD 작음 → 채널 꽉 참, 저항처럼</text>
    <text x="255" y="26" font-size="10" text-anchor="middle" fill="currentColor">Gate</text>
    <rect x="175" y="28" width="160" height="11" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-opacity="0.6"/>
    <line x1="175" y1="41" x2="335" y2="41" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="3 2"/>
    <rect x="155" y="44" width="200" height="50" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.4"/>
    <rect x="155" y="44" width="42" height="40" fill="#e0533d" fill-opacity="0.22" stroke="#e0533d" stroke-opacity="0.55"/>
    <rect x="313" y="44" width="42" height="40" fill="#e0533d" fill-opacity="0.22" stroke="#e0533d" stroke-opacity="0.55"/>
    <text x="176" y="67" font-size="10" text-anchor="middle" fill="currentColor">S</text>
    <text x="334" y="67" font-size="10" text-anchor="middle" fill="currentColor">D</text>
    <rect x="197" y="46" width="116" height="11" fill="#e0533d" fill-opacity="0.4" stroke="#e0533d" stroke-opacity="0.5"/>
    <line x1="205" y1="72" x2="305" y2="72" stroke="#e0533d" stroke-width="2" marker-end="url(#ph)"/>
    <text x="255" y="68" font-size="9.5" text-anchor="middle" fill="#e0533d">홀 h⁺ →</text>
    <text x="390" y="46" font-size="11" fill="currentColor">S=5V · G=0V · D=4.5V</text>
    <text x="390" y="65" font-size="11" fill="#e0533d">V_SG=5 · V_SD=0.5</text>
    <text x="390" y="84" font-size="11" fill="currentColor">홀 S→D, I_D ∝ V_SD</text>
  </g>
  <g transform="translate(0,320)">
    <text x="10" y="12" font-size="12.5" font-weight="700" fill="currentColor">③ Saturation — V_SD 큼 → 드레인쪽 pinch-off, I_D 일정</text>
    <text x="255" y="26" font-size="10" text-anchor="middle" fill="currentColor">Gate</text>
    <rect x="175" y="28" width="160" height="11" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-opacity="0.6"/>
    <line x1="175" y1="41" x2="335" y2="41" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="3 2"/>
    <rect x="155" y="44" width="200" height="50" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.4"/>
    <rect x="155" y="44" width="42" height="40" fill="#e0533d" fill-opacity="0.22" stroke="#e0533d" stroke-opacity="0.55"/>
    <rect x="313" y="44" width="42" height="40" fill="#e0533d" fill-opacity="0.22" stroke="#e0533d" stroke-opacity="0.55"/>
    <text x="176" y="67" font-size="10" text-anchor="middle" fill="currentColor">S</text>
    <text x="334" y="67" font-size="10" text-anchor="middle" fill="currentColor">D</text>
    <polygon points="197,46 300,57 197,57" fill="#e0533d" fill-opacity="0.4" stroke="#e0533d" stroke-opacity="0.5"/>
    <rect x="300" y="44" width="13" height="40" fill="#e0533d" fill-opacity="0.12" stroke="#e0533d" stroke-opacity="0.45" stroke-dasharray="2 2"/>
    <text x="306" y="102" font-size="8" text-anchor="middle" fill="#e0533d">공핍</text>
    <line x1="205" y1="66" x2="288" y2="66" stroke="#e0533d" stroke-width="2" marker-end="url(#ph)"/>
    <text x="390" y="46" font-size="11" fill="currentColor">S=5V · G=0V · D=1V</text>
    <text x="390" y="65" font-size="11" fill="#e0533d">V_SG=5 · V_SD=4</text>
    <text x="390" y="84" font-size="11" fill="currentColor">pinch-off, I_D=½kV_OV² 고정</text>
  </g>
</svg>

- **Cutoff**: $V_{SG}=0$ (게이트가 소스만큼 높음) → 채널 없음 → 전류 없음.
- **Triode(ohmic)**: 게이트를 낮춰 $V_{SG}$ 크게 + $V_{SD}$ 작게 → 채널이 소스~드레인 꽉 참 → 홀이 S→D로 흐르고 $V_{SD}$ 에 비례(저항처럼).
- **Saturation**: $V_{SD}$ 를 키우면 드레인 쪽에서 채널이 pinch-off → 여분 전압은 공핍이 먹고 → $I_D$ 는 $\tfrac12 kV_{OV}^2$ 로 고정.

> 홀은 **소스(높은 전압)에서 드레인(낮은 전압)으로** 흐른다 — NMOS에서 전자가 소스→드레인으로 흐르던 것과 캐리어·방향이 반대다.

---

## 6. 실무 연결

<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>NMOS low-side vs PMOS high-side 스위치</title>
  <desc>NMOS는 부하 아래(low-side), 소스가 GND. PMOS는 부하 위(high-side), 소스가 Vdd.</desc>
  <!-- NMOS low-side -->
  <text x="30" y="24" font-size="13" font-weight="700" fill="currentColor">NMOS — low-side 스위치</text>
  <line x1="120" y1="46" x2="120" y2="70" stroke="currentColor" stroke-width="2"/>
  <text x="120" y="42" font-size="11" text-anchor="middle" fill="currentColor">Vdd</text>
  <rect x="90" y="70" width="60" height="34" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-opacity="0.6"/>
  <text x="120" y="92" font-size="10" text-anchor="middle" fill="currentColor">Load</text>
  <line x1="120" y1="104" x2="120" y2="128" stroke="currentColor" stroke-width="2"/>
  <rect x="88" y="128" width="64" height="44" fill="#3b82f6" fill-opacity="0.14" stroke="#3b82f6" stroke-opacity="0.7"/>
  <text x="120" y="147" font-size="10" text-anchor="middle" fill="currentColor">NMOS</text>
  <text x="120" y="162" font-size="9" text-anchor="middle" fill="currentColor" fill-opacity="0.7">D 위 / S 아래</text>
  <line x1="120" y1="172" x2="120" y2="196" stroke="currentColor" stroke-width="2"/>
  <line x1="100" y1="196" x2="140" y2="196" stroke="currentColor" stroke-width="2"/>
  <text x="120" y="212" font-size="10" text-anchor="middle" fill="currentColor">GND</text>
  <text x="30" y="245" font-size="11" fill="currentColor">소스 = GND(고정) → 게이트를</text>
  <text x="30" y="262" font-size="11" fill="currentColor">소스 위로 올리기 쉬움 (ON 간단)</text>
  <!-- PMOS high-side -->
  <text x="360" y="24" font-size="13" font-weight="700" fill="currentColor">PMOS — high-side 스위치</text>
  <line x1="450" y1="46" x2="450" y2="70" stroke="currentColor" stroke-width="2"/>
  <text x="450" y="42" font-size="11" text-anchor="middle" fill="currentColor">Vdd</text>
  <rect x="418" y="70" width="64" height="44" fill="#e0533d" fill-opacity="0.14" stroke="#e0533d" stroke-opacity="0.7"/>
  <text x="450" y="89" font-size="10" text-anchor="middle" fill="currentColor">PMOS</text>
  <text x="450" y="104" font-size="9" text-anchor="middle" fill="currentColor" fill-opacity="0.7">S 위 / D 아래</text>
  <line x1="450" y1="114" x2="450" y2="138" stroke="currentColor" stroke-width="2"/>
  <rect x="420" y="138" width="60" height="34" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-opacity="0.6"/>
  <text x="450" y="160" font-size="10" text-anchor="middle" fill="currentColor">Load</text>
  <line x1="450" y1="172" x2="450" y2="196" stroke="currentColor" stroke-width="2"/>
  <line x1="430" y1="196" x2="470" y2="196" stroke="currentColor" stroke-width="2"/>
  <text x="450" y="212" font-size="10" text-anchor="middle" fill="currentColor">GND</text>
  <text x="360" y="245" font-size="11" fill="currentColor">소스 = Vdd(높음) → 게이트를</text>
  <text x="360" y="262" font-size="11" fill="currentColor">GND로 당기면 ON (간단)</text>
</svg>

- **High-side 스위치**: 부하 위쪽에서 Vdd를 연결/차단. PMOS면 소스가 Vdd라 **게이트를 GND로 당기기만 하면 ON** — high-side NMOS처럼 부트스트랩/차지펌프가 없어도 된다. 대신 $R_{DS(on)}$ 이 커서 도통손실은 불리.
- **PMOS LDO**: pass PMOS의 소스=$V_{in}$, 드레인=$V_{out}$. 게이트를 낮춰 $V_{out}$ 을 조절한다. 게이트를 GND 근처까지 낮출 수 있어 $V_{SD}$ 를 아주 작게 가져갈 수 있다 → **낮은 dropout**. (NMOS LDO는 게이트를 $V_{out}+V_{th}$ 이상 올려야 해서 차지펌프가 필요.)
- **파워 스위치**는 이동도 때문에 같은 면적이면 NMOS가 저항이 작아 주로 NMOS를 쓴다.

---

## Key takeaways

- PMOS = NMOS의 **극성 반전 짝**. 캐리어=홀, $V_{th}<0$, 소스=높은 쪽, 게이트를 소스보다 **낮춰야** ON.
- 크기 기준($V_{OV}=|V_{GS}|-|V_{th}|$)으로 보면 세 영역(cutoff/triode/saturation) 표가 NMOS와 **똑같다.**
- pinch-off·전류 일정 메커니즘은 NMOS와 **완전히 동일** (전자→홀, 부호 반대).
- 이동도 때문에 $R_{DS(on)}$ 이 2~3배 → 파워 스위치는 NMOS 선호, PMOS는 **high-side·LDO**에서 게이트 드라이브 간편함으로 활약.

---

*Reference: 소자 동작영역은 표준 반도체 소자물리(Sedra/Smith, Razavi 등). 응용 맥락은 Erickson & Maksimović, Fundamentals of Power Electronics, 2nd Ed.*
