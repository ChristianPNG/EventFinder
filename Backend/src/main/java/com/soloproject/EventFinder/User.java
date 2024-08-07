package com.soloproject.EventFinder;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

import org.apache.commons.codec.digest.DigestUtils;

import jakarta.persistence.*;


@Entity
@Getter //creates getters and setters for every field based on field names.
@Setter
@AllArgsConstructor
@NoArgsConstructor
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

    @ManyToMany
    @JoinTable(
        name = "USERS_EVENTS",
        joinColumns = @JoinColumn(name = "USER_ID"),
        inverseJoinColumns = @JoinColumn(name = "EVENT_ID")
    )
    private Set<Event> savedEvents = new HashSet<>();

    public void setPassword(String password){
        String encoded = DigestUtils.sha256Hex(password); //64 length
        this.password = encoded;
    }
    public String getPassword(){
        return this.password;
    }

    public Set<Event> getSavedEvents(){
        return this.savedEvents;
    }

}