import React from 'react';
import { Button } from 'antd';
import PropTypes from "prop-types";
import styles from './styles.module.scss';

ButtonMASQ.prototype = {
  onClick: PropTypes.func.isRequired,
  textBtn: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  danger: PropTypes.bool
}

ButtonMASQ.defaultProps = {
  textBtn: 'OK',
  style: {},
  type: '',
  loading: false,
  disabled: false,
  danger: false,
  onClick: () => { }
}

function ButtonMASQ(props) {
  const type = props.textBtn === 'Cancel' ? '' : 'primary';
  // const [isHovered, setIsHovered] = useState(false);
  // const colorMappings = {
  //   '#2B3847': '#374B63',
  //   '#2F4858': '#374B63',
  //   '#6B7F8D': '#A1A7B3',
  //   '#D5DADD': '#E3EBEF',
  //   '#EBEDF3': '#F5F8FF',
  //   '#FFF': '#F8F8F8'
  // };
  // const defaultBackgroundColor = '#1a85f8';
  // const initialBackground = props.style.background || props.style.backgroundColor || defaultBackgroundColor;
  // const style = {
  //   ...props.style,
  //   background: isHovered ? colorMappings[initialBackground] || initialBackground : initialBackground,
  //   backgroundColor: isHovered ? colorMappings[initialBackground] || initialBackground : initialBackground
  // };

  return (
    <div className={styles.btnWrap}>
      <Button
        type={type}
        disabled={props.disabled}
        loading={props.loading}
        className={styles.btn}
        danger={props.danger}
        // style={style || ''}
        onClick={() => props.onClick()}
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
      >
        {props.textBtn}
      </Button>
    </div>
  );
}

export default ButtonMASQ
