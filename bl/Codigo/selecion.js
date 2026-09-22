const players = [
    { id: 1, name: "Litebot", img: "../Imagenes/Litebot.png" },
    { id: 2, name: "Jorky", img: "../Imagenes/Jorky.png" },
    { id: 3, name: "M3LT1NG", img: "../Imagenes/M3LT1NG.png" },
    { id: 4, name: "Dorilico4412", img: "../Imagenes/Dorilico4412.png" },
    { id: 5, name: "Matreisx", img: "../Imagenes/Matreisx.png" }
];

// Función para pintar las tarjetas en el HTML
function renderPlayerCards() {
    // Asegúrate de tener un contenedor en tu HTML con id="players-container" o cámbialo por tu selector
    const container = document.getElementById("players-container");
    if (!container) return;
    
    container.innerHTML = "";

    players.forEach(player => {
        // Obtiene las estadísticas guardadas en la nube para este jugador (si existen)
        const stats = globalData[player.name] || { tiro: 0, pase: 0, efectividad: 0 };

        const card = document.createElement("div");
        card.className = "player-card";
        card.innerHTML = `
            <img src="${player.img}" alt="${player.name}">
            <h3>${player.name}</h3>
            <div class="stats">
                <p>Tiro: <span data-stat="tiro" data-player="${player.name}">${stats.tiro}</span></p>
                <p>Pase: <span data-stat="pase" data-player="${player.name}">${stats.pase}</span></p>
                <p>Efectividad: <span data-stat="efectividad" data-player="${player.name}">${stats.efectividad}</span></p>
            </div>
            <!-- Botones de ejemplo para sumar estadísticas y probar el guardado -->
            <button onclick="cambiarStat('${player.name}', 'tiro', 1)">+1 Tiro</button>
        `;
        container.appendChild(card);
    });
}

// Función de prueba para cambiar una estadística y guardarla en el Bin de inmediato
async function cambiarStat(playerName, statKey, incremento) {
    const actualVal = globalData[playerName]?.[statKey] || 0;
    const nuevoVal = actualVal + incremento;
    
    // Llama a la función que creamos en saveRatings.js para actualizar y subir a JSONBin
    await updateAndSaveStat(playerName, statKey, nuevoVal);
    
    // Vuelve a pintar las tarjetas con los datos actualizados
    renderPlayerCards();
}

// Sobrescribimos o integramos el evento DOMContentLoaded para que pinte las tarjetas al terminar de cargar los datos de la nube
window.addEventListener("load", () => {
    // Damos un pequeño respiro para asegurarnos de que globalData ya se descargó
    setTimeout(() => {
        renderPlayerCards();
    }, 500);
});