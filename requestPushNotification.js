const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Push Notification permisson grannted!');
        }
    } catch (error) {
        console.error('Error requesting notification permission:', error);
    }
};

export default requestNotificationPermission;
