const express = require("express");

const router = express.Router();
const { enviarMensaje } = require('../kafka/KafkaProducer');


module.exports = function (servicio) {

   router.post('/api/addUsuarios', async (req, res) => {


      try {

         const { Email ,Cedula,Clave } = req.body;



         const Usuarios = await servicio.addUsuarios(Email ,Cedula,Clave);
     

        //  const mensaje = { Email, Cedula, Clave, status:Usuarios};

       //  await enviarMensaje('usuarios-registrados', mensaje);


         res.status(200).json(Usuarios)

      } catch (error) {

         res.status(404).json(error);

      }

   })

   router.get('/api/getUsuarios', async (req,res) => {


      try {

         const Usuarios = await servicio.getUsuarios();

         res.status(200).json(Usuarios);

      }catch(error){

         res.status(404).json(error);

      }



      
   });

   router.post('/api/getUsuarioBase', async (req, res) => {


      try {

         const { Cedula, Clave } = req.body;

         console.log(Clave);
         const UsuarioVerificar = await servicio.getUsuarioEspecifico(Cedula, Clave);



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

   router.post('/api/getUsuarioEspecifico', async (req, res) => {


      try {

       

         const { Cedula ,Clave } = req.body;

      
         const UsuarioVerificar = await servicio.getUsuarioEspecifico(Cedula,Clave);

         res.status(200).json(UsuarioVerificar);

      } catch (error) {
         res.status(404).json(error);
      }
   });



   return router;
}
