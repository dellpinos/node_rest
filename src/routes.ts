import { Router } from 'express';
import { body, param } from 'express-validator';
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product';
import { handleInputErrors } from './middleware';

const router = Router();

// Routing
router.get('/', getProducts);

router.get('/:id', 
    param('id').isInt().withMessage('ID inválido'),
    handleInputErrors,
    getProductById
);

router.post('/', 
    // Validación
    body('name').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('price')
        .isNumeric().withMessage('Formato inválido')
        .notEmpty().withMessage('El precio del producto es obligatorio')
        .custom(value => value > 0).withMessage('El precio debe ser mayor a cero'),
    handleInputErrors,
    createProduct
);


router.put('/:id', 
    // Validación
    body('name').notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('price')
        .isNumeric().withMessage('Formato inválido')
        .notEmpty().withMessage('El precio del producto es obligatorio')
        .custom(value => value > 0).withMessage('El precio debe ser mayor a cero'),
    body('availability')
        .notEmpty().withMessage('El campo availability es obligatorio')
        .isBoolean().withMessage('Formato inválido'),
    handleInputErrors,
    updateProduct
);

router.patch('/:id', 
    param('id').isInt().withMessage('ID inválido'),
    handleInputErrors,
    updateAvailability
);

router.delete('/:id',
    param('id').isInt().withMessage('ID inválido'),
    handleInputErrors,
    deleteProduct
);

export default router;