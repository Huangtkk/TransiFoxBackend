const express = require("express");
const axios = require("axios"); // Importa axios para realizar solicitudes HTTP
const router = express.Router();


module.exports = function (servicio) {

   router.post('/api/addVentas', async (req, res) => {


      try {

         const { Monto, Razon, Fecha, Hora } = req.body;


         const Ventas = await servicio.addVentas(Monto, Razon, Fecha, Hora);



         res.status(200).json(Ventas)

      } catch (error) {

         res.status(404).json(error);

      }

   })




   

   // Ruta de prueba para verificar el funcionamiento
   router.get('/api/testAddVentas', async (req, res) => {
      try {
         await consumirApiYRegistrar();
         res.status(200).json({ message: "Se consumió la API externa y se registraron los datos (si los había)." });
      } catch (error) {
         res.status(500).json({ message: "Error al realizar la operación", error: error.message });
      }
   });
  
   router.get('/api/getVentas', async (req, res) => {

      try {

         const Perfiles = await servicio.getVentas();

         res.status(200).json(Perfiles);

      }catch(error){
         console.log(error);
         res.status(400).json(error);
      }

      
   })


   router.put('/api/UpdatePerfiles', async (req, res) => {

      const { Id_Perfil, Nombre_Completo } = req.body

      const updatePerfil = await servicio.UpdatePerfiles(Id_Perfil, Nombre_Completo);


      res.json(updatePerfil);
   })


   router.delete('/api/DeletePerfiles/:Id_Perfil', async (req, res) => {

      const { Id_Perfil } = req.params

      const DelPerfil = await servicio.DeletePerfiles(Id_Perfil);

      res.json(DelPerfil);
   })


   router.post('/api/getPerfilPorIdUsuario/:Id_Usuario', async (req, res) => {


      try {

         const { Id_Usuario } = req.params;


         const perfil = await servicio.getPerfilConUsuarioId(Id_Usuario);

         res.status(200).json(perfil);

      } catch (error) {
         res.status(404).json(error);
      }
   });


   router.get('/api/getPerfilesByProyecto/:id_proyecto', async (req, res) => {

      const id_proyecto = req.params.id_proyecto;


      const Perfiles = await servicio.getPerfilesByProyecto(id_proyecto);

      res.json(Perfiles);
   })


   return router;
}
