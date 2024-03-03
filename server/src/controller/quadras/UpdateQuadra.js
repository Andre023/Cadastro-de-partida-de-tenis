import { prisma } from "../../database/client.js";
import { format } from 'date-fns';

export class UpdateQuadra {
    async handle(request, response) {
        const {id, localizacao, tipo_de_quadra } = request.body;

        try {
            const quadra = await prisma.quadra.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    localizacao,
                    tipo_de_quadra
                }
            });
            quadra.created_at = format(new Date(quadra.created_at), 'dd/MM/yyyy HH:mm:ss');
            quadra.updated_at = format(new Date(quadra.updated_at), 'dd/MM/yyyy HH:mm:ss');
            return response.json(quadra);
        } catch (error) {
            response.status(404).json({
                message: 'Invalid request.', error
            })
        }
    }
}