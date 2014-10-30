---
---

stepL = (state, taps) ->
  l = (state[t] for t in taps).reduce (a,b) -> a^b
  out = state.shift()
  state.push(l)
  1

bf = (state) ->
  n = state.length
  (state[i] & state[n-1-i] for i in [0..n/2-1]).reduce (a,b) -> a^b

this.generator = (state, taps, n) ->
  [bf(state) & stepL(state,taps) for i in [0..n]]
