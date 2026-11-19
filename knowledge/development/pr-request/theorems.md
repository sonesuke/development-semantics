---
type: concept
title: PRのモデルから導く定理
description: Repository Loadの不変性と、品質の受け入れ条件から導ける性質を示す。
tags: [pull-request, theorem, quality, cognition]
---

# PRのモデルから導く定理

記号と品質条件は[モデル](./model.md)に、リポジトリ状態とRepository Loadは[Repositoryのモデル](../repository/model.md)に従う。以下は定義と明示した仮定からの帰結であり、具体的なPRが仮定を満たすかは別途確認する。

## 同じ最終状態とアクセス経路でのRepository Load

**仮定**：二つのPR構成が同じ最終状態 \(S_f\) を残し、利用可能なアクセス経路も同じである。評価する利用者の知識 \(K\) とタスク \(T\) を固定する。履歴・文書・参照経路など、理解に関わる状態も \(S_f\) に含める。

**結論**：PRの分割や提示順序が異なっても、Repository Loadは等しい。

\[
H_{\mathrm{repo}}(S_f;K,T) = H_{\mathrm{repo}}(S_f;K,T)
\]

**証明**：[Repository Load](../repository/model.md#repository-load)は状態・知識・タスクだけで定まり、その状態に至った変更の経緯には依存しない。二つの構成で最終状態（アクセス経路を含む）・知識・タスクがすべて同じなので、同じ評価値になる。

これは評価対象を固定したことによる帰結であり、実測値が必ず一致するという経験則ではない。Squash Mergeなどによって残る履歴や参照経路が変わる場合、仮定を満たさない。Review LoadはPR群と提示・閲覧の順序にも依存するため、この結論から同値性は導けない。

## 受け入れ条件の一つを欠くPR

**仮定**：同じ評価の前提のもとで、次のうち少なくとも一つが偽である。

\[
\operatorname{Sound}(P),\quad
\operatorname{Adequate}(P),\quad
\operatorname{Structured}(P),\quad
\operatorname{Retained}(S_1,K_{\mathrm{required}})
\]

**結論**：\(\neg\operatorname{Good}(P)\)。

**証明**：\(\operatorname{Good}\) は四条件の連言として定義されている。少なくとも一つが偽なら連言は偽である。

例えば、十分なテスト結果があることだけでは、必要なVOの網羅性や知識の保持まで示したことにはならない。この定理は受け入れ条件間の関係を示すものであり、各条件の具体的な判定手続きを与えない。

## 形式化の範囲

PRの分割による負荷の低下や、個別PRの正しさから合成後の正しさを導く一般的な定理は、まだ与えていない。論証の等価性、部分構造の閉包性、Behaviorの独立性などの[未定義事項](./open-questions.md)を定める必要がある。実践上の候補と判断の目安は[戦略](./strategies.md)で扱う。
