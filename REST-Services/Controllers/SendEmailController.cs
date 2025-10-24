using AutomatedEmailSender;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mail;
using System.Net;

namespace REST_Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SendEmailController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromBody] EmailRequest request)
        {
            // 1️⃣ Validate request
            if (request == null)
                return BadRequest("Email request cannot be null.");

            if (string.IsNullOrWhiteSpace(request.FromAddress) ||
                string.IsNullOrWhiteSpace(request.ToAddress) ||
                string.IsNullOrWhiteSpace(request.Subject) ||
                string.IsNullOrWhiteSpace(request.Content))
            {
                return BadRequest("Missing one or more required fields: FromAddress, ToAddress, Subject, Content.");
            }

            try
            {
                var emailService = new BuiltinEmailService(request);
                emailService.SendEmail();

                // 2️⃣ Success
                return Ok(new
                {
                    message = "Email sent successfully.",
                    timestamp = DateTime.UtcNow
                });
            }
            
            catch (TimeoutException)
            {
                return StatusCode((int)HttpStatusCode.GatewayTimeout, "Email sending operation timed out.");
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, $"Unexpected error: {ex.Message}");
            }
        }
    }
}
