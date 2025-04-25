
class ServicioTir {

    constructor(DB) {
        this.DB = DB;
    }



    CalcularTir(Monto, FlujosPorPeriodo, NumeroPeriodos) {
        const precision = 0.0000001;
        let tasaBaja = 0.0;
        let tasaAlta = 1.0;
        let tir = 0.0;
    
        // Función para calcular el VPN (Valor Presente Neto)
        function calcularVPN(tasa) {
            let vpn = -Monto;
            for (let t = 1; t <= NumeroPeriodos; t++) {
                vpn += FlujosPorPeriodo[t - 1] / Math.pow(1 + tasa, t);
            }
            return vpn;
        }
    
        // Buscar la TIR utilizando búsqueda binaria
        while ((tasaAlta - tasaBaja) > precision) {
            tir = (tasaBaja + tasaAlta) / 2;
            let vpn = calcularVPN(tir);
            if (vpn > 0) {
                tasaBaja = tir;
            } else {
                tasaAlta = tir;
            }
        }
    
        // Generar la tabla con flujos descontados y TIR
        let tabla = [];
        tabla.push({
            periodo: 0,
            flujo: -Monto,
            descuento: "1.00000",
            valorDescontado: (-Monto).toFixed(2),
            tir_estimado: (tir * 100).toFixed(4) + "%"
        });
    
        // Si la tasa de interés es cero, no calcules descuento en los flujos futuros
        if (tir === 0) {
            FlujosPorPeriodo.forEach((flujo, index) => {
                tabla.push({
                    periodo: index + 1,
                    flujo: flujo,
                    descuento: "1.00000",
                    valorDescontado: flujo.toFixed(2),
                    tir_estimado: "0.0000%"
                });
            });
        } else {
            // Si la tasa de interés no es cero, calcula el valor descontado
            for (let t = 1; t <= NumeroPeriodos; t++) {
                const flujo = FlujosPorPeriodo[t - 1];
                const descuento = Math.pow(1 + tir, t);
                const valorDescontado = flujo / descuento;
    
                tabla.push({
                    periodo: t,
                    flujo: flujo,
                    descuento: descuento.toFixed(5),
                    valorDescontado: valorDescontado.toFixed(2),
                    tir_estimado: (tir * 100).toFixed(4) + "%"
                });
            }
        }
    
        return {
            tir: (tir * 100).toFixed(4) + "%",
            tabla: tabla
        };
    }
    
    
    

  


}

module.exports = ServicioTir;