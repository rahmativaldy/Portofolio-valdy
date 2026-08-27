'use client';

import React, { useEffect, useRef } from 'react';
import {
  Vector3,
  MeshPhysicalMaterial,
  InstancedMesh,
  Timer,
  AmbientLight,
  SphereGeometry,
  Scene,
  Color,
  Object3D,
  SRGBColorSpace,
  MathUtils,
  PMREMGenerator,
  Vector2,
  WebGLRenderer,
  PerspectiveCamera,
  PointLight,
  ACESFilmicToneMapping,
  Plane,
  Raycaster,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface BallpitConfig {
  count: number;
  colors: (string | number)[];
  ambientColor: number;
  ambientIntensity: number;
  lightIntensity: number;
  materialParams: {
    metalness: number;
    roughness: number;
    clearcoat: number;
    clearcoatRoughness: number;
  };
  minSize: number;
  maxSize: number;
  size0: number;
  gravity: number;
  friction: number;
  wallBounce: number;
  maxVelocity: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  controlSphere0: boolean;
  followCursor: boolean;
}

export interface BallpitProps {
  className?: string;
  count?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  maxVelocity?: number;
  minSize?: number;
  maxSize?: number;
  size0?: number;
  followCursor?: boolean;
  colors?: (string | number)[];
  ambientIntensity?: number;
  lightIntensity?: number;
}

// Subtle monochrome zinc palettes tailored for Rahmat Workspace
const DARK_THEME_PALETTE = ['#27272a', '#3f3f46', '#18181b', '#52525b', '#202024', '#2e2e36'];
const LIGHT_THEME_PALETTE = ['#a1a1aa', '#d4d4d8', '#71717a', '#e4e4e7', '#cbd5e1', '#b8b8c2'];

const DEFAULT_CONFIG: BallpitConfig = {
  count: 34,
  colors: DARK_THEME_PALETTE,
  ambientColor: 0x27272a,
  ambientIntensity: 0.75,
  lightIntensity: 45,
  materialParams: {
    metalness: 0.25,
    roughness: 0.65,
    clearcoat: 0.15,
    clearcoatRoughness: 0.4,
  },
  minSize: 0.45,
  maxSize: 1.0,
  size0: 1.3,
  gravity: 0.07,
  friction: 0.992,
  wallBounce: 0.85,
  maxVelocity: 0.05,
  maxX: 5,
  maxY: 5,
  maxZ: 2,
  controlSphere0: false,
  followCursor: true,
};

// Safe WebGL capability detector
export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    return !!(gl && typeof (gl as WebGLRenderingContext).getParameter === 'function');
  } catch {
    return false;
  }
}

