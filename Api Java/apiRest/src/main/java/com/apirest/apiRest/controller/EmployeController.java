package com.apirest.apiRest.controller;

import com.apirest.apiRest.model.Employe;
import com.apirest.apiRest.service.EmployeService;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/salaries")
@AllArgsConstructor
public class EmployeController {
    private final EmployeService salarieService;


    @PostMapping("/create")
    public Employe create(@RequestBody Employe salarie) {
        return salarieService.createSalarie(salarie);
    }

    @GetMapping("/FindAll")
    public List<Employe> read() {
        return salarieService.lire();
    }

    @PutMapping("/update/{id}")
    public Employe update (@PathVariable int id, @RequestBody Employe salaries) {
        return salarieService.modifySalarie(id, salaries);
    }

    @PutMapping("/deleteDate/{id}")
    public String deleteDate(@PathVariable int id, @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return salarieService.deleteDate(id, date);
    }

    @DeleteMapping("/delete/{id}")
    public String delete (@PathVariable int id) {
        return salarieService.deleteSalarie(id);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Employe> getSalariesById(@PathVariable Long id) {
        Employe salaries = salarieService.findById(id);
        if (salaries != null) {
            return ResponseEntity.ok(salaries);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");

        Employe salaries = salarieService.login(email, password);
        if (salaries == null) {
            return ResponseEntity.ok().body(false);
        }
        return ResponseEntity.ok().body(salaries);
    }

    @PostMapping("/GetId")
    public ResponseEntity<Object> getId(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String name = payload.get("name");
        String forname = payload.get("forname");

        Employe salaries = salarieService.getId(email,name,forname);
        if (salaries == null) {
            return ResponseEntity.ok().body(false);
        } else {
            return ResponseEntity.ok().body(salaries);
        }
    }
    

}
