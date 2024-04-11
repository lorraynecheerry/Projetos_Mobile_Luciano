import { useState } from 'react'
import Modal from 'react-modal'

function App() {

  const [modalAberto, setModalAberto] = useState(false) //falso pq inicialmente ele começa fechado
  const [nome, setNome] = useState('')
  function abrirModal() {
    setModalAberto(true) //aqui setando ele para verdadeiro
  }

  function fecharModal() {
    setModalAberto(false) //aqui ele volta ao valor de origem,falso
  }

  function receberNome() {
    alert(nome)
  }

  return (
    <div>
      <h1>Aprendendo com modal</h1>
      <button onClick={abrirModal}> Abrir modal</button>
      <Modal isOpen={modalAberto}>

        <h1>modal esta Aberto</h1>
        <form onSubmit={receberNome}>

          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)} />

          <button onSubmit='receberNome'>enviar</button>
        </form>


        <button onClick={fecharModal}>fechar modal</button>
      </Modal>
    </div>
  );
}

export default App;



