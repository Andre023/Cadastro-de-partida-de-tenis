import { useState } from "react"
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import '../../css.css';

const CreateQuadra = () => {

    const [localizacao, setLocalizacao] = useState('');
    const [tipo_de_quadra, setTipo] = useState('');
    const navigate = useNavigate();

    const handleNewQuadra = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            localizacao,
            tipo_de_quadra
        };
        try {
            await api.post('/quadras', data);
            alert('Quadra cadastrada com sucesso!');
            navigate('/quadras');
        } catch (error) {
            console.log(error);
            alert('Erro ao cadastrar a quadra!');
        }
    }

    return (
        <div className="Create">
            <h3>Cadastro de quadra: {localizacao} - {tipo_de_quadra}</h3>
            <form onSubmit={handleNewQuadra}>
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
                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    )
}

export default CreateQuadra;