"""Figma에서 받은 1x 에셋으로 16:9 배경·구름·디더 비네트를 만든다.

결과는 assets/gen/ 에 1x 해상도(480x270)로 저장하고, 화면에서는 4배로
최근접 보간(image-rendering: pixelated)해서 1920x1080으로 쓴다.
"""
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
L = ROOT / "assets" / "layers"
GEN = ROOT / "assets" / "gen"
GEN.mkdir(parents=True, exist_ok=True)

W, H = 480, 270          # 1x 캔버스 (×4 = 1920×1080)
HORIZON = 178            # 지면 띠가 시작하는 줄
SRC_BAND = 492           # 원본(393×852)에서 지면 띠가 시작하는 줄
PERIOD = 37              # 지면 돌기 반복 간격


def rgb(path):
    return np.array(Image.open(path).convert("RGB"))


def backdrop(src_name, out_name, with_dome=True):
    src = rgb(L / src_name)
    sky = src[200, 5]
    floor = src[700, 5]
    out = np.zeros((H, W, 3), np.uint8)
    out[:] = sky
    # 지면 띠(옅은 띠·돌기·경계선)를 돌기 간격으로 반복
    band = src[SRC_BAND:SRC_BAND + 40, 12:12 + PERIOD]
    for x0 in range(-PERIOD, W + PERIOD, PERIOD):
        xs, xe = max(x0, 0), min(x0 + PERIOD, W)
        if xs >= xe:
            continue
        out[HORIZON:HORIZON + 40, xs:xe] = band[:, xs - x0:xe - x0]
    out[HORIZON + 40:] = floor
    if with_dome:
        dome = src[400:504, 117:276]
        dx = W // 2 - dome.shape[1] // 2
        dy = HORIZON - (SRC_BAND - 400)
        out[dy:dy + dome.shape[0], dx:dx + dome.shape[1]] = dome
    Image.fromarray(out).save(GEN / out_name)
    return sky


def clouds():
    src = np.array(Image.open(L / "bg_light_dido.png").convert("RGBA"))
    sky = src[200, 5, :3].astype(int)
    boxes = {"cloud_a": (120, 46, 196, 72), "cloud_b": (296, 205, 372, 232),
             "cloud_c": (33, 230, 78, 250), "cloud_d": (218, 325, 263, 346)}
    for name, (x0, y0, x1, y1) in boxes.items():
        crop = src[y0:y1, x0:x1].copy()
        diff = np.abs(crop[:, :, :3].astype(int) - sky).sum(axis=2)
        crop[diff < 24, 3] = 0
        ys, xs = np.nonzero(crop[:, :, 3])
        crop = crop[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
        Image.fromarray(crop).save(GEN / f"{name}.png")


BAYER = np.array([[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]) / 16.0


def dither_vignette(name, w, h, inner=0.42, outer=1.05, levels=(0.25, 0.5, 0.75, 1.0), alpha=150):
    """원본 '비네트' 레이어처럼 타원 고리마다 점 밀도가 올라가는 디더 패턴."""
    yy, xx = np.mgrid[0:h, 0:w]
    nx = (xx - w / 2) / (w / 2)
    ny = (yy - h / 2) / (h / 2)
    d = np.sqrt(nx ** 2 + ny ** 2)
    t = np.clip((d - inner) / (outer - inner), 0, 1)
    # 단계별(4단) 밀도로 끊어서 원본처럼 '고리'가 보이게
    step = np.floor(t * len(levels)).clip(0, len(levels) - 1).astype(int)
    density = np.where(t <= 0, 0, np.array(levels)[step])
    thr = BAYER[yy % 4, xx % 4]
    on = density > thr
    out = np.zeros((h, w, 4), np.uint8)
    out[on, 3] = alpha
    Image.fromarray(out).save(GEN / name)


def trim(src_name, out_name, pad=1):
    """투명 여백을 잘라낸 스프라이트."""
    im = np.array(Image.open(L / src_name).convert("RGBA"))
    ys, xs = np.nonzero(im[:, :, 3] > 8)
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad + 1, im.shape[0])
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad + 1, im.shape[1])
    Image.fromarray(im[y0:y1, x0:x1]).save(GEN / out_name)


def main():
    for name in ["bug_a", "bug_b", "yuloong", "myungwoong", "professor", "mw_suit", "item_suit",
                 "item_mask", "item_shield", "item_flashlight", "item_radio", "monkey", "monkey_bug1",
                 "monkey_bug2", "monkey_infected", "hand_dark", "campfire"]:
        trim(f"{name}.png", f"{name}_t.png")
    # 포스터의 QR (Figma '홍보 자료' 섹션 Poster Light, 1024px로 받은 이미지 기준 좌표)
    poster = Image.open(ROOT / "assets" / "raw" / "poster_light.png").convert("RGB")
    poster.crop((466, 782, 660, 976)).save(GEN / "qr.png")
    backdrop("bg_light_dido.png", "bd_sky_dome.png", True)
    backdrop("bg_light_dido.png", "bd_sky.png", False)
    backdrop("bg_dark_dido.png", "bd_cave_dome.png", True)
    backdrop("bg_dark_dido.png", "bd_cave.png", False)
    clouds()
    dither_vignette("vignette_169.png", W, H)
    dither_vignette("vignette_soft_169.png", W, H, inner=0.62, outer=1.25, levels=(0.25, 0.5), alpha=120)
    # 폰 화면용(393×852) 동굴 디더는 원본 비네트를 그대로 사용
    print("generated:", sorted(p.name for p in GEN.iterdir()))


if __name__ == "__main__":
    main()


def sword_clean():
    """보스 장면 실루엣용: 그림자(반투명 픽셀)를 뺀 검."""
    a = np.array(Image.open(L / "sword.png").convert("RGBA"))
    a[a[:, :, 3] < 200, 3] = 0
    ys, xs = np.nonzero(a[:, :, 3])
    Image.fromarray(a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]).save(GEN / "sword_clean.png")


sword_clean()


def monkey_shadow_clean():
    """프롤로그 원숭이 실루엣: 회색 바탕을 투명하게, 몸은 짙게, 외곽선은 밝게."""
    a = np.array(Image.open(L / "monkey_shadow.png").convert("RGBA")).astype(int)
    rgb = a[:, :, :3]
    bg = (np.abs(rgb - 32).sum(axis=2) <= 6)
    body = (rgb.sum(axis=2) == 0)
    out = np.zeros_like(a)
    out[body] = [8, 6, 10, 235]
    line = ~bg & ~body & (a[:, :, 3] > 0)
    lum = rgb[line].mean(axis=1, keepdims=True)
    out[line, :3] = np.clip(rgb[line] * 1.7 + 20, 0, 255)
    out[line, 3] = 255
    red = (rgb[:, :, 0] > rgb[:, :, 1] + 60)
    out[red] = np.concatenate([np.clip(rgb[red] * 1.4, 0, 255), np.full((red.sum(), 1), 255)], axis=1)
    _ = lum
    Image.fromarray(out.astype(np.uint8)).save(GEN / "monkey_shadow_clean.png")


monkey_shadow_clean()
