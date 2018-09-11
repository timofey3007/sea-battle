'use strict';

export default class FileStorage {
    constructor(objectStoreName) {
        this.database = null;
        this.objectStoreName = objectStoreName;
        this.dbVersion = 1;

        this._initDatabase();
    }

    _initDatabase() {
        let request = indexedDB.open('see-battle-db', this.dbVersion);

        request.onerror = event => {
            console.log('event failed', event);
        };

        request.onsuccess = event => {
            this.database = event.target.result;
        };

        // For future use. Currently only in latest Firefox versions
        request.onupgradeneeded = event => {
            this.database = event.target.result;

            this.database.createObjectStore(this.objectStoreName);
        };
    }

    _getObjectStore() {
        return this.database.transaction([this.objectStoreName], "readwrite")
            .objectStore(this.objectStoreName);
    }

    getBlobFile(fileName) {
        return new Promise((resolve, reject) => {
            let request = this._getObjectStore()
                .get(fileName);

            request.onsuccess = event => {
                resolve(event.target.result);
            };
            request.onerror = event => {
                reject(event);
            };
        });
    }

    getUrlFromBlob(blob) {
        let URL = URL = window.URL || window.webkitURL;

        return URL.createObjectURL(blob);
    }

    storeBlobFile(file, fileName) {
        return new Promise((resolve, reject) => {
            let savedFile = this._getObjectStore().put(file, fileName);

            // Put the blob into the database
            savedFile.onsuccess = () => {
                resolve();
            };

            savedFile.onerror = () => {
                reject();
            };
        });
    }
}