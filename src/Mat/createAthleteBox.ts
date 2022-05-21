import { fabric } from 'fabric';

interface Options {
  x: number,
  y: number,
  angle: number,
  meterInPx: number
}

const createAthleteBox = (text: string,  { x,y,angle, meterInPx}: Options) => {
  
  const width = meterInPx * 0.8;
  const height = meterInPx * 0.4;
  const rect = new fabric.Rect({
    width,
    height,
    fill: 'yellow',
    rx: 5,
    ry: 5,
    stroke: "red"
  });

  const textC = new fabric.Text(text, {
    fontSize: 15,
    originX: 'center',
    originY: 'center',
    left: width / 2,
    top: height / 2,
    fontFamily: 'Roboto'
  });

  return new fabric.Group([rect, textC], {
    left: x,
    top: y,
    angle: angle
  });

}


export default createAthleteBox;