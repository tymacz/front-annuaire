package com.apirest.apiRest.service;

import com.apirest.apiRest.model.Employe;

import java.util.List;
import java.time.LocalDate;

public interface EmployeService {

    Employe createSalarie(Employe salaries);
    List<Employe> lire();
    Employe modifySalarie(int id, Employe salaries);
    String deleteSalarie(int id);
    Employe login(String email, String password);
    Employe findById(Long idSalarie);
    String deleteDate(int id, LocalDate date);
    Employe getId(String email, String name, String forname);
}
