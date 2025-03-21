@echo off
setlocal

set "exe_in=%~1"
set "out_dir=.\data\icons"
set "ico_out=%out_dir%\%~2.png"

set "psCommand="[void][Reflection.Assembly]::LoadWithPartialName('System.Drawing');[Drawing.Icon]::ExtractAssociatedIcon(\"%exe_in%\").ToBitmap().Save(\"%ico_out%\",\"Png\")""

powershell -noprofile -noninteractive %psCommand%