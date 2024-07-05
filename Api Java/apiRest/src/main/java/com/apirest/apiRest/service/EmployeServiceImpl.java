package com.apirest.apiRest.service;

import com.apirest.apiRest.model.Employe;
import com.apirest.apiRest.repositorie.EmployeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class EmployeServiceImpl implements EmployeService {

    private final EmployeRepository salarieRepository;




    @Override
    public List<Employe> lire() {
        return salarieRepository.findAll();
    }
    @Override
    public Employe findById(Long id) {
        Optional<Employe> optionalSalaries = salarieRepository.findById(id);
        return optionalSalaries.orElse(null);
    }

    @Override
    public Employe getId(String email, String name, String forname){
        Employe salaries = salarieRepository.getId(email,name,forname);
        if (salaries == null) {
            return null;
        }
        return salaries;
    }

    @Override
    public Employe modifySalarie(int id, Employe salaries) {
        return salarieRepository.findById((long) id)
                .map(p -> {
                    p.setName(salaries.getName());
                    p.setForname(salaries.getForname());
                    p.setPhone(salaries.getPhone());
                    p.setMobile(salaries.getMobile());
                    p.setMail(salaries.getMail());
                    p.setAdmin(salaries.getAdmin());
                    p.setDelete_Date(salaries.getDelete_Date());
                    p.setPassword(salaries.getPassword());
                    p.setSite(salaries.getSite());
                    return salarieRepository.save(p);
                }).orElseThrow(()-> new RuntimeException("not found"));
    }

    @Override
    public String deleteSalarie(int id) {
        salarieRepository.deleteById((long) id);
        return "delete ";
    }

    @Override
    public String deleteDate(int id, LocalDate date) {
        salarieRepository.deleteDate(id, date);
        return "deleted";
    }

    @Override
    public Employe login(String email, String password) {
        Employe salaries = salarieRepository.login(email, password);
        if (salaries == null) {
            return null;
        }
        return salaries;
    }

    @Override
    public Employe createSalarie(Employe salaries) {
        return salarieRepository.save(salaries);
    }


}
