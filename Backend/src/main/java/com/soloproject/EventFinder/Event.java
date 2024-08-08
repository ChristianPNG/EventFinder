package com.soloproject.EventFinder;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Getter //creates getters and setters for every field based on field names.
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "EVENTS")
public class Event {
    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "NAME")
    private String name;
    @Column(name = "URL")
    private String url;
    @Column(name = "IMAGE")
    private String image;
    @Column(name = "MONTH")
    private String month;
    @Column(name = "DAY")
    private String day;
    @Column(name = "STATUS")
    private String status;
    @Column(name = "HOUR")
    private String hour;
    @Column(name = "MINUTES")
    private String minutes;
    @Column(name = "VENUE")
    private String venue;
    @Column(name = "CITY")
    private String city;
    @Column(name = "STATE")
    private String state;

    @ManyToMany(mappedBy = "savedEvents")
    @JsonIgnore
    private Set<User> users = new HashSet<>();

    public Set<User> getUsers(){
        return this.users;
    }

}
