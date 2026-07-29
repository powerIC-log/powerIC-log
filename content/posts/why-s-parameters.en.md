+++
title = "[Concept] Why RF Uses S-Parameters — Where Z, Y, and H Break Down"
date = 2026-07-24T14:00:00
series = "Theory / Principle"
description = "Z, Y, and H all require open/short terminations, and at high frequency those cannot be built. So RF switched to 50Ω matched terminations and waves (incident and reflected) — that is the S-parameter. Including the measurement rationale and the frequency-domain view."
tags = ["개념정리", "S-parameter", "VNA", "RF", "fundamentals"]
+++

## Intro

Earlier we settled [50Ω and ports](../ports-and-reference-impedance/). Now the main question — **why S-parameters specifically.**

Low-frequency circuits already have ways to characterize a device: the Z, Y, and H parameters. Yet RF drops them and uses S. There is a reason.

> **Reference** — 《RF 기초강의실 (The Basic of RF)》, Ch. 1 "Fundamentals," Chapter 05 *Why RF Uses S-Parameters* (pp. 28–31).

---

## 1. First, what Z, Y, and H are

All three **characterize a 2-port with voltage and current**. They differ only in what you drive and what you measure.

| Parameter | Definition | Drive | Measure | Termination |
|---|---|---|---|---|
| **Z** impedance | V = Z·I | current | voltage | **open** (I₂ = 0) |
| **Y** admittance | I = Y·V | voltage | current | **short** (V₂ = 0) |
| **H** hybrid | mixed | mixed | mixed | open + short mixed |

**The denominator of the defining equation is what you drive, the numerator is what you measure.** Z = V/I, so you drive current and measure voltage; Y = I/V, so you apply voltage and measure current. Same structure as Ohm's law.

### How to read the subscripts — the second is input, the first is output

$$Z_{21} = \frac{V_2}{I_1}\bigg|_{I_2=0}, \qquad Y_{21} = \frac{I_2}{V_1}\bigg|_{V_2=0}$$

**Second digit 1 = where you drive, first digit 2 = where you look.** "Drive at 1, observe at 2." S-parameters are read exactly the same way.

And whether the subscripts match or differ splits the meaning.

| Subscripts | Meaning | Example |
|---|---|---|
| **Same** (11, 22) | A true impedance/admittance (looking into its own port) | Z₁₁ = input impedance, Z₂₂ = output impedance |
| **Different** (21, 12) | Not an impedance but a **transfer gain** | Z₂₁ = transimpedance, Y₂₁ = **transconductance (gm)** |

> **Z₂₁ is not "the impedance seen at 2."** Only the unit is Ω; it is a conversion ratio — **"drive 1 A into port 1 and how many volts appear at port 2."** Exactly the role the read amp in an HDD preamp plays as a transimpedance amplifier (TIA) — a gain that takes current in and puts voltage out. Likewise Y₂₁ is the **gm** of a MOSFET itself.

### Why the termination is forced to open/short

The voltage at port 2 has two causes.

$$V_2 = Z_{21}I_1 + Z_{22}I_2$$

- First term = the share that came over from port 1 (what we want)
- Second term = the share produced by the current flowing in port 2 (the intruder)

To extract Z₂₁ cleanly you must force **I₂ = 0**, and what stops current from flowing is an **open**. Y is the opposite: it needs V₂ = 0, so you block it with a **short**.

$$I_2 = Y_{21}V_1 + Y_{22}V_2$$

In short, **"kill the interfering term to zero and leave only the term you want"** — that is what the termination condition really is.

---

## 2. But open/short do not exist at high frequency

Here is the fork in the road. Z, Y, and H all presuppose open/short, and at high frequency that no longer holds.

<svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>Why open and short are not real at high frequency</title>
  <desc>Even when disconnected, current leaks through parasitic capacitance; even when connected, voltage appears across parasitic inductance.</desc>
  <text x="20" y="26" font-size="13" fill="currentColor" fill-opacity="0.75">Holds at low frequency</text>
  <text x="360" y="26" font-size="13" fill="#e0533d">Does not hold at high frequency</text>
  <!-- open row -->
  <text x="20" y="70" font-size="13" fill="currentColor" font-weight="600">open</text>
  <line x1="80" y1="65" x2="150" y2="65" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="156" cy="65" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="176" cy="65" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <line x1="182" y1="65" x2="250" y2="65" stroke="currentColor" stroke-width="1.5"/>
  <text x="265" y="70" font-size="12" fill="currentColor" fill-opacity="0.7">I = 0 ✓</text>
  <line x1="400" y1="65" x2="455" y2="65" stroke="currentColor" stroke-width="1.5"/>
  <line x1="455" y1="52" x2="455" y2="78" stroke="#e0533d" stroke-width="2"/>
  <line x1="466" y1="52" x2="466" y2="78" stroke="#e0533d" stroke-width="2"/>
  <line x1="466" y1="65" x2="520" y2="65" stroke="currentColor" stroke-width="1.5"/>
  <text x="530" y="60" font-size="12" fill="#e0533d">parasitic C</text>
  <text x="530" y="76" font-size="11.5" fill="currentColor" fill-opacity="0.7">current leaks</text>
  <!-- short row -->
  <text x="20" y="150" font-size="13" fill="currentColor" font-weight="600">short</text>
  <line x1="80" y1="145" x2="250" y2="145" stroke="currentColor" stroke-width="1.5"/>
  <text x="265" y="150" font-size="12" fill="currentColor" fill-opacity="0.7">V = 0 ✓</text>
  <line x1="400" y1="145" x2="450" y2="145" stroke="currentColor" stroke-width="1.5"/>
  <path d="M450 145 q 8 -12 16 0 q 8 -12 16 0 q 8 -12 16 0" fill="none" stroke="#e0533d" stroke-width="2"/>
  <line x1="498" y1="145" x2="540" y2="145" stroke="currentColor" stroke-width="1.5"/>
  <text x="550" y="140" font-size="12" fill="#e0533d">parasitic L</text>
  <text x="550" y="156" font-size="11.5" fill="currentColor" fill-opacity="0.7">voltage appears</text>
  <text x="340" y="200" text-anchor="middle" font-size="12.5" fill="#e0533d">And an active device terminated in open/short will oscillate</text>
</svg>

- Cut the line to make an **open** → current still leaks through **parasitic capacitance** (the higher the frequency, the smaller the reactance, so it effectively conducts)
- Tie the line to make a **short** → voltage still appears across the wire's **parasitic inductance** (even a short wire cannot be ignored)
- On top of that, an **active device** such as an amplifier terminated in open/short sees 100% reflection and simply **oscillates**

**A 50Ω matched termination, by contrast, has no reflection and is stable.** That is why S-parameters can be measured without destroying the device.

---

## 3. The measurement rationale — instantaneous values are unmeasurable at high frequency

This is the other reason the book stresses. **At high frequency the absolute values of voltage and current are themselves hard to capture.**

- Current measurement is extremely difficult at high frequency to begin with
- Voltage is somewhat better, but as frequency rises the **period gets so short** that which instant to sample becomes ambiguous
- You cannot just touch an oscilloscope probe to it the way you do at low frequency

### The fix: give up the absolute value and capture the ratio

The book puts it crisply — **"the solution is simply to capture the relative value."**

Measure the input waveform and the output waveform **simultaneously** and **divide them on the spot.** Then:

<svg viewBox="0 0 680 250" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>Ratio of input and output waveforms — magnitude and phase difference</title>
  <desc>The ratio of output peak to input peak is the S-parameter magnitude; how far the waveform is shifted is the phase.</desc>
  <text x="30" y="40" font-size="12" fill="currentColor" fill-opacity="0.7">input</text>
  <path d="M70 60 q 25 -30 50 0 q 25 30 50 0 q 25 -30 50 0 q 25 30 50 0" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <line x1="70" y1="60" x2="290" y2="60" stroke="currentColor" stroke-opacity="0.2"/>
  <text x="30" y="150" font-size="12" fill="currentColor" fill-opacity="0.7">output</text>
  <path d="M95 170 q 25 -18 50 0 q 25 18 50 0 q 25 -18 50 0 q 25 18 50 0" fill="none" stroke="#e0533d" stroke-width="2"/>
  <line x1="70" y1="170" x2="315" y2="170" stroke="currentColor" stroke-opacity="0.2"/>
  <line x1="95" y1="42" x2="95" y2="188" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="3 3"/>
  <line x1="70" y1="42" x2="70" y2="188" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="3 3"/>
  <line x1="70" y1="205" x2="95" y2="205" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="82" y="222" text-anchor="middle" font-size="11" fill="#3b82f6">phase diff</text>
  <path d="M340 105 L390 105" stroke="currentColor" stroke-width="2" fill="none" marker-end="url(#ar)"/>
  <text x="410" y="88" font-size="12.5" fill="currentColor">peak ratio → <tspan fill="#3b82f6" font-weight="700">S-parameter magnitude</tspan></text>
  <text x="410" y="126" font-size="12.5" fill="currentColor">phase difference → <tspan fill="#3b82f6" font-weight="700">S-parameter phase</tspan></text>
  <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="currentColor"/></marker></defs>
