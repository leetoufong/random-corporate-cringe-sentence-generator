import { useEffect, useRef, useState } from 'react';
import './App.css';
import Conversation from './Conversation';

export default function App() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [adverbs, setAdverbs] = useState([]);
	const [verbs, setVerbs] = useState([]);
	const [adjectives, setAdjectives] = useState([]);
	const [nouns, setNouns] = useState([]);

	const [sentences, setSentences] = useState([]);
	const [currentNumber, setCurrentNumber] = useState([]);

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

	function handleCreateSentences(num) {
		const newSentences = [];
		
		for (let i = 0; i < num; i++) {
			let newSentence = '';
			const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
			const noun = nouns[Math.floor(Math.random() * nouns.length)];
			const adverb = adverbs[Math.floor(Math.random() * adverbs.length)];
			const verb = verbs[Math.floor(Math.random() * verbs.length)];

			newSentence = `${adverb.charAt(0).toUpperCase() + adverb.slice(1)} ${verb} ${adjective} ${noun}`;
			newSentences.push(newSentence);
		}

		setSentences(newSentences);
	}

	return (
		<div className="App">

			<h1>Ever find yourself in an awkward situation where you need to reply with a corporate sentence? Cringe no further friends!</h1>
			<div>
				<div><label>Number of sentences:</label><input value={20} ref={input} onChange={() => setCurrentNumber(input.current.value)} /></div>
				<div><button onClick ={() => handleCreateSentences(input.current.value)}>Generate</button></div>
			</div>

			<ul ref={sentence}>
				{sentences.map((sentence, index) => <li key={index}>{sentence}</li>)}
			</ul>

		</div>
	);
}
