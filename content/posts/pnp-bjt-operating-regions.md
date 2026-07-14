+++
title = "[개념정리] PNP BJT 동작영역 — NPN과 무엇이 다른가"
date = 2026-07-15T05:30:00+09:00
series = "이론/원리"
description = "PNP는 NPN의 극성을 뒤집은 짝이다. 캐리어·이미터 위치·켜는 조건·전류 방향이 어떻게 반대인지부터 잡고, 세 동작영역과 high-side 쓰임을 정리한다."
tags = ["개념정리", "BJT", "PNP", "device", "fundamentals"]
+++

## 들어가며

앞의 [BJT(npn) 동작영역](../bjt-npn-operating-regions/)을 봤다면 PNP도 거의 끝났다. **PNP는 NPN의 극성을 통째로 뒤집은 짝**이다 — 캐리어가 전자 대신 정공(홀), 전압·전류 방향이 전부 반대. 얇은 베이스를 캐리어가 관통하고 컬렉터가 "청소기"처럼 걷어가는 **동작 원리는 NPN과 완전히 동일**하다.

그래서 이 글도 *"NPN과 무엇이 다른가"* 에 초점을 둔다. PNP는 **high-side 스위치**나 밴드갭·미러 같은 데서 **high-side 전류원**으로 자주 쓴다.

---

## 1. 한눈에 — NPN vs PNP 기본 동작 차이

| 항목 | NPN | PNP |
|------|-----|-----|
| 구조 | **n-p-n** | **p-n-p** |
| 이미터가 주입하는 캐리어 | **전자** | **정공(홀)** |
| 이미터 위치 (관습) | 회로의 **낮은 쪽** | 회로의 **높은 쪽** |
| BE(이미터) 켜는 조건 | $V_{BE}\approx+0.7\text{V}$ (베이스가 이미터보다 **높게**) | $V_{EB}\approx+0.7\text{V}$ (베이스가 이미터보다 **낮게**) |
| 베이스 전류 방향 | 베이스로 **흘러들어감** | 베이스에서 **흘러나옴** |
| 컬렉터 전류 방향 | 컬렉터로 **들어감** (C가 높음) | 컬렉터에서 **나옴** (E가 높음) |
| 기호 이미터 화살표 | **밖으로** (npn) | **안으로** (pnp) |
| 주 용도 | low-side 스위치·증폭 | **high-side** 스위치·전류원 |

**핵심 한 줄:** PNP는 이미터가 **위(높은 쪽)** 에 있고, 베이스를 이미터보다 **~0.7V 낮추면** 켜진다. 그리고 베이스 전류는 **빼내는(흘러나오는)** 방향이다. 나머지는 NPN을 거울에 비춘 것.

---

## 2. 구조와 기호 — 극성만 뒤집혔다

