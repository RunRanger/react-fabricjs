import { useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import drawMat from './drawMat';

interface Options {
  height: number,
  width: number,
  backgroundColor: string,
  lineColor: string,
  lines?: number
}

interface ICanvasProps {
  options: Options,
  onReady?: (canvas: fabric.Canvas) => void
}

export default function Mat({ options, onReady }: ICanvasProps) {
  const { height, width, backgroundColor, lineColor } = options;
  const lines = options.lines === undefined ? 6: options.lines;

  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = new fabric.Canvas(ref.current)
    onReady && onReady(canvas);
    const setCurrentDimensions = () => {
        canvas.setHeight(height);
        canvas.setWidth(width);
        canvas.renderAll()
    }
    canvas.backgroundColor = backgroundColor;
    canvas.renderAll()
    drawMat(canvas, lines, lineColor, 3);


    const resizeCanvas = () => {
        setCurrentDimensions()
      }
    setCurrentDimensions()

    window.addEventListener('resize', resizeCanvas, false)



    return () => {
      canvas.dispose()
      window.removeEventListener('resize', resizeCanvas)
    }

  }, [ref]);



  return (
      <canvas ref={ref}>

      </canvas>
  );
}

