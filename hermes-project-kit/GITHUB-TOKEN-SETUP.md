# GitHub connection for Hermes

Create a **fine-grained personal access token** with these settings:

- Name: `hermes-project-builder`
- Expiration: 90 days
- Repository access: **Only select repositories** — choose only project repositories that Hermes should edit
- Repository permissions: **Contents: Read and write**, **Pull requests: Read and write**, and required **Metadata: Read-only**

Do not paste the token into chat or commit it to a repository. Run `CONNECT-GITHUB.ps1` locally after generating it; it sends the token directly to the local GitHub CLI credential store and prints only the authentication status.
