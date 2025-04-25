const fs = require('fs');
class ServicioAmortizacion {

    constructor(DB) {
        this.DB = DB;
    }




    CalcularAmortizacion(Monto, TasaInteres, Plazo, Tipo) {
        const i = TasaInteres;
    
        const formulas = {
            // Amortización Alemana: cuotas decrecientes, amortización fija
            A: () => {  //Alemana
                const amortizacion = Monto / Plazo;
                let saldo = Monto;
                const tabla = [];
    
                for (let t = 1; t <= Plazo; t++) {
                    const interes = saldo * i;
                    const cuota = amortizacion + interes;
                    const saldoFinal = saldo - amortizacion;
    
                    tabla.push({
                        Periodo: t,
                        SaldoInicial: saldo.toFixed(2),
                        Amortizacion: amortizacion.toFixed(2),
                        Interes: interes.toFixed(2),
                        CuotaTotal: cuota.toFixed(2),
                        SaldoFinal: saldoFinal.toFixed(2)
                    });
    
                    saldo = saldoFinal;
                }
    
                return tabla;
            },

            F: () => {  //Francesa
                const cuota = (Monto * i) / (1 - Math.pow(1 + i, -Plazo));
                let saldo = Monto;
                const tabla = [];
    
                for (let t = 1; t <= Plazo; t++) {
                    const interes = saldo * i;
                    const amortizacion = cuota - interes;
                    const saldoFinal = saldo - amortizacion;
    
                    tabla.push({
                        Periodo: t,
                        SaldoInicial: saldo.toFixed(2),
                        Amortizacion: amortizacion.toFixed(2),
                        Interes: interes.toFixed(2),
                        CuotaTotal: cuota.toFixed(2),
                        SaldoFinal: saldoFinal.toFixed(2)
                    });
    
                    saldo = saldoFinal;
                }
    
                return tabla;
            },
            M: () => {  //Americano
                const tabla = [];
                const interes = Monto * i;
                let saldo = Monto;
    
                for (let t = 1; t <= Plazo; t++) {
                    let amortizacion = 0;
                    let cuota = interes;
    
                    if (t === Plazo) {
                        amortizacion = Monto;
                        cuota += amortizacion;
                        saldo = 0;
                    }
    
                    tabla.push({
                        Periodo: t,
                        SaldoInicial: t === 1 ? Monto.toFixed(2) : tabla[t - 2].SaldoFinal,
                        Amortizacion: amortizacion.toFixed(2),
                        Interes: interes.toFixed(2),
                        CuotaTotal: cuota.toFixed(2),
                        SaldoFinal: saldo.toFixed(2)
                    });
                }
    
                return tabla;
            }
        };
    
        const Valor = formulas[Tipo];
    
        if (!Valor) {
            return { error: "Tipo no válido. Usa 'A'" };
        }
    
        return Valor();
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

module.exports = ServicioAmortizacion;