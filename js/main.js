$(function () {
  const cBig = document.getElementById('c1');
  const cSmall = document.getElementById('c2');

  const ctxBig = cBig.getContext('2d');
  const ctxSmall = cSmall.getContext('2d');

  ctxBig.fillStyle = 'white';
  ctxBig.fillRect(0, 0, cBig.width, cBig.height);

  drawStar(100, 200, ctxBig, 'red');
  drawStar(300, 200, ctxBig, 'blue');
  drawStar(500, 200, ctxBig, 'green');

  drawStar(200, 450, ctxBig, 'yellow');
  drawStar(400, 450, ctxBig, 'black');

  cBig.addEventListener('mouseup', function (e) {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;

    let color = ctxBig.getImageData(x, y, 1, 1).data;

    ctxSmall.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;
    ctxSmall.fillRect(0, 0, cSmall.width, cSmall.height);
  });
});

function drawStar(cx, cy, ctx, color) {
  const spikes = 5;
  const outerRadius = 70;
  const innerRadius = 35;

  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx,cy-outerRadius);

  for (let i=0; i<spikes; i+=1) {
    x=cx+Math.cos(rot)*outerRadius;
    y=cy+Math.sin(rot)*outerRadius;
    ctx.lineTo(x,y);
    rot+=step;

    x=cx+Math.cos(rot)*innerRadius;
    y=cy+Math.sin(rot)*innerRadius;
    ctx.lineTo(x,y);
    rot+=step;
  }

  ctx.lineTo(cx,cy-outerRadius);
  ctx.closePath();
  ctx.lineWidth=5;
  ctx.strokeStyle=color;
  ctx.stroke();
  ctx.fillStyle=color;
  ctx.fill();
}
