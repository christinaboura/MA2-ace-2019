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

generator = (state, taps, n) ->
  [bf(state) & stepL(state,taps) for i in [0..n]]

state = (Number(Math.random() > 0.5) for i in [1..16])
taps = [0, 2, 3, 5]
($ '#in16').innerHTML = state.join ','
($ '#out16').innerHTML = generator(state,taps,100).join ','
  
state = (Number(Math.random() > 0.5) for i in [1..80])
taps = [0, 2, 4, 9];
($ '#in80').innerHTML = state.join ','
($ '#out80').innerHTML = generator(state,taps,4000).join ','
