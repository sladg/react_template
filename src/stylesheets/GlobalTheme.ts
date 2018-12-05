import { injectGlobal } from 'styled-components'

injectGlobal`
  *, :after, :before {
    box-sizing: border-box;
  }

  html {
    font-size: 10px;
  }

  /** Ultralight */
  @font-face {
    font-family: "SF";
    font-weight: 100;
    src:  url(${require('./fonts/SFUI/SF UI Display Ultralight.otf')});
  }

  @font-face {
    font-family: 'SF';
    font-weight: 300;
    src:  url(${require('./fonts/SFUI/SF UI Display Light.otf')});
  }

  @font-face {
    font-family: 'SF';
    font-weight: 400;
    src: url(${require('./fonts/SFUI/SF UI Display Regular.otf')});
  }

  @font-face {
    font-family: 'SF';
    font-weight: 500;
    src: url(${require('./fonts/SFUI/SF UI Display Medium.otf')});
  }

  @font-face {
    font-family: 'SF';
    font-weight: 700;
    src: url(${require('./fonts/SFUI/SF UI Display Bold.otf')});
  }

  body {
    font-family: 'SF';
  }

  h1 {
  }

  h2 {
  }

  h3 {
  }

  h4 {
  }

  .ant-message{
    z-index: 99999 !important;
  }

  .ant-modal-mask, .ant-modal-wrap {
    z-index: 1031;
  }
  .ant-switch-checked {
    background-color: #13cb65;
  }

 .ant-menu.ant-menu-dark .ant-menu-item-selected{
    background-color: inherit !important;
  }

`
