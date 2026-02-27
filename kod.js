function nagyitKep(melyikKep) {
	document.getElementById("nagykep").src = melyikKep.src;
}

function visszaKep() {
	document.getElementById("nagykep").src = "ures.jpg";
}

function frissitSorEsKosar(e) {
	let input = e.target;
	let idx = Number(input.dataset.index);
	let termek = termekek[idx];
	if (!termek) return;

	let db = parseInt(input.value, 10);
	if (!Number.isFinite(db) || db < 0) db = 0;
	input.value = String(db);

	let sorOsszeg = document.querySelector(`.sorOsszeg[data-index="${idx}"]`);
	if (sorOsszeg) {
		let osszeg = termek.ar * db;
		sorOsszeg.textContent = `${osszeg} Ft`;
	}

	frissitKosarOsszeg();
}

function frissitKosarOsszeg() {
	let total = 0;

	document.querySelectorAll(".dbInput").forEach((inp) => {
		let idx = Number(inp.dataset.index);
		let termek = termekek[idx];
		if (!termek) return;

		let db = parseInt(inp.value, 10);
		if (Number.isFinite(db) && db > 0) {
			total += termek.ar * db;
		}
	});

	let kosarEl = document.getElementById("kosarOsszeg");
	if (kosarEl) kosarEl.textContent = `Összesen: ${total} Ft`;
}

let termekek = [
	{
		nev: 'Kingston HyperX Predator 16GB (4x4GB) DDR4 3200MHz HX432C16PB3K4/16',
		kep: 'RAM.jpg',
		ar: 80763,
	},
	{
		nev: 'LG 27MP59G-P Monitor',
		kep: 'monitor.jpg',
		ar: 45990,
	},
	{
		nev: 'Western Digital Red 3.5" 2TB 5400rpm 64MB SATA3 WD20EFRX',
		kep: 'HDD.jpg',
		ar: 34615,
	},
	{
		nev: 'Samsung 970 EVO 500GB M.2 PCIe MZ-V7E500BW',
		kep: 'SSD.jpg',
		ar: 51900,
	},
	{
		nev: 'Chieftec Smart 500W (GPS-500A8)',
		kep: 'tap.jpg',
		ar: 18410,
	},
];

window.addEventListener('DOMContentLoaded', () => {
	let tbody = document.querySelector('#termekTabla tbody');
	if (!tbody) return;

	termekek.forEach((t, idx) => {
		let tr = document.createElement('tr');
		tr.className = 'termekek';

		let tdNev = document.createElement('td');
		tdNev.textContent = t.nev;

		let tdKep = document.createElement('td');
		let img = document.createElement('img');
		img.className = 'kiskep';
		img.src = t.kep;
		img.alt = t.nev;
		img.addEventListener('mouseover', () => nagyitKep(img));
		img.addEventListener('mouseout', () => visszaKep());
		tdKep.appendChild(img);

		let tdDb = document.createElement('td');
		let input = document.createElement('input');
		input.type = 'number';
		input.min = '0';
		input.step = '1';
		input.value = '0';
		input.className = 'dbInput';
		input.dataset.index = String(idx);
		input.addEventListener('input', frissitSorEsKosar);
		tdDb.appendChild(input);

		let tdOsszeg = document.createElement('td');
		tdOsszeg.className = 'sorOsszeg';
		tdOsszeg.dataset.index = String(idx);
		tdOsszeg.textContent = '0 Ft';

		tr.appendChild(tdNev);
		tr.appendChild(tdKep);
		tr.appendChild(tdDb);
		tr.appendChild(tdOsszeg);

		tbody.appendChild(tr);
	});

	frissitKosarOsszeg();
});