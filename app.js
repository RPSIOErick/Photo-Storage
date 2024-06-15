// Imports
const { 
    app,
    port,
    db,
    upload,
    bucket 
} = require('./config/config.js')

// Initialize Server
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})

// Main Route
app.get('/', (req, res) => {
    res.render('uploadForm')
})

    // Post Route
    app.post('/upload', upload.single('file'), async (req, res) => {
        try {
            console.log('Arquivo recebido:', req.file); // Adicione este log
        
            if (!req.file) {
            res.status(400).send('Nenhum arquivo foi enviado.');
            return;
            }
        
            const blob = bucket.file(req.file.originalname);
            const blobStream = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
            });
        
            blobStream.on('error', (err) => {
            console.error(err);
            res.status(500).send('Erro ao fazer upload do arquivo.');
            });
        
            blobStream.on('finish', () => {
            res.redirect('/galeria');
            });
        
            blobStream.end(req.file.buffer);
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao fazer upload do arquivo.');
        }
    });
      
    // Gallery Route
    app.get('/galeria', async (req, res) => {
        try {
            const [files] = await bucket.getFiles();
            const images = files.map(file => {
                return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
            });
    
            console.log(images); // Adicione este log para verificar as URLs das imagens
    
            res.render('gallery', { images });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao obter as imagens.');
        }
    });