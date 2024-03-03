import { prisma } from "../../database/client.js";
import { format } from 'date-fns';

export class GetAllCliente {
    async handle(request, response) {
        try {
            const cliente = await prisma.cliente.findMany({
                include: {
                    partida: true
                }
            });

            const clientesFormatados = cliente.map(clientes => ({
                ...clientes,
                created_at: format(new Date(clientes.created_at), 'dd/MM/yyyy HH:mm:ss'),
                updated_at: format(new Date(clientes.updated_at), 'dd/MM/yyyy HH:mm:ss'),
                partida: Array.isArray(clientes.partida) ? clientes.partida.map(p => ({
                    ...p,
                    data: p.data ? format(new Date(p.data), 'dd/MM/yyyy HH:mm:ss') : p.data,
                    created_at: p.created_at ? format(new Date(p.created_at), 'dd/MM/yyyy HH:mm:ss') : p.created_at,
                    updated_at: p.updated_at ? format(new Date(p.updated_at), 'dd/MM/yyyy HH:mm:ss') : p.updated_at
                })) : []
            }));

            return response.json(clientesFormatados);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}