+++
title = "[Concept] BJT (npn) Operating Regions — cutoff · active · saturation"
date = 2026-07-14T06:00:00+09:00
series = "Theory / Principle"
description = "Which region an npn BJT operates in, organized by the forward/reverse bias of its two junctions (BE·BC). Including why Ic flows even though BC is reverse-biased, and why Vce is not a value you get to set."
tags = ["개념정리", "BJT", "device", "npn", "fundamentals"]
+++

## Intro

This is the companion to the earlier [MOSFET operating regions](../mosfet-operating-regions/) writeup. The BJT is always alive inside an IC — in bandgap references, current mirrors, bias circuits, and even as the pass device in old linear regulators.

Mapping it to the n-channel MOSFET, we pin down the three regions <span class="pt">cutoff / active / saturation</span> for the npn BJT from the perspective of *forward/reverse bias of the two junctions*. The key points are especially **why collector current flows even though the BC junction is reverse-biased**, and that **Vce is not a value you set directly**.

---

## 1. Structure — the n-p-n sandwich

A BJT is a three-layer sandwich of semiconductor stacked in the order **n / p / n**. Three layers means three terminals — **E** (emitter), **B** (base), **C** (collector). The two boundaries the three layers create are exactly the **BE junction** and the **BC junction**.

<svg viewBox="0 0 620 360" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>npn BJT physical structure and circuit symbol</title>
  <desc>n-p-n sandwich: emitter(n+)/base(p, thin)/collector(n), and the npn symbol with the emitter arrow pointing outward.</desc>
  <text x="10" y="20" font-size="13" font-weight="700" fill="currentColor">① Physical structure — the n-p-n sandwich</text>
  <!-- Collector n -->
  <rect x="120" y="40" width="180" height="60" rx="5" fill="#3b82f6" fill-opacity="0.15" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="210" y="66" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">Collector (n)</text>
  <text x="210" y="84" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">receives electrons</text>
  <!-- Base p thin -->
  <rect x="120" y="100" width="180" height="34" fill="#f59e0b" fill-opacity="0.22" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="210" y="122" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Base (p) · thin</text>
  <!-- Emitter n+ -->
  <rect x="120" y="134" width="180" height="60" rx="5" fill="#3b82f6" fill-opacity="0.30" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="210" y="160" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">Emitter (n+)</text>
  <text x="210" y="178" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">emits electrons</text>
  <!-- junction labels -->
  <line x1="300" y1="100" x2="340" y2="100" stroke="currentColor" stroke-opacity="0.5" stroke-dasharray="3 3"/>
  <text x="345" y="104" font-size="10.5" fill="currentColor" fill-opacity="0.75">BC junction</text>
  <line x1="300" y1="134" x2="340" y2="134" stroke="#16a34a" stroke-opacity="0.7" stroke-dasharray="3 3"/>
  <text x="345" y="138" font-size="10.5" fill="#16a34a">BE junction</text>
  <!-- terminals -->
  <line x1="120" y1="70" x2="80" y2="70" stroke="currentColor" stroke-width="2"/>
  <text x="66" y="75" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">C</text>
  <line x1="120" y1="117" x2="80" y2="117" stroke="currentColor" stroke-width="2"/>
  <text x="66" y="122" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">B</text>
  <line x1="120" y1="164" x2="80" y2="164" stroke="currentColor" stroke-width="2"/>
  <text x="66" y="169" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">E</text>
  <!-- diode mental model -->
  <text x="10" y="228" font-size="12" font-weight="700" fill="currentColor">Easy mnemonic: two diodes back-to-back (sharing the middle p)</text>
  <text x="10" y="248" font-size="11.5" fill="currentColor" fill-opacity="0.8">C —▷|— B —|◁— E  · but the base is thin, so the two diodes interact → transistor</text>
  <!-- symbol -->
  <text x="360" y="228" font-size="13" font-weight="700" fill="currentColor">② Circuit symbol (npn)</text>
  <line x1="450" y1="256" x2="450" y2="336" stroke="currentColor" stroke-width="3"/>
  <line x1="405" y1="296" x2="450" y2="296" stroke="currentColor" stroke-width="2"/>
  <text x="393" y="301" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">B</text>
  <line x1="450" y1="276" x2="500" y2="248" stroke="currentColor" stroke-width="2"/>
  <text x="508" y="252" font-size="12" font-weight="700" fill="currentColor">C</text>
  <line x1="450" y1="316" x2="500" y2="344" stroke="currentColor" stroke-width="2"/>
  <text x="508" y="344" font-size="12" font-weight="700" fill="currentColor">E</text>
  <path d="M486,326 L500,344 L482,340 Z" fill="#16a34a"/>
  <text x="360" y="300" font-size="10.5" fill="currentColor" fill-opacity="0.75">emitter arrow points outward → npn</text>
  <text x="360" y="316" font-size="10.5" fill="currentColor" fill-opacity="0.6">("Not Pointing iN")</text>
