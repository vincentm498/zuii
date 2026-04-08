import { SUPPORTED_LANGS, type ZuiiLang } from './lang_types';

/**
 * Récupère la langue du document à partir de l'attribut lang de la balise html.
 * @returns {ZuiiLang} une langue supportée (repli sur 'fr' par défaut).
 */
export const getDocLang = (): ZuiiLang => {
	const htmlLang = document.documentElement.lang.split('-')[0].toLowerCase();
	return (SUPPORTED_LANGS.includes(htmlLang as ZuiiLang)) ? htmlLang as ZuiiLang : 'fr';
};
