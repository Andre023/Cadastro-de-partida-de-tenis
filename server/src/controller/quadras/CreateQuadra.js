import { prisma } from '../../database/client.js'
import { format } from 'date-fns';

export class CreateQuadra {

    async handle(request, response) {
        const { localizacao, tipo_de_quadra } = request.body;
        if (localizacao === "" || tipo_de_quadra === "") {
            return response.status(400).json({
                message: 'Invalid data. All fields are required.'
            })
        }
        const quadra = await prisma.quadra.create({
            data: {
                localizacao,
                tipo_de_quadra
            }
        })
        quadra.created_at = format(new Date(quadra.created_at), 'dd/MM/yyyy HH:mm:ss');
        quadra.updated_at = format(new Date(quadra.updated_at), 'dd/MM/yyyy HH:mm:ss');
        return response.json(quadra);
    }
}