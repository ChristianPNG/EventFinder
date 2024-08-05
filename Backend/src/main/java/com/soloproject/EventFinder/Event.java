package com.soloproject.EventFinder;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Data //creates getters and setters for every field based on field names.
@Table(name = "EVENTS")
public class Event {
    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "NAME")
    private String name;
    @Column(name = "URL")
    private String URL;
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
    private Set<User> users = new HashSet<>();


}
