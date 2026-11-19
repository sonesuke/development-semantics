---
type: concept
title: Issueのモデル
description: Issueと、その変更要件、リポジトリ状態との関係を定義する。
tags: [issue, model]
---

# Issueのモデル

Issueは、[リポジトリ状態](../repository/model.md#リポジトリ状態) \(S=(A,\ \mathrm{Issues},\ \mathrm{PRs})\) を構成する要素の一つである。Issueは、変更要件を持つ。

## 変更要件

Issueは、[ArtifactのRequirements](../artifact/model.md#requirements)をどう変更するかを表す変更要件（modification）を持つ。RequirementsはArtifactにあり、それを変更するものはIssueにある。

PRは、変更要件の充足と、変更要件の修正（amendment）の提案を[Body](../pr-request/model.md#prの物理的構造)に示す。変更要件の内部構造と、どのPRがどのIssueに対応するかは、まだ定義していない。
