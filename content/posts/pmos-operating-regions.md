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

<svg viewBox="0 0 700 250" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>NMOS와 PMOS 단면 비교</title>
  <desc>NMOS는 p-substrate에 n+ 소스/드레인과 전자 채널, PMOS는 n-substrate에 p+ 소스/드레인과 홀 채널을 갖는다.</desc>
  <text x="20" y="24" font-size="12.5" font-weight="700" fill="#3b82f6">NMOS — 전자 채널</text>
  <g transform="translate(0,34)">
    <rect x="20" y="60" width="290" height="70" fill="#7fb3d5" fill-opacity="0.16" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="165" y="122" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity="0.7">P-substrate</text>
    <rect x="26" y="60" width="62" height="34" rx="7" fill="#e8c86a" fill-opacity="0.35" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.2"/>
    <text x="57" y="81" text-anchor="middle" font-size="10.5" font-weight="700" fill="currentColor">N+</text>
    <rect x="242" y="60" width="62" height="34" rx="7" fill="#e8c86a" fill-opacity="0.35" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.2"/>
    <text x="273" y="81" text-anchor="middle" font-size="10.5" font-weight="700" fill="currentColor">N+</text>
    <rect x="100" y="34" width="130" height="26" fill="#7fd5a5" fill-opacity="0.3" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.2"/>
    <text x="165" y="52" text-anchor="middle" font-size="10" fill="currentColor">SiO2</text>
    <rect x="96" y="20" width="138" height="14" fill="#e8c86a" fill-opacity="0.5" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.2"/>
    <line x1="165" y1="20" x2="165" y2="8" stroke="currentColor" stroke-width="1.3"/>
    <text x="171" y="16" font-size="10" font-weight="700" fill="currentColor">Gate</text>
    <line x1="57" y1="60" x2="57" y2="40" stroke="currentColor" stroke-width="1.3"/>
    <text x="51" y="36" text-anchor="end" font-size="10" font-weight="700" fill="currentColor">S (낮은 쪽)</text>
    <line x1="273" y1="60" x2="273" y2="40" stroke="currentColor" stroke-width="1.3"/>
    <text x="279" y="36" font-size="10" font-weight="700" fill="currentColor">D</text>
    <polygon points="88,60 242,60 242,70 88,70" fill="#3b82f6" fill-opacity="0.45" stroke="#3b82f6" stroke-opacity="0.8"/>
    <text x="165" y="88" text-anchor="middle" font-size="10.5" fill="#3b82f6">전자 e&#8315; →</text>
  </g>
  <text x="20" y="200" font-size="11" fill="currentColor">소스 = 회로의 낮은 쪽 · 게이트를 소스보다 올려서 ON</text>
  <text x="20" y="219" font-size="11" fill="currentColor">V_GS &gt; V_th (V_th 양수)</text>
  <text x="360" y="24" font-size="12.5" font-weight="700" fill="#e0533d">PMOS — 홀 채널</text>
  <g transform="translate(340,34)">
    <rect x="20" y="60" width="290" height="70" fill="#e8a06a" fill-opacity="0.16" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="165" y="122" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity="0.7">N-substrate (n-well)</text>
    <rect x="26" y="60" width="62" height="34" rx="7" fill="#7fb3d5" fill-opacity="0.35" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.2"/>
    <text x="57" y="81" text-anchor="middle" font-size="10.5" font-weight="700" fill="currentColor">P+</text>
    <rect x="242" y="60" width="62" height="34" rx="7" fill="#7fb3d5" fill-opacity="0.35" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.2"/>
    <text x="273" y="81" text-anchor="middle" font-size="10.5" font-weight="700" fill="currentColor">P+</text>
    <rect x="100" y="34" width="130" height="26" fill="#7fd5a5" fill-opacity="0.3" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.2"/>
    <text x="165" y="52" text-anchor="middle" font-size="10" fill="currentColor">SiO2</text>
    <rect x="96" y="20" width="138" height="14" fill="#e8c86a" fill-opacity="0.5" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.2"/>
    <line x1="165" y1="20" x2="165" y2="8" stroke="currentColor" stroke-width="1.3"/>
    <text x="171" y="16" font-size="10" font-weight="700" fill="currentColor">Gate</text>
    <line x1="57" y1="60" x2="57" y2="40" stroke="currentColor" stroke-width="1.3"/>
    <text x="51" y="36" text-anchor="end" font-size="10" font-weight="700" fill="currentColor">S (높은 쪽)</text>
    <line x1="273" y1="60" x2="273" y2="40" stroke="currentColor" stroke-width="1.3"/>
    <text x="279" y="36" font-size="10" font-weight="700" fill="currentColor">D</text>
    <polygon points="88,60 242,60 242,70 88,70" fill="#e0533d" fill-opacity="0.45" stroke="#e0533d" stroke-opacity="0.8"/>
    <text x="165" y="88" text-anchor="middle" font-size="10.5" fill="#e0533d">← 홀 h&#8314;</text>
  </g>
  <text x="360" y="200" font-size="11" fill="currentColor">소스 = 회로의 높은 쪽 · 게이트를 소스보다 내려서 ON</text>
  <text x="360" y="219" font-size="11" fill="currentColor">V_GS &lt; V_th (V_th 음수)</text>
  <line x1="332" y1="14" x2="332" y2="228" stroke="currentColor" stroke-opacity="0.25" stroke-dasharray="4 4"/>
  <text x="20" y="242" font-size="10.5" fill="currentColor" fill-opacity="0.7">n형과 p형만 서로 바뀌었을 뿐 구조는 대칭이다. 기호에서는 소스 화살표 방향이 반대이고, PMOS는 게이트에 버블로도 표기한다.</text>
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

