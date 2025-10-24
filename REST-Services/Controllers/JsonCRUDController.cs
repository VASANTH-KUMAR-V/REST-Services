using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using PatientLibrary;

namespace REST_Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JsonCRUDController : ControllerBase
    {
        private readonly PatientManager manager = new PatientManager();

        // GET: api/JsonCRUD
        [HttpGet]
        public ActionResult<IEnumerable<PatientDetails>> Get()
        {
            var patients = manager.GetAllPatients();
            return Ok(patients);
        }

        // GET api/JsonCRUD/Select/5
        [HttpGet("Select/{id}")]
        public ActionResult<PatientDetails> Get(long id)
        {
            var patient = manager.GetAllPatients().FirstOrDefault(p => p.Id == id);
            if (patient == null)
                return NotFound($"Patient with Id={id} not found.");
            return Ok(patient);
        }

        // POST api/JsonCRUD
        [HttpPost]
        public ActionResult<PatientDetails> Post([FromBody] PatientDetails patient)
        {
            try
            {
                var allPatients = manager.GetAllPatients();
                if (allPatients.Any(p => p.Mobile == patient.Mobile || p.Email == patient.Email))
                {
                    return Conflict("A patient with the same mobile or email already exists.");
                }

                var newPatient = new PatientDetails
                {
                    Name = patient.Name,
                    Age = patient.Age,
                    Email = patient.Email,
                    Location = patient.Location,
                    Mobile = patient.Mobile
                    // Id will be assigned inside AddPatient
                };

                manager.AddPatient(newPatient);

                return CreatedAtAction(nameof(Get), new { id = newPatient.Id }, newPatient);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Patient not added: {ex.Message}");
            }
        }

        
        // PUT api/JsonCRUD/Update/5
        [HttpPut("Update/{id}")]
        public IActionResult Put(long id, [FromBody] PatientDetails patient)
        {
            try
            {
                if (patient == null)
                    return BadRequest("Patient data is required.");

                bool isUpdated = manager.UpdatePatient(id, existingPatient =>
                {
                    // Only update Name, Age, and Location
                    existingPatient.Name = patient.Name;
                    existingPatient.Age = patient.Age;
                    existingPatient.Location = patient.Location;
                });

                if (isUpdated)
                    return Ok("Patient details updated successfully.");
                else
                    return NotFound($"Patient with Id={id} not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating patient: {ex.Message}");
            }
        }


        // DELETE api/JsonCRUD/Remove/5
        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(long id)
        {
            try
            {
                bool isRemoved = manager.RemovePatient(id);

                if (isRemoved)
                    return Ok("Patient details deleted successfully.");
                else
                    return NotFound($"Patient with Id={id} not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting patient: {ex.Message}");
            }
        }

        // GET api/JsonCRUD/SearchPatientByName?name=value
        [HttpGet("SearchPatientByName")]
        public ActionResult<List<PatientDetails>> SearchPatientName(string name)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(name))
                {
                    return BadRequest("Invalid name.");
                }

                List<PatientDetails> matchedPatients = manager.SearchByName(name);

                if (matchedPatients == null || !matchedPatients.Any())
                {
                    return NotFound("No patient found with the given name.");
                }

                return Ok(matchedPatients);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }

        // GET api/JsonCRUD/SearchPatientByEmail?email=value
        [HttpGet("SearchPatientByEmail")]
        public ActionResult<List<PatientDetails>> SearchPatientEmail(string email)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(email))
                {
                    return BadRequest("Invalid email.");
                }

                List<PatientDetails> matchedPatients = manager.SearchByEmail(email);

                if (matchedPatients == null || !matchedPatients.Any())
                {
                    return NotFound("No patient found with the given email.");
                }

                return Ok(matchedPatients);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }

        // GET api/JsonCRUD/SearchPatientByLocation?location=value
        [HttpGet("SearchPatientByLocation")]
        public ActionResult<List<PatientDetails>> SearchPatientLocation(string location)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(location))
                {
                    return BadRequest("Invalid location.");
                }

                List<PatientDetails> matchedPatients = manager.SearchByLocation(location);

                if (matchedPatients == null || !matchedPatients.Any())
                {
                    return NotFound("No patient found with the given location.");
                }

                return Ok(matchedPatients);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }

        // GET api/JsonCRUD/SearchPatientByMobile?mobile=value
        [HttpGet("SearchPatientByMobile")]
        public ActionResult<List<PatientDetails>> SearchPatientMobile(long mobile)
        {
            try
            {
                if (mobile <= 0)
                {
                    return BadRequest("Invalid mobile number.");
                }

                List<PatientDetails> matchedPatients = manager.SearchByMobile(mobile);

                if (matchedPatients == null || !matchedPatients.Any())
                {
                    return NotFound("No patient found with the given mobile number.");
                }

                return Ok(matchedPatients);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }

        // Uncomment if you want to implement search by age
        /*
        [HttpGet("SearchPatientByAge")]
        public ActionResult<List<PatientDetails>> SearchPatientAge(int age)
        {
            try
            {
                if (age <= 0)
                {
                    return BadRequest("Invalid age.");
                }

                List<PatientDetails> matchedPatients = manager.SearchByAge(age);

                if (matchedPatients == null || !matchedPatients.Any())
                {
                    return NotFound("No patient found with the given age.");
                }

                return Ok(matchedPatients);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }
        */
    }
}
