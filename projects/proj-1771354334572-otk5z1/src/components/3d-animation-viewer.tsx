import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer, TextureLoader } from 'expo-three';
import * as THREE from 'three';

interface AnimationViewerProps {
  modelPath: string; // Path to the 3D model (GLB format)
}

const AnimationViewer: React.FC<AnimationViewerProps> = ({ modelPath }) => {
  const onContextCreate = async (gl: WebGLRenderingContext) => {
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
    camera.position.z = 5;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);

    const loader = new THREE.GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error loading 3D model:', error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
  };

  return <GLView style={styles.container} onContextCreate={onContextCreate} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AnimationViewer;