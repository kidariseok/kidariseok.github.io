#!/usr/bin/env python3
"""사진을 사이트 규격으로 바꿔 img/ 에 넣는다 (긴 변 1400px 이하 · 250KB 이하 · .webp · 위치 정보 제거 · 이름 규칙).

  python3 tools/prep-photo.py --prefix 접두어 --cover 표지.jpg --shots a.jpg b.jpg c.jpg
  python3 tools/prep-photo.py --prefix 접두어 --shots a.jpg b.jpg        (표지 없이)
  python3 tools/prep-photo.py --prefix 접두어 --poster 포스터.jpg            (영상 포스터 1280x720)

결과: img/접두어_cover.webp · 접두어_01.webp · 접두어_02.webp ... 그리고 활동 spec 의 "photos" 에 그대로 붙여 넣을 JSON 한 줄을 출력.
번호는 --shots 에 적은 순서. 이미 같은 이름이 있으면 멈춘다(--force 로 덮어씀). 사진 줄은 최대 8장.
Pillow 가 필요하다 (이 환경에 있음). HEIC 는 먼저 jpg 로 바꿔서 줄 것.

※ 사진 속 다른 사람의 얼굴 · 이름 · 주소 · 번호판 · 문서 번호는 이 도구가 걸러 주지 못한다. 올리기 전에 직접 확인할 것.
"""
import argparse, io, json, re, sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow 가 없습니다: pip install pillow")

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "img"
MAX_SIDE, MAX_KB, MAX_SHOTS = 1400, 250, 8


def encode(im: Image.Image):
    """품질을 낮춰 가며 250KB 이하로. 그래도 크면 한 단계씩 줄인다."""
    for scale in (1.0, 0.9, 0.8, 0.7, 0.6):
        w, h = im.size
        cur = im if scale == 1.0 else im.resize((max(1, int(w * scale)), max(1, int(h * scale))), Image.LANCZOS)
        for q in (86, 80, 74, 68, 62, 56, 50, 44):
            buf = io.BytesIO()
            cur.save(buf, "WEBP", quality=q, method=6)
            if buf.tell() <= MAX_KB * 1024:
                return buf.getvalue(), q, cur.size
    return None, None, None


def convert(src: Path, name: str, force: bool, size=None):
    dest = IMG / f"{name}.webp"
    if dest.exists() and not force:
        sys.exit(f"이미 있습니다: {dest.relative_to(ROOT)} (덮어쓰려면 --force)")
    im = ImageOps.exif_transpose(Image.open(src))   # 휴대폰 사진의 회전 정보를 적용
    im = im.convert("RGB")                           # 위치(GPS) 등 메타데이터는 저장하지 않는다
    if size:                                         # 포스터: 16:9 로 잘라 맞춤
        im = ImageOps.fit(im, size, Image.LANCZOS)
    elif max(im.size) > MAX_SIDE:
        im.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
    data, q, final = encode(im)
    if data is None:
        sys.exit(f"{src.name}: 250KB 이하로 줄이지 못했습니다")
    dest.write_bytes(data)
    print(f"  {dest.relative_to(ROOT)}  {final[0]}x{final[1]}  {len(data)/1024:.0f}KB  (품질 {q})")
    return name


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--prefix", required=True, help="파일 이름 앞부분 (영문 소문자 · 숫자 · 밑줄)")
    ap.add_argument("--cover", help="표지 사진 (가로형 권장: 16:9 – 3:2)")
    ap.add_argument("--shots", nargs="*", default=[], help="사진 줄에 들어갈 사진들 (순서대로 01, 02 ...)")
    ap.add_argument("--poster", help="영상 포스터 사진 (→ 접두어_video_poster, 1280x720)")
    ap.add_argument("--force", action="store_true")
    a = ap.parse_args()

    if not re.fullmatch(r"[a-z0-9]+(_[a-z0-9]+)*", a.prefix):
        sys.exit("--prefix: 영문 소문자 · 숫자 · 밑줄만 (예: kaist_hackafair)")
    if len(a.shots) > MAX_SHOTS:
        sys.exit(f"사진 줄은 최대 {MAX_SHOTS}장입니다 (지금 {len(a.shots)}장)")
    for p in filter(None, [a.cover, a.poster, *a.shots]):
        if not Path(p).exists():
            sys.exit(f"파일이 없습니다: {p}")
    if not (a.cover or a.shots or a.poster):
        sys.exit("--cover · --shots · --poster 중 하나는 필요합니다")

    IMG.mkdir(exist_ok=True)
    photos = {}
    print("변환:")
    if a.cover:
        im = Image.open(a.cover); w, h = ImageOps.exif_transpose(im).size
        if h > w:
            print("  ! 표지가 세로형입니다. 가로형(16:9 – 3:2)을 권장합니다 (휴대폰에서는 16:9 로 잘려 보입니다)")
        photos["cover"] = convert(Path(a.cover), f"{a.prefix}_cover", a.force)
    if a.shots:
        photos["shots"] = [convert(Path(p), f"{a.prefix}_{i:02d}", a.force) for i, p in enumerate(a.shots, 1)]
    if a.poster:
        convert(Path(a.poster), f"{a.prefix}_video_poster", a.force, size=(1280, 720))
    print("\n활동 spec 의 \"photos\" 에 붙여 넣기:")
    print("  " + json.dumps(photos, ensure_ascii=False))
    print("\n확인: 다른 사람의 얼굴 · 이름 · 주소 · 번호가 보이는 사진은 올리지 말 것 → 확인했다면 spec 에 \"privacy_checked\": true")


if __name__ == "__main__":
    main()
