+++
title = "[Concept] L and C from an RF Perspective — Seeing Components Through Frequency"
date = 2026-08-04T10:00:00
series = "Theory / Principle"
description = "In power, L and C were energy storage components. In RF, they are tools for selecting frequency. From frequency behavior seen through S21, to their positions on the Smith chart, resonance and filters, and the limits of real components: SRF and Q."
tags = ["개념정리", "inductor", "capacitor", "SRF", "RF", "fundamentals"]
+++

## Intro

In a power converter, L and C are **energy storage components**. A buck inductor builds up current; the output cap holds up the ripple. But open an RF book and the same components are seen through a completely different lens — as **tools that pass or block frequencies**.

That shift in perspective is the whole point of this chapter. It is not about memorizing definitions, but about grasping **how L and C behave as a function of frequency**.

> **Reference** — 《RF 기초강의실 (The Basic of RF)》, Ch. 2 "RF Circuit Basics," Chapter 02 *L and C from an RF Perspective* (pp. 46–58).

---

## 1. S21 over Definitions — Seeing Frequency Behavior

Instead of dictionary definitions, the book defines L and C by their **S21 transmission characteristics**. Since these are passive components, the closer S21 is to 0dB, the more losslessly the signal passes through.

<svg viewBox="0 0 680 260" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>S21 frequency response of an inductor and a capacitor</title>
  <desc>The inductor's S21 falls as frequency rises; the capacitor's rises instead.</desc>
  <g>
    <text x="170" y="24" text-anchor="middle" font-size="12.5" fill="#3b82f6" font-weight="600">Inductor — suppresses high frequencies</text>
    <line x1="60" y1="50" x2="60" y2="200" stroke="currentColor" stroke-opacity="0.35"/>
    <line x1="60" y1="200" x2="300" y2="200" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="52" y="58" text-anchor="end" font-size="10.5" fill="currentColor" fill-opacity="0.6">0dB</text>
    <path d="M60 55 Q 140 60 200 110 T 295 190" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
    <path d="M60 55 Q 110 62 160 130 T 250 195" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-opacity="0.5"/>
    <text x="255" y="150" font-size="10.5" fill="#3b82f6" fill-opacity="0.7">larger L↓</text>
    <text x="180" y="222" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity="0.6">freq →</text>
  </g>
  <g transform="translate(340,0)">
    <text x="170" y="24" text-anchor="middle" font-size="12.5" fill="#e0533d" font-weight="600">Capacitor — passes high frequencies</text>
    <line x1="60" y1="50" x2="60" y2="200" stroke="currentColor" stroke-opacity="0.35"/>
    <line x1="60" y1="200" x2="300" y2="200" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="52" y="58" text-anchor="end" font-size="10.5" fill="currentColor" fill-opacity="0.6">0dB</text>
    <path d="M60 195 Q 120 180 170 100 T 295 55" fill="none" stroke="#e0533d" stroke-width="2.5"/>
    <path d="M60 195 Q 150 190 210 120 T 295 70" fill="none" stroke="#e0533d" stroke-width="1.5" stroke-opacity="0.5"/>
    <text x="150" y="85" font-size="10.5" fill="#e0533d" fill-opacity="0.7">larger C↑</text>
    <text x="180" y="222" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity="0.6">freq →</text>
  </g>
</svg>

The book's redefinition is crisp:

> **L (Inductance)** — how strongly it **impedes the flow of high frequencies** as frequency rises
> **C (Capacitance)** — how readily it **eases the flow of high frequencies** as frequency rises

In impedance terms, L is $j\omega L$, which grows with frequency (blocking), while C is $1/j\omega C$, which shrinks with frequency (passing). **L and C are exact opposites**, and combining these opposite behaviors to select frequencies is what RF circuits do.

---

## 2. L — Inertia That Resists Changes in Current

Inductance is **the tendency to resist changes in a flowing current**. It is a kind of inertia.

- When current flows, a magnetic field forms around the line
- When the current changes, the magnetic field must follow — but **it lags one beat behind**
- That lag impedes the change → DC (no change) passes easily, AC is impeded
- The higher the frequency (faster the change) and the larger the L (more magnetic field), the harder it is to keep up

### Where Does Inductance Come From

The book asks and answers: **"It arises in every line that has length."**

Just make the line longer and inductance keeps piling up. But since you can't make it arbitrarily long, you **wind it into a coil** — and winding gives you more L than line length alone would, thanks to **mutual inductance**.

