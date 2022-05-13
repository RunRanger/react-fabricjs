import { fabric } from 'fabric';
import { useState } from 'react';
import { useEffect } from 'react';

const RectWithText = fabric.util.createClass(fabric.Rect, {
  type: 'rectWithText',
  text: null,
  textOffsetLeft: 0,
  textOffsetTop: 0,
  _prevObjectStacking: null,
  _prevAngle: 0,

  recalcTextPosition: function () {
    const sin = Math.sin(fabric.util.degreesToRadians(this.angle))
    const cos = Math.cos(fabric.util.degreesToRadians(this.angle))
    const newTop = sin * this.textOffsetLeft + cos * this.textOffsetTop
    const newLeft = cos * this.textOffsetLeft - sin * this.textOffsetTop
    const rectLeftTop = this.getPointByOrigin('left', 'top')
    this.text.set('left', rectLeftTop.x + newLeft)
    this.text.set('top', rectLeftTop.y + newTop)
  },
  
  initialize: function (rectOptions: fabric.IRectOptions, textOptions: fabric.ITextOptions, text: string) {
    this.callSuper('initialize', rectOptions)
    this.text = new fabric.Textbox(text, {
      ...textOptions,
      selectable: false,
      evented: false,
    })
    this.textOffsetLeft = this.text.left - this.left
    this.textOffsetTop = this.text.top - this.top
    this.on('moving', () => {
      this.recalcTextPosition()
    })
    this.on('rotating', () => {
      this.text.rotate(this.text.angle + this.angle - this._prevAngle)
      this.recalcTextPosition()
      this._prevAngle = this.angle
    })
    this.on('scaling', () => {
      this.recalcTextPosition()
    })
    this.on('added', () => {
      this.canvas.add(this.text)
    })
    this.on('removed', () => {
      this.canvas.remove(this.text)
    })
    this.on('mousedown:before', () => {
      this._prevObjectStacking = this.canvas.preserveObjectStacking
      this.canvas.preserveObjectStacking = true
    })
    this.on('mousedblclick', () => {
      this.text.selectable = true
      this.text.evented = true
      this.canvas.setActiveObject(this.text)
      this.text.enterEditing()
      this.selectable = false
    })
    this.on('deselected', () => {
      this.canvas.preserveObjectStacking = this._prevObjectStacking
    })
    this.text.on('editing:exited', () => {
      this.text.selectable = false
      this.text.evented = false
      this.selectable = true
    })
  }
})

const useMatEditor = () => {
  const [canvas, setCanvas] = useState<null | fabric.Canvas>(null)
  const [selectedObjects, setSelectedObject] = useState<fabric.Object[]>([])

  useEffect(() => {
    const bindEvents = (canvasToBind: fabric.Canvas) => {
      canvasToBind.on('selection:cleared', () => {
        setSelectedObject([])
      })
      canvasToBind.on('selection:created', (e: any) => {
        setSelectedObject(e.selected)
      })
      canvasToBind.on('selection:updated', (e: any) => {
        setSelectedObject(e.selected)
      })
    }
    if (canvas) {
      bindEvents(canvas)
    }
  }, [canvas])

  const addRectAngle = (name?: string) => {
    if (canvas === null)
      return;
    const object = new RectWithText({
      left: 10,
      top: 10,
      width: 40,
      height: 20,
      fill: 'blue',
      rx: 5,
      ry: 5,
      stroke: "red"
    }, {left: 35,
      top: 30,
      width: 150,
      fill: 'white',
      shadow: new fabric.Shadow({
        color: 'rgba(34, 34, 100, 0.4)',
        blur: 2,
        offsetX: -2,
        offsetY: 2
      }),
      fontSize: 30,}, "Test")
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
  }


  return {
    selectedObjects,
    onReady: (canvasReady: fabric.Canvas): void => {
      setCanvas(canvasReady)
    },
    addRectAngle
  }

}

export default useMatEditor;