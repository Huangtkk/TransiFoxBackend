class ServiciosCuentas {

    constructor(DB) {
        this.DB = DB;
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

module.exports = ServiciosCuentas;