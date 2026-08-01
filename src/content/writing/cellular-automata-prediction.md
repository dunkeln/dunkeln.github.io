---
title: Building Models for Cellular Automata Prediction
date: 2025-06-09
description: Research notes on modeling stochastic cellular automata with entropy-based patching and transformer architectures for next-state prediction.
tags:
  - research
  - vision
  - transformers
  - experimentation
  - applied AI
cover:
  src: /assets/writing/cellular-automata-prediction/results.webp
  alt: Accuracy and loss curves for cellular automata prediction models
  width: 1024
  height: 818
  fit: contain
---

> *Entropy-based patching, emergent lattices, and the growing suspicion that my model understands the universe better than I do.*

Welcome to the story of how I spent months staring at a 2D grid of numbers, slowly losing my grip on reality, while building what can only be described as a chaos therapist disguised as a transformer model.

If you’ve ever wondered what happens when you mix stochastic dynamics, entropy maps, patch-level tokenization, autoregressive transformers, and questionable life choices—this blog explains it.

## Scene 1 — A 2D lattice with separation anxiety

My world begins with a 128×128 grid whose values evolve according to Markovian dynamics. Think Game of Life, but instead of cute Conway rules, you get:

> *Every cell flips its state based on probabilities, vibes, and an unspoken agreement with entropy.*

Every grid evolves into the next one, and your job—or mine, since you’re normal—is to predict the next grid from the current one. Simple, right? Wrong. There is already strong evidence that transformer-style models can learn meaningful stochastic dynamics in these systems.[^1]

This system is stochastic, which means the future is fuzzy, uncertain, and rude. So instead of pairing entire lattices like a normal vision model, I thought: *What if I only make the model think really hard in places where the universe itself is confused?*

```python
# objective (mental model)
x_t      = current_lattice
x_t_plus = next_lattice
x_hat    = model(x_t)
loss     = CE(x_hat, x_t_plus)
```

## Scene 2 — Let entropy decide the patches

Most people tokenize images using fixed-size patches or CNN features.[^2] But fixed patches don’t care about where the interesting stuff is. So I asked entropy for help—like a mathematician consulting a spiritual guide. Well, to be honest, it came from a paper I read ages ago.[^3]

For each lattice state, compute the per-cell entropy:

- Low entropy → stable → big lazy patches
- High entropy → chaotic → tiny focused patches

It’s basically giving the model a map that says: “Here’s where the universe is screaming.”

```python
# entropy-guided patching (mental model)
H = cell_entropy(x_t)
splits = where(H > tau)
patches = segment(x_t, splits, max_len=L)
```

Why does this work? Because transformers *love* token budgets, and chaos loves to waste them. Entropy-based patching lets the model spend compute only where it matters, reduce redundant attention, and adapt patch shapes dynamically like a model with ADHD but better boundaries.

## Scene 3 — The two-stage transformer that somehow works

### Stage 1: The global transformer

This model sees the structural dynamics: coarse-grain behavior, stable regions, and macroscale flows. It answers the question: “Where is this whole mess generally going?”

Because entropy controls patch size, the global transformer effectively zooms in or out depending on how dramatic the grid feels.

```python
# stage 1 (global)
z_global = GlobalTransformer(patches)
x_coarse = decode_coarse(z_global)
```

### Stage 2: The refinement transformer

This one plays cleanup crew. Once Stage 1 predicts the next frame in broad strokes, Stage 2 injects high-resolution corrections, handles chaos hotspots, refines unstable regions, and prevents the whole lattice from turning into pixel soup.

Think of Stage 1 as sketching the painting, and Stage 2 as adding all the anxious details.

```python
# stage 2 (refine)
residual = RefinementTransformer(x_t, x_coarse, entropy_map=H)
x_hat    = x_coarse + residual
```

## Scene 4 — Training, where I questioned my life choices

You would think training a model to predict chaos would be chaotic.

<figure>
  <img src="/assets/writing/cellular-automata-prediction/results.webp" alt="Training results for the cellular automata prediction models" width="1024" height="818" loading="lazy">
  <figcaption>Results—no bluff.</figcaption>
</figure>

Shockingly, my model learned fast:

- Over 82% accuracy on GoL and 90% on CTMCS (Continuous Time Monte Carlo Simulation)
- Cross-entropy loss of 0.5 on GoL and 0.7 on CTMCS
- Stable loss curves
- Entropy patches behaving like well-trained soldiers

Meanwhile, I was debugging shape mismatches, forgetting to `.to(device)`, getting spiritually attacked by PyTorch tensor errors, and reconsidering grad school entirely.

The model? Thriving. Me? Also learning, but with more caffeine dependency.

```python
# training loop (mental model)
for x_t, x_t_plus in loader:
    x_hat = model(x_t)
    loss = CE(x_hat, x_t_plus)
    loss.backward()
    opt.step()
    opt.zero_grad()
```

## Scene 5 — When the model shows signs of intelligence

Here’s where it gets spooky: the model began predicting emergent structure.

The transformer learned patterns I didn’t explicitly teach it, including directionally consistent flows, localized stochastic drift, density transitions, and transitional states. It recognized which chaotic regions stay chaotic and which ones calm down later.

This is when I realized my model wasn’t just predicting grids. It was forming intuition about the dynamics.

## Scene 6 — Why this matters, besides my sanity

Entropy-based patching is a new way to tokenize non-image spatial systems. This approach could extend to fluid dynamics, cellular automata, phase transitions, simulation acceleration, reinforcement-learning state compression, and any domain where entropy identifies interesting zones.

And transformers? They’re weirdly good at modeling discrete chaos when given the right patching. It’s promising. It’s scalable. It’s cursed in a beautiful way.

## Scene 7 — Final thoughts, or me apologizing to GPUs

What started as “Let’s see if transformers can predict this weird lattice thing” turned into “Why is this model learning emergent stochastic structure better than the average physics major?”

The whole project taught me that models are smarter than we think, entropy is underused in ML, custom tokenization might be the future, debugging PyTorch at 3 AM counts as cardio, and apparently I can write research-adjacent models without losing all my mental stability.

Just most of it.

[^1]: C. Casert, I. Tamblyn, and S. Whitelam. “[Learning stochastic dynamics and predicting emergent behavior using transformers](https://doi.org/10.1038/s41467-024-45629-w).” *Nature Communications*, 2024.
[^2]: A. Dosovitskiy et al. “[An Image is Worth 16×16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929).” *arXiv*, 2020.
[^3]: A. Pagnoni et al. “[Byte Latent Transformer: Patches Scale Better Than Tokens](https://arxiv.org/abs/2412.09871).” *arXiv*, 2024.
