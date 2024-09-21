import { Router } from 'express';
import { body, param } from 'express-validator';
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product';
import { handleInputErrors } from './middleware';

const router = Router();


/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:   
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor Curvo 40'
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 450
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      exambie: true
 * 
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */


router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *     get:
 *         summary: Get a product by ID
 *         tags:
 *             - Products
 *         description: Return a product based on its unique ID
 *         parameters:
 *           - in: path
 *             name: id
 *             description: The ID of the product to retrieve
 *             required: true
 *             schema:
 *                  type: integer
 *         responses:
 *             200:
 *                 description: Successful response
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Product'
 *             400:
 *                 description: Bad Request - Invalid ID
 *             404:
 *                 description: Not Found
 */

router.get('/:id', 
    param('id').isInt().withMessage('ID inválido'),
    handleInputErrors,
    getProductById
);

/**
 * @swagger
 *  /api/products:
 *      post:
 *          summary: Create a new product
 *          tags:
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo 55 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 420
 *          responses:
 *              201:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid input data
 */

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

/**
 * @swagger
 *  /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Resturns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                   type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Monitor Curvo 55 pulgadas"
 *                              price:
 *                                  type: number
 *                                  example: 420
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - Invalid ID or Invalid input data
 *              404:
 *                  description: Not Found
 */

router.put('/:id', 
    // Validación
    param('id').isInt().withMessage('ID inválido'),
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
/**
 * @swagger
 *  /api/products/{id}:
 *      patch:
 *          summary: Update Product availability
 *          tags:
 *              - Products
 *          description: Returns the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                   type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request - Invalid ID
 *              404:
 *                  description: Not Found
 */

router.patch('/:id', 
    param('id').isInt().withMessage('ID inválido'),
    handleInputErrors,
    updateAvailability
);

/**
 * @swagger
 *  /api/products/{id}:
 *      delete:
 *          summary: Deletes a Product by a given ID
 *          tags:
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                   type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto Eliminado'
 *              400:
 *                  description: Bad request - Invalid ID
 *              404:
 *                  description: Not Found
 */
router.delete('/:id',
    param('id').isInt().withMessage('ID inválido'),
    handleInputErrors,
    deleteProduct
);

export default router;