@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js is required. Install Node.js 20.19 or later, then run this launcher again.
  pause
  exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
  echo npm was not found. Repair or reinstall Node.js, then run this launcher again.
  pause
  exit /b 1
)

if not exist "node_modules\vite\bin\vite.js" (
  echo Installing project dependencies. This requires access to the npm registry.
  call npm install
  if errorlevel 1 (
    echo Dependency installation failed. Review the npm error above.
    pause
    exit /b 1
  )
)

start "AI Prompt Finder server" /D "%~dp0" cmd /k "npm run dev -- --host 127.0.0.1 --strictPort"
echo Waiting for AI Prompt Finder to start...
for /L %%I in (1,1,30) do (
  powershell -NoProfile -Command "try { $response = Invoke-WebRequest -Uri 'http://127.0.0.1:5173/' -UseBasicParsing -TimeoutSec 1; if ($response.Content -match '<title>AI Prompt Finder</title>') { exit 0 }; exit 1 } catch { exit 1 }" >nul 2>&1
  if not errorlevel 1 goto :open
  timeout /t 1 /nobreak >nul
)

echo The app did not respond on port 5173. Check the server window for an error.
echo If another program is using that port, close it and run this launcher again.
pause
exit /b 1

:open
echo Opening http://127.0.0.1:5173/
start "" "http://127.0.0.1:5173/"
echo Keep the AI Prompt Finder server window open while testing.
exit /b 0