class ThreeContext {
  canvas: HTMLCanvasElement;
  camera!: PerspectiveCamera;
  cameraMinAspect?: number;
  cameraMaxAspect?: number;
  cameraFov!: number;
  maxPixelRatio = 1.5;
  minPixelRatio = 1;
  scene!: Scene;
  renderer!: WebGLRenderer;
  size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };
  onBeforeRender: (time: { elapsed: number; delta: number }) => void = () => {};
  onAfterResize: (size: { width: number; height: number; wWidth: number; wHeight: number; ratio: number; pixelRatio: number }) => void = () => {};
  isDisposed = false;

  private isIntersecting = false;
  private isRunning = false;
  private resizeTimeout: NodeJS.Timeout | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private timer = new Timer();
  private timeData = { elapsed: 0, delta: 0 };
  private rafId: number | null = null;

  private boundResize = this.onResizeDebounced.bind(this);
  private boundVisibilityChange = this.onVisibilityChange.bind(this);
  private boundContextLost = this.onContextLost.bind(this);

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.initCamera();
    this.initScene();
    this.initRenderer();
    this.resize();
    this.initObservers();
  }

  private initCamera() {
    this.camera = new PerspectiveCamera(45, 1, 0.1, 100);
    this.cameraFov = this.camera.fov;
  }

  private initScene() {
    this.scene = new Scene();
  }

  private initRenderer() {
    this.canvas.style.display = 'block';

    // Safely acquire rendering context with fallback
    const gl =
      this.canvas.getContext('webgl2', { alpha: true, antialias: true, powerPreference: 'high-performance' }) ||
      this.canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'high-performance' }) ||
      this.canvas.getContext('experimental-webgl');

    if (!gl) {
      throw new Error('WebGL rendering context could not be created');
    }

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      context: gl as WebGL2RenderingContext | WebGLRenderingContext,
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    this.renderer.outputColorSpace = SRGBColorSpace;
  }

  private onContextLost(event: Event) {
    event.preventDefault();
    this.stopLoop();
  }

  private initObservers() {
    this.canvas.addEventListener('webglcontextlost', this.boundContextLost, false);

    window.addEventListener('resize', this.boundResize);
    if (this.canvas.parentNode) {
      this.resizeObserver = new ResizeObserver(this.boundResize);
      this.resizeObserver.observe(this.canvas.parentNode as Element);
    }
    this.intersectionObserver = new IntersectionObserver(this.onIntersection.bind(this), {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    });
    this.intersectionObserver.observe(this.canvas);
    document.addEventListener('visibilitychange', this.boundVisibilityChange);
  }

  private removeObservers() {
    this.canvas.removeEventListener('webglcontextlost', this.boundContextLost);
    window.removeEventListener('resize', this.boundResize);
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    document.removeEventListener('visibilitychange', this.boundVisibilityChange);
  }

  private onIntersection(entries: IntersectionObserverEntry[]) {
    this.isIntersecting = entries[0]?.isIntersecting ?? false;
    if (this.isIntersecting) {
      this.startLoop();
    } else {
      this.stopLoop();
    }
  }

  private onVisibilityChange() {
    if (this.isIntersecting) {
      if (document.hidden) {
        this.stopLoop();
      } else {
        this.startLoop();
      }
    }
  }

  private onResizeDebounced() {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(this.resize.bind(this), 100);
  }

  resize() {
    if (this.isDisposed || !this.renderer) return;
    let width = window.innerWidth;
    let height = window.innerHeight;

    if (this.canvas.parentNode) {
      const parent = this.canvas.parentNode as HTMLElement;
      width = parent.offsetWidth || width;
      height = parent.offsetHeight || height;
    }

    if (width === 0 || height === 0) return;

    this.size.width = width;
    this.size.height = height;
    this.size.ratio = width / height;

    this.updateCamera();
    this.updateRenderer();
    this.onAfterResize(this.size);
  }

  private updateCamera() {
    this.camera.aspect = this.size.width / this.size.height;
    if (this.cameraFov) {
      if (this.cameraMinAspect && this.camera.aspect < this.cameraMinAspect) {
        this.adjustFov(this.cameraMinAspect);
      } else if (this.cameraMaxAspect && this.camera.aspect > this.cameraMaxAspect) {
        this.adjustFov(this.cameraMaxAspect);
      } else {
        this.camera.fov = this.cameraFov;
      }
    }
    this.camera.updateProjectionMatrix();
    this.updateWorldSize();
  }

  private adjustFov(targetAspect: number) {
    const tanFov = Math.tan(MathUtils.degToRad(this.cameraFov / 2)) / (this.camera.aspect / targetAspect);
    this.camera.fov = 2 * MathUtils.radToDeg(Math.atan(tanFov));
  }

  updateWorldSize() {
    const fovRad = (this.camera.fov * Math.PI) / 180;
    this.size.wHeight = 2 * Math.tan(fovRad / 2) * this.camera.position.length();
    this.size.wWidth = this.size.wHeight * this.camera.aspect;
  }

  private updateRenderer() {
    if (!this.renderer) return;
    this.renderer.setSize(this.size.width, this.size.height, false);
    let dpr = window.devicePixelRatio || 1;
    if (this.maxPixelRatio && dpr > this.maxPixelRatio) {
      dpr = this.maxPixelRatio;
    } else if (this.minPixelRatio && dpr < this.minPixelRatio) {
      dpr = this.minPixelRatio;
    }
    this.renderer.setPixelRatio(dpr);
    this.size.pixelRatio = dpr;
  }

  startLoop() {
    if (this.isRunning || this.isDisposed || !this.renderer) return;
    const animate = () => {
      this.rafId = requestAnimationFrame(animate);
      this.timer.update();
      this.timeData.delta = Math.min(this.timer.getDelta(), 0.04);
      this.timeData.elapsed += this.timeData.delta;
      this.onBeforeRender(this.timeData);
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    };
    this.isRunning = true;
    this.timer.reset();
    animate();
  }

  stopLoop() {
    if (this.isRunning) {
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      this.isRunning = false;
    }
  }

  renderSingleFrame() {
    if (this.isDisposed || !this.renderer || !this.scene || !this.camera) return;
    this.renderer.render(this.scene, this.camera);
  }

  clear() {
    if (!this.scene) return;
    this.scene.traverse((obj) => {
      const mesh = obj as InstancedMesh;
      if (mesh.isMesh) {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if ('envMap' in mat && mat.envMap && typeof (mat.envMap as { dispose?: () => void }).dispose === 'function') {
                (mat.envMap as { dispose: () => void }).dispose();
              }
              mat.dispose();
            });
          } else {
            if ('envMap' in mesh.material && mesh.material.envMap && typeof (mesh.material.envMap as { dispose?: () => void }).dispose === 'function') {
              (mesh.material.envMap as { dispose: () => void }).dispose();
            }
            mesh.material.dispose();
          }
        }
      }
    });
    this.scene.clear();
  }

  dispose() {
    this.isDisposed = true;
    this.removeObservers();
    this.stopLoop();
    this.timer.dispose();
    this.clear();
    if (this.renderer) {
      try {
        this.renderer.dispose();
        this.renderer.forceContextLoss();
      } catch {
        // Safe disposal fallback
      }
    }
  }
}

