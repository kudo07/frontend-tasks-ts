import { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';

type KeyOf<t> = keyof T;

interface MultiSelectDropdownProps<T> {
  id: string;
  label?: string;
  placeholder?: string;

  options: T[];
  value: T[];

  valueKey: KeyOf<T>;

  onChange: (selected: T[]) => void;

  searchable?: boolean;
  disabled?: boolean;
  showIcon?: boolean;
  iconKey?: KeyOf<T>;

  className?: string;
  style?: React.CSSProperties;
}

function MultipleSelectDropdown<T extends Record<string, any>>({
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
}: MultiSelectDropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  // outside click close

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function isSelected<T extends Record<string, any>>(item: T) {
    return value.some((v: T) => v[valueKey] === item[valueKey]);
  }

  const toggleOpen = (item: T) => {
    if (isSelected(item)) {
      onChange(value.filter((v: T) => v[valueKey] !== item[valueKey]));
    } else {
      onChange([...value, item]);
    }
  };
}
