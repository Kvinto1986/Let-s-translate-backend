
const compareResponce = (req, res, next) => {
    const {translate, customerData} = req
    res.json({translate, customerData})
}

module.exports = compareResponce