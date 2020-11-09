using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Abp.AspNetCore.Mvc.Authorization;
using Abp.AspNetCore.Mvc.Controllers;
using Abp.IO.Extensions;
using Abp.UI;
using Abp.Web.Models;
using ManagerCV.Controllers.Dto;
using ManagerCV.IO;
using Microsoft.AspNetCore.Mvc;

namespace ManagerCV.Web.Host.Controllers
{
    //[AbpMvcAuthorize]
    public class ProfileController : AbpController
    {
        private readonly IAppFolders _appFolders;
        private const int MaxProfilePictureSize = 5242880; //5MB
        private readonly string[] ValidFileTypes = { "image/jpeg", "image/png" };
        public ProfileController(IAppFolders appFolders)
        {
            _appFolders = appFolders;
        }
        public UploadDocumentFileOutput UploadDocumentFile()
        {
            try
            {
                var documentFile = Request.Form.Files.First();

                if (documentFile == null)
                {
                    throw new UserFriendlyException(L("File_Change_Error_Message"), L("Document_Change_Error_Details"));
                }

                if (documentFile.Length > MaxProfilePictureSize)
                {
                    throw new UserFriendlyException(L("File_Warn_SizeLimit_Message"), L("File_Warn_SizeLimit_Details", 10));
                }

                byte[] fileBytes;
                using (var stream = documentFile.OpenReadStream())
                {
                    fileBytes = stream.GetAllBytes();
                }

                var fileInfo = new FileInfo(documentFile.FileName);
                var tempFilePath = Path.Combine(_appFolders.TempFileUploadFolder, documentFile.FileName);
                System.IO.File.WriteAllBytes(tempFilePath, fileBytes);

                return new UploadDocumentFileOutput()
                {
                    ContentType = documentFile.ContentType,
                    FileName = documentFile.FileName,
                    FileSize = Math.Round((decimal)documentFile.Length / 1048576, 2)
                };
            }
            catch (UserFriendlyException ex)
            {
                return new UploadDocumentFileOutput
                {
                    ErrorInfo = new ErrorInfo(ex.Message, ex.Details)
                };
            }
        }

        public UploadDocumentFileOutput UploadFileJD()
        {
            try
            {
                var documentFile = Request.Form.Files.First();

                if (documentFile == null)
                {
                    throw new UserFriendlyException(L("File_Change_Error_Message"), L("Document_Change_Error_Details"));
                }

                if (documentFile.Length > MaxProfilePictureSize)
                {
                    throw new UserFriendlyException(L("File_Warn_SizeLimit_Message"), L("File_Warn_SizeLimit_Details", 10));
                }

                byte[] fileBytes;
                using (var stream = documentFile.OpenReadStream())
                {
                    fileBytes = stream.GetAllBytes();
                }

                var fileInfo = new FileInfo(documentFile.FileName);
                var tempFilePath = Path.Combine(_appFolders.TempFileUploadJDFolder, documentFile.FileName);
                System.IO.File.WriteAllBytes(tempFilePath, fileBytes);

                return new UploadDocumentFileOutput()
                {
                    ContentType = documentFile.ContentType,
                    FileName = documentFile.FileName,
                    FileSize = Math.Round((decimal)documentFile.Length / 1048576, 2)
                };
            }
            catch (UserFriendlyException ex)
            {
                return new UploadDocumentFileOutput
                {
                    ErrorInfo = new ErrorInfo(ex.Message, ex.Details)
                };
            }
        }


        public ActionResult DownloadTempFile(FileDto file)
        {
            var filePath = Path.Combine(_appFolders.TempFileDownloadFolder, file.FileToken);
            if (!System.IO.File.Exists(filePath))
            {
                throw new UserFriendlyException(L("RequestedFileDoesNotExists"));
            }

            var fileBytes = System.IO.File.ReadAllBytes(filePath);
            System.IO.File.Delete(filePath);
            return File(fileBytes, file.FileType, file.FileName);
        }
    }
}