+++
title = "[Concept] How is dBm different from dB? — both are power, the reference differs"
date = 2026-07-24T12:00:00
series = "Theory / Principle"
description = "dB is relative, dBm is absolute — but both are logs, which is confusing. The key: both measure power; only the denominator (reference) differs. Along the way: why voltage uses 20·log, and why S-parameters are dB."
tags = ["개념정리", "dBm", "dB", "decibel", "RF", "fundamentals"]
+++

## Intro

I had dB down from the [previous post](../why-decibel/), but adding dBm confused me again. "dB is relative, dBm is absolute" — but aren't both just a log? dBm is also referenced to 1mW, so isn't it relative too?

After a lot of wandering, here's the conclusion I nailed down first.

> **Both dB and dBm measure "power." The only difference is the denominator (reference).**

> **Reference** — *RF 기초강의실 (The Basic of RF)*, Ch. 1 "Fundamentals," Chapter 07 *How is dBm different from dB?* (pp. 35–38).

---

## 1. dB revisited — the log of a "power ratio," not of a value

dB is not a measured value *itself*. It's the **ratio of powers** expressed in log.

$$\text{dB} = 10\log_{10}\frac{P_2}{P_1}$$

Here the denominator $P_1$ **changes with the situation.** For an amplifier it's the input; for SNR it's the noise — different each time. So dB is a **relative scale** measuring **"how many times, relative to what."** It means nothing on its own — "20 dB" alone doesn't tell you *"100× relative to what?"*

> The book uses a price analogy. $1{,}000{,}000 vs $20{,}000{,}000 = 20× = a 13 dB difference. Write the prices on a dB scale and you get 60 dB and 73 dB. The unit is "won," but it's not a magnitude — just a **ratio expressed in log**.

---

## 2. dBm — dB with the denominator locked to 1mW

dB is relative because its denominator floats. What if you **nail that denominator to 1mW**?

$$\text{dBm} = 10\log_{10}\frac{P}{1\text{mW}}$$

With the denominator fixed, each value now maps one-to-one to **one actual power**. "20 dBm" is always **exactly 100 mW**. That's what **absolute** means.

### The litmus test — "how many watts?"

> **If you can answer "how many watts?", it's absolute (dBm); if you can't, it's relative (dB).**

- **+20 dB** → how many watts? **Don't know.** You'd have to ask "20 dB… relative to what?" → relative
- **+20 dBm** → **exactly 100 mW.** Straight out. → absolute

<svg viewBox="0 0 720 170" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>The dBm ladder — 1mW fixed at 0 dBm</title>
  <desc>1µW = -30 dBm, 1mW = 0 dBm, 1W = 30 dBm. Every ×10 in power adds 10 to dBm.</desc>
  <line x1="60" y1="82" x2="660" y2="82" stroke="currentColor" stroke-opacity="0.3"/>
  <g text-anchor="middle">
    <text x="60" y="52" font-size="13" fill="currentColor">−30</text><text x="60" y="112" font-size="11" fill="currentColor" fill-opacity="0.6">1µW</text>
    <text x="160" y="52" font-size="13" fill="currentColor">−20</text><text x="160" y="112" font-size="11" fill="currentColor" fill-opacity="0.6">10µW</text>
    <text x="260" y="52" font-size="13" fill="currentColor">−10</text><text x="260" y="112" font-size="11" fill="currentColor" fill-opacity="0.6">100µW</text>
    <text x="360" y="50" font-size="14" font-weight="700" fill="#3b82f6">0</text><text x="360" y="114" font-size="11" font-weight="700" fill="#3b82f6">1mW</text>
    <text x="460" y="52" font-size="13" fill="currentColor">+10</text><text x="460" y="112" font-size="11" fill="currentColor" fill-opacity="0.6">10mW</text>
    <text x="560" y="52" font-size="13" fill="currentColor">+20</text><text x="560" y="112" font-size="11" fill="currentColor" fill-opacity="0.6">100mW</text>
    <text x="660" y="52" font-size="13" fill="currentColor">+30</text><text x="660" y="112" font-size="11" fill="currentColor" fill-opacity="0.6">1W</text>
  </g>
  <g stroke="currentColor" stroke-opacity="0.4">
    <line x1="60" y1="76" x2="60" y2="88"/><line x1="160" y1="76" x2="160" y2="88"/><line x1="260" y1="76" x2="260" y2="88"/>
    <line x1="460" y1="76" x2="460" y2="88"/><line x1="560" y1="76" x2="560" y2="88"/><line x1="660" y1="76" x2="660" y2="88"/>
  </g>
  <circle cx="360" cy="82" r="7" fill="#3b82f6"/>
  <text x="360" y="142" text-anchor="middle" font-size="11" fill="#3b82f6">reference fixed</text>
  <text x="360" y="24" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity="0.6">dBm (absolute power)</text>