// Global interaction manager with passive pointer movement
interface InteractionHandler {
  position: Vector2;
  nPosition: Vector2;
  hover: boolean;
  onEnter: () => void;
  onMove: () => void;
  onLeave: () => void;
  dispose: () => void;
}

const activeInteractions = new Map<HTMLElement, InteractionHandler>();
const cursorClientPos = new Vector2();
let isGlobalPointerBound = false;

function handleGlobalPointerMove(event: PointerEvent) {
  cursorClientPos.x = event.clientX;
  cursorClientPos.y = event.clientY;
  processInteractions();
}

function handleGlobalPointerLeave() {
  for (const handler of activeInteractions.values()) {
    if (handler.hover) {
      handler.hover = false;
      handler.onLeave();
    }
  }
}

function processInteractions() {
  for (const [elem, handler] of activeInteractions) {
    const rect = elem.getBoundingClientRect();
    const isInside =
      cursorClientPos.x >= rect.left &&
      cursorClientPos.x <= rect.right &&
      cursorClientPos.y >= rect.top &&
      cursorClientPos.y <= rect.bottom;

    if (isInside) {
      handler.position.x = cursorClientPos.x - rect.left;
      handler.position.y = cursorClientPos.y - rect.top;
      handler.nPosition.x = (handler.position.x / Math.max(1, rect.width)) * 2 - 1;
      handler.nPosition.y = -(handler.position.y / Math.max(1, rect.height)) * 2 + 1;

      if (!handler.hover) {
        handler.hover = true;
        handler.onEnter();
      }
      handler.onMove();
    } else if (handler.hover) {
      handler.hover = false;
      handler.onLeave();
    }
  }
}

