import { prisma } from '../../database/client.js'
import { format } from 'date-fns';

export class CreateCliente {

    async handle(request, response) {
        const { nome, rg } = request.body;
        if (nome === "" || rg === "") {
            return response.status(400).json({
                message: 'Invalid data. Nome and RG are required.'
            })
        }

        const existingCliente = await prisma.cliente.findUnique({
            where: {
                rg: rg
            }
        });
        if (existingCliente) {
            return response.status(409).json({
                message: 'RG already exists.'
            });
        }
        const cliente = await prisma.cliente.create({
            data: {
                nome,
                rg
            }
        })
        cliente.created_at = format(new Date(cliente.created_at), 'dd/MM/yyyy HH:mm:ss');
        cliente.updated_at = format(new Date(cliente.updated_at), 'dd/MM/yyyy HH:mm:ss');
        return response.json(cliente);
    }
}