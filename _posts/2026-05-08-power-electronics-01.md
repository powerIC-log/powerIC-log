---
layout: post
title: "[Power Electronics #1] Introduction to Power Processing"
date: 2026-05-08
tags: [power-electronics, switching-converter, fundamentals, erickson]
---

## 들어가며 — 이 시리즈에 대해

현직 전력전자 엔지니어로 13년을 일했지만, 실무가 익숙해질수록 fundamental한 이론은 점점 흐릿해진다는 느낌이 들었다. 회로는 동작시키지만, *"왜 이렇게 설계되는가"* 를 수식으로 설명하라고 하면 막히는 순간들이 있었다.

이 시리즈는 **Erickson & Maksimovic의 *Fundamentals of Power Electronics* (2nd Ed.)** 를 다시 정독하면서, **실무자 관점에서 꼭 필요한 부분만 압축**해 정리하는 기록이다.

- 교과서를 그대로 옮기지 않는다
- 면접·실무에서 진짜 나오는 내용 위주로
- 다시 꺼내봤을 때 5분 안에 리마인드되는 형태로

---

## 1. "Power Processing" 의 정의 — Converting이 아니다

Erickson은 책의 첫 문장을 이렇게 시작한다.

> *"The field of power electronics is concerned with the **processing** of electrical power using electronic devices."*

여기서 단어 선택이 의미심장하다. "converting" 도 아니고 "transforming" 도 아닌 **"processing"**.

**왜 processing인가?**

스위칭 컨버터는 단순히 전압을 바꾸는 게 아니다. **3개의 포트**를 가진 시스템이다.

<svg width="100%" viewBox="0 0 720 280" role="img" style="margin: 1.5rem 0;">
  <title>Fig 1.1 — Switching converter as a 3-port system</title>
  <defs>
    <marker id="ar1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </marker>
  </defs>

  <!-- Power Input -->
  <rect x="40" y="100" width="140" height="80" rx="4" fill="none" stroke="#333" stroke-width="1"/>
  <text x="110" y="135" text-anchor="middle" font-size="14" font-family="monospace" fill="#333">Power Input</text>
  <text x="110" y="158" text-anchor="middle" font-size="12" font-family="monospace" fill="#888">raw power</text>

  <!-- Arrow to converter -->
  <line x1="180" y1="140" x2="260" y2="140" stroke="#333" stroke-width="1.5" marker-end="url(#ar1)"/>

  <!-- Converter -->
  <rect x="260" y="80" width="200" height="120" rx="4" fill="none" stroke="#222" stroke-width="1.5"/>
  <text x="360" y="125" text-anchor="middle" font-size="16" font-weight="500" font-family="monospace" fill="#222">Converter</text>
  <text x="360" y="148" text-anchor="middle" font-size="12" font-family="monospace" fill="#888">SW + L + C</text>
  <text x="360" y="170" text-anchor="middle" font-size="11" font-family="Georgia, serif" font-style="italic" fill="#888">no resistor</text>

  <!-- Arrow to output -->
  <line x1="460" y1="140" x2="540" y2="140" stroke="#333" stroke-width="1.5" marker-end="url(#ar1)"/>

  <!-- Power Output -->
  <rect x="540" y="100" width="140" height="80" rx="4" fill="none" stroke="#333" stroke-width="1"/>
  <text x="610" y="135" text-anchor="middle" font-size="14" font-family="monospace" fill="#333">Power Output</text>
  <text x="610" y="158" text-anchor="middle" font-size="12" font-family="monospace" fill="#888">conditioned</text>

  <!-- Control input - from below -->
  <rect x="290" y="240" width="140" height="30" rx="4" fill="#222" stroke="#222"/>
  <text x="360" y="260" text-anchor="middle" font-size="13" font-family="monospace" fill="#fff">Control Input</text>

  <!-- Arrow from control to converter -->
  <line x1="360" y1="240" x2="360" y2="200" stroke="#222" stroke-width="1.5" marker-end="url(#ar1)"/>
  <text x="380" y="225" font-size="11" font-family="Georgia, serif" font-style="italic" fill="#666">duty, freq, mode...</text>

  <!-- Labels above -->
  <text x="40" y="50" font-size="11" font-family="monospace" letter-spacing="1.5" fill="#888">FIG 1.1</text>
  <text x="40" y="72" font-size="14" font-family="Georgia, serif" fill="#333">스위칭 컨버터는 3-포트 시스템이다</text>
