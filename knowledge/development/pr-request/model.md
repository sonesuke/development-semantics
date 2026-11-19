---
type: concept
title: PRのモデル
description: リポジトリ状態の遷移・論証・物理的構造・Review Loadと、品質の受け入れ条件を定義する。
tags: [pull-request, model, semantics, verification]
---

# PRのモデル

PRを、要求から実装への変更、その正当性を支持する論証、情報の物理的な配置として定義する。定義から導く性質は[定理](./theorems.md)、分割・提示・配置の選択は[戦略](./strategies.md)で扱う。

## 変更の意味論

Requirements・Behavior・Implementationの構造は[Artifactのモデル](../artifact/model.md)、Claimsを介したそれらの対応は[Verificationのモデル](../verification/model.md#要求から実装への対応)を参照する。PRでは、その対応を変更前後で評価する。

### PRが扱う状態遷移

PRは、[リポジトリ状態](../repository/model.md#リポジトリ状態)の遷移を扱う。

\[
S_0\xrightarrow{P}S_1,\qquad
(\mathcal R_0,\mathcal B_0,\mathcal I_0)
\xrightarrow{P}
(\mathcal R_1,\mathcal B_1,\mathcal I_1)
\]

後者は意味論上の主要要素を示したものであり、リポジトリ状態の全内容を列挙するものではない。状態そのものの定義と評価は[Repositoryのモデル](../repository/model.md)に従い、PRは状態を変える単位として扱う。Claimsはこの対応を支持する[論証](./model.md#論証と検証)で扱う。

PRは、変更後の実装がRequirementsを満たすことと、維持すべき既存の性質が失われないことを論証する。局所的な正しさに加え、必要に応じて既存Behaviorとの合成、互換性、非干渉性を扱う。

要求の出所や、要求を採用した理由の正当性は、通常の変更評価では前提とし、その根拠は[Validation](../validation/model.md)で扱う。PRで要求や利用上の前提を変更する場合は、その根拠を参照し、目的への適合を再評価する必要がある。与えられた要求に対して、その設計・実装を選択した理由はPRの論証対象である。

## 論証と検証

論証グラフ、Verification Obligation（VO、検証責務）、網羅性と証拠の十分性の定義は、独立した[Verificationのモデル](../verification/model.md)に従う。ここでは、そのモデルをPRの変更と受け入れ判断に適用する。

### PRで検証すること

[変更の意味論](#変更の意味論)におけるRequirements・Claims・Behavior・Implementationの対応について、要求される性質が保存されることを論証する。変更後の適合に加えて、維持すべき既存の性質、互換性、必要な統合時の性質も対象とする。

### PRの検証責務

PRのVOは、Requirements、変更内容、維持すべき既存の性質、[Repository Rules](../repository/model.md#repository-rules)から導出する。

各VOには、対象となる命題、前提、対応する変更と対象の版、証拠への参照、現在の状態を対応付ける。証拠を得た後に変更が加わった場合は、その証拠を引き続き利用できるかを確認する。

| 状態     | 意味                                                           |
| -------- | -------------------------------------------------------------- |
| Verified | 適用する受け入れ基準のもとで、十分な証拠によって支持されている |
| Deferred | 検証を後に延期している                                         |
| Waived   | 適用する規則と判断に基づいて、検証を免除している               |
| Open     | 検証が完了しておらず、延期・免除としても整理されていない       |

DeferredとWaivedはVerifiedを意味しない。延期・免除の理由や条件を明示し、受け入れ可能かはRepository Rulesと要求に照らして判断する。状態ラベルだけで受け入れ可否を決定しない。

VOの網羅性と、各VOの証拠の十分性を別々に評価する。一般的な十分性の問題は[Verificationの未定義事項](../verification/open-questions.md)で扱い、PRでは対象の性質とRepository Rulesに応じた受け入れ基準を適用する。

### Validationとの接続

要求や利用上の前提を変更するPRでは、[Validationのモデル](../validation/model.md#requirementsを起点とする問い)に従って、目的・利用状況・評価基準・証拠を明示するか、その根拠を参照する。

Validationによって要求や前提を見直した場合は、PRのVOと既存の証拠の適用範囲も見直す。通常の変更評価で要求を前提とすることは、Validationが完了していることを自動的に意味しない。

## PRの物理的構造

PRを次のように表す。

\[
P=(T,W,D,V)
\]

| 記号  | 内容                                        |
| ----- | ------------------------------------------- |
| \(T\) | Title                                       |
| \(W\) | PR Body                                     |
| \(D\) | [Artifact](../artifact/model.md#diff)のDiff |
| \(V\) | CI Results                                  |

Diffは、変更前後のArtifactの差分である。TitleはBodyの要約である。CI Resultsは、検証されたVOとその証拠として数える。

Bodyには、対応する[Issueの変更要件](../issue/model.md#変更要件)の充足と、Verificationの状況を示す。Verificationの状況は、証拠によって検証された[VO](../verification/model.md#verification-obligations)と、検証が残っているVOからなる。検証が残っているVOには、残したままでよい理由（justification）を伴う。PRは変更要件をすべて充足するものとし、部分的な充足は認めない。変更要件そのものを見直すべき場合は、変更要件の修正（amendment）を提案として含め、修正後の変更要件をすべて充足する。修正は、変更前と変更後の変更要件の組と、その修正が正当である理由（justification）からなる。正当性は、[Validation](../validation/model.md)による目的への適合の評価を根拠とする。ArtifactのRequirementsへの変更は、Diffに含まれる。

変更要件の修正と検証のやり残しには、常にその理由（justification）を伴う。通常の変更は変更要件の充足と検証の証拠で支え、そこから外れるものは理由で支える。

### GitHubの要素と役割

| 要素             | 物理的な役割                                     |
| ---------------- | ------------------------------------------------ |
| Title            | PRのタイトル                                     |
| Body             | PR全体に付属する文章                             |
| Commits          | 変更を順序付きで分割した単位                     |
| Commit Messages  | 各Commitのラベルと説明                           |
| Diff             | 変更前後のコードなどの差分                       |
| Inline Comments  | Diff上の位置に紐づくコメント                     |
| General Comments | PR全体に紐づくコメント                           |
| CI Results       | 自動検証の結果                                   |
| Code Comments    | ソースコードの一部。PRではDiffを通じて観測される |

GitHub上の配置だけで、論証上の役割は決まらない。Inline Commentは位置に紐づく機能であり、必ずしも局所的な説明やレビュー中だけ有効な情報に限定されない。Bodyには、複数ファイルにまたがる説明に加えて、PR全体の受け入れ判断に必要な情報を配置できる。

## リポジトリ状態との関係

変更後の状態 \(S_1\) についての条件は、[Repositoryのモデル](../repository/model.md)で定義する。PRでは次を用いる。

| 定義                                                            | PRでの用途                                   |
| --------------------------------------------------------------- | -------------------------------------------- |
| [知識の保持](../repository/model.md#知識の保持)                 | マージ後に必要な知識を取得できるかを評価する |
| [知識へのアクセス層](../repository/model.md#知識へのアクセス層) | PR Recordを含む、知識の配置先と探索経路      |
| [情報の有効条件](../repository/model.md#情報の有効条件)         | 状態と遷移のどちらについての情報かを区別する |
| [Repository Load](../repository/model.md#repository-load)       | マージ後の状態を理解・利用・変更する負荷     |

## 認知負荷

PRの認知効率は、論証を追跡する際に、不必要な切り替え・記憶・推論を要求しないかという観点から評価する。

\[
C=(C_{\mathrm{switch}},C_{\mathrm{memory}},C_{\mathrm{inference}})
\]

各成分は異なる負担を表す。普遍的な順位や数値的な重みは定めず、利用者とタスクを評価の前提とする。

読者の知識・語彙と表現との距離は、PRに限らない[文章の読みやすさのモデル](../../documentation/expression/model.md)で扱う。論証の構造を整えても、使う言葉や前提を読者が理解できなければ、説明・判断へ進めない。PRでは両方の観点を組み合わせる。

### Review Load

\[
C_{\mathrm{review}}(\mathcal P,\pi,K_0)
\]

PRの変更を理解し、受け入れ判断を行うための認知負荷である。\(\mathcal P\) は対象となるPR群、\(\pi\) は提示・閲覧の順序、\(K_0\) はレビュー開始時の知識を表す。

Review Loadは、PR分割、Commit構造、提示順序、参照構造によって変化し得る。

マージ後の状態を理解・利用・変更する負荷は、PRの構成ではなく状態で定まる[Repository Load](../repository/model.md#repository-load)として別に評価する。

## 品質の受け入れ条件

よいPRの条件を、次のように表す。

\[
\boxed{
\operatorname{Good}(P)=
\operatorname{Sound}(P)
\land\operatorname{Adequate}(P)
\land\operatorname{Structured}(P)
\land\operatorname{Retained}(S_1,K_{\mathrm{required}})
}
\]

\(S_1\) はPRによる変更後の状態であり、\(\operatorname{Retained}\) は[Repositoryのモデル](../repository/model.md#知識の保持)に従う。この式は品質評価の枠組みを定めるものであり、各述語を機械的に判定する完全な手続きを与えるものではない。

| 条件       | 評価すること                                                 |
| ---------- | ------------------------------------------------------------ |
| Sound      | 構造間のマッピングについて、妥当な論証がある                 |
| Adequate   | Requirements、VO、Repository Rulesに対して十分である         |
| Structured | 変更と論証が適切に分割・配置され、不要な認知操作を要求しない |
| Retained   | 将来必要な知識を所定の経路で取得できる                       |

正当性、構造性、認知効率という観点に加え、マージ後の知識の保持を明示的な受け入れ条件とする。

### 評価で区別すること

- マッピングが存在することと、その対応が正しいこと。
- VOが網羅されていることと、各VOの証拠が十分であること。
- テスト成功と、すべての状態についての形式的証明。
- 知識が保持されていることと、その知識を理解する負荷が低いこと。
- 要求を採用した理由の正当性と、与えられた要求に対して実装を選択した理由。

Repository LoadはRetainedに吸収しない。必要な知識の完全性とは別に、変更後の状態の理解・利用・変更に必要な負荷を評価する。

各述語の判定条件や負荷の比較は形式化の途中にある。[未定義事項](./open-questions.md)を参照する。
