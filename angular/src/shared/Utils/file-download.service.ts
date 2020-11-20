import { Injectable } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { FileDto, ViewContactDto } from '@shared/service-proxies/service-proxies';

@Injectable()
export class FileDownloadService {

    downloadTempFile(file: FileDto) {
        const url = AppConsts.remoteServiceBaseUrl +
            '/Profile/DownloadTempFile?fileType=' + file.fileType + '&fileToken=' + file.fileToken + '&fileName=' + file.fileName;
        location.href = url;
    }
    downloadTempFileHD(file: FileDto) {
        const url = AppConsts.remoteServiceBaseUrl +
            '/Profile/DownloadTempFileHD?fileType=' + file.fileType + '&fileToken=' + file.fileToken + '&fileName=' + file.fileName;
        location.href = url;
    }
    viewTempFileHD(file: ViewContactDto) {
        const url = AppConsts.remoteServiceBaseUrl +
            '/Profile/ViewHopDong?fileType=' + file.fileType + '&fileName=' + file.fileName;
        window.open(
            url,
            '_blank'
          );
    }

    viewTempFileTT(file: ViewContactDto) {
        const url = AppConsts.remoteServiceBaseUrl +
            '/Profile/ViewThanhToan?fileType=' + file.fileType + '&fileName=' + file.fileName;
        window.open(
            url,
            '_blank'
          );
    }

    downloadTempFileTT(file: FileDto) {
        const url = AppConsts.remoteServiceBaseUrl +
            '/Profile/DownloadTempFileTT?fileType=' + file.fileType + '&fileToken=' + file.fileToken + '&fileName=' + file.fileName;
        location.href = url;
    }
}
