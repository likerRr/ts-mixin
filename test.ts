import test from 'ava';
import {Mixin} from './index';

test('apply mixins', t => {
  // scaffold
  class A {
    constructor(n: number) {
      t.is(++cnt, 1);
      t.is(n, 0);
    }

    static a = 'A';
    ap = 'a';

    am() {
      return this.ap;
    }
  }
  class B {
    constructor(n: number) {
      t.is(++cnt, 2);
      t.is(n, 0);
    }

    static b = 'B';
    bp = 'b';

    bm() {
      return this.bp;
    }
  }
  interface AB extends B, A {}
  class X extends Mixin<AB>(B, A) {
    constructor(n: number) {
      super(n);
      t.is(++cnt, 3);
      t.is(n, 0);
    }

    static x = 'X';
    xp = 'x';

    xm() {
      return this.xp;
    }
  }

  //

  let cnt = 0;
  const x = new X(0);
  t.is(++cnt, 4);
  t.true(x instanceof A === false);
  t.true(x instanceof B === false);
  t.true(x instanceof X);
  t.is(X['a'], 'A');
  t.is(X['b'], 'B');
  t.is(X.x, 'X');
  t.is(x.ap, 'a');
  t.is(x.bp, 'b');
  t.is(x.xp, 'x');
  t.is(x.am(), 'a');
  t.is(x.bm(), 'b');
  t.is(x.xm(), 'x');
});
