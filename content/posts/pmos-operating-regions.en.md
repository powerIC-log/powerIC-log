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

<svg viewBox="0 0 700 250" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>NMOS and PMOS cross-sections compared</title>
  <desc>NMOS has n+ source/drain in a p-substrate with an electron channel; PMOS has p+ source/drain in an n-substrate with a hole channel.</desc>
  <text x="20" y="24" font-size="12.5" font-weight="700" fill="#3b82f6">NMOS — electron channel</text>
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
    <text x="51" y="36" text-anchor="end" font-size="10" font-weight="700" fill="currentColor">S (low side)</text>
    <line x1="273" y1="60" x2="273" y2="40" stroke="currentColor" stroke-width="1.3"/>
    <text x="279" y="36" font-size="10" font-weight="700" fill="currentColor">D</text>
    <polygon points="88,60 242,60 242,70 88,70" fill="#3b82f6" fill-opacity="0.45" stroke="#3b82f6" stroke-opacity="0.8"/>
    <text x="165" y="88" text-anchor="middle" font-size="10.5" fill="#3b82f6">electrons e&#8315; →</text>
  </g>
  <text x="20" y="200" font-size="11" fill="currentColor">source sits at the low side · gate goes above the source to turn on</text>
  <text x="20" y="219" font-size="11" fill="currentColor">V_GS &gt; V_th (V_th positive)</text>
  <text x="360" y="24" font-size="12.5" font-weight="700" fill="#e0533d">PMOS — hole channel</text>
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
    <text x="51" y="36" text-anchor="end" font-size="10" font-weight="700" fill="currentColor">S (high side)</text>
    <line x1="273" y1="60" x2="273" y2="40" stroke="currentColor" stroke-width="1.3"/>
    <text x="279" y="36" font-size="10" font-weight="700" fill="currentColor">D</text>
    <polygon points="88,60 242,60 242,70 88,70" fill="#e0533d" fill-opacity="0.45" stroke="#e0533d" stroke-opacity="0.8"/>
    <text x="165" y="88" text-anchor="middle" font-size="10.5" fill="#e0533d">← holes h&#8314;</text>
  </g>
  <text x="360" y="200" font-size="11" fill="currentColor">source sits at the high side · gate goes below the source to turn on</text>
  <text x="360" y="219" font-size="11" fill="currentColor">V_GS &lt; V_th (V_th negative)</text>
  <line x1="332" y1="14" x2="332" y2="228" stroke="currentColor" stroke-opacity="0.25" stroke-dasharray="4 4"/>
  <text x="20" y="242" font-size="10.5" fill="currentColor" fill-opacity="0.7">Only n-type and p-type are swapped; the structure is symmetric. In the symbol the source arrow points the other way, and PMOS is often drawn with a bubble at the gate.</text>
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

<svg viewBox="0 0 640 640" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>PMOS (p-channel) cross-section in three conditions</title>
  <desc>Ohmic, pinch-off boundary and saturation on a PMOS cross-section. The source sits at the high side and holes flow from source to drain.</desc>
  <text x="20" y="16" font-size="10.5" fill="currentColor" fill-opacity="0.7">V_SG = 5V, |V_th| = 1V → V_OV = 4V (gate pulled 5V below the source to turn it on)</text>
  <text x="20" y="36" font-size="12.5" font-weight="700" fill="currentColor">① V_SD = 1V — channel reaches the drain · all of V_SD sits across it → resistor (triode)</text>
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
    <text x="310" y="92" text-anchor="middle" font-size="10" fill="#e0533d">hole channel h&#8314; — nearly uniform, S&#8594;D</text>
    <line x1="170" y1="160" x2="450" y2="160" stroke="#e0533d" stroke-width="1.4"/>
    <line x1="170" y1="156" x2="170" y2="164" stroke="#e0533d" stroke-width="1.4"/>
    <line x1="450" y1="156" x2="450" y2="164" stroke="#e0533d" stroke-width="1.4"/>
    <text x="310" y="176" text-anchor="middle" font-size="10" fill="#e0533d">conducting channel L&#8242; — 1V across it (all of V_SD)</text>
  </g>
  <text x="20" y="254" font-size="12.5" font-weight="700" fill="currentColor">② V_SD = V_OV = 4V — thickness reaches 0 at the drain → pinch-off (boundary)</text>
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
    <text x="386" y="92" font-size="9.5" fill="#3b82f6">thickness 0 here</text>
    <line x1="170" y1="160" x2="450" y2="160" stroke="#e0533d" stroke-width="1.4"/>
    <line x1="170" y1="156" x2="170" y2="164" stroke="#e0533d" stroke-width="1.4"/>
    <line x1="450" y1="156" x2="450" y2="164" stroke="#e0533d" stroke-width="1.4"/>
    <text x="310" y="176" text-anchor="middle" font-size="10" fill="#e0533d">conducting channel L&#8242; — 4V across it (= V_OV)</text>
  </g>
  <text x="20" y="472" font-size="12.5" font-weight="700" fill="currentColor">③ V_SD = 6V — the extra 2V goes to the depletion gap · the channel still sees only 4V → constant current</text>
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
    <text x="420" y="92" text-anchor="middle" font-size="9.5" fill="#3b82f6">depletion (extra 2V)</text>
    <line x1="170" y1="160" x2="390" y2="160" stroke="#e0533d" stroke-width="1.4"/>
    <line x1="170" y1="156" x2="170" y2="164" stroke="#e0533d" stroke-width="1.4"/>
    <line x1="390" y1="156" x2="390" y2="164" stroke="#e0533d" stroke-width="1.4"/>
    <text x="280" y="176" text-anchor="middle" font-size="10" fill="#e0533d">L&#8242; shortens — but still 4V across it</text>
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
