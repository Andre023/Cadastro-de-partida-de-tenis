import { prisma } from "../../database/client.js";
import { format } from 'date-fns';

export class UpdatePartida {
    async handle(request, response) {
        const { id, data, quadra_id, cliente_id } = request.body;

        if (!id || !data || !quadra_id || !cliente_id) {
            return response.status(400).json({
                message: 'Invalid data. All fields are required.'
            });
        }

        try {
            const existingPartida = await prisma.partida.findFirst({
                where: {
                    AND: [
                        { data: data },
                        { quadra_id: quadra_id },
                        { id: { not: parseInt(id) } }
                    ]
                }
            });

            if (existingPartida) {
                return response.status(409).json({
                    message: 'A partida with this data already exists.'
                });
            }
            const partida = await prisma.partida.update({
                where: { id: parseInt(id) },
                data: {
                    data,
                    quadra: { connect: { id: quadra_id } },
                    cliente: { connect: { id: cliente_id } }
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
