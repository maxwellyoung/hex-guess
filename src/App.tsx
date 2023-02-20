import { useEffect, useState } from 'react'
import './App.css'

const getRandomColor = () => {
	const digits = [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'A',
		'B',
		'C',
		'D',
		'F',
	]
	const color = new Array(6)
		.fill('')
		.map(() => digits[Math.floor(Math.random() * digits.length)])
		.join('')

	return `#${color}`
}

enum Result {
	Correct,
	Wrong,
}

function App() {
	const [color, setColor] = useState('')
	const [answers, setAnswers] = useState<string[]>([])
	const [result, setResult] = useState<Result | undefined>(undefined)

	const generateColors = () => {
		const actualColor = getRandomColor()
		setColor(actualColor)
		setAnswers(
			[actualColor, getRandomColor(), getRandomColor()].sort(
				() => 0.5 - Math.random()
			)
		)
	}

	useEffect(() => {
		generateColors()
	}, [])

	const handleAnswerClicked = (answer: string) => {
		if (answer === color) {
			setResult(Result.Correct)
			generateColors()
		} else {
			setResult(Result.Wrong)
		}
	}

	return (
		<div className="App">
			<div className="guess-me" style={{ background: color }}></div>

			<div className="button-container">
				{answers.map((answer) => (
					<button key={answer} onClick={() => handleAnswerClicked(answer)}>
						{answer}
					</button>
				))}
			</div>
			<div>
				{result === Result.Wrong && <div className="wrong">wrong!!</div>}
				{result === Result.Correct && <div className="correct">correct!!</div>}
			</div>
		</div>
	)
}

export default App
