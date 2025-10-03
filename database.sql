CREATE TABLE Products (
  Id INT PRIMARY KEY IDENTITY(1,1),
  Name NVARCHAR(100) NOT NULL,
  Price DECIMAL(10,2) NOT NULL
);

INSERT INTO Products (Name, Price) VALUES
('Laptop', 80000),
('Smartphone', 45000),
('Headphones', 3000),
('Keyboard', 1500);
