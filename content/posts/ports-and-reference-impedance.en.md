+++
title = "[Concept] 50Ω and ports — the groundwork for S-parameters"
date = 2026-07-24T13:00:00
series = "Theory / Principle"
description = "Why is 50Ω 50, and what exactly is a port? Both are short, but they lay down the language of S-parameters — incident/emerging waves and reference impedance. Including why matched termination is needed."
tags = ["개념정리", "S-parameter", "port", "impedance", "RF", "fundamentals"]
+++

## Intro

50Ω and ports each get a single page in the book. Nothing to dig deep into. But the two of them **lay down the language of S-parameters**, so nailing the concepts before moving on makes what follows much smoother.

> **Reference** — *RF 기초강의실 (The Basic of RF)*, Ch. 1 "Fundamentals," Chapter 01 *Why 50 ohms*, Chapter 03 *The exact meaning of a port* (pp. 17, 22).

---

## 1. Why 50Ω — honestly, not much to it

For coaxial cable (air dielectric):

| Impedance | Good for |
|---|---|
| about 30–33Ω | **maximum power handling** |
| about 75–77Ω | **minimum loss (attenuation)** |
| **50Ω** | the **compromise** (geometric mean √(30×77) ≈ 48 → 50 for convenience) |

That's the whole story. "Why exactly 50" ends with this one compromise.

### The part that actually matters — "reference impedance"

The useful point isn't "why 50," it's this:

> **50Ω = the universal reference impedance of the RF world (Z₀).**

Every instrument, connector, cable, and S-parameter is **standardized to 50Ω**. So what matters is the fact that "everything is matched to 50Ω," and that connects to:

- **S-parameters** — defined against Z₀ = 50Ω in the first place
- **Impedance matching** — matching to 50Ω for max power transfer and minimum reflection
- **Preamp verification** — matching impedance so the head-to-preamp interconnect and termination don't create reflections

---

## 2. Ports — gateways where waves enter and leave

**A port = a defined gateway where a signal (wave) enters and leaves.** Physically it's where you attach a connector/cable, and each port carries a reference impedance of **50Ω**.

Low-frequency circuits are thought of in **node voltages and branch currents**. RF, by contrast, treats signals as waves rolling around, so we think in **the wave entering and the wave leaving a port**. That's the key shift in mindset.

### Two waves at each port

| Symbol | Name | Direction |
|---|---|---|
| **a** | incident wave | **into** the port |
| **b** | emerging wave | **out of** the port |

If it comes back out the same port it's "reflection," if it emerges from the opposite port it's "transmission" — both are b.

---

## 3. The 2-port and S-parameters

Most devices (amplifiers, filters, cables) are two ports: input (port 1) and output (port 2).

<svg viewBox="0 0 640 180" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>A 2-port network — the incident wave a and emerging wave b at each port</title>
  <desc>a1 enters port1 and emerges as b1 (reflection) and b2 (transmission); a2 may enter port2.</desc>
  <rect x="240" y="60" width="160" height="70" rx="10" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.4"/>
  <text x="320" y="100" text-anchor="middle" font-size="13" fill="currentColor">device (2-port)</text>
  <text x="120" y="34" text-anchor="middle" font-size="12" fill="currentColor" fill-opacity="0.7">port 1</text>
  <text x="520" y="34" text-anchor="middle" font-size="12" fill="currentColor" fill-opacity="0.7">port 2</text>
  <g stroke-width="2" fill="none">
    <path d="M95 80 L238 80" stroke="#3b82f6" marker-end="url(#ma)"/>
    <path d="M238 112 L95 112" stroke="#e0533d" marker-end="url(#mb)"/>
    <path d="M402 80 L545 80" stroke="#e0533d" marker-end="url(#mb)"/>
    <path d="M545 112 L402 112" stroke="#3b82f6" marker-end="url(#ma)"/>
  </g>
  <g font-size="12" text-anchor="middle">
    <text x="150" y="72" fill="#3b82f6">a₁ incident</text>
    <text x="150" y="128" fill="#e0533d">b₁ reflection</text>
    <text x="495" y="72" fill="#e0533d">b₂ transmission</text>
    <text x="495" y="128" fill="#3b82f6">a₂ returning</text>
  </g>
  <defs>
    <marker id="ma" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#3b82f6"/></marker>
    <marker id="mb" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#e0533d"/></marker>
  </defs>
</svg>

S-parameters are, in the end, **the emerging waves (b) tied to the incident waves (a)**:

$$b = S \cdot a$$

$$S_{11}=\frac{b_1}{a_1},\quad S_{21}=\frac{b_2}{a_1},\quad S_{12}=\frac{b_1}{a_2},\quad S_{22}=\frac{b_2}{a_2}$$

- **First digit = the port it emerges from, second = the port it entered.** (S₂₁ = out of 2 ← in from 1)
- Reflection (S₁₁, S₂₂) = comes back out its own port / transmission (S₂₁, S₁₂) = crosses to the other port

---

## 4. Matched termination — to measure S₂₁ cleanly

S₂₁ = b₂/a₁ is a definition that only holds **when a₂ = 0**. Why is this condition needed?

The full expression for the wave emerging from port 2 is:

$$b_2 = S_{21}\,a_1 + S_{22}\,a_2$$

- First term $S_{21}a_1$ = the **pure transmission** from port 1 (what we want)
- Second term $S_{22}a_2$ = **a₂ that returned, reflected again** (the intruder)

### Where does a₂ come from — it arises by reflection

The key is that **a₂ need not be "a wave you sent" — it can be the emerging wave b₂ that bounced back off the termination**.

$$a_1 \to b_2 \to (\text{reflected at the port-2 termination}) \to a_2$$

