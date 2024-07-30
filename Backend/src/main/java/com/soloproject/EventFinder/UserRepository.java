package com.soloproject.EventFinder;
 
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
 
public interface UserRepository extends JpaRepository<User, Long> {
    /*
     * JPA defines behavior based on naming convention. Here, FindAll + by + Username is
     * auto defined by JPA so this will return a list of Users matching username in the database
     */
    List<User> findAllByUsername(String name); 
}