</svg>

<p style="text-align:center; color:#888; font-size:0.85em; margin-top:-0.5rem;">
<em>Adapted from Erickson, Fig. 1.1</em>
</p>

이 **세 번째 포트(Control Input)** 가 power electronics를 다른 분야와 구분 짓는 결정적 차이다. 컨버터는 입력을 **제어 입력의 지시에 따라 가공해서** 출력으로 내보낸다.

**Processing이 실제로 다루는 것들:**

| 영역 | 컨트롤하는 실체 |
|------|----------------|
| 전압 | Vout 정밀도, regulation, 과도응답 |
| 전류 | 출력 전류 한계, 인덕터 피크, inrush current |
| 주파수 | 스위칭 주파수, EMI 회피, dithering |
| 위상 | 다상 컨버터, 인터리빙 |
| 파형 | 인버터의 sine wave, PFC의 정현화 |
| 보호 | OVP, OCP, OTP, UVLO, short circuit |
| 모드 | CCM/DCM, burst mode, sleep |

---

## 2. Control Input이 없으면? — Open-loop의 한계

만약 Control Input 없이 **고정 듀티**로 컨버터를 만들면 어떻게 될까? 다섯 가지 문제가 동시에 터진다.

**① 입력 변동에 무방비**

```
Vout = D × Vin
D = 0.5 고정이면:
  Vin = 12V → Vout = 6V    ✓
  Vin = 11V → Vout = 5.5V  ✗
  Vin = 13V → Vout = 6.5V  ✗
```

입력이 출렁이면 출력이 그대로 따라 흔들린다.

**② Load regulation 불가능**

부하 전류가 변하면 회로 곳곳의 전압 강하(Rds(on), DCR 등)가 변동한다. D를 조정할 수 없으면 Vout이 흔들린다.

**③ 보호 동작 불가능**

OCP, OVP, OTP 같은 모든 보호 동작은 *"비정상 상태를 감지해 듀티를 조작하는 것"* 이다. 듀티가 고정이면 모든 보호가 무력화된다.

**④ Dynamic response 불가능**

부하가 갑자기 5A → 30A로 점프하면 출력 전압이 droop된다. 회복하려면 즉시 듀티를 늘려야 하는데, 고정이면 droop이 영구히 남는다.

**⑤ 효율 최적화 불가능**

Light load에서는 burst mode, heavy load에서는 CCM. 이런 모드 전환이 다 control loop의 일이다.

> **핵심 통찰**
>
> *"전압 변환"* 은 트랜스포머도 한다. 저항분배도 한다.
> **"제어된 전압 변환"** 만이 power electronics다.

---

## 3. 고효율 — Nice-to-have가 아니라 Survival Line

Erickson은 고효율의 이유를 단호하게 정의한다.

> *"High efficiency converters are necessary because construction of low-efficiency converters, producing substantial output power, is impractical."*

전기세 절감이 아니다. **저효율로는 큰 출력 컨버터를 만드는 게 불가능에 가깝다**.

### P_loss / P_out 비율의 비선형 폭발

