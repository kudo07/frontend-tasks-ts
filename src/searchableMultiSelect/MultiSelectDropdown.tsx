import { useEffect, useRef, useState, type MouseEvent } from 'react';
import styles from './MultiSelectDropdown.module.css';

type KeyOf<T> = keyof T;

interface MultiSelectDropdownProps<T> {
  id: string;
  label?: string;
  placeholder?: string;

  options: T[];
  value: T[];

  labelKey: KeyOf<T>;
  valueKey: KeyOf<T>;

  onChange: (selected: T[]) => void;
  searchable?: boolean;
  disabled?: boolean;
  showIcon?: boolean;
  iconKey?: KeyOf<T>;

  className?: string;
  style?: React.CSSProperties;
}
function MultiSelectDropdown<T extends Record<string, any>>({
  id,
  label,
  placeholder = 'Select...',
  options,
  value,
  labelKey,
  valueKey,
  onChange,
  searchable = true,
  disabled = false,
  showIcon = false,
  iconKey,
  className,
  style,
}: MultiSelectDropdownProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  // outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // remove tag
  const removeTag = (item: T) => {
    onChange(value.filter((v: any) => v[valueKey] !== item[valueKey]));
  };

  const filteredOptions = options.filter((opt: any) =>
    String(opt[labelKey]).toLowerCase().includes(query.toLowerCase())
  );

  const isSelected = (item: T) =>
    value.some((v) => v[valueKey] === item[valueKey]);

  const toggleOption = (item: T) => {
    if (isSelected(item)) {
      onChange(value.filter((v) => v[valueKey] !== item[valueKey]));
    } else {
      onChange([...value, item]);
    }
  };
  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className || ''}`}
      style={style}
    >
      <div
        className={`${styles.control} ${disabled ? styles.disabled : ''}`}
        onClick={() => !disabled && setOpen(true)}
      >
        <div className={styles.tags}>
          {value.map((item: any) => (
            <span key={String(item[valueKey])} className={styles.tag}>
              {String(item[labelKey])}
              {!disabled && <button onClick={() => removeTag(item)}>X</button>}
            </span>
          ))}
          {searchable && !disabled && (
            <input
              ref={inputRef}
              id={id}
              value={query}
              placeholder={value.length ? '' : placeholder}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setOpen(true)}
            />
          )}
        </div>
        {open && !disabled && (
          <ul>
            {!filteredOptions.length && <li>No Options</li>}
            {filteredOptions.map((option: any) => (
              <li onClick={() => toggleOption(option)}>
                {showIcon && iconKey && option[iconKey] && (
                  <img
                    src={String(option[iconKey])}
                    alt=""
                    className={styles.icon}
                  />
                )}
                <span>{String(option[labelKey])}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MultiSelectDropdown;
