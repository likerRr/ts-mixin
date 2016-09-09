/**
 * Original solution belongs to `github's` user [falsandtru](https://github.com/falsandtru)
 * @see https://github.com/Microsoft/TypeScript/issues/2919#issuecomment-225398629
 */

export default Mixin;

export function Mixin<T>(...mixins: Array<new (...args: any[]) => any>): new (...args: any[]) => T {
  return mixins.reduceRight((prev, cur) => __extends(cur, prev), class {});
}

function __extends(f: MixinFunction, s: MixinFunction): MixinFunction {
  const mixedClass = class {
    constructor() {
      return f.apply(s.apply(this, arguments) || this, arguments);
    }
  };
  void Object.assign(mixedClass.prototype, f.prototype, s.prototype);
  for (const p in s) if (s.hasOwnProperty(p)) mixedClass[p] = s[p];
  for (const p in f) if (f.hasOwnProperty(p)) mixedClass[p] = f[p];

  return mixedClass;
}

interface MixinFunction {
  new (...args: any[]): any;
}