<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>NPN vs PNP 구조와 기호</title>
  <desc>NPN은 n-p-n, 이미터 화살표 밖으로. PNP는 p-n-p, 이미터 화살표 안으로. 전류 방향이 반대.</desc>
  <!-- NPN -->
  <text x="30" y="24" font-size="13" font-weight="700" fill="currentColor">NPN — n-p-n</text>
  <rect x="60" y="40" width="150" height="46" rx="4" fill="#3b82f6" fill-opacity="0.16" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="135" y="68" font-size="11" text-anchor="middle" fill="currentColor">Collector (n)</text>
  <rect x="60" y="86" width="150" height="26" fill="#e0533d" fill-opacity="0.2" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="135" y="103" font-size="10" text-anchor="middle" fill="currentColor">Base (p)</text>
  <rect x="60" y="112" width="150" height="46" rx="4" fill="#3b82f6" fill-opacity="0.28" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="135" y="140" font-size="11" text-anchor="middle" fill="currentColor">Emitter (n+)</text>
  <!-- npn symbol -->
  <line x1="90" y1="185" x2="90" y2="245" stroke="currentColor" stroke-width="3"/>
  <line x1="55" y1="215" x2="90" y2="215" stroke="currentColor" stroke-width="2"/>
  <text x="46" y="219" font-size="11" text-anchor="end" fill="currentColor">B</text>
  <line x1="90" y1="200" x2="128" y2="178" stroke="currentColor" stroke-width="2"/>
  <text x="134" y="182" font-size="11" fill="currentColor">C</text>
  <line x1="90" y1="230" x2="128" y2="252" stroke="currentColor" stroke-width="2"/>
  <text x="134" y="256" font-size="11" fill="currentColor">E</text>
  <path d="M114,238 L128,252 L110,251 Z" fill="#3b82f6"/>
  <text x="30" y="285" font-size="10.5" fill="currentColor" fill-opacity="0.8">이미터 화살표 <tspan font-weight="700">밖으로</tspan> · 이미터 낮은 쪽</text>
  <!-- PNP -->
  <text x="360" y="24" font-size="13" font-weight="700" fill="currentColor">PNP — p-n-p</text>
  <rect x="390" y="40" width="150" height="46" rx="4" fill="#e0533d" fill-opacity="0.16" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="465" y="68" font-size="11" text-anchor="middle" fill="currentColor">Emitter (p+)</text>
  <rect x="390" y="86" width="150" height="26" fill="#3b82f6" fill-opacity="0.2" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="465" y="103" font-size="10" text-anchor="middle" fill="currentColor">Base (n)</text>
  <rect x="390" y="112" width="150" height="46" rx="4" fill="#e0533d" fill-opacity="0.26" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="465" y="140" font-size="11" text-anchor="middle" fill="currentColor">Collector (p)</text>
  <!-- pnp symbol -->
  <line x1="420" y1="185" x2="420" y2="245" stroke="currentColor" stroke-width="3"/>
  <line x1="385" y1="215" x2="420" y2="215" stroke="currentColor" stroke-width="2"/>
  <text x="376" y="219" font-size="11" text-anchor="end" fill="currentColor">B</text>
  <line x1="420" y1="200" x2="458" y2="178" stroke="currentColor" stroke-width="2"/>
  <text x="464" y="182" font-size="11" fill="currentColor">E</text>
  <line x1="420" y1="230" x2="458" y2="252" stroke="currentColor" stroke-width="2"/>
  <text x="464" y="256" font-size="11" fill="currentColor">C</text>
  <path d="M420,200 L436,206 L428,190 Z" fill="#e0533d"/>
  <text x="360" y="285" font-size="10.5" fill="currentColor" fill-opacity="0.8">이미터 화살표 <tspan font-weight="700">안으로</tspan> · 이미터 높은 쪽</text>
</svg>

n형과 p형만 서로 바뀌었다. NPN에서 이미터가 위에 오도록 그리면(관습), PNP는 이미터가 다시 위이되 재료가 p+ 다. 기호에서 **이미터 화살표 방향**이 결정적: **밖으로 = npn, 안으로 = pnp** ("Pointing iN = PNP"로 외운다).

---

## 3. 켜는 법 — 이미터 기준으로 보기

PNP는 이미터가 **높은 쪽**(예: $V_{CC}$)에 붙어 있다. 베이스를 이미터보다 **약 0.7V 낮추면**($V_{EB}\approx0.7\text{V}$) EB 접합이 순방향이 되어, 이미터(p+)가 **홀**을 베이스로 쏜다.

- 베이스 전류는 **밖으로 흘러나온다.** 즉 켜려면 베이스에서 전류를 **빼내야**(sink) 한다. (NPN은 베이스로 넣어줬다.)
- 홀이 얇은 베이스를 관통 → 컬렉터가 걷어감 → $I_C = \beta I_B$ (크기 기준). 방향은 **이미터 → 컬렉터**(관습 전류)로, 컬렉터에서 흘러나온다.

> **직관:** NPN은 베이스를 이미터 위로 *올리고* 전류를 *넣어서* 켠다. PNP는 베이스를 이미터 밑으로 *내리고* 전류를 *빼서* 켠다. 딱 거울상.

---

## 4. 세 동작영역

두 접합(EB·CB)의 순방향/역방향 조합은 NPN과 같고, 전압 부호만 반대다. ($V_{EC}$ = 이미터가 컬렉터보다 얼마나 높은가)

