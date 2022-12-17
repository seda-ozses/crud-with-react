const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// --------------------
// CONNECT
// --------------------
const db = mysql.createPool({host: 'localhost', user: 'root', password: 'password', database: 'crudDB'})

// --------------------
// CREATE - POST
// --------------------
app.post('/api/insert', (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const sqlInsert = "INSERT INTO users (firstName, lastName) VALUES (?, ?)"
    db.query(sqlInsert, [
        firstName, lastName
    ], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("[CREATE] firstName: " + firstName + ", lastName: " + lastName);
        }
    })
})

// --------------------
// READ - GET
// --------------------
app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM users"
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

// --------------------
// UPDATE - PUT
// --------------------
app.put("/api/update", (req, res) => {
    const id = req.body.id;
    const newFirstName = req.body.newFirstName;
    const newLastName = req.body.newLastName;
    const sqlUpdate = "UPDATE users SET firstName = ?, lastName = ? WHERE id = ?";
    db.query(sqlUpdate, [
        newFirstName, newLastName, id
    ], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("[UPDATE] id: " + id + ", firstName: " + newFirstName + ", lastName: " + newLastName);
        }
    });

});

// --------------------
// DELETE
// --------------------
app.delete("/api/delete", (req, res) => {
    const id = req.body.id;
    const sqlDelete = "DELETE FROM users WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            console.log(err + "ID = " + id);
        } else {
            console.log("[DELETE] id: " + id);
        }
    });

});

// --------------------
// LISTEN
// --------------------
app.listen(3001, () => {
    console.log('running on port 3001')
})
