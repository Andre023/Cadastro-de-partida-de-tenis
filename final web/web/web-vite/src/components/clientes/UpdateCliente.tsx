import { useEffect, useState } from "react"
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import '../../css.css';

const UpdateCliente = () => {

    const [nome, setNome] = useState('');
    const [rg, setRg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        api.get(`/clientes/${id}`).then(response => {
            setNome(response.data.nome);
            setRg(response.data.rg);
        })
    }, [id]);

    const handleUpdateCliente = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            id: parseInt(String(id)),
            nome,
            rg
        };
        try {
            await api.post('/clientes', data);
            alert('Cliente cadastrado com sucesso!');
            navigate('/clientes');
        } catch (error: unknown) {
            if (error instanceof Error && 'response' in error) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.status === 409) {
                    alert('RG já está em uso.');
                } else {
                    alert('Erro ao cadastrar o cliente!');
                }
            } else {
                alert('Erro ao cadastrar o cliente!');
            }
            console.log(error);
        }
    }

    return (
        <div className="Create">
            <h3>Atualização de cliente: {nome} - {rg}</h3>
            <form onSubmit={handleUpdateCliente}>
                <thead>
                    <tr>
                        <th>            </th>
                        <th>            </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><label htmlFor="nome">Nome</label></td>
                        <td><input type="text" name="nome" id="nome" value={nome} onChange={e => setNome(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="rg">RG</label></td>
                        <td><input type="text" name="rg" id="rg" value={rg} onChange={e => setRg(e.target.value)} /></td>
                    </tr>
                </tbody>
                <button type="submit">Atualizar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}

export default UpdateCliente;