- If the current in the adjacent line flows in the **same** direction → magnetic fields add → **L increases**
- If the direction is **opposite** → fields cancel → **L decreases**

### Three Inductor Patterns

In space-constrained RF, L is realized with line patterns.

| Shape | Principle | Pros and cons |
|---|---|---|
| **Spiral** | Concentric turns in one direction → mutual inductance **adds up** | Large L in a small footprint ↔ heavy loss, needs an air bridge/multilayer to bring out the center |
| **Meander** | Snakes back and forth → mutual inductance **cancels** | No air bridge needed ↔ small L for its size |
| **Single loop** | One single loop | Underwhelming in both performance and form; occasionally used for its filtering characteristics |

---

## 3. C — A Component That Passes Only Change

From the metal conductor's point of view, a capacitor is a **broken, disconnected component**. So how does a signal get across — the key is the **dielectric** between the broken conductors.

- When one side is charged, the dielectric becomes **polarized** inside and induces the opposite charge on the far metal plate
- **DC**: polarization happens only at the instant of first application and then it's over → no transfer (a brief momentary flow, then cut off)
- **AC**: the polarity flips before the polarization can fade → **the shape of the change keeps being conveyed to the far side**
- The measure of how fast a change it can convey well is capacitance

In other words, C is a component that **"passes a signal only when there is a change in current/voltage."** The exact opposite of L.

---

## 4. L and C on the Smith Chart

Look at the complex impedance expression and their positions read off immediately.

$$Z = R + j\omega L + \frac{1}{j\omega C}$$

- L is $+j\omega L$ → **imaginary part +** → **upper half** of the Smith chart
- C is $\frac{1}{j\omega C} = -\frac{j}{\omega C}$ → **imaginary part −** → **lower half**

And here is why the ideal L and C in the book's figure ride **along the R=1 circle** — that plot is the S11 of a pass-through setup with 50Ω ports on the input and output. The impedance looking in from port1 is

$$Z_{in} = \underbrace{50\Omega}_{\text{real part from the far-end termination}} + \underbrace{j\omega L}_{\text{imaginary part added by the component}}$$

An ideal component has no resistance, so it adds nothing to the real part. With the real part pinned at 50Ω and only the imaginary part varying, **it moves exactly along the normalized R=1 circle.** If it strays off the circle, a resistive component (loss) has crept in.

---

## 5. Resonance, and Filters

What happens when you connect L and C, with their opposite characteristics? **There is a point where the two balance at a specific frequency** — that is **resonance**, and a **frequency-selective characteristic** emerges that picks out or rejects specific frequencies.

A filter is a series/parallel combination of these L and C. Take the LPF (low-pass filter) as an example:

<svg viewBox="0 0 680 250" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>Roles of the series L and shunt C in an LPF</title>
  <desc>The series inductor blocks high frequencies, and any high frequency that leaks through drains to ground via the shunt capacitor.</desc>
  <line x1="40" y1="100" x2="200" y2="100" stroke="currentColor" stroke-width="1.8"/>
  <path d="M200 100 A 12 12 0 0 1 224 100 A 12 12 0 0 1 248 100 A 12 12 0 0 1 272 100 A 12 12 0 0 1 296 100" fill="none" stroke="currentColor" stroke-width="1.8"/>
  <text x="248" y="72" text-anchor="middle" font-size="12.5" font-weight="600" fill="#3b82f6">series L</text>
  <line x1="296" y1="100" x2="560" y2="100" stroke="currentColor" stroke-width="1.8"/>
  <line x1="440" y1="100" x2="440" y2="140" stroke="currentColor" stroke-width="1.8"/>
  <line x1="420" y1="140" x2="460" y2="140" stroke="currentColor" stroke-width="2.2"/>
  <line x1="420" y1="152" x2="460" y2="152" stroke="currentColor" stroke-width="2.2"/>
  <line x1="440" y1="152" x2="440" y2="186" stroke="currentColor" stroke-width="1.8"/>
  <line x1="424" y1="186" x2="456" y2="186" stroke="currentColor" stroke-width="1.6"/>
  <line x1="430" y1="193" x2="450" y2="193" stroke="currentColor" stroke-width="1.4"/>
  <line x1="436" y1="200" x2="444" y2="200" stroke="currentColor" stroke-width="1.2"/>
  <text x="500" y="146" font-size="12.5" font-weight="600" fill="#e0533d">shunt C</text>
  <text x="70" y="88" font-size="11.5" fill="currentColor" fill-opacity="0.75">① low frequencies pass</text>
  <text x="70" y="128" font-size="11.5" fill="#3b82f6">② high frequencies blocked at L</text>
  <text x="330" y="176" font-size="11.5" fill="#e0533d">③ leaked highs drain to ground via C</text>
  <text x="575" y="104" font-size="11.5" fill="currentColor" fill-opacity="0.75">→ only lows at output</text>
