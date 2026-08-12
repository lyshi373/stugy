@echo off
chcp 65001 >nul
title 打包学习打卡中心
cd /d "%~dp0"
echo ============================================
echo   打包工具 - 生成 学习打卡中心.zip
echo ============================================
echo.
echo [提示] 每次更新代码后，请：
echo   1. 电脑端：按 Ctrl+Shift+Delete 清除缓存，然后 Ctrl+F5 刷新
echo   2. 手机端：清除浏览器缓存后再打开新的 index.html
echo.
python make_zip.py
echo.
if %errorlevel%==0 (
    echo.
    echo 打包成功！如需查看说明，请打开 使用说明.txt
) else (
    echo.
    echo [错误] 打包失败，请检查 Python 是否已安装
)
pause