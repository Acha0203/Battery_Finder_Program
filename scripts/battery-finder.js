const battery =
	[{
		"batteryName": "WKL-78",
		"capacityAh": 2.3,
		"voltage": 14.4,
		"maxDraw": 3.2,
		"endVoltage": 10,
	},
	{
		"batteryName": "WKL-140",
		"capacityAh": 4.5,
		"voltage": 14.4,
		"maxDraw": 9.2,
		"endVoltage": 5,
	},
	{
		"batteryName": "Wmacro-78",
		"capacityAh": 2.5,
		"voltage": 14.5,
		"maxDraw": 10,
		"endVoltage": 5,
	},
	{
		"batteryName": "Wmacro-140",
		"capacityAh": 3.6,
		"voltage": 14.4,
		"maxDraw": 14,
		"endVoltage": 5,
	},
	{
		"batteryName": "IOP-E78",
		"capacityAh": 6.6,
		"voltage": 14.4,
		"maxDraw": 10.5,
		"endVoltage": 8,
	},
	{
		"batteryName": "IOP-E140",
		"capacityAh": 9.9,
		"voltage": 14.4,
		"maxDraw": 14,
		"endVoltage": 10,
	},
	{
		"batteryName": "IOP-E188",
		"capacityAh": 13.2,
		"voltage": 14.4,
		"maxDraw": 14,
		"endVoltage": 11,
	},
	{
		"batteryName": "RYN-C65",
		"capacityAh": 4.9,
		"voltage": 14.8,
		"maxDraw": 4.9,
		"endVoltage": 11,
	},
	{
		"batteryName": "RYN-C85",
		"capacityAh": 6.3,
		"voltage": 14.4,
		"maxDraw": 6.3,
		"endVoltage": 12,
	},
	{
		"batteryName": "RYN-C140",
		"capacityAh": 9.8,
		"voltage": 14.8,
		"maxDraw": 10,
		"endVoltage": 12,
	},
	{
		"batteryName": "RYN-C290",
		"capacityAh": 19.8,
		"voltage": 14.4,
		"maxDraw": 14,
		"endVoltage": 12,
	}]
;

const camera =
	[{
		"brand": "Cakon",
		"model": "ABC 3000M",
		"powerConsumptionWh": 35.5,
	},
	{
		"brand": "Cakon",
		"model": "ABC 5000M",
		"powerConsumptionWh": 37.2,
	},
	{
		"brand": "Cakon",
		"model": "ABC 7000M",
		"powerConsumptionWh": 39.7,
	},
	{
		"brand": "Cakon",
		"model": "ABC 9000M",
		"powerConsumptionWh": 10.9,
	},
	{
		"brand": "Cakon",
		"model": "ABC 9900M",
		"powerConsumptionWh": 15.7,
	},
	{
		"brand": "Go MN",
		"model": "UIK 110C",
		"powerConsumptionWh": 62.3,
	},
	{
		"brand": "Go MN",
		"model": "UIK 210C",
		"powerConsumptionWh": 64.3,
	},
	{
		"brand": "Go MN",
		"model": "UIK 230C",
		"powerConsumptionWh": 26.3,
	},
	{
		"brand": "Go MN",
		"model": "UIK 250C",
		"powerConsumptionWh": 15.3,
	},
	{
		"brand": "Go MN",
		"model": "UIK 270C",
		"powerConsumptionWh": 20.3,
	},
	{
		"brand": "VANY",
		"model": "CEV 1100P",
		"powerConsumptionWh": 22,
	},
	{
		"brand": "VANY",
		"model": "CEV 1300P",
		"powerConsumptionWh": 23,
	},
	{
		"brand": "VANY",
		"model": "CEV 1500P",
		"powerConsumptionWh": 24,
	},
	{
		"brand": "VANY",
		"model": "CEV 1700P",
		"powerConsumptionWh": 25,
	},
	{
		"brand": "VANY",
		"model": "CEV 1900P",
		"powerConsumptionWh": 26,
	}]
;

// カメラの製品名(key):消費電力(value)の連想配列を作成
let powerConsumptionTable = {};

for (let i = 0; i < camera.length; i++) {
	if (powerConsumptionTable[camera[i].model] === undefined) powerConsumptionTable[camera[i].model] = camera[i].powerConsumptionWh;
}

