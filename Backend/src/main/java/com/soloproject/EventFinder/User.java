package com.soloproject.EventFinder;
import lombok.*;

import org.apache.commons.codec.digest.DigestUtils;

import jakarta.persistence.*;


@Entity
@Data //creates getters and setters for every field based on field names.
@Table(name = "USERS")
public class User {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "USERNAME")
    private String username;

    @Column(name = "PASSWORD")
    private String password;

    public void setPassword(String password){
        String encoded = DigestUtils.sha256Hex(password); //64 length
        this.password = encoded;
    }

}