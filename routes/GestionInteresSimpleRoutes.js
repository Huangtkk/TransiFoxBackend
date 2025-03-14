const express = require("express");

const router = express.Router();


module.exports = function (servicio) {

   router.post('/api/CalcularOperacionesInteresSimple', async (req, res) => {


      try {

       

         const { Monto,Capital,Tasa_Interes,Tiempo,Interes_Simple} = req.body;

   

         const OpInteresSimple= servicio.CalcularInteresSimple(Monto,Capital,Tasa_Interes,Tiempo,Tasa_Interes,Interes_Simple);

       

         res.status(200).json(OpInteresSimple)

      } catch (error) {

         res.status(404).json(error);

      }

   })

   router.get('/api/getGastos', async (req, res) => {

      const Gastos = await servicio.getGastos();

      res.json(Gastos);
   })


   router.put('/api/UpdateRoles', async (req, res) => {

      const { Id_Rol,Nombre,Prioridad} = req.body

      const updateRoles = await servicio.UpdateRoles(Id_Rol,Nombre,Prioridad);


      res.json(updateRoles);
   })


   router.delete('/api/DeleteTarea/:Id_Rol', async (req, res) => {

      const { Id_Rol} = req.params

      const DelRoles = await servicio.DeleteRoles(Id_Rol);

      res.json(DelRoles);
   })

   return router;
}
