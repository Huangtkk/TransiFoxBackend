const obtenerFechaHoraDesdePython = require('../Global/dateService');


class ServicioGastos {

    constructor(DB) {
        this.DB = DB;
    }


    async addGastos(Monto,Categoria,Proveedor,Fecha,Hora) {
        try {

           // const { fecha: Fecha, hora: Hora } = await obtenerFechaHoraDesdePython();
          
           
            const Disponible="SI";

            const sql = "INSERT INTO Gastos(Fecha,Hora,Monto,Categoria,Proveedor,Disponible) VALUES (?,?, ?, ?, ?,?)";
    
            await this.DB.Open(sql, [Fecha,Hora,Monto,Categoria,Proveedor,Disponible]);
    
            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }
    

    async getGastos() {
        try {
            const sql = "select * from gastos Where Disponible='SI'";
            let result = await this.DB.Open(sql, []);
    
            if (result && result.length > 0) {
                
                return result.map(propiedad => ({
                    "Fecha": propiedad.fecha,
                    "Hora": propiedad.hora,
                    "Monto": propiedad.monto,
                    "Categoria":propiedad.categoria,
                    "Proveedor":propiedad.proveedor
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

module.exports = ServicioGastos;