export interface Function<T, R> {
    apply(t: T): R;
}