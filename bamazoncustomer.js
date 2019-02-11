let inquirer = require("inquirer");
let sql = require("mysql");
let Table = require("cli-table3");

var connection = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
  });
  
connection.connect(function(err) {
    if (err) throw err;
});

let table = new Table({
    head: ["ID#", "Product Name", "Price"],
    colWidths: ["10", "100", "50"]
})

let names = []

connection.query("SELECT * FROM products", function(err, data){
    if (err) throw err;
    for (let i = 0; i < data.length; i++){
        table.push([data[i].item_id, data[i].product_name, data[i].price]);
        names.push(data[i].product_name)
    }
    start();    
})

function start() {
    console.log(table.toString())
    inquirer.prompt([
        {
            type: "input",
            name: "welcome",
            message: "Which item would you like to purchase? (Select by ID#)"
        },
        {
            type: "input",
            name: "howMany",
            message: "How many units would you like to purchase?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        }
    ]).then(function(response){
        let selection = response.welcome;
        let quantity = response.howMany;
        connection.query("SELECT * FROM products WHERE item_id='" + selection + "'", function (err, data){
            if (err) throw err;
            if (quantity > data[0].stock_quantity){
                console.log("Sorry, we only have " + data[0].stock_quantity + " units of " + data[0].product_name + " in stock. Please select a smaller quantity.");
                connection.end()
            }
            else {
                let newQuantity = data[0].stock_quantity - quantity;
                let total = parseFloat(data[0].price) * quantity;
                console.log("Thank you for your purchase. Your total is $" + total)
                connection.query("UPDATE products SET stock_quantity='" + newQuantity + "' WHERE item_id='" + selection + "'", function (err, data1){
                    if (err) throw err;
                    connection.end()
                })
            }
        })
    })
}

