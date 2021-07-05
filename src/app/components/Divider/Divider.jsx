export default function Divider({ size = 2, position = null, custom = null }) {
  let style = {
    border: 'none'
  }

  const capitalize = str => str && str[0].toUpperCase() + str.slice(1)
  size = size + 'rem';

  if (!custom) {
    if (position === 'horizontal') {
      style = {
        ...style,
        marginRight: size,
        marginLeft: size
      }
    } else if (position === 'vertical') {
      style = {
        ...style,
        marginTop: size,
        marginBottom: size
      }
    } else if (!!position) {
      style[`margin${capitalize(position)}`] = size;
    } else {
      style = {
        ...style,
        margin: size
      }
    }
  } else {
    style = custom;
  }

  return (
    <hr style={style}/>
  )
}
