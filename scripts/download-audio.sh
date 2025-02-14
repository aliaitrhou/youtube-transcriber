#!/bin/bash

VIDEIO_ID=$1

[ -z "$VIDEIO_ID" ] && echo "ERROR: No video ID specified" && exit 1

mkdir -p ./tmp

yt-dlp "https://youtube.com/watch?v=$VIDEO_ID" --format m4a -o "./tmp/%(id)s.%(ext)s" --cookies-from-browser chrome 2>&1

# Check if the download was successful
if [ $? -ne 0 ]; then
  echo "ERROR: Failed to download video."
  exit 1
fi

echo "Download completed successfully!"
