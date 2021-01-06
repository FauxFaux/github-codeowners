import { OwnershipEngine, OwnedFile } from '../lib/ownership';
import { writeOwnedFile, OUTPUT_FORMAT } from '../lib/writers';
import { FromFileOptions } from '../lib/ownership';

interface WhoOptions extends FromFileOptions {
  file: string;
  dir: string;
  codeowners: string;
  output: OUTPUT_FORMAT;
}

export const who = async (options: WhoOptions) => {
  const engine = OwnershipEngine.FromCodeownersFile(options.codeowners);
  const file = await OwnedFile.FromPath(options.file, engine);
  writeOwnedFile(file, options, process.stdout);
};
