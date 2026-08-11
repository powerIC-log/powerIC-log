+++
title = "[Concept] Control theory basics (2) — poles and zeros, reading and sketching a Bode plot"
date = 2026-08-11T23:00:00+09:00
series = "Theory / Principle"
description = "After loop gain comes the question 'why does the phase slip?'. What poles and zeros do to gain and phase, how to tell them apart in a circuit, and why gain alone can never buy you bandwidth."
tags = ["개념정리", "극점", "영점", "보드선도", "control", "fundamentals"]
+++

## Why this note

The [previous post](../loop-gain-basics/) covered loop gain and phase margin. One question was left open.

> **"So why does the phase slip?"**

The answer is the **pole**, and the tool that undoes it is the **zero**. With just these two you can sketch a Bode plot by hand and see what compensator design is actually doing.

> This note is compressed to **what gets used later**. The physical derivation of phase lag (capacitor current and integration) never appears in compensator design, so it is skipped. What you need in practice is **two rules and one test**.

---

## 1. Poles and zeros — two lines is all of it

> **Pole** = from that frequency, gain falls **20dB/dec** more steeply and phase slips **−90°**
> **Zero** = from that frequency, gain falls **20dB/dec** less steeply and phase comes back **+90°**

<svg viewBox="0 0 720 480" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>Gain and phase curves of a pole and a zero</title>
  <desc>A pole bends the gain to -20dB/dec and pushes phase to -90 degrees; a zero does the opposite.</desc>
  <text x="30" y="24" font-size="13" font-weight="700" fill="#3b82f6">Pole</text>
  <text x="30" y="52" font-size="10.5" fill="currentColor" fill-opacity="0.7">Magnitude</text>
  <line x1="70" y1="40" x2="70" y2="150" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="70" y1="150" x2="330" y2="150" stroke="currentColor" stroke-opacity="0.45"/>
  <path d="M70,70 L180,70 L330,130" fill="none" stroke="#3b82f6" stroke-width="2.8"/>
  <text x="238" y="98" font-size="10" fill="#3b82f6">−20dB/dec</text>
  <circle cx="180" cy="70" r="4.5" fill="#e0533d"/>
  <line x1="180" y1="70" x2="180" y2="150" stroke="#e0533d" stroke-dasharray="4 3" stroke-width="1.3"/>
  <text x="180" y="166" text-anchor="middle" font-size="11" font-weight="700" fill="#e0533d">fp</text>
  <text x="30" y="206" font-size="10.5" fill="currentColor" fill-opacity="0.7">Phase</text>
  <line x1="70" y1="194" x2="70" y2="300" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="70" y1="300" x2="330" y2="300" stroke="currentColor" stroke-opacity="0.45"/>
  <text x="62" y="214" text-anchor="end" font-size="9.5" fill="currentColor" fill-opacity="0.7">0°</text>
  <text x="62" y="288" text-anchor="end" font-size="9.5" fill="currentColor" fill-opacity="0.7">−90°</text>
  <line x1="70" y1="284" x2="330" y2="284" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="3 3"/>
  <path d="M70,210 L120,211 L180,247 L250,284 L330,284" fill="none" stroke="#f59e0b" stroke-width="2.8"/>
  <circle cx="180" cy="247" r="4.5" fill="#e0533d"/>
  <line x1="180" y1="194" x2="180" y2="300" stroke="#e0533d" stroke-dasharray="4 3" stroke-width="1.3"/>
  <text x="188" y="243" font-size="9.5" fill="#e0533d">−45° at fp</text>
  <line x1="366" y1="16" x2="366" y2="440" stroke="currentColor" stroke-opacity="0.25" stroke-dasharray="5 5"/>
  <text x="396" y="24" font-size="13" font-weight="700" fill="#16a34a">Zero</text>
  <text x="396" y="52" font-size="10.5" fill="currentColor" fill-opacity="0.7">Magnitude</text>
  <line x1="436" y1="40" x2="436" y2="150" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="436" y1="150" x2="696" y2="150" stroke="currentColor" stroke-opacity="0.45"/>
  <path d="M436,130 L546,130 L696,70" fill="none" stroke="#16a34a" stroke-width="2.8"/>
  <text x="600" y="112" font-size="10" fill="#16a34a">+20dB/dec</text>
  <circle cx="546" cy="130" r="4.5" fill="#e0533d"/>
  <line x1="546" y1="70" x2="546" y2="150" stroke="#e0533d" stroke-dasharray="4 3" stroke-width="1.3"/>
  <text x="546" y="166" text-anchor="middle" font-size="11" font-weight="700" fill="#e0533d">fz</text>
  <text x="396" y="206" font-size="10.5" fill="currentColor" fill-opacity="0.7">Phase</text>
  <line x1="436" y1="194" x2="436" y2="300" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="436" y1="300" x2="696" y2="300" stroke="currentColor" stroke-opacity="0.45"/>
  <text x="428" y="214" text-anchor="end" font-size="9.5" fill="currentColor" fill-opacity="0.7">+90°</text>
  <text x="428" y="288" text-anchor="end" font-size="9.5" fill="currentColor" fill-opacity="0.7">0°</text>
  <line x1="436" y1="210" x2="696" y2="210" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="3 3"/>
  <path d="M436,284 L486,283 L546,247 L616,210 L696,210" fill="none" stroke="#f59e0b" stroke-width="2.8"/>
  <circle cx="546" cy="247" r="4.5" fill="#e0533d"/>
  <text x="554" y="243" font-size="9.5" fill="#e0533d">+45° at fz</text>
  <text x="30" y="410" font-size="12" fill="currentColor">Both curves move around <tspan font-weight="700">the same frequency</tspan> — one pole/zero creates the gain break and the phase shift together</text>
  <text x="30" y="434" font-size="11.5" fill="currentColor" fill-opacity="0.7">Phase starts moving a decade before, is halfway (±45°) at the frequency, and reaches ±90° a decade after</text>
