#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

/**
 * Pose une question à l'utilisateur.
 * @param {string} query - La question à poser.
 * @returns {Promise<string>} La réponse de l'utilisateur.
 */
const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

/**
 * Transforme une chaîne kebab-case en PascalCase.
 * @param {string} str - La chaîne à transformer.
 * @returns {string} La chaîne en PascalCase.
 */
const toPascalCase = (str) => {
	return str
		.split('-')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join('');
};

/**
 * Transforme une chaîne kebab-case en Kebab-Case (première lettre de chaque mot en majuscule).
 * @param {string} str - La chaîne à transformer.
 * @returns {string} La chaîne en Kebab-Case.
 */
const toFolderCase = (str) => {
	return str
		.split('-')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join('-');
};

/**
 * Logique principale de création du composant.
 * @param {string} componentNameInput - Le nom du composant fourni par l'utilisateur.
 */
const createComponent = async (componentNameInput) => {
	if (!componentNameInput) {
		componentNameInput = await ask('❓ Quel est le nom du composant ? ');
	}

	if (!componentNameInput || componentNameInput.trim() === '') {
		console.error('❌ Le nom du composant ne peut pas être vide.');
		rl.close();
		process.exit(1);
	}

	const rawName = componentNameInput.toLowerCase().trim();
	const folderName = toFolderCase(rawName);
	const componentName = toPascalCase(rawName);
	const styleFileName = rawName;

	// Demande du nom au pluriel pour le template
	let pluralNameInput = await ask(`❓ Quel est le nom au pluriel du composant (pour le template) ? [${componentName}s] `);
	if (!pluralNameInput || pluralNameInput.trim() === '') {
		pluralNameInput = `${rawName}s`;
	}
	const pluralRawName = pluralNameInput.toLowerCase().trim();
	const pluralFolderName = toFolderCase(pluralRawName);
	const pluralComponentName = toPascalCase(pluralRawName);

	const componentsDir = path.resolve(process.cwd(), 'src/components');
	const targetDir = path.join(componentsDir, folderName);

	const templatesDir = path.resolve(process.cwd(), 'src/templates');
	const targetTemplateDir = path.join(templatesDir, pluralFolderName);

	if (fs.existsSync(targetDir)) {
		console.error(`❌ Le composant "${folderName}" existe déjà dans ${targetDir}`);
		rl.close();
		process.exit(1);
	}

	// Définition des dossiers
	const dirs = [
		path.join(targetDir, 'react'),
		path.join(targetDir, 'style'),
		path.join(targetDir, 'js'),
		path.join(targetDir, 'symfony'),
		targetTemplateDir
	];

	// Contenu des fichiers
	const files = [
		{
			path: path.join(targetDir, 'react/index.tsx'),
			content: `import '../style/index.scss';

/**
 * Propriétés du composant ${componentName}.
 */
interface Props {
	/**
	 * Classe CSS additionnelle.
	 */
	className?: string;
}

/**
 * Composant ${componentName}.
 *
 * @param {Props} props - Les propriétés du composant.
 * @returns {JSX.Element} Le rendu du composant.
 */
export const ${componentName} = ({
	className = "",
}: Props) => {
	const baseClass = "${styleFileName}";
	const wrapperClass = \`\${baseClass} \${className}\`.trim();

	return (
		<div className={wrapperClass}>
			${componentName}
		</div>
	);
};
`
		},
		{
			path: path.join(targetDir, 'style/index.scss'),
			content: `@layer components {
	@import "${styleFileName}";
}
`
		},
		{
			path: path.join(targetDir, 'style', `${styleFileName}.scss`),
			content: `.${styleFileName} {
	display: block;
	width: 100px;
	height: 100px;
	border: 1px solid red;
}
`
		},
		{
			path: path.join(targetDir, 'js', `${styleFileName}.ts`),
			content: `/**
 * Logique JavaScript pour le composant ${componentName}.
 */
export const init${componentName} = () => {
	console.log('${componentName} initialized');
};
`
		},
		{
			path: path.join(targetTemplateDir, `${pluralFolderName}.tsx`),
			content: `import { ${componentName} } from '../../index';

/**
 * Template de démonstration pour le composant ${componentName}.
 */
export const ${pluralComponentName} = () => {
	return (
		<div className="${pluralComponentName}-demo">
			<section className="mb-5">
				<h3>${pluralComponentName}</h3>
				<p className="text-muted mb-4">Le composant <code>${componentName}</code> permet de ... .</p>
				<h5 className='mt-4'>Exemple</h5>
				<p className="text-muted mb-4">Voici un exemple de composant ${componentName}.</p>
				<${componentName} />
			</section>
		</div>
	);
};
`
		}
	];

// Création de la structure
try {
	console.log(`🚀 Création du composant ${folderName}...`);

	dirs.forEach(dir => {
		fs.mkdirSync(dir, { recursive: true });
		console.log(`  📁 Créé : ${path.relative(process.cwd(), dir)}`);
	});

	files.forEach(file => {
		fs.writeFileSync(file.path, file.content);
		console.log(`  📄 Créé : ${path.relative(process.cwd(), file.path)}`);
	});

	// Ajout de l'export dans src/index.ts
	const indexPath = path.resolve(process.cwd(), 'src/index.ts');
	if (fs.existsSync(indexPath)) {
		const exportLine = `export * from './components/${folderName}/react';\n`;
		const indexContent = fs.readFileSync(indexPath, 'utf8');

		if (!indexContent.includes(exportLine)) {
			fs.appendFileSync(indexPath, exportLine);
			console.log(`  🔗 Ajouté à : src/index.ts`);
		}
	}

	// Ajout de l'export dans src/templates/index.ts
	const templatesIndexPath = path.resolve(process.cwd(), 'src/templates/index.ts');
	if (fs.existsSync(templatesIndexPath)) {
		const exportLine = `export * from './${pluralFolderName}/${pluralFolderName}';\n`;
		const templatesIndexContent = fs.readFileSync(templatesIndexPath, 'utf8');

		if (!templatesIndexContent.includes(exportLine)) {
			fs.appendFileSync(templatesIndexPath, exportLine);
			console.log(`  🔗 Ajouté à : src/templates/index.ts`);
		}
	}

	console.log(`\n✅ Composant ${folderName} créé avec succès !`);
	rl.close();
} catch (error) {
	console.error('\n❌ Erreur lors de la création du composant :', error);
	rl.close();
	process.exit(1);
}
};

// Lancement du script
createComponent(process.argv[2]);
