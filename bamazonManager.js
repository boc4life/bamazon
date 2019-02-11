let inquirer = require("inquirer");
let sql = require("mysql");
let Table = require("cli-table3");

let connection = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
  });
  
connection.connect(function(err) {
    if (err) throw err;
    start()
});

console.log("Welcome to bamazon Manager.")

function start(){
    inquirer.prompt([
    {
        type: "list",
        name: "welcome",
        message: "Please select a menu option",
        choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product"]
    }
]).then(function(response){
    switch (response.welcome) {
        case "View Products For Sale":
        viewProducts();
        break;
        case "View Low Inventory":
        viewLowInventory();
        break;
        case "Add To Inventory":
        addInventory();
        break;
        case "Add New Product":
        addProduct();
        break;
        default:
        console.log("Error");
    }
})
}

function viewProducts() {
    let table = new Table({
        head: ["ID#", "Product Name", "Price", "Quantity In Stock"],
        colWidths: ["10", "100", "50", "50"]
    });
    connection.query("SELECT * FROM products", function(err, data){
        if (err) throw err;
        for (let i = 0; i < data.length; i++){
            table.push([data[i].item_id, data[i].product_name, data[i].price, data[i].stock_quantity]);
        }
        console.log(table.toString());
        connection.end();
    })
}

function viewLowInventory() {
    let table = new Table({
        head: ["ID#", "Product Name", "Price", "Quantity In Stock"],
        colWidths: ["10", "100", "50", "50"]
    });
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, data){
        if (err) throw err;
        for (let i = 0; i < data.length; i++){
            table.push([data[i].item_id, data[i].product_name, data[i].price, data[i].stock_quantity]);
        }
        console.log(table.toString());
        connection.end();
    })
}

function addInventory() {
    let table = new Table({
        head: ["ID#", "Product Name", "Price", "Quantity In Stock"],
        colWidths: ["10", "100", "50", "50"]
    });
    connection.query("SELECT * FROM products", function(err, data){
        if (err) throw err;
        for (let i = 0; i < data.length; i++){
            table.push([data[i].item_id, data[i].product_name, data[i].price, data[i].stock_quantity]);
        }
        console.log(table.toString());
        inquirer.prompt([
            {
                type: "input",
                name: "welcome",
                message: "Which item would you like to add inventory to? (Select by ID#)"    
            },
            {
                type: "input",
                name: "howMany",
                message: "How many units of inventory would you like to add?",
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
            connection.query("SELECT * FROM products WHERE item_id='" + selection + "'", function(err, data){
                if (err) throw err;
                let newQuantity = parseInt(quantity) + parseInt(data[0].stock_quantity);
                connection.query("UPDATE products SET stock_quantity='" + newQuantity + "' WHERE item_id='" + selection + "'", function(err, response){
                    if (err) throw err;
                    console.log("Thank you. There are now " + newQuantity + " of " + data[0].product_name + " in stock.");
                    connection.end()
                })
            })
        })
    });
}

function addProduct() {
    
}