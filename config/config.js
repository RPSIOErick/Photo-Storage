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

// Config Handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Config Static Files
app.use(express.static(path.join(__dirname, 'public')))

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