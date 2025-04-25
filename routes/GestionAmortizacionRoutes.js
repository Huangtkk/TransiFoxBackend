const express = require("express");
const path = require('path');
const fs = require('fs');

const router = express.Router();



module.exports = function (servicio) {


   router.post('/api/CalcularAmortizacion', async (req, res) => {


      try {

         const { Monto,TasaInteres,Plazo,Tipo} = req.body;



         const Valor = await servicio.CalcularAmortizacion( Monto,TasaInteres,Plazo,Tipo);



         res.status(200).json(Valor)

      } catch (error) {

         res.status(404).json(error);

      }

   })


   router.get('/api/getHistorico', async (req, res) => {

      const Gastos = await servicio.getHistorico();

      res.json(Gastos);
   })


   router.put('/api/UpdateTarea', async (req, res) => {

      const { Id_Tarea, Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion, Porcentajetarea } = req.body

      const updateTarea = await servicio.UpdateTarea(Id_Tarea, Nombre, Fecha_Inicio, Fecha_Finalizacion, Descripcion, Porcentajetarea);


      res.json(updateTarea);
   })


   router.delete('/api/DeleteTarea/:Id_Tarea', async (req, res) => {

      const { Id_Tarea } = req.params

      const Deltarea = await servicio.DeleteTarea(Id_Tarea);

      res.json(Deltarea);
   })

   router.get('/api/getEntrega/:id_Tarea', async (req, res) => {

      const id_Tarea = req.params.id_Tarea;


      const entrega = await servicio.getEntrega(id_Tarea);

      res.json(entrega);
   })




   return router;
}
