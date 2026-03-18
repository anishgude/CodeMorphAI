# Evaluation Methodology

## Purpose

The evaluation layer exists to answer a product-level question: how reliable does CodeMorph look across representative migration cases, not just one demo input?

## Current Approach

The repository uses a lightweight curated benchmark set covering supported language pairs, including:

- Python -> JavaScript
- JavaScript -> Python
- Java -> Python
- C++ -> Python
- Python -> Go

Each benchmark case includes:

- source language
- target language
- validation score
- confidence level
- generated test count
- runtime
- status (`Pass`, `Review`, `Warning`)
- a short review note

## What the Metrics Mean

- **Validation score**: a product-facing quality signal derived from the validation stage
- **Confidence**: a coarse trust signal used to communicate likely stability
- **Generated tests**: the amount of synthesized test coverage produced for the case
- **Runtime**: approximate end-to-end migration latency
- **Status**:
  - `Pass` means the case is strong enough to present as a stable outcome
  - `Review` means the migration is plausible but still deserves inspection
  - `Warning` means risk remains material enough that manual review is required

## Why the Benchmark Is Lightweight

This is intentionally not a large-scale offline research harness. The current benchmark layer is product-oriented:

- small enough to understand quickly
- structured enough to communicate engineering maturity
- honest enough to show failure and review cases

## Repo Artifacts

- Seeded benchmark data used by the product UI: `frontend/lib/benchmark-data.ts`
- Repo-facing benchmark dataset snapshot: `evaluation/datasets/benchmark_cases.json`
- Summary artifacts: `evaluation/results/`

## Suggested Next Step

The highest-impact improvement would be adding automated regeneration of the evaluation artifacts from a single benchmark source of truth.
