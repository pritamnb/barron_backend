const fs = require('fs');
module.exports=  function (filePath, cb) {
    fs.readFile(filePath,async (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            // @ts-ignore
            const object = await JSON.parse(fileData)
            return cb && cb(null, object)
        } catch(err) {
            return cb && cb(err)
        }
    })
}
