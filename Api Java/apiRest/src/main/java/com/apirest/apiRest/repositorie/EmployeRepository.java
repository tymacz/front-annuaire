package com.apirest.apiRest.repositorie;

import org.springframework.data.jpa.repository.JpaRepository;
import com.apirest.apiRest.model.Employe;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Optional;

public interface EmployeRepository extends JpaRepository<Employe, Long> {

    @Query(value = "SELECT * FROM employee WHERE mail = :email AND (password = :password or password is null ) AND delete_date is NULL", nativeQuery = true)
    Employe login(@Param("email") String email, @Param("password") String password);


    @Query(value = "UPDATE employee SET delete_date = :date WHERE id_salarie = :id", nativeQuery = true)
    void deleteDate(@Param("id") int id, @Param("date") LocalDate date);

    @Query(value = "SELECT * FROM employee WHERE mail =:email AND name= :name AND forname= :forname",nativeQuery = true)
    Employe getId(@Param("email") String email,@Param("name") String name, @Param("forname") String forname);

    Optional<Employe> findById(Long id);
}
