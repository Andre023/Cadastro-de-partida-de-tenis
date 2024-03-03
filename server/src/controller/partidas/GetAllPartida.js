import { prisma } from "../../database/client.js";
import { format } from 'date-fns';

export class GetAllPartida {
    async handle(request, response) {
        try {
            const partidas = await prisma.partida.findMany({
                include: {
                    cliente: true,
                    quadra: true
                }
            });

            const partidasFormatadas = partidas.map(partida => ({
                ...partida,
                created_at: format(new Date(partida.created_at), 'dd/MM/yyyy HH:mm:ss'),
                updated_at: format(new Date(partida.updated_at), 'dd/MM/yyyy HH:mm:ss'),
                partida: Array.isArray(partida.partida) ? partida.partida.map(p => ({
                    ...p,
                    data: p.data ? format(new Date(p.data), 'dd/MM/yyyy HH:mm:ss') : p.data,
                    created_at: p.created_at ? format(new Date(p.created_at), 'dd/MM/yyyy HH:mm:ss') : p.created_at,
                    updated_at: p.updated_at ? format(new Date(p.updated_at), 'dd/MM/yyyy HH:mm:ss') : p.updated_at
                })) : []
            }));

            return response.json(partidasFormatadas);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    }
}