</svg>

- **Series L**: lets low frequencies through and blocks high frequencies from passing
- **Shunt C**: whatever high-frequency content still gets through wants to go into C, so it **drains to ground and dies there**
- Only low frequencies remain at the output. For an HPF, simply swap the positions of L and C

One thing to keep in mind — a filter does not have to be built from lumped components only; it can be built by combining **anything with a structure that can produce inductance/capacitance**.

---

## 6. SRF — Where Real Components Betray You

Everything so far was the ideal case. Real components have an **SRF (Self Resonating Frequency)**.

<svg viewBox="0 0 680 240" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>S21 of a real inductor — the role flips at SRF</title>
  <desc>A V-shaped S21 curve: it behaves as an inductor below SRF and as a capacitor above it.</desc>
  <line x1="60" y1="40" x2="60" y2="190" stroke="currentColor" stroke-opacity="0.35"/>
  <line x1="60" y1="190" x2="620" y2="190" stroke="currentColor" stroke-opacity="0.35"/>
  <text x="52" y="50" text-anchor="end" font-size="10.5" fill="currentColor" fill-opacity="0.6">0dB</text>
  <path d="M60 50 Q 180 60 300 120 L 340 168 L 380 120 Q 480 62 615 52" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
  <line x1="340" y1="168" x2="340" y2="205" stroke="#e0533d" stroke-width="1.5" stroke-dasharray="3 3"/>
  <text x="340" y="222" text-anchor="middle" font-size="12" font-weight="600" fill="#e0533d">SRF</text>
  <text x="180" y="105" text-anchor="middle" font-size="11.5" fill="currentColor" fill-opacity="0.75">Inductive region</text>
  <text x="180" y="122" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.55">freq↑ blocking↑ = acts as L</text>
  <text x="500" y="105" text-anchor="middle" font-size="11.5" fill="currentColor" fill-opacity="0.75">Capacitive region</text>
  <text x="500" y="122" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.55">freq↑ passing↑ = acts as C</text>
</svg>

**Above a certain frequency, the component's role flips to the opposite.** The inductor starts acting as a capacitor and the capacitor as an inductor — an absurd situation. Because the frequency where the role breaks down looks like a resonance point, it is called the Self Resonating Frequency.

**Why does it happen — parasitics.** Look at a spiral inductor: alongside the legitimate L from line length, there is **parasitic capacitance from the gaps between metal traces**. As frequency rises, at some point the parasitic wins. Likewise, capacitors carry parasitic inductance.

Practical points:

- Every L and C must be used **only at frequencies well below its SRF** (inductors are especially dangerous)
- **The larger the component value, the larger the physical structure and its parasitics → SRF drops lower and lower** (the usable frequency range narrows)
- The SRF of ordinary lumped components is only in the few-GHz range, so at very high frequencies lumped elements become unusable and L and C are realized with **distributed elements such as microstrip**

---

## 7. Q — Component Quality

$$Q = \frac{X\ (\text{Reactance})}{R\ (\text{Resistance})} = \frac{\text{imaginary part of impedance (L, C)}}{\text{real part of impedance (resistance)}}$$

What it means is **how much loss the component has**.

- **Imaginary part (X)** = **lossless storage components** like L and C. They gather energy as electric/magnetic fields and give it back
- **Real part (R)** = **loss** due to resistance. It burns energy away as heat

Ideally there should be no resistance, but manufacturing introduces parasitic resistance and thus heat loss. So **a higher Q means a lower-loss, better component** (and of course a pricier one). Q varies with frequency and with component value.

On the Smith chart — Q dropping (R rising) = the real part growing = **drifting away from the R=1 matching circle.** And the point where an inductor crosses some frequency and dives down into the lower capacitance region is precisely the SRF.

> **Role distinction:** SRF is the metric that tells you a component's **usable range**; Q is the metric that grades its **quality**.

---

## 8. Five Uses of L and C in RF Circuits

