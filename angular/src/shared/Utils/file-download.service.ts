import { Injectable } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { FileDto } from '@shared/service-proxies/service-proxies';

@Injectable()
export class FileDownloadService {

    downloadTempFile(file: FileDto) {
        const url = AppConsts.remoteServiceBaseUrl +
            '/Profile/DownloadTempFile?fileType=' + file.fileType + '&fileToken=' + file.fileToken + '&fileName=' + file.fileName;
        location.href = url;
    }
}