</svg>

The key word is **"adds"**. Two poles give −40dB/dec and −180°; a pole and a zero at the same frequency cancel and nothing happens at all.

> **Why "the −3dB point" is a bad definition:** it works for a single pole, but for the **LC double pole** coming next the gain at that frequency may actually **peak upward**, and the phase there is −90°, not −45°. The definition **"adds −20dB/dec and −90°"** holds in every case.

### Why they are called "pole" and "zero"

The names look arbitrary, but once you see where they come from **you will never mix the two up again.**

A transfer function is a fraction.

$$H = \frac{\text{numerator}}{\text{denominator}}$$

- **Where the denominator becomes 0** → the fraction blows up to **infinity** → plotted out, it looks like a **pole (a pillar)** standing there → **pole**
- **Where the numerator becomes 0** → the fraction becomes **zero** → **zero**

For the RC low-pass $H = 1/(1+sRC)$, the denominator vanishes at $1+sRC=0$, i.e. $s = -1/RC$. Its magnitude $1/RC$ is the pole frequency.

> **Careful — nothing blows up on the Bode plot.** The $s = -1/RC$ where the denominator vanishes is a **negative** value, not a point on the real frequency axis we measure. On the Bode plot the gain at fp actually dips 3dB. **The "pillar" is only the origin of the name**, not something you observe.

**Here is where the naming actually earns its keep.**

- **Pole = denominator** → a bigger denominator makes the whole thing smaller → **it pulls gain down**
- **Zero = numerator** → a bigger numerator makes the whole thing bigger → **it holds gain up**

So the direction is baked into the names, and the phase follows the same sign — pole −90°, zero +90°. That is why *"we're short on phase, add a zero"* reads naturally in compensator work.

One more practical payoff — factor a transfer function and the poles and zeros are right there.

$$H(s) = K \cdot \frac{(1 + s/\omega_{z1})(1 + s/\omega_{z2})\cdots}{(1 + s/\omega_{p1})(1 + s/\omega_{p2})\cdots}$$

