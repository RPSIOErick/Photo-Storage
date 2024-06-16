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
            
            // Mapeia os arquivos para URLs das imagens e nomes dos arquivos
            const images = files.map(file => {
                return {
                    url: `https://storage.googleapis.com/${bucket.name}/${file.name}`,
                    name: file.name
                };
            });
    
            console.log(images); // Verifique as URLs e nomes das imagens no console
    
            res.render('gallery', { images });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao obter as imagens.');
        }
    });
    