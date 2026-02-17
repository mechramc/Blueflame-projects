export type Result<T, E> = Ok<T> | Err<E>;

class Ok<T> {
  readonly value: T;
  readonly isOk: true = true;
  readonly isErr: false = false;

  constructor(value: T) {
    this.value = value;
  }
}

class Err<E> {
  readonly error: E;
  readonly isOk: false = false;
  readonly isErr: true = true;

  constructor(error: E) {
    this.error = error;
  }
}

export function ok<T>(value: T): Result<T, never> {
  return new Ok(value);
}

export function err<E>(error: E): Result<never, E> {
  return new Err(error);
}
