import ffmpegPath from 'ffmpeg-static';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const outputDir = path.resolve('public', 'reels');
const reels = [
  ['portfolio-ai', 'screenshots/reels/portfolio-ai-hero.png'],
  ['ai-recruiter', 'screenshots/reels/ai-recruiter-overview.png'],
  ['auto-clock', 'screenshots/reels/auto-clock-source.png'],
  ['thesis-dss', 'screenshots/thesis_1_dashboard.png'],
];

async function render(name, input) {
  const output = path.join(outputDir, `${name}.webm`);
  const filter = "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.00045,1.05)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=300:s=1280x720:fps=30,format=yuv420p";
  const args = ['-y', '-loop', '1', '-i', input, '-t', '6', '-vf', filter, '-an', '-c:v', 'libvpx-vp9', '-crf', '35', '-b:v', '0', output];
  await new Promise((resolve, reject) => {
    const process = spawn(ffmpegPath, args, { stdio: 'inherit' });
    process.on('error', reject);
    process.on('exit', (code) => code === 0 ? resolve() : reject(new Error(`${name} exited with ${code}`)));
  });
  console.log(`Created ${output}`);
}

await fs.mkdir(outputDir, { recursive: true });
for (const [name, input] of reels) await render(name, input);
