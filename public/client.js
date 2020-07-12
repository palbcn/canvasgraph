$(function () {
  const canvas = document.getElementById('graph');
  const ctx = canvas.getContext('2d');
  const MARGIN = 20;
  function drawValues(values) {
    let rangeX = [ 0, values.length ];
    let rangeY = [ Math.min(...values), Math.max(...values) ];
    function scaleInRange(val,range){
      return  ( val - range[0] ) / ( range[1]-range[0]);
    }
    function valueToXY(index,value) {
      return [ MARGIN + scaleInRange(index,rangeX)*(canvas.width-2*MARGIN),
               MARGIN + scaleInRange(value,rangeY)*(canvas.height-2*MARGIN) ];
    }
    ctx.beginPath();  
    ctx.moveTo(...valueToXY(0,values[0]));  
    for (let i = 0; i < values.length; i++)
      ctx.lineTo(...valueToXY(i,values[i]));
    ctx.stroke();
  }
  $.getJSON('/api/temperatures', result => drawValues(result.values));
});