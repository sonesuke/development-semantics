---
type: concept
title: 知識の保持
description: マージ後に必要な知識を所定の経路で取得できる条件と、三つのアクセス層を定義する。
tags: [pull-request, knowledge, retention, history]
---

# 知識の保持

Retainedは、マージ後に必要な知識が失われず、将来の利用者が所定の経路で取得できるという完全性の条件である。

\[
\operatorname{Retained}(S_1,K_{\mathrm{required}})
\]

\(S_1\) は変更後の状態、\(K_{\mathrm{required}}\) は将来必要となる知識である。この表記では、利用者と想定するアクセス経路を評価の前提としている。必要な知識の範囲と、経路の成立条件の厳密化は[未定義事項](./open-questions.md)として残る。

すべての知識がWorking Tree内に直接記述されていることは要求しない。外部仕様やPR Recordなどへの明示的な参照によって、所定の経路で取得できる場合もある。ただし、情報がどこかに存在することだけでは、アクセス可能性は示せない。

## 三つのアクセス層

| 層           | 主な内容                                | 典型的な探索目的                 |
| ------------ | --------------------------------------- | -------------------------------- |
| Working Tree | コード、テスト、設定、ドキュメント      | 現在の状態を理解する             |
| Git History  | Commit、Commit Message                  | 変更箇所から、その変更理由を辿る |
| PR Record    | Body、Inline Comments、議論、CI Results | 特定の変更の詳細な論証を辿る     |

典型的なアクセス経路として、次を考える。

\[
\text{Code}\rightarrow\text{Commit}\rightarrow\text{PR}
\]

この経路は情報の優劣を表すものではない。利用者が何を知ろうとしているかによって、Working Treeの文書や外部仕様から直接辿る経路も適切になり得る。

## マージ後の参照可能性

CodeからCommit、CommitからPRを辿るには、その対応がマージ後も維持されている必要がある。Squash MergeやRebase MergeなどによってCommit IDや履歴構造が変わり得るため、マージ前の参照がそのまま有効であるとは限らない。

Commit Messageには、将来の利用者が変更理由を理解するための最小限の情報と、必要に応じてPRへの参照を残す。保持を評価するときは、作業中のCommitだけでなく、採用するマージ方法によって残る履歴を対象にする。

## RetainedとRepository Load

Retainedと[Repository Load](./cognitive-load.md)は異なる。必要な設計理由がすべて残っていても、多数のファイルに重複し、どれを参照すべきか判断しにくければ、保持の条件を満たしていても理解の負荷は高くなり得る。

Retainedを受け入れ条件とし、取得・理解・利用に必要な負荷は、最終状態の構造的品質として別途評価する。
