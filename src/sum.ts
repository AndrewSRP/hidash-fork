/**
 * @description https://unpkg.com/lodash.sum lodash.sum is only compatible with number arrays
 */
export function sum(elements: number[]): number {
    let result = 0
    // for-of is slower than index
    // eslint-disable-next-line
    for (let i = 0; i < elements.length; i++) {
        result += elements[i]
    }
    return result
}

export default sum
