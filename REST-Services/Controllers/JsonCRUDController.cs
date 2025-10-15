using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PatientLibrary;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace REST_Services.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JsonCRUDController : ControllerBase
    {
        private readonly PatientManager manager = new PatientManager();

        // GET: api/<JsonCRUDController>
        [HttpGet]
        public IEnumerable<PatientDetails> Get()
        {
            var patients = manager.GetAllPatients();
            return patients;
        }

        // GET api/<JsonCRUDController>/5
        [HttpGet("Select/{patientId}")]
        public PatientDetails Get(long id)
        {
            var patients = manager.GetAllPatients();
            return patients.FirstOrDefault(p => p.Id == id);
        }

        // POST api/<JsonCRUDController>
        [HttpPost]
        public ActionResult<PatientDetails> Post([FromBody] PatientDetails patient)
        {
            try
            {
                var allPatients = manager.GetAllPatients();
                if (allPatients.Any(p => p.Mobile == patient.Mobile || p.Email == patient.Email))
                {
                    // Return HTTP 409 Conflict with message
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

                // Return HTTP 201 Created with new patient's data and location header
                //return CreatedAtAction(nameof(GetById), new { id = newPatient.Id }, newPatient);
                return StatusCode(500, $"Patient  added Successfully");
            }
            catch (Exception ex)
            {
                // Return HTTP 500 Internal Server Error with exception message
                return StatusCode(500, $"Patient not added: {ex.Message}");
            }
        }


        // PUT api/<controller>/5
        [HttpPut("Update/{patientId}")]
        public IActionResult Put(long id, [FromBody] PatientDetails patient)
        {
            try
            {
                bool isUpdated = manager.UpdatePatient(id, existingPatient =>
                {
                    existingPatient.Name = patient.Name;
                    existingPatient.Age = patient.Age;
                    existingPatient.Location = patient.Location;
                });

                if (isUpdated)
                    return Ok("Patient Details Updated successfully");           // 200 OK
                else
                    return NotFound("The Patient Id is Not Matched");     // 404 Not Found if patient not found
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"An error occurred while updating the patient. {ex.Message}"); // 500 Internal Server Error
            }
        }



        // DELETE api/<JsonCRUDController>/5
        [HttpDelete("Remove/{patientId}")]
        public IActionResult Delete(long id)
        {
            try
            {
                bool isRemoved = manager.RemovePatient(id);

                if (isRemoved)
                    return Ok("Patient Details Deleted successfully");           // 200 OK
                else
                    return NotFound("The Patient Id is Not Matched");
            }

            catch (Exception ex)
            {

                return StatusCode(500, $"An error occurred while updating the patient. {ex.Message}"); // 500 Internal Server Error
            }
        }

        // GET api/JsonCRUD/SearchPatient/{name}
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
                // Return HTTP 500 Internal Server Error with exception message
                return StatusCode(500, $"Patient not added: {ex.Message}");
            }
        }

        [HttpGet("SearchPatientByEmail")]
        public ActionResult<List<PatientDetails>> SearchPatientEmail(string location)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(location))
                {
                    return BadRequest("Invalid email.");
                }

                List<PatientDetails> matchedPatients = manager.SearchByEmail(location);

                if (matchedPatients == null || !matchedPatients.Any())
                {
                    return NotFound("No patient found with the given email.");
                }

                return Ok(matchedPatients);
            }
            catch (Exception ex)
            {
                // Return HTTP 500 Internal Server Error with exception message
                return StatusCode(500, $"Patient not added: {ex.Message}");
            }
        }


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
                // Return HTTP 500 Internal Server Error with exception message
                return StatusCode(500, $"Patient not added: {ex.Message}");
            }
        }


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

        //[HttpGet("SearchPatientByAge/{age}")]
        //public ActionResult<List<PatientDetails>> SearchPatientAge(int age)
        //{
        //    try
        //    {
        //        if (age <= 0)
        //        {
        //            return BadRequest("Invalid Age.");
        //        }

        //        List<PatientDetails> matchedPatients = manager.SearchByAge(age);

        //        if (matchedPatients == null || !matchedPatients.Any())
        //        {
        //            return NotFound("No patient found with the given Age.");
        //        }

        //        return Ok(matchedPatients);
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Server error: {ex.Message}");
        //    }
        //}

    }
}
