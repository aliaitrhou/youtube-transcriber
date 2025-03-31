import type { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';
import path from 'path';
import transferChildProcessOutput from '../../utils/shell';

export default function POST(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { lang: language } = request.query;

  const srtData = request.body;
  if (typeof srtData !== 'string') {
    response.status(400).json({ error: 'Invalid request' });
    return;
  }

  const cmd = spawn(
    'python3',
    [path.join(process.cwd(), 'scripts/translate.py'), language as string],
    {
      cwd: process.cwd()
    }
  );

  cmd.stdin.write(srtData);
  cmd.stdin.end();
  transferChildProcessOutput(cmd, response);
}