function registerInteraction(elem: HTMLElement, callbacks: Partial<InteractionHandler>): InteractionHandler {
  const handler: InteractionHandler = {
    position: new Vector2(),
    nPosition: new Vector2(),
    hover: false,
    onEnter: callbacks.onEnter || (() => {}),
    onMove: callbacks.onMove || (() => {}),
    onLeave: callbacks.onLeave || (() => {}),
    dispose: () => {},
  };

  activeInteractions.set(elem, handler);

  if (!isGlobalPointerBound && typeof window !== 'undefined') {
    window.addEventListener('pointermove', handleGlobalPointerMove, { passive: true });
    window.addEventListener('pointerleave', handleGlobalPointerLeave, { passive: true });
    isGlobalPointerBound = true;
  }

  handler.dispose = () => {
    activeInteractions.delete(elem);
    if (activeInteractions.size === 0 && isGlobalPointerBound && typeof window !== 'undefined') {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerleave', handleGlobalPointerLeave);
      isGlobalPointerBound = false;
    }
  };

  return handler;
}

// Physics simulation
const { randFloat, randFloatSpread } = MathUtils;
const tempVecA = new Vector3();
const tempVecB = new Vector3();
const tempVecC = new Vector3();
const tempVecZero = new Vector3();
const tempVelA = new Vector3();
const tempVelB = new Vector3();
const tempDiff = new Vector3();
const tempNorm = new Vector3();
const tempImpA = new Vector3();
const tempImpB = new Vector3();

class PhysicsEngine {
  config: BallpitConfig;
  positionData: Float32Array;
  velocityData: Float32Array;
  sizeData: Float32Array;
  center = new Vector3();

  constructor(config: BallpitConfig) {
    this.config = config;
    this.positionData = new Float32Array(3 * config.count).fill(0);
    this.velocityData = new Float32Array(3 * config.count).fill(0);
    this.sizeData = new Float32Array(config.count).fill(1);
    this.initPositions();
    this.setSizes();
  }

  initPositions() {
    const { config, positionData, velocityData } = this;
    this.center.toArray(positionData, 0);
    for (let i = 1; i < config.count; i++) {
      const idx = 3 * i;
      positionData[idx] = randFloatSpread(config.maxX * 1.6);
      positionData[idx + 1] = randFloatSpread(config.maxY * 1.5);
      positionData[idx + 2] = randFloatSpread(config.maxZ * 1.2);

      // Subtle initial buoyant drift
      velocityData[idx] = randFloatSpread(0.015);
      velocityData[idx + 1] = randFloatSpread(0.015);
      velocityData[idx + 2] = randFloatSpread(0.008);
    }
  }

  setSizes() {
    const { config, sizeData } = this;
    sizeData[0] = config.size0;
    for (let i = 1; i < config.count; i++) {
      sizeData[i] = randFloat(config.minSize, config.maxSize);
    }
  }

