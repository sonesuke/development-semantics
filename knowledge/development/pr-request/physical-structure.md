---
type: concept
title: PRの物理的構造
description: GitHub上の配置と論証上の役割を分離し、PRの構成要素を整理する。
tags: [pull-request, structure, commits, review]
---

# PRの物理的構造

PRの最終スナップショットを次のように表す。

\[
P=(T,W,\mathcal K,X,V)
\]

| 記号           | 内容                                                |
| -------------- | --------------------------------------------------- |
| \(T\)          | Title                                               |
| \(W\)          | PR Body                                             |
| \(\mathcal K\) | 順序付きのCommitsと、それぞれのCommit Message・変更 |
| \(X\)          | Inline CommentsとGeneral Comments                   |
| \(V\)          | CI Results                                          |

Claimsには \(\mathcal Q\)、Commitsには \(\mathcal K\) を使い、記号の衝突を避ける。PR全体のDiffは、基準状態と変更後の状態の比較として観測される。

## GitHubの要素と役割

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

Commitは独立したPRと同じ受け入れ単位とは限らない。変更と論証を読み進める単位として、その順序とまとまりを設計する。分割の考え方は[PR分割と階層化](./decomposition.md)を参照する。

## 配置を決める基準

まず情報の有効条件を判断し、次に参照対象と論証上の役割、利用者のアクセス経路、検証可能性から置き場所を決める。[知識の配置](./knowledge-placement.md)は、各媒体への固定的な割り当てではなく、これらの条件から導く。
