import os
import json

PHOTO_DIR = "photos"        # path to your images folder
OUTPUT_FILE = "images.json"

EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".url"}

files = [
    f"{PHOTO_DIR}/{f}"
    for f in os.listdir(PHOTO_DIR)
    if os.path.splitext(f)[1].lower() in EXTENSIONS
]

files.sort()  # optional, but nice

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(files, f, indent=2)

print(f"Wrote {len(files)} filenames to {OUTPUT_FILE}")