<svg width="100%" viewBox="0 0 720 360" role="img" style="margin: 1.5rem 0;">
  <title>Efficiency vs P_loss/P_out ratio</title>

  <!-- Title -->
  <text x="40" y="30" font-size="11" font-family="monospace" letter-spacing="1.5" fill="#888">EFFICIENCY → LOSS RATIO</text>
  <text x="40" y="54" font-size="14" font-family="Georgia, serif" fill="#333">효율이 떨어지면 손실/출력 비율은 비선형으로 폭발한다</text>

  <!-- Chart area -->
  <g transform="translate(60, 90)">
    <!-- Y axis -->
    <line x1="0" y1="0" x2="0" y2="220" stroke="#333" stroke-width="1"/>
    <!-- X axis -->
    <line x1="0" y1="220" x2="600" y2="220" stroke="#333" stroke-width="1"/>

    <!-- Y axis labels (log scale: 0%, 10%, 100%, 1000%) -->
    <text x="-8" y="224" text-anchor="end" font-size="11" font-family="monospace" fill="#666">0</text>
    <text x="-8" y="170" text-anchor="end" font-size="11" font-family="monospace" fill="#666">25%</text>
    <text x="-8" y="116" text-anchor="end" font-size="11" font-family="monospace" fill="#666">100%</text>
    <text x="-8" y="62" text-anchor="end" font-size="11" font-family="monospace" fill="#666">500%</text>
    <text x="-8" y="14" text-anchor="end" font-size="11" font-family="monospace" fill="#666">900%</text>

    <!-- Y label -->
    <text transform="translate(-44, 110) rotate(-90)" font-size="12" font-family="Georgia, serif" font-style="italic" fill="#555" text-anchor="middle">P_loss / P_out</text>

    <!-- X axis labels (η descending from right to left) -->
    <text x="0" y="240" text-anchor="middle" font-size="11" font-family="monospace" fill="#666">10%</text>
    <text x="100" y="240" text-anchor="middle" font-size="11" font-family="monospace" fill="#666">25%</text>
    <text x="200" y="240" text-anchor="middle" font-size="11" font-family="monospace" fill="#666">50%</text>
    <text x="350" y="240" text-anchor="middle" font-size="11" font-family="monospace" fill="#666">80%</text>
    <text x="450" y="240" text-anchor="middle" font-size="11" font-family="monospace" fill="#666">90%</text>
    <text x="525" y="240" text-anchor="middle" font-size="11" font-family="monospace" fill="#666">95%</text>
    <text x="595" y="240" text-anchor="middle" font-size="11" font-family="monospace" fill="#666">99%</text>

    <!-- X label -->
    <text x="300" y="265" text-anchor="middle" font-size="12" font-family="Georgia, serif" font-style="italic" fill="#555">Efficiency η</text>

    <!-- Data points and curve -->
    <!-- η=99 → 1%   y=219 (almost 0) -->
    <!-- η=95 → 5.3% y=217 -->
    <!-- η=90 → 11%  y=214 -->
    <!-- η=80 → 25%  y=206 -->
    <!-- η=50 → 100% y=176 -->
    <!-- η=25 → 300% y=110 -->
    <!-- η=10 → 900% y=22 -->

    <!-- Curve -->
    <path d="M 0 22 Q 30 60 100 110 Q 160 150 200 176 Q 280 200 350 210 Q 420 215 450 217 Q 510 219 595 220"
          fill="none" stroke="#c0392b" stroke-width="2"/>

    <!-- Data points -->
    <circle cx="595" cy="220" r="3" fill="#333"/>
    <circle cx="525" cy="218" r="3" fill="#333"/>
    <circle cx="450" cy="216" r="3" fill="#333"/>
    <circle cx="350" cy="208" r="3" fill="#333"/>
    <circle cx="200" cy="176" r="4" fill="#c0392b"/>
    <circle cx="100" cy="110" r="3" fill="#c0392b"/>
    <circle cx="0" cy="22" r="3" fill="#c0392b"/>

    <!-- Annotation: 50% point -->
    <line x1="200" y1="176" x2="220" y2="140" stroke="#666" stroke-width="0.5" stroke-dasharray="2 2"/>
    <text x="225" y="135" font-size="11" font-family="monospace" fill="#c0392b">η=50% : 손실 = 출력</text>

    <!-- Annotation: 10% point -->
    <line x1="0" y1="22" x2="80" y2="40" stroke="#666" stroke-width="0.5" stroke-dasharray="2 2"/>
    <text x="85" y="44" font-size="11" font-family="monospace" fill="#c0392b">η=10% : 손실이 출력의 9배</text>

  </g>
</svg>

| 효율 η | P_loss / P_out |
|--------|----------------|
| 99% | 1.0% |
| 95% | 5.3% |
| 90% | 11.1% |
| 80% | 25.0% |
| **50%** | **100% ← 손실 = 출력** |
| 10% | 900% ← 손실이 출력의 9배 |

**효율 99% → 50%로 떨어지는 사이 손실/출력 비율은 100배 증가한다.** 선형이 아니라 **비선형 폭발**이다.

### 실무 임팩트 — 1kW 컨버터를 효율 50%로 만들면

- 입력 2kW를 끌어와야 출력 1kW
- 1kW는 가정용 전기난로 수준의 발열
- 손바닥만 한 PCB에서 1kW를 방출 — 불가능
- 거대한 히트싱크 + 강제 공랭 또는 수냉 필요
- MOSFET T_j는 150°C 한계 — 정션 온도 폭주
- Arrhenius 법칙 (10°C ↑ = 수명 반토막) — 신뢰성 폭락
- 입력 전원, 케이블, 차단기 모두 2배 용량 필요