</svg>

- **Ratio of the peak values** → the **magnitude** of the S-parameter
- **How far the waveform is shifted** → the **phase** of the S-parameter = the delay accumulated from input to output

The absolute values may wobble, but **the ratio comes out like a constant within a given frequency.** That makes measurement far easier. This is the definition of the S-parameter itself.

> **One-line intuition:** Absolute values are hard to capture at high frequency, but **turning them into a relative value immediately** makes the problem easy. Giving up the time-domain instantaneous value and switching to the output-to-input ratio — that is the S-parameter.

---

## 4. The S matrix — as many elements as the square of the port count

An S-parameter set is a **matrix** holding every port combination. With 3 ports there are 3² = 9 elements.

$$
\begin{bmatrix}
S_{11} & S_{12} & S_{13}\\
S_{21} & S_{22} & S_{23}\\
S_{31} & S_{32} & S_{33}
\end{bmatrix}
$$

- **Meaning of S₃₁** = "how much of what is incident at port 1 is transmitted to port 3"
- **Diagonal elements (S₁₁, S₂₂, S₃₃)** = what comes back to its own port = **reflection coefficient**
- **The rest** = what crosses to another port = **transmission coefficient**

### reciprocal — symmetric about the diagonal

Passive devices (filters, couplers, and so on) are generally symmetric about the diagonal, as in **S₂₁ = S₁₂, S₃₂ = S₂₃**. Such a device is called **reciprocal**. It means the device has no directionality, so swapping input and output makes no difference.

> An amplifier, by contrast, is directional and therefore not reciprocal. S₂₁ (forward gain) is large and S₁₂ (reverse isolation) is very small.

---

## 5. Frequency domain — S is a value at one frequency

**An S-parameter is a result at 'one' frequency.** S₁₁ at 1 GHz and S₁₁ at 2 GHz are different.

So in practice you repeat the measurement while stepping the frequency.

```
set f1 → measure → S11, S21, S12, S22
set f2 → measure → ...
... hundreds to thousands of points (sweep)
      ↓
magnitude/phase plotted against frequency = spectrum
```

In low-frequency circuits you look at voltage and current on the **time axis**, but at high frequency what matters is **behavior on the frequency axis** rather than the time-domain transient. Communication divides the frequency resource into channels, so how a signal is distributed in the frequency domain is the key point.

### Example: a band-pass filter (BPF)

The essence of a filter is "which band it passes and which band it blocks." That is hard to see from a time-domain transient; you need the **frequency-axis plot** to see it precisely.

- **S₂₁ (transmission coefficient) bulging upward** → that band passes well
- **S₁₁ (reflection coefficient) dipping downward** → little reflection in that band = good matching

The interval where the two curves line up like this is exactly the passband.

---

## 6. VNA — the instrument that does this

The instrument that performs this measurement is the **VNA (Vector Network Analyzer)**, NA for short.

- **Vector** means it measures both magnitude and **phase**
- It contains a **frequency synthesizer** that splits the configured band into the set number of points and generates those frequencies
- At each frequency it measures the voltage response at each port and **divides them on the spot** to get the magnitude ratio and phase difference
- It connects those points and displays them as a plot

> **It is not the same as an SA (Spectrum Analyzer).** An SA looks at which frequency band a signal occupies, that is, the **energy distribution**. A VNA looks at the **input-to-output ratio (transmission and reflection characteristics)**. Same lineage as the network analyzer used to measure loop gain in power work.

### How to read it in practice (S₁₁)

| S₁₁ | Amplitude reflected | Power reflected | Assessment |
|---|---|---|---|
| 0 dB | 1 | 100% | worst case (open/short) |
| −10 dB | 0.32 | 10% | needs improvement |
| **−20 dB** | **0.1** | **1%** | good |
| −30 dB | 0.032 | 0.1% | very good |

> **Caution — do not mix amplitude and power.** If S₁₁ = −20 dB, then 0.1 is reflected in amplitude. But that does not mean "the remaining 0.9 goes in." Energy conservation holds for **power**, so you square it: power reflection 0.1² = 1%, therefore **99% enters the device.** (Whether that 99% comes out at port 2 is what S₂₁ tells you — it may be dissipated as heat inside.)

