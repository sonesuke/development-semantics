---
type: concept
title: Repositoryのモデル
description: リポジトリ状態、知識へのアクセス層、知識の保持、情報の有効条件、Repository Rules、Repository Loadを定義する。
tags: [repository, model, knowledge, cognition]
---

# Repositoryのモデル

リポジトリを、ある時点の状態と、その状態から知識を取得する経路として定義する。状態を変える単位としての変更は[PR](../pr-request/model.md)で扱う。

## リポジトリ状態

リポジトリ状態 \(S\) は、成果物、[Issue](../issue/model.md)、[PR](../pr-request/model.md)で構成する。

\[
S=(A,\ \mathrm{Issues},\ \mathrm{PRs})
\]

\(A\) は[Artifact](../artifact/model.md)、すなわちRequirements・Behavior・Implementationの組である。

## 知識へのアクセス層

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

PR RecordはGitHubなどのサービス上に置かれるが、リポジトリから辿れる限り、知識を取得する層の一つとして扱う。

## 知識の保持

Retainedは、必要な知識が失われず、将来の利用者が所定の経路で取得できるという完全性の条件である。

\[
\operatorname{Retained}(S,K_{\mathrm{required}})
\]

\(S\) は評価する状態、\(K_{\mathrm{required}}\) は将来必要となる知識である。この表記では、利用者と想定するアクセス経路を評価の前提としている。必要な知識の範囲と、経路の成立条件の厳密化は[未定義事項](./open-questions.md)として残る。

すべての知識がWorking Tree内に直接記述されていることは要求しない。外部仕様やPR Recordなどへの明示的な参照によって、所定の経路で取得できる場合もある。ただし、情報がどこかに存在することだけでは、アクセス可能性は示せない。

## 情報の有効条件

説明 \(e\) の有効性を次のように表す。

\[
\operatorname{Valid}(e,S,E)
\]

\(S\) はリポジトリの状態、\(E\) は外部環境や依存関係の状態である。これは状態についての説明の表記であり、遷移についての説明には対象となる変更前後の状態や検証時点も明示する。状態依存と遷移依存を一般に区別する厳密な条件は、まだ定義していない。

## Repository Rules

Repository Rulesは、そのリポジトリで変更の受け入れに必要とされる規則である。必要な検証、レビュー、CI、マージ方法などを含む。

規則はリポジトリごとに定まり、[PR](../pr-request/model.md#prの検証責務)の検証責務と受け入れ判断の導出元になる。

## Repository Load

\[
H_{\mathrm{repo}}(S;K,T)
\]

リポジトリを理解・利用・変更するための認知負荷である。\(S\) は状態、\(K\) は利用者の知識、\(T\) は行うタスクを表す。

コードだけでなく、文書・テスト・履歴・参照経路も理解の負荷に関わるため、評価対象は実装 \(\mathcal I\) より広い状態 \(S\) として扱う。Repository Loadは状態・知識・タスクだけで定まり、その状態に至った変更の経緯には依存しない。

必要な知識を取得できることと、その取得・理解・利用の負荷が低いことは別の条件である。例えば、必要な設計理由がすべて残っていても、多数のファイルに重複し、どれを参照すべきか判断しにくければ、保持の条件を満たしていても理解の負荷は高くなり得る。Repository LoadはRetainedに吸収しない。

読者の知識・語彙と表現との距離は、[文章の読みやすさのモデル](../../documentation/expression/model.md)で扱う。