같은 1kW 출력이라도 효율 하나로 **"만들 수 있는가 / 없는가"** 가 갈린다.

---

## 4. 어떻게 손실 0에 가까운 회로를 만들 것인가?

> *"How can we build a circuit that changes the voltage, yet dissipates negligible power?"*
> — Erickson Ch.1

답은 **소자 선택**에 있다.

### 네 가지 기본 소자의 에너지 처리 방식

<svg width="100%" viewBox="0 0 720 320" role="img" style="margin: 1.5rem 0;">
  <title>네 가지 기본 소자의 손실 특성</title>

  <text x="40" y="30" font-size="11" font-family="monospace" letter-spacing="1.5" fill="#888">FIG 1.5 — CIRCUIT ELEMENTS</text>
  <text x="40" y="54" font-size="14" font-family="Georgia, serif" fill="#333">전압을 바꾸면서 손실이 없는 회로는 L, C, SW로만 짠다</text>

  <!-- R -->
  <g transform="translate(40, 100)">
    <rect x="0" y="0" width="150" height="180" rx="4" fill="#fce4e4" stroke="#c0392b" stroke-width="1"/>
    <text x="75" y="30" text-anchor="middle" font-size="28" font-family="monospace" font-weight="500" fill="#c0392b">R</text>
    <text x="75" y="55" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="#666">저항</text>
    <line x1="20" y1="75" x2="130" y2="75" stroke="#c0392b" stroke-width="0.5"/>
    <text x="75" y="105" text-anchor="middle" font-size="11" font-family="monospace" fill="#333">에너지 소비</text>
    <text x="75" y="125" text-anchor="middle" font-size="11" font-family="monospace" fill="#333">(열로 변환)</text>
    <text x="75" y="160" text-anchor="middle" font-size="13" font-family="monospace" fill="#c0392b">P = I²R</text>
    <text x="75" y="178" text-anchor="middle" font-size="11" font-family="monospace" font-weight="500" fill="#c0392b">> 0</text>
  </g>

  <!-- L -->
  <g transform="translate(210, 100)">
    <rect x="0" y="0" width="150" height="180" rx="4" fill="#e8f4f0" stroke="#27ae60" stroke-width="1"/>
    <text x="75" y="30" text-anchor="middle" font-size="28" font-family="monospace" font-weight="500" fill="#27ae60">L</text>
    <text x="75" y="55" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="#666">인덕터</text>
    <line x1="20" y1="75" x2="130" y2="75" stroke="#27ae60" stroke-width="0.5"/>
    <text x="75" y="105" text-anchor="middle" font-size="11" font-family="monospace" fill="#333">에너지 저장</text>
    <text x="75" y="125" text-anchor="middle" font-size="11" font-family="monospace" fill="#333">(자기장)</text>
    <text x="75" y="160" text-anchor="middle" font-size="12" font-family="monospace" fill="#27ae60">받은 만큼 돌려줌</text>
    <text x="75" y="178" text-anchor="middle" font-size="11" font-family="monospace" font-weight="500" fill="#27ae60">P_avg = 0</text>
  </g>

  <!-- C -->
  <g transform="translate(380, 100)">
    <rect x="0" y="0" width="150" height="180" rx="4" fill="#e8f4f0" stroke="#27ae60" stroke-width="1"/>
    <text x="75" y="30" text-anchor="middle" font-size="28" font-family="monospace" font-weight="500" fill="#27ae60">C</text>
    <text x="75" y="55" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="#666">커패시터</text>
    <line x1="20" y1="75" x2="130" y2="75" stroke="#27ae60" stroke-width="0.5"/>
    <text x="75" y="105" text-anchor="middle" font-size="11" font-family="monospace" fill="#333">에너지 저장</text>
    <text x="75" y="125" text-anchor="middle" font-size="11" font-family="monospace" fill="#333">(전기장)</text>
    <text x="75" y="160" text-anchor="middle" font-size="12" font-family="monospace" fill="#27ae60">받은 만큼 돌려줌</text>
    <text x="75" y="178" text-anchor="middle" font-size="11" font-family="monospace" font-weight="500" fill="#27ae60">P_avg = 0</text>
  </g>

  <!-- SW -->
  <g transform="translate(550, 100)">
    <rect x="0" y="0" width="150" height="180" rx="4" fill="#e8f4f0" stroke="#27ae60" stroke-width="1"/>
    <text x="75" y="30" text-anchor="middle" font-size="22" font-family="monospace" font-weight="500" fill="#27ae60">SW</text>
    <text x="75" y="55" text-anchor="middle" font-size="12" font-family="Georgia, serif" fill="#666">이상 스위치</text>
    <line x1="20" y1="75" x2="130" y2="75" stroke="#27ae60" stroke-width="0.5"/>
    <text x="75" y="100" text-anchor="middle" font-size="11" font-family="monospace" fill="#333">ON: V=0</text>
    <text x="75" y="118" text-anchor="middle" font-size="11" font-family="monospace" fill="#333">OFF: I=0</text>
    <text x="75" y="160" text-anchor="middle" font-size="12" font-family="monospace" fill="#27ae60">차단/통과만</text>
    <text x="75" y="178" text-anchor="middle" font-size="11" font-family="monospace" font-weight="500" fill="#27ae60">P = 0</text>
  </g>
