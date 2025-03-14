const obtenerFechaHoraDesdePython = require('../Global/dateService');


class ServicioGastos {

    constructor(DB) {
        this.DB = DB;
    }


    calcularInteresSimple(Monto, Capital, Tasa_Interes, Tiempo, Interes_Simple ) {
        
        const formulas = {
            Monto: () => Capital * (1 + Tasa_Interes * Tiempo),
            Interes_Simple: () => Capital * Tasa_Interes * Tiempo,
            Capital: () => Interes_Simple / (Tasa_Interes * Tiempo),
            Tasa_Interes: () => Interes_Simple / (Capital * Tiempo),
            Tiempo: () => Interes_Simple / (Capital * Tasa_Interes)
        };
    
        for (let key in formulas) {
            if (eval(key) === undefined) eval(`${key} = formulas[key]()`);
        }
    
        return { Monto, Capital, Tasa_Interes, Tiempo, Interes_Simple };
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