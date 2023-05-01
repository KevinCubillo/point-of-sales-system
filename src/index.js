//Imports
const app = require("./inventory");
//------------------------------------------------

//Inicio de servidor
app.listen(app.get("port"), ()=>{
    console.log("Running on port",app.get("port"));
});

