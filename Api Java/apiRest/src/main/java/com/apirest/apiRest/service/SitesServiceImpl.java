package com.apirest.apiRest.service;

import com.apirest.apiRest.model.Services;
import com.apirest.apiRest.model.Sites;
import com.apirest.apiRest.repositorie.SitesRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SitesServiceImpl implements SitesService{

    private final SitesRepository sitesRepository;

    @Override
    public Sites createSites(Sites sites) {
        return sitesRepository.save(sites);
    }

    @Override
    public List<Sites> lire() {
        return sitesRepository.findAll();
    }

    @Override
    public Sites modifySites(int id, Sites sites) {
        return sitesRepository.findById((long) id)
                .map(p -> {
                    p.setCity(sites.getCity());
                    p.setFunction(sites.getFunction());
                    return sitesRepository.save(p);
                }).orElseThrow(()-> new RuntimeException("service introuvable"));
    }

    @Override
    public String deleteSites(int id) {
        sitesRepository.deleteById((long) id);
        return "site supprimer ";
    }

}