**Terms in the numerator are zeros; terms in the denominator are poles.** When a datasheet or app note gives you a compensator transfer function, you can read off how many of each and where they sit just by looking at the fraction.

---

## 2. The break frequency is where two impedances are equal

A pole needs an **energy-storage element (C or L) plus a resistance**. The storage element takes time to fill and empty so it cannot follow fast signals, and the resistance sets how fast that is.

Solve for where the two impedances are equal and you get the break frequency.

| Pair | Condition | Result |
|---|---|---|
| **R and C** | $1/(2\pi f C) = R$ | $f = \dfrac{1}{2\pi RC}$ |
| **R and L** | $2\pi f L = R$ | $f = \dfrac{R}{2\pi L}$ |

Written with the time constant they are one formula.

$$f = \frac{1}{2\pi\tau}, \qquad \tau_{RC} = RC, \quad \tau_{LR} = \frac{L}{R}$$

**A larger time constant (a slower circuit) means a lower break frequency** — a slow circuit starts failing to keep up sooner.

- $R=1\text{k}\Omega$, $C=100\text{nF}$ → $\tau = 100\mu s$ → $f \approx 1.6\text{kHz}$
- $R=10\Omega$, $L=100\mu H$ → $\tau = 10\mu s$ → $f \approx 16\text{kHz}$

---

## 3. Pole or zero — how to tell

**The component type alone does not tell you.** The same R and C give a pole in one place and a zero in another. A storage element plus a resistance creates **one time constant**; whether it becomes a pole or a zero is decided by **placement**.

There is only one test.

> ## As frequency rises, if the output **gets smaller it is a pole**; if it **gets bigger (or stops getting smaller) it is a zero**

Plug in the component behaviour and the answer follows automatically. **C passes more as frequency rises (impedance falls); L blocks more (impedance rises).**

|  | **Series** (in the signal path) | **Shunt** (path to ground) |
|---|---|---|
| **C** | **Zero** | **Pole** |
| **L** | **Pole** | **Zero** |

<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>Placement decides whether it is a pole or a zero</title>
  <desc>Series C is a zero, shunt C is a pole, series L is a pole, shunt L is a zero.</desc>
  <text x="30" y="24" font-size="12.5" font-weight="700" fill="currentColor">As frequency rises: output <tspan fill="#e0533d">smaller = pole</tspan> · <tspan fill="#16a34a">bigger = zero</tspan></text>
  <text x="40" y="58" font-size="12" font-weight="700" fill="#16a34a">Series C → zero</text>
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
  <text x="240" y="112" font-size="10.5" fill="currentColor" fill-opacity="0.75">high freq → C conducts</text>
  <text x="240" y="128" font-size="10.5" font-weight="700" fill="#16a34a">→ output rises = zero</text>
  <text x="40" y="192" font-size="10.5" fill="currentColor" fill-opacity="0.6">at low frequency C blocked it, so output was small</text>
  <text x="400" y="58" font-size="12" font-weight="700" fill="#e0533d">Shunt C → pole</text>
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
  <text x="400" y="192" font-size="10.5" fill="currentColor" fill-opacity="0.75">high freq → C conducts = signal leaks to ground</text>
  <text x="400" y="208" font-size="10.5" font-weight="700" fill="#e0533d">→ output falls = pole</text>
  <line x1="30" y1="232" x2="700" y2="232" stroke="currentColor" stroke-opacity="0.25"/>
  <text x="40" y="266" font-size="12" font-weight="700" fill="#e0533d">Series L → pole</text>
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
  <text x="240" y="320" font-size="10.5" fill="currentColor" fill-opacity="0.75">high freq → L blocks</text>
  <text x="240" y="336" font-size="10.5" font-weight="700" fill="#e0533d">→ output falls = pole</text>
  <text x="400" y="266" font-size="12" font-weight="700" fill="#16a34a">Shunt L → zero</text>
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
  <text x="400" y="404" font-size="10.5" fill="currentColor" fill-opacity="0.75">high freq → L blocks = less leaks to ground</text>
  <text x="400" y="420" font-size="10.5" font-weight="700" fill="#16a34a">→ output rises = zero</text>
