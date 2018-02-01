var mysql = require('mysql');
var prompt = require('prompt');

//code to connect to MySQL DB
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'kamazon'
});

function showOptions() {
	var menuOptions = ['1. View Products for Sale', '2. View Low Inventory', '3. Add to Inventory', '4. Add New Product'];
	console.log('=============================================================');
	console.log('Menu Options:');
	console.log('=============================================================');
	for(var i = 0; i < menuOptions.length; i++) {
		console.log(menuOptions[i]);
	}
	menuPrompt();
};

function menuPrompt() {

	// settings for prompt
	var schema = {
	  properties: {
	    number: {
	      message: 'Please select a menu option by number',
	      required: true
	    }
	  }
	};

	prompt.start();
	prompt.get(schema, function (err, result) {
		var num = result.number;
		checkSelected(num);
	});
};

function checkSelected(option) {
	switch(option) {
		case '1':
			console.log(1);
			listProducts();
			break;
		case '2':
			console.log(2);
			showLowInventory();
			break;
		case '3':
			console.log(3);
			addStock();
			break;
		case '4':
			console.log(4);
			addProduct();
			break;
		default:
			console.log('=============================================================');
			console.log('You did not enter a number for a menu option, please try again');
			console.log('=============================================================');
	};
};

// displays available products with their stats, runs if option 1 is selected
function listProducts() {
	connection.query('SELECT item_id, product_name, price, stock_quantity FROM products', function(err, rows, fields) {
		if(err) throw err;
		console.log('=============================================================');
		console.log('Available products for sale:');
		console.log('=============================================================');
		showSelectedProducts(rows);
	});
	connection.end();
};

function showLowInventory() {
	connection.query('SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5', function(err, rows, fields) {
		if(err) throw err;
		console.log('=============================================================');
		console.log('Items with low inventory:');
		console.log('=============================================================');
		showSelectedProducts(rows);
	});
	connection.end();
};

function showSelectedProducts(rows) {
	for(var i = 0; i < rows.length; i++) {
	  console.log('Item ID: ' + rows[i].item_id + '   Product Name: ' + rows[i].product_name + '   Price: $' + rows[i].price + '   Stock: ' + rows[i].stock_quantity);
	}
};

function addStock() {
	var schema = {
	  properties: {
	    ItemID: {
	      message: 'Enter the Item ID of the product to add stock to',
	      required: true
	    },
	    quantity: {
	      message: 'Enter the quantity of stock you wish to add',
	      required: true
	    }
	  }
	};

	prompt.start()
	prompt.get(schema, function(err, result) {
		var id = result.ItemID;
		var qty = result.quantity;
		connection.query('UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?', [qty, id], function(err, rows, fields){
			if(err) throw err;
			console.log('=============================================================');
			console.log('The stock has been updated');
			console.log('=============================================================');
		});
		connection.end();
	});
};

function addProduct() {
	var schema = {
	  properties: {
	    product_name: {
	      message: 'Enter the name of the new product',
	      required: true
	    },
	    department_name: {
	      message: 'Enter the department name for the product',
	      required: true
	    },
	    price: {
	      message: 'Enter the price of the product',
	      required: true
	    },
	    stock_quantity: {
	      message: 'Enter the quantity of stock to add',
	      required: true
	    }
	  }
	};

	prompt.start()
	prompt.get(schema, function(err, result) {
		var product = result.product_name;
		var department = result.department_name;
		var price = result.price;
		var quantity = result.stock_quantity;
		connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)', [product, department, price, quantity], function(err, rows, fields) {
			if(err) throw err;
			console.log('=============================================================');
			console.log('Product added successfully');
			console.log('=============================================================');
		});
		connection.end();
	});
};

showOptions();
