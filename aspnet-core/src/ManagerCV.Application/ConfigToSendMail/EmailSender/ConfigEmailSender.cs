using Abp.Domain.Repositories;
using Abp.UI;
using ManagerCV.ConfigToSendMail.Dto;
using ManagerCV.Models;
using ManagerCV.MultiTenancy;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MimeKit.Text;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ManagerCV.ConfigToSendMail.EmailSender
{
    public class ConfigEmailSender : ManagerCVAppServiceBase, IConfigEmailSender
    {
        private readonly IRepository<Tenant> _tenantRepository;
        private readonly IConfigurationRoot _appConfiguration;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IRepository<SysConfigToSendMail> _sysConfigSendMailRepository; 
        public string Test => _appConfiguration["AccountReportServer:Username"];

        public ConfigEmailSender(
         IRepository<Tenant> tenantRepository,
         IHostingEnvironment env,
         IRepository<Models.SysConfigToSendMail> sysConfigSendMailRepository
         )
        {
            _tenantRepository = tenantRepository;
            _hostingEnvironment = env;
            //_appConfiguration = env.GetAppConfiguration();
            _sysConfigSendMailRepository = sysConfigSendMailRepository;
        }

        public async Task Contact(CreateConfigToSendMailDto input)
        {
            try
            {
                var ssl = input.UseSSL == 1 ? true : false;

                var messageToSend = new MimeMessage
                {
                    Sender = new MailboxAddress("Sender Name", input.UserName),
                    Subject = input.Title,
                };
                messageToSend.Body = new TextPart(TextFormat.Html) { Text = input.Content };
                messageToSend.To.Add(new MailboxAddress(input.ToMail));

                if (input.CCMail != null)
                {
                    // cắt email từ list email
                    foreach (var address in input.CCMail.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries))
                    {
                        messageToSend.To.Add(new MailboxAddress(address));
                    }
                }

                using (MailKit.Net.Smtp.SmtpClient emailClient = new MailKit.Net.Smtp.SmtpClient())
                {
                    emailClient.CheckCertificateRevocation = false;
                    emailClient.Connect(input.ServerURL, input.Port, ssl);
                    emailClient.Authenticate(input.UserName, input.PassWord);
                    emailClient.Send(messageToSend);
                    emailClient.Disconnect(true);
                }
            }
           catch (Exception e)
            {
                Logger.Error(e.Message);
                Logger.Error(e.InnerException?.Message);
                Logger.Error(e.StackTrace);
                throw new UserFriendlyException(L("ConfigToSendMailFail.PleaseChecked."));
            }
        }

        public async Task SendMailList(CreateConfigToSendMailDto input)
        {
            
                var ssl = input.UseSSL == 1 ? true : false;
                var messageToSend = new MimeMessage
                {
                    Sender = new MailboxAddress("Sender Name", input.UserName),
                    Subject = input.Title,
                };
                messageToSend.Body = new TextPart(TextFormat.Html) { Text = input.Content };
                // cắt email từ list email
                foreach (var address in input.ToMail.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries))
                {
                    messageToSend.To.Add(new MailboxAddress(address));
                }

                if (input.CCMail != null)
                {
                    foreach (var ccMailAddress in input.CCMail.Split(new[] { ";" }, StringSplitOptions.RemoveEmptyEntries))
                    {
                        messageToSend.Cc.Add(new MailboxAddress(ccMailAddress));
                    }
                }
                if (input.IsAttackURL)
                {
                    var urlReport = "<p>" + "URl report :" + "</p> " + input.URL + "<br />";
                    input.Content = input.Content + urlReport;
                }
                // gửi email đính kèm PDF
                if (input.IsAttackReport)
                {
                var urlFirst = _appConfiguration["UrlForGetNameReport"];
                var first = input.ReportPath.Replace(urlFirst, "");
                var index = first.IndexOf("&");
                var sFileName = first.Substring(0, index);
                CheckAttackReport(input.ReportPath);
                    var BIServer = _appConfiguration["ReportServerBI"];
                    var sReportSA = _appConfiguration["ReportingServerAddress"];
                    string sServer = _appConfiguration["AccountReportServer:Server"];
                    string sUser = _appConfiguration["AccountReportServer:Username"];
                    string sPass = _appConfiguration["AccountReportServer:Password"];
                    string sFormat = _appConfiguration["FormatFileReportServer:Format"];
                    if(!String.IsNullOrEmpty(sFormat))
                    {
                        if (sFormat.Equals("PDF")) sFileName = sFileName + ".pdf";
                        else if (sFormat.Equals("WORD")) sFileName = sFileName + ".doc";
                        else if (sFormat.Equals("EXCEL")) sFileName = sFileName + ".xls";
                        else sFileName = sFileName + ".pdf";
                    }
                    WebClient Client = new WebClient();
                    //Auth
                    NetworkCredential nwc = new NetworkCredential(sUser,sPass);
                    Client.Credentials = nwc;
                //Download file
                //input.ReportPath = input.ReportPath.Replace(sServer, "http://localhost:6060") .Replace("PDF", sFormat);
                    input.ReportPath = input.ReportPath.Replace(sReportSA, BIServer);

                    byte[] myDataBuffer = Client.DownloadData(input.ReportPath);
                    var builder = new BodyBuilder { HtmlBody = input.Content };
                    builder.Attachments.Add(sFileName, myDataBuffer, new MimeKit.ContentType("application", ".xls"));
                    //builder.Attachments.Add(tempFilePath);
                    messageToSend.Body = builder.ToMessageBody();
                }
            try
            {
                using (MailKit.Net.Smtp.SmtpClient emailClient = new MailKit.Net.Smtp.SmtpClient())
                {
                    emailClient.CheckCertificateRevocation = false;
                    await emailClient.ConnectAsync(input.ServerURL, input.Port, ssl);
                    await emailClient.AuthenticateAsync(input.UserName, input.PassWord);
                    await emailClient.SendAsync(messageToSend);
                    await emailClient.DisconnectAsync(true);
                }
            }
            catch (Exception)
            {
                throw new UserFriendlyException(L("ConfigToSendMailFail.PleaseChecked."));
            }
        }
        // check trong hop dinh kem bao cao sai

        public async Task SendEmaiForSchedule(SendEmiling input)
        {
            try
            {
                // lấy cấu hình email đang được kích hoạt
                var emailConfig = _sysConfigSendMailRepository.FirstOrDefaultAsync(x => x.IsActive == true);
                var ssl = emailConfig.Result.UseSSL == 1 ? true : false;

                var messageToSend = new MimeMessage
                {
                    Sender = new MailboxAddress("Sender Name", emailConfig.Result.UserName),
                    Subject = emailConfig.Result.Title,
                };
                if (input.IsUrl)
                {
                    var urlReport =  "<p>" + "URl report :" + "</p> " + input.URL + "<br />";
                    input.Content = input.Content + urlReport;
                }
                messageToSend.Body = new TextPart(TextFormat.Html) { Text = input.Content };
                messageToSend.To.Add(new MailboxAddress(input.ToMail));
                // gửi email đính kèm PDF
                if (input.IsAttackFile)
                {
                    var urlFirst =  _appConfiguration["UrlForGetNameReport"];
                    var first = input.AttackFile.Replace(urlFirst, "");
                    var index = first.IndexOf("&");
                    var sFileName = first.Substring(0, index);
                    CheckAttackReport(input.AttackFile);
                    var BIServer = _appConfiguration["ReportServerBI"];
                    var sReportSA = _appConfiguration["ReportingServerAddress"];
                    string sServer = _appConfiguration["AccountReportServer:Server"];
                    string sUser = _appConfiguration["AccountReportServer:Username"];
                    string sPass = _appConfiguration["AccountReportServer:Password"];
                    string sFormat = _appConfiguration["FormatFileReportServer:Format"];
                    if (!String.IsNullOrEmpty(sFormat))
                    {
                        if (sFormat.Equals("PDF")) sFileName = sFileName + ".pdf";
                        else if (sFormat.Equals("WORD")) sFileName = sFileName + ".doc";
                        else if (sFormat.Equals("EXCEL")) sFileName = sFileName + ".xls";
                        else sFileName = sFileName + ".pdf";
                    }
                    WebClient Client = new WebClient();
                    NetworkCredential nwc = new NetworkCredential(_appConfiguration["AccountReportServer:Username"], _appConfiguration["AccountReportServer:Password"]);
                    Client.Credentials = nwc;

                    input.AttackFile = input.AttackFile.Replace(sReportSA, BIServer);
                    byte[] myDataBuffer = Client.DownloadData(input.AttackFile);
                    Attachment att = new Attachment(new MemoryStream(myDataBuffer), System.Net.Mime.MediaTypeNames.Application.Pdf);

                    var builder = new BodyBuilder { HtmlBody = input.Content };

                    builder.Attachments.Add(sFileName, myDataBuffer, new MimeKit.ContentType("application", ".xls"));
                    messageToSend.Body = builder.ToMessageBody();
                }

                using (MailKit.Net.Smtp.SmtpClient emailClient = new MailKit.Net.Smtp.SmtpClient())
                {
                    emailClient.CheckCertificateRevocation = false;
                    await emailClient.ConnectAsync(emailConfig.Result.ServerURL, emailConfig.Result.Port, ssl);
                    await emailClient.AuthenticateAsync(emailConfig.Result.UserName, emailConfig.Result.PassWord);
                    await emailClient.SendAsync(messageToSend);
                    await emailClient.DisconnectAsync(true);
                }
            }
            catch (Exception e)
            {
                throw new UserFriendlyException(L("ConfigToSendMailFail.PleaseChecked."));
            }
        }
        public void CheckAttackReport(string input)
        {
            try
            {
                var BIServer = _appConfiguration["ReportServerBI"];
                var sReportSA = _appConfiguration["ReportingServerAddress"];
                string sServer = _appConfiguration["AccountReportServer:Server"];
                string sUser = _appConfiguration["AccountReportServer:Username"];
                string sPass = _appConfiguration["AccountReportServer:Password"];
                WebClient Client = new WebClient();
                NetworkCredential nwc = new NetworkCredential(sUser, sPass);
                Client.Credentials = nwc;
                input = input.Replace(sReportSA, BIServer);
                byte[] myDataBuffer = Client.DownloadData(input);
            }
            catch (Exception)
            {
                throw new UserFriendlyException(L("AttachErrorReport.PleaseCheckTheReportAgain"));
            }
        }
    }
}