</svg>

The doping is also deliberately made different: **the emitter is heavily doped (n+)** — to emit electrons hard. **The base is thin and lightly doped** — so the emitted electrons just pass through. **The collector is wide** — to catch the electrons and withstand heat.

---

## 2. Two junctions, three regions

The operating region is determined by **whether each of the two junctions (BE·BC) is forward- or reverse-biased**. A silicon junction turns on in earnest when the forward voltage reaches roughly $0.7\text{V}$ ($V_{BE}\approx0.7\text{V}$).

| Region | BE junction | BC junction | What it does |
|------|---------|---------|---------|
| **Cutoff** | reverse (off) | reverse (off) | switch **OFF** ($I_C\approx0$) |
| **Active** | forward (on) | reverse (off) | **amplification / current source** ($I_C=\beta I_B$) |
| **Saturation** | forward (on) | forward (on) | switch **ON** ($V_{CE}\approx0.2\text{V}$) |

- **Cutoff**: if $V_{BE}$ fails to exceed $0.6\!\sim\!0.7\text{V}$, BE never turns on, so there is no current in either the base or the collector.
- **Active**: BE forward + BC reverse. The region that amplifies a signal, behaving like a current source.
- **Saturation**: both junctions forward. Like a fully closed switch, with $V_{CE}$ dropped all the way to the floor ($\approx0.2\text{V}$).

---

## 3. Active — why $I_C$ flows even though BC is reverse-biased

The most confusing point. **"BC reverse-biased" absolutely does NOT mean "there is no current in the collector."** Even though it is reverse-biased, $I_C$ gushes through.

<svg viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>Carrier injection path in the npn active region</title>
  <desc>Electrons emitted by the emitter pass through the thin base, and the BC reverse-bias field sweeps them into the collector, becoming Ic.</desc>
  <!-- Emitter -->
  <rect x="50" y="60" width="130" height="120" rx="5" fill="#3b82f6" fill-opacity="0.28" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="115" y="95" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">Emitter</text>
  <text x="115" y="113" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.7">n+</text>
  <!-- Base thin -->
  <rect x="180" y="60" width="40" height="120" fill="#f59e0b" fill-opacity="0.24" stroke="currentColor" stroke-opacity="0.5"/>
  <text x="200" y="200" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Base</text>
  <text x="200" y="216" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity="0.7">p · thin</text>
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
  <text x="255" y="112" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.75">most pass through → collector sweeps them up</text>
  <!-- base recombination -->
  <line x1="200" y1="120" x2="200" y2="172" stroke="#f59e0b" stroke-width="2" marker-end="url(#bh)"/>
  <text x="206" y="158" font-size="10" fill="#f59e0b">a few (I_B)</text>
  <!-- reverse depletion label -->
  <text x="230" y="205" font-size="10" fill="currentColor" fill-opacity="0.6">BC reverse depletion region (wide)</text>
  <!-- callouts -->
  <text x="30" y="250" font-size="11.5" fill="currentColor">① BE forward (V_BE≈0.7V): the emitter <tspan font-weight="700">shoots</tspan> electrons into the base</text>
  <text x="30" y="270" font-size="11.5" fill="currentColor">② the base is thin, so most electrons <tspan font-weight="700">pass through</tspan> (only a few leak off as I_B)</text>
  <text x="30" y="290" font-size="11.5" fill="currentColor">③ the BC reverse-bias field <tspan font-weight="700" fill="#16a34a">sweeps</tspan> those electrons into the collector = I_C</text>
</svg>

The collector current does not flow *"because the BC diode turned on in the forward direction."* It is **the electrons the emitter shot into the base** that flow.

1. **BE forward** ($V_{BE}\approx0.7\text{V}$) → the emitter (n+) pushes a flood of electrons into the base.
2. The base is **very thin** → the electrons just pass through before they can recombine. Only a tiny fraction leaks off into the base as $I_B$; the rest go straight through.
3. When the passed-through electrons reach the BC boundary → the collector is pulling with a + potential (**reverse-bias field**), so it sweeps those electrons into the collector. This is $I_C$.

So **BC reverse bias, far from blocking $I_C$, actually helps it like a vacuum cleaner.** And what sets $I_C$ is *how much the emitter shot*, i.e. $I_B$ ($\approx V_{BE}$). No matter how hard the collector sucks (whether $V_{CE}$ is 2V or 5V), $I_C$ stays the same.

$$\boxed{\,I_C = \beta\, I_B \quad(\text{in the active region only})\,}$$

