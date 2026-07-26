+++
title = "[Concept] PNP BJT Operating Regions — What Differs from NPN"
date = 2026-07-15T05:30:00+09:00
series = "Theory / Principle"
description = "The PNP is the polarity-flipped counterpart of the NPN. Start by pinning down how the carrier, emitter position, turn-on condition, and current direction are all reversed, then organize the three operating regions and its high-side use."
tags = ["개념정리", "BJT", "PNP", "device", "fundamentals"]
+++

## Intro

If you've read the earlier [BJT (npn) operating regions](../bjt-npn-operating-regions/), the PNP is almost done. **The PNP is the counterpart of the NPN with its polarity flipped wholesale** — the carrier is a hole instead of an electron, and the voltage and current directions are all reversed. The carrier tunnels through the thin base and the collector sweeps it up like a "vacuum cleaner": **the operating principle is completely identical to the NPN**.

So this post also focuses on *"what differs from NPN."* The PNP is often used as a **high-side switch** or, in things like bandgaps and mirrors, as a **high-side current source**.

---

## 1. At a glance — NPN vs PNP basic operation differences

| Item | NPN | PNP |
|------|-----|-----|
| Structure | **n-p-n** | **p-n-p** |
| Carrier injected by emitter | **electron** | **hole** |
| Emitter position (convention) | the **low side** of the circuit | the **high side** of the circuit |
| BE (emitter) turn-on condition | $V_{BE}\approx+0.7\text{V}$ (base **higher** than emitter) | $V_{EB}\approx+0.7\text{V}$ (base **lower** than emitter) |
| Base current direction | **flows into** the base | **flows out of** the base |
| Collector current direction | **into** the collector (C is high) | **out of** the collector (E is high) |
| Symbol emitter arrow | **outward** (npn) | **inward** (pnp) |
| Main use | low-side switch / amplification | **high-side** switch / current source |

**Key one line:** The PNP has its emitter on the **top (high side)**, and it turns on when the base is pulled **~0.7V below** the emitter. And the base current is in the **pull-out (outflowing)** direction. Everything else is the NPN reflected in a mirror.

---

## 2. Structure and symbol — only the polarity is flipped

<svg viewBox="0 0 640 320" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>NPN vs PNP structure and symbol</title>
  <desc>NPN is n-p-n, emitter arrow outward. PNP is p-n-p, emitter arrow inward. Current directions reversed.</desc>
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
  <text x="30" y="285" font-size="10.5" fill="currentColor" fill-opacity="0.8">Emitter arrow <tspan font-weight="700">outward</tspan> · emitter on low side</text>
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
  <text x="360" y="285" font-size="10.5" fill="currentColor" fill-opacity="0.8">Emitter arrow <tspan font-weight="700">inward</tspan> · emitter on high side</text>
</svg>

Only the n-type and p-type are swapped with each other. If you draw the NPN with the emitter on top (convention), the PNP again has the emitter on top, but the material is p+. In the symbol, the **emitter arrow direction** is decisive: **outward = npn, inward = pnp** (memorize it as "Pointing iN = PNP").

---

## 3. How to turn it on — viewing from the emitter reference

The PNP has its emitter attached to the **high side** (e.g., $V_{CC}$). If you pull the base **about 0.7V below** the emitter ($V_{EB}\approx0.7\text{V}$), the EB junction becomes forward-biased, and the emitter (p+) shoots **holes** into the base.

- The base current **flows outward.** That is, to turn it on you must **pull (sink)** current out of the base. (For the NPN you pushed current into the base.)
- Holes tunnel through the thin base → the collector sweeps them up → $I_C = \beta I_B$ (in magnitude). The direction is **emitter → collector** (conventional current), flowing out of the collector.

> **Intuition:** The NPN turns on by *raising* the base above the emitter and *pushing* current in. The PNP turns on by *lowering* the base below the emitter and *pulling* current out. Exactly the mirror image.

---

## 4. The three operating regions

The forward/reverse combinations of the two junctions (EB, CB) are the same as the NPN, only with the voltage signs reversed. ($V_{EC}$ = how much higher the emitter is than the collector)

| Region | EB junction | CB junction | What it does |
|------|---------|---------|---------|
| **Cutoff** | reverse (off) | reverse | switch **OFF** ($I_C\approx0$) |
| **Active** | forward (on) | reverse | **amplification / current source** ($I_C=\beta I_B$) |
| **Saturation** | forward (on) | forward | switch **ON** ($V_{EC}\approx0.2\text{V}$) |

- In **Active**, $V_{EC}$ is comfortably large (emitter higher than collector, CB reverse-biased), and it acts as a current source with $I_C=\beta I_B$.
- In **Saturation**, $V_{EC}$ drops all the way to a floor of $0.2\text{V}$ (CB also forward-biased), and $I_C$ is pinned to a value set by the external circuit.

