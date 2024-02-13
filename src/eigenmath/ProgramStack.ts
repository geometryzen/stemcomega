import { U } from "math-expression-tree";

export interface ProgramStack {
    get length(): number;
    set length(length: number);
    concat(exprs: U[]): void;
    get isatom(): boolean;
    get iscons(): boolean;
    dupl(): void;
    peek(): U;
    pop(): U;
    push(expr: U): void;
    head(): void;
    rest(): void;
    rotateL(n: number): void;
    rotateR(n: number): void;
    swap(): void;
    getAt(i: number): U;
    setAt(i: number, expr: U): void;
    splice(start: number, deleteCount?: number): U[];
}