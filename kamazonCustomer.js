var mysql = require('mysql');
var prompt = require('prompt');

//code to connect to MySQL DB
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'kamazon'
});

// prompt setup
var schema = {
  properties: {
    item_id: {
      message: 'Enter the Item ID of the product you would like to purchase',
      required: true
    },
    quantity: {
      message: 'Enter the quantity would like to purchase',
      required: true
    }
  }
};

// shows inventory from DB then runs the prompt function which starts a cascade of nested function calls
function showInventory() {
  connection.query('SELECT item_id, product_name, price FROM products', function(err, rows, fields) {
    if (err) throw err;
    console.log('=============================================================');
    console.log('AVAILABLE PRODUCTS:');
    console.log('=============================================================');
    for(var i = 0; i < rows.length; i++) {
      console.log('Item ID: ' + rows[i].item_id + '   Product Name: ' + rows[i].product_name + '   Price: $' + rows[i].price);
    }
    console.log('=============================================================');
    runPrompt();
  });
};

function runPrompt() {
  prompt.start();
  prompt.get(schema, function(err, result) {
    var orderedProductID = result.item_id;
    var orderQuantity = result.quantity;
    processOrder(orderedProductID, orderQuantity);
  });
}

function processOrder(id, quantity) {
  connection.query('SELECT stock_quantity FROM products WHERE item_id = ?', [id], function(err, rows, fields) {
    if(err) throw err;

    if(JSON.parse(rows[0].stock_quantity) >= quantity) {
      var adjQuantity = rows[0].stock_quantity - quantity;
      getPrice(id, quantity);
      updateStock(adjQuantity, id);
    } else {
      console.log('Insufficient quantity! There is not enough stock to fulfill your request, please try again');
      console.log('==========================================================================================');
      connection.end();
    }
  });
}

function getPrice(id, quantity) {
  connection.query('SELECT price FROM products WHERE item_id = ?', [id], function(err, rows, fields) {
    if(err) throw err;
    var orderPrice = JSON.parse(rows[0].price) * quantity;
    console.log('Your total order cost is: $' + orderPrice);
    console.log('=============================================================');
  });
}

function updateStock(adjQuantity, id) {
  connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [adjQuantity, id], function(err, rows, fields) {
    if(err) throw err;
    console.log('Inventory has been updated');
    console.log('=============================================================');
    connection.end();
  });
}

showInventory();
