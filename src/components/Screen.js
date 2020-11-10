import { ResizeObserver } from '@juggle/resize-observer';

import * as THREE from 'three';
import { useEffect, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Canvas, useFrame } from 'react-three-fiber';
import useKeyboard from '../hooks/useKeyboard';

var jsnes = require('jsnes');

window.ResizeObserver = window.ResizeObserver || ResizeObserver;

function Frame(props) {
  const width = 256;
  const height = 240;
  const size = useMemo(() => width * height, [width, height]);
  const data = useMemo(() => new Uint8Array( 3 * size ), [size]);
  const texture = useMemo(() => new THREE.DataTexture(data, width, height, THREE.RGBFormat), [data, width, height]);

  const nes = useMemo(() => new jsnes.NES({
    onFrame: (framebuffer_24) => {
      const data = new Uint8Array( 3 * size );
      for (let i=0; i<size; i++) {
        const stride = (size - i) * 3;
        const idx = Math.floor(i / width) * width + width - i % width;
        data[stride] = framebuffer_24[idx];
        data[stride+1] = framebuffer_24[idx] >> 8;
        data[stride+2] = framebuffer_24[idx] >> 16;
      }
      texture.image.data.set(data);
      texture.needsUpdate = true;
    }
  }), [texture, size]);

  const apiUrl = process.env.REACT_APP_API_URL;
  const romUrl = `${apiUrl}/roms/${props.id}`;
  let frame = useRef(() => null);

  useEffect(() => {
    var req = new XMLHttpRequest();
    req.withCredentials = true;
    req.open("GET", romUrl);
    req.overrideMimeType("text/plain; charset=x-user-defined");
    req.onerror = () => console.log(`Error loading ${romUrl}: ${req.statusText}`);

    req.onload = function() {
      if (this.status === 200) {
        nes.loadROM(this.responseText);
        frame.current = nes.frame;
      }
      else if (this.status === 401) {
        window.location.href = `${apiUrl}/login`;
      } else {
        req.onerror();
      }
    };
    req.send();
  }, [apiUrl, romUrl, nes]);

  useKeyboard(nes, {
    ArrowUp: jsnes.Controller.BUTTON_UP,
    ArrowDown: jsnes.Controller.BUTTON_DOWN,
    ArrowLeft: jsnes.Controller.BUTTON_LEFT,
    ArrowRight: jsnes.Controller.BUTTON_RIGHT,
    Enter: jsnes.Controller.BUTTON_START,
    Shift: jsnes.Controller.BUTTON_SELECT,
    x: jsnes.Controller.BUTTON_A,
    c: jsnes.Controller.BUTTON_B,
    z: jsnes.Controller.BUTTON_B,
  });

  useFrame(() => {
    frame.current();
  });

  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[8, 8]} />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  )
}

export function Screen() {
  const { id } = useParams();
  return (
    <Canvas className="w-full h-screen">
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <Frame id={id} />
    </Canvas>
  );
}