> ## 두 영역을 가르는 기준은 NMOS와 똑같다
>
> **홀 채널이 소스에서 드레인 끝까지 끊김 없이 이어져 있으면 triode(ohmic), 드레인에 닿기 전에 끊기면 saturation이다.**
>
> - 드레인 끝의 오버드라이브 **> 0** → 채널이 끝까지 도달 → **triode** (= $\lvert V_{DS}\rvert < V_{OV}$)
> - 드레인 끝의 오버드라이브 **≤ 0** → 드레인 앞에서 끊김 → **saturation** (= $\lvert V_{DS}\rvert \ge V_{OV}$)

**"이어져 있다"가 "두께가 균일하다"는 뜻은 아니다.** $V_{SD}$ 가 아주 작으면 채널이 거의 균일해 **진짜 선형**(순수 저항)이고, $V_{SD}$ 가 $V_{OV}$ 에 가까워질수록 드레인 쪽이 얇아져 **곡선이 휘어진다.** 그래도 끊기지만 않으면 여전히 triode다.

그리고 **통하는 채널이 실제로 보는 전압**이 두 영역에서 다르다 — 이것이 하나는 저항처럼, 다른 하나는 전류원처럼 동작하는 이유다.

| | 통하는 채널 양단 전압 | 그래서 |
|---|---|---|
| **Triode** ($V_{SD}=1\text{V}$) | **$V_{SD}$ 전부** (1V) | $V_{SD}$ 를 올리면 미는 힘이 그대로 커짐 → **저항** |
| **경계** ($V_{SD}=V_{OV}$) | 4V | 드레인 끝 두께가 0이 되는 지점 |
| **Saturation** ($V_{SD}=6\text{V}$) | **여전히 $V_{OV}$** (4V), 나머지는 공핍이 흡수 | 채널이 보는 조건이 안 변함 → **전류 고정** |

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

