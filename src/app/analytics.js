import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase';

/**
 * 
 * @param {String} eventname 
 * @param {{
    coupon?: EventParams['coupon'];
    currency?: EventParams['currency'];
    items?: EventParams['items'];
    payment_type?: EventParams['payment_type'];
    value?: EventParams['value'];
    [key: string]: any;
}} eventParams 
 * @param {AnalyticsCallOptions} options 
 * @returns 
 */
export const logEventFirebase = (eventname, eventParams, options) =>
    logEvent(analytics, eventname, eventParams, options);
