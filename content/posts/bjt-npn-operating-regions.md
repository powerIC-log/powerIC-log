+++
title = "[개념정리] BJT(npn) 동작영역 — cutoff · active · saturation"
date = 2026-07-14T06:00:00+09:00
series = "이론/원리"
description = "npn BJT가 어느 영역에서 동작하는지를 두 접합(BE·BC)의 순방향/역방향으로 정리한다. 왜 BC가 역방향인데도 Ic가 흐르는지, Vce는 왜 내가 못 정하는지까지."
tags = ["개념정리", "BJT", "device", "npn", "fundamentals"]
+++

## 들어가며

앞선 [MOSFET 동작영역](../mosfet-operating-regions/) 정리에 이어지는 짝이다. BJT는 밴드갭 레퍼런스·전류미러·바이어스 회로, 그리고 옛 리니어 레귤레이터의 pass 소자까지 IC 안에 늘 살아있다.

n채널 MOSFET과 대응시켜, npn BJT 기준으로 <span class="pt">cutoff / active / saturation</span> 세 영역을 *두 접합의 순방향·역방향* 관점에서 잡는다. 특히 **왜 BC 접합이 역방향인데도 컬렉터 전류가 흐르는지**, 그리고 **Vce는 내가 직접 정하는 값이 아니라는 것**이 핵심이다.

---

## 1. 구조 — n-p-n 샌드위치

BJT는 반도체를 **n / p / n** 순서로 쌓은 세 층짜리 샌드위치다. 층이 3개니까 단자도 3개 — **E**(emitter), **B**(base), **C**(collector). 세 층이 만드는 경계 2개가 곧 **BE 접합**과 **BC 접합**이다.

<svg viewBox="0 0 620 360" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>npn BJT 물리 구조와 회로 기호</title>
  <desc>n-p-n 샌드위치: emitter(n+)/base(p, 얇음)/collector(n), 그리고 이미터 화살표가 밖으로 향하는 npn 기호.</desc>
  <text x="10" y="20" font-size="13" font-weight="700" fill="currentColor">① 물리 구조 — n-p-n 샌드위치</text>
  <!-- Collector n -->
  <rect x="120" y="40" width="180" height="60" rx="5" fill="#3b82f6" fill-opacity="0.15" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="210" y="66" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">Collector (n)</text>
  <text x="210" y="84" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">전자 받는 쪽</text>
  <!-- Base p thin -->
  <rect x="120" y="100" width="180" height="34" fill="#f59e0b" fill-opacity="0.22" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="210" y="122" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Base (p) · 얇음</text>
  <!-- Emitter n+ -->
  <rect x="120" y="134" width="180" height="60" rx="5" fill="#3b82f6" fill-opacity="0.30" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="210" y="160" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">Emitter (n+)</text>
  <text x="210" y="178" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">전자 쏘는 쪽</text>
  <!-- junction labels -->
  <line x1="300" y1="100" x2="340" y2="100" stroke="currentColor" stroke-opacity="0.5" stroke-dasharray="3 3"/>
  <text x="345" y="104" font-size="10.5" fill="currentColor" fill-opacity="0.75">BC 접합</text>
  <line x1="300" y1="134" x2="340" y2="134" stroke="#16a34a" stroke-opacity="0.7" stroke-dasharray="3 3"/>
  <text x="345" y="138" font-size="10.5" fill="#16a34a">BE 접합</text>
  <!-- terminals -->
  <line x1="120" y1="70" x2="80" y2="70" stroke="currentColor" stroke-width="2"/>
  <text x="66" y="75" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">C</text>
  <line x1="120" y1="117" x2="80" y2="117" stroke="currentColor" stroke-width="2"/>
  <text x="66" y="122" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">B</text>
  <line x1="120" y1="164" x2="80" y2="164" stroke="currentColor" stroke-width="2"/>
  <text x="66" y="169" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">E</text>
  <!-- diode mental model -->
  <text x="10" y="228" font-size="12" font-weight="700" fill="currentColor">쉽게 외우기: 다이오드 2개를 등 맞댄 것 (가운데 p 공유)</text>
  <text x="10" y="248" font-size="11.5" fill="currentColor" fill-opacity="0.8">C —▷|— B —|◁— E  · 단, 베이스가 얇아 두 다이오드가 상호작용 → 트랜지스터</text>
  <!-- symbol -->
  <text x="360" y="228" font-size="13" font-weight="700" fill="currentColor">② 회로 기호 (npn)</text>
  <line x1="450" y1="256" x2="450" y2="336" stroke="currentColor" stroke-width="3"/>
  <line x1="405" y1="296" x2="450" y2="296" stroke="currentColor" stroke-width="2"/>
  <text x="393" y="301" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">B</text>
  <line x1="450" y1="276" x2="500" y2="248" stroke="currentColor" stroke-width="2"/>
  <text x="508" y="252" font-size="12" font-weight="700" fill="currentColor">C</text>
  <line x1="450" y1="316" x2="500" y2="344" stroke="currentColor" stroke-width="2"/>
  <text x="508" y="344" font-size="12" font-weight="700" fill="currentColor">E</text>
  <path d="M486,326 L500,344 L482,340 Z" fill="#16a34a"/>
  <text x="360" y="300" font-size="10.5" fill="currentColor" fill-opacity="0.75">이미터 화살표가 밖으로 → npn</text>
  <text x="360" y="316" font-size="10.5" fill="currentColor" fill-opacity="0.6">("Not Pointing iN")</text>
