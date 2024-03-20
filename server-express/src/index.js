import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

//Crear constante routes note

import noteRoutes from './routes/note'

//Crear constante que ejecuta express
const app = express()
// Configura CORS para permitir peticiones desde http://localhost:3001
const corsOptions = {
    origin: 'http://localhost:5173',
};

app.use(cors(corsOptions)); // Aplica la configuración de CORS

//Costante  que especifica el puerto
const port = process.env.PORT || 3000

//middleware
app.use(express.json())
app.use('/api', noteRoutes)

//Ruta de home con la respuesta
app.get('/', (req, res) => {
    res.send('Hola mundo')
})
//Conección con mongoose
mongoose.connect(process.env.MONGODB_URI
).then(() => console.log('Conectado a la base de datos Atlas'))
    .catch((error) => console.error(error))
//Inicializar el servidor
app.listen(port, () => {
    console.log(` Servidor escuchando en el puerto ${port}`)
})