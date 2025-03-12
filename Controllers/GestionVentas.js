const obtenerFechaHoraDesdePython = require('../Global/dateService');
class ServicioVentas {

    constructor(DB) {
        this.DB = DB;
    }


    async addVentas(Monto, Razon,Fecha,Hora) {
        try {


           // const { fecha: Fecha, hora: Hora } = await obtenerFechaHoraDesdePython();


            const Disponible="SI";


            const sql = "INSERT INTO Ventas(Fecha,Hora,Monto,Razon,Disponible) VALUES (?, ?, ?, ?,?)";

            await this.DB.Open(sql, [Fecha, Hora, Monto, Razon, Disponible]);

            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }


    async getVentas() {
        try {
            const sql = "select * from Ventas Where Disponible='SI'";
            let result = await this.DB.Open(sql, []);


            if (result && result.length > 0) {

               

                return result.map(propiedad => ({
                    
                    "Fecha": propiedad.fecha,
                    "Hora": propiedad.hora,
                    "Monto": propiedad.monto,
                    "Razon": propiedad.razon,
                   
                }));
            } else {

                return [];
            }
        } catch (err) {

            console.error(err);
            return 'Error de consulta';
        }
    }



  


}

module.exports = ServicioVentas;