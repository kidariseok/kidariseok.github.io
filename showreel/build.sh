#!/usr/bin/env bash
# showreel.mp4 를 처음부터 다시 만듭니다.
#   1) make_audio.py  → 사운드트랙 (128 BPM, 15초)
#   2) render.mjs     → index.html 을 120fps 로 한 장씩 캡처 (Chromium 4개 병렬)
#   3) ffmpeg         → 두 장씩 섞어 60fps + 모션 블러(180° 셔터), 소리 합치기
# 필요: node + playwright(Chromium), python3 + numpy, ffmpeg
set -euo pipefail
cd "$(dirname "$0")"
WORK=${WORK:-$(mktemp -d)}
JOBS=${JOBS:-4}
echo "work dir: $WORK"

python3 make_audio.py "$WORK/showreel.wav"

mkdir -p "$WORK/f120"
for ((i = 0; i < JOBS; i++)); do node render.mjs frames "$WORK/f120" 120 "$i" "$JOBS" & done
wait

ffmpeg -y -hide_banner -loglevel warning \
  -thread_queue_size 64 -framerate 120 -i "$WORK/f120/f%05d.png" -i "$WORK/showreel.wav" \
  -vf "tmix=frames=2,fps=60,scale=out_color_matrix=bt709:out_range=tv:flags=lanczos,format=yuv420p" \
  -c:v libx264 -preset slow -crf 18 -profile:v high -level 4.2 \
  -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
  -c:a aac -b:a 256k -movflags +faststart -shortest showreel.mp4

# 실시간 미리보기(index.html)용 소리, 썸네일
ffmpeg -y -hide_banner -loglevel warning -i "$WORK/showreel.wav" -c:a aac -b:a 192k showreel.m4a
ffmpeg -y -hide_banner -loglevel warning -i "$WORK/f120/f01790.png" -frames:v 1 -update 1 -q:v 2 poster.jpg
echo "done → showreel.mp4"
