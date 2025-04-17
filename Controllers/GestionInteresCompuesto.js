class ServiciosInteresCompuesto {

    constructor(DB) {
        this.DB = DB;
    }



    CalcularInteresCompuesto(Monto_Compuesto,Capital,Tasa_Interes,Tiempo,Interes_Compuesto ) {


        try{

            const formulas = {
                Monto_Compuesto: () => Capital * Math.pow((1 + (Tasa_Interes/100)), Tiempo),
                Capital: () => Monto_Compuesto / Math.pow((1 + (Tasa_Interes/100)), Tiempo),
                Tasa_Interes: () => Math.pow(Monto_Compuesto / Capital, 1 / Tiempo) - 1,
                Tiempo: () => (Math.log10(Monto_Compuesto) - Math.log10(Capital)) / Math.log10(1 + (Tasa_Interes/100)),
                Interes_Compuesto: () => Monto_Compuesto-Capital,
    
                //Tiempo: () => Interes_Simple / (Capital * Tasa_Interes)
            };
    
            let valores = { Monto_Compuesto,Capital,Tasa_Interes,Tiempo,Interes_Compuesto };
    

    
            for (let key in formulas) {
                if (valores[key] == null) {  // Verifica null o undefined
                    valores[key] = formulas[key]();
                }
            }
    
            return valores;
            
        }catch(error){
            console.log(error);
        }
    }



    async addCuentas(Saldo, Ncuenta, Descripcion, FApertura) {
        try {
            const Disponible = "SI";

            
    
            // Asegúrate de que el número de parámetros coincida con la cantidad de ' ? ' en la consulta
            const sql = "INSERT INTO Cuentas(Codigo, Saldo, Ncuenta, Descripcion, FApertura, Disponible) VALUES (NEXTVAL('secuenciacuentas'), ?, ?, ?, ?, ?)";
    
            // Aquí estamos pasando 5 parámetros (Saldo, Ncuenta, Descripcion, FApertura, Disponible)
            await this.DB.Open(sql, [Saldo, Ncuenta, Descripcion, FApertura, Disponible]);
    
            return 'Guardado Exitosamente';
        } catch (err) {
            console.error(err);
            return 'Guardado errado';
        }
    }
    
    

    async getCuentas() {
        try {
            const sql = "select * from Cuentas where Disponible = 'SI'";
            let result = await this.DB.Open(sql, []);
    
            if (result && result.length > 0) {
                
                return result.map(propiedad => ({
                    "Saldo": propiedad.saldo,
                
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

module.exports = ServiciosInteresCompuesto;