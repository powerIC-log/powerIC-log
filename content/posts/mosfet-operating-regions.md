+++
title = "[개념정리] MOSFET 동작영역 — cutoff · triode · saturation과 pinch-off"
date = 2026-07-12
series = "이론/원리"
description = "LDO·스위칭을 이해하려면 먼저 MOSFET이 어느 영역에서 동작하는지를 알아야 한다. 세 영역과 pinch-off를 채널 전하 관점에서 정리한다."
tags = ["개념정리", "MOSFET", "device", "pinch-off", "fundamentals"]
+++

## 들어가며

LDO를 공부하다 보면 pass FET이 *"어느 영역에서 동작하느냐"* 를 반드시 마주친다. 스위칭 컨버터의 파워 MOSFET도 마찬가지다.

따로 정리해두는 **개념정리**다. n채널 MOSFET 기준으로 <span class="pt">cutoff / triode / saturation</span> 세 영역과, 그 사이를 가르는 <span class="pt">pinch-off</span>를 *채널 전하* 관점에서 잡는다.

---

## 1. 두 개의 손잡이와 하나의 핵심 식

MOSFET은 **전압으로 제어**한다. 손잡이는 두 개다.

- **$V_{GS}$** (게이트-소스 전압) — 채널을 *만드는* 힘
- **$V_{DS}$** (드레인-소스 전압) — 채널을 따라 캐리어를 *미는* 힘

채널을 따라 위치마다 채널 전위 $V(x)$ 가 다르다 (소스 쪽 $0$ → 드레인 쪽 $V_{DS}$). 게이트가 그 지점에 거는 전압, 즉 **게이트-채널 전압**은

$$V_{GC}(x) = V_{GS} - V(x)$$

여기서 문턱전압 $V_{th}$ 를 넘은 **초과분**만이 실제 채널(반전층)을 만든다. 이 초과분을 **오버드라이브 전압(overdrive voltage)** 이라 한다.

$$V_{OV}(x) = V_{GS} - V(x) - V_{th}$$

그리고 그 지점의 **채널 전하밀도**는

$$\boxed{\,Q_n(x) = C_{ox}\,\big(V_{GS} - V(x) - V_{th}\big)\,}$$

- $C_{ox}$ : 게이트 산화막의 단위면적 커패시턴스 (게이트가 전하를 얼마나 잘 끌어오나)
- $Q_n$ 이 곧 **"채널 파이프의 두께"** 다. $Q_n = 0$ 이 되는 곳, 즉 $V(x) = V_{GS}-V_{th}$ 인 지점에서 채널이 끊긴다 → 이게 **pinch-off**.

> 정식 용어 vs 직관: $V_{GC}$(게이트-채널 전압) = "게이트 당김", $V_{OV}$(오버드라이브) = "채널 세기", $Q_n$(채널 전하밀도) = "파이프 두께".

---

## 2. 세 동작영역

($V_{OV} \equiv V_{GS} - V_{th}$, 소스 기준)

| 영역 | 조건 | 동작 |
|------|------|------|
| **Cutoff** | $V_{GS} < V_{th}$ | 채널 없음, $I_D \approx 0$ (스위치 OFF) |
| **Triode** (= ohmic = linear) | $V_{GS} > V_{th}$, $\;V_{DS} < V_{OV}$ | 전압제어 **저항**, 이게 $R_{DS(on)}$ |
| **Saturation** (= active) | $V_{GS} > V_{th}$, $\;V_{DS} \ge V_{OV}$ | 전압제어 **전류원**, $I_D \approx \tfrac{1}{2}kV_{OV}^2$ |

---

## 3. Pinch-off — 채널이 끊기는 순간

드레인 쪽으로 갈수록 $V(x)$ 가 커져서 오버드라이브 $V_{GS}-V(x)-V_{th}$ 가 작아진다. 드레인 끝의 오버드라이브가 **0** 이 되는 순간($V_{DS} = V_{OV}$), 채널이 드레인 끝에서 끊긴다. ($V_{GS}=5\text{V}$, $V_{th}=1\text{V}$ → $V_{OV}=4\text{V}$ 예시)

