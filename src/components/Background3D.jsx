import { useRef, useEffect } from 'react';

export default function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;
    let scrollY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

    // 3D projection helpers
    const project = (x, y, z, cx, cy) => {
      const fov = 600;
      const scale = fov / (fov + z);
      return { x: cx + x * scale, y: cy + y * scale, scale };
    };

    const rotateY = (x, z, angle) => ({
      x: x * Math.cos(angle) - z * Math.sin(angle),
      z: x * Math.sin(angle) + z * Math.cos(angle),
    });

    const rotateX = (y, z, angle) => ({
      y: y * Math.cos(angle) - z * Math.sin(angle),
      z: y * Math.sin(angle) + z * Math.cos(angle),
    });

    // Shapes placed at page-absolute Y positions — we subtract scrollY to render them in viewport space
    const shapes = [
      // Hero area
      { type: 'torus', cx: 0.08, pageY: 200, size: 100, speed: 0.3, phase: 0, color: [0, 200, 210], opacity: 0.12 },
      { type: 'cube', cx: 0.92, pageY: 300, size: 65, speed: 0.25, phase: 1.5, color: [0, 105, 111], opacity: 0.1 },
      // Features
      { type: 'icosahedron', cx: 0.94, pageY: 950, size: 80, speed: 0.2, phase: 0.8, color: [0, 200, 210], opacity: 0.1 },
      { type: 'diamond', cx: 0.05, pageY: 1150, size: 60, speed: 0.35, phase: 2.1, color: [0, 105, 111], opacity: 0.09 },
      // How it works
      { type: 'sphere', cx: 0.95, pageY: 1750, size: 110, speed: 0.15, phase: 0.4, color: [0, 200, 210], opacity: 0.08 },
      { type: 'torus', cx: 0.04, pageY: 1950, size: 70, speed: 0.28, phase: 3.0, color: [0, 105, 111], opacity: 0.1 },
      // About
      { type: 'cube', cx: 0.06, pageY: 2550, size: 75, speed: 0.22, phase: 1.2, color: [0, 200, 210], opacity: 0.09 },
      { type: 'diamond', cx: 0.94, pageY: 2800, size: 65, speed: 0.3, phase: 2.5, color: [0, 105, 111], opacity: 0.1 },
      // CTA / Footer
      { type: 'icosahedron', cx: 0.06, pageY: 3300, size: 85, speed: 0.18, phase: 0.7, color: [0, 200, 210], opacity: 0.1 },
      { type: 'sphere', cx: 0.94, pageY: 3500, size: 70, speed: 0.25, phase: 1.8, color: [0, 105, 111], opacity: 0.08 },
      // Smaller accent shapes scattered throughout
      { type: 'cube', cx: 0.15, pageY: 550, size: 40, speed: 0.4, phase: 0.5, color: [0, 200, 210], opacity: 0.07 },
      { type: 'diamond', cx: 0.85, pageY: 1400, size: 45, speed: 0.35, phase: 2.8, color: [0, 105, 111], opacity: 0.07 },
      { type: 'torus', cx: 0.5, pageY: 2200, size: 50, speed: 0.3, phase: 1.0, color: [0, 200, 210], opacity: 0.06 },
    ];

    // Draw wireframe cube
    const drawCube = (ctx, cx, cy, size, angleY, angleX, color, opacity) => {
      const s = size / 2;
      const vertices = [
        [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],
        [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s],
      ];
      const edges = [
        [0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],
        [0,4],[1,5],[2,6],[3,7],
      ];
      const projected = vertices.map(([vx, vy, vz]) => {
        const ry = rotateY(vx, vz, angleY);
        const rx = rotateX(vy, ry.z, angleX);
        return project(ry.x, rx.y, rx.z, cx, cy);
      });
      ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${opacity})`;
      ctx.lineWidth = 1.5;
      edges.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(projected[a].x, projected[a].y);
        ctx.lineTo(projected[b].x, projected[b].y);
        ctx.stroke();
      });
      projected.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${opacity * 2})`;
        ctx.fill();
      });
    };

    // Draw wireframe diamond (octahedron)
    const drawDiamond = (ctx, cx, cy, size, angleY, angleX, color, opacity) => {
      const s = size / 2;
      const vertices = [
        [0, -s * 1.3, 0], [s, 0, 0], [0, 0, s], [-s, 0, 0], [0, 0, -s], [0, s * 1.3, 0],
      ];
      const edges = [
        [0,1],[0,2],[0,3],[0,4],[5,1],[5,2],[5,3],[5,4],
        [1,2],[2,3],[3,4],[4,1],
      ];
      const projected = vertices.map(([vx, vy, vz]) => {
        const ry = rotateY(vx, vz, angleY);
        const rx = rotateX(vy, ry.z, angleX);
        return project(ry.x, rx.y, rx.z, cx, cy);
      });
      ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${opacity})`;
      ctx.lineWidth = 1.4;
      edges.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(projected[a].x, projected[a].y);
        ctx.lineTo(projected[b].x, projected[b].y);
        ctx.stroke();
      });
      projected.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${opacity * 2})`;
        ctx.fill();
      });
    };

    // Draw wireframe torus
    const drawTorus = (ctx, cx, cy, size, angleY, angleX, color, opacity) => {
      const R = size * 0.5;
      const r = size * 0.18;
      const segments = 20;
      const tubes = 12;
      const points = [];
      for (let i = 0; i < segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        for (let j = 0; j < tubes; j++) {
          const phi = (j / tubes) * Math.PI * 2;
          const x = (R + r * Math.cos(phi)) * Math.cos(theta);
          const y = r * Math.sin(phi);
          const z = (R + r * Math.cos(phi)) * Math.sin(theta);
          const ry = rotateY(x, z, angleY);
          const rx = rotateX(y, ry.z, angleX);
          points.push(project(ry.x, rx.y, rx.z, cx, cy));
        }
      }
      ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${opacity})`;
      ctx.lineWidth = 1;
      for (let i = 0; i < segments; i++) {
        ctx.beginPath();
        for (let j = 0; j <= tubes; j++) {
          const p = points[i * tubes + (j % tubes)];
          if (j === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let j = 0; j < tubes; j++) {
        ctx.beginPath();
        for (let i = 0; i <= segments; i++) {
          const p = points[(i % segments) * tubes + j];
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
    };

    // Draw wireframe sphere
    const drawSphere = (ctx, cx, cy, size, angleY, angleX, color, opacity) => {
      const r = size * 0.5;
      const latLines = 8;
      const lonLines = 12;
      ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${opacity * 0.8})`;
      ctx.lineWidth = 0.8;
      for (let i = 1; i < latLines; i++) {
        const phi = (i / latLines) * Math.PI;
        ctx.beginPath();
        for (let j = 0; j <= lonLines * 2; j++) {
          const theta = (j / (lonLines * 2)) * Math.PI * 2;
          const x = r * Math.sin(phi) * Math.cos(theta);
          const y = r * Math.cos(phi);
          const z = r * Math.sin(phi) * Math.sin(theta);
          const ry2 = rotateY(x, z, angleY);
          const rx2 = rotateX(y, ry2.z, angleX);
          const p = project(ry2.x, rx2.y, rx2.z, cx, cy);
          if (j === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let i = 0; i < lonLines; i++) {
        const theta = (i / lonLines) * Math.PI * 2;
        ctx.beginPath();
        for (let j = 0; j <= latLines * 2; j++) {
          const phi = (j / (latLines * 2)) * Math.PI;
          const x = r * Math.sin(phi) * Math.cos(theta);
          const y = r * Math.cos(phi);
          const z = r * Math.sin(phi) * Math.sin(theta);
          const ry2 = rotateY(x, z, angleY);
          const rx2 = rotateX(y, ry2.z, angleX);
          const p = project(ry2.x, rx2.y, rx2.z, cx, cy);
          if (j === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
    };

    // Draw wireframe icosahedron
    const drawIcosahedron = (ctx, cx, cy, size, angleY, angleX, color, opacity) => {
      const t = (1 + Math.sqrt(5)) / 2;
      const s = size * 0.3;
      const raw = [
        [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
        [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
        [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
      ];
      const vertices = raw.map(([x, y, z]) => [x * s, y * s, z * s]);
      const edges = [
        [0,1],[0,5],[0,7],[0,10],[0,11],[1,5],[1,7],[1,8],[1,9],
        [2,3],[2,4],[2,6],[2,10],[2,11],[3,4],[3,6],[3,8],[3,9],
        [4,5],[4,9],[4,11],[5,9],[5,11],[6,7],[6,8],[6,10],
        [7,8],[7,10],[8,9],[10,11],
      ];
      const projected = vertices.map(([vx, vy, vz]) => {
        const ry = rotateY(vx, vz, angleY);
        const rx = rotateX(vy, ry.z, angleX);
        return project(ry.x, rx.y, rx.z, cx, cy);
      });
      ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${opacity})`;
      ctx.lineWidth = 1;
      edges.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(projected[a].x, projected[a].y);
        ctx.lineTo(projected[b].x, projected[b].y);
        ctx.stroke();
      });
      projected.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${opacity * 2})`;
        ctx.fill();
      });
    };

    // Floating particles
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random(),
      pageY: Math.random() * 4500,
      size: Math.random() * 2.5 + 0.8,
      speed: Math.random() * 0.3 + 0.1,
      phase: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.12 + 0.04,
      color: Math.random() > 0.5 ? [0, 200, 210] : [0, 105, 111],
    }));

    const animate = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const viewH = canvas.height;
      const margin = 200; // render shapes slightly outside viewport too

      // Draw particles
      particles.forEach(p => {
        const screenY = p.pageY - scrollY;
        if (screenY < -margin || screenY > viewH + margin) return;
        const x = p.x * canvas.width + Math.sin(time * p.speed + p.phase) * 30;
        const y = screenY + Math.cos(time * p.speed * 0.7 + p.phase) * 20;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${p.opacity})`;
        ctx.fill();
      });

      // Draw 3D shapes
      shapes.forEach(shape => {
        const screenY = shape.pageY - scrollY;
        // Only render if within viewport (with margin)
        if (screenY < -margin - shape.size || screenY > viewH + margin + shape.size) return;

        const cx = shape.cx * canvas.width;
        const cy = screenY;
        const bobY = Math.sin(time * shape.speed + shape.phase) * 18;
        const bobX = Math.cos(time * shape.speed * 0.7 + shape.phase) * 10;
        const angleY = time * shape.speed + shape.phase;
        const angleX = time * shape.speed * 0.6 + shape.phase * 0.5;

        switch (shape.type) {
          case 'cube':
            drawCube(ctx, cx + bobX, cy + bobY, shape.size, angleY, angleX, shape.color, shape.opacity);
            break;
          case 'diamond':
            drawDiamond(ctx, cx + bobX, cy + bobY, shape.size, angleY, angleX, shape.color, shape.opacity);
            break;
          case 'torus':
            drawTorus(ctx, cx + bobX, cy + bobY, shape.size, angleY, angleX, shape.color, shape.opacity);
            break;
          case 'sphere':
            drawSphere(ctx, cx + bobX, cy + bobY, shape.size, angleY, angleX, shape.color, shape.opacity);
            break;
          case 'icosahedron':
            drawIcosahedron(ctx, cx + bobX, cy + bobY, shape.size, angleY, angleX, shape.color, shape.opacity);
            break;
        }
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
