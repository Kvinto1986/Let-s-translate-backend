const Text = require('../../../models/TextModel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const textDelete =(req, res) => {

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
                elem.destroy()
            })
        }
    )
    .then(() => res.json(req.body))
}

module.exports = textDelete