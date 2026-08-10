+++
title = "[Concept] Control theory basics (1) — measuring converter stability, crossover frequency, phase margin, gain margin"
date = 2026-08-08T00:30:00+09:00
series = "Theory / Principle"
description = "Studying control modes, I got stuck on loop gain. Why does inserting one resistor and measuring A/B give you the loop gain? Why does the answer change with frequency? How do you read fc, PM and GM off a Bode plot — organized around the points that actually confused me."
tags = ["개념정리", "루프이득", "안정도", "control", "fundamentals"]
+++

## Why this note

Digging into voltage mode, I stopped at the sentence *"the output filter adds two poles, which complicates compensation."* To understand it I first needed **loop gain, phase margin and crossover**.

I have looked at countless load-transient waveforms on the bench, but I had never answered **"what *is* loop gain?"** head-on. This note is that ground-up pass, organized around **the points where I actually got stuck**.

> Covered: definition of loop gain → how it is measured (why the injection resistor goes *there*) → why the result splits with frequency → reading fc · PM · GM off a Bode plot → how the output cap and the loop divide the work during a load step. **Quiz at the end.**

---

## 1. Loop gain = the round-trip multiplier

A feedback loop is literally a loop. Inject a signal at some point and it travels through the blocks and **arrives back at that same point**.

$$T = \frac{\text{signal that came back}}{\text{signal injected}}$$

- $T = 1000$ → comes back 1000× bigger
- $T = 1$ → comes back the same size (0dB)
- $T = 0.1$ → comes back 10× smaller

Voltage in, voltage out — so it is a **pure dimensionless ratio**, written in dB.

For a buck converter it is the product of the blocks:

$$T = \underbrace{G_c}_{\text{compensator}} \times \underbrace{G_{PWM}}_{\text{modulator}} \times \underbrace{G_{power}}_{\text{switch+LC}} \times \underbrace{\frac{R_2}{R_1+R_2}}_{\text{divider}}$$

And the **oscillation condition** falls out of it:

> If the phase has slipped to **−180°** (correction arrives exactly inverted) **and** the gain at that frequency is **still ≥ 1**, the loop oscillates.

Even with inverted timing, if the signal shrinks each trip (gain < 1) it dies out on its own. It has to come back **inverted *and* undiminished** to snowball. That is why the two conditions come as a pair.

---

## 2. How it is measured — break the loop, inject floating