// バッテリーの製品名(key):最大放電電力(value)の連想配列を作成
let maxDrawPowerTable = {};

for (let i = 0; i < battery.length; i++) {
	if (maxDrawPowerTable[battery[i].batteryName] === undefined) maxDrawPowerTable[battery[i].batteryName] = battery[i].maxDraw * battery[i].endVoltage;
}

// バッテリーの製品名(key):電力容量(value)の連想配列を作成
let powerCapacityTable = {};

for (let i = 0; i < battery.length; i++) {
	if (powerCapacityTable[battery[i].batteryName] === undefined) powerCapacityTable[battery[i].batteryName] = battery[i].voltage * battery[i].capacityAh;
}

class View {
	// タイトルバーの作成
	static createTitleBar() {
		let targetDiv = document.getElementById("target");
		let titleDiv = document.createElement("div");
		let titleText = document.createElement("h1");

		titleDiv.classList.add("d-flex", "justify-content-center", "align-items-center", "vw-100", "bg-info");
		titleText.classList.add("font-system-ui", "text-light", "py-3");
		titleText.innerHTML = "Battery Finder Program";

		titleDiv.append(titleText);
		targetDiv.append(titleDiv);
	}

	// フォーム部分の作成
	static createForm() {
		let targetDiv = document.getElementById("target");
		let innerDiv = document.createElement("div");

		innerDiv.classList.add("d-flex", "flex-column", "justify-content-start", "align-items-start", "col-12");

		let step1Div = document.createElement("div");
		let step1Label = document.createElement("label");
		let step1Select = document.createElement("select");

		step1Div.classList.add("m-3");

		step1Label.classList.add("h4", "my-3");
		step1Label.htmlFor = "brand-select";
		step1Label.innerHTML = "step1: Select Your Brand";

		step1Select.classList.add("form-control", "col-12");
		step1Select.setAttribute("id", "brand-select");

		step1Div.append(step1Label);
		step1Div.append(step1Select);
		innerDiv.append(step1Div);

		let step2Div = document.createElement("div");
		let step2Label = document.createElement("label");
		let step2Select = document.createElement("select");

		step2Div.classList.add("m-3");

		step2Label.classList.add("h4", "my-3");
		step2Label.htmlFor = "model-select";
		step2Label.innerHTML = "step2: Select Your Model";

		step2Select.classList.add("form-control", "col-12");
		step2Select.setAttribute("id", "model-select");

		step2Div.append(step2Label);
		step2Div.append(step2Select);
		innerDiv.append(step2Div);

		let step3Div = document.createElement("div");
		let step3Label = document.createElement("label");
		let step3InnerDiv = document.createElement("div");
		let step3Input = document.createElement("input");
		let step3InputLabel = document.createElement("label");

		step3Div.classList.add("m-3");

		step3Label.classList.add("h4", "my-3");
		step3Label.htmlFor = "input-accessory-pc";
		step3Label.innerHTML = "step3: Input Accessory Power Consumption";

		step3InnerDiv.classList.add("row", "mx-2");

		step3Input.classList.add("form-control", "col-3");
		step3Input.setAttribute("type", "number");
		step3Input.setAttribute("id", "input-accessory-pc");
		step3Input.setAttribute("value", "0");
		step3Input.setAttribute("max", "100");
		step3Input.setAttribute("min", "0");

		step3InputLabel.classList.add("mx-4", "mt-1", "h4");
		step3InputLabel.innerHTML = "W";

		step3InnerDiv.append(step3Input);
		step3InnerDiv.append(step3InputLabel);
		step3Div.append(step3Label);
		step3Div.append(step3InnerDiv);
		innerDiv.append(step3Div);

		let step4Div = document.createElement("div");
		let step4Label = document.createElement("h4");
		let step4InnerDiv = document.createElement("div");

		step4Div.classList.add("m-3");

		step4Label.classList.add("my-3");
		step4Label.innerHTML = "step4: Choose Your Battery";

		step4InnerDiv.classList.add("vw-100", "m-3");
		step4InnerDiv.setAttribute("id", "battery-list");

		step4Div.append(step4Label);
		step4Div.append(step4InnerDiv);
		innerDiv.append(step4Div);

		targetDiv.append(innerDiv);

		View.getAccessoryPC();
	}

