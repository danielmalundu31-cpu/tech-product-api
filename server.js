require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for the frontend
app.use(express.json()); // Parse JSON request bodies

const PORT = process.env.PORT || 3000;

// 1. GET all products
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// 2. GET a single product by ID
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(row);
    });
});

// 3. POST create a new product
app.post('/api/products', (req, res) => {
    const { product_name, brand, category, price, stock_quantity, description } = req.body;

    if (!product_name) {
        return res.status(400).json({ error: 'Product name is required' });
    }

    const sql = `INSERT INTO products (product_name, brand, category, price, stock_quantity, description) 
               VALUES (?, ?, ?, ?, ?, ?)`;

    const params = [product_name, brand, category, price, stock_quantity, description];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Return the newly created product with its new ID
        db.get('SELECT * FROM products WHERE id = ?', [this.lastID], (err, row) => {
            res.status(201).json(row);
        });
    });
});

// 4. PUT update an existing product
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { product_name, brand, category, price, stock_quantity, description } = req.body;

    const sql = `UPDATE products 
               SET product_name = ?, brand = ?, category = ?, price = ?, stock_quantity = ?, description = ?, updated_at = CURRENT_TIMESTAMP
               WHERE id = ?`;

    const params = [product_name, brand, category, price, stock_quantity, description, id];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        // Return the updated product
        db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
            res.json(row);
        });
    });
});

// 5. DELETE a product
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});