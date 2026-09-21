# Downloads the current official portable GitHub CLI for this project kit.
# The archive hash is checked against the release checksums before extraction.

$release = Invoke-RestMethod 'https://api.github.com/repos/cli/cli/releases/latest'
$asset = $release.assets | Where-Object { $_.name -match '^gh_.*_windows_amd64\.zip$' } | Select-Object -First 1
$checksums = $release.assets | Where-Object { $_.name -match 'checksums' } | Select-Object -First 1

if (-not $asset -or -not $checksums) {
  throw 'Could not find the official GitHub CLI Windows archive and checksum asset.'
}

$archive = Join-Path $env:TEMP $asset.name
$checksumFile = Join-Path $env:TEMP $checksums.name
Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $archive
Invoke-WebRequest -Uri $checksums.browser_download_url -OutFile $checksumFile

$expected = (Select-String -LiteralPath $checksumFile -Pattern ([regex]::Escape($asset.name)) |
  Select-Object -First 1).Line.Split(' ')[0].Trim().ToLowerInvariant()
$actual = (Get-FileHash -LiteralPath $archive -Algorithm SHA256).Hash.ToLowerInvariant()
if (-not $expected -or $actual -ne $expected) {
  throw 'GitHub CLI checksum verification failed. Nothing was installed.'
}

$destination = Join-Path $PSScriptRoot 'tools\github-cli'
New-Item -ItemType Directory -Path $destination -Force | Out-Null
Expand-Archive -LiteralPath $archive -DestinationPath $destination -Force
Write-Host 'Verified portable GitHub CLI is ready.'
