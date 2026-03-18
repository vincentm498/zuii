import { useState } from 'react';
import { Form } from '../../index';

/**
 * Template de démonstration pour le composant Form.
 * @returns {JSX.Element} La page de démo des forms.
 */
export const FormsElements = () => {
	const [selectValue, setSelectValue] = useState<string | string[]>('');
	const [countryValue, setCountryValue] = useState<string | string[]>('');
	const [multiValue, setMultiValue] = useState<string | string[]>(['1', '2']);


	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		console.log(Object.fromEntries(formData.entries()));
		console.log(formData.getAll('selectMultiple[]'));
		const tousLesFichiers = formData.getAll('file-upload[]');
		console.log(tousLesFichiers); // Affiche [File, File]

		const fileTest = formData.get('file-test');
		console.log(fileTest);
	}

	return (
		<div>
			<h2>Liste des inputs disponibles</h2>

			<form action="" onSubmit={handleSubmit}>
				<Form.Control id="text" type="text" placeholder="Enter text" name="text" icon="icon-user" />
				<Form.Control id="text" type="text" placeholder="Enter text disabled" name="text" icon="icon-user" disabled />
				<Form.Control id="search" type="search" placeholder="Enter search" name="search" icon="icon-search" />
				<Form.Control id="email" type="email" placeholder="Enter email" name="email" icon="icon-at-sign" />
				<Form.Control id="number" type="number" placeholder="Enter number" name="number" icon="icon-number" />
				<Form.Number id="number-button" placeholder="Enter number" name="number-button" onChange={(val) => console.log(val)} step={1} min={0} max={10}  required={true} className='fees-field__input' />
				{/* <Form.File id="file-simple" label="Upload simple" name="file_simple" />
				<Form.File
					id="simple-upload"
					name="simple-upload"
					maxNumberOfFiles={1}
					onComplete={(result: any) => console.log("Fichiers téléchargés :", result)}
				/>
				<Form.File
					id="mon-uploader"
					name="mon-uploader"
					maxNumberOfFiles={5}
					maxFileSize={5 * 1024 * 1024}
					onComplete={(result: any) => console.log("Fichiers téléchargés :", result)}
				/>
				 <Form.File id="file-multiple" label="Upload multiple" name="file_multiple" multiple={true} maxFiles={5} /> */}
				<Form.File
					restrictions={{ maxNumberOfFiles: 5 }}
					lang='fr'
					name="file-dashboard"
				/>
				<Form.File
					restrictions={{ maxNumberOfFiles: 5 }}
					webcam={{
						allowVideo: false
					}}
					lang='fr'
					name="file-upload"
					files={[
						{
							route: 'https://placehold.co/286x180.png',
							options: {
								method: 'GET',
								headers: {
									'Content-Type': 'multipart/form-data'
								}
							}
						}
					]}
				/>
				<Form.Check id="checkbox1" type="checkbox" label="Enter checkbox" name="checkbox" />
				<Form.Check id="checkbox2" type="checkbox" label="Enter checkbox checked" name="checkbox" defaultChecked />
				<Form.Check id="radio1" type="radio" label="Enter radio option 1" name="radio" defaultChecked />
				<Form.Check id="radio2" type="radio" label="Enter radio option 2" name="radio"  />
				<Form.Select name="select" value={selectValue} onChange={(val) => setSelectValue(val)} options={[]}></Form.Select>
				<Form.Select name="select" value={selectValue} onChange={(val) => setSelectValue(val)} options={[
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
				<Form.Select
					name="select-country"
					variant="country"
					value={countryValue}
					onChange={(val) => setCountryValue(val)}
					options={[
						{ text: 'France', value: 'FR' },
						{ text: 'Allemagne', value: 'DE', flag: 'de' },
						{ text: 'Espagne', value: 'ES', flag: 'es' },
						{ text: 'Italie', value: 'IT', flag: 'it' },
						{ text: 'Portugal', value: 'PT', flag: 'pt' }
					]}
				/>
				<Form.Select name="selectMultiple[]" value={multiValue} onChange={(val) => setMultiValue(val)} multiple={true} options={[
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
				<Form.Date />
				<Form.Color />
				<Form.Group className="mb-3">
					<Form.Label>Label</Form.Label>
					<Form.Control as="textarea" rows={3} placeholder="Placeholder" />
				</Form.Group>
				<Form.Tel name='tel-test' nameFormat='tel-test-format' />
				<Form.Control type="submit" value="Submit" />

			</form>

		</div>
	);
};
