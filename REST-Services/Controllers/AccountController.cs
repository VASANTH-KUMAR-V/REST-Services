using AccountCenter.Data;
using AccountCenter.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

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
        public IActionResult Signup([FromBody] User user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Password))
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Username and password are required."
                });
            }

            var existingUser = _userRepository.GetUserByUsername(user.Username);
            if (existingUser != null)
            {
                return Conflict(new
                {
                    success = false,
                    message = "Username already exists."
                });
            }

            // ⚠️ For demo only — in production hash passwords
            _userRepository.AddUser(user);

            return StatusCode(201, new
            {
                success = true,
                message = "User registered successfully!",
                data = new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.Name
                }
            });
        }

        // ---------------------------
        // LOGIN
        // ---------------------------
        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Password))
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Username and password are required."
                });
            }

            var dbUser = _userRepository.GetUserByUsername(user.Username);

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
                message = "Login successful!",
                data = new
                {
                    dbUser.Id,
                    dbUser.Username,
                    dbUser.Email,
                    dbUser.Name
                }
            });
        }

        // ---------------------------
        // GET ALL USERS
        // ---------------------------
        [HttpGet("all")]
        public IActionResult GetAllUsers()
        {
            var users = _userRepository.GetAllUsers();

            // Optionally, exclude passwords when returning users
            var result = users.Select(u => new
            {
                u.Id,
                u.Username,
                u.Email,
                u.Name,
                u.Password
            }).ToList();

            return Ok(new
            {
                success = true,
                data = result
            });
        }

    }
}

//Storing in database

//using AccountCenter.Data;
//using AccountCenter.Models;
//using Microsoft.AspNetCore.Mvc;
//using System.Threading.Tasks;

//namespace REST_Services.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AccountController : ControllerBase
//    {
//        private readonly UserRepository _userRepository;

//        public AccountController(UserRepository userRepository)
//        {
//            _userRepository = userRepository;
//        }

//        // ---------------------------
//        // SIGNUP
//        // ---------------------------
//        [HttpPost("signup")]
//        public async Task<IActionResult> Signup([FromBody] User user)
//        {
//            if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Password))
//            {
//                return BadRequest(new
//                {
//                    success = false,
//                    message = "Username and password are required."
//                });
//            }

//            var existingUser = await _userRepository.GetUserByUsernameAsync(user.Username);
//            if (existingUser != null)
//            {
//                return Conflict(new
//                {
//                    success = false,
//                    message = "Username already exists."
//                });
//            }

//            // ⚠️ For demo only — in production hash passwords
//            await _userRepository.CreateUserAsync(user);

//            return Ok(new
//            {
//                success = true,
//                message = "User registered successfully!"
//            });
//        }

//        // ---------------------------
//        // LOGIN
//        // ---------------------------
//        [HttpPost("login")]
//        public async Task<IActionResult> Login([FromBody] User user)
//        {
//            if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Password))
//            {
//                return BadRequest(new
//                {
//                    success = false,
//                    message = "Username and password are required."
//                });
//            }

//            var dbUser = await _userRepository.GetUserByUsernameAsync(user.Username);

//            if (dbUser == null || dbUser.Password != user.Password)
//            {
//                return Unauthorized(new
//                {
//                    success = false,
//                    message = "Invalid username or password."
//                });
//            }

//            return Ok(new
//            {
//                success = true,
//                message = "Login successful!"
//            });
//        }
//    }
//}
