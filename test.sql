INSERT INTO Customer(
    LastName, FirstName, Street, Apt, City, State, Zip, HomePhone, MobilePhone, OtherPhone)
    VALUES ('Pitt', 'Brad', '1 Paris Lane', NULL, 'Hollywood', 'CA', '11111');

-- Drop database
	DROP DATABASE PizzaOrderingDB;

DESCRIBE PizzaOrderingDB;

-- Create table
		CREATE TABLE Pizza (
		PizzaID INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
		PizzaName  VARCHAR(50) NOT NULL,
		PizzaDescription VARCHAR(250)  NOT NULL;
		PizzaSize VARCHAR(10) NOT NULL;
		PizzaPrice DECIMAL(8, 2) NOT NULL;
		PizzaPhotoID VARCHAR(200) NOT NULL;
		);

-- Create view
	CREATE VIEW V_Customer
	as SELECT
	CustomerID,
	CONCAT(FirstName, '', LastName) as CustomerName,
	Street,
	Apt,
	City,
	State,
	FROM Customer; 
