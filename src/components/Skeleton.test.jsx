import { describe, test, expect } from '@jest/globals';
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skeleton, SkeletonTextLines } from './Skeleton.jsx';

describe('Skeleton', () => {
  test('renders single skeleton with default dimensions', () => {
    render(<Skeleton />);
    const items = screen.getAllByTestId('skeleton-item');
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveStyle({ width: '100%', height: '16px' });
  });

  test('renders multiple skeletons when count > 1', () => {
    render(<Skeleton count={3} />);
    const items = screen.getAllByTestId('skeleton-item');
    expect(items).toHaveLength(3);
  });

  test('applies custom width, height, and className', () => {
    render(<Skeleton width="200px" height="48px" count={2} className="extra" />);
    const items = screen.getAllByTestId('skeleton-item');
    expect(items).toHaveLength(2);
    for (const el of items) {
      expect(el).toHaveStyle({ width: '200px', height: '48px' });
    }
    // wrapper has merged class names
    const wrapper = items[0].closest('.skeleton-wrapper');
    expect(wrapper).toHaveClass('extra');
  });

  test('stable keys preserved across re-render when count unchanged', () => {
    const { rerender } = render(<Skeleton count={3} />);
    const firstRenderItems = screen.getAllByTestId('skeleton-item');
    // Rerender with same count
    rerender(<Skeleton count={3} />);
    const secondRenderItems = screen.getAllByTestId('skeleton-item');
    // key attribute isn't directly exposed; alternative: compare DOM node identities
    for (let i = 0; i < firstRenderItems.length; i++) {
      expect(firstRenderItems[i]).toBe(secondRenderItems[i]);
    }
  });
});

describe('SkeletonTextLines', () => {
  test('renders default 3 lines', () => {
    render(<SkeletonTextLines />);
    const items = screen.getAllByTestId('skeleton-item');
    expect(items).toHaveLength(3);
    // each line uses height 14px and wrapper class skeleton-lines
    for (const el of items) {
      expect(el).toHaveStyle({ height: '14px' });
    }
    const wrapper = items[0].closest('.skeleton-wrapper');
    expect(wrapper).toHaveClass('skeleton-lines');
  });

  test('renders custom number of lines', () => {
    render(<SkeletonTextLines lines={5} />);
    const items = screen.getAllByTestId('skeleton-item');
    expect(items).toHaveLength(5);
    for (const el of items) {
      expect(el).toHaveStyle({ height: '14px' });
    }
  });
});
