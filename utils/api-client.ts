export function extractVideoIdFromUrl(url: string) {
  return new URL(url).searchParams.get('v');
}

type ProgressCallback = (output: string) => void;

export async function processVideo(
  videoId: string,
  language: string = 'English',
  callback: ProgressCallback
): Promise<false | string> {
  callback('Downloading audio...\n');
  await downloadAudio(videoId, callback);

  console.log('langauge is :', language);

  callback('\nTranscribing audio. It takes a while...\n');
  const srt = await transcribe(videoId, callback);
  if (srt) {
    callback('\n');
    callback('\nTranslating text...\n');
    const result = await translate(srt, language, callback);
    callback('\nDone!\n');
    return result;
  }

  return false;
}

export async function downloadAudio(
  videoId: string,
  onProgress: ProgressCallback
) {
  const res = await fetch(
    `/api/audio?${new URLSearchParams({ video_id: videoId })}`,
    {}
  );
  const reader = res.body?.getReader();

  if (reader) {
    return streamResponse(reader, onProgress);
  } else {
    return false;
  }
}

export async function transcribe(
  videoId: string,
  onProgress: ProgressCallback
): Promise<string | false> {
  const res = await fetch(
    `/api/transcript?${new URLSearchParams({ video_id: videoId })}`,
    {}
  );
  const reader = res.body?.getReader();

  if (reader) {
    return streamResponse(reader, onProgress);
  } else {
    return false;
  }
}

export async function translate(
  srtData: string,
  language: string,
  onProgress: ProgressCallback
) {
  const res = await fetch(`/api/translate?lang=${language}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    },
    body: srtData
  });
  const reader = res.body?.getReader();

  if (reader) {
    const result = await streamResponse(reader, onProgress);
    const res = result
      .split('\n')
      .filter(line => {
        return !line.startsWith('[Error]');
      })
      .join('\n');
    return res;
  } else {
    return false;
  }
}

async function streamResponse(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onProgress: ProgressCallback
): Promise<string> {
  return await new Promise(resolve => {
    const decoder = new TextDecoder();
    let result = '';
    const readChunk = ({
      done,
      value
    }: ReadableStreamReadResult<Uint8Array>) => {
      if (done) {
        resolve(result);
        return;
      }

      const output = decoder.decode(value);
      result += output;
      onProgress(output);
      reader.read().then(readChunk);
    };

    reader.read().then(readChunk);
  });
}
