import _groupBy from 'lodash/groupBy'
import {describe, it, expect} from 'vitest'

import {groupBy} from './groupBy'

// 테스트용 데이터
const users = [
    {id: 1, name: 'John', age: 25, city: 'NY'},
    {id: 2, name: 'Jane', age: 25, city: 'LA'},
    {id: 3, name: 'Bob', age: 30, city: 'NY'},
    {id: 4, name: 'Alice', age: 30, city: 'LA'},
]

const objects = {
    user1: {age: 25, name: 'John'},
    user2: {age: 30, name: 'Jane'},
    user3: {age: 25, name: 'Bob'},
}

describe('basic functionality', () => {
    it('should group array by property', () => {
        expect(groupBy(users, 'age')).toEqual(_groupBy(users, 'age'))
        expect(groupBy(users, 'city')).toEqual(_groupBy(users, 'city'))
    })

    it('should group array using iteratee function', () => {
        const iteratee = (user) => (user.age >= 30 ? 'senior' : 'junior')
        expect(groupBy(users, iteratee)).toEqual(_groupBy(users, iteratee))
    })

    it('should group object values by property', () => {
        expect(groupBy(objects, 'age')).toEqual(_groupBy(objects, 'age'))
    })
})

describe('edge cases', () => {
    it('should handle null and undefined inputs', () => {
        expect(groupBy(null)).toEqual(_groupBy(null))
        expect(groupBy(undefined)).toEqual(_groupBy(undefined))
    })

    it('should handle empty array/object', () => {
        expect(groupBy([])).toEqual(_groupBy([]))
        expect(groupBy({})).toEqual(_groupBy({}))
    })

    it('should handle missing properties', () => {
        const data = [{id: 1, name: 'John'}, {id: 2}, {id: 3, name: 'Bob'}]
        expect(groupBy(data, 'name')).toEqual(_groupBy(data, 'name'))
    })
})

describe('special values', () => {
    it('should handle arrays with null/undefined values', () => {
        const data = [null, undefined, {id: 1}, {id: 2}]
        expect(groupBy(data, 'id')).toEqual(_groupBy(data, 'id'))
    })

    it('should handle arrays with primitive values', () => {
        const numbers = [1.2, 2.1, 2.3]
        expect(groupBy(numbers, Math.floor)).toEqual(_groupBy(numbers, Math.floor))

        const mixed = [1, '2', true, false, null]
        expect(groupBy(mixed, (x) => typeof x)).toEqual(_groupBy(mixed, (x) => typeof x))
    })
})

describe('complex scenarios', () => {
    it('should handle nested objects', () => {
        const data = [
            {user: {age: 25}, score: 90},
            {user: {age: 30}, score: 85},
            {user: {age: 25}, score: 95},
        ] as const

        const iteratee = (item) => item.user.age
        expect(groupBy(data, iteratee)).toEqual(_groupBy(data, iteratee))
    })

    it('should handle array properties', () => {
        const data = [
            {id: 1, tags: ['js', 'ts']},
            {id: 2, tags: ['js', 'python']},
            {id: 3, tags: ['ts', 'python']},
        ] as const

        const iteratee = (item) => item.tags[0]
        expect(groupBy(data, iteratee)).toEqual(_groupBy(data, iteratee))
    })
})

describe('performance cases', () => {
    it('should handle large arrays', () => {
        const largeArray = Array.from({length: 10000}, (_, index) => ({
            id: index,
            category: index % 5,
            value: Math.random(),
        }))

        expect(groupBy(largeArray, 'category')).toEqual(_groupBy(largeArray, 'category'))
    })
})

describe('error cases', () => {
    it('should handle invalid iteratee paths', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(groupBy(users, 'nonexistent')).toEqual(_groupBy(users, 'nonexistent'))
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(groupBy(users, '')).toEqual(_groupBy(users, ''))
    })

    it('should handle invalid iteratee functions', () => {
        const invalidIteratee = () => {
            throw new Error('error')
        }
        expect(() => groupBy(users, invalidIteratee)).toThrow()
        expect(() => _groupBy(users, invalidIteratee)).toThrow()
    })
})

describe('type safety', () => {
    interface TypedUser {
        id: number
        name: string
        age: number
    }

    const typedUsers: TypedUser[] = [
        {id: 1, name: 'John', age: 25},
        {id: 2, name: 'Jane', age: 30},
    ]

    it('should work with typed arrays', () => {
        expect(groupBy(typedUsers, 'age')).toEqual(_groupBy(typedUsers, 'age'))
        expect(groupBy(typedUsers, (user) => (user.age >= 30 ? 'senior' : 'junior'))).toEqual(
            _groupBy(typedUsers, (user) => (user.age >= 30 ? 'senior' : 'junior')),
        )
    })
})
