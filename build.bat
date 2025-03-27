wails build

mkdir tmp
mkdir tmp\icons

rmdir build\release /s /q

mkdir build\release
mkdir build\release\assets
mkdir build\release\utils
mkdir build\bin\assets
mkdir build\bin\utils

copy build\bin\*.* build\release\
copy assets\*.* build\release\assets\
copy assets\*.* build\bin\assets\
copy utils\*.* build\release\utils\
copy utils\*.* build\bin\utils\