</svg>

### A zero usually "stops the fall" rather than lifting anything

In practice most zeros do not actually raise the gain — they **stop it from falling**. The classic case is **a resistor in series with a capacitor**.

- The cap's impedance keeps falling with frequency → the gain keeps falling
- But it **cannot fall below the series resistance R** — R puts a floor under it
- The fall stops → the slope changes from **−20dB/dec to 0**

**Going from −20 to 0 *is* adding +20, and that is a zero.** The phase likewise recovers from −90° back to 0°, i.e. **+90°**.

**Two cases you meet immediately:**
- **The compensator's series R-C** — the zero we place deliberately (one in type-2, two in type-3)
- **The output cap's ESR** — a free zero that comes with the part, $f_z = 1/(2\pi \cdot ESR \cdot C)$

The second one matters in practice. **A high-ESR cap (electrolytic, POSCAP) puts a zero at a low frequency and helps your phase; a low-ESR ceramic pushes that zero far up where it no longer helps.** That is exactly what is behind "we switched to ceramics and it went unstable".

---

## 4. Asymptote vs actual curve — two ways of describing the same fp

"It starts bending at fp" and "it is −3dB and −45° at fp" sound contradictory, but they simply **describe different things**.

<svg viewBox="0 0 700 560" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>Asymptote versus actual curve at the pole frequency</title>
  <desc>The asymptote breaks sharply at fp while the real curve bends smoothly and passes 3dB below.</desc>
  <text x="30" y="24" font-size="13" font-weight="700" fill="currentColor">Dashed = asymptote (straight-line approximation) · Solid = actual curve</text>
  <text x="30" y="52" font-size="11.5" font-weight="700" fill="#3b82f6">Magnitude</text>
  <line x1="90" y1="60" x2="90" y2="255" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="90" y1="255" x2="660" y2="255" stroke="currentColor" stroke-opacity="0.45"/>
  <path d="M90,90 L300,90 L640,238" fill="none" stroke="currentColor" stroke-opacity="0.55" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="120" y="82" font-size="10" fill="currentColor" fill-opacity="0.7">asymptote — sharp break at fp</text>
  <path d="M90,90 L200,91 L250,93 L300,99 L350,112 L400,130 L500,174 L640,238" fill="none" stroke="#3b82f6" stroke-width="2.8"/>
  <text x="392" y="112" font-size="10.5" font-weight="700" fill="#3b82f6">actual — bends smoothly</text>
  <line x1="300" y1="60" x2="300" y2="470" stroke="#e0533d" stroke-width="1.6" stroke-dasharray="4 3"/>
  <text x="300" y="52" text-anchor="middle" font-size="12" font-weight="700" fill="#e0533d">fp</text>
  <line x1="284" y1="90" x2="284" y2="99" stroke="#16a34a" stroke-width="2.4"/>
  <text x="278" y="88" text-anchor="end" font-size="10.5" font-weight="700" fill="#16a34a">3dB gap</text>
  <circle cx="300" cy="90" r="4" fill="currentColor" fill-opacity="0.6"/>
  <circle cx="300" cy="99" r="4.5" fill="#3b82f6"/>
  <text x="310" y="104" font-size="10" fill="#3b82f6">actually here (−3dB)</text>
  <text x="30" y="300" font-size="11.5" font-weight="700" fill="#f59e0b">Phase</text>
  <line x1="90" y1="290" x2="90" y2="470" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="90" y1="470" x2="660" y2="470" stroke="currentColor" stroke-opacity="0.45"/>
  <text x="82" y="314" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">0°</text>
  <text x="82" y="364" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">−45°</text>
  <text x="82" y="414" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">−90°</text>
  <line x1="90" y1="360" x2="660" y2="360" stroke="currentColor" stroke-opacity="0.3" stroke-dasharray="3 3"/>
  <line x1="90" y1="410" x2="660" y2="410" stroke="currentColor" stroke-opacity="0.3" stroke-dasharray="3 3"/>
  <path d="M90,310 L150,311 L180,316 L220,330 L260,345 L300,360 L340,375 L380,388 L420,400 L470,407 L560,410 L640,410" fill="none" stroke="#f59e0b" stroke-width="2.8"/>
  <circle cx="300" cy="360" r="5" fill="#e0533d"/>
  <text x="310" y="356" font-size="10.5" font-weight="700" fill="#e0533d">already −45° at fp</text>
  <line x1="162" y1="290" x2="162" y2="470" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="3 3"/>
  <text x="158" y="304" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">fp/10</text>
  <text x="120" y="330" font-size="9.5" fill="currentColor" fill-opacity="0.7">starts</text>
  <text x="120" y="342" font-size="9.5" fill="currentColor" fill-opacity="0.7">slipping here</text>
  <line x1="437" y1="290" x2="437" y2="470" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="3 3"/>
  <text x="443" y="304" font-size="10" fill="currentColor" fill-opacity="0.7">fp×10 → reaches −90°</text>
  <text x="30" y="506" font-size="12" fill="currentColor"><tspan font-weight="700">fp is a single point on the frequency axis</tspan></text>
  <text x="30" y="528" font-size="12" fill="currentColor">"starts bending" describes the <tspan font-weight="700">asymptote</tspan> · "−3dB, −45°" is what the <tspan font-weight="700">actual curve</tspan> reads there</text>
