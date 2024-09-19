// describe('Primer Test', () => {
//     it('Debe revistar que 1 + 1 sea 2', () => {
//         expect(1 + 1).toBe(2)
//     });
//     it('Debe revistar que 1 + 1 no sea 3', () => {
//         expect(1 + 1).not.toBe(3)
//     });
// })

import server, { connectDB } from '../server';
import db from '../config/db';


jest.mock('../config/db');

describe('connectDB', () => {
    it('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Hubo un error al conectar la DB'));

        const consoleSpy = jest.spyOn(console, 'log');

        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar la DB')
        );
    });
});