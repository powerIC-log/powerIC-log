+++
title = "[Concept] MOSFET Operating Regions — cutoff · triode · saturation and pinch-off"
date = 2026-07-12
series = "Theory / Principle"
description = "To understand LDOs and switching, you first need to know which region a MOSFET operates in. Here I organize the three regions and pinch-off from a channel-charge perspective."
tags = ["개념정리", "MOSFET", "device", "pinch-off", "fundamentals"]
+++

## Intro

When you study LDOs, you inevitably run into the question of *"which region the pass FET operates in."* The same is true for the power MOSFET in a switching converter.

This is a **concept note** I'm setting aside for that. Using an n-channel MOSFET as the reference, I'll pin down the three regions — <span class="pt">cutoff / triode / saturation</span> — and the <span class="pt">pinch-off</span> that divides them, from a *channel-charge* perspective.

---

## 1. Two knobs and one key equation

A MOSFET is **voltage-controlled**. There are two knobs.

- **$V_{GS}$** (gate-source voltage) — the force that *creates* the channel
- **$V_{DS}$** (drain-source voltage) — the force that *pushes* carriers along the channel

Along the channel, the channel potential $V(x)$ differs at each position (from $0$ at the source side → $V_{DS}$ at the drain side). The voltage the gate applies at that point, i.e. the **gate-channel voltage**, is

$$V_{GC}(x) = V_{GS} - V(x)$$

Here, only the **excess** beyond the threshold voltage $V_{th}$ actually forms the channel (the inversion layer). This excess is called the **overdrive voltage**.

$$V_{OV}(x) = V_{GS} - V(x) - V_{th}$$

And the **channel charge density** at that point is

$$\boxed{\,Q_n(x) = C_{ox}\,\big(V_{GS} - V(x) - V_{th}\big)\,}$$

- $C_{ox}$ : the gate oxide capacitance per unit area (how well the gate pulls in charge)
- $Q_n$ is exactly the **"thickness of the channel pipe."** At the place where $Q_n = 0$, i.e. where $V(x) = V_{GS}-V_{th}$, the channel is pinched off → this is **pinch-off**.

> Formal term vs. intuition: $V_{GC}$ (gate-channel voltage) = "gate pull", $V_{OV}$ (overdrive) = "channel strength", $Q_n$ (channel charge density) = "pipe thickness".

---

## 2. The three operating regions

($V_{OV} \equiv V_{GS} - V_{th}$, referenced to source)

| Region | Condition | Behavior |
|------|------|------|
| **Cutoff** | $V_{GS} < V_{th}$ | No channel, $I_D \approx 0$ (switch OFF) |
| **Triode** (= ohmic = linear) | $V_{GS} > V_{th}$, $\;V_{DS} < V_{OV}$ | Voltage-controlled **resistor**, this is $R_{DS(on)}$ |
| **Saturation** (= active) | $V_{GS} > V_{th}$, $\;V_{DS} \ge V_{OV}$ | Voltage-controlled **current source**, $I_D \approx \tfrac{1}{2}kV_{OV}^2$ |

---

## 3. Pinch-off — the moment the channel is cut off

As you move toward the drain, $V(x)$ grows, so the overdrive $V_{GS}-V(x)-V_{th}$ shrinks. The instant the overdrive at the drain end reaches **0** ($V_{DS} = V_{OV}$), the channel is pinched off at the drain end. ($V_{GS}=5\text{V}$, $V_{th}=1\text{V}$ → $V_{OV}=4\text{V}$ example)

> ## One thing separates triode from saturation
>
> **If the channel runs unbroken from source all the way to the drain it is triode (ohmic); if it is cut off before reaching the drain it is saturation.**
>
> - Overdrive at the drain end **> 0** → the channel reaches the drain → **triode** (= $V_{DS} < V_{OV}$)
> - Overdrive at the drain end **≤ 0** → cut off before the drain → **saturation** (= $V_{DS} \ge V_{OV}$)

**"Unbroken" does not mean "uniform in thickness".** When $V_{DS}$ is very small ($V_{DS} \ll V_{OV}$) the channel is nearly uniform and the response is **truly linear** (a pure resistor); as $V_{DS}$ approaches $V_{OV}$ the drain end thins, resistance rises and **the curve bends over**. It is still triode as long as it is not cut.

The two regions also differ in **what the conducting channel actually sees** — which is precisely why one behaves as a resistor and the other as a current source.

