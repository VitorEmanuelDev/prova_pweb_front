
import './dashboard.css';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi';
import { getChamados } from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

const initialValuesListaChamados = [


  {
      clienteId: 0,  
      nomeCliente:'',
      assunto: '',   
      status: '',
      complemento: ''
  },
  {
      clienteId: 1,  
      nomeCliente:'',
      assunto: '',   
      status: '',
      complemento: ''
  },
  {
      clienteId: 2,  
      nomeCliente:'',
      assunto: '',   
      status: '',
      complemento: ''
  },


]


export default function Dashboard(){
  const [chamados, setChamados] = useState(initialValuesListaChamados);
  const history=useNavigate();
   useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado")
    if(usuarioLogado == null){
      history("/")
      return;
    }
    (async () => {

        await getChamados().then((res) => {
            setChamados(res.data);
            console.log(chamados);        
        })
            .catch((error) => {
                console.log(error)
            })
    })();

}, []);


  return(
    <div>
      <Header/>

      <div className="content">
        <Title nome="Atendimentos">
          <FiMessageSquare size={25} />
        </Title>

        {chamados.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum chamado registrado...</span>

            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>
          </div>
        )  : (
          <>
            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
           
              {chamados.map((value)=>(
                
                <tr key={value.id}>
                  <td data-label="Cliente">{value.nomeCliente}</td>
                  <td data-label="Assunto">{value.assunto}</td>
                  <td data-label="Status">
                    <span className="badge" style={{backgroundColor: '#5cb85c' }}>{value.status}</span>
                  </td>
                  <td data-label="Cadastrado">{value.cadastradoEm}</td>
                  <td data-label="#">
                    <button className="action" style={{backgroundColor: '#3583f6' }}>
                      <FiSearch color="#FFF" size={17} />
                    </button>
                    <button className="action" style={{backgroundColor: '#F6a935' }}>
                      <FiEdit2 color="#FFF" size={17} />
                    </button>
                  </td>
                </tr>
                
                ))}
              </tbody>
            </table>
          </>
        )}

      </div>

    </div>
  )
}