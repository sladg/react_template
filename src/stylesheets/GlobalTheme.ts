import { injectGlobal } from 'styled-components'

const screenXll = 1600
const screenXl = 1200
const screenLg = 992
const screenMd = 768
const screenSm = 576
const screenXs = 480

const theme = {
    colors: {
        primary: '#13CB65',
        secondary: '#4482FF',
        text: '#4B5161',
        textLabel: '#B6B6B6',
        white: '#fff',
        danger: '#FA6556',
        red: '#FF0000',
        dangerShadow: 'rgba(255, 0, 0, 0.2)',
        iconColor: 'rgba(255, 255, 255, 0.4)',
        submenuTitle: '#FAFAFA',
        facebookColor: '#3E5A9A',
        loginTitleText: '#4B5161',
        inputBorder: '#CCD1D6',
        navigationBackground: '#4B5161',
        lightsGrey: '#fbfbfb',
        menuItem: 'rgba(255,255,255,0.25);',
        background: '#E9EEF4',
        activeBackground: '#F5F5F5',
        borderColor: '#d9dee4',
        whiteActive: '#EFF1F4',
        orange: '#FAA40E',
        black: '#000000',
        badgeBackground: 'rgba(217, 222, 228, 0.58)',
        boxShadow: 'rgba(0, 0, 0, 0.14)',
        contentBackground: 'rgb(241, 243, 246)',
    },
    resolution: {
        screenXs: screenXs + 'px',
        screenXsMin: screenXs + 'px',
        screenXsMax: screenSm - 1 + 'px',
        screenSm: screenSm + 'px',
        screenSmMin: screenSm + 'px',
        screenSmMax: screenMd - 1 + 'px',
        screenMd: screenMd + 'px',
        screenMdMin: screenMd + 'px',
        screenMdMax: screenLg - 1 + 'px',
        screenLg: screenLg + 'px',
        screenLgMin: screenLg + 'px',
        screenLgMax: screenXl - 1 + 'px',
        screenXl: screenXl + 'px',
        screenXlMin: screenXl + 'px',
        screenXlMax: screenXll - 1 + 'px',
        screenXll: screenXll + 'px',
        screenXllMin: screenXll + 'px',
    },
    fontFamily: {
        global: 'SF',
    },
}

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
    font-family: ${theme.fontFamily.global};
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

export default theme
