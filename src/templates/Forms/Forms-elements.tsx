import React from 'react';
import { Form } from '../../index';

/**
 * Template de démonstration pour le composant Form.
 * @returns {JSX.Element} La page de démo des forms.
 */
export const FormsElements = () => {

	return (
		<div>
			<h2>Liste des inputs disponibles</h2>
			<Form.Control type="text" placeholder="Enter text"  />
			<Form.Control type="search" placeholder="Enter search"  />
			<Form.Control type="email" placeholder="Enter email"  />
			<Form.Control type="number" placeholder="Enter number"  />
			<Form.Control type="file" placeholder="Enter file"  />
			<Form.Control type="checkbox" placeholder="Enter checkbox"  />
			<Form.Control type="radio" placeholder="Enter radio"  />
			<Form.Select options={[
				{
					text: 'Option 1',
					value: '1'
				},
				{
					text: 'Option 2',
					value: '2'
				},
				{
					text: 'Option 3',
					value: '3'
				}
			]} />
			<Form.Select multiple={true} options={[
				{
					text: 'Option 1',
					value: '1'
				},
				{
					text: 'Option 2',
					value: '2'
				},
				{
					text: 'Option 3',
					value: '3'
				}
			]} />

		</div>
	);
};
