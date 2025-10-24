using System;
using System.Net;
using System.Net.Mail;

namespace AutomatedEmailSender
{
    public class BuiltinEmailService
    {
        private readonly EmailRequest _request;

        // Constructor now accepts a single model
        public BuiltinEmailService(EmailRequest request)
        {
            _request = request;
        }

        // Send email using values from the model
        public void SendEmail()
        {
            try
            {
                using (var mail = new MailMessage())
                {
                    mail.From = new MailAddress(_request.FromAddress);
                    mail.To.Add(_request.ToAddress);
                    mail.Subject = _request.Subject;
                    mail.Body = _request.Content;
                    mail.IsBodyHtml = true;

                    if (!string.IsNullOrWhiteSpace(_request.CcAddress))
                        mail.CC.Add(_request.CcAddress);

                    if (!string.IsNullOrWhiteSpace(_request.BccAddress))
                        mail.Bcc.Add(_request.BccAddress);

                    using (var smtp = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtp.Credentials = new NetworkCredential(_request.FromAddress, _request.GmailAppPassword);
                        smtp.EnableSsl = true;
                        smtp.UseDefaultCredentials = false;

                        smtp.Send(mail);
                        Console.WriteLine("Email sent successfully!");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to send email: " + ex.Message);
                throw;
            }
        }
    }
}
