import React from 'react';
import { useDispatch } from 'react-redux';
import { logEventFirebase } from '../../app/analytics';
import { ALERTS, broadcastAlert } from '../../features/alert/alertSlice';

export const ShareHoC = (Component) => ({ url, ...props }) => {
    const dispatch = useDispatch();

    const copyUrl = () => {
        var el = document.createElement('input');
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    const onClickShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Ottle',
                url: `https://${url}`,
            });
        } else {
            logEventFirebase('copy_link', { url });
            copyUrl();
            dispatch(broadcastAlert(ALERTS.ottleDetail.copied));
        }
    };

    return (
        <>
            <Component onClick={onClickShare} {...props} />
        </>
    );
};