| 영역 | EB 접합 | CB 접합 | 하는 일 |
|------|---------|---------|---------|
| **Cutoff** | 역(off) | 역 | 스위치 **OFF** ($I_C\approx0$) |
| **Active** | 순(on) | 역 | **증폭 / 전류원** ($I_C=\beta I_B$) |
| **Saturation** | 순(on) | 순 | 스위치 **ON** ($V_{EC}\approx0.2\text{V}$) |

- **Active**에선 $V_{EC}$ 가 넉넉히 크고(이미터가 컬렉터보다 높음, CB 역방향), $I_C=\beta I_B$ 로 전류원.
- **Saturation**에선 $V_{EC}$ 가 $0.2\text{V}$ 바닥까지 떨어지고(CB도 순방향), $I_C$ 는 외부회로가 정하는 값에 묶인다.

캐리어 주입, 얇은 베이스 관통, 컬렉터의 "청소기", 그리고 **"BC(여기선 CB)-on은 외부회로 한계의 증상"** 같은 원리는 [NPN 글](../bjt-npn-operating-regions/)과 100% 동일하다 — 전자를 홀로, 부호를 반대로 읽으면 된다.

---

## 5. 전압–전류 곡선과 영역별 전류 흐름

세로축은 컬렉터 전류 $I_C$, 가로축은 $V_{EC}$(이미터가 컬렉터보다 높은 정도)다. NPN과 곡선 모양은 같고, 축이 **이미터 기준** 으로 바뀐 것뿐이다.

<svg viewBox="0 0 640 380" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>PNP 출력특성 I_C vs V_EC</title>
  <desc>V_EC 0.2V 이하 가파른 saturation, 이후 평평한 active. 곡선 높이는 I_B가 정한다.</desc>
  <rect x="70" y="40" width="55" height="250" fill="#f59e0b" fill-opacity="0.13"/>
  <rect x="125" y="40" width="440" height="250" fill="#e0533d" fill-opacity="0.06"/>
  <defs>
    <marker id="ca2" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker>
  </defs>
  <line x1="70" y1="290" x2="590" y2="290" stroke="currentColor" stroke-opacity="0.7" marker-end="url(#ca2)"/>
  <line x1="70" y1="290" x2="70" y2="35" stroke="currentColor" stroke-opacity="0.7" marker-end="url(#ca2)"/>
  <text x="596" y="295" font-size="12" font-weight="700" fill="currentColor">V_EC</text>
  <text x="56" y="40" font-size="12" font-weight="700" fill="currentColor" text-anchor="end">I_C</text>
  <line x1="125" y1="40" x2="125" y2="290" stroke="currentColor" stroke-opacity="0.45" stroke-dasharray="5 4"/>
  <text x="125" y="308" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">V_EC,sat ≈ 0.2V</text>
  <path d="M70,290 Q100,95 125,95 L560,82" fill="none" stroke="#e0533d" stroke-width="2.4"/>
  <text x="566" y="86" font-size="11" fill="#e0533d">I_B 큼</text>
  <path d="M70,290 Q98,160 125,160 L560,150" fill="none" stroke="#e0533d" stroke-width="2.4" stroke-opacity="0.7"/>
  <text x="566" y="154" font-size="11" fill="#e0533d" opacity="0.8">I_B 중</text>
  <path d="M70,290 Q96,220 125,220 L560,212" fill="none" stroke="#e0533d" stroke-width="2.4" stroke-opacity="0.45"/>
  <text x="566" y="216" font-size="11" fill="#e0533d" opacity="0.65">I_B 작음</text>
  <text x="97" y="75" text-anchor="middle" font-size="11" font-weight="700" fill="#f59e0b" transform="rotate(-90 97 165)">SATURATION (스위치 ON)</text>
  <text x="360" y="272" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor" fill-opacity="0.85">ACTIVE (전류원)</text>
  <text x="185" y="120" font-size="11" fill="currentColor" fill-opacity="0.85">평평 → V_EC 올라도 I_C 그대로 (= β·I_B)</text>
  <text x="140" y="345" font-size="11" fill="#f59e0b">◀ 좁고 가파른 구간: 외부회로가 I_C 결정</text>
  <line x1="430" y1="210" x2="430" y2="90" stroke="currentColor" stroke-opacity="0.5" stroke-dasharray="3 3" marker-end="url(#ca2)"/>
  <text x="437" y="150" font-size="10.5" fill="currentColor" fill-opacity="0.7">I_B ↑</text>
