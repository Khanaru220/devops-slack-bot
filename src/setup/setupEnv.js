import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Determine the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Determine which .env file to load based on NODE_ENV
const envFile =
	process.env.NODE_ENV === 'production'
		? '.env.production'
		: '.env.development';

console.log(`Loading environment variables from: ${envFile}`);

// Load the environment variables from the chosen .env file
dotenv.config({ path: path.resolve(__dirname, '..', '..', envFile) });
