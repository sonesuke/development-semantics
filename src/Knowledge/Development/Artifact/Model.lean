/-!
# Artifactのモデル

`knowledge/development/artifact/model.md` を形式化する。
-/

namespace Knowledge.Development

structure Requirements where

structure Behavior where

structure Implementation where

/-- 評価対象の成果物 `(𝓡, 𝓑, 𝓘)`。 -/
structure Artifact where
  requirements : Requirements
  behavior : Behavior
  implementation : Implementation

/-- 二つのArtifactの差分 `(A₀, A₁)`。 -/
structure Artifact.Diff where
  before : Artifact
  after : Artifact

end Knowledge.Development
