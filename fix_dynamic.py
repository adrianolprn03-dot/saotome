import os

files = [
    r"src/app/api/esic/auth/me/route.ts",
    r"src/app/api/esic/meus-pedidos/route.ts",
    r"src/app/api/links-externos/route.ts",
    r"src/app/api/transparencia/emendas-parlamentares/export-csv/route.ts",
    r"src/app/api/transparencia/emendas-parlamentares/route.ts"
]

target_str = "export const dynamic = 'force-dynamic';\n"

for file_path in files:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        if 'force-dynamic' not in content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(target_str + content)
            print(f"Patched {file_path}")
        else:
            print(f"Already patched: {file_path}")
    else:
        print(f"Not found: {file_path}")
