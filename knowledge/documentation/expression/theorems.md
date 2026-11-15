---
type: concept
title: 読みやすさのモデルから導く定理
description: 理解までの距離が増えない条件と、読者によって表現の優劣が逆転する条件を示す。
tags: [documentation, expression, theorem, optimization]
---

# 読みやすさのモデルから導く定理

記号は[モデル](./model.md)に従う。以下は仮定からの帰結であり、具体的な文章が仮定を満たすかは別途確かめる。

## 成功過程の費用を増やさない変換

同じ評価の前提と費用の測り方のもとで、表現 \(e_1,e_2\) が意味を保つとする。成功過程の集合をそれぞれ \(\mathcal P^+_1,\mathcal P^+_2\) とする。

**仮定**：\(\mathcal P^+_1\ne\varnothing\) であり、次を満たす写像 \(f\) がある。

\[
f:\mathcal P^+_1\to\mathcal P^+_2,
\qquad
\forall p\in\mathcal P^+_1,\quad
\mathbf c(f(p))\le\mathbf c(p)
\]

不等号は成分ごとの比較である。

**結論**：正の重み \(w\) に対し、理解までの距離は増えない。

\[
d_w(e_2)\le d_w(e_1)
\]

**証明**：\(f(p)\) は \(e_2\) の成功過程なので、任意の \(p\in\mathcal P^+_1\) に対して

\[
d_w(e_2)\le w^\mathsf T\mathbf c(f(p))
\le w^\mathsf T\mathbf c(p).
\]

右辺の下限を取れば結論を得る。

これは距離についての定理であり、成功確率 \(q_\tau\) の増加までは保証しない。また、一つの成功過程の改善だけでは、距離が小さくなるとは限らない。

## 正味費用が一様に減る変換

同じ評価の前提と費用の測り方のもとで、表現 \(e,e'\) が意味を保ち、\(d_w(e)<\infty\) とする。

**仮定**：成功過程を対応付ける写像 \(f:\mathcal P^+_e\to\mathcal P^+_{e'}\) と、削減費用 \(R(p)\ge0\)、追加費用 \(A(p)\ge0\) があり、すべての \(p\in\mathcal P^+_e\) について

\[
w^\mathsf T\mathbf c(f(p))
\le w^\mathsf T\mathbf c(p)-R(p)+A(p),
\qquad R(p)-A(p)\ge\varepsilon
\]

を満たす固定の \(\varepsilon\ge0\) がある。

**結論**：\(d_w(e')\le d_w(e)-\varepsilon\)。特に、\(\varepsilon>0\) なら \(e'\prec_w e\)。

**証明**：任意の成功過程 \(p\) について \(d_w(e')\le w^\mathsf T\mathbf c(p)-\varepsilon\)。右辺の下限を取れば結論を得る。

## 読者による優劣の逆転

短い専門用語の表現を \(e_s\)、既知の言葉による具体的な説明を \(e_l\) とする。

**仮定**：両者は意味を保ち、成功過程は各読者・表現について一つだけある。熟練者が読む費用をそれぞれ \(r_s,r_l\)、初心者が専門用語を調べる追加費用を \(\ell>0\) とする。他の費用は0とし、同じ重みで比較する。

\[
r_s<r_l<r_s+\ell
\]

**結論**：熟練者には \(e_s\)、初心者には \(e_l\) の方が近い。

**証明**：成功過程が一つなので、その費用が距離になる。

\[
\begin{aligned}
d_w(e_s\mid K_{\mathrm{expert}})&=r_s<r_l
=d_w(e_l\mid K_{\mathrm{expert}}),\\
d_w(e_l\mid K_{\mathrm{novice}})&=r_l<r_s+\ell
=d_w(e_s\mid K_{\mathrm{novice}}).
\end{aligned}
\]

したがって、表現の短さだけから、読者を問わない優劣は決まらない。
