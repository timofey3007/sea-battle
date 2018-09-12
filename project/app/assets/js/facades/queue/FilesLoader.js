import BaseQueue from "./BaseQueue";
import axios from "axios";
import {getFileNameFromUri} from "../Helper";
import FileStorage from "../FileStorage";

export default class FilesLoader extends BaseQueue {
    constructor(localDatabase, files) {
        super();

        this._validateParams(localDatabase, files);

        this.localDatabase = localDatabase;
        this.queue = files;
        this.threadsCount = 5;
    }

    setThreadsCount(threadsCount) {
        this.threadsCount = threadsCount || this.threadsCount;

        return this;
    }

    runQueue() {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < this.threadsCount; i++) {
                this._loadFilesRecursive(resolve, reject);
            }
        });
    }

    _validateParams(localDatabase, files) {
        if (!localDatabase instanceof FileStorage) {
            throw new Error('Argument localDatabase is not instance of FileStorage');
        }

        if (!Array.isArray(files)) {
            throw new Error('Argument files is not Array');
        }
    }

    _loadFilesRecursive(resolve, reject) {
        let filePath = this.getQueueItem();

        if (typeof filePath !== "string") {
            return;
        }

        axios({
            method: 'GET',
            url: filePath,
            responseType: 'blob',
        })
            .then(response => {
                this.localDatabase
                    .storeBlobFile(response.data, getFileNameFromUri(filePath))
                    .then(() => {
                        if (this.getQueueCount() === 0) {
                            resolve();

                            return;
                        }

                        this._loadFilesRecursive(resolve, reject);
                    })
                    .catch(() => reject());
            });
    }
}