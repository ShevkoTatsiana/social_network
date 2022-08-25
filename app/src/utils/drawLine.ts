const getOffset = (el: HTMLElement ) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.pageXOffset,
      top: rect.top + window.pageYOffset,
      width: rect.width || el.offsetWidth,
      height: rect.height || el.offsetHeight
    };
}

export const drawLine = (div1: HTMLElement , div2: HTMLElement , color: string, thickness: number) => {
    const off1 = getOffset(div1);
    const off2 = getOffset(div2);
  
    const x1 = off1.left + off1.width/2;
    const y1 = off1.top + off1.height;
  
    const x2 = off2.left + off2.width/2;
    const y2 = off2.top;

    const length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1))) -thickness;
  
    const cx = (off1.width/2);
    const cy = ((off1.height));
    const horizontalPosition = (x1 < x2) ? `left: ${cx -length}px` : `right: ${cx}px`;
    const verticalPosition = (x1 < x2) ? `top: ${cy}px` : `top: ${cy - thickness}px`;
  
    const className = (x1 > x2) ? 'line to-left' : 'line to-right';
    
    const angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
  
    const div = document.createElement('div');
    const styleAttribute = `padding:0px; margin:0px; height: ${thickness}px; background-color: ${color}; line-height:1px; position:absolute; ${horizontalPosition}; ${verticalPosition}; width: ${length}px; -moz-transform:rotate(${angle}deg); -webkit-transform:rotate(${angle}deg); -o-transform:rotate(${angle}deg); -ms-transform:rotate(${angle}deg); transform:rotate(${angle}deg);`
    div.setAttribute('style', styleAttribute);
    div.setAttribute('class', className);
    return div;
};

export const clearLines = (el:HTMLElement | null) => {
    const lines = document.getElementsByClassName('line');
    [...lines].forEach((el) => el.remove());
}
