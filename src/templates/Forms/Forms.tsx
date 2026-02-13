import React from 'react';
import { Form, Button, Group } from '../../index';

/**
 * Template de démonstration pour le composant Form.
 * @returns {JSX.Element} La page de démo des forms.
 */
export const Forms = () => {

	return (
		<div>
			<h2>Liste des inputs disponibles</h2>
			<Form.Control type="text" placeholder="Enter text with icon" icon="icon-house" />
			<Form.Control type="text" placeholder="Enter text"  />
			<Form.Control type="search" placeholder="Enter search"  />
			<Form.Control type="email" placeholder="Enter email"  />
			<Form.Control type="number" placeholder="Enter number"  />
			<Form.Control type="file" placeholder="Enter file"  />
			<Form.Check type="checkbox" label="Enter checkbox"  />
			<Form.Check type="radio" label="Enter radio"  />
			<Form.Control type="select" placeholder="Enter select"  />
			<Form.Control type="select-multiple" placeholder="Enter select multiple"  />
			{/* <Form.Control
				floating
				label="Email address"
				type="email"
				placeholder="name@example.com"
			/> */}
			<Form.Control type="email" placeholder="Enter email" />
			{/* <Form.Tel /> */}
			<Form.Number value={2} onChange={(e) => console.log(e)} />
			{/* <Form.Password />
			<Form.PasswordConfirm passwordToMatch='password' /> */}
			<Form.File />
			<Form.Check
				type="switch"
				id="custom-switch"
				label="Check this switch"
			/>
			<Form.Check
				disabled
				type="switch"
				label="disabled switch"
				id="disabled-custom-switch"
			/>
			{/* <Form.Range value={20} onChange={
				(e) => console.log('')
			} /> */}



			<h3 className="">Forms de base</h3>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>

			<h3 className="">Forms de base</h3>
			<Form>
				<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="name@example.com" />
				</Form.Group>
				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
					<Form.Label>Example textarea</Form.Label>
					<Form.Control as="textarea" rows={3} />
				</Form.Group>
			</Form>

			<Form.Control size="lg" type="text" placeholder="Large text" />
			<br />
			<Form.Control type="text" placeholder="Normal text" />
			<br />
			<Form.Control size="sm" type="text" placeholder="Small text" />

			<Form.Control
				type="text"
				placeholder="Disabled input"
				aria-label="Disabled input example"
				disabled
				readOnly
			/>
			<br />
			<Form.Control
				type="text"
				placeholder="Disabled readonly input"
				aria-label="Disabled input example"
				readOnly
			/>

			<Form>
				<Form.Group as={Group} className="mb-3" controlId="formPlaintextEmail">
					<Form.Label column sm="2">
						Email
					</Form.Label>
					<Form.Control plaintext readOnly defaultValue="email@example.com" />
				</Form.Group>

				<Form.Group as={Group}  className="mb-3" controlId="formPlaintextPassword">
					<Form.Label column sm="2">
						Password
					</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
			</Form>

			<h3 className="">Input type file</h3>
			<Form>
				<Form.Group controlId="formFile" className="mb-3">
					<Form.Label>Default file input example</Form.Label>
					<Form.Control type="file" />
				</Form.Group>
				<Form.Group controlId="formFileMultiple" className="mb-3">
					<Form.Label>Multiple files input example</Form.Label>
					<Form.Control type="file" multiple />
				</Form.Group>
				<Form.Group controlId="formFileDisabled" className="mb-3">
					<Form.Label>Disabled file input example</Form.Label>
					<Form.Control type="file" disabled />
				</Form.Group>
				<Form.Group controlId="formFileSm" className="mb-3">
					<Form.Label>Small file input example</Form.Label>
					<Form.Control type="file" size="sm" />
				</Form.Group>
				<Form.Group controlId="formFileLg" className="mb-3">
				<Form.Label>Large file input example</Form.Label>
				<Form.Control type="file" size="lg" />
			</Form.Group>
		</Form>

		<h3 className="">Input type file avec Uppy.js</h3>
		<Form>
			<Form.Group controlId="formFileUppy" className="mb-3">
				<Form.Label>Téléchargement de fichiers avec Uppy</Form.Label>
				<Form.File
					maxNumberOfFiles={5}
					maxFileSize={5 * 1024 * 1024} // 5 MB
					allowedFileTypes={['image/*', 'application/pdf']}
					onComplete={(result) => {
						console.log('Téléchargement terminé:', result);
					}}
					onError={(error) => {
						console.error('Erreur de téléchargement:', error);
					}}
				/>
			</Form.Group>
		</Form>


			<h3 className="">Input type checkbox</h3>
			<Form>
				{['checkbox', 'radio'].map((type) => (
					<div key={`default-${type}`} className="mb-3">
						<Form.Check
							type={type}
							id={`default-${type}`}
							label={`default ${type}`}
						/>

						<Form.Check
							disabled
							type={type}
							label={`disabled ${type}`}
							id={`disabled-default-${type}`}
						/>
					</div>
				))}
			</Form>

			<h3 className="">Input type switch</h3>
			<Form>
				<Form.Check
					type="switch"
					id="custom-switch"
					label="Check this switch"
				/>
				<Form.Check
					disabled
					type="switch"
					label="disabled switch"
					id="disabled-custom-switch"
				/>
			</Form>




		</div>
	);
};
