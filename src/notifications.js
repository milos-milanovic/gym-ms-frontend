import { notification } from 'antd';

/* ------ NOTIFICATION HELPER JS ------ */

const openNotification = (type, message, description) => {
  notification[type]({
    message,
    description,
    duration: 10,
  });
};

export const successNotification = (message, description) => {
  openNotification('success', message, description);
};

export const infoNotification = (message, description) => {
  openNotification('info', message, description);
};

export const warningNotification = (message, description) => {
  openNotification('warning', message, description);
};

export const errorNotification = (message, description) => {
  openNotification('error', message, description);
};
