import Knowledge.Development.Artifact.Model
import Knowledge.Development.Issue.Model
import Knowledge.Development.PullRequest.Model

/-!
# Repositoryのモデル

`knowledge/development/repository/model.md` を形式化する。
-/

namespace Knowledge.Development

/-- リポジトリ状態 `S = (A, Issues, PRs)`。 -/
structure Repository where
  artifact : Artifact
  issues : List Issue
  pullRequests : List PullRequest

end Knowledge.Development
