import { useEffect, useRef } from 'react';

/**
 * Возвращает предыдущее значение переменной после изменения.
 * Работает корректно при strict-режиме TypeScript.
 *
 * @param value - значение, за которым нужно следить
 * @returns значение с предыдущего рендера или undefined на первом вызове
 */
export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T | undefined>(undefined);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}
