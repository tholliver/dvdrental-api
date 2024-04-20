import { drizzle } from 'drizzle-orm/postgres-js';
import postgres, { Sql } from 'postgres'; // Ensure to import Sql type
import { PG_URI } from '../config';
import * as schema from './schema';

// Ensure PG_URI is defined
if (!PG_URI) {
    throw new Error('PG_URI is not defined');
}

// Create queryClient with PG_URI
const queryClient = postgres(PG_URI);

// Pass queryClient to drizzle function
const dbConn = drizzle(queryClient, { schema });

export default dbConn;
