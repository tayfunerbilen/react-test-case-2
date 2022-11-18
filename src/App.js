import {useEffect, useState} from "react";

function App() {

	const [items, setItems] = useState([
		{
			key: '',
			value: ''
		}
	])

	useEffect(() => {
		if (items.length === 0) {
			setItems([
				{
					key: '',
					value: ''
				}
			])
		}
	}, [items])

	const pasteHandle = (e, index) => {
		const pastedData = e.clipboardData.getData('text')
		if (pastedData) {
			const arr = pastedData.split("\n").map(text => {
				if (/([\w]+)=(.+?)/.test(text)) {
					let [key, value] = text.split('=')
					let find = items.find(i => i.key === key)
					if (!find || find?.key === items[index].key) {
						return {key, value}
					}
				}
			}).filter(Boolean)
			if (arr.length > 0) {
				e.preventDefault()
				setItems(items => [...items.slice(0, index), ...arr, ...items.slice(index + 1)])
			}
		}
	}

	return (
		<div className="h-[100vh] bg-black overflow-auto">
			<div className="container mx-auto py-4">
				<p className="text-xl font-light text-white mb-4">
					Test etmek için <code className="bg-blue-400/40 py-1 px-2 rounded text-base">.env</code> dosyanızdaki kodları kopyalayın ve soldaki input'lardan herhangi birine tıklayıp <kbd className="bg-white/20 py-1 px-2 rounded text-base">ctrl + v</kbd> yapıp yapıştırın.
				</p>
				<div className="grid gap-y-4">
					{items.map((item, index) => (
						<div className="flex gap-x-4">
							<input
								onPaste={e => pasteHandle(e, index)}
								onChange={e => {
									setItems(items => items.map((item, i) => {
										if (i === index) {
											item.key = e.target.value
										}
										return item
									}))
								}}
								placeholder="Örn: API_URL"
								className="flex-1 h-10 placeholder:text-white/50 rounded bg-white/5 border border-white/20 text-sm px-3 text-white outline-none"
								type="text" value={item.key}/>
							<input
								onChange={e => {
									setItems(items => items.map((item, i) => {
										if (i === index) {
											item.value = e.target.value
										}
										return item
									}))
								}}
								className="flex-1 h-10 placeholder:text-white/50 rounded bg-white/5 border border-white/20 text-sm px-3 text-white outline-none"
								type="text" value={item.value}
							/>
							<button
								onClick={() => setItems(items => items.filter((_, key) => key !== index))}
								className="h-10 w-10 bg-red-500 rounded text-white text-sm">x
							</button>
						</div>
					))}
				</div>
				<button
					onClick={() => setItems(items => [...items, {
						key: '',
						value: ''
					}])}
					className="h-10 px-4 rounded border border-blue-500 text-blue-500 flex items-center text-sm mt-4">
					Yeni Ekle
				</button>
				<pre className="bg-white/10 mt-4 p-4 rounded text-white">{JSON.stringify(items, null, 2)}</pre>
			</div>
		</div>
	);
}

export default App;
