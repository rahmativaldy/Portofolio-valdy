'use client';

import React, { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// MotionSites-inspired Vibrant Liquid Cosmic Palette
const vec3 COLOR_VOID    = vec3(0.02, 0.03, 0.06);  // Deep Dark Void #050810
const vec3 COLOR_NAVY    = vec3(0.04, 0.08, 0.22);  // Rich Midnight Blue #0A1438
const vec3 COLOR_BLUE    = vec3(0.12, 0.32, 0.88);  // Electric Royal Blue #1F52E0
const vec3 COLOR_PURPLE  = vec3(0.42, 0.15, 0.85);  // Deep Glowing Violet #6B26D9
const vec3 COLOR_CYAN    = vec3(0.00, 0.85, 0.98);  // Vivid Neon Cyan #00D9F9

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}

// 2D Simplex Noise
float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,   // (3.0 - sqrt(3.0)) / 6.0
    0.366025403784439,   // 0.5 * (sqrt(3.0) - 1.0)
   -0.577350269189626,   // -1.0 + 2.0 * C.x
    0.024390243902439    // 1.0 / 41.0
  );

  // First corner
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  // Other corners
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + vec4(C.xx, C.zz);
  x12.xy -= i1;

  // Permutations
  i = mod289(i);
  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)),
    0.0
  );
  m = m * m;
  m = m * m;

  // Gradients
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  // Normalise gradients
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  // Compute final noise value
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Fractional Brownian Motion for layered liquid turbulence
float fbm(vec2 p) {
  float val = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < 4; i++) {
    val += amp * snoise(p * freq);
    freq *= 2.02;
    amp *= 0.5;
  }
  return val;
}

void main() {
  // Aspect ratio normalized coordinates
  vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  // Time evolution
  float t = u_time * 0.08;

  // Interactive Cursor Light Ripple
  float distToMouse = length(st - u_mouse);
  float mouseGlow = exp(-distToMouse * 3.2) * 0.7;
  vec2 mouseRipple = vec2(
    sin(distToMouse * 12.0 - u_time * 2.5),
    cos(distToMouse * 12.0 - u_time * 2.5)
  ) * (mouseGlow * 0.25);

  // Domain Warping Liquid Dynamics
  vec2 q = vec2(0.0);
  q.x = fbm(st * 1.3 + mouseRipple + vec2(0.0, t * 0.35));
  q.y = fbm(st * 1.3 + mouseRipple + vec2(2.1, t * 0.25));

  vec2 r = vec2(0.0);
  r.x = fbm(st * 1.5 + 2.2 * q + vec2(1.7, t * 0.45));
  r.y = fbm(st * 1.5 + 2.2 * q + vec2(6.2, t * 0.3));

  float f = fbm(st * 1.6 + 2.6 * r);

  // Glowing Arc Ribbon Effect (MotionSites style liquid light sweep)
  float arcLine = sin(st.x * 1.8 + st.y * 1.2 + f * 3.0 + t * 0.5);
  float arcGlow = 0.04 / (abs(arcLine) + 0.06);

  // Color Composition
  vec3 color = mix(COLOR_VOID, COLOR_NAVY, clamp(f * 1.8, 0.0, 1.0));
  color = mix(color, COLOR_BLUE, clamp(pow(f, 2.0) * 2.2, 0.0, 1.0));
  color = mix(color, COLOR_PURPLE, clamp(length(q) * 0.75, 0.0, 1.0));

  // Add vibrant cyan arc sweeps and cursor light
  color += COLOR_CYAN * (pow(clamp(r.x, 0.0, 1.0), 2.5) * 0.9);
  color += COLOR_CYAN * (arcGlow * 0.25);
  color += (COLOR_CYAN * 0.6 + COLOR_BLUE * 0.4) * mouseGlow;

  // Dark contrast mask for text legibility on top-left, glowing arc emphasis on bottom-right
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float textProtect = smoothstep(0.0, 0.75, uv.x * (1.0 - uv.y));
  float backgroundDimmer = mix(0.65, 1.0, textProtect);

  // Vignette
  float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
  vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);

  color *= backgroundDimmer * vignette;

  gl_FragColor = vec4(color, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Initialize WebGL Context with low-power preference
    const gl = (canvas.getContext('webgl', {
      alpha: false,
      depth: false,
      antialias: false,
      powerPreference: 'low-power',
    }) || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

    if (!gl) {
      console.warn('WebGL not supported, falling back to static dark background.');
      return;
    }

    // 2. Compile Shaders & Link Program
    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = createProgram(gl, vs, fs);
    if (!program) return;

    gl.useProgram(program);

    // 3. Create Fullscreen Quad Buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLocation);
    gl.vertexAttribPointer(posLocation, 2, gl.FLOAT, false, 0, 0);

    // 4. Uniform Locations
    const resLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    const timeLocation = gl.getUniformLocation(program, 'u_time');

    // Mouse tracking for fluid interactivity
    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = canvas.clientHeight - (e.clientY - rect.top);

      const minDim = Math.min(canvas.clientWidth, canvas.clientHeight);
      targetMouse.x = (rawX - 0.5 * canvas.clientWidth) / minDim;
      targetMouse.y = (rawY - 0.5 * canvas.clientHeight) / minDim;
    };

    window.addEventListener('pointermove', handlePointerMove);

    // 5. Handle Resize with ResizeObserver & DPR capping (max 1.5)
    let animationFrameId: number | null = null;
    const startTime = performance.now();

    const updateCanvasSize = () => {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
        if (resLocation) {
          gl.uniform2f(resLocation, displayWidth, displayHeight);
        }
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });

    resizeObserver.observe(canvas);
    updateCanvasSize();

    // 6. Check Reduced Motion User Preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 7. Render Loop
    const render = (now: number) => {
      if (!gl || !program) return;

      // Smooth lerp mouse position
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.06;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.06;
      if (mouseLocation) {
        gl.uniform2f(mouseLocation, currentMouse.x, currentMouse.y);
      }

      const elapsed = (now - startTime) / 1000;
      if (timeLocation) {
        gl.uniform1f(timeLocation, elapsed);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      render(startTime);
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    // 8. Cleanup WebGL resources on unmount
    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      resizeObserver.disconnect();

      if (gl) {
        gl.useProgram(null);
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
        if (program) gl.deleteProgram(program);
      }
    };
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden -z-10 bg-[#0A0A0A] pointer-events-none select-none"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}
