+++
title = "[Concept] PMOS (p-channel) Operating Regions — What Differs from NMOS"
date = 2026-07-15T05:00:00+09:00
series = "Theory / Principle"
description = "PMOS is the polarity-flipped counterpart of NMOS. Start by pinning down how the carrier, source position, turn-on condition, and current direction are all reversed, then lay out the three operating regions and its use in high-side switches and PMOS LDOs."
tags = ["개념정리", "MOSFET", "PMOS", "device", "fundamentals"]
+++

## Intro

If you've read the earlier [MOSFET (n-channel) operating regions](../mosfet-operating-regions/), PMOS is almost fully in hand. **PMOS is the counterpart with NMOS's polarity flipped wholesale** — the carrier is a hole instead of an electron, and every voltage sign is reversed. The **mechanisms — pinch-off, channel charge, "why is it constant in saturation" — are completely identical to NMOS**.

So this post focuses on *"what differs from NMOS."* The reason to know PMOS is clear — the **high-side switch** and the **pass device of a PMOS LDO** are both PMOS.

---

## 1. At a glance — NMOS vs PMOS basic operation

| Item | NMOS (n-channel) | PMOS (p-channel) |
|------|-------------|-------------|
| Carrier | **electron** (negative charge) | **hole** (positive charge) |
| Body / source·drain | p-body, **n+** S/D | n-body, **p+** S/D |
| Source position (convention) | **low side** of the circuit (GND) | **high side** of the circuit (Vdd) |
| Threshold voltage $V_{th}$ sign | **positive (+)** | **negative (−)** |
| Turn-on condition | $V_{GS} > V_{th}$ → gate **higher** than source | $V_{GS} < V_{th}$ → gate **lower** than source |
| Current direction (convention) | drain → source (D is higher) | source → drain (S is higher) |
| Mobility | electrons are fast | holes are slow → for the same size, $R_{DS(on)}$ is **2–3× higher** |
| Main use | low-side switch, power switch | **high-side switch**, **PMOS LDO** pass |

**Key one-liner:** In PMOS the source sits **up top (Vdd)**, and you must pull the gate **below** the source to turn it on. The rest is NMOS mirrored.

---

## 2. Structure — only the polarity is flipped

<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>NMOS vs PMOS cross-section comparison</title>
  <desc>NMOS has n+ source/drain in a p-body with an electron channel. PMOS has p+ source/drain in an n-body with a hole channel. The polarity is reversed.</desc>
  <!-- NMOS -->
  <text x="30" y="24" font-size="13" font-weight="700" fill="currentColor">NMOS — electron channel</text>
  <rect x="40" y="40" width="180" height="12" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-opacity="0.6"/>
  <text x="130" y="36" font-size="10" text-anchor="middle" fill="currentColor">Gate</text>
  <line x1="40" y1="54" x2="220" y2="54" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="3 2"/>
  <rect x="20" y="58" width="220" height="70" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.4"/>
  <text x="130" y="120" font-size="10" text-anchor="middle" fill="currentColor" fill-opacity="0.6">p-body</text>
  <rect x="20" y="58" width="48" height="42" fill="#3b82f6" fill-opacity="0.28" stroke="#3b82f6" stroke-opacity="0.6"/>
  <rect x="192" y="58" width="48" height="42" fill="#3b82f6" fill-opacity="0.28" stroke="#3b82f6" stroke-opacity="0.6"/>
  <text x="44" y="83" font-size="10" text-anchor="middle" fill="currentColor">S (n+)</text>
  <text x="216" y="83" font-size="10" text-anchor="middle" fill="currentColor">D (n+)</text>
  <text x="130" y="83" font-size="11" text-anchor="middle" fill="#3b82f6">electron e⁻ →</text>
  <text x="30" y="160" font-size="11" fill="currentColor">source = low side · raise gate <tspan font-weight="700">↑</tspan> above source to turn ON</text>
  <text x="30" y="178" font-size="11" fill="currentColor">V_GS &gt; V_th  (V_th positive)</text>
  <!-- PMOS -->
  <text x="360" y="24" font-size="13" font-weight="700" fill="currentColor">PMOS — hole channel</text>
  <rect x="370" y="40" width="180" height="12" fill="currentColor" fill-opacity="0.25" stroke="currentColor" stroke-opacity="0.6"/>
  <text x="460" y="36" font-size="10" text-anchor="middle" fill="currentColor">Gate</text>
  <line x1="370" y1="54" x2="550" y2="54" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="3 2"/>
  <rect x="350" y="58" width="220" height="70" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.4"/>
  <text x="460" y="120" font-size="10" text-anchor="middle" fill="currentColor" fill-opacity="0.6">n-body</text>
  <rect x="350" y="58" width="48" height="42" fill="#e0533d" fill-opacity="0.26" stroke="#e0533d" stroke-opacity="0.6"/>
  <rect x="522" y="58" width="48" height="42" fill="#e0533d" fill-opacity="0.26" stroke="#e0533d" stroke-opacity="0.6"/>
  <text x="374" y="83" font-size="10" text-anchor="middle" fill="currentColor">S (p+)</text>
  <text x="546" y="83" font-size="10" text-anchor="middle" fill="currentColor">D (p+)</text>
  <text x="460" y="83" font-size="11" text-anchor="middle" fill="#e0533d">← hole h⁺</text>
  <text x="360" y="160" font-size="11" fill="currentColor">source = high side · lower gate <tspan font-weight="700">↓</tspan> below source to turn ON</text>
  <text x="360" y="178" font-size="11" fill="currentColor">V_GS &lt; V_th  (V_th negative)</text>
  <!-- note -->
  <text x="30" y="215" font-size="11" fill="currentColor" fill-opacity="0.8">Symbol: the source arrow points the opposite way (NMOS inward ↔ PMOS outward); PMOS is also marked with a bubble (◦) on the gate.</text>
