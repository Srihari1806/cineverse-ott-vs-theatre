@echo off
echo ===================================================
echo   Starting CineVerse (OTT VS THEATRE)...
echo ===================================================
echo.

IF NOT EXIST "node_modules" (
    echo [1/2] Installing dependencies...
    call npm install --legacy-peer-deps
) ELSE (
    echo [1/2] Node modules found.
)

echo [2/2] Launching application on http://localhost:3000...
start "" powershell -NoProfile -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:3000'"

set PORT=3000
set HOST=127.0.0.1
IF EXIST ".output\server\index.mjs" (
    node .output\server\index.mjs
) ELSE (
    call npm run dev -- --port 3000
)

pause
