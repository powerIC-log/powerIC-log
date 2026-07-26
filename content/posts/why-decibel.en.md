+++
title = "[Concept] Why use dB? — reading signals on a log scale"
date = 2026-07-24
series = "Theory / Principle"
description = "We write both gain and loss in dB, yet rarely stop to ask why we read things in log. From the definition of dB to the reason for log — organized on a power (10·log) basis."
tags = ["개념정리", "dB", "decibel", "RF", "fundamentals"]
+++

## Intro

Through my years in power ICs, dB was just a familiar unit. A gain of so many dB, an attenuation of so many dB — I ran the numbers, but I always skipped *why* we work in log.

Opening an RF book to study HDD preamps, the very first chapter is all dB: dB, dBm, S-parameters. I couldn't move on, so this time I pinned down "why dB" first. A concept note I'm keeping for myself.

> **Reference** — *RF 기초강의실 (The Basic of RF)*, Ch. 1 "Fundamentals," Chapter 06 *Why use the dB unit?* (pp. 32–35).

> **This whole post is on a 10·log basis.** dB is fundamentally power-based, so $\text{dB} = 10\log_{10}(\text{power ratio})$ is the baseline. When a voltage/current ratio is given, **square it into a power ratio first**, then take 10·log. (The 20·log form that plugs voltage in directly is covered in a later post.)

---

## 1. The definition of dB — the log value is the exponent

A dB value is "when you express a number as some power of 10, that <span class="pt">exponent × 10</span>." And that "which power of 10" is exactly the $\log_{10}$ value. The very definition of log is *"how many times do I multiply 10 to get this number."*

$$\log_{10}1000 = 3 \quad(10^3 = 1000), \qquad \log_{10}100 = 2, \qquad \log_{10}10 = 1$$

<svg viewBox="0 0 620 200" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>Powers of ten and their log values (exponents)</title>
  <desc>Values multiply by ×10, but the log value (exponent) just adds: 1, 2, 3.</desc>
  <line x1="40" y1="150" x2="580" y2="150" stroke="currentColor" stroke-opacity="0.25"/>
  <g text-anchor="middle">
    <text x="120" y="66" font-size="20" fill="currentColor">10¹</text>
    <text x="120" y="90" font-size="12" fill="currentColor" fill-opacity="0.6">= 10</text>
    <text x="310" y="66" font-size="20" fill="currentColor">10²</text>
    <text x="310" y="90" font-size="12" fill="currentColor" fill-opacity="0.6">= 100</text>
    <text x="500" y="66" font-size="20" fill="currentColor">10³</text>
    <text x="500" y="90" font-size="12" fill="currentColor" fill-opacity="0.6">= 1000</text>
    <circle cx="120" cy="150" r="16" fill="#3b82f6"/>
    <circle cx="310" cy="150" r="16" fill="#3b82f6"/>
    <circle cx="500" cy="150" r="16" fill="#3b82f6"/>
    <text x="120" y="155" font-size="14" font-weight="700" fill="#fff">1</text>
    <text x="310" y="155" font-size="14" font-weight="700" fill="#fff">2</text>
    <text x="500" y="155" font-size="14" font-weight="700" fill="#fff">3</text>
    <text x="120" y="184" font-size="11" fill="currentColor" fill-opacity="0.55">log value = exponent</text>
    <text x="310" y="184" font-size="11" fill="currentColor" fill-opacity="0.55">log value = exponent</text>
    <text x="500" y="184" font-size="11" fill="currentColor" fill-opacity="0.55">log value = exponent</text>
  </g>
  <g fill="none" stroke="#3b82f6" stroke-width="1.6">
    <path d="M160 116 q 55 -30 130 0" marker-end="url(#ar1)"/>
    <path d="M350 116 q 55 -30 130 0" marker-end="url(#ar1)"/>
  </g>
  <text x="215" y="104" font-size="12" text-anchor="middle" fill="#3b82f6">×10</text>
  <text x="405" y="104" font-size="12" text-anchor="middle" fill="#3b82f6">×10</text>
  <defs>
    <marker id="ar1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#3b82f6"/></marker>
  </defs>
</svg>

The values **multiply** by $\times 10$, but the log value (exponent) just **adds**: $1, 2, 3$. So "exponent × 10" and "10·log" are exactly the same thing.

