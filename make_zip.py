# -*- coding: utf-8 -*-
"""
学习打卡中心 - 打包脚本
运行后会生成 学习打卡中心_日期.zip，包含所有项目文件
"""
import os
import zipfile
from datetime import datetime

# 当前目录
base_dir = os.path.dirname(os.path.abspath(__file__))
today = datetime.now().strftime("%Y%m%d")
zip_name = f"学习打卡中心_{today}.zip"
zip_path = os.path.join(base_dir, zip_name)

# 要打包的文件（软件学习内容模块：modules 目录下所有 js）
files = [
    "index.html",
    "template.html",
    "manifest.json",
    "sw.js",
]
modules_dir = os.path.join(base_dir, "modules")
if os.path.isdir(modules_dir):
    files += [
        os.path.join("modules", f).replace("\\", "/")
        for f in sorted(os.listdir(modules_dir))
        if f.endswith(".js")
    ]

print("=" * 50)
print("  学习打卡中心打包工具")
print("=" * 50)
print()

# 检查文件是否存在
missing = [f for f in files if not os.path.exists(os.path.join(base_dir, f))]
if missing:
    print("[错误] 缺少以下文件：")
    for f in missing:
        print(f"  - {f}")
    input("按回车键退出...")
    exit(1)

# 创建 ZIP
print(f"正在打包 {len(files)} 个文件...")
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
    for f in files:
        src = os.path.join(base_dir, f)
        info = zipfile.ZipInfo(filename=f)
        info.compress_type = zipfile.ZIP_DEFLATED
        with open(src, "rb") as fp:
            zf.writestr(info, fp.read())
        print(f"  + {f}")

size_kb = os.path.getsize(zip_path) / 1024
print()
print("=" * 50)
print(f"打包完成！")
print(f"文件名：{zip_name}")
print(f"大小：{size_kb:.1f} KB")
print(f"位置：{zip_path}")
print("=" * 50)
print()
print("使用方式：")
print("  1. 把 ZIP 传到手机")
print("  2. 在手机上解压")
print("  3. 用 Edge/Safari 打开 index.html")
print("  4. 添加到主屏幕即可像 APP 一样使用")
