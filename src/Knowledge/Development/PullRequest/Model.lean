import Knowledge.Development.Artifact.Model
import Knowledge.Development.Issue.Model
import Knowledge.Development.Verification.Model

/-!
# PRのモデル

`knowledge/development/pr-request/model.md` を形式化する。
-/

namespace Knowledge.Development

structure PullRequest.Justification where

structure PullRequest.Amendment where
  before : Issue.Modification
  after : Issue.Modification
  justification : PullRequest.Justification

structure PullRequest.ModificationFulfillment where
  modification : Issue.Modification
  amendment : Option PullRequest.Amendment

structure PullRequest.VerificationStatus where
  verified : List (Verification.Obligation × Verification.Evidence)
  remaining : List (Verification.Obligation × PullRequest.Justification)

structure PullRequest.Body where
  modification : PullRequest.ModificationFulfillment
  verification : PullRequest.VerificationStatus

structure PullRequest.Summary (body : PullRequest.Body) where

structure PullRequest where
  body : PullRequest.Body
  title : PullRequest.Summary body
  diff : Artifact.Diff
  ciResults : List (Verification.Obligation × Verification.Evidence)

namespace PullRequest

/-- 検証済みのVO：Bodyに示したものとCIの結果。 -/
def verified (p : PullRequest) : List (Verification.Obligation × Verification.Evidence) :=
  p.body.verification.verified ++ p.ciResults

end PullRequest

end Knowledge.Development
