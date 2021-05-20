const fs = require('fs').promises;


function getFilecContent(path, res) {
    return fs.readFile(path, {encoding: 'utf-8'})
      .then(JSON.parse)
      .catch((err) => res.status(500).send({ message: err }));
}

module.exports = getFilecContent;