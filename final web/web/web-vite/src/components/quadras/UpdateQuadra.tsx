import { useEffect, useState } from "react"
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const UpdateQuadra = () => {

    const [localizacao, setLocalizacao] = useState('');
    const [tipo_de_quadra, setTipo] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        api.get(`/quadras/${id}`).then(response => {
            setLocalizacao(response.data.localizacao);
            setTipo(response.data.tipo_de_quadra);
        })
    }, [id]);

    const handleUpdateQuadra = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            id: parseInt(String(id)),
            localizacao,
            tipo_de_quadra
        };
        try {
            await api.put('/quadras', data);
            alert('Quadra atualizada com sucesso!');
            navigate('/quadras');
        } catch (error) {
            console.log(error);
            alert('Erro ao atualizar a quadra!');
        }
    }

    return (
        <div className="Create">
            <h3>Atualização de quadra: {localizacao} - {tipo_de_quadra}</h3>
            <form onSubmit={handleUpdateQuadra}>
                <thead>
                    <tr>
                        <th>            </th>
                        <th>            </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><label htmlFor="localizacao">Localização</label></td>
                        <td><input type="text" name="localizacao" id="localizacao" value={localizacao} onChange={e => setLocalizacao(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="tipo">Tipo de quadra</label></td>
                        <td><input type="text" name="tipo" id="tipo" value={tipo_de_quadra} onChange={e => setTipo(e.target.value)} /></td>
                    </tr>
                </tbody>
                <button type="submit">Atualizar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}

export default UpdateQuadra;