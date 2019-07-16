// Initializing connection to MYSQL DBMS, including username and password as part of boilerplate

var mysql = require("mysql");
var inquirer = require("inquirer");
var console_table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "Batman123",
    database: "bamazon"
});

connection.connect(function(err){
    if (err) throw err;
});

// Setting up a display function to show the initial inventory to the customer, this function runs the select * from query
//and prints out inventory to screen

var display = function() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.table(results);
    })
};

// Setting up  a run function to query the mysql database again, this is the main function, it invokes the inquirer prompt
//prompts the user with the 2 main questions, what product? and how many?

var run = function() {

// queries the database for all products available for purchase
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

//initialize inquirer
        inquirer.prompt([
            {
                name: "product",
                type: "list",
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name);
                    }
                    return choiceArray;
                },
                message: "What product would you like to purchase?"
            },
            {
                name: "amount",
                type: "input",
                message: "How many would you like to purchase?"
            }
        ]).then(function(answer) {
            var chosenProduct;
            for (var i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.product) {
                    chosenProduct = results[i];
                }
            }

            if (chosenProduct.stock_quantity > parseInt(answer.amount)) {
                connection.query("UPDATE products SET ? WHERE ?", [
                {
                    stock_quantity: chosenProduct.stock_quantity - parseInt(answer.amount)
                },
                {
                    item_id: chosenProduct.item_id
    
//printing out the final summary, which is the total for the item selected or an "insufficient stock" if stock is less than ordered by customer.

                }], function(error) {
                    if (error) throw err;
                    console.log("\n\n");
                    console.log("==============================================");
                    console.log("Product purchased successfully!");
                    console.log("==============================================");
                    console.log("Purchase Summary");
                    console.log("-----------------------------");
                    console.log("Item Name: " +  chosenProduct.product_name);
                    console.log("Item Count: " + parseInt(answer.amount));
                    console.log("-----------------------------");
                    console.log("Total: " + "$" + (chosenProduct.price * parseInt(answer.amount)));
                    console.log("==============================================");
                    console.log("\n\n");
                    display();
                    run();
                })
            } else {
                console.log("==============================================");
                console.log("Insufficient stock.");
                console.log("==============================================");
                display();
                run();
            }
        });
    });
};

//Invoking the display and run function to re-start the program for the customer to continue buying :)

display();
run();
