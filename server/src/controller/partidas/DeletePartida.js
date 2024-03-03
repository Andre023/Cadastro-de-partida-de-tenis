import { prisma } from "../../database/client.js";
import { format } from 'date-fns';

export class DeletePartida {
    async handle(request, response) {
        const { id } = request.body;
        try {
            const partida = await prisma.partida.delete({
                where: { id: parseInt(id) }
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