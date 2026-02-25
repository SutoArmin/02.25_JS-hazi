function nagyitKep(melyikKep) {
    document.getElementById("nagykep").src = melyikKep.src;
}

function visszaKep() {
    document.getElementById("nagykep").src = 'ures.jpg';
}

function kivalaszt(melyikTermek) {
    let termek = termekek[melyikTermek];
    if (!termek) return;

    let valasz = prompt("Hány darabot szeretnél?", '1');
    if (valasz === null) return;

    let db = parseInt(valasz, 10);
    if (!Number.isFinite(db) || db <= 0) {
        alert("Adj meg egy pozitív egész számot!");
        return;
    }

    let kosar = document.getElementById("kosar");
    let p = document.createElement("p");
    p.textContent = `${db} db ${termek.nev}`;
    kosar.appendChild(p);
}

let termekek = [
    {
        nev: 'Kingston HyperX Predator 16GB (4x4GB) DDR4 3200MHz HX432C16PB3K4/16',
        kep: 'RAM.jpg',
    },
    {
        nev: 'LG 27MP59G-P Monitor',
        kep: 'monitor.jpg',
    },
    {
        nev: 'Western Digital Red 3.5" 2TB 5400rpm 64MB SATA3 WD20EFRX',
        kep: 'HDD.jpg',
    },
    {
        nev: 'Samsung 970 EVO 500GB M.2 PCIe MZ-V7E500BW',
        kep: 'SSD.jpg',
    },
    {
        nev: 'Chieftec Smart 500W (GPS-500A8)',
        kep: 'tap.jpg',
    },
];

window.addEventListener("DOMContentLoaded", () => {
    let tbody = document.querySelector("#termekTabla tbody");
    if (!tbody) return;

    termekek.forEach((t, idx) => {
        let tr = document.createElement("tr");
        tr.className = "termekek";
        tr.addEventListener("click", () => kivalaszt(idx));

        let tdNev = document.createElement("td");
        tdNev.textContent = t.nev;

        let tdKep = document.createElement("td");
        let img = document.createElement("img");
        img.className = "kiskep";
        img.src = t.kep;
        img.alt = t.nev;

        img.addEventListener("mouseover", () => nagyitKep(img));
        img.addEventListener("mouseout", () => visszaKep());

        img.addEventListener("click", (e) => {
            e.stopPropagation();
            kivalaszt(idx);
        });

        tdKep.appendChild(img);

        tr.appendChild(tdNev);
        tr.appendChild(tdKep);
        tbody.appendChild(tr);
    });
});

