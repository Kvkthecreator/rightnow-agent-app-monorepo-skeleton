import * as React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

export interface Option {
  label: string;
  value: string;
}

export interface SelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: Option[];
  disabled?: boolean;
}

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  options,
  disabled,
}: SelectFieldProps<T>) {
  return (
    <div className="space-y-2 rounded-lg">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <select
              id={field.name}
              {...field}
              disabled={disabled}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent disabled:opacity-50"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {fieldState.error && (
              <p className="text-sm text-red-600">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}