using AccountCenter.Data;
using AccountCenter.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace REST_Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserRepository _userRepository;

        public AccountController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // ---------------------------
        // SIGNUP
        // ---------------------------
        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] User user)
        {
            if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Password))
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Username and password are required."
                });
            }

            var existingUser = await _userRepository.GetUserByUsernameAsync(user.Username);
            if (existingUser != null)
            {
                return Conflict(new
                {
                    success = false,
                    message = "Username already exists."
                });
            }

            // ⚠️ For demo only — in production hash passwords
            await _userRepository.CreateUserAsync(user);

            return Ok(new
            {
                success = true,
                message = "User registered successfully!"
            });
        }

        // ---------------------------
        // LOGIN
        // ---------------------------
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Password))
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Username and password are required."
                });
            }

            var dbUser = await _userRepository.GetUserByUsernameAsync(user.Username);

            if (dbUser == null || dbUser.Password != user.Password)
            {
                return Unauthorized(new
                {
                    success = false,
                    message = "Invalid username or password."
                });
            }

            return Ok(new
            {
                success = true,
                message = "Login successful!"
            });
        }
    }
}
