import { useMemo } from 'react';

export interface AvatarConfig {
  sex: 'man' | 'woman';
  faceColor: string;
  earSize: 'small' | 'big';
  eyeStyle: 'circle' | 'oval';
  noseStyle: 'short' | 'long';
  mouthStyle: 'laugh' | 'smile';
  shirtStyle: 'hoody' | 'short';
  glassesStyle: 'none' | 'round';
  hairColor: string;
  hairStyle: 'normal' | 'thick';
  hatStyle: 'none' | 'beanie';
  hatColor: string;
  eyeBrowStyle: 'up' | 'down';
  shirtColor: string;
  bgColor: string;
}

export function getAvatarConfig(): AvatarConfig {
  return {
    sex: 'man',
    faceColor: '#F9C9B6',
    earSize: 'small',
    eyeStyle: 'circle',
    noseStyle: 'short',
    mouthStyle: 'laugh',
    shirtStyle: 'hoody',
    glassesStyle: 'none',
    hairColor: '#000',
    hairStyle: 'normal',
    hatStyle: 'none',
    hatColor: '#F48150',
    eyeBrowStyle: 'up',
    shirtColor: '#9287FF',
    bgColor: '#F4D150'
  };
}