	// ブランドメニューの作成
	static createBrandMenu() {
		const brandSelect = document.getElementById("brand-select");

		brandSelect.innerHTML = View.getOptionsString(Model.getBrandNames());
		View.drawModelOptions(); // モデルメニューの作成

		brandSelect.addEventListener("change", function() {
			View.drawModelOptions(); // モデルメニューの作成
		});
	}

	// プルダウンメニュー項目の配列optionsListを受け取ってoptionタグの文字列を返す
	static getOptionsString(optionsList) {
		let optionsString = "";

		for (let i = 0; i < optionsList.length; i++) {
			optionsString +=
			`
			<option value="${optionsList[i].replace(/\s/g, "-")}">${optionsList[i]}</option>
			`;
		}
	
		return optionsString;
	}

	// バッテリーリストの描画
	static drawBatteryList(selectedBatteryList, totalConsumption) {
		let batteryListString = "";

		if (selectedBatteryList.length === 0) {
			batteryListString +=
			`
			<div class="d-flex justify-content-between border border-secondary col-11 row">
				<div class="h5 m-3">There is no available battery...</div>
			`;
		}

		for (let i = 0; i < selectedBatteryList.length; i++) {
			batteryListString +=
			`
			<div class="d-flex justify-content-between border border-secondary col-11 row">
				<div class="h5 m-3">${selectedBatteryList[i]}</div>
			`;
			// バッテリーの持続時間を計算
			let duration = (Math.round((powerCapacityTable[selectedBatteryList[i]] / totalConsumption) * 10)) / 10;

			batteryListString +=
			`
				<div class="h6 m-3">Estimated ${duration} hours on selected setup</div>
			</div>
			`;
		}

		document.getElementById("battery-list").innerHTML = batteryListString;
	}

	// モデルメニューの作成
	static drawModelOptions() {
		const modelSelect = document.getElementById("model-select");

		modelSelect.innerHTML = View.getOptionsString(Model.getModelName(document.getElementById("brand-select").value.replace(/-/g, " ")));

		let totalConsumption = Model.getTotalConsumption(); // 消費電力（カメラ＋アクセサリー）を計算
		View.drawBatteryList(Model.getBatteryList(totalConsumption), totalConsumption); // バッテリーリストの描画

		modelSelect.addEventListener("change", function() {
			totalConsumption = Model.getTotalConsumption(); // 消費電力（カメラ＋アクセサリー）を計算
			View.drawBatteryList(Model.getBatteryList(totalConsumption), totalConsumption); // バッテリーリストの描画
		});
	}

	// step3の数値入力ボックスからアクセサリーの消費電力を受け取ってバッテリーリストを描画
	static getAccessoryPC() {
		document.getElementById("input-accessory-pc").addEventListener("input", function() {
			// 消費電力（カメラ＋アクセサリー）を計算
			let totalConsumption = Model.getTotalConsumption();
			// バッテリーリストの描画
			View.drawBatteryList(Model.getBatteryList(totalConsumption), totalConsumption);
		});
	}
}

class Model {
	// ブランド名の配列を返す
	static getBrandNames(){
		let tempList = [];
		for (let i = 0; i < camera.length; i++) {
			tempList.push(camera[i].brand);
		}
		// 重複したブランド名を排除
		let brandList = [...new Set(tempList)];
		return brandList;
	}

	// ブランド名brandNameを受け取って該当するモデル名の配列を返す
	static getModelName(brandName){
		let modelList = [];
		for (let i = 0; i < camera.length; i++) {
			if (camera[i].brand === brandName) modelList.push(camera[i].model);
		}

		return modelList;
	}

	// 消費電力（カメラ＋アクセサリー）を計算
	static getTotalConsumption() {
		// 消費電力（カメラ＋アクセサリー）を計算
		return  powerConsumptionTable[document.getElementById("model-select").value.replace(/-/g, " ")] + parseInt(document.getElementById("input-accessory-pc").value, 10);
	}

	// 条件に合うバッテリーリストを返す
	static getBatteryList(totalConsumption) {
		let selectedBatteryList = [];

		for (let i = 0; i < battery.length; i++) {
			if (maxDrawPowerTable[battery[i].batteryName] > totalConsumption) {
				selectedBatteryList.push(battery[i].batteryName);
			}
		}
		return selectedBatteryList.sort();
	}

}

View.createTitleBar();
View.createForm();
View.createBrandMenu();
