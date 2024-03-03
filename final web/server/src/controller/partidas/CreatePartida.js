import { prisma } from "../../database/client.js";

export class CreatePartida {
    async handle(request, response) {
        const { data, quadra_id, cliente_id } = request.body;

        if (!data || !quadra_id || !cliente_id) {
            return response.status(400).json({
                message: 'Invalid data. All fields are required.'
            });
        }

        try {
            const existingPartida = await prisma.partida.findFirst({
                where: {
                    AND: [
                        { data: data },
                        { quadra_id: quadra_id }
                    ]
                }
            });
        
            if (existingPartida) {
                return response.status(409).json({
                    message: 'A partida with this data already exists.'
                });
            }

            const partida = await prisma.partida.create({
                data: {
                    data,
                    quadra: { connect: { id: quadra_id } },
                    cliente: { connect: { id: cliente_id } }
                }
            });
        
            return response.json(partida);
        } catch (error) {
            console.error('CreatePartida Error:', error);
            return response.status(500).json({ message: 'Internal server error.', error: error.message });
        }
    }
}
