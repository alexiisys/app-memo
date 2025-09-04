import * as React from 'react';
import { type ReactElement } from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import type { TextInputProps } from 'react-native';
import { I18nManager, StyleSheet, View } from 'react-native';
import { TextInput as NTextInput } from 'react-native';
import { tv } from 'tailwind-variants';

import { Text } from './text';

const inputTv = tv({
  slots: {
    container: 'flex-1',
    inputContainer: 'align-center relative flex-row gap-2',
    label: 'text-md mb-2 font-gilroy font-medium text-lightOrange2',
    input:
      'bg-darkOrange p-4 font-gilroy-600 text-base text-white font-medium leading-5  dark:bg-darkOrange dark:text-white',
  },

  variants: {
    outlined: {
      true: {
        input: 'rounded-xl border border-stroke bg-white ',
      },
    },
    focused: {
      true: {
        input: '',
      },
    },
    search: {
      true: {
        input: 'bg-textGrey text-white',
        inputContainer: 'bg-textGrey items-center rounded-md px-2',
      },
    },
    error: {
      true: {
        input: 'border-danger-600',
        label: 'text-danger-600 dark:text-danger-600',
      },
    },
    disabled: {
      true: {
        input: 'bg-neutral-200',
      },
    },
  },
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false,
  },
});

export interface NInputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: string;
  search?: boolean;
  outlined?: boolean;
  require?: boolean;
  icon?: ReactElement;
  leftIcon?: ReactElement;
}

type TRule<T extends FieldValues> =
  | Omit<
      RegisterOptions<T>,
      'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >
  | undefined;

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
};

interface ControlledInputProps<T extends FieldValues>
  extends NInputProps,
    InputControllerType<T> {}

export const Input = React.forwardRef<NTextInput, NInputProps>((props, ref) => {
  const {
    label,
    error,
    testID,
    icon,
    outlined,
    leftIcon,
    search,
    require,
    ...inputProps
  } = props;
  const [isFocussed, setIsFocussed] = React.useState(false);
  const onBlur = React.useCallback(() => setIsFocussed(false), []);
  const onFocus = React.useCallback(() => setIsFocussed(true), []);

  const styles = React.useMemo(
    () =>
      inputTv({
        error: Boolean(error),
        focused: isFocussed,
        disabled: Boolean(props.disabled),
        outlined: Boolean(outlined),
        search: Boolean(search),
      }),
    [error, isFocussed, props.disabled, outlined, search]
  );

  return (
    <View className={styles.container()}>
      {label && (
        <Text
          testID={testID ? `${testID}-label` : undefined}
          className={styles.label()}
        >
          {label}
          {require && <Text className="text-coralPink">*</Text>}
        </Text>
      )}
      <View className={styles.inputContainer()}>
        {leftIcon}
        <NTextInput
          testID={testID}
          ref={ref}
          className={styles.input()}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholderTextColor={'rgba(244,242,238,0.67)'}
          {...inputProps}
          style={StyleSheet.flatten([
            { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' },
            { textAlign: I18nManager.isRTL ? 'right' : 'left' },
            { width: '100%' },
            inputProps.style,
          ])}
        />
        <View className="absolute right-0 self-center ">
          {icon}
          <View style={{ width: 30 }} />
        </View>
      </View>
      {error && (
        <Text
          testID={testID ? `${testID}-error` : undefined}
          className="text-sm text-danger-400 dark:text-danger-600"
        >
          {error}
        </Text>
      )}
    </View>
  );
});

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>
) {
  const { name, control, rules, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });

  return (
    <Input
      ref={field.ref}
      autoCapitalize="none"
      onChangeText={field.onChange}
      value={(field.value as string) || ''}
      {...inputProps}
      error={fieldState.error?.message}
    />
  );
}
