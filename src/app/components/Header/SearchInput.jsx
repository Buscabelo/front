import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { MdClose, MdSearch } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

export default function SearchInput({ isShow, hide }) {
  const history = useHistory();
  const [value, setValue] = useState('');

  const handleSubmit = ({ preventDefault }) => {
    preventDefault();
    history.push('/pesquisa', { search: value });
  };

  const clearInput = () => {
    if (value) {
      setValue('');
    } else {
      hide();
    }
  };

  const renderIcon = () => {
    if (isMobile)
      return (
        <button type="button" className="searchicon" onClick={() => clearInput()}>
          <MdClose />
        </button>
      );

    return (
      <button type="submit" className="searchicon">
        <MdSearch />
      </button>
    );
  };

  if (!isShow)
    return null;

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        className="searchinput"
        placeholder="Busque por um serviço ou estabelecimento"
        onChange={({ target }) => setValue(target.value)}
      />
      {renderIcon()}
    </form>
  );
}
