package com.apirest.apiRest.service;

import com.apirest.apiRest.model.Sites;

import java.util.List;

public interface SitesService {

    Sites createSites(Sites sites);
    List<Sites> lire();
    Sites modifySites(int id, Sites sites);
    String deleteSites(int id);


}