  update(time: { delta: number }) {
    const { config, center, positionData, sizeData, velocityData } = this;
    let startIdx = 0;

    if (config.controlSphere0) {
      startIdx = 1;
      tempVecA.fromArray(positionData, 0);
      tempVecA.lerp(center, 0.15).toArray(positionData, 0);
      tempVecZero.set(0, 0, 0).toArray(velocityData, 0);
    }

    for (let i = startIdx; i < config.count; i++) {
      const base = 3 * i;
      tempVecB.fromArray(positionData, base);
      tempVelA.fromArray(velocityData, base);

      // Gentle ambient gravity / buoyancy
      tempVelA.y -= time.delta * config.gravity * (sizeData[i] * 0.5);
      tempVelA.multiplyScalar(config.friction);
      tempVelA.clampLength(0, config.maxVelocity);

      tempVecB.add(tempVelA);
      tempVecB.toArray(positionData, base);
      tempVelA.toArray(velocityData, base);
    }

    for (let i = startIdx; i < config.count; i++) {
      const base = 3 * i;
      tempVecB.fromArray(positionData, base);
      tempVelA.fromArray(velocityData, base);
      const radius = sizeData[i];

      // Ball-to-ball soft repulsion
      for (let j = i + 1; j < config.count; j++) {
        const otherBase = 3 * j;
        tempVecC.fromArray(positionData, otherBase);
        tempVelB.fromArray(velocityData, otherBase);
        const otherRadius = sizeData[j];
        tempDiff.copy(tempVecC).sub(tempVecB);
        const dist = tempDiff.length();
        const sumRadius = radius + otherRadius;

        if (dist < sumRadius && dist > 0.0001) {
          const overlap = sumRadius - dist;
          tempNorm.copy(tempDiff).normalize().multiplyScalar(0.5 * overlap);
          tempImpA.copy(tempNorm).multiplyScalar(Math.max(tempVelA.length(), 0.3));
          tempImpB.copy(tempNorm).multiplyScalar(Math.max(tempVelB.length(), 0.3));

          tempVecB.sub(tempNorm);
          tempVelA.sub(tempImpA);
          tempVecB.toArray(positionData, base);
          tempVelA.toArray(velocityData, base);

          tempVecC.add(tempNorm);
          tempVelB.add(tempImpB);
          tempVecC.toArray(positionData, otherBase);
          tempVelB.toArray(velocityData, otherBase);
        }
      }

      // Cursor interaction repulsion
      if (config.controlSphere0) {
        tempDiff.copy(tempVecB).sub(tempVecA);
        const dist = tempDiff.length();
        const sumRadius0 = radius + sizeData[0];
        if (dist < sumRadius0 && dist > 0.0001) {
          const diff = sumRadius0 - dist;
          tempNorm.copy(tempDiff.normalize()).multiplyScalar(diff);
          tempImpA.copy(tempNorm).multiplyScalar(0.04);
          tempVecB.add(tempNorm);
          tempVelA.add(tempImpA);
        }
      }

      // Boundary collisions with calm damping
      if (Math.abs(tempVecB.x) + radius > config.maxX) {
        tempVecB.x = Math.sign(tempVecB.x) * (config.maxX - radius);
        tempVelA.x = -tempVelA.x * config.wallBounce;
      }
      if (config.gravity === 0) {
        if (Math.abs(tempVecB.y) + radius > config.maxY) {
          tempVecB.y = Math.sign(tempVecB.y) * (config.maxY - radius);
          tempVelA.y = -tempVelA.y * config.wallBounce;
        }
      } else if (tempVecB.y - radius < -config.maxY) {
        tempVecB.y = -config.maxY + radius;
        tempVelA.y = -tempVelA.y * config.wallBounce;
      } else if (tempVecB.y + radius > config.maxY) {
        tempVecB.y = config.maxY - radius;
        tempVelA.y = -tempVelA.y * config.wallBounce;
      }

      const maxBoundary = Math.max(config.maxZ, config.maxSize);
      if (Math.abs(tempVecB.z) + radius > maxBoundary) {
        tempVecB.z = Math.sign(tempVecB.z) * (config.maxZ - radius);
        tempVelA.z = -tempVelA.z * config.wallBounce;
      }

      tempVecB.toArray(positionData, base);
      tempVelA.toArray(velocityData, base);
    }
  }
}

const dummyMatrixObj = new Object3D();

class SpheresMesh extends InstancedMesh {
  config: BallpitConfig;
  physics: PhysicsEngine;
  ambientLight!: AmbientLight;
  light!: PointLight;

  constructor(renderer: WebGLRenderer, userConfig: Partial<BallpitConfig> = {}) {
    const config = { ...DEFAULT_CONFIG, ...userConfig };
    const roomEnv = new RoomEnvironment();
    const pmremGenerator = new PMREMGenerator(renderer);
    const envMap = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    pmremGenerator.dispose();

    const geometry = new SphereGeometry(1, 24, 24);
    const material = new MeshPhysicalMaterial({
      envMap,
      ...config.materialParams,
    });
    material.envMapRotation.x = -Math.PI / 2;

    super(geometry, material, config.count);
    this.config = config;
    this.physics = new PhysicsEngine(config);
    this.initLights();
    this.setColors(config.colors);
  }

