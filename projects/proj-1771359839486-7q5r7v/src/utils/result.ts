export class Result<T, E extends Error> {
  private constructor(private readonly value?: T, private readonly error?: E) {}

  public static ok<T>(value?: T): Result<T, never> {
    return new Result(value);
  }

  public static err<E extends Error>(error: E): Result<never, E> {
    return new Result(undefined, error);
  }

  public isOk(): this is { value: T } {
    return this.error === undefined;
  }

  public isErr(): this is { error: E } {
    return this.error !== undefined;
  }

  public unwrap(): T {
    if (this.isErr()) {
      throw new Error('Cannot unwrap an error result');
    }
    return this.value as T;
  }

  public unwrapErr(): E {
    if (this.isOk()) {
      throw new Error('Cannot unwrap an ok result');
    }
    return this.error as E;
  }
}