const obtenerFechaHoraDesdePython = require('../Global/dateService');
class ServicioGradientes {

    constructor(DB) {
        this.DB = DB;
    }



    CalcularGradienteAritmetico(ValorPresente, PagoBase, TasaInteres,NumeroPeriodos,TasaCrecimiento, ValorFuturo,Tipo) {
    
       
        const i = TasaInteres / 100;
        const G = TasaCrecimiento;
    
        const formulas = {
    
            VP: () => //Valor Presente
                PagoBase * ((1 - Math.pow(1 + i, -NumeroPeriodos)) / i) +
                G * ((1 - Math.pow(1 + i, -NumeroPeriodos)) / Math.pow(i, 2) - (NumeroPeriodos / (i * Math.pow(1 + i, NumeroPeriodos)))),
    
            VF: () => //Valor Futuro
                PagoBase * ((Math.pow(1 + i, NumeroPeriodos) - 1) / i) +
                G * ((Math.pow(1 + i, NumeroPeriodos) - i * NumeroPeriodos - 1) / Math.pow(i, 2)),
    
            PagoBaseDesdeVP: () =>
                (ValorPresente * (i / (1 - Math.pow(1 + i, -NumeroPeriodos)))) -
                (G * ((1 / i) - (NumeroPeriodos / (Math.pow(1 + i, NumeroPeriodos) - 1)))),
    
            PagoBaseDesdeVF: () =>
                (ValorFuturo * (i / (Math.pow(1 + i, NumeroPeriodos) - 1))) -
                (G * ((1 / i) - (NumeroPeriodos / (Math.pow(1 + i, NumeroPeriodos) - 1)))),
    
            // Serie: selecciona automáticamente si calcula R desde VP o VF
            S: () => {        //Serie
                if (ValorFuturo > 0) {
                    return formulas.PagoBaseDesdeVF();
                } else {
                    return formulas.PagoBaseDesdeVP();
                }
            }
        };
    
        const Valor = formulas[Tipo];
    
        if (!Valor) {
            return { error: "Tipo no válido. Usa 'S', 'C' o 'CN'" };
        }
    
        return Valor();
    }


    CalcularGradienteGeometrico(ValorPresente, PagoBase, TasaInteres,NumeroPeriodos,TasaCrecimiento, ValorFuturo,Tipo) {
    
       
        const i = TasaInteres / 100;
        const G = TasaCrecimiento;
    
        const formulas = {
    
            VP: () => //Valor Presente
            (PagoBase * (1 - Math.pow((1 + (G/100)) / (1 + i), NumeroPeriodos))) / (i - (G/100)),
    
            VF: () => //Valor Futuro
            (PagoBase * (Math.pow(1 + (TasaCrecimiento / 100), NumeroPeriodos) * Math.pow(1 + i, NumeroPeriodos))) / ((TasaCrecimiento / 100) - i),

    
            PagoBaseDesdeVP: () =>
                (ValorPresente * (i - (G/100))) / (1 - Math.pow((1 + (G/100)) / (1 + i), NumeroPeriodos)),
    
            PagoBaseDesdeVF: () =>
                (ValorFuturo * ((TasaCrecimiento/100) - i)) / (Math.pow(1 + (TasaCrecimiento/100), NumeroPeriodos) * Math.pow(1 + i, NumeroPeriodos)),
    
            // Serie: selecciona automáticamente si calcula R desde VP o VF
            S: () => {        //Serie
                if (ValorFuturo > 0) {
                    return formulas.PagoBaseDesdeVF();
                } else {
                    return formulas.PagoBaseDesdeVP();
                }
            }
        };
    
        const Valor = formulas[Tipo];
    
        if (!Valor) {
            return { error: "Tipo no válido. Usa 'S', 'C' o 'CN'" };
        }
    
        return Valor();
    }


  


}

module.exports = ServicioGradientes;