package com.soloproject.EventFinder;
import lombok.*;

import jakarta.persistence.*;

@Entity
@Data
@Table(name = "STUDENTS")
public class Student {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "EMAIL")
    private String email;

    // getters and setters
}