> **In one line:** the result of taking a log is precisely "which power of 10" — that exponent. Log and exponent are inverse operations, but the *value* a log returns is itself an exponent.

---

## 2. dB is not an absolute — it is relative

dB means nothing on its own. Saying just "20 dB" is half a statement — *"100× compared to what?"* has no reference. It always states **"how many times, relative to what."**

$$\text{dB} = 10\log_{10}\!\left(\frac{P_2}{P_1}\right)$$

For amplifier gain, $P_1$ is the input and $P_2$ the output. For SNR, it's signal versus noise. Always a comparison of two values. So dB itself is a relative scale that measures "how many times," not "how much."

> This "missing reference" is what leads into the next post. Fixing that reference to a single value is exactly what **dBm** does (referenced to $1\text{mW}$).

---

## 3. Why read in log ① — our senses are logarithmic to begin with

The part that clicked last for me. The book gives this example.

> To make a speaker driven at 10 V sound **twice as loud**, you have to apply **100 V**, not 20 V.

At first I thought "what does that even mean," but a table makes it land.

| Stimulus (voltage) | Perceived loudness |
|---|---|
| $10 = 10^1$ | 1 |
| $100 = 10^2$ | 2 |
| $1000 = 10^3$ | 3 |

The stimulus **multiplies** by $\times 10$, but the perceived level **adds** $+1$. That is, perceived level $=$ the exponent of the stimulus $= \log(\text{stimulus})$. So to feel twice as loud you must **square** the stimulus ($10 \to 100$), not double it. At 20 V (a mere doubling) the exponent only rises $1 \to 1.3$, so the sound barely grows.

<svg viewBox="0 0 640 240" xmlns="http://www.w3.org/2000/svg" role="img" font-family="system-ui, sans-serif" style="max-width:100%;height:auto;margin:1.5rem 0;">
  <title>Curved on a linear axis, straight on a log axis</title>
  <desc>Perceived vs. stimulus is a curve on a linear axis, but becomes a straight line when the stimulus is placed on a log axis.</desc>
  <g>
    <text x="170" y="24" text-anchor="middle" font-size="12" fill="currentColor" fill-opacity="0.7">linear axis → curve</text>
    <line x1="50" y1="60" x2="50" y2="190" stroke="currentColor" stroke-opacity="0.35"/>
    <line x1="50" y1="190" x2="300" y2="190" stroke="currentColor" stroke-opacity="0.35"/>
    <path d="M50 186 Q 160 182 210 130 T 295 66" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
    <text x="175" y="214" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity="0.6">stimulus (voltage) →</text>
    <text x="34" y="128" text-anchor="middle" font-size="11" fill="currentColor" fill-opacity="0.6" transform="rotate(-90 34 128)">perceived →</text>
  </g>
  <g transform="translate(340,0)">
    <text x="170" y="24" text-anchor="middle" font-size="12" fill="#3b82f6">log axis → straight line</text>
    <line x1="50" y1="60" x2="50" y2="190" stroke="currentColor" stroke-opacity="0.35"/>
    <line x1="50" y1="190" x2="300" y2="190" stroke="currentColor" stroke-opacity="0.35"/>
    <line x1="50" y1="186" x2="295" y2="70" stroke="#3b82f6" stroke-width="2.5"/>
    <circle cx="50" cy="186" r="4" fill="#3b82f6"/>
    <circle cx="172" cy="128" r="4" fill="#3b82f6"/>
    <circle cx="295" cy="70" r="4" fill="#3b82f6"/>
    <text x="50" y="210" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.6">10V</text>
    <text x="172" y="210" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.6">100V</text>
    <text x="295" y="210" text-anchor="middle" font-size="10.5" fill="currentColor" fill-opacity="0.6">1000V</text>
  </g>
</svg>

Put the stimulus on a log axis and the bent curve straightens into a **line**. We measure sound in dB not "because it's convenient" but because **the ear itself hears logarithmically** — the scale is matched to that.

> **One-line intuition:** earthquakes (Richter), acidity (pH), and musical octaves are all logarithmic too. Many quantities in the world grow by multiplication, not addition, and we perceive them multiplicatively. That's why a log scale shows their true shape.

