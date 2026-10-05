#!/usr/bin/env bash
# Mux rendered frames with the final mix and encode the delivery file.
# usage: bash tools/finalize.sh <rendered video.mp4> [output.mp4] [crf]
set -euo pipefail
here="$(cd "$(dirname "$0")/.." && pwd)"
in="$1"; out="${2:-$here/../video/masaryk-exchange-2027.mp4}"; crf="${3:-21}"
ffmpeg -loglevel error -y -i "$in" -i "$here/audio/mix.wav" \
  -map 0:v:0 -map 1:a:0 \
  -c:v libx264 -preset slow -tune animation -crf "$crf" -pix_fmt yuv420p -profile:v high -level 4.1 \
  -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart \
  -metadata title="Masaryk University 교환학생 선정 후기" "$out"
ls -la "$out"