<svg viewBox="0 0 780 470" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>Where the loop-gain injection resistor goes in a buck converter</title>
  <desc>The injection resistor goes in series between the Vout node and the top of the feedback divider.</desc>
  <defs>
    <marker id="lg1e" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker>
  </defs>
  <text x="30" y="96" font-size="12" fill="currentColor">Vin</text>
  <line x1="55" y1="90" x2="80" y2="90" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <rect x="80" y="66" width="95" height="48" rx="5" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="127" y="86" text-anchor="middle" font-size="11.5" font-weight="700" fill="currentColor">Switch</text>
  <text x="127" y="103" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity="0.7">+ driver</text>
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
  <text x="422" y="136" font-size="10.5" fill="currentColor" fill-opacity="0.7">load</text>
  <rect x="470" y="76" width="70" height="28" rx="4" fill="none" stroke="#e0533d" stroke-width="2.4"/>
  <text x="505" y="95" text-anchor="middle" font-size="11.5" font-weight="700" fill="#e0533d">R_inj</text>
  <text x="505" y="60" text-anchor="middle" font-size="10.5" fill="#e0533d">10~50Ω</text>
  <line x1="440" y1="90" x2="470" y2="90" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <line x1="540" y1="90" x2="640" y2="90" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <circle cx="455" cy="90" r="4.5" fill="#3b82f6"/>
  <text x="452" y="132" text-anchor="middle" font-size="11.5" font-weight="700" fill="#3b82f6">A</text>
  <text x="452" y="147" text-anchor="middle" font-size="9.5" fill="#3b82f6">came back</text>
  <line x1="455" y1="90" x2="455" y2="118" stroke="#3b82f6" stroke-width="1.4" stroke-dasharray="3 3"/>
  <circle cx="556" cy="90" r="4.5" fill="#16a34a"/>
  <text x="560" y="132" text-anchor="middle" font-size="11.5" font-weight="700" fill="#16a34a">B</text>
  <text x="566" y="147" text-anchor="middle" font-size="9.5" fill="#16a34a">injected in</text>
  <line x1="556" y1="90" x2="556" y2="118" stroke="#16a34a" stroke-width="1.4" stroke-dasharray="3 3"/>
  <circle cx="505" cy="26" r="15" fill="none" stroke="#e0533d" stroke-width="1.8"/>
  <text x="505" y="31" text-anchor="middle" font-size="12" fill="#e0533d">~</text>
  <path d="M490,26 L455,26 L455,76" fill="none" stroke="#e0533d" stroke-width="1.4" stroke-dasharray="4 3"/>
  <path d="M520,26 L556,26 L556,76" fill="none" stroke="#e0533d" stroke-width="1.4" stroke-dasharray="4 3"/>
  <text x="576" y="24" font-size="10.5" fill="#e0533d">injection transformer (floating)</text>
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
  <path d="M640,185 L600,185 L600,312 L530,312" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6" marker-end="url(#lg1e)"/>
  <text x="542" y="309" font-size="10" fill="currentColor" fill-opacity="0.7">−</text>
  <line x1="596" y1="348" x2="530" y2="348" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6" marker-end="url(#lg1e)"/>
  <text x="542" y="358" font-size="10" fill="currentColor" fill-opacity="0.7">+</text>
  <text x="604" y="352" font-size="10.5" fill="currentColor" fill-opacity="0.7">Vref</text>
  <line x1="470" y1="330" x2="430" y2="330" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="450" y="322" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity="0.7">COMP</text>
  <path d="M430,330 L430,400 L300,400" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6" marker-end="url(#lg1e)"/>
  <rect x="160" y="378" width="140" height="44" rx="5" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6"/>
  <text x="230" y="396" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">PWM comparator</text>
  <text x="230" y="412" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity="0.7">+ sawtooth</text>
  <path d="M160,400 L127,400 L127,114" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.6" marker-end="url(#lg1e)"/>
  <text x="30" y="447" font-size="12.5" font-weight="700" fill="currentColor">Where it goes: in series between the Vout node and the top of R1</text>
  <text x="30" y="464" font-size="11" fill="currentColor" fill-opacity="0.7">T = A / B (both probed with respect to ground)</text>
</svg>

### Sticking point ① — "aren't A and B the same node?"

On the schematic they look like one node. They were — **before the cut**.

**The moment you break it, they become two different nodes**: one facing Vout, the other facing the divider. The resistor and transformer sit in the gap. They *look* identical precisely because they used to be joined — that is normal.

### Sticking point ② — "do I drive B against ground?"

No. The transformer secondary **floats**, and exactly one thing is forced:

$$B - A = V_{inj}$$

**The source does not decide what A is, or what B is.** The loop decides that. This distinction turns out to be decisive.

<svg viewBox="0 0 780 420" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>Floating injection versus a wrong ground-referenced connection</title>
  <desc>Left: floating injection across the resistor. Right: a generator tied to ground and driving the divider top, which breaks the loop.</desc>
  <text x="20" y="26" font-size="13" font-weight="700" fill="#16a34a">① Correct — floating injection across the resistor</text>
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
  <text x="262" y="112" font-size="10.5" font-weight="700" fill="currentColor">top of R1</text>
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
  <text x="20" y="322" font-size="11.5" fill="currentColor">· generator has <tspan font-weight="700" fill="#16a34a">no connection to ground</tspan> (transformer isolated)</text>
  <text x="20" y="342" font-size="11.5" fill="currentColor">· the resistor still joins both sides → <tspan font-weight="700">DC passes through</tspan></text>
  <text x="20" y="362" font-size="11.5" fill="currentColor">· FB still represents Vout → converter regulates, only <tspan font-weight="700">AC rides on top</tspan></text>
  <line x1="392" y1="20" x2="392" y2="400" stroke="currentColor" stroke-opacity="0.3" stroke-dasharray="5 5"/>
  <text x="412" y="26" font-size="13" font-weight="700" fill="#e0533d">② Wrong — driven against ground</text>
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
  <text x="654" y="112" font-size="10.5" font-weight="700" fill="#e0533d">top of R1</text>
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
  <text x="412" y="322" font-size="11.5" fill="currentColor">· the generator <tspan font-weight="700" fill="#e0533d">pins the top of R1 against ground</tspan></text>
  <text x="412" y="342" font-size="11.5" fill="currentColor">· FB now represents <tspan font-weight="700">the generator, not Vout</tspan> → the loop cannot move FB</text>
  <text x="412" y="362" font-size="11.5" fill="currentColor">· duty runs away → <tspan font-weight="700" fill="#e0533d">output hits a rail</tspan> → nothing to measure</text>
  <text x="412" y="386" font-size="11" fill="currentColor" fill-opacity="0.7">(Vout barely moves — cap and loop hold it at a few mΩ)</text>
</svg>

**A common misconception:** it is tempting to think a ground-referenced connection "forcibly shakes the output voltage". **It does not.** The Vout node is held at a few mΩ by the output cap and the loop, so a generator sitting behind a 20Ω resistor cannot move it.

What actually happens is that the **loop is severed**:

1. The generator pins the top of R1 against ground → **FB now represents the generator, not Vout**
2. The loop still tries to make FB = Vref, but **FB no longer depends on Vout**, so no amount of duty change moves it
3. With no condition to stop at, **duty runs to one extreme** → the output goes to 0V or Vin

The signal never completes the round trip — it is cut halfway. The very quantity "loop gain" is undefined.

**With floating injection**, the resistor still joins both sides, so **FB keeps representing Vout** — just with a 20mV offset added. The converter keeps regulating, and we get to watch **how the loop responds to that offset**.

### Why it still works with the loop closed

- What the loop does: $A = T \cdot B$
- What the source imposes: $B = A + V_{inj}$

Solving:

$$A = \frac{T\,V_{inj}}{1-T}, \qquad B = \frac{V_{inj}}{1-T} \;\;\Rightarrow\;\; \boxed{\frac{A}{B} = T}$$

**Both $V_{inj}$ and $(1-T)$ cancel.** That is why a closed loop still yields the pure loop gain — the essence of Middlebrook injection.

---

## 3. Why the resistor goes exactly there

<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>Impedance condition at the injection point</title>
  <desc>If the injection current develops voltage across Zs, it pushes node A without going around the loop and corrupts the measurement.</desc>
  <text x="30" y="30" font-size="12.5" font-weight="700" fill="currentColor">The series current path the source drives</text>
  <rect x="70" y="90" width="80" height="42" rx="4" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <text x="110" y="108" text-anchor="middle" font-size="11.5" font-weight="700" fill="#3b82f6">Zs</text>
  <text x="110" y="124" text-anchor="middle" font-size="9.5" fill="#3b82f6">Vout side</text>
  <text x="110" y="152" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">≈ few mΩ</text>
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
  <text x="440" y="124" text-anchor="middle" font-size="9.5" fill="#16a34a">divider side</text>
  <text x="440" y="152" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">≈ tens of kΩ</text>
  <defs>
    <marker id="lg2e" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e0533d"/></marker>
  </defs>
  <path d="M110,132 L110,190 L440,190 L440,132" fill="none" stroke="#e0533d" stroke-width="1.6" stroke-dasharray="5 4" marker-end="url(#lg2e)"/>
  <text x="275" y="207" text-anchor="middle" font-size="11" fill="#e0533d">injection current i = Vinj / (Zs + R_inj + ZL) ≈ 1µA</text>
  <text x="30" y="243" font-size="12" fill="currentColor">Voltage that current builds across Zs = <tspan font-weight="700" fill="#e0533d">i × Zs = 10nV</tspan> → pushes A without going around the loop</text>
  <text x="30" y="266" font-size="12" fill="currentColor">Zs must be small so that term is negligible and A moves <tspan font-weight="700">only via the round trip</tspan></text>
  <text x="30" y="288" font-size="11.5" fill="currentColor" fill-opacity="0.7">ZL must be large so the injection current itself is tiny (DC error below 0.1%)</text>
</svg>

Looking both ways from the injection point you need **$Z_s \ll Z_L$**. In a buck, the Vout node and the feedback divider (tens of kΩ) satisfy this by more than 1000×.

### Different players keep Zs low in different frequency bands

A Bode plot means sweeping from 10Hz to 1MHz, so the condition must hold **at every frequency**. What holds the Vout node down changes with band.

- **Output capacitor (passive)** — swallows current with little voltage change. Its impedance is $1/2\pi f C$, so it is **strong at high frequency and weak at low**. 100µF is 0.0016Ω at 1MHz but 160Ω at 10Hz.
- **The loop (active)** — senses any Vout movement and corrects it via duty. It takes time, so it can only catch **slow** changes. Closed-loop output impedance is $Z_{out,\text{open}}/(1+T)$, which is powerful at low frequency where T is large.
- **The load** — sits in parallel with Cout and lowers the combination further, so a **heavier load makes the condition easier**.

Their strong bands are exactly complementary, so together they cover the whole sweep.

| Frequency | Cap | Loop | Combined Zs |
|---|---|---|---|
| 10Hz | weak (160Ω) | **strong** (T=1000) | about **0.16Ω** |
| near fc | medium | medium | small |
| 1MHz | **strong** (0.002Ω) | none | **0.002Ω** |

Push 1µA into the node at 10Hz: without the loop the 160Ω cap impedance would let it move 160µV, but the loop senses that and corrects through duty, so the actual movement is only $160\mu V/(1+1000) \approx 0.16\mu V$. At no frequency does Zs come near tens of kΩ.

### Sticking point ③ — "but current *does* flow there"

Correct. **Current does flow** — it is a series loop, so the same ~1µA flows through $Z_s$ as well.

The point is that **we measure voltage**. The question is not "does current flow" but **"how much does that current corrupt the voltage at A"**.

| How node A's voltage can move | Magnitude |
|---|---|
| Round trip through the loop (what we want) | up to 20mV |
| Injection current × Zs (contamination) | 10nV |

A factor of two million — negligible. Violate the condition ($Z_s$ = 5kΩ) and the contamination becomes 16.7mV, comparable to the real signal, and **you no longer know what you measured**.

> **Bench note:** that odd 0Ω or 20Ω resistor sitting in the FB path on an EVB schematic *is* the injection resistor — 0Ω on production boards, 20Ω stuffed for evaluation. With a 20kΩ divider, 20Ω is under 0.1% error, so normal operation is unaffected.

---

## 4. Why the result splits with frequency

<svg viewBox="0 0 740 400" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>How the injected 20 mV splits between nodes A and B versus frequency</title>
  <desc>At low frequency the loop pins B so A takes it all; at high frequency the output cap pins A so B takes it all.</desc>
  <text x="30" y="28" font-size="12.5" font-weight="700" fill="currentColor">The source forces only the difference B−A=20mV — how much each moves is decided by the loop</text>
  <text x="30" y="72" font-size="12.5" font-weight="700" fill="#3b82f6">Low frequency — strong loop (T = 1000)</text>
  <text x="30" y="90" font-size="10.5" fill="currentColor" fill-opacity="0.7">The loop senses B. It has time to drive duty until B is back</text>
  <text x="30" y="105" font-size="10.5" fill="currentColor" fill-opacity="0.7">at the value that makes FB = Vref, so B returns to place</text>
  <rect x="330" y="60" width="360" height="30" rx="4" fill="none" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.4"/>
  <rect x="330" y="60" width="352" height="30" rx="4" fill="#3b82f6" fill-opacity="0.35"/>
  <text x="500" y="80" text-anchor="middle" font-size="11.5" font-weight="700" fill="currentColor">A takes nearly all 20mV</text>
  <text x="330" y="108" font-size="10.5" fill="currentColor" fill-opacity="0.7">|A| ≈ 20mV, |B| ≈ 20µV → T = 1000</text>
  <text x="30" y="185" font-size="12.5" font-weight="700" fill="currentColor">Crossover (T = 1)</text>
  <text x="30" y="203" font-size="10.5" fill="currentColor" fill-opacity="0.7">T=1 means "same size after one trip", so by definition</text>
  <text x="30" y="218" font-size="10.5" fill="currentColor" fill-opacity="0.7">this is the frequency where |A| = |B|</text>
  <rect x="330" y="173" width="360" height="30" rx="4" fill="none" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.4"/>
  <rect x="330" y="173" width="180" height="30" fill="#3b82f6" fill-opacity="0.35"/>
  <rect x="510" y="173" width="180" height="30" fill="#16a34a" fill-opacity="0.35"/>
  <text x="420" y="193" text-anchor="middle" font-size="11.5" font-weight="700" fill="currentColor">A</text>
  <text x="600" y="193" text-anchor="middle" font-size="11.5" font-weight="700" fill="currentColor">B</text>
  <text x="330" y="221" font-size="10.5" fill="currentColor" fill-opacity="0.7">|A| = |B| → T = 1 (0dB) ← this frequency is fc</text>
  <text x="30" y="298" font-size="12.5" font-weight="700" fill="#16a34a">High frequency — loop cannot keep up (T = 0.1)</text>
  <text x="30" y="316" font-size="10.5" fill="currentColor" fill-opacity="0.7">Compensator gain is at the floor, so duty barely changes and</text>
  <text x="30" y="331" font-size="10.5" fill="currentColor" fill-opacity="0.7">nothing drives A; the cap's low impedance also holds it still</text>
  <rect x="330" y="286" width="360" height="30" rx="4" fill="none" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.4"/>
  <rect x="330" y="286" width="36" height="30" fill="#3b82f6" fill-opacity="0.35"/>
  <rect x="366" y="286" width="324" height="30" fill="#16a34a" fill-opacity="0.35"/>
  <text x="345" y="306" text-anchor="middle" font-size="10" fill="currentColor">A</text>
  <text x="528" y="306" text-anchor="middle" font-size="11.5" font-weight="700" fill="currentColor">B takes nearly all 20mV</text>
  <text x="330" y="334" font-size="10.5" fill="currentColor" fill-opacity="0.7">|A| ≈ 2mV, |B| ≈ 20mV → T = 0.1</text>
  <text x="30" y="378" font-size="12" fill="currentColor">→ <tspan font-weight="700">who absorbs more of the 20mV</tspan> is exactly the loop gain</text>
</svg>

### Sticking point ④ — "why is B pinned and A moving at low frequency?"

This is the one that took longest, because it feels backwards. **Switch to DC and it becomes obvious.**

Inserting the resistor changed something important: **the node the loop senses is no longer A (Vout) — it is B.** The divider hangs off B, so FB comes from B, and **A becomes a stranger one resistor away**.

Take $V_{ref} = 1.0\text{V}$ and $R_1 = R_2$ (so FB = half of B). The loop's only goal is **FB = 1.0V**, i.e. **B = 2.0V**.

| | before injection | after DC 20mV |
|---|---|---|
| **B** | 2.000V | **2.000V** (the loop defends it) |
| **A** | 2.000V | **1.980V** (pushed off by 20mV) |

The loop got its own node exactly right. **That A is off by 20mV is of no concern to it** — A is not what it senses.

The causal chain:

1. Injection pushes B to 2.02V (A cannot move instantly, held by the output cap)
2. FB = 1.01V > Vref → the error amp sees "output too high"
3. COMP falls → duty falls → **A starts coming down**
4. As A comes down, B follows (they are tied 20mV apart)
5. **The instant A reaches 1.98V, B = 2.00V and the error is zero** → it stops

> **Rod analogy:** A and B are two points joined by a rigid 20mV rod. The loop watches **only B** and pushes until B sits at 2.0V. The whole rod moves, dragging A along, and when B lands on target A is automatically at 1.98V. **A never had a say.**

### At high frequency the loop does not "fail to respond" — it responds negligibly

People say fast wiggles are simply ignored, but that is not accurate. FB does move, the error amp does react, the duty does wiggle a little. It just gets **shaved at four stages** on the way to Vout:

1. **Compensator gain rolls off** (the dominant one) — 10,000× at DC may be 0.01× at 100kHz
2. **PWM updates duty once per switching cycle** — above $f_{sw}/2$ it cannot even be represented
3. **Output LC filter attenuates** — −40dB/decade above resonance
4. **Output cap pins Vout** — its impedance keeps falling with frequency

The product of those four *is* the loop gain at that frequency. At $T = 0.001$, A moves by 20nV — not zero, just invisible. (This is also **why a Bode plot keeps going** at −40dB, −60dB instead of ending.)

### Why |A| = |B| at crossover — and why it is not "10mV each"

Since $T$ is defined as $A/B$, saying $|T| = 1$ is the same as saying **$|A| = |B|$**. Crossover is by definition *the frequency where the two are equal*.

Note that this does **not** mean 10mV each. A and B are phasors, and what is forced is the **vector difference** $B - A = 20\text{mV}$.

- **PM = 0°** (A and B exactly out of phase) → magnitudes add arithmetically → **10mV each**
- **PM = 60°** (120° apart) → subtract as vectors → **about 11.5mV each**

What always holds is that **their magnitudes are equal**; the actual number depends on phase margin.

### $T=1$ is not something that "happens" — it is simply passed through

Crossover is easy to mistake for an event. It is not. $T$ is large at low frequency and **falls continuously** as frequency rises. Coming down from a large value to a small one, it **must pass through 1** somewhere — and we named that frequency fc.

Water cooling from 30°C to 10°C must pass 20°C. Not because 20°C is special, but because it is on the way.

So the real question is **"why does $T$ fall with frequency?"**, and that answer is **poles** — the next post.

### Only two blocks actually pull $T$ down

$T$ is the product of four blocks, but only two of them vary meaningfully with frequency.

| Block | Frequency dependence |
|---|---|
| **Compensator** | integrator-like, so gain drops steeply with frequency — **the main driver** |
| **Power stage (LC filter)** | −40dB/decade above resonance |
| PWM modulator | roughly constant (dividing by the sawtooth amplitude) |
| Feedback divider | strictly constant ($R_2/(R_1+R_2)$) |

So fc is effectively **where the compensator's gain curve and the power stage's attenuation curve meet at 0dB**. Designing a compensator means **placing that meeting point at the frequency you want**.

---

## 5. Reading a Bode plot — fc · PM · GM

Sweep the injection frequency and plot $A/B$ as magnitude (dB) and phase (°), and you have a **Bode plot**. That is literally what a network analyzer does, and what SIMPLIS gives you from POP → AC.

<svg viewBox="0 0 700 560" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>Reading crossover frequency, phase margin and gain margin from a Bode plot</title>
  <desc>Phase margin is read where the gain crosses 0 dB; gain margin is read where the phase reaches -180 degrees.</desc>
  <text x="40" y="26" font-size="13" font-weight="700" fill="currentColor">Loop-gain Bode plot (example) — fc = 10kHz, PM = 60°, GM = 20dB</text>
  <text x="40" y="52" font-size="11.5" font-weight="700" fill="#3b82f6">Magnitude |T| (dB)</text>
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
  <text x="40" y="302" font-size="11.5" font-weight="700" fill="#f59e0b">Phase (°)</text>
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
  <text x="372" y="132" font-size="10" fill="#e0533d">gain crosses 0dB</text>
  <line x1="345" y1="343" x2="345" y2="390" stroke="#16a34a" stroke-width="2.4"/>
  <path d="M341,348 L345,341 L349,348 Z" fill="#16a34a"/>
  <path d="M341,385 L345,392 L349,385 Z" fill="#16a34a"/>
  <text x="336" y="372" text-anchor="end" font-size="12" font-weight="700" fill="#16a34a">PM</text>
  <text x="336" y="387" text-anchor="end" font-size="11" font-weight="700" fill="#16a34a">60°</text>
  <text x="374" y="349" font-size="10" fill="currentColor" fill-opacity="0.7">phase here is −120°</text>
  <line x1="431" y1="50" x2="431" y2="480" stroke="currentColor" stroke-opacity="0.45" stroke-width="1.4" stroke-dasharray="4 3"/>
  <circle cx="431" cy="170" r="5.5" fill="currentColor" fill-opacity="0.6"/>
  <circle cx="431" cy="390" r="5.5" fill="currentColor" fill-opacity="0.6"/>
  <text x="437" y="404" font-size="10.5" fill="currentColor" fill-opacity="0.7">where phase hits −180° (30kHz)</text>
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
  <text x="40" y="524" font-size="11.5" fill="currentColor"><tspan font-weight="700">How to read</tspan> ① frequency where gain crosses 0dB = fc  ② how far that phase sits above −180° = PM</text>
  <text x="40" y="544" font-size="11.5" fill="currentColor">③ find where phase hits −180°, then how far the gain is below 0dB = GM</text>
</svg>

- **fc (crossover)** — where the gain crosses 0dB. The loop's **speed limit**. In our experiment, the frequency where A and B split the 20mV evenly.
- **PM (phase margin)** — how far the phase at fc still is from −180°. Target **45~60°**
- **GM (gain margin)** — how far the gain is below 0dB where the phase reaches −180°. Target **10dB or more**

PM and GM are the **same condition read vertically vs horizontally**. The essence of stability is one thing:

> **Did the gain fall below 1 before the phase reached −180°?**

### fc and PM are joined at the hip

PM is an angle, but it is **only evaluated at fc**. Push fc higher (chasing bandwidth) and the phase has already slipped further by then, so **PM shrinks**. That is the fundamental trade-off of compensator design — **fast (fc↑) vs stable (PM↑)**.

| | decides | what you see in the waveform |
|---|---|---|
| **PM** | the **shape** | overshoot ratio, how many rings before it dies |
| **fc** | the **time scale** | recovery speed, ringing frequency |

PM 45° with fc 10kHz and PM 45° with fc 100kHz have the **same shape** — the latter simply finishes 10× faster.

### Raising fc with gain alone costs you the entire phase margin

Increasing compensator gain shifts the magnitude curve **straight up**. The shape is unchanged and only the height moves, so the 0dB crossing slides **to the right** and fc increases.

The catch is that **the phase curve does not move at all** — a pure gain change has no effect on phase.

<svg viewBox="0 0 700 580" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>Raising gain moves fc right while phase margin disappears</title>
  <desc>The magnitude curve shifts up and the phase curve stays put, so the new crossover has no phase margin.</desc>
  <text x="40" y="24" font-size="13" font-weight="700" fill="currentColor">Raising compensator gain alone — fc moves right, PM disappears</text>
  <text x="40" y="50" font-size="11.5" font-weight="700" fill="#3b82f6">Magnitude |T| (dB)</text>
  <line x1="90" y1="44" x2="90" y2="240" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="90" y1="240" x2="640" y2="240" stroke="currentColor" stroke-opacity="0.45"/>
  <line x1="90" y1="140" x2="640" y2="140" stroke="currentColor" stroke-opacity="0.5" stroke-dasharray="5 4"/>
  <text x="84" y="144" text-anchor="end" font-size="11" font-weight="700" fill="currentColor">0dB</text>
  <text x="84" y="84" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">+40</text>
  <text x="84" y="114" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">+20</text>
  <text x="84" y="174" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">−20</text>
  <path d="M90,80 L227,110 L365,140 L431,170 L502,200 L575,224" fill="none" stroke="#3b82f6" stroke-width="2.6" stroke-opacity="0.45"/>
  <text x="120" y="96" font-size="10" fill="#3b82f6" fill-opacity="0.7">original</text>
  <path d="M90,50 L227,80 L365,110 L431,140 L502,170 L575,194" fill="none" stroke="#3b82f6" stroke-width="2.8"/>
  <text x="120" y="46" font-size="10.5" font-weight="700" fill="#3b82f6">gain +20dB</text>
  <defs>
    <marker id="lgupe" markerWidth="9" markerHeight="9" refX="3" refY="6" orient="auto"><path d="M3,0 L6,6 L0,6 Z" fill="#3b82f6"/></marker>
  </defs>
  <line x1="270" y1="115" x2="270" y2="92" stroke="#3b82f6" stroke-width="1.6" marker-end="url(#lgupe)"/>
  <line x1="470" y1="188" x2="470" y2="165" stroke="#3b82f6" stroke-width="1.6" marker-end="url(#lgupe)"/>
  <text x="286" y="108" font-size="10" fill="#3b82f6">whole curve shifts straight up</text>
  <circle cx="365" cy="140" r="5" fill="currentColor" fill-opacity="0.6"/>
  <circle cx="431" cy="140" r="5.5" fill="#e0533d"/>
  <line x1="365" y1="44" x2="365" y2="500" stroke="currentColor" stroke-opacity="0.45" stroke-width="1.4" stroke-dasharray="4 3"/>
  <line x1="431" y1="44" x2="431" y2="500" stroke="#e0533d" stroke-width="1.6" stroke-dasharray="4 3"/>
  <text x="352" y="36" text-anchor="end" font-size="10.5" fill="currentColor" fill-opacity="0.7">original fc</text>
  <text x="352" y="48" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">10kHz</text>
  <text x="440" y="36" font-size="11" font-weight="700" fill="#e0533d">new fc</text>
  <text x="440" y="48" font-size="10" fill="#e0533d">30kHz</text>
  <text x="40" y="300" font-size="11.5" font-weight="700" fill="#f59e0b">Phase (°) — <tspan fill="currentColor">does not move at all</tspan></text>
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
  <text x="338" y="374" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">(original)</text>
  <text x="444" y="384" font-size="12" font-weight="700" fill="#e0533d">PM = 0°</text>
  <text x="444" y="399" font-size="10" fill="#e0533d">on the edge</text>
  <g font-size="10" fill="currentColor" fill-opacity="0.7" text-anchor="middle">
    <text x="90" y="256">100Hz</text><text x="227" y="256">1kHz</text><text x="365" y="256">10kHz</text>
    <text x="502" y="256">100kHz</text><text x="640" y="256">1MHz</text>
    <text x="90" y="496">100Hz</text><text x="227" y="496">1kHz</text><text x="365" y="496">10kHz</text>
    <text x="502" y="496">100kHz</text><text x="640" y="496">1MHz</text>
  </g>
  <text x="40" y="528" font-size="12" fill="currentColor">Magnitude shifts <tspan font-weight="700" fill="#3b82f6">up</tspan> → the 0dB crossing slides <tspan font-weight="700">right</tspan> (fc ↑)</text>
  <text x="40" y="550" font-size="12" fill="currentColor">Phase stays <tspan font-weight="700" fill="#f59e0b">exactly where it was</tspan> → at the new fc it is already −180° → <tspan font-weight="700" fill="#e0533d">all margin gone</tspan></text>
  <text x="40" y="572" font-size="11.5" fill="currentColor" fill-opacity="0.7">→ to be fast *and* stable you must lift the phase curve itself = what a <tspan font-weight="700">zero</tspan> does</text>
</svg>

| | Magnitude | Phase | Phase at new fc | PM |
|---|---|---|---|---|
| Original | — | — | −120° | **60°** |
| Gain +20dB (fc 30kHz) | shifts up | **unchanged** | −180° | **0°** |

**There is no free bandwidth.** Gain alone buys speed and loses exactly that much stability. The real work of compensator design is **lifting the phase curve**, and the tool for that is the **zero**. Place a zero near fc and the phase comes back up, so you can **raise fc while keeping PM**.

### PM is secured at worst case, not nominal

Ceramic capacitors **lose a large fraction of their effective capacitance under DC bias** (sometimes more than half). Less capacitance raises the LC resonance, which pushes **fc up and eats PM**. Add temperature, part tolerance and load range, and a nominal 45° can fall below 30° in the worst corner.

So designs typically target **55~60° nominal** so that 45° survives worst case.

---

## 6. Where the disturbance enters is everything

The same $T$ can produce opposite-looking results, because the disturbance enters at different points.

| Entry point | Result | When T is large |
|---|---|---|
| **Feedback path** (our injection) | $A/B = T$ | the loop **faithfully copies** it to the output |
| **Output node** (load step) | remaining $= D/(1+T)$ | the loop **fights it off** |

How much of an output disturbance survives comes from the basic feedback relation. If the output would move by $D$ without a loop, and the actual movement is $V$, the loop pushes back by $T \cdot V$:

$$V = D - T\,V \;\;\Rightarrow\;\; V(1+T) = D \;\;\Rightarrow\;\; \boxed{V = \frac{D}{1+T}}$$

With $D = 100\text{mV}$:

| Frequency | T | What remains |
|---|---|---|
| 100Hz | 1000 | 100mV / 1001 = **0.1mV** |
| fc (10kHz) | 1 | 100mV / 2 = **50mV** |
| 30kHz | 0.1 | 100mV / 1.1 = **91mV** |

Written as an impedance, this is the same story as output impedance:

$$Z_{out,\text{closed}} = \frac{Z_{out,\text{open}}}{1+T}$$

**The loop gain *is* the stiffness the loop adds to the output.** Where that strength runs out, the converter is just an "LC plus a capacitor".

### Which is why FB layout matters

An error that creeps into the feedback path is **mistaken for a command and faithfully copied to the output**. **No amount of loop gain fixes it.**

| Real-world case | Result |
|---|---|
| Divider resistor tolerance (1% vs 0.1%) | DC error lands directly on the output |
| Vref noise / drift | copied straight to the output |
| SW node coupling into the FB trace | output wiggles by that much |
| Error-amp input offset | output offset |

**Keep the FB trace short, away from the SW node and inductor, with the divider close to the FB pin** — every one of those layout rules comes from here.

> The loop **believes whatever it sees.** Dirty the sensing path and it will faithfully reproduce that lie at the output.

---

## 7. Load step — how the cap and the loop divide the work

<svg viewBox="0 0 760 430" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>Load step: the output capacitor handles the fast part, the loop handles the slow part</title>
  <desc>The initial dip is set by the output capacitor; the recovery is set by the loop.</desc>
  <defs>
    <marker id="lg3e" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e0533d"/></marker>
    <marker id="lg4e" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#3b82f6"/></marker>
  </defs>
  <text x="24" y="26" font-size="12.5" font-weight="700" fill="currentColor">When the load jumps, where does the current come from?</text>
  <text x="24" y="86" font-size="11" fill="currentColor" fill-opacity="0.7">Vin</text>
  <line x1="46" y1="80" x2="66" y2="80" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5"/>
  <rect x="66" y="62" width="56" height="36" rx="4" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5"/>
  <text x="94" y="78" text-anchor="middle" font-size="10" fill="currentColor">Switch</text>
  <text x="94" y="91" text-anchor="middle" font-size="9" fill="currentColor" fill-opacity="0.7">duty</text>
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
  <text x="274" y="118" font-size="10" fill="currentColor" fill-opacity="0.7">load ↑</text>
  <path d="M222,112 C238,150 244,140 250,132" fill="none" stroke="#e0533d" stroke-width="2" marker-end="url(#lg3e)"/>
  <text x="24" y="176" font-size="11.5" font-weight="700" fill="#e0533d">① Immediately — the cap discharges to supply it</text>
  <text x="24" y="192" font-size="10" fill="currentColor" fill-opacity="0.7">inductor current cannot jump → Vout dips</text>
  <path d="M188,74 L250,74" fill="none" stroke="#3b82f6" stroke-width="2" marker-end="url(#lg4e)"/>
  <text x="24" y="220" font-size="11.5" font-weight="700" fill="#3b82f6">② Later — loop raises duty → inductor supplies it</text>
  <text x="24" y="236" font-size="10" fill="currentColor" fill-opacity="0.7">FB senses → compensator → duty → current rises (takes time)</text>
  <text x="330" y="26" font-size="12.5" font-weight="700" fill="currentColor">The resulting Vout waveform</text>
  <text x="330" y="52" font-size="10" fill="currentColor" fill-opacity="0.7">load current</text>
  <path d="M340,86 L420,86 L420,62 L730,62" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.8"/>
  <line x1="340" y1="120" x2="340" y2="300" stroke="currentColor" stroke-opacity="0.4"/>
  <line x1="340" y1="300" x2="740" y2="300" stroke="currentColor" stroke-opacity="0.4"/>
  <text x="740" y="318" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">time</text>
  <text x="332" y="132" text-anchor="end" font-size="10" fill="currentColor" fill-opacity="0.7">Vout</text>
  <line x1="340" y1="190" x2="740" y2="190" stroke="currentColor" stroke-opacity="0.5" stroke-dasharray="4 4"/>
  <text x="746" y="194" font-size="9.5" fill="currentColor" fill-opacity="0.7">target</text>
  <path d="M340,190 L418,190 L442,252 C470,252 486,205 512,193 C536,182 552,172 572,178 C596,185 606,194 636,190 C670,187 700,190 730,190" fill="none" stroke="#16a34a" stroke-width="2.6"/>
  <line x1="420" y1="120" x2="420" y2="300" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="3 3"/>
  <line x1="442" y1="266" x2="442" y2="290" stroke="#e0533d" stroke-width="1.4"/>
  <text x="404" y="330" font-size="11" font-weight="700" fill="#e0533d">① dip</text>
  <text x="356" y="346" font-size="10" fill="currentColor" fill-opacity="0.7">= set by cap value · ESR · ESL (loop powerless)</text>
  <path d="M500,258 L500,215" fill="none" stroke="#3b82f6" stroke-width="1.4" marker-end="url(#lg4e)"/>
  <text x="512" y="248" font-size="11" font-weight="700" fill="#3b82f6">② recovery speed = fc</text>
  <text x="512" y="263" font-size="10" fill="currentColor" fill-opacity="0.7">higher fc returns sooner</text>
  <text x="604" y="148" font-size="11" font-weight="700" fill="currentColor">③ ringing = PM</text>
  <text x="604" y="163" font-size="10" fill="currentColor" fill-opacity="0.7">low PM rings longer</text>
  <text x="24" y="392" font-size="12" fill="currentColor">The <tspan font-weight="700">high-frequency content (the dip)</tspan> sees little loop gain → the cap carries it</text>
  <text x="24" y="414" font-size="12" fill="currentColor">The <tspan font-weight="700">low-frequency content (afterwards)</tspan> sees high loop gain → back to target</text>
</svg>

A load step is a **sum of frequency components**. Its sharp leading edge sits where loop gain is small, so the **cap** carries it; the slower content sits where loop gain is large, so it is erased and the output **returns to target**. The "90% of the disturbance remains" from earlier is exactly what that **dip** is.

### Three things set the depth of the dip

The dip is not one effect but three stacked together.

1. **ESL × di/dt** — the sharp spike in the first instant of the load step (ns scale)
2. **ESR × ΔI** — an immediate step-like drop
3. **Cout capacitance** — the sag while the inductor current ramps to the new load level — **usually the largest term**

**fc does have a secondary effect**: a slow loop commands "raise duty" late, so the cap discharges longer and the dip deepens. But however fast the loop is, it runs into the physical limit of the **inductor current slew rate $(V_{in}-V_{out})/L$** and stops there. Past that point more bandwidth does not shrink the dip.

**So a waveform tells you which knob to turn.**

| Symptom | Cause | Fix |
|---|---|---|
| **Dip too deep** | loop is powerless at those frequencies | **more capacitance / lower ESR**, possibly **lower L** (bandwidth helps little) |
| **Sluggish recovery** | fc too low | **more bandwidth** (raise compensator gain) |
| **Rings for a long time** | insufficient PM | **re-place the compensator zeros** |

Fiddling with the compensator when the problem is the dip is wasted effort. This split is the basic logic for reading transient waveforms during board-level validation.

---

## Key takeaways

- **Loop gain $T$ = the round-trip multiplier.** Oscillation needs **phase −180° AND gain ≥ 1**.
- Measure it by inserting a resistor between Vout and the divider and **injecting floating through a transformer**. Only **$B-A=V_{inj}$** is forced; how A and B split it *is* $T = A/B$.
- $V_{inj}$ cancels out, so the measurement works **with the loop closed**.
- Inject where **$Z_s \ll Z_L$**. Current does flow, but $Z_s$ must be small enough that it **builds no voltage**, so A moves only via the round trip.
- With the resistor in place, **the loop senses B, not A** — which is why B is pinned and A is pushed off at low frequency.
- At high frequency the loop does not "fail to respond"; **its response is just vanishingly small**.
- **fc** = where gain is 0dB (the loop's speed limit), **PM** = margin to −180° at fc, **GM** = margin to 0dB where phase is −180°.
- A disturbance in the **feedback path** is copied faithfully; one at the **output** is divided by $1+T$. That is why FB layout matters.
- In a load step, the **dip belongs to the cap** and the **recovery belongs to the loop**.

---

## Quiz

Questions to check yourself before the next session. Try to answer before expanding.

**Q1.** Why can't you drive node B directly from a ground-referenced signal generator when measuring loop gain?

<details>
<summary>Show answer</summary>

Because that **genuinely breaks the loop**. The converter loses feedback, the output slams to a rail, and the DC operating point collapses — no measurement is possible. **Floating injection** through a transformer keeps **DC continuity through the resistor**, so the converter keeps regulating and only an AC perturbation is added.
</details>

**Q2.** Why must $Z_s \ll Z_L$ at the injection point? Explain why "so no injection current flows" is *not* the answer.

<details>
<summary>Show answer</summary>

Current **does** flow — it is a series loop. What matters is the **voltage** that current builds across $Z_s$. With $Z_s$ small, $i \times Z_s$ is on the order of 10nV, so A moves **only via the round trip**. With $Z_s$ large, the injection pushes A directly, bypassing the loop, and corrupts the measurement. ($Z_L$ must be large so the injection current stays tiny and does not perturb normal operation.)
</details>

**Q3.** With $V_{ref}=1.0\text{V}$ and $R_1=R_2$, a DC 20mV is injected across the resistor. What are A and B?

<details>
<summary>Show answer</summary>

**B = 2.000V, A = 1.980V.**

The loop's goal is FB = 1.0V, i.e. **B = 2.0V**. Since $B = A + 20\text{mV}$, A is pushed to 1.98V. The loop only defends the node it senses; **A is not sensed.**
</details>

**Q4.** A Bode plot shows fc = 10kHz with phase −135° there. What is the PM, and how would you judge the design?

<details>
<summary>Show answer</summary>

**PM = 45°.** Stable, but not generous. Ringing starts to be visible in a load step. The usual target is **45~60°**, so this sits right at the lower bound.
</details>

**Q5.** The initial dip in a load-step waveform is too deep. Will raising the compensator bandwidth fix it?

<details>
<summary>Show answer</summary>

**Barely.** The dip is created by the **high-frequency content** of the step, where the loop gain is already below 1 and the loop is powerless. That region is governed by the **output capacitor's value, ESR and ESL** → the fix is **more capacitance**. Bandwidth (fc) sets the **recovery speed**, not the dip.
</details>

---

*Next up: putting **poles** on top of this — "so why does the phase slip?", and why voltage mode's LC double pole makes compensation awkward.*
