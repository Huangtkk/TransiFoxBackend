const { exec } = require('child_process');

async function obtenerFechaHoraDesdePython() {
    return new Promise((resolve, reject) => {
        exec('python ./Global/date_formatter.py', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al ejecutar Python: ${error.message}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`Error en el script Python: ${stderr}`);
                reject(stderr);
                return;
            }
            // Dividir la salida en fecha y hora
            const [fecha, hora] = stdout.trim().split(',');
            resolve({ fecha, hora });
        });
    });
}

module.exports = obtenerFechaHoraDesdePython;
