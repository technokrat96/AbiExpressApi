var fs = require('fs'),
    path = require('path');

module.exports = function (app){
    var base_route = require("../routes");
    app.use("/", base_route);
    var apiUrl = [
        "Brands", "Category", "CategoryDesc", "CategorySpec", "City", 
        "Description", "Members", "Officer", "OptPayment", "OtherPage", "Product", 
        "ProductCity", "ProductDescription", "ProductDetail", "Provinces", 
        "RecordUserViewProduct", "Settings", "Slider", "Spesification", "SpesificationValue", 
        "Transaction", "TransactionDetail", "Users"
    ];
    var default_text = fs.readFileSync("./routes/index.js");
    for(var i = 0; i<apiUrl.length; i++){
        var file_name = apiUrl[i].toLowerCase()+".js";
        var dirfile = './routes/'+file_name;
        fs.existsSync(dirfile) || fs.writeFileSync(dirfile, default_text);
        var r = require("../routes/"+file_name);
        app.use("/"+apiUrl[i], r);
    }
}