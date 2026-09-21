# Run this locally after you generate the fine-grained GitHub token.
# Do not paste the token into chat, a source file, or an .env file.

$gh = Get-ChildItem -Path (Join-Path $PSScriptRoot 'tools\github-cli') -Recurse -Filter gh.exe |
  Select-Object -First 1 -ExpandProperty FullName

if (-not $gh) {
  throw 'Portable GitHub CLI is missing. Restore the hermes-project-kit/tools/github-cli folder.'
}

$secureToken = Read-Host 'Paste the GitHub fine-grained token' -AsSecureString
$bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken)

try {
  $token = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  $token | & $gh auth login --hostname github.com --git-protocol https --with-token
  & $gh auth setup-git
  & $gh auth status
}
finally {
  if ($bstr -ne [IntPtr]::Zero) {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
  }
  Remove-Variable token -ErrorAction SilentlyContinue
}