These are the places L and C actually appear in a simple amp circuit.

| Use | Component | Role |
|---|---|---|
| **Impedance Matching** | L, C | Match the transistor's input/output impedance to the 50Ω ports |
| **DC Block** | C | Block the bias DC at the input/output so it doesn't leak elsewhere |
| **RF Choke** | L | Block RF AC from flowing into the DC supply line (L passes DC, blocks AC) |
| **Bypass** | C | Shunt C at the supply drains leaked AC to ground, preventing oscillation |
| **Degeneration** | L, C | Placed on the transistor's ground side to trade gain for stability and linearity |

> Degeneration is a familiar concept on the power side too — the same trade-off of hanging a component off the emitter/source to shave gain in exchange for stability.

### One Last Thing — L and C Are "Components" Before They Are "Devices"

What the book stresses at the end: even without deliberately making them, **inductance arises on its own in any long line, and capacitance (coupling) arises between any two nearby metal lines.** Inductor/capacitor devices are merely those effects intentionally reinforced. These parasitics become more sensitive as frequency rises — which is why RF design gets tricky and distributed circuits like microstrip become necessary.

---

## Key takeaways

- In RF, L and C are not energy storage components but **tools that pass/block frequencies**. L blocks high frequencies ($j\omega L$); C passes them ($1/j\omega C$). Exact opposites.
- **L = inertia that resists changes in current.** It arises in every line with length, and winding into a coil boosts L through mutual inductance (same-direction currents = fields add).
- **C = passes only change.** Dielectric polarization conveys the change to the far side. DC only at the first instant → blocked.
- On the Smith chart, **L is up (+j), C is down (−j).** Ideal components add nothing to the real part, so they ride the R=1 circle exactly.
- **LPF = series L (blocks highs) + shunt C (drains leaked highs to ground).** Combining opposite characteristics gives resonance and filters.
- **SRF** — because of parasitics, the L↔C roles flip beyond a certain frequency. Use only below SRF; the larger the component value, the lower the SRF.
- **Q = X/R = lossless storage over loss.** Higher is better. SRF is the usable-range metric, Q is the quality metric.
- Five uses: **matching, DC block, RF choke, bypass, degeneration.** And before being devices, L and C are **effects** that arise everywhere.

---

## Self-quiz

1. Which frequencies do the inductor and the capacitor each pass well? Explain why using the impedance expressions.
2. Where does inductance arise? Why does winding into an inductor (coil) make L larger than line length alone would?
3. Why can a spiral inductor achieve a large L in a small footprint, and what are its two drawbacks?
4. Why does L appear in the upper half of the Smith chart and C in the lower half?
5. In an LPF, what roles do the series L and the shunt C each play?
6. What is SRF and why does it occur? What happens to SRF as the component value grows?
7. What is the definition and meaning of Q? How do the roles of SRF and Q differ?
8. List the five uses of L and C in RF circuits.

<details>
<summary>Show answers</summary>

1. **L passes low frequencies, C passes high frequencies.** $Z_L = j\omega L$ grows with frequency and blocks highs; $Z_C = 1/j\omega C$ shrinks with frequency and passes highs.
2. **In every line that has length.** Winding into a coil makes adjacent lines carry current in the same direction, so the magnetic fields add — **mutual inductance** — giving extra L.
3. Concentric turns in one direction make the mutual inductance add up in the same direction, yielding a large L in a small footprint. Drawbacks: **heavy loss**, and **an air bridge/multilayer line is needed** to bring out the center.
4. In $Z=R+j\omega L+1/j\omega C$, L contributes a positive imaginary part and C a negative one. Upper half = +j, lower half = −j.
5. The series L blocks high frequencies so only lows pass, and whatever highs still leak through ride the shunt C and **drain to ground and die.**
6. The point beyond a certain frequency where **the L↔C roles flip.** Caused by the component's parasitics (parasitic C in an L, parasitic L in a C). Larger component values mean larger structures and larger parasitics, so **SRF drops** (the usable band narrows).
7. $Q = X/R$ = lossless storage component versus loss (resistive) component. Higher Q means a lower-loss, better component. **SRF is the usable-range metric, Q is the quality metric.**
8. **Impedance Matching (L, C) · DC Block (C) · RF Choke (L) · Bypass (C) · Degeneration (L, C).**

</details>

*Previous — [Why RF uses S-parameters](../why-s-parameters/). Next — [Why we do impedance matching](../why-impedance-matching/).*
