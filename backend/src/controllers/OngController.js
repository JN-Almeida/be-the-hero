const connection = require('../database/connection')
const crypto = require('crypto'); // componente node para criptografia 

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs)
    }, 

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX'); // 4 caracteres aleatorios, converte para string
    
        await connection('ongs').insert({  // await para aguardar o insert terminar antes de retornar
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({ id });
    }
}