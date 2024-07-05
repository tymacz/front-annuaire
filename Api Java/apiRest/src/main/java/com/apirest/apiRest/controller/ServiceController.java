package com.apirest.apiRest.controller;



import com.apirest.apiRest.model.Services;
import com.apirest.apiRest.service.ServicesService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@AllArgsConstructor
public class ServiceController {

    private final ServicesService servicesService;

    @PostMapping("/createPlusieur")
    public List<Services> createPlusieur(@RequestBody List<Services> servicesList) {
        return servicesService.createServices(servicesList);
    }
    @PostMapping("/create")
    public Services create(@RequestBody Services services) {
        return servicesService.createService(services);
    }

    @GetMapping("/FindAll")
    public List<Services> read() {
        return servicesService.lire();
    }

    @PutMapping("/update/{id}")
    public Services update (@PathVariable int id, @RequestBody Services services) {
        return servicesService.modifyService(id, services);
    }

    @DeleteMapping("/delete/{id}")
    public String delete (@PathVariable int id) {
        return servicesService.deleteService(id);
    }
}
