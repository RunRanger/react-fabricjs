import { fabric } from 'fabric';
const drawMat = (canvas: fabric.Canvas, lines: number, lineColor: string, thickness: number) => {

  const distance = (canvas.width! - thickness * lines) / (lines+1);

  for (let i = 0; i < lines; i++)
  {
    const line = new fabric.Rect({
      width: thickness,
      height: canvas.height,
      left: distance*(i+1) + thickness*i,
      top: 0,
      fill: lineColor,
      selectable: false,
      evented: false
    });
    canvas.add(line)
  }


  //Draw Cross
  if (lines % 2 === 0)
  {
    const crossLength = thickness * 4
    const line1 = new fabric.Rect({
      width: crossLength,
      height: thickness,
      left: canvas.width! / 2 - (crossLength / 2),
      top: canvas.height! / 2 - thickness / 2,
      fill: lineColor,
      selectable: false,
      evented: false
    })
    canvas.add(line1)
    const line2 = new fabric.Rect({
      width: thickness,
      height: crossLength,
      left: canvas.width! / 2 - thickness / 2,
      top: canvas.height! / 2 - (crossLength / 2),
      fill: lineColor,
      selectable: false,
      evented: false
    })
    canvas.add(line2)

  }
}

export default drawMat;
