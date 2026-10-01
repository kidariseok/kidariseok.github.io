"""stills 폴더의 PNG를 한 장의 확인용 시트로 모은다: python3 tools/sheet.py out.png a.png b.png ..."""
import sys
from PIL import Image, ImageDraw
out, files = sys.argv[1], sys.argv[2:]
cols = 3; w, h = 640, 360
rows = (len(files) + cols - 1) // cols
sheet = Image.new("RGB", (cols * w, rows * (h + 24)), "#222")
d = ImageDraw.Draw(sheet)
for i, f in enumerate(files):
    im = Image.open(f).convert("RGB").resize((w, h), Image.LANCZOS)
    x, y = (i % cols) * w, (i // cols) * (h + 24)
    sheet.paste(im, (x, y + 24))
    d.text((x + 6, y + 4), f.split("/")[-1], fill="#fff")
sheet.save(out)
