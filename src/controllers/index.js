class IndexController {
    async getProducts(req, res) {
        // Logic to retrieve products from the database
        res.send("List of products");
    }

    async createProduct(req, res) {
        // Logic to create a new product in the database
        res.send("Product created");
    }
}

module.exports = IndexController;