<svg viewBox="0 0 640 200" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>Matched vs mismatched termination — whether a2 appears</title>
  <desc>A 50Ω termination absorbs b2 so a2=0; a mismatch reflects b2 so a2 appears.</desc>
  <text x="60" y="40" font-size="12" fill="#3b82f6">matched (50Ω)</text>
  <rect x="60" y="52" width="70" height="40" rx="6" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.4"/>
  <text x="95" y="76" text-anchor="middle" font-size="11" fill="currentColor">port2</text>
  <path d="M135 72 L360 72" stroke="#e0533d" stroke-width="2" fill="none" marker-end="url(#mb2)"/>
  <text x="245" y="64" text-anchor="middle" font-size="11" fill="#e0533d">b₂</text>
  <rect x="365" y="52" width="90" height="40" rx="6" fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-opacity="0.5"/>
  <text x="410" y="70" text-anchor="middle" font-size="11" fill="currentColor">50Ω absorbs</text>
  <text x="410" y="84" text-anchor="middle" font-size="10" fill="currentColor" fill-opacity="0.7">no reflection</text>
  <text x="500" y="76" font-size="12" fill="#3b82f6">→ a₂ = 0 ✓</text>
  <text x="60" y="140" font-size="12" fill="#e0533d">mismatched (≠50Ω)</text>
  <rect x="60" y="152" width="70" height="40" rx="6" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.4"/>
  <text x="95" y="176" text-anchor="middle" font-size="11" fill="currentColor">port2</text>
  <path d="M135 166 L360 166" stroke="#e0533d" stroke-width="2" fill="none" marker-end="url(#mb2)"/>
  <text x="245" y="158" text-anchor="middle" font-size="11" fill="#e0533d">b₂</text>
  <path d="M360 182 L135 182" stroke="#3b82f6" stroke-width="2" fill="none" marker-end="url(#ma2)"/>
  <text x="245" y="197" text-anchor="middle" font-size="11" fill="#3b82f6">a₂ (reflected)</text>
  <rect x="365" y="152" width="90" height="40" rx="6" fill="#e0533d" fill-opacity="0.12" stroke="#e0533d" stroke-opacity="0.5"/>
  <text x="410" y="176" text-anchor="middle" font-size="11" fill="currentColor">reflects like a wall</text>
  <text x="500" y="176" font-size="12" fill="#e0533d">→ a₂ ≠ 0 ✗</text>
  <defs>
    <marker id="mb2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#e0533d"/></marker>
    <marker id="ma2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#3b82f6"/></marker>
  </defs>
</svg>

- **Terminate port 2 in 50Ω** → b₂ is fully absorbed → no reflection → **a₂ = 0**
- **Mismatch** → part of b₂ reflects like off a wall and returns → **a₂ ≠ 0**

So with a matched termination the second term vanishes, giving $b_2 = S_{21}a_1$, i.e. a clean $S_{21}=b_2/a_1$.

> **One-line intuition:** picture b₂ as a ball rolled out of port 2 — a **sandpit (50Ω)** buries it (no return, a₂=0), a **wall (mismatch)** bounces it back (a₂≠0). Matched termination lays down the sandpit so you measure pure transmission only.

---

## Key takeaways

- **50Ω** = the compromise between 30Ω (power) and 77Ω (low loss). But the real point is the **universal reference impedance (Z₀)** — everything is standardized to 50Ω.
- **Port** = a 50Ω-referenced gateway for waves. Each port has an **incident wave a** (in) and an **emerging wave b** (out).
- **S-parameters tie b to a.** The subscripts read "emerging port ← entering port" (S₂₁ = b₂/a₁).
- **Matched termination**: cap port 2 with 50Ω to kill the b₂ reflection, forcing **a₂=0**. Otherwise $b_2=S_{21}a_1+S_{22}a_2$ contaminates the measurement.
- **a₂ can arise on its own** — a₁ → b₂ → (mismatch reflection) → a₂. Matched termination breaks that loop.

---

## Self-quiz

1. 50Ω is a compromise between which two values? What is each good for?
2. What's the more important meaning of 50Ω in practice, beyond "why 50"?
3. What are a port's two waves a and b, and their directions?
4. Write S₂₁ in terms of a and b. In "21," what do the 2 and the 1 mean?
5. Put "terminate port 2 in a matched load" in terms of waves. Why do it?
6. When measuring S₂₁, where can a₂ come from? (What's its relation to a₁?)

<details>
<summary>Show answers</summary>

1. A compromise between about 30Ω (maximum power handling) and about 77Ω (minimum loss) → 50Ω.
2. The **universal reference impedance (Z₀).** Every instrument, cable, and S-parameter is standardized to 50Ω, making it the premise for matching and S-parameters.
3. **a = incident wave (into the port), b = emerging wave (out of the port).** Out the same port = reflection, out the opposite port = transmission.
4. $S_{21}=b_2/a_1$. First digit **2 = emerging port**, second digit **1 = entering port** (in at 1, out at 2).
5. **Cap port 2 with 50Ω to kill the b₂ reflection, making a₂=0.** S₂₁ should see only pure transmission (b₂/a₁), but if a₂≠0 it's contaminated as $b_2=S_{21}a_1+S_{22}a_2$.
6. **It arises when b₂ reflects off the port-2 termination and returns** ($a_1\to b_2\to$ reflection $\to a_2$). So the b₂ that a₁ produced bounces off a mismatched termination to become a₂. With a matched termination it's absorbed and a₂=0.

</details>

*Previous — [How is dBm different from dB](../db-vs-dbm/). Next — S-parameters proper (S11, S21, reflection, matching).*
