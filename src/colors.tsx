type Color = Record<number, string>;
type Colors = Record<string, Color>;

const colors: Colors = {
  teal: {
    400: 'rgb(45 212 191)',
  },
  rose: {
    400: 'rgb(251 113 133)',
  },
  orange: {
    400: 'rgb(251 146 60)',
  },
  slate: {
    100: 'rgb(241 245 249)',
    200: 'rgb(226 232 240)',
    300: 'rgb(203 213 225)',
    400: 'rgb(148 163 184)',
    500: 'rgb(100 116 139)',
    600: 'rgb(71 85 105)',
  },
  sky: {
    400: 'rgb(56 189 248)',
  },
};

export default colors;
