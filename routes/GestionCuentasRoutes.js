const express = require("express");

const router = express.Router();


module.exports = function (servicio) {

   router.post('/api/addCuentas', async (req, res) => {


      try {

         const { Saldo, Ncuenta, Descripcion, FApertura } = req.body;

   

         const Cuentas = await servicio.addCuentas(Saldo, Ncuenta, Descripcion, FApertura);



         res.status(200).json(Cuentas)

      } catch (error) {

         res.status(404).json(error);

      }

   })

   router.get('/api/getCuentas', async (req,res) => {


      try {

         const Cuentas = await servicio.getCuentas();

         res.status(200).json(Cuentas);

      }catch(error){

         res.status(404).json(error);

      }



      
   });

   router.post('/api/getUsuarioBase', async (req, res) => {


      try {

         const { Email, Clave } = req.body;

         console.log(Clave);
         const UsuarioVerificar = await servicio.VerificarCorreoExistente(Email, Clave);

         res.status(200).json(UsuarioVerificar);

      } catch (error) {
         res.status(404).json(error);
      }
   });


   router.put('/api/UpdateUsuarios', async (req, res) => {

      const { Id_Usuario, Email, Clave } = req.body

      console.log(Email);

      const updateUsuarios = await servicio.UpdateUsuarios(Id_Usuario, Email, Clave);


      res.json(updateUsuarios);
   })


   router.delete('/api/DeleteUsuarios/:Id_Usuario', async (req, res) => {

      const { Id_Usuario } = req.params

      const DelUsuario = await servicio.DeleteUsuarios(Id_Usuario);

      res.json(DelUsuario);
   })

   
   router.get('/api/getUsuariosPorIdProyecto/:Id_Proyecto', async (req, res) => {

      const { Id_Proyecto } = req.params

      const usuarios = await servicio.getUsuariosPorProyectos(Id_Proyecto);

      res.json(usuarios);
   })


   return router;
}
