const customerController = require('../controllers/CustomerController');

const routes = [
    {
        method: 'GET',
        url: '/api/customer',
        handler: customerController.getCustomers
    },
    {
        method: 'GET',
        url: '/api/customer/:id',
        handler: customerController.getSingleCustomer
    },
    {
        method: 'POST',
        url: '/api/customer',
        handler: customerController.addCustomer
    },
    {
        method: 'POST',
        url: '/api/customer/:id/addAddress',
        handler: customerController.addAddress
    },
    {
        method: 'POST',
        url: '/api/customer/:id/addContact',
        handler: customerController.addContactNumber
    },
    {
        method: 'PUT',
        url: '/api/customer/:id',
        handler: customerController.updatePrimaryCustomerDetails
    },
    {
        method: 'DELETE',
        url: '/api/customer/:id',
        handler: customerController.deleteCustomerDetails
    },
    {
        method: 'DELETE',
        url: '/api/customer/:id/removeAddress/:addressId',
        handler: customerController.removeAddress
    },
    {
        method: 'DELETE',
        url: '/api/customer/:id/removeContact/:contactId',
        handler: customerController.removeContactNumber
    }
];

module.exports = routes;