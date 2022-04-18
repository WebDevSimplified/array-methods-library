const {
  forEach,
  map,
  filter,
  reduce,
  some,
  every,
  flat,
  find,
} = require("./arrayMethods.js")

// const forEach = (a, ...args) => a.forEach(...args)
// const map = (a, ...args) => a.map(...args)
// const filter = (a, ...args) => a.filter(...args)
// const reduce = (a, ...args) => a.reduce(...args)
// const some = (a, ...args) => a.some(...args)
// const every = (a, ...args) => a.every(...args)
// const flat = (a, ...args) => a.flat(...args)
// const find = (a, ...args) => a.find(...args)

it("forEach", () => {
  const func = jest.fn()
  const startingArray = ["a", "b", "c"]
  forEach(startingArray, func)

  expect(func).toHaveBeenNthCalledWith(1, "a", 0, startingArray)
  expect(func).toHaveBeenNthCalledWith(2, "b", 1, startingArray)
  expect(func).toHaveBeenNthCalledWith(3, "c", 2, startingArray)
  expect(func).toHaveBeenCalledTimes(3)
})

it("map", () => {
  const func = jest.fn((elem, index) => index * 2)
  const startingArray = ["a", "b", "c"]
  const newArray = map(startingArray, func)

  expect(newArray).toEqual([0, 2, 4])
  expect(func).toHaveBeenNthCalledWith(1, "a", 0, startingArray)
  expect(func).toHaveBeenNthCalledWith(2, "b", 1, startingArray)
  expect(func).toHaveBeenNthCalledWith(3, "c", 2, startingArray)
  expect(func).toHaveBeenCalledTimes(3)
})

it("filter", () => {
  const func = jest.fn((elem, index) => elem === "a" || index === 2)
  const startingArray = ["a", "b", "c"]
  const newArray = filter(startingArray, func)

  expect(newArray).toEqual(["a", "c"])
  expect(func).toHaveBeenNthCalledWith(1, "a", 0, startingArray)
  expect(func).toHaveBeenNthCalledWith(2, "b", 1, startingArray)
  expect(func).toHaveBeenNthCalledWith(3, "c", 2, startingArray)
  expect(func).toHaveBeenCalledTimes(3)
})

describe("reduce", () => {
  it("with a starting value", () => {
    const func = jest.fn((sum, elem) => sum + elem)
    const startingArray = [5, 3, 7]
    const total = reduce(startingArray, func, 4)

    expect(total).toEqual(19)
    expect(func).toHaveBeenNthCalledWith(1, 4, 5, 0, startingArray)
    expect(func).toHaveBeenNthCalledWith(2, 9, 3, 1, startingArray)
    expect(func).toHaveBeenNthCalledWith(3, 12, 7, 2, startingArray)
    expect(func).toHaveBeenCalledTimes(3)
  })

  it("with no starting value", () => {
    const func = jest.fn((sum, elem) => sum + elem)
    const startingArray = [5, 3, 7]
    const total = reduce(startingArray, func)

    expect(total).toEqual(15)
    expect(func).toHaveBeenNthCalledWith(1, 5, 3, 1, startingArray)
    expect(func).toHaveBeenNthCalledWith(2, 8, 7, 2, startingArray)
    expect(func).toHaveBeenCalledTimes(2)
  })
})

describe("some", () => {
  it("with a truthy value", () => {
    const func = jest.fn(elem => elem > 0)
    const startingArray = [-4, 3, 6]
    const result = some(startingArray, func)

    expect(result).toEqual(true)
    expect(func).toHaveBeenNthCalledWith(1, -4, 0, startingArray)
    expect(func).toHaveBeenNthCalledWith(2, 3, 1, startingArray)
    expect(func).toHaveBeenCalledTimes(2)
  })

  it("with no truthy values", () => {
    const func = jest.fn(elem => elem > 0)
    const startingArray = [-4, -3, -6]
    const result = some(startingArray, func)

    expect(result).toEqual(false)
    expect(func).toHaveBeenNthCalledWith(1, -4, 0, startingArray)
    expect(func).toHaveBeenNthCalledWith(2, -3, 1, startingArray)
    expect(func).toHaveBeenNthCalledWith(3, -6, 2, startingArray)
    expect(func).toHaveBeenCalledTimes(3)
  })
})

describe("every", () => {
  it("with a falsey value", () => {
    const func = jest.fn(elem => elem < 0)
    const startingArray = [-4, 3, 6]
    const result = every(startingArray, func)

    expect(result).toEqual(false)
    expect(func).toHaveBeenNthCalledWith(1, -4, 0, startingArray)
    expect(func).toHaveBeenNthCalledWith(2, 3, 1, startingArray)
    expect(func).toHaveBeenCalledTimes(2)
  })

  it("with no falsey values", () => {
    const func = jest.fn(elem => elem < 0)
    const startingArray = [-4, -3, -6]
    const result = every(startingArray, func)

    expect(result).toEqual(true)
    expect(func).toHaveBeenNthCalledWith(1, -4, 0, startingArray)
    expect(func).toHaveBeenNthCalledWith(2, -3, 1, startingArray)
    expect(func).toHaveBeenNthCalledWith(3, -6, 2, startingArray)
    expect(func).toHaveBeenCalledTimes(3)
  })
})

describe("flat", () => {
  it("with no value passed", () => {
    const startingArray = [1, [2, 3], [4, [5, 6, [7, 8]]]]
    const result = flat(startingArray)

    expect(result).toEqual([1, 2, 3, 4, [5, 6, [7, 8]]])
  })

  it("with a value passed", () => {
    const startingArray = [1, [2, 3], [4, [5, 6, [7, 8]]]]
    const result = flat(startingArray, 2)

    expect(result).toEqual([1, 2, 3, 4, 5, 6, [7, 8]])
  })

  it("with infinite passed", () => {
    const startingArray = [1, [2, 3], [4, [5, 6, [7, 8]]]]
    const result = flat(startingArray, Number.POSITIVE_INFINITY)

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
  })
})

describe("find", () => {
  it("with no value found", () => {
    const func = jest.fn(elem => elem === 5)
    const startingArray = [1, 2, 3]
    const result = find(startingArray, func)

    expect(result).toBeUndefined()
    expect(func).toHaveBeenNthCalledWith(1, 1, 0, startingArray)
    expect(func).toHaveBeenNthCalledWith(2, 2, 1, startingArray)
    expect(func).toHaveBeenNthCalledWith(3, 3, 2, startingArray)
    expect(func).toHaveBeenCalledTimes(3)
  })

  it("with a value found", () => {
    const func = jest.fn(elem => elem === 2)
    const startingArray = [1, 2, 3]
    const result = find(startingArray, func)

    expect(result).toEqual(2)
    expect(func).toHaveBeenNthCalledWith(1, 1, 0, startingArray)
    expect(func).toHaveBeenNthCalledWith(2, 2, 1, startingArray)
    expect(func).toHaveBeenCalledTimes(2)
  })
})