<svg viewBox="0 0 620 580" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>MOSFET 채널 오버드라이브로 본 세 상태</title>
  <desc>overdrive = VGS − V(x) − Vth. VGS=5V, Vth=1V. overdrive가 0 되는 곳에서 pinch-off.</desc>
  <text x="10" y="14" font-size="12.5" font-weight="700" fill="currentColor">overdrive = V_GS − V(x) − V_th   (V_GS=5V, V_th=1V → V_OV=4V)</text>
  <text x="10" y="30" font-size="11" fill="currentColor" fill-opacity="0.75">overdrive &gt; 0 이면 채널 통함 · overdrive = 0 되는 곳에서 pinch-off</text>
  <g transform="translate(10,48)">
    <text x="0" y="10" font-size="13" font-weight="700" fill="currentColor">① V_DS = 1V — 채널 거의 균일 → 저항처럼 (ohmic), V_DS↑ → I_D↑</text>
    <rect x="140" y="26" width="290" height="13" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-opacity="0.6"/>
    <text x="285" y="22" font-size="10.5" text-anchor="middle" fill="currentColor">Gate  (V_GS = 5V)</text>
    <line x1="140" y1="41" x2="430" y2="41" stroke="currentColor" stroke-opacity="0.5" stroke-dasharray="3 2"/>
    <rect x="65" y="46" width="70" height="66" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.5"/>
    <rect x="435" y="46" width="70" height="66" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.5"/>
    <text x="100" y="82" font-size="11" text-anchor="middle" fill="currentColor">S</text>
    <text x="100" y="97" font-size="9.5" text-anchor="middle" fill="currentColor" fill-opacity="0.7">0V</text>
    <text x="470" y="82" font-size="11" text-anchor="middle" fill="currentColor">D</text>
    <text x="470" y="97" font-size="9.5" text-anchor="middle" fill="currentColor" fill-opacity="0.7">1V</text>
    <rect x="65" y="112" width="440" height="24" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-opacity="0.4"/>
    <text x="285" y="128" font-size="9.5" text-anchor="middle" fill="currentColor" fill-opacity="0.6">p-body</text>
    <polygon points="135,54 435,62 435,112 135,112" fill="#3b82f6" fill-opacity="0.40" stroke="#3b82f6" stroke-opacity="0.7"/>
    <text x="150" y="50" font-size="9.5" fill="#3b82f6">overdrive 4V</text>
    <text x="372" y="58" font-size="9.5" fill="#3b82f6">overdrive 3V</text>
    <text x="285" y="92" font-size="10" text-anchor="middle" fill="currentColor" fill-opacity="0.85">채널 →</text>
    <line x1="135" y1="150" x2="435" y2="150" stroke="#3b82f6" stroke-width="1.3"/>
    <line x1="135" y1="146" x2="135" y2="154" stroke="#3b82f6" stroke-width="1.3"/>
    <line x1="435" y1="146" x2="435" y2="154" stroke="#3b82f6" stroke-width="1.3"/>
    <text x="285" y="165" font-size="9.5" text-anchor="middle" fill="#3b82f6">통하는 채널 L′ = 풀 길이</text>
  </g>
  <g transform="translate(10,228)">
    <text x="0" y="10" font-size="13" font-weight="700" fill="currentColor">② V_DS = V_OV = 4V — 드레인 끝 overdrive = 0 → pinch-off (경계!)</text>
    <rect x="140" y="26" width="290" height="13" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-opacity="0.6"/>
    <text x="285" y="22" font-size="10.5" text-anchor="middle" fill="currentColor">Gate  (V_GS = 5V)</text>
    <line x1="140" y1="41" x2="430" y2="41" stroke="currentColor" stroke-opacity="0.5" stroke-dasharray="3 2"/>
    <rect x="65" y="46" width="70" height="66" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.5"/>
    <rect x="435" y="46" width="70" height="66" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.5"/>
    <text x="100" y="82" font-size="11" text-anchor="middle" fill="currentColor">S</text>
    <text x="100" y="97" font-size="9.5" text-anchor="middle" fill="currentColor" fill-opacity="0.7">0V</text>
    <text x="470" y="82" font-size="11" text-anchor="middle" fill="currentColor">D</text>
    <text x="470" y="97" font-size="9.5" text-anchor="middle" fill="currentColor" fill-opacity="0.7">4V</text>
    <rect x="65" y="112" width="440" height="24" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-opacity="0.4"/>
    <text x="285" y="128" font-size="9.5" text-anchor="middle" fill="currentColor" fill-opacity="0.6">p-body</text>
    <polygon points="135,52 435,112 135,112" fill="#3b82f6" fill-opacity="0.40" stroke="#3b82f6" stroke-opacity="0.7"/>
    <text x="150" y="48" font-size="9.5" fill="#3b82f6">overdrive 4V</text>
    <text x="412" y="106" font-size="16" fill="#e0533d" text-anchor="middle">✂</text>
    <text x="437" y="120" font-size="9.5" fill="#e0533d">overdrive 0</text>
    <text x="437" y="132" font-size="9.5" fill="#e0533d">끊김</text>
    <line x1="135" y1="150" x2="435" y2="150" stroke="#3b82f6" stroke-width="1.3"/>
    <line x1="135" y1="146" x2="135" y2="154" stroke="#3b82f6" stroke-width="1.3"/>
    <line x1="435" y1="146" x2="435" y2="154" stroke="#3b82f6" stroke-width="1.3"/>
    <text x="285" y="165" font-size="9.5" text-anchor="middle" fill="#3b82f6">통하는 채널 L′ = 풀 길이 (pinch-off가 드레인 끝)</text>
  </g>
  <g transform="translate(10,408)">
    <text x="0" y="10" font-size="13" font-weight="700" fill="currentColor">③ V_DS = 6V — 드레인 앞에서 이미 overdrive 0, 여분 V_DS는 공핍에 → I_D 그대로 (saturation)</text>
    <rect x="140" y="26" width="290" height="13" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-opacity="0.6"/>
    <text x="285" y="22" font-size="10.5" text-anchor="middle" fill="currentColor">Gate  (V_GS = 5V)</text>
    <line x1="140" y1="41" x2="430" y2="41" stroke="currentColor" stroke-opacity="0.5" stroke-dasharray="3 2"/>
    <rect x="65" y="46" width="70" height="66" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.5"/>
    <rect x="435" y="46" width="70" height="66" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.5"/>
    <text x="100" y="82" font-size="11" text-anchor="middle" fill="currentColor">S</text>
    <text x="100" y="97" font-size="9.5" text-anchor="middle" fill="currentColor" fill-opacity="0.7">0V</text>
    <text x="470" y="82" font-size="11" text-anchor="middle" fill="currentColor">D</text>
    <text x="470" y="97" font-size="9.5" text-anchor="middle" fill="currentColor" fill-opacity="0.7">6V</text>
    <rect x="65" y="112" width="440" height="24" fill="currentColor" fill-opacity="0.07" stroke="currentColor" stroke-opacity="0.4"/>
    <text x="285" y="128" font-size="9.5" text-anchor="middle" fill="currentColor" fill-opacity="0.6">p-body</text>
    <polygon points="135,52 380,112 135,112" fill="#3b82f6" fill-opacity="0.40" stroke="#3b82f6" stroke-opacity="0.7"/>
    <rect x="380" y="46" width="55" height="66" fill="#e0533d" fill-opacity="0.18" stroke="#e0533d" stroke-opacity="0.5" stroke-dasharray="3 2"/>
    <text x="407" y="82" font-size="9" text-anchor="middle" fill="#e0533d">공핍</text>
    <text x="407" y="95" font-size="8.5" text-anchor="middle" fill="#e0533d">여분 V_DS</text>
    <text x="150" y="48" font-size="9.5" fill="#3b82f6">overdrive 4V</text>
    <text x="330" y="108" font-size="8.5" fill="#e0533d">overdrive 0</text>
    <line x1="135" y1="150" x2="380" y2="150" stroke="#3b82f6" stroke-width="1.3"/>
    <line x1="135" y1="146" x2="135" y2="154" stroke="#3b82f6" stroke-width="1.3"/>
    <line x1="380" y1="146" x2="380" y2="154" stroke="#3b82f6" stroke-width="1.3"/>
    <text x="257" y="165" font-size="9.5" text-anchor="middle" fill="#3b82f6">통하는 채널 L′ = 짧아짐 (제일 짧음) → 채널길이 변조</text>
  </g>
