const fs = require('fs')
const xmlData = require('../data/xmlData.js')

const xml = `
<?xml version="1.0" encoding="utf-8" ?>
<tincan xmlns="http://projecttincan.com/tincan.xsd">
    <activities>
        <activity id="http://id.site.com/activity/${xmlData.id + '_' + new Date().getTime()}" type="http://adlnet.gov/expapi/activities/course">
            <name>${xmlData.name}</name>
            <description>${xmlData.description}</description>
            <launch>index.html</launch>
        </activity>
    </activities>
</tincan>
`

fs.writeFile(__dirname + "../../../public/tincan.xml", xml.trim(), function (err) {
    if (err) console.log(err)
})