@echo off
setlocal enabledelayedexpansion

if "%~1"=="" (
    exit /b 1
)

set "EXE_PATH=%~1"
set "ARGS="
set "WORK_DIR="

if not "%~3"=="" (
    set "WORK_DIR=%~2"
    set "ARGS=%~3"
) else if not "%~2"=="" (
    if exist "%~2\" (
        set "WORK_DIR=%~2"
    ) else (
        set "ARGS=%~2"
    )
)

if not exist "!EXE_PATH!" (
    exit /b 1
)

if not "!WORK_DIR!"=="" (
    cd /d "!WORK_DIR!" 2>nul || (
        exit /b 1
    )
)

start "" "!EXE_PATH!" !ARGS!

endlocal