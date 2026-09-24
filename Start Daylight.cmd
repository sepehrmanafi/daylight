@echo off
setlocal
cd /d "%~dp0"
title Daylight - Your personal workspace
where node >nul 2>nul
if errorlevel 1 (
  echo Daylight needs Node.js 20.19 or newer to run its local web server.
  echo Please install the LTS version from https://nodejs.org and try again.
  pause
  exit /b 1
)
set HOST=127.0.0.1
set PORT=4173
set OPEN_BROWSER=1
node scripts\serve.mjs
if errorlevel 1 pause
