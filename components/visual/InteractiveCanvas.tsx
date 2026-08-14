'use client';

import React, { useEffect, useRef } from 'react';

export function InteractiveCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const node1Ref = useRef<SVGCircleElement | null>(null);
  const node2Ref = useRef<SVGCircleElement | null>(null);
  const lineRef = useRef<SVGPathElement | null>(null);

  const targetRef = useRef({
    x: 0,
    y: 0,
    node1Scale: 1,
    node1Opacity: 0.6,
    node1Glow: false,
    node2Scale: 1,
    node2Opacity: 0.6,
    node2Glow: false,
    lineOpacity: 0.5,
    lineStrokeWidth: 1.4,
  });

  const currentRef = useRef({
    x: 0,
    y: 0,
    node1Scale: 1,
    node1Opacity: 0.6,
    node1Glow: false,
    node2Scale: 1,
    node2Opacity: 0.6,
    node2Glow: false,
    lineOpacity: 0.5,
    lineStrokeWidth: 1.4,
  });

  const rafRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (prefersReducedMotion || !isFinePointer) return;

    const updateDOM = () => {
      const cx = currentRef.current.x;
      const cy = currentRef.current.y;

      container.style.setProperty('--motion-frame-x', `${(cx * 8).toFixed(2)}px`);
      container.style.setProperty('--motion-frame-y', `${(cy * 8).toFixed(2)}px`);

      container.style.setProperty('--motion-line-x', `${(cx * 10).toFixed(2)}px`);
      container.style.setProperty('--motion-line-y', `${(cy * 10).toFixed(2)}px`);

      container.style.setProperty('--motion-node-x', `${(cx * 12).toFixed(2)}px`);
      container.style.setProperty('--motion-node-y', `${(cy * 12).toFixed(2)}px`);

      container.style.setProperty('--motion-coord-x', `${(cx * 10).toFixed(2)}px`);
      container.style.setProperty('--motion-coord-y', `${(cy * 10).toFixed(2)}px`);

      if (node1Ref.current) {
        node1Ref.current.setAttribute(
          'transform',
          `translate(520, 680) scale(${currentRef.current.node1Scale.toFixed(2)}) translate(-520, -680)`
        );
        node1Ref.current.style.opacity = currentRef.current.node1Opacity.toFixed(2);
        if (currentRef.current.node1Glow) {
          node1Ref.current.classList.add('node-glow');
        } else {
          node1Ref.current.classList.remove('node-glow');
        }
      }

      if (node2Ref.current) {
        node2Ref.current.setAttribute(
          'transform',
          `translate(940, 660) scale(${currentRef.current.node2Scale.toFixed(2)}) translate(-940, -660)`
        );
        node2Ref.current.style.opacity = currentRef.current.node2Opacity.toFixed(2);
        if (currentRef.current.node2Glow) {
          node2Ref.current.classList.add('node-glow');
        } else {
          node2Ref.current.classList.remove('node-glow');
        }
      }

      if (lineRef.current) {
        lineRef.current.style.opacity = currentRef.current.lineOpacity.toFixed(2);
        lineRef.current.setAttribute('stroke-width', currentRef.current.lineStrokeWidth.toFixed(2));
      }
    };

    const animate = () => {
      const target = targetRef.current;
      const current = currentRef.current;

      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const dN1Scale = target.node1Scale - current.node1Scale;
      const dN1Op = target.node1Opacity - current.node1Opacity;
      const dN2Scale = target.node2Scale - current.node2Scale;
      const dN2Op = target.node2Opacity - current.node2Opacity;
      const dLineOp = target.lineOpacity - current.lineOpacity;
      const dLineWidth = target.lineStrokeWidth - current.lineStrokeWidth;

      current.x += dx * 0.1;
      current.y += dy * 0.1;
      current.node1Scale += dN1Scale * 0.12;
      current.node1Opacity += dN1Op * 0.12;
      current.node1Glow = target.node1Glow;
      current.node2Scale += dN2Scale * 0.12;
      current.node2Opacity += dN2Op * 0.12;
      current.node2Glow = target.node2Glow;
      current.lineOpacity += dLineOp * 0.12;
      current.lineStrokeWidth += dLineWidth * 0.12;

      updateDOM();

      if (
        Math.abs(dx) < 0.001 &&
        Math.abs(dy) < 0.001 &&
        Math.abs(dN1Scale) < 0.005 &&
        Math.abs(dN1Op) < 0.005 &&
        Math.abs(dN2Scale) < 0.005 &&
        Math.abs(dN2Op) < 0.005 &&
        Math.abs(dLineOp) < 0.005 &&
        Math.abs(dLineWidth) < 0.005
      ) {
        current.x = target.x;
        current.y = target.y;
        current.node1Scale = target.node1Scale;
        current.node1Opacity = target.node1Opacity;
        current.node2Scale = target.node2Scale;
        current.node2Opacity = target.node2Opacity;
        current.lineOpacity = target.lineOpacity;
        current.lineStrokeWidth = target.lineStrokeWidth;
        updateDOM();
        isAnimatingRef.current = false;
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (prefersReducedMotion) return;
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (prefersReducedMotion) return;
      if (event.pointerType !== 'mouse') return;

      const normX = (event.clientX / window.innerWidth - 0.5) * 2;
      const normY = (event.clientY / window.innerHeight - 0.5) * 2;

      let n1Scale = 1;
      let n1Op = 0.6;
      let n1Glow = false;

      if (node1Ref.current) {
        const rect1 = node1Ref.current.getBoundingClientRect();
        const c1X = rect1.left + rect1.width / 2;
        const c1Y = rect1.top + rect1.height / 2;
        const dist1 = Math.hypot(event.clientX - c1X, event.clientY - c1Y);

        if (dist1 < 90) {
          n1Scale = 1.5;
          n1Op = 1.0;
          n1Glow = true;
        } else if (dist1 < 180) {
          n1Scale = 1.15;
          n1Op = 0.85;
          n1Glow = false;
        }
      }

      let n2Scale = 1;
      let n2Op = 0.6;
      let n2Glow = false;

      if (node2Ref.current) {
        const rect2 = node2Ref.current.getBoundingClientRect();
        const c2X = rect2.left + rect2.width / 2;
        const c2Y = rect2.top + rect2.height / 2;
        const dist2 = Math.hypot(event.clientX - c2X, event.clientY - c2Y);

        if (dist2 < 90) {
          n2Scale = 1.5;
          n2Op = 1.0;
          n2Glow = true;
        } else if (dist2 < 180) {
          n2Scale = 1.15;
          n2Op = 0.85;
          n2Glow = false;
        }
      }

      const isNearNode = n1Op > 0.7 || n2Op > 0.7;
      const lineOp = isNearNode ? 0.85 : 0.5;
      const lineStroke = isNearNode ? 1.9 : 1.4;

      targetRef.current = {
        x: normX,
        y: normY,
        node1Scale: n1Scale,
        node1Opacity: n1Op,
        node1Glow: n1Glow,
        node2Scale: n2Scale,
        node2Opacity: n2Op,
        node2Glow: n2Glow,
        lineOpacity: lineOp,
        lineStrokeWidth: lineStroke,
      };

      startAnimation();
    };

    const handlePointerLeave = () => {
      targetRef.current = {
        x: 0,
        y: 0,
        node1Scale: 1,
        node1Opacity: 0.6,
        node1Glow: false,
        node2Scale: 1,
        node2Opacity: 0.6,
        node2Glow: false,
        lineOpacity: 0.5,
        lineStrokeWidth: 1.4,
      };
      startAnimation();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        isAnimatingRef.current = false;
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="interactive-canvas-root select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMinYMin meet"
        className="interactive-canvas-svg text-zinc-300 dark:text-zinc-700"
      >
        {/* Layer 0: Static Base Grid & Alignment Crosshairs */}
        <g className="interactive-canvas-grid desktop-only-svg">
          <line x1="120" y1="0" x2="120" y2="900" />
          <line x1="420" y1="0" x2="420" y2="900" />
          <line x1="780" y1="0" x2="780" y2="900" />
          <line x1="1020" y1="0" x2="1020" y2="900" />
          <line x1="0" y1="140" x2="1200" y2="140" />
          <line x1="0" y1="340" x2="1200" y2="340" />
          <line x1="0" y1="540" x2="1200" y2="540" />
          <line x1="0" y1="720" x2="1200" y2="720" />

          {/* Crosshair ticks */}
          <path d="M116 140 H124 M120 136 V144" />
          <path d="M416 140 H424 M420 136 V144" />
          <path d="M776 340 H784 M780 336 V344" />
          <path d="M1016 340 H1024 M1020 336 V344" />
          <path d="M416 540 H424 M420 536 V544" />
        </g>

        {/* Layer 1: Ambient Motion (Continuous Drift & Pulse) */}
        <g className="desktop-only-svg">
          <line
            x1="140"
            y1="560"
            x2="520"
            y2="680"
            className="stroke-blue-500/20 dark:stroke-blue-400/30 ambient-motion-a"
          />
        </g>

        {/* Layer 2: Interactive Blueprint Parallax Layers */}
        <g className="desktop-only-svg">
          {/* Blueprint Open Corner Handles (Frame layer: up to ±8px displacement) */}
          <g className="blueprint-frame stroke-blue-600/60 dark:stroke-blue-400/70">
            <path d="M60 80 H90 M60 80 V110" className="ambient-motion-b" />
            <path d="M580 80 H550 M580 80 V110" />
            <path d="M60 300 H90 M60 300 V270" />
            <path d="M580 300 H550 M580 300 V270" />
          </g>

          {/* Dotted Alignment Guide (Ambient pulse C) */}
          <line
            x1="60"
            y1="190"
            x2="580"
            y2="190"
            strokeDasharray="3 3"
            className="blueprint-frame stroke-blue-500/30 dark:stroke-blue-400/40 ambient-motion-c"
          />

          {/* Connection Line Layer (Pushed down +220px to route under hero text) */}
          <path
            ref={lineRef}
            d="M520 680 L680 640 C740 620 940 660 1020 660"
            className="blueprint-line blueprint-line-living stroke-blue-500 dark:stroke-blue-400 transition-opacity duration-200"
            strokeWidth={1.4}
            fill="none"
          />

          {/* Proximity Nodes Layer (Pushed down +220px to align with path) */}
          <g className="blueprint-nodes">
            {/* Node 1 Proximity Anchor */}
            <circle
              ref={node1Ref}
              cx="520"
              cy="680"
              r="4"
              className="fill-blue-500 dark:fill-blue-400 stroke-blue-600 dark:stroke-blue-300 transition-transform duration-200"
            />

            {/* Node 2 Proximity Anchor */}
            <circle
              ref={node2Ref}
              cx="940"
              cy="660"
              r="3.5"
              className="fill-blue-500 dark:fill-blue-400 stroke-blue-600 dark:stroke-blue-300 transition-transform duration-200"
            />
          </g>

          {/* Dimension Indicator & Coordinate Indicator (Coords layer: up to 20px displacement) */}
          <g className="blueprint-coords interactive-canvas-meta">
            <text x="520" y="72" textAnchor="end" className="fill-blue-600 dark:fill-blue-400 font-semibold">
              520 × 220
            </text>
            <text x="64" y="72" textAnchor="start" className="fill-blue-600 dark:fill-blue-400 font-semibold">
              X: 60 Y: 80
            </text>
          </g>
        </g>

        {/* Mobile Viewport Layout: Static Simplified Lines */}
        <g className="mobile-only-svg">
          <line x1="40" y1="80" x2="320" y2="80" />
          <line x1="40" y1="180" x2="280" y2="180" strokeDasharray="2 2" />
          <circle cx="280" cy="180" r="3" className="fill-blue-500/60 dark:fill-blue-400/70" />
          <line x1="40" y1="360" x2="240" y2="360" />
        </g>
      </svg>
    </div>
  );
}

