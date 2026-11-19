---
type: concept
title: Artifactの未定義事項
description: Requirements・Behavior・Implementationの表現と粒度について残る課題を整理する。
tags: [artifact, formalization, open-questions]
---

# Artifactの未定義事項

[モデル](./model.md)は評価対象の構造を定義する枠組みであり、具体的な対象をどの粒度で表すかはまだ定めていない。

| 項目           | 未定義の内容                                                       |
| -------------- | ------------------------------------------------------------------ |
| 要求の意味     | 自然言語の要求を、Behaviorについての条件としてどこまで表せるか     |
| Behaviorの粒度 | 状態と操作をどの抽象度で定め、事前条件や拒否される操作をどう扱うか |
| Behaviorの性質 | 状態・遷移・操作列に関する性質をどう表すか                         |
| 実装の観測     | コード・型・データのどの側面を実行関係として観測するか             |

構造の間の対応と性質保存は[Verificationの未定義事項](../verification/open-questions.md)で扱う。