</svg>

**In practice you sketch asymptotes.** They are fast to draw by hand and the 3dB difference never changes a design decision. Simulation draws the exact curve when you need it.

**Watch the phase especially** — it starts slipping **long before** fp: roughly **from fp/10, −45° at fp, −90° by fp×10**. So **a pole well below fc is already eating into your phase margin at fc.**

---

## 5. The integrator — a pole at 0Hz

Worth its own section because it is the heart of every error amplifier.

With **no resistance** — a capacitor driven by a current source — the break slides all the way down to **0Hz** and the flat region disappears entirely. This is the **integrator**, or "a pole at the origin".

<svg viewBox="0 0 740 470" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>RC pole compared with an integrator</title>
  <desc>The RC breaks at fp while the integrator falls at -20dB/dec from the start with phase fixed at -90 degrees.</desc>
  <text x="30" y="26" font-size="13" font-weight="700" fill="#3b82f6">① RC (with resistance)</text>
  <text x="30" y="44" font-size="10.5" fill="currentColor" fill-opacity="0.7">breaks at fp</text>
  <text x="30" y="70" font-size="11" font-weight="700" fill="currentColor">Magnitude</text>
  <line x1="60" y1="76" x2="60" y2="180" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="60" y1="180" x2="330" y2="180" stroke="currentColor" stroke-opacity="0.45"/>
  <path d="M60,100 L170,100 L330,160" fill="none" stroke="#3b82f6" stroke-width="2.8"/>
  <text x="72" y="94" font-size="10" fill="currentColor" fill-opacity="0.7">flat</text>
  <text x="238" y="128" font-size="10" fill="#3b82f6">−20dB/dec</text>
  <circle cx="170" cy="100" r="5" fill="#e0533d"/>
  <line x1="170" y1="100" x2="170" y2="180" stroke="#e0533d" stroke-dasharray="4 3" stroke-width="1.4"/>
  <text x="170" y="196" text-anchor="middle" font-size="11" font-weight="700" fill="#e0533d">fp</text>
  <text x="30" y="238" font-size="11" font-weight="700" fill="currentColor">Phase</text>
  <line x1="60" y1="244" x2="60" y2="348" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="60" y1="348" x2="330" y2="348" stroke="currentColor" stroke-opacity="0.45"/>
  <text x="52" y="264" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">0°</text>
  <text x="52" y="334" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">−90°</text>
  <line x1="60" y1="330" x2="330" y2="330" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="3 3"/>
  <path d="M60,260 L110,260 L170,295 L240,330 L330,330" fill="none" stroke="#3b82f6" stroke-width="2.8"/>
  <circle cx="170" cy="295" r="4.5" fill="#e0533d"/>
  <text x="178" y="291" font-size="10" fill="#e0533d">−45° at fp</text>
  <text x="30" y="400" font-size="11.5" fill="currentColor">low freq: Zc &gt; R → flat</text>
  <text x="30" y="420" font-size="11.5" fill="currentColor">high freq: Zc &lt; R → falls</text>
  <text x="30" y="444" font-size="11.5" font-weight="700" fill="#e0533d">→ breaks where the two are equal (fp)</text>
  <line x1="370" y1="16" x2="370" y2="460" stroke="currentColor" stroke-opacity="0.25" stroke-dasharray="5 5"/>
  <text x="400" y="26" font-size="13" font-weight="700" fill="#16a34a">② Integrator (no resistance)</text>
  <text x="400" y="44" font-size="10.5" fill="currentColor" fill-opacity="0.7">nothing to break at</text>
  <text x="400" y="70" font-size="11" font-weight="700" fill="currentColor">Magnitude</text>
  <line x1="430" y1="76" x2="430" y2="180" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="430" y1="180" x2="700" y2="180" stroke="currentColor" stroke-opacity="0.45"/>
  <path d="M430,86 L700,172" fill="none" stroke="#16a34a" stroke-width="2.8"/>
  <text x="520" y="112" font-size="10" fill="#16a34a">−20dB/dec (all the way)</text>
  <text x="436" y="80" font-size="9.5" fill="#16a34a">infinite at DC</text>
  <text x="400" y="238" font-size="11" font-weight="700" fill="currentColor">Phase</text>
  <line x1="430" y1="244" x2="430" y2="348" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="430" y1="348" x2="700" y2="348" stroke="currentColor" stroke-opacity="0.45"/>
  <text x="422" y="264" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">0°</text>
  <text x="422" y="334" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">−90°</text>
  <line x1="430" y1="330" x2="700" y2="330" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="3 3"/>
  <path d="M430,330 L700,330" fill="none" stroke="#16a34a" stroke-width="3.2"/>
  <text x="510" y="318" font-size="10.5" font-weight="700" fill="#16a34a">fixed at −90° (never moves)</text>
  <text x="400" y="400" font-size="11.5" fill="currentColor">with only a cap, V = I / (2πfC)</text>
  <text x="400" y="420" font-size="11.5" fill="currentColor">→ ten times the frequency, one tenth the output</text>
  <text x="400" y="444" font-size="11.5" font-weight="700" fill="#16a34a">→ no R to compare against, so nothing breaks</text>
