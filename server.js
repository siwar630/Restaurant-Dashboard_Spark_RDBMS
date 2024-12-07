const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

// Configurer CORS
app.use(cors());
app.use(express.json());

// Configurer le moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Dossier pour les vues

// Configurer la connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost', // ou '127.0.0.1'
    user: 'root', // Remplacez par votre utilisateur MySQL
    password: 'siwar', // Remplacez par votre mot de passe MySQL
    database: 'restaurant_db', // Remplacez par le nom de votre base de données
    port: 3307 // Ajoutez cette ligne pour spécifier le port
});
// Route pour afficher les données
app.get('/', (req, res) => {
    db.query('SELECT * FROM top_3_restaurants', (err, restaurantResults) => {
        if (err) return res.status(500).json({ error: err.message });

        db.query('SELECT * FROM avg_processing_time_per_category', (err, categoryResults) => {
            if (err) return res.status(500).json({ error: err.message });

            res.render('index', {
                restaurants: restaurantResults,
                categories: categoryResults
            });
        });
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution à http://localhost:${port}`);
});