import { useEffect, useState } from "react"
import api from "../../services/api";
import { Link } from "react-router-dom";
import '../../css.css';

export interface ClienteInterface {
    id: number;
    nome: string;
    rg: string;
    created_at: string;
    updated_at: string;
}
const ListClientes = () => {

    const [clientes, setClientes] = useState<ClienteInterface[]>([]);

    useEffect(() => {
        api.get('/clientes').then(response => {
            setClientes(response.data);
        })
    }, []);


    const handleDeleteCliente = async (id: number) => {
        if (!window.confirm("Deseja realmente excluir este cliente?")) {
            return;
        }
        try {
            await api.delete('/clientes', {
                data: {
                    id
                }
            });
            alert('Cliente excluído com sucesso!');
            setClientes(clientes.filter(cliente => cliente.id !== id));
        } catch (error) {
            console.log(error);
            alert('Erro ao excluir o cliente!');
        }
    }

    return (
        <div>
            <div className="center-content">
                <h3>Lista de clientes</h3>
                <div>
                    <Link to="/clientes/create">Inserir</Link>
                </div>
                <div>
                    <Link to="/">Voltar</Link>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>RG</th>
                        <th>Criado</th>
                        <th>Alterado</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nome}</td>
                            <td>{cliente.rg}</td>
                            <td>{cliente.created_at}</td>
                            <td>{cliente.updated_at}</td>
                            <td><Link to={`/clientes/update/${cliente.id}`} className="button-link">Atualizar</Link></td>
                            <td><button onClick={() => handleDeleteCliente(cliente.id)} className="button-delete">Excluir</button>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListClientes;