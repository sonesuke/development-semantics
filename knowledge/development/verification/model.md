---
type: concept
title: Verificationのモデル
description: 要求・仕様への適合を評価するための論証、検証責務、網羅性、証拠の十分性を定義する。
tags: [verification, model, argument, evidence]
---

# Verificationのモデル

Verificationは、与えられた要求・仕様に対象が適合するかを評価する。評価対象は設計、振る舞い、実装やそれらの対応関係であり、PRという変更・レビューの単位を前提としない。

要求・仕様を評価の基準として用いることと、その基準が利用者の目的に適していることは区別する。後者は[Validation](../validation/model.md)の対象である。

## Requirementsを起点とする問い

Requirementsは、目的と実装の間に置く共通の起点である。Validationはそこから目的・利用者の必要へ向かって要求の妥当性を問い、Verificationは実装へ向かって要求への適合を問う。

Verificationでは、要求が目的に適していることを今回の検討の仮定として固定し、「この実装は、その要求を満たしているか」を疑う。要求は実装を評価する基準であり、疑う対象は設計・振る舞い・実装と要求との対応である。

ここでValidationを前提とするとは、その完了や正しさを証明済みとみなすことではない。評価中に固定する仮定を表す。Verificationの成功によって要求の妥当性を証明することもできない。要求の不備が見つかった場合は、[Validation](../validation/model.md#requirementsを起点とする問い)へ問いを切り替え、修正後の要求で再びVerificationを行う。

## 要求から実装への対応

要求から実装への対応を、[Artifactのモデル](../artifact/model.md)のRequirements・Behavior・Implementationと、検証のために置くClaimsの四つの構造、それらの間のマッピングとして扱う。

\[
\mathcal R \xrightarrow{M_{RQ}} \mathcal Q
\xrightarrow{M_{QB}} \mathcal B
\xrightarrow{M_{BI}} \mathcal I
\]

| 記号           | 構造           | 定義                                            |
| -------------- | -------------- | ----------------------------------------------- |
| \(\mathcal R\) | Requirements   | [Artifact](../artifact/model.md#requirements)   |
| \(\mathcal Q\) | Claims         | 命題、前提、補題、含意。Verificationで置く      |
| \(\mathcal B\) | Behavior       | [Artifact](../artifact/model.md#behavior)       |
| \(\mathcal I\) | Implementation | [Artifact](../artifact/model.md#implementation) |

Claimsは、要求を検証可能な命題へ分解した論証のための構造であり、評価対象そのものではない。マッピングは多対多になり得るため、一般には関数ではなく関係として扱う。対応先が存在することと、その対応が正しいことは区別する。

### RequirementsからClaimsへ

要求を、検証可能な命題へ分解する。例えば「出金処理を安全にする」という要求に対して、次のClaimsを置く。

- \(q_1\)：残高が負にならない。
- \(q_2\)：有効な出金が正常に実行される。
- \(q_3\)：同時出金でも整合性が保たれる。

分解されたClaimsは、明示した前提のもとで、元のRequirementsを十分に支持する必要がある。

\[
q_1 \land q_2 \land q_3 \Rightarrow r
\]

この含意は、Claimsを列挙するだけでは成立しない。「安全」の範囲や有効な出金の条件を定め、分解が要求を支持すること自体を論証する。

### ClaimsからBehaviorへ

Claimsを、[Behavior](../artifact/model.md#behavior) \(\mathcal B=(S,O,\delta)\) の状態と操作に関する性質へ翻訳する。

例えば、残高の非負性を状態についての性質として表す。翻訳が忠実であるとは、翻訳先の性質が成り立つときに元のClaimも成り立つことである。

### BehaviorからImplementationへ

抽象的なBehaviorと、実際のコード・型・データ・実行関係を対応付ける。

\[
\mathcal I\sqsubseteq\mathcal B
\]

ここで \(\sqsubseteq\) は、実装が抽象的なBehaviorを具体化する関係を表す。どの観測・操作・実行を対応付けるかは、対象に応じて定める。対応の正当性は、設計、テスト、形式的証明などによって論証する。

### 性質保存

各マッピングの共通条件は、必要な性質が失われないことである。

\[
\operatorname{Preserves}(M_{XY},\Phi_{XY})
\]

\(\Phi_{XY}\) は、そのマッピングで保存すべき性質を表す。構造ごとに表現方法が異なるため、同じ式をそのまま移すことだけを意味しない。保存すべき性質と保存関係の一般的な定義は、[Verificationの未定義事項](./open-questions.md)として残る。

## 結果集合による適合条件

[Validationの評価構造](../validation/model.md#評価の構造)と同じ利用状況・観測を用いる。対象範囲を非空の \(C_A\)、実装の特定の版を \(x\)、その実装から生じ得る結果を \(T_x(c)\)、要求 \(R\) が許容する結果を \(O_R(c)\) とする。

\[
\operatorname{Conforms}(x,R;C_A)
\iff
\forall c\in C_A,\quad
\varnothing\ne T_x(c)\subseteq O_R(c)
\]

これは要求を固定し、実装の結果集合を評価する条件である。非空性は結果集合が空であることによる自明な成立を避ける。失敗や未完了も結果に含める。

要求が目的に適するというValidation側の仮定は、実装を調べずにこの条件を成立させる根拠にはならない。また、要求の妥当性が未確認でも、この条件を要求への条件付きの適合として独立に検証できる。

## 論証

論証とは、対象の命題を、前提・推論・証拠によって支持するものである。構造間の対応を扱う場合は、その対応が要求される性質を保存していることを支持する。

\[
G_A=(N_A,E_A)
\]

ノードはClaims、前提、補題、Verification Obligations、証拠などであり、辺は論理的な依存関係や明示的な参照である。単なる参照が論理的な支持を意味するとは限らないため、どの証拠がどの命題を、どの前提のもとで支持するかを区別する。

## Verification Obligations

Verification Obligation（VO、検証責務）は、評価対象の適合を示すために確認すべき命題である。要求・仕様、対象の性質、適用する規則から導出する。変更を評価する場合は、変更内容と維持すべき既存の性質も導出元になる。

各VOには、対象となる命題、前提、対象の範囲や版、証拠への参照、現在の状態を対応付ける。どの責務が必要かと、その責務が満たされているかは別々に評価する。

## 網羅性と証拠の十分性

- VOの網羅性：要求・仕様・対象の性質・規則から必要な責務を導出できているか。
- 証拠の十分性：各VOを支持する証拠が、その適用範囲と前提のもとで十分か。

テスト成功は、実装の振る舞いに関する証拠である。すべての状態についての形式的証明とは区別する。また、個別の証拠が強くても、必要なVOが欠けていれば評価全体の十分性は得られない。

設計説明・テスト・形式的証明は、支持できる命題と前提が異なる。何を証拠として受け入れるかは、対象の性質と適用する受け入れ基準に依存する。証拠がどこに置かれているかだけでは、その論証上の役割や強さは決まらない。

証拠の一般的な十分性や適合関係の厳密な条件は、[未定義事項](./open-questions.md)として残る。
