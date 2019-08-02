# MarketPlaceAPI

API REST made with Node.js, ExpressJS & mongoDB

## Requirements

This project require the following modules:

- mongoose v5.6.7
- body-parser v1.19.0
- express v4.17.1
- dotenv v8.0.0

Additionally, you do need to create a _.env_ file with properties connection to the mongoDB, as it's shown in the following:

```
PORT=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
```

## MongoDB Collections:

These are the database collections schemas.

### Categories

```JSON
{
    "categories": {
        "name": {
            "type": "String",
            "required": true,
            "unique": true
            },
        "products": {
            "type": ["productSchema"],
            "required": false
            }
    }
}
```

### Products
This a nested document in categories schema
```JSON
{
    
    "productSchecma": {
    "_id": {
        "type": "ObjectId"
    },
    "picture": {
        "type": "String",
        "required": true,
        "default": "http://placehold.it/200x200"
    },
    "name": { 
        "type": "String",
        "required": true,
        "unique": true
    },
    "description": { 
        "type": "String",
        "required": false,
        "default": ''
    },
    "price": { 
        "type": "Number",
        "required": true,
        "default": 0
    },
    "stock": { 
        "type": "Number",
        "required": true,
        "default": 0
    }
}
```
### Carts
```JSON
{
    "carts": {
        "_id": "ObjectId",
        "products": [
            {
                "productId": "String",
                "qty": "Number"
            }
        ]
    }
}
```
