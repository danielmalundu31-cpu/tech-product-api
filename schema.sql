-- Create the products table
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_name TEXT NOT NULL,
  brand TEXT,
  category TEXT,
  price REAL,
  stock_quantity INTEGER,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert 10 sample records
INSERT 0R IGNORE INTO products (product_name, brand, category, price, stock_quantity, description) VALUES
('iPhone 15 Pro', 'Apple', 'Smartphone', 1199.99, 25, 'Titanium design with A17 Pro chip'),
('Galaxy S24 Ultra', 'Samsung', 'Smartphone', 1299.99, 15, 'Flagship with built-in S Pen'),
('MacBook Air M3', 'Apple', 'Laptop', 1099.00, 10, 'Lightweight laptop with M3 chip'),
('Dell XPS 13', 'Dell', 'Laptop', 999.50, 8, 'Compact Windows laptop with InfinityEdge display'),
('iPad Pro 11', 'Apple', 'Tablet', 799.00, 20, 'Powerful tablet for creators'),
('Sony WH-1000XM5', 'Sony', 'Audio', 399.99, 30, 'Industry-leading noise canceling headphones'),
('Logitech MX Master 3S', 'Logitech', 'Accessory', 99.99, 45, 'Advanced wireless ergonomic mouse'),
('Keychron K2 Keyboard', 'Keychron', 'Accessory', 89.00, 12, 'Wireless mechanical keyboard for Mac/Windows'),
('Samsung T7 SSD 1TB', 'Samsung', 'Storage', 119.99, 50, 'Portable external solid state drive'),
('Anker PowerCore 20K', 'Anker', 'Accessory', 49.99, 100, 'High-capacity power bank for devices');