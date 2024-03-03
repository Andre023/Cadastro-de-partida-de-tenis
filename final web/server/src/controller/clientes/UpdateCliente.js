import { prisma } from "../../database/client.js";
import { format } from 'date-fns';

export class UpdateCliente {
    async handle(request, response) {
        const {id, nome, rg } = request.body;

        try {
            const cliente = await prisma.cliente.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    nome,
                    rg
                }
            });
            cliente.created_at = format(new Date(cliente.created_at), 'dd/MM/yyyy HH:mm:ss');
            cliente.updated_at = format(new Date(cliente.updated_at), 'dd/MM/yyyy HH:mm:ss');
            return response.json(cliente);
        } catch (error) {
            response.status(404).json({
                message: 'Invalid request.', error
            })
        }
    }
}