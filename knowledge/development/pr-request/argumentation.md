---
type: concept
title: PRの論証と検証
description: 構造間の性質保存を支持する論証、検証責務、証拠の役割を整理する。
tags: [pull-request, argumentation, verification, evidence]
---

# PRの論証と検証

論証とは、[構造間のマッピング](/development/pr-request/change-semantics.md)が要求される性質を保存していることを、命題・前提・推論・証拠によって支持するものである。

論証グラフを次のように表す。

\[
G_A=(N_A,E_A)
\]

ノードはClaims、前提、補題、Verification Obligations、証拠などであり、辺は論理的な依存関係や明示的な参照である。単なる参照が論理的な支持を意味するとは限らないため、どの証拠がどの命題を、どの前提のもとで支持するかを区別する。

## Verificationの対象

主要な検証対象は、BehaviorがRequirementsを満たすことと、ImplementationがBehaviorを具体化することである。

\[
\mathcal B\models\mathcal R
\qquad
\mathcal I\sqsubseteq\mathcal B
\]

要求をClaimsへ十分に分解できているかも論証対象である。上の二式だけで、要求の解釈や分解の妥当性が自動的に保証されるわけではない。

## Verification Obligations

Verification Obligation（VO、検証責務）は、Requirements、変更内容、維持すべき既存の性質、Repository Rulesから導出する。Repository Rulesは、そのリポジトリで受け入れに必要とされる規則を指す。

各VOには、対象となる命題、前提、対応する変更、証拠への参照、現在の状態を対応付ける。

| 状態     | 意味                                                           |
| -------- | -------------------------------------------------------------- |
| Verified | 適用する受け入れ基準のもとで、十分な証拠によって支持されている |
| Deferred | 検証を後に延期している                                         |
| Waived   | 適用する規則と判断に基づいて、検証を免除している               |
| Open     | 検証が完了しておらず、延期・免除としても整理されていない       |

DeferredとWaivedはVerifiedを意味しない。延期・免除の理由や条件を明示し、受け入れ可能かはRepository Rulesと要求に照らして判断する。状態ラベルだけで受け入れ可否を決定しない。

## 網羅性と証拠の十分性

次の二つを別々に評価する。

- VOの網羅性：要求・変更・既存の性質・規則から必要な責務を導出できているか。
- 証拠の十分性：各VOを支持する証拠が、その適用範囲と前提のもとで十分か。

テスト成功は、実装の振る舞いに関する証拠である。すべての状態についての形式的証明とは区別する。また、個別の証拠が強くても、必要なVOが欠けていればPR全体の十分性は得られない。

設計説明・テスト・形式的証明は、支持できる命題と前提が異なる。何を証拠として受け入れるかは、対象の性質とRepository Rulesに依存する。一般的な十分性の基準は[未定義事項](/development/pr-request/open-questions.md)である。

## 証拠と配置

証拠はBodyだけに集約する必要はない。Diff、テスト、CI Results、設計文書、Commentsなどを明示的に参照し、命題から証拠を追跡できるようにする。[物理的な配置](/development/pr-request/physical-structure.md)と論証上の役割は分離する。
