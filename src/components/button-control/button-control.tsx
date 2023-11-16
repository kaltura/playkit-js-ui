import {h, Ref} from 'preact';
import style from '../../styles/style.scss';
import {forwardRef} from 'preact/compat';

/**
 * ButtonControl component
 *
 * @const ButtonControl
 * @example <ButtonControl/>
 */
const ButtonControl = forwardRef<HTMLDivElement, any>((props: any, ref: Ref<any>) => {
  const {className, children, name, ...rest} = props;
  let classes = [style.controlButtonContainer, `${__CSS_MODULE_PREFIX__}-control-${convertToKebabCase(name)}`];
  if (className) {
    const additionalClasses = Array.isArray(className) ? className : [className];
    classes = classes.concat(additionalClasses);
  }
  return (
    <div className={classes.join(' ')} ref={ref} {...rest}>
      {children}
    </div>
  );
});

/**
 * Transforms PascalCase string to kebab-case string
 * @param {string} str - the string to transform
 * @return {string} - the transformed string
 */
const convertToKebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();

export {ButtonControl};
