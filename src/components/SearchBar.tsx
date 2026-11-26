import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <input
        type="search"
        className={styles.input}
        placeholder="Поиск по тексту или дате (dd.mm.yyyy)"
        aria-label="Поиск задач"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