</svg>

도핑도 일부러 다르게 한다: **이미터는 진하게(n+)** — 전자를 세게 쏘려고. **베이스는 얇고 옅게** — 쏜 전자가 그냥 관통하도록. **컬렉터는 넓게** — 전자를 받아내고 열을 견디도록.

---

## 2. 두 접합, 세 영역

동작영역은 **두 접합(BE·BC)이 각각 순방향인지 역방향인지**로 정해진다. 실리콘 접합은 순방향 전압이 대략 $0.7\text{V}$ 근처에서 본격 도통한다($V_{BE}\approx0.7\text{V}$).

| 영역 | BE 접합 | BC 접합 | 하는 일 |
|------|---------|---------|---------|
| **Cutoff** | 역(off) | 역(off) | 스위치 **OFF** ($I_C\approx0$) |
| **Active** | 순(on) | 역(off) | **증폭 / 전류원** ($I_C=\beta I_B$) |
| **Saturation** | 순(on) | 순(on) | 스위치 **ON** ($V_{CE}\approx0.2\text{V}$) |

- **Cutoff**: $V_{BE}$ 가 $0.6\!\sim\!0.7\text{V}$ 를 못 넘으면 BE가 안 켜져 베이스도 컬렉터도 전류가 없다.
- **Active**: BE 순방향 + BC 역방향. 신호를 증폭하는 영역, 전류원처럼 동작.
- **Saturation**: 두 접합 모두 순방향. 꽉 닫힌 스위치처럼 $V_{CE}$ 가 바닥($\approx0.2\text{V}$)까지 떨어진 상태.

---

## 3. Active — 왜 BC가 역방향인데 $I_C$ 가 흐르나

가장 헷갈리는 지점. **"BC 역방향" = "컬렉터에 전류가 없다"가 절대 아니다.** 역방향인데도 $I_C$ 는 콸콸 흐른다.

