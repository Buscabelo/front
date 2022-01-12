const defaultSize = 2;
const minSliceIndex = 1;

export default function Divider({ size = defaultSize, position = null, custom = null }) {
  let style = {
    border: 'none'
  };

  const capitalize = str => {
    if (str) {
      const [first,] = str;

      return first.toUpperCase() + str.slice(minSliceIndex);
    }

    return str;
  };

  size = size + 'rem';

  if (!custom) {
    if (position === 'horizontal') {
      style = {
        ...style,
        marginRight: size,
        marginLeft: size
      };
    } else if (position === 'vertical') {
      style = {
        ...style,
        marginTop: size,
        marginBottom: size
      };
    } else if (position) {
      style[`margin${capitalize(position)}`] = size;
    } else {
      style = {
        ...style,
        margin: size
      };
    }
  } else {
    style = custom;
  }

  return (
    <hr style={style} />
  );
}
