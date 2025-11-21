import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';

const StatusModal = ({ type, message, actionLabel, onAction, onClose }) => {
  const isError = type === 'error';
  const Icon = isError ? XCircle : CheckCircle;
  const iconColor = isError ? 'var(--error-red)' : 'var(--primary-green)';
  const textColor = isError ? 'var(--error-red)' : 'var(--primary-green)';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 style={{ color: textColor, marginBottom: '20px' }}>
          {message}
        </h3>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <Icon size={64} color={iconColor} />
        </div>

        {actionLabel && onAction && (
          <button 
            className="btn-primary" 
            style={{ backgroundColor: isError ? 'var(--error-red)' : 'var(--primary-green)', width: '100%' }}
            onClick={onAction}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default StatusModal;