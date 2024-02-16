import React, { useState } from 'react';
import Clipboard from 'clipboard';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const clipboard = new Clipboard('.copy-button', {
      text: () => text
    });

    clipboard.on('success', () => {
      setCopied(true);
      clipboard.destroy();
    });

    clipboard.on('error', () => {
      console.error('Failed to copy.');
      clipboard.destroy();
    });
  };

  return (
    <div>
      <button
        className={`px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none ${
          copied ? 'bg-green-500' : ''
        }`}
        onClick={copyToClipboard}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default CopyButton;
