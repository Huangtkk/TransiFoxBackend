const fs = require('fs');
class ServicioEntregas {

    constructor(DB) {
        this.DB = DB;
    }




    async addHistorico(Informe, UrlPdfEntrega, Id_Tarea) {
        try {

            const Disponible = "SI";



            const sql = "INSERT INTO Entregas(Id_Entrega, Informe, UrlPdfEntrega, Id_Tarea,Disponible) VALUES (NEXTVAL('secuenciaentregas'), ?,?, ?, ?)";

           

            await this.DB.Open(sql, [Informe, UrlPdfEntrega, Id_Tarea,Disponible]);

            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }

    async getHistorico() {

        try {

            const sql = "select * from historico Where Disponible='SI'";
            let result = await this.DB.Open(sql, []);
    
            if (result && result.length > 0) {
                
                return result.map(propiedad => ({
                    "Mes": propiedad.mes,
                    "Gastos_Del_Mes": propiedad.gastos_del_mes,
                    "Ingresos_Del_Mes": propiedad.ingresos_del_mes,
                    "Monto_a_Favor":propiedad.monto_a_favor,
    
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

module.exports = ServicioEntregas;