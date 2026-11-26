import React from 'react';
import { SearchIcon } from '@/components/icons/SearchIcon';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>
        <SearchIcon />
      </span>
      <input
        type="search"
        className={styles.input}
        placeholder="поиск..."
        aria-label="Поиск задач"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
