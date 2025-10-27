using AccountCenter.Models;
using Dapper;
using System;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace AccountCenter.Data
{
    public class UserRepository
    {
        private readonly string connectionString =
            "Server=DESKTOP-04RCHH9;Database=FullStackApplication;Trusted_Connection=True;";

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
                throw new ArgumentException("Username cannot be null or empty.", nameof(username));

            const string sql = "SELECT * FROM Users WHERE Username = @Username";

            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            return await connection.QueryFirstOrDefaultAsync<User>(sql, new { Username = username });
        }

        public async Task<int> CreateUserAsync(User user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Password))
                throw new ArgumentException("Username and Password are required.");

            const string sql = @"INSERT INTO Users (Email, Username, Name, Password)
                                 VALUES (@Email, @Username, @Name, @Password)";

            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            int rowsAffected = await connection.ExecuteAsync(sql, new
            {
                user.Email,
                user.Username,
                user.Name,
                user.Password
            });

            return rowsAffected;
        }
    }
}


//CREATE TABLE Users (
//    Id INT IDENTITY(1,1) PRIMARY KEY,
//    Email NVARCHAR(100) NOT NULL,
//    Username NVARCHAR(50) NOT NULL UNIQUE,
//    Name NVARCHAR(100) NOT NULL,
//    Password NVARCHAR(200) NOT NULL
//);