| | Voltage across the conducting channel | So |
|---|---|---|
| **Triode** ($V_{DS}=1\text{V}$) | **all of $V_{DS}$** (1V) | raising $V_{DS}$ raises the push directly → **resistor** |
| **Boundary** ($V_{DS}=V_{OV}$) | 4V | the drain-end thickness reaches zero here |
| **Saturation** ($V_{DS}=6\text{V}$) | **still $V_{OV}$** (4V); the rest is absorbed by the depletion gap | what the channel sees never changes → **constant current** |

<svg viewBox="0 0 640 620" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>N-channel MOSFET cross-section in three conditions</title>
  <desc>Ohmic, pinch-off boundary and saturation drawn on a conventional MOSFET cross-section.</desc>
  <text x="20" y="20" font-size="12.5" font-weight="700" fill="currentColor">① V_DS = 1V — channel reaches the drain · all of V_DS sits across it → resistor (ohmic)</text>
  <g transform="translate(0,26)">
    <rect x="60" y="60" width="500" height="90" fill="#7fb3d5" fill-opacity="0.18" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.4"/>
    <text x="310" y="140" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">P-substrate</text>
    <rect x="70" y="60" width="100" height="40" rx="8" fill="#e8c86a" fill-opacity="0.35" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="120" y="85" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">N+</text>
    <rect x="450" y="60" width="100" height="40" rx="8" fill="#e8c86a" fill-opacity="0.35" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="500" y="85" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">N+</text>
    <rect x="180" y="30" width="260" height="30" fill="#7fd5a5" fill-opacity="0.3" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="310" y="50" text-anchor="middle" font-size="11" fill="currentColor">SiO2</text>
    <rect x="175" y="14" width="270" height="16" fill="#e8c86a" fill-opacity="0.5" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <line x1="310" y1="14" x2="310" y2="2" stroke="currentColor" stroke-width="1.4"/>
    <text x="318" y="10" font-size="10.5" font-weight="700" fill="currentColor">Gate 5V</text>
    <line x1="120" y1="60" x2="120" y2="34" stroke="currentColor" stroke-width="1.4"/>
    <text x="112" y="30" text-anchor="end" font-size="10.5" font-weight="700" fill="currentColor">S 0V</text>
    <line x1="500" y1="60" x2="500" y2="34" stroke="currentColor" stroke-width="1.4"/>
    <text x="508" y="30" font-size="10.5" font-weight="700" fill="currentColor">D 1V</text>
    <polygon points="170,60 450,60 450,72 170,75" fill="#3b82f6" fill-opacity="0.5" stroke="#3b82f6" stroke-opacity="0.8"/>
    <text x="310" y="92" text-anchor="middle" font-size="10" fill="#3b82f6">channel — nearly uniform thickness</text>
    <line x1="170" y1="160" x2="450" y2="160" stroke="#3b82f6" stroke-width="1.4"/>
    <line x1="170" y1="156" x2="170" y2="164" stroke="#3b82f6" stroke-width="1.4"/>
    <line x1="450" y1="156" x2="450" y2="164" stroke="#3b82f6" stroke-width="1.4"/>
    <text x="310" y="176" text-anchor="middle" font-size="10" fill="#3b82f6">conducting channel L&#8242; — 1V across it (all of V_DS)</text>
  </g>
  <text x="20" y="238" font-size="12.5" font-weight="700" fill="currentColor">② V_DS = V_OV = 4V — thickness reaches 0 at the drain → pinch-off (boundary)</text>
  <g transform="translate(0,244)">
    <rect x="60" y="60" width="500" height="90" fill="#7fb3d5" fill-opacity="0.18" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.4"/>
    <text x="310" y="140" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">P-substrate</text>
    <rect x="70" y="60" width="100" height="40" rx="8" fill="#e8c86a" fill-opacity="0.35" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="120" y="85" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">N+</text>
    <rect x="450" y="60" width="100" height="40" rx="8" fill="#e8c86a" fill-opacity="0.35" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="500" y="85" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">N+</text>
    <rect x="180" y="30" width="260" height="30" fill="#7fd5a5" fill-opacity="0.3" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="310" y="50" text-anchor="middle" font-size="11" fill="currentColor">SiO2</text>
    <rect x="175" y="14" width="270" height="16" fill="#e8c86a" fill-opacity="0.5" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <line x1="310" y1="14" x2="310" y2="2" stroke="currentColor" stroke-width="1.4"/>
    <text x="318" y="10" font-size="10.5" font-weight="700" fill="currentColor">Gate 5V</text>
    <line x1="120" y1="60" x2="120" y2="34" stroke="currentColor" stroke-width="1.4"/>
    <text x="112" y="30" text-anchor="end" font-size="10.5" font-weight="700" fill="currentColor">S 0V</text>
    <line x1="500" y1="60" x2="500" y2="34" stroke="currentColor" stroke-width="1.4"/>
    <text x="508" y="30" font-size="10.5" font-weight="700" fill="currentColor">D 4V</text>
    <polygon points="170,60 450,60 170,75" fill="#3b82f6" fill-opacity="0.5" stroke="#3b82f6" stroke-opacity="0.8"/>
    <text x="441" y="72" font-size="13" fill="#e0533d">&#9986;</text>
    <text x="386" y="92" font-size="9.5" fill="#e0533d">thickness 0 here</text>
    <line x1="170" y1="160" x2="450" y2="160" stroke="#3b82f6" stroke-width="1.4"/>
    <line x1="170" y1="156" x2="170" y2="164" stroke="#3b82f6" stroke-width="1.4"/>
    <line x1="450" y1="156" x2="450" y2="164" stroke="#3b82f6" stroke-width="1.4"/>
    <text x="310" y="176" text-anchor="middle" font-size="10" fill="#3b82f6">conducting channel L&#8242; — 4V across it (= V_OV)</text>
  </g>
  <text x="20" y="456" font-size="12.5" font-weight="700" fill="currentColor">③ V_DS = 6V — the extra 2V goes to the depletion gap · the channel still sees only 4V → constant current</text>
  <g transform="translate(0,462)">
    <rect x="60" y="60" width="500" height="90" fill="#7fb3d5" fill-opacity="0.18" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.4"/>
    <text x="310" y="140" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">P-substrate</text>
    <rect x="70" y="60" width="100" height="40" rx="8" fill="#e8c86a" fill-opacity="0.35" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="120" y="85" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">N+</text>
    <rect x="450" y="60" width="100" height="40" rx="8" fill="#e8c86a" fill-opacity="0.35" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="500" y="85" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">N+</text>
    <rect x="180" y="30" width="260" height="30" fill="#7fd5a5" fill-opacity="0.3" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <text x="310" y="50" text-anchor="middle" font-size="11" fill="currentColor">SiO2</text>
    <rect x="175" y="14" width="270" height="16" fill="#e8c86a" fill-opacity="0.5" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.3"/>
    <line x1="310" y1="14" x2="310" y2="2" stroke="currentColor" stroke-width="1.4"/>
    <text x="318" y="10" font-size="10.5" font-weight="700" fill="currentColor">Gate 5V</text>
    <line x1="120" y1="60" x2="120" y2="34" stroke="currentColor" stroke-width="1.4"/>
    <text x="112" y="30" text-anchor="end" font-size="10.5" font-weight="700" fill="currentColor">S 0V</text>
    <line x1="500" y1="60" x2="500" y2="34" stroke="currentColor" stroke-width="1.4"/>
    <text x="508" y="30" font-size="10.5" font-weight="700" fill="currentColor">D 6V</text>
    <polygon points="170,60 390,60 170,75" fill="#3b82f6" fill-opacity="0.5" stroke="#3b82f6" stroke-opacity="0.8"/>
    <rect x="390" y="60" width="60" height="16" fill="#e0533d" fill-opacity="0.16" stroke="#e0533d" stroke-opacity="0.6" stroke-dasharray="3 2"/>
    <text x="420" y="92" text-anchor="middle" font-size="9.5" fill="#e0533d">depletion (extra 2V)</text>
    <line x1="170" y1="160" x2="390" y2="160" stroke="#3b82f6" stroke-width="1.4"/>
    <line x1="170" y1="156" x2="170" y2="164" stroke="#3b82f6" stroke-width="1.4"/>
    <line x1="390" y1="156" x2="390" y2="164" stroke="#3b82f6" stroke-width="1.4"/>
    <text x="280" y="176" text-anchor="middle" font-size="10" fill="#3b82f6">L&#8242; shortens — but still 4V across it</text>
  </g>
