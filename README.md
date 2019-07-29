# MarketPlaceAPI
API REST made with Node.js & ExpressJS

## MongoDB Collections:

```Javascript
db.createCollection("categories", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name"],
            properties: {
                name: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                products: {
                    bsonType: ["object"],
                    required: ["name, price, stock, picture"],
                    properties: {
                        name: {
                            bsonType: "string",
                            description: "must be a string and is required"
                        },
                        description: {
                            bsonType: "string",
                            description: "must be a string"
                        },
                        stock: {
                            bsonType: "int",
                            description: "must be a integer"
                        },
                        price: {
                            bsonType: "int",
                            description: "must be a integer"
                        },
                        picture: {
                            bsonType: "string",
                            description: "must be a string"
                        }
                    }
                }
            }
        }
    }
})


db.createCollection("carts", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["name"],
            properties: {                
                products: {
                    bsonType: ["object"],
                    required: ["name, price, stock, picture"],
                    properties: {
                        name: {
                            bsonType: "string",
                            description: "must be a string and is required"
                        },
                        description: {
                            bsonType: "string",
                            description: "must be a string"
                        },
                        stock: {
                            bsonType: "int",
                            description: "must be a integer"
                        },
                        price: {
                            bsonType: "int",
                            description: "must be a integer"
                        },
                        picture: {
                            bsonType: "string",
                            description: "must be a string"
                        }
                    }
                }
            }
        }
    }
})
```
