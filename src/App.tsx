import { useState } from 'react';
import styles from './App.module.css';
import Button from './button/Button';
import Modal from './modal/Modal';

type Country = {
  id: number;
  name: string;
  dialCode: string;
  flag: string;
};

function App() {
  const [open, setOpen] = useState<boolean>(false);

  const countries: Country[] = [
    { id: 1, name: 'India', dialCode: '+91', flag: '/flags/in.svg' },
    { id: 2, name: 'USA', dialCode: '+1', flag: '/flags/us.svg' },
  ];
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  return (
    <>
      <Button onClick={() => setOpen(true)} text="open Modals" />

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Create User"
        /*behaviour*/
        closeOnEsc={true}
        closeOnOverlayClick={true}
        /*layout*/
        size="auto"
        centered={true}
        // parent passed classes
        className={styles.modalRoot}
        overlayClassName={styles.overlay}
        contentClassName={styles.content}
        overlayStyle={{
          background: 'rgba(10, 10, 20, 0.75)',
        }}
        contentStyle={{
          width: '480px',
          borderRadius: '16px',
        }}
      >
        <form className={styles.form}>
          <input placeholder="Name" />
          <input placeholder="Email" />

          <div className={styles.actions}>
            <button type="button" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default App;
