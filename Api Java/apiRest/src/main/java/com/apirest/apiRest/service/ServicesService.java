package com.apirest.apiRest.service;

import com.apirest.apiRest.model.Services;

import java.util.List;

public interface ServicesService {

    Services createService(Services services);
    List<Services> lire();
    Services modifyService(int id, Services services);
    String deleteService(int id);


}
