function generate() {
	const elements = [
		document.querySelector("#title"),
		document.querySelector("#description"),
		document.querySelector("#creator"),
		document.querySelector("#creatorpath"),
		document.querySelector("#launch"),
		document.querySelector("#icon"),
		document.querySelector("#target"),
	]
	const data = [];
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		if (element.required && !element.value) {
			alert("必須な項目が入力されていません。");
			document.querySelector("#download").disabled = true;
			return;
		}
		data.push(element.value);
	}
	document.querySelector("#output").value = `<?xml version="1.0" encoding="utf-8"?><!DOCTYPE gameinfo><gameinfo><title>${data[0]}</title><description>${data[1]}</description><creator${(data[3] ? `image="${data[3]}"` : "")}>${data[2]}</creator><launch>${data[4]}</launch>${data[5] ? `<icon>${data[5]}</icon>` : ""}${data[6] ? `<target>${data[6]}</target>` : ""}</gameinfo>`
	document.querySelector("#download").disabled = false;
}

function download() {
	const value = document.querySelector("#output").value;
	document.querySelector("#downloadlink").href = `data:text/plain,${encodeURIComponent(value)}`;
	document.querySelector("#downloadlink").click();
}