</svg>

In $f_p = 1/(2\pi RC)$, **the larger R gets, the further left the break slides.** At R → ∞ the break sits at 0Hz and the flat region is gone — that is the integrator.

**Why it matters** — the error amplifier *is* an integrator. That gives it **enormous DC gain, so steady-state error is nearly zero** (why the output sits essentially at the reference), but it also means the loop **starts out already −90° behind.** That is the "compensator is the main thing pulling loop gain down" from the previous post.

---

## 6. Design view — the two knobs behave differently

|  | fc (crossover) | Phase |
|---|---|---|
| **Gain** | moves it (curve shifts) | **does not touch it** |
| **Poles · zeros** | moves it (slope changes) | moves it |

**Gain does not affect phase.** Phase is created only by poles and zeros; multiplying by K is a frequency-independent constant.

That property fixes the working order.

1. **Shape it first with poles and zeros** — decide how much phase you will have near fc (coarse)
2. **Trim fc last with gain** — phase is untouched, so the margin you secured stays (fine)

Do it the other way round and you waste effort: set fc with gain first, then move a zero, and fc drifts again.

> **This connects back to the previous post:** raising gain alone shifts the magnitude curve up so fc moves right, but the **phase curve does not move**, so you lose margin one-for-one. **To be fast *and* stable you must lift the phase curve itself, and the tool is the zero.**

One practical caveat — in theory gain does not touch phase, but **in a real circuit changing one resistor often moves a zero too**, because the same R appears in $f_z = 1/(2\pi RC)$. If a simulation shows "I only raised the gain but the phase moved", that is usually why.