</svg>

Every $\times10$ in power adds $+10$ dBm. 1mW = 0 dBm, 10mW = 10 dBm, 100mW = 20 dBm, **1W = 30 dBm**.

### It's not a "+30 correction"

A common misread: dBm adds 30 dB to make 1mW become 0? **No.** Just put 1mW in the denominator and it's automatic.

$$P=1\text{mW}\to 10\log\frac{1\text{mW}}{1\text{mW}}=10\log(1)=0\text{dBm}$$

The number 30 comes from **"1W = 30 dBm"** (1W is 1000× of 1mW = +30 dB). And referencing to 1W instead is **dBW**, so $1\text{W}=30\text{dBm}=0\text{dBW}$. That is, $\text{dBm}=\text{dBW}+30$ — the 30 is just the gap between the two references (1mW vs 1W).

---

## 3. So both are "power"

This is the key knot of the chapter. Both dB and dBm **measure power**; the only difference is the **denominator**.

| | Formula | Denominator (reference) | Tells you |
|---|---|---|---|
| **dB** | $10\log\dfrac{P_2}{P_1}$ | changes with situation | how many **times** (ratio) |
| **dBm** | $10\log\dfrac{P}{1\text{mW}}$ | fixed at 1mW | how many **W** (actual power) |

**dBm = dB with the denominator locked to 1mW.** That's it.

---

## 4. The combinations — why dBm + dBm makes no sense

