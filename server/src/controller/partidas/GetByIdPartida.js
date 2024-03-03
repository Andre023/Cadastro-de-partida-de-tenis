import { prisma } from "../../database/client.js";
import { format } from 'date-fns';

export class GetByIdPartida {
    async handle(request, response) {
        const { id } = request.params;

        try {
            const partida = await prisma.partida.findUnique({
                where: { id: Number(id) },
                include: {
                    cliente: true,
                    quadra: true
                }
            });
            partida.created_at = format(new Date(partida.created_at), 'dd/MM/yyyy HH:mm:ss');
            partida.updated_at = format(new Date(partida.updated_at), 'dd/MM/yyyy HH:mm:ss');
            return response.json(partida);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}