</svg>

Only the n-type and p-type are swapped; the structure is symmetric. Where NMOS has n+ source/drain in a p-body, PMOS has p+ source/drain in an n-body.

---

## 3. How to turn it on — view it relative to the source

In PMOS the source is tied to the **high side** (e.g. Vdd). Pull the gate **below** the source by at least $|V_{th}|$ and a hole channel forms beneath the source.

- Overdrive: $V_{OV} = V_{SG} - |V_{th}| = |V_{GS}| - |V_{th}|$
- Example ($V_S = 5\text{V}$, $V_{th} = -1\text{V}$):
  - $V_G = 5\text{V}$ → $V_{SG}=0$ → **off** (cutoff)
  - $V_G = 2\text{V}$ → $V_{SG}=3\text{V}$ → $V_{OV}=2\text{V}$ → **on**
  - pull the gate all the way to GND (0V) → $V_{SG}=5\text{V}$ → **fully ON**

> **Intuition:** NMOS turns on by *raising* the gate above the source; PMOS turns on by *lowering* the gate below the source. On the high side, if the source is Vdd, it turns on by simply pulling the gate to GND — convenient.

---

## 4. The three operating regions (by magnitude)

If the signs get confusing, **look at magnitudes (absolute values)** and you get the same table as NMOS. ($V_{OV}=|V_{GS}|-|V_{th}|$)

| Region | Condition (by magnitude) | Behavior |
|------|----------------|------|
| **Cutoff** | $\lvert V_{GS}\rvert < \lvert V_{th}\rvert$ | no channel, $I_D\approx0$ (OFF) |
| **Triode** | $\lvert V_{GS}\rvert>\lvert V_{th}\rvert$, $\;\lvert V_{DS}\rvert < V_{OV}$ | voltage-controlled resistor ($R_{DS(on)}$) |
| **Saturation** | $\lvert V_{GS}\rvert>\lvert V_{th}\rvert$, $\;\lvert V_{DS}\rvert \ge V_{OV}$ | voltage-controlled current source |

The **principles — pinch-off, channel charge, "why the current is constant in saturation" (series resistance + voltage division) — are 100% identical to the NMOS post**: read electron as hole and the sign as reversed. For the detailed mechanism, see the [NMOS post](../mosfet-operating-regions/).

---

## 5. Voltage–current curve and current flow by region

The vertical axis is the current magnitude $I_D$, and the horizontal axis is $V_{SD}$ (how much the source is above the drain). The curve shape is the same as NMOS; only the axis is now **referenced to the source (positive)**.

<svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>PMOS output characteristics I_D vs V_SD</title>
  <desc>As V_SD rises, the current climbs in triode (ohmic), bends at V_OV, and goes flat in saturation.</desc>
  <line x1="60" y1="280" x2="580" y2="280" stroke="currentColor" stroke-opacity="0.7"/>
  <line x1="60" y1="280" x2="60" y2="30" stroke="currentColor" stroke-opacity="0.7"/>
  <text x="575" y="300" font-size="12" text-anchor="end" fill="currentColor">V_SD</text>
  <text x="52" y="40" font-size="12" text-anchor="end" fill="currentColor">I_D</text>
  <path d="M60,280 Q210,150 350,90 L560,90" fill="none" stroke="#e0533d" stroke-width="2.2"/>
  <line x1="350" y1="90" x2="350" y2="280" stroke="#e0533d" stroke-opacity="0.4" stroke-dasharray="4 3"/>
  <text x="350" y="296" font-size="10.5" text-anchor="middle" fill="#e0533d">V_OV (large V_SG)</text>
  <path d="M60,280 Q150,210 220,185 L560,185" fill="none" stroke="#f59e0b" stroke-width="2.2"/>
  <line x1="220" y1="185" x2="220" y2="280" stroke="#f59e0b" stroke-opacity="0.4" stroke-dasharray="4 3"/>
  <text x="220" y="296" font-size="10.5" text-anchor="middle" fill="#f59e0b">V_OV (small V_SG)</text>
  <text x="120" y="120" font-size="12" fill="currentColor" fill-opacity="0.8">triode</text>
  <text x="120" y="136" font-size="9.5" fill="currentColor" fill-opacity="0.55">(ohmic, rising)</text>
  <text x="450" y="70" font-size="12" fill="currentColor" fill-opacity="0.8">saturation</text>
  <text x="450" y="86" font-size="9.5" fill="currentColor" fill-opacity="0.55">(current source, flat)</text>
  <text x="465" y="175" font-size="11" fill="#e0533d">I_D,sat = ½·k·V_OV²</text>
</svg>

Now let's see, region by region, **where the voltage falls and how the holes flow**.

<svg viewBox="0 0 640 470" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>PMOS bias and hole current flow by region</title>
  <desc>S·G·D voltages and the hole current path in each of Cutoff/Triode/Saturation.</desc>
  <defs>
    <marker id="ph" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e0533d"/></marker>
  </defs>
  <g transform="translate(0,20)">
    <text x="10" y="12" font-size="12.5" font-weight="700" fill="currentColor">① Cutoff — gate as high as source (V_SG=0) → no channel</text>
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
    <text x="390" y="65" font-size="11" fill="#e0533d">V_SG = 0 → no channel</text>
    <text x="390" y="84" font-size="11" fill="currentColor">I_D = 0 (OFF)</text>
  </g>
  <g transform="translate(0,170)">
    <text x="10" y="12" font-size="12.5" font-weight="700" fill="currentColor">② Triode (ohmic) — large V_SG · small V_SD → channel fully filled, resistor-like</text>
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
    <text x="255" y="68" font-size="9.5" text-anchor="middle" fill="#e0533d">hole h⁺ →</text>
    <text x="390" y="46" font-size="11" fill="currentColor">S=5V · G=0V · D=4.5V</text>
    <text x="390" y="65" font-size="11" fill="#e0533d">V_SG=5 · V_SD=0.5</text>
    <text x="390" y="84" font-size="11" fill="currentColor">hole S→D, I_D ∝ V_SD</text>
  </g>
  <g transform="translate(0,320)">
    <text x="10" y="12" font-size="12.5" font-weight="700" fill="currentColor">③ Saturation — large V_SD → pinch-off at the drain side, I_D constant</text>
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
    <text x="306" y="102" font-size="8" text-anchor="middle" fill="#e0533d">depletion</text>
    <line x1="205" y1="66" x2="288" y2="66" stroke="#e0533d" stroke-width="2" marker-end="url(#ph)"/>
    <text x="390" y="46" font-size="11" fill="currentColor">S=5V · G=0V · D=1V</text>
    <text x="390" y="65" font-size="11" fill="#e0533d">V_SG=5 · V_SD=4</text>
    <text x="390" y="84" font-size="11" fill="currentColor">pinch-off, I_D=½kV_OV² fixed</text>
  </g>
</svg>

- **Cutoff**: $V_{SG}=0$ (gate as high as the source) → no channel → no current.
- **Triode (ohmic)**: lower the gate to make $V_{SG}$ large + keep $V_{SD}$ small → the channel fully fills from source to drain → holes flow S→D, proportional to $V_{SD}$ (resistor-like).
- **Saturation**: increase $V_{SD}$ and the channel pinches off at the drain side → the excess voltage is absorbed by the depletion region → $I_D$ is fixed at $\tfrac12 kV_{OV}^2$.

> Holes flow **from the source (high voltage) to the drain (low voltage)** — opposite in carrier and direction to NMOS, where electrons flowed source→drain.

---

## 6. In practice