  private initLights() {
    this.ambientLight = new AmbientLight(this.config.ambientColor, this.config.ambientIntensity);
    this.add(this.ambientLight);
    this.light = new PointLight(new Color(this.config.colors[0] || '#27272a'), this.config.lightIntensity);
    this.add(this.light);
  }

  setColors(colors: (string | number)[]) {
    if (!Array.isArray(colors) || colors.length < 2) return;
    const colorObjs = colors.map((c) => new Color(c));

    const getColorAt = (ratio: number) => {
      const scaled = Math.max(0, Math.min(1, ratio)) * (colorObjs.length - 1);
      const idx = Math.floor(scaled);
      const start = colorObjs[idx];
      if (idx >= colorObjs.length - 1) return start.clone();
      const alpha = scaled - idx;
      const end = colorObjs[idx + 1];
      const out = new Color();
      out.r = start.r + alpha * (end.r - start.r);
      out.g = start.g + alpha * (end.g - start.g);
      out.b = start.b + alpha * (end.b - start.b);
      return out;
    };

    for (let i = 0; i < this.count; i++) {
      const col = getColorAt(i / this.count);
      this.setColorAt(i, col);
      if (i === 0) {
        this.light.color.copy(col);
      }
    }
    if (this.instanceColor) this.instanceColor.needsUpdate = true;
  }

  updatePhysics(time: { delta: number }) {
    this.physics.update(time);
    for (let i = 0; i < this.count; i++) {
      dummyMatrixObj.position.fromArray(this.physics.positionData, 3 * i);
      if (i === 0 && !this.config.followCursor) {
        dummyMatrixObj.scale.setScalar(0);
      } else {
        dummyMatrixObj.scale.setScalar(this.physics.sizeData[i]);
      }
      dummyMatrixObj.updateMatrix();
      this.setMatrixAt(i, dummyMatrixObj.matrix);
      if (i === 0) this.light.position.copy(dummyMatrixObj.position);
    }
    this.instanceMatrix.needsUpdate = true;
  }
}

