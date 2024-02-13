import { useEffect, useRef, useState } from 'react';
import Header from './Header';
import './App.css';

export default function App() {
	const [adverbs, setAdverbs] = useState([]);
	const [verbs, setVerbs] = useState([]);
	const [adjectives, setAdjectives] = useState([]);
	const [nouns, setNouns] = useState([]);
	const [sentences, setSentences] = useState([]);
	const [currentNumber, setCurrentNumber] = useState(1);

	const sentence = useRef(null);
	const input = useRef(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('./json/words.json');
				const data = await response.json();
				
				setAdjectives(data.adjectives);
				setNouns(data.nouns);
				setVerbs(data.verbs);
				setAdverbs(data.adverbs);
			} catch(error) {
				console.log(error)
			}
		}

		fetchData();
	}, []);

	function handleCreateSentences(event) {
		const newSentences = [];
		event.preventDefault();
		
		let newSentence = '';

		for (let i = 0; i < currentNumber; i++) {
			const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
			const noun = nouns[Math.floor(Math.random() * nouns.length)];
			const adverb = adverbs[Math.floor(Math.random() * adverbs.length)];
			const verb = verbs[Math.floor(Math.random() * verbs.length)];

			newSentence = `${adverb.charAt(0).toUpperCase() + adverb.slice(1)} ${verb} ${adjective} ${noun}.`;
			newSentences.push(newSentence);
		}

		setSentences(newSentences);
	}

	return (
		<div className="app">

			<Header />
			
			<main className="app-main">

				<form className="form" onSubmit ={(event) => handleCreateSentences(event)}>
					<label className="label">Number of sentences:</label>
					<input className="input" type="number" value={currentNumber} ref={input} onChange={() => setCurrentNumber(input.current.value)} />
					<button className="btn">Generate!</button>
				</form>

				<ul ref={sentence} className="sentences">
					{sentences.map((sentence, index) => (
						<li key={index} className="sentence">{sentence} <button className="btn-copy"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 15h7v2H7zm0-4h10v2H7zm0-4h10v2H7zm12-4h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z"/></svg></button></li>
					))}
				</ul>
			</main>

		</div>
	);
}