This is the **current-source** property — exactly the same principle as when $I_D$ in MOSFET saturation stayed flat regardless of $V_{DS}$.

---

## 4. The three regions seen through the output characteristics

Plotting $V_{CE}$ on the horizontal axis and $I_C$ on the vertical axis gives a curve that is a dead ringer for the MOSFET's $I_D\!-\!V_{DS}$ curve.

<svg viewBox="0 0 640 380" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>BJT output characteristics I_C vs V_CE</title>
  <desc>Steep saturation below Vce 0.2V, then flat active. Curve height is set by Ib.</desc>
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
  <text x="566" y="86" font-size="11" fill="#3b82f6">I_B large</text>
  <path d="M70,290 Q98,160 125,160 L560,150" fill="none" stroke="#3b82f6" stroke-width="2.4" stroke-opacity="0.7"/>
  <text x="566" y="154" font-size="11" fill="#3b82f6" opacity="0.8">I_B mid</text>
  <path d="M70,290 Q96,220 125,220 L560,212" fill="none" stroke="#3b82f6" stroke-width="2.4" stroke-opacity="0.45"/>
  <text x="566" y="216" font-size="11" fill="#3b82f6" opacity="0.65">I_B small</text>
  <!-- region labels -->
  <text x="97" y="75" text-anchor="middle" font-size="11" font-weight="700" fill="#f59e0b" transform="rotate(-90 97 165)">SATURATION (switch ON)</text>
  <text x="360" y="272" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor" fill-opacity="0.85">ACTIVE (amplification / current source)</text>
  <text x="185" y="120" font-size="11" fill="currentColor" fill-opacity="0.85">flat → I_C stays put even as V_CE rises (= β·I_B)</text>
  <text x="140" y="345" font-size="11" fill="#f59e0b">◀ this narrow, steep region: sensitive to V_CE, external circuit sets I_C</text>
  <!-- Ib arrow -->
  <line x1="430" y1="210" x2="430" y2="90" stroke="currentColor" stroke-opacity="0.5" stroke-dasharray="3 3" marker-end="url(#ca)"/>
  <text x="437" y="150" font-size="10.5" fill="currentColor" fill-opacity="0.7">I_B ↑</text>
</svg>

- **The wide flat region on the right = Active.** Raising $V_{CE}$ leaves the curve height ($I_C$) unchanged → $V_{CE}$ is irrelevant. What sets the height is *which curve you are on*, i.e. $I_B$. → $I_C=\beta I_B$.
- **The narrow, steep region on the left ($V_{CE}<0.2\text{V}$) = Saturation.** Even a small change in $V_{CE}$ makes $I_C$ swing sharply → here $I_C$ cannot climb all the way to $\beta I_B$ and is held down at **the value the external circuit sets**.

The shape is the same as the MOSFET's, and **only the name for the flat region is reversed**.

| | Steep region on the left | Flat region on the right |
|---|---|---|
| **MOSFET** | Triode ($V_{DS}$-dominated) | **Saturation** ($V_{GS}$-dominated, flat) |
| **BJT** | **Saturation** ($V_{CE}$-dominated) | Active ($I_B$-dominated, flat) |

---

## 5. $V_{CE}$ is not a value you set

A common misconception. In a real circuit, **$V_{CE}$ is not a knob but a result**. The only things you set are exactly two.

- **Inputs (you set):** $I_B$ (base drive), plus the circuit constants $V_{CC}$ and the collector load resistor $R$
- **Results (the circuit sets):** $I_C$, and $V_{CE}$

By KVL on the collector side:

$$V_{CE} = V_{CC} - I_C\,R$$

The order of reading matters. ① You set $I_B$ → ② if active, $I_C=\beta I_B$ fixes the collector current → ③ that $I_C$ drops a voltage across $R$, and $V_{CE}$ pops out as *what is left over*. In other words, you cannot touch $V_{CE}$ directly.

That is why region transitions happen like this.

- $I_B$ small → $I_C$ small → small drop across $R$ → $V_{CE}$ large → **active**
- Increase $I_B$ → $I_C$↑ → $V_{CE}$↓
- Increase $I_B$ further → once $V_{CE}$ falls to $0.2\text{V}$ it can go no lower → **saturation**. At this point, even if you push more $I_B$, $I_C$ is

$$I_{C,\text{sat}} \approx \frac{V_{CC}-V_{CE,\text{sat}}}{R} \approx \frac{V_{CC}-0.2}{R}$$

tied to this and grows no further. (The $\beta I_B$ relationship breaks down = "saturation.")

> The horizontal-axis-$V_{CE}$ curve in Section 4 is a **characteristic map** drawn in the lab by forcibly sweeping $V_{CE}$. In a real circuit you only turn $I_B$, and a load line ($V_{CE}=V_{CC}-I_C R$) is drawn across that map so that **a single operating point is placed automatically.**