</svg>

$V_{DS}$ 를 더 올려도 pinch-off 지점은 *"채널 전위가 $V_{OV}$ 되는 곳"* 이라, 소스 쪽으로 살짝 밀릴 뿐 거기 전위는 늘 $V_{OV}$ 다. 남는 전압 $(V_{DS} - V_{OV})$ 은 전부 공핍구간에 걸린다.

> **그림 읽는 법 (통하는 채널 길이 $L'$):** 위 그림의 파란 브래킷 $L'$ 이 *통하는 채널 길이*(소스 → pinch-off)다. **물리적 S–D 거리 자체는 세 경우 다 똑같다** — 같은 소자니까 그건 안 변한다. 변하는 건 $L'$ 뿐이고, $V_{DS}$ 가 클수록 pinch-off가 소스 쪽으로 밀려 $L'$ 이 **짧아진다.** ①1V·②4V는 풀 길이, ③6V에서 제일 짧다. (주의: $L'$ 이 짧다고 전류가 많은 게 아니다. ①1V는 $L'$ 이 가장 길지만 미는 힘 $V_{DS}$ 가 작아 **전류는 제일 작다.** $L'$ 이 짧아 전류가 미세하게 느는 건 **saturation 안쪽(②↔③)의 2차 효과**일 뿐 → 아래 *실전 한 스푼*.)

> 그래서 **통하는 채널(소스 → pinch-off 지점)은 언제나 $0 \to V_{OV}$ 만 본다.** 이게 saturation에서 전류가 일정한 이유다.

### 조금 더 깊이 — saturation에서 왜 "일정"한가 (직렬 저항 + 전압분배로 보기)

수식 없이 직관으로 잡는 가장 쉬운 방법은, pinch-off가 생긴 소자를 **직렬로 이어진 저항 두 개**로 보는 것이다.

- **R_채널** (소스 → pinch-off 지점): 전자가 꽉 찬 길 → **저항 작음** (좋은 도체)
- **R_공핍** (pinch-off 지점 → 드레인): 전자가 **없는** 빈 구간 → **저항 거대** (거의 절연체)

$V_{DS}$ 는 이 둘에 **전압분배**로 나눠 걸린다. 논리는 세 단계다.

**① 통하는 채널은 언제나 $0 \to V_{OV}$ 만 본다.** pinch-off 지점의 정의 자체가 *"채널 전위 = $V_{OV}$ 인 곳"* 이다. 그래서 $V_{DS}$ 를 3V로 올리든 10V로 올리든 **R_채널 양단 전압은 늘 $V_{OV}$ 로 고정**된다. 채널 전하도 $V_{GS}$ 가 정하니 그대로. → **R_채널이 흘리는 전류 = 고정.**

**② 늘어난 $V_{DS}$ 는 전부 R_공핍이 먹는다.** 전압분배에서 저항이 압도적으로 큰 쪽이 전압을 다 가져가기 때문. (예: $V_{OV}=4\text{V}$ 일 때 $V_{DS}=10\text{V}$ → 채널 4V·공핍 6V, $V_{DS}=20\text{V}$ → 채널 여전히 4V·공핍 16V.)

**③ 그래서 여분 전압은 "전자 없는 빈 구간"에 갇혀** 정작 전류를 만드는 채널까진 닿지 못한다 → $I_D$ 그대로.

> **한 줄 직관:** 전류를 정하는 건 **통하는 채널**인데, 걔가 보는 조건($0\to V_{OV}$, 전하량)은 $V_{DS}$ 가 뭐든 안 변한다. 늘어난 $V_{DS}$ 는 전부 뒤쪽 빈 구간이 삼킨다. — 호스로 물을 공중에 쏠 때, 초당 나오는 물량은 수도꼭지($V_{GS}$)와 호스 내부 압력($V_{OV}$)이 이미 정한 거라, 낙차($V_{DS}$)를 아무리 키워도 물량은 안 변하는 것과 같다.

---

## 4. 왜 $V_{DS}$ 를 올리면 전류가 늘까

전류는 **전하 × 속도**다.

$$I_D \;\approx\; \underbrace{Q_n}_{\text{전하} \,\leftarrow\, V_{GS}} \times \underbrace{\mu \cdot \tfrac{V_{DS}}{L}}_{\text{미는 속도} \,\leftarrow\, V_{DS}}$$

- $V_{GS}$ 는 **전하량**($Q_n$, 파이프 두께)을 정한다.
- $V_{DS}$ 는 채널을 따라 미는 **전기장**($\approx V_{DS}/L$)을 정한다 → 캐리어 **속도**.

triode에서 $V_{DS}$ 를 올리면 **미는 힘이 세져서** 전류가 는다. (채널 두께는 거의 그대로.) 채널 모양 그림만 보면 이게 안 보이는 이유가 바로 이것 — 그림은 *전하(파이프)* 만 보여주고 *미는 속도* 는 안 보여준다.

정확한 triode 식은

$$I_D = k\Big[\underbrace{V_{OV}\,V_{DS}}_{\text{앞항: 미는 효과}\;(\uparrow)} \;-\; \underbrace{\tfrac{1}{2}V_{DS}^2}_{\text{뒤항: 얇아지는 효과}\;(\downarrow)}\Big], \qquad k = \mu_n C_{ox}\frac{W}{L}$$

- **앞항 $V_{OV}V_{DS}$** = 미는 효과 → 전류 **↑**
- **뒤항 $-\tfrac12 V_{DS}^2$** = 드레인 쪽이 얇아지는 효과 → 전류 **↓** (깎는 방향)

여기서 *"드레인 쪽이 얇아진다"* 는 뜻: 채널 두께(전하 $Q_n$)는 그 지점의 overdrive $V_{GS}-V(x)-V_{th}$ 로 정해지는데, 드레인 쪽으로 갈수록 $V(x)$ 가 커져 overdrive가 작아진다 → **드레인 근처에서 채널이 얇아지고, 그만큼 전류를 덜 흘린다.** 그래서 뒤항이 전류를 **깎는(−)** 방향이다. $V_{DS}$ 를 올리면 미는 효과(+)가 커지지만 드레인 쪽 얇아짐(−)도 같이 커져, $V_{DS}=V_{OV}$ 에서 둘이 균형을 이뤄 평평해진다. 기울기를 보면

$$\frac{dI_D}{dV_{DS}} = k\,(V_{OV} - V_{DS})$$

$V_{DS} = V_{OV}$ 에서 기울기가 **0** → 더 안 늘고 평평 → saturation 진입. 그 경계에서의 전류는

$$I_D = k\Big[V_{OV}^2 - \tfrac12 V_{OV}^2\Big] = \tfrac{1}{2}kV_{OV}^2$$

saturation 안쪽($V_{DS} > V_{OV}$)에서는 이 값으로 **고정된다**($V_{DS}$ 무관):

$$\boxed{\,I_{D,\text{sat}} = \tfrac{1}{2}\,k\,V_{OV}^2\,}$$

#### 포물선으로 보기 — triode 식은 꼭대기까지만 유효

triode 식을 $V_{DS}$ 에 대해 그리면 **위로 볼록한 포물선**이고, 꼭대기가 정확히 $V_{DS}=V_{OV}$ (그 값이 $\tfrac12 kV_{OV}^2$)다. 실제 소자는 이 포물선을 **꼭대기까지만** 따라 올라간다. $V_{DS}$ 가 $V_{OV}$ 를 넘으면 식대로는 포물선이 아래로 꺾여 전류가 줄어야 하지만(아래 점선) — 물리적으로 그런 일은 없다. 대신 **꼭대기 값에서 평평하게 고정**된다.

<svg viewBox="0 0 620 350" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>triode 식 포물선과 saturation 고정</title>
  <desc>triode 식은 V_DS에 대해 위로 볼록한 포물선. 꼭대기 V_DS=V_OV에서 ½kV_OV². V_OV 넘으면 식대로는 내려가지만 실제는 평평 고정.</desc>
  <line x1="70" y1="300" x2="580" y2="300" stroke="currentColor" stroke-opacity="0.7"/>
  <line x1="70" y1="300" x2="70" y2="40" stroke="currentColor" stroke-opacity="0.7"/>
  <text x="575" y="320" font-size="12" text-anchor="end" fill="currentColor">V_DS</text>
  <text x="60" y="48" font-size="12" text-anchor="end" fill="currentColor">I_D</text>
  <line x1="290" y1="76" x2="290" y2="300" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="4 3"/>
  <text x="290" y="318" font-size="10.5" text-anchor="middle" fill="currentColor" fill-opacity="0.8">V_DS = V_OV</text>
  <line x1="70" y1="76" x2="290" y2="76" stroke="currentColor" stroke-opacity="0.2" stroke-dasharray="3 3"/>
  <path d="M290,76 Q410,100 510,300" fill="none" stroke="#e0533d" stroke-width="2" stroke-dasharray="6 4" stroke-opacity="0.85"/>
  <text x="416" y="205" font-size="10.5" fill="#e0533d">식대로면 내려감</text>
  <text x="416" y="221" font-size="9.5" fill="#e0533d" fill-opacity="0.85">(실제론 안 됨 → 식 폐기)</text>
  <path d="M70,300 Q165,112 290,76" fill="none" stroke="#3b82f6" stroke-width="2.4"/>
  <path d="M290,76 L560,76" fill="none" stroke="#3b82f6" stroke-width="2.4"/>
  <circle cx="290" cy="76" r="4" fill="#3b82f6"/>
  <text x="205" y="64" font-size="11" fill="#3b82f6">½k·V_OV² (꼭대기)</text>
  <text x="432" y="66" font-size="11" fill="#3b82f6">saturation — 평평 고정</text>
  <text x="150" y="286" font-size="11" text-anchor="middle" fill="currentColor" fill-opacity="0.7">triode</text>
  <text x="150" y="299" font-size="9" text-anchor="middle" fill="currentColor" fill-opacity="0.5">(식 유효, 오름)</text>
</svg>

> 즉 **$-\tfrac12 V_{DS}^2$ 항은 포물선을 꼭대기까지 눕히는 역할만** 하고, $V_{OV}$ 를 넘으면 그 식 자체를 안 쓴다. (통하는 채널이 보는 전압이 늘 $V_{OV}$ 라, $V_{DS}$ 자리에 $V_{OV}$ 를 넣은 값 $\tfrac12 kV_{OV}^2$ 에서 얼어붙는다고 봐도 같다.)

> *실전 한 스푼:* 사실 완전 평평하진 않다. $V_{DS}$ 를 더 올리면 pinch-off 지점이 밀려 채널이 살짝 짧아져(**채널 길이 변조**) 전류가 미세하게 우상향한다 — $I_D \approx \tfrac{1}{2}kV_{OV}^2(1+\lambda V_{DS})$. 이 기울기가 유한한 출력저항 $r_o$ 이고, **아날로그(증폭·미러·LDO)** 엔 핵심이지만 **스위치로 쓸 땐 무시**해도 된다. (BJT의 Early effect와 같은 얘기.)

<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>MOSFET 출력특성 I_D vs V_DS</title>
  <desc>V_DS를 올리면 ohmic에서 전류가 오르다 V_OV에서 꺾여 saturation에서 평평해진다.</desc>
  <line x1="60" y1="280" x2="580" y2="280" stroke="currentColor" stroke-opacity="0.7"/>
  <line x1="60" y1="280" x2="60" y2="30" stroke="currentColor" stroke-opacity="0.7"/>
  <text x="575" y="300" font-size="12" text-anchor="end" fill="currentColor">V_DS</text>
  <text x="52" y="40" font-size="12" text-anchor="end" fill="currentColor">I_D</text>
  <!-- curve for higher VGS -->
  <path d="M60,280 Q210,150 350,90 L560,90" fill="none" stroke="#3b82f6" stroke-width="2.2"/>
  <line x1="350" y1="90" x2="350" y2="280" stroke="#3b82f6" stroke-opacity="0.4" stroke-dasharray="4 3"/>
  <text x="350" y="296" font-size="10.5" text-anchor="middle" fill="#3b82f6">V_OV (큰 V_GS)</text>
  <!-- curve for lower VGS -->
  <path d="M60,280 Q150,210 220,185 L560,185" fill="none" stroke="#f59e0b" stroke-width="2.2"/>
  <line x1="220" y1="185" x2="220" y2="280" stroke="#f59e0b" stroke-opacity="0.4" stroke-dasharray="4 3"/>
  <text x="220" y="296" font-size="10.5" text-anchor="middle" fill="#f59e0b">V_OV (작은 V_GS)</text>
  <!-- region labels -->
  <text x="120" y="120" font-size="12" fill="currentColor" fill-opacity="0.8">ohmic</text>
  <text x="120" y="136" font-size="9.5" fill="currentColor" fill-opacity="0.55">(저항, 오름)</text>
  <text x="450" y="70" font-size="12" fill="currentColor" fill-opacity="0.8">saturation</text>
  <text x="450" y="86" font-size="9.5" fill="currentColor" fill-opacity="0.55">(전류원, 평평)</text>
  <text x="470" y="175" font-size="11" fill="#3b82f6">I_D,sat = ½·k·V_OV²</text>
</svg>

> 즉 **미는 효과**가 전류를 늘리고, **얇아지는 효과**가 그걸 눌러서 결국 평평해진다.

---

## 5. 함정 — "saturation"이 정반대 뜻

BJT를 같이 쓰다 보면 반드시 헷갈리는 지점.

| 기능 | MOSFET | BJT |
|------|--------|-----|
| 꺼짐 (OFF) | **cutoff** | **cutoff** |
| 완전히 켜짐 (스위치 ON) | **triode** | **saturation** |
| 증폭 (전류원) | **saturation** | **active** |

- **MOSFET의 saturation = 증폭** 영역
- **BJT의 saturation = 완전히 켜진 스위치** 영역

> <span class="pt">정반대다.</span> "BJT saturation"은 "MOSFET triode"와 짝, "BJT active"가 "MOSFET saturation"과 짝. (BJT 3영역 상세는 다음 개념정리에서.)

---

## 6. 실무 연결

- **스위칭 컨버터의 파워 MOSFET**: `cutoff ↔ triode` 를 왕복한다. 완전 ON일 때 **triode**(낮은 $R_{DS(on)}$)라 도통손실이 작다. 전환 중 잠깐 saturation을 지날 때 $V\cdot I$ 가 겹쳐 → **스위칭 손실**.
- **LDO의 pass FET**: **saturation(active)** 에서 전류원처럼 동작하며 $(V_{in}-V_{out})$ 을 떨군다 → 그 전압차 × 전류가 그대로 **열**. LDO 효율 $\eta = V_{out}/V_{in}$ 의 근원이 이것.

---

## Key takeaways

- 채널 전하 $Q_n = C_{ox}(V_{GS}-V(x)-V_{th})$ 이고, 이게 **0** 되는 곳이 **pinch-off**.
- 세 영역 경계는 $V_{DS} = V_{OV} = V_{GS}-V_{th}$.
- $V_{GS}$ 가 **전하**, $V_{DS}$ 가 **미는 힘**. triode는 저항, saturation은 전류원 $\tfrac12 kV_{OV}^2$.
- **MOSFET saturation ≠ BJT saturation** (정반대).
- 스위치는 **triode**에서 ON, LDO는 **saturation**에서 regulate.

---

*Reference: 소자 동작영역은 표준 반도체 소자물리(Sedra/Smith, Razavi 등). 컨버터 응용 맥락은 Erickson & Maksimović, Fundamentals of Power Electronics, 2nd Ed., Ch.1·4.*