<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>npn active 영역 캐리어 주입 경로</title>
  <desc>이미터가 쏜 전자가 얇은 베이스를 관통, BC 역방향 전기장이 컬렉터로 빨아들여 Ic가 된다.</desc>
  <!-- Emitter -->
  <rect x="50" y="60" width="130" height="120" rx="5" fill="#3b82f6" fill-opacity="0.28" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="115" y="95" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">Emitter</text>
  <text x="115" y="113" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">n+</text>
  <!-- Base thin -->
  <rect x="180" y="60" width="40" height="120" fill="#f59e0b" fill-opacity="0.24" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="200" y="200" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Base</text>
  <text x="200" y="216" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity="0.7">p · 얇음</text>
  <!-- Collector -->
  <rect x="220" y="60" width="180" height="120" rx="5" fill="#3b82f6" fill-opacity="0.14" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="310" y="95" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">Collector (n)</text>
  <!-- BE junction forward -->
  <line x1="180" y1="60" x2="180" y2="180" stroke="#16a34a" stroke-width="2"/>
  <!-- BC reverse depletion -->
  <rect x="212" y="60" width="20" height="120" fill="currentColor" fill-opacity="0.14"/>
  <line x1="220" y1="60" x2="220" y2="180" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5" stroke-dasharray="5 4"/>
  <!-- electron flow -->
  <defs>
    <marker id="bh" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker>
  </defs>
  <line x1="110" y1="120" x2="370" y2="120" stroke="currentColor" stroke-width="3" marker-end="url(#bh)"/>
  <text x="88" y="112" font-size="13" fill="#16a34a" font-weight="700">e⁻</text>
  <text x="255" y="112" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.75">대부분 관통 → 컬렉터가 빨아들임</text>
  <!-- base recombination -->
  <line x1="200" y1="120" x2="200" y2="172" stroke="#f59e0b" stroke-width="2" marker-end="url(#bh)"/>
  <text x="206" y="158" font-size="10" fill="#f59e0b">일부 (I_B)</text>
  <!-- reverse depletion label -->
  <text x="230" y="205" font-size="10" fill="currentColor" fill-opacity="0.6">BC 역방향 공핍층 (넓다)</text>
  <!-- callouts -->
  <text x="30" y="250" font-size="11.5" fill="currentColor">① BE 순방향(V_BE≈0.7V): 이미터가 전자를 베이스로 <tspan font-weight="700">쏜다</tspan></text>
  <text x="30" y="270" font-size="11.5" fill="currentColor">② 베이스가 얇아 전자 대부분이 <tspan font-weight="700">관통</tspan> (일부만 I_B로 빠짐)</text>
  <text x="30" y="290" font-size="11.5" fill="currentColor">③ BC 역방향 전기장이 그 전자를 컬렉터로 <tspan font-weight="700" fill="#16a34a">빨아들임</tspan> = I_C</text>
</svg>

컬렉터 전류는 *"BC 다이오드가 순방향으로 켜져서"* 흐르는 게 아니다. **이미터가 베이스로 쏜 전자**가 흐르는 것이다.

1. **BE 순방향**($V_{BE}\approx0.7\text{V}$) → 이미터(n+)가 전자를 베이스로 왕창 밀어넣는다.
2. 베이스가 **매우 얇아서** → 전자들이 재결합하기 전에 그냥 관통한다. 아주 일부만 베이스로 빠져 $I_B$ 가 되고, 나머지는 직진.
3. 관통한 전자가 BC 경계에 도착하면 → 컬렉터가 +로 당기고 있어(**역방향 전기장**) 그 전자를 컬렉터로 빨아들인다. 이게 $I_C$.

그래서 **BC 역방향은 $I_C$ 를 막기는커녕 오히려 청소기처럼 돕는다.** 그리고 $I_C$ 를 정하는 건 *이미터가 얼마나 쐈느냐*, 즉 $I_B$($\approx V_{BE}$)다. 컬렉터가 얼마나 세게 빨든($V_{CE}$ 가 2V든 5V든) $I_C$ 는 그대로다.

$$\boxed{\,I_C = \beta\, I_B \quad(\text{active 영역에서만})\,}$$

이것이 **전류원** 성질이다 — MOSFET saturation에서 $I_D$ 가 $V_{DS}$ 에 무관하게 평평했던 것과 완전히 같은 원리다.

---

## 4. 출력특성으로 보는 세 영역

가로축 $V_{CE}$, 세로축 $I_C$ 로 그리면 MOSFET의 $I_D\!-\!V_{DS}$ 곡선과 판박이다.

