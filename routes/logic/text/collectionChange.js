const Text = require('../../../models/TextModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const collectionChange = (req, res) => {

    Text.findAll({
        where: {
            id: {
                [Op.in]: req.body.textsList
            }
        }
    })
    .then((texts) => {
            texts
            .forEach((elem) => {
                elem.collectionName = req.body.newCollectionName;
                elem.save()
            })
        }
    )
    .then(() => res.json(req.body))
}

module.exports = collectionChange