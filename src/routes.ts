import { Router } from 'express';
import { body } from 'express-validator';
import { createProduct, getProducts } from './handlers/product';
import { handleInputErrors } from './middleware';

const router = Router();

// Routing
router.get('/', getProducts);

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


router.put('/', (req, res) => {
    res.json("Desde PUT");
});

router.patch('/', (req, res) => {
    res.json("Desde Patch");
});

router.delete('/', (req, res) => {
    res.json("Desde DELETE");
});

export default router;