<svg viewBox="0 0 640 380" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>BJT 출력특성 I_C vs V_CE</title>
  <desc>Vce 0.2V 이하 가파른 saturation, 이후 평평한 active. 곡선 높이는 Ib가 정한다.</desc>
  <!-- saturation shade -->
  <rect x="70" y="40" width="55" height="250" fill="#f59e0b" fill-opacity="0.13"/>
  <!-- active shade -->
  <rect x="125" y="40" width="440" height="250" fill="#16a34a" fill-opacity="0.06"/>
  <!-- axes -->
  <defs>
    <marker id="ca" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker>
  </defs>
  <line x1="70" y1="290" x2="590" y2="290" stroke="currentColor" stroke-opacity="0.7" marker-end="url(#ca)"/>
  <line x1="70" y1="290" x2="70" y2="35" stroke="currentColor" stroke-opacity="0.7" marker-end="url(#ca)"/>
  <text x="596" y="295" font-size="12" font-weight="700" fill="currentColor">V_CE</text>
  <text x="56" y="40" font-size="12" font-weight="700" fill="currentColor" text-anchor="end">I_C</text>
  <!-- knee -->
  <line x1="125" y1="40" x2="125" y2="290" stroke="currentColor" stroke-opacity="0.45" stroke-dasharray="5 4"/>
  <text x="125" y="308" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">V_CE,sat ≈ 0.2V</text>
  <!-- curves -->
  <path d="M70,290 Q100,95 125,95 L560,82" fill="none" stroke="#3b82f6" stroke-width="2.4"/>
  <text x="566" y="86" font-size="11" fill="#3b82f6">I_B 큼</text>
  <path d="M70,290 Q98,160 125,160 L560,150" fill="none" stroke="#3b82f6" stroke-width="2.4" stroke-opacity="0.7"/>
  <text x="566" y="154" font-size="11" fill="#3b82f6" opacity="0.8">I_B 중</text>
  <path d="M70,290 Q96,220 125,220 L560,212" fill="none" stroke="#3b82f6" stroke-width="2.4" stroke-opacity="0.45"/>
  <text x="566" y="216" font-size="11" fill="#3b82f6" opacity="0.65">I_B 작음</text>
  <!-- region labels -->
  <text x="97" y="75" text-anchor="middle" font-size="11" font-weight="700" fill="#f59e0b" transform="rotate(-90 97 165)">SATURATION (스위치 ON)</text>
  <text x="360" y="272" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor" fill-opacity="0.85">ACTIVE (증폭 / 전류원)</text>
  <text x="185" y="120" font-size="11" fill="currentColor" fill-opacity="0.85">평평 → V_CE 올라도 I_C 그대로 (= β·I_B)</text>
  <text x="140" y="345" font-size="11" fill="#f59e0b">◀ 좁고 가파른 이 구간: V_CE에 민감, 외부회로가 I_C 결정</text>
  <!-- Ib arrow -->
  <line x1="430" y1="210" x2="430" y2="90" stroke="currentColor" stroke-opacity="0.5" stroke-dasharray="3 3" marker-end="url(#ca)"/>
  <text x="437" y="150" font-size="10.5" fill="currentColor" fill-opacity="0.7">I_B ↑</text>
</svg>

- **오른쪽 넓은 평평 구간 = Active.** $V_{CE}$ 를 올려도 곡선 높이($I_C$)는 그대로 → $V_{CE}$ 는 무관. 높이를 정하는 건 *어느 곡선에 있느냐*, 즉 $I_B$. → $I_C=\beta I_B$.
- **왼쪽 좁고 가파른 구간($V_{CE}<0.2\text{V}$) = Saturation.** $V_{CE}$ 조금만 변해도 $I_C$ 가 확 변한다 → 여기선 $I_C$ 가 $\beta I_B$ 까지 못 올라가고 **외부회로가 정하는 값**에 눌려 있다.

MOSFET과 모양은 같고 **평평한 구간을 부르는 이름만 반대**다.

| | 왼쪽 가파른 구간 | 오른쪽 평평 구간 |
|---|---|---|
| **MOSFET** | Triode ($V_{DS}$ 지배) | **Saturation** ($V_{GS}$ 지배, flat) |
| **BJT** | **Saturation** ($V_{CE}$ 지배) | Active ($I_B$ 지배, flat) |

---

## 5. $V_{CE}$ 는 내가 정하는 값이 아니다

흔한 오해 하나. 실제 회로에서 **$V_{CE}$ 는 손잡이가 아니라 결과값**이다. 내가 정하는 것은 딱 둘이다.

- **입력(내가 정함):** $I_B$(베이스 구동), 그리고 회로 상수 $V_{CC}$·컬렉터 부하저항 $R$
- **결과(회로가 정함):** $I_C$, 그리고 $V_{CE}$

컬렉터 쪽 KVL로:

$$V_{CE} = V_{CC} - I_C\,R$$

읽는 순서가 중요하다. ① 내가 $I_B$ 를 정하면 → ② active면 $I_C=\beta I_B$ 로 컬렉터 전류가 정해지고 → ③ 그 $I_C$ 가 $R$ 에서 전압을 떨궈 $V_{CE}$ 가 *남는 값*으로 튀어나온다. 즉 $V_{CE}$ 는 직접 못 만진다.

