import PropTypes from 'prop-types';
import s from './Button.module.css';

export default function Button({ loag }) {
  return (
    <button
      className={s.Button}
      aria-label="Load more"
      type="button"
      onClick={loag}
    >
      Load more
    </button>
  );
}
Button.propTypes = {
  loag: PropTypes.func,
};
