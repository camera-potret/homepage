const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Path ke file data
const dataDir = path.join(__dirname, '../data');
const viewsFile = path.join(dataDir, 'views.json');

// Pastikan direktori data ada
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Inisialisasi file views.json jika belum ada
if (!fs.existsSync(viewsFile)) {
    const initialData = {
        'post-1': 0,
        'post-2': 0,
        'post-3': 0,
        'post-4': 0,
        'post-5': 0,
        'post-6': 0,
        'featured': 0
    };
    fs.writeFileSync(viewsFile, JSON.stringify(initialData, null, 2));
}

// Helper function untuk membaca views
function readViews() {
    try {
        const data = fs.readFileSync(viewsFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading views:', error);
        return {};
    }
}

// Helper function untuk menulis views
function writeViews(data) {
    try {
        fs.writeFileSync(viewsFile, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing views:', error);
        return false;
    }
}

// Route: GET - Ambil semua views atau views untuk post tertentu
app.get('/api/views', (req, res) => {
    const { post_id } = req.query;
    const views = readViews();

    if (post_id) {
        res.json({
            post_id,
            views: views[post_id] || 0
        });
    } else {
        res.json(views);
    }
});

// Route: POST - Increment views
app.post('/api/views/increment', (req, res) => {
    const { post_id } = req.body;

    if (!post_id) {
        return res.status(400).json({ error: 'post_id is required' });
    }

    const views = readViews();
    
    if (!views.hasOwnProperty(post_id)) {
        views[post_id] = 0;
    }
    
    views[post_id]++;
    
    if (writeViews(views)) {
        res.json({
            success: true,
            post_id,
            views: views[post_id]
        });
    } else {
        res.status(500).json({ error: 'Failed to update views' });
    }
});

// Route: GET root - Info server
app.get('/', (req, res) => {
    res.json({
        message: 'Media Pojok Nduljati Views Tracking API',
        endpoints: {
            'GET /api/views': 'Get all views or specific post views (add ?post_id=post-1)',
            'POST /api/views/increment': 'Increment view count (send JSON: {post_id: "post-1"})'
        }
    });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Views tracking server running on http://localhost:${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api/views`);
});
