import { promises as fs } from 'fs';
import path from 'path';

const jsonDirectory = path.join(process.cwd(), 'src/data');

export const conect = async () => {
  const fileContents = await fs.readFile(jsonDirectory + '/db.json', 'utf8');
  return JSON.parse(fileContents);
};

export const write = async (data: any) => {
  await fs.writeFile(`${jsonDirectory}/db.json`, JSON.stringify(data));
};
