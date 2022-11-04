const csv_to_json = require('csvtojson')
const json_to_csv = require('json2csv').parse
const fs = require('fs')
const { createHmac } = require('node:crypto');

// Define the path names
const in_path = 'hng.csv'
const out_path = 'out.hng.csv'

csv_to_json({
    quote: true,
    colParser:{
        "Hash": function(item, head, resultRow, row , colIdx){
            return createHmac('sha256', row[1]).digest('hex');
        },
    }
})
.on('header',(header)=>{
    return `"${header}1"`
})
.fromFile(in_path).then(source => {
    console.log(source)
    const csv = json_to_csv(source, {
        fields: ["Series Number", "Filename", "Description", "Gender", "UUID", "Hash"]
    })
    fs.writeFileSync(out_path, csv);
})