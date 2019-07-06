
export default class BiometricService {
    /**
     * Helper function that identifies the device type (iOS or Android) and calls the appropriate function that checks for bimetric availability.
     */
    checkBiometricSupport () {
        let that = this;
        return new Promise((resolve, reject) => {
            if (navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
                that.checkIOSBiometricSupport(resolve, reject);
            } else if (navigator.userAgent.toLowerCase().indexOf('andriod') > 0) {
                that.checkAndroidBiometricSupport(resolve, reject);
            } else {
                console.info(`Platform not recognized while checking for biometric auth availability.`);
                resolve({
                    deviceType: null,
                    biometricsSupported: false,
                    biometricType: null
                });
            }
        });
    }

    checkIOSBiometricSupport (resolve, reject) {
        let that = this;
        window.plugins.touchid.isAvailable(
            function (type) {
                // biometric auth is available
                console.info(`iOS biometric auth is available, type is ${type}`);
                resolve({
                    deviceType: 'ios',
                    biometricsSupported: true,
                    biometricType: (type === 'face' ? 'face' : 'touch')
                });
            },
            function (message) {
                // error function, biometric auth is not available
                console.warn(`Biometric auth is not available on iOS device. Message is ${JSON.stringify(message)}`);
                resolve({
                    deviceType: 'ios',
                    biometricsSupported: false,
                    biometricType: null
                });
            }
        )
    }

    checkAndroidBiometricSupport (resolve, reject) {
        let that = this;
        FingerprintAuth.isAvailable(
            function (result) {
                // biometric auth is available
                console.info(`Android biometric auth is available, result is ${JSON.stringify(result)}`);
                resolve({
                    deviceType: 'android',
                    biometricsSupported: true,
                    biometricType: 'fingerprint'
                });
            },
            function (message) {
                // if (err === 'Cancelled') {
                //     console.info(`Android fingerprint auth dialog cancelled`);
                //     // TODO: Show warning message that this is the only form of authentication.
                //     // with option to re-enroll
                // }
                // biometric auth is not available
                console.warn(`Biometric auth is not available on Android device. Message is ${JSON.stringify(message)}`);
                resolve({
                    deviceType: 'android',
                    biometricsSupported: false,
                    biometricType: null
                });
            }
        )
    }
};