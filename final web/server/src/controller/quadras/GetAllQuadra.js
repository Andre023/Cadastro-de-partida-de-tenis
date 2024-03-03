import { prisma } from "../../database/client.js";
import { format } from 'date-fns';

export class GetAllQuadra {
    async handle(request, response) {
        const quadras = await prisma.quadra.findMany({
            include: {
                partida: true
            }
        });

        const quadrasFormatadas = quadras.map(quadra => ({
            ...quadra,
            created_at: format(new Date(quadra.created_at), 'dd/MM/yyyy HH:mm:ss'),
            updated_at: format(new Date(quadra.updated_at), 'dd/MM/yyyy HH:mm:ss'),
            partida: quadra.partida.map(p => ({
                ...p,
                data: p.data ? format(new Date(p.data), 'dd/MM/yyyy HH:mm:ss') : null
            }))
        }));

        return response.json(quadrasFormatadas);
    }
}
