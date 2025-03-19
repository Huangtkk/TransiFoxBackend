


class ServicioInteresSimple {

    constructor(DB) {
        this.DB = DB;
    }


    CalcularInteresSimple(Monto, Capital, Tasa_Interes, Tiempo, Interes_Simple ) {


        const formulas = {
            Monto: () => Capital * (1 + (Tasa_Interes/100) * Tiempo),
            Interes_Simple: () => Capital * (Tasa_Interes/100) * Tiempo,
            Capital: () => Interes_Simple / ((Tasa_Interes/100) * Tiempo),
            Tasa_Interes: () => (Interes_Simple / (Capital * Tiempo))*100,
            Tiempo: () => Interes_Simple / (Capital * (Tasa_Interes/100))
        };

        let valores = { Monto, Capital, Tasa_Interes, Tiempo, Interes_Simple };

        for (let key in formulas) {
            if (valores[key] == null) {  // Verifica null o undefined
                valores[key] = formulas[key]();
            }
        }
    
        return valores;
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

module.exports = ServicioInteresSimple;