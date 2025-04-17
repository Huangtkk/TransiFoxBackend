


class ServicioCapitalizacion {

    constructor(DB) {
        this.DB = DB;
    }


   CalcularCapSCCA(Capital, Tasa_Interes, Tiempo,TiempoDiferido,CapitalizacionesAnio,Tipo) {
    
        if (!Capital|| !Tasa_Interes|| !Tiempo || !Tipo) {
            return { error: "Faltan datos necesarios: Capital, Tasa_Interes, Tiempo o Tipo" };
        }
    
        const formulas = {
            S: () => Capital * (1 + (Tasa_Interes / 100) * Tiempo),                        // Capitalización Simple
            C: () => Capital * Math.pow(1 + (Tasa_Interes / 100), Tiempo),                // Capitalizacion Compuesta
            CN: () => Capital * Math.exp((Tasa_Interes / 100) * Tiempo),                       // Capitalizacion compuesta
            A: () => Capital * Math.pow(1 + (Tasa_Interes / 100), Tiempo + 1),            //Capitalización Anticipada
            P: () => {
                
                const rDecimal = Tasa_Interes / 100;
                return Capital * Math.pow(1 + (rDecimal / CapitalizacionesAnio), CapitalizacionesAnio * Tiempo); //Capitalizacion Periodica
            },
            D: () => Capital * Math.pow(1 + (Tasa_Interes / 100), Tiempo - TiempoDiferido), //Capitalizacion Diferida

        };
    
        const Monto = formulas[Tipo];
    
        if (!Monto) {
            return { error: "Tipo no válido. Usa 'S', 'C' o 'CN'" };
        }
    
        return Monto();
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

module.exports = ServicioCapitalizacion;