export function getFileNameFromUri(uri) {
    if (!uri) {
        return null;
    }

    let explodedUri = uri.split('/');

    return explodedUri[explodedUri.length - 1];
}

export function randomString(len) {
    len = len || 8;
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    return Array.from(Array(len).keys())
        .reduce((randomStr) => {
            randomStr += possible.charAt(Math.floor(Math.random() * possible.length));

            return randomStr;
        }, '');
}