var express = require("express"),
    db = require("../config/database"),
    lib = require("../lib");

var router = express.Router();




router.get('/', function (req, res, next) {
  var table = "brands";
  var get = db.table(table);
  get.where('id_brands', 1).then(function(rows){
    return rows;
  }).then(function(rows){
    res.status(200).json({ message: "Connect", data:rows});
  });
});

router.post("/", function(req, res){
  var params = req.body;
  var table = "product";
  if(lib.is_defined(params.type)){
    var type = params.type;
    delete params.type;
    switch(type){
      case "datatable":

        break;
      case "get":
        var get = db.table(table);
        lib.check_params(get, params).then(function(rows){
          res.status(200).json({ status: true, data:rows});
        });
        break;
      case "saving":
        
        break;
      case "updating":
        break;

      case "deleting":
        break;

      default:
        res.status(200).json({status:false,message: "NO METOHD"});
        break;
    }
  }else{
    res.status(200).json({status:false,message: "NO METOHD"});
  }
})

module.exports = router;