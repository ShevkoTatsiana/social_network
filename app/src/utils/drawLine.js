const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.pageXOffset,
      top: rect.top + window.pageYOffset,
      width: rect.width || el.offsetWidth,
      height: rect.height || el.offsetHeight
    };
}

export const drawLine = (div1, div2, color, thickness) => {
    const off1 = getOffset(div1);
    const off2 = getOffset(div2);
  
    const x1 = off1.left + off1.width/2;
    const y1 = off1.top + off1.height;
  
    const x2 = off2.left + off2.width/2;
    const y2 = off2.top;
  
    const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
  
    const cx = ((x1 + x2) / 2) - (length / 2);
    const cy = ((y1 + y2) / 2) - (thickness / 2);
  
    const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
  
    const div = document.createElement('div');
    const styleAttribute = `padding:0px; margin:0px; height: ${thickness}px; background-color: ${color}; line-height:1px; position:absolute; left: ${cx}px; top: ${cy}px; width: ${length}px; -moz-transform:rotate(${angle}deg); -webkit-transform:rotate(${angle}deg); -o-transform:rotate(${angle}deg); -ms-transform:rotate(${angle}deg); transform:rotate(${angle}deg);`
    div.setAttribute('style', styleAttribute);
    div.setAttribute('class', 'line');
    return div;
};

export const clearLines = () => {
    const lines = document.getElementsByClassName('line');
    while(lines.length > 0) {
        document.body.removeChild(lines[0])
    }
}
