@echo off
setlocal enabledelayedexpansion

REM 获取用户输入的文件夹路径和时间字段
set "folderPath=%~1"
set "timeField=%~2"

REM 将时间字段转换为日期和时间
for /f "tokens=1,2 delims= " %%a in ("%timeField%") do (
    set "dateField=%%a"
    set "timeField=%%b"
)

REM 将日期字段转换为年、月和日
for /f "tokens=1,2,3 delims=." %%a in ("%dateField%") do (
    set "year=%%a"
    set "month=%%b"
    set "day=%%c"
)

REM 将时间字段转换为小时、分钟和秒
for /f "tokens=1,2,3 delims=-" %%a in ("%timeField%") do (
    set /a "hour=%%a"
    set /a "minute=%%b"
)

set min=13
set max=15
set /a mod=!max!-!min!+1
REM 遍历文件夹中的所有.jpg文件
for %%f in (%folderPath%\*.jpg) do (
    REM 生成随机递增的分钟数和秒数
    set /a "randomMinute=!random! %% !mod!+!min!

    REM 更新分钟和秒
    set /a "minute+=!randomMinute!"

    if !minute! gtr 59 (
        set /a "hour+=1"
        set /a "minute-=60"
    )

    REM 检查小时是否需要进位
    if !hour! gtr 23 (
        set /a "day+=1"
        set /a "hour-=24"
    )

    REM TODO: 检查日期是否需要进位（这取决于月份和是否闰年）

    REM 构造新的文件名，确保所有的字段都有两位数
    if !hour! lss 10 (set hour=0!hour!)
    if !minute! lss 10 (set minute=0!minute!)
    echo "%%f" "!newFileName!"
    set "newFileName=!year!.!month!.!day! !hour!-!minute!.jpg"

    REM 重命名文件
    ren "%%f" "!newFileName!"
)

endlocal
pause