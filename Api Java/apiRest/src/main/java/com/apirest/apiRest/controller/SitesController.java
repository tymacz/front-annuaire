package com.apirest.apiRest.controller;



import com.apirest.apiRest.model.Sites;
import com.apirest.apiRest.service.SitesService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sites")
@AllArgsConstructor
public class SitesController {

    private final SitesService sitesService;

    @PostMapping("/create")
    public Sites create(@RequestBody Sites sites) {
        return sitesService.createSites(sites);
    }

    @GetMapping("/FindAll")
    public List<Sites> read() {
        return sitesService.lire();
    }

    @PutMapping("/update/{id}")
    public Sites update (@PathVariable int id, @RequestBody Sites sites) {
        return sitesService.modifySites(id, sites);
    }

    @DeleteMapping("/delete/{id}")
    public String delete (@PathVariable int id) {
        return sitesService.deleteSites(id);
    }
}