---

## Key takeaways

- **Pole** adds **−20dB/dec** and **−90°**; **zero** adds **+20dB/dec** and **+90°**. That is the whole thing.
- Names: **pole = denominator** (blows up when it hits zero), **zero = numerator** (value goes to zero). So **poles pull down, zeros hold up** — and you can read their count and location straight off a factored transfer function.
- Define them by **what they add**, not by "the −3dB point" — the latter breaks for the LC double pole.
- The break frequency is **where the two impedances are equal**: $1/(2\pi RC)$ or $R/(2\pi L)$, i.e. $f = 1/(2\pi\tau)$.
- A storage element plus a resistance is **one time constant**; **placement** decides pole or zero.
- The test: **frequency up → output smaller = pole, bigger (or stops shrinking) = zero.**
- **Series C = zero, shunt C = pole, series L = pole, shunt L = zero.**
- Most real zeros **stop a fall** rather than lift anything (compensator R-C, output-cap ESR).
- Phase slips **from fp/10 and completes by fp×10** — even a distant pole eats margin at fc.
- **Integrator = pole at 0Hz.** It buys DC gain at the cost of starting −90° behind.
- **Gain moves only fc; poles and zeros move both** → shape first, trim gain last.

---

## Quiz

**Q1.** Someone asks "what is a pole?". Answer in one sentence.

<details>
<summary>Show answer</summary>

**"The frequency from which the gain falls 20dB/dec more steeply and the phase slips 90° further."**

Answering "the frequency where it is −3dB" only works for a single pole. At an LC double pole the gain there may peak instead, and the phase is −90°.
</details>

**Q2.** Does a resistor meeting a capacitor always create a pole?

<details>
<summary>Show answer</summary>

**No.** What it creates is **one time constant**; whether that becomes a pole or a zero is decided by **where it sits**.

- **C on the path to ground (shunt)** → at high frequency it drains signal away → output falls → **pole**
- **C in series in the signal path** → at high frequency it passes → output rises → **zero**
</details>

**Q3.** What is the break frequency of an RC low-pass with $R=1\text{k}\Omega$ and $C=100\text{nF}$?

<details>
<summary>Show answer</summary>

$\tau = RC = 100\mu s$ → $f = 1/(2\pi\tau) \approx$ **1.6kHz**

(Same as solving for where the cap impedance equals R.)
</details>

**Q4.** Swapping a high-ESR electrolytic output cap for a low-ESR ceramic made the loop unstable. Why?

<details>
<summary>Show answer</summary>

**The ESR zero disappeared.**

The series ESR was creating a zero at $f_z = 1/(2\pi \cdot ESR \cdot C)$ that was **giving back +90° of phase**. With a much smaller ESR that zero moves far higher in frequency and no longer helps near crossover, so phase margin drops.
</details>

**Q5.** You raised only the compensator gain to push fc higher. What happens to phase margin, and why?

<details>
<summary>Show answer</summary>

**It shrinks** (push far enough and it reaches 0 — the edge of oscillation).

A gain change is a **frequency-independent constant**, so it shifts the magnitude curve up but **cannot move the phase curve at all**. The new fc is at a higher frequency where the phase has already slipped further. Speed gained, stability lost, one for one.

To be fast *and* stable you must **place a zero to lift the phase curve.**
</details>

**Q6.** A transfer function has one term in the numerator and two in the denominator. How many poles and zeros, and what is the high-frequency slope?

<details>
<summary>Show answer</summary>

**One zero, two poles.** (numerator = zeros, denominator = poles)

Two poles give −40dB/dec and one zero gives +20dB/dec, so the net slope is **−20dB/dec**, and the phase settles at −180° + 90° = **−90°**.

This is exactly what a buck power stage looks like — **an LC double pole plus the ESR zero.**
</details>

---

*Next: applying these rules to a real buck power stage — the **−40dB/dec and −180° of the LC double pole**, the ESR zero, and why voltage mode needs **type-3 compensation** with two zeros.*
