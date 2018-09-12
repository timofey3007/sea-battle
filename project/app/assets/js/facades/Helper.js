export function getFileNameFromUri(uri) {
    if (!uri) {
        return null;
    }

    let explodedUri = uri.split('/');

    return explodedUri[explodedUri.length - 1];
}