import React, { useState, useRef, useEffect } from 'react';
import { 
  Move, Square, Circle, Type, PenTool, Image, Sliders, 
  Minus, Maximize, X, ChevronDown, ChevronRight, 
  Layers, Figma, Share2, Code, Settings, Eye, Lock 
} from 'lucide-react';

const FigmaWindow = () => {
  const [activeTool, setActiveTool] = useState('select');
  const [zoom, setZoom] = useState(100);
  const [layersVisible, setLayersVisible] = useState(true);
  const [propertiesVisible, setPropertiesVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 300, height: 200 });
  const dragRef = useRef(null);

  const tools = [
    { id: 'select', icon: Move, name: 'Move' },
    { id: 'rectangle', icon: Square, name: 'Rectangle' },
    { id: 'ellipse', icon: Circle, name: 'Ellipse' },
    { id: 'text', icon: Type, name: 'Text' },
    { id: 'pen', icon: PenTool, name: 'Pen' },
    { id: 'image', icon: Image, name: 'Image' },
  ];

  // Handle drag for elements
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPosition({
      x: dragRef.current.startPosX + dx,
      y: dragRef.current.startPosY + dy
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Sample layers data
  const layers = [
    { id: '1', name: 'Frame 1', type: 'frame', visible: true, locked: false },
    { id: '2', name: 'Rectangle 1', type: 'rectangle', visible: true, locked: false },
    { id: '3', name: 'Text 1', type: 'text', visible: true, locked: true },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Menu Bar */}
      <div className="bg-white border-b flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-4">
          <Figma className="h-5 w-5 text-pink-600" />
          <span className="font-medium">Untitled</span>
        </div>
        <div className="flex space-x-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <Share2 className="h-4 w-4" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Code className="h-4 w-4" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-12 bg-white border-r flex flex-col items-center py-4 space-y-4">
          {tools.map(tool => (
            <button
              key={tool.id}
              className={`p-2 rounded ${activeTool === tool.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTool(tool.id)}
              title={tool.name}
            >
              <tool.icon className="h-5 w-5" />
            </button>
          ))}
          <div className="border-t w-full my-2"></div>
          <button className="p-2 rounded hover:bg-gray-100" title="Sliders">
            <Sliders className="h-5 w-5" />
          </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-gray-50 relative overflow-auto">
          <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px]">
            {/* Draggable Element */}
            <div
              className="absolute border-2 border-blue-400 bg-blue-100/30 flex items-center justify-center cursor-move"
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
              }}
              onMouseDown={handleMouseDown}
            >
              <span className="text-xs bg-white px-2 py-1 rounded">
                {size.width} × {size.height}
              </span>
              
              {/* Resize Handles */}
              <div 
                className="absolute right-0 bottom-0 w-3 h-3 bg-blue-500 cursor-nwse-resize"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  const startSize = { ...size };
                  const startPos = { x: e.clientX, y: e.clientY };
                  
                  const handleMouseMove = (e) => {
                    setSize({
                      width: startSize.width + (e.clientX - startPos.x),
                      height: startSize.height + (e.clientY - startPos.y)
                    });
                  };
                  
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };
                  
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Panels */}
        <div className="w-64 bg-white border-l flex flex-col">
          {/* Properties Panel */}
          <div className="border-b">
            <div 
              className="flex items-center justify-between p-3 cursor-pointer"
              onClick={() => setPropertiesVisible(!propertiesVisible)}
            >
              <span className="font-medium">Properties</span>
              {propertiesVisible ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </div>
            {propertiesVisible && (
              <div className="p-3 space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Size</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text" 
                      value={size.width} 
                      onChange={(e) => setSize({...size, width: parseInt(e.target.value) || 0})}
                      className="border px-2 py-1 text-sm rounded"
                    />
                    <input 
                      type="text" 
                      value={size.height} 
                      onChange={(e) => setSize({...size, height: parseInt(e.target.value) || 0})}
                      className="border px-2 py-1 text-sm rounded"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Position</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text" 
                      value={position.x} 
                      onChange={(e) => setPosition({...position, x: parseInt(e.target.value) || 0})}
                      className="border px-2 py-1 text-sm rounded"
                    />
                    <input 
                      type="text" 
                      value={position.y} 
                      onChange={(e) => setPosition({...position, y: parseInt(e.target.value) || 0})}
                      className="border px-2 py-1 text-sm rounded"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Layers Panel */}
          <div className="flex-1 overflow-auto">
            <div 
              className="flex items-center justify-between p-3 cursor-pointer"
              onClick={() => setLayersVisible(!layersVisible)}
            >
              <span className="font-medium">Layers</span>
              {layersVisible ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </div>
            {layersVisible && (
              <div className="px-2 pb-3 space-y-1">
                {layers.map(layer => (
                  <div key={layer.id} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                    <div className="flex items-center space-x-2">
                      <Layers className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{layer.name}</span>
                    </div>
                    <div className="flex space-x-1">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Lock className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-white border-t flex items-center justify-between px-3 py-1 text-sm">
        <div className="flex items-center space-x-4">
          <span>X: {position.x}</span>
          <span>Y: {position.y}</span>
        </div>
        <div className="flex items-center space-x-2">
          <select 
            value={zoom} 
            onChange={(e) => setZoom(parseInt(e.target.value))}
            className="border-none bg-transparent py-1"
          >
            {[50, 100, 150, 200].map(level => (
              <option key={level} value={level}>{level}%</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FigmaWindow;