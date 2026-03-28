$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$myIni = Join-Path $projectRoot ".mysql-local\my.ini"

$target = Get-CimInstance Win32_Process -Filter "Name='mysqld.exe'" |
    Where-Object { $_.CommandLine -like "*$($myIni -replace '\\','/')*" }

if ($target) {
    $target | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
    Write-Output "Local MySQL stopped"
} else {
    Write-Output "Local MySQL was not running"
}