---

## 4. Why read in log ② — multiplication becomes addition

For anyone dealing with amplifiers, this is the biggest reason. As a signal passes through several stages, gain accumulates as a **product**. Write it in dB and the total is just the **sum**; losses (attenuation) are simply subtracted.

The transmitter example in the book shows this well. Starting from an original signal of $1\text{mW}$, it goes through amplification and loss.

| Stage | Factor | dB (10·log) |
|---|---|---|
| Original signal | $1\text{mW}$ | $0\text{ dBm}$ |
| Amplification | $\times 20$ | $+13$ |
| Mixer loss | $\times 0.5$ | $-3$ |
| Amplification | $\times 100$ | $+20$ |
| Antenna efficiency | $\times 0.25$ | $-6$ |
| **Total** | **$\times 250$** | **$24\text{ dBm}$** |

$$0\text{ dBm} + 13 - 3 + 20 - 6 = \boxed{24\text{ dBm}}$$

Working in raw factors: $20 \times 0.5 \times 100 \times 0.25 = 250$, and $10\log 250 \approx 24\text{ dB}$. **One multiplication or a chain of dB additions — same answer.** (Since $250 = 2.5 \times 100$, you also get $10\log2.5 + 20 = 4 + 20 = 24$.)

A preamp likewise chains stages: read circuit → postamp. Note each stage's gain in dB and the total is just an addition. The more stages — 10, 20 — the more this pays off.

---

## 5. Other benefits — range compression · ratios · Bode

**A huge range compresses into small numbers.** A read preamp's signal spans orders of magnitude: from the tens-to-hundreds of $\mu\text{V}$ coming off the head, up to hundreds of $\text{mV}$–$\text{V}$ at the output. Plot that on a linear axis and the small signal sticks to the floor, invisible. In log, the whole range fits within **a few tens of dB**, so large and small signals sit on one axis together.

**Ratios become constants.** What we care about is not "how much more" but "how many times." Power $1\text{mW}\to2\text{mW}$ and $100\text{mW}\to200\text{mW}$ are both the same $2\times$, yet linearly they look like $+1$ and $+100$ — while in dB both are $+3\text{dB}$. So you memorize fixed constants like "$2\times$ power $=+3\text{dB}$," "$10\times =+10\text{dB}$" and do it in your head.

**Curves become straight lines.** The <span class="pt">Bode plot</span> from power work is exactly this. Plot gain (dB) against frequency (log axis) and the rolloff at a pole drops as a straight line of constant slope. Because it's a line, you can read phase margin and bandwidth by eye. A curve, you can't.

---

## 6. Mental-math cheat sheet (10·log)

Without a calculator, most of it falls right out.

| Ratio | dB | How |
|---|---|---|
| 2× | $+3$ | $10\log2$ |
| 10× | $+10$ | $10\log10$ |
| 5× | $+7$ | $10 - 3$ ($10\div2$) |
| 2.5× | $+4$ | $10 - 6$ ($10\div4$) |
| 100× | $+20$ | $10\log10^2$ |
| 1000× | $+30$ | $10\log10^3$ |
| 0.5× (loss) | $-3$ | below 1, so negative |
| 1× (reference) | $0$ | — |

> Know just $\log2 \approx 0.3$ and the rest mostly comes out by addition and subtraction.

---

## Key takeaways

- **dB $= 10\log(\text{power ratio})$.** The log value = "which power of 10," that exponent. It's a way of turning multiplication into an exponent (addition).
- **dB is relative.** Always "how many times, relative to what" — a value is fixed only once you have a reference. Fix the reference and you get dBm.
- **Why read in log:** ① senses and nature are logarithmic to begin with ② multiplication becomes addition ③ wide ranges compress ④ ratios become constants ⑤ curves become straight lines (Bode).
- **Voltage? Square it first.** Use the single form $\text{dB}=10\log(\text{power ratio})$; for a voltage/current ratio, square it into a power ratio, then plug in.
- **Mental-math backbone:** $2\times =3\text{dB}$, $10\times =10\text{dB}$. Just $\log2\approx0.3$ combines into most of the rest.

*Next — how is dBm different from dB? (Fix a reference on the relative dB and it becomes an absolute power.)*