<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>NMOS low-side vs PMOS high-side switch</title>
  <desc>NMOS sits below the load (low-side), source at GND. PMOS sits above the load (high-side), source at Vdd.</desc>
  <!-- NMOS low-side -->
  <text x="30" y="24" font-size="13" font-weight="700" fill="currentColor">NMOS — low-side switch</text>
  <line x1="120" y1="46" x2="120" y2="70" stroke="currentColor" stroke-width="2"/>
  <text x="120" y="42" font-size="11" text-anchor="middle" fill="currentColor">Vdd</text>
  <rect x="90" y="70" width="60" height="34" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-opacity="0.6"/>
  <text x="120" y="92" font-size="10" text-anchor="middle" fill="currentColor">Load</text>
  <line x1="120" y1="104" x2="120" y2="128" stroke="currentColor" stroke-width="2"/>
  <rect x="88" y="128" width="64" height="44" fill="#3b82f6" fill-opacity="0.14" stroke="#3b82f6" stroke-opacity="0.7"/>
  <text x="120" y="147" font-size="10" text-anchor="middle" fill="currentColor">NMOS</text>
  <text x="120" y="162" font-size="9" text-anchor="middle" fill="currentColor" fill-opacity="0.7">D top / S bottom</text>
  <line x1="120" y1="172" x2="120" y2="196" stroke="currentColor" stroke-width="2"/>
  <line x1="100" y1="196" x2="140" y2="196" stroke="currentColor" stroke-width="2"/>
  <text x="120" y="212" font-size="10" text-anchor="middle" fill="currentColor">GND</text>
  <text x="30" y="245" font-size="11" fill="currentColor">source = GND (fixed) → easy to raise</text>
  <text x="30" y="262" font-size="11" fill="currentColor">the gate above the source (simple ON)</text>
  <!-- PMOS high-side -->
  <text x="360" y="24" font-size="13" font-weight="700" fill="currentColor">PMOS — high-side switch</text>
  <line x1="450" y1="46" x2="450" y2="70" stroke="currentColor" stroke-width="2"/>
  <text x="450" y="42" font-size="11" text-anchor="middle" fill="currentColor">Vdd</text>
  <rect x="418" y="70" width="64" height="44" fill="#e0533d" fill-opacity="0.14" stroke="#e0533d" stroke-opacity="0.7"/>
  <text x="450" y="89" font-size="10" text-anchor="middle" fill="currentColor">PMOS</text>
  <text x="450" y="104" font-size="9" text-anchor="middle" fill="currentColor" fill-opacity="0.7">S top / D bottom</text>
  <line x1="450" y1="114" x2="450" y2="138" stroke="currentColor" stroke-width="2"/>
  <rect x="420" y="138" width="60" height="34" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-opacity="0.6"/>
  <text x="450" y="160" font-size="10" text-anchor="middle" fill="currentColor">Load</text>
  <line x1="450" y1="172" x2="450" y2="196" stroke="currentColor" stroke-width="2"/>
  <line x1="430" y1="196" x2="470" y2="196" stroke="currentColor" stroke-width="2"/>
  <text x="450" y="212" font-size="10" text-anchor="middle" fill="currentColor">GND</text>
  <text x="360" y="245" font-size="11" fill="currentColor">source = Vdd (high) → pull the gate</text>
  <text x="360" y="262" font-size="11" fill="currentColor">to GND to turn ON (simple)</text>
</svg>

- **High-side switch**: connects/disconnects Vdd from above the load. With a PMOS the source is Vdd, so it turns **ON by simply pulling the gate to GND** — no bootstrap or charge pump is needed, unlike a high-side NMOS. The trade-off is that $R_{DS(on)}$ is larger, so conduction loss is worse.
- **PMOS LDO**: for the pass PMOS, source = $V_{in}$, drain = $V_{out}$. Lowering the gate regulates $V_{out}$. Since the gate can be lowered nearly to GND, $V_{SD}$ can be made very small → **low dropout**. (An NMOS LDO needs a charge pump because the gate must be raised above $V_{out}+V_{th}$.)
- For **power switches**, because of mobility an NMOS has lower resistance for the same area, so NMOS is mostly used.

---

## Key takeaways

- PMOS = the **polarity-inverted counterpart** of NMOS. Carrier = hole, $V_{th}<0$, source = high side, and it turns ON only when the gate is pulled **below** the source.
- Viewed by magnitude ($V_{OV}=|V_{GS}|-|V_{th}|$), the table of the three regions (cutoff/triode/saturation) is **identical to NMOS.**
- The pinch-off and constant-current mechanisms are **completely identical to NMOS** (electron→hole, sign reversed).
- Because of mobility, $R_{DS(on)}$ is 2–3× higher → power switches favor NMOS, while PMOS shines in **high-side switches and LDOs** thanks to its simple gate drive.

---

*Reference: Device operating regions follow standard semiconductor device physics (Sedra/Smith, Razavi, etc.). The application context follows Erickson & Maksimović, Fundamentals of Power Electronics, 2nd Ed.*
