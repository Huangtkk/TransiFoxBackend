const express = require("express");
const path = require('path');
const fs = require('fs');

const router = express.Router();



module.exports = function (servicio) {


   router.post('/api/addEntrega', async (req, res) => {

      try {
         const { Informe, UrlPdfEntrega, Id_Tarea } = req.body;

         if (!UrlPdfEntrega) {
            return res.status(400).json({ error: 'No se ha enviado ningún archivo PDF' });
         }
         
         const pdfBase64Content = req.body.UrlPdfEntrega; // Aquí asumo que el contenido base64 se encuentra en req.body.urlPdf

         
         // Decodificar el contenido base64 para obtener los bytes del archivo original
         const pdfBuffer = Buffer.from(pdfBase64Content, 'base64');

         const uniqueFilename = Date.now() + '_' + Math.random().toString(36).substring(7) + '.pdf';
         
      

         // Especificar la ruta donde deseas guardar el archivo
         const filePath = path.join('uploads/pdfEntregas', uniqueFilename); // Cambia esto según la ruta y el nombre de archivo que desees

         console.log(filePath);
         // Escribir los bytes del archivo en el archivo en el sistema de archivos del servidor
         fs.writeFileSync(filePath, pdfBuffer);


         const Entrega = await servicio.addEntrega(Informe, filePath, Id_Tarea);

         res.status(200).json(Entrega);
      } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Error al Cargar la Entrega' });
      }
   });


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
