const Customer = require('../../../models/CustomerModel');

const fetchCustomer = (req, res, next) => {
    const {name, email} = req.translate

    Customer.findOne({where: {name, email}})
    .then(customerData => {
        req.customerData = customerData
        next()
    })
}

module.exports = fetchCustomer