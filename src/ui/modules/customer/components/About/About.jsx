
export default function About({ provider, isShow, hide }) {
  const handleHidden = event => {
    event.preventDefault();
    hide();
  };

  if (provider && isShow) {
    return (
      <aside className='container-aside' role="dialog" aria-modal="true">
        <button className='btn about-provider-button' onClick={handleHidden}>X</button>
        <div className='container-aside-info'>
          <h1>Sobre</h1>
          {provider.description ? <p className="provider-description">{provider.description}</p> : <p className="provider-description">Não existe uma descrição desse estabelecimento</p>}
          <h2>Endereço</h2>
          {provider.address ? <p className="provider-description">{provider.address}</p> : <p className="provider-description">Não existe endereço cadastrado desse estabelecimento</p>}
        </div>
      </aside>
    );
  }

  return null;
}