그래서 영역 전환은 이렇게 일어난다.

- $I_B$ 작게 → $I_C$ 작음 → $R$ 강하 작음 → $V_{CE}$ 큼 → **active**
- $I_B$ 키움 → $I_C$↑ → $V_{CE}$↓
- $I_B$ 더 키움 → $V_{CE}$ 가 $0.2\text{V}$ 까지 떨어지면 더는 못 내려감 → **saturation**. 이때 $I_B$ 를 더 밀어도 $I_C$ 는

$$I_{C,\text{sat}} \approx \frac{V_{CC}-V_{CE,\text{sat}}}{R} \approx \frac{V_{CC}-0.2}{R}$$

에 묶여 더 커지지 않는다. ($\beta I_B$ 관계가 깨진다 = "포화".)

> 4절의 가로축-$V_{CE}$ 곡선은 실험실에서 $V_{CE}$ 를 억지로 스윕해 그린 **특성 지도**다. 실제 회로에선 $I_B$ 만 돌리고, 그 지도 위에 부하선($V_{CE}=V_{CC}-I_C R$)이 그어져 **동작점 하나가 자동으로 찍힌다.**

---

## 6. 함정 — "saturation"이 MOSFET과 정반대

| 기능 | BJT | MOSFET |
|------|-----|--------|
| 꺼짐 (OFF) | **cutoff** | **cutoff** |
| 완전히 켜짐 (스위치 ON) | **saturation** | **triode** |
| 증폭 (전류원) | **active** | **saturation** |

- **BJT의 saturation = 완전히 켜진 스위치** 영역
- **MOSFET의 saturation = 증폭** 영역

> <span class="pt">정반대다.</span> "BJT saturation"은 "MOSFET triode"와 짝, "BJT active"가 "MOSFET saturation"과 짝. 데이터시트·회로 대화에서 자주 헷갈리니, **"평평한 전류원 구간"** / **"꽉 켠 스위치 구간"** 으로 기능을 먼저 떠올리면 이름에 안 속는다.

---

## 7. 실무 연결

| 쓰임새 | 필요한 특성 | BJT 영역 | MOSFET 영역 |
|--------|-------------|----------|-------------|
| **LDO pass** (선형 조절) | 전류원처럼 평평 | **Active** | **Saturation** |
| **스위치** (on/off) | 꽉 켜서 $V_{CE}/V_{DS}\approx0$ | **Saturation** | **Triode** |

- **밴드갭·전류미러·바이어스**: BJT를 **active**(전류원)로 쓴다. $I_C=\beta I_B$ 의 평평함이 곧 좋은 전류원.
- **BJT 스위치**(게이트 드라이버, 단순 on/off): **saturation**으로 몰아 $V_{CE,\text{sat}}\approx0.2\text{V}$. 이 $0.2\text{V}\times I_C$ 가 도통손실.
- LDO의 pass 소자는 BJT든 MOSFET이든 결국 **"평평한 전류원 구간"** 에서 $(V_{in}-V_{out})$ 을 떨궈 열로 버린다 → 효율 $\eta=V_{out}/V_{in}$.

---

## Key takeaways

- 영역은 **두 접합(BE·BC)의 순방향/역방향**으로 결정: cutoff(둘 다 역) · active(BE순·BC역) · saturation(둘 다 순).
- **BC 역방향인데도 $I_C$ 가 흐른다** — 이미터가 쏜 전자를 컬렉터가 빨아들이는 것. $I_C=\beta I_B$, $V_{CE}$ 무관 → 전류원.
- $V_{CE}$ 는 내가 못 정한다. 입력은 $I_B$, $V_{CE}=V_{CC}-I_C R$ 이 결과로 나온다.
- Saturation에서는 $I_C$ 가 $(V_{CC}-0.2)/R$ 에 묶여 $\beta I_B$ 보다 작아진다.
- **BJT saturation ≠ MOSFET saturation** (정반대). LDO pass는 BJT면 active, MOSFET이면 saturation — 같은 "평평한 전류원 구간".

---

*Reference: 소자 동작영역은 표준 반도체 소자물리(Sedra/Smith, Razavi 등). 컨버터·레귤레이터 응용 맥락은 Erickson & Maksimović, Fundamentals of Power Electronics, 2nd Ed.*
