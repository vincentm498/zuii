#!/usr/bin/env node
import fs from 'fs';
import StyleDictionary from 'style-dictionary';
import { getConfigs } from './config.js';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Parse les arguments CLI pour extraire les chemins de tokens et le chemin de sortie
 * @returns {{ tokenPaths: string[], outputPath: string }}
 */
const parseArgs = () => {
	const args = process.argv.slice(2);
	let tokenPaths = [];
	let outputPath = null;

	for (let i = 0; i < args.length; i++) {
		if (args[i] === '--output' || args[i] === '-o') {
			outputPath = args[i + 1];
			i++; // Skip next argument
		} else {
			tokenPaths.push(args[i]);
		}
	}

	// Si aucun chemin de tokens n'est fourni, utiliser 'tokens' par défaut
	if (tokenPaths.length === 0) {
		tokenPaths = ['tokens'];
	}

	// Si aucun chemin de sortie n'est fourni, utiliser le répertoire courant du projet
	if (!outputPath) {
		outputPath = process.cwd();
	}

	return { tokenPaths, outputPath: resolve(outputPath) };
};

/**
 * Génère le fichier de styles de base avec le wrapper Bootstrap
 * @param {string} outputPath
 */
const generateMainStyle = (outputPath) => {
	const content = `@layer vendor, components, utilities;

$variable-prefix: "";
$prefix: "";

@layer vendor {
	@import "bootstrap/scss/bootstrap";
}
`;
	const filePath = join(outputPath, 'main.scss');

	// On ne l'écrit que s'il n'existe pas
	if (!fs.existsSync(filePath)) {
		// S'assurer que le dossier existe
		if (!fs.existsSync(outputPath)) {
			fs.mkdirSync(outputPath, { recursive: true });
		}
		fs.writeFileSync(filePath, content);
		console.log(`\n✨ Generated ${filePath}`);
	}
};

console.log('🚀 Starting Style Dictionary build...');

/**
 * Lance le build pour toutes les configurations générées à partir des chemins fournis
 */
const runBuild = async () => {
	try {
		const { tokenPaths, outputPath } = parseArgs();

		console.log(`📂 Output directory: ${outputPath}`);

		// Résoudre les chemins de tokens par rapport au répertoire courant
		const resolvedTokenPaths = tokenPaths.map(path => {
			// Si le chemin est absolu, l'utiliser tel quel
			if (path.startsWith('/')) return path;
			// Sinon, le résoudre par rapport au répertoire courant
			return resolve(process.cwd(), path);
		});

		const configs = getConfigs(resolvedTokenPaths, outputPath);

		for (const config of configs) {
			console.log(`\n📦 Building source: ${config.source}`);
			const sd = new StyleDictionary(config);
			await sd.buildAllPlatforms();
		}

		// Générer le fichier de styles de base
		generateMainStyle(outputPath);

		console.log('\n✅ Build completed successfully!');
	} catch (error) {
		console.error('\n❌ Build failed:', error);
		process.exit(1);
	}
};

runBuild();

