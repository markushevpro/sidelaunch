@echo off
setlocal

:: ensure user supplied a filename with a .lnk extension
if /i "%~x1" neq ".lnk" (
    echo usage: %~nx0 shortcut.lnk
    goto :EOF
)

:: set filename to the fully qualified path + filename
set "filename=%~f1"

:: convert single backslashes to double
set "filename=%filename:\=\\%"

:: get target
for /f "tokens=1* delims==" %%I in ('wmic path win32_shortcutfile where "name='%filename%'" get target /format:list ^| find "="') do (
    echo(%%J
)