</svg>

<p style="text-align:center; color:#888; font-size:0.85em; margin-top:-0.5rem;">
<em>Adapted from Erickson, Fig. 1.5</em>
</p>

**핵심:**

- L, C는 한 주기 동안 받은 에너지를 그대로 돌려준다 → 평균 손실 0
- 이상 스위치는 ON일 때 V=0, OFF일 때 I=0 → 어느 순간이든 P=0
- 오직 **R만 에너지를 열로 흩뿌린다**

### 결론

> **전압을 바꾸면서 손실이 없는 회로 = R 없이 L, C, SW로만 짠 회로**

이게 모든 스위칭 컨버터의 공통 구조다.

```
스위칭 컨버터 = [SW 네트워크] + [LC 저역통과 필터]
                     ↑                   ↑
              듀티 조작 (DC 변경)    평균만 추출
```

Buck, Boost, Buck-Boost, Ćuk, SEPIC, Flyback, Forward, LLC — 토폴로지는 달라도 모두 *"R 없이 L, C, SW로 구성"* 이라는 공통점을 가진다.

---

## 5. 실제 회로의 숨어 있는 R — 이상과 현실의 간극

이상적으로는 손실 0이지만, 실제로는 어디에나 **숨은 저항 성분**이 있다. 손실은 크게 **세 가지 카테고리**로 분류된다.

