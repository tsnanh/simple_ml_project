const classes = {
	0: "#",
	1: "$",
	2: "&",
	3: "0",
	4: "1",
	5: "2",
	6: "3",
	7: "4",
	8: "5",
	9: "6",
	10: "7",
	11: "8",
	12: "9",
	13: "@",
	14: "A",
	15: "B",
	16: "C",
	17: "D",
	18: "E",
	19: "F",
	20: "G",
	21: "H",
	22: "I",
	23: "J",
	24: "K",
	25: "L",
	26: "M",
	27: "N",
	28: "P",
	29: "Q",
	30: "R",
	31: "S",
	32: "T",
	33: "U",
	34: "V",
	35: "W",
	36: "X",
	37: "Y",
	38: "Z",
};

let model;

$(document).ready(() => {
	$("#imageChooser").on("change", (e) => {
		const img = $(e.target)[0].files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			$("#hIm").attr("src", e.target.result);
		};

		reader.readAsDataURL(img);
	});

	const loadModel = async () => {
		model = await tf.loadLayersModel("model.json");
		console.log("Model loaded");
		console.log(model);
	};

	loadModel();

	const predict = async () => {
		if (!model) return;
		const image = $("#hIm").get(0);

		const tensor = tf.browser
			.fromPixels(image, 3)
			.resizeNearestNeighbor([32, 32])
			.reshape([1, 32, 32, 3])
			.toFloat()
			.div(255.0);

		const predictions = await model.predict(tensor).data();

		const arr = Array.from(predictions);
		document.getElementById("result").innerText = `Result: ${
			classes[arr.indexOf(Math.max(...arr))]
		}`;
	};

	$("#predict").on("click", () => {
		predict();
	});
});