Principles like carrier injection, tunneling through the thin base, the collector's "vacuum cleaner," and **"BC (here CB)-on is a symptom of the external circuit's limit"** are 100% identical to the [NPN post](../bjt-npn-operating-regions/) — you just read electron as hole and flip the signs.

---

## 5. Voltage–current curves and current flow by region

The vertical axis is the collector current $I_C$ and the horizontal axis is $V_{EC}$ (how much higher the emitter is than the collector). The curve shape is the same as the NPN; only the axis has changed to being **emitter-referenced**.

<svg viewBox="0 0 640 380" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>PNP output characteristics I_C vs V_EC</title>
  <desc>Steep saturation below V_EC 0.2V, then flat active. Curve height is set by I_B.</desc>
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
  <text x="566" y="86" font-size="11" fill="#e0533d">I_B large</text>
  <path d="M70,290 Q98,160 125,160 L560,150" fill="none" stroke="#e0533d" stroke-width="2.4" stroke-opacity="0.7"/>
  <text x="566" y="154" font-size="11" fill="#e0533d" opacity="0.8">I_B mid</text>
  <path d="M70,290 Q96,220 125,220 L560,212" fill="none" stroke="#e0533d" stroke-width="2.4" stroke-opacity="0.45"/>
  <text x="566" y="216" font-size="11" fill="#e0533d" opacity="0.65">I_B small</text>
  <text x="97" y="75" text-anchor="middle" font-size="11" font-weight="700" fill="#f59e0b" transform="rotate(-90 97 165)">SATURATION (switch ON)</text>
  <text x="360" y="272" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor" fill-opacity="0.85">ACTIVE (current source)</text>
  <text x="185" y="120" font-size="11" fill="currentColor" fill-opacity="0.85">flat → I_C stays even as V_EC rises (= β·I_B)</text>
  <text x="140" y="345" font-size="11" fill="#f59e0b">◀ narrow steep region: external circuit sets I_C</text>
  <line x1="430" y1="210" x2="430" y2="90" stroke="currentColor" stroke-opacity="0.5" stroke-dasharray="3 3" marker-end="url(#ca2)"/>
  <text x="437" y="150" font-size="10.5" fill="currentColor" fill-opacity="0.7">I_B ↑</text>
</svg>

Now let's see, region by region, **where the voltage is applied and how the holes flow**.

<svg viewBox="0 0 640 470" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>PNP bias and hole current flow by region</title>
  <desc>For each of Cutoff/Active/Saturation, the E·B·C voltages, hole current path, and base current direction.</desc>
  <defs>
    <marker id="ph3" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e0533d"/></marker>
    <marker id="bc3" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#3b82f6"/></marker>
  </defs>
  <g transform="translate(0,20)">
    <text x="10" y="12" font-size="12.5" font-weight="700" fill="currentColor">① Cutoff — base as high as emitter (V_EB=0) → OFF</text>
    <rect x="60" y="32" width="95" height="58" rx="4" fill="#e0533d" fill-opacity="0.28" stroke="currentColor" stroke-opacity="0.5"/>
    <text x="107" y="58" font-size="11" text-anchor="middle" fill="currentColor">E (p+)</text>
    <rect x="155" y="32" width="24" height="58" fill="#3b82f6" fill-opacity="0.2" stroke="currentColor" stroke-opacity="0.5"/>
    <rect x="179" y="32" width="120" height="58" rx="4" fill="#e0533d" fill-opacity="0.16" stroke="currentColor" stroke-opacity="0.5"/>
    <text x="239" y="58" font-size="11" text-anchor="middle" fill="currentColor">C (p)</text>
    <text x="167" y="104" font-size="9" text-anchor="middle" fill="currentColor" fill-opacity="0.7">B(n)</text>
    <text x="330" y="46" font-size="11" fill="currentColor">E=5V · B=5V · C=1V</text>
    <text x="330" y="65" font-size="11" fill="#e0533d">V_EB = 0 → EB not turned on</text>
    <text x="330" y="84" font-size="11" fill="currentColor">I_C ≈ 0</text>
  </g>
  <g transform="translate(0,170)">
    <text x="10" y="12" font-size="12.5" font-weight="700" fill="currentColor">② Active — base pulled 0.7V lower · V_EC ample → hole injection, I_C=β·I_B</text>
    <rect x="60" y="32" width="95" height="58" rx="4" fill="#e0533d" fill-opacity="0.28" stroke="currentColor" stroke-opacity="0.5"/>
    <text x="107" y="58" font-size="11" text-anchor="middle" fill="currentColor">E (p+)</text>
    <rect x="155" y="32" width="24" height="58" fill="#3b82f6" fill-opacity="0.2" stroke="currentColor" stroke-opacity="0.5"/>
    <rect x="179" y="32" width="120" height="58" rx="4" fill="#e0533d" fill-opacity="0.16" stroke="currentColor" stroke-opacity="0.5"/>
    <text x="239" y="58" font-size="11" text-anchor="middle" fill="currentColor">C (p)</text>
    <line x1="115" y1="61" x2="285" y2="61" stroke="#e0533d" stroke-width="2.4" marker-end="url(#ph3)"/>
    <text x="205" y="53" font-size="9.5" text-anchor="middle" fill="#e0533d">hole h⁺ →</text>
    <line x1="167" y1="90" x2="167" y2="116" stroke="#3b82f6" stroke-width="2" marker-end="url(#bc3)"/>
    <text x="200" y="112" font-size="9" fill="#3b82f6">I_B ↓ pulled out</text>
    <text x="330" y="46" font-size="11" fill="currentColor">E=5V · B=4.3V · C=1V</text>
    <text x="330" y="65" font-size="11" fill="#e0533d">V_EB=0.7 · V_EC=4</text>
    <text x="330" y="84" font-size="11" fill="currentColor">I_C=β·I_B (out of collector)</text>
  </g>
  <g transform="translate(0,320)">
    <text x="10" y="12" font-size="12.5" font-weight="700" fill="currentColor">③ Saturation — V_EC at 0.2V floor, CB also forward → switch ON</text>
    <rect x="60" y="32" width="95" height="58" rx="4" fill="#e0533d" fill-opacity="0.28" stroke="currentColor" stroke-opacity="0.5"/>
    <text x="107" y="58" font-size="11" text-anchor="middle" fill="currentColor">E (p+)</text>
    <rect x="155" y="32" width="24" height="58" fill="#3b82f6" fill-opacity="0.2" stroke="currentColor" stroke-opacity="0.5"/>
    <rect x="179" y="32" width="120" height="58" rx="4" fill="#e0533d" fill-opacity="0.16" stroke="currentColor" stroke-opacity="0.5"/>
    <text x="239" y="58" font-size="11" text-anchor="middle" fill="currentColor">C (p)</text>
    <line x1="115" y1="61" x2="285" y2="61" stroke="#e0533d" stroke-width="2.4" marker-end="url(#ph3)"/>
    <text x="205" y="53" font-size="9.5" text-anchor="middle" fill="#e0533d">hole h⁺ →</text>
    <line x1="167" y1="90" x2="167" y2="116" stroke="#3b82f6" stroke-width="2" marker-end="url(#bc3)"/>
    <text x="330" y="46" font-size="11" fill="currentColor">E=5V · B=4.3V · C=4.8V</text>
    <text x="330" y="65" font-size="11" fill="#e0533d">V_EC ≈ 0.2V (floor)</text>
    <text x="330" y="84" font-size="11" fill="currentColor">I_C = set by external circuit</text>
  </g>
