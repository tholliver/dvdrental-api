"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalSchemaRelationships = exports.paymentRelationships = exports.addressRelationships = exports.categoriesRelationships = exports.film_categoryRelationships = exports.film_category = exports.filmsRelationships = exports.customerRelationships = exports.paymentSchema = exports.cityRelations = exports.citySchema = exports.countryRelations = exports.countrySchema = exports.addressSchema = exports.rentalSchema = exports.inventorySchema = exports.filmSchema = exports.categorySchema = exports.staffSchema = exports.customerSchema = exports.storeSchema = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.storeSchema = (0, pg_core_1.pgTable)('store', {
    store_id: (0, pg_core_1.serial)('store_id'),
    manager_staff_id: (0, pg_core_1.integer)('manager_staff_id'),
    address_id: (0, pg_core_1.integer)('address_id'),
    last_update: (0, pg_core_1.date)('last_update'),
});
exports.customerSchema = (0, pg_core_1.pgTable)('customer', {
    customer_id: (0, pg_core_1.serial)('customer_id').primaryKey().notNull(),
    store_id: (0, pg_core_1.integer)('store_id'),
    first_name: (0, pg_core_1.varchar)('first_name', { length: 50 }),
    last_name: (0, pg_core_1.varchar)('last_name', { length: 50 }),
    email: (0, pg_core_1.varchar)('email', { length: 100 }),
    address_id: (0, pg_core_1.integer)('address_id'),
    activebool: (0, pg_core_1.boolean)('activebool'),
    create_date: (0, pg_core_1.timestamp)('create_date').defaultNow(),
    last_update: (0, pg_core_1.timestamp)('last_update').defaultNow(),
    active: (0, pg_core_1.boolean)('active'),
});
exports.staffSchema = (0, pg_core_1.pgTable)('staff', {
    staff_id: (0, pg_core_1.serial)('staff_id'),
    nombre: (0, pg_core_1.varchar)('nombre', { length: 50 }),
    apellido: (0, pg_core_1.varchar)('apellido', { length: 50 }),
    address_id: (0, pg_core_1.integer)('address_id'),
    email: (0, pg_core_1.varchar)('email', { length: 50 }),
    store_id: (0, pg_core_1.integer)('store_id'),
    activo: (0, pg_core_1.boolean)('activo'),
    usuario: (0, pg_core_1.varchar)('usuario', { length: 50 }),
    password: (0, pg_core_1.varchar)('password', { length: 255 }), // Update the length as needed
    last_update: (0, pg_core_1.timestamp)('last_update').defaultNow(),
});
const ratingEnum = (0, pg_core_1.pgEnum)('rating', ['G', 'PG', 'PG-13', 'R', 'NC-17']);
// Define the tsvector custom type
const tsVector = (0, pg_core_1.customType)({
    dataType( /*config*/) {
        return 'tsvector';
    },
    fromDriver(value) {
        return value;
    },
    toDriver(value) {
        return value;
    },
});
exports.categorySchema = (0, pg_core_1.pgTable)('category', {
    category_id: (0, pg_core_1.serial)('category_id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 25 }),
    last_update: (0, pg_core_1.timestamp)('last_update').notNull().defaultNow(),
});
exports.filmSchema = (0, pg_core_1.pgTable)('film', {
    film_id: (0, pg_core_1.serial)('film_id').primaryKey(),
    title: (0, pg_core_1.varchar)('title', { length: 255 }).notNull(),
    description: (0, pg_core_1.text)('description'),
    release_year: (0, pg_core_1.integer)('release_year'),
    language_id: (0, pg_core_1.smallint)('language_id').notNull(),
    rental_duration: (0, pg_core_1.smallint)('rental_duration').notNull().default(3),
    rental_rate: (0, pg_core_1.numeric)('rental_rate').notNull().default('4.99'),
    length: (0, pg_core_1.smallint)('length'),
    replacement_cost: (0, pg_core_1.numeric)('replacement_cost').notNull().default('19.99'),
    rating: ratingEnum('rating').default('G'),
    last_update: (0, pg_core_1.timestamp)('last_update').notNull().defaultNow(),
    special_features: (0, pg_core_1.text)('special_features'), // NOTE: Special handling may be needed for array of text.
    fulltext: tsVector('fulltext').notNull(),
});
exports.inventorySchema = (0, pg_core_1.pgTable)('inventory', {
    inventory_id: (0, pg_core_1.serial)('inventory_id').primaryKey().notNull(),
    film_id: (0, pg_core_1.smallint)('film_id')
        .notNull()
        .references(() => exports.filmSchema.film_id), // assuming "film_id" is the name of the column in the film table
    store_id: (0, pg_core_1.smallint)('store_id').notNull(),
    last_update: (0, pg_core_1.timestamp)('last_update').defaultNow(),
});
exports.rentalSchema = (0, pg_core_1.pgTable)('rental', {
    rental_id: (0, pg_core_1.serial)('rental_id').primaryKey().notNull(),
    rental_date: (0, pg_core_1.timestamp)('rental_date').notNull(),
    inventory_id: (0, pg_core_1.smallint)('inventory_id').notNull(),
    customer_id: (0, pg_core_1.smallint)('customer_id').notNull(),
    return_date: (0, pg_core_1.timestamp)('return_date'),
    staff_id: (0, pg_core_1.smallint)('staff_id').notNull(),
    last_update: (0, pg_core_1.timestamp)('last_update').defaultNow(),
});
exports.addressSchema = (0, pg_core_1.pgTable)('address', {
    address_id: (0, pg_core_1.serial)('address_id').primaryKey(),
    address: (0, pg_core_1.varchar)('address', { length: 50 }).notNull(),
    address2: (0, pg_core_1.varchar)('address2', { length: 50 }),
    district: (0, pg_core_1.varchar)('district', { length: 20 }).notNull(),
    city_id: (0, pg_core_1.smallint)('city_id').notNull(),
    postal_code: (0, pg_core_1.varchar)('postal_code', { length: 10 }),
    phone: (0, pg_core_1.varchar)('phone', { length: 20 }).notNull(),
    last_update: (0, pg_core_1.timestamp)('last_update').defaultNow(),
});
exports.countrySchema = (0, pg_core_1.pgTable)('country', {
    country_id: (0, pg_core_1.serial)('country_id').primaryKey().notNull(),
    country: (0, pg_core_1.varchar)('country', { length: 50 }).notNull(),
    last_update: (0, pg_core_1.timestamp)('last_update').defaultNow()
});
exports.countryRelations = (0, drizzle_orm_1.relations)(exports.countrySchema, ({ many }) => ({
    cities: many(exports.citySchema)
}));
exports.citySchema = (0, pg_core_1.pgTable)('city', {
    city_id: (0, pg_core_1.serial)('city_id').primaryKey().notNull(),
    city: (0, pg_core_1.varchar)('city', { length: 50 }),
    country_id: (0, pg_core_1.smallint)('country_id').notNull(),
    last_update: (0, pg_core_1.timestamp)('last_update').defaultNow()
});
exports.cityRelations = (0, drizzle_orm_1.relations)(exports.citySchema, ({ one, many }) => ({
    country: one(exports.countrySchema, {
        fields: [exports.citySchema.city_id],
        references: [exports.countrySchema.country_id]
    }),
    address: many(exports.addressSchema)
}));
exports.paymentSchema = (0, pg_core_1.pgTable)('payment', {
    payment_id: (0, pg_core_1.serial)('payment_id').notNull(),
    customer_id: (0, pg_core_1.smallint)('customer_id')
        .notNull()
        .references(() => exports.customerSchema.customer_id),
    staff_id: (0, pg_core_1.smallint)('staff_id')
        .notNull()
        .references(() => exports.staffSchema.staff_id),
    rental_id: (0, pg_core_1.integer)('rental_id')
        .notNull()
        .references(() => exports.rentalSchema.rental_id),
    amount: (0, pg_core_1.numeric)('amount').notNull(),
    payment_date: (0, pg_core_1.timestamp)('payment_date').notNull(),
});
exports.customerRelationships = (0, drizzle_orm_1.relations)(exports.customerSchema, ({ many, one }) => ({
    payments: many(exports.paymentSchema),
    rentals: many(exports.rentalSchema),
    address: one(exports.addressSchema, {
        fields: [exports.customerSchema.address_id],
        references: [exports.addressSchema.address_id],
    }),
}));
exports.filmsRelationships = (0, drizzle_orm_1.relations)(exports.filmSchema, ({ many }) => ({
    categoryToFilms: many(exports.film_category),
}));
exports.film_category = (0, pg_core_1.pgTable)('film_category', {
    film_id: (0, pg_core_1.integer)('film_id')
        .notNull()
        .references(() => exports.filmSchema.film_id),
    category_id: (0, pg_core_1.integer)('category_id')
        .notNull()
        .references(() => exports.categorySchema.category_id),
    last_update: (0, pg_core_1.timestamp)('last_update').defaultNow(),
});
exports.film_categoryRelationships = (0, drizzle_orm_1.relations)(exports.film_category, ({ one }) => ({
    film: one(exports.filmSchema, {
        fields: [exports.film_category.film_id],
        references: [exports.filmSchema.film_id],
    }),
    category: one(exports.categorySchema, {
        fields: [exports.film_category.category_id],
        references: [exports.categorySchema.category_id],
    }),
}));
exports.categoriesRelationships = (0, drizzle_orm_1.relations)(exports.categorySchema, ({ many }) => ({
    categoryToFilms: many(exports.film_category),
}));
exports.addressRelationships = (0, drizzle_orm_1.relations)(exports.addressSchema, ({ one }) => ({
    customer: one(exports.customerSchema),
    city: one(exports.citySchema, {
        fields: [exports.addressSchema.city_id],
        references: [exports.citySchema.city_id]
    })
}));
exports.paymentRelationships = (0, drizzle_orm_1.relations)(exports.paymentSchema, ({ one }) => ({
    customer: one(exports.customerSchema, {
        fields: [exports.paymentSchema.customer_id],
        references: [exports.customerSchema.customer_id],
    }),
}));
exports.rentalSchemaRelationships = (0, drizzle_orm_1.relations)(exports.rentalSchema, ({ one }) => ({
    customer: one(exports.customerSchema, {
        fields: [exports.rentalSchema.customer_id],
        references: [exports.customerSchema.customer_id],
    }),
}));
// export const inventoryRelationship = relations(rentalSchema, ({ one }) => ({
//     rental: one(rentalSchema, {
//         fields: [rentalSchema.inventory_id],
//         references: [inventorySchema.inventory_id],
//     }),
// }))
