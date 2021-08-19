const express = require('express');
const bodyparser = require('body-parser');
const methodoverride = require('method-override');
const { Router } = require('express');
const mongoose = require('mongoose');

const userModel = require('./UserModel');
const taskModel = require('./TaskModel');

const app = express();

const router = express.Router();



app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use(methodoverride());

app.use(express.json( { limit: '50mb' } ));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const uriant = `mongodb+srv://migueleonrojas:Bolivariano.2@cluster0.4ea1g.mongodb.net/test`;

//

mongoose.connect(uriant, {
    useUnifiedTopology: true,
    useNewUrlParser: true
} , (err, res) => {

    //si hay err se sale con una excepcion
    if(err) throw err;

    console.log('Conexion con el servidor de manera exitosa');

});

app.listen(3000, () =>  {

    console.log(`El servidor esta en el puerto 3000`);

});


//creando usuarios
router.post('/addUser', (req, res) =>{

    
    let userCreate = new userModel();

    userCreate.id = req.body.id;
    userCreate.mail = req.body.mail;
    userCreate.password = req.body.password;

    userCreate.save( (err, respuesta) => { 

        if(err){

            res.send(err);

        }

        else{
            res.send(  { mensaje :{ codigo: 1, respuesta: 'Usuario creado con exito' }, usuario: respuesta } )
        }
        
    }); 

});

//consultar usuarios
router.post('/consultUser', (req, res) => {


    let query = { $and: [ { mail: { $eq : req.body.mail} }, { password: { $eq: req.body.password  } } ]  };

    userModel.findOne(query, (err, retorno) =>{

        if(err){
            res.send( { estado :{ codigo: 0, respuesta: err.message } });
        }

        else{

            if(retorno == null){

                res.send(  { estado :{ codigo: 0, respuesta: 'Operacion de consulta por user y mail exitosa esta vacia' }, usuario: retorno } );

            }

            else{
                res.send(  { estado :{ codigo: 1, respuesta: 'Operacion de consulta por user y mail exitosa' }, usuario: retorno } );
            }

        }

    })

});

//consultar usuario por id
router.post('/consultUserForId', (req, res) => {

    let query = { id: req.body.id };

    userModel.findOne(query, (err, retorno) =>{

        if(err){
            res.send( { estado :{ codigo: 0, respuesta: err.message } });
        }

        else{

            if(retorno == null){

                res.send(  { estado :{ codigo: 0, respuesta: 'Operacion de consulta por user y mail exitosa esta vacia' }, usuario: retorno } );

            }

            else{
                res.send(  { estado :{ codigo: 1, respuesta: 'Operacion de consulta por user y mail exitosa' }, usuario: retorno } );
            }

        }

    })

});


//creando tareas
router.post('/addTask', (req, res) =>{

    
    let taskCreate = new taskModel();

    taskCreate.Name = req.body.Name;
    taskCreate.Description = req.body.Description;
    taskCreate.Estatus = req.body.Estatus;
    taskCreate.Id = req.body.Id;

    
    taskCreate.save( (err, respuesta) => { 

        if(err){

            res.send(err);

        }

        else{
            res.send(  { mensaje :{ codigo: 1, respuesta: 'Tarea creado con exito' }, usuario: respuesta } )
        }
        
    }); 

});


//mostrar tareas
router.post('/showTask',(req, res) => {

    let query = { Id: req.body.id };

    taskModel.find(query,(err, retorno) =>{

        if(retorno == null){

            res.send("Id de usuario no registrado");
        }

        else{

            res.send(retorno);

        }
        

    });

});

//actualizar tarea
router.put('/upDateTask', (req, res) => {

    let query = { _id: req.body._id };

    taskModel.findOne(query, (err, retorno) => {

        if(retorno == null){

            res.send({estado:{codigo:0, respuesta:"El elemento que desea actualizar no existe"}})
        }

        else{

            retorno.Name = req.body.Name;
            retorno.Description = req.body.Description;
            retorno.Estatus = req.body.Estatus;

            retorno.save( (err, respuesta) => { 
            if(err){

                res.send( { estado :{ codigo: -1, respuesta: err.message } });

            }

            else{

                res.send(  { estado :{ codigo: 1, respuesta: 'Operacion de actualizacion es exitosa' }, persona: respuesta } );

            }

            
        });
        }

        
        
    })

});


//eliminar tarea
router.delete('/deleteTask', (req, res) => {  

    let query = { _id: req.body._id };

    taskModel.findOne(query, (err, retorno) => {

        
        if(retorno == null){
            res.send({estado:{codigo:0, respuesta:"El elemento que desea eliminar no existe"}})
        }
        else{
            retorno.remove( (err, respuesta) => { 
                if(err) {
                    res.send( { estado :{ codigo: -1, respuesta: err.message } });
                }
                else{
                    res.send(  { estado :{ codigo: 1, respuesta: 'Operacion eliminar es exitosa' }, persona: respuesta } );
                }
                
            });
        }


    });



});



app.use(router);