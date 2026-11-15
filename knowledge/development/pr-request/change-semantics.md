---
type: concept
title: ソフトウェア変更の意味論
description: 要求から実装までの対応関係と、PRが論証すべき状態遷移を定義する。
tags: [pull-request, semantics, requirements, refinement]
---

# ソフトウェア変更の意味論

ソフトウェア変更を、内部関係を持つ四つの構造と、それらの間のマッピングとして扱う。

\[
\mathcal R \xrightarrow{M_{RQ}} \mathcal Q
\xrightarrow{M_{QB}} \mathcal B
\xrightarrow{M_{BI}} \mathcal I
\]

| 記号           | 構造           | 主な要素                     |
| -------------- | -------------- | ---------------------------- |
| \(\mathcal R\) | Requirements   | 要求、制約、依存関係         |
| \(\mathcal Q\) | Claims         | 命題、前提、補題、含意       |
| \(\mathcal B\) | Behavior       | 状態、操作、遷移、不変条件   |
| \(\mathcal I\) | Implementation | コード、型、データ、実行関係 |

各構造は要素の集合だけでなく内部関係を持つ。マッピングは多対多になり得るため、一般には関数ではなく関係として扱う。対応先が存在することと、その対応が正しいことは区別する。

## RequirementsからClaimsへ

要求を、検証可能な命題へ分解する。例えば「出金処理を安全にする」という要求に対して、次のClaimsを置く。

- \(q_1\)：残高が負にならない。
- \(q_2\)：有効な出金が正常に実行される。
- \(q_3\)：同時出金でも整合性が保たれる。

分解されたClaimsは、明示した前提のもとで、元のRequirementsを十分に支持する必要がある。

\[
q_1 \land q_2 \land q_3 \Rightarrow r
\]

この含意は、Claimsを列挙するだけでは成立しない。「安全」の範囲や有効な出金の条件を定め、分解が要求を支持すること自体を論証する。

## ClaimsからBehaviorへ

Claimsを、状態と操作に関する性質へ翻訳する。

\[
\mathcal B=(S,O,\delta)
\]

例えば、残高の非負性を有効な状態の集合 \(S_{\mathrm{valid}}\) として表し、遷移による保存を要求する。

\[
\forall s\in S_{\mathrm{valid}},\ \forall o\in O,
\quad \delta(s,o)\in S_{\mathrm{valid}}
\]

この表現は、\(\delta\) が対象操作について定義されていることを前提とする。操作に事前条件がある場合は、適用可能な操作を量化の対象にするか、拒否される操作の振る舞いもモデル化する。

## BehaviorからImplementationへ

抽象的なBehaviorと、実際のコード・型・データ・実行関係を対応付ける。

\[
\mathcal I\sqsubseteq\mathcal B
\]

ここで \(\sqsubseteq\) は、実装が抽象的なBehaviorを具体化する関係を表す。どの観測・操作・実行を対応付けるかは、対象に応じて定める。対応の正当性は、設計、テスト、形式的証明などによって論証する。

## 性質保存

各マッピングの共通条件は、必要な性質が失われないことである。

\[
\operatorname{Preserves}(M_{XY},\Phi_{XY})
\]

\(\Phi_{XY}\) は、そのマッピングで保存すべき性質を表す。構造ごとに表現方法が異なるため、同じ式をそのまま移すことだけを意味しない。保存すべき性質と保存関係の一般的な定義は、[未定義事項](./open-questions.md)として残る。

## PRが扱う状態遷移

PRは、リポジトリ状態の変更を扱う。

\[
(\mathcal R_0,\mathcal B_0,\mathcal I_0)
\xrightarrow{P}
(\mathcal R_1,\mathcal B_1,\mathcal I_1)
\]

この表記は意味論上の主要要素を示したものであり、リポジトリ状態の全内容を列挙するものではない。Claimsはこの対応を支持する[論証](./argumentation.md)で扱う。

PRは、変更後の実装がRequirementsを満たすことと、維持すべき既存の性質が失われないことを論証する。局所的な正しさに加え、必要に応じて既存Behaviorとの合成、互換性、非干渉性を扱う。

要求の出所や、要求を採用した理由の正当性は、評価の前提とする。一方、与えられた要求に対して、その設計・実装を選択した理由はPRの論証対象である。
