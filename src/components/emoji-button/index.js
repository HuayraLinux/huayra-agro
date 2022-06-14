import Wrapper from './style';
import * as Emojis from 'assets/emojis';

export default ({ name, title, onClick, style, animate, disabled = false, size = '48px', src }) => {
  return (
    <Wrapper.Main
      onClick={disabled ? null : onClick}
      clickeable={onClick ? true : false }
      style={style}
      disabled={disabled}
      title={title}
      animate={animate}
    >
      <Wrapper.Img
        src={src}
        width={size}
        height={size}
        disabled={disabled}
      />
    </Wrapper.Main>
  );
};
