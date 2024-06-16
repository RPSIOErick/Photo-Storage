// Imports
const { 
    express, 
    handlebars, 
    bodyParser, 
    initializeApp, 
    getFirestore,
    multer,
    path,
    admin,
    serviceAccount
} = require('./imports')

// Config Express
const app = express()
const port = 8081


// Configuração da View Engine
app.use(express.static('public'));
    
app.engine('handlebars', handlebars({
    defaultLayout: 'main',

}))

// Utilização da View Engine
    app.set("view engine", "handlebars")

// Pasta padrao de views
    app.set('views', path.join(__dirname, '../views'));

// Pasta padrao de css
    app.use(express.static(path.join(__dirname, '../public')));


// Config Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Config Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://photo-nodejs-a62c4.appspot.com'
})

// Config Bucket
const bucket = admin.storage().bucket()

// Firestore Instance
const db = getFirestore()

// Config Multer
const upload = multer({
    storage: multer.memoryStorage()
});

module.exports = {
    app,
    port,
    db,
    upload,
    bucket
}