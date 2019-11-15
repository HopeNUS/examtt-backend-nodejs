const express = require('express')
const app = express()
const port = process.env.PORT
const commons = require('./commons')
const schemas = require('./schemas')
const views = require('./views')

app.use(express.json());       // to support JSON-encoded bodies

app.get('/', (req, res) => res.send('Hello World!'))
app.post(
    '/batch_insert_exams', 
    commons.validate_json_schema(
        schemas.BatchInsertExamsSchema, 
        views.batch_insert_exams
    )
)
app.post(
    '/batch_insert_prayer_warriors', 
    commons.validate_json_schema(
        schemas.BatchInsertPrayerWarriorsSchema, 
        views.batch_insert_prayer_warriors
    )
)
app.get('/get_exams', views.get_exams)
app.post(
    '/batch_delete_exams', 
    commons.validate_json_schema(
        schemas.BatchDeleteExamsSchema, 
        views.batch_delete_exams
    )
)
app.post(
    '/batch_delete_prayer_warriors', 
    commons.validate_json_schema(
        schemas.BatchDeletePrayerWarriorsSchema, 
        views.batch_delete_prayer_warriors
    )
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))