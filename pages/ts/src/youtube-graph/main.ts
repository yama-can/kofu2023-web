let viewLabels: [string, ...number[]][] = [], likeLabels: [string, ...number[]][] = [];
let timestamps: number[] = [];
let view: c3.ChartAPI, like: c3.ChartAPI;
let datas: { [key: string]: [number, string, string, string, number, number, null, null][] } = {};
let types: { [key: string]: string } = {}, untypes: { [key: string]: string } = {};
let width = 800;

document.addEventListener("DOMContentLoaded", async () => {
	const data: [number, string, string, string, number, number, null, null][] = await (await fetch("https://drive.google.com/uc?id=1L-5vDvFx0ijduX2kFLWEetp6SsZbv3kF")).json();
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
		if (timestamps.length == 0) {
			timestamps = datas[v].map((v) => v[0]);
		}
		viewLabels.push([v, ...datas[v].map((v) => v[4])]);
		likeLabels.push([v, ...datas[v].map((v) => v[5])]);
	}
	width = timestamps.length * 30;
	(document.querySelector("input#width") as HTMLInputElement).value = width.toString();

	updateGraph();

	view.element.addEventListener("scroll", () => {
		like.element.scrollLeft = view.element.scrollLeft;
	})
	like.element.addEventListener("scroll", () => {
		view.element.scrollLeft = like.element.scrollLeft;
	})
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

	updateGraph();
}

function updateGraph() {
	view = c3.generate({
		bindto: '#graph-view',
		data: {
			columns: [
				["times", ...timestamps],
				...viewLabels
			],
			x: "times",
			xFormat: "%Y-%m-%d %H:%M:%S.%L",
		},
		axis: {
			x: {
				type: "timeseries",
				tick: {
					fit: true,
					format: "%Y-%m-%d %H:%M:%S.%L",
					width: 100,
					rotate: 85
				},
				label: "時刻",
				height: 200
			},
			y: {
				label: "再生回数",
				tick: {
					format: d3.format(",")
				}
			}
		}
	});
	like = c3.generate({
		bindto: '#graph-like',
		data: {
			columns: [
				["times", ...timestamps],
				...likeLabels
			],
			x: "times",
			xFormat: "%Y-%m-%d %H:%M:%S.%L",
		},
		axis: {
			x: {
				type: "timeseries",
				tick: {
					fit: true,
					format: "%Y-%m-%d %H:%M:%S.%L",
					width: 100,
					rotate: 85
				},
				label: "時刻",
				height: 200
			},
			y: {
				label: "高評価数",
				tick: {
					format: d3.format(",")
				}
			}
		}
	});

	view.resize({ width, height: 500 });
	like.resize({ width, height: 500 });
}

function setwidth(e: HTMLInputElement) {
	width = Number(e.value);
	view.resize({ width, height: 500 });
	like.resize({ width, height: 500 });
}

function resetwidth() {
	width = timestamps.length * 30;
	(document.querySelector("input#width") as HTMLInputElement).value = width.toString();
	view.resize({ width, height: 500 });
	like.resize({ width, height: 500 });
}
