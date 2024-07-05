package com.apirest.apiRest.service;

import com.apirest.apiRest.model.Services;

import java.util.List;

public interface ServicesService {

    List<Services> createServices(List<Services> servicesList);
    Services createService(Services services);
    List<Services> lire();
    Services modifyService(int id, Services services);
    String deleteService(int id);


}
