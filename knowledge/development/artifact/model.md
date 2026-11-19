---
type: concept
title: Artifactのモデル
description: 評価の対象となるRequirements・Behavior・Implementationと、その内部関係を定義する。
tags: [artifact, model, requirements, behavior, implementation]
---

# Artifactのモデル

評価の対象となる成果物を、内部関係を持つ三つの構造として定義する。

| 記号           | 構造           | 主な要素                     |
| -------------- | -------------- | ---------------------------- |
| \(\mathcal R\) | Requirements   | 要求、制約、依存関係         |
| \(\mathcal B\) | Behavior       | 状態、操作、遷移             |
| \(\mathcal I\) | Implementation | コード、型、データ、実行関係 |

各構造は要素の集合だけでなく内部関係を持つ。このモデルは対象を定義するだけで、対象を評価する方法は定めない。要求への適合は[Verification](../verification/model.md)、目的への適合は[Validation](../validation/model.md)で評価する。

## Requirements

Requirementsは、要求と制約、それらの間の依存関係からなる。各要求は、Behaviorが満たすべき条件を表す。

Requirementsは、目的と実装の間に置く共通の起点である。要求が目的に適するかと、実装が要求を満たすかは、それぞれ別の評価で問う。

## Behavior

Behaviorを、状態・操作・遷移の組として表す。

\[
\mathcal B=(S,O,\delta)
\]

## Implementation

Implementationは、コード・型・データと、それらが取る状態の間の実行関係からなる。

実行は非決定的になり得るため、実行関係は一般に関数ではなく関係として扱う。実装が抽象的なBehaviorを具体化しているかは、[Verification](../verification/model.md#behaviorからimplementationへ)で論証する。

## Diff

二つのArtifactの差分をDiffと呼び、変更前と変更後のArtifactの組として表す。

\[
D=(A_0,A_1)
\]

[PR](../pr-request/model.md#prの物理的構造)のDiffは、変更前後のArtifactの差分である。
