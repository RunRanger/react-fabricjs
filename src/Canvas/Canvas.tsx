import { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

interface ICanvasProps {
  height: number,
  width: number,
  onReady?: (canvas: fabric.Canvas) => void
}

export default function Canvas ({height, width, onReady}: ICanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = new fabric.Canvas(ref.current)
    onReady && onReady(canvas);
    const setCurrentDimensions = () => {
        canvas.setHeight(height);
        canvas.setWidth(width);
        canvas.renderAll()
    }

    canvas.backgroundColor = "green"
    canvas.renderAll()


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

