import { FormEvent } from 'react';

function ModalButton({
  title,
  loading = false,
  onClick,
  className = '',
}: {
  title: string;
  loading: boolean;
  onClick: (e: FormEvent) => void;
  className: string;
}) {
  return (
    <button
      type='button'
      className={`block text-white py-[10px] text-sm rounded-md focus:ring-2 focus:ring-offset-1 px-5 ${className}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Loading...' : title}
    </button>
  );
}

export default ModalButton;
