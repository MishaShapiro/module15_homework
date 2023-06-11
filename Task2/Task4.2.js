const btn = document.querySelector(".btn")

const e = btn.addEventListener("click", ()=> {
	const width = document.documentElement.clientWidth
	const height = document.documentElement.clientHeight
	alert(`Высота экрана: ${height}, ширина: ${width}`)
})