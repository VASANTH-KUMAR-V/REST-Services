using AccountCenter.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace AccountCenter.Data
{
    public class UserRepository
    {
        private readonly string filePath = Path.Combine("Data", "users.json");
        private List<User> users;

        public UserRepository()
        {
            LoadData();
        }

        private void LoadData()
        {
            if (!File.Exists(filePath))
            {
                Directory.CreateDirectory("Data");
                File.WriteAllText(filePath, "[]");
            }

            var json = File.ReadAllText(filePath);
            users = JsonConvert.DeserializeObject<List<User>>(json) ?? new List<User>();
        }

        private void SaveData()
        {
            var json = JsonConvert.SerializeObject(users, Formatting.Indented);
            File.WriteAllText(filePath, json);
        }

        public void AddUser(User user)
        {
            if (user == null) throw new ArgumentNullException(nameof(user));
            if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Password))
                throw new ArgumentException("Username and Password are required.");

            if (users.Any(u => u.Username.Equals(user.Username, StringComparison.OrdinalIgnoreCase)))
                throw new InvalidOperationException("Username already exists.");

            user.Id = users.Any() ? users.Max(u => u.Id) + 1 : 1;
            users.Add(user);
            SaveData();
        }

        public bool RemoveUser(int id)
        {
            var user = users.FirstOrDefault(u => u.Id == id);
            if (user != null)
            {
                users.Remove(user);
                SaveData();
                return true;
            }
            return false;
        }

        public bool UpdateUser(int id, Action<User> updateAction)
        {
            var user = users.FirstOrDefault(u => u.Id == id);
            if (user != null)
            {
                updateAction(user);
                SaveData();
                return true;
            }
            return false;
        }

        public List<User> GetAllUsers() => users;

        public User GetUserByUsername(string username)
        {
            if (string.IsNullOrWhiteSpace(username)) return null;
            return users.FirstOrDefault(u => u.Username.Equals(username, StringComparison.OrdinalIgnoreCase));
        }
    }
}



// To store it in DataBase

//using AccountCenter.Models;
//using Dapper;
//using System;
//using System.Data.SqlClient;
//using System.Threading.Tasks;

//namespace AccountCenter.Data
//{
//    public class UserRepository
//    {
//        private readonly string connectionString = "Server=DESKTOP-LMIHPAD\\SQLEXPRESS;Database=batch11;User Id=sa;Password=Anaiyaan@123;";
//            //"Server=DESKTOP-04RCHH9;Database=FullStackApplication;Trusted_Connection=True;";

//        public async Task<User> GetUserByUsernameAsync(string username)
//        {
//            if (string.IsNullOrWhiteSpace(username))
//                throw new ArgumentException("Username cannot be null or empty.", nameof(username));

//            const string sql = "SELECT * FROM Users WHERE Username = @Username";

//            using var connection = new SqlConnection(connectionString);
//            await connection.OpenAsync();

//            return await connection.QueryFirstOrDefaultAsync<User>(sql, new { Username = username });
//        }

//        public async Task<int> CreateUserAsync(User user)
//        {
//            if (user == null)
//                throw new ArgumentNullException(nameof(user));

//            if (string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Password))
//                throw new ArgumentException("Username and Password are required.");

//            const string sql = @"INSERT INTO Users (Email, Username, Name, Password)
//                                 VALUES (@Email, @Username, @Name, @Password)";

//            using var connection = new SqlConnection(connectionString);
//            await connection.OpenAsync();

//            int rowsAffected = await connection.ExecuteAsync(sql, new
//            {
//                user.Email,
//                user.Username,
//                user.Name,
//                user.Password
//            });

//            return rowsAffected;
//        }
//    }
//}


////CREATE TABLE Users (
////    Id INT IDENTITY(1,1) PRIMARY KEY,
////    Email NVARCHAR(100) NOT NULL,
////    Username NVARCHAR(50) NOT NULL UNIQUE,
////    Name NVARCHAR(100) NOT NULL,
////    Password NVARCHAR(200) NOT NULL
////);
