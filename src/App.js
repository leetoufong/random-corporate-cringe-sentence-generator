import { useEffect, useRef, useState } from 'react';
import './App.css';

export default function App() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
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
			setLoading(true);
			try {
				const response = await fetch('./json/words.json');
				const data = await response.json();
				
				setAdjectives(data.adjectives);
				setNouns(data.nouns);
				setVerbs(data.verbs);
				setAdverbs(data.adverbs);

				setLoading(false);
			} catch(error) {
				setError(true);
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

			<header className="app-header">
				<h1 className="app-title">Corporate Cringe Sentence Generator</h1>
			</header>
			
			<main className="app-main">
				<form onSubmit ={(event) => handleCreateSentences(event)}>
					<label>Number of sentences:</label>
					<input value={currentNumber} ref={input} onChange={() => setCurrentNumber(input.current.value)} />
					<button>Generate!</button>
				</form>

				<ul ref={sentence} className="sentences">
					{sentences.map((sentence, index) => <li key={index} className="sentence">{sentence}</li>)}
				</ul>
			</main>

		</div>
	);
}
