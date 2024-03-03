import { useEffect, useState } from "react"
import api from "../../services/api";
import { Link } from "react-router-dom";
import '../../css.css';

export interface QuadraInterface {
    id: number;
    localizacao: string;
    tipo_de_quadra: string;
    created_at: string;
    updated_at: string;
}
const ListQuadras = () => {


    const [quadras, setQuadras] = useState<QuadraInterface[]>([]);

    useEffect(() => {
        api.get('/quadras').then(response => {
            setQuadras(response.data);
        })
    }, []);


    const handleDeleteQuadra = async (id: number) => {
        if (!window.confirm("Deseja realmente excluir esta quadra?")) {
            return;
        }
        try {
            await api.delete('/quadras', {
                data: {
                    id
                }
            });
            alert('Quadra excluído com sucesso!');
            setQuadras(quadras.filter(quadra => quadra.id !== id));
        } catch (error) {
            console.log(error);
            alert('Erro ao excluir a quadra!');
        }
    }

    return (
        <div>
            <div className="center-content">
                <h3>Lista de quadra</h3>
                <div>
                    <Link to="/quadras/create">Inserir</Link>
                </div>
                <div>
                    <Link to="/">Voltar</Link>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Licalização</th>
                        <th>Tipo de quadra</th>
                        <th>Criado</th>
                        <th>Alterado</th>
                        <th>Atualizar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {quadras.map(quadra => (
                        <tr key={quadra.id}>
                            <td>{quadra.id}</td>
                            <td>{quadra.localizacao}</td>
                            <td>{quadra.tipo_de_quadra}</td>
                            <td>{quadra.created_at}</td>
                            <td>{quadra.updated_at}</td>
                            <td><Link to={`/quadras/update/${quadra.id}`}>Atualizar</Link></td>
                            <td><button onClick={() => { handleDeleteQuadra(quadra.id) }}>Excluir</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListQuadras;