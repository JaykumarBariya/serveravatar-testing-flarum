import extractText from './utils/extractText';
import app from './app';

/**
 * Extend an object's method by running its output through a mutating callback
 * every time it is called.
 *
 * The callback accepts the method's return value and should perform any
 * mutations directly on this value. For this reason, this function will not be
 * effective on methods which return scalar values (numbers, strings, booleans).
 *
 * Care should be taken to extend the correct object – in most cases, a class'
 * prototype will be the desired target of extension, not the class itself.
 *
 * @example <caption>Example usage of extending one method.</caption>
 * extend(Discussion.prototype, 'badges', function(badges) {
 *   // do something with `badges`
 * });
 *
 * @example <caption>Example usage of extending multiple methods.</caption>
 * extend(IndexPage.prototype, ['oncreate', 'onupdate'], function(vnode) {
 *   // something that needs to be run on creation and update
 * });
 *
 * @param object The object that owns the method
 * @param methods The name or names of the method(s) to extend
 * @param callback A callback which mutates the method's output
 */
export function extend<T extends Record<string, any>, K extends KeyOfType<T, Function>>(
  object: T | string,
  methods: K | K[],
  callback: (this: T, val: ReturnType<T[K]>, ...args: Parameters<T[K]>) => void
) {
  const extension = app.currentInitializerExtension;

  // A lazy loaded module, only apply the function after the module is loaded.
  if (typeof object === 'string') {
    let [namespace, id] = flarum.reg.namespaceAndIdFromPath(object);

    return flarum.reg.onLoad(namespace, id, (module) => {
      extend(module.prototype, methods, callback);
    });
  }

  const allMethods = Array.isArray(methods) ? methods : [methods];

  allMethods.forEach((method: K) => {
    const original: Function | undefined = object[method];

    object[method] = function (this: T, ...args: Parameters<T[K]>) {
      const value = original ? original.apply(this, args) : undefined;

      try {
        callback.apply(this, [value, ...args]);
      } catch (e) {
        app.handleErrorOnce(
          extension,
          `${extension}::extend::${object.constructor.name}::${method.toString()}`,
          extractText(app.translator.trans('core.lib.error.extension_runtime_failed_message', { extension })),
          `${extension} failed to extend ${object.constructor.name}::${method.toString()}`,
          e
        );
      }

      return value;
    } as T[K];

    Object.assign(object[method], original);
  });
}

/**
 * Override an object's method by replacing it with a new function, so that the
 * new function will be run every time the object's method is called.
 *
 * The replacement function accepts the original method as its first argument,
 * which is like a call to `super`. Any arguments passed to the original method
 * are also passed to the replacement.
 *
 * Care should be taken to extend the correct object – in most cases, a class'
 * prototype will be the desired target of extension, not the class itself.
 *
 * @example <caption>Example usage of overriding one method.</caption>
 * override(Discussion.prototype, 'badges', function(original) {
 *   const badges = original();
 *   // do something with badges
 *   return badges;
 * });
 *
 * @example <caption>Example usage of overriding multiple methods.</caption>
 * extend(Discussion.prototype, ['oncreate', 'onupdate'], function(original, vnode) {
 *   // something that needs to be run on creation and update
 * });
 *
 * @param object The object that owns the method
 * @param methods The name or names of the method(s) to override
 * @param newMethod The method to replace it with
 */
export function override<T extends Record<any, any>, K extends KeyOfType<T, Function>>(
  object: T | string,
  methods: K | K[],
  newMethod: (this: T, orig: T[K], ...args: Parameters<T[K]>) => void
) {
  const extension = app.currentInitializerExtension;

  // A lazy loaded module, only apply the function after the module is loaded.
  if (typeof object === 'string') {
    let [namespace, id] = flarum.reg.namespaceAndIdFromPath(object);

    return flarum.reg.onLoad(namespace, id, (module) => {
      override(module.prototype, methods, newMethod);
    });
  }

  const allMethods = Array.isArray(methods) ? methods : [methods];

  allMethods.forEach((method) => {
    const original: Function = object[method];

    object[method] = function (this: T, ...args: Parameters<T[K]>) {
      try {
        return newMethod.apply(this, [original?.bind(this), ...args]);
      } catch (e) {
        app.handleErrorOnce(
          extension,
          `${extension}::extend::${object.constructor.name}::${method.toString()}`,
          extractText(app.translator.trans('core.lib.error.extension_runtime_failed_message', { extension })),
          `${extension} failed to override ${object.constructor.name}::${method.toString()}`,
          e
        );
      }
    } as T[K];

    Object.assign(object[method], original);
  });
}
