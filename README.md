# dvdrental-api repo
 
An api for the popular [DVD Rental](https://www.postgresqltutorial.com/postgresql-getting-started/postgresql-sample-database/) database. Here the schema: 

![alt text](assets/db_schema.png "DVD Rental Schema")

## Endpoints:

### Customers
Methods to get information about customers.

```console
GET /customers/{customerId}
GET /customers 
```
### Rentals
Methods to get information about rentals.

```
GET /rentals
GET /rentals/totals
GET /rentals/{customerId}
```

### Films
Methods to get information about films.

```console
GET /films/{filmId}
GET /films
GET /films/search
```
### Categories
Methods to get information about categories.

```
GET /categories
```
### Payments
Methods to get information about payments.

```
GET /payments
GET /payments/date-pays
GET /payments/{customerId}
```
### Stores
Methods to get information about stores.

```
GET /store
GET /store/{storeId}
```