</svg>

이제 영역별로 **어디에 전압이 걸리고 홀이 어떻게 흐르는지** 보자.

<svg viewBox="0 0 640 470" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>PNP 영역별 바이어스와 홀 전류 흐름</title>
  <desc>Cutoff/Active/Saturation 각각에서 E·B·C 전압과 홀 전류 경로, 베이스 전류 방향.</desc>
  <defs>
    <marker id="ph3" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e0533d"/></marker>
    <marker id="bc3" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#3b82f6"/></marker>
  </defs>
  <g transform="translate(0,20)">
    <text x="10" y="12" font-size="12.5" font-weight="700" fill="currentColor">① Cutoff — 베이스가 이미터만큼 높음(V_EB=0) → OFF</text>
    <rect x="60" y="32" width="95" height="58" rx="4" fill="#e0533d" fill-opacity="0.28" stroke="currentColor" stroke-opacity="0.5"/>
    <text x="107" y="58" font-size="11" text-anchor="middle" fill="currentColor">E (p+)</text>
    <rect x="155" y="32" width="24" height="58" fill="#3b82f6" fill-opacity="0.2" stroke="currentColor" stroke-opacity="0.5"/>
    <rect x="179" y="32" width="120" height="58" rx="4" fill="#e0533d" fill-opacity="0.16" stroke="currentColor" stroke-opacity="0.5"/>
    <text x="239" y="58" font-size="11" text-anchor="middle" fill="currentColor">C (p)</text>
    <text x="167" y="104" font-size="9" text-anchor="middle" fill="currentColor" fill-opacity="0.7">B(n)</text>
    <text x="330" y="46" font-size="11" fill="currentColor">E=5V · B=5V · C=1V</text>
    <text x="330" y="65" font-size="11" fill="#e0533d">V_EB = 0 → EB 안 켜짐</text>
    <text x="330" y="84" font-size="11" fill="currentColor">I_C ≈ 0</text>
  </g>
  <g transform="translate(0,170)">
    <text x="10" y="12" font-size="12.5" font-weight="700" fill="currentColor">② Active — 베이스 0.7V 낮춤 · V_EC 넉넉 → 홀 주입, I_C=β·I_B</text>
    <rect x="60" y="32" width="95" height="58" rx="4" fill="#e0533d" fill-opacity="0.28" stroke="currentColor" stroke-opacity="0.5"/>
    <text x="107" y="58" font-size="11" text-anchor="middle" fill="currentColor">E (p+)</text>
    <rect x="155" y="32" width="24" height="58" fill="#3b82f6" fill-opacity="0.2" stroke="currentColor" stroke-opacity="0.5"/>
    <rect x="179" y="32" width="120" height="58" rx="4" fill="#e0533d" fill-opacity="0.16" stroke="currentColor" stroke-opacity="0.5"/>
    <text x="239" y="58" font-size="11" text-anchor="middle" fill="currentColor">C (p)</text>
    <line x1="115" y1="61" x2="285" y2="61" stroke="#e0533d" stroke-width="2.4" marker-end="url(#ph3)"/>
    <text x="205" y="53" font-size="9.5" text-anchor="middle" fill="#e0533d">홀 h⁺ →</text>
    <line x1="167" y1="90" x2="167" y2="116" stroke="#3b82f6" stroke-width="2" marker-end="url(#bc3)"/>
    <text x="200" y="112" font-size="9" fill="#3b82f6">I_B ↓ 빠짐</text>
    <text x="330" y="46" font-size="11" fill="currentColor">E=5V · B=4.3V · C=1V</text>
    <text x="330" y="65" font-size="11" fill="#e0533d">V_EB=0.7 · V_EC=4</text>
    <text x="330" y="84" font-size="11" fill="currentColor">I_C=β·I_B (컬렉터로 나옴)</text>
  </g>
  <g transform="translate(0,320)">
    <text x="10" y="12" font-size="12.5" font-weight="700" fill="currentColor">③ Saturation — V_EC 0.2V 바닥, CB도 순방향 → 스위치 ON</text>
    <rect x="60" y="32" width="95" height="58" rx="4" fill="#e0533d" fill-opacity="0.28" stroke="currentColor" stroke-opacity="0.5"/>
    <text x="107" y="58" font-size="11" text-anchor="middle" fill="currentColor">E (p+)</text>
    <rect x="155" y="32" width="24" height="58" fill="#3b82f6" fill-opacity="0.2" stroke="currentColor" stroke-opacity="0.5"/>
    <rect x="179" y="32" width="120" height="58" rx="4" fill="#e0533d" fill-opacity="0.16" stroke="currentColor" stroke-opacity="0.5"/>
    <text x="239" y="58" font-size="11" text-anchor="middle" fill="currentColor">C (p)</text>
    <line x1="115" y1="61" x2="285" y2="61" stroke="#e0533d" stroke-width="2.4" marker-end="url(#ph3)"/>
    <text x="205" y="53" font-size="9.5" text-anchor="middle" fill="#e0533d">홀 h⁺ →</text>
    <line x1="167" y1="90" x2="167" y2="116" stroke="#3b82f6" stroke-width="2" marker-end="url(#bc3)"/>
    <text x="330" y="46" font-size="11" fill="currentColor">E=5V · B=4.3V · C=4.8V</text>
    <text x="330" y="65" font-size="11" fill="#e0533d">V_EC ≈ 0.2V (바닥)</text>
    <text x="330" y="84" font-size="11" fill="currentColor">I_C = 외부회로가 결정</text>
  </g>