<svg width="100%" viewBox="0 0 760 720" role="img" style="margin: 1.5rem 0;">
  <title>실제 스위칭 컨버터 손실 분류</title>

  <!-- Header -->
  <text x="40" y="30" font-size="12" font-family="monospace" fill="#888" letter-spacing="1.5">LOSS BREAKDOWN</text>
  <text x="40" y="58" font-size="18" font-weight="500" fill="#222" font-family="Georgia, serif">실제 스위칭 컨버터의 손실 분류</text>
  <line x1="40" y1="72" x2="720" y2="72" stroke="#333" stroke-width="0.8"/>
  <text x="40" y="92" font-size="12" fill="#666" font-family="Georgia, serif" font-style="italic">이상 회로는 손실이 없다. 실제 회로에는 세 종류의 손실이 있다.</text>

  <!-- ============ CONDUCTION LOSS ============ -->
  <g transform="translate(40, 130)">
    <rect x="0" y="0" width="240" height="40" fill="#222" rx="3"/>
    <text x="16" y="18" font-size="10" font-family="monospace" fill="#999" letter-spacing="1">01</text>
    <text x="16" y="33" font-size="15" font-weight="500" fill="#fff" font-family="monospace">CONDUCTION LOSS</text>

    <text x="252" y="18" font-size="13" font-family="Georgia, serif" fill="#333">도통 손실</text>
    <text x="252" y="34" font-size="11" font-family="monospace" fill="#888">DC 성격 · I²R / I·Vf 형태 · 부하전류에 비례</text>

    <g transform="translate(0, 58)" font-family="monospace" font-size="13">
      <line x1="12" y1="-2" x2="12" y2="170" stroke="#ccc" stroke-width="0.8"/>

      <line x1="12" y1="14" x2="34" y2="14" stroke="#ccc" stroke-width="0.8"/>
      <text x="42" y="18" fill="#222">MOSFET Rds(on)</text>
      <text x="260" y="18" fill="#888" font-size="11">스위치 도통 시 채널 저항</text>
      <text x="540" y="18" fill="#555" font-size="11">P = I² · Rds(on)</text>

      <line x1="12" y1="48" x2="34" y2="48" stroke="#ccc" stroke-width="0.8"/>
      <text x="42" y="52" fill="#222">Diode Vf</text>
      <text x="260" y="52" fill="#888" font-size="11">다이오드 순방향 전압 강하</text>
      <text x="540" y="52" fill="#555" font-size="11">P = I_avg · Vf</text>

      <line x1="12" y1="82" x2="34" y2="82" stroke="#ccc" stroke-width="0.8"/>
      <text x="42" y="86" fill="#222">Inductor DCR</text>
      <text x="260" y="86" fill="#888" font-size="11">인덕터 권선의 직류 저항</text>
      <text x="540" y="86" fill="#555" font-size="11">P = I² · DCR</text>

      <line x1="12" y1="116" x2="34" y2="116" stroke="#ccc" stroke-width="0.8"/>
      <text x="42" y="120" fill="#222">Transformer winding</text>
      <text x="260" y="120" fill="#888" font-size="11">절연형에서 1차/2차 권선 저항</text>
      <text x="540" y="120" fill="#555" font-size="11">P = I² · R_winding</text>

      <line x1="12" y1="150" x2="34" y2="150" stroke="#ccc" stroke-width="0.8"/>
      <text x="42" y="154" fill="#222">PCB · Connector · ESR</text>
      <text x="260" y="154" fill="#888" font-size="11">트레이스 / 커넥터 / Cap ESR</text>
      <text x="540" y="154" fill="#555" font-size="11">P = I² · R_parasitic</text>
    </g>
  </g>

  <!-- ============ SWITCHING LOSS ============ -->
  <g transform="translate(40, 360)">
    <rect x="0" y="0" width="240" height="40" fill="#222" rx="3"/>
    <text x="16" y="18" font-size="10" font-family="monospace" fill="#999" letter-spacing="1">02</text>
    <text x="16" y="33" font-size="15" font-weight="500" fill="#fff" font-family="monospace">SWITCHING LOSS</text>

    <text x="252" y="18" font-size="13" font-family="Georgia, serif" fill="#333">스위칭 손실</text>
    <text x="252" y="34" font-size="11" font-family="monospace" fill="#888">전환 순간 발생 · f_sw에 비례 · 고주파에서 지배적</text>

    <g transform="translate(0, 58)" font-family="monospace" font-size="13">
      <line x1="12" y1="-2" x2="12" y2="100" stroke="#ccc" stroke-width="0.8"/>

      <line x1="12" y1="14" x2="34" y2="14" stroke="#ccc" stroke-width="0.8"/>
      <text x="42" y="18" fill="#222">V-I overlap loss</text>
      <text x="260" y="18" fill="#888" font-size="11">전환 중 V·I가 동시에 큼</text>
      <text x="540" y="18" fill="#555" font-size="11">P ∝ V·I·t_sw·f_sw</text>

      <line x1="12" y1="48" x2="34" y2="48" stroke="#ccc" stroke-width="0.8"/>
      <text x="42" y="52" fill="#222">Gate drive loss</text>
      <text x="260" y="52" fill="#888" font-size="11">게이트 충방전 에너지</text>
      <text x="540" y="52" fill="#555" font-size="11">P = Qg · Vgs · f_sw</text>

      <line x1="12" y1="82" x2="34" y2="82" stroke="#ccc" stroke-width="0.8"/>
      <text x="42" y="86" fill="#222">Diode reverse recovery</text>
      <text x="260" y="86" fill="#888" font-size="11">PN 다이오드 역회복 전하</text>
      <text x="540" y="86" fill="#555" font-size="11">P ∝ Qrr · V · f_sw</text>
    </g>
  </g>

  <!-- ============ MAGNETICS LOSS ============ -->
  <g transform="translate(40, 520)">
    <rect x="0" y="0" width="240" height="40" fill="#222" rx="3"/>
    <text x="16" y="18" font-size="10" font-family="monospace" fill="#999" letter-spacing="1">03</text>
    <text x="16" y="33" font-size="15" font-weight="500" fill="#fff" font-family="monospace">MAGNETICS LOSS</text>

    <text x="252" y="18" font-size="13" font-family="Georgia, serif" fill="#333">자성 손실</text>
    <text x="252" y="34" font-size="11" font-family="monospace" fill="#888">자속 변화로 발생 · 코어와 권선에서 동시 발생</text>

    <g transform="translate(0, 58)" font-family="monospace" font-size="13">
      <line x1="12" y1="-2" x2="12" y2="66" stroke="#ccc" stroke-width="0.8"/>

      <line x1="12" y1="14" x2="34" y2="14" stroke="#ccc" stroke-width="0.8"/>
      <text x="42" y="18" fill="#222">Core loss</text>
      <text x="260" y="18" fill="#888" font-size="11">히스테리시스 + 와전류 (eddy)</text>
      <text x="540" y="18" fill="#555" font-size="11">P = K · f^α · B^β</text>

      <line x1="12" y1="48" x2="34" y2="48" stroke="#ccc" stroke-width="0.8"/>
      <text x="42" y="52" fill="#222">Winding AC loss</text>
      <text x="260" y="52" fill="#888" font-size="11">Skin effect + proximity effect</text>
      <text x="540" y="52" fill="#555" font-size="11">P ∝ f · I_ac²</text>
    </g>
  </g>

  <!-- Bottom note -->
  <line x1="40" y1="660" x2="720" y2="660" stroke="#ddd" stroke-width="0.5"/>
  <text x="40" y="682" font-size="11" font-family="Georgia, serif" font-style="italic" fill="#888">
    저주파·고전류 → Conduction 지배 · 고주파·저전류 → Switching 지배. 균형점이 효율 sweet spot.
  </text>
  <text x="40" y="702" font-size="11" font-family="Georgia, serif" font-style="italic" fill="#888">
    상세 분석: Conduction → Ch.3 · Switching → Ch.4 · Magnetics → Ch.13~15
  </text>
