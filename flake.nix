{
  description = "development-semantics: knowledge bundle in Open Knowledge Format (OKF)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        # Node.js runs prettier, markdownlint-cli2 and the OKF validator (see package.json);
        # nixfmt, statix and deadnix format and lint the Nix files.
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.nodejs
            pkgs.nixfmt
            pkgs.statix
            pkgs.deadnix
          ];
        };

        formatter = pkgs.nixfmt;
      }
    );
}
