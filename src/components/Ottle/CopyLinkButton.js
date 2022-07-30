import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { IconButton } from '../Button/IconButton';
import { HiOutlineClipboardCopy } from 'react-icons/hi';
import { ALERTS, broadcastAlert } from '../../features/alert/alertSlice';

//#region styled-components
//#endregion

export const CopyLinkButton = ({ username, ottleId }) => {
    const dispatch = useDispatch();

    const copyUrl = () => {
        var el = document.createElement('input');
        el.value = `${window.location.host}/${username}/o/${ottleId}`;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    const onClickCopy = () => {
        copyUrl();
        dispatch(broadcastAlert(ALERTS.ottleDetail.copied));
    };

    return (
        <IconButton
            active={true}
            onClick={onClickCopy}
            icon={<HiOutlineClipboardCopy />}
        />
    );
};
