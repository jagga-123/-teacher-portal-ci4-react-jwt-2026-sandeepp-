$ErrorActionPreference = "Stop"

$projectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$localRoot = Join-Path $projectRoot ".mysql-local"
$dataDir = Join-Path $localRoot "data"
$logDir = Join-Path $localRoot "logs"
$myIni = Join-Path $localRoot "my.ini"
$schemaFile = Resolve-Path (Join-Path $projectRoot "..\database\schema.sql")
$mysqld = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld.exe"
$mysql = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
$port = 3307

New-Item -ItemType Directory -Force $dataDir | Out-Null
New-Item -ItemType Directory -Force $logDir | Out-Null

if (-not (Test-Path (Join-Path $dataDir "auto.cnf"))) {
    & $mysqld --initialize-insecure --basedir="C:/Program Files/MySQL/MySQL Server 8.0" "--datadir=$($dataDir -replace '\\','/')"
}

@"
[mysqld]
basedir=C:/Program Files/MySQL/MySQL Server 8.0
datadir=$($dataDir -replace '\\','/')
port=$port
bind-address=127.0.0.1
skip-networking=0
lower_case_table_names=1
log-error=$((Join-Path $logDir "local.err") -replace '\\','/')
pid-file=$((Join-Path $logDir "local.pid") -replace '\\','/')
"@ | Set-Content $myIni

$alreadyRunning = Get-CimInstance Win32_Process -Filter "Name='mysqld.exe'" |
    Where-Object { $_.CommandLine -like "*$($myIni -replace '\\','/')*" }

if (-not $alreadyRunning) {
    Start-Process -FilePath $mysqld -ArgumentList "--defaults-file=$($myIni -replace '\\','/')" | Out-Null
    Start-Sleep -Seconds 3
}

& $mysql -h 127.0.0.1 -P $port -u root -e "CREATE DATABASE IF NOT EXISTS teacher_portal;"

$tableExists = (& $mysql -N -s -h 127.0.0.1 -P $port -u root -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='teacher_portal' AND table_name='auth_user';").Trim()
if ($tableExists -eq "0") {
    Get-Content $schemaFile | & $mysql -h 127.0.0.1 -P $port -u root
}

Write-Output "Local MySQL ready on 127.0.0.1:$port"
