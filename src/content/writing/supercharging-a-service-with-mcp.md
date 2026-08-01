---
title: Supercharging a Service with the Provisional Ability of MCPs
date: 2026-07-31
description: Better tooling happens when MCPs balance the cognitive load for client agents.
tags:
  - MCP
  - agent systems
  - tool design
  - evaluation
cover:
  src: /assets/writing/supercharging-a-service-with-mcp/outcomes.png
  alt: Benchmark comparing completed workflows, answer quality, and judge preference across two MCP designs
  width: 1200
  height: 640
  fit: contain
---

An API lets software use a service. An MCP lets an agent understand how to use it. That difference is where most of the design work lives.

While building [Bright MCP](https://github.com/dunkeln/bright_mcp), I could have turned every Bright Data endpoint into a tool. Search, scrape, trigger a job, check its status, download the result, request the next page. The agent would have access to everything.

It would also have to operate Bright Data instead of solving the user's problem.

## The simple rule

Imagine asking an agent for the current price of a stock. It should decide which sources are useful and whether the answer needs another source. It should not have to decide how many times to retry an HTTP request or how long to poll a provider job.

That became an insight:

> The agent makes choices that require judgment. The MCP handles steps with one correct procedure.

So the agent sees decisions such as:

- Do I need search results or the contents of a known page?
- Do I need a few named fields or a complete structured dataset?
- Is this action paid, destructive, or stateful?

The MCP handles authentication, retries, polling, pagination, response cleanup, and partial failures. Those steps still happen. They just do not consume the agent's attention.

This is not a contest to expose the fewest tools. Two operations should remain separate when they have different costs, permissions, or outcomes. The goal is to remove choices that were never meaningful.

## Design tools around intent

Bright MCP chooses tools from two facts: what the agent already knows and what result it needs.

```text
Unknown sources + links              → search_web
Known pages + readable evidence      → read_web
Known pages + named fields           → extract_web
Unknown sources + structured records → research_web
Maintained data                      → find_datasets → run_dataset
```

The names describe outcomes. They do not ask the agent to know which Bright Data product, endpoint, or job type implements them.

Maintained datasets use two calls on purpose. `find_datasets` returns a short list with the exact input schema for each option. `run_dataset` executes the selected one. The agent makes a small informed choice instead of guessing from a huge catalog.

Large results follow the same idea. A tool returns a small preview and a resource link to the complete result. The agent gets enough information to continue without carrying an entire webpage or dataset through every later turn. MCP already separates tools from resources; using both is often better than making tools return everything.[^1]

## Did it help?

I compared Bright MCP with the official Bright Data MCP using three five-turn workflows: current search, reading known pages, and retrieving Marketplace data. Both sides used the same model, prompts, credentials, and turn limits.[^2]

Across fifteen matched runs, Bright MCP completed fourteen workflows; the official MCP completed thirteen. Blind answer quality averaged 7.59 versus 6.43. A separate judge preferred Bright nine times, the official MCP four times, with two ties.

<figure>
  <img src="/assets/writing/supercharging-a-service-with-mcp/outcomes.png" alt="Bright MCP completed fourteen of fifteen workflows, scored 7.59 in blind quality, and received nine judge preferences" width="1200" height="640" loading="lazy">
  <figcaption>Five runs across three five-turn workflows. Higher is better on every row.</figcaption>
</figure>

The most useful result was where Bright did **not** win. The official MCP slightly beat it on known-page quality. That job already matched a direct scraping tool, so an extra abstraction added little. Bright helped most on Marketplace retrieval, where the agent had to move from a vague request to a caller-specific dataset.

That is the boundary: an MCP earns complexity only when it removes more work from the agent than it creates.

When judging an MCP, it's worth asking questions like:

1. Can the agent choose a tool from the user's intent?
2. Does every model-visible choice require judgment?
3. Can large results, provider state, and recovery stay outside the model's context?

MCP makes the connection possible. A good MCP decides how much of the service the agent should have to understand.

[^1]: Model Context Protocol. “[Understanding MCP servers](https://modelcontextprotocol.io/docs/learn/server-concepts).”

[^2]: “[End-to-end MCP workflow evaluation](https://github.com/dunkeln/bright_mcp/tree/main/evals).” *Bright MCP*, 2026.