</svg>

### 주파수에 따른 손실 지배 구조

- **저주파 + 고전류** → Conduction loss 지배
- **고주파 + 저전류** → Switching loss 지배
- 두 손실의 균형점이 **효율 sweet spot**

이게 **GaN/SiC가 인기인 이유**다. 같은 주파수에서 switching loss가 작으니, 주파수를 더 올려도 효율 유지 가능 → 더 작고 가벼운 컨버터를 만들 수 있다.

각 손실의 정식 분석은 Ch.3 (Conduction), Ch.4 (Switching), Ch.13~15 (Magnetics)에서 다룬다.

---

## 6. Trade-off — 공짜는 없다

스위칭 컨버터가 효율 문제를 해결하는 대신, 새로운 과제를 떠안는다.

| 단점 | 원인 | 해결 방향 |
|------|------|----------|
| **EMI / EMC** | 빠른 스위칭 엣지 → 고주파 노이즈 | 필터, PCB 레이아웃 |
| **Output ripple** | 스위칭 주파수 성분 잔류 | LC 필터 |
| **Complexity** | 게이트 드라이버, 제어 루프 필요 | IC 집적 |

LC 필터 corner frequency를 스위칭 주파수보다 충분히 낮게 두면 *"평균만 통과"* 시킬 수 있다 (경험적으로 보통 1/10 정도). 다만 *"얼마나 낮아야 하는가"* 의 정확한 답은 **컨트롤 루프 안정성과 함께 결정**되며, Ch.7~9에서 본격 다룬다.

---

## Key takeaways

- **Power Processing은 단순 변환이 아니다.** Input/Output/Control 3-port 시스템이며, control이 빠지면 power electronics가 아니다.
- **고효율은 선택이 아니라 필수다.** η ↓ 의 영향은 비선형 폭발이며, 저효율로는 큰 출력 컨버터 자체가 불가능하다.
- **R 없이 L, C, SW로만 회로를 짠다** — 이게 모든 스위칭 컨버터의 공통 구조다.
- **이상과 현실의 간극에 손실이 있다.** Conduction / Switching / Magnetics 세 카테고리로 분류되며, 각각 다른 챕터에서 정식으로 다뤄진다.
- **모든 트레이드오프는 제어 시스템 설계로 풀린다.** LC 필터, 컨트롤 루프, 듀티 제어가 entangle된 하나의 시스템이다.

---

*Reference: Erickson & Maksimovic, *Fundamentals of Power Electronics*, 2nd Edition, Ch.1*

*다음 포스팅 → [Power Electronics #2] Principles of Steady-State Converter Analysis*
