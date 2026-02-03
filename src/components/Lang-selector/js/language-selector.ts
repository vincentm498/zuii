import TomSelect from 'tom-select';

/**
 * Interface pour les options de langue dans Tom Select
 */
export interface LanguageOption {
	value: string;
	text: string;
	src?: string;
}

/**
 * Initialise le sélecteur de langue avec Tom Select
 *
 * @param {string | HTMLSelectElement} target - Le sélecteur CSS ou l'élément select
 * @param {(value: string) => void} [onChange] - Callback optionnel lors du changement
 * @returns {TomSelect | null} L'instance de TomSelect
 */
export const initLanguageSelector = (
	target: string | HTMLSelectElement,
	onChange?: (value: string) => void
): TomSelect | null => {
	const selectElement = typeof target === 'string' ? document.querySelector<HTMLSelectElement>(target) : target;
	if (!selectElement) return null;

	// Éviter la double initialisation
	if ((selectElement as any).tomselect) {
		return (selectElement as any).tomselect;
	}

	return new TomSelect(selectElement, {
		valueField: 'value',
		labelField: 'text',
		searchField: ['text'],
		controlInput: undefined,
		controlClass: 'ts-control btn btn-outline-primary',
		hideSelected: true,
		options: Array.from(selectElement.options).map((opt: HTMLOptionElement) => ({
			value: opt.value,
			text: opt.text,
			src: opt.dataset.src
		})),
		render: {
			option: (data: LanguageOption, escape: (str: string) => string) => {
				return `<div class="lang-selector__item">
					<span class="fi fi-${escape(data.src || '')} lang-selector__flag"></span>
					<span class="lang-selector__label">${escape(data.text)}</span>
				</div>`;
			},
			item: (data: LanguageOption, escape: (str: string) => string) => {
				return `<div class="lang-selector__item">
					<span class="fi fi-${escape(data.src || '')} lang-selector__flag"></span>
					<span class="lang-selector__label">${escape(data.text)}</span>
				</div>`;
			}
		},
		onChange: (value: string) => {
			if (onChange) {
				onChange(value);
				return;
			}

			// Logique par défaut (redirection)
			const currentPath = window.location.pathname;
			const pathWithoutPrefix = currentPath.replace(/^\/(fr|de)(\/|$)/, '/');
			let newPath = value === 'en' ? pathWithoutPrefix : `/${value}${pathWithoutPrefix === '/' ? '' : pathWithoutPrefix}`;

			newPath = newPath.replace(/\/+/g, '/');

			if (currentPath !== newPath) {
				window.location.href = newPath;
			}
		}
	});
};

// Auto-initialisation pour le mode non-React
if (typeof document !== 'undefined') {
	document.addEventListener('DOMContentLoaded', () => {
		const el = document.querySelector('#language-select');
		if (el && !(el as any).tomselect) {
			initLanguageSelector(el as HTMLSelectElement);
		}
	});
}
