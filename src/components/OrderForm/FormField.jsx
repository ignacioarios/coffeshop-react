import styles from './OrderForm.module.css';

export function FormField({ label, type, name, value, onChange, error }) {
  return (
    <div className={styles.formField}>
      <label>
        {label}
        <input type={type} name={name} value={value} onChange={onChange} />
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}