Since S-parameters are **wave amplitude ratios**, the dB conversion uses **20log**. Because $|S_{21}|^2$ is the power ratio, $10\log|S_{21}|^2 = 20\log|S_{21}|$.

---

## Key takeaways

- **Z, Y, and H are voltage/current based** and all presuppose **open/short terminations.** (Z = drive current, measure voltage, open; Y = apply voltage, measure current, short)
- If the subscripts **match** (11, 22) it is a true impedance/admittance; if they **differ** (21, 12) it is a **transfer gain** — Z₂₁ is transimpedance, Y₂₁ is gm.
- **Open/short do not hold at high frequency** — current leaks through parasitic C, voltage appears across parasitic L, and active devices oscillate. A 50Ω match, by contrast, has no reflection and is stable.
- **The measurement rationale** — the period is so short at high frequency that instantaneous values are hard to capture. Forming **the input-to-output ratio instead of absolute values**, immediately, solves it. The **magnitude and phase difference** of that ratio are precisely the S-parameter.
- **S is a value at one frequency**, and you sweep to view it as a **frequency-axis plot (spectrum)**. At high frequency, frequency-axis behavior matters more than the time axis.
- **The S matrix**: as many elements as the square of the port count. Diagonal = reflection coefficients, the rest = transmission coefficients. Passive devices are generally **reciprocal** (S₂₁ = S₁₂).
- **A VNA does this job** (Vector = magnitude + phase). An SA looks at energy distribution; a VNA looks at the input-to-output ratio.

---

## Self-quiz

1. What does a Z parameter drive and what does it measure? Is the termination open or short? What about Y?
2. Is Z₂₁ "the impedance of port 2"? If not, what is it?
3. Why is port 2 left open when measuring Z₂₁? (Explain using the V₂ equation.)
4. What are the two reasons open and short are not real at high frequency?
5. State the book's "measurement rationale" in one sentence. What is captured instead of the absolute value?
6. What does S₃₁ mean? How many S-parameters does a 3-port device have?
7. What do the diagonal elements of the S matrix mean? What does it mean to be reciprocal?
8. When S₁₁ = −20 dB, what are the amplitude reflection and the power reflection? How much power enters the device?

<details>
<summary>Show answers</summary>

1. **Z**: drive current and measure voltage (V = Z·I), termination **open** (I₂ = 0). **Y**: apply voltage and measure current (I = Y·V), termination **short** (V₂ = 0). The denominator of the definition is what you drive, the numerator is what you measure.
2. **No.** Only the unit is Ω; it is a **transfer gain (transimpedance)** — the ratio of "drive current into 1, how many volts appear at 2." The true output impedance is Z₂₂.
3. $V_2 = Z_{21}I_1 + Z_{22}I_2$, and if the second term ($Z_{22}I_2$) is mixed in you cannot extract Z₂₁ alone. Making **I₂ = 0 with an open** removes the second term, leaving $V_2 = Z_{21}I_1$, so $Z_{21}=V_2/I_1$ comes out cleanly.
4. ① **Parasitics** — cut the line and current still leaks through parasitic C; tie it and voltage still appears across parasitic L. ② **Oscillation** — terminating an active device in open/short gives 100% reflection, which makes it unstable.
5. At high frequency the period is so short that **the absolute value at a given instant (instantaneous voltage/current) is hard to capture.** So you immediately form and capture **the output-to-input ratio (a relative value)** — that magnitude ratio and phase difference are the S-parameter.
6. **"How much of what is incident at port 1 is transmitted to port 3."** (Second digit = input, first digit = output.) For a 3-port there are 3² = **9** elements.
7. The diagonal (S₁₁, S₂₂, S₃₃) is the **reflection coefficient** — what comes back to its own port. **Reciprocal** = symmetric about the diagonal (S₂₁ = S₁₂), meaning a device with no directionality, so swapping input and output makes no difference. Passive devices generally are.
8. 20log|S₁₁| = −20 → **amplitude reflection 0.1 (1/10)**. Power is the square, so **power reflection 0.01 = 1%**. Therefore the power entering the device is **99%**. (Not 0.9 — you cannot subtract amplitudes; convert to power first.)

</details>

*Previous — [50Ω and ports](../ports-and-reference-impedance/). Next — filling in transmission lines and why reflections occur (characteristic impedance, standing waves) will answer the "why?" left open here.*
