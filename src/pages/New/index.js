import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiPlusCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import cx from 'classnames'
import styles from './styles.module.css';
import firebase from '../../services/firebaseConnection';
import { getClientes, cadastrarChamado, clientById } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';


export default function New() {

    const [clientes, setClientes] = useState([]);
    const [loadingClientes, setLoadingClientes] = useState(true);
    const [clienteSelecionado, setClienteSelecionado] = useState(0);
    const [assunto, setAssunto] = useState('');
    const [status, setStatus] = useState('');
    const [clienteId, setClienteId] = useState(0);
    const [nomeCliente, setNomeCliente] = useState('');
    const [complemento, setComplemento] = useState('');
    const [loading, setLoading] = useState(false);
    const [valorId, setValorId] = useState(null);
    const [statusCreateChamado, setStatusCreateChamado] = useState({
        status: ''
    });
    const history=useNavigate(); 

    useEffect(() => {
        const usuarioLogado = localStorage.getItem("usuarioLogado")
        if(usuarioLogado == null){
          history("/")
          return;
        } 

        (async () => {

            await getClientes().then((res) => {
                setClientes(res.data);
            })
                .catch((error) => {
                    console.log(error)
                  
                })
        })();
    }, []);

    async function handleChamado(e) {
        e.preventDefault();
       
    }

    const salvarChamado = async () => {

        try {

        const response = await clientById(clienteId);
     
        setNomeCliente(response.data.nome);

        if(response.data.nome == "Selecione o cliente"){

            response.data.nome = null;

        }

        await cadastrarChamado(clienteId, response.data.nome, assunto, status, complemento);
        setLoading(true);
        
        setStatusCreateChamado({
            status: 200
        })
    
        await sleep(3000);
    
        function sleep(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
    
            })
    
        }
    
        setLoading(false);
         
        } catch (error) {
            console.log(error)
            setStatusCreateChamado({
                status: 400
            })
            
        }
    }

    const loadClientData = async (id) => {

        

    }

    return (
        <div>
            <Header />
         
            <div className="content">
                <Title nome="Novo chamado">
                    <FiPlusCircle size={25} />
                </Title>
            
                <div className="container">

                    <form onSubmit={(e) => { handleChamado(e) }} className="form-profile">
                        <label>Cliente</label>
                        {!loadingClientes ?
                            <select>                           
                               <option>Carregando...</option>
                            </select>
                            : <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} >
                                {clientes.map((item) => {
                                    return (<option key={item.id} value={item.id}>{item.nome}</option>);
                                })}
                            </select>
                        }
                        <label>Assunto</label>
                        <select value={assunto} onChange={(e) => setAssunto(e.target.value)}>
                            <option value="">Selecione o assunto</option>
                            <option value="Suporte">Suporte</option>
                            <option value="Financeiro">Financeiro</option>
                            <option value="Visita">Visita</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input
                                type="radio"
                                name="radio"
                                value="Aberto"
                                onChange={(e) => setStatus(e.target.value)}
                                checked={status === "Aberto"} />
                            <span>Em Aberto</span>

                            <input
                                type="radio"
                                name="radio"
                                value="Progresso"
                                onChange={(e) => setStatus(e.target.value)}
                                checked={status === "Progresso"} />
                            <span>Em Progresso</span>

                            <input
                                type="radio"
                                name="radio"
                                value="Atendido"
                                onChange={(e) => setStatus(e.target.value)}
                                checked={status === "Atendido"} />
                            <span>Atendido</span>
                        </div>
                        <label>Complemento</label>
                        <textarea type="text"
                            placeholder="Descreva seu problema aqui"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)} />

                        <button type="submit" onClick={() => salvarChamado()}>Registrar</button>
                        {loading === true ? <div className={styles.msgSucesso}>Chamado salvo com sucesso!</div> : null}
                        {statusCreateChamado.status === 400 ? <div className={styles.msgErroCreateCliente}>Erro ao cadastrar o Chamado</div> : null}
                    </form>

                </div>

            </div>
        </div>
    );
}