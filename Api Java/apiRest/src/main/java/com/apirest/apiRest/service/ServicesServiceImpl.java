package com.apirest.apiRest.service;

import com.apirest.apiRest.model.Services;
import com.apirest.apiRest.repositorie.ServicesRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ServicesServiceImpl implements ServicesService {

    private final ServicesRepository servicesRepository;



    @Override
    public List<Services> createServices(List<Services> serviceList) {
        for (Services services : serviceList) {
            createService(services); // Appel à la méthode createSalarie pour chaque salarié
        }
        return serviceList; // Vous pouvez retourner la liste créée si nécessaire
    }

    @Override
    public Services createService(Services services) {
        // Logique pour créer un seul salarié
        return servicesRepository.save(services);
    }

    @Override
    public List<Services> lire() {
        return servicesRepository.findAll();
    }

    @Override
    public Services modifyService(int id, Services services) {
        return servicesRepository.findById((long) id)
                .map(p -> {
                    p.setName(services.getName());
                    p.setDescription(services.getDescription());
                    return servicesRepository.save(p);
                }).orElseThrow(()-> new RuntimeException("service introuvable"));
    }

    @Override
    public String deleteService(int id) {
        servicesRepository.deleteById((long) id);
        return "service supprimer ";
    }
}
