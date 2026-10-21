import { Router } from 'express';
import healthRoutes from './healthRoutes.js';

/**
 * Saare API routes yahan judte hain. Aage ke steps:
 *   router.use('/products', productRoutes);     // Step 7
 *   router.use('/categories', categoryRoutes);  // Step 7
 *   router.use('/auth', authRoutes);            // Step 8
 *   router.use('/orders', orderRoutes);         // Step 9
 *   router.use('/reviews', reviewRoutes);       // Step 10
 */
const router = Router();
router.use('/health', healthRoutes);
export default router;
