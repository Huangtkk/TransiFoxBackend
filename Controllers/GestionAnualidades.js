const fs = require('fs');
class ServicioAnualidad {

    constructor(DB) {
        this.DB = DB;
    }



    CalcularAnualidad(Monto_Fijo, Tasa_Anualidad, Periodos_Capitalizacion, Valor_Presente, Valor_Futuro) {


        const formulas = {
            Valor_Presente: () => Monto_Fijo * ((1 - Math.pow(1 + Tasa_Anualidad, -Periodos_Capitalizacion)) / Tasa_Anualidad),
            Valor_Futuro: () => Monto_Fijo * ((Math.pow(1 + Tasa_Anualidad, Periodos_Capitalizacion) - 1) / Tasa_Anualidad)
        };
    
        // Crear objeto con valores originales
        let valores = { 
            Monto_Fijo, 
            Tasa_Anualidad, 
            Periodos_Capitalizacion, 
            Valor_Presente, 
            Valor_Futuro 
        };
    
        // Calcular solo los valores faltantes
        for (let key in formulas) {
            if (valores[key] == null) {  // Verifica si es null o undefined
                valores[key] = formulas[key]();
            }
        }
    
        return valores;
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

module.exports = ServicioAnualidad;