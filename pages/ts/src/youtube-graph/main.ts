let viewLabels: [string, ...number[]][] = [], likeLabels: [string, ...number[]][] = [];
let view, like;
let datas: { [key: string]: [number, string, string, string, number, number, null, null][] } = {};
let types: { [key: string]: string } = {}, untypes: { [key: string]: string } = {};

document.addEventListener("DOMContentLoaded", async () => {
	const data: [number, string, string, string, number, number, null, null][] = await (await fetch("https://script.google.com/macros/s/AKfycbydZ2NjjHbOOqeSlMrbKIPplDI-m6YokEiZiSSI1KvI8ni5OrahHAaUIh9rcjW7mmGWZQ/exec")).json();
	data.forEach((d) => {
		datas[d[2]] = datas[d[2]] || [];
		datas[d[2]].push(d);
		const regex = d[3].match(/「(.*)」/);
		types[d[2]] = (regex ? regex[1] : d[2]);
		untypes[(regex ? regex[1] : d[2])] = d[2];
	});
	console.log(types);
	for (let v in datas) {
		if (!v) continue;
		datas[v].sort((a, b) => a[0] - b[0]);
		viewLabels.push([v, ...datas[v].map((v) => v[4])]);
		likeLabels.push([v, ...datas[v].map((v) => v[5])]);
	}
	console.log(datas);
	console.log(viewLabels);
	view = c3.generate({
		bindto: '#graph-view',
		data: {
			columns: viewLabels
		}
	});
	like = c3.generate({
		bindto: '#graph-like',
		data: {
			columns: likeLabels
		}
	});
})

function viewname(e: HTMLInputElement) {
	if (e.checked) {
		viewLabels = viewLabels.map((v) => {
			v[0] = types[v[0]];
			return v;
		});
		likeLabels = likeLabels.map((v) => {
			v[0] = types[v[0]];
			return v;
		});
	}
	else {
		viewLabels = viewLabels.map((v) => {
			v[0] = untypes[v[0]];
			return v;
		});
		likeLabels = likeLabels.map((v) => {
			v[0] = untypes[v[0]];
			return v;
		});
	}

	view = c3.generate({
		bindto: '#graph-view',
		data: {
			columns: viewLabels
		}
	});
	like = c3.generate({
		bindto: '#graph-like',
		data: {
			columns: likeLabels
		}
	});
}