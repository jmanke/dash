import css from './Test.module.css';

function Test() {
  return (
    <div slot='content' className={css.test}>
      Hello
    </div>
  );
}

export default Test;
