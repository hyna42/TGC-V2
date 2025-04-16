import { describe, expect, test } from 'vitest';
import { add } from '../utils/math';

describe('add()', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(add(1, 2)).toBe(3);
    });

    test('adds -1 + -1 to equal -2', () => {
        expect(add(-1, -1)).toBe(-2);
    });
});
