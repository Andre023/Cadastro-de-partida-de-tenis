import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { QuadraInterface } from "../quadras/ListQuadra";
import { ClienteInterface } from "../clientes/ListCliente";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AxiosError } from "axios";
import '../../css.css';

const CreatePartida = () => {

    const [startDate, setStartDate] = useState(new Date());
    const [quadraId, setQuadraId] = useState(0);
    const [clienteId, setClienteId] = useState(0);
    const [quadras, setQuadras] = useState<QuadraInterface[]>([]);
    const [clientes, setClientes] = useState<ClienteInterface[]>([]); // Mudança aqui de 'cidades' para 'clientes'

    useEffect(() => {
        api.get('/quadras').then(response => {
            setQuadras(response.data);
        });
    }, []);

    useEffect(() => {
        api.get('/clientes').then(response => {
            setClientes(response.data);
        });
    }, []);

    const navigate = useNavigate();
    const handleNewPartida = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (quadraId <= 0) {
            alert('Por favor, selecione uma quadra válida.');
            return;
        }
        if (clienteId <= 0) {
            alert('Por favor, selecione um cliente válido.');
            return;
        }
        const formattedDate = startDate.toISOString();
        const dataToSend = {
            data: formattedDate,
            quadra_id: quadraId,
            cliente_id: clienteId
        };

        try {
            await api.post('/partidas', dataToSend);
            alert('Partida cadastrada com sucesso!');
            navigate('/partidas');
        } catch (error: unknown) {
            if (error instanceof Error && 'response' in error) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.status === 409) {
                    alert('Horário indisponível nesta quadra.');
                } else {
                    alert('Erro ao cadastrar a partida!');
                }
            } else {
                alert('Erro ao cadastrar a partida!');
            }
            console.log(error);
        }
    };

    return (
        <div className="Create">
            <h3>Cadastro de partida: {startDate.toLocaleString('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })} - {quadraId} - {clienteId}</h3>
            <form onSubmit={handleNewPartida}>

                <thead>
                    <tr>
                        <th>            </th>
                        <th>            </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><label htmlFor="data">Data</label></td>
                        <td><DatePicker id="data" selected={startDate} onChange={(date) => setStartDate(date || new Date())} showTimeSelect timeFormat="HH:mm" timeIntervals={60} timeCaption="Hora" dateFormat="dd/MM/yyyy HH:mm" wrapperClassName="datePicker" /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="quadra">Quadra</label></td>
                        <td>
                            <select name="quadra" id="quadra" value={quadraId.toString()} onChange={e => setQuadraId(parseInt(e.target.value))}>
                                <option value="0">Selecione</option>
                                {quadras.map(quadra => (
                                    <option key={quadra.id} value={quadra.id}>{quadra.localizacao} - {quadra.tipo_de_quadra}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="cliente">Cliente</label></td>
                        <td>
                            <select name="cliente" id="cliente" value={clienteId.toString()} onChange={e => setClienteId(parseInt(e.target.value))}>
                                <option value="0">Selecione</option>
                                {clientes.map(cliente => (
                                    <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                </tbody>
                <button type="submit">Cadastrar</button>
                <button type="reset">Limpar</button>
            </form>
        </div>
    );
};

export default CreatePartida;
