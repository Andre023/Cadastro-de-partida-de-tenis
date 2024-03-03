import { useEffect, useState } from "react"
import api from "../../services/api";
import { Link } from "react-router-dom";

export interface PartidaInterface {
    id: number;
    data: string;
    quadra_id: number;
    cliente_id: number;
    created_at: string;
    updated_at: string;
}

interface QuadraInterface {
    id: number;
    localizacao: string;
    tipo_de_quadra: string;
}

interface ClienteInterface {
    id: number;
    nome: string;
}

export const ListPartidas = () => {

    const [ partidas, setPartidas ] = useState<PartidaInterface[]>([]);
    const [ quadras, setQuadras ] = useState<{ [key: number]: QuadraInterface }>({});
    const [ clientes, setClientes ] = useState<{ [key: number]: ClienteInterface }>({});
    
    useEffect(() => {
        api.get('/partidas').then(response => {
            setPartidas(response.data);
        });

        api.get('/quadras').then(response => {
            const quadrasObj = response.data.reduce((obj: { [key: number]: QuadraInterface }, quadra: QuadraInterface) => {
                obj[quadra.id] = quadra;
                return obj;
            }, {});
            setQuadras(quadrasObj);
        });

        api.get('/clientes').then(response => {
            const clientesObj = response.data.reduce((obj: { [key: number]: ClienteInterface }, clientes: ClienteInterface) => {
                obj[clientes.id] = clientes;
                return obj;
            }, {});
            setClientes(clientesObj);
        });
    }, []);

    
    const handleDeletePartida = async (id: number) => {
        if(!window.confirm("Deseja realmente excluir esta partida?")) {
            return;
        }
        try{
            await api.delete('/partidas', {
                data:{
                    id
                }
            });
            alert('Partida excluído com sucesso!');
            setPartidas(partidas.filter(partida => partida.id !== id));
        } catch (error) {
            console.log(error);
            alert('Erro ao excluir a partida!');
        }
    }

    return (
        <div>
            <div className="center-content">
                <h3>Lista de partidas</h3>
                <div>
                    <Link to="/partidas/create">Inserir</Link>
                </div>
                <div>
                    <Link to="/">Voltar</Link>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Data</th>
                        <th>Quadra</th>
                        <th>Cliente</th>
                        <th>Criado</th>
                        <th>Alterado</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {partidas.map(partida => (
                        <tr key={partida.id}>
                            <td>{partida.id}</td>
                            <td>{new Date(partida.data).toLocaleDateString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                            <td>{quadras[partida.quadra_id]?.localizacao} - {quadras[partida.quadra_id]?.tipo_de_quadra}</td>
                            <td>{clientes[partida.cliente_id]?.nome}</td>
                            <td>{partida.created_at}</td>
                            <td>{partida.updated_at}</td>
                            <td><Link to={`/partidas/update/${partida.id}`}>Atualizar</Link></td>
                            <td><button onClick={()=>{handleDeletePartida(partida.id)}}>Excluir</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListPartidas;