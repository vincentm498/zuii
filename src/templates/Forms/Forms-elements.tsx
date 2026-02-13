import { useState } from 'react';
import { Form } from '../../index';

/**
 * Template de démonstration pour le composant Form.
 * @returns {JSX.Element} La page de démo des forms.
 */
export const FormsElements = () => {
	const [value, setValue] = useState<string | string[]>(['1']);


	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		console.log(Object.fromEntries(formData.entries()));
		console.log(formData.getAll('selectMultiple[]'));
	}

	return (
		<div>
			<h2>Liste des inputs disponibles</h2>

			<form action="" onSubmit={handleSubmit}>
				<Form.Control id="text" type="text" placeholder="Enter text" name="text" icon="icon-user" />
				<Form.Control id="search" type="search" placeholder="Enter search" name="search" icon="icon-search" />
				<Form.Control id="email" type="email" placeholder="Enter email" name="email" icon="icon-at-sign" />
				<Form.Control id="number" type="number" placeholder="Enter number" name="number" icon="icon-number" />
				{/* <Form.File id="file-simple" label="Upload simple" name="file_simple" /> */}
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
				{/* <Form.File id="file-multiple" label="Upload multiple" name="file_multiple" multiple={true} maxFiles={5} /> */}
				<Form.Check id="checkbox1" type="checkbox" label="Enter checkbox" name="checkbox" />
				<Form.Check id="checkbox2" type="checkbox" label="Enter checkbox checked" name="checkbox" defaultChecked />
				<Form.Check id="radio1" type="radio" label="Enter radio option 1" name="radio" defaultChecked />
				<Form.Check id="radio2" type="radio" label="Enter radio option 2" name="radio"  />
				<Form.Select name="select" value={value} onChange={(value) => setValue(value)} options={[
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
				<Form.Select name="selectMultiple[]" value={['1', '2']} multiple={true} options={[
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
				<Form.Control type="submit" value="Submit" />
			</form>

		</div>
	);
};
