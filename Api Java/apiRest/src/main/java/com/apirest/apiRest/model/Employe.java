package com.apirest.apiRest.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name = "employee")
@Getter
@Setter
@NoArgsConstructor
public class Employe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String forname;
    private String phone;
    private String mobile;
    private String mail;
    private Boolean admin;
    private Date delete_Date;
    private String password;

    @ManyToOne
    @JoinColumn(name = "id_site")
    private Sites site;

    @ManyToOne
    @JoinColumn(name = "id_service")
    private Services service;
}
