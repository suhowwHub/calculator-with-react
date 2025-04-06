import { useState } from "react"
import style from "./App.module.css"

export default function App() {
	const nums = ["+", "-", "×", "÷", 7, 8, 9, "C", 4, 5, 6, 1, 2, 3, 0, "="]

	const [operand1, setOperand1] = useState("")
	const [operand2, setOperand2] = useState("")
	const [operator, setOperator] = useState("")

	const operandsHandler = ({ target }) => {
		let updateValue = ""
		if (operator === "") {
			setOperand1((currentValue) => {
				updateValue = currentValue + target.textContent
				if (updateValue[0] === "0") updateValue = updateValue.slice(1)
				if (updateValue.length > 7) updateValue = currentValue
				return updateValue
			})
		} else {
			setOperand2((currentValue) => {
				updateValue = currentValue + target.textContent
				if (updateValue[0] === "0") updateValue = updateValue.slice(1)
				if (updateValue.length > 7) updateValue = currentValue
				return updateValue
			})
		}
	}
	const operatorHandler = ({ target }) => {
		if (operand1 && operand2) {
			setOperand1(calculator(Number(operand1), Number(operand2), operator))
			setOperand2("0")
			setOperator(target.textContent)
		} else if (operand1) setOperator(target.textContent)
	}
	const enterHandler = ({ target }) => {
		if (target.textContent === "=" && operand1 && operand2) {
			setOperand1(calculator(Number(operand1), Number(operand2), operator))
			setOperand2("")
			setOperator("")
		} else {
			if (!operand2) {
				setOperand1("")
				setOperator("")
			} else setOperand2("0")
		}
	}
	const resetHandler = ({ target }) => {
		setOperand1("")
		setOperand2("")
		setOperator("")
	}
	const calculator = (num1, num2, operation) => {
		switch (operation) {
			case "+":
				return num1 + num2
			case "-":
				return num1 - num2
			case "×":
				return num1 * num2
			case "÷":
				if (num2 !== 0) {
					return num1 / num2
				} else {
					console.log("Ошибка: деление на ноль")
					return null
				}
			default:
				console.log("Ошибка: неизвестная операция")
				return null
		}
	}
	return (
		<>
			<div className={style["calculator"]}>
				<div className={style["calculator__output"]}>
					<div className={style["calculator__output__preveiw"]}>
						{operand2 && operand1 ? `${operand1}${operator}` : "0"}
					</div>
					<div className={style["calculator__output__input"]}>
						{operand2 ? operand2 : `${operand1}${operator}` || "0"}
					</div>
				</div>
				<div className={style["calculator__keys"]}>
					{nums.map((num) => {
						if (typeof num !== "number") {
							if (num === "=")
								return (
									<button
										onClick={enterHandler}
										value={num}
										key={num}
										className={`${style["calculator__key"]} ${style["calculator__key__enter"]}`}>
										{num}
									</button>
								)
							else if (num === "C")
								return (
									<button
										onDoubleClick={resetHandler}
										onClick={enterHandler}
										value={num}
										key={num}
										className={`${style["calculator__key"]} ${style["calculator__key__reset"]}`}>
										{num}
									</button>
								)
							return (
								<button
									onClick={operatorHandler}
									value={num}
									key={num}
									className={`${style["calculator__key"]} ${style["calculator__key__operator"]}`}>
									{num}
								</button>
							)
						} else
							return (
								<button
									key={num}
									onClick={operandsHandler}
									className={style["calculator__key"]}>
									{num}
								</button>
							)
					})}
				</div>
			</div>
		</>
	)
}
