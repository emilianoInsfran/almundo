var express    = require("express");
var bodyParser = require('body-parser');
var mongoose   = require("mongoose");

var app = express();

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.set("port",(process.env.PORT || 5600));


/**
 * ApiRest almundo 
 */

let Schema = mongoose.Schema;

mongoose.connect("mongodb://emiliano1:emiliano123@ds233551.mlab.com:33551/almundohoteles", (err,resp) => {
    if(err) throw err;

    console.log('Conexión a la bd establecida...')
});

let hotel_schema = new Schema({ //arma estrutura del schema
    name:String,
    stars:Number,
    price:Number,
    image:String,
    amenities:Array
});

let Hotel = mongoose.model("Hotel",hotel_schema);
//trae todo el array de hoteles
app.get("/obtenerHoteles",function(req,res){
    Hotel.find({},function(err,doc){ //query
        if(err)  res.send("No hay resultados");

        res.send(doc);
    });
});

//busca un hotel espesifico
app.post("/buscarHotel",function(req,res){
    Hotel.find({name: req.body.name},'name stars price image amenities',function(err,doc){
        if(doc){
            res.send(doc);
        }else{
            res.send("No se encontraron Hoteles");
        }
    });
});


//dar de alta un nuevo hotel
app.post("/altaHotel",function(req,res){
    let hotel = new Hotel ({
        name:req.body.name,
        stars: req.body.stars,
        price: req.body.price,
        image: req.body.image,
        amenities: req.body.amenities
    });
    Hotel.findOne({name:req.body.name},function(err,doc){// este metodo encuentra todos los documentos(objeto) que sea el nombre
        if(doc){
             res.send("Hotel registrado")   ;
        }else{
            hotel.save().then(function(us){},function(err){
                if(err){
                    res.send(String(err));
                }
            })
        }
        if(err){
            res.send(String(err));
        }
    })
});

//actualizae datos hotel
app.post("/actualizarDatosHotel",function(req,res){
    var hotel = {
        stars: req.body.stars,
        price: req.body.price,
        image: req.body.image,
        amenities: req.body.amenities
    };
    Hotel.update({name:req.body.name},hotel,function(err,doc){
        if(doc){
            res.send(doc);
        }else{
            res.send("Hotel no encontrado");
        }
    })
});



app.listen(app.get("port"),() => {
    console.log("puerto: ",app.get("port"));
});