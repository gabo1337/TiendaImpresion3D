const express = require('express');
const router = express.Router();

const Login = require('../models/login');


const jwt = require('jsonwebtoken');

const JWT_SECRET = "asdbjkwnvfecfgeybwet7463458b9376dfjbgdslkjfbbdbfbvfdgjfhdglfdg25312";


router.get('/', async (req,res) =>{
   const login = await Login.find();
   res.json(login);
});


router.get('/:id', async(req, res)=>{
    const log = await Login.findById(req.params.id);
    res.json(log);
});

//guardar usuario
router.post('/', async(req,res)=>{
    const {usuario,Contraseña,Gmail,rol} = req.body;
    const login = new Login({
        usuario,
        Gmail,
        Contraseña,
        rol
    });

    login.Contraseña = await login.encryptPassword(Contraseña);
    login.save()
    res.json({status: 'usuario encriptado  registrado'});
    
});


//login 
router.post('/login', async(req,res)=>{

    

    const {usuario,Contraseña} = req.body;
    console.log(usuario);
    console.log(Contraseña)
    const user = await Login.findOne({usuario: usuario});
    if(!user) {
        return res.json({
            auth: false,
            message: 'Username or password incorrect'
        })
    }

    const autenticate = await user.confirmPassword(Contraseña);
    
    if(autenticate) {

        const token = jwt.sign({},JWT_SECRET);

        if(res.status(201)){
            return res.json({
                auth: false,
                message: 'correcto'
            })
        }
    }

    return res.json({
        status:"error", error:"invalid password"
    });


    

});


router.post("/login-sesion",async(req,res)=>{
    const {token} = req.body;
    try {
        const user = jwt.verify(token,JWT_SECRET);
        const usuario = user.usuario;
        user.findOne({usuario:usuario})
        .then((data)=> {
            res.send({status:"error",data: error})
        })
        .catch((error)=>{
            res.send({status:"error",data:error});
        })
        
    } catch (error) {
        
    }
})







router.put('/:id', async(req,res) =>{
    const {usuario,Contraseña,Gmail,rol} = req.body;
    const newLogin = {usuario,Contraseña,Gmail,rol};
    await Login.findByIdAndUpdate(req.params.id, newLogin);
    res.json('recibido');
});

router.delete('/:id', async (req,res) => {
    await Login.findByIdAndRemove(req.params.id);
    res.json({status: 'tarea eliminada'})
});








module.exports = router; 