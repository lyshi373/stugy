@echo off
chcp 65001 >nul
title 打包学习打卡中心
cd /d "%~dp0"
echo ============================================
echo   打包工具 - 生成 学习打卡中心.zip
echo ============================================
echo.
python make_zip.py
echo.
pause
