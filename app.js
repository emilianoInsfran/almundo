var express    = require("express");
var bodyParser = require('body-parser');
var mongoose   = require("mongoose");

var app = express();

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


app.set("port",(process.env.PORT || 5600));

app.listen(app.get("port"),()=>{
    console.log("puerto: ",app.get("port"))
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/hoteles', (req,res) =>{
    res.send(200,{hoteles:[]});
})



var Schema = mongoose.Schema;
// var User = require("./user").User;
mongoose.connect("mongodb://emiliano1:emiliano123@ds233551.mlab.com:33551/almundohoteles", (err,resp) => {
    if(err) throw err;
    console.log('Conexión a la bd establecida...')
});

var hotel_schema = new Schema({
    name:String,
    stars:Number,
    price:Number,
    image:String,
    amenities:Array
});

var Hotel = mongoose.model("Hotel",hotel_schema);

app.get("/obtenerHoteles",function(req,res){
    Hotel.find({},function(err,doc){
        if(err)  res.send("No hay resultados");
        res.send(doc);
    });
});

app.post("/buscarHotel",function(req,res){
    Hotel.find({name: req.body.name,stars: req.body.stars},function(err,doc){// este metodo encuentra todos los documentos(objeto) que sea el email y pass que pasaste en array
        if(doc){
            res.send(doc);
        }else{
            res.send("no se encontraron Hoteles");
        }
    });

});

app.post("/altaHotel",function(req,res){
    var hotel = new Hotel ({
        name:req.body.name,
        stars: req.body.stars,
        price: req.body.price,
        image: req.body.image,
        amenities: req.body.amenities
    });
    Hotel.findOne({name:req.body.name},function(err,doc){// este metodo encuentra todos los documentos(objeto) que sea el nombre
        if(doc){
             res.send("Hotel registrado")   
        }else{
            hotel.save().then(function(us){
                
                Hotel.findOne({name:req.body.name},'_id name  stars  price image amenities',function(err,doc){
                    if(doc){
                        res.send(doc)   
                    }else{
                        res.send("No se encontro el Hotel");
                    }
                    if(err){
                        res.send(String(err));
                    }
                })
            },function(err){
                if(err){
                    res.send(String(err));
                }
            })
        }
        if(err){
            res.send(String(err));
        }
    })
})