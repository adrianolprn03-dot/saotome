import os
import re

def patch_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already patched
    if 'unstable_noStore as noStore' in content:
        return False

    # Skip if not an API route with a GET handler
    if 'export async function GET' not in content:
        return False

    print(f"Patching {file_path}...")

    # 1. Add import
    import_line = "import { unstable_noStore as noStore } from 'next/cache';\n"
    if 'import' in content:
        # Insert after the last import or at the beginning
        content = import_line + content
    else:
        content = import_line + content

    # 2. Add noStore() call in GET handler
    # We look for the start of the GET function and insert noStore() as the first line of the body
    pattern = r'(export async function GET\(.*?\)\s*{)'
    replacement = r'\1\n  noStore();'
    content = re.sub(pattern, replacement, content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def main():
    api_dir = 'src/app/api'
    patched_count = 0
    for root, dirs, files in os.walk(api_dir):
        for file in files:
            if file.endswith('.ts') or file.endswith('.js'):
                file_path = os.path.join(root, file)
                if patch_file(file_path):
                    patched_count += 1
    
    print(f"Total files patched: {patched_count}")

if __name__ == "__main__":
    main()
