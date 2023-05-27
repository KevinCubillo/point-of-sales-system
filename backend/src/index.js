const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require("morgan");
const sequelize = require('./database');
const multer = require('multer');

app.use(express.json());
app.use(cors()); 
app.use('/', require('./routes/routes'));



const path = require('path');

// Configuración del almacenamiento personalizado
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'images'),
  filename: function(req, file, cb) {
    cb(null, file.originalname); // Utiliza el nombre original del archivo
  }
});

const upload = multer({ storage: storage });

// Ruta para guardar la imagen en el backend
app.post('/images', upload.single('file'), (req, res) => {
  // La imagen se guardó correctamente
  res.status(200).json({ message: 'Imagen almacenada correctamente'});
});



sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database & tables created!');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

