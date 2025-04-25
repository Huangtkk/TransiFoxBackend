const express = require("express");

const router = express.Router();


module.exports = function (servicio) {

   router.post('/api/CalcularTir', async (req, res) => {


      try {

       

         const { Monto,FlujosPorPeriodo,NumeroPeriodos} = req.body;

         

   
         const resp= servicio.CalcularTir(Monto,FlujosPorPeriodo,NumeroPeriodos);

       

         res.status(200).json(resp)

      } catch (error) {

         res.status(404).json(error);

      }

   })

  

   return router;
}