</svg>

- **Cutoff**: $V_{EB}=0$ (base as high as the emitter) → EB not turned on → no current.
- **Active**: base pulled ~0.7V below the emitter ($V_{EB}=0.7$) + $V_{EC}$ ample → the emitter shoots holes and they tunnel through the base → the collector sweeps them up. $I_C=\beta I_B$, flowing out of the collector (current source, flat).
- **Saturation**: $V_{EC}$ drops all the way to a floor of $0.2\text{V}$ (CB also forward-biased) → $I_C$ is pinned to a value set by the external circuit (switch ON).

> Holes flow **from the emitter (high voltage) to the collector (low voltage)**, and the base current **drains outward** — the opposite direction from the NPN, where electrons flowed emitter→collector and current entered the base.

---

## 6. In practice

- **High-side switch / current source**: attach the emitter to $V_{CC}$ and pull the base down (draw current out) to turn it on. Good for controlling supply from above the load.
- **Bandgap / current mirror**: use a PNP when you need a current source on the top (supply side). An NPN current source sits well on the bottom (GND side), and a PNP sits well on top — you use the two as a pair.
- **IC process note**: in standard CMOS/bipolar, the PNP is often built as a **lateral** device, so its $\beta$ is low and it is slow. That's why high-performance amplification and the main switch prefer the NPN, and the PNP mostly plays auxiliary, high-side roles.

---

## Key takeaways

- PNP = the **polarity-inverted counterpart** of the NPN. carrier = hole, emitter = high side; pull the base **~0.7V below** the emitter and **draw current out** to turn it ON.
- The three-region (cutoff/active/saturation) table is the same as the NPN, **only with the voltage signs reversed** (viewed via $V_{EC}$, with $V_{EC}\approx0.2\text{V}$ in saturation).
- The principles of carrier injection, current source, and "saturation is the external circuit's limit" are **completely identical** to the NPN (electron→hole, signs reversed).
- The symbol is **emitter arrow inward = PNP.** In ICs, low-$\beta$ lateral devices are common, so it is used mainly for high-side and auxiliary roles.

---

*Reference: Device operating regions follow standard semiconductor device physics (Sedra/Smith, Razavi, etc.). Application context follows Erickson & Maksimović, Fundamentals of Power Electronics, 2nd Ed.*
