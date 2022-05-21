import { fabric } from 'fabric';
import { useState, useEffect } from 'react';
import createAthleteBox from './createAthleteBox';

interface Position {x: number, y: number, angle: number}

const easeLinear = (t: number, b: number, c: number, d: number) => b + (t / d) * c;
const GRID = 5;

const setGroupConfigs = (group: fabric.Group) => {
  group.set({
    snapAngle: 22.5
  })
  group.setControlsVisibility({
    tr: false,
    tl: false,
    br: false,
    bl: false,
    ml: false,
    mt: false,
    mr: false,
    mb: false,
  })
}


const useMatEditor = (meterInPx: number) => {
  const [canvas, setCanvas] = useState<null | fabric.Canvas>(null)
  const [selectedObjects, setSelectedObject] = useState<fabric.Object[]>([])

  useEffect(() => {
    const bindEvents = (canvasToBind: fabric.Canvas) => {
      canvasToBind.on('selection:cleared', () => {
        setSelectedObject([])
      })
      canvasToBind.on('selection:created', (event: any) => {
        const { selected } = event;
        if (selected.length > 1)
          setGroupConfigs(selected[0].group)
        setSelectedObject(selected)
      })
      canvasToBind.on('selection:updated', (event: any) => {
          const { selected } = event;
          setSelectedObject(selected)
      })
      canvasToBind.on('object:moving', function(options: any) { 
        options.target.set({
          left: Math.round(options.target.left / GRID) * GRID,
          top: Math.round(options.target.top / GRID) * GRID
        });
      });
    }
    if (canvas) {
      bindEvents(canvas)
    }
  }, [canvas])


  const addAthlete = (name: string, { x, y, angle} : Position) => {
    if (canvas === null)
      return;
    const object = createAthleteBox(name, { meterInPx, x, y, angle });
    setGroupConfigs(object)
    canvas.add(object)
  }

  return {
    selectedObjects,
    onReady: (canvasReady: fabric.Canvas): void => {
      setCanvas(canvasReady)
    },
    addAthlete,
  }
}

export default useMatEditor;