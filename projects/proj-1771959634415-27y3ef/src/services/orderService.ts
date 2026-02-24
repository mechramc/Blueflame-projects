// Import necessary modules
import { Pool } from 'pg';

const pool = new Pool();

// Function to retrieve order history for a user
export const getOrderHistory = async (userId: string) => {
    const query = 'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC';
    const { rows } = await pool.query(query, [userId]);
    return rows;
};