<svg viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>세 조건에서의 PMOS(p채널) 단면</title>
  <desc>ohmic, pinch-off 경계, saturation을 PMOS 단면도로 나타낸 그림. 소스가 높은 쪽이고 홀이 소스에서 드레인으로 흐른다.</desc>
  <text x="20" y="16" font-size="10.5" fill="currentColor" fill-opacity="0.7">V_SG = 5V, |V_th| = 1V → V_OV = 4V (게이트를 소스보다 5V 낮춰 켠 상태)</text>
  <text x="20" y="36" font-size="12.5" font-weight="700" fill="currentColor">① V_SD = 1V — 채널이 끝까지 이어짐 · V_SD 전부가 채널에 걸림 → 저항 (triode)</text>
  <g transform="translate(0,42)">
    <rect x="60" y="60" width="500" height="90" fill="#e8a06a" fill-opacity="0.16" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.4"/>
    <text x="310" y="140" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">N-substrate (n-well)</text>
    <rect x="70" y="60" width="100" height="40" rx="8" fill="#7fb3d5" fill-opacity="0.35" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="120" y="85" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">P+</text>
    <rect x="450" y="60" width="100" height="40" rx="8" fill="#7fb3d5" fill-opacity="0.35" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="500" y="85" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">P+</text>
    <rect x="180" y="30" width="260" height="30" fill="#7fd5a5" fill-opacity="0.3" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="310" y="50" text-anchor="middle" font-size="11" fill="currentColor">SiO2</text>
    <rect x="175" y="14" width="270" height="16" fill="#e8c86a" fill-opacity="0.5" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <line x1="310" y1="14" x2="310" y2="2" stroke="currentColor" stroke-width="1.4"/>
    <text x="318" y="10" font-size="10.5" font-weight="700" fill="currentColor">Gate 1V</text>
    <line x1="120" y1="60" x2="120" y2="34" stroke="currentColor" stroke-width="1.4"/>
    <text x="112" y="30" text-anchor="end" font-size="10.5" font-weight="700" fill="currentColor">S 6V</text>
    <line x1="500" y1="60" x2="500" y2="34" stroke="currentColor" stroke-width="1.4"/>
    <text x="508" y="30" font-size="10.5" font-weight="700" fill="currentColor">D 5V</text>
    <polygon points="170,60 450,60 450,72 170,75" fill="#e0533d" fill-opacity="0.45" stroke="#e0533d" stroke-opacity="0.8"/>
    <text x="310" y="92" text-anchor="middle" font-size="10" fill="#e0533d">홀 채널 h&#8314; — 두께 거의 균일, S→D</text>
    <line x1="170" y1="160" x2="450" y2="160" stroke="#e0533d" stroke-width="1.4"/>
    <line x1="170" y1="156" x2="170" y2="164" stroke="#e0533d" stroke-width="1.4"/>
    <line x1="450" y1="156" x2="450" y2="164" stroke="#e0533d" stroke-width="1.4"/>
    <text x="310" y="176" text-anchor="middle" font-size="10" fill="#e0533d">통하는 채널 L&#8242; — 양단에 1V (= V_SD 전부)</text>
  </g>
  <text x="20" y="254" font-size="12.5" font-weight="700" fill="currentColor">② V_SD = V_OV = 4V — 드레인 끝 두께 0 → pinch-off (경계)</text>
  <g transform="translate(0,260)">
    <rect x="60" y="60" width="500" height="90" fill="#e8a06a" fill-opacity="0.16" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.4"/>
    <text x="310" y="140" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">N-substrate (n-well)</text>
    <rect x="70" y="60" width="100" height="40" rx="8" fill="#7fb3d5" fill-opacity="0.35" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="120" y="85" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">P+</text>
    <rect x="450" y="60" width="100" height="40" rx="8" fill="#7fb3d5" fill-opacity="0.35" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="500" y="85" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">P+</text>
    <rect x="180" y="30" width="260" height="30" fill="#7fd5a5" fill-opacity="0.3" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="310" y="50" text-anchor="middle" font-size="11" fill="currentColor">SiO2</text>
    <rect x="175" y="14" width="270" height="16" fill="#e8c86a" fill-opacity="0.5" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <line x1="310" y1="14" x2="310" y2="2" stroke="currentColor" stroke-width="1.4"/>
    <text x="318" y="10" font-size="10.5" font-weight="700" fill="currentColor">Gate 1V</text>
    <line x1="120" y1="60" x2="120" y2="34" stroke="currentColor" stroke-width="1.4"/>
    <text x="112" y="30" text-anchor="end" font-size="10.5" font-weight="700" fill="currentColor">S 6V</text>
    <line x1="500" y1="60" x2="500" y2="34" stroke="currentColor" stroke-width="1.4"/>
    <text x="508" y="30" font-size="10.5" font-weight="700" fill="currentColor">D 2V</text>
    <polygon points="170,60 450,60 170,75" fill="#e0533d" fill-opacity="0.45" stroke="#e0533d" stroke-opacity="0.8"/>
    <text x="441" y="72" font-size="13" fill="#3b82f6">&#9986;</text>
    <text x="386" y="92" font-size="9.5" fill="#3b82f6">여기서 두께 0</text>
    <line x1="170" y1="160" x2="450" y2="160" stroke="#e0533d" stroke-width="1.4"/>
    <line x1="170" y1="156" x2="170" y2="164" stroke="#e0533d" stroke-width="1.4"/>
    <line x1="450" y1="156" x2="450" y2="164" stroke="#e0533d" stroke-width="1.4"/>
    <text x="310" y="176" text-anchor="middle" font-size="10" fill="#e0533d">통하는 채널 L&#8242; — 양단에 4V (= V_OV)</text>
  </g>
  <text x="20" y="472" font-size="12.5" font-weight="700" fill="currentColor">③ V_SD = 6V — 여분 2V는 공핍이 먹음 · 채널은 여전히 4V만 봄 → 전류 고정 (saturation)</text>
  <g transform="translate(0,478)">
    <rect x="60" y="60" width="500" height="90" fill="#e8a06a" fill-opacity="0.16" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.4"/>
    <text x="310" y="140" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">N-substrate (n-well)</text>
    <rect x="70" y="60" width="100" height="40" rx="8" fill="#7fb3d5" fill-opacity="0.35" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="120" y="85" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">P+</text>
    <rect x="450" y="60" width="100" height="40" rx="8" fill="#7fb3d5" fill-opacity="0.35" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="500" y="85" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">P+</text>
    <rect x="180" y="30" width="260" height="30" fill="#7fd5a5" fill-opacity="0.3" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="310" y="50" text-anchor="middle" font-size="11" fill="currentColor">SiO2</text>
    <rect x="175" y="14" width="270" height="16" fill="#e8c86a" fill-opacity="0.5" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <line x1="310" y1="14" x2="310" y2="2" stroke="currentColor" stroke-width="1.4"/>
    <text x="318" y="10" font-size="10.5" font-weight="700" fill="currentColor">Gate 1V</text>
    <line x1="120" y1="60" x2="120" y2="34" stroke="currentColor" stroke-width="1.4"/>
    <text x="112" y="30" text-anchor="end" font-size="10.5" font-weight="700" fill="currentColor">S 6V</text>
    <line x1="500" y1="60" x2="500" y2="34" stroke="currentColor" stroke-width="1.4"/>
    <text x="508" y="30" font-size="10.5" font-weight="700" fill="currentColor">D 0V</text>
    <polygon points="170,60 390,60 170,75" fill="#e0533d" fill-opacity="0.45" stroke="#e0533d" stroke-opacity="0.8"/>
    <rect x="390" y="60" width="60" height="16" fill="#3b82f6" fill-opacity="0.16" stroke="#3b82f6" stroke-opacity="0.6" stroke-dasharray="3 2"/>
    <text x="420" y="92" text-anchor="middle" font-size="9.5" fill="#3b82f6">공핍 (여분 2V)</text>
    <line x1="170" y1="160" x2="390" y2="160" stroke="#e0533d" stroke-width="1.4"/>
    <line x1="170" y1="156" x2="170" y2="164" stroke="#e0533d" stroke-width="1.4"/>
    <line x1="390" y1="156" x2="390" y2="164" stroke="#e0533d" stroke-width="1.4"/>
    <text x="280" y="176" text-anchor="middle" font-size="10" fill="#e0533d">L&#8242; 짧아짐 — 그래도 양단은 여전히 4V</text>
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
