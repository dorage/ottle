import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export const ModalPortal = ({ children }) => {
    const ref = useRef();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (document) {
            const dom = document.getElementById('modal-root');
            ref.current = dom;
        }
    });

    if (ref.current && mounted) {
        return createPortal(<>{children}</>, ref.current);
    }
};

export const AlertPortal = ({ children }) => {
    const ref = useRef();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (document) {
            const dom = document.getElementById('alert-root');
            ref.current = dom;
        }
    });

    if (ref.current && mounted) {
        return createPortal(<>{children}</>, ref.current);
    }
};