### Why current is limited in saturation — BC-on is a symptom, not the cause

Here is the key twist. **The BJT does not block the current on its own.** BC-on is merely the signal that "the external circuit can no longer supply more."

1. **The transistor tries to pass $\beta I_B$.** In active, the collector cleans up like a vacuum cleaner all the electrons the emitter shoots, so it tries to drive $I_C$ all the way up to $\beta I_B$.
2. **But the maximum the collector can actually pass is set by the external circuit.** $I_C=(V_{CC}-V_{CE})/R$, and since $V_{CE}$ cannot go below $0.2\text{V}$, the physical ceiling is $(V_{CC}-0.2)/R$.
3. **The moment you raise $I_B$ until the "demand" ($\beta I_B$) is about to exceed the "supply ceiling"** → the circuit says "I can't give any more" → $V_{CE}$ slams into the $0.2\text{V}$ floor → the collector falls below the base, so **the BC junction becomes forward (on)**.
4. That is, **BC-on is evidence that "the external circuit limit has been reached."** In this state, pushing more $I_B$ does not increase $I_C$ (it is tied to the ceiling), and the vacuum cleaner (reverse-bias field) is gone too, so the leftover electrons pile up in the base and are wasted.

> **Faucet + thin-pipe analogy:** $I_B$ = how far you open the valve (open it and water $I_C$ wants to come out at $\beta$ times), supply pipe = $V_{CC}\cdot R$ (the amount of water it can deliver per second is fixed). **Open the valve moderately** and the valve is the bottleneck → the flow = what the valve sets = **active** ($I_C=\beta I_B$). **Open it too wide** and now the pipe is the bottleneck → opening the valve more leaves the flow unchanged = **saturation**. At this point the pressure difference across the valve ($V_{CE}$) collapses to nearly 0 (a fully open switch). **What limits it is the pipe (external circuit), and BC-on is merely evidence that the valve is opened wider than the pipe.**

---

## 6. Pitfall — "saturation" is the exact opposite of the MOSFET

| Function | BJT | MOSFET |
|------|-----|--------|
| off (OFF) | **cutoff** | **cutoff** |
| fully on (switch ON) | **saturation** | **triode** |
| amplification (current source) | **active** | **saturation** |

- **BJT saturation = the fully-on switch** region
- **MOSFET saturation = the amplification** region

> <span class="pt">They are exact opposites.</span> "BJT saturation" pairs with "MOSFET triode," and "BJT active" pairs with "MOSFET saturation." Since this is a frequent source of confusion in datasheets and circuit conversations, if you first recall the function as **"the flat current-source region"** / **"the hard-on switch region,"** you won't be fooled by the names.

---

## 7. In practice

| Use case | Required characteristic | BJT region | MOSFET region |
|--------|-------------|----------|-------------|
| **LDO pass** (linear regulation) | flat like a current source | **Active** | **Saturation** |
| **Switch** (on/off) | fully on so $V_{CE}/V_{DS}\approx0$ | **Saturation** | **Triode** |

- **Bandgap · current mirror · bias**: use the BJT in **active** (current source). The flatness of $I_C=\beta I_B$ is exactly what makes a good current source.
- **BJT switch** (gate driver, simple on/off): drive it into **saturation** with $V_{CE,\text{sat}}\approx0.2\text{V}$. This $0.2\text{V}\times I_C$ is the conduction loss.
- Whether BJT or MOSFET, the pass device in an LDO ultimately drops $(V_{in}-V_{out})$ in **"the flat current-source region"** and burns it as heat → efficiency $\eta=V_{out}/V_{in}$.

---

## Key takeaways

- The region is determined by the **forward/reverse bias of the two junctions (BE·BC)**: cutoff (both reverse) · active (BE forward · BC reverse) · saturation (both forward).
- **$I_C$ flows even though BC is reverse-biased** — the collector sweeps up the electrons the emitter shot. $I_C=\beta I_B$, independent of $V_{CE}$ → current source.
- You cannot set $V_{CE}$. The input is $I_B$, and $V_{CE}=V_{CC}-I_C R$ comes out as the result.
- In saturation, $I_C$ is tied to $(V_{CC}-0.2)/R$ and becomes smaller than $\beta I_B$.
- **BJT saturation ≠ MOSFET saturation** (exact opposites). The LDO pass device is active for a BJT and saturation for a MOSFET — the same "flat current-source region."

---

*Reference: Device operating regions follow standard semiconductor device physics (Sedra/Smith, Razavi, etc.). The converter/regulator application context follows Erickson & Maksimović, Fundamentals of Power Electronics, 2nd Ed.*
