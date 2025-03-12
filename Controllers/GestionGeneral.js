const fs = require('fs');
class ServicioGeneral {

    constructor(DB) {
        this.DB = DB;
    }




    async getGeneral() {

        try {

            const sql = "select * from resumen_cuentas";
            let result = await this.DB.Open(sql, []);
    
            if (result && result.length > 0) {
                
                return result.map(propiedad => ({
                    "Saldo_Actual": propiedad.saldo_actual,
                    "Ingresos_Mes_Actual": propiedad.ingresos_mes_actual,
                    "Gastos_Mes_Actual": propiedad.gastos_mes_actual,
                    "Saldo_inicial":propiedad.saldo_inicial,
                    "Ventas_Hoy":propiedad.ventas_hoy,
                    "Gastos_Hoy":propiedad.gastos_hoy,
                    "Numero_Ventas_Hoy":propiedad.numero_ventas_hoy,
                    "Numero_Ventas_Totales":propiedad.numero_ventas_totales
    
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

module.exports = ServicioGeneral;