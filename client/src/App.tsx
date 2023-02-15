import { ChangeEvent, useState } from "react";
import "./App.css";
import axios from "axios";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment, { Moment } from "moment";

interface Encouragement {
	name: string;
	content: string;
}

interface Guess {
	name: string;
	guessTime: string;
	guessedAt: string;
}

export const Encouragement = () => {
	const [name, setName] = useState("");
	const [encouragement, setEncouragement] = useState({
		name: "",
		content: "",
	});
	const [newEncouragement, setNewEncouragement] = useState("");

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.currentTarget.value);
	};

	const handleEncouragementChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setNewEncouragement(e.currentTarget.value);
	};

	const submitNewEncouragement = () => {
		const newSubmission: Encouragement = {
			name,
			content: newEncouragement,
		};
		(async () => {
			try {
				const res = await axios.post(
					"http://localhost:4000/submitEncouragement",
					newSubmission
				);
				console.log(res);
			} catch (e) {
				console.log(e);
			}
		})();
	};

	const getRandomEncouragement = () => {
		(async () => {
			try {
				const res = await axios.get(
					"http://localhost:4000/encouragement"
				);
				console.log(res);
				setEncouragement(res.data);
			} catch (e) {
				console.log(e);
			}
		})();
	};

	return (
		<div>
			<h2>Encouragement</h2>
			<div>
				Name:
				<br />
				<input onChange={handleNameChange} />
				<br />
				Encouragement:
				<br />
				<input
					onChange={handleEncouragementChange}
					style={{ width: 600 }}
				/>
				<br />
				<button onClick={submitNewEncouragement}>
					Submit New Encouragement
				</button>
			</div>
			<br />
			<button onClick={getRandomEncouragement}>
				Load Random Encouragement
			</button>
			<i>
				<p>
					{encouragement.content} -- <b>{encouragement.name}</b>
				</p>
			</i>
		</div>
	);
};

export const Jokes = () => {
	const [joke, setJoke] = useState({ setup: "", delivery: "" });
	const [isPunchlineVisible, setIsPunchlineVisible] = useState(false);

	const fetchNewJoke = () => {
		setIsPunchlineVisible(false);
		(async () => {
			const response = await axios.get(
				"https://v2.jokeapi.dev/joke/Any?safe-mode"
			);
			console.log(response.data);
			setJoke(response.data);
		})();
	};

	const revealPunchline = () => {
		setIsPunchlineVisible(true);
	};

	return (
		<div>
			<h2>Dad Jokes</h2>
			<button onClick={fetchNewJoke}>Fetch New Joke</button>
			<p>{joke.setup}</p>

			{isPunchlineVisible ? (
				<p>{joke.delivery}</p>
			) : (
				<button onClick={revealPunchline}>Reveal Punchline</button>
			)}
		</div>
	);
};

export const ArrivalGuesser = () => {
	const [name, setName] = useState("");
	const [guessTime, setGuessTime] = useState("");
	const [showResults, setShowResults] = useState(false);
	const [guesses, setGuesses] = useState([
		{ name: "Nice", guessTime: "Try", guessedAt: "Stinker" },
	]);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.currentTarget.value);
	};

	const onDateTimeChange = (datetime: Moment) => {
		const guessTime = moment(datetime).format("dddd, MMMM Do YYYY, h:mm a");
		console.log(guessTime);
		setGuessTime(guessTime);
	};

	const fetchGuesses = () => {
		(async () => {
			try {
				const res = await axios.get("http://localhost:4000/guesses");
				console.log(res.data);
				setGuesses(res?.data);
				setShowResults(true);
			} catch (e) {
				console.log(e);
			}
		})();
	};

	const submitGuess = () => {
		const guess: Guess = {
			name,
			guessTime,
			guessedAt: moment().format("dddd, MMMM Do YYYY, h:mm a"),
		};

		(async () => {
			try {
				const res = await axios.post(
					"http://localhost:4000/submitGuess",
					guess
				);
				console.log(res);
			} catch (e) {
				console.log(e);
			}
		})();
	};

	return (
		<div>
			<h2>Baby Jireh's Arrival Guessing Game!</h2>
			<i>
				You get more points for the EARLIER you guess (1 point per
				minute early) <br /> & the CLOSER it ends up being to the actual
				arrival time (up to x100 multiplier).
				<br /> Winner gets a <b>Mystery Prize.</b>
			</i>
			<br />
			<br />
			Name: <br />
			<input onChange={handleNameChange} />
			<br />
			Guess:
			{/* 
      // @ts-ignore */}
			<Datetime onChange={onDateTimeChange} />
			<button onClick={submitGuess}>Submit Guess!</button>
			<br />
			<br />
			{showResults ? (
				<div>
					<b>ALL GUESSES:</b>
					<ul>
						{guesses.map((guess) => (
							<li>
								<u>{guess.guessTime}</u> - <br />
								Guessed by <b>{guess.name}</b> on{" "}
								{guess.guessedAt}!
							</li>
						))}
					</ul>
				</div>
			) : (
				<button onClick={fetchGuesses}>
					Show All Guesses <br />
					<i>(After You've Guessed!)</i>
				</button>
			)}
			<br />
		</div>
	);
};

function App() {
	return (
		<div className="App">
			<h1>Mikiah's Virtual Labor Pal</h1>
			<Encouragement />
			<hr />
			<ArrivalGuesser />
			<hr />
			<Jokes />
		</div>
	);
}

export default App;