</svg>

Even if you raise $V_{DS}$ further, the pinch-off point is *"where the channel potential reaches $V_{OV}$,"* so it only shifts slightly toward the source, and the potential there is always $V_{OV}$. The remaining voltage $(V_{DS} - V_{OV})$ all drops across the depletion segment.

> **How to read the figure (conducting channel length $L'$):** The blue bracket $L'$ in the figure above is the *conducting channel length* (source → pinch-off). **The physical S–D distance itself is the same in all three cases** — it's the same device, so that doesn't change. The only thing that changes is $L'$, and the larger $V_{DS}$ is, the more pinch-off is pushed toward the source, so $L'$ **gets shorter.** At ① 1V and ② 4V it is the full length; at ③ 6V it is the shortest. (Note: a shorter $L'$ does not mean more current. At ① 1V, $L'$ is the longest, but the pushing force $V_{DS}$ is small, so **the current is the smallest.** The slight increase in current from a shorter $L'$ is only a **second-order effect inside saturation (②↔③)** → see *A practical note* below.)

> So **the conducting channel (source → pinch-off point) always sees only $0 \to V_{OV}$.** This is why the current stays constant in saturation.

### A little deeper — why the current is "constant" in saturation (viewed as series resistance + voltage divider)

The easiest way to grasp this by intuition without equations is to view a device that has developed pinch-off as **two resistors in series**.

- **R_channel** (source → pinch-off point): a path packed with electrons → **small resistance** (a good conductor)
- **R_depletion** (pinch-off point → drain): an empty segment with **no** electrons → **huge resistance** (nearly an insulator)

$V_{DS}$ is divided across these two as a **voltage divider**. The logic has three steps.

**① The conducting channel always sees only $0 \to V_{OV}$.** The very definition of the pinch-off point is *"the place where the channel potential = $V_{OV}$."* So whether you raise $V_{DS}$ to 3V or to 10V, **the voltage across R_channel is always fixed at $V_{OV}$**. The channel charge is set by $V_{GS}$, so it stays the same too. → **The current R_channel carries = fixed.**

**② The added $V_{DS}$ is all absorbed by R_depletion.** In a voltage divider, the overwhelmingly larger resistor takes all the voltage. (E.g., with $V_{OV}=4\text{V}$: $V_{DS}=10\text{V}$ → channel 4V · depletion 6V; $V_{DS}=20\text{V}$ → channel still 4V · depletion 16V.)

**③ So the extra voltage is trapped in the "empty electron-free segment"** and never reaches the channel that actually makes the current → $I_D$ unchanged.

> **In one line:** What sets the current is the **conducting channel**, and the conditions it sees ($0\to V_{OV}$, the charge amount) don't change no matter what $V_{DS}$ is. All the added $V_{DS}$ is swallowed by the empty segment behind it. — It's like shooting water into the air with a hose: the amount of water per second is already set by the faucet ($V_{GS}$) and the pressure inside the hose ($V_{OV}$), so no matter how much you increase the drop height ($V_{DS}$), the flow rate doesn't change.

---

## 4. Why does raising $V_{DS}$ increase the current

Current is **charge × velocity**.

$$I_D \;\approx\; \underbrace{Q_n}_{\text{charge} \,\leftarrow\, V_{GS}} \times \underbrace{\mu \cdot \tfrac{V_{DS}}{L}}_{\text{push velocity} \,\leftarrow\, V_{DS}}$$

- $V_{GS}$ sets the **charge amount** ($Q_n$, the pipe thickness).
- $V_{DS}$ sets the **electric field** ($\approx V_{DS}/L$) that pushes along the channel → carrier **velocity**.

In triode, raising $V_{DS}$ **strengthens the pushing force** so the current increases. (The channel thickness stays nearly the same.) The reason this isn't visible if you only look at the channel-shape figure is exactly this — the figure shows only the *charge (the pipe)*, not the *push velocity*.

The exact triode equation is

$$I_D = k\Big[\underbrace{V_{OV}\,V_{DS}}_{\text{first term: pushing effect}\;(\uparrow)} \;-\; \underbrace{\tfrac{1}{2}V_{DS}^2}_{\text{second term: thinning effect}\;(\downarrow)}\Big], \qquad k = \mu_n C_{ox}\frac{W}{L}$$

- **First term $V_{OV}V_{DS}$** = pushing effect → current **↑**
- **Second term $-\tfrac12 V_{DS}^2$** = the drain side thinning out → current **↓** (in the trimming direction)

Here's what *"the drain side thins out"* means: the channel thickness (charge $Q_n$) is set by the overdrive $V_{GS}-V(x)-V_{th}$ at that point, and as you move toward the drain, $V(x)$ grows and the overdrive shrinks → **the channel thins out near the drain, and carries that much less current.** That's why the second term trims the current in the **(−)** direction. When you raise $V_{DS}$, the pushing effect (+) grows, but the drain-side thinning (−) grows along with it, and at $V_{DS}=V_{OV}$ the two balance and it flattens out. Looking at the slope,

$$\frac{dI_D}{dV_{DS}} = k\,(V_{OV} - V_{DS})$$

At $V_{DS} = V_{OV}$ the slope is **0** → no more increase, flat → entering saturation. The current at that boundary is

$$I_D = k\Big[V_{OV}^2 - \tfrac12 V_{OV}^2\Big] = \tfrac{1}{2}kV_{OV}^2$$

Inside saturation ($V_{DS} > V_{OV}$), it is **fixed** at this value (independent of $V_{DS}$):

$$\boxed{\,I_{D,\text{sat}} = \tfrac{1}{2}\,k\,V_{OV}^2\,}$$

#### Viewed as a parabola — the triode equation is valid only up to the peak

Plotted against $V_{DS}$, the triode equation is a **downward-opening (concave) parabola**, and its peak is exactly at $V_{DS}=V_{OV}$ (that value being $\tfrac12 kV_{OV}^2$). A real device follows this parabola **only up to the peak.** If $V_{DS}$ exceeds $V_{OV}$, the equation says the parabola should bend down and the current should decrease (the dashed line below) — but physically that never happens. Instead, it stays **flat, fixed at the peak value.**

<svg viewBox="0 0 620 350" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>The triode-equation parabola and the saturation flat line</title>
  <desc>The triode equation is a downward-opening parabola in V_DS. At the peak V_DS=V_OV it is ½kV_OV². Beyond V_OV the equation goes down but the real device stays flat.</desc>
  <line x1="70" y1="300" x2="580" y2="300" stroke="currentColor" stroke-opacity="0.7"/>
  <line x1="70" y1="300" x2="70" y2="40" stroke="currentColor" stroke-opacity="0.7"/>
  <text x="575" y="320" font-size="12" text-anchor="end" fill="currentColor">V_DS</text>
  <text x="60" y="48" font-size="12" text-anchor="end" fill="currentColor">I_D</text>
  <line x1="290" y1="76" x2="290" y2="300" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="4 3"/>
  <text x="290" y="318" font-size="10.5" text-anchor="middle" fill="currentColor" fill-opacity="0.8">V_DS = V_OV</text>
  <line x1="70" y1="76" x2="290" y2="76" stroke="currentColor" stroke-opacity="0.2" stroke-dasharray="3 3"/>
  <path d="M290,76 Q410,100 510,300" fill="none" stroke="#e0533d" stroke-width="2" stroke-dasharray="6 4" stroke-opacity="0.85"/>
  <text x="416" y="205" font-size="10.5" fill="#e0533d">what the equation predicts (down)</text>
  <text x="416" y="221" font-size="9.5" fill="#e0533d" fill-opacity="0.85">(doesn't happen → equation discarded)</text>
  <path d="M70,300 Q165,112 290,76" fill="none" stroke="#3b82f6" stroke-width="2.4"/>
  <path d="M290,76 L560,76" fill="none" stroke="#3b82f6" stroke-width="2.4"/>
  <circle cx="290" cy="76" r="4" fill="#3b82f6"/>
  <text x="205" y="64" font-size="11" fill="#3b82f6">½k·V_OV² (peak)</text>
  <text x="432" y="66" font-size="11" fill="#3b82f6">saturation — flat, fixed</text>
  <text x="150" y="286" font-size="11" text-anchor="middle" fill="currentColor" fill-opacity="0.7">triode</text>
  <text x="150" y="299" font-size="9" text-anchor="middle" fill="currentColor" fill-opacity="0.5">(equation valid, rising)</text>
</svg>

> In other words, the **$-\tfrac12 V_{DS}^2$ term only serves to bend the parabola over toward its peak**, and once $V_{OV}$ is exceeded, that equation itself is no longer used. (Since the conducting channel always sees a voltage of $V_{OV}$, you can equally view it as freezing at $\tfrac12 kV_{OV}^2$, the value obtained by plugging $V_{OV}$ into the $V_{DS}$ slot.)

> *A practical note:* In reality it isn't perfectly flat. If you raise $V_{DS}$ further, the pinch-off point shifts and the channel gets slightly shorter (**channel-length modulation**), so the current rises slightly upward to the right — $I_D \approx \tfrac{1}{2}kV_{OV}^2(1+\lambda V_{DS})$. This slope is the finite output resistance $r_o$, and it is **central for analog (amplification · mirrors · LDOs)** but **can be ignored when used as a switch.** (This is the same story as the BJT's Early effect.)

<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>MOSFET output characteristic I_D vs V_DS</title>
  <desc>As V_DS rises, the current increases in ohmic, then bends at V_OV and flattens in saturation.</desc>
  <line x1="60" y1="280" x2="580" y2="280" stroke="currentColor" stroke-opacity="0.7"/>
  <line x1="60" y1="280" x2="60" y2="30" stroke="currentColor" stroke-opacity="0.7"/>
  <text x="575" y="300" font-size="12" text-anchor="end" fill="currentColor">V_DS</text>
  <text x="52" y="40" font-size="12" text-anchor="end" fill="currentColor">I_D</text>
  <!-- curve for higher VGS -->
  <path d="M60,280 Q210,150 350,90 L560,90" fill="none" stroke="#3b82f6" stroke-width="2.2"/>
  <line x1="350" y1="90" x2="350" y2="280" stroke="#3b82f6" stroke-opacity="0.4" stroke-dasharray="4 3"/>
  <text x="350" y="296" font-size="10.5" text-anchor="middle" fill="#3b82f6">V_OV (large V_GS)</text>
  <!-- curve for lower VGS -->
  <path d="M60,280 Q150,210 220,185 L560,185" fill="none" stroke="#f59e0b" stroke-width="2.2"/>
  <line x1="220" y1="185" x2="220" y2="280" stroke="#f59e0b" stroke-opacity="0.4" stroke-dasharray="4 3"/>
  <text x="220" y="296" font-size="10.5" text-anchor="middle" fill="#f59e0b">V_OV (small V_GS)</text>
  <!-- region labels -->
  <text x="120" y="120" font-size="12" fill="currentColor" fill-opacity="0.8">ohmic</text>
  <text x="120" y="136" font-size="9.5" fill="currentColor" fill-opacity="0.55">(resistor, rising)</text>
  <text x="450" y="70" font-size="12" fill="currentColor" fill-opacity="0.8">saturation</text>
  <text x="450" y="86" font-size="9.5" fill="currentColor" fill-opacity="0.55">(current source, flat)</text>
  <text x="470" y="175" font-size="11" fill="#3b82f6">I_D,sat = ½·k·V_OV²</text>
</svg>

> In other words, the **pushing effect** increases the current, and the **thinning effect** presses it down, so in the end it flattens out.

---

## 5. Pitfall — "saturation" means the exact opposite

The point that inevitably trips you up when you work with BJTs alongside.

| Function | MOSFET | BJT |
|------|--------|-----|
| OFF | **cutoff** | **cutoff** |
| Fully on (switch ON) | **triode** | **saturation** |
| Amplification (current source) | **saturation** | **active** |

- **MOSFET saturation = the amplification** region
- **BJT saturation = the fully-on switch** region

> <span class="pt">They're exact opposites.</span> "BJT saturation" pairs with "MOSFET triode," and "BJT active" pairs with "MOSFET saturation." (Details of the BJT's three regions in the next concept note.)

---

## 6. In practice

- **Power MOSFET in a switching converter**: it shuttles between `cutoff ↔ triode`. When fully ON it is in **triode** (low $R_{DS(on)}$), so conduction loss is small. During the transition it briefly passes through saturation where $V\cdot I$ overlap → **switching loss**.
- **Pass FET in an LDO**: it operates like a current source in **saturation (active)** and drops $(V_{in}-V_{out})$ → that voltage difference × current becomes **heat** directly. This is the root of the LDO efficiency $\eta = V_{out}/V_{in}$.

---

## Key takeaways

- The channel charge is $Q_n = C_{ox}(V_{GS}-V(x)-V_{th})$, and where it reaches **0** is **pinch-off**.
- The boundary of the three regions is $V_{DS} = V_{OV} = V_{GS}-V_{th}$.
- $V_{GS}$ is the **charge**, $V_{DS}$ is the **pushing force**. Triode is a resistor, saturation is a current source $\tfrac12 kV_{OV}^2$.
- **MOSFET saturation ≠ BJT saturation** (exact opposites).
- A switch turns ON in **triode**; an LDO regulates in **saturation**.

---

*Reference: The device operating regions come from standard semiconductor device physics (Sedra/Smith, Razavi, etc.). The converter application context is from Erickson & Maksimović, Fundamentals of Power Electronics, 2nd Ed., Ch.1·4.*
