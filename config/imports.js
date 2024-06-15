// Import Express
const express = require('express')

// Import Handlebars
const handlebars = require('express-handlebars').engine

// Import Body Parser
const bodyParser = require('body-parser')

// Import Firebase
const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const admin = require('firebase-admin')

// Import Multer
const multer = require('multer')

// Import Path
const path = require('path')

// Import Bucket
const serviceAccount = require('./serviceAccountKey.json')

// Export Modules
module.exports = {
    express,
    handlebars,
    bodyParser,
    initializeApp,
    getFirestore,
    admin,
    multer,
    path,
    serviceAccount
}