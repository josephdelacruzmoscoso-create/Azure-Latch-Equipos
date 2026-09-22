// Configuración de JSONBin.io
const BIN_ID = "6aa59300ffd5d16053ff10d1";
const MASTER_KEY = "$2a$10$W90QlCShIN7G2rC2muRL10v3TG1Q502jIPgHhIKjyfDDignXWX4XG";
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// 1. Función para cargar los datos del Bin al iniciar la página
async function loadDataFromBin() {
    try {
        let response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "X-Master-Key": MASTER_KEY
            }
        });

        if (!response.ok) throw new Error("Error al cargar los datos desde JSONBin");

        let result = await response.json();
        // JSONBin envuelve los datos dentro de la propiedad "record"
        return result.record; 
    } catch (error) {
        console.error("Hubo un problema cargando la información:", error);
        return null;
    }
}

// 2. Función para guardar o actualizar los datos en el Bin
async function saveDataToBin(newData) {
    try {
        let response = await fetch(API_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": MASTER_KEY
            },
            body: JSON.stringify(newData)
        });

        if (!response.ok) throw new Error("Error al guardar los datos en JSONBin");

        let result = await response.json();
        console.log("Datos guardados exitosamente en la nube:", result);
        return true;
    } catch (error) {
        console.error("Hubo un problema guardando la información:", error);
        return false;
    }
}
// Variable global para almacenar los datos sincronizados
let globalData = {};

// Al cargar la página, descarga los datos de la nube e inicializa la app
document.addEventListener("DOMContentLoaded", async () => {
    const cloudData = await loadDataFromBin();
    if (cloudData) {
        globalData = cloudData;
        console.log("Datos cargados desde la nube:", globalData);
        
        // Si tienes una función en 'seleccion.js' que pinta las tarjetas, 
        // puedes llamarla aquí, por ejemplo: renderPlayers(globalData);
    }
});

// Función para actualizar una estadística y guardarla de inmediato
async function updateAndSaveStat(playerName, statKey, value) {
    if (!globalData[playerName]) {
        globalData[playerName] = {};
    }
    globalData[playerName][statKey] = value;
    
    // Envía los cambios a tu Bin de JSONBin.io
    await saveDataToBin(globalData);
}