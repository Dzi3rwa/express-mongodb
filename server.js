var express = require("express")
var app = express()
const PORT = 3000;
const mongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
let _db;
let ip
const opers = require("./modules/Operations.js")

app.use(express.json())
app.use(express.static('static'))

app.post("/", function (req, res) {
    ip = req.body.ip
    mongoClient.connect(`mongodb://grupa2:NS6M63mGpdfr45tg@SG-klasa3p-48609.servers.mongodirector.com:27017/grupa2`, function (err, db) {
        if (err) {
            mongoClient.connect(`mongodb://localhost/DzierwaMaciej`, function (err, db) {
                _db = db;
                ip = "localhost"
                db.createCollection("MaciejDzierwa", function (err, coll) { })
                db.admin().listDatabases(function (err, dbs) {
                    if (err) console.log(err)
                    else {
                        let obj = { bazy: dbs.databases, ip: "localhost", alert: true }
                        res.setHeader('content-type', 'application/json');
                        res.end(JSON.stringify(obj))
                    }
                })
            })
        } else {
            _db = db;
            db.createCollection("MaciejDzierwa", function (err, coll) { })
            db.admin().listDatabases(function (err, dbs) {
                if (err) console.log(err)
                else {
                    let obj = { bazy: dbs.databases, ip: ip }
                    res.setHeader('content-type', 'application/json');
                    res.end(JSON.stringify(obj))
                }
            })
        }
    })
})
app.post("/add", function (req, res) {
    mongoClient.connect(`mongodb://grupa2:NS6M63mGpdfr45tg@SG-klasa3p-48609.servers.mongodirector.com:27017/grupa2}`, function (err, db) {
        if (err) {
            res.end("Brak połączenia")
        } else {
            _db = db;
            db.createCollection("Kolekcja1", function (err, coll) { })
            db.admin().listDatabases(function (err, dbs) {
                if (err) console.log(err)
                else {
                    res.setHeader('content-type', 'application/json');
                    res.end(JSON.stringify(dbs.databases))
                }
            })
        }
    })
})
app.post("/collections", function (req, res) {
    mongoClient.connect(`mongodb://grupa2:NS6M63mGpdfr45tg@SG-klasa3p-48609.servers.mongodirector.com:27017/grupa2`, function (err, db) {
        if (err) {
            res.end("Brak połączenia")
        } else {
            _db = db;
            db.listCollections().toArray(function (err, colls) {
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify(colls))
            });
        }
    })
})
app.post("/delete", function (req, res) {
    mongoClient.connect(`mongodb://grupa2:NS6M63mGpdfr45tg@SG-klasa3p-48609.servers.mongodirector.com:27017/grupa2`, function (err, db) {
        if (err) {
            res.end("Brak połączenia")
        } else {
            _db = db;
            db.dropDatabase()
            db.admin().listDatabases(function (err, dbs) {
                if (err) console.log(err)
                else {
                    res.setHeader('content-type', 'application/json');
                    res.end(JSON.stringify(dbs.databases))
                }
            })
        }
    })
})
app.post("/addColl", function (req, res) {
    let nowaKolekcja = req.body.nowaKolekcja
    mongoClient.connect(`mongodb://grupa2:NS6M63mGpdfr45tg@SG-klasa3p-48609.servers.mongodirector.com:27017/grupa2`, function (err, db) {
        if (err) {
            res.end("Brak połączenia")
        } else {
            _db = db;
            db.createCollection(nowaKolekcja, function (err, coll) { })
            db.listCollections().toArray(function (err, colls) {
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify(colls))
            });
        }
    })
})
app.post("/deleteColl", function (req, res) {
    let nazwaKolekcji = req.body.nazwaKolekcji
    mongoClient.connect(`mongodb://grupa2:NS6M63mGpdfr45tg@SG-klasa3p-48609.servers.mongodirector.com:27017/grupa2`, function (err, db) {
        if (err) {
            res.end("Brak połączenia")
        } else {
            _db = db;
            db.collection(nazwaKolekcji).drop()
            db.listCollections().toArray(function (err, colls) {
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify(colls))
            });
        }
    })
})
app.post("/dokumenty", function (req, res) {
    let nazwaKolekcji = req.body.nazwaKolekcji
    mongoClient.connect(`mongodb://grupa2:NS6M63mGpdfr45tg@SG-klasa3p-48609.servers.mongodirector.com:27017/grupa2`, function (err, db) {
        if (err) {
            res.end("Brak połączenia")
        } else {
            _db = db;
            let coll = _db.collection(nazwaKolekcji)
            opers.SelectAllFromDatabase(coll, function (data) {
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify(data));
            })
        }
    })
})
app.post("/dodajDokument", function (req, res) {
    let nazwaKolekcji = req.body.nazwaKolekcji
    let tekstDokumentu = req.body.tekstDokumentu
    mongoClient.connect(`mongodb://grupa2:NS6M63mGpdfr45tg@SG-klasa3p-48609.servers.mongodirector.com:27017/grupa2`, function (err, db) {
        if (err) {
            res.end("Brak połączenia")
        } else {
            let coll = _db.collection(nazwaKolekcji)
            opers.InsertToDatabase(coll, JSON.parse(tekstDokumentu))
            opers.SelectAllFromDatabase(coll, function (data) {
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify(data));
            })
        }
    })
})
app.post("/deleteDokument", function (req, res) {
    let nazwaKolekcji = req.body.nazwaKolekcji
    let id = req.body.id
    mongoClient.connect(`mongodb://grupa2:NS6M63mGpdfr45tg@SG-klasa3p-48609.servers.mongodirector.com:27017/grupa2`, function (err, db) {
        if (err) {
            res.end("Brak połączenia")
        } else {
            let coll = _db.collection(nazwaKolekcji)
            opers.DeleteById(ObjectID, coll, id)
            opers.SelectAllFromDatabase(coll, function (data) {
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify(data));
            })
        }
    })
})
app.post("/updateDokument", function (req, res) {
    let nazwaKolekcji = req.body.nazwaKolekcji
    let nowyTekst = req.body.nowyTekst
    let id = req.body.id
    mongoClient.connect(`mongodb://grupa2:NS6M63mGpdfr45tg@SG-klasa3p-48609.servers.mongodirector.com:27017/grupa2`, function (err, db) {
        if (err) {
            res.end("Brak połączenia")
        } else {
            let coll = _db.collection(nazwaKolekcji)
            let en = Object.entries(nowyTekst)
            en2 = Object.fromEntries(en)
            let data = { id: id, en: en2 }
            opers.UpdateById(ObjectID, coll, data)
            opers.SelectAllFromDatabase(coll, function (data) {
                res.setHeader('content-type', 'application/json');
                res.end(JSON.stringify(data));
            })
        }
    })
})
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
