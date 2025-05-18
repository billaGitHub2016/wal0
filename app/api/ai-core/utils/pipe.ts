/* eslint-disable @typescript-eslint/no-explicit-any */
export const pipe =
  <T, R>(...fns: Array<(arg: any) => Promise<any>>) =>
  async (value: T): Promise<R> => {
    return fns.reduce<Promise<any>>(
      async (promise, fn) => fn(await promise),
      Promise.resolve(value),
    )
  }