In dB, **adding = multiplying the actual values** (turning multiplication into addition is dB's whole reason for existing). So "unit" bookkeeping makes it clean.

- **dB** = a factor (dimensionless)
- **dBm** = a power

| Operation | What it actually does | Result | Valid? |
|---|---|---|---|
| dB + dB | factor × factor | factor | ✅ |
| dBm + dB | power × factor | power | ✅ (power scaled) |
| **dBm + dBm** | **power × power** | **W² (no such quantity)** | ❌ |

**In numbers:** combine two 100 mW signals (each 20 dBm) —

- **The real sum (linear):** $100+100=200\text{mW}=23\text{dBm}$
- **Just adding the dBm:** $20+20=40\text{dBm}=10{,}000\text{mW}=10\text{W}$ ⚠️

The 10W is a garbage value from $100\text{mW}\times100\text{mW}/1\text{mW}$ — a **multiplication**. To combine powers you must **leave the dB domain**, convert to mW, add linearly, then go back to dBm. Never "dBm + dBm."

---

## 5. Why voltage uses 20·log — voltage is the square root of power

An instrument reads **voltage (V)**, not power. But dB is **power**-based. So you must convert voltage to power, and the bridge is $P=V^2/R$.

**To get dBm (absolute) from a voltage** — you need R:

<svg viewBox="0 0 720 130" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>Flow from a measured voltage to dBm</title>
  <desc>Convert the measured voltage to power with V-squared over R, then take 10 log against 1mW to get dBm.</desc>
  <g font-size="13" text-anchor="middle">
    <rect x="20" y="45" width="120" height="40" rx="8" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.3"/>
    <text x="80" y="70" fill="currentColor">voltage V</text>
    <rect x="200" y="45" width="120" height="40" rx="8" fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-opacity="0.5"/>
    <text x="260" y="70" fill="currentColor">V² / R</text>
    <rect x="380" y="45" width="110" height="40" rx="8" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.3"/>
    <text x="435" y="70" fill="currentColor">power P</text>
    <rect x="550" y="45" width="150" height="40" rx="8" fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-opacity="0.5"/>
    <text x="625" y="65" fill="currentColor">10 log(P/1mW)</text>
    <text x="625" y="80" font-size="11" fill="currentColor" fill-opacity="0.7">→ dBm</text>
  </g>
  <g stroke="currentColor" stroke-opacity="0.5" fill="none">
    <path d="M144 65 L196 65" marker-end="url(#a)"/>
    <path d="M324 65 L376 65" marker-end="url(#a)"/>
    <path d="M494 65 L546 65" marker-end="url(#a)"/>
  </g>
  <text x="260" y="32" text-anchor="middle" font-size="11" fill="#3b82f6">needs R (50Ω)</text>
  <defs><marker id="a" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="currentColor"/></marker></defs>
</svg>

**To get dB (a ratio) from voltages** — R cancels out:

$$\text{dB}=10\log\frac{V_2^2/R}{V_1^2/R}=10\log\frac{V_2^2}{V_1^2}=\boxed{20\log\frac{V_2}{V_1}}$$

The square on $V$ pops out of the log, turning $10\to20$. So **"20·log(voltage)" is just "10·log(power)" rewritten in terms of voltage.** 20·log doesn't mean it isn't power — **20·log is how you turn an amplitude (voltage) into a power dB**.

> **Pitfall — 3 dB is double power, not double voltage.**
> - power $\times2$ → **+3 dB**
> - voltage $\times2$ (= power $\times4$) → **+6 dB**
> - voltage $\times\sqrt2$ (≈1.414×) → **+3 dB** ← "3 dB in voltage terms"
>
> So 10V vs 20V differ by **6 dB**, not 3 dB. (Double voltage = quadruple power.)

---

## 6. Why S-parameters are dB (not dBm)

S-parameters are **ratios**. "What came out, relative to what went in":

- **S21** = wave out of port 2 / wave into port 1 → transmission, gain/loss
- **S11** = reflected wave / incident wave → matching

They measure **"how many times,"** not absolute power (vs 1mW) → **relative → dB.** There's no absolute power to compare against 1mW, so dBm is impossible.

### S21 is a voltage ratio → hence 20·log

$$S_{21} = \frac{\text{output voltage wave}}{\text{input voltage wave}}\ (\text{voltage ratio}), \qquad |S_{21}|^2 = \text{power ratio}$$

S21 itself is a **voltage (amplitude) ratio**; squaring it, $|S_{21}|^2$, is the **power ratio**. So in dB (power):

$$S_{21}(\text{dB}) = 10\log|S_{21}|^2 = 20\log|S_{21}|$$

Same reason as voltage — 20·log. (The subscript $S_{21}$ reads "**2 ← 1**": in at port 1, out at port 2. Measured with port 2 terminated in a matched load.)

| $\lvert S_{21}\rvert$ | Meaning |
|---|---|
| $>1$ (e.g. +10 dB) | gain |
| $=1$ (0 dB) | passes through unchanged |
| $<1$ (e.g. −6 dB) | loss / attenuation |

---

## Cheat sheet

**dBm (absolute power):**

| Power | dBm |
|---|---|
| 1µW | −30 |
| 1mW | 0 |
| 10mW | 10 |
| 100mW | 20 |
| 1W | 30 |

**Ratios (dB):**

| Factor | power (10·log) | voltage (20·log) |
|---|---|---|
| ×2 | +3 | +6 |
| ×√2 | +1.5 | +3 |
| ×10 | +10 | +20 |
| ×½ | −3 | −6 |

---

## Key takeaways

- **Both dB and dBm measure "power."** Only the denominator differs — dB's denominator ($P_1$) changes with the situation (relative), dBm's is fixed at 1mW (absolute).
- **Litmus:** answerable in watts → dBm (absolute); not → dB (relative).
- **dBm is not a "+30 correction" but "division by 1mW."** 1W = 30 dBm because 1W is 1000× of 1mW.
- **Combinations:** dB+dB=dB, dBm+dB=dBm, **dBm+dBm=❌** (power × power = W²). Sum powers linearly.
- **Voltage uses 20·log** — dB is power and $P\propto V^2$, so you square it in. $20\log V = 10\log V^2$. **3 dB = double power**; double voltage is 6 dB.
- **S-parameters are dB** (ratios, so dBm can't apply). $S_{21}$ is a voltage ratio → $20\log|S_{21}|$.

---

## Self-quiz

1. State the fundamental difference between dB and dBm in one sentence (include what they share).
2. Is "+17 dBm" absolute or relative? How do you tell?
3. Do two 20 dBm signals combine to 40 dBm (=10W)? If not, what?
4. A scope reads 10 mV and 20 mV. How many dB apart — 3 dB? 6 dB?
5. Is $S_{21}$ a voltage ratio or a power ratio? So is its dB conversion 10·log or 20·log?
6. (Deeper) At 50Ω, what is 10 mV (rms) in dBm?

<details>
<summary>Show answers</summary>

1. **Both express power in log**; the difference is the denominator. dB's denominator changes with the situation → relative (how many times); dBm's is fixed at 1mW → absolute (how many W).
2. **Absolute.** You can answer in watts (17 dBm ≈ 50 mW), so it's absolute. dBm has the reference (1mW) baked into the name, so it yields an actual power.
3. **No.** 40 dBm = 10W is a garbage product of two powers. The real sum is linear: $100+100=200\text{mW}=\mathbf{23\text{dBm}}$.
4. **6 dB.** They're voltages, so 20·log(20/10) = 20·log2 = 6 dB. (Double voltage = quadruple power → 6 dB. 3 dB would be double power.)
5. **Voltage ratio.** Since $|S_{21}|^2$ is the power ratio, in dB it's $20\log|S_{21}|$ (20·log).
6. $P=\dfrac{(0.01)^2}{50}=2\times10^{-6}\text{W}=0.002\text{mW}$, $10\log(0.002)\approx\mathbf{-27\text{dBm}}$.

</details>

*Previous — [Why use dB](../why-decibel/). Next: a proper dive into S-parameters.*
