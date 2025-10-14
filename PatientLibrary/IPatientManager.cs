// PatientManagerLibrary/IPatientManager.cs
using System.Collections.Generic;

namespace PatientLibrary
{
    public interface IPatientManager
    {
        IEnumerable<PatientDetails> GetAllPatients();
        PatientDetails GetPatientById(long id);
        void AddPatientDetails(PatientDetails patient);
        void UpdatePatient(PatientDetails patient);
        bool DeletePatient(long id);
    }
}
