import { fabric } from 'fabric';
import { Canvas, Group, IEvent } from 'fabric/fabric-impl';
import { useState, useEffect } from 'react';
import createAthleteBox from './createAthleteBox';

interface Position {x: number, y: number, angle: number}

const easeLinear = (t: number, b: number, c: number, d: number) => b + (t/d) * c;

const useMatEditor = (meterInPx: number) => {
  const [canvas, setCanvas] = useState<null | fabric.Canvas>(null)
  const [selectedObjects, setSelectedObject] = useState<fabric.Object[]>([])

  useEffect(() => {
      const bindEvents = (canvasToBind: fabric.Canvas) => {
      canvasToBind.on('selection:cleared', () => {
        setSelectedObject([])
      })
      canvasToBind.on('selection:created', (event: any) => {

      })
    }
    if (canvas) {
      bindEvents(canvas)
    }
  }, [canvas])


  const addAthlete = (name: string, { x, y, angle} : Position) => {
    if (canvas === null)
      return;
    const object = createAthleteBox(name, { meterInPx, x, y, angle });
    object.setControlsVisibility({
      tr: false,
      tl: false,
      br: false,
      bl: false,
      ml: false,
      mt: false,
      mr: false,
      mb: false,
    })
    canvas.add(object)
    var randomX = Math.round(Math.random()*350);
    var randomY = Math.round(Math.random()*350);
    object.animate({ left: randomX+100, top: randomY+100 },
      {
        duration: 500,
        onChange: canvas.renderAll.bind(canvas),
        easing: easeLinear
    })
  }

  return {
    selectedObjects,
    onReady: (canvasReady: fabric.Canvas): void => {
      setCanvas(canvasReady)
    },
    addRectAngle: addAthlete,
  }

}

export default useMatEditor;