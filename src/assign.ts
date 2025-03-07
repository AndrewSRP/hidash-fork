/* eslint-disable @typescript-eslint/no-explicit-any */
import isNull from './isNull'

export function assign<TObject, TSource>(target: TObject, source: TSource): TObject & TSource
export function assign<TObject, TSource1, TSource2>(
    target: TObject,
    source1: TSource1,
    source2: TSource2,
): TObject & TSource1 & TSource2
export function assign<TObject, TSource1, TSource2, TSource3>(
    target: TObject,
    source1: TSource1,
    source2: TSource2,
    source3: TSource3,
): TObject & TSource1 & TSource2 & TSource3
export function assign<TObject, TSource1, TSource2, TSource3, TSource4>(
    target: TObject,
    source1: TSource1,
    source2: TSource2,
    source3: TSource3,
    source4: TSource4,
): TObject & TSource1 & TSource2 & TSource3 & TSource4
export function assign<TObject>(target: TObject): TObject
export function assign(target: unknown, ...sources: any[]): any
export function assign(target: unknown, ...sources: any[]) {
    const to = Object(target)

    if (sources.length === 0) {
        return to
    }

    for (const source of sources) {
        if (!isNull(source)) {
            Object.keys(source).forEach(key => {
                to[key] = source[key]
            })
        }
    }
    return to
}

export default assign
