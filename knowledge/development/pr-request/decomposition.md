---
type: concept
title: PR分割と階層化
description: Claimの論証境界とBehaviorの変更境界をもとに、PRの分割と統合を評価する。
tags: [pull-request, decomposition, composition, dependencies]
---

# PR分割と階層化

PRの分割境界は、Claimの論証境界とBehaviorの変更境界が一致する箇所を第一候補とする。

\[
\mathcal R_i\rightarrow\mathcal Q_i
\rightarrow\mathcal B_i\rightarrow\mathcal I_i
\]

各PRが対応する部分構造を担当する。ファイル数や差分の行数だけでは、論証が完結する境界は決まらない。

## 分割の評価

1. Claimの論証が部分構造内で完結するか。
2. Behaviorの変更が独立しているか。
3. Implementationの変更を分離できるか。
4. Verificationを独立して実施できるか。
5. 境界をまたぐ依存関係が明示されているか。

共通の前提や不変条件は、補題やインターフェースとして切り出せる。外部の前提への依存があることと、論証が未完了であることは同一ではない。何を前提として利用できるか、その根拠にどこからアクセスできるかを明示する必要がある。

ただし、これは部分構造の閉包性の厳密な定義ではない。論証が完結する条件と、依存先に何を要求するかは[未定義事項](/development/pr-request/open-questions.md)として残る。

## CommitとPR

Commitは、一つのPR内で変更と論証を順序付きに提示する単位にもなる。共通の前提を先に導入し、その前提を利用する変更を後に置くなど、[予定調和](/development/pr-request/cognitive-load.md)に沿って構成する。

PRの独立した受け入れ判断と、Commitの読み進めやすさは区別する。Commitの数を増やすだけでは、論証の分割や認知負荷の改善は保証されない。

## Merge Branchによる階層化

Merge Branchは、複数のPRを上位目的のもとで統合する構造として扱う。

個別PRの正当性に加えて、合成後のBehaviorがRequirementsを満たすことを論証する。個々のPRが正しくても、共有状態、インターフェース、実行順序などへの相互作用によって、合成後の性質が保存されるとは限らない。

必要に応じて、互換性、非干渉性、共有する不変条件、統合時の検証責務を明示する。Behaviorの独立性と安全な合成の一般的な条件は、まだ形式化していない。
