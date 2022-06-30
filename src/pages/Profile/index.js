
import { useState, useContext } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import avatar from '../../assets/avatar.png';
import { AuthContext } from '../../contexts/auth';
import { FiSettings, FiUpload } from 'react-icons/fi';
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';
import { cadastrarUsuario} from '../../services/api';
import cx from 'classnames'
import styles from './styles.module.css';

export default function Profile(){
  const { user, signOut, setUser, setLocalUser} = useContext(AuthContext);

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar]=useState(null);
  const [loading, setLoading] = useState(false);
  const [statusCreateUsuario, setStatusCreateUsuario] = useState({
    status: ''
});


function handleFile(e){
  
}

 async function handleSave(e){
    e.preventDefault();
  }

  async function handleUpload(){
   
  }

  const salvarUsuario = async () => {
    console.log(nome, email);
  

    try {

   await cadastrarUsuario(nome, email);
    setLoading(true);
    
    setStatusCreateUsuario({
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
        setStatusCreateUsuario({
            status: 400
        })
        
    }
}
  return(
    <div>
      <Header/>

      <div className="content">
        <Title nome="Meu perfil">
          <FiSettings size={25} />
        </Title>


        <div className={styles.container}>
          <form onSubmit={(e)=>handleSave(e)} className={styles.formProfile}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#000" size={25} />
              </span>

              <input type="file" accept="image/*" onChange={handleFile}/><br/>
              { avatarUrl === null ? 
                <img src={avatar} width="250" height="250" alt="Foto de perfil do usuario" />
                :
                <img src={avatarUrl} width="250" height="250" alt="Foto de perfil do usuario" />
              }
            </label>

            <label>Nome</label>
            <input type="text" name='nome' value={nome}  onChange={ (e) => setNome(e.target.value) } />

            <label>Email</label>
            <input type="text" name='email' value={email} onChange={ (e) => setEmail(e.target.value) } disabled={false} />     

            <button type="submit" onClick={() => salvarUsuario()}>Salvar</button>  
            {loading === true ? <div className={styles.msgSucesso}>Usuário salvo com sucesso!</div> : null}
            {statusCreateUsuario.status === 400 ? <div className={styles.msgErroCreateCliente}>Erro ao cadastrar o Usuário</div> : null}     

          </form>
        </div>

        <div className={styles.container}>
            <button className="logout-btn" onClick={ () => signOut() } >
               Sair 
            </button>
        </div>

      </div>
    </div>
  )
}