</svg>

- **Cutoff**: $V_{EB}=0$ (베이스가 이미터만큼 높음) → EB 안 켜짐 → 전류 없음.
- **Active**: 베이스를 이미터보다 ~0.7V 낮춤($V_{EB}=0.7$) + $V_{EC}$ 넉넉 → 이미터가 홀을 쏘고 베이스 관통 → 컬렉터가 걷어감. $I_C=\beta I_B$, 컬렉터에서 흘러나옴 (전류원, 평평).
- **Saturation**: $V_{EC}$ 가 $0.2\text{V}$ 바닥까지 떨어짐(CB도 순방향) → $I_C$ 는 외부회로가 정하는 값에 묶임 (스위치 ON).

> 홀은 **이미터(높은 전압)에서 컬렉터(낮은 전압)로** 흐르고, 베이스 전류는 **밖으로 빠져나간다** — NPN에서 전자가 이미터→컬렉터로 흐르고 베이스로 들어가던 것과 방향이 반대다.

---

## 6. 실무 연결

- **High-side 스위치·전류원**: 이미터를 $V_{CC}$ 에 붙이고 베이스를 당겨(전류를 빼내) 켠다. 부하 위쪽에서 공급을 제어하기 좋다.
- **밴드갭·전류미러**: 위쪽(공급 쪽) 전류원이 필요할 때 PNP를 쓴다. NPN 전류원은 아래쪽(GND 쪽)에 놓기 좋고, PNP는 위쪽에 놓기 좋다 — 둘을 짝지어 쓴다.
- **IC 공정 주의**: 표준 CMOS/바이폴라에서 PNP는 흔히 **lateral(측면형)** 로 만들어져 $\beta$ 가 낮고 느리다. 그래서 고성능 증폭·주 스위치는 NPN을 선호하고, PNP는 보조·high-side 역할이 많다.

---

## Key takeaways

- PNP = NPN의 **극성 반전 짝**. 캐리어=홀, 이미터=높은 쪽, 베이스를 이미터보다 **~0.7V 낮추고** 전류를 **빼내야** ON.
- 세 영역(cutoff/active/saturation) 표는 NPN과 같고 **전압 부호만 반대** ($V_{EC}$ 로 봄, saturation에서 $V_{EC}\approx0.2\text{V}$).
- 캐리어 주입·전류원·"saturation은 외부회로 한계" 원리는 NPN과 **완전히 동일** (전자→홀, 부호 반대).
- 기호는 **이미터 화살표 안으로 = PNP.** IC에선 $\beta$ 낮은 lateral이 많아 high-side·보조 용도로 주로 쓴다.

---

*Reference: 소자 동작영역은 표준 반도체 소자물리(Sedra/Smith, Razavi 등). 응용 맥락은 Erickson & Maksimović, Fundamentals of Power Electronics, 2nd Ed.*