export function Ballpit({
  className = '',
  count,
  gravity,
  friction,
  wallBounce,
  maxVelocity,
  minSize,
  maxSize,
  size0,
  followCursor = true,
  colors,
  ambientIntensity,
  lightIntensity,
}: BallpitProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // 1. Client-side and WebGL support check
    if (typeof window === 'undefined' || !isWebGLAvailable()) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let threeCtx: ThreeContext | null = null;
    let interaction: InteractionHandler | null = null;
    let themeObserver: MutationObserver | null = null;

    try {
      // Detect dark mode from documentElement class
      const isDarkMode = () => document.documentElement.classList.contains('dark');
      const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Determine adaptive ball count based on viewport width
      const getAdaptiveCount = () => {
        if (count !== undefined) return count;
        const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
        if (width < 640) return 14;   // Mobile
        if (width < 1024) return 22;  // Tablet
        return 34;                    // Desktop
      };

      const initialThemeColors = isDarkMode() ? DARK_THEME_PALETTE : LIGHT_THEME_PALETTE;
      const initialConfig: Partial<BallpitConfig> = {
        count: getAdaptiveCount(),
        colors: colors || initialThemeColors,
        ambientColor: isDarkMode() ? 0x27272a : 0xf4f4f5,
        ambientIntensity: ambientIntensity ?? (isDarkMode() ? 0.75 : 0.85),
        lightIntensity: lightIntensity ?? (isDarkMode() ? 45 : 55),
        materialParams: {
          metalness: 0.25,
          roughness: 0.65,
          clearcoat: 0.15,
          clearcoatRoughness: 0.4,
        },
        gravity: prefersReducedMotion() ? 0 : (gravity ?? DEFAULT_CONFIG.gravity),
        friction: friction ?? DEFAULT_CONFIG.friction,
        wallBounce: wallBounce ?? DEFAULT_CONFIG.wallBounce,
        maxVelocity: prefersReducedMotion() ? 0 : (maxVelocity ?? DEFAULT_CONFIG.maxVelocity),
        minSize: minSize ?? DEFAULT_CONFIG.minSize,
        maxSize: maxSize ?? DEFAULT_CONFIG.maxSize,
        size0: size0 ?? DEFAULT_CONFIG.size0,
        followCursor,
      };

      threeCtx = new ThreeContext(canvas);
      threeCtx.renderer.toneMapping = ACESFilmicToneMapping;
      threeCtx.camera.position.set(0, 0, 20);
      threeCtx.camera.lookAt(0, 0, 0);
      threeCtx.cameraMaxAspect = 1.5;
      threeCtx.resize();

      const spheres = new SpheresMesh(threeCtx.renderer, initialConfig);
      threeCtx.scene.add(spheres);

      const raycaster = new Raycaster();
      const plane = new Plane(new Vector3(0, 0, 1), 0);
      const intersectPoint = new Vector3();

      interaction = registerInteraction(canvas, {
        onMove() {
          if (prefersReducedMotion() || !threeCtx) return;
          raycaster.setFromCamera(interaction!.nPosition, threeCtx.camera);
          threeCtx.camera.getWorldDirection(plane.normal);
          raycaster.ray.intersectPlane(plane, intersectPoint);
          spheres.physics.center.copy(intersectPoint);
          spheres.config.controlSphere0 = true;
        },
        onLeave() {
          spheres.config.controlSphere0 = false;
        },
      });

      threeCtx.onBeforeRender = (time) => {
        if (!prefersReducedMotion()) {
          spheres.updatePhysics(time);
        }
      };

      threeCtx.onAfterResize = (size) => {
        spheres.config.maxX = size.wWidth / 2;
        spheres.config.maxY = size.wHeight / 2;
      };

      // If reduced motion is requested, render once and don't loop
      if (prefersReducedMotion()) {
        spheres.updatePhysics({ delta: 0 });
        threeCtx.renderSingleFrame();
        threeCtx.stopLoop();
      }

      // Theme mutation observer: dynamically switch ball colors without re-mounting
      themeObserver = new MutationObserver(() => {
        if (colors) return; // User specified custom colors
        const dark = isDarkMode();
        const newPalette = dark ? DARK_THEME_PALETTE : LIGHT_THEME_PALETTE;
        spheres.config.ambientColor = dark ? 0x27272a : 0xf4f4f5;
        spheres.config.ambientIntensity = dark ? 0.75 : 0.85;
        spheres.config.lightIntensity = dark ? 45 : 55;
        spheres.ambientLight.color.set(spheres.config.ambientColor);
        spheres.ambientLight.intensity = spheres.config.ambientIntensity;
        spheres.light.intensity = spheres.config.lightIntensity;
        spheres.setColors(newPalette);
        if (prefersReducedMotion() && threeCtx) {
          threeCtx.renderSingleFrame();
        }
      });

      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
    } catch {
      // On any WebGL or runtime initialization error, gracefully fallback
      if (threeCtx) {
        try {
          threeCtx.dispose();
        } catch {
          // Ignore secondary cleanup error
        }
        threeCtx = null;
      }
    }

    return () => {
      themeObserver?.disconnect();
      interaction?.dispose();
      threeCtx?.dispose();
    };
  }, [
    count,
    gravity,
    friction,
    wallBounce,
    maxVelocity,
    minSize,
    maxSize,
    size0,
    followCursor,
    colors,
    ambientIntensity,
    lightIntensity,
  ]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default Ballpit;
