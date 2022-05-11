import { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

interface ICanvasProps {
    height: number,
    width: number
}


export const STROKE = '#000000'
export const FILL = 'rgba(255, 255, 255, 0.0)'
export const CIRCLE = {
    radius: 250,
    left: 0,
    top: 0,
    fill: FILL,
    stroke: STROKE
  }

export default function Canvas ({height, width}: ICanvasProps) {
    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = new fabric.Canvas(ref.current)

        const setCurrentDimensions = () => {
            canvas.setHeight(height);
            canvas.setWidth(width);
            canvas.renderAll()
        }

        canvas.backgroundColor = "cyan"
        canvas.renderAll()


        const resizeCanvas = () => {
            setCurrentDimensions()
          }
        setCurrentDimensions()
    
        window.addEventListener('resize', resizeCanvas, false)
    
        const addCircle = () => {
            const object = new fabric.Circle({
              ...CIRCLE,
              fill: "yellow",
              stroke: "red"
            })
            canvas.add(object)
          }  
          
        addCircle()
    
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
