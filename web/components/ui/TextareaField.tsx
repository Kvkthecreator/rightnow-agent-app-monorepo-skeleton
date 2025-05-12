import * as React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

export interface TextareaFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
}

export function TextareaField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
}: TextareaFieldProps<T>) {
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
            <textarea
              id={field.name}
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent disabled:opacity-50"
            />
            {fieldState.error && (
              <p className="text-sm text-red-600">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
}