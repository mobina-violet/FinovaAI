import { ChevronDown, Loader2 } from "lucide-react";

const fieldClass =
  "w-full rounded-xl border bg-black/30 px-4 py-3 text-sm text-fg outline-none transition placeholder:text-muted/50 focus:border-gold/50 focus:bg-black/40 focus:ring-4 focus:ring-gold/10";

function FieldShell({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm text-fg/80">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs text-danger">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

type TextFieldProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  ltr?: boolean;
  suffix?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "dir" | "className">;

export function TextField({ label, name, error, hint, ltr, suffix, ...props }: TextFieldProps) {
  return (
    <FieldShell label={label} htmlFor={name} error={error} hint={hint}>
      <div className="relative">
        <input
          id={name}
          name={name}
          dir={ltr ? "ltr" : undefined}
          aria-invalid={Boolean(error)}
          className={`${fieldClass} ${error ? "border-danger/60" : "border-white/10"} ${
            ltr ? "text-left" : ""
          } ${suffix ? (ltr ? "pr-16" : "pl-16") : ""}`}
          {...props}
        />
        {suffix && (
          <span
            className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-xs text-muted ${
              ltr ? "right-4" : "left-4"
            }`}
          >
            {suffix}
          </span>
        )}
      </div>
    </FieldShell>
  );
}

export function SelectField({
  label,
  name,
  options,
  placeholder = "انتخاب کنید",
  defaultValue,
  error,
}: {
  label: string;
  name: string;
  options: readonly string[];
  placeholder?: string;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <FieldShell label={label} htmlFor={name} error={error}>
      <div className="relative">
        <select
          id={name}
          name={name}
          defaultValue={defaultValue ?? ""}
          aria-invalid={Boolean(error)}
          className={`${fieldClass} appearance-none ${
            error ? "border-danger/60" : "border-white/10"
          } [&>option]:bg-surface`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
    </FieldShell>
  );
}

export function TextAreaField({
  label,
  name,
  error,
  rows = 3,
  ...props
}: {
  label: string;
  name: string;
  error?: string;
  rows?: number;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "className" | "rows">) {
  return (
    <FieldShell label={label} htmlFor={name} error={error}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        aria-invalid={Boolean(error)}
        className={`${fieldClass} resize-none ${error ? "border-danger/60" : "border-white/10"}`}
        {...props}
      />
    </FieldShell>
  );
}

export function SubmitButton({
  pending,
  children,
}: {
  pending: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-gold-light to-gold text-sm font-semibold text-black shadow-[0_8px_24px_rgba(198,161,91,0.25)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
}

export function FormAlert({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
    >
      {message}
    </div>
  );
}