#!/bin/bash

# Download yt-dlp
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o ./yt-dlp
chmod +x ./yt-dlp

VIDEIO_ID=$1

[ -z "$VIDEIO_ID" ] && echo "ERROR: No video ID specified" && exit 1

yt-dlp "https://youtube.com/watch?v=$VIDEIO_ID" --format m4a -o "./tmp/%(id)s.%